# Master List v1.8.9 Exhaustive Review Remediation Validation and Wave Release Plan

**Planning source prompt:** `Master_List/Prompts/Master_List_Exhaustive_Review_Remediation`  
**Validated review:** `Master_List/Audit Summary/EXHAUSTIVE_ENGINEERING_CODE_REVIEW_v1.8.9.md`  
**Governing production source:** `Master_List/Current Production Script/v1.8.9_Current_Production`  
**Function inventory:** `Master_List/Audit Summary/FUNCTION_INVENTORY_v1.8.9.csv` and `Master_List/Audit Summary/FUNCTION_INVENTORY_REVIEW_v1.8.9.md`  
**Planning date:** 2026-07-22  
**Change-control status:** Planning only. No production code, functions, menus, triggers, templates, configuration, reports, or business rules were changed.

## 1. Executive Remediation Summary

| Metric | Count |
|---|---:|
| Findings reviewed | 8 |
| Confirmed | 5 |
| Partially confirmed | 1 |
| Already corrected | 0 |
| Outdated | 0 |
| Duplicated | 0 |
| Not confirmed | 0 |
| Requires runtime evidence as primary status | 0 |
| Requires user decision as primary status | 0 |
| Optimization only | 1 |
| Documentation only | 1 |
| Findings with required user decisions | 3 |

**Highest-priority risks:**

1. `ML189-001` — Monthly Change disenrollment effective-date rule can omit PMRs from Monthly Change and downstream Demo P sync.
2. `ML189-002` — Create Monthly Update can partially mutate Demo P and Disenrolled Exclusion before Master List replacement is confirmed.
3. `ML189-003` — Master List Primary PMR Row fallback can mask an upstream Primary PMR assignment failure.

**Highest data-integrity risks:** `ML189-001`, `ML189-002`, and `ML189-003`.

**Highest workflow risks:** `ML189-002` and the standalone portion of `ML189-004`.

**Highest compatibility risks:** `ML189-003` if fallback behavior is changed without an explicit compatibility decision; `ML189-007` if underscore menu callbacks are removed without preserving wrappers.

**Recommended first remediation wave:** Wave 1 Release — Critical correctness and data safety.

**Recommended Wave 1 Release objective:** Align Monthly Change disenrollment selection and Master List Primary PMR enforcement with approved business rules, while moving Master List replacement/cancel decisions before monthly-update mutations.

**Recommended next production version:** `v1.8.9.1` for Wave 1 if corrections preserve public signatures and approved user-visible workflow names. Use a minor version only if the user approves a business-rule or workflow-behavior expansion that materially changes expected outputs.

**Current implementation-readiness conclusion:** Ready to prepare Wave 1 implementation for user approval, subject to the user decisions in `UD-001` and `UD-002`. Do not implement code until those decisions are approved.

## 2. Review Result Inventory

| Finding ID | Original severity | Original confidence | Category | File | Function | Description | Evidence cited by review | Recommended correction | Breaking-change risk | Required testing |
|---|---|---|---|---|---|---|---|---|---|---|
| ML189-001 | High | High | Business logic / data correctness | `v1.8.9_Current_Production` | `compareRawDemoPForSectionReport_`, `buildMonthlyChangeSectionRows_` | Disenrollment detection only accepts report/month first day. | Same-day `isSameDate_` checks and strict row mode. | Centralize approved Monthly Change disenrollment date rule. | Medium | Disenrollment date-boundary tests. |
| ML189-002 | High | High | Data-flow / workflow safety | `v1.8.9_Current_Production` | `preflightMonthlyUpdateForMonth_`, `runMonthlyUpdate`, `createMasterListForMonth_` | Create Monthly Update can mutate earlier outputs before Master List replacement is confirmed. | Preflight omits target Master List conflict; prompt occurs later. | Move target conflict/replacement decisions before mutation. | Low/Medium | Existing-output/cancel/confirm workflow tests. |
| ML189-003 | Medium | High | Data integrity / business rules | `v1.8.9_Current_Production` | `copyPrimaryDemoPRowsToMasterListByHeader_` | Master List falls back from Primary PMR rows to DOB/first row. | Fallback modes `dob` and `first`. | Stop or require approved compatibility override when no primary rows exist. | Medium | Primary row enforcement tests. |
| ML189-004 | Medium | Medium | Trigger/concurrency / data integrity | `v1.8.9_Current_Production` | `runFrameworkTimed_`, `runWithWorkflowBusyFlag_`, public workflow wrappers | Long-running mutating workflows need consistent lock/busy guard coverage. | Existing busy helper exists; standalone wrappers vary. | Audit and wrap uncovered destructive entry points. | Low | Duplicate invocation/concurrency tests. |
| ML189-005 | Medium | Medium | Code correctness / sorting | `v1.8.9_Current_Production` | `buildMonthlyChangeSectionRows_` | Disenrollment sort can use source-column index against report-row values. | Source header map index applied to report row. | Resolve report-header effective-date index for sort. | Low | Header reorder and multi-date sort tests. |
| ML189-006 | Medium | High | Performance | `v1.8.9_Current_Production` | `populateMonthlyChangeReportSections_` | Monthly Change clear/format range is larger than necessary. | Uses max grid rows for clear and column wrap. | Bound clear/format to output body where safe. | Low | Oversized grid timing/format tests. |
| ML189-007 | Low | High | Maintainability / public entry points | `v1.8.9_Current_Production` | `onOpen`, `hideSystemSheets_`, `showSystemSheets_` | Menu callbacks reference underscore wrapper names. | Menu points at underscore callbacks while public wrappers exist. | Point menu to public wrappers or document compatibility. | Low | Menu callback smoke tests. |
| ML189-008 | Low | High | Documentation alignment | Project docs | README/spec authority sections | Documentation authority text is stale relative to v1.8.9. | README/spec name older production versions. | Update docs after remediation direction is approved. | None | Path/link review. |

