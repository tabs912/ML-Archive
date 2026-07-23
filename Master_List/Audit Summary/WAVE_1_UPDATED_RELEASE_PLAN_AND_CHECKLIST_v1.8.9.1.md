# Wave 1 Updated Release Plan and Checklist — Master List v1.8.9.1

**Release:** Wave 1 — Strict disenrollment, Master List preflight, and Primary PMR fail-closed safeguards  
**Production source:** `Master_List/Current Production Script/v1.8.9.1_Current_Production`  
**Baseline source:** `Master_List/Current Production Script/v1.8.9_Current_Production`  
**Status:** CLOSED — WAVE 1 COMPLETED AND PASSED REVIEW  
**Change-control note:** This plan supersedes the earlier v1.8.9 Wave 1 planning-only checklist for the v1.8.9.1 implementation.

---

## Simple To-Do Checklist

Use this section first. Wave 1 is now closed based on the completed checklist, v1.8.9.2 update notes, and Timing/Quality report evidence supplied in `Master_List/Reports/`.

### A. Owner Decisions and Scope

- [x] `UD-001` recorded — `Disenrollment Effective Date` is always the first day of the month.
- [x] `UD-002` recorded — `runMonthlyUpdate` order is `Monthly Change -> Update Demo P -> Update Disenrolled -> Create Master List`.
- [x] Scope includes Primary PMR fail-closed behavior for Master List creation.
- [x] Scope includes Master List replacement confirmation in Create Monthly Update preflight.
- [x] Scope includes report-header-based Disenrollments sort correction.
- [x] Scope excludes framework rebuild, menu renames, trigger redesign, binary report updates, and unrelated cleanup.

### B. Repository Implementation

- [x] New versioned production file created: `v1.8.9.1_Current_Production`.
- [x] Prior `v1.8.9` production source not overwritten.
- [x] Version constant updated to `1.8.9.1`.
- [x] `copyPrimaryDemoPRowsToMasterListByHeader_` removes DOB/first-row fallback.
- [x] Required Primary PMR fail-closed error message is present.
- [x] `preflightMonthlyUpdateForMonth_` checks target Master List conflict.
- [x] Existing Master List preflight prompt uses `YES_NO` buttons.
- [x] Preflight throws `Monthly Update cancelled: Existing Master List not replaced.` when replacement is not confirmed.
- [x] Preflight returns `masterListExistsAndReplaceConfirmed` metadata.
- [x] `runMonthlyUpdate` preserves the approved execution order.
- [x] `runMonthlyUpdate` passes preflight metadata to `createMasterListForMonth_`.
- [x] `createMasterListForMonth_` bypasses duplicate prompt only when matching preflight confirmation exists.
- [x] Standalone Create Master List prompt behavior is preserved.
- [x] `isMonthlyChangeDisenrollmentEffectiveDate_` helper added.
- [x] Monthly Change classification uses the helper.
- [x] Monthly Change Disenrollments row inclusion uses the helper.
- [x] Disenrollments sort uses the report-header effective-date index.
- [x] Release notes created.

### C. Repository Checks

- [x] Static syntax check passes on a temporary `.js` copy.
- [x] Static search confirms DOB/first-row fallback calls are removed from Master List copy logic.
- [x] Static search confirms helper, preflight flag, fail-closed error, and report-header sort references are present.
- [x] Pull-request preparation tool passes.
- [x] No binary files are staged.
- [x] Diff is limited to the versioned production source and text release/checklist artifacts.

### D. Runtime Validation To Run in Controlled Workbook

- [x] Install or test `v1.8.9.1_Current_Production` in a controlled workbook.
- [x] Reload workbook and verify menus load.
- [x] Confirm Format Dashboard, templates, Dashboard Quality Report, and Framework Timing Report are available.
- [x] Format controlled prior-month Raw Data.
- [x] Format controlled current-month Raw Data.
- [x] Build Monthly Change with first-of-month disenrollment test data.
- [x] Confirm applicable first-of-month disenrollments are included.
- [x] Confirm non-first-of-month disenrollment effective dates are excluded.
- [x] Confirm wrong-month first-of-month disenrollment effective dates are excluded.
- [x] Confirm Disenrollments section sorts by report-header effective-date column.
- [x] Run Update Demo P Monthly Sync from the Monthly Change report.
- [x] Confirm Demo P sync PMR set matches Monthly Change output.
- [x] Run Create Master List with valid Primary PMR rows.
- [x] Confirm Master List contains only Primary PMR rows.
- [x] Run Create Master List with missing/empty Primary PMR Row values.
- [x] Confirm Master List creation fails with the required Primary PMR error.
- [x] Run Create Monthly Update when the target Master List does not exist.
- [x] Confirm sequence is Monthly Change, Update Demo P, Update Disenrolled, Create Master List.
- [x] Run Create Monthly Update when the target Master List exists and choose **No** or close the prompt.
- [x] Confirm workflow stops with `Monthly Update cancelled: Existing Master List not replaced.`
- [x] Confirm no Monthly Change, Demo P, Disenrolled Exclusion, or Master List mutation occurs after the cancelled preflight.
- [x] Run Create Monthly Update when the target Master List exists and choose **Yes**.
- [x] Confirm the workflow completes and does not show a duplicate Master List replacement prompt.
- [x] Run standalone Create Master List with an existing target Master List.
- [x] Confirm standalone Create Master List still prompts for replacement.
- [x] Run Dashboard Quality workflow.
- [x] Review Framework Timing Report for expected steps and stop/error paths.
- [x] Confirm tab order, visibility, templates, and protected/system sheets remain valid.
- [x] Document rollback path to v1.8.9.

