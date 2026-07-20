# Wave 1 Minimum Clearance Testing — v1.7.5

Date: 2026-07-18

## Purpose

This checklist defines the minimum testing needed to clear Wave 1 for the v1.7.5 production script:

```text
Master_List/Current Production Script/v.1.7.5_Current_Production_Script
```

Wave 1 can be cleared only after these tests pass in a copied, non-production workbook. Do not run destructive tests against production data.

## Scope Closure

Owner direction on 2026-07-19 closed the downstream derived-output protection work from Wave 1. Wave 1 clearance now focuses on the source-data/protected-sheet safeguards, web restore hardening, archive verification, manifest/static validation, and regression evidence listed below.

## Clearance Rule

Wave 1 is clear for release only if all required tests below pass, all produced output sheets match expected business output, and any failure test proves that protected source/system sheets remain available.

A failed or skipped required test blocks release until either:

1. The code is corrected and the test is rerun successfully, or
2. The owner explicitly accepts the residual risk in writing.

## Minimum Required Tests

| Test ID | Priority | Area | Required setup | Steps | Expected result | Blocks release if |
|---|---|---|---|---|---|---|
| W1-T01 | Required | Static syntax | Local repository checkout with v1.7.5 script. | Copy `v.1.7.5_Current_Production_Script` to a `.js` file and run `node --check`. | Syntax check passes with no parser errors. | Any syntax/parser error occurs. |
| W1-T02 | Required | Manifest parse | Local repository checkout. | Run `python3 -m json.tool` against both committed manifests. | Both manifests parse as valid JSON. | Either manifest is invalid JSON. |
| W1-T03 | Required | Central destructive guard | Local repository checkout. | Search v1.7.5 for `.deleteSheet(`. | The only remaining `deleteSheet()` call is inside `deleteSheetSafely_()`. | Any direct `deleteSheet()` call exists outside the centralized helper. |

If `rg` is not installed for W1-T03, use this single-file Python fallback instead of recursive grep:

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('Master_List/Current Production Script/v.1.7.5_Current_Production_Script')
for line_no, line in enumerate(path.read_text().splitlines(), 1):
    if '.deleteSheet(' in line:
        print(f'{path}:{line_no}:{line}')
PY
```

| Test ID | Priority | Area | Required setup | Steps | Expected result | Blocks release if |
|---|---|---|---|---|---|---|
| W1-T08 | Required | Web restore HTML escaping | Test web-app deployment or Apps Script execution harness for `doGet`. | Call `doGet` with `restoreTarget` containing `<`, `>`, `&`, double quote, single quote, and formula-like text. | Returned HTML renders escaped text only; no markup/script executes. | Raw request/error text is rendered as executable or structural HTML. |
| W1-T09 | Required | Web restore busy-lock path | Test deployment/copy capable of concurrent restore calls. | Hold or simulate the document lock, then call `doGet`. | Busy message is returned; no un-acquired lock release warning/error is produced. | `releaseLock()` error occurs when no lock was acquired or restore proceeds concurrently. |
| W1-T10 | Required | Guarded protected-sheet deletion | Copied workbook with Format Dashboard, Index, Framework Timing, Dashboard Quality, RFF base template, and Demo P archive sheets. | Exercise guarded helper paths using protected names, or run a test harness that calls `deleteSheetIfExists_` with protected names. | Each protected deletion attempt throws before deleting; protected sheets remain unchanged. | Any protected/system sheet is deleted or cleared through the guarded path. |
| W1-T11 | Required | Archive replacement success | Copied workbook plus test archive workbook containing a duplicate non-protected archive sheet name. | Run a workflow that archives a non-protected source sheet with the duplicate archive name. | Existing archive sheet is replaced/renamed according to workbook constraints; new archive copy is verified by name; local source deletion occurs only after verified archive copy and guard validation. | Local source deletes before archive verification or archive output is missing. |
| W1-T12 | Required | Archive replacement protected name | Test archive workbook with a protected/system sheet name. | Attempt archive replacement using a protected name such as `Index`, `Format Dashboard`, or `RFF_BASE_TEMPLATE`. | Operation fails before archive sheet removal/replacement; protected archive sheet remains. | Protected archive sheet is cleared, renamed, or deleted. |
| W1-T13 | Required | Monthly Change/template/report destructive paths | Copied workbook with Monthly Change report/template surfaces. | Run Monthly Change report rebuild and approved Monthly Change template rebuild workflow in copy. | Rebuilds still complete where intended, using `deleteSheetSafely_`; protected deletion guard does not block legitimate non-protected report replacement. | Workflow fails unexpectedly or deletes a protected/system sheet. |
| W1-T14 | Required | End-to-end regression smoke | Copied workbook with representative month data. | Run minimum path: source-data/template refresh as applicable, active-sheet builds, `createIndexSheet`, archive/raw or monthly archive path if enabled, and web restore smoke. | Outputs match approved business logic; public entry points still exist; no unexpected public API rename/removal. | Any approved business output changes without owner acceptance. |

## Evidence Logging Harness

A separate Apps Script evidence logger is available at `Master_List/scripts/wave1_clearance_evidence_harness.gs`. Import it only into a copied, non-production workbook alongside the v1.7.5 production script, then run `initializeWave1ClearanceEvidenceLog()` to create the evidence sheet and helper rows for the required W1-Txx tests.

## Required Evidence to Attach Before Release

- Command output for W1-T01 through W1-T03.
- Web output evidence from W1-T08 showing escaped characters render harmlessly.
- Busy-lock evidence from W1-T09.
- Protected-sheet before/after evidence for W1-T10 and W1-T12.
- Archive verification evidence for W1-T11.
- Monthly Change rebuild evidence for W1-T13.
- End-to-end regression summary for W1-T14.

## Minimum Runtime Acceptance Criteria

Wave 1 passes only if:

1. v1.7.5 parses successfully.
2. Both manifests remain valid JSON.
3. All Apps Script `deleteSheet()` calls are centralized through `deleteSheetSafely_()`.
4. Web restore output escapes request and error text.
5. Web restore does not release an un-acquired lock.
6. Protected/system sheets cannot be removed through guarded destructive helpers.
7. Archive/local delete flows delete local sheets only after archive verification.
8. A copied-workbook end-to-end smoke test confirms no approved business logic changed.

## Release Decision

- **Clear Wave 1** only when W1-T01 through W1-T03 and W1-T08 through W1-T14 pass and evidence is attached.
- **Do not clear Wave 1** if any required test is skipped, fails, or cannot be evidenced.
- **Escalate to owner decision** if a test cannot be run because the required workbook/deployment state is unavailable.
