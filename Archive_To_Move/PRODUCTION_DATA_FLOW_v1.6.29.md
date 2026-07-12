# Production Data Flow — Master List v1.6.29

Source: `Master_List/Current Production Script/v.1.6.29_Current_Production_Script`.

Scope: traces every production dataset through both processing and formatting flow. The production processing chain is `Source → Demo P → Synchronization → Master List → Monthly Change → Disenrollment → Dashboard Quality`. The production formatting chain is `Format Dashboard → Template → Worksheet Builder → Formatter → Final Report`.

## Processing Flow Overview

```text
Source imports / monthly source tabs
↓
Raw Data + Banners + CP Due Date + Unlock CP formatted source reports
↓
Demo P build/update dataset
↓
Synchronization into Master List and supporting reports
↓
Master List production report
↓
Monthly Change report
↓
Disenrollment / Disenrolled Exclusion dataset
↓
Dashboard Quality / Framework Timing validation surfaces
```

## Formatting Flow Overview

```text
Format Dashboard
↓
Report template definitions and RFF_BASE_TEMPLATE foundation
↓
Worksheet builder / template copy / output sheet creation
↓
Dashboard-governed formatter and workflow-specific formatter
↓
Final report worksheet
```

## Production Processing Data Flow Matrix

| Production Dataset | Source | Processing Step | Implementation / Builder | Owner | Consumer | Validation | Timing | Dependencies |
|---|---|---|---|---|---|---|---|---|
| Monthly import source tabs | User/imported monthly source worksheets (`B`, `CD`, `UC`, `RD` style tabs) | Source acquisition and route selection | `formatMonthlySheets`; route handlers for Banners, CP Due, Unlock CP, Raw Data | Format Monthly Sheets workflow | Monthly formatted reports and Raw Data processing | Source presence checks; active sheet/date prompt validation; route skip logging for missing tabs | `runFrameworkTimed_("Format Monthly Sheets ...")` | Prompt month parts; source tab naming; Format Dashboard definitions; raw monthly source worksheets |
| Banner source / Banner Report | Monthly Banner import source | Source formatting and banner report output | `formatMonthlyBannerSheet_`; `formatBannerReport`; `copyRawBannerDataToOutput_`; `writeBannerReportDates_` | Banner Report workflow | `Banners mm.yy`; Raw Data banner sync; Dashboard Quality smoke checks | `validateBannerFormatterOutput_`; `validateActiveBannerFormatterOutput`; expected Banner headers | Runtime timing / framework timing depending entry point | Template - Banner Report; Section C Banners; Section F Banners headers; Banner source sheet |
| Care Plan Due source / CP Due Date report | Monthly CP Due source tab | Dashboard source mapping and report output | `formatMonthlyDashboardSheetFromSource_`; `formatCarePlanDueReport`; `formatCarePlanDueOrUnlockedFromDashboard_` | Care Plan Due workflow | `CP Due mm.yy`; Master List care plan sync diagnostics | Dashboard template validation; care-plan sync dependency diagnostics | `runFrameworkTimed_` for report formatter; monthly formatting timing | Template - Care Plan Due; Section C CP Due Date; CP Due headers; source date range fields |
| Unlock CP source / Unlocked Care Plan report | Monthly Unlock CP source tab | Dashboard source mapping and report output | `formatMonthlyDashboardSheetFromSource_`; `formatUnlockedCarePlanReport`; `formatCarePlanDueOrUnlockedFromDashboard_` | Unlocked Care Plan workflow | `Unlock CP mm.yy`; Master List care plan sync diagnostics | Dashboard template validation; care-plan sync dependency diagnostics | `runFrameworkTimed_` for report formatter; monthly formatting timing | Template - Unlocked Care Plan; Section C Unlock CP; Unlock CP headers; source date range fields |
| Raw Data formatted report | Monthly Raw Data source tab | Raw Data canvas creation, approved sync columns, banner-column sync | `formatMonthlyRawDataSheetFromSource_`; `formatRawData`; `processRawDataApprovedSyncColumns_`; `syncRawDataBannerColumns_` | Raw Data workflow | Demo P; Monthly Change comparisons; Master List; Disenrollment | `validateRawDataPreflightForDemoP_`; `verifyPrimaryPMRColumnFromRawData_`; header/date validation | Runtime timing for `formatRawData`; framework timing for monthly formatting route | Template - Raw Data; Raw Data Section F headers; Banners output; Primary PMR Row; prompt month |
| Demo P | Raw Data formatted report | Participant/contact flattening, primary-row assignment, metadata population, update/build workflows | `buildDemoPFromScratch`; `updateDemoPMonthlySync`; `processDemoP`; `processDemoPAsWorkingSource_`; `createActiveDemoPFromRawData_`; `updateExistingDemoPFromRawData_` | Demo P production workflow | Master List create/update; Monthly Change comparisons; Disenrollment active-PMR checks | `validateRawDataPreflightForDemoP_`; `verifyPrimaryPMRColumnFromRawData_`; Framework Health required function checks | Runtime timing via `startRuntimeTiming_`, `markRuntimeStep_`, `writeRuntimeTimingReport_` | Template - Demo P; Raw Data; PMR/DOB headers; contact headers; month parts; Format Dashboard column definitions |
| Synchronization dataset | Demo P + formatted monthly source reports | Sync changed PMRs and report-specific columns into active production datasets | `syncMasterListMonthlySourcesIntoData_`; `syncBannerSourceIntoData_`; care-plan sync functions checked by diagnostics; `copyChangedPMRsFromDemoPToMasterList_` | Synchronization workflow | Master List; Dashboard Quality Care Plan Sync Diagnostics | `runDashboardQualityCarePlanSyncDiagnostics_`; header checks; function existence checks | Dashboard Quality timing plus runtime timing in workflows | Demo P; Raw Data; Banners; CP Due; Unlock CP; Master List headers; PMR keys |
| Master List | Demo P primary rows + synchronization data | Master List create/update, row grouping, copy, sort, display, row-height locks | `createMasterList`; `processMasterListFull_`; `processMasterListDataOnly_`; `processMasterListSingleDataPass_`; `copyPrimaryDemoPRowsToMasterListByHeader_`; `sortMasterListByParticipantNameAndPMR_` | Master List production workflow | Monthly Change; Index; Dashboard Quality Master List Health | `runDashboardQualityMasterListHealthCheck_`; header validation; PMR/DOB key validation | Runtime timing for create/update workflow; Framework Timing summary | Template - Master List; Demo P; Raw Data; synchronized Banners/Care Plan data; Format Dashboard columns |
| Monthly Change | Current and prior Raw Data / Demo P / Master List datasets | Change detection, changed-column reporting, section grouping, report generation | `buildMonthlyChangeReport`; `buildMonthlyChangeReportForMonth_`; `getOrBuildMonthlyChangeReport_`; `buildMonthlyChangeSectionRows_`; comparison helpers | Monthly Change production workflow | Master List update workflow; Disenrollment; Dashboard Quality summary | Header/key validation; `valuesAreEqual_`; `isSameDate_`; Dashboard template validation | Runtime timing for monthly change workflow; Framework Timing summary | Template - Monthly Change; current/prior month sheets; Raw Data; Demo P; Master List; PMR/DOB/date keys |
| Disenrollment / Disenrolled Exclusion | Raw Data disenrollment state + Demo P active PMRs + Monthly Change removals | Build and maintain Disenrolled Exclusion, move/delete disenrolled PMR blocks, remove from Master List | `createDisenrolledList`; `splitRawDataRowsIntoActiveAndDisenrolled_`; `moveDisenrolledPMRsFromDemoPToExclusion_`; `appendDisenrolledDeltasToExclusionSheet_`; `removeDisenrolledPMRBlocksFromMasterUsingDemoP_` | Disenrollment workflow | Disenrolled Exclusion sheet; Demo P cleanup; Master List cleanup; Dashboard Quality | PMR set validation; header validation; row deletion safeguards; framework smoke check for delete/buffer behavior | Runtime timing in disenrollment workflow; Framework Timing summary | Template - Disenrolled Exclusion; Raw Data; Demo P; Monthly Change; Master List; PMR headers |
| Dashboard Quality Report | Format Dashboard, templates, Framework Timing, validation result rows | Quality sections A-N, validation summaries, health checks, signoff | `runDashboardQualityStartUp`; `runDashboardQualityValidateTemplates`; `runDashboardQualityFull`; `buildCombinedFrameworkTestDashboard`; `saveDashboardQualitySectionRows_` | Dashboard Quality workflow | Operators; release readiness; Framework Timing; health/signoff summaries | Format Dashboard validation; Template validation; Framework Health; Performance Summary; Master List Health; Care Plan Sync; Workflow Sync | `runFrameworkTimed_`; Dashboard Quality section timestamps; Framework Timing rows | Format Dashboard; template validation results; Framework Timing Report; document properties section storage |
| Framework Timing Report | Runtime/framework timing events | Timing detail, summary, performance recommendations | `runFrameworkTimed_`; `markFrameworkStep_`; `writeFrameworkTimingReportBestEffort_`; `writeCombinedFrameworkTimingReport_`; runtime timing helpers | Framework Timing workflow | Dashboard Quality Performance Summary; maintainers | Timing severity classification; performance summary quality rows | Step timing, total timing, severity, last timestamp | Timing sheet; document properties; Dashboard Quality Section I |
| Index | Workbook sheets and production report tabs | Workbook sheet inventory and navigation | `createIndexSheet`; `generateArchiveFileIndex_`; `handleSpreadsheetChangeForIndex`; `setupIndexRefreshOnSheetAddedTrigger_` | Index / workbook organization workflow | Operators; report navigation | Trigger path smoke validation; sheet signature property | Trigger/runtime timing when called by workflows | Sheet list; tab order constants; on-change trigger; Index template formatting |

