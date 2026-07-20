# Master List Wave 1 Implementation — v1.7.5

Date: 2026-07-18

## Scope

Wave 1 implements the approved critical correctness and data-safety remediation for v1.7.5. The governing production implementation is:

```text
Master_List/Current Production Script/v.1.7.5_Current_Production_Script
```

## Functional Summary

- Creates a new v1.7.5 production script and preserves v1.7.4 unchanged.
- Replaces the Master List delete-before-rebuild lifecycle with a staged swap for existing-month reruns.
- Adds centralized destructive-operation guard helpers for sheet deletion and archive replacement paths.
- Adds HTML escaping for the Index restore web endpoint and prevents lock release when no lock was acquired.
- Keeps public entry-point names stable.

## Change Log

### ML-CR-001 — Staged Master List replacement

- Existing Master List reruns now build into a timestamped `__STAGED` sheet instead of deleting the existing Master List before rebuild.
- The staged sheet is hidden during build, validated for title/header/PMR structure, then promoted only after copy/sync/write steps complete.
- If a staged build fails, the script attempts to delete only the staged sheet; if cleanup fails, it hides the staged sheet for inspection and preserves the existing Master List.

### ML-CR-002 / ML-HI-004 — Web restore sanitization and lock control

- Added `escapeHtml_()` for request/error text used in `HtmlService` output.
- Updated `doGet()` to display escaped restore target names and escaped error messages.
- Added `lockAcquired` tracking so `releaseLock()` runs only after a successful `tryLock()`.

### ML-CR-003 — Destructive handoff centralization

- Added protected sheet-name validation for dashboard, index, timing, quality, base template, Demo P archive, and `RFF_` system surfaces.
- Routed `deleteSheetIfExists_()`, raw archive local cleanup, monthly archive local cleanup, and archive replacement deletion through guarded helpers.
- Preserved existing protected-name parameters supplied by callers.


### Static report follow-up — Raw Data fast canvas tracer

- Reviewed `reports/v1.7.5_ESLint_Report.json` and `Master_List/Reports/Gemini node recommendations.pdf` from `origin/main`.
- Confirmed and corrected the single ESLint error: `markCanvasStep` was referenced in `createRawDataOutputSheetFromTemplateFast_()` without a local definition.
- Added an optional `timing` parameter and a local `markCanvasStep` closure so the runtime-cache-cleared trace is safe when timing is supplied and a no-op otherwise.

## Release Notes

- Recommended release version: v1.7.5.
- Business logic is preserved; changed behavior is limited to fail-closed sheet replacement/deletion and escaped web output.
- Existing Master List sheets are preserved until a staged replacement validates and is ready to promote.
- Web restore responses no longer render request/error text as raw HTML.

## Dependency Impact

- No new external libraries, advanced services, manifests, OAuth scopes, or HTML files were added.
- Uses existing Apps Script services already present in the project: `SpreadsheetApp`, `Utilities`, `Session`, `HtmlService`, and `LockService`.
- Adds internal helper functions only; no public API rename/removal was performed.

## Performance Impact

- Existing-month Master List reruns temporarily create an additional staging sheet during build.
- This adds a small staging overhead but avoids deleting the approved prior output before validation.
- No broad performance optimizations were attempted in Wave 1.

## Minimum Clearance Testing

The minimum pass/fail checklist required to clear Wave 1 is documented in:

```text
Master_List/Audit_Summary/WAVE_1_MINIMUM_TESTING_v1.7.5.md
```

Wave 1 is not cleared for release until that checklist passes in a copied, non-production workbook and the required evidence is attached.

## Required Test Plan

1. Syntax/static validation: copy v1.7.5 to `.js` and run `node --check`.
2. Manifest validation: run `python3 -m json.tool` on committed manifests.
3. Existing Master List rerun: approve replacement and verify old sheet remains until staged output validates and promotes.
4. Existing Master List rerun: cancel replacement and verify no sheet changes.
5. Failure injection: missing template or forced write failure should preserve the existing Master List and remove or hide the staged sheet.
6. Web restore: test `restoreTarget` values containing `<`, `>`, `&`, quotes, and apostrophes.
7. Web restore busy-lock path: verify no un-acquired lock release warning is generated.
8. Destructive guard tests: verify protected/system sheets cannot be deleted through guarded helpers.
9. Archive replacement tests: duplicate archive sheet, one-sheet archive workbook, and protected archive name.
10. Regression: build Master List, archive monthly sheets, format raw/banner reports, rebuild Index, and confirm output parity on a copied non-production workbook.

## Known Issues Intentionally Left Unchanged

- Wave 2 active-sheet validation and monthly preflight hardening are not included.
- Wave 3 entry-point lock matrix is not included beyond the `doGet` lock-release fix.
- Wave 4 performance optimizations are deferred until runtime profiling.
- Wave 5 public API cleanup is deferred pending consumer approval.
- Wave 6 manifest/governance documentation cleanup remains a separate wave.

## Rollback Reference

Rollback to:

```text
Master_List/Current Production Script/v.1.7.4_Current_Production_Script
```
