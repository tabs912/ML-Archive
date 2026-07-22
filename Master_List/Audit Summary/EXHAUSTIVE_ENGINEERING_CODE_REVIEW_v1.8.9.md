# Master List v1.8.9 Exhaustive Engineering Code Review

**Review target:** `Master_List/Current Production Script/v1.8.9_Current_Production`  
**Review prompt:** `Master_List/Prompts/ML_Exhaustive_Review_v2`  
**Review date:** 2026-07-22  
**Review level:** Exhaustive engineering review, proportionate to a privately operated one-to-three-user Google Apps Script workbook.  
**Source note:** v1.8.9 was fetched from `origin/main` after synchronization identified the file as newly available there while the current `work` branch had unique local review commits.

## 1. Executive Review Summary

**Overall health rating:** B / production-usable with targeted remediation.

**Production readiness assessment:** Conditional approval. v1.8.9 remains a mature single-file, dashboard-governed, template-first Apps Script framework with broad timing/quality instrumentation and no duplicate top-level function declarations. The v1.8.9 production update changes version identity, Monthly Sub-Reports naming, default tab-organization labels/ranks, the Disenrolled Exclusion template label, and dynamic ranking spacing. Those changes do not materially alter the principal correctness findings from the v1.8.8 review.

**Finding counts:**

| Severity | Count |
|---|---:|
| Critical | 0 |
| High | 2 |
| Medium | 4 |
| Low | 2 |

**Highest-risk workflows:**

1. Monthly Change Report disenrollment classification.
2. Create Monthly Update, especially late Master List replacement confirmation after Demo P and Disenrolled Exclusion mutations.
3. Master List creation fallback when Primary PMR Row is missing or produces no true rows.
4. Long-running menu workflows if invoked concurrently or repeatedly.

**Primary bottlenecks:**

- Monthly Change report final clear/format passes after batched matrix construction.
- Template/canvas creation column-width and formatting passes during multi-output refreshes.
- Index/archive operations, especially cross-spreadsheet copy plus Index rebuild.

**Primary maintainability concerns:**

- Monthly Change date-window rules are not centralized across classification, section row inclusion, messaging, and Demo P sync.
- Public/internal menu callback boundaries remain somewhat blurred for system-sheet visibility wrappers.
- Project README/spec authority text remains stale relative to v1.8.9 production.

**Recommended next action:** Remediate ML189-001 through ML189-004 before full approval. ML189-005 through ML189-008 can be handled as a focused cleanup/performance wave. Do not rebuild or modularize the framework.

## 2. Repository and File Inventory

| Artifact | Status | Review role |
|---|---|---|
| `Master_List/Current Production Script/v1.8.9_Current_Production` | Present on `origin/main`; fetched and reviewed | Governing executable production source for this review. |
| `Master_List/Prompts/ML_Exhaustive_Review_v2` | Present | Governing review prompt. |
| `Framework/spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md` | Present | Repository exhaustive-review standard. |
| `Framework/spec/GOOGLE_APPS_SCRIPT_STANDARDS.md` | Present | Apps Script batch/read/write standard. |
| `Framework/spec/PERFORMANCE_STANDARD.md` | Present | Performance-review standard. |
| `Master_List/Specs/Master_List_Framework_Specification_v2.0_UPDATEDv2.md` | Present | Framework specification reference; still names older authority text. |
| `Master_List/Reports/v1.8.8 - Framework Timing Report.pdf` | Present | Latest available timing report in current branch; binary review input only. |
| `Master_List/Reports/v1.8.8 - Dashboard Quality Report.pdf` | Present | Latest available Dashboard Quality report in current branch; binary review input only. |

No binary reports were modified or staged.

## 3. Function and Dependency Inventory

Static inventory results generated directly from v1.8.9:

| Metric | Count |
|---|---:|
| Top-level functions | 679 |
| Unique top-level function names | 679 |
| Duplicate declarations | 0 |
| Public Apps Script-callable functions | 64 |
| Menu functions | 36 |
| Workflow functions | 18 |
| Process functions | 89 |
| Formatters | 156 |
| Helpers / internal-private functions | 615 |
| Validators | 30 |
| Dashboard functions | 125 |
| Utilities | 300 |
| Configuration functions | 52 |
| Trigger functions | 3 |
| Missing menu callbacks | 0 confirmed |
| Undefined top-level dependencies | 0 confirmed |
| No-static-caller functions | 107 |
| High-complexity / oversized functions | 2 |
| Circular dependency groups | 1 |

