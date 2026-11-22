/* App controller. All answers live in memory (the `state` object) only. */
(function () {
  "use strict";
  var E = window.Engine, UI = window.UI, R = window.Report, esc = UI.esc;
  var F = window.FORMS, INSTRUMENTS = F.INSTRUMENTS, PACKETS = F.PACKETS;
  var app = document.getElementById("app");

  var VISIT_FIELDS = [
    ["patient_id", "Patient ID", "text"], ["study_visit", "Study Visit (e.g., Follow-Up)", "text"],
    ["study_id", "Study ID", "text"], ["letter_code", "Letter code", "text"],
    ["visit_date", "Visit Date", "date"], ["patient_initials", "Patient Initials", "initials"],
    ["evaluator_initials", "Evaluator Initials", "initials"]];

  var state;
  function reset() { state = { visit: {}, responses: {} }; }
  reset();

  function hasData() {
    return Object.keys(state.visit).some(function (k) { return state.visit[k]; }) ||
      Object.keys(state.responses).some(function (k) { return Object.keys(state.responses[k].data).length; });
  }
  window.addEventListener("beforeunload", function (e) {
    if (hasData()) { e.preventDefault(); e.returnValue = ""; }
  });

  function resp(key) { return state.responses[key] || { data: {}, status: null }; }
  function isComplete(key) { return resp(key).status === "complete"; }
  function allComplete(keys) { return keys.every(isComplete); }

  /* ---- routing: #/ , #/form/<key> , #/report/<packet|instrument>/<key> ---- */
  function route() {
    var parts = location.hash.replace(/^#\/?/, "").split("/");
    window.scrollTo(0, 0);
    if (parts[0] === "form" && INSTRUMENTS[parts[1]]) return viewForm(parts[1], {});
    if (parts[0] === "report" && (parts[1] === "packet" && PACKETS[parts[2]] || parts[1] === "form" && INSTRUMENTS[parts[2]]))
      return viewReport(parts[1], parts[2]);
    return viewHome();
  }
  window.addEventListener("hashchange", route);

  function badge(key) {
    var r = state.responses[key];
    if (r && r.status === "complete") return '<span class="badge done">Complete</span>';
    if (r && Object.keys(r.data).length) return '<span class="badge prog">In progress</span>';
    return '<span class="badge new">Not started</span>';
  }

  /* ---- home ---------------------------------------------------------- */
  function viewHome() {
    var v = state.visit, h = '<h1>Visit details</h1><form id="visitForm" class="panel visitform" novalidate><div class="grid2">';
    VISIT_FIELDS.forEach(function (f) {
      var type = f[2] === "date" ? "date" : "text";
      h += "<label>" + esc(f[1]) + (f[0] === "patient_id" ? ' <span class="req">*</span>' : "") +
        '<input type="' + type + '" name="' + f[0] + '" value="' + esc(v[f[0]]) + '"' +
        (f[2] === "initials" ? ' maxlength="5" class="initials"' : ' maxlength="50"') +
        (type === "date" ? ' max="' + E.todayISO() + '" min="1900-01-01"' : "") + ' autocomplete="off">' +
        '<span class="field-error" data-err="' + f[0] + '"></span></label>';
    });
    h += '</div><p class="muted small">These header fields are printed on the form pages. Patient ID is required before printing or exporting.</p></form>';

    ["informant", "subject_cdr"].forEach(function (pk) {
      var p = PACKETS[pk];
      h += '<section class="panel"><div class="row-between"><h2>' + esc(p.title) + '</h2><div class="actions">' + outputButtons("packet", pk, p.instruments) +
        '</div></div><table class="list"><thead><tr><th>Form</th><th>Status</th><th></th></tr></thead><tbody>';
      p.instruments.forEach(function (k) {
        var other = pk === "informant" ? PACKETS.subject_cdr.title : PACKETS.informant.title;
        h += '<tr><td><a href="#/form/' + k + '">' + esc(INSTRUMENTS[k].title) + "</a>" +
          (k === "cdr_informant" ? '<div class="muted small">Shared with the ' + esc(other) + " — entered once.</div>" : "") +
          "</td><td>" + badge(k) + '</td><td class="out">' +
          (isComplete(k) ? outputButtons("form", k, [k], true) : '<a href="#/form/' + k + '">' + (state.responses[k] ? "Continue" : "Start") + "</a>") +
          "</td></tr>";
      });
      h += "</tbody></table></section>";
    });
    h += '<section class="panel"><div class="row-between"><h2>Complete visit (all forms)</h2><div class="actions">' +
      outputButtons("packet", "all", PACKETS.all.instruments) + "</div></div></section>";
    app.innerHTML = h;

    var vf = document.getElementById("visitForm");
    vf.addEventListener("input", function () { readVisit(vf); });
    vf.addEventListener("change", function () { readVisit(vf); });
  }

  function readVisit(vf) {
    VISIT_FIELDS.forEach(function (f) {
      var el = vf.elements[f[0]], raw = el.value.trim(), err = "";
      if (f[2] === "initials") raw = raw.toUpperCase();
      if (f[2] === "date" && raw) {
        if (!E.validDateISO(raw)) err = "must be a valid date";
        else if (raw > E.todayISO()) err = "cannot be in the future";
      }
      vf.querySelector('[data-err="' + f[0] + '"]').textContent = err;
      el.setAttribute("aria-invalid", err ? "true" : "false");
      if (err) delete state.visit[f[0]]; else state.visit[f[0]] = raw;
    });
  }

  function outputButtons(kind, key, keys, compact) {
    if (!allComplete(keys)) return compact ? "" : '<span class="muted small">Print, PDF and email unlock when every form here is complete.</span>';
    var href = "#/report/" + kind + "/" + key;
    return compact ? '<a href="' + href + '">Print / PDF / Email</a>'
                   : '<a class="btn" href="' + href + '">Print, PDF or email</a>';
  }

  /* ---- form view ---------------------------------------------------- */
  function viewForm(key, opts) {
    var inst = INSTRUMENTS[key], r = resp(key), ro = r.status === "complete";
    var data = Object.assign({}, r.data);
    var errors = opts.errors || {}, missing = opts.missing || [];
    var miss = {}; missing.forEach(function (f) { miss[f.name] = true; });
    var scores = E.computeScores(key, data);
    var v = state.visit;

    var h = '<p class="crumbs"><a href="#/">← All forms</a></p><div class="formhead"><h1>' + esc(inst.title) + '</h1><div class="ids">' +
      "<span><b>Patient ID:</b> " + esc(v.patient_id || "—") + "</span>";
    if (inst.header === "study") h += "<span><b>Study ID:</b> " + esc(v.study_id || "—") + "</span><span><b>Letter code:</b> " + esc(v.letter_code || "—") + "</span>";
    if (inst.header === "paper") h += "<span><b>Patient Initials:</b> " + esc(v.patient_initials || "—") + "</span><span><b>Visit Date:</b> " +
      esc(E.mdy(v.visit_date) || "—") + "</span><span><b>Evaluator Initials:</b> " + esc(v.evaluator_initials || "—") +
      "</span><span><b>Study Visit:</b> " + esc(v.study_visit || "—") + "</span>";
    h += '</div><div class="status-line">Status: ' + badge(key) + (ro ? " — completed " + esc(E.mdy(r.completedAt)) : "") + "</div></div>";

    if (ro) h += '<div class="panel actions"><a class="btn" href="#/report/form/' + key + '">Print, PDF or email</a>' +
      '<button type="button" class="btn secondary" id="reopenBtn">Reopen for editing</button>' +
      '<span class="muted">This form is complete and locked. Reopen it to make changes.</span></div>';
    if (Object.keys(errors).length) h += '<div class="panel missing-list" role="alert"><strong>Please correct the highlighted answers:</strong><ul>' +
      E.leafFields(inst).filter(function (f) { return errors[f.name]; }).map(function (f) {
        return "<li>" + esc(E.fieldLabel(f)) + " — " + esc(errors[f.name]) + "</li>"; }).join("") + "</ul></div>";
    if (missing.length) h += '<div class="panel missing-list" role="alert"><strong>Required before this form can be marked complete:</strong><ul>' +
      missing.map(function (f) { return "<li>" + esc(E.fieldLabel(f)) + "</li>"; }).join("") + "</ul></div>";
    h += '<div id="scoresPanel"></div>';

    h += '<form class="survey" id="surveyForm" novalidate>' + (inst.intro ? '<p class="intro">' + esc(inst.intro) + "</p>" : "") +
      UI.renderItems(inst.items, { data: data, errors: errors, miss: miss, ro: ro, scores: scores });
    if (!ro) h += '<div class="formfoot"><span class="muted"><span class="req">*</span> required to mark complete. Answers are kept while this tab stays open.</span>' +
      '<div><a class="btn secondary" href="#/">Back to all forms</a> <button type="button" class="btn" id="completeBtn">Mark complete</button></div></div>';
    h += "</form>";
    app.innerHTML = h;

    var form = document.getElementById("surveyForm");
    function sync() {
      var res = UI.readForm(form, inst);
      var cur = state.responses[key] || { status: "in_progress" };
      cur.data = res.data; cur.status = "in_progress";
      state.responses[key] = cur;
      // live format feedback
      form.querySelectorAll("[data-live-err]").forEach(function (n) { n.remove(); });
      form.querySelectorAll('[aria-invalid="true"]').forEach(function (n) { n.removeAttribute("aria-invalid"); });
      Object.keys(res.errors).forEach(function (name) {
        var el = form.querySelector('[name="' + CSS.escape(name) + '"]');
        if (!el) return;
        el.setAttribute("aria-invalid", "true");
        var s = document.createElement("span");
        s.className = "field-error"; s.setAttribute("data-live-err", "1"); s.textContent = res.errors[name];
        (el.closest("label") || el).insertAdjacentElement("afterend", s);
      });
      renderScores(key, res.data);
      return res;
    }
    UI.wireForm(form, ro, ro ? function () {} : sync);
    renderScores(key, data);

    if (ro) {
      document.getElementById("reopenBtn").addEventListener("click", function () {
        state.responses[key].status = "in_progress"; delete state.responses[key].completedAt; viewForm(key, {});
      });
      return;
    }
    document.getElementById("completeBtn").addEventListener("click", function () {
      var res = sync();
      if (Object.keys(res.errors).length) { viewForm(key, { errors: res.errors }); window.scrollTo(0, 0); return; }
      var m = E.missingRequired(inst, res.data);
      if (m.length) { viewForm(key, { missing: m }); window.scrollTo(0, 0); return; }
      state.responses[key] = { data: res.data, status: "complete", completedAt: E.todayISO() };
      location.hash = "#/";
      flash(inst.title + " marked complete.");
    });
  }

  function renderScores(key, data) {
    var el = document.getElementById("scoresPanel"), s = E.computeScores(key, data);
    if (!el) return;
    if (!s) { el.innerHTML = ""; var c0 = document.getElementById("cdrComputed"); if (c0) c0.hidden = true; return; }
    var t = "";
    if (key === "ecog12") t = "items scored " + s.n_scored + "/12 · Don't Know/N/A " + s.n_dk + " · mean " + (s.mean === null ? "—" : s.mean);
    else if (key === "npiq") t = "symptoms present " + s.n_present + "/12 · total severity " + s.severity_total +
      (s.n_severity_unknown ? " (" + s.n_severity_unknown + " severity unknown)" : "");
    else if (key === "fas") t = "total " + (s.total === null ? "—" : s.total) + " (" + s.n_scored + "/10 items scored; N/A " + s.n_na + ", unknown " + s.n_unknown + ")";
    else if (key === "cdr_rating") t = s.complete ? "Sum of Boxes " + s.sob + " · computed global CDR " + s.global_computed +
      (s.mismatch ? " — differs from the entered global CDR" : "") : "enter all six standard boxes to compute";
    el.innerHTML = '<div class="panel scores"><strong>Computed scores</strong> <span class="muted">(not printed on the form; shown as a check)</span>: ' + esc(t) + "</div>";
    var cg = document.getElementById("cdrComputed");
    if (cg && key === "cdr_rating") {
      cg.hidden = !s.complete;
      cg.innerHTML = s.complete ? "Computed from box scores (Washington University algorithm): <strong>" + esc(s.global_computed) +
        "</strong> · CDR Sum of Boxes: <strong>" + esc(s.sob) + "</strong>" +
        (s.mismatch ? ' <span class="warn">Entered value differs from the computed value — please double-check.</span>' : "") : "";
    }
  }

  function flash(msg) {
    var d = document.createElement("div");
    d.className = "flash ok"; d.setAttribute("role", "status"); d.textContent = msg;
    app.insertBefore(d, app.firstChild);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 6000);
  }

  /* ---- report / output ---------------------------------------------- */
  var current = null;

  function viewReport(kind, key) {
    var keys = kind === "packet" ? PACKETS[key].instruments : [key];
    var title = kind === "packet" ? PACKETS[key].title : INSTRUMENTS[key].title;
    if (!allComplete(keys)) {
      app.innerHTML = '<div class="panel"><h1>Not ready yet</h1><p>Print, PDF and email are available once every form included here is marked complete.</p><p><a href="#/">Back to all forms</a></p></div>';
      return;
    }
    if (!state.visit.patient_id) {
      app.innerHTML = '<div class="panel"><h1>Patient ID needed</h1><p>Enter a Patient ID in the visit details before printing or exporting.</p><p><a href="#/">Back to visit details</a></p></div>';
      return;
    }
    var sections = keys.map(function (k) {
      var r = state.responses[k];
      return { inst: INSTRUMENTS[k], data: r.data, completedAt: r.completedAt, scores: E.computeScores(k, r.data) };
    });
    var fname = (state.visit.patient_id + "_" + (state.visit.study_visit || "visit") + "_" + title + "_" + E.todayISO())
      .replace(/[^A-Za-z0-9_-]+/g, "_").replace(/_+/g, "_").slice(0, 120) + ".pdf";
    current = { sections: sections, title: title, filename: fname, blob: null };

    app.innerHTML = '<div class="toolbar no-print"><a href="#/">← All forms</a><strong>' + esc(title) + "</strong> · Patient " + esc(state.visit.patient_id) +
      '<span class="sp"></span><button type="button" class="btn" id="printBtn">Print</button>' +
      '<button type="button" class="btn" id="pdfBtn">Download PDF</button><button type="button" class="btn" id="emailBtn">Email…</button></div>' +
      '<p id="outStatus" class="muted small no-print" role="status"></p><div id="pages" class="pages"></div>';
    var n = R.buildPages(document.getElementById("pages"), sections, state.visit, "Generated " + E.mdy(E.todayISO()));
    setStatus(n + " page" + (n === 1 ? "" : "s") + ". Use Print (or choose “Save as PDF” in the print dialog), Download PDF, or Email.");
    document.getElementById("printBtn").addEventListener("click", function () { window.print(); });
    document.getElementById("pdfBtn").addEventListener("click", function () { getPdf().then(download); });
    document.getElementById("emailBtn").addEventListener("click", openEmail);
  }

  function setStatus(t) { var s = document.getElementById("outStatus"); if (s) s.textContent = t; }

  function getPdf() {
    if (current.blob) return Promise.resolve(current.blob);
    var btns = document.querySelectorAll(".toolbar button");
    btns.forEach(function (b) { b.disabled = true; });
    return R.makePdf(document.getElementById("pages"), function (i, n) { setStatus("Creating PDF… page " + i + " of " + n); })
      .then(function (blob) { current.blob = blob; setStatus("PDF ready: " + current.filename); return blob; })
      .catch(function (e) { setStatus("Could not create the PDF (" + e.message + "). Use Print → Save as PDF instead."); throw e; })
      .finally(function () { btns.forEach(function (b) { b.disabled = false; }); });
  }

  function download(blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = current.filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 30000);
  }

  /* ---- email ---------------------------------------------------------- */
  var dlg = document.getElementById("emailDialog");
  function emailStatus(t) { document.getElementById("emailStatus").textContent = t; }

  function openEmail() {
    emailStatus("");
    var shareBtn = document.getElementById("emailShare");
    var probe = typeof File !== "undefined" && navigator.canShare &&
      navigator.canShare({ files: [new File(["x"], "x.pdf", { type: "application/pdf" })] });
    shareBtn.hidden = !probe;
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }

  function mailtoHref() {
    var to = document.getElementById("emailTo").value.trim();
    var subject = "Completed survey forms — Patient " + state.visit.patient_id + " — " + current.title;
    var body = R.emailBody(current.sections, state.visit, current.filename);
    return "mailto:" + to.split(/[,;\s]+/).filter(Boolean).map(encodeURIComponent).join(",") +
      "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body.replace(/\n/g, "\r\n"));
  }

  document.getElementById("emailGo").addEventListener("click", function () {
    emailStatus("Creating PDF…");
    getPdf().then(function (blob) {
      download(blob);
      var href = mailtoHref();
      window.__lastMailto = href; // for automated tests
      window.location.href = href;
      emailStatus("PDF downloaded as “" + current.filename + "”. Attach it to the email draft that opened. " +
                  "If no draft opened, set up a default email app or use “Copy all answers as text”.");
    }).catch(function () { emailStatus("Could not create the PDF. Use Print → Save as PDF, then attach it manually."); });
  });

  document.getElementById("emailShare").addEventListener("click", function () {
    getPdf().then(function (blob) {
      var file = new File([blob], current.filename, { type: "application/pdf" });
      return navigator.share({ files: [file], title: current.title,
                               text: R.emailBody(current.sections, state.visit, current.filename) });
    }).then(function () { emailStatus("Shared."); }).catch(function (e) {
      if (e && e.name !== "AbortError") emailStatus("Sharing failed: " + e.message);
    });
  });

  document.getElementById("emailCopy").addEventListener("click", function () {
    var text = R.sectionsText(current.sections, state.visit);
    window.__lastCopied = text; // for automated tests
    (navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(text) : Promise.reject(new Error("no clipboard")))
      .then(function () { emailStatus("All answers copied (informant contact details excluded). Paste them into your email."); })
      .catch(function () {
        var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
        var ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
        ta.remove();
        emailStatus(ok ? "All answers copied (informant contact details excluded)." : "Copy failed — your browser blocked clipboard access.");
      });
  });

  document.getElementById("emailClose").addEventListener("click", function () { dlg.close ? dlg.close() : dlg.removeAttribute("open"); });

  /* ---- start over ----------------------------------------------------- */
  document.getElementById("newSessionBtn").addEventListener("click", function () {
    if (hasData() && !window.confirm("Clear every answer on this page and start a new visit? Anything not printed, downloaded or emailed will be lost.")) return;
    reset(); current = null; location.hash = "#/"; viewHome();
  });

  window.__state = function () { return state; }; // read-only hook used by automated tests
  route();
})();
