# **Updates Wave 1 –  Round 3**

**Objective:** Refactor the Report Formatter Framework (RFF) to centralize all tab sorting, grouping, and Index Dashboard logic into a new, user-facing Format Dashboard section. Insert this new matrix as **Section F**, move the existing Sections F & G down, and rewire the framework to rely entirely on this dashboard section's computed ranks for sheet organization. Preserve the `* 7` dynamic month math for active sorting. Finally, update the script's global nomenclature to rename unformatted archive/import sheets from "Raw Data \- \[Type\]" to "Source \- \[Type\]".

**Step 1: Format Dashboard Structure & Removals**

1. **Remove "Monthly Sheet Type":** Strip this column out of `RFF_SECTION_SHEETS` (Section C). Update `getDefaultSheetDefinitionRows_()`, `getDefaultSheetDefinitionRowsWithColumnCounts_()`, and `loadSheetDefinitions_()` to reflect this removal.
2. **Remove "Sort Order":** Strip this column out of `RFF_SECTION_BEHAVIORS` (Section D). Update `getDefaultBehaviorRows_()`, `getDefaultBehaviorForSheetType_()`, and `loadSheetBehaviors_()` to reflect this removal.

**Step 2: Create "SECTION F \- TAB ORGANIZATION & INDEX" & Shift Existing Sections**

1. **Shift Constants:**
   * Update `RFF_SECTION_COLUMNS` to equal `"SECTION G - COLUMN DEFINITIONS"`.
   * Update `RFF_SECTION_HEADERS` to equal `"SECTION H - SHEET HEADERS"`.
2. **Add New Constant:** Create `RFF_SECTION_TAB_ORGANIZATION = "SECTION F - TAB ORGANIZATION & INDEX"`.
3. **Default Data:** Create a default row generator function `getDefaultTabOrganizationRows_()` that returns the following matrix exactly:

JavaScript

```
[
  ["Index", "System Sheet", "1", ""],
  ["Demo P", "Ongoing", "2", ""],
  ["Master List", "Active Monthly", "21", "Dynamic Ranking"],
  ["Monthly Change", "Active Monthly", "22", "Dynamic Ranking"],
  ["Disenrolled Exclusion", "Ongoing", "23", ""],
  ["Raw Data", "Active Monthly", "24", "Dynamic Ranking"],
  ["Banners", "Import Monthly", "25", "Dynamic Ranking"],
  ["CP Due", "Import Monthly", "26", "Dynamic Ranking"],
  ["Unlock CP", "Import Monthly", "27", "Dynamic Ranking"],
  ["Source - Banners", "Raw Data", "28", "Dynamic Ranking"],
  ["Source - Raw Data", "Raw Data", "29", "Dynamic Ranking"],
  ["Source - CP Due", "Raw Data", "30", "Dynamic Ranking"],
  ["Source - Unlocked CP", "Raw Data", "31", "Dynamic Ranking"],
  ["B", "Unformatted", "300", ""],
  ["CD", "Unformatted", "301", ""],
  ["UC", "Unformatted", "302", ""],
  ["RD", "Unformatted", "303", ""],
  ["Archive - Demo P", "Ongoing", "350", ""],
  ["Framework Timing Report", "System Sheet", "500", ""],
  ["Dashboard Quality Report", "System Sheet", "501", ""],
  ["Format Dashboard", "System Sheet", "502", ""],
  ["Template - Banner Report", "Template", "801", ""],
  ["Template - Care Plan Due", "Template", "802", ""],
  ["Template - Unlocked Care Plan", "Template", "803", ""],
  ["Template - Raw Data", "Template", "804", ""],
  ["Template - Demo P", "Template", "805", ""],
  ["Template - Disenrolled Exclus", "Template", "806", ""],
  ["Template - Master List", "Template", "807", ""],
  ["Template - Monthly Change", "Template", "808", ""],
  ["RFF_BASE_TEMPLATE", "System Sheet", "809", ""]
]
```

4.
   **Update Write Order:** In `writeDashboardDefaultsFast_()`, ensure `RFF_SECTION_TAB_ORGANIZATION` is appended *before* Columns and Headers, passing the headers `["Sheet Name / Prefix", "Group", "Rank / Range", "Special"]`. Ensure the column width array is wide enough.