### E. Closure Decision

- [x] READY FOR TESTING — repository checks passed and controlled-workbook testing can begin.
- [x] TESTING IN PROGRESS — runtime validation started but not complete.
- [ ] FAILED VALIDATION — at least one release-blocking runtime test failed.
- [x] READY FOR RELEASE — all release-blocking tests passed or have approved exceptions.
- [x] RELEASED — v1.8.9.1/v1.8.9.2 installed/tested in the target workbook path.
- [x] CLOSED — post-release validation complete and evidence archived.

**Current closure decision:** CLOSED. Wave 1 implementation, runtime validation, Dashboard Quality review, Framework Timing review, and owner review are recorded as complete/passed.

---

# Full Updated Release Plan and Checklist

## 1. Release Objective

Wave 1 v1.8.9.1 implements targeted safeguards requested for the Master List production script without changing the owner-approved monthly update sequence or broadening disenrollment date logic.

The release objective is to:

1. Preserve strict first-of-month disenrollment business logic.
2. Centralize Monthly Change disenrollment effective-date evaluation.
3. Sort Monthly Change Disenrollments using report headers rather than source headers.
4. Prompt for existing Master List replacement during Create Monthly Update preflight.
5. Preserve the approved Create Monthly Update order.
6. Avoid duplicate Master List replacement prompts after preflight confirmation.
7. Fail closed when no Primary PMR rows are available for Master List creation.

## 2. Release Scope

### Included

| Scope item | Implementation status | Notes |
|---|---:|---|
| New versioned production source | DONE | `v1.8.9.1_Current_Production` created. |
| Version constant increment | DONE | `MASTER_LIST_MERGE_ML_VERSION = "1.8.9.1"`. |
| Strict disenrollment helper | DONE | `isMonthlyChangeDisenrollmentEffectiveDate_`. |
| Monthly Change classification helper usage | DONE | `compareRawDemoPForSectionReport_`. |
| Monthly Change row inclusion helper usage | DONE | `buildMonthlyChangeSectionRows_`. |
| Disenrollments report-header sort index | DONE | Uses `reportHeaders` index for `Disenrollment Effective Date` / `Disenrollment Date`. |
| Master List preflight conflict prompt | DONE | `preflightMonthlyUpdateForMonth_`. |
| Preflight replacement metadata | DONE | `masterListExistsAndReplaceConfirmed`. |
| Approved monthly-update sequence | DONE | `runMonthlyUpdate` order preserved. |
| Master List duplicate prompt bypass | DONE | `createMasterListForMonth_` consumes matching preflight metadata. |
| Primary PMR fail-closed behavior | DONE | DOB/first fallback removed; required error thrown. |
| Release notes | DONE | `WAVE_1_IMPLEMENTATION_RELEASE_NOTES_v1.8.9.1.md`. |

### Excluded / Deferred

| Deferred item | Reason | Planned disposition |
|---|---|---|
| Framework rebuild | Not requested; violates incremental change scope. | Do not perform. |
| Menu renames or public API breaking changes | Not needed for Wave 1 safeguards. | Preserve compatibility. |
| Trigger/concurrency expansion | Separate lower-priority wave. | Later Wave 3 if requested. |
| Monthly Change performance range optimization | Optimization-only. | Later Wave 4 if timing evidence supports it. |
| Binary reports or screenshots | Binary artifacts are not implementation artifacts. | Do not commit unless explicitly requested. |

## 3. Owner Decisions and Business Rules

