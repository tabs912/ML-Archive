# Standard Code Review — Master List v1.8.9.2 Current Production

**Review date:** 2026-07-23  
**Governing source reviewed:** `Master_List/Current Production Script/v1.8.9.2_Current_Production` from `origin/main`  
**Related update notes:** `Master_List/Reports/v1.8.9.2 Updates.md`  
**Review type:** Standard production review focused on the current production script after Wave 1 closure and v1.8.9.2 updates.  
**Repository state note:** The active `work` branch has local commits and is behind `origin/main`; per repository policy, the branch was not merged/rebased/reset. The requested v1.8.9.2 source and reports were reviewed from `origin/main`.

## Executive Summary

`v1.8.9.2_Current_Production` is syntactically valid JavaScript and appears production-usable for the owner-reviewed Wave 1 scope. The script preserves the Wave 1 safeguards: strict first-of-month disenrollment logic, Primary PMR fail-closed Master List creation, Master List replacement preflight metadata, and the approved Monthly Update sequence.

The v1.8.9.2 update also adds `runMonthlyStart`, registers it in the menu callback registry, places it in the Data & Processing Engine menu, and includes it in the Dashboard Quality required-function list.

The main remaining concerns are not Wave 1 blockers. They are Wave 3-style maintainability and diagnostics issues:

1. `createMasterListForMonth_` hard-codes `Create Monthly Update - Create Master List -` timing labels whenever a parent timing object exists, so `runMonthlyStart` Master List sub-steps can be reported under Monthly Update labels.
2. Several standalone destructive public workflows still bypass `runFrameworkTimed_` / `runWithWorkflowBusyFlag_`, matching the planned Wave 3 concurrency/public API safety scope.
3. `runMonthlyStart` duplicates Master List replacement preflight logic rather than using a shared helper, increasing future drift risk between Monthly Start and Monthly Update replacement handling.

## Files and Evidence Reviewed

| Artifact | Review use |
|---|---|
| `Master_List/Current Production Script/v1.8.9.2_Current_Production` | Governing production source. |
| `Master_List/Reports/v1.8.9.2 Updates.md` | v1.8.9.2 update intent and workflow/menu changes. |
| `Master_List/Reports/Completed WAVE_1_CHECKLIST_v1.8.9.1.md` | Wave 1 closure evidence supplied by owner. |
| `Master_List/Reports/v1.8.9.1 - Framework Timing Report.pdf` | Runtime timing evidence input; reviewed as binary evidence only. |
| `Master_List/Reports/v1.8.9.1 - Dashboard Quality Report.pdf` | Dashboard Quality evidence input; reviewed as binary evidence only. |
| `Master_List/Audit Summary/WAVE_1_CLOSURE_SUMMARY_v1.8.9.2.md` | Current closure state. |
| `Master_List/Audit Summary/WAVE_3_RELEASE_PLAN_AND_TODO_CHECKLIST_v1.8.9.2.md` | Next-wave planning context. |

## Static Checks Performed

| Check | Result | Notes |
|---|---|---|
| Extracted `v1.8.9.2_Current_Production` from `origin/main` | PASS | Reviewed without merging current branch. |
| `node --check` on temporary `.js` copy | PASS | No syntax errors reported. |
| Function/menu search for key Wave 1 and v1.8.9.2 additions | PASS | Version, helper, Monthly Start, menu registry, required-function registry, preflight, Master List fail-closed logic present. |
| Duplicate declaration scan | REVIEWED | No release-blocking duplicate found in the requested review scope. |

## Key Current-Code Observations

### Version and v1.8.9.2 scope

- `MASTER_LIST_MERGE_ML_VERSION` is `1.8.9.2`.
- `runMonthlyStart` is present and routes through `runFrameworkTimed_`.
- `runMonthlyStart` performs Master List replacement preflight, builds Demo P, updates Disenrolled Exclusion, creates Master List, refreshes Index, and notifies completion.
- `runMonthlyUpdate` remains present and routes through `runFrameworkTimed_`.

### Menu and Dashboard Quality registration

- `runMonthlyStart` is listed in `ML_MENU_CALLBACKS.dataProcessing`.
- `onOpen` adds `Create Monthly Start` to the Data & Processing Engine menu.
- `getRequiredMenuFunctionNames_` includes `runMonthlyStart`, so Dashboard Quality should recognize the new callback.

### Wave 1 safeguards still present

- `preflightMonthlyUpdateForMonth_` checks existing Master List, prompts with `YES_NO`, throws the required cancellation error, and returns `masterListExistsAndReplaceConfirmed` metadata.
- `isMonthlyChangeDisenrollmentEffectiveDate_` centralizes strict first-of-month disenrollment evaluation.
- `buildMonthlyChangeSectionRows_` uses the helper and resolves Disenrollments sort index from `reportHeaders`.
- `copyPrimaryDemoPRowsToMasterListByHeader_` throws the required Primary PMR fail-closed error when no Primary PMR rows are found.

## Findings Register