**Step 3: Build the Config Loader** Update `loadDashboardConfig_()` and `ML_RUNTIME_CACHE_STORE_` to include `tabOrganization`. Create a function `loadTabOrganization_(index)` that parses Section F into an array of objects.

**Step 4: Refactor `getSheetSortProfileByName_` & Clean Up Sorting Logic**

1. Delete the giant `if/else` block inside `getSheetSortProfileByName_`. Rewrite it to iterate through the loaded `tabOrganization` array from the dashboard config (falling back to script defaults if the dashboard is unreachable). Match the exact name or treat the dashboard name as a prefix.
2. **Dynamic Month Ranking:** Parse the "Rank / Range" column to a base number. IF the "Special" column equals "Dynamic Ranking", extract the month (1-12) using `extractFirstDateFromSheetName_`. Calculate the final rank by applying the `* 7` math to group the months (e.g., `finalRank = baseRank + ((12 - month) * 7)`).
3. **Remove Redundant Bools:** Delete all `tail`, `operational`, and `forceHidden` booleans from `getSheetSortProfileByName_` and `buildSheetSortRecord_`. The strict numeric ranking completely replaces the need for these flags.
4. **Simplify Secondary Sorting:** Delete the `monthSort` property entirely from `buildSheetSortRecord_` and `compareSheetSortRecords_`. Sort strictly by the computed numeric `rank`, falling back to `a.name.localeCompare(b.name)`.

**Step 5: Simplify `createIndexSheet()`** Strip out the hardcoded `getIndexSheetNamesInSortOrder_` and `getIndexSheetNamesInMonthSortOrder_` grouping logic blocks. Because `compareSheetSortRecords_` handles the chronological separation via the dynamic rank math, simply iterate through the workbook's sheets (`ss.getSheets()`) in their physical left-to-right order. Run them through `getSheetSortProfileByName_` to get their `Group` assignment from Section F, and build the Index dashboard dynamically by creating a new header row whenever the `Group` string changes.

**Step 6: Update Dashboard Quality Mappings** Update the Dashboard Quality Report (`RFF_DASHBOARD_QUALITY_SECTIONS` and related verification functions) to reflect the new letter shifts:

* Format Dashboard Column Definitions is now Section G.
* Format Dashboard Sheet Headers is now Section H.
* Validation, Changelog, Health Check, etc., must all shift their section letters down by one to accommodate the newly inserted Section F. Update `getDashboardQualitySectionLetter_` and hardcoded section strings accordingly.

**Step 7: Global Script Nomenclature Updates** Update the entire script to replace the old "Raw Data \- \[Type\]" naming convention for unformatted imports/archives with the new "Source \- \[Type\]" convention.

1. Update `buildRawArchiveNameForSheetType_()` to return `"Source - CP Due " + suffix`, `"Source - Unlocked CP " + suffix`, `"Source - Disenrolled " + suffix`, etc., instead of "Raw Data \-...". (Keep the main formatted sheet as just `"Raw Data " + suffix`).
2. Update `formatBannerReport()`, `formatCarePlanDueOrUnlockedFromDashboard_()`, and any other formatter functions where the `rawName` variable is constructed for the purpose of archiving the pasted import tab. Ensure it is constructed to use `"Source - ..."` instead of `"Raw Data - ..."`.
3. Update `isUnformattedImportSheetNameForIndex_()` and `resolveMonthlyFormatterSourceSheet_()` regexes and `indexOf` checks to look for `Source - Banners`, `Source - CP Due`, etc., instead of `Raw Data - ...`.
4. Update any UI toasts, Error messages, or warnings (`notify_`, `throw new Error`) that referenced the old names to reference the new "Source Data" terminology.

**Step 8: Menu Trigger & Health Check Verification** To ensure no menu callbacks are broken or orphaned by this refactor, perform a strict cross-reference of all menu functions:

1. Verify that every string function name referenced inside the `onOpen()` UI builder perfectly matches the actual function declarations in the script.
2. Verify that the `ML_MENU_CALLBACKS` frozen object accurately reflects the current production function names.
3. Update the `getRequiredMenuFunctionNames_()` array to match the final, refactored menu functions so that `runFrameworkHealthCheck()` correctly validates the live menu triggers without returning false failures.
