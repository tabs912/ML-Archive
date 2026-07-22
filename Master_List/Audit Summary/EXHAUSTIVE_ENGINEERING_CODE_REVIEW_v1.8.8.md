# Master List v1.8.8 Exhaustive Engineering Code Review

**Review target:** `Master_List/Current Production Script/v1.8.8_Current_Production_Script`  
**Review prompt:** `Master_List/Prompts/ML_Exhaustive_Review_v2`  
**Review date:** 2026-07-22  
**Review level:** Exhaustive engineering review, proportionate to a privately operated one-to-three-user Google Apps Script workbook.

## 1. Executive Review Summary

**Overall health rating:** B / production-usable with targeted remediation.

**Production readiness assessment:** Conditional approval. The script shows mature single-file framework architecture, broad dashboard/template governance, batch-oriented output construction, timing instrumentation, template-first sheet creation, and explicit guards around protected sheet deletion. I found no duplicate top-level declarations and no confirmed undefined top-level helper dependencies in the static production source. The main blockers are targeted business-logic and workflow-safety issues in Monthly Change / Create Monthly Update paths, not broad architectural failure.

**Finding counts:**

| Severity | Count |
|---|---:|
| Critical | 0 |
| High | 2 |
| Medium | 4 |
| Low | 2 |

**Highest-risk workflows:**

1. Monthly Change Report disenrollment classification.
2. Create Monthly Update, especially the sequence from Monthly Change creation through Demo P mutation, Disenrolled Exclusion mutation, and Master List replacement.
3. Master List creation fallback when Primary PMR Row is missing or has no true rows.
4. Concurrent or repeated menu execution of long workflows.

**Primary bottlenecks:**

- Monthly Change report final formatting still applies multiple whole-sheet/range formatting passes after an already batched matrix write.
- Template and canvas creation performs intentional formatting copies and column-width reads; acceptable for current use, but still a material runtime area.
- Index refreshes are generally deferred in Create Monthly Update, which is good, but standalone workflow paths can still refresh Index after individual operations.

**Primary maintainability concerns:**

- Several important workflow rules are embedded in local section logic rather than centralized policy helpers.
- Some compatibility wrappers and aliases remain useful but should be documented as retained compatibility surfaces before cleanup.
- The README/spec authority text still names older production versions; this was treated as documentation staleness, not a code defect.

**Recommended next action:** Perform a focused remediation wave for findings ML188-001 through ML188-004 before treating v1.8.8 as fully approved. Findings ML188-005 through ML188-008 can be addressed in the next cleanup/performance wave.

## 2. Repository and File Inventory

| Artifact | Status | Review role |
|---|---|---|
| `Master_List/Current Production Script/v1.8.8_Current_Production_Script` | Present | Governing executable production source reviewed. |
| `Master_List/Prompts/ML_Exhaustive_Review_v2` | Present | Governing review prompt. |
| `Framework/spec/EXHAUSTIVE_CODE_REVIEW_PROTOCOL.md` | Present | Repository exhaustive-review standard. |
| `Framework/spec/GOOGLE_APPS_SCRIPT_STANDARDS.md` | Present | Batch/read/write and Apps Script standards. |
| `Framework/spec/PERFORMANCE_STANDARD.md` | Present | Performance-review standard. |
| `Master_List/Specs/Master_List_Framework_Specification_v2.0_UPDATEDv2.md` | Present | Current framework specification reference, though it still describes v1.7.6 authority. |
| `Master_List/Reports/v1.8.8 - Framework Timing Report.pdf` | Present | Timing evidence available as a binary report input; not modified or committed. |
| `Master_List/Reports/v1.8.8 - Dashboard Quality Report.pdf` | Present | Dashboard Quality evidence available as a binary report input; not modified or committed. |

Optional binary reports were not re-exported, modified, or converted into implementation artifacts.

## 3. Function and Dependency Inventory

Static inventory results for v1.8.8:

