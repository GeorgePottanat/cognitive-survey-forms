"""End-to-end browser test (Playwright + Chrome).
Usage: python3 -m http.server 5077 &  then  python3 tests/e2e.py [base_url]"""
import sys, re, json
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:5077/"
FILL = r"""
async (key) => {
  const E = window.Engine, inst = window.FORMS.INSTRUMENTS[key];
  const OV = {administered:"yes", collected:"yes", lives_with:"no", discontinued:"no", participant_consent:"no",
              m8h:"1", h17:"1", c45:"1", language:"other", co_participant:"other", m8f:"7", c35b:"6", j12:"worse_other"};
  const form = document.getElementById("surveyForm"), data = {};
  const fire = el => el.dispatchEvent(new Event("change", {bubbles:true}));
  for (const f of E.leafFields(inst)) {
    if (!E.allTrue(f.conds, data)) continue;
    if (f.item.exclusive_with) continue;
    const it = f.item, n = f.name;
    const sel = '[name="' + CSS.escape(n) + '"]';
    if (f.kind === "radio") {
      const vals = f.options.map(o => o.v);
      let v = (n in OV && vals.includes(OV[n])) ? OV[n] : n.endsWith("_sev") ? "2" : it.type === "npi" ? "yes"
            : it.type === "cdr_global" ? "0.5" : it.type === "cdr_table" ? (vals.includes("0.5") ? "0.5" : "0") : vals[0];
      const el = form.querySelector(sel + '[value="' + CSS.escape(v) + '"]');
      if (!el) throw new Error("no input " + n + "=" + v);
      if (el.disabled) throw new Error("disabled " + n);
      el.checked = true; fire(el); data[n] = v;
    } else if (f.kind === "checkbox") {
      form.querySelectorAll(sel).forEach(el => { el.checked = true; fire(el); });
      data[n] = f.options.map(o => o.v);
    } else {
      const v = f.kind === "date" ? "2026-11-01" : f.kind === "number" ? "3" : f.kind === "month" ? "05"
              : f.kind === "year" ? "1950" : f.kind === "initials" ? "GP" : "answer " + n;
      const el = form.querySelector(sel);
      if (!el || el.disabled) throw new Error("missing/disabled " + n);
      el.value = v; fire(el); data[n] = v;
    }
  }
  return data;
}
"""
fails = []
def check(cond, msg):
    print(("PASS " if cond else "FAIL ") + msg)
    if not cond: fails.append(msg)

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    ctx = b.new_context(accept_downloads=True, viewport={"width": 1280, "height": 900})
    pg = ctx.new_page()
    errs, requests = [], []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.on("request", lambda r: requests.append(r.url))
    pg.goto(BASE); pg.wait_for_selector("#visitForm")

    # visit details
    for n, v in [("patient_id", "PT-0001"), ("study_id", "1234"), ("letter_code", "ABCDEF"), ("study_visit", "Follow-Up"),
                 ("patient_initials", "jd"), ("evaluator_initials", "gp")]:
        pg.fill(f"#visitForm input[name={n}]", v)
    pg.fill("#visitForm input[name=visit_date]", "2026-11-10")
    pg.locator("#visitForm input[name=visit_date]").dispatch_event("change")
    st = pg.evaluate("window.__state().visit")
    check(st.get("patient_initials") == "JD" and st.get("visit_date") == "2026-11-10", "visit details captured")

    # gating before completion
    pg.goto(BASE + "#/report/packet/all"); check("Not ready yet" in pg.inner_text("#app"), "export blocked until complete")

    # incomplete -> missing list
    pg.goto(BASE + "#/form/ecog12"); pg.wait_for_selector("#surveyForm")
    pg.check("input[name=administered][value=yes]"); pg.click("#completeBtn")
    check("Required before this form can be marked complete" in pg.inner_text("#app"), "missing-required list shown")
    check(pg.evaluate("window.__state().responses.ecog12.status") == "in_progress", "incomplete form stays in progress")

    # future date -> error
    pg.goto(BASE + "#/form/fas"); pg.wait_for_selector("#surveyForm")
    pg.check("input[name=administered][value=yes]"); pg.fill("input[name=eval_date]", "2999-01-01")
    pg.locator("input[name=eval_date]").dispatch_event("change")
    check("cannot be in the future" in pg.inner_text("#surveyForm"), "future date flagged live")

    # fill and complete every form
    keys = pg.evaluate("window.FORMS.ALL_ORDER")
    for k in keys:
        pg.goto(BASE + "#/form/" + k); pg.wait_for_selector("#surveyForm")
        expected = pg.evaluate(FILL, k)
        pg.click("#completeBtn"); pg.wait_for_timeout(100)
        r = pg.evaluate(f"window.__state().responses['{k}']")
        ok = r["status"] == "complete" and all(r["data"].get(n) == v for n, v in expected.items())
        if not ok:
            print(k, r["status"], pg.inner_text("#app")[:600])
            print({n: (v, r["data"].get(n)) for n, v in expected.items() if r["data"].get(n) != v})
        check(ok, f"{k}: filled through UI, completed, all {len(expected)} answers stored")

    # completed is locked & reopen
    pg.goto(BASE + "#/form/consent"); pg.wait_for_selector("#reopenBtn")
    check(pg.is_disabled("input[name=participant_consent][value=yes]"), "completed form is read-only")

    # CDR computed values
    s = pg.evaluate("Engine.cdrScores(window.__state().responses.cdr_rating.data)")
    check(s["sob"] == "2.5" and s["global_computed"] == "0.5", "CDR SOB 2.5 / global 0.5")

    # report
    pg.goto(BASE + "#/report/packet/all"); pg.wait_for_selector(".page")
    n_pages = pg.locator(".page").count()
    check(n_pages >= 15, f"full visit paginated into {n_pages} letter pages")
    over = pg.evaluate("Array.from(document.querySelectorAll('.page-content')).filter(c => c.scrollHeight > c.clientHeight + 1).length")
    check(over == 0, "no page content overflows/clips")
    html = pg.content()
    check("answer first_name" in html, "identifiers printed on demographics page")
    check("PT-0001" in pg.inner_text(".page-foot >> nth=0"), "page footer shows patient ID")
    pg.screenshot(path="/tmp/e2e_report.png", full_page=False)

    # browser Print uses the same pages (print stylesheet -> one sheet per page)
    printed = pg.pdf(prefer_css_page_size=True, print_background=True)
    open("/tmp/e2e_print.pdf", "wb").write(printed)
    import subprocess
    pinfo = subprocess.run(["pdfinfo", "/tmp/e2e_print.pdf"], capture_output=True, text=True).stdout
    pp = int(re.search(r"Pages:\s+(\d+)", pinfo).group(1))
    check(pp == n_pages and "612 x 792" in pinfo, f"browser print: {pp} letter pages = preview pages")
    pg.emulate_media(media="screen")

    # PDF download
    with pg.expect_download(timeout=120000) as dl:
        pg.click("#pdfBtn")
    path = dl.value.path(); data = open(path, "rb").read()
    check(data[:5] == b"%PDF-", f"PDF downloaded ({len(data)//1024} KB) as {dl.value.suggested_filename}")
    import subprocess
    info = subprocess.run(["pdfinfo", path], capture_output=True, text=True).stdout
    pages_pdf = int(re.search(r"Pages:\s+(\d+)", info).group(1))
    check(pages_pdf == n_pages, f"PDF has {pages_pdf} pages = preview pages")
    check("612 x 792" in info, "PDF page size is US Letter")
    open("/tmp/e2e.pdf", "wb").write(data)

    # email
    pg.click("#emailBtn"); pg.fill("#emailTo", "coordinator@example.org")
    pg.route("mailto:*", lambda r: r.abort())
    with pg.expect_download(timeout=120000):
        pg.click("#emailGo")
    pg.wait_for_function("window.__lastMailto")
    m = pg.evaluate("window.__lastMailto")
    from urllib.parse import unquote
    body = unquote(m)
    check(m.startswith("mailto:coordinator%40example.org?subject="), "mailto addressed correctly")
    check("PT-0001" in body and "Forms included" in body and ".pdf" in body, "email body has summary + PDF name")
    check("answer first_name" not in body and "answer email" not in body, "email excludes informant identifiers")
    check(len(m) < 4000, f"mailto length {len(m)} chars (safe for mail clients)")
    pg.click("#emailCopy"); pg.wait_for_function("window.__lastCopied")
    txt = pg.evaluate("window.__lastCopied")
    check("answer m1" in txt and "answer first_name" not in txt and "Sum of Boxes 2.5" in txt, "copy-as-text has answers, no identifiers")
    pg.click("#emailClose")

    # nothing stored, nothing sent
    stor = pg.evaluate("[localStorage.length, sessionStorage.length, document.cookie]")
    check(stor == [0, 0, ""], "no localStorage/sessionStorage/cookies used")
    ext = [u for u in requests if not u.startswith(BASE) and not u.startswith("blob:") and not u.startswith("data:") and not u.startswith("mailto:")]
    check(ext == [], f"no requests outside the site ({len(requests)} total)")
    check(not errs, f"no JS errors {errs[:3]}")

    # start over clears
    pg.on("dialog", lambda d: d.accept())
    pg.click("#newSessionBtn")
    check(pg.evaluate("Object.keys(window.__state().responses).length") == 0, "Start over clears all answers")
    b.close()

print("\n%d failure(s)" % len(fails))
sys.exit(1 if fails else 0)