## 3. Validated Findings Register

| Finding ID | Original severity | Original confidence | Category | Validated status | Current severity | Current confidence | File | Function | Current evidence | Affected workflows | Impact | Recommended action | Root-cause ID | Remediation wave | Breaking-change risk | Data-integrity risk | Required tests | Required user decision | Closure disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ML189-001 | High | High | Business logic / data correctness | CONFIRMED | High | High | `Master_List/Current Production Script/v1.8.9_Current_Production` | `compareRawDemoPForSectionReport_`; `buildMonthlyChangeSectionRows_` | Current code classifies disenrollment with `isSameDate_(effectiveDate, monthParts.firstDay)` at lines 10296-10305; Disenrollments section uses `rowMode: "strictDisenrollmentEffectiveDate"` at lines 10741-10745; row inclusion repeats same-day check at lines 10797-10800 while range mode exists at lines 10802-10805. | Monthly Change, Demo P sync, Disenrolled Exclusion, Master List | Incorrect production results for in-window non-first-day disenrollments. | Implement one approved date-window helper and use it in classification and row inclusion. | RC-001 | Wave 1 | Medium | High | T-001, T-002, T-003 | UD-001 | Active remediation item. |
| ML189-002 | High | High | Data-flow / workflow safety | CONFIRMED | High | High | `Master_List/Current Production Script/v1.8.9_Current_Production` | `preflightMonthlyUpdateForMonth_`; `runMonthlyUpdate`; `createMasterListForMonth_` | Preflight validates current Raw Data, previous Raw Data, and Demo P only at lines 811-826. `runMonthlyUpdate` mutates Monthly Change, Demo P, and Disenrolled Exclusion before Master List at lines 10964-10980. Master List replacement prompt appears later at lines 11132-11145. | Create Monthly Update, Demo P monthly sync, Disenrolled Exclusion, Master List | Partial monthly-update state if user cancels or replacement fails late. | Add target-output conflict/replacement decision to preflight before mutation. | RC-002 | Wave 1 | Low/Medium | High | T-004, T-005, T-006 | UD-002 | Active remediation item. |
| ML189-003 | Medium | High | Data integrity / business rules | CONFIRMED | Medium | High | `Master_List/Current Production Script/v1.8.9_Current_Production` | `copyPrimaryDemoPRowsToMasterListByHeader_` | Output is built in `primary` mode at line 11264, then falls back to `dob` and `first` at lines 11267-11268. | Create Master List, Create Monthly Update | Incorrect-looking success can mask Primary PMR assignment failure. | Fail closed or require explicit compatibility override if no primary rows are selected. | RC-003 | Wave 1 | Medium | Medium/High | T-007, T-008 | UD-002 | Active remediation item. |
| ML189-004 | Medium | Medium | Trigger/concurrency / data integrity | PARTIALLY CONFIRMED | Medium | Medium | `Master_List/Current Production Script/v1.8.9_Current_Production` | `runFrameworkTimed_`; `runWithWorkflowBusyFlag_`; `updateDemoPMonthlySync`; `createMasterList`; archive wrappers | `runFrameworkTimed_` already wraps callbacks with `runWithWorkflowBusyFlag_` at lines 15670-15677, and `runWithWorkflowBusyFlag_` uses `LockService.getDocumentLock()` at lines 15692-15714. Archive/hide wrappers route through `runFrameworkTimed_` at lines 7062-7064 and 7094-7112. Standalone `updateDemoPMonthlySync` uses manual timing at lines 8977-8992, and standalone `createMasterList` directly calls `createMasterListForMonth_` at lines 11103-11106. | Standalone Update Demo P, standalone Create Master List, any destructive workflow not routed through `runFrameworkTimed_` | Some concurrency risk remains, but core timed workflows are already protected. | Wrap uncovered standalone destructive entry points or route through `runFrameworkTimed_`. | RC-004 | Wave 3 | Low | Medium | T-013, T-014 | None if signatures are preserved. | Partially active remediation item. |
| ML189-005 | Medium | Medium | Code correctness / sorting | CONFIRMED | Medium | Medium | `Master_List/Current Production Script/v1.8.9_Current_Production` | `buildMonthlyChangeSectionRows_` | `disenrollEffectiveIdx` is resolved from `currentData.headerMap` at line 10785; rows pushed are report rows built from `reportHeaders`; sort can read the wrong index if report headers diverge. | Monthly Change Disenrollments section | Misordered Disenrollments section under future header/order changes. | Resolve a report-header-specific index for sorting. | RC-001 | Wave 1 | Low | Low/Medium | T-003 | None | Active remediation item; consolidate with ML189-001. |
| ML189-006 | Medium | High | Performance | OPTIMIZATION ONLY | Low | High | `Master_List/Current Production Script/v1.8.9_Current_Production` | `populateMonthlyChangeReportSections_` | Current code clears rows based on `reportSheet.getMaxRows() - HEADER_ROW` at lines 10902-10903 and applies column-A wrap to max rows at lines 10916-10917. | Monthly Change | Avoidable runtime on oversized grids; no confirmed correctness defect. | Defer to performance wave unless timing reports show release-blocking runtime. | RC-005 | Wave 4 | Low | Low | T-015, T-016 | None | Deferred optimization. |
| ML189-007 | Low | High | Maintainability / public entry points | CONFIRMED | Low | High | `Master_List/Current Production Script/v1.8.9_Current_Production` | `onOpen`; `hideSystemSheets_`; `showSystemSheets_`; `hideSystemSheetsNow`; `showSystemSheetsNow` | Menu callbacks use `hideSystemSheets_`/`showSystemSheets_` at lines 2883-2885; these wrappers delegate to public `Now` functions at lines 2962-2968, and public wrappers exist at lines 12379-12390. | System-sheet visibility menus | Maintenance confusion; low runtime risk because callbacks exist. | Either keep documented compatibility wrappers or retarget menu to public wrappers. | RC-006 | Wave 6 | Low | Low | T-017 | UD-003 if menu callback names change. | Deferred maintainability item. |
| ML189-008 | Low | High | Documentation alignment | DOCUMENTATION ONLY | Low | High | `Master_List/README.md`; `Master_List/Specs/Master_List_Framework_Specification_v2.0_UPDATEDv2.md` | Documentation authority text | Project documentation still references older authority snapshots while v1.8.9 is current review target. | Agent and maintainer onboarding | Stale source-of-truth references. | Update docs after approved remediation direction. | RC-007 | Wave 6 | None | None | T-018 | None | Deferred documentation item. |