| Metric | Count | Notes |
|---|---:|---|
| Top-level functions | 679 | `function name(...)` declarations at column start. |
| Unique top-level function names | 679 | No duplicate top-level declarations found. |
| Duplicate declarations | 0 | Confirmed by static declaration scan. |
| Public Apps Script-callable functions | 64 | Non-underscore top-level functions. |
| Internal underscore helpers | 615 | Functions ending in `_`. |
| Missing menu callbacks | 0 | Menu callback strings resolve to declared functions, including compatibility wrappers. |
| Undefined top-level dependencies | 0 confirmed | Static call scan produced only nested local functions, formula names, callbacks, or object methods after review. |
| Destructive/write-operation functions | 89 probable | Functions containing writes, clears, copies, deletion, hide/show, grid resize, or similar mutation calls. |
| Suspected no-static-path functions | 64 public/dynamic candidates | Public/menu/trigger/web-app/diagnostic functions are retained unless explicitly deprecated. |

Public entry points found:

`archiveActiveRawDataSheet`, `archiveMonthlyActiveSheets`, `archiveMonthlyImportSheets`, `assignSortOrderAndHideExtraRows`, `buildCombinedFrameworkTestDashboard`, `buildDemoPFromScratch`, `buildMonthlyChangeReport`, `clearDiagnosticsAndTimingLogs`, `configureArchiveSpreadsheetId`, `configureIndexRestoreWebAppUrl`, `createDisenrolledList`, `createIndexSheet`, `createMasterList`, `createOrRefreshAllReportTemplates`, `doGet`, `enforceGlobalSheetSortOrder`, `formatBannerReport`, `formatCarePlanDueReport`, `formatDashboard`, `formatDemoPStructure`, `formatMonthlyChangeSubheaderRow`, `formatMonthlyChangeSubsectionBlock`, `formatMonthlySheets`, `formatRawData`, `formatUnlockedCarePlanReport`, `getMonthlyChangeSubsectionLabels`, `hideMonthlyActiveSheets`, `hideMonthlyImportSheets`, `hideReportTemplates`, `hideSystemSheetsNow`, `hideTemplates`, `onEdit`, `onOpen`, `processDemoP`, `quickBuildAllTemplates`, `quickSystemSetup`, `rebuildFormatDashboardDefaults`, `rebuildProductionMonthlyChangeTemplate`, `refreshFrameworkTimingReport`, `repairAllTemplateDateFormats`, `restoreSheetFromActiveIndexRow`, `restoreSheetFromArchiveWorkbook`, `runAllFrameworkTestsAndBuildDashboard`, `runDashboardQualityFull`, `runDashboardQualityQuick`, `runDashboardQualityStartUp`, `runDashboardQualityValidateTemplates`, `runFrameworkHealthCheck`, `runFrameworkSmokeValidation`, `runMonthlyUpdate`, `runWorkflowSyncVerification`, `saveActiveLayoutToDashboardSettings`, `setupReportFormattingDashboard`, `setupSystemSheets`, `showAllMasterListRows`, `showReportTemplates`, `showSystemSheetsNow`, `showTemplates`, `toggleFrameworkTiming`, `updateDemoPMonthlySync`, `validateActiveBannerFormatterOutput`, `validateReportTemplates`, `verifyFrameworkConfiguration`, `writeFrameworkTimingPerformanceRecommendations`.

## 4. Complete Findings Register

### ML188-001 — Monthly Change disenrollment detection only accepts the month first day

- **Severity:** High
- **Confidence:** High
- **Category:** Business logic / data correctness
- **Function or workflow:** `buildMonthlyChangeReportForMonth_` → `compareRawDemoPForSectionReport_` → `buildMonthlyChangeSectionRows_`
- **Description:** Disenrollment PMRs are classified only when `Disenrollment Effective Date` equals `monthParts.firstDay`. The user-facing Monthly Change no-change message says disenrollments should be included when the effective date is between the previous month first day and the report date. The row-builder contains a `disenrollmentEffectiveRange` branch, but the active section spec uses `strictDisenrollmentEffectiveDate`, so the range branch is dead for the current section flow.
- **Code evidence / execution path:** `compareRawDemoPForSectionReport_` uses `isSameDate_(effectiveDate, monthParts.firstDay)` for disenrollment classification. Later, the Disenrollments section spec selects `rowMode: "strictDisenrollmentEffectiveDate"`, and the section row builder again requires `isSameDate_(effectiveDate, monthParts.firstDay)`. The alternative inclusive-range mode exists but is not selected.
- **Operational impact:** Disenrollments effective later in the accepted monthly window can be omitted from Monthly Change, skipped by Demo P sync PMR collection, and therefore left in downstream Demo P/Master List flows incorrectly.
- **Recommended correction:** Centralize a `isMonthlyChangeDisenrollmentEffectiveDate_(date, monthParts)` helper and use it both for PMR classification and Disenrollment row inclusion. If the approved business rule is current-month-only instead of previous-first-through-report-date, update both user messaging and dead range branch accordingly.
- **Breaking-change risk:** Medium. The correction can preserve interfaces, but output row counts will change for affected months.
- **Focused testing needed after correction:** Build Monthly Change with disenrollment effective dates on the first day, mid-period, report date, before range, and after range; verify Demo P sync includes only in-range PMRs.