The complete authoritative inventory is recorded in `Master_List/Audit Summary/FUNCTION_INVENTORY_v1.8.9.csv`; the narrative inventory review is recorded in `Master_List/Audit Summary/FUNCTION_INVENTORY_REVIEW_v1.8.9.md`.

## 4. Complete Findings Register

### ML189-001 — Owner-clarified: Monthly Change disenrollment date rule is strict first-of-month

- **Severity:** Low after owner clarification
- **Confidence:** High
- **Category:** Business logic clarification / maintainability
- **Function or workflow:** `buildMonthlyChangeReportForMonth_` → `compareRawDemoPForSectionReport_` → `buildMonthlyChangeSectionRows_`
- **Owner clarification:** `Disenrollment Effective Date` is always the first day of the month.
- **Updated description:** v1.8.9 classifies disenrollments when `Disenrollment Effective Date` equals `monthParts.firstDay`. That strict first-of-month behavior is aligned with the clarified business rule and should not be broadened.
- **Code evidence / execution path:** Disenrollment PMR classification uses `isSameDate_(effectiveDate, monthParts.firstDay)`. The Disenrollments section spec uses `rowMode: "strictDisenrollmentEffectiveDate"`; the row builder again requires the same date.
- **Operational impact:** The prior broader-window concern is superseded. The remaining risk is maintainability/confusing audit or range-branch text that could lead a future implementer to broaden the rule incorrectly.
- **Recommended correction:** Preserve strict first-of-month selection. Centralize or clean up wording/range-branch ambiguity only if behavior remains unchanged.
- **Breaking-change risk:** Low if behavior is preserved.
- **Focused testing needed after correction:** First-of-month dates for the applicable month are included; non-first-of-month and wrong-month dates are excluded.

### ML189-002 — Owner-clarified: Create Monthly Update order is correct

- **Severity:** Low after owner clarification
- **Confidence:** High
- **Category:** Workflow clarification
- **Function or workflow:** `runMonthlyUpdate` → `updateDemoPMonthlySyncForMonth_` → `createDisenrolledListForMonth_` → `createMasterListForMonth_`
- **Owner clarification:** The correct `runMonthlyUpdate` path is `Monthly Change -> Update Demo P -> Update Disenrolled -> Create Master List`.
- **Updated description:** The previously recommended reordering conflicts with the owner-confirmed workflow order. Create Master List should remain the final step of the monthly update path.
- **Code evidence / execution path:** `runMonthlyUpdate` performs Monthly Change, Demo P sync, Disenrolled Exclusion processing, and then Master List creation.
- **Operational impact:** Reordering Create Master List or moving its replacement/cancel handling ahead of Demo P or Disenrolled processing would violate the confirmed workflow.
- **Recommended correction:** Preserve the existing workflow sequence and remove the pre-mutation Master List replacement recommendation from Wave 1.
- **Breaking-change risk:** Low if sequence is preserved.
- **Focused testing needed after correction:** Validate the sequence remains Monthly Change, Update Demo P, Update Disenrolled, Create Master List.

### ML189-003 — Master List silently falls back from Primary PMR Row to DOB/first row

- **Severity:** Medium
- **Confidence:** High
- **Category:** Data integrity / business rules
- **Function or workflow:** `createMasterListForMonth_` → `copyPrimaryDemoPRowsToMasterListByHeader_`
- **Description:** The approved Master List architecture says operational output contains Primary PMR rows only. The v1.8.9 copy helper still falls back to DOB rows and then first row per PMR if no Primary PMR rows are selected.
- **Code evidence / execution path:** `copyPrimaryDemoPRowsToMasterListByHeader_` builds output in `primary` mode, then uses `dob` and `first` fallback modes if output remains empty.
- **Operational impact:** An upstream Primary PMR Row assignment failure can be masked by a successful-looking Master List created from non-primary fallback records.
- **Recommended correction:** Treat a present-but-empty Primary PMR Row result as a validation failure unless an explicit compatibility override is approved.
- **Breaking-change risk:** Medium.
- **Focused testing needed after correction:** Valid primary flags, no primary flags, missing primary header, duplicate primary flags, and fallback compatibility-off/on behavior if retained.

