# Public API Boundary — v1.6.68

## Purpose

This document publishes the Phase 1 supported public API boundary for the Master List v1.6.68 production script and governs the v1.6.70 testing release built from that baseline.

It is a safety boundary for Wave 5 cleanup. It does not rename, remove, privatize, or wrap functions by itself.

## Source Artifacts

- Production source classified: `Master_List/Current Production Script/v.1.6.68_Current_Production_Script`
- Testing release built from this boundary: `Master_List/Current Production Script/v.1.6.70_Current_Production_Script`
- Inventory: `Master_List/Audit_Summary/EXHAUSTIVE_v1.6.68_Function_Inventory.csv`
- Classification note: `Master_List/Audit_Summary/WAVE_5_PHASE_1_FUNCTION_CLASSIFICATION_v1.6.68.md`

## Boundary Rules

1. Menu callbacks, simple triggers, installable trigger callbacks, manual workflow entry points, and diagnostic entry points remain public until explicitly reclassified.
2. No public function may be renamed without an approved compatibility wrapper.
3. No function may be removed until direct callers, dynamic string references, menu callbacks, triggers, HTML/`google.script.run`, external consumers, and library consumers are checked.
4. Trailing-underscore helpers are private-style, but no-static-path helpers still require dynamic/manual/library review before removal.
5. Phase 2 may propose a small approved batch of wrappers or deprecations, but Phase 1 does not change runtime behavior.

## Supported Public Menu/API Entry Points

These functions are currently supported public entry points because they are menu callbacks or direct user workflows. Keep their names stable.

- `rebuildFormatDashboardDefaults`
- `quickSystemSetup`
- `quickBuildAllTemplates`
- `toggleFrameworkTiming`
- `hideTemplates_`
- `showTemplates_`
- `hideSystemSheets_`
- `showSystemSheets_`
- `saveActiveLayoutToDashboardSettings`
- `clearDiagnosticsAndTimingLogs`
- `createOrRefreshAllReportTemplates`
- `formatMonthlySheets`
- `formatBannerReport`
- `runFrameworkSmokeValidation`
- `hideMonthlyImportSheets`
- `hideMonthlyActiveSheets`
- `archiveMonthlyImportSheets`
- `archiveMonthlyActiveSheets`
- `formatRawData`
- `formatCarePlanDueReport`
- `formatUnlockedCarePlanReport`
- `buildDemoPFromScratch`
- `updateDemoPMonthlySync`
- `buildMonthlyChangeReport`
- `runMonthlyUpdate`
- `createMasterList`
- `createIndexSheet`
- `enforceGlobalSheetSortOrder_`
- `createDisenrolledList`
- `runDashboardQualityStartUp`
- `runDashboardQualityValidateTemplates`
- `runDashboardQualityFull`
- `setupSystemSheets`

## Simple Trigger Entry Points

- `onOpen`

## Diagnostic / Validation Entry Points Requiring Public Decision

These functions should remain callable for testing/diagnostics until the user approves a narrower diagnostics API.

- `validateRawDataPreflightForDemoP_`
- `refreshFrameworkTimingReport`
- `writeFrameworkTimingPerformanceRecommendations`
- `validateReportTemplates`
- `validateReportTemplatesCore_`
- `validateBuiltTemplateMinimumStructure_`
- `validateActiveBannerFormatterOutput`
- `runDashboardQualityMasterListHealthCheck_`
- `validateBannerFormatterOutput_`
- `validateTemplateFromDashboard_`
- `testRawDataFormatFullFastCanvasPath`
- `testRawDataFormatMinimalOutputPath`
- `testRawDataFormatInPlacePath`
- `validateDemoPMonthlySyncReplacementCoverage_`
- `verifyPrimaryPMRColumnFromRawData_`
- `runDashboardQualityDashboardVerificationSections_`
- `runDashboardQualitySectionIfDue_`
- `runDashboardQualityQuick`
- `runDashboardQualityTemplateAndFormatSections_`
- `runDashboardQualityPerformanceSummary_`
- `runDashboardQualityCarePlanSyncDiagnostics_`
- `runFrameworkHealthCheck`
- `runDashboardQualityWorkflowSyncVerification_`
- `verifyFrameworkConfiguration`
- `runFrameworkTimed_`

## Public-Looking Non-Menu Functions Requiring Decision

These functions do not use trailing underscores and are not currently classified as menu callbacks. Treat them as public-looking until external/manual consumers are checked.

- `setupReportFormattingDashboard`
- `formatDashboard`
- `hideReportTemplates`
- `showReportTemplates`
- `archiveActiveRawDataSheet`
- `formatMonthlyChangeSubheaderRow`
- `formatMonthlyChangeSubsectionBlock`
- `getMonthlyChangeSubsectionLabels`
- `processDemoP`
- `formatDemoPStructure`
- `handleSpreadsheetChangeForIndex`
- `assignSortOrderAndHideExtraRows`
- `showAllMasterListRows`
- `hideSystemSheetsNow`
- `showSystemSheetsNow`
- `runAllFrameworkTestsAndBuildDashboard`
- `repairAllTemplateDateFormats`
- `buildCombinedFrameworkTestDashboard`
- `runWorkflowSyncVerification`
- `rebuildProductionMonthlyChangeTemplate`

## Internal No-Static-Path Review Pool

There are `107` private-style functions with no approximate static path in the Phase 1 inventory. These are **not approved for deletion**. They require dynamic/manual/library review before any removal or rename.

See `EXHAUSTIVE_v1.6.68_Function_Inventory.csv` for the full list and recommendations.

## Phase 2 Approval Gate

Before Phase 2 changes production code, approve each target function with:

| Required decision | Required evidence |
|---|---|
| Keep public | Menu/trigger/manual/external use confirmed. |
| Compatibility wrapper | Old name and target implementation documented. |
| Deprecate | User agrees function remains callable for a defined period. |
| Make private / rename | Wrapper added or all consumers migrated. |
| Remove | No direct, dynamic, menu, trigger, HTML, library, or external consumers found. |

## Release Testing Impact

The v1.6.70 testing script must validate every supported public menu/API entry point above before any public-to-private conversion is attempted.