## 4. Findings Rejected or Closed

No finding is rejected as incorrect, outdated, duplicate, or already corrected in full.

| Finding ID | Original description | Validated status | Current evidence | Reason for closure or rejection | Documentation update remaining | Traceability |
|---|---|---|---|---|---|---|
| ML189-006 | Monthly Change full-range clear/format pass. | OPTIMIZATION ONLY | Lines 10902-10917 still show broad clear/wrap. | Not closed; reclassified as non-correctness optimization and deferred to Wave 4. | No immediate docs required. | RC-005. |
| ML189-008 | Documentation authority text stale. | DOCUMENTATION ONLY | README/spec authority text remains separate from runtime source. | Not a code defect; deferred to Wave 6. | Yes. | RC-007. |

## 5. Consolidated Root-Cause Register

| Root-cause ID | Related finding IDs | Root cause | Current evidence | Affected workflows | Affected files | Affected functions | Dependencies | Proposed correction | Business-logic impact | Breaking-change risk | Data-integrity risk | Required tests | Recommended wave | Required user decisions |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RC-001 | ML189-001, ML189-005 | Monthly Change disenrollment policy is duplicated/inconsistent across classification, row inclusion, range branch, and sorting indexes. | Lines 10296-10305, 10741-10805, and 10785 show duplicated policy/index decisions. | Monthly Change; Demo P sync; Disenrolled Exclusion; Master List | Production script | `compareRawDemoPForSectionReport_`, `getMonthlyChangeSectionSpecs_`, `buildMonthlyChangeSectionRows_` | Month parts, Raw Data headers, date helpers, report headers | Create a single date-window helper; use it for classification and row inclusion; use report-header index for report-row sort. | May change which disenrollments are reported if broader rule is approved. | Medium | High | T-001, T-002, T-003 | Wave 1 | UD-001 |
| RC-002 | ML189-002 | Monthly Update preflight does not gather target-output conflict decisions before mutable phases. | Lines 811-826 omit target conflicts; lines 10964-10980 mutate before lines 11132-11145 replacement prompt. | Create Monthly Update | Production script | `preflightMonthlyUpdateForMonth_`, `runMonthlyUpdate`, `createMasterListForMonth_` | Monthly sheet naming, UI prompts, source sheets, Demo P, Master List | Add preflight target conflict checks and replacement decision before Demo P/Disenrolled mutation. | Workflow prompt timing changes only. | Low/Medium | High | T-004, T-005, T-006 | Wave 1 | UD-002 |
| RC-003 | ML189-003 | Master List generation allows non-primary fallback when Primary PMR output is empty. | Lines 11264-11268 show primary, DOB, and first-row fallback sequence. | Create Master List; Create Monthly Update | Production script | `copyPrimaryDemoPRowsToMasterListByHeader_` | Demo P headers, Primary PMR Row values, Master List headers | Fail closed by default or require explicit compatibility override. | Potential output behavior change when primary assignment fails. | Medium | Medium/High | T-007, T-008 | Wave 1 | UD-002 |
| RC-004 | ML189-004 | Busy-flag coverage exists but is not uniformly used by standalone destructive public wrappers. | Lines 15670-15714 define protected wrapper; lines 8977-8992 and 11103-11106 show standalone paths outside `runFrameworkTimed_`. | Update Demo P; Create Master List; potentially other standalone mutators | Production script | `updateDemoPMonthlySync`, `createMasterList`, `runFrameworkTimed_`, `runWithWorkflowBusyFlag_` | LockService, PropertiesService, timing helpers | Route uncovered destructive wrappers through `runFrameworkTimed_` or an equivalent one-time busy guard. | None if public signatures preserved. | Low | Medium | T-013, T-014 | Wave 3 | None |
| RC-005 | ML189-006 | Monthly Change final range operations use grid bounds rather than output bounds. | Lines 10902-10917. | Monthly Change | Production script | `populateMonthlyChangeReportSections_` | Sheet dimensions, matrix output, formatting | Bound clear/wrap ranges to report output area after resize. | None. | Low | Low | T-015, T-016 | Wave 4 | None |
| RC-006 | ML189-007 | Menu callback compatibility wrappers are valid but naming boundary is unclear. | Lines 2883-2885, 2962-2968, 12379-12390. | System sheet menu | Production script | `onOpen`, `hideSystemSheets_`, `showSystemSheets_`, `hideSystemSheetsNow`, `showSystemSheetsNow` | Menu callbacks, public wrappers | Document wrappers or retarget menu to public wrapper names. | None expected. | Low | Low | T-017 | Wave 6 | UD-003 if callback names change |
| RC-007 | ML189-008 | Project docs lag current production source version. | README/spec authority references are older than v1.8.9. | Documentation and agent startup | README/spec docs | N/A | Project documentation | Update source-of-truth text to v1.8.9 after remediation scope is approved. | None. | None | None | T-018 | Wave 6 | None |

