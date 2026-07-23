# Wave 3 Release Plan and To-Do Checklist — Master List v1.8.9.2

**Wave:** Wave 3 — Trigger, concurrency, and public API safety  
**Planning source:** `Master_List/Audit Summary/REMEDIATION_WAVE_PLAN_v1.8.9.md`  
**Current production source:** `Master_List/Current Production Script/v1.8.9.2_Current_Production`  
**Recommended next version:** `v1.8.9.3_Current_Production` if production code changes are implemented  
**Prerequisite:** Wave 1 is closed and no longer blocks Wave 3 planning.  
**Current Wave 3 status:** PLANNED / NOT STARTED

---

## Simple To-Do Checklist

Use this checklist first. Wave 3 should remain small and focused: protect destructive workflows from overlap, preserve public entry points, and validate menus/triggers without rebuilding the framework.

### A. Scope Approval

- [ ] Confirm Wave 1 closure is accepted as the baseline for Wave 3.
- [ ] Confirm `v1.8.9.2_Current_Production` is the governing source for Wave 3 analysis.
- [ ] Confirm next implementation version will be `v1.8.9.3_Current_Production` unless owner approves another version.
- [ ] Confirm Wave 3 scope is limited to trigger/concurrency/public API safety.
- [ ] Confirm no public menu labels or public function names will be removed.
- [ ] Confirm no framework rebuild is approved.
- [ ] Confirm no binary reports will be modified or committed.

### B. Static Review To-Do

- [ ] Inventory all public destructive entry points.
- [ ] Identify which destructive entry points already route through `runFrameworkTimed_`.
- [ ] Identify which destructive entry points already route through `runWithWorkflowBusyFlag_`.
- [ ] Identify standalone workflows that still perform mutation outside the busy-flag path.
- [ ] Review `runMonthlyStart`, `runMonthlyUpdate`, `updateDemoPMonthlySync`, `createDisenrolledList`, `buildMonthlyChangeReport`, `createMasterList`, archive workflows, and restore workflows.
- [ ] Review installable/simple trigger functions: `onOpen`, `onEdit`, and `doGet`.
- [ ] Review menu callback registry and Dashboard Quality required-function registry.
- [ ] Confirm no `google.script.run`, trigger-name string, menu callback, or external entry point would break from any proposed wrapper/routing change.

### C. Implementation To-Do

- [ ] Create a new versioned production source if code changes are approved.
- [ ] Preserve all public function names and menu callback names.
- [ ] Route uncovered destructive standalone workflows through the existing busy-flag/timing pattern where safe.
- [ ] Do not double-wrap functions that already run through `runFrameworkTimed_` / `runWithWorkflowBusyFlag_`.
- [ ] Ensure busy flag clears after success.
- [ ] Ensure busy flag clears after thrown errors.
- [ ] Ensure user-facing cancel paths do not leave a stuck busy state.
- [ ] Keep existing owner-approved workflow sequences unchanged.
- [ ] Add concise timing labels for newly protected paths only where helpful.
- [ ] Avoid broad logging or noisy diagnostics.

### D. Runtime Validation To-Do

- [ ] Reload workbook and verify all menus load.
- [ ] Run Create Monthly Start from menu.
- [ ] Run Create Monthly Update from menu.
- [ ] Run Update Demo P from menu.
- [ ] Run Create / Update Disenrolled List from menu.
- [ ] Run Monthly Change Report from menu.
- [ ] Run Create Master List from menu.
- [ ] Run archive/hide monthly active sheet workflows if included in Wave 3 scope.
- [ ] Run restore workflow if included in Wave 3 scope.
- [ ] Attempt duplicate/back-to-back destructive workflow invocation and verify the second invocation is blocked or exits safely.
- [ ] Trigger an expected workflow error and confirm busy flag clears.
- [ ] Trigger an expected user cancel and confirm busy flag clears.
- [ ] Confirm Framework Timing Report records protected workflow paths clearly.
- [ ] Confirm Dashboard Quality workflow passes or reports only expected warnings.
- [ ] Confirm no public menu callback is missing.
- [ ] Confirm no tab order, visibility, template, Dashboard, Demo P, Monthly Change, Disenrolled Exclusion, or Master List regression.

### E. Closure To-Do

- [ ] All intended Wave 3 code changes are complete.
- [ ] Static dependency/callback review passes.
- [ ] All release-blocking runtime tests pass or have approved exceptions.
- [ ] Framework Timing evidence is reviewed.
- [ ] Dashboard Quality evidence is reviewed.
- [ ] Rollback path to `v1.8.9.2` is documented.
- [ ] Repository preparation tool passes.
- [ ] No binary artifacts are staged or committed.
- [ ] Final diff contains only Wave 3 implementation files and text release artifacts.
- [ ] Release notes are complete.

**Current simple checklist decision:** Wave 3 is ready for detailed planning, not implementation.

