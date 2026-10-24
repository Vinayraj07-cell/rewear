# System A Status & Task Progress

| Task ID | Title | Status | Checks | Notes |
|---------|-------|--------|--------|-------|
| A14 | PDF fixes (standard fonts, area conservation, preview picture, all products test) | DONE (Pending commit go) | npm test (0 failed, 224+33+18+6 passed), npm run build (OK in 8.8s) | Fixed Helvetica font registration in browser/WebView, fixed seam allowance conservation, added preview picture to Page 1, added test generating PDF for all 33 products |
| A2 | Inspiration gallery (logic, import, tests) | DONE (Pending commit go) | npm test (0 failed, all suites passed including test_gallery), npm run build (OK in 4.5s) | Built import_gallery.mjs with header parsers (PNG, JPEG, WebP, GIF), 150 KB / 768px guards, findInspiration.js ranking logic with honesty disclaimers, test_gallery.mjs with temp fixtures |