## 6. Prioritized Remediation Plan

### Wave 1 — Critical correctness and data safety

| Field | Plan |
|---|---|
| Wave identifier | Wave 1 Release — Critical correctness and data safety |
| Objective | Correct Monthly Change disenrollment handling, prevent late-cancel monthly-update mutation, and enforce Primary PMR Row architecture. |
| Findings resolved | ML189-001, ML189-002, ML189-003, ML189-005 |
| Root causes resolved | RC-001, RC-002, RC-003 |
| Files affected | `Master_List/Current Production Script/v1.8.9_Current_Production` or next versioned production script. |
| Functions affected | `compareRawDemoPForSectionReport_`, `getMonthlyChangeSectionSpecs_`, `buildMonthlyChangeSectionRows_`, `preflightMonthlyUpdateForMonth_`, `runMonthlyUpdate`, `createMasterListForMonth_`, `copyPrimaryDemoPRowsToMasterListByHeader_`. |
| Dependencies affected | Date helpers, month context, Raw Data headers, Monthly Change report headers, Demo P headers, Master List headers, UI prompts, timing. |
| Exact proposed changes | Add central disenrollment date-rule helper; use report-header sort index; move target-output conflict/replacement decision before mutation; fail or explicitly gate Master List non-primary fallback. |
| Business-logic impact | Requires confirmation of the approved disenrollment window and Primary PMR fallback policy. |
| Breaking-change risk | Medium. |
| Data-integrity risk | High if left unresolved; medium during correction due output-count changes. |
| Destructive-operation risk | Medium; changes affect monthly-update mutation ordering. |
| Regression risk | Medium. |
| Required tests | T-001 through T-008. |
| Recommended version increment | `v1.8.9.1` patch if approved behavior is clarified without public signature changes. |
| Release blockers | UD-001 and UD-002. |
| Required user decisions | Confirm disenrollment date rule; confirm Primary PMR fallback/late replacement policy. |
| Rollback considerations | Retain v1.8.9 as rollback source; outputs are recreatable but Demo P/disenrolled tests must use controlled data. |
| Implementation independence | Can be implemented independently first. |
| Dependencies on other waves | None. |

### Wave 2 — Runtime stability and missing dependencies

No separate Wave 2 implementation is currently required. The review found no confirmed missing top-level dependencies or missing menu callbacks. If Wave 1 implementation introduces shared helper changes, rerun the dependency inventory before release.

### Wave 3 — Trigger, concurrency, and public API safety

| Field | Plan |
|---|---|
| Wave identifier | Wave 3 Release — Trigger, concurrency, and public API safety |
| Objective | Ensure existing busy-flag/lock pattern protects uncovered standalone destructive public workflows. |
| Findings resolved | ML189-004 |
| Root causes resolved | RC-004 |
| Files affected | Next versioned production script. |
| Functions affected | `updateDemoPMonthlySync`, `createMasterList`, possibly other standalone destructive wrappers identified during implementation audit. |
| Dependencies affected | `runFrameworkTimed_`, `runWithWorkflowBusyFlag_`, `LockService`, `PropertiesService`, timing helpers. |
| Exact proposed changes | Route uncovered standalone destructive public wrappers through existing timed/busy wrapper or equivalent single guard. |
| Business-logic impact | None expected. |
| Breaking-change risk | Low if signatures and menu names remain stable. |
| Data-integrity risk | Medium if left unresolved for standalone duplicate invocations. |
| Required tests | T-013, T-014, menu smoke tests. |
| Recommended version increment | Patch after Wave 1, e.g. `v1.8.9.2`, or combine with Wave 1 if user approves. |
| Release blockers | None if public signatures are preserved. |
| Implementation independence | Independent after Wave 1; can be combined only if scope remains small. |