### ML188-002 — Create Monthly Update can mutate Demo P and Disenrolled Exclusion before Master List replacement is confirmed

- **Severity:** High
- **Confidence:** High
- **Category:** Data-flow / workflow safety
- **Function or workflow:** `runMonthlyUpdate` → `updateDemoPMonthlySyncForMonth_` → `createDisenrolledListForMonth_` → `createMasterListForMonth_`
- **Description:** The monthly-update preflight validates source Raw Data, prior Raw Data, and Demo P, but does not preflight whether the target Master List already exists or whether the user is willing to replace it. Replacement confirmation occurs inside `createMasterListForMonth_`, after Monthly Change creation, Demo P monthly replacement, archive append, and Disenrolled Exclusion movement have already run.
- **Code evidence / execution path:** `preflightMonthlyUpdateForMonth_` checks only current Raw Data, previous Raw Data, and Demo P. `runMonthlyUpdate` then runs Monthly Change, Demo P sync, Disenrolled Exclusion processing, and only then calls `createMasterListForMonth_`. Inside `createMasterListForMonth_`, an existing Master List prompts the user to replace; a "No" response returns `null` after prior mutations have already occurred.
- **Operational impact:** A user who cancels Master List replacement can be left with an updated Demo P and Disenrolled Exclusion but no refreshed Master List for that month. This is a realistic partial-completion state for the one-user workbook because the prompt appears late in the workflow.
- **Recommended correction:** Move target-output conflict checks for Monthly Change and Master List into monthly-update preflight before any Demo P or Disenrolled mutation. For `runMonthlyUpdate`, gather the replace/cancel decision up front and abort before mutation if replacement is declined.
- **Breaking-change risk:** Low to medium. The workflow order remains the same after preflight; only prompt timing changes.
- **Focused testing needed after correction:** Run Create Monthly Update when the target Monthly Change exists, when target Master List exists and user cancels, and when target Master List exists and user confirms; verify no Demo P or Disenrolled changes occur on cancel.

### ML188-003 — Master List silently falls back from Primary PMR Row to DOB/first row

- **Severity:** Medium
- **Confidence:** High
- **Category:** Data integrity / business rules
- **Function or workflow:** `createMasterListForMonth_` → `copyPrimaryDemoPRowsToMasterListByHeader_`
- **Description:** The approved architecture says Master List operational output contains Primary PMR rows only. The copy helper first selects rows flagged as Primary PMR Row, but if none are found it silently falls back to DOB rows and then first row per PMR.
- **Code evidence / execution path:** `copyPrimaryDemoPRowsToMasterListByHeader_` builds primary output first, then runs `buildOutputRows_("dob")` and `buildOutputRows_("first")` if primary output is empty.
- **Operational impact:** If Primary PMR Row assignment fails upstream, Master List can still be created from non-primary fallback rows and appear successful, masking the architecture failure and potentially selecting the wrong record per PMR.
- **Recommended correction:** Treat a present-but-empty Primary PMR Row selection as a validation failure for Master List. If a fallback must remain for historical compatibility, require an explicit compatibility flag and timing warning that is visible to the operator.
- **Breaking-change risk:** Medium. Existing edge-case runs that rely on fallback behavior would stop instead of producing a best-effort Master List.
- **Focused testing needed after correction:** Build Master List with valid Primary PMR Row values, missing Primary PMR Row header, present header with no true flags, and mixed true/blank flags.

### ML188-004 — Long-running mutating workflows have no workflow-level lock or busy guard

