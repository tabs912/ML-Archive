# Master List Performance Optimization Test Plan v1.6.75

## Purpose

This document replaces the prior v1.6.75 production-script build attempt with a focused performance optimization plan. It outlines the testing needed and the implementation sequence required before producing a new production script version from `Master_List/Current Production Script/v.1.6.74_Current_Production_Script`.

The next production script should not be generated until the timing baseline, test workbook state, and acceptance criteria below are confirmed.

## Current Baseline Evidence

Use the following review inputs as the baseline for the optimization wave:

- `Master_List/Audit_Summary/OPTIMIZATION_CANDIDATES_v1.6.58.md`
- `Master_List/Reports/Clean-up v1.6.71 - Framework Timing Report..pdf`
- Governing source: `Master_List/Current Production Script/v.1.6.74_Current_Production_Script`

The v1.6.71 timing report indicates the highest-priority performance target is `Create Monthly Update 05.01.26`, which reached bottleneck status. The largest recurring steps to investigate are:

1. `Create Monthly Update - Create Master List - Create naked canvas - Master List output sheet`
2. `Create Monthly Update - Update Demo P - Archive - Demo P primary rows saved before monthly replacement`
3. `Monthly Change datasets compiled in-memory`
4. `Monthly Change report sheet created from template`
5. `Create Monthly Update - Index refreshed and active tabs organized without showing hidden system/template sheets`

Secondary watch-list items are:

1. Build Demo P canvas write and contact compression.
2. Standalone Disenrolled Exclusion sheet readiness.
3. Raw/archive sheet copy cost.
4. Dashboard Quality diagnostic section writes.
5. Save Active Layout as Rebuild Default.

## Optimization Completion Principles

1. Preserve approved business logic.
2. Keep public menu callbacks and workflow entry points stable.
3. Keep archive-before-delete safety behavior intact.
4. Preserve Demo P PMR grouping, Primary PMR Row assignment, contact flattening, metadata, and banner sync behavior.
5. Preserve Master List headers, primary-row selection, CP Due sync, Unlock CP sync, title/date rows, tab color, frozen rows/columns, row heights, and Index placement.
6. Preserve hidden system/template sheet policy during monthly update organization.
7. Add instrumentation first, then optimize one bottleneck at a time.
8. Validate each bottleneck independently before combining changes into a production version.
9. Avoid wholesale rewrites and unrelated formatting changes.
10. Produce the final production script as a complete new versioned file only after the test plan passes.

## Phase 0 — Test Workbook and Baseline Setup

### Required Setup

1. Confirm the workbook contains representative current and previous month sheets:
   - Raw Data current month.
   - Raw Data previous month.
   - Banners current month.
   - CP Due current month.
   - Unlock CP current month.
   - Existing Demo P sheet.
   - Existing Disenrolled Exclusion sheet when testing existing-sheet behavior.
2. Confirm the archive workbook is accessible.
3. Confirm external archive deletion/replacement behavior is acceptable in the test environment.
4. Confirm no unrelated manual workbook changes are made during timing runs.
5. Clear or snapshot timing logs before each timed run so deltas are readable.
6. Record row counts, PMR counts, and sheet counts before each run.

### Required Baseline Runs

Run each workflow without code changes first and export or preserve the Framework Timing Report:

1. Create / Refresh All Templates — first build.
2. Create / Refresh All Templates — metadata-only or smart refresh.
3. Format Monthly Sheets.
4. Build Demo P.
5. Create Disenrolled List.
6. Create Master List.
7. Create Monthly Update.
8. Archive Monthly Import Sheets.
9. Archive Monthly Active Sheets.
10. Dashboard Quality Workflow.
11. Save Active Layout as Rebuild Default.

### Baseline Capture Fields

For every run, capture:

- Workflow name.
- Start time.
- Total runtime.
- Step runtimes over 10 seconds.
- Severity.
- Input row count.
- Output row count.
- PMR count when relevant.
- Number of sheets moved.
- Number of archive rows written.
- Number of columns written.
- Whether the run was first-run or existing-sheet behavior.

## Phase 1 — Instrumentation-Only Build

### Objective

Create a temporary instrumentation build from v1.6.74 that adds detailed timing only. Do not change optimization behavior in this phase.

### Instrumentation Targets

#### Master List Canvas Creation

Add timing inside `createMasterListSheetFromTemplate_()` for:

