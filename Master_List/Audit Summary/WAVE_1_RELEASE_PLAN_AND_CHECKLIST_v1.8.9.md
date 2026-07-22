# Master List v1.8.9 Wave 1 Release Plan and Checklist

**Wave Release identifier:** Wave 1 Release — Critical correctness and data safety  
**Planning source:** `Master_List/Audit Summary/REMEDIATION_WAVE_PLAN_v1.8.9.md`  
**Governing production source:** `Master_List/Current Production Script/v1.8.9_Current_Production`  
**Recommended production version:** `v1.8.9.1`  
**Status:** PLANNED — revision required after owner clarification before implementation.  
**Change-control status:** Planning and checklist only. No production code is changed by this artifact.

## 1. Wave 1 Objective

Wave 1 addresses the highest-priority correctness and data-safety findings from the v1.8.9 exhaustive review. Its objective is to:

1. Preserve strict first-of-month Monthly Change disenrollment selection.
2. Ensure Monthly Change Disenrollments sort by the report-row effective-date column, if still validated.
3. Preserve the approved Create Monthly Update order: Monthly Change, Update Demo P, Update Disenrolled, Create Master List.
4. Separately evaluate whether Master List Primary PMR fallback should be made explicit or better reported.

Wave 1 must preserve the approved single-file architecture, public menu names, public function signatures, template-first formatting, Dashboard-driven governance, and existing workbook compatibility unless a user-approved decision explicitly changes behavior.

## 2. Included Findings and Root Causes

| Finding ID | Root cause | Current validation status | Wave 1 disposition |
|---|---|---|---|
| ML189-001 | RC-001 | OWNER-CLARIFIED | Do not broaden the date window; preserve strict first-of-month behavior. |
| ML189-002 | RC-002 | OWNER-CLARIFIED | Do not reorder Create Monthly Update; preserve the confirmed sequence. |
| ML189-003 | RC-003 | NEEDS SEPARATE DECISION | Primary PMR fallback can be evaluated separately from workflow sequencing. |
| ML189-005 | RC-001 | CONFIRMED | Implement with ML189-001 because the same Monthly Change row-building path owns the sort/index correction. |

## 3. Excluded and Deferred Findings

| Finding ID | Reason excluded from Wave 1 | Planned disposition |
|---|---|---|
| ML189-004 | Partially confirmed concurrency/busy-guard finding; lower priority than correctness/data-safety issues. | Wave 3. |
| ML189-006 | Optimization-only performance cleanup. | Wave 4. |
| ML189-007 | Low-severity menu callback maintainability issue. | Wave 6. |
| ML189-008 | Documentation-only authority-text issue. | Wave 6. |

## 4. Required User Decisions Before Implementation

| Decision ID | Required decision | Recommended option | Why approval is required | Implementation blocker |
|---|---|---|---|---|
| UD-001 | Owner confirmed `Disenrollment Effective Date` is always the first of the month. | Preserve strict first-of-month behavior. | Broadening the window would be incorrect. | Answered. |
| UD-002 | Owner confirmed correct `runMonthlyUpdate` path is Monthly Change, Update Demo P, Update Disenrolled, Create Master List. | Preserve the existing workflow order; do not move Create Master List earlier. | Reordering the workflow would violate the confirmed path. | Answered for workflow order. |

Because the owner clarification changes the prior Wave 1 assumptions, Wave 1 implementation must not begin until the scope is revised to remove conflicting recommendations.

## 5. Proposed Implementation Scope

### 5.1 Files affected

| File | Change type | Notes |
|---|---|---|
| `Master_List/Current Production Script/v1.8.9_Current_Production` or next versioned production copy | Production code change in a new versioned source | Do not overwrite v1.8.9. Create a minimal versioned production update such as `v1.8.9.1_Current_Production`. |
| `Master_List/Audit Summary/` | Release notes / validation evidence after implementation | Do not modify binary reports; add text artifacts only if needed. |

### 5.2 Functions affected

