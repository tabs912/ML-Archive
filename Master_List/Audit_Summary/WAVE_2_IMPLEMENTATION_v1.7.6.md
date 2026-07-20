# Wave 2 Implementation — v1.7.6

Date: 2026-07-19

## Scope

Wave 2 implements runtime-stability and validation hardening on top of the v1.7.5 production candidate. The governing production implementation for this wave is:

```text
Master_List/Current Production Script/v.1.7.6_Current_Production_Script
```

## Functional Summary

- Adds a new v1.7.6 production candidate and preserves prior v1.7.5 code unchanged.
- Adds fail-closed active-sheet validation before UI-bound source workflows mutate sheets.
- Keeps template-driven active-sheet builds on the active source/template path and blocks accidental dashboard, index, timing, archive, system, and template sheet execution.
- Adds a Create Monthly Update preflight so missing Raw Data or Demo P prerequisites stop the workflow before monthly outputs are mutated.
- Keeps public menu/function names stable.

## Change Log

### ML-HI-005 — Active-sheet validation hardening

- Added `assertActiveWorkflowSourceSheet_()` to reject protected/system/template tabs for active-sheet workflows.
- Added `assertActiveRawDataSourceSheet_()` to require a Participant PMR header on row 1 or the governed header row before Raw Data formatting or raw archiving.
- Added `assertActiveBannerSourceSheet_()` and `assertActiveBannerOutputSheet_()` so Banner source formatting and output validation fail before operating on the wrong tab.
- Applied the guards to `formatRawData()`, `formatRawDataInPlaceSheet_()`, `formatBannerReport()`, `validateActiveBannerFormatterOutput()`, `archiveActiveRawDataSheet()`, and `formatMonthlySheets()` route execution.

### ML-HI-006 — Monthly workflow preflight

- Added `preflightMonthlyUpdateForMonth_()` to check current-month Raw Data, previous-month Raw Data, and ongoing Demo P before Create Monthly Update begins mutating monthly outputs.
- `runMonthlyUpdate()` now runs the preflight immediately inside the timed workflow and before Monthly Change, Demo P, Disenrolled, downstream derived output, index, or sort steps execute.
- Preflight diagnostics identify all missing prerequisites in one fail-closed error message.

### ML-MD-009 — Formula-like text handling

- No formula-escaping transformation was added in this wave.
- Runtime evidence is still required before changing user-visible text values because changing literal text handling could alter approved output content.

## Release Notes

- Recommended release version: v1.7.6.
- Public menu and callable function names are unchanged.
- UI-bound workflows now fail earlier when the active tab is a dashboard, index, timing, archive, system, template, or otherwise invalid source/output sheet.
- Create Monthly Update now validates monthly prerequisites before performing write/delete/copy phases.

## Dependency Impact

- No new external libraries, advanced services, OAuth scopes, HTML files, or manifests were added.
- Uses existing Apps Script services and existing sheet lookup/header helpers.
- The active-sheet validation logic depends on existing constants, protected sheet names, Raw Data header detection, and PMR header mapping.

## Performance Impact

- Adds small preflight/header reads before selected UI-bound workflows.
- Reduces partial-run recovery risk by failing before expensive monthly mutation phases when prerequisites are missing.
- No broad performance optimization was attempted in Wave 2.

## Required Test Plan

1. Syntax/static validation: copy v1.7.6 to `.js` and run `node --check`.
2. Manifest validation: run `python3 -m json.tool` on committed manifests.
3. Wrong active sheet tests: select Format Dashboard, Index, Framework Timing Report, archive, and template tabs before running active-source functions and confirm each fails closed.
4. Valid Raw Data source test: select a copied Raw Data import/source sheet with a PMR header and run Format Raw Data.
5. Invalid Raw Data source test: select a non-Raw Data tab without a PMR header and confirm Raw Data workflows fail before mutation.
6. Banner source/output tests: verify Banner source formatting rejects output/template/system tabs and Banner output validation rejects non-Banner tabs.
7. Format Monthly Sheets regression: run Banners, CP Due, Unlock CP, and Raw Data route processing from copied monthly import tabs and confirm template-based active outputs still build.
8. Create Monthly Update preflight failure: remove/rename one prerequisite at a time in a copied workbook and confirm no monthly output mutation occurs after preflight failure.
9. Create Monthly Update success regression: run the workflow with all prerequisites present and compare output parity against approved behavior.
10. Formula-like text evidence: include names/notes beginning with `=`, `+`, `-`, and `@`; document current behavior before approving any future text transformation.

## Known Issues Intentionally Left Unchanged

- Wave 3 entry-point lock matrix is not included.
- Wave 4 performance optimizations are deferred until runtime profiling.
- Wave 5 public API cleanup is deferred pending consumer approval.
- Wave 6 manifest/governance documentation cleanup remains separate.
- Formula-like text output transformation remains evidence-only until owner approval.

## Rollback Reference

Rollback to:

```text
Master_List/Current Production Script/v.1.7.5_Current_Production_Script
```