1. Existing sheet lookup.
2. Existing sheet delete.
3. Dashboard config load.
4. Header resolution.
5. Template lookup.
6. Governed sheet insertion.
7. `showSheet()`.
8. `setActiveSheet()`.
9. Grid resize.
10. Title row copy.
11. Header row copy.
12. Data-row format copy.
13. Column width application.
14. Governed number/date/text format application.
15. Title/date value stamping.
16. Header value stamping.
17. Frozen rows.
18. Frozen columns.
19. Tab color.
20. Runtime cache clearing.

#### Demo P Archive Append

Add timing inside `appendDemoPArchiveRows_()` and archive-sheet readiness helpers for:

1. Archive sheet lookup.
2. Archive template lookup.
3. Archive sheet creation/copy.
4. Archive sheet rename.
5. Header read.
6. Header-map build.
7. Payload build.
8. Row capacity expansion.
9. Column capacity expansion.
10. Values write.
11. Hide/archive visibility enforcement.
12. Runtime cache clearing.

#### Monthly Change

Add timing around:

1. Current/previous Raw Data sheet lookup.
2. Current/previous full data reads if not already timed.
3. Header-map construction.
4. PMR map construction.
5. Section comparison.
6. Section payload construction.
7. Existing report deletion.
8. Template copy.
9. Report show.
10. Report rename.
11. Section layout.
12. Section values write.
13. Formatting.
14. Index refresh.

#### Index and Tab Organization

Add timing around:

1. Index data collection.
2. Index payload generation.
3. Index write.
4. Operational sort order calculation.
5. Per-sheet move decisions.
6. Actual sheet moves.
7. Visibility enforcement.
8. Active-sheet restoration.

#### Archive Copy

Add timing inside raw/archive copy paths for:

1. Archive workbook open.
2. Existing archive sheet lookup/delete.
3. Full sheet copy.
4. Rename.
5. Visibility policy.
6. Local raw delete.

### Instrumentation Acceptance Criteria

Instrumentation is acceptable only if:

1. It does not change workflow outputs.
2. It does not change archive/delete safety order.
3. It does not show hidden system/template sheets unexpectedly.
4. It adds less than 5 percent overhead to total workflow runtime, or the overhead is documented.
5. It identifies which substep owns at least 80 percent of each previously slow parent step.

## Phase 2 — Optimization Implementation Order

### Step 1 — Master List Canvas Creation

#### Candidate Changes

1. Avoid `setActiveSheet()` unless a later operation requires activation.
2. Avoid `showSheet()` when the sheet is already visible.
3. Reduce initial formatted row capacity to expected output rows plus a governed buffer instead of full template max rows, if visual output remains correct.
4. Copy data-row formatting only for populated rows plus buffer.
5. Defer final activation until the end of Create Monthly Update.
6. Avoid redundant template hiding if Create Monthly Update already performs final template visibility enforcement.

#### Tests

1. Standalone Create Master List.
2. Create Monthly Update including Create Master List substep.
3. Compare Master List row count, headers, title/date rows, frozen panes, tab color, row heights, CP Due sync, Unlock CP sync, and Index placement.
4. Confirm no output visual regression in populated rows.
5. Confirm no hidden templates are shown.

#### Acceptance Criteria

1. Master List canvas substep improves materially or is proven service-latency-bound.
2. Total Create Monthly Update runtime decreases.
3. Standalone Create Master List remains under benchmark.
4. Output parity is confirmed.

### Step 2 — Demo P Archive Append

#### Candidate Changes

1. Cache PMR index before row loops.
2. Cache source/archive header maps.
3. Write only required column runs if trailing archive columns are blank and schema is preserved.
4. Avoid archive hide operation when the archive sheet is already hidden.
5. Batch archive metadata stamping with archive row values.
6. Keep archive mandatory unless an approved data-retention change is made.

#### Tests

1. Create Monthly Update with changed PMRs that trigger Demo P archive rows.
2. Confirm archived row count equals removed/replaced primary PMR rows.
3. Confirm archive metadata fields are populated.
4. Confirm source Demo P replacement body is unchanged except intended monthly changes.
5. Confirm archive sheet remains governed and hidden/visible according to existing policy.

#### Acceptance Criteria

1. Archive write runtime improves or detailed timing proves external service latency dominates.
2. No archive rows are lost.
3. Demo P update remains reversible from archive evidence.

### Step 3 — Monthly Change Dataset Compilation

#### Candidate Changes

1. Cache header maps for current and previous Raw Data.
2. Cache normalized PMR values.
3. Cache repeated date/string coercions.
4. Build current and previous PMR maps once.
5. Replace avoidable nested scans with PMR-keyed map lookups.
6. Split section comparisons so each section can be timed independently.

