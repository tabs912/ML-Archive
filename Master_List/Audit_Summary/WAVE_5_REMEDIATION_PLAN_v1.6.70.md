# Wave 5 Remediation Plan — v1.6.70 Testing Release

## Purpose

This plan consolidates Wave 4 closure, Wave 5 public/private API concerns, function-inventory findings, and v1.6.70 testing priorities into a simple step-by-step remediation path.

## Release Candidate

- Testing script: `Master_List/Current Production Script/v.1.6.70_Current_Production_Script`
- Built from: `Master_List/Current Production Script/v.1.6.68_Current_Production_Script`
- Version update only: `MASTER_LIST_MERGE_ML_VERSION = "1.6.70"`
- No public/private renames or removals are included in v1.6.70.

## Step-by-Step Remediation Plan

| Step | Concern | Correction | Verification |
|---:|---|---|---|
| 1 | Public API boundary is undefined. | Publish `PUBLIC_API_BOUNDARY_v1.6.68.md`. | Confirm all menu callbacks and `onOpen` are listed as public/stable. |
| 2 | Broad Apps Script public namespace remains. | Use `EXHAUSTIVE_v1.6.68_Function_Inventory.csv` as the Phase 1 inventory. | Confirm 729 functions, 0 duplicates, menu/simple trigger categories, and public-looking review set. |
| 3 | No-static-path helpers may be dead or dynamic. | Keep them unchanged; classify before removal. | Check static calls, string references, menus, triggers, HTML/`google.script.run`, external/library consumers. |
| 4 | Public-looking non-menu functions may be wrappers or manual APIs. | Classify as supported API, compatibility wrapper, diagnostic/test-only, deprecated retained, internal candidate, or removal candidate. | User approves classification before code changes. |
| 5 | Compatibility risk from renames. | Add wrappers before any approved rename. | Run old and new names in staging; confirm both execute or old name gives approved deprecation path. |
| 6 | Wave 4 critical blockers are closed but slow items remain. | Carry slow items in optimization backlog, not as Wave 4 blockers. | Re-run Framework Timing Report and compare Disenrolled append, Complete gap, Create Monthly Update, and Build Demo P. |
| 7 | v1.6.70 script must be release-tested. | Deploy v1.6.70 to staging workbook only. | Complete static checks, menu tests, workflow tests, dashboard quality, timing, archive, and rollback checks below. |

## v1.6.70 Staging Test List

### A. Static Repository Checks

1. Syntax validation with Node `new Function`.
2. Confirm version constant is `1.6.70`.
3. Confirm no `1.6.69` script/version was introduced.
4. Confirm no duplicate top-level function declarations.
5. Confirm every `onOpen()` menu callback exists as a top-level function.
6. Confirm `Update Master List`, `updateMasterList`, and `copyPreviousMasterListToCurrentMonth_` are absent unless intentionally restored.
7. Confirm public API boundary functions exist in the testing script.

### B. Startup and Menu Tests

1. Open the staging workbook.
2. Confirm `Master List` menu renders.
3. Run `onOpen()` manually if needed.
4. Run `setupSystemSheets`.
5. Run `quickSystemSetup`.
6. Confirm Format Dashboard, Dashboard Quality Report, Framework Timing Report, and Index exist.

### C. Template and Dashboard Quality Tests

1. Run `rebuildFormatDashboardDefaults`.
2. Run `createOrRefreshAllReportTemplates` once for full/staged build.
3. Run `createOrRefreshAllReportTemplates` again for smart refresh behavior.
4. Run `runDashboardQualityStartUp`.
5. Run `runDashboardQualityValidateTemplates`.
6. Run `runDashboardQualityFull`.
7. Confirm no blocking FAIL rows.

### D. Individual Workflow Tests

1. `formatRawData`.
2. `formatBannerReport`.
3. `formatCarePlanDueReport`.
4. `formatUnlockedCarePlanReport`.
5. `formatMonthlySheets`.
6. `buildDemoPFromScratch`.
7. `buildMonthlyChangeReport`.
8. `updateDemoPMonthlySync`.
9. `createDisenrolledList`.
10. `createMasterList`.

For each workflow, verify output sheet name, title dates, headers, row count, tab position, visibility, Index update, and Framework Timing Report rows.

### E. End-to-End Create Monthly Update Test

1. Run `runMonthlyUpdate` for the test month.
2. Confirm Monthly Change report is created.
3. Confirm Demo P monthly sync completes.
4. Confirm Disenrolled Exclusion update completes.
5. Confirm Master List is freshly created.
6. Confirm final Index refresh and active tab organization completes.
7. Confirm no legacy Update Master List timing appears.
8. Confirm detailed `Create Monthly Update - Create Master List - ...` timing appears.

### F. Performance Verification

1. Create Disenrolled List append values write remains non-critical.
2. Create Disenrolled final `Complete` remains near zero/unhidden.
3. Create Master List remains PASS or within accepted range.
4. Create Monthly Update may remain SLOW but should not show CRITICAL legacy copy-forward behavior.
5. Remaining SLOW items match carry-forward optimization backlog.

### G. Public API Boundary Verification

1. Execute every supported public menu/API entry point in staging where safe.
2. Confirm diagnostics/validation entry points are callable.
3. Confirm no public API is renamed or removed in v1.6.70.
4. Confirm any future wrapper/deprecation candidates are deferred to Phase 2.

### H. Archive and Data-Safety Tests

1. Verify archive workbook access.
2. Confirm archive copies are created before local source removal.
3. Confirm Demo P archive rows are written before monthly replacement.
4. Confirm archive visibility and tab naming are correct.

### I. Rollback Check

1. Confirm previous known-good production script remains available.
2. Confirm v1.6.70 can be reverted without dashboard/schema migration.
3. Save timing report and dashboard quality evidence before production rollout.

## Phase 2 Entry Criteria

Phase 2 may begin only after:

1. v1.6.70 passes staging tests.
2. `PUBLIC_API_BOUNDARY_v1.6.68.md` is approved.
3. A small batch of target functions is selected from the inventory.
4. Each target has consumer checks completed.
5. Wrapper/deprecation behavior is approved for any renamed public-looking function.

## Recommendation

Release v1.6.70 to staging for validation. Do not perform public-to-private code changes until the public API boundary is approved and the v1.6.70 testing checklist passes.