---

# Full Wave 3 Release Plan and Checklist

## 1. Wave 3 Objective

Wave 3 addresses the trigger/concurrency and public API safety risk identified as `ML189-004` / `RC-004`: long-running mutating workflows should have consistent overlap protection, and public workflow wrappers/menu callbacks should remain stable.

The objective is not to rebuild the framework. The objective is to apply the existing busy-flag/lock architecture consistently to any confirmed uncovered destructive entry points while preserving public function names, menu labels, owner-approved workflow order, and workbook compatibility.

## 2. Baseline and Inputs

| Input | Use |
|---|---|
| `Master_List/Current Production Script/v1.8.9.2_Current_Production` | Governing production source for Wave 3. |
| `Master_List/Reports/v1.8.9.2 Updates.md` | Current update context, including Create Monthly Start additions. |
| `Master_List/Reports/Completed WAVE_1_CHECKLIST_v1.8.9.1.md` | Confirms Wave 1 is closed before Wave 3. |
| `Master_List/Reports/v1.8.9.1 - Framework Timing Report.pdf` | Runtime timing evidence input. |
| `Master_List/Reports/v1.8.9.1 - Dashboard Quality Report.pdf` | Dashboard Quality evidence input. |
| `Master_List/Audit Summary/REMEDIATION_WAVE_PLAN_v1.8.9.md` | Original Wave 3 finding and closure checklist source. |

## 3. Included Finding

| Finding ID | Root cause | Current status | Wave 3 disposition |
|---|---|---|---|
| `ML189-004` | `RC-004` | Partially confirmed in v1.8.9 audit; must be rechecked against v1.8.9.2 before implementation. | Validate and wrap only confirmed uncovered destructive entry points. |

## 4. Excluded Scope

| Excluded item | Reason |
|---|---|
| Wave 1 correctness fixes | Closed. Do not reopen unless a runtime regression is found. |
| Wave 4 performance optimization | Separate optimization-only wave. |
| Wave 5 dead/orphan cleanup | Requires separate full reference review and removal approval. |
| Wave 6 documentation/menu policy cleanup | Separate maintainability wave unless a Wave 3 callback compatibility issue requires documentation. |
| Menu renames | Public compatibility risk; not required for concurrency protection. |
| Trigger redesign | Not requested; use existing busy-flag/lock architecture. |
| Binary report changes | Reports are evidence inputs only. |

## 5. Candidate Functions / Entry Points to Review

| Entry point or helper | Review question | Expected disposition |
|---|---|---|
| `runFrameworkTimed_` | Does it still wrap workflows with `runWithWorkflowBusyFlag_`? | Preserve as primary safe wrapper. |
| `runWithWorkflowBusyFlag_` | Does it acquire/clear lock/busy state reliably on success and error? | Preserve or minimally harden. |
| `runMonthlyStart` | Is the new v1.8.9.2 workflow routed through `runFrameworkTimed_`? | Verify; avoid double wrapping. |
| `runMonthlyUpdate` | Is the workflow routed through `runFrameworkTimed_`? | Verify; avoid double wrapping. |
| `updateDemoPMonthlySync` | Does standalone menu invocation use the same busy guard as timed workflows? | Wrap or route if uncovered. |
| `createMasterList` | Does standalone menu invocation use the same busy guard as timed workflows? | Wrap or route if uncovered. |
| `createDisenrolledList` | Does standalone invocation have overlap protection? | Wrap or route if uncovered. |
| `buildMonthlyChangeReport` | Does standalone invocation have overlap protection? | Wrap or route if uncovered. |
| Archive/hide workflows | Are destructive archive/hide operations protected? | Verify existing timed wrappers before changing. |
| `restoreSheetFromActiveIndexRow` / `doGet` restore routing | Is restore protected by lock and compatible with menu/web entry? | Verify; avoid breaking restore. |
| `onOpen` | Are menu callbacks stable and present? | Preserve. |
| `onEdit` | Does any edit-trigger behavior mutate protected output unexpectedly? | Verify only. |

## 6. Proposed Implementation Strategy

1. Run static call-path review from every public destructive menu entry point.
2. Classify each entry point as:
   - already protected by `runFrameworkTimed_` / `runWithWorkflowBusyFlag_`,
   - safe non-mutating utility,
   - uncovered mutating workflow requiring wrapper/routing,
   - trigger/web entry requiring special compatibility handling.
3. Implement only the uncovered mutating workflows.
4. Preserve public function names by keeping wrappers with the same names.
5. Use the existing `runFrameworkTimed_` / `runWithWorkflowBusyFlag_` pattern instead of adding a new framework.
6. Confirm locks/busy state clear through `finally` or equivalent existing cleanup behavior.
7. Add or update timing labels only for newly protected standalone paths.
8. Produce release notes and a completed Wave 3 validation checklist.