| Decision | Recorded owner rule | Release handling |
|---|---|---|
| `UD-001` | `Disenrollment Effective Date` is always the first day of the month. | Preserve strict first-of-month check with `isMonthlyChangeDisenrollmentEffectiveDate_`. |
| `UD-002` | `runMonthlyUpdate` path is Monthly Change, Update Demo P, Update Disenrolled, Create Master List. | Preserve this order in `runMonthlyUpdate`; only move the existing Master List replacement decision into preflight metadata for Create Monthly Update. |
| Primary PMR fallback | Master List must not silently fall back to DOB/first row when no Primary PMR rows exist. | Throw the required fail-closed Primary PMR error. |

## 4. Files in Release Package

| File | Purpose | Release status |
|---|---|---:|
| `Master_List/Current Production Script/v1.8.9.1_Current_Production` | Versioned production implementation. | DONE |
| `Master_List/Audit Summary/WAVE_1_IMPLEMENTATION_RELEASE_NOTES_v1.8.9.1.md` | Implementation release notes and runtime validation requirements. | DONE |
| `Master_List/Audit Summary/WAVE_1_UPDATED_RELEASE_PLAN_AND_CHECKLIST_v1.8.9.1.md` | Consolidated simple checklist plus full updated release plan. | DONE |

## 5. Function-Level Change Plan

| Function | Change | Validation required |
|---|---|---|
| `copyPrimaryDemoPRowsToMasterListByHeader_` | Remove DOB/first fallback; build only Primary PMR rows; throw required error if output is empty. | Valid Primary PMR path and missing Primary PMR fail-closed path. |
| `preflightMonthlyUpdateForMonth_` | Add target Master List existence check, `YES_NO` prompt, cancellation error, and replacement-confirmed metadata. | Existing Master List yes/no/close prompt tests. |
| `runMonthlyUpdate` | Store preflight object; preserve sequence; pass preflight object to Create Master List. | Timing sequence confirms exact approved order. |
| `createMasterListForMonth_` | Accept optional preflight object; bypass internal prompt only if matching target replacement was confirmed. | Create Monthly Update confirm path and standalone Create Master List prompt path. |
| `isMonthlyChangeDisenrollmentEffectiveDate_` | New helper using `isSameDate_(effectiveDate, monthParts.firstDay)`. | First-of-month and non-first-of-month boundaries. |
| `compareRawDemoPForSectionReport_` | Use helper for disenrollment PMR classification. | Monthly Change classification test data. |
| `buildMonthlyChangeSectionRows_` | Use helper for row inclusion; sort Disenrollments with report-header effective-date index. | Row inclusion and reordered-header sort tests. |

## 6. Required Runtime Test Matrix

| Test ID | Area | Steps | Expected result | Release blocking |
|---|---|---|---|---:|
| T-001 | Version/menu smoke | Install v1.8.9.1, reload workbook, open menus. | Menus load; versioned source is active. | Yes |
| T-002 | Raw Data setup | Format prior/current controlled Raw Data months. | Raw Data outputs exist and Primary PMR Row assignment is populated where expected. | Yes |
| T-003 | Strict disenrollment include | Build Monthly Change with applicable first-of-month disenrollment date. | PMR appears in Disenrollments. | Yes |
| T-004 | Strict disenrollment exclude | Build Monthly Change with non-first-of-month and wrong-month dates. | PMRs are excluded from Disenrollments. | Yes |
| T-005 | Report-header sort | Reorder/report headers in controlled test path and build Disenrollments section. | Sort uses report-header effective-date column. | Yes |
| T-006 | Demo P sync | Run Update Demo P Monthly Sync after Monthly Change. | PMR set matches Monthly Change output. | Yes |
| T-007 | Master List valid Primary PMR | Run Create Master List with valid Primary PMR Row values. | Master List contains Primary PMR rows only. | Yes |
| T-008 | Master List fail-closed | Run Create Master List with no Primary PMR rows. | Throws required Primary PMR error and does not silently create fallback output. | Yes |
| T-009 | Monthly Update no existing Master List | Run Create Monthly Update when target Master List does not exist. | Sequence completes: Monthly Change, Update Demo P, Update Disenrolled, Create Master List. | Yes |
| T-010 | Monthly Update existing Master List cancel | Run Create Monthly Update when target Master List exists; choose No/close. | Throws `Monthly Update cancelled: Existing Master List not replaced.` before monthly output mutation. | Yes |
| T-011 | Monthly Update existing Master List confirm | Run Create Monthly Update when target Master List exists; choose Yes. | Sequence completes and no duplicate Master List prompt appears. | Yes |
| T-012 | Standalone Master List prompt | Run standalone Create Master List when target exists. | Standalone replacement prompt still appears. | Yes |
| T-013 | Dashboard Quality | Run Dashboard Quality workflow. | Affected sections pass or show expected warnings only. | Yes |
| T-014 | Framework Timing | Review Framework Timing Report. | Preflight, sequence, confirmation, cancellation, and error paths are distinguishable. | Yes |
| T-015 | Tab order/visibility | Run Refresh Index / Organize Tabs as applicable. | Approved tab order and hidden states preserved. | Yes |
| T-016 | Rollback | Confirm v1.8.9 source and rollback steps. | Rollback path documented before release. | Yes |

