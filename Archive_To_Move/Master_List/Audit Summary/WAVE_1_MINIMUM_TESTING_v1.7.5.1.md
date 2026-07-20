# Master List Wave 1 Minimum Clearance Testing — v1.7.5

Date: 2026-07-18

## Purpose

This checklist defines the minimum testing needed to clear Wave 1 for the v1.7.5 production script:

```text
Master_List/Current Production Script/v.1.7.5_Current_Production_Script
```

Wave 1 can be cleared only after these tests pass in a copied, non-production workbook. Do not run destructive tests against production data.

## Clearance Rule

Wave 1 is clear for release only if all required tests below pass, all produced output sheets match expected business output, and any failure test proves that the prior approved sheet remains available.

A failed or skipped required test blocks release until either:

1. The code is corrected and the test is rerun successfully, or
2. The owner explicitly accepts the residual risk in writing.

## Minimum Required Tests

| Test ID | Priority | Area | Required setup | Steps | Expected result | Blocks release if |
|---|---|---|---|---|---|---|
| W1-T01 | Required | Static syntax | Local repository checkout with v1.7.5 script. | Copy `v.1.7.5_Current_Production_Script` to a `.js` file and run `node --check`. | Syntax check passes with no parser errors. | Any syntax/parser error occurs. |
| W1-T02 | Required | Manifest parse | Local repository checkout. | Run `python3 -m json.tool` against both committed manifests. | Both manifests parse as valid JSON. | Either manifest is invalid JSON. |
| W1-T03 | Required | Central destructive guard | Local repository checkout. | Search v1.7.5 for `.deleteSheet(`. | The only remaining `deleteSheet()` call is inside `deleteSheetSafely_()`. | Any direct `deleteSheet()` call exists outside the centralized helper. |
| W1-T04 | Required | Existing Master List replacement — cancel | Copied workbook with an existing Master List for the selected month. | Run `createMasterList`; choose `No` at the replacement prompt. | Existing Master List remains unchanged; no staged sheet remains; timing/log message indicates cancellation. | Existing sheet is modified/deleted or a staged sheet remains after cancellation. |
| W1-T05 | Required | Existing Master List replacement — success | Copied workbook with valid Demo P, templates, Care Plan source sheets, and an existing Master List for the selected month. | Run `createMasterList`; choose `Yes`; allow completion. | Existing sheet remains until staged build validates; final sheet has the original Master List name; no `__STAGED` sheet remains; row/header/date outputs match expected v1.7.4 business logic. | Existing sheet is deleted before successful staged validation, final output is missing/wrong, or staged sheet remains after success. |
| W1-T06 | Required | Existing Master List replacement — forced failure | Copied workbook with an existing Master List. Temporarily remove or rename the Master List template in the copy only. | Run `createMasterList`; choose `Yes`. | Workflow fails closed; original Master List remains available; staged sheet is removed or hidden for inspection; error message identifies missing template/build failure. | Original Master List is deleted, corrupted, hidden unexpectedly, or unrecoverable. |
| W1-T07 | Required | Staged validation failure | Copied workbook where the staged Master List can be made invalid, such as missing PMR header in copied template/dashboard configuration. | Run `createMasterList`; choose `Yes` if prompted. | Promotion is blocked by staged validation; original Master List remains available; failure is logged. | Invalid staged sheet is promoted or original sheet is deleted. |
| W1-T08 | Required | Web restore HTML escaping | Test web-app deployment or Apps Script execution harness for `doGet`. | Call `doGet` with `restoreTarget` containing `<`, `>`, `&`, double quote, single quote, and formula-like text. | Returned HTML renders escaped text only; no markup/script executes. | Raw request/error text is rendered as executable or structural HTML. |
| W1-T09 | Required | Web restore busy-lock path | Test deployment/copy capable of concurrent restore calls. | Hold or simulate the document lock, then call `doGet`. | Busy message is returned; no un-acquired lock release warning/error is produced. | `releaseLock()` error occurs when no lock was acquired or restore proceeds concurrently. |
| W1-T10 | Required | Guarded protected-sheet deletion | Copied workbook with Format Dashboard, Index, Framework Timing, Dashboard Quality, RFF base template, and Demo P archive sheets. | Exercise guarded helper paths using protected names, or run a test harness that calls `deleteSheetIfExists_` with protected names. | Each protected deletion attempt throws before deleting; protected sheets remain unchanged. | Any protected/system sheet is deleted or cleared through the guarded path. |
| W1-T11 | Required | Archive replacement success | Copied workbook plus test archive workbook containing a duplicate non-protected archive sheet name. | Run a workflow that archives a non-protected source sheet with the duplicate archive name. | Existing archive sheet is replaced/renamed according to workbook constraints; new archive copy is verified by name; local source deletion occurs only after verified archive copy and guard validation. | Local source deletes before archive verification or archive output is missing. |
| W1-T12 | Required | Archive replacement protected name | Test archive workbook with a protected/system sheet name. | Attempt archive replacement using a protected name such as `Index`, `Format Dashboard`, or `RFF_BASE_TEMPLATE`. | Operation fails before archive sheet removal/replacement; protected archive sheet remains. | Protected archive sheet is cleared, renamed, or deleted. |
| W1-T13 | Required | Monthly Change/template/report destructive paths | Copied workbook with Monthly Change report/template surfaces. | Run Monthly Change report rebuild and approved Monthly Change template rebuild workflow in copy. | Rebuilds still complete where intended, using `deleteSheetSafely_`; protected deletion guard does not block legitimate non-protected report replacement. | Workflow fails unexpectedly or deletes a protected/system sheet. |
| W1-T14 | Required | End-to-end regression smoke | Copied workbook with representative month data. | Run minimum path: `createMasterList`, `createIndexSheet`, archive/raw or monthly archive path if enabled, and web restore smoke. | Outputs match approved business logic; public entry points still exist; no unexpected public API rename/removal. | Any approved business output changes without owner acceptance. |

## Required Evidence to Attach Before Release

- Command output for W1-T01 through W1-T03.
- Screenshot or exported PDF/CSV evidence of successful staged Master List replacement from W1-T05.
- Error/log evidence from W1-T06 and W1-T07 proving the original Master List was preserved.
- Web output evidence from W1-T08 showing escaped characters render harmlessly.
- Busy-lock evidence from W1-T09.
- Protected-sheet before/after evidence for W1-T10 and W1-T12.
- Archive verification evidence for W1-T11.
- End-to-end regression summary for W1-T14.

## Minimum Runtime Acceptance Criteria

Wave 1 passes only if:

1. v1.7.5 parses successfully.
2. Both manifests remain valid JSON.
3. All Apps Script `deleteSheet()` calls are centralized through `deleteSheetSafely_()`.
4. Existing Master List reruns preserve the old sheet until staged validation and promotion succeed.
5. Failed staged builds do not delete or corrupt the existing Master List.
6. Web restore output escapes request and error text.
7. Web restore does not release an un-acquired lock.
8. Protected/system sheets cannot be removed through guarded destructive helpers.
9. Archive/local delete flows delete local sheets only after archive verification.
10. A copied-workbook end-to-end smoke test confirms no approved business logic changed.

## Release Decision

- **Clear Wave 1** only when W1-T01 through W1-T14 pass and evidence is attached.
- **Do not clear Wave 1** if any required test is skipped, fails, or cannot be evidenced.
- **Escalate to owner decision** if a test cannot be run because the required workbook/deployment state is unavailable.
