# Corrections 8 Verification — v1.72

Governing implementation artifact: `Master_List/Current Production Script/v.1.72_Current_Production_Script`.

## Completion Matrix

| Correction | Status | Implementation proof |
|---|---:|---|
| #1 Format Dashboard onEdit highlighting not working | Complete | `handleFormatDashboardValueHighlighting_(e)` now computes the edited intersection with Format Dashboard columns A:N across the full sheet, supports multi-cell edits/pastes by reading values, and writes a background matrix: nonblank cells become `#fff2cc`, blank cells reset to `#ffffff`. |
| #2 Quick System Setup leaves system surfaces visible | Complete | `quickSystemSetup()` now calls `hideSystemAndTestingSheets_(null)` after rebuilding the Index and before the completion toast, restoring the clean/tidy workspace state after system setup initializes structural tabs. |
| #3 Demo P / Disenrollment Exclusion E2 label | Complete | Demo P and Disenrollment Exclusion now write label-only `Last Updated` in E2, removing the duplicate date-bearing `Date Updated: MM/DD/YYYY` text because the date range is already governed in B2:D2. |
| #4 System/template tail-block rank lock | Complete | `getGlobalSheetSortRankByName_()` now ranks the tail block exactly as Framework Timing Report, Dashboard Quality Report, Format Dashboard, Template - Banner Report, Template - Care Plan Due, Template - Unlocked Care Plan, Template - Raw Data, Template - Demo P, Template - Disenrolled Exclusion, Template - Master List, Template - Monthly Change, then `RFF_BASE_TEMPLATE_NAME`; template builds call the global sorter immediately after templates are created. |
| #5 Format Dashboard post-generation visibility cleanup | Complete | `setupReportFormattingDashboardFromScriptDefaults_()` now calls `hideSystemAndTestingSheets_(timing)` immediately after the fast governed dashboard writer, so running Start-up → Format Dashboard rebuilds the sheet and then compresses system/testing surfaces back out of view. |
| #6 Index restore Web App URL configuration | Complete | `configureIndexRestoreWebAppUrl()` is exposed from the Start-up menu, stores `ML_INDEX_RESTORE_WEB_APP_URL`, rebuilds the Index, and enables generated archive restore hyperlinks while preserving the menu-based restore fallback when no URL is configured. |
| #7 Create Monthly Update Demo P date refresh | Complete | `updateDemoPMonthlySyncForMonth_()` now calls `updateDemoPReportDates_()` so Create Monthly Update refreshes Demo P B2/D2 date range and E2 `Last Updated` label the same way the individual Demo P update path does. |
| #8 Quality Dashboard section rewrite | Complete | Dashboard Quality now runs through a unified v1.72 orchestrator: Start Up clears dashboard cache and runs template/Format Dashboard checks, Full runs A-G plus H-Q operational diagnostics, section failures are captured as ERROR rows instead of aborting the workflow, section data is staged in `ML_DASHBOARD_QUALITY_STAGED_BUFFERS_`, and staged sections flush transactionally to the Dashboard Quality sheet after shell-signature validation. |

## Local Static Verification

- `node --check /tmp/v172.js` passed for the v1.72 production script.
- Static marker scans confirmed v1.72 versioning, cleanup call in `quickSystemSetup()`, robust full-sheet A:N edit highlight matrix logic, `#fff2cc`, `#ffffff`, `setBackgrounds()`, label-only E2 `Last Updated` metadata, the system/template tail-block rank lock, Format Dashboard post-generation visibility cleanup, Index restore Web App URL configuration, and Create Monthly Update Demo P date refresh, Dashboard Quality shell-signature validation, staged buffers, flush helper, and full A-Q orchestration are present.
- `./Framework/tools/prepare_pr.sh` reported only intended v1.72 text artifacts staged and no binary files.

## Live Runtime Follow-up

Simple-trigger `onEdit(e)` behavior and system-surface re-hide behavior should be confirmed in a copied workbook by editing Format Dashboard cells A:N, running Quick System Setup, rebuilding Demo P / Disenrollment Exclusion to confirm E2 contains `Last Updated` without a duplicate date, running Build Templates / sheet organization to confirm the requested system/template tail block order is applied after templates are built, running Start-up → Format Dashboard to confirm system/testing sheets are re-hidden after dashboard generation, configuring the Index Restore Web App URL to confirm archive rows generate clickable restore hyperlinks, and running Create Monthly Update to confirm Demo P B2/D2 dates refresh, and running Dashboard Quality Start Up / Validate Templates / Full to confirm Sections A-Q populate and refresh without leaving stale section data.