### ML189-004 — Long-running mutating workflows need a proportional workflow-level lock or busy guard audit

- **Severity:** Medium
- **Confidence:** Medium
- **Category:** Trigger/concurrency / data integrity
- **Function or workflow:** `runMonthlyUpdate`, `updateDemoPMonthlySync`, `createDisenrolledList`, `createMasterList`, archive workflows
- **Description:** v1.8.9 contains workflow busy-flag helpers, and `doGet` uses a document lock for restore routing, but the principal menu workflow paths should be audited to ensure every long-running destructive workflow is consistently enclosed by a proportional lock/busy guard.
- **Code evidence / execution path:** Menu callbacks expose long write workflows. Static inventory confirms `runWithWorkflowBusyFlag_`, `markWorkflowBusy_`, and `clearWorkflowBusy_` exist, but consistency across all destructive public workflows remains the actual review concern.
- **Operational impact:** Double-clicks or overlapping trusted-user invocations can duplicate archive rows, clear/write Demo P concurrently, or collide during staged output creation.
- **Recommended correction:** Ensure the existing busy-flag/lock pattern wraps each long destructive public workflow exactly once, with simple user-facing busy messages.
- **Breaking-change risk:** Low.
- **Focused testing needed after correction:** Back-to-back invocations of Create Monthly Update, Update Demo P, Create Disenrolled List, Create Master List, archive monthly active sheets, and archive monthly sub-reports.

### ML189-005 — Disenrollment sort uses a source-column index against report-row values

- **Severity:** Medium
- **Confidence:** Medium
- **Category:** Code correctness / sorting
- **Function or workflow:** `buildMonthlyChangeSectionRows_`
- **Description:** Disenrollment row sorting still resolves the effective-date index from `currentData.headerMap`, while rows being sorted are report rows returned by `buildMonthlyChangeReportRow_`.
- **Code evidence / execution path:** The logic is safe only while report headers preserve source-column ordering. If dashboard/header governance inserts or reorders columns before `Disenrollment Effective Date`, sorting can read the wrong report-row field.
- **Operational impact:** The Disenrollments section can be sorted by an unintended column without a runtime error.
- **Recommended correction:** Resolve a report-header-specific effective-date index from `reportHeaders` for the final row sort.
- **Breaking-change risk:** Low.
- **Focused testing needed after correction:** Reordered report headers with multiple disenrollment dates.

### ML189-006 — Monthly Change full-range clear/format pass remains a performance cleanup target

- **Severity:** Medium
- **Confidence:** High
- **Category:** Performance
- **Function or workflow:** `populateMonthlyChangeReportSections_`
- **Description:** The Monthly Change writer efficiently builds matrices, but still clears the body by current maximum rows and applies full-column wrapping after the matrix write.
- **Code evidence / execution path:** The function clears `HEADER_ROW + 1` through `reportSheet.getMaxRows()` for the output width, then applies wrap strategy down column A for the maximum row count.
- **Operational impact:** On oversized templates or previously enlarged sheets, clear/format passes can add avoidable runtime.
- **Recommended correction:** Bound the clear and final formatting range to the actual report body after grid sizing/trimming.
- **Breaking-change risk:** Low.
- **Focused testing needed after correction:** Small and large Monthly Change outputs with intentionally oversized template grids.

### ML189-007 — System sheet menu callbacks still use underscore callback names

- **Severity:** Low
- **Confidence:** High
- **Category:** Maintainability / public entry points
- **Function or workflow:** `onOpen`
- **Description:** System sheet menu callbacks still reference `hideSystemSheets_` and `showSystemSheets_`, while public wrappers `hideSystemSheetsNow` and `showSystemSheetsNow` also exist.
- **Code evidence / execution path:** Apps Script can call underscore functions, so this is not a current runtime defect, but it weakens the intended public/internal naming boundary.
- **Operational impact:** Future cleanup can accidentally remove or rename an underscore function that is menu-reachable.
- **Recommended correction:** Point menu callbacks to public wrappers or document the underscore functions as retained menu compatibility entry points.
- **Breaking-change risk:** Low.
- **Focused testing needed after correction:** Workbook open plus Hide/Show System Sheets menu actions.

