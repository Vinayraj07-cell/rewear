# STREAM B: UI/UX redesign and language (owned by Vinay; workers never edit this file)

BRANCH: feature/ui-ux          (create from master)
LETTER: B

## ORDER
MUST-DO (in this order): B0, B1, B2, B3a, B3b, B3c, B3d, B3g, B4.
IF TIME (in this order): B3e, B3f, B5.
B6 (merge notes) is not a separate step: keep docs/streamB_merge_notes.md current after EVERY task.
Whenever you have finished a task, the branch must be mergeable as it stands.

## OWNED FILES (you may edit or create only these)
- src/screens/**  EXCEPT: in src/screens/DesignViewScreen.jsx never edit any line that mentions
  Product3DViewer, onOpen3DSpike, "3D" or the 3D preview section (System A edits those).
- src/components/**  EXCEPT Product3DViewer*, ErrorBoundary*, src/components/3d/** and
  src/components/Product2DPreview.jsx (never edit these; embed the preview in your cards as it is).
- src/components/ui/**, src/components/InspirationStrip.jsx (new)
- src/styles/** (new) and the existing global stylesheet (find it: src/index.css or similar)
- src/i18n/translations.js (add keys; never rename or remove an existing key)
- scripts/verify_stream_b.mjs, scripts/find_hardcoded_strings.mjs, scripts/screenshot_screens.mjs (new)
- docs/streamB_*, docs/tasks/STATUS_B.md, docs/streamB_screens/**
NOT OWNED (never edit, even a little): src/App.jsx, src/main.jsx, src/engine/**, src/utils/**,
src/gallery/**, src/capture/**, src/restyle/**, src/samples/**, src/money/**, src/insights/**,
products/**, public/**, package.json, package-lock.json, android/**, any existing test. If the redesign
needs an App.jsx change (for example the bottom navigation lives there), write it as a git-diff patch file
docs/streamB_app_jsx.patch and report it; do not apply it. Do not change any filtering, sorting, scoring or
state logic of any screen: presentation only.

## DESIGN BRIEF (applies to every UI task)
Audience: tailors, home sewers and self-help-group members in India; many use low-end Android phones,
outdoors and in poor light; some read little English; many prefer Telugu or Hindi.
Principles:
1. Mobile first at 360 x 780. Everything usable one-handed. Touch targets at least 48 px. Body text at
   least 16 px. Strong contrast (WCAG AA, 4.5:1 for text).
2. One obvious primary action per screen. Use icon + short word. Short sentences. Keep the existing
   voice (speaker) buttons on important explanations.
3. Show the result, not the machinery: the product preview is the HERO of every card and of the design
   screen; score as a simple meter with a word ("Great fit", "Almost", "Need more fabric") and a
   one-line reason.
4. Advanced controls (frayed margin, bulk add, construction style) live in expandable sections, never
   removed.
5. Every screen has designed loading, empty, error and success states.
6. Telugu and Hindi strings are longer: line-height at least 1.4, text wraps, never truncates or
   overflows, no fixed-width buttons.
7. Calm, craft-inspired look (warm neutrals, one strong primary colour, one accent) defined as tokens
   (colours, type scale, spacing, radii, shadows) in src/styles/tokens.css and used everywhere. Reuse the
   icon library already installed. No new fonts (system fonts). Only light CSS transitions.
8. Honesty labels stay visible but quiet: "Measurements to be verified by a tailor", "Estimate",
   "Illustrative preview, not exact fit", "Inspiration example (AI-generated), not made from your scraps".
9. Do not remove, permanently hide or change the behaviour of any existing feature.
Presentation-only rule: change JSX markup, class names, CSS, layout and text. Do not change state logic,
effects, data flow, function signatures or props. After each screen, list any changed non-JSX lines in
your report with a reason. Keep every id, data-testid and aria-label.

## TASKS

TASK B0: verify script
STATUS: TODO
GOAL: one command that proves a merge is safe.
STEPS: create scripts/verify_stream_b.mjs that (1) lists git diff --name-only master...HEAD plus
uncommitted files and fails if any file is outside the OWNED list (keep the allowed list as a regex array
in the script, with the DesignViewScreen exception in a comment); (2) runs npm test, fails on any failure
or non-zero exit, and compares the numbers it prints with the baseline in PROTOCOL.md section 4 (each
baseline number must appear or be higher; print a table suite / baseline / found); (3) runs npm run build
and fails on non-zero exit; (4) runs npx oxlint -A all -D no-undef src/screens src/components and fails if
not clean; (5) compiles every .jsx file under src/components/ui and src/components/InspirationStrip.jsx
with npx esbuild (jsx automatic, react as external, output to the null device); (6) prints a PASS/FAIL line
per check and ends with OVERALL: PASS or OVERALL: FAIL (exit code 1 on fail). Also create
docs/streamB_merge_notes.md and docs/tasks/STATUS_B.md.
ACCEPTANCE: on the clean branch it prints OVERALL: PASS and the baseline table.
DO NOT: add dependencies; hardcode secrets; edit package.json.

TASK B1: audit
STATUS: TODO
GOAL: know what is wrong before redesigning.
STEPS: read every screen and component. Write docs/streamB_ui_audit.md: (a) a table of every screen: file,
purpose, how a user reaches it, main action, states handled (loading, empty, error); (b) the 15 biggest UX
problems with file and line references; (c) the design tokens you propose (actual values) and the list of
shared UI parts you will build; (d) a before-screenshot plan. If a headless browser tool is already in
node_modules (for example puppeteer) write scripts/screenshot_screens.mjs and capture BEFORE screenshots of
each reachable screen at 360 x 780 into docs/streamB_screens/before/ in English and Telugu; if not, list
the screens and note that Vinay should capture them by hand. Continue to B2 without waiting unless the
audit finds something that blocks the brief.
ACCEPTANCE: the audit file exists and cites real file names and line numbers.
DO NOT: change any source file in this task.

TASK B2: design system
STATUS: TODO
GOAL: tokens and reusable parts so screens look consistent.
STEPS: create src/styles/tokens.css and import it from the existing global stylesheet (smallest possible
edit). Create src/components/ui/: Button (primary, secondary, quiet, danger, loading), Card, Chip,
SectionHeader, PageHeader, EmptyState, Banner (info, warning, success, error), Meter (fit score), Field
(label + input + hint + error), Expandable. Each part is a small plain function component using the tokens,
props documented in a comment at the top. Do not use them in screens yet.
ACCEPTANCE: verify passes; no existing screen changed.
DO NOT: add a CSS framework, icon pack or font.

TASK B3a: Home screen
STATUS: TODO
GOAL: first impression: what the app does and one big action.
STEPS: redesign Home with the design system: short promise in the app language, one primary action ("Add
my scraps"), a secondary "Try sample scraps", a calm honesty line, language switch visible. Keep every
existing function and the install banner behaviour (restyle it).
ACCEPTANCE: before/after screenshots in English, Hindi, Telugu at 360 x 780 (or Vinay's manual capture if
no tool); verify passes; list of non-JSX lines changed (should be none).

TASK B3b: My Pile (scrap entry) screen
STATUS: TODO
GOAL: fast, clear scrap entry.
STEPS: redesign the pile screen: list of scraps with colour swatch and size, sample pile chips, bulk add and
the frayed-scrap setting inside expandable sections, a designed empty state. Leave a visible, well-spaced
place near the top for an "Add by photo" button and an "Old garment" button, rendered ONLY if matching
optional props exist (System A wires them later); do not import anything from src/capture or src/restyle.
ACCEPTANCE: same as B3a; every existing feature still reachable.

TASK B3c: What Can I Make screen
STATUS: TODO
GOAL: browsing 13 (soon 40) products must feel easy and fast.
STEPS: product cards with the preview as hero, name, fit meter with a word, a one-line reason; sticky
category tabs: the tab list is derived from the categories present in the product data, in this fixed order
(all, bags, home, kids, garments), labels from translations (add keys en, hi, te, including "garments" =
Clothes); do NOT change the filtering logic, only the markup and labels. Style the "Need more fabric" section
clearly with how many scraps are missing. Add sort chips "Best fit", "Best earning", "Fastest" rendered ONLY
when an optional sortMode prop and onSortChange prop are given (A wires them later); the card shows a quiet
"Estimated earning" line only when the data is present. Must stay fast with 40+ products (no heavy
re-renders; images lazy-loaded).
ACCEPTANCE: same as B3a, plus a screenshot with every tab.

TASK B3d: Design view (not the 3D lines)
STATUS: TODO
GOAL: the design screen explains the design in simple steps, with the preview first and largest.
STEPS: redesign preview area, piece list, construction style switch, price helper and action buttons. Do not
touch lines about Product3DViewer, onOpen3DSpike or the 3D section.
ACCEPTANCE: same as B3a; the git diff of this file shows no 3D-related line changed.

TASK B3g: inspiration strip
STATUS: TODO
GOAL: a calm horizontal strip of example images under the preview.
STEPS: create src/components/InspirationStrip.jsx taking an optional images prop (array of {src, label}).
Renders nothing when the array is empty or missing. Swipeable, tap to enlarge, images lazy-loaded with a fixed
aspect ratio, a placeholder, an image that fails to load is hidden, and the label line is always visible:
"Inspiration example (AI-generated), not made from your scraps" (add keys en, hi, te). Place it in the Design
view below the preview, only rendered if the screen receives an inspirationImages prop (System A wires it
later). Do not remove the existing AI photo button.
ACCEPTANCE: screenshots with 0, 1 and 4 images (use test data in a throwaway page or a screenshot script,
not in app code); verify passes.

TASK B4: language completeness
STATUS: TODO
GOAL: no English text when Hindi or Telugu is selected (PDFs stay English).
STEPS: write scripts/find_hardcoded_strings.mjs to list user-visible string literals in src/screens and
src/components that are not routed through translations. Fix every hit by adding keys to
src/i18n/translations.js (en, hi, te). Known hits: "Export Tailor Blueprint as PDF"; "Suggested Customer
Selling Price"; "Material:", "Labor:", "Extras:"; "Garment Construction"; "Hybrid (Plain Body)" and "Full
Patchwork"; "Install App on Phone" and its subtitle; "Want to test right now?" and its subtitle; the category
tab labels; "Install"; the tailor disclaimer shown on screen. Put every NEW hi and te string in
docs/streamB_translation_review.md (key, English, Hindi, Telugu) marked "machine-written, needs native
review".
ACCEPTANCE: the finder script reports zero hits (or a short documented allowlist); verify passes; a
screenshot of one screen in Telugu with no English.
DO NOT: rename or remove existing keys.

TASK B3e: Tailor blueprint screen
STATUS: TODO (IF TIME)
GOAL: a professional blueprint screen.
STEPS: redesign measurements table, steps list, cost helper and the Export PDF button states (idle,
generating, success, error). Both PDF buttons keep calling the export handler. Keep the disclaimer visible.
ACCEPTANCE: same as B3a.

TASK B3f: language screen, header, bottom navigation
STATUS: TODO (IF TIME)
GOAL: consistent chrome.
STEPS: restyle the language picker, the header (including the install pill) and the bottom navigation if
they live in an owned component. If the navigation lives in a non-owned file, write docs/streamB_app_jsx.patch.
ACCEPTANCE: same as B3a.

TASK B5: accessibility and polish pass
STATUS: TODO (IF TIME)
GOAL: finishing quality.
STEPS: check every screen at 360 x 780 and 320 px width: targets at least 48 px, contrast, focus visibility,
no horizontal scroll, Telugu wrapping, consistent spacing, designed empty and error states, no layout shift
while loading. Fix what you find (only in owned files). List remaining issues honestly in
docs/streamB_polish_checklist.md.

## AMENDMENTS (Vinay adds notes here; latest wins)
- (none yet)

AMENDMENTS
- (Sat night) New ORDER: B0, B1, B2, B4, B3a, B3c. B3b, B3d, B3e, B3f and B5 are CANCELLED unless Vinay
  re-enables them.
- Never run destructive git commands: git reset, git checkout ., git restore ., git clean, git stash
  drop, git push. Never discard uncommitted work.
- Read long files in line ranges, never replace a whole file, and re-read the changed lines after
  every edit. If a file is over 400 lines, say so before editing it.
- If a task fails the same check twice, stop and report.
