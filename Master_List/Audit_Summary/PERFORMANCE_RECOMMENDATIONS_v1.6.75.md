# Master List v1.6.75 Performance Optimization Recommendations

**Status:** Accepted for implementation planning. All seven v1.6.75 optimization priorities listed in this report are accepted for the next targeted performance optimization wave.

## Purpose

This report records performance optimization recommendations after reviewing:

- `Master_List/Reports/v1.6.75 - Dashboard Quality Report.pdf`
- `Master_List/Reports/Clean-up v1.6.71 - Framework Timing Report..pdf`
- `Master_List/Reports/v1.6.75 - Framework Timing Report.pdf`, visible on `origin/main` during synchronization and used as supplemental timing evidence because the v1.6.75 Dashboard Quality report references the Framework Timing Report for performance issue detail.

The goal is to identify what should be optimized next, what should not be treated as a correctness blocker, and what tests are required before creating another production script version.

## Repository State Note

During review, the active `work` branch contained local commits and was behind `origin/main`. The repository synchronization tool reported the newly uploaded v1.6.75 report files as visible on `origin/main`, but did not merge, rebase, reset, switch branches, or force update the workspace. The v1.6.75 Dashboard Quality and Framework Timing reports were read from `origin/main` for analysis only.

## Executive Summary

The v1.6.75 Dashboard Quality report shows the framework is functionally ready: global inputs, sheet definitions, headers, column definitions, sheet behaviors, template validation, framework health checks, Master List validation, care-plan sync validation, and workflow synchronization checks pass. There are no quality-report failures or critical framework-health defects in the reviewed v1.6.75 Dashboard Quality report.

The performance evidence does not support another broad cleanup pass. It supports a targeted optimization wave focused on the workflows that are now repeatedly slow or bottlenecked:

1. Create Monthly Update.
2. Create Disenrolled List.
3. Format Monthly Sheets / dashboard fast-canvas sheet insertion.
4. Monthly Change dataset compilation.
5. Index refresh and tab organization.
6. Demo P canvas write and contact compression.
7. Dashboard Quality diagnostic write cost.

The highest-priority recommendation is to optimize the Create Monthly Update chain and Create Disenrolled List, not templates or general dashboard configuration. Template creation and metadata refresh are within benchmark in v1.6.75.

## Accepted Optimization Scope

The following recommendations are accepted for the next performance optimization wave:

1. Priority 1 — Create Monthly Update evidence and optimization actions.
2. Priority 2 — Create Disenrolled List.
3. Priority 3 — Format Monthly Sheets and fast-canvas sheet insertion.
4. Priority 4 — Monthly Change dataset compilation.
5. Priority 5 — Index refresh and tab organization, with the governed sheet order policy below.
6. Priority 6 — Build Demo P.
7. Priority 7 — Dashboard Quality Workflow.

The accepted direction is to place each sheet into its governed final order when it is created. If sheets are inserted in the correct position up front, system sheets and templates should not need repeated global resorting during later workflow cleanup.

## Quality Report Findings

### Functional Readiness

The v1.6.75 Dashboard Quality report indicates:

- Format Dashboard Section B global/title inputs pass.
- Section C sheet definitions pass.
- Section F sheet headers pass with no missing, blank, duplicate, or invalid headers.
- Section D column definitions pass with no missing, blank, duplicate, or invalid definitions.
- Section E sheet behavior rows pass.
- All governed templates pass structure validation.
- Helper, menu, dashboard, template, validation, timing, and smoke-harness checks pass.
- Master List Primary Rows validation passes.
- Care Plan sync dependencies pass.
- Primary PMR assignment and source map integrity pass.
- Overall framework status is `READY`.

### Quality Conclusion

Do not delay performance work for a structural quality remediation wave. The quality evidence supports performance optimization as the next workstream.

## Timing Trend: v1.6.71 to v1.6.75