| Function | Finding IDs | Proposed change |
|---|---|---|
| `compareRawDemoPForSectionReport_` | ML189-001 | Preserve strict first-of-month disenrollment test; centralize only if behavior is unchanged. |
| `getMonthlyChangeSectionSpecs_` | ML189-001 | Preserve strict first-of-month row mode; remove confusing range-mode recommendations unless behavior remains unchanged. |
| `buildMonthlyChangeSectionRows_` | ML189-001, ML189-005 | Preserve strict first-of-month row inclusion and use a report-header-specific effective-date index for sorting if validated. |
| Optional helper, name to be selected during implementation | ML189-001 | Encapsulate strict first-of-month logic only if it reduces duplication without broadening the window. |
| `preflightMonthlyUpdateForMonth_` | ML189-002 | Do not use preflight to reorder Master List before Demo P or Disenrolled updates. |
| `runMonthlyUpdate` | ML189-002 | Preserve the approved order: Monthly Change, Update Demo P, Update Disenrolled, Create Master List. |
| `createMasterListForMonth_` | ML189-002 | Preserve its final-step role in Create Monthly Update unless a future owner instruction changes it. |
| `copyPrimaryDemoPRowsToMasterListByHeader_` | ML189-003 | Stop silent DOB/first fallback by default or emit approved compatibility warning/override. |

### 5.3 Dependencies affected

| Dependency type | Items |
|---|---|
| Date helpers | `isSameDate_`, `isDateInStrictLocalRangeInclusive_`, `coerceToValidDate_`, `monthParts.previousMonthFirstDay`, `monthParts.firstDay`. |
| Sheet/name helpers | `buildMonthlySheetName_`, `getMonthlySheetByPrefixAndDate_`, `MASTER_LIST_PREFIX`, `MONTHLY_CHANGE_REPORT_PREFIX`. |
| Data/schema helpers | `getDataValues_`, `getPMRIndex_`, `getDOBIndex_`, `findHeaderIndex_`, `buildHeaderIndexMap_`, `getMonthlyChangeReportHeaders_`. |
| UI and prompt dependencies | `SpreadsheetApp.getUi().alert`, existing Create Master List replacement prompt. |
| Timing/diagnostics | `markFrameworkStep_`, `markRuntimeStep_`, `writeRuntimeTimingReport_`, `writeFrameworkTimingReportBestEffort_`. |
| Sheets affected | Raw Data, Monthly Change, Demo P, Archive - Demo P, Disenrolled Exclusion, Master List, Index. |
| Reports affected | Framework Timing Report and Dashboard Quality Report during validation only. |

## 6. Required Implementation Sequence

| Step | Action | Required before next step | Notes |
|---:|---|---|---|
| 1 | Record owner clarification for `UD-001` and workflow-order `UD-002`. | Yes | Clarification supersedes prior assumptions. |
| 2 | Create a new versioned production source for `v1.8.9.1`. | Yes | Do not overwrite v1.8.9. |
| 3 | Preserve strict first-of-month Monthly Change disenrollment logic; helper is optional. | Yes | No broadened window. |
| 4 | Verify classification and section row inclusion use first-of-month behavior. | Yes | Prevents regression from clarified rule. |
| 5 | Update Disenrollments sort to use report-header index. | Yes | Resolves ML189-005. |
| 6 | Preserve the approved monthly-update sequence and remove reordering recommendation from Wave 1. | Yes | Owner confirmed current path. |
| 7 | Update Master List creation path to consume the preflighted decision when invoked from Create Monthly Update. | Yes | Avoid duplicate late prompt. |
| 8 | Update Master List Primary PMR fallback behavior only after a separate fallback decision if behavior will change. | Yes | Resolves ML189-003 if approved. |
| 9 | Run static dependency/callback checks. | Yes | Ensure no missing helper/menu dependency. |
| 10 | Run Wave 1 release-blocking test sequence. | Yes | T-001 through T-012. |
| 11 | Review output diffs and ensure no binary/report artifacts are staged. | Yes | Required before commit/PR. |
| 12 | Prepare release notes and closure evidence. | Yes | Wave cannot close without validation. |

## 7. Release-Blocking Test Sequence