| Finding ID | Severity | Status | Area | Evidence | Impact | Recommendation | Wave |
|---|---|---|---|---|---|---|---|
| ML192-001 | Medium | Confirmed | Timing / diagnostics | `runMonthlyStart` calls `createMasterListForMonth_(monthParts, timing, preflight)`, but `createMasterListForMonth_` prefixes parent-timed steps with `Create Monthly Update - Create Master List -`. | Framework Timing can mislabel Monthly Start Master List sub-steps as Monthly Update, reducing diagnostic clarity after v1.8.9.2. | Add an optional timing-prefix/workflow-name option to `createMasterListForMonth_`, defaulting to current behavior for backward compatibility, and pass `Create Monthly Start - Create Master List -` from `runMonthlyStart`. | Wave 3 or small diagnostics patch |
| ML192-002 | Medium | Confirmed / planned | Trigger and concurrency safety | `runFrameworkTimed_` wraps workflows with `runWithWorkflowBusyFlag_`, but standalone `updateDemoPMonthlySync`, `buildMonthlyChangeReport`, and `createMasterList` use manual timing or direct calls. | Back-to-back standalone destructive menu invocations may not receive the same busy-flag protection as framework-timed workflows. | Proceed with Wave 3: classify destructive public entry points and route confirmed uncovered workflows through the existing busy-flag/timing pattern while preserving public names. | Wave 3 |
| ML192-003 | Low | Confirmed | Maintainability / hidden dependency | `runMonthlyStart` duplicates Master List conflict preflight logic instead of sharing a helper with `preflightMonthlyUpdateForMonth_`. | Future changes to replacement prompt text, return metadata, or cancellation behavior can drift between Monthly Start and Monthly Update. | Extract a small shared helper for target Master List replacement confirmation after Wave 3 scope is approved, or document the duplication as intentional if no code change is desired. | Wave 3 or maintainability wave |

## Finding Details

### ML192-001 — Monthly Start Master List timing labels can be misclassified

`runMonthlyStart` correctly calls `createMasterListForMonth_(monthParts, timing, preflight)` as its final major workflow step. However, `createMasterListForMonth_` currently treats any parent timing object as Monthly Update context and hard-codes `Create Monthly Update - Create Master List -` in `markStep`. The same hard-coded workflow text is used for the Master List canvas timing label.

This does not appear to corrupt workbook data, but it can make Framework Timing evidence ambiguous because Monthly Start sub-steps can appear under Monthly Update labels.

**Recommended fix:** keep the public signature compatible by accepting an optional options object or optional timing prefix. If no option is supplied, preserve the existing Monthly Update label. From `runMonthlyStart`, pass a Monthly Start-specific prefix.

### ML192-002 — Standalone destructive workflows still need Wave 3 busy-guard review

The script has a strong central busy-guard path: `runFrameworkTimed_` calls `runWithWorkflowBusyFlag_`, and the busy flag clears in a `finally` block. However, several standalone public entry points still use manual runtime timing or direct helper calls instead of `runFrameworkTimed_`.

This aligns with the already-planned Wave 3 scope. It is not a Wave 1 regression, but it remains the most important next engineering item.

**Recommended fix:** do not rename public functions. Keep each public menu callback name stable and route only confirmed mutating standalone workflows through the existing guard pattern.

### ML192-003 — Monthly Start and Monthly Update replacement preflight can drift

`runMonthlyStart` and `preflightMonthlyUpdateForMonth_` now both implement target Master List replacement confirmation logic. The current behavior is consistent enough for production use, but maintaining two prompt implementations raises drift risk.

**Recommended fix:** if Wave 3 implementation touches the affected wrappers, extract a private helper such as `confirmMonthlyMasterListReplacement_(monthParts, workflowName)` that returns the shared preflight metadata object.

## Release Readiness Assessment

| Area | Assessment |
|---|---|
| Syntax / parseability | PASS |
| Wave 1 data-safety safeguards | PASS based on static review and supplied closure evidence |
| v1.8.9.2 Monthly Start registration | PASS |
| Dashboard Quality callback coverage for `runMonthlyStart` | PASS |
| Runtime Timing clarity | Needs minor follow-up for Monthly Start Master List sub-step labels |
| Concurrency coverage | Proceed to Wave 3 review/implementation planning |
| Binary artifacts | Reviewed as evidence only; do not commit/modify |

## Recommended Next Actions

1. Keep `v1.8.9.2_Current_Production` as the governing production source for Wave 3 planning.
2. Do not reopen Wave 1 unless runtime regressions are found.
3. Prioritize Wave 3 static call-path classification for destructive public entry points.
4. Include `runMonthlyStart` in all Wave 3 menu/concurrency tests.
5. Fix or document the Monthly Start Master List timing label mismatch before relying on timing reports for Monthly Start diagnostics.
6. Consider consolidating Master List replacement preflight prompt logic only after Wave 3 scope is approved.

## Final Review Conclusion

`v1.8.9.2_Current_Production` passes standard repository-level review for production usability after Wave 1 closure. No critical or high-severity correctness defect was identified in this review. The remaining findings are targeted Wave 3/diagnostics/maintainability items and should be handled incrementally without rebuilding the framework or changing public menu/function names.