| Workflow / Step | v1.6.71 Evidence | v1.6.75 Evidence | Trend | Recommendation |
| --- | ---: | ---: | --- | --- |
| Create / Refresh All Templates first build | 149.402 sec, PASS | 84.12 sec, PASS | Improved | No priority optimization |
| Dashboard Quality Validate Templates | 21.175 sec, PASS | 16.211 sec, PASS | Improved | No priority optimization |
| Format Monthly Sheets 04.26 | 125.836 sec, SLOW | 108.817 sec, SLOW | Improved but still slow | Optimize archive open and fast-canvas insertion |
| Format Monthly Sheets 05.26 | Not in v1.6.71 report | 105.159 sec, SLOW | New evidence | Same as above |
| Build Demo P initialization | 41.996 sec, PASS | 36.682 sec, PASS | Improved | Watch-list only |
| Create Disenrolled List | 38.88 sec, SLOW | 98.972 sec, BOTTLENECK | Regressed | Priority optimization |
| Create Master List | 22.242 sec, PASS | 27.795 sec, PASS | Slightly slower but passing | Not primary standalone target |
| Create Monthly Update | 170.387 sec, BOTTLENECK | 231.36 sec, BOTTLENECK | Regressed | Highest priority |
| Dashboard Quality Workflow | 46.387 sec, SLOW | 35.421 sec, SLOW | Improved but still slow | Secondary diagnostic optimization |
| Save Active Layout as Rebuild Default | 33.598 sec, BOTTLENECK | 4.978 sec, PASS | Resolved | No action unless recurrence |

## Priority 1 — Create Monthly Update

### Evidence

The v1.6.75 Create Monthly Update run reached 231.36 seconds and bottleneck status. The most important slow/bottleneck substeps were:

- `Monthly Change datasets compiled in-memory`: 31.346 seconds, bottleneck.
- `Create Monthly Update - Update Demo P - Archive detail - sheet readiness - template copied for archive sheet`: 10.734 seconds, slow.
- `Disenrolled move - exclusion append - append payload values written`: 27.182 seconds for 8 rows, slow.
- `Create Monthly Update - Create Master List - Canvas detail - dashboard configuration loaded`: 41.99 seconds, bottleneck.
- `Create Monthly Update - Create Master List - Canvas detail - sheet visibility enforced visible`: 16.259 seconds, slow.
- `Create Monthly Update - Index refreshed and active tabs organized without showing hidden system/template sheets`: 12.201 seconds, slow.

### Recommendation

Optimize Create Monthly Update as a chain, but do not rewrite the chain. Keep the current Monthly Change → Demo P update → Disenrolled update → Master List → final Index organization sequence and address the slow substeps one at a time.

### Specific Actions

1. **Monthly Change dataset compilation**
   - Cache current and previous header maps once.
   - Cache normalized PMR values once per source row.
   - Cache repeated date and string coercions.
   - Build PMR-indexed current and previous maps once.
   - Split timing by section: enrollment, disenrollment, demographic, caseload, contact, banner, other.

2. **Demo P archive sheet readiness**
   - Avoid copying the Demo P template if the archive sheet already exists and its schema is valid.
   - Validate archive headers and title rows without rebuilding the archive sheet.
   - Keep archive-before-replacement mandatory.

3. **Disenrolled append during monthly update**
   - Investigate why an 8-row append took 27.182 seconds after earlier optimizations skipped blank columns.
   - Check whether row insertion at the top, hidden-row state, filters, protected ranges, or sheet size is dominating.
   - Test append-to-bottom plus governed sort/visibility as an alternative to top insertion.

4. **Master List canvas creation inside monthly update**
   - Re-test the timing label because `dashboard configuration loaded` should not normally own 41.99 seconds by itself.
   - Split the label into spreadsheet lookup, dashboard range read, config parse, sheet definition lookup, header resolution, and cache clear.
   - Cache dashboard configuration for the duration of Create Monthly Update.
   - Avoid `showSheet()` when newly inserted sheets are already visible.
   - Avoid `setActiveSheet()` until final user-facing activation if not required for writes.

5. **Final Index refresh and tab organization**
   - Skip Index rewrite when sheet signature is unchanged.
   - Skip sheet moves when sheets are already in governed order.
   - Preserve the hidden system/template sheet rule.

### Acceptance Criteria

