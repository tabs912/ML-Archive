# Master List v1.6.76 Full Test Run Review

## Purpose

This review summarizes the latest v1.6.76 full test run evidence from:

- `Master_List/Reports/v1.6.76 - Framework Timing Report.pdf`
- `Master_List/Reports/v1.6.76 - Dashboard Quality Report.pdf`
- `Master_List/Reports/v1.6.76 - Updated Format Dashboard.pdf`

The v1.6.76 report files were visible on `origin/main` during synchronization. They were reviewed as test evidence without merging or rebasing the local `work` branch.

## Executive Summary

The v1.6.76 build is structurally healthy but not performance-cleared.

Dashboard configuration, sheet definitions, sheet headers, column definitions, sheet behaviors, template structure, framework health checks, Master List validation, care-plan sync validation, and workflow synchronization checks pass. However, the Dashboard Quality summary reports `ACTION REQUIRED` because the performance summary fails on a critical Build Monthly Change Report timing.

The highest-priority fixes after this run are:

1. Monthly Change dataset compilation.
2. Create Disenrolled List append write and Index refresh.
3. Format Monthly Sheets fast-canvas insertion, especially CP Due.
4. Hide Monthly Import Sheets final step.
5. Dashboard Quality H-N write cost.

## Dashboard Quality Findings

### Passing Areas

The Dashboard Quality report shows the following areas passing:

- Global inputs.
- Sheet definitions.
- Sheet headers.
- Column definitions.
- Sheet behavior rows.
- Template structure and validation.
- Framework health checks.
- Menu function availability.
- Runtime smoke harness checks.
- Master List primary row validation.
- Care Plan sync dependency validation.
- Workflow and synchronization verification.

### Failing Area

The Dashboard Quality report status is `ACTION REQUIRED` because Section I / Performance Summary reports a critical Build Monthly Change Report result.

The quality report lists:

- `Build Monthly Change Report`: `168.607` seconds, `CRITICAL`.
- `Create Disenrolled List`: `117.627` seconds, `BOTTLENECK`.
- `Format Monthly Sheets 04.26`: `87.732` seconds, `SLOW`.
- `Format Monthly Sheets 06.26`: `152.922` seconds, `BOTTLENECK`.

### Quality Conclusion

Do not treat v1.6.76 as release-cleared. Functional checks pass, but performance signoff fails.

## Framework Timing Findings

### Improved / Passing Workflows

The timing report shows several workflows are now acceptable or improved:

| Workflow | Runtime | Status | Review Note |
| --- | ---: | --- | --- |
| Create / Refresh All Templates, first build | 41.875 sec | PASS | Strong improvement; no immediate template-build optimization required. |
| Create / Refresh All Templates, metadata-only | 15.85 sec | PASS | Smart/metadata refresh is performing well. |
| Dashboard Quality Validate Templates | 17.767 sec | PASS | Template validation is within benchmark. |
| Format Banner Report | 22.995 sec | PASS | Acceptable. |
| Format Care Plan Due Report | 26.389 sec | PASS | Acceptable. |
| Format Unlocked Care Plan Report | 27.165 sec | PASS | Acceptable. |
| Format Raw Data | 20.364 sec | PASS | Acceptable. |
| Build Demo P | 23.634 sec | PASS | Improved and no longer a priority blocker. |
| Create Master List | 18.93–24.971 sec | PASS | Acceptable. |
| Archive Monthly Import / Active Sheets | 12.897–24.369 sec | PASS | Acceptable in this run. |
| Dashboard Quality Workflow | 27.328 sec | PASS | Improved but still has a slow H-N write substep. |
| Save Active Layout as Rebuild Default | 4.558 sec | PASS | Resolved. |

### Blocking / Slow Workflows

| Workflow / Step | Runtime | Status | Recommendation |
| --- | ---: | --- | --- |
| Build Monthly Change Report | 127.37 sec in Framework Timing; 168.607 sec in Dashboard Quality summary | CRITICAL | Optimize dataset compilation first. |
| Monthly Change datasets compiled in-memory | 82.819 sec | CRITICAL | Primary blocker. |
| Monthly Change index refreshed | 15.949 sec | SLOW | Add Index signature/skip logic. |
| Create Disenrolled List | 74.129 sec and later 43.498 sec | BOTTLENECK/SLOW | Still not stable. |
| Disenrolled append write, 719 rows | 26.187 sec | SLOW | Optimize top insertion/write path. |
| Disenrolled append write, 10 rows | 24.537 sec | SLOW | Indicates overhead is not proportional to row count. |
| Index refreshed after Create Disenrolled List | 30.112 sec | BOTTLENECK | Add signature/skip logic and defer in chained workflows. |
| Format Monthly Sheets 06.26 | 152.922 sec | BOTTLENECK | Investigate CP Due fast-canvas insertion. |
| CP Due fast-canvas insertion, 06.26 | 40.562 sec | BOTTLENECK | Sheet insertion/visibility/positioning remains service-costly. |
| Unlock CP fast-canvas insertion, 06.26 | 16.232 sec | SLOW | Same class as CP Due, less severe. |
| Hide Monthly Import Sheets 06.26 | 43.556 sec | BOTTLENECK | Needs granular timing; current final `Complete` label is too broad. |
| Dashboard Quality Sections H-N batch updated | 17.283 sec | SLOW | Optimize diagnostic write range or skip unchanged payload. |