#### Tests

1. Monthly Change report only.
2. Full Create Monthly Update.
3. Compare section row counts before and after optimization.
4. Spot-check enrollment, disenrollment, demographics, caseload, contact, banner, and other-change sections.
5. Confirm no duplicates or missing PMRs.

#### Acceptance Criteria

1. Dataset compilation time improves.
2. Section counts match baseline.
3. Report content matches baseline for the same input data.

### Step 4 — Monthly Change Report Sheet Creation

#### Candidate Changes

1. Compare current template-copy path against a naked-canvas report build.
2. If naked canvas is faster, copy only title/header/subheader formatting required by the visible report.
3. Limit formatting to actual report rows and columns.
4. Preserve governed section layout and report appearance.

#### Tests

1. Monthly Change report only.
2. Full Create Monthly Update.
3. Visual compare report title rows, section headers, subheaders, date formats, and column widths.
4. Confirm Index entry and tab placement.

#### Acceptance Criteria

1. Sheet creation time improves without visual/layout regression.
2. Report content and section order match baseline.

### Step 5 — Final Index Refresh and Tab Organization

#### Candidate Changes

1. Skip Index rewrite when sheet signature is unchanged.
2. Skip sheet moves when sheets are already in governed order.
3. Calculate all needed moves before moving tabs.
4. Preserve hidden system/template sheet rule.
5. Defer active-sheet restoration to one final operation.

#### Tests

1. Create Monthly Update.
2. Archive Monthly Import Sheets.
3. Archive Monthly Active Sheets.
4. Hide Monthly Import Sheets.
5. Hide Monthly Active Sheets.
6. Show/Hide Report Templates.
7. Confirm Index order, hidden state, and active tab after each workflow.

#### Acceptance Criteria

1. Fewer sheet moves are performed when order is already correct.
2. Index remains accurate.
3. Hidden system/template sheets are never shown unintentionally.

### Step 6 — Build Demo P Canvas and Contact Compression

#### Candidate Changes

1. Cache contact/header indexes before loops.
2. Cache normalized contact values where repeated.
3. Remove avoidable nested scans.
4. Confirm no repeated full-sheet reads after unified values are written.
5. Split post-flatten formatting, filter creation, Index refresh, and contact compression timing.

#### Tests

1. Build Demo P from current Raw Data.
2. Create Monthly Update after Demo P exists.
3. Compare row counts, PMR grouping, Primary PMR Row, contact flattening, and banner sync.
4. Confirm retained rows and source metadata.

#### Acceptance Criteria

1. Contact compression and/or canvas write improves.
2. Demo P output parity is confirmed.
3. Build Demo P remains under benchmark.

### Step 7 — Disenrolled Exclusion Readiness

#### Candidate Changes

1. Avoid template copy when persistent Disenrolled Exclusion sheet exists and schema is valid.
2. Split readiness into lookup, create/copy, date update, schema/header validation, and positioning.
3. Defer row-height lock and old-row hiding until after values write if still costly.

#### Tests

1. Create Disenrolled List first-run behavior.
2. Create Disenrolled List existing-sheet behavior.
3. Create Monthly Update with disenrolled rows.
4. Confirm newest-first ordering, historical rows, hidden old rows, and Index placement.

#### Acceptance Criteria

1. Existing-sheet readiness is near-zero or materially improved.
2. First-run creation remains correct.
3. Historical exclusion data is preserved.

### Step 8 — Raw/Archive Copy Cost

#### Candidate Changes

1. Add configurable full-sheet vs value-only archive mode only if approved.
2. Test used-range copy for raw archives where formatting is not required.
3. Keep local raw deletion dependent on archive success.
4. Keep archive sheets visible unless archive visibility policy changes.

#### Tests

1. Format Banner Report with archive enabled.
2. Format Monthly Sheets with all imports.
3. Archive Monthly Import Sheets.
4. Archive Monthly Active Sheets.
5. Simulate archive failure and confirm local raw source is not deleted.

#### Acceptance Criteria

1. Archive runtime improves or is documented as external copy latency.
2. No local source is deleted until archive copy succeeds.
3. Archive workbook contains expected sheets and data.

### Step 9 — Dashboard Quality and Diagnostic Workflows

#### Candidate Changes

1. Write only populated diagnostic ranges.
2. Skip section rewrites when payload is unchanged.
3. Split compute time from write time.
4. Keep diagnostic timings separate from production workflow timings.