- Create Monthly Update total runtime falls below the current bottleneck range or each remaining bottleneck is proven external-service-latency-bound.
- Monthly Change report content, Demo P replacement rows, Disenrolled Exclusion rows, Master List rows, and Index ordering match baseline.
- No hidden template/system sheets are shown unexpectedly.

## Priority 2 — Create Disenrolled List

### Evidence

The v1.6.75 standalone Create Disenrolled List run reached 98.972 seconds and bottleneck status. The major slow/bottleneck substeps were:

- `Disenrolled move - exclusion sheet ready`: 12.983 seconds, slow.
- `Disenrolled move - exclusion append - append payload values written`: 40.947 seconds for 719 rows, bottleneck.
- `Index refreshed after Create Disenrolled List`: 30.368 seconds, bottleneck.

This is a regression relative to the v1.6.71 report where standalone Create Disenrolled List ran in 38.88 seconds and only sheet readiness appeared as a slow issue.

### Recommendation

Treat Create Disenrolled List as the second-highest priority because it now has two bottlenecks and is also part of Create Monthly Update.

### Specific Actions

1. Split the append write into row insertion, filter state, value write, format copy, row height lock, hidden-row handling, and cache clear.
2. Test whether top insertion is the main cause by comparing:
   - insert rows at row 5 plus write,
   - append rows at bottom plus sort newest-first,
   - append rows to a staging block plus batch move/sort.
3. Confirm the values write is restricted to populated column runs and does not write blank trailing schema columns.
4. Defer Index refresh until the end of multi-step workflows when called from Create Monthly Update.
5. For standalone Create Disenrolled List, test whether Index refresh can skip rewrite/moves when the sheet signature is unchanged.

### Acceptance Criteria

- 719-row append write returns to single-digit or low-teens runtime, or the remaining service latency is documented.
- Index refresh after Create Disenrolled List no longer exceeds 30 seconds for unchanged sheet order.
- Historical Disenrolled Exclusion data remains intact and newest-first behavior is preserved.

## Priority 3 — Format Monthly Sheets and Fast Canvas Sheet Insertion

### Evidence

The v1.6.75 timing report shows both tested monthly formatting runs remain slow:

- Format Monthly Sheets 04.26: 108.817 seconds, slow.
- Format Monthly Sheets 05.26: 105.159 seconds, slow.

Recurring slow substeps were:

- Raw archive workbook open for Banners: 14.226 seconds for 04.26 and 12.072 seconds for 05.26.
- CP Due blank fast-canvas sheet insertion: 12.698 seconds for 04.26 and 14.458 seconds for 05.26.
- Unlock CP blank fast-canvas sheet insertion: 12.733 seconds for 04.26 and 16.106 seconds for 05.26.

### Recommendation

Do not replace fast canvas wholesale. Instead, reduce service calls around sheet creation and archive workbook access.

### Specific Actions

1. Open the archive workbook once per monthly batch and pass the handle through archive operations.
2. Avoid opening the same external archive spreadsheet separately for each archived source.
3. Confirm whether blank sheet insertion already creates the sheet in the intended final position.
4. Avoid `showSheet()` and `setActiveSheet()` during intermediate sheet creation unless required.
5. Defer nonessential tab positioning and visibility enforcement until all monthly outputs are created.

### Acceptance Criteria

- Each monthly fast-canvas insertion step drops below 10 seconds or is documented as Google Sheets service latency.
- Archive workbook open happens once per batch where safe.
- Output sheet order, visibility, filters, frozen rows/columns, and formatting remain correct.

## Priority 4 — Monthly Change Dataset Compilation

### Evidence

Monthly Change dataset compilation appears in two places in v1.6.75:

- Create Monthly Update: 31.346 seconds, bottleneck, with 5,977 current rows, 5,931 previous rows, 1,079 current PMRs, and 1,060 previous PMRs.
- Standalone Build Monthly Change Report: 16.664 seconds, slow, with 5,983 current rows, 5,977 previous rows, 1,085 current PMRs, and 1,079 previous PMRs.

The same class of work was already slow in v1.6.71 at 24.317 seconds in Create Monthly Update.

### Recommendation

Optimize the comparison algorithm before optimizing report drawing. The dataset compilation bottleneck is larger than the v1.6.75 template-copy cost.