## Production Formatting Data Flow Matrix

| Format Dashboard Definition | Template | Worksheet Builder | Formatter | Final Report | Owner | Consumer | Validation | Timing | Dependencies |
|---|---|---|---|---|---|---|---|---|---|
| Section C `Banners`; Section D column definitions; Section E behavior; Section F Banners headers | Template - Banner Report | `createOrRefreshTemplateFromDashboard_`; output copy from template | `formatMonthlyBannerSheet_`; `formatBannerReport`; `applyDashboardTemplateFormattingToActiveReportSheet_` where applicable | `Banners mm.yy` / Banner Report | Banner Report workflow | Raw Data banner sync; operators | `validateBannerFormatterOutput_`; `validateTemplateFromDashboard_` | Framework/runtime timing | RFF_BASE_TEMPLATE; Banner source; prompt month; dashboard headers |
| Section C `CP Due Date`; Section F CP Due Date headers | Template - Care Plan Due | `createOrRefreshTemplateFromDashboard_`; dashboard output builder | `formatCarePlanDueOrUnlockedFromDashboard_`; `formatMonthlyDashboardSheetFromSource_` | `CP Due mm.yy` | Care Plan Due workflow | Master List sync diagnostics; operators | Template validation; care-plan dependency diagnostics | Framework/runtime timing | CP Due source; dashboard title rows; source end-date logic |
| Section C `Unlock CP`; Section F Unlock CP headers | Template - Unlocked Care Plan | `createOrRefreshTemplateFromDashboard_`; dashboard output builder | `formatCarePlanDueOrUnlockedFromDashboard_`; `formatMonthlyDashboardSheetFromSource_` | `Unlock CP mm.yy` | Unlocked Care Plan workflow | Master List sync diagnostics; operators | Template validation; care-plan dependency diagnostics | Framework/runtime timing | Unlock CP source; dashboard title rows; source end-date logic |
| Section C `Raw Data`; Section F Raw Data headers | Template - Raw Data | `createOrRefreshTemplateFromDashboard_`; `createRawDataOutputSheetFromTemplateFast_` / fast canvas path | `formatRawData`; `formatMonthlyRawDataSheetFromSource_`; `processRawDataApprovedSyncColumns_`; `syncRawDataBannerColumns_` | `Raw Data mm.yy` | Raw Data workflow | Demo P; Master List; Monthly Change; Disenrollment | Raw Data preflight; Primary PMR Row verification; template validation | Runtime/framework timing | Raw Data source; Banners output; dashboard column/date formats |
| Section C `Demo P`; Section F Demo P headers | Template - Demo P | `createOrRefreshTemplateFromDashboard_`; `createOrRefreshDemoPTemplate_`; Demo P active sheet builders | `applyDemoPTemplateToSheet_`; `formatDemoPStructure`; `processDemoP` | `Demo P` | Demo P production workflow | Master List; Monthly Change; Disenrollment | Raw Data preflight; header/PMR/DOB validation; template validation | Runtime timing | Raw Data; Demo P template; contact flattening; primary PMR logic |
| Section C `Master List`; Section F Master List headers | Template - Master List | `createOrRefreshTemplateFromDashboard_`; `createMasterListSheetFromTemplate_` | `applyMasterListDisplaySettings_`; `applyFinalMasterListColorAndDisplay_`; row-height locks | `Master List mm.yy` | Master List production workflow | Monthly Change; Index; operators | Master List health check; header validation; template validation | Runtime timing | Demo P; synchronization data; dashboard column definitions |
| Section C `Monthly Change`; Section F Monthly Change headers | Template - Monthly Change | `createOrRefreshTemplateFromDashboard_`; monthly change report builder | `formatMonthlyChangeReportSectionSheet_`; subsection/subheader formatting | `Monthly Change mm.yy` | Monthly Change production workflow | Master List update; Disenrollment; operators | Change comparison/key validation; template validation | Runtime timing | Current/prior datasets; PMR/DOB/date keys; monthly sections |
| Section C `Disenrolled Exclusion`; Section F Disenrolled Exclusion headers | Template - Disenrolled Exclusion | `createOrRefreshTemplateFromDashboard_`; `createDisenrolledExclusionSheetFromDashboardTemplate_` | `applyDisenrolledExclusionCreateFormattingOnly_`; standard formatting helpers | `Disenrolled Exclusion` | Disenrollment workflow | Disenrollment operations; operators | PMR set/header validation; template validation | Runtime timing | Raw Data; Demo P; Monthly Change; Master List |
| System surface `RFF_BASE_TEMPLATE` | RFF_BASE_TEMPLATE | `ensureGoldenMasterTemplate_` | Base sheet style setup and hidden framework foundation | Hidden base template, not final report | Framework template foundation | All report templates when missing | Minimum structure validation during staged promotion; downstream template validation | Framework timing during template refresh | RFF_DEFAULTS; base template constant; hidden system sheet policy |
| Section G `Dashboard Quality Report` | Dashboard Quality Report shell | `ensureDashboardQualityReportSheet_`; `initializeDashboardQualitySheet_`; section shell builders | `styleDashboardQualityReport_`; `styleDashboardQualityUpdatedSections_` | Dashboard Quality Report | Dashboard Quality workflow | Operators; release readiness | Dashboard Quality section status validation; health checks | Framework timing and section timestamps | Dashboard section rows; validation outputs; Framework Timing |
| Section G `Framework Timing Report` | Framework Timing Report shell | `ensureFrameworkTimingReport_`; `initializeFrameworkTimingSheet_`; shell compact builder | `styleFrameworkTimingReport_`; timing summary builders | Framework Timing Report | Framework Timing workflow | Dashboard Quality Performance Summary; maintainers | Severity classification and performance summary rows | Framework/runtime timing | Timing detail rows; section registry; document properties |