## Updated Format Dashboard Findings

The updated Format Dashboard is internally consistent with v1.6.76:

- Template Version is `1.6.76`.
- Header row is `4` and data start row is `5`.
- Freeze rows is `4` and freeze columns is `2`.
- Default date format is `mm/dd/yyyy`.
- Default text format is `@`.
- Default data wrap is `OVERFLOW`.
- Sheet definitions include governed templates and row counts for Banner, CP Due, Unlock CP, Raw Data, Demo P, Disenrolled Exclusion, Master List, and Monthly Change.
- The sheet definition row counts remain large for Raw Data (`6500`), Demo P (`2500`), Disenrolled Exclusion (`1000`), and Monthly Change (`1000`). Those row counts are acceptable as governing capacities but should not force full-format work when generated output uses fewer rows.

## Recommendations

### Priority 1 — Monthly Change Dataset Compilation

The critical blocker is Monthly Change dataset compilation. The slow step is data comparison, not report template copy.

Recommended implementation:

1. Split timing into current read, previous read, header-map build, PMR map build, section comparison, and payload build.
2. Build normalized row metadata once per source row.
3. Cache PMR, DOB, capitation date, disenrollment effective date, and repeated comparison values.
4. Replace repeated per-section scans with one pass that assigns each PMR to change buckets.
5. Preserve section membership and output order exactly.

Acceptance target:

- Bring Monthly Change dataset compilation below 20 seconds first, then target below 15 seconds.

### Priority 2 — Disenrolled Append and Index Refresh

The 10-row append taking 24.537 seconds indicates the bottleneck is likely row insertion, hidden rows, filter/protection state, formatting, or sheet structure rather than payload size.

Recommended implementation:

1. Add timing around row insertion, value write, format copy, row-height lock, old-row hiding, and cache clear.
2. Test append-to-bottom plus governed sort/visibility against insert-at-row-5.
3. Avoid Index refresh inside chained workflows; defer to final workflow organization.
4. Add Index signature skip logic so standalone Create Disenrolled List does not rewrite/move unchanged Index state.

Acceptance target:

- Keep Disenrolled append write below 10 seconds for small deltas and below 20 seconds for 700+ row runs.
- Keep Create Disenrolled List Index refresh below 10 seconds when sheet order is unchanged.

### Priority 3 — Format Monthly Sheets Fast Canvas

CP Due 06.26 blank sheet insertion reached 40.562 seconds. This remains a major bottleneck even after governed insertion labels.

Recommended implementation:

1. Split fast-canvas insertion timing into insert sheet, visibility check, grid resize, formats, values, header/title copy, filter, freeze, tab color, and cache clear.
2. Confirm newly inserted sheets are visible by default and avoid `showSheet()` when not needed.
3. Avoid activation until the end of the workflow.
4. Confirm CP Due and Unlock CP are created at final order and not moved again.
5. Test whether a lightweight blank canvas template is faster than `insertSheet()` for CP Due/Unlock CP.

Acceptance target:

- Keep each CP Due / Unlock CP fast-canvas insertion below 10 seconds unless proven Google Sheets service-latency-bound.

### Priority 4 — Hide Monthly Import Sheets

`Hide Monthly Import Sheets 06.26` reached 43.556 seconds with the slow cost attributed only to `Complete`, which is too broad.

Recommended implementation:

1. Split timing by candidate lookup, matching, per-sheet hide, visibility check, Index refresh, and final notification.
2. Skip hide calls for sheets already hidden.
3. Avoid Index refresh or global sort unless visibility state actually changed.

Acceptance target:

- Hide Monthly Import Sheets should return to single-digit or low-teens runtime.

### Priority 5 — Dashboard Quality H-N Writes

Dashboard Quality Workflow passes overall but still has a 17.283-second H-N batch update.

Recommended implementation:

1. Split H-N calculation from H-N write timing.
2. Write only populated rows and columns.
3. Skip write when generated payload signature is unchanged.

Acceptance target:

- Keep Dashboard Quality Workflow below 30 seconds and reduce H-N write below 10 seconds.

## Release Recommendation

v1.6.76 should be treated as functionally healthy but performance-blocked. Do not promote it as performance-cleared until:

1. Build Monthly Change Report no longer reports CRITICAL.
2. Dashboard Quality Section M returns to `READY`.
3. Create Disenrolled List no longer reports bottleneck-level Index refresh.
4. Format Monthly Sheets 06.26 no longer has a 40+ second CP Due insertion.
5. Hide Monthly Import Sheets has granular timing and no broad 43-second `Complete` step.

The next code build should target Monthly Change compilation, Disenrolled append/index refresh, and fast-canvas insertion timing before adding any new broad framework features.