### Specific Actions

1. Profile current and previous full-sheet reads separately.
2. Build header maps once per dataset.
3. Build PMR maps once per dataset.
4. Normalize PMR/date/string values once per row and reuse them across sections.
5. Replace repeated section scans with one pass that assigns each PMR to change buckets.
6. Preserve section output order and row semantics.

### Acceptance Criteria

- Create Monthly Update dataset compilation drops below 20 seconds initially, with a target below 15 seconds.
- Standalone Monthly Change dataset compilation drops below 10 seconds if possible.
- Section counts and PMR membership match baseline.

## Priority 5 — Index Refresh and Tab Organization

### Evidence

Index refresh and tab organization remained slow in both reviewed timing reports:

- v1.6.71 Create Monthly Update final organization: 12.021 seconds with 9 moves.
- v1.6.75 Create Monthly Update final organization: 12.201 seconds with 8 moves.
- v1.6.75 Create Disenrolled List Index refresh: 30.368 seconds, bottleneck.

### Recommendation

Add a sheet-order and Index signature so refresh and move operations can be skipped when no meaningful state changed. The stronger accepted implementation direction is to insert new sheets directly into their governed final positions at creation time. Correct initial placement should eliminate most follow-up resorting of active sheets, system sheets, and templates.

### Governed Sheet Order

Use this target order when creating or organizing sheets:

| Order | Sheet |
| ---: | --- |
| 1 | `Index` |
| 2 | `Demo P` |
| 3 | `Master List mm.yy` |
| 4 | `Monthly Change mm.yy` |
| 5 | `Disenrolled Exclusion` |
| 6 | `Raw Data mm.yy` |
| 7 | `Banners mm.yy` |
| 8 | `CP Due mm.yy` |
| 9 | `Unlock CP mm.yy` |
| 10 | `B` |
| 11 | `CD` |
| 12 | `UC` |
| 13 | `RD` |
| 14 | `Archive - Demo P` |
| 15 | `Framework Timing Report` |
| 16 | `Dashboard Quality Report` |
| 17 | `Format Dashboard` |
| 18 | `Template - Banner Report` |
| 19 | `Template - Care Plan Due` |
| 20 | `Template - Unlocked Care Plan` |
| 21 | `Template - Raw Data` |
| 22 | `Template - Demo P` |
| 23 | `Template - Disenrolled Exclusion` |
| 24 | `Template - Master List` |
| 25 | `Template - Monthly Change` |
| 26 | `RFF_BASE_TEMPLATE` |

Positions 15 through 26 are the protected final tail block. No operational output sheet, unlisted template, imported sheet, archive helper, or miscellaneous user sheet should be placed after `Framework Timing Report`. If a sheet is not listed in the governed order above, it should be inserted before `Framework Timing Report`, leaving only the listed system/dashboard/template/base-template sheets in the protected tail block.

### Specific Actions

1. Update sheet creation helpers so new governed sheets are inserted at the target final position immediately.
2. Compute an Index signature from sheet names, visibility, sheet type, month label, and target order.
3. Skip Index payload write when the signature matches the last written signature.
4. Precompute desired sheet order and skip already-correct moves.
5. Use targeted placement for newly created monthly outputs, import sheets, archive/helper sheets, system sheets, dashboard sheets, and templates instead of broad global resorting.
6. Batch or defer any remaining required moves until the end of chained workflows.
7. Maintain the rule that hidden system/template sheets are not shown during organization.

### Acceptance Criteria

- New sheets are created in the governed final order shown above.
- No active/operational, unlisted template, imported, archive helper, miscellaneous, or user-created sheet is placed after `Framework Timing Report`.
- Create Monthly Update final organization remains below 10 seconds.
- Standalone Create Disenrolled Index refresh no longer reaches bottleneck range.
- Index content remains accurate.
- Positions 15 through 26 remain the final protected block and do not require repeated resorting after they have been placed correctly.

## Priority 6 — Build Demo P

### Evidence

Build Demo P improved from 41.996 seconds in v1.6.71 to 36.682 seconds in v1.6.75 and remains under the 60-second benchmark. The recurring slow substeps are:

- Demo P unified values flushed to spreadsheet canvas: 11.264 seconds.
- Demo P in-memory flat-record contact compression complete: 12.965 seconds for 1,060 retained rows.

### Recommendation

Keep Build Demo P on the watch list but do not prioritize it above Create Monthly Update or Create Disenrolled List.

### Specific Actions

1. Cache contact/header indexes before compression loops.
2. Cache normalized contact keys and repeated metadata values.
3. Verify no repeated full-sheet reads happen after the unified values write.
4. Separate post-flatten formatting from contact compression timing.

### Acceptance Criteria

- Build Demo P stays below 60 seconds.
- PMR grouping, Primary PMR Row, contact flattening, metadata, and banner sync remain unchanged.

## Priority 7 — Dashboard Quality Workflow

### Evidence

Dashboard Quality Workflow improved from 46.387 seconds in v1.6.71 to 35.421 seconds in v1.6.75 but remains slow. In v1.6.75, `Dashboard Quality Sections H-N batch updated` took 23.742 seconds.

### Recommendation

Treat Dashboard Quality as a secondary diagnostic optimization. It is not blocking production data workflows because the quality report is functionally passing.

### Specific Actions

1. Write only populated H-N ranges.
2. Skip Section H-N rewrite when payload is unchanged.
3. Split compute time from write time.
4. Keep diagnostic write timing separate from production workflow timing.

### Acceptance Criteria

- Dashboard Quality Workflow falls below the 30-second benchmark.
- Sections H-N remain complete and accurate.

## Items Not Recommended for Immediate Optimization

1. **Create / Refresh All Templates** — improved to 84.12 seconds first build and 17.778 seconds metadata-only in v1.6.75, both passing.
2. **Dashboard Quality Validate Templates** — passes at 16.211 seconds.
3. **Standalone Create Master List** — passes at 27.795 seconds.
4. **Save Active Layout as Rebuild Default** — improved from 33.598 seconds bottleneck in v1.6.71 to 4.978 seconds pass in v1.6.75.
5. **Format Raw Data** — passes at 29.581 seconds.

## Required Tests Before Production Optimization Release

Run these tests after each targeted optimization and again before release:

1. Create / Refresh All Templates first build.
2. Create / Refresh All Templates metadata-only refresh.
3. Format Monthly Sheets for 04.26 and 05.26 data sets.
4. Format Banner Report.
5. Format Care Plan Due Report.
6. Format Unlocked Care Plan Report.
7. Format Raw Data.
8. Build Demo P.
9. Build Monthly Change Report standalone.
10. Update Demo P Monthly Change Sync standalone.
11. Create Disenrolled List standalone.
12. Create Master List standalone.
13. Create Monthly Update end to end.
14. Archive Monthly Import Sheets.
15. Archive Monthly Active Sheets.
16. Hide Monthly Import Sheets.
17. Hide Monthly Active Sheets.
18. Dashboard Quality Workflow.
19. Save Active Layout as Rebuild Default.
20. Run Dashboard Quality report and confirm overall status remains `READY`.

For each test, capture total runtime, slow steps, bottleneck steps, row counts, PMR counts, archive rows, columns written, sheet moves, and final sheet visibility.

## Recommended Optimization Sequence

1. Add or refine instrumentation only where the current labels are misleading or too broad.
2. Optimize Monthly Change dataset compilation.
3. Optimize Disenrolled Exclusion append writes and Index refresh.
4. Optimize Create Monthly Update Master List canvas creation and dashboard-config caching.
5. Optimize sheet creation placement so sheets are inserted directly into governed order, then add Index/tab organization signatures and skip logic.
6. Optimize monthly archive workbook reuse and fast-canvas sheet insertion.
7. Optimize Dashboard Quality H-N diagnostic writes.
8. Revisit Build Demo P contact compression only after higher-priority bottlenecks are resolved.

## Release Recommendation

Do not merge another broad production script solely for timing labels. The quality report indicates the framework is ready, while the timing reports identify specific bottlenecks. The next production version should be a targeted optimization release that changes only the functions needed for the prioritized bottlenecks above, with before/after timing evidence attached.