- **Severity:** Medium
- **Confidence:** Medium
- **Category:** Trigger/concurrency / data integrity
- **Function or workflow:** `runMonthlyUpdate`, `updateDemoPMonthlySync`, `createMasterList`, archive/hide workflows
- **Description:** The script contains public menu entry points for long-running write workflows, but I did not find a workflow-level `LockService` acquisition around the main mutation sequences. For the stated one-to-three-user workbook this is not enterprise-level concern, but accidental double-clicks or a second trusted user running the same workflow can overlap destructive clear/write/move operations.
- **Code evidence / execution path:** `onOpen` exposes menu callbacks for Create Monthly Update, Update Demo P, Create/Update Disenrolled List, Monthly Change, Master List, archive, hide/show, and setup/template operations. `runMonthlyUpdate` performs multiple mutating phases without an enclosing lock.
- **Operational impact:** Overlapping runs can clear and rewrite Demo P, append duplicate archive rows, move rows to Disenrolled Exclusion twice, or collide during staged Master List creation/replacement.
- **Recommended correction:** Add a small proportional document lock / busy flag only around multi-step destructive workflows (`runMonthlyUpdate`, `updateDemoPMonthlySync`, `createDisenrolledList`, `createMasterList`, and archive workflows). Keep lock timeouts and user messages simple.
- **Breaking-change risk:** Low. Public signatures can remain stable.
- **Focused testing needed after correction:** Simulate two back-to-back invocations of Create Monthly Update and Update Demo P; verify the second run exits with a clear busy message and no mutation.

### ML188-005 — Disenrollment sort uses source-column index against report-row values

- **Severity:** Medium
- **Confidence:** Medium
- **Category:** Code correctness / sorting
- **Function or workflow:** `buildMonthlyChangeSectionRows_`
- **Description:** Disenrollment rows are pushed as report rows, but the final sort uses `disenrollEffectiveIdx`, which is calculated from `currentData.headerMap`. This is safe only while report headers preserve the same source-column positions. It becomes incorrect if the report schema inserts, removes, or reorders columns before `Disenrollment Effective Date`.
- **Code evidence / execution path:** `disenrollEffectiveIdx` comes from `currentData.headerMap`; row objects contain `values: buildMonthlyChangeReportRow_(...)` in report-header order. The sort then reads `a.values[disenrollEffectiveIdx]`.
- **Operational impact:** Future dashboard/header changes can sort Disenrollments by the wrong column without a runtime failure, producing misleading section order.
- **Recommended correction:** Resolve a separate `reportDisenrollEffectiveIdx` from `reportHeaders` before sorting report rows.
- **Breaking-change risk:** Low.
- **Focused testing needed after correction:** Reorder report headers in a controlled test and verify Disenrollment sorting still uses Disenrollment Effective Date.

### ML188-006 — Full-range clear/format pass in Monthly Change can be reduced

- **Severity:** Medium
- **Confidence:** High
- **Category:** Performance
- **Function or workflow:** `populateMonthlyChangeReportSections_`
- **Description:** The Monthly Change writer builds values/backgrounds/font matrices efficiently, but then clears from row 5 through the maximum grid and applies a wrap strategy to all rows in column A after the batch write.
- **Code evidence / execution path:** `populateMonthlyChangeReportSections_` calculates `existingRows` from `reportSheet.getMaxRows() - HEADER_ROW`, clears that entire body width, writes the matrix, and applies column-A wrapping to `Math.max(reportSheet.getMaxRows(), 1)` rows.
- **Operational impact:** On larger templates or sheets with excess rows, the clear and full-column wrap pass can dominate Monthly Change output time even when the actual report matrix is modest.
- **Recommended correction:** After `resizeSheetGrid_`, clear and format only the known report body extent. If prior oversized content must be removed, trim the grid first or clear the old used range once before resize.
- **Breaking-change risk:** Low.
- **Focused testing needed after correction:** Build a Monthly Change report from a large prior template and compare output dimensions, blank trailing rows, formatting, and timing.

### ML188-007 — System sheet menu uses internal compatibility names rather than public Now wrappers

- **Severity:** Low
- **Confidence:** High
- **Category:** Maintainability / public entry points
- **Function or workflow:** `onOpen`
- **Description:** The menu points to `hideSystemSheets_` and `showSystemSheets_`, while public non-underscore wrappers `hideSystemSheetsNow` and `showSystemSheetsNow` also exist. Apps Script can call underscore functions, so this is not a runtime defect, but it blurs the public/internal boundary documented by the framework.
- **Code evidence / execution path:** `onOpen` adds System Sheets menu items with underscore callback names. Separate non-underscore wrappers are declared later.
- **Operational impact:** Future cleanup could mistakenly treat the underscore functions as internal-only and break menu callbacks, or leave redundant wrappers undocumented.
- **Recommended correction:** Point menu callbacks to the public `hideSystemSheetsNow` / `showSystemSheetsNow` wrappers, or document the underscore functions as retained menu compatibility callbacks.
- **Breaking-change risk:** Low.
- **Focused testing needed after correction:** Open workbook and click Hide/Show System Sheets menu actions.

