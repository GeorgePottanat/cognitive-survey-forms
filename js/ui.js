/* Interactive form rendering (HTML strings; every text value is escaped). */
(function () {
  "use strict";
  var E = window.Engine;

  function esc(s) {
    return String(s === undefined || s === null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function attrJSON(o) { return esc(JSON.stringify(o)); }
  function showIf(it) { return it.show_if ? ' data-show-if="' + attrJSON(it.show_if) + '"' : ""; }
  var idn = 0;
  function uid(name) { idn += 1; return "f_" + name + "_" + idn; }

  function errSpan(name, ctx) {
    if (ctx.errors[name]) return '<span class="field-error">' + esc(ctx.errors[name]) + "</span>";
    if (ctx.miss[name]) return '<span class="field-error">Required</span>';
    return "";
  }
  function bad(name, ctx) { return ctx.errors[name] || ctx.miss[name]; }
  function dis(ctx) { return ctx.ro ? " disabled" : ""; }
  function req(it) { return it.required ? ' <span class="req" title="Required to mark complete">*</span>' : ""; }
  function clearBtn(name, ctx) {
    return ctx.ro ? "" : '<button type="button" class="clear" data-clear="' + esc(name) + '" title="Clear this answer">clear</button>';
  }

  function specifyInput(op, parent, ctx) {
    if (!op.specify) return "";
    return '<span class="specify" data-show-if="' + attrJSON({ field: parent, "in": [op.v] }) + '">' +
      '<input type="text" name="' + esc(op.specify) + '" value="' + esc(ctx.data[op.specify]) + '" maxlength="500" aria-label="Specify" placeholder="specify"' +
      (bad(op.specify, ctx) ? ' aria-invalid="true"' : "") + dis(ctx) + "> " + errSpan(op.specify, ctx) + "</span>";
  }

  function radioGroup(name, options, ctx, inline, exclusive, label) {
    var h = '<div class="opts' + (inline ? " inline" : "") + (bad(name, ctx) ? " is-missing" : "") +
      '" role="radiogroup"' + (label ? ' aria-label="' + esc(label) + '"' : "") + ">";
    options.forEach(function (op) {
      h += '<span class="opt"><label><input type="radio" name="' + esc(name) + '" value="' + esc(op.v) + '"' +
        (ctx.data[name] === op.v ? " checked" : "") + dis(ctx) +
        (exclusive ? ' data-exclusive="' + esc(exclusive) + '"' : "") + "> " + esc(op.l) + "</label>" +
        specifyInput(op, name, ctx) + "</span>";
    });
    return h + clearBtn(name, ctx) + errSpan(name, ctx) + "</div>";
  }

  function textInput(it, ctx) {
    var t = it.type, id = uid(it.name), v = ctx.data[it.name];
    var common = ' id="' + id + '" name="' + esc(it.name) + '" value="' + esc(v) + '"' + dis(ctx) +
      (bad(it.name, ctx) ? ' aria-invalid="true"' : "");
    var input;
    if (t === "date") input = '<input type="date"' + common + ' max="' + E.todayISO() + '" min="1900-01-01">';
    else if (t === "number") input = '<input type="number" class="short"' + common + ' step="' + esc(it.step || "any") + '"' +
      (it.min !== undefined && it.min !== null ? ' min="' + esc(it.min) + '"' : "") +
      (it.max !== undefined && it.max !== null ? ' max="' + esc(it.max) + '"' : "") + ">";
    else if (t === "initials") input = '<input type="text" class="initials" maxlength="5" autocomplete="off"' + common + ">";
    else input = '<input type="text" maxlength="500"' + (it.size ? ' size="' + esc(it.size) + '" class="sized"' : "") + common + ">";
    return '<div class="item"' + showIf(it) + '><label class="q" for="' + id + '">' + esc(it.label) + req(it) + "</label>" +
      input + (it.suffix ? ' <span class="suffix">' + esc(it.suffix) + "</span>" : "") + " " + errSpan(it.name, ctx) + "</div>";
  }

  function scoreBox() { return '<div class="computed" id="cdrComputed" hidden></div>'; }

  function renderItems(items, ctx) {
    var h = "";
    items.forEach(function (it) {
      var t = it.type;
      if (t === "block") h += '<div class="block"' + showIf(it) + ">" + renderItems(it.children, ctx) + "</div>";
      else if (t === "section") h += '<h3 class="section"' + showIf(it) + ">" + esc(it.label) + "</h3>";
      else if (t === "subsection") h += '<h4 class="subsection"' + showIf(it) + ">" + esc(it.label) + "</h4>";
      else if (t === "note") h += '<p class="note' + (it.strong ? " strong" : "") + '"' + showIf(it) + ">" + esc(it.text) + "</p>";
      else if (["text", "initials", "number", "date", "year"].indexOf(t) !== -1) h += textInput(it, ctx);
      else if (t === "textarea") {
        var id = uid(it.name);
        h += '<div class="item"' + showIf(it) + '><label class="q" for="' + id + '">' + esc(it.label) + "</label>" +
          (it.help ? '<div class="help">' + esc(it.help) + "</div>" : "") +
          '<textarea id="' + id + '" name="' + esc(it.name) + '" rows="' + (it.rows || 3) + '" maxlength="5000"' + dis(ctx) + ">" +
          esc(ctx.data[it.name]) + "</textarea>" + errSpan(it.name, ctx) + "</div>";
      } else if (t === "radio" || t === "cdr_global") {
        h += '<div class="item' + (it.exclusive_with ? " paired" : "") + '"' + showIf(it) + '><div class="q">' + esc(it.label) + req(it) + "</div>" +
          (it.help ? '<div class="help">' + esc(it.help) + "</div>" : "") + (t === "cdr_global" ? scoreBox() : "") +
          radioGroup(it.name, it.options, ctx, it.inline || t === "cdr_global", it.exclusive_with, it.label) + "</div>";
      } else if (t === "checkbox") {
        h += '<div class="item"' + showIf(it) + '><div class="q">' + esc(it.label) + ' <span class="help">(check all that apply)</span></div><div class="opts">';
        var sel = ctx.data[it.name] || [];
        it.options.forEach(function (op) {
          h += '<span class="opt"><label><input type="checkbox" name="' + esc(it.name) + '" value="' + esc(op.v) + '"' +
            (sel.indexOf(op.v) !== -1 ? " checked" : "") + dis(ctx) + "> " + esc(op.l) + "</label>" + specifyInput(op, it.name, ctx) + "</span>";
        });
        h += "</div></div>";
      } else if (t === "dob") {
        var mv = ctx.data[it.name + "_month"], yv = ctx.data[it.name + "_year"];
        h += '<div class="item"' + showIf(it) + '><div class="q">' + esc(it.label) + " (month / year)</div>" +
          '<select name="' + esc(it.name) + '_month" aria-label="Birth month"' + dis(ctx) + '><option value="">month</option>';
        for (var m = 1; m <= 12; m++) {
          var mm = (m < 10 ? "0" : "") + m;
          h += '<option value="' + mm + '"' + (mv === mm ? " selected" : "") + ">" + mm + "</option>";
        }
        h += '</select> / <input type="number" class="short" name="' + esc(it.name) + '_year" value="' + esc(yv) +
          '" min="1900" max="' + E.todayISO().slice(0, 4) + '" step="1" placeholder="year" aria-label="Birth year"' + dis(ctx) + "> " +
          errSpan(it.name + "_month", ctx) + errSpan(it.name + "_year", ctx) + "</div>";
      } else if (t === "fieldrow") {
        h += '<div class="item fieldrow"' + showIf(it) + ">";
        it.fields.forEach(function (f) {
          h += "<label>" + esc(f.label) + (f.identifier ? ' <span class="pii" title="Personal identifier — not included in the email text">PII</span>' : "") +
            ' <input type="text" name="' + esc(f.name) + '" value="' + esc(ctx.data[f.name]) + '" maxlength="500"' +
            (f.size ? ' size="' + esc(f.size) + '" class="sized"' : "") + dis(ctx) + "></label>" + errSpan(f.name, ctx);
        });
        h += "</div>";
      } else if (t === "matrix") {
        h += '<div class="item"' + showIf(it) + '><div class="table-wrap"><table class="matrix"><thead><tr><th class="rowlabel">' +
          esc(it.label) + "</th>" + it.columns.map(function (c) { return "<th>" + esc(c.l) + "</th>"; }).join("") + "<th></th></tr></thead><tbody>";
        it.rows.forEach(function (r) {
          h += "<tr" + (bad(r.name, ctx) ? ' class="is-missing"' : "") + '><th class="rowlabel" scope="row">' + esc(r.label) +
            (it.required ? ' <span class="req">*</span>' : "") + " " + errSpan(r.name, ctx) + "</th>";
          it.columns.forEach(function (c) {
            h += '<td><label class="cell"><input type="radio" name="' + esc(r.name) + '" value="' + esc(c.v) + '" aria-label="' +
              esc(r.label + ": " + c.l) + '"' + (ctx.data[r.name] === c.v ? " checked" : "") + dis(ctx) + "></label></td>";
          });
          h += "<td>" + clearBtn(r.name, ctx) + "</td></tr>";
        });
        h += "</tbody></table></div></div>";
      } else if (t === "npi") {
        h += '<div class="item"' + showIf(it) + '><div class="table-wrap"><table class="matrix npi"><thead><tr><th class="rowlabel">Question</th>' +
          it.presence.map(function (c) { return "<th>" + esc(c.l) + "</th>"; }).join("") + "<th>If Yes, Severity</th></tr></thead><tbody>";
        it.rows.forEach(function (r) {
          var sev = r.name + "_sev";
          h += "<tr" + (bad(r.name, ctx) || bad(sev, ctx) ? ' class="is-missing"' : "") + '><th class="rowlabel" scope="row">' +
            esc(r.label) + ' <span class="req">*</span> ' + errSpan(r.name, ctx) + "</th>";
          it.presence.forEach(function (c) {
            h += '<td><label class="cell"><input type="radio" name="' + esc(r.name) + '" value="' + esc(c.v) + '" aria-label="' +
              esc(r.label + ": " + c.l) + '"' + (ctx.data[r.name] === c.v ? " checked" : "") + dis(ctx) + "></label></td>";
          });
          h += '<td class="sev"><div data-show-if="' + attrJSON({ field: r.name, "in": ["yes"] }) + '">';
          it.severity.forEach(function (s) {
            h += '<label><input type="radio" name="' + esc(sev) + '" value="' + esc(s.v) + '"' + (ctx.data[sev] === s.v ? " checked" : "") +
              dis(ctx) + "> " + esc(s.l) + "</label><br>";
          });
          h += (ctx.miss[sev] ? '<span class="field-error">Severity required</span>' : "") + "</div></td></tr>";
        });
        h += "</tbody></table></div></div>";
      } else if (t === "cdr_table") {
        h += '<div class="item"' + showIf(it) + '><div class="table-wrap"><table class="cdr"><thead><tr><th>Please enter score below:</th>' +
          "<th>None – 0</th><th>Questionable – 0.5</th><th>Mild – 1</th><th>Moderate – 2</th><th>Severe – 3</th></tr></thead><tbody>";
        it.rows.forEach(function (r) {
          h += "<tr" + (bad(r.name, ctx) ? ' class="is-missing"' : "") + '><th scope="row">' + esc(r.label) + ' <span class="req">*</span> ' +
            errSpan(r.name, ctx) + (ctx.ro ? "" : "<br>" + clearBtn(r.name, ctx)) + "</th>";
          r.options.forEach(function (op) {
            h += "<td" + (r.merged_0 && op.v === "0" ? ' colspan="2"' : "") + '><label class="cdrcell"><input type="radio" name="' +
              esc(r.name) + '" value="' + esc(op.v) + '"' + (ctx.data[r.name] === op.v ? " checked" : "") + dis(ctx) +
              "><span><strong>" + esc(op.v) + "</strong> — " + esc(op.desc) + "</span></label></td>";
          });
          h += "</tr>";
        });
        h += "</tbody></table></div></div>";
      }
    });
    return h;
  }

  /* ---- live behaviour: visibility, exclusive pairs, clear buttons ---- */
  function valuesOf(form, name) {
    var out = [];
    form.querySelectorAll('[name="' + CSS.escape(name) + '"]').forEach(function (el) {
      if (el.closest("[hidden]")) return;
      if (el.type === "radio" || el.type === "checkbox") { if (el.checked) out.push(el.value); }
      else if (el.value !== "") out.push(el.value);
    });
    return out;
  }

  function refreshVisibility(form, readonly) {
    for (var pass = 0; pass < 2; pass++) {
      form.querySelectorAll("[data-show-if]").forEach(function (el) {
        var c = JSON.parse(el.getAttribute("data-show-if"));
        var parentHidden = el.parentElement && el.parentElement.closest("[hidden]");
        var vals = valuesOf(form, c.field);
        el.hidden = !(!parentHidden && vals.some(function (v) { return c["in"].indexOf(v) !== -1; }));
      });
    }
    if (!readonly) {
      form.querySelectorAll("input, select, textarea").forEach(function (i) { i.disabled = !!i.closest("[hidden]"); });
    }
  }

  function readForm(form, inst) {
    function get(name) {
      var els = form.querySelectorAll('[name="' + CSS.escape(name) + '"]');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.disabled) continue;
        if (el.type === "radio" || el.type === "checkbox") { if (el.checked) return el.value; }
        else return el.value;
      }
      return "";
    }
    function getList(name) {
      return Array.prototype.slice.call(form.querySelectorAll('[name="' + CSS.escape(name) + '"]'))
        .filter(function (el) { return !el.disabled && el.checked; }).map(function (el) { return el.value; });
    }
    return E.parse(inst, get, getList);
  }

  function wireForm(form, readonly, onChange) {
    form.addEventListener("change", function (e) {
      var t = e.target;
      if (t.getAttribute("data-exclusive") && t.checked) {
        var num = form.querySelector('[name="' + CSS.escape(t.getAttribute("data-exclusive")) + '"]');
        if (num) num.value = "";
      }
      if (t.type === "number" && t.value !== "") {
        form.querySelectorAll('[data-exclusive="' + CSS.escape(t.name) + '"]').forEach(function (r) { r.checked = false; });
      }
      refreshVisibility(form, readonly);
      onChange();
    });
    form.addEventListener("input", function (e) {
      if (e.target.type !== "radio" && e.target.type !== "checkbox") onChange();
    });
    form.addEventListener("click", function (e) {
      var b = e.target.closest("button.clear");
      if (!b) return;
      form.querySelectorAll('[name="' + CSS.escape(b.getAttribute("data-clear")) + '"]').forEach(function (r) { r.checked = false; });
      refreshVisibility(form, readonly);
      onChange();
    });
    refreshVisibility(form, readonly);
  }

  window.UI = { esc: esc, renderItems: renderItems, refreshVisibility: refreshVisibility, readForm: readForm, wireForm: wireForm };
})();