### Wave 4 — Performance improvements

| Field | Plan |
|---|---|
| Wave identifier | Wave 4 Release — Performance improvements |
| Objective | Reduce Monthly Change unnecessary range clear/format work. |
| Findings resolved | ML189-006 |
| Root causes resolved | RC-005 |
| Files affected | Next versioned production script. |
| Functions affected | `populateMonthlyChangeReportSections_`. |
| Dependencies affected | Sheet resizing, matrix output, formatting helpers. |
| Exact proposed changes | Clear and wrap only actual output body or controlled old used range after grid resize/trimming. |
| Business-logic impact | None. |
| Breaking-change risk | Low. |
| Data-integrity risk | Low. |
| Required tests | T-015, T-016. |
| Recommended version increment | Patch. |
| Release blockers | Timing evidence if performance is claimed as release benefit. |
| Implementation independence | Independent from correctness waves. |

### Wave 5 — Duplicate, dead, and orphan-code cleanup

No removal wave is ready. The v1.8.9 inventory identifies no duplicate declarations and 107 no-static-caller functions, but static no-caller status is not sufficient for deletion in Apps Script. A future Wave 5 requires dynamic callback, trigger, menu, web-app, macro, host, library, string-dispatch, and diagnostic reference review.

### Wave 6 — Maintainability, diagnostics, and documentation

| Field | Plan |
|---|---|
| Wave identifier | Wave 6 Release — Maintainability, diagnostics, and documentation |
| Objective | Clarify public/internal system-sheet callback boundary and update stale authority documentation. |
| Findings resolved | ML189-007, ML189-008 |
| Root causes resolved | RC-006, RC-007 |
| Files affected | Production script only if menu callback names are retargeted; README/spec docs for authority update. |
| Functions affected | `onOpen`, `hideSystemSheets_`, `showSystemSheets_`, `hideSystemSheetsNow`, `showSystemSheetsNow` if code path is changed. |
| Dependencies affected | Menu callbacks, public wrappers, project documentation. |
| Exact proposed changes | Either document underscore wrappers as menu compatibility callbacks or point menu to public wrappers; update README/spec current-source text. |
| Business-logic impact | None. |
| Breaking-change risk | Low. |
| Data-integrity risk | Low. |
| Required tests | T-017, T-018. |
| Recommended version increment | Patch for code/docs combo; documentation-only change can remain unversioned if no production script changes. |
| Release blockers | UD-003 if menu callback names are changed. |
| Implementation independence | Independent after higher-priority waves. |

## 7. User Decision Register

| Decision ID | Related findings | Related root causes | Decision required | Available options | Recommended option | Impact of each option | Risk of no decision | Approval before implementation | Approval before release |
|---|---|---|---|---|---|---|---|---|---|
| UD-001 | ML189-001, ML189-005 | RC-001 | Confirm approved Monthly Change disenrollment effective-date window. | A: previous-month first day through report date inclusive; B: current report/month first day only; C: another explicit date window. | A, because current user-facing message already describes a broader range. | A changes output inclusion; B requires message/dead-branch cleanup; C needs explicit rule and tests. | Monthly Change and Demo P sync may continue omitting or over-including PMRs. | Yes | Yes |
| UD-002 | ML189-002, ML189-003 | RC-002, RC-003 | Confirm fail-closed behavior for Master List replacement and Primary PMR fallback. | A: fail/cancel before any mutation; B: keep late prompt and document risk; C: allow explicit compatibility fallback with warning. | A for mutation ordering; A or C for Primary PMR fallback depending on user tolerance. | A reduces partial states; B preserves current risk; C preserves compatibility but must warn visibly. | Partial updates and masked Primary PMR failures remain possible. | Yes | Yes |
| UD-003 | ML189-007 | RC-006 | Choose system-sheet menu callback naming policy. | A: retarget menu to public `Now` wrappers; B: keep underscore callbacks and document as compatibility. | B if minimizing code change; A if enforcing naming boundary. | A requires menu smoke testing; B requires documentation but no behavior change. | Future cleanup may break menu callbacks. | Only if changing code | Yes for closure |

## 8. Test Plan