### ML188-008 — Project documentation authority text is stale relative to reviewed v1.8.8

- **Severity:** Low
- **Confidence:** High
- **Category:** Maintainability / documentation alignment
- **Function or workflow:** Project governance documentation
- **Description:** Project README and current markdown specification still describe older v1.6.x/v1.7.6 artifacts as cleanup/current production candidates or implementation authority. The current review target is v1.8.8.
- **Code evidence / execution path:** Documentation references older production snapshots; the v1.8.8 source itself is present and was reviewed as requested.
- **Operational impact:** Agents and maintainers may waste time resolving stale authority language or compare against older baselines.
- **Recommended correction:** Update README/spec authority text in a documentation-only cleanup commit after code remediation decisions are made.
- **Breaking-change risk:** None.
- **Focused testing needed after correction:** Not applicable beyond link/path review.

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

### Confirmed duplicates

None found among top-level function declarations.

### Confirmed orphans

None. No top-level function was safe to classify as a confirmed orphan because public Apps Script functions can be menu callbacks, manually invoked, trigger targets, web-app routes, or retained compatibility surfaces.

### Probable orphans / cleanup candidates

- `formatMonthlyChangeSubheaderRow`, `formatMonthlyChangeSubsectionBlock`, and `getMonthlyChangeSubsectionLabels` appear retained for compatibility with older Monthly Change formatting flows. Do not remove without checking user macros, direct Apps Script invocation history, and any documentation references.
- `formatDemoPStructure` appears compatibility-oriented. Retain unless a migration explicitly removes the older manual formatting surface.

### Compatibility functions

- `hideSystemSheets_` / `showSystemSheets_` are actively used by menu callbacks despite underscore naming.
- `hideSystemSheetsNow` / `showSystemSheetsNow` are public wrappers and should be the preferred menu targets if the public/internal boundary is cleaned up.

### Dynamic or uncertain functions

All non-underscore public functions are dynamic/uncertain by nature in Apps Script and should be retained unless a governed public API cleanup confirms they are not used by menus, triggers, web-apps, macros, user muscle memory, or external references.

## 7. Performance Report

| Rank | Workflow | Cause | Approximate impact | Recommendation | Risk |
|---:|---|---|---|---|---|
| 1 | Monthly Change report | Full body clear and full-column wrap after matrix write | Medium on large grids; low on small monthly reports | Limit clear/format range to actual report body after grid resize | Low |
| 2 | Template/canvas creation | Template copy plus column-width reads across many outputs | Medium but expected for template-first architecture | Keep template-first approach; cache width vectors during multi-template refresh | Low |
| 3 | Create Monthly Update | Multiple sequential heavy workflows | Expected material runtime | Add lock/busy guard; keep deferred Index refresh | Low |
| 4 | Archive/Index flows | Cross-spreadsheet copy and Index rebuild | Medium only during archive operations | Keep as-is unless timing report shows recurring bottleneck | Low |
| 5 | Diagnostics/timing writes | Timing report updates during workflows | Low to medium | Preserve current timing; avoid adding more logging in primary paths | Low |

The code generally follows the approved one-read / in-memory / one-write pattern in the reviewed core paths. No practical Apps Script timeout defect was confirmed from static inspection alone.

## 8. Data-Flow and Data-Integrity Report

**Strengths:**

- Monthly Update preflight stops before mutation when current Raw Data, prior Raw Data, or Demo P is missing.
- Demo P monthly replacement validates replacement PMR coverage before clearing the Demo P body.
- Archive - Demo P rows are appended before Demo P replacement body write.
- Master List replacement uses a staged sheet and promotion path when replacing an existing output.
- Protected sheet deletion guards exist.

**Realistic defects / plausible failure paths:**

1. Monthly Change disenrollment range mismatch can omit required changed PMRs from all downstream monthly sync phases.
2. Create Monthly Update prompts for existing Master List replacement after Demo P and Disenrolled Exclusion mutation, allowing partial completion if the user cancels at that late prompt.
3. Master List fallback can mask a broken Primary PMR Row assignment by producing output from DOB/first-row fallback records.