#### Tests

1. Dashboard Quality Start Up.
2. Dashboard Quality Validate Templates.
3. Dashboard Quality Workflow.
4. Clear Timing & Quality Logs.
5. Confirm Sections A-N remain populated as expected.

#### Acceptance Criteria

1. Diagnostic output remains correct.
2. Section writes are reduced when payloads are unchanged.
3. Production workflows are not affected.

## Full Regression Test Matrix

Run the full matrix before approving a production optimization version:

| Area | Required Test | Pass Criteria |
| --- | --- | --- |
| Templates | Create / Refresh All Templates first build | Completes under benchmark; templates generated; hidden policy preserved |
| Templates | Create / Refresh All Templates smart refresh | Metadata-only path used where expected; no unnecessary full rebuild |
| Monthly formatting | Format Monthly Sheets | Banner, CP Due, Unlock CP, and Raw Data outputs created correctly |
| Individual formatting | Format Banner Report | Output validates; archive safety preserved |
| Individual formatting | Format Care Plan Due Report | Title/date cells, headers, filters, and formatting correct |
| Individual formatting | Format Unlocked Care Plan Report | Title/date cells, headers, filters, and formatting correct |
| Individual formatting | Format Raw Data | In-place output, added columns, filters, visibility, and sync behavior correct |
| Demo P | Build Demo P | PMR grouping, Primary PMR Row, contacts, metadata, and banner sync correct |
| Disenrolled | Create Disenrolled List | Rows moved, retained Demo P rows correct, history preserved |
| Master List | Create Master List | Primary rows copied, CP/Unlock sync correct, visual structure correct |
| Monthly update | Create Monthly Update | Monthly Change, Demo P update, Disenrolled, Master List, Index all complete |
| Archive | Archive Monthly Import Sheets | Archive copy succeeds before local delete/hide behavior |
| Archive | Archive Monthly Active Sheets | Raw Data/Master List archive behavior correct |
| Visibility | Hide/Show Report Templates | All template visibility policies correct |
| Visibility | Hide/Show System Sheets | System/testing sheets hidden/shown only as requested |
| Diagnostics | Dashboard Quality Workflow | Sections H-N correct; no production data changed |
| Layout | Save Active Layout as Rebuild Default | Layout saved intentionally; no accidental sheet visibility changes |

## Performance Acceptance Targets

The optimized production version should target:

1. Create Monthly Update total runtime reduced from bottleneck to slow/pass range, or documented as service-latency-bound.
2. Master List naked canvas substep below 20 seconds, preferably below 10 seconds.
3. Demo P archive append below 15 seconds, preferably below 10 seconds.
4. Monthly Change dataset compilation below 15 seconds, preferably below 10 seconds.
5. Monthly Change template/report creation below 10 seconds.
6. Final Index/tab organization below 10 seconds.
7. No new step over 10 seconds without documented reason.
8. No workflow regression exceeding 5 percent versus baseline unless approved.

## Production Release Steps

1. Create an instrumentation-only candidate from v1.6.74.
2. Run Phase 0 and Phase 1 timing tests.
3. Select one bottleneck for optimization.
4. Implement only that bottleneck change.
5. Run targeted tests for that bottleneck.
6. Run Create Monthly Update after each optimization.
7. Compare timing and output parity against baseline.
8. Repeat for the next bottleneck.
9. After all approved optimizations pass, create a new full production script version.
10. Increment the version number.
11. Update any release notes or audit summary required for the optimization wave.
12. Run the full regression test matrix.
13. Run repository preparation before commit and PR.
14. Commit only the intended production script and related text documentation.
15. Do not include binary reports unless explicitly requested.

## Stop Conditions

Stop optimization and report findings if any of the following occur:

1. Create Monthly Update fails.
2. Archive copy fails or local raw data deletion occurs before archive success.
3. Demo P row count or PMR grouping changes unexpectedly.
4. Master List primary row selection changes unexpectedly.
5. Monthly Change section counts differ from baseline without a verified data reason.
6. Hidden system/template sheets are shown unexpectedly.
7. Any public menu callback or workflow entry point breaks.
8. Any optimization produces a larger runtime regression than the improvement it targets.

## Recommended Next Action

Do not merge a new v1.6.75 production script solely for timing labels. First run an instrumentation-only candidate in the workbook, collect detailed timing, and then implement the optimization steps one at a time in the priority order above. The final production script should be generated only after the full regression matrix passes.