| Order | Test ID | Test name | Release blocking | Required evidence |
|---:|---|---|---|---|
| 1 | T-001 | Monthly Change strict first-of-month disenrollment boundaries. | Yes | Monthly Change output rows showing included/excluded PMRs by effective date. |
| 2 | T-002 | Demo P sync PMR collection from corrected Monthly Change output. | Yes | Demo P before/after sample and timing step showing PMR count. |
| 3 | T-003 | Disenrollments report sort with normal and reordered report headers. | Yes | Disenrollment section sorted by effective date, not wrong column. |
| 4 | T-004 | Approved Create Monthly Update order validation. | Yes | Workflow runs Monthly Change, Update Demo P, Update Disenrolled, Create Master List. |
| 5 | T-005 | Existing Master List cancel behavior at approved final step. | Yes | Evidence documents final-step cancel behavior without requiring workflow reorder. |
| 6 | T-006 | Existing Master List confirm path. | Yes | Create Monthly Update completes with correct output sequence. |
| 7 | T-007 | Primary PMR valid path. | Yes | Master List contains only Primary PMR rows. |
| 8 | T-008 | Primary PMR empty/missing fallback policy. | Yes | Workflow fails or warns according to approved policy; no silent invalid output. |
| 9 | T-009 | Menu compatibility smoke. | Yes | Existing menu labels invoke expected public callbacks. |
| 10 | T-010 | Dashboard Quality affected sections. | Yes | Dashboard Quality sections populate without false pass/fail. |
| 11 | T-011 | Framework Timing review. | Yes | Timing report contains expected steps, failures, and workflow names. |
| 12 | T-012 | Rollback path. | Yes | v1.8.9 rollback source and recovery steps documented. |

## 8. Detailed Wave 1 Closure Checklist

Use the status values `NOT TESTED`, `PASS`, `FAIL`, `BLOCKED`, `NOT APPLICABLE`, and `APPROVED EXCEPTION`.

| Check ID | Category | Closure criterion | Required evidence | Status | Release blocking | Notes |
|---|---|---|---|---|---|---|
| W1-SC-01 | Version and source control | Governing source v1.8.9 is identified. | Source path and version line reviewed. | NOT TESTED | Yes | Required before implementation. |
| W1-SC-02 | Version and source control | Next production version is identified as v1.8.9.1 or explicitly approved alternative. | Version decision in release notes. | BLOCKED | Yes | Depends on revised Wave 1 scope. |
| W1-SC-03 | Version and source control | New versioned production file is created without overwriting v1.8.9. | Git diff showing new/updated approved file only. | NOT TESTED | Yes | Implementation step. |
| W1-SC-04 | Version and source control | Diff contains only Wave 1 implementation files and text release artifacts. | `prepare_pr.sh` output and diff review. | NOT TESTED | Yes | No binary artifacts. |
| W1-APP-01 | Approval | `UD-001` first-of-month rule is recorded. | Owner clarification. | PASS | Yes | Do not broaden date window. |
| W1-APP-02 | Approval | `UD-002` workflow order is recorded. | Owner clarification. | PASS | Yes | Preserve current sequence. |
| W1-DEP-01 | Dependency validation | Optional helper, if added, preserves strict first-of-month behavior across affected Monthly Change paths. | Static call search and code review. | NOT TESTED | Yes | ML189-001 revised. |
| W1-DEP-02 | Dependency validation | No missing helper, callback, or constant is introduced. | Static dependency scan. | NOT TESTED | Yes | Must include menu callbacks. |
| W1-DEP-03 | Dependency validation | Public signatures remain compatible. | Function signature diff. | NOT TESTED | Yes | No public API break expected. |
| W1-DATA-01 | Data integrity | First-of-month applicable disenrollments are included in Monthly Change. | T-001 evidence. | NOT TESTED | Yes | Controlled PMRs required. |
| W1-DATA-02 | Data integrity | Non-first-of-month or wrong-month disenrollments are excluded. | T-001 evidence. | NOT TESTED | Yes | Boundary dates required. |
| W1-DATA-03 | Data integrity | Demo P sync PMR set matches Monthly Change correction. | T-002 evidence. | NOT TESTED | Yes | Prevent downstream mismatch. |
| W1-DATA-04 | Data integrity | Master List contains only approved Primary PMR rows. | T-007 evidence. | NOT TESTED | Yes | Required by architecture. |
| W1-DATA-05 | Data integrity | Missing/empty Primary PMR condition behavior is explicit if changed. | T-008 evidence. | NOT TESTED | Yes | Requires separate fallback decision if behavior changes. |
| W1-FLOW-01 | Workflow validation | Approved monthly-update sequence is preserved. | T-004 evidence. | NOT TESTED | Yes | Monthly Change, Update Demo P, Update Disenrolled, Create Master List. |
| W1-FLOW-02 | Workflow validation | Existing Master List cancel behavior is documented at the approved final step. | T-005 evidence. | NOT TESTED | Yes | No workflow reorder required. |
| W1-FLOW-03 | Workflow validation | Existing Master List confirm completes workflow. | T-006 evidence. | NOT TESTED | Yes | Ensure approved replacement path works. |
| W1-FLOW-04 | Workflow validation | Standalone Create Master List behavior remains compatible or approved. | Direct menu/manual test. | NOT TESTED | Yes | Especially prompt behavior. |
| W1-SORT-01 | Report correctness | Disenrollments sort uses report-header effective-date index. | T-003 evidence. | NOT TESTED | Yes | Header reorder test required. |
| W1-MENU-01 | Menu validation | Existing Create Monthly Update and Create Master List menu entries still invoke. | T-009 evidence. | NOT TESTED | Yes | Menu labels should remain stable. |
| W1-DQ-01 | Dashboard validation | Dashboard Quality affected sections pass or produce expected warnings. | T-010 report. | NOT TESTED | Yes | No false pass/fail. |
| W1-TIME-01 | Diagnostic validation | Framework Timing records new preflight and failure paths clearly. | T-011 report. | NOT TESTED | Yes | Must distinguish cancel from error. |
| W1-ROLL-01 | Rollback | v1.8.9 rollback source and rollback steps are documented. | T-012 evidence. | NOT TESTED | Yes | Required before release. |
| W1-CLOSE-01 | Closure | Every included finding remains traceable to correction and test evidence. | Traceability matrix and test results. | NOT TESTED | Yes | ML189-001/002/003/005. |
| W1-CLOSE-02 | Closure | No release-blocking test is failed, blocked, or unperformed. | Completed checklist. | NOT TESTED | Yes | Required for READY FOR RELEASE. |
| W1-CLOSE-03 | Closure | Final repository state is clean after implementation and artifacts. | `git status -sb`. | NOT TESTED | Yes | Required at closure. |