| Test ID | Related findings | Wave | Objective | Preconditions | Test data | Steps | Expected result | Failure criteria | Evidence required | Release blocking |
|---|---|---|---|---|---|---|---|---|---|---|
| T-001 | ML189-001 | Wave 1 | Validate disenrollment date-window boundaries. | Controlled prior/current Raw Data available. | PMRs with effective dates before, on, within, and after approved window. | Build Monthly Change. | Only approved-window disenrollments appear. | Missing in-window PMR or included out-of-window PMR. | Monthly Change rows and Dashboard Quality notes. | Yes |
| T-002 | ML189-001 | Wave 1 | Validate Demo P sync PMR collection. | Monthly Change from T-001 exists. | Same PMRs. | Run Update Demo P monthly sync. | Changed/disenrolled PMRs are collected according to approved rule. | Wrong PMR set. | Timing report and Demo P before/after controlled sample. | Yes |
| T-003 | ML189-001, ML189-005 | Wave 1 | Validate Disenrollments sort after report header changes. | Controlled report headers. | Multiple disenrollment dates. | Build Monthly Change with normal and reordered headers. | Disenrollment rows sort by effective date. | Sort uses wrong column. | Report output snapshot or exported validation rows. | Yes |
| T-004 | ML189-002 | Wave 1 | Existing Monthly Change preflight. | Target Monthly Change already exists. | Controlled workbook. | Run Create Monthly Update. | Workflow stops before Demo P mutation or prompts before mutation per approved design. | Demo P changes before decision. | Timing report and sheet state. | Yes |
| T-005 | ML189-002 | Wave 1 | Existing Master List cancel preflight. | Target Master List already exists. | Controlled workbook. | Run Create Monthly Update and choose cancel/no. | No Demo P, Archive - Demo P, or Disenrolled mutation occurs. | Any prior mutation occurs. | Before/after row counts and timing. | Yes |
| T-006 | ML189-002 | Wave 1 | Existing Master List confirm path. | Target Master List exists. | Controlled workbook. | Run Create Monthly Update and confirm replacement. | Workflow completes in correct sequence. | Missing output or partial state. | Timing, output sheets, Index. | Yes |
| T-007 | ML189-003 | Wave 1 | Primary PMR valid path. | Demo P has valid Primary PMR Row flags. | Multi-row PMR sample. | Create Master List. | Only primary rows copied. | Non-primary rows copied. | Master List row comparison. | Yes |
| T-008 | ML189-003 | Wave 1 | Primary PMR empty/missing fallback policy. | Demo P lacks true primary rows or header. | Controlled invalid Demo P. | Create Master List. | Fails or explicitly warns according to approved policy. | Silent fallback without warning. | Error/warning and no invalid output. | Yes |
| T-009 | All Wave 1 | Wave 1 | Menu compatibility smoke. | Workbook reloaded. | N/A | Confirm relevant menu items still invoke callbacks. | Menus work with same labels/signatures unless approved otherwise. | Missing menu callback. | Menu smoke log. | Yes |
| T-010 | All Wave 1 | Wave 1 | Dashboard Quality affected sections. | Wave 1 code installed. | Controlled workbook. | Run Dashboard Quality Workflow. | Affected sections populate without false pass/fail. | Unexpected NOT RUN/failure. | Dashboard Quality report. | Yes |
| T-011 | All Wave 1 | Wave 1 | Framework Timing review. | Timing enabled. | Controlled workflows. | Run affected workflows. | Timing report records expected steps/errors. | Missing or misleading timing. | Framework Timing Report. | Yes |
| T-012 | All Wave 1 | Wave 1 | Rollback test. | v1.8.9 rollback source retained. | Controlled workbook copy. | Restore prior version or known-good source if Wave 1 fails. | Rollback path is documented and executable. | No rollback path. | Rollback notes. | Yes |
| T-013 | ML189-004 | Wave 3 | Duplicate-run / concurrency guard. | Wave 3 code installed. | Controlled workbook. | Invoke two destructive workflows back-to-back. | Second invocation exits with busy message. | Concurrent mutation allowed. | Error/notification and timing. | Yes |
| T-014 | ML189-004 | Wave 3 | Public API compatibility. | Wave 3 code installed. | N/A | Invoke public wrappers directly. | Signatures and expected return behavior preserved. | Signature break. | Execution log. | Yes |
| T-015 | ML189-006 | Wave 4 | Oversized Monthly Change grid. | Oversized template/report grid. | Small output. | Build Monthly Change. | No stale rows and bounded formatting. | Stale content/format issue. | Output dimensions and visual/values check. | Yes for Wave 4 |
| T-016 | ML189-006 | Wave 4 | Performance comparison. | Timing enabled before/after. | Representative monthly data. | Compare timing reports. | Runtime stable or improved. | Regression beyond approved threshold. | Timing reports. | Yes for Wave 4 performance claim |
| T-017 | ML189-007 | Wave 6 | System Sheets menu callback. | Workbook reloaded. | N/A | Hide and show system sheets. | Menu actions succeed and hidden states match governance. | Menu error or wrong visibility. | Menu result/timing. | Yes for code callback change |
| T-018 | ML189-008 | Wave 6 | Documentation authority review. | Docs updated. | N/A | Review README/spec paths and current-source text. | Current v1.8.9 or next version authority is clear. | Stale authority remains. | Diff and link review. | Yes for doc closure |

## 9. Implementation Recommendation

**Conclusion:** Ready to implement Wave 1 after required user decisions.

**Evidence:** Every Wave 1 finding has current-code evidence in v1.8.9, dependencies and affected callers are identified, no missing top-level dependency blocks implementation, and the proposed corrections can preserve public function names and the single-file architecture.

**Blocking decisions before implementation:** `UD-001` and `UD-002`.

**Do not implement:** Wave 3, Wave 4, Wave 5, or Wave 6 until Wave 1 is approved and either completed or intentionally deferred.

## 10. Wave Release Register