Generated/intermediate sheets that can be recreated were not treated as permanent data-loss risks.

## 9. Trigger and Concurrency Report

- `onOpen` builds the operational menu surface and callback coverage is present.
- `onEdit` delegates to Format Dashboard highlighting only, which is proportionate and not a long mutating workflow.
- I did not confirm a workflow-level `LockService` wrapper around the long mutating menu workflows.
- For a one-to-three-user workbook, a simple document lock or busy document property is sufficient. Enterprise orchestration, queueing, or deployment controls are not warranted by the use case.

## 10. Error Handling and Logging Review

**Strengths:**

- Core workflows generally mark timing steps and rethrow errors after timing report writes.
- Schema-critical missing templates, missing headers, protected deletion, and missing source sheets commonly throw explicit errors.
- Best-effort formatting failures are often downgraded to warnings where appropriate.

**Weaknesses:**

- Late prompt/cancel behavior in Master List replacement creates a data-flow error-handling gap in `runMonthlyUpdate`.
- Some catch blocks intentionally log warnings and continue; this is acceptable for formatting and visibility tasks but should not expand to schema-critical sections.
- Diagnostics are already substantial; additional generic logging is not recommended unless attached to a specific remediation.

## 11. Maintainability and Architecture Review

The implementation follows the approved single-file, dashboard-governed, template-first architecture. The code includes centralized constants, dashboard loaders, template helpers, header maps, timing helpers, and protected deletion helpers. There is no need to split the file or redesign the architecture merely because the script is large.

Areas that merit cleanup after correctness remediation:

- Centralize Monthly Change enrollment/disenrollment date rules so classification, row inclusion, user messaging, and Demo P sync agree.
- Clarify public versus internal menu callbacks for system sheet visibility.
- Document retained compatibility wrappers and older manual formatting entry points.
- Update stale README/spec authority references from older production versions.

## 12. Prioritized Remediation Plan

### Phase A — Confirmed correctness defects

1. Fix Monthly Change disenrollment effective-date classification and row inclusion rule.
2. Add focused regression coverage for date boundary cases.

### Phase B — Broken dependencies and runtime stability

1. Move Monthly Update output-conflict and replacement-confirmation checks into preflight before mutation.
2. Add a proportional workflow lock/busy guard around long mutating workflows.

### Phase C — Material performance improvements

1. Reduce Monthly Change full-body clear and full-column formatting to actual output bounds.
2. Consider caching template column-width vectors during bulk template refresh only if timing remains material.

### Phase D — Orphan and duplicate cleanup

1. Do not delete public functions solely from static no-caller results.
2. Label retained compatibility wrappers and older manual Monthly Change helpers.

### Phase E — Maintainability cleanup

1. Point system-sheet menu callbacks to public wrappers or document underscore callbacks as public compatibility functions.
2. Update project README/spec authority text in a documentation-only cleanup.

## 13. Focused Regression Test Plan

Run these only after the recommended code fixes are made:

1. **Monthly Change disenrollment boundaries:** effective date before previous-month first day, on previous-month first day, mid-range, on report date, and after report date.
2. **Monthly Change to Demo P sync linkage:** verify all in-range disenrolled PMRs appear in the Monthly Change PMR collection and drive Demo P replacement/removal behavior as intended.
3. **Create Monthly Update conflict preflight:** target Monthly Change exists, target Master List exists with cancel, target Master List exists with confirm, and neither exists.
4. **Primary PMR Row enforcement:** normal primary flags, no true primary flags, missing header, duplicate true flags for same PMR.
5. **Workflow lock/busy guard:** duplicate invocations of Create Monthly Update, Update Demo P, Create Disenrolled List, Create Master List, and archive workflows.
6. **Monthly Change formatting bounds:** large template grid with small report output; verify no stale rows remain and timing improves or remains stable.

## 14. Final Conclusion

**Conditional approval.** v1.8.8 is structurally sound and broadly aligned with the approved Master List framework, but it should not be treated as fully approved until the Monthly Change disenrollment rule and Create Monthly Update late-cancel partial-mutation risk are remediated. No critical defect, duplicate top-level function declaration, or confirmed undefined dependency was found in this review.