## End-to-End Processing Trace

| Stage | Dataset Entering Stage | Dataset Leaving Stage | Owner | Consumer | Validation | Timing | Dependencies |
|---|---|---|---|---|---|---|---|
| Source | Imported monthly source tabs and active report source sheets | Normalized monthly source routes | Format Monthly Sheets workflow | Report-specific builders | Prompt/month/source presence checks | Framework Timing | Source tab names; prompt month |
| Demo P | Raw Data with Primary PMR Row and participant/contact data | Active Demo P participant dataset | Demo P workflow | Synchronization, Master List, Monthly Change, Disenrollment | Raw Data preflight; PMR/DOB/header validation | Runtime Timing | Raw Data; Template - Demo P; contact flattening |
| Synchronization | Demo P plus Banners/CP Due/Unlock CP reports | Synced report columns and changed-PMR sets | Synchronization workflow | Master List | Care-plan function diagnostics; header checks | Dashboard Quality + runtime timing | PMR keys; formatted source reports |
| Master List | Demo P primary rows plus synchronized fields | Master List monthly production report | Master List workflow | Monthly Change, Index, operators | Master List Health; header validation | Runtime Timing | Template - Master List; Demo P; synchronization data |
| Monthly Change | Current/prior Raw Data, Demo P, Master List data | Monthly Change report | Monthly Change workflow | Master List updates, Disenrollment, operators | Key/date/value comparison validation | Runtime Timing | Template - Monthly Change; current/prior month sheets |
| Disenrollment | Raw Data status, Demo P active rows, Monthly Change removals | Disenrolled Exclusion and cleaned Demo P/Master List rows | Disenrollment workflow | Operators; Dashboard Quality | PMR set validation; row deletion safeguards | Runtime Timing | Template - Disenrolled Exclusion; Raw Data; Demo P; Master List |
| Dashboard Quality | Dashboard definitions, template results, health/performance rows | Dashboard Quality Report sections A-N | Dashboard Quality workflow | Operators; release readiness | Format Dashboard, Template, Framework Health, Performance, Master List, Care Plan, Workflow Sync validations | Framework Timing | Format Dashboard; Framework Timing; validation row stores |

