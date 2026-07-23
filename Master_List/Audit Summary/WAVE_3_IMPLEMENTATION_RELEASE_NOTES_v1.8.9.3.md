# Wave 3 Implementation Release Notes — Master List v1.8.9.3

Date: 2026-07-23
Production source: `Master_List/Current Production Script/v1.8.9.3_Current_Production`
Baseline reviewed: `Master_List/Current Production Script/v1.8.9.2_Current_Production`

## Release Objective

Wave 3 implements the concurrency and lock-safety remediation for the five standalone public workflows that can mutate workbook state outside the combined monthly workflows. The implementation keeps user prompts outside the document-lock window, then runs the mutating workflow body through `runFrameworkTimed_`, which provides the document lock, workflow busy flag, framework timing capture, best-effort cleanup, and deferred index refresh handling.

## Public Functions Updated

- `formatRawData`
  - Keeps active-sheet validation and month prompt before the lock.
  - Runs Raw Data formatting through `runFrameworkTimed_`.
  - Passes wrapper timing and `markFrameworkStep_` into `formatRawDataInPlaceSheet_`.

- `buildDemoPFromScratch`
  - Keeps the month prompt before the lock.
  - Runs Demo P initialization through `runFrameworkTimed_`.
  - Replaces public-wrapper manual runtime timing calls with framework timing steps.

- `updateDemoPMonthlySync`
  - Keeps the month prompt before the lock.
  - Runs standalone Monthly Change Demo P sync through `runFrameworkTimed_`.
  - Passes wrapper timing into `updateDemoPMonthlySyncForMonth_`.

- `buildMonthlyChangeReport`
  - Keeps the month prompt before the lock.
  - Runs standalone Monthly Change report generation through `runFrameworkTimed_`.
  - Passes wrapper timing into `buildMonthlyChangeReportForMonth_`.

- `createMasterList`
  - Keeps the month prompt before the lock.
  - Runs standalone Master List creation through `runFrameworkTimed_`.
  - Passes wrapper timing into `createMasterListForMonth_`.

## Behavior Preserved

- Public function names and menu-compatible entry points are unchanged.
- Initial UI prompts still occur before `runFrameworkTimed_`, so users are not holding a document lock while entering/selecting a reporting month.
- Existing helper functions continue to perform their domain-specific validations, notifications, formatting, and sheet operations.
- Wave 1 business rules remain unchanged in this version, including strict first-of-month disenrollment handling, Master List preflight behavior for combined monthly update workflows, report-header-specific disenrollment sorting, and Primary PMR fail-closed behavior.

## Concurrency and Safety Impact

- The five standalone workflows now share the same lock/busy-flag protection model already used by combined framework workflows.
- If another framework workflow is active, the standalone workflow will stop through `runWithWorkflowBusyFlag_` instead of mutating concurrently.
- Framework timing reports are written by `runFrameworkTimed_` instead of manual runtime timing calls embedded in the public wrapper functions.
- Cleanup behavior is centralized through `runFrameworkTimed_` / `runWithWorkflowBusyFlag_`, including busy-flag clearing, deferred index refresh handling, base-template hiding, cache clearing, and lock release.

## Validation Checklist

- [ ] Confirm `formatRawData` prompts before lock, formats a test Raw Data import, and writes a Framework Timing entry.
- [ ] Confirm `buildDemoPFromScratch` prompts before lock, creates Demo P from formatted Raw Data, and writes a Framework Timing entry.
- [ ] Confirm `updateDemoPMonthlySync` prompts before lock, performs Demo P monthly sync, and writes a Framework Timing entry.
- [ ] Confirm `buildMonthlyChangeReport` prompts before lock, creates the Monthly Change report, and writes a Framework Timing entry.
- [ ] Confirm `createMasterList` prompts before lock, creates/replaces the Master List according to existing rules, and writes a Framework Timing entry.
- [ ] Start one long workflow and confirm a second standalone workflow receives the busy workflow message instead of running concurrently.
- [ ] Confirm Dashboard Quality and Framework Timing reports still generate after the Wave 3 changes.

## Repository Verification Performed

- Static syntax validation is expected against a temporary `.js` copy of `v1.8.9.3_Current_Production`.
- Static wrapper verification is expected to confirm the five public functions call `runFrameworkTimed_` and no longer contain `startRuntimeTiming_`, `markRuntimeStep_`, or `writeRuntimeTimingReport_` in their public wrapper bodies.
- Runtime spreadsheet validation remains required before marking v1.8.9.3 ready for production use.