## 7. Release-Blocking Test Matrix

| Test ID | Area | Steps | Expected result | Release blocking |
|---|---|---|---|---:|
| W3-T001 | Static dependency | Search public menu callbacks, required-function registry, and trigger/web entry references. | No missing callback or broken string reference. | Yes |
| W3-T002 | Wrapper coverage | Review call paths for all destructive public workflows. | Every confirmed mutating workflow is protected or explicitly classified safe/deferred. | Yes |
| W3-T003 | Duplicate invocation | Invoke two long destructive workflows back-to-back in controlled workbook. | Second invocation blocks, exits safely, or displays busy message without data mutation overlap. | Yes |
| W3-T004 | Error cleanup | Force a controlled error in a protected workflow. | Busy state clears and next valid workflow can run. | Yes |
| W3-T005 | Cancel cleanup | Cancel a protected workflow at a prompt. | Busy state clears and next valid workflow can run. | Yes |
| W3-T006 | Menu smoke | Reload workbook and invoke Wave 3 affected menu entries. | Menus call existing public functions successfully. | Yes |
| W3-T007 | Trigger smoke | Validate `onOpen`, `onEdit`, and `doGet` compatibility where applicable. | No trigger/web regression. | Yes |
| W3-T008 | Monthly Start regression | Run Create Monthly Start if included. | Existing v1.8.9.2 behavior preserved. | Yes |
| W3-T009 | Monthly Update regression | Run Create Monthly Update. | Existing Wave 1 / v1.8.9.2 behavior preserved. | Yes |
| W3-T010 | Dashboard Quality | Run Dashboard Quality Workflow. | Affected sections pass or show expected warnings only. | Yes |
| W3-T011 | Framework Timing | Review Framework Timing Report. | Protected paths and busy/cancel/error behavior are distinguishable. | Yes |
| W3-T012 | Rollback | Document rollback source and steps. | Rollback to `v1.8.9.2` is available. | Yes |

## 8. Detailed Closure Checklist

| Check ID | Category | Closure criterion | Evidence | Status | Release blocking |
|---|---|---|---|---|---:|
| W3-C01 | Source control | Next versioned production source created if code changes are made. | Diff/version line. | NOT STARTED | Yes |
| W3-C02 | Scope | Diff limited to Wave 3 concurrency/public API safety. | Diff review. | NOT STARTED | Yes |
| W3-C03 | Public API | Public names/signatures/menu labels preserved. | Static and menu smoke review. | NOT STARTED | Yes |
| W3-C04 | Static coverage | All destructive public workflows classified. | Call-path matrix. | NOT STARTED | Yes |
| W3-C05 | Busy guard | Confirmed uncovered mutating workflows are protected. | Code review and W3-T002. | NOT STARTED | Yes |
| W3-C06 | Duplicate invocation | Overlap attempt blocks/exits safely. | W3-T003 evidence. | NOT TESTED | Yes |
| W3-C07 | Cleanup on error | Busy state clears after controlled error. | W3-T004 evidence. | NOT TESTED | Yes |
| W3-C08 | Cleanup on cancel | Busy state clears after user cancel. | W3-T005 evidence. | NOT TESTED | Yes |
| W3-C09 | Menu/trigger compatibility | Menus/triggers/web paths still work. | W3-T006/W3-T007 evidence. | NOT TESTED | Yes |
| W3-C10 | Workflow regression | Monthly Start and Monthly Update remain valid. | W3-T008/W3-T009 evidence. | NOT TESTED | Yes |
| W3-C11 | Dashboard Quality | Dashboard Quality reviewed. | W3-T010 evidence. | NOT TESTED | Yes |
| W3-C12 | Framework Timing | Framework Timing reviewed. | W3-T011 evidence. | NOT TESTED | Yes |
| W3-C13 | Rollback | Rollback to v1.8.9.2 documented. | W3-T012 evidence. | NOT STARTED | Yes |
| W3-C14 | PR hygiene | `prepare_pr.sh` passes and no binary files are staged. | Tool output. | NOT STARTED | Yes |
| W3-C15 | Closure | All release blockers pass or have approved exceptions. | Completed checklist. | BLOCKED | Yes |

## 9. Release Package Requirements

When Wave 3 implementation is complete, the release package should include:

1. New versioned production source, recommended `v1.8.9.3_Current_Production`.
2. Wave 3 implementation release notes.
3. Completed Wave 3 checklist with test evidence.
4. Dashboard Quality evidence.
5. Framework Timing evidence.
6. Rollback source and rollback steps.
7. PR preparation output showing no binary artifacts staged.

## 10. Current Recommendation

Wave 3 may proceed to detailed static analysis from `v1.8.9.2_Current_Production`. Do not implement code until the uncovered destructive entry points are identified and the owner approves the exact Wave 3 implementation scope.