## 9. Wave 1 Release Package Template

When Wave 1 implementation is approved and completed, the release package should include:

| Package item | Required content |
|---|---|
| Release title | `Wave 1 Release — Critical correctness and data safety` |
| Production version | `v1.8.9.1` or approved alternative. |
| Governing source | New versioned production source path. |
| Findings resolved | ML189-001, ML189-002, ML189-003, ML189-005. |
| Root causes resolved | RC-001, RC-002, RC-003. |
| User decisions | Recorded owner clarifications for UD-001 and workflow-order UD-002; separate fallback decision if behavior changes. |
| Change summary | Exact functions changed and business rules preserved/approved. |
| Validation summary | T-001 through T-012 results. |
| Dashboard Quality evidence | Affected section results. |
| Framework Timing evidence | Workflow timing and failure-path evidence. |
| Rollback point | v1.8.9 source and rollback instructions. |
| Closure decision | One of: READY FOR TESTING, TESTING IN PROGRESS, FAILED VALIDATION, READY FOR RELEASE, RELEASED, POST-RELEASE VALIDATION, CLOSED. |

## 10. Wave 1 Readiness Conclusion

**Current Wave 1 status:** PLANNED / REVISION REQUIRED AFTER OWNER CLARIFICATION.

**Wave 1 must be revised before implementation because:**

1. `UD-001` confirms strict first-of-month disenrollment effective dates.
2. `UD-002` confirms the existing Monthly Update order: Monthly Change, Update Demo P, Update Disenrolled, Create Master List.

**Wave 1 is not ready for release.** No implementation has occurred, no runtime spreadsheet validation has been performed, and all release-blocking tests are currently `NOT TESTED` or `BLOCKED`.

**Next action:** revise Wave 1 scope to remove the broadened-date-window and workflow-reordering recommendations, then implement only still-valid corrections in a new versioned production source if requested.
