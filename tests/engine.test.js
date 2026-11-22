// Run: node --test tests/
const test = require("node:test");
const assert = require("node:assert/strict");
const E = require("../js/engine.js");
global.window = {};
require("../js/forms-data.js");
const { INSTRUMENTS } = window.FORMS;

// Global CDR rules from the Knight ADRC "CDR scoring rules" (Morris 1993).
const CDR_CASES = [
  // M = 0: 0 unless >= 2 secondary >= 0.5
  [0, [0, 0, 0, 0, 0], 0], [0, [0.5, 0, 0, 0, 0], 0], [0, [0.5, 0.5, 0, 0, 0], 0.5], [0, [3, 3, 3, 3, 3], 0.5],
  // M = 0.5: 0.5 or 1; 1 if >= 3 secondary >= 1
  [0.5, [0, 0, 0, 0, 0], 0.5], [0.5, [1, 1, 0.5, 0, 0], 0.5], [0.5, [1, 1, 1, 0, 0], 1],
  [0.5, [3, 3, 3, 3, 3], 1], [0.5, [2, 2, 2, 0.5, 0.5], 1],
  // M >= 1: >= 3 equal M -> M
  [1, [1, 1, 1, 0, 0], 1], [2, [2, 2, 2, 3, 3], 2],
  // majority on one side
  [1, [0.5, 0.5, 0.5, 1, 1], 0.5], [2, [3, 3, 3, 2, 2], 3], [1, [2, 2, 2, 2, 1], 2],
  [2, [1, 1, 1, 1, 1], 1], [3, [2, 2, 2, 2, 2], 2],
  // 3/2 split across M -> M
  [1, [2, 2, 2, 0.5, 0.5], 1], [2, [0.5, 1, 1, 3, 3], 2],
  // ties -> closest to M (official example: M=3, one SC=3, two 2, two 1 -> 2)
  [3, [3, 2, 2, 1, 1], 2], [1, [2, 2, 3, 3, 1], 2],
  // 1-2 equal M, no more than two on either side -> M
  [2, [2, 1, 1, 3, 3], 2], [1, [1, 0.5, 2, 2, 0.5], 1],
  // M >= 1 never 0
  [1, [0, 0, 0, 1, 1], 0.5], [2, [0, 0, 0, 0, 0], 0.5], [3, [0, 0, 0, 3, 3], 0.5], [1, [0, 0, 0.5, 0.5, 0.5], 0.5],
];

test("global CDR algorithm", () => {
  for (const [m, sc, exp] of CDR_CASES) assert.equal(E.globalCdr(m, sc), exp, `M=${m} SC=${sc}`);
});

test("global CDR rejects bad input", () => {
  assert.throws(() => E.globalCdr(1.5, [0, 0, 0, 0, 0]));
  assert.throws(() => E.globalCdr(1, [0, 0, 0, 0]));
});

test("CDR sum of boxes and mismatch", () => {
  const d = { memory: "0.5", orientation: "0.5", judgment: "0.5", community: "0", home_hobbies: "0", personal_care: "0", global_cdr: "0.5" };
  let s = E.cdrScores(d);
  assert.equal(s.sob, "1.5"); assert.equal(s.global_computed, "0.5"); assert.equal(s.mismatch, false);
  d.global_cdr = "1"; assert.equal(E.cdrScores(d).mismatch, true);
  delete d.memory; s = E.cdrScores(d);
  assert.equal(s.sob, null); assert.equal(s.mismatch, false);
  const all3 = Object.fromEntries(["memory", "orientation", "judgment", "community", "home_hobbies", "personal_care"].map(k => [k, "3"]));
  assert.equal(E.cdrScores(all3).sob, "18"); assert.equal(E.cdrScores(all3).global_computed, "3");
});

