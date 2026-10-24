# STREAM C: camera entry, old-garment restyle, earnings, insights, PDF fixes, QA (owned by Vinay; workers never edit this file)

BRANCH: feature/capture-pdf-money          (create from master)
LETTER: C

## ORDER
MUST-DO (in this order): C0, C1, C2, C3, C4, C5, C6.
IF TIME: C7 (planner part), C8.
Keep docs/streamC_merge_notes.md current after EVERY task. Whenever you finish a task the branch must be
mergeable as it stands.

## OWNED FILES (you may edit or create only these)
- src/capture/**  src/restyle/**  src/samples/**  src/money/**  src/insights/**   (all new)
- src/i18n/captureTranslations.js  restyleTranslations.js  moneyTranslations.js  insightsTranslations.js (new)
- src/utils/curvedBlueprintPDF.js   src/utils/pdfExportService.js
- src/utils/test_q11_blueprints.js  (ADD assertions only; never remove or loosen any)
- src/utils/test_pdf_all_products.js   (new)
- scripts/verify_stream_c.mjs   scripts/scan_secrets.mjs   scripts/test_scan_secrets.mjs   (new)
- docs/streamC_*   docs/pdf_review/**   docs/PRIVACY.md   docs/DEMO_SCRIPT.md   docs/UNUSED_FILES_REPORT.md
  docs/tasks/STATUS_C.md
NOT OWNED (never edit): src/App.jsx, any screen or component, src/engine/** (read only), src/gallery/**,
src/utils/tailorBlueprintData.js and every other src/utils file not listed above, products/**, public/**,
package.json, package-lock.json, android/**, any existing test (except the add-only exception above).

## TASKS

TASK C0: verify script
STATUS: TODO
GOAL: one command that proves a merge is safe.
STEPS: create scripts/verify_stream_c.mjs that (1) fails if any file in git diff --name-only master...HEAD
(plus uncommitted files) is outside the OWNED list (allowed list as a regex array in the script); (2) runs
npm test, fails on any failure, compares the numbers it prints with the baseline in PROTOCOL.md section 4
(table suite / baseline / found; each baseline number must appear or be higher); (3) runs npm run build;
(4) runs npx oxlint -A all -D no-undef on src/capture src/restyle src/samples src/money src/insights
src/utils/curvedBlueprintPDF.js src/utils/pdfExportService.js scripts; (5) compiles every .jsx under
src/capture and src/restyle with npx esbuild (jsx automatic, react external, output to the null device);
(6) prints a PASS/FAIL line per check and ends with OVERALL: PASS or OVERALL: FAIL (exit code 1 on fail).
Also create docs/streamC_merge_notes.md and docs/tasks/STATUS_C.md.
ACCEPTANCE: OVERALL: PASS on the clean branch with the baseline table.
DO NOT: add dependencies; edit package.json.

TASK C1: PDF export bugs
STATUS: TODO
GOAL: the in-app PDF export works on the phone and the 10 rectangle PDFs are trustworthy.
STEPS:
1. On the real phone the export shows a red error: "Standard font Helvetica is not registered. Call
   registerStdFonts() before using it" (pdfkit browser build). Find how that build wants standard fonts
   registered and fix it in pdfExportService.js (and curvedBlueprintPDF.js if needed) without breaking the
   Node path. Prove it with a Node test that runs the SAME code path the browser uses (in-memory document, no
   fs) and gets a valid PDF with text on page 1.
2. Before and after any PDF change, generate PDFs for tank, skirt and kids top (same functions as
   generate_blueprint_pdfs.js; do not edit that script) and compare page counts and the extracted text of
   page 1; report both numbers (they must match).
3. The 10 rectangle products use a generic generator (getRectangularGarmentPieceList and renderBlueprintDoc).
   Check whether the piece sizes already include the 1 cm seam allowance; if they do, stop adding another.
   Print for tote_bag and scrunchie: finished size, cut size, size drawn on the page.
4. src/utils/test_pdf_all_products.js: for ALL products the engine knows today (13), always generate a fresh
   PDF (never read an old file) and assert page 1 text contains the 10 cm test square label, the tailor
   disclaimer and the last three words of every step; print page counts.
5. kids_frock and table_runner are 17 pages: reduce only if pieces stay 1:1 scale; otherwise leave and say why.
6. Render page 1 of tote_bag, kids_frock, scrunchie, table_runner to PNG in docs/pdf_review/.
ACCEPTANCE: raw outputs for each item; verify passes. Put the exact npm test line for
test_pdf_all_products.js in the merge notes.

TASK C2: earnings logic
STATUS: TODO
GOAL: rank products by how much a tailor can earn.
STEPS: pure functions in src/money/earnings.js: input = a design result (as the engine returns it for one
product and size) plus a "my prices" object; output = estimated selling price, material cost (scraps = 0,
extras from the existing price helper values), labour minutes (from the existing estimated minutes),
earning per hour, and a short reason. Default prices are copied from the existing price helper and labelled
"typical estimate, unverified, needs a tailor"; the tailor can edit them (a defaults object plus an
overrides object; a missing value falls back and is flagged). Provide sortProducts(designs, prices, mode)
with modes best-fit, best-earning, fastest. Read the existing price helper to find where its numbers live
(do not edit it). Do not invent market data or sales statistics. Add src/i18n/moneyTranslations.js (en, hi, te).
Tests: ordering correct on hand-made examples, a missing price falls back and is flagged, no division by
zero when minutes are 0, an integration test with the real engine on the existing sample piles.
ACCEPTANCE: raw test output; verify passes; wiring snippets in the merge notes.

TASK C3: camera-assisted scrap entry
STATUS: TODO
GOAL: take a photo of a scrap and add it without typing the colour.
STEPS: src/capture/colorDetect.js (pure: RGBA pixel data plus width and height in, dominant colour hex and a
rough colour name out, and "plain" or "printed" with a documented variance threshold; ignore near-
transparent pixels); src/capture/scrapFromPhoto.js (builds a scrap object in EXACTLY the shape the engine
uses: read src/utils/pileHelpers.js and src/screens/MyPileScreen.jsx to copy field names and units; the size
is always typed by the user and never guessed from the photo); src/capture/CaptureScrapPanel.jsx (thin UI:
choose a photo, show the detected colour, let the user edit colour name, width, height, fabric, stretch and
print, then call an onAdd(scrap) prop; the photo comes from a takePhoto prop function, default: a hidden file
input with accept="image/*" and capture="environment"; do NOT import @capacitor/camera or anything that is
not in package.json); src/i18n/captureTranslations.js (en, hi, te). src/capture/test_capture.js: colour
detection on generated pixel arrays (solid, two-colour, noisy, transparent), the scrap shape, and an
INTEGRATION test that builds a pile from several produced scraps, calls the real engine entry the app uses and
asserts it does not throw and returns a result. The panel is not imported by anything existing.
ACCEPTANCE: raw test output, esbuild compile output for the .jsx, oxlint clean.

TASK C4: start from an old garment
STATUS: TODO
GOAL: turn an old garment into an estimated scrap pile, optionally in the garment's real colours.
STEPS: src/restyle/oldGarment.js (pure functions). Input: type (saree, shirt, jeans, bedsheet), size, and an
optional list of dominant colours (hex) from the photo colour detector (C3); with colours given the pieces
use them, otherwise neutral defaults. Output: estimated usable pieces in the engine's scrap shape, labelled
"typical estimate, unverified, needs a tailor". Document assumptions in comments (seams, hems, worn zones
excluded). Rules: usable pieces plus waste equal the usable area; no piece larger than its source panel; no
piece under 3 cm; fabric type and stretch correct (jeans: denim, not stretchy, thick; shirt: cotton; saree:
cotton or silk, thin; bedsheet: cotton). src/restyle/RestylePanel.jsx (thin UI, unwired),
src/i18n/restyleTranslations.js. src/restyle/test_restyle.js: area conservation, size limits, all four types
and sizes, the colours option, and an integration test through the real engine as in C3.
ACCEPTANCE: raw outputs as in C3.

TASK C5: waste-saved calculation
STATUS: TODO
GOAL: show how much fabric was kept out of the bin.
STEPS: src/insights/wasteSaved.js (pure): from a design result, the total scrap area used in the product in
cm squared, the percentage of the pile area used, and a plain-language line ("Fabric used from scraps: X cm2,
Y% of your pile"). Only area arithmetic from the design data; no environmental or money claims, no invented
statistics. src/i18n/insightsTranslations.js (en, hi, te). Tests: hand-made designs with known areas, zero
and empty cases, integration with the real engine.
ACCEPTANCE: raw test output; wiring snippet in the merge notes.

TASK C6: large sample pile
STATUS: TODO
GOAL: a pile that lets the circle skirt finally score.
STEPS: src/samples/largeMixedPile.js: a realistic pile of at least 60 scraps (8 to 35 cm sides, mixed colours,
mixed fabrics including some thin and some stretchy, some prints) in the engine's scrap shape. Test: with the
real engine sandy_skirt scores above 0 on this pile; no product throws; print every product's score on this
pile (not asserted). The pile must be plausible, not a trick made of giant squares; state its size
distribution in the test output.
ACCEPTANCE: raw outputs; wiring snippet in the merge notes.

TASK C7: QA helpers (secret scan first)
STATUS: TODO (secret scan and DEMO_SCRIPT are MUST; the rest IF TIME)
STEPS: scripts/scan_secrets.mjs (scan the repo excluding node_modules, dist, android/build and .git for API-key-
like strings: Google AIza, sk-, private key blocks, long base64 tokens, "Authorization:" values, tracked .env
files; exit non-zero if found) and scripts/test_scan_secrets.mjs (builds fake keys at runtime from pieces,
never stores a realistic key in a file; proves detection and no false alarm on normal text). docs/DEMO_SCRIPT.md
(a 3-minute honest demo script and a one-page judge story using only features that exist today; mark anything
not built as "planned"). docs/PRIVACY.md (plain English: what is stored on the device, what is sent anywhere:
today nothing; AI photo is mock mode; what would be sent if AI is switched on later; no legal claims).
docs/UNUSED_FILES_REPORT.md (list, do NOT delete: the Noto Devanagari and Telugu fonts and licence file,
scratch scripts, old images; for each, how you checked nothing references it).
ACCEPTANCE: raw outputs; verify passes.

TASK C8: "make the most of my pile" planner
STATUS: TODO (IF TIME)
GOAL: suggest a set of products that uses the whole pile well.
STEPS: src/insights/planPile.js (pure): given a pile, the engine entry and the earnings function (C2), pick a
set of products greedily (best earning per hour first, then re-fit with the remaining scraps) and return the
list with the scraps used and what is left over. Cap the number of rounds. Never invent scraps; the engine
decides fit. Tests: determinism, no scrap used twice, area conservation, a case where the pile is too small
(empty plan), integration with the real engine on the sample piles.
ACCEPTANCE: raw outputs; wiring snippet in the merge notes.

## AMENDMENTS (Vinay adds notes here; latest wins)
- (none yet)


AMENDMENTS
- (Sat night) New ORDER: C0, C6, C5, C1, C2, C7, then C3 and C4 only if time. C8 is CANCELLED unless
  Vinay re-enables it.
- Never run destructive git commands: git reset, git checkout ., git restore ., git clean, git stash
  drop, git push. Never discard uncommitted work.
- Read long files in line ranges, never replace a whole file, and re-read the changed lines after
  every edit. If a file is over 400 lines, say so before editing it.
- If a task fails the same check twice, stop and report.
