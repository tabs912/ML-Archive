# Wave 3 Release Plan and To-Do Checklist — Master List v1.8.9.3 Closure Update

**Wave:** Wave 3 — Trigger, concurrency, and public API safety
**Planning source:** `Master_List/Audit Summary/REMEDIATION_WAVE_PLAN_v1.8.9.md`
**Baseline source:** `Master_List/Current Production Script/v1.8.9.2_Current_Production`
**Implemented source:** `Master_List/Current Production Script/v1.8.9.3_Current_Production`
**Status:** CLOSED — WAVE 3 COMPLETED AND PASSED REVIEW
**Closure date:** 2026-07-23

---

## Simple To-Do Checklist

### A. Scope Approval

- [x] Wave 1 closure accepted as the baseline for Wave 3.
- [x] `v1.8.9.2_Current_Production` used as the Wave 3 analysis baseline.
- [x] `v1.8.9.3_Current_Production` created/used as the Wave 3 implementation source.
- [x] Wave 3 scope limited to trigger/concurrency/public API safety.
- [x] Public menu labels and public function names preserved.
- [x] No framework rebuild performed.
- [x] Binary reports reviewed as evidence only; binary artifacts are not staged for implementation.

### B. Static Review To-Do

- [x] Public destructive entry points inventoried.
- [x] `runFrameworkTimed_` and `runWithWorkflowBusyFlag_` reviewed as the governing lock/busy-flag wrappers.
- [x] Standalone mutating workflows requiring wrapper coverage identified.
- [x] Five Wave 3 public functions verified in `v1.8.9.3_Current_Production`: `formatRawData`, `buildDemoPFromScratch`, `updateDemoPMonthlySync`, `buildMonthlyChangeReport`, and `createMasterList`.
- [x] Simple trigger and web-app surfaces reviewed through the v1.8.9.3 trigger/dynamic-reference map.
- [x] Menu callback registry and Dashboard Quality required-function registry reviewed.
- [x] No approved public function rename or menu callback removal is included in Wave 3.

### C. Implementation To-Do

- [x] Versioned production source `v1.8.9.3_Current_Production` is present.
- [x] Public function names and menu callback names are preserved.
- [x] The five requested standalone public workflows route their mutating body through `runFrameworkTimed_`.
- [x] Initial UI/month prompts remain outside the document-lock window.
- [x] Manual public-wrapper timing calls were removed from the five public wrappers.
- [x] Busy flag clears through the existing `runWithWorkflowBusyFlag_` `finally` cleanup path.
- [x] Owner-approved Wave 1 business rules and monthly workflow sequence remain unchanged.
- [x] Menu and archive updates documented in the supplied v1.8.9.3 update report were applied to the current script.

### D. Runtime Validation To-Do

- [x] Workbook menus reloaded and validated.
- [x] Create Monthly Start validated.
- [x] Create Monthly Update validated.
- [x] Update Demo P validated.
- [x] Create / Update Disenrolled List validated.
- [x] Monthly Change Report validated.
- [x] Create Master List validated.
- [x] Archive/hide monthly active sheet workflows validated where included in Wave 3 testing.
- [x] Duplicate/back-to-back destructive workflow invocation validated as blocked or safe.
- [x] Controlled error path validated with busy flag clearing.
- [x] User cancel path validated with no stuck busy state.
- [x] Framework Timing Report reviewed for v1.8.9.3 evidence.
- [x] Dashboard Quality Report reviewed for v1.8.9.3 evidence.
- [x] No public menu callback regression recorded.
- [x] No tab order, visibility, template, Dashboard, Demo P, Monthly Change, Disenrolled Exclusion, or Master List regression recorded.
- [x] Restore/web-app route reviewed in the trigger/dynamic-reference map; no Wave 3 runtime blocker remains for closure.

### E. Closure To-Do

- [x] Intended Wave 3 code changes are complete.
- [x] Static dependency/callback review passes.
- [x] Release-blocking runtime tests are recorded as passed or not blocking by supplied evidence/owner closure instruction.
- [x] Framework Timing evidence reviewed: `Master_List/Reports/v1.8.9.3 - Framework Timing Report.pdf`.
- [x] Dashboard Quality evidence reviewed: `Master_List/Reports/v1.8.9.3 - Dashboard Quality Report.pdf`.
- [x] Rollback path to `v1.8.9.2_Current_Production` documented.
- [x] Repository preparation tool to be run before commit/PR.
- [x] Binary artifacts excluded from implementation commit.
- [x] Release notes and closure summary complete.

**Current simple checklist decision:** CLOSED. Wave 3 is cleared and closed; proceed to Wave 4 planning.

---

# Full Updated Release Plan and Closure Checklist

## 1. Wave 3 Objective

Wave 3 addressed `ML189-004` / `RC-004`: trigger, concurrency, and public API safety. The approved objective was to protect standalone mutating public workflows from overlap by using the existing `runFrameworkTimed_` / `runWithWorkflowBusyFlag_` architecture, without rebuilding the framework or renaming public entry points.

## 2. Closure Evidence Register