## End-to-End Formatting Trace

| Stage | Input | Output | Owner | Consumer | Validation | Timing | Dependencies |
|---|---|---|---|---|---|---|---|
| Format Dashboard | Sections A-G dashboard rows | Loaded dashboard config object | Format Dashboard workflow | Template builder; report formatters; Dashboard Quality | Format Dashboard verification collectors | Framework Timing during setup/quality | `loadDashboardConfig_`; section readers |
| Template | RFF_BASE_TEMPLATE plus Section C/F/D/E definitions | Governed report template sheets | Template framework | Worksheet builders | `validateTemplateFromDashboard_`; staged minimum structure validation | Framework Timing | `createOrRefreshAllReportTemplates`; template signatures |
| Worksheet Builder | Template sheets and source data | Output report worksheets | Report-specific workflows | Formatters and final reports | Sheet/header/source validation | Runtime/framework timing | Template copy/build helpers; source datasets |
| Formatter | Output worksheet plus dashboard config | Styled, filtered, sized report worksheet | Report-specific formatter | Final reports; downstream datasets | Header/date/number/visibility validation | Runtime/framework timing | Column definitions; title rows; behavior rows |
| Final Report | Formatted worksheet | Production-facing report | Workflow owner | Downstream dataset consumers and operators | Dashboard Quality and workflow-specific validations | Framework Timing summary | Workbook tabs; Index; system surfaces |

