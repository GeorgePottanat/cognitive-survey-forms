/*
 * Form engine: visibility rules, parsing, validation and scoring.
 * Pure functions, no DOM access — shared by the browser app and node tests.
 */
(function (root) {
  "use strict";

  var TEXT_TYPES = { text: 1, textarea: 1, initials: 1, date: 1, number: 1, year: 1 };

  function isEmpty(v) { return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0); }

  function condTrue(cond, data) {
    if (!cond) return true;
    var val = data[cond.field];
    if (isEmpty(val)) return false;
    if (Array.isArray(val)) return val.some(function (v) { return cond["in"].indexOf(v) !== -1; });
    return cond["in"].indexOf(String(val)) !== -1;
  }

  function allTrue(conds, data) {
    for (var i = 0; i < conds.length; i++) if (!condTrue(conds[i], data)) return false;
    return true;
  }

  /* Every storable key in document order, with the conditions it depends on. */
  function leafFields(inst) {
    if (inst._leaf) return inst._leaf;
    var out = [];
    function add(name, kind, item, conds, extra) {
      var d = { name: name, kind: kind, item: item, conds: conds, required: false,
                requiredUnless: null, identifier: false };
      for (var k in extra || {}) d[k] = extra[k];
      out.push(d);
    }
    function specifyFields(it, conds) {
      it.options.forEach(function (op) {
        if (op.specify) add(op.specify, "text", it, conds.concat([{ field: it.name, "in": [op.v] }]),
                            { required: true, specifyFor: it.name });
      });
    }
    function walk(items, conds) {
      items.forEach(function (it) {
        var t = it.type;
        var c = it.show_if ? conds.concat([it.show_if]) : conds;
        if (t === "block") walk(it.children, c);
        else if (TEXT_TYPES[t]) add(it.name, t, it, c, { required: !!it.required, identifier: !!it.identifier });
        else if (t === "radio" || t === "cdr_global") {
          add(it.name, "radio", it, c, { required: !!it.required, options: it.options });
          specifyFields(it, c);
        } else if (t === "checkbox") {
          add(it.name, "checkbox", it, c, { required: !!it.required, options: it.options });
          specifyFields(it, c);
        } else if (t === "matrix") {
          it.rows.forEach(function (r) {
            add(r.name, "radio", it, c, { required: !!it.required, requiredUnless: it.required_unless || null,
                                          options: it.columns, row: r });
          });
        } else if (t === "npi") {
          it.rows.forEach(function (r) {
            add(r.name, "radio", it, c, { required: !!it.required, options: it.presence, row: r });
            add(r.name + "_sev", "radio", it, c.concat([{ field: r.name, "in": ["yes"] }]),
                { required: !!it.required, options: it.severity, row: r });
          });
        } else if (t === "cdr_table") {
          it.rows.forEach(function (r) { add(r.name, "radio", it, c, { required: !!it.required, options: r.options, row: r }); });
        } else if (t === "dob") {
          add(it.name + "_month", "month", it, c);
          add(it.name + "_year", "year", it, c);
        } else if (t === "fieldrow") {
          it.fields.forEach(function (f) { add(f.name, "text", it, c, { identifier: !!f.identifier }); });
        }
      });
    }
    walk(inst.items, []);
    Object.defineProperty(inst, "_leaf", { value: out, enumerable: false });
    return out;
  }

  function fieldLabel(f) {
    var it = f.item;
    if (f.row) return f.row.label + (/_sev$/.test(f.name) ? " — severity" : "");
    if (f.specifyFor) return (it.label || f.specifyFor) + " — specify";
    if (it.type === "fieldrow") {
      for (var i = 0; i < it.fields.length; i++) if (it.fields[i].name === f.name) return it.fields[i].label;
    }
    if (it.type === "dob") return it.label + (/_month$/.test(f.name) ? " (month)" : " (year)");
    return it.label || f.name;
  }

  function todayISO(d) {
    d = d || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  function validDateISO(s) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
    var y = +s.slice(0, 4), m = +s.slice(5, 7), d = +s.slice(8, 10);
    var dt = new Date(Date.UTC(y, m - 1, d));
    return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
  }

  function cleanNumber(raw, item) {
    if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(raw)) return { err: "must be a number" };
    var n = Number(raw);
    if (!isFinite(n)) return { err: "must be a number" };
    if (item.min !== undefined && item.min !== null && n < item.min) return { err: "must be at least " + item.min };
    if (item.max !== undefined && item.max !== null && n > item.max) return { err: "must be at most " + item.max };
    if (item.step === "1" && Math.floor(n) !== n) return { err: "must be a whole number" };
    return { val: String(n) };
  }

  /*
   * Read raw form values into a clean data object.
   *   get(name)      -> string value ("" if none)
   *   getList(name)  -> array of checked values
   * Returns {data, errors}. Hidden fields are dropped.
   */
  function parse(inst, get, getList, today) {
    today = today || todayISO();
    var data = {}, errors = {};
    var fields = leafFields(inst);
    fields.forEach(function (f) {
      if (!allTrue(f.conds, data)) return;
      var name = f.name, kind = f.kind, it = f.item;
      if (kind === "checkbox") {
        var chosen = getList(name);
        var vals = f.options.map(function (o) { return o.v; }).filter(function (v) { return chosen.indexOf(v) !== -1; });
        if (vals.length) data[name] = vals;
        return;
      }
      var raw = String(get(name) || "").trim();
      if (raw === "") return;
      if (kind === "radio") {
        if (f.options.some(function (o) { return o.v === raw; })) data[name] = raw;
        else errors[name] = "invalid choice";
      } else if (kind === "date") {
        if (!validDateISO(raw)) errors[name] = "must be a valid date";
        else if (raw > today) errors[name] = "cannot be in the future";
        else if (raw < "1900-01-01") errors[name] = "year must be 1900 or later";
        else data[name] = raw;
      } else if (kind === "number") {
        var r = cleanNumber(raw, it);
        if (r.err) errors[name] = r.err; else data[name] = r.val;
      } else if (kind === "month") {
        if (/^\d{1,2}$/.test(raw) && +raw >= 1 && +raw <= 12) data[name] = (+raw < 10 ? "0" : "") + (+raw);
        else errors[name] = "must be a month 1-12";
      } else if (kind === "year") {
        var maxY = +today.slice(0, 4);
        if (/^\d{4}$/.test(raw) && +raw >= 1900 && +raw <= maxY) data[name] = raw;
        else errors[name] = "must be a year between 1900 and " + maxY;
      } else if (kind === "initials") {
        if (raw.length > 5) errors[name] = "initials must be 5 characters or fewer";
        else data[name] = raw.toUpperCase();
      } else {
        if (raw.length > 5000) errors[name] = "too long (5000 characters max)";
        else data[name] = raw;
      }
    });
    fields.forEach(function (f) {
      var other = f.item.exclusive_with;
      if (other && f.kind === "radio" && data[f.name] && data[other])
        errors[f.name] = "enter either the number of years or a code, not both";
    });
    return { data: data, errors: errors };
  }

  function missingRequired(inst, data) {
    return leafFields(inst).filter(function (f) {
      if (!f.required || !allTrue(f.conds, data)) return false;
      if (f.requiredUnless && condTrue(f.requiredUnless, data)) return false;
      return isEmpty(data[f.name]);
    });
  }

  function identifierNames(inst) {
    return leafFields(inst).filter(function (f) { return f.identifier; }).map(function (f) { return f.name; });
  }

  function optionLabel(options, value) {
    for (var i = 0; i < options.length; i++) if (options[i].v === value) return options[i].l;
    return value;
  }

  /* ---------------------------------------------------------------- scoring
   * Derived scores are shown as checks only; they never replace entered values.
   * Scores are handled in halves (x2) to avoid floating-point issues.
   */
  var CDR_BOXES = ["memory", "orientation", "judgment", "community", "home_hobbies", "personal_care"];
  var VALID_H = [0, 1, 2, 4, 6]; // 0, 0.5, 1, 2, 3 in half-points

  function toH(v) { return Math.round(Number(v) * 2); }
  function fromH(h) { return h === 1 ? "0.5" : String(h / 2); }

  /* Washington University (Morris 1993) global CDR algorithm. Arguments in
   * points (0, 0.5, 1, 2, 3); returns points. Rules, in order:
   *  M = 0   -> 0, unless >= 2 secondary categories >= 0.5 -> 0.5
   *  M = 0.5 -> 0.5, unless >= 3 secondary categories >= 1 -> 1
   *  M >= 1:
   *   >= 3 secondary equal M -> M
   *   >= 3 on one side of M -> majority score on that side (ties: closest to M),
   *     except a 3/2 split across M -> M
   *   otherwise -> M
   *   never 0 when M >= 1: 0 becomes 0.5
   */
  function globalCdr(m, secondary) {
    var M = toH(m), sc = secondary.map(toH);
    if (sc.length !== 5 || VALID_H.indexOf(M) === -1 || sc.some(function (s) { return VALID_H.indexOf(s) === -1; }))
      throw new Error("need memory + 5 secondary scores from {0,0.5,1,2,3}");
    var cdr;
    if (M === 0) cdr = sc.filter(function (s) { return s >= 1; }).length >= 2 ? 1 : 0;
    else if (M === 1) cdr = sc.filter(function (s) { return s >= 2; }).length >= 3 ? 2 : 1;
    else {
      var same = sc.filter(function (s) { return s === M; }).length;
      var above = sc.filter(function (s) { return s > M; });
      var below = sc.filter(function (s) { return s < M; });
      if (same >= 3) cdr = M;
      else if (above.length >= 3 || below.length >= 3) {
        if ((above.length === 3 && below.length === 2) || (above.length === 2 && below.length === 3)) cdr = M;
        else {
          var side = above.length > below.length ? above : below;
          var counts = {};
          side.forEach(function (s) { counts[s] = (counts[s] || 0) + 1; });
          var top = Math.max.apply(null, Object.keys(counts).map(function (k) { return counts[k]; }));
          var tied = Object.keys(counts).filter(function (k) { return counts[k] === top; }).map(Number);
          tied.sort(function (a, b) { return Math.abs(a - M) - Math.abs(b - M); });
          cdr = tied[0];
        }
      } else cdr = M;
      if (cdr === 0) cdr = 1;
    }
    return Number(fromH(cdr));
  }

  function cdrScores(data) {
    var boxes = CDR_BOXES.map(function (k) { return data[k]; });
    var complete = boxes.every(function (b) { return !isEmpty(b); });
    var out = { complete: complete, sob: null, global_computed: null };
    if (complete) {
      out.sob = fromH(boxes.reduce(function (a, b) { return a + toH(b); }, 0));
      out.global_computed = fromH(toH(globalCdr(boxes[0], boxes.slice(1))));
    }
    out.global_entered = data.global_cdr || null;
    out.mismatch = !!(out.global_entered && out.global_computed && toH(out.global_entered) !== toH(out.global_computed));
    return out;
  }

  function range(a, b) { var r = []; for (var i = a; i <= b; i++) r.push(i); return r; }

  function ecogScores(data) {
    var vals = range(1, 12).map(function (i) { return data["q" + i]; }).filter(function (v) { return ["1", "2", "3", "4"].indexOf(v) !== -1; }).map(Number);
    var total = vals.reduce(function (a, b) { return a + b; }, 0);
    return { n_scored: vals.length, n_dk: range(1, 12).filter(function (i) { return data["q" + i] === "dk"; }).length,
             total: vals.length ? total : null, mean: vals.length ? Math.round(total / vals.length * 100) / 100 : null };
  }

  function npiqScores(data) {
    var present = range(1, 12).filter(function (i) { return data["q" + i] === "yes"; });
    var sev = present.map(function (i) { return data["q" + i + "_sev"]; }).filter(function (v) { return ["1", "2", "3"].indexOf(v) !== -1; }).map(Number);
    return { n_present: present.length,
             n_unknown_presence: range(1, 12).filter(function (i) { return data["q" + i] === "unknown"; }).length,
             severity_total: sev.reduce(function (a, b) { return a + b; }, 0),
             n_severity_unknown: present.length - sev.length };
  }

  function fasScores(data) {
    var vals = range(1, 10).map(function (i) { return data["q" + i]; }).filter(function (v) { return ["0", "1", "2", "3"].indexOf(v) !== -1; }).map(Number);
    return { n_scored: vals.length, total: vals.length ? vals.reduce(function (a, b) { return a + b; }, 0) : null,
             n_na: range(1, 10).filter(function (i) { return data["q" + i] === "na"; }).length,
             n_unknown: range(1, 10).filter(function (i) { return data["q" + i] === "unknown"; }).length };
  }

  function computeScores(key, data) {
    if (data.administered !== "yes") return null;
    if (key === "cdr_rating") return cdrScores(data);
    if (key === "ecog12") return ecogScores(data);
    if (key === "npiq") return npiqScores(data);
    if (key === "fas") return fasScores(data);
    return null;
  }

  function mdy(iso) {
    if (!iso || !validDateISO(String(iso).slice(0, 10))) return iso || "";
    return iso.slice(5, 7) + "/" + iso.slice(8, 10) + "/" + iso.slice(0, 4);
  }

  var Engine = {
    isEmpty: isEmpty, condTrue: condTrue, allTrue: allTrue, leafFields: leafFields, fieldLabel: fieldLabel,
    parse: parse, missingRequired: missingRequired, identifierNames: identifierNames, optionLabel: optionLabel,
    globalCdr: globalCdr, cdrScores: cdrScores, ecogScores: ecogScores, npiqScores: npiqScores,
    fasScores: fasScores, computeScores: computeScores, todayISO: todayISO, mdy: mdy, validDateISO: validDateISO
  };
  if (typeof module !== "undefined" && module.exports) module.exports = Engine;
  else root.Engine = Engine;
})(typeof window !== "undefined" ? window : this);