| Evidence | Review use | Status |
|---|---|---|
| `Master_List/Current Production Script/v1.8.9.3_Current_Production` | Implemented Wave 3 production source. | PASS |
| `Master_List/Reports/Updates v1.8.9.3— already applied to Current Script.md` | Owner-supplied/current-script update context, including menu and archive candidate update notes. | PASS |
| `Master_List/Reports/completed - Wave 3 Checklist — Master List v1.8.9.2.md` | Owner-supplied completed checklist evidence for Wave 3 scope, static review, implementation, and runtime validation. | PASS |
| `Master_List/Reports/v1.8.9.3 - Dashboard Quality Report.pdf` | Dashboard Quality evidence reviewed; binary evidence not committed. | PASS |
| `Master_List/Reports/v1.8.9.3 - Framework Timing Report.pdf` | Framework Timing evidence reviewed; binary evidence not committed. | PASS |
| `Master_List/Audit Summary/EXHAUSTIVE_TRIGGER_DYNAMIC_REFERENCE_MAP_v1.8.9.3.md` | Trigger/menu/dynamic/web-route reference map for v1.8.9.3. | PASS |
| Repository static checks | Syntax and wrapper verification in local environment. | PASS |

## 3. Function-Level Closure

| Function / surface | Wave 3 closure result | Status |
|---|---|---|
| `formatRawData` | Prompt remains before lock; mutating body runs through `runFrameworkTimed_`; wrapper timing is passed downstream. | PASS |
| `buildDemoPFromScratch` | Prompt remains before lock; Demo P initialization runs through `runFrameworkTimed_`. | PASS |
| `updateDemoPMonthlySync` | Prompt remains before lock; standalone monthly sync runs through `runFrameworkTimed_`. | PASS |
| `buildMonthlyChangeReport` | Prompt remains before lock; standalone report generation runs through `runFrameworkTimed_`. | PASS |
| `createMasterList` | Prompt remains before lock; Master List creation runs through `runFrameworkTimed_`. | PASS |
| `runWithWorkflowBusyFlag_` | Lock/busy-state cleanup path preserved. | PASS |
| `onOpen`, `onEdit`, `doGet` | Trigger/web surfaces reviewed through the v1.8.9.3 trigger/dynamic-reference map. | PASS |
| Menu callback strings | Public callback strings preserved in source/menu registry. | PASS |

## 4. Release-Blocking Test Matrix

| Test ID | Area | Evidence / result | Status |
|---|---|---|---|
| W3-T001 | Static dependency | Public callbacks, trigger map, and required registries reviewed. | PASS |
| W3-T002 | Wrapper coverage | Five owner-specified mutating standalone public wrappers verified. | PASS |
| W3-T003 | Duplicate invocation | Owner-supplied completed checklist records duplicate/back-to-back invocation validation. | PASS |
| W3-T004 | Error cleanup | Owner-supplied completed checklist records busy-flag clearing after expected workflow error. | PASS |
| W3-T005 | Cancel cleanup | Owner-supplied completed checklist records user-cancel cleanup with no stuck busy state. | PASS |
| W3-T006 | Menu smoke | Owner-supplied completed checklist records menu reload / public callback validation. | PASS |
| W3-T007 | Trigger/web smoke | v1.8.9.3 trigger/dynamic-reference map reviewed; no closure blocker remains. | PASS |
| W3-T008 | Monthly Start regression | Owner-supplied completed checklist records Create Monthly Start validation. | PASS |
| W3-T009 | Monthly Update regression | Owner-supplied completed checklist records Create Monthly Update validation. | PASS |
| W3-T010 | Dashboard Quality | v1.8.9.3 Dashboard Quality Report reviewed. | PASS |
| W3-T011 | Framework Timing | v1.8.9.3 Framework Timing Report reviewed. | PASS |
| W3-T012 | Rollback | Rollback source is `v1.8.9.2_Current_Production`. | PASS |

## 5. Closure Checklist

| Check ID | Category | Closure criterion | Status |
|---|---|---|---|
| W3-C01 | Source control | `v1.8.9.3_Current_Production` exists and is the Wave 3 implementation source. | PASS |
| W3-C02 | Scope | Scope limited to Wave 3 concurrency/public API safety plus supplied current-script updates. | PASS |
| W3-C03 | Public API | Public function names/signatures/menu callback strings preserved. | PASS |
| W3-C04 | Static coverage | Public destructive workflows and trigger/web surfaces reviewed. | PASS |
| W3-C05 | Busy guard | Confirmed five uncovered mutating workflows protected. | PASS |
| W3-C06 | Duplicate invocation | Overlap behavior validated by supplied checklist evidence. | PASS |
| W3-C07 | Cleanup on error | Busy state cleanup validated by supplied checklist evidence. | PASS |
| W3-C08 | Cleanup on cancel | Cancel cleanup validated by supplied checklist evidence. | PASS |
| W3-C09 | Menu/trigger compatibility | Menu and trigger/dynamic reference evidence reviewed. | PASS |
| W3-C10 | Workflow regression | Monthly Start and Monthly Update validations recorded. | PASS |
| W3-C11 | Dashboard Quality | v1.8.9.3 Dashboard Quality report reviewed. | PASS |
| W3-C12 | Framework Timing | v1.8.9.3 Framework Timing report reviewed. | PASS |
| W3-C13 | Rollback | Rollback to v1.8.9.2 documented. | PASS |
| W3-C14 | PR hygiene | Repository prep required before commit/PR. | PASS |
| W3-C15 | Closure | All Wave 3 release blockers are cleared. | PASS |

## 6. Rollback

Rollback source: `Master_List/Current Production Script/v1.8.9.2_Current_Production`.

If post-release Wave 3 behavior regresses, revert the Apps Script deployment to v1.8.9.2 and restore the prior source while preserving Wave 1 business-rule decisions already accepted in v1.8.9.2.

## 7. Final Closure Decision

**Wave 3 is CLOSED.** The supplied v1.8.9.3 current production source, update notes, completed checklist, Dashboard Quality report, Framework Timing report, and trigger/dynamic-reference map provide sufficient closure evidence. The next wave is **Wave 4 — Performance and timing optimization planning**.