### ML189-008 — Project documentation authority text remains stale relative to v1.8.9

- **Severity:** Low
- **Confidence:** High
- **Category:** Maintainability / documentation alignment
- **Function or workflow:** Project governance documentation
- **Description:** Project README/spec authority text still names older production snapshots. The current review target is v1.8.9.
- **Code evidence / execution path:** Stale authority text does not break runtime behavior but can mislead agents and maintainers.
- **Operational impact:** Maintainers can inspect the wrong baseline or waste time reconciling older references.
- **Recommended correction:** Update README/spec authority language in a documentation-only cleanup after v1.8.9 remediation direction is approved.
- **Breaking-change risk:** None.
- **Focused testing needed after correction:** Path/link review only.

## 5. Supported Entry-Point Report

| Classification | Functions |
|---|---|
| Menu/admin/setup | `quickSystemSetup`, `quickBuildAllTemplates`, `setupSystemSheets`, `setupReportFormattingDashboard`, `rebuildFormatDashboardDefaults`, `formatDashboard`, `saveActiveLayoutToDashboardSettings`, `createOrRefreshAllReportTemplates`, `hideReportTemplates`, `showReportTemplates`, `hideTemplates`, `showTemplates`, `hideSystemSheetsNow`, `showSystemSheetsNow`, `configureArchiveSpreadsheetId`, `configureIndexRestoreWebAppUrl`, `clearDiagnosticsAndTimingLogs`, `toggleFrameworkTiming`, `enforceGlobalSheetSortOrder`, `assignSortOrderAndHideExtraRows` |
| Core workflow functions | `formatMonthlySheets`, `formatRawData`, `formatBannerReport`, `formatCarePlanDueReport`, `formatUnlockedCarePlanReport`, `buildDemoPFromScratch`, `processDemoP`, `updateDemoPMonthlySync`, `buildMonthlyChangeReport`, `runMonthlyUpdate`, `createDisenrolledList`, `createMasterList`, `createIndexSheet` |
| Archive/restore workflows | `archiveActiveRawDataSheet`, `hideMonthlyImportSheets`, `hideMonthlyActiveSheets`, `archiveMonthlyImportSheets`, `archiveMonthlyActiveSheets`, `restoreSheetFromActiveIndexRow`, `restoreSheetFromArchiveWorkbook`, `doGet` |
| Trigger handlers | `onOpen`, `onEdit` |
| Diagnostics / validation | `validateReportTemplates`, `validateActiveBannerFormatterOutput`, `runFrameworkSmokeValidation`, `runDashboardQualityStartUp`, `runDashboardQualityQuick`, `runDashboardQualityValidateTemplates`, `runDashboardQualityFull`, `runAllFrameworkTestsAndBuildDashboard`, `buildCombinedFrameworkTestDashboard`, `runFrameworkHealthCheck`, `runWorkflowSyncVerification`, `verifyFrameworkConfiguration`, `refreshFrameworkTimingReport`, `writeFrameworkTimingPerformanceRecommendations`, `repairAllTemplateDateFormats`, `rebuildProductionMonthlyChangeTemplate` |
| Formatting helpers exposed for compatibility | `formatDemoPStructure`, `formatMonthlyChangeSubheaderRow`, `formatMonthlyChangeSubsectionBlock`, `getMonthlyChangeSubsectionLabels`, `showAllMasterListRows` |

## 6. Orphan and Duplicate Code Report

- **Confirmed duplicate declarations:** None.
- **Confirmed orphans:** None safe to delete from static analysis alone.
- **No-static-caller candidates:** 107. Treat as public/dynamic/compatibility/uncertain until menu, trigger, macro, web-app, and user invocation paths are checked.
- **Compatibility candidates:** `hideSystemSheets_`, `showSystemSheets_`, legacy Monthly Change formatting helpers, and manual Demo P formatting helpers.
- **Circular dependency group:** `loadDashboardConfig_` and `loadGlobalSettings_` form one direct static cycle.

