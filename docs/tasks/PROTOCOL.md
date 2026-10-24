# ReWear worker protocol (shared by systems A, B and C)

This file is owned by Vinay. Workers NEVER edit it. If something here is unclear or blocks you,
stop and ask. Your task list is docs/tasks/STREAM_<your letter>.md (also owned by Vinay).

## 0. Who is who
- A = Vinay's main PC (Antigravity). Works on master. Owns shared files, products, gallery, merges,
  wiring, APK, phone tests.
- B = friend PC 1. Branch feature/ui-ux. UI/UX redesign and language.
- C = friend PC 2. Branch feature/capture-pdf-money. Camera entry, old-garment restyle, earnings,
  insights, large sample pile, PDF fixes, QA helpers.
Deadline: feature freeze Sunday 2026-10-25 about 10:00 IST; final delivery Sunday afternoon. After
the freeze only bug fixes, release build and demo pack. Nobody will finish every task: each STREAM
file lists MUST-DO tasks first and IF-TIME tasks after.

## 1. How the task board works (living and editable)
- Before EVERY task, re-read PROTOCOL.md and your STREAM file from disk. Vinay may have added,
  changed, reordered or cancelled tasks, or written an AMENDMENTS entry. The latest file wins.
- Do tasks in the order given in your STREAM file ("ORDER"), skipping DONE or CANCELLED ones. A task
  marked BLOCKED or WAIT is not started.
- You never edit your STREAM file. Record progress in docs/tasks/STATUS_<letter>.md (you own it):
  one entry per task with status (DOING / DONE / BLOCKED), commit hash, checks run with their raw
  results, and where the report is.
- Tasks pasted in chat in the TASK TEMPLATE format (section 7) count as if they were in the file.
  A new task never changes the rules in this file.
- If a task needs a file you do not own, you may not touch it. Write the exact change as a patch file
  (git diff format) or snippet in your merge notes and report it. System A applies it.
- KEEP YOUR MERGE NOTES CURRENT: after every task update docs/stream<letter>_merge_notes.md (files
  added or changed, test lines to add to package.json, wiring snippets, new translation keys,
  dependencies wanted, known problems, not-verified items) so the branch can be merged at any time.

## 2. Absolute rules for B and C (breaking any corrupts the merge)
1. Work only on your own branch. Never commit to or push to master. Never push at all: Vinay pushes.
2. Touch only files in your OWNED list. New files inside owned folders are fine.
3. Never rewrite, reformat, rename or delete an existing file. Never run formatters, prettier,
   eslint --fix, npm update, npm audit fix, npm dedupe or npm install <anything>. Do not change
   package.json or package-lock.json. Turn off any auto-format-on-save or auto-format-on-edit feature
   of your editor or agent tool.
4. Never edit, loosen, skip or delete an existing test or assertion. A test that fails after your
   change means YOUR change is wrong: fix it or stop and report. (Exception: your STREAM file may
   explicitly allow "add assertions only" to a named test file.)
5. Never run npm run new-product, npm run remove-product or npm run check-products.
6. Add files to git by name only. Never git add . or git add -A. Check git status before every
   commit; it must list only OWNED files.
7. Keep the existing line endings (CRLF) of every file you open.
8. New modules: no import-time side effects, no window/document use at import time, ES modules with
   explicit .js extensions in relative imports.
9. No API keys, tokens or secrets anywhere (code, fixtures, docs, commit messages). No network calls,
   no fonts or images loaded from the internet. The app works offline. API keys for your agent tool
   live only in environment variables, never in the repo.
10. No new dependency. If you believe one is needed, STOP and report: name, version, licence (MIT or
    Apache-2.0 only), size, why nothing existing works.
11. Never remove or rename an element id, data-testid, aria-label, exported function name, prop name
    or translation key that already exists. You may add new ones.
