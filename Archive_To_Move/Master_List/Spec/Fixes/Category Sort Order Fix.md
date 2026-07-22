Please update the Master List Framework script to implement the finalized Category Sort Blueprint. The script must strictly use the mathematical and hardcoded sort categories to dictate order during both explicit global sorting and Index sheet rendering. Additionally, update the Format Dashboard default builders to display these classifications for reference.

Please execute the following five updates exactly as specified:

### **1\. Lock in the Category Sort Blueprint**

Replace the entire `getSheetSortProfileByName_` function with the exact code below to establish the absolute mathematical boundaries for all tab placements.

JavaScript

```
function getSheetSortProfileByName_(sheetName) {
  const name = String(sheetName || "").trim();
  const isTemplate = name.indexOf("Template") !== -1 || name === RFF_BASE_TEMPLATE_NAME;
  const monthDate = extractFirstDateFromSheetName_(name);
  const month = monthDate ? monthDate.getMonth() + 1 : 0;

  // 1. Core / Ongoing Operational
  if (name === INDEX_SHEET) return { rank: 1, group: "index", operational: true, tail: false };
  if (name === SHEET_TYPE.DEMO_P || name === DEMO_P_PREFIX) return { rank: 2, group: "ongoing_operational", operational: true, tail: false };
  if (name === DISENROLLED_EXCLUSION_SHEET || (/^Disenrolled\b/i.test(name) && !isTemplate)) return { rank: 10, group: "ongoing_operational", operational: true, tail: false };

  // 2. Active Monthly Sheets (Ranks 21-98)
  if (
    name.indexOf(MASTER_LIST_PREFIX) === 0 ||
    name.indexOf(MONTHLY_CHANGE_REPORT_PREFIX) === 0 ||
    (name.indexOf("Raw Data ") === 0 && name.indexOf("Raw Data - ") === -1)
  ) {
    const rank = month >= 1 && month <= 12 ? 105 - (month * 7) : 600;
    return { rank: rank, group: "active_monthly", operational: true, tail: false };
  }

  // 3. Monthly Import Sheets (Ranks 115-192)
  if (
    name.indexOf("Banner") === 0 ||
    name.indexOf(CARE_PLAN_DUE_PREFIX) === 0 ||
    name.indexOf(CARE_PLAN_DUE_DATE_ALT_PREFIX) === 0 ||
    name.indexOf(UNLOCKED_PREFIX) === 0 ||
    name.indexOf("Unlocked") === 0
  ) {
    const rank = month >= 1 && month <= 12 ? 199 - (month * 7) : 600;
    return { rank: rank, group: "import_monthly", operational: true, tail: false };
  }

  // 4. Raw Data Imports (Ranks 210-287)
  if (
    name.indexOf("Raw Data - Banner") === 0 || 
    name.indexOf("Raw Data - CP Due") === 0 || 
    name.indexOf("Raw Data - Care Plan Due") === 0 || 
    name.indexOf("Raw Data - Unlock") === 0
  ) {
    const rank = month >= 1 && month <= 12 ? 294 - (month * 7) : 600;
    return { rank: rank, group: "raw_import_monthly", operational: true, tail: false };
  }

  // 5. Temporary Short Imports & Archives
  if (/^(B\s|CD\s|UC\s|RD\s)/i.test(name)) return { rank: 300, group: "short_import", operational: true, tail: false };
  if (name.indexOf("Archive - Demo P") === 0) return { rank: 350, group: "archive_demo", operational: true, tail: false, forceHidden: true };

  // 6. System Sheets (Strict Sequential Order)
  if (name === "Framework Timing Report" || name === RFF_TIMING_SHEET) return { rank: 500, group: "framework_timing", operational: false, tail: true };
  if (name === "Dashboard Quality Report" || name === RFF_TEST_DASHBOARD_SHEET) return { rank: 501, group: "dashboard_quality", operational: false, tail: true };
  if (name === "Format Dashboard" || name === RFF_DASHBOARD_SHEET) return { rank: 502, group: "format_dashboard", operational: false, tail: true };

  // 7. Templates (Strict Sequential Order)
  if (isTemplate) {
    if (name === "Template - Banner Report") return { rank: 801, group: "template_banner", operational: false, tail: true };
    if (name === "Template - Care Plan Due") return { rank: 802, group: "template_care_plan", operational: false, tail: true };
    if (name === "Template - Unlocked Care Plan") return { rank: 803, group: "template_unlocked", operational: false, tail: true };
    if (name === "Template - Raw Data") return { rank: 804, group: "template_raw_data", operational: false, tail: true };
    if (name === "Template - Demo P") return { rank: 805, group: "template_demo_p", operational: false, tail: true };
    if (name === "Template - Disenrolled Exclusion") return { rank: 806, group: "template_disenrolled", operational: false, tail: true };
    if (name === "Template - Master List") return { rank: 807, group: "template_master", operational: false, tail: true };
    if (name === "Template - Monthly Change") return { rank: 808, group: "template_change", operational: false, tail: true };
    if (name === RFF_BASE_TEMPLATE_NAME) return { rank: 809, group: "base_template", operational: false, tail: true, forceHidden: true };
    
    return { rank: 850, group: "template_other", operational: false, tail: true };
  }

  // 8. Catch-All
  return { rank: 600, group: "other", operational: true, tail: false };
}

```

