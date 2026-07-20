# v1.7.5 Reports Review — Syntax, Apps Script Manifest, and Owner Priority Clarification

Date: 2026-07-18

## Scope Reviewed

Requested reports under `reports/` on `origin/main`:

- `reports/appsscript_validation.txt`
- `reports/v1.7.5_ESLint_Report.json`
- `reports/v1.7.5_ESLint_Report.txt`

Governing local production candidate reviewed:

- `Master_List/Current Production Script/v.1.7.5_Current_Production_Script`

## Owner Priority Clarification

The owner clarified that the downstream monthly output is a third-generation active output:

```text
Raw Data -> Demo P -> downstream derived output
```

Therefore, the critical preservation target is Raw Data. Raw Data must remain fully preserved and protected. The downstream derived output is closed from Wave 1 clearance scope by owner direction.

## Apps Script Manifest Validation

`reports/appsscript_validation.txt` contains the intended manifest shape:

- `timeZone`: `America/Chicago`
- `dependencies`: `{}`
- `exceptionLogging`: `STACKDRIVER`
- `runtimeVersion`: `V8`
- OAuth scopes:
  - `https://www.googleapis.com/auth/spreadsheets`
  - `https://www.googleapis.com/auth/script.container.ui`
  - `https://www.googleapis.com/auth/script.scriptapp`
  - `https://www.googleapis.com/auth/script.storage`

Local manifest checks confirmed both committed manifests parse as JSON and match this structure:

- `Master_List/appsscript.json`
- `Master_List/Current Production Script/appsscript.json`

## ESLint Report Review

The uploaded ESLint JSON report identifies:

- 1 error
- 129 warnings

The single error in the uploaded report is:

```text
no-undef: 'markCanvasStep' is not defined
```

Current local `v.1.7.5_Current_Production_Script` has the `createRawDataOutputSheetFromTemplateFast_()` local `markCanvasStep` closure, so this uploaded ESLint error is already corrected in the current working production candidate.

The remaining warnings are `no-unused-vars`. For Google Apps Script, many top-level functions are intentionally public menu callbacks, trigger handlers, library/API surfaces, or manual diagnostic entry points. These warnings should not be treated as automatic removal candidates without owner/API review.

## Current Static Validation Result

Current local checks:

- `node --check` passes for the v1.7.5 production candidate.
- Both Apps Script manifests parse with `python3 -m json.tool`.
- The W1-T03 Python fallback finds the remaining `.deleteSheet(` call inside the centralized helper `deleteSheetSafely_()`.

## Release/Remediation Interpretation

1. Raw Data preservation remains the highest data-safety priority.
2. The closed downstream derived-output staging item is not a Wave 1 release blocker.
3. The uploaded ESLint `markCanvasStep` error is closed in the current candidate.
4. The uploaded `no-unused-vars` warnings should be reviewed as public-surface inventory, not bulk-deleted.
5. Wave 1 clearance should keep Raw Data preservation evidence explicit in W1-T14 end-to-end regression notes.