## Dependency Summary

| Dependency | Used By | Validation / Risk Control | Timing |
|---|---|---|---|
| Format Dashboard Sections A-G | All templates, report formatters, Dashboard Quality | Format Dashboard validation collectors; Dashboard Quality Sections A-E/F | Setup and Dashboard Quality timing |
| RFF_BASE_TEMPLATE | All report templates when missing | Staged template minimum structure validation; template validation | Template refresh timing |
| Template sheets | Worksheet builders and report formatters | Template validation Section F | Template refresh timing |
| Raw Data | Demo P, Monthly Change, Disenrollment, Master List inputs | Raw Data preflight; Primary PMR Row verification | Runtime timing |
| Demo P | Master List, Monthly Change, Disenrollment | PMR/DOB/header validation; Demo P workflow timing | Runtime timing |
| Banners / CP Due / Unlock CP reports | Raw Data sync and Master List sync diagnostics | Banner output validation; care-plan dependency diagnostics | Runtime/framework timing |
| Master List | Monthly Change and operator reporting | Master List Health | Runtime timing and Dashboard Quality |
| Monthly Change | Master List updates and Disenrollment | Change key/value/date comparison; Dashboard Quality workflow | Runtime timing |
| Disenrolled Exclusion | Disenrollment operations and audit trail | PMR set/header validation; row deletion safeguards | Runtime timing |
| Dashboard Quality Report | Release readiness and operational audit | Section status PASS/WARNING/FAIL checks | Framework Timing |
| Framework Timing Report | Performance and bottleneck analysis | Timing severity and performance summary | Runtime/framework timing |
| Index | Operator navigation and workbook organization | Trigger smoke validation; sheet signature refresh | Trigger/runtime timing |

## Exhaustiveness Notes

* Production datasets include source import tabs, formatted source reports, Raw Data, Demo P, synchronization state, Master List, Monthly Change, Disenrolled Exclusion, Dashboard Quality, Framework Timing, and Index.
* Formatting datasets include the Format Dashboard, RFF_BASE_TEMPLATE, report templates, worksheet builders, workflow formatters, final production reports, and system surfaces.
* Validation is cross-referenced to the Validation Catalog and includes blocking validators, quality-row validators, smoke checks, and dependency diagnostics.
* Timing is represented by both runtime workflow timing and Framework Timing / Dashboard Quality timing surfaces.
