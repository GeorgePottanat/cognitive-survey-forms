# Cognitive Assessment Survey Forms

Browser-based data entry for a set of informant and Clinical Dementia Rating (CDR) assessment forms, with **print**, **PDF** and **email** output.

**Nothing is stored or sent.** The whole app runs in the user's browser tab:
- There is no server and no database.
- No cookies or browser storage are used.
- No network requests are made after the page loads. The page's Content-Security-Policy blocks them (`connect-src 'none'`).

Closing or reloading the tab clears every answer, so users must print, download or email the forms before they leave. The page warns before it is closed.

## Forms

| Package | Forms |
|---|---|
| **Informant Package** | Consent for Future Contact · Demographics (Informant) · Co-Participant/Informant Questionnaire · ECog-12 (Everyday Cognition): Informant · Neuropsychiatric Inventory Questionnaire (NPI-Q) · Functional Assessment Scale (FAS) · CDR Interview (Informant) |
| **Subject CDR Package** | CDR Interview (Subject) · CDR Interview (Informant) · CDR (Clinical Dementia Rating) rating sheet |

The CDR Interview (Informant) belongs to both packages. It is entered once and included in both outputs.

## Features

- **Faithful forms.** Question wording, option order and printed codes follow the paper forms. Where a form prints a code (`Usually (0)`, `DK (88)`), that code is the stored value.
- **Skip logic.** For example:
  - "Administered? → No" shows the reason fields instead of the questions.
  - "Other (specify)" opens a text box.
  - NPI-Q severity appears only when the answer is "Yes".
  - Hidden answers are discarded.
- **Completion checks.** "Mark complete" lists required answers that are still missing. It rejects invalid entries such as future dates or entering both a number of years and a code. A completed form is locked until it is reopened.
- **Output.** Print, PDF and email unlock once the forms in question are complete. You can output a single form, either package, or the whole visit.
  - **Print** uses the browser's print dialog, which can also "Save as PDF".
  - **Download PDF** builds the PDF in the browser.
  - Both use the same paginated letter-size pages shown on screen, laid out like the paper forms: marked boxes and shaded CDR cells.
- **Email.**
  - Downloads the PDF and opens a pre-filled draft in the user's own email app, with a summary and the PDF's file name. The user attaches the PDF.
  - On devices that support it, **Share PDF…** attaches the file directly.
  - **Copy all answers as text** puts every answer on the clipboard so it can be pasted into an email.
  - Informant contact details (name, address, phone, email) are never included in email text.
- **Computed checks.** These are labelled "not part of form" and never replace what was entered:
  - **CDR:** Sum of Boxes, and the global CDR from the Washington University (Morris) algorithm, with a warning when it differs from the entered global CDR.
  - **ECog-12:** mean score.
  - **NPI-Q:** symptom count and total severity.
  - **FAS:** total.

## Use it locally

No build step is needed. Serve the folder with any static web server:

```bash
python3 -m http.server 8000      # then open http://localhost:8000
```

Opening `index.html` directly from disk also works in most browsers.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**, and under **Source** choose **GitHub Actions**.
3. Each push to `main` then runs the tests and publishes the site through `.github/workflows/pages.yml`.

The site URL is `https://<user>.github.io/<repo>/`.

On a free GitHub account the repository must be **public** for Pages to work. Private repositories need a paid plan. A published Pages site is publicly viewable either way.

## Tests

```bash
npm test                         # engine + scoring unit tests (Node 18+)
python3 -m http.server 8000 &    # end-to-end browser test (needs: pip install playwright, and Chrome)
python3 tests/e2e.py http://127.0.0.1:8000/
```

**Unit tests** cover:
- the global-CDR rules, including the official tie example
- Sum of Boxes and ECog/NPI-Q/FAS scoring
- skip logic and required-answer rules
- validation

**The end-to-end test**:
- fills every form through the real UI and completes it
- checks that pages don't clip, and that Print and the PDF produce the same pages at US Letter size
- checks the email draft and that it leaves out contact details
- checks that nothing is stored and no request leaves the site

## Project layout

```
index.html          page shell, Content-Security-Policy
js/forms-data.js    form definitions (wording, options, codes, skip logic)
js/engine.js        visibility rules, parsing, validation, scoring (pure; unit-tested)
js/ui.js            form rendering
js/report.js        paper-style pages, pagination, PDF, text/email export
js/app.js           in-memory state, navigation, print/PDF/email actions
css/                app and print styles
vendor/             jsPDF 4.2.1 and html2canvas 1.4.1 (MIT), bundled so no CDN is contacted
tests/              unit and end-to-end tests
```

## Notes on the forms

Kept exactly as printed on the source forms:
- CDR Interview (Informant) items 47–50 use `DK = 8`.
- CDR Interview (Subject) item 29 refers to "(item #22)" for the "why are you here" question.
- The CDR rating sheet numbers the global score "8.".

Other decisions:
- ECog-12 answers are stored as 1–4 and FAS answers as 0–3, following each scale's published scoring. The paper forms don't print these codes.
- Answers with no printed code are stored as their labels.
- Personal Care has no 0.5 option, matching the CDR rating sheet.
- Race allows multiple selections.

## Credits

The assessment content comes from the developers of each instrument:
- **CDR:** Morris, Washington University Knight ADRC
- **NPI-Q:** Kaufer & Cummings
- **ECog:** Farias et al.
- **FAS:** based on the Functional Activities Questionnaire, Pfeffer et al.

Check each instrument's terms of use for your setting. The application code is released under the MIT License (see `LICENSE`). jsPDF and html2canvas are MIT-licensed; their license files are in `vendor/`.