## 7. Performance Report

| Rank | Workflow | Cause | Approximate impact | Recommended correction | Business logic impact |
|---:|---|---|---|---|---|
| 1 | Monthly Change | Full body clear and full-column wrapping after matrix construction | Medium on oversized sheets | Bound clear/format ranges to actual output body | None expected |
| 2 | Template/dashboard refresh | Template copies and repeated width/format operations | Medium during setup/refresh | Cache width vectors during bulk refresh if timing evidence warrants | None expected |
| 3 | Archive/Index | External copy and Index rebuild | Medium during archive workflows | Keep current path unless timing reports show recurring pain | None expected |
| 4 | Timing writes | Report writes during workflow execution | Low to medium | Do not add generic logging; keep focused timing | None expected |

## 8. Data-Flow and Data-Integrity Report

**Strengths:** source preflight exists, Demo P replacement coverage is validated before body clear, Archive - Demo P append happens before Demo P body replacement, Master List replacement uses a staged sheet, and protected sheet deletion guards exist.

**Realistic risks after owner clarification:** Primary PMR fallback masking upstream assignment failure, possible overlap of destructive workflows, Disenrollments sort/index behavior under header changes, and confusing date-window/workflow-order audit language if left uncorrected.

## 9. Trigger and Concurrency Report

`onOpen`, `onEdit`, and `doGet` are present. `doGet` uses a document lock for restore routing. The main recommendation is not enterprise orchestration; it is a focused audit/extension of the existing workflow busy-flag pattern to ensure destructive menu workflows cannot overlap.

## 10. Error Handling and Logging Review

Core workflows generally mark timing and rethrow schema-critical errors. Best-effort formatting warnings are usually handled proportionately. After owner clarification, do not treat final-step Master List replacement timing as an error-handling defect. Avoid adding broad evidence logging unless tied to a specific remediation.

## 11. Maintainability and Architecture Review

v1.8.9 remains aligned with the approved single-file architecture. The Monthly Sub-Reports naming and tab-organization updates are reasonable terminology/order changes and do not justify a framework rebuild. Maintainability work should focus on preserving the strict first-of-month Monthly Change date rule, documenting public/compatibility wrappers, and updating stale authority references.

## 12. Prioritized Remediation Plan

### Phase A — Confirmed correctness defects

1. Preserve and test the strict first-of-month Monthly Change disenrollment rule.
2. Remove or reword any broadened-window remediation language that conflicts with owner clarification.

### Phase B — Runtime stability and confirmed workflow preservation

1. Preserve the owner-confirmed monthly-update sequence: Monthly Change, Update Demo P, Update Disenrolled, Create Master List.
2. Audit/apply the existing busy-flag or lock pattern to long destructive public workflows.

### Phase C — Material performance improvements

1. Reduce Monthly Change clear/format ranges to actual output dimensions.
2. Reassess template width/format caching only if timing evidence supports it.

### Phase D — Orphan and duplicate cleanup

1. Do not delete no-static-caller functions without dynamic invocation review.
2. Label retained compatibility wrappers.

### Phase E — Maintainability cleanup

1. Align system-sheet menu callbacks with public wrappers or document compatibility.
2. Update stale README/spec authority text to v1.8.9.

## 13. Focused Regression Test Plan

1. Monthly Change strict first-of-month disenrollment boundaries.
2. Demo P sync PMR collection from Monthly Change after strict-rule verification.
3. Create Monthly Update order verification: Monthly Change, Update Demo P, Update Disenrolled, Create Master List.
4. Master List Primary PMR Row enforcement and fallback behavior.
5. Workflow busy/lock behavior on repeated invocations.
6. Monthly Change output formatting bounds on oversized template grids.

## 14. Final Conclusion

**Conditional approval after owner clarification.** v1.8.9 is production-usable for the current small-user workbook and improves naming/tab organization versus v1.8.8. The prior broadened disenrollment-window and monthly-update reordering recommendations are superseded by owner clarification; remaining remediation should focus on still-valid items such as Primary PMR fallback behavior, Disenrollments sort/index validation, concurrency coverage, and deferred maintainability items. No critical defect, duplicate top-level function declaration, or confirmed undefined top-level dependency was found.
