# Master List v1.6.41 — Wave 3 Trigger Concurrency Closure

<!-- markdownlint-disable MD013 -->

## Status

Wave 3 is closed in `v.1.6.41_Current_Production_Script`.

## Scope

Wave 3 covered trigger, concurrency, and public API safety for the Index
refresh trigger.

## Implemented Changes

| Finding | Closure Evidence | Status |
| :--- | :--- | :--- |
| EXH-009 | Added a document-property workflow busy flag, stale busy TTL, deferred index refresh marker, and relevant-sheet-only index trigger signature. | Closed |
| Trigger scope | `handleSpreadsheetChangeForIndex(e)` now considers only governed sheet names for Banners, CP Due, Unlock/Unlocked CP, Raw Data, Demo P, Disenrolled, Master List, Monthly Change, Format Dashboard, Dashboard Quality Report, and Framework Timing Report. | Closed |
| Busy workflow safety | `runFrameworkTimed_()` now wraps framework workflows in a busy flag and runs one deferred Index refresh after the workflow completes. | Closed |

## Validation Performed

| Validation | Result |
| :--- | :--- |
| JavaScript syntax validation | Passed `node --check` against a temporary `.js` copy of the production script. |
| Relevant sheet filter validation | Passed expected true/false cases for governed and non-governed sheet names. |
| Busy flag implementation scan | Passed. Busy key, started timestamp key, deferred refresh key, TTL, and helper functions are present. |
| Trigger implementation scan | Passed. Trigger uses relevant-sheet signature, busy skip/defer, document lock, and deferred marker. |
| Manifest validation | Passed JSON parsing for both manifest copies. |

## Required Live Apps Script Smoke Tests

- Run `Format Monthly Sheets` while adding/removing an unrelated temporary sheet;
  the Index trigger should ignore the unrelated sheet.
- Run `Format Monthly Sheets` while relevant sheets are being created or removed;
  the Index trigger should defer and refresh once after the workflow.
- Simulate a stale busy property older than the TTL and confirm the trigger clears it.
