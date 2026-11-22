/* Paper-style output: letter-size pages shared by Print and PDF, plus text export. */
(function () {
  "use strict";
  var E = window.Engine, esc = window.UI.esc;

  var PAGE_W = 816, PAGE_H = 1056;           // 8.5 x 11 in at 96 px/in
  var PAD_X = 58, PAD_TOP = 58, PAD_BOTTOM = 72;
  var CONTENT_H = PAGE_H - PAD_TOP - PAD_BOTTOM;

  function box(on) { return '<span class="bx' + (on ? " on" : "") + '">' + (on ? "X" : "") + "</span>"; }
  function val(v) { return '<span class="val">' + esc(v === undefined || v === null ? "" : v) + "</span>"; }

  function optList(name, options, data, inline) {
    return '<div class="ropts' + (inline ? " inline" : "") + '">' + options.map(function (op) {
      return '<span class="ropt">' + box(data[name] === op.v) + " " + esc(op.l) + (op.specify ? " " + val(data[op.specify]) : "") + "</span>";
    }).join("") + "</div>";
  }

  function render(items, data, scores) {
    var h = "";
    items.forEach(function (it) {
      var t = it.type;
      if (t === "block") h += render(it.children, data, scores);
      else if (t === "section") h += '<h3 class="rsection">' + esc(it.label) + "</h3>";
      else if (t === "subsection") h += '<h4 class="rsub">' + esc(it.label) + "</h4>";
      else if (t === "note") h += '<p class="rnote' + (it.strong ? " strong" : "") + '">' + esc(it.text) + "</p>";
      else if (["text", "initials", "number", "year"].indexOf(t) !== -1)
        h += '<div class="ritem"><span class="rq">' + esc(it.label) + "</span> " + val(data[it.name]) + (it.suffix ? " " + esc(it.suffix) : "") + "</div>";
      else if (t === "date") h += '<div class="ritem"><span class="rq">' + esc(it.label) + "</span> " + val(E.mdy(data[it.name])) + "</div>";
      else if (t === "textarea")
        h += '<div class="ritem"><div class="rq">' + esc(it.label) + "</div>" + (it.help ? '<div class="rhelp">' + esc(it.help) + "</div>" : "") +
          '<div class="rtext">' + esc(data[it.name] || "") + "</div></div>";
      else if (t === "radio")
        h += '<div class="ritem' + (it.exclusive_with ? " rpaired" : "") + '"><div class="rq">' + esc(it.label) + "</div>" +
          (it.help ? '<div class="rhelp">' + esc(it.help) + "</div>" : "") + optList(it.name, it.options, data, it.inline) + "</div>";
      else if (t === "cdr_global") {
        h += '<div class="ritem global"><span class="rq">' + esc(it.label) + ':</span> <span class="val big">' + esc(data[it.name] || "") + "</span>";
        if (scores && scores.complete)
          h += '<div class="rcomputed">Computed check (not part of form): Sum of Boxes ' + esc(scores.sob) + "; algorithm global CDR " +
            esc(scores.global_computed) + (scores.mismatch ? " — differs from entered value" : "") + "</div>";
        h += "</div>";
      } else if (t === "checkbox") {
        var sel = data[it.name] || [];
        h += '<div class="ritem"><div class="rq">' + esc(it.label) + '</div><div class="ropts inline">' + it.options.map(function (op) {
          return '<span class="ropt">' + box(sel.indexOf(op.v) !== -1) + " " + esc(op.l) + (op.specify ? " " + val(data[op.specify]) : "") + "</span>";
        }).join("") + "</div></div>";
      } else if (t === "dob")
        h += '<div class="ritem"><span class="rq">' + esc(it.label) + "</span> " + val(data[it.name + "_month"]) + " / " + val(data[it.name + "_year"]) +
          ' <span class="small">(month / year)</span></div>';
      else if (t === "fieldrow")
        h += '<div class="ritem rrow">' + it.fields.map(function (f) {
          return '<span><span class="rq">' + esc(f.label) + ":</span> " + val(data[f.name]) + "</span>";
        }).join("") + "</div>";
      else if (t === "matrix")
        h += '<table class="rmatrix split"><thead><tr><th class="rl">' + esc(it.label) + "</th>" +
          it.columns.map(function (c) { return "<th>" + esc(c.l) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          it.rows.map(function (r) {
            return '<tr><td class="rl">' + esc(r.label) + "</td>" + it.columns.map(function (c) {
              return '<td class="c">' + box(data[r.name] === c.v) + "</td>";
            }).join("") + "</tr>";
          }).join("") + "</tbody></table>";
      else if (t === "npi")
        h += '<table class="rmatrix split"><thead><tr><th class="rl">Question</th>' + it.presence.map(function (c) { return "<th>" + esc(c.l) + "</th>"; }).join("") +
          "<th>If Yes, Severity</th></tr></thead><tbody>" + it.rows.map(function (r) {
            return '<tr><td class="rl">' + esc(r.label) + "</td>" + it.presence.map(function (c) {
              return '<td class="c">' + box(data[r.name] === c.v) + "</td>";
            }).join("") + '<td class="sevcol">' + it.severity.map(function (s) {
              return box(data[r.name + "_sev"] === s.v) + " " + esc(s.l);
            }).join("<br>") + "</td></tr>";
          }).join("") + "</tbody></table>";
      else if (t === "cdr_table")
        h += '<table class="rcdr split"><thead><tr><th>Please enter score below:</th><th>None – 0</th><th>Questionable – 0.5</th>' +
          "<th>Mild – 1</th><th>Moderate – 2</th><th>Severe – 3</th></tr></thead><tbody>" + it.rows.map(function (r) {
            return '<tr><td class="rl">' + esc(r.label) + '<div class="score">' + esc(data[r.name] || "__.__") + "</div></td>" +
              r.options.map(function (op) {
                return "<td" + (r.merged_0 && op.v === "0" ? ' colspan="2"' : "") + (data[r.name] === op.v ? ' class="sel"' : "") + ">" + esc(op.desc) + "</td>";
              }).join("") + "</tr>";
          }).join("") + "</tbody></table>";
    });
    return h;
  }

  function scoreLine(key, s) {
    if (!s || key === "cdr_rating") return "";
    var t = "";
    if (key === "ecog12") t = "ECog-12 items scored " + s.n_scored + "/12; mean " + (s.mean === null ? "—" : s.mean) +
      " (1 = better/no change … 4 = consistently much worse; Don't Know/N/A excluded)";
    else if (key === "npiq") t = "NPI-Q symptoms present " + s.n_present + "/12; total severity " + s.severity_total +
      " (mild 1, moderate 2, severe 3)" + (s.n_severity_unknown ? "; " + s.n_severity_unknown + " severity unknown" : "");
    else if (key === "fas") t = "FAS total " + (s.total === null ? "—" : s.total) + " of " + s.n_scored +
      " scored items (normal 0, has difficulty 1, requires assistance 2, dependent 3; N/A " + s.n_na + ", unknown " + s.n_unknown + " excluded)";
    return '<div class="rcomputed">Computed check (not part of form): ' + esc(t) + "</div>";
  }

  function header(inst, visit, data) {
    if (inst.header === "followup")
      return '<div class="hbox"><b>Patient ID:</b> ' + esc(visit.patient_id) + '</div><div class="titlebar">' + esc(inst.title.toUpperCase()) + "</div>";
    if (inst.header === "paper")
      return '<table class="hgrid"><tr><td><b>Patient ID:</b> ' + esc(visit.patient_id) + "</td><td><b>Patient Initials:</b> " + esc(visit.patient_initials) +
        "</td></tr><tr><td><b>Visit Date:</b> " + esc(E.mdy(visit.visit_date)) + "</td><td><b>Evaluator Initials:</b> " + esc(visit.evaluator_initials) +
        '</td></tr><tr><td colspan="2"><b>Study Visit:</b> ' + esc(visit.study_visit) + '</td></tr></table><div class="titlebar">' +
        esc(inst.title.toUpperCase()) + "</div>";
    return '<table class="hgrid study"><tr><td><b>Study ID:</b> ' + esc(visit.study_id) + "</td><td><b>Letter code:</b> " + esc(visit.letter_code) +
      "</td><td><b>Date:</b> " + esc(E.mdy(data.form_date)) + ' <span class="small">(month/day/year)</span></td></tr>' +
      '<tr><td colspan="3" class="small"><b>Patient ID:</b> ' + esc(visit.patient_id) + '</td></tr></table><h2 class="vtitle">' + esc(inst.title) + "</h2>";
  }

  function sectionHTML(sec, visit) {
    var inst = sec.inst;
    var items = inst.items.filter(function (it) { return it.name !== "form_date"; });
    return header(inst, visit, sec.data) + (inst.intro ? '<p class="rintro">' + esc(inst.intro) + "</p>" : "") +
      render(items, sec.data, sec.scores) + scoreLine(inst.key, sec.scores);
  }

  /* ---- pagination --------------------------------------------------- */
  function newPage(container) {
    var page = document.createElement("div");
    page.className = "page";
    var content = document.createElement("div");
    content.className = "page-content";
    page.appendChild(content);
    container.appendChild(page);
    return content;
  }
  function overflows(content) { return content.scrollHeight > CONTENT_H + 1; }

  function placeTable(table, state, container) {
    var thead = table.tHead, rows = Array.prototype.slice.call(table.tBodies[0].rows);
    function shell() {
      var t = table.cloneNode(false);
      if (thead) t.appendChild(thead.cloneNode(true));
      t.appendChild(document.createElement("tbody"));
      return t;
    }
    var cur = shell();
    state.content.appendChild(cur);
    while (rows.length) {
      var row = rows.shift();
      cur.tBodies[0].appendChild(row);
      if (overflows(state.content)) {
        cur.tBodies[0].removeChild(row);
        if (!cur.tBodies[0].rows.length) {
          state.content.removeChild(cur);
          if (!state.content.children.length) { // a single row taller than a page: place it anyway
            cur.tBodies[0].appendChild(row); state.content.appendChild(cur);
            state.content = newPage(container); cur = shell(); state.content.appendChild(cur); continue;
          }
        }
        state.content = newPage(container);
        cur = shell();
        state.content.appendChild(cur);
        rows.unshift(row);
      }
    }
    if (!cur.tBodies[0].rows.length && cur.parentNode) cur.parentNode.removeChild(cur);
  }

  function buildPages(container, sections, visit, footerLabel) {
    container.innerHTML = "";
    var stage = document.createElement("div");
    stage.className = "page-content measure";
    container.appendChild(stage);
    var pageStarts = [];
    sections.forEach(function (sec) {
      stage.innerHTML = sectionHTML(sec, visit);
      var state = { content: newPage(container) };
      pageStarts.push({ el: state.content.parentNode, title: sec.inst.title, completed: sec.completedAt });
      Array.prototype.slice.call(stage.children).forEach(function (child) {
        if (child.tagName === "TABLE" && child.classList.contains("split")) {
          state.content.appendChild(child);
          if (overflows(state.content)) { state.content.removeChild(child); placeTable(child, state, container); }
          return;
        }
        state.content.appendChild(child);
        if (overflows(state.content) && state.content.children.length > 1) {
          state.content.removeChild(child);
          state.content = newPage(container);
          state.content.appendChild(child);
        }
      });
    });
    container.removeChild(stage);
    // drop empty trailing pages (a table that moved entirely to a new page leaves none, but be safe)
    Array.prototype.slice.call(container.querySelectorAll(".page")).forEach(function (p) {
      if (!p.querySelector(".page-content").children.length) container.removeChild(p);
    });
    var pages = container.querySelectorAll(".page"), title = "", completed = "";
    pages.forEach(function (p, i) {
      pageStarts.forEach(function (s) { if (s.el === p) { title = s.title; completed = s.completed; } });
      var f = document.createElement("div");
      f.className = "page-foot";
      f.innerHTML = "<span>Patient ID: " + esc(visit.patient_id) + " · " + esc(title) + " · Completed " + esc(E.mdy(completed)) +
        "</span><span>" + esc(footerLabel) +
        " · Page " + (i + 1) + " of " + pages.length + "</span>";
      p.appendChild(f);
    });
    return pages.length;
  }

  /* ---- PDF ------------------------------------------------------------ */
  function makePdf(container, onProgress) {
    var jsPDF = window.jspdf.jsPDF;
    var pdf = new jsPDF({ unit: "pt", format: "letter", orientation: "portrait", compress: true });
    var pages = Array.prototype.slice.call(container.querySelectorAll(".page"));
    var i = 0;
    function next() {
      if (i >= pages.length) return Promise.resolve(pdf.output("blob"));
      if (onProgress) onProgress(i + 1, pages.length);
      return window.html2canvas(pages[i], { scale: 2, backgroundColor: "#ffffff", logging: false, useCORS: false,
                                            width: PAGE_W, height: PAGE_H, windowWidth: PAGE_W })
        .then(function (canvas) {
          if (i > 0) pdf.addPage("letter", "portrait");
          pdf.addImage(canvas.toDataURL("image/jpeg", 0.8), "JPEG", 0, 0, 612, 792);
          i += 1;
          return next();
        });
    }
    return next();
  }

  /* ---- text export (identifiers excluded) ----------------------------- */
  function answerText(f, data) {
    var v = data[f.name];
    if (E.isEmpty(v)) return null;
    if (f.kind === "checkbox") return v.map(function (x) { return E.optionLabel(f.options, x); }).join("; ");
    if (f.kind === "radio") return E.optionLabel(f.options, v);
    if (f.kind === "date") return E.mdy(v);
    return v;
  }

  function sectionsText(sections, visit) {
    var lines = [];
    lines.push("Patient ID: " + (visit.patient_id || ""));
    [["Study ID", "study_id"], ["Letter code", "letter_code"], ["Study Visit", "study_visit"], ["Visit Date", "visit_date"],
     ["Patient Initials", "patient_initials"], ["Evaluator Initials", "evaluator_initials"]].forEach(function (p) {
      if (visit[p[1]]) lines.push(p[0] + ": " + (p[1] === "visit_date" ? E.mdy(visit[p[1]]) : visit[p[1]]));
    });
    sections.forEach(function (sec) {
      lines.push("", "=== " + sec.inst.title + " === (completed " + E.mdy(sec.completedAt) + ")");
      E.leafFields(sec.inst).forEach(function (f) {
        if (f.identifier) return;
        var a = answerText(f, sec.data);
        if (a !== null) lines.push(E.fieldLabel(f) + ": " + a);
      });
      var s = sec.scores;
      if (s) lines.push("[Computed check] " + scoreSummary(sec.inst.key, s));
    });
    return lines.join("\n");
  }

  function scoreSummary(key, s) {
    if (key === "cdr_rating") return s.complete ? "CDR Sum of Boxes " + s.sob + "; algorithm global CDR " + s.global_computed +
      "; entered global CDR " + (s.global_entered || "—") : "CDR boxes incomplete";
    if (key === "ecog12") return "ECog-12 mean " + (s.mean === null ? "—" : s.mean) + " (" + s.n_scored + "/12 items)";
    if (key === "npiq") return "NPI-Q symptoms present " + s.n_present + "/12; total severity " + s.severity_total;
    if (key === "fas") return "FAS total " + (s.total === null ? "—" : s.total) + " (" + s.n_scored + "/10 items scored)";
    return "";
  }

  function emailBody(sections, visit, filename) {
    var lines = ["Completed survey forms", "", "Patient ID: " + (visit.patient_id || "")];
    if (visit.study_visit) lines.push("Study Visit: " + visit.study_visit);
    if (visit.visit_date) lines.push("Visit Date: " + E.mdy(visit.visit_date));
    lines.push("", "Forms included:");
    sections.forEach(function (s) { lines.push("- " + s.inst.title + " (completed " + E.mdy(s.completedAt) + ")"); });
    var sc = sections.filter(function (s) { return s.scores; });
    if (sc.length) {
      lines.push("", "Computed checks (not part of the forms):");
      sc.forEach(function (s) { lines.push("- " + scoreSummary(s.inst.key, s.scores)); });
    }
    lines.push("", "The completed forms are in the attached PDF: " + filename);
    return lines.join("\n");
  }

  window.Report = { buildPages: buildPages, makePdf: makePdf, sectionsText: sectionsText, emailBody: emailBody,
                    PAGE_W: PAGE_W, PAGE_H: PAGE_H };
})();