test("ECog, NPI-Q, FAS scoring", () => {
  const e = Object.fromEntries([...Array(12)].map((_, i) => [`q${i + 1}`, "2"])); e.q12 = "dk";
  assert.deepEqual(E.ecogScores(e), { n_scored: 11, n_dk: 1, total: 22, mean: 2 });
  const n = Object.fromEntries([...Array(12)].map((_, i) => [`q${i + 1}`, "no"]));
  Object.assign(n, { q1: "yes", q1_sev: "3", q2: "yes", q2_sev: "unknown", q3: "unknown" });
  assert.deepEqual(E.npiqScores(n), { n_present: 2, n_unknown_presence: 1, severity_total: 3, n_severity_unknown: 1 });
  const f = Object.fromEntries([...Array(10)].map((_, i) => [`q${i + 1}`, "0"]));
  Object.assign(f, { q1: "3", q2: "2", q3: "na", q4: "unknown" });
  assert.deepEqual(E.fasScores(f), { n_scored: 8, total: 5, n_na: 1, n_unknown: 1 });
});

function form(obj) {
  return [n => (Array.isArray(obj[n]) ? "" : obj[n] || ""), n => (Array.isArray(obj[n]) ? obj[n] : obj[n] ? [obj[n]] : [])];
}

test("hidden fields are dropped", () => {
  const [g, gl] = form({ administered: "no", not_admin_reason: "verbal_refusal", q1: "yes", q1_sev: "3", eval_date: "2026-01-01" });
  const r = E.parse(INSTRUMENTS.npiq, g, gl, "2026-11-11");
  assert.deepEqual(r.data, { administered: "no", not_admin_reason: "verbal_refusal" });
});

test("validation errors", () => {
  let [g, gl] = form({ administered: "yes", eval_date: "2999-01-01" });
  assert.equal(E.parse(INSTRUMENTS.fas, g, gl, "2026-11-11").errors.eval_date, "cannot be in the future");
  [g, gl] = form({ administered: "yes", eval_date: "2026-02-30" });
  assert.equal(E.parse(INSTRUMENTS.fas, g, gl, "2026-11-11").errors.eval_date, "must be a valid date");
  [g, gl] = form({ participant_consent: "maybe" });
  assert.equal(E.parse(INSTRUMENTS.consent, g, gl).errors.participant_consent, "invalid choice");
  [g, gl] = form({ m3_years: "2", m3_code: "88" });
  assert.match(E.parse(INSTRUMENTS.cdr_subject, g, gl).errors.m3_code, /either the number of years or a code/);
  [g, gl] = form({ education_years: "12.5" });
  assert.equal(E.parse(INSTRUMENTS.informant_demographics, g, gl).errors.education_years, "must be a whole number");
  [g, gl] = form({ administered: "yes", personal_care: "0.5" });
  assert.equal(E.parse(INSTRUMENTS.cdr_rating, g, gl).errors.personal_care, "invalid choice");
});

test("required rules", () => {
  const ecog = INSTRUMENTS.ecog12;
  let miss = E.missingRequired(ecog, { administered: "yes", eval_date: "2026-01-01", q1: "1" }).map(f => f.name);
  assert.ok(miss.includes("q2") && miss.includes("discontinued"));
  miss = E.missingRequired(ecog, { administered: "yes", eval_date: "2026-01-01", q1: "1", discontinued: "yes", discontinued_reason: "refusal" });
  assert.deepEqual(miss, []);
  const npi = { administered: "yes", eval_date: "2026-01-01" };
  for (let i = 1; i <= 12; i++) npi[`q${i}`] = "no";
  npi.q5 = "yes";
  assert.deepEqual(E.missingRequired(INSTRUMENTS.npiq, npi).map(f => f.name), ["q5_sev"]);
  assert.deepEqual(E.missingRequired(INSTRUMENTS.fas, { administered: "yes", eval_date: "2026-01-01", language: "other",
    ...Object.fromEntries([...Array(10)].map((_, i) => [`q${i + 1}`, "0"])) }).map(f => f.name), ["language_other"]);
});

test("identifier fields are flagged", () => {
  assert.deepEqual(E.identifierNames(INSTRUMENTS.informant_demographics),
    ["first_name", "last_name", "address", "city", "state", "zip", "home_phone", "cell_phone", "email"]);
});