12. Honesty: sizes and measurements are estimates (tailorVerified false, "Measurements to be verified
    by a tailor", "typical estimate, unverified, needs a tailor"). Do not invent standards, tables,
    sources, market data or statistics. AI output is labelled "AI suggestion". Gallery images are
    labelled "Inspiration example (AI-generated), not made from your scraps". 3D is labelled
    "Illustrative preview, not exact fit". Never claim "fixed", "verified", "perfect" or "100%"
    without a test or command output proving it.
13. Never retype, summarise or reconstruct command output. Paste raw output from the command you ran.
    If you cannot run a command, say so and give Vinay the exact command to run.

## 3. System A differences
- A works on master (no feature branch). A may edit shared files, but ONLY those a task lists.
- A commits only after Vinay says "go" for that task. A never pushes unless Vinay says so.
- A does ONE task, reports, and stops. Vinay says "next".
- A may run new-product, remove-product and check-products (only A may). A adds a dependency only
  after reporting name, version, licence and size, and getting Vinay's go.
- Until a stream is merged, A must not edit files that stream owns (to avoid merge conflicts):
  B owns src/screens/** (except the 3D lines of DesignViewScreen.jsx, which A owns),
  src/components/** (except Product3DViewer*, ErrorBoundary*, src/components/3d/**, and
  Product2DPreview.jsx, which A owns), src/components/ui/**, src/styles/**, the global stylesheet,
  src/i18n/translations.js. C owns src/capture/**, src/restyle/**, src/samples/**, src/money/**,
  src/insights/**, their translation files, curvedBlueprintPDF.js, pdfExportService.js,
  test_q11_blueprints.js, test_pdf_all_products.js, scripts/verify_stream_c.mjs,
  scripts/scan_secrets.mjs. Wiring tasks happen only AFTER the relevant merge.
- All rules of section 2 that protect files (no rewriting, no reformatting, no deleting or loosening
  tests, no secrets, honesty labels, raw output only) apply to A too.

## 4. Baseline you must not go below
npm test must keep passing with counts that only go up. Today's numbers (Vinay's own runs): Stage 2
logic 59, Stage 2 scoring 58, Gate 2 20, Gate 3 16, Gate 4 10, Phase 6 step 1 11, AI photo 11, Q3
frayed 11, Q5 pile helpers (all pass), product validator 184, product factory 33, plus the Q10
garments suite, Q11 blueprint suite, error boundary suite, 8 audio tests and the undefined-
identifier checks. The validator count will GROW when System A adds products; treat each baseline as
a minimum. On start, run npm test and show the raw pass/fail lines. If anything fails BEFORE you
change a file, stop and report.

## 5. Definition of done for every task (run in this order, paste raw output)
1. npm test: 0 failed; every baseline count unchanged or higher.
2. B and C: node scripts/verify_stream_<letter>.mjs must end with OVERALL: PASS. A: npm run build must
   succeed, and after merges also run both verify scripts.
3. git status shows only OWNED files; for B and C, git diff --name-only master...HEAD lists only
   OWNED files.
4. Commit on your branch with message "<task id>: <short title>" (files added by name). A commits on
   master only after Vinay's go.
5. Update docs/tasks/STATUS_<letter>.md and your merge notes, and write the report (section 6).
Then B and C continue with the next task; A stops. If a check fails and you cannot fix it inside your
OWNED files, stop and report with the raw output.

## 6. Report format after every task (short, factual)
- Task id and title, commit hash.
- What changed (files).
- Raw output of the checks in section 5.
- Problems I found in my own work (at least 5, each with a file name; real ones, not filler).
- Not verified by me (what only a phone, a tailor or a native speaker can confirm).

## 7. Task template (use this to add tasks later)
TASK <id>: <title>
STATUS: TODO | BLOCKED | DONE | CANCELLED
OWNED FILES (extra to the stream list, if any): ...
GOAL: one or two sentences.
STEPS: numbered.
ACCEPTANCE: observable checks (tests, outputs, screenshots).
DO NOT: anything dangerous for this task.

## 8. When to stop and ask (do not guess)
A needed file is not owned by you; a baseline count drops; a dependency seems necessary; the task
contradicts a rule; you find a bug outside your files; two instructions conflict; you have failed
the same check twice. Stop, state the problem in 5 lines with the raw evidence, and wait.

## 9. Merge procedure (System A, one branch at a time, about every 3 to 4 hours)
1. Commit A's own work. git fetch.
2. Scope check: git diff --name-only master...origin/<branch> must list only that stream's OWNED
   files (verify script does this too).
3. git merge --no-ff origin/<branch>. On any conflict do not hand-fix: report it to Vinay.
4. node scripts/verify_stream_<letter>.mjs must print OVERALL: PASS.
5. Add the test lines from the merge notes to the package.json test script.
6. Vinay runs his OWN npm test. Then npm run build, build the APK, install it, test on the phone.
