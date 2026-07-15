# Master List v1.6.42 — Wave 4 Performance Instrumentation

<!-- markdownlint-disable MD013 -->

## Status

Wave 4 instrumentation is implemented in `v.1.6.42_Current_Production_Script`.

## Scope

Wave 4 requires profiling before optimization. This release adds detailed
Framework Timing Report marks for the active monthly Raw Data in-place path.

## Timing Additions

| Area | Timing Added |
| :--- | :--- |
| Raw Data source read | Bulk source row count is recorded. |
| Title-row insertion | Header row detection and title-row insert/skip are recorded. |
| Approved framework columns | Column append/skip and added column count are recorded. |
| Title/header formatting | Formatting start and completion are recorded. |
| Filter operations | Filter removal/skip and filter creation with row/column counts are recorded. |
| Approved-sync columns | Bulk read and guarded write changed-column groups are recorded. |
| Banner-column sync | Bulk read, source-map key count, changed rows, and guarded write groups are recorded. |
| Row-height lock | Start and completion are recorded around final row-height locking. |
| Visibility policy | Start and completion are recorded around output visibility enforcement. |

## Deferred Optimization Rule

No visual-formatting concessions were made in this release. Optimization should
wait until copied-workbook 1k, 5k, and 10k Raw Data timing runs identify measured
hotspots.

## Required Profiling Runs

- Format Raw Data with 1k rows.
- Format Raw Data with 5k rows.
- Format Raw Data with 10k rows.
- Format Monthly Sheets with Raw Data and Banners present.
- Repeat with an existing Raw Data filter and without an existing Raw Data filter.