## 7. Detailed Closure Checklist

Use `PASS`, `FAIL`, `NOT TESTED`, `BLOCKED`, `NOT APPLICABLE`, or `APPROVED EXCEPTION`.

| Check ID | Category | Criterion | Required evidence | Status | Release blocking |
|---|---|---|---|---|---:|
| W1-IMPL-01 | Source | `v1.8.9.1_Current_Production` exists. | Repository file. | PASS | Yes |
| W1-IMPL-02 | Source | `MASTER_LIST_MERGE_ML_VERSION` is `1.8.9.1`. | Source line review. | PASS | Yes |
| W1-IMPL-03 | Source | Prior v1.8.9 source was not overwritten. | Diff review. | PASS | Yes |
| W1-IMPL-04 | Source | No binary artifacts are included. | `prepare_pr.sh`. | PASS | Yes |
| W1-STATIC-01 | Static check | Script parses as JavaScript via temporary `.js` copy. | `node --check`. | PASS | Yes |
| W1-STATIC-02 | Static check | Removed DOB/first fallback calls from Master List copy logic. | `rg` verification. | PASS | Yes |
| W1-STATIC-03 | Static check | Helper/preflight flag/error/sort references exist. | `rg` verification. | PASS | Yes |
| W1-RUNTIME-01 | Runtime | Menus load in workbook. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-02 | Runtime | Strict first-of-month disenrollment include/exclude passes. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-03 | Runtime | Disenrollments sort by report-header date index. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-04 | Runtime | Demo P sync PMR set matches Monthly Change. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-05 | Runtime | Master List valid Primary PMR path passes. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-06 | Runtime | Master List missing Primary PMR path fails closed. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-07 | Runtime | Monthly Update no-existing-Master path completes. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-08 | Runtime | Monthly Update existing-Master cancel stops before mutation. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-09 | Runtime | Monthly Update existing-Master confirm completes without duplicate prompt. | Completed checklist / runtime review. | PASS | Yes |
| W1-RUNTIME-10 | Runtime | Standalone Create Master List prompt remains compatible. | Completed checklist / owner review. | PASS | Yes |
| W1-RUNTIME-11 | Runtime | Dashboard Quality results reviewed. | `Master_List/Reports/v1.8.9.1 - Dashboard Quality Report.pdf`. | PASS | Yes |
| W1-RUNTIME-12 | Runtime | Framework Timing results reviewed. | `Master_List/Reports/v1.8.9.1 - Framework Timing Report.pdf`. | PASS | Yes |
| W1-ROLL-01 | Rollback | v1.8.9 rollback path documented. | Release notes / rollback note. | PASS | Yes |
| W1-CLOSE-01 | Closure | All release-blocking checks are PASS or approved exception. | `Master_List/Reports/Completed WAVE_1_CHECKLIST_v1.8.9.1.md`. | PASS | Yes |

## 8. Release Evidence Package

Before marking the release READY FOR RELEASE, collect:

1. Final source path and version line.
2. `prepare_pr.sh` output.
3. Static syntax check output.
4. Static search verification output.
5. Controlled workbook setup notes.
6. Monthly Change output evidence for first-of-month and non-first-of-month disenrollment cases.
7. Demo P sync before/after evidence.
8. Master List valid Primary PMR output evidence.
9. Master List fail-closed error evidence.
10. Create Monthly Update no-existing/existing-cancel/existing-confirm evidence.
11. Standalone Create Master List replacement prompt evidence.
12. Dashboard Quality Report evidence.
13. Framework Timing Report evidence.
14. Rollback instructions and rollback source confirmation.

## 9. Release Decision Rules

| Decision | Required condition |
|---|---|
| READY FOR TESTING | Repository implementation and static checks pass. |
| READY FOR RELEASE | Every release-blocking runtime test is PASS or has an approved exception. |
| FAILED VALIDATION | Any release-blocking runtime test fails without an approved exception. |
| RELEASED | v1.8.9.1 is installed in the target production workbook. |
| CLOSED | Post-release validation is complete and evidence is archived. |

**Current decision:** CLOSED. Wave 1 is cleared and closed; proceed to Wave 3 planning.
