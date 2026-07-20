# Corrections 7 Verification — v1.71

Governing implementation artifact: `Master_List/Current Production Script/v.1.71_Current_Production_Script`.

Review source: `Master_List/Reports/Corrections 7.md` from `origin/main`.

## Completion Matrix

| Correction | Status | Implementation proof |
|---|---:|---|
| Final unyielding sheet sorting matrix | Complete | `getGlobalSheetSortRankByName_()` now locks Index first, Demo P second, active workspace sheets next, Archive - Demo P behind Disenrolled Exclusion, formatted imports, unformatted imports, manual helper tabs, Framework Timing / Dashboard Quality / Format Dashboard tail hooks, templates, and Base Template last. |
| Archive visibility suppression in post-sort loop | Complete | `enforceGlobalSheetSortOrder_()` now hides `Archive - Demo P` / `DEMO_P_ARCHIVE_SHEET` after structural sort shuffles complete. |
| Targeted caseload field-differential engine | Complete | `buildMonthlyChangeReportRow_()` now applies `Column Name -- Previous Value` formatting only to the named caseload columns and leaves all other changed columns as plain names. |
| Interactive hyperlinked Index restoration router | Complete | Added `doGet(e)`, `restoreSheetFromArchiveWorkbook()`, `getIndexRestoreWebAppUrl_()`, and restore hyperlink formula generation for archive rows when `ML_INDEX_RESTORE_WEB_APP_URL` is configured. |
| Dynamic value edit highlighting loop | Complete | Added `handleFormatDashboardValueHighlighting_(e)` and wired `onEdit(e)` to mark edited Format Dashboard A:D configuration cells with `#fff2cc`, clearing blanks back to white. |
| Corrected restoreSheetFromActiveIndexRow block structure | Complete | `restoreSheetFromActiveIndexRow()` now has enclosed validation exits, optional routed target support, Column G sheet identity lookup, and archive restore delegation without dangling exits. |
| Dashboard Quality Raw Data Section J replacement | Complete | `runDashboardQualityRawDataValidation_()` now uses current month Raw Data/Banner sheets, validates Primary PMR assignment and duplicate primaries, and performs PMR + name Banner sync cross-checks. |

## Local Static Verification

- `node --check /tmp/v171.js` passed for the v1.71 production script.
- Static correction-marker scans confirmed sort ranks, archive hide suppression, caseload filter list, `doGet`, hyperlink generation, edit highlighting, restored-sheet router, and Raw Data validation replacement are present.
- `./Framework/tools/prepare_pr.sh` reported only intended v1.71 text artifacts staged and no binary files.

## Live Runtime Follow-up

Apps Script Web App routing, Index hyperlink restore, UI alert behavior, and SpreadsheetApp sort/hide behavior still require copied-workbook validation after deploying the v1.71 script and configuring `ML_INDEX_RESTORE_WEB_APP_URL` in document properties.