| Wave Release identifier | Wave title | Governing production version | Recommended production version | Included finding IDs | Included root-cause IDs | Release objective | Files affected | Functions affected | Public APIs / menus / triggers affected | Sheets/templates/system sheets/reports affected | Exact approved scope | Excluded/deferred scope | Business-logic impact | Breaking-change risk | Data-integrity risk | Required setup/migration | Required tests | Release blockers | Required decisions | Rollback requirements | Release status | Closure status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Wave 1 Release | Critical correctness and data safety | v1.8.9 | v1.8.9.1 | ML189-001, ML189-002, ML189-003, ML189-005 | RC-001, RC-002, RC-003 | Correct Monthly Change date logic, prevent late-cancel mutation, enforce Primary PMR policy. | Production script | Listed in Wave 1 plan | Menu labels/signatures preserved | Monthly Change, Demo P, Master List, Disenrolled Exclusion, timing/quality reports | Code correction only after approvals. | Performance and docs deferred. | Requires rule confirmation. | Medium | High | No migration expected; controlled setup/test sheets required. | T-001 through T-012 | UD-001, UD-002 | UD-001, UD-002 | Retain v1.8.9 rollback source. | PLANNED | NOT STARTED |
| Wave 2 Release | Runtime stability and missing dependencies | v1.8.9 | N/A | None | None | No active Wave 2 scope. | None | None | None | None | Rerun dependency scan after Wave 1. | Implementation deferred until needed. | None | None | None | None | Dependency validation only. | None | None | N/A | DEFERRED | NOT APPLICABLE |
| Wave 3 Release | Trigger, concurrency, and public API safety | v1.8.9 | v1.8.9.2 or later | ML189-004 | RC-004 | Extend existing busy guard to uncovered standalone destructive wrappers. | Production script | `updateDemoPMonthlySync`, `createMasterList`, wrappers identified in audit | Public signatures preserved; menus unchanged | Timing report, properties, LockService | Busy-guard routing only. | Correctness/performance/docs deferred. | None | Low | Medium | No migration expected. | T-013, T-014, menu tests | Wave 1 priority | None if signatures preserved | Retain prior production source. | PLANNED | NOT STARTED |
| Wave 4 Release | Performance improvements | v1.8.9 | Later patch | ML189-006 | RC-005 | Bound Monthly Change clear/format ranges. | Production script | `populateMonthlyChangeReportSections_` | None | Monthly Change, timing report | Performance-only code path. | Correctness/docs deferred. | None | Low | Low | No migration expected. | T-015, T-016 | Timing evidence for claim | None | Retain prior production source. | PLANNED | NOT STARTED |
| Wave 5 Release | Duplicate, dead, and orphan-code cleanup | v1.8.9 | Not assigned | None active | None active | No removal scope until full dynamic reference review. | None | None | Public API removal prohibited without review | None | Analysis only. | All removals deferred. | None | Unknown | Unknown | N/A | Future reference review | Full dependency evidence missing | User approval for any removal | N/A | DEFERRED | NOT APPLICABLE |
| Wave 6 Release | Maintainability, diagnostics, and documentation | v1.8.9 | Later patch or docs-only | ML189-007, ML189-008 | RC-006, RC-007 | Clarify system-sheet callback boundary and update authority docs. | Production script and/or docs | `onOpen`, wrappers, README/spec | Menu callback names if changed | Docs; possible system sheet menu | Docs and optional callback retarget. | Correctness/performance deferred. | None | Low | Low | No migration expected. | T-017, T-018 | UD-003 if changing callback names | UD-003 if changing code | Retain prior production/docs. | PLANNED | NOT STARTED |

## 11. Wave Release Closure Checklists

### Wave 1 Release closure checklist — Critical correctness and data safety

| Check ID | Category | Closure criterion | Required evidence | Status | Release blocking | Notes |
|---|---|---|---|---|---|---|
| W1-C01 | Version/source control | Governing source v1.8.9 and proposed v1.8.9.1 identified. | Diff and version line. | NOT TESTED | Yes | No code implemented yet. |
| W1-C02 | Dependencies | Affected functions and callers reviewed. | Updated inventory/call review. | NOT TESTED | Yes | Must include dynamic/menu review. |
| W1-C03 | Workflow validation | Monthly Change, Demo P sync, Disenrolled, Master List workflows pass. | T-001 through T-008 evidence. | NOT TESTED | Yes | Controlled data required. |
| W1-C04 | Destructive operations | Cancel path does not mutate Demo P/Disenrolled. | T-005 before/after evidence. | NOT TESTED | Yes | Release blocker. |
| W1-C05 | Dashboard/diagnostic | Dashboard Quality and Timing reflect expected results. | T-010 and T-011 reports. | NOT TESTED | Yes | No false pass/fail. |
| W1-C06 | Regression | Menus and public functions remain compatible. | T-009 evidence. | NOT TESTED | Yes | Signatures preserved. |
| W1-C07 | Rollback | v1.8.9 rollback point documented. | T-012 notes. | NOT TESTED | Yes | Required before release. |
| W1-C08 | User approval | UD-001 and UD-002 approved. | Recorded approval. | BLOCKED | Yes | Required before implementation. |

**Wave 1 checklist conclusion:** Wave ready for implementation approval only after UD-001 and UD-002 are approved.

### Wave 2 Release closure checklist — Runtime stability and missing dependencies