### **2\. Enforce Global Sort and Index Display by Category Math**

Ensure that both `enforceGlobalSheetSortOrder_()` and `createIndexSheet()` strictly utilize `compareSheetNamesByGlobalOrder_` and `compareSheetNamesByMonthThenGlobalOrder_`.

* In `createIndexSheet()`, ensure the `addIndexSection_` builders for "Current Sheets", "Imported Data", and "Archive / System Sheets" sort their arrays using `getGlobalSheetSortRankByName_` so the Index list perfectly matches the physical tab layout.

### **3\. Update Format Dashboard Section C (Sheet Definitions)**

Add a new column titled `"Monthly Sheet Type"` to Section C. Update `writeDashboardDefaultsFast_`, `getDefaultSheetDefinitionRows_`, and `loadSheetDefinitions_` to include and read this column.

Apply the following exact string values to the array rows:

* **Banners:** `"Monthly Import"`  
* **CP Due Date:** `"Monthly Import"`  
* **Unlock CP:** `"Monthly Import"`  
* **Raw Data:** `"Monthly Active"`  
* **Demo P:** `"Ongoing Operational"`  
* **Disenrolled Exclusion:** `"Ongoing Operational"`  
* **Master List:** `"Monthly Active"`  
* **Monthly Change:** `"Monthly Active"`

### **4\. Update Format Dashboard Section D (Sheet Behaviors)**

Add a new column titled `"Sort Order"` to Section D. Update `writeDashboardDefaultsFast_`, `getDefaultBehaviorRows_`, and `loadSheetBehaviors_` to include and read this column.

Apply the following exact string values to the array rows to serve as visual references:

* **Banners:** `"115-192"`  
* **CP Due Date:** `"115-192"`  
* **Unlock CP:** `"115-192"`  
* **Raw Data:** `"21-98"`  
* **Demo P:** `"2"`  
* **Disenrolled Exclusion:** `"10"`  
* **Master List:** `"21-98"`  
* **Monthly Change:** `"21-98"`

### **5\. Update Format Dashboard Section E (System Sheet Surfaces)**

In the `getDefaultSystemSurfaceRows_` function, update the 3rd column ("Sort Order") values to match the newly established ranks for visual reference:

* **Format Dashboard:** `502`  
* **Dashboard Quality Report:** `501`  
* **Framework Timing Report:** `500`  
* **Archive \- Demo P:** `350`  
* **RFF\_BASE\_TEMPLATE:** `809`