| Check ID | Category | Closure criterion | Required evidence | Status | Release blocking | Notes |
|---|---|---|---|---|---|---|
| W2-C01 | Scope | Confirm no active missing dependency finding. | Dependency scan. | NOT APPLICABLE | No | No Wave 2 scope now. |
| W2-C02 | Post-Wave 1 validation | Rerun dependency scan if Wave 1 adds helpers. | Inventory diff. | NOT TESTED | Yes if Wave 1 changes dependencies | Deferred. |

**Wave 2 checklist conclusion:** Wave deferred / not applicable until a missing-dependency scope exists.

### Wave 3 Release closure checklist — Trigger, concurrency, and public API safety

| Check ID | Category | Closure criterion | Required evidence | Status | Release blocking | Notes |
|---|---|---|---|---|---|---|
| W3-C01 | Source control | Proposed version identified. | Diff/version. | NOT TESTED | Yes | Later patch. |
| W3-C02 | Public API | Signatures preserved. | Direct invocation tests. | NOT TESTED | Yes | T-014. |
| W3-C03 | Concurrency | Duplicate invocation blocked. | T-013 evidence. | NOT TESTED | Yes | Controlled workbook. |
| W3-C04 | Menus/triggers | Existing menus and triggers still work. | Menu/trigger smoke tests. | NOT TESTED | Yes | No callback removal. |
| W3-C05 | Post-release | Busy flag clears after success/failure. | Timing/properties evidence. | NOT TESTED | Yes | Avoid stuck busy state. |

**Wave 3 checklist conclusion:** Wave planned, not ready for release.

### Wave 4 Release closure checklist — Performance improvements

| Check ID | Category | Closure criterion | Required evidence | Status | Release blocking | Notes |
|---|---|---|---|---|---|---|
| W4-C01 | Scope | Change limited to Monthly Change range bounds. | Diff review. | NOT TESTED | Yes | No logic changes. |
| W4-C02 | Output integrity | No stale rows or formatting regressions. | T-015 evidence. | NOT TESTED | Yes | Oversized grid test. |
| W4-C03 | Performance | Timing stable/improved if performance claim is made. | T-016 timing report. | NOT TESTED | Yes | Required for release note. |
| W4-C04 | Regression | Monthly Change output matches expected sections. | Dashboard Quality/report output. | NOT TESTED | Yes | Controlled data. |

**Wave 4 checklist conclusion:** Wave planned, not ready for release.

### Wave 5 Release closure checklist — Duplicate, dead, and orphan-code cleanup

| Check ID | Category | Closure criterion | Required evidence | Status | Release blocking | Notes |
|---|---|---|---|---|---|---|
| W5-C01 | Reference review | Direct, indirect, dynamic, menu, trigger, web, macro, library, host, string, config, test references reviewed. | Complete reference matrix. | BLOCKED | Yes | Not available yet. |
| W5-C02 | User approval | Any removal approved. | Recorded approval. | BLOCKED | Yes | No removal proposed now. |

**Wave 5 checklist conclusion:** Wave deferred; no cleanup implementation is ready.

### Wave 6 Release closure checklist — Maintainability, diagnostics, and documentation

| Check ID | Category | Closure criterion | Required evidence | Status | Release blocking | Notes |
|---|---|---|---|---|---|---|
| W6-C01 | Menu policy | UD-003 resolved if callback names change. | Recorded decision. | NOT TESTED | Yes if code changes | Documentation-only path avoids code risk. |
| W6-C02 | Menu validation | System sheet hide/show menu works. | T-017 evidence. | NOT TESTED | Yes for code change | Workbook reload required. |
| W6-C03 | Documentation | README/spec authority text current. | T-018 diff/link review. | NOT TESTED | Yes for doc closure | No runtime impact. |
| W6-C04 | Regression | No public wrapper removed. | Diff/reference review. | NOT TESTED | Yes | Preserve compatibility. |

**Wave 6 checklist conclusion:** Wave planned; documentation-only portion can proceed after higher-priority decisions if desired.

## 12. Implementation and Wave Release Recommendation

**Conclusion:** Ready to approve Wave 1 implementation after required user decisions.

**Why this conclusion was selected:** The v1.8.9 current production source, exhaustive review, and function inventory are visible and complete enough for Wave 1 planning. Every Wave 1 finding has direct current-code evidence. No critical missing artifact blocks planning. However, Wave 1 changes touch business-rule interpretation and fail-closed behavior, so user approval is required before implementation.

**What must happen next:**

1. User approves `UD-001` Monthly Change disenrollment date-window rule.
2. User approves `UD-002` fail-closed behavior for Master List replacement timing and Primary PMR fallback.
3. After approval, implement only Wave 1 in the next versioned production source.
4. Run release-blocking tests T-001 through T-012 before Wave 1 release.

**Artifacts required:** v1.8.9 production source, this remediation plan, v1.8.9 exhaustive review, v1.8.9 function inventory, Dashboard Quality report, Framework Timing report, and controlled workbook test data.

**Release-blocking tests:** T-001 through T-012 for Wave 1.

**May implementation begin now?** No, not until `UD-001` and `UD-002` are explicitly approved.

**May release preparation begin now?** Wave 1 release package preparation may begin as planning only; code implementation and release validation must wait for approval and test evidence.

**Additional validation required:** Runtime spreadsheet validation is required before any wave can be marked released or closed.
