> Applicability update for v1.8.3: This Wave 1 release testing plan remains applicable, but it has been updated for the v1.8.3 dashboard structure. Format Dashboard now includes Section F - Tab Organization & Index; Column Definitions moved to Section G; Sheet Headers moved to Section H; Dashboard Quality Template/Changelog/Health/Summary/Signoff sections shifted accordingly; and unformatted import/source tabs now use the Source - prefix.

# **0\. Pre-test setup  \-  Done**

## **0.1 Use a workbook copy**

Run all Wave 1 testing in a copied workbook first.

Pass

* Testing is performed in a safe workbook copy.

* Original production workbook is not changed during first validation.

Fail

* Testing is performed directly in production before v1.8.3 is validated.

---

## **0.2 Confirm the correct script is installed  \-  Updated v1.8.3**

## **Open Apps Script and confirm the active code is v1.8.3.**

Pass

* MASTER\_LIST\_MERGE\_ML\_VERSION is 1.8.3.

Fail

* Apps Script still shows any pre-v1.8.3 version.

---

## **0.3 Confirm required menu items appear  \-Done**

After opening/reloading the sheet, confirm these menus are present:

* Hide Monthly Import Sheets

* Archive Monthly Import Sheets

* Hide Monthly Active Sheets

* Archive Monthly Active Sheets

* Organize Tabs

* Dashboard Quality Workflow

These callbacks are wired in the menu setup.

Pass

* All listed menu items appear.

* No menu callback error appears on open.

Fail

* Missing menu items.

* onOpen or callback errors.

---

# **1\. System sheet order test   Dashboard Quality Reports \- showing ahead of Framework Timing Report**

## **Purpose**

Confirm the system tail order is now:

```
Framework Timing Report
Dashboard Quality Report
Format Dashboard
```

The v1.8.3 default system-surface rows now match this order.

The sort profile also ranks:

1. Framework Timing Report

2. Dashboard Quality Report

3. Format Dashboard

within the system/template tail block.

## **Steps**

1. Run Setup System Sheets or the equivalent setup workflow.

2. Run Organize Tabs manually.

3. Inspect the sheet tabs.

## **Expected order**

```
Index
Demo P
Master List mm.yy
Monthly Change mm.yy
Disenrolled Exclusion
Raw Data mm.yy
Banners mm.yy
CP Due mm.yy
Unlock CP mm.yy
B
CD
UC
RD
Archive - Demo P
Framework Timing Report
Dashboard Quality Report
Format Dashboard
Template - Banner Report
Template - Care Plan Due
Template - Unlocked Care Plan
Template - Raw Data
Template - Demo P
Template - Disenrolled Exclusion
Template - Master List
Template - Monthly Change
RFF_BASE_TEMPLATE
```

## **Pass**

* Framework Timing Report is immediately before Dashboard Quality Report.

* Dashboard Quality Report is immediately before Format Dashboard.

* No active/import/monthly output sheet appears between these system sheets.

* No operational sheet is placed after Framework Timing Report except approved system/template tail sheets.

## **Fail**

* Dashboard Quality Report appears before Framework Timing Report.

* Format Dashboard appears before Framework Timing Report.

* Any Raw Data, Banner, CP Due, Unlock CP, Master List, or Monthly Change sheet appears between system sheets.

---

# **2\. Raw Data creation and final visibility test**

## **Purpose**

Confirm Raw Data is hidden after creation/formatting when Dashboard Output Visibility is HIDDEN.

v1.8.3 enforces Raw Data visibility again after Index refresh and no longer reactivates the Raw Data sheet afterward.

The script also requires a visible fallback sheet before hiding an active sheet.

## **Steps**

1. In Format Dashboard, confirm Raw Data Output Visibility is HIDDEN.

2. Select the imported Raw Data source sheet.

3. Run Format Raw Data.

4. Wait for the workflow to complete.

5. Inspect tabs and hidden state.

6. Run Create Index Sheet / Refresh Index.

7. Inspect Raw Data again.

8. Run Organize Tabs.

9. Inspect Raw Data again.

## **Pass**

* Raw Data is renamed/formatted correctly.

* Raw Data is placed in the active monthly section, not in the system/template tail block.

* Raw Data ends hidden.

* Raw Data remains hidden after Index refresh.

* Raw Data remains hidden after Organize Tabs.

* No error occurs from trying to hide the active sheet.

## **Fail**

* Raw Data remains visible after creation.

* Raw Data is hidden but reappears after Index refresh.

* Raw Data is hidden but reappears after Organize Tabs.

* Raw Data appears between Framework Timing Report and Format Dashboard.

* Apps Script logs “Cannot hide active sheet” or similar.

---

# **3\. Monthly import sheet creation and placement test**

## **Purpose**

Confirm Banners, CP Due, and Unlock CP monthly/import sheets are created in the correct area and do not appear before Demo P.

v1.8.3 ranks:

* Index first.

* Demo P second.

* Master List / Monthly Change / Disenrolled / Raw Data after Demo P.

* Banners / CP Due / Unlock CP after Raw Data.

* short/import groups after monthly outputs.

* Archive Demo P before the system tail block.

v1.8.3 also broadened Banner matching for generated Banner... names.

## **Steps**

Run each workflow separately:

1. Format Banners Individual

2. Format CP Due Date Individual

3. Format Unlocked Care Plan Individual

4. Format Monthly Sheets

After each workflow:

1. Confirm the newly created sheet position.

2. Confirm visibility.

3. Confirm Demo P remains directly behind Index unless other approved active sheets are intentionally between them.

## **Pass**

* No monthly import sheet appears before Demo P.

* Banners sheets rank after Raw Data.

* CP Due sheets rank after Banners.

* Unlock CP sheets rank after CP Due.

* Unformatted imports such as B, CD, UC, RD, or Source - ... stay before Archive \- Demo P and before Framework Timing Report.

* Hidden import sheets remain hidden if dashboard visibility says HIDDEN.

## **Fail**

* Banners, Banner, CP Due, Unlock CP, B, CD, UC, or RD appears before Demo P.

* Any import sheet appears between Framework Timing Report, Dashboard Quality Report, and Format Dashboard.

* Individual formatting creates a correctly named sheet but leaves it visible when configured hidden.

---

# **4\. Hide Monthly Import Sheets test**

## **Purpose**

Confirm Hide Monthly Import Sheets only targets monthly import/output tabs:

* Banners

* CP Due Date / CP Due / Care Plan Due

* Unlocked CP / Unlock CP / Unlocked Care Plan

It should not target Raw Data.

The v1.8.3 menu callback exists for Hide Monthly Import Sheets.

Raw Data is classified under monthly active sheets, not import sheets.

## **Steps**

1. Make sure these sheets exist for the test month:

   * Raw Data mm.yy

   * Banners mm.yy

   * CP Due mm.yy

   * Unlock CP mm.yy

2. Run Hide Monthly Import Sheets.

3. Inspect visibility.

## **Pass**

* Banners is hidden.

* CP Due is hidden.

* Unlock CP is hidden.

* Raw Data is not hidden by this menu item.

## **Fail**

* Raw Data is hidden by Hide Monthly Import Sheets.

* Any import monthly sheet remains visible.

* The workflow errors while hiding the active sheet.

---

# **5\. Hide Monthly Active Sheets test**

## **Purpose**

Confirm Hide Monthly Active Sheets targets:

* Raw Data

* Master List

* Monthly Change

The v1.8.3 menu callback exists for Hide Monthly Active Sheets.

Raw Data is included in the active-sheet hide workflow.

## **Steps**

1. Make sure these sheets exist for the test month:

   * Raw Data mm.yy

   * Master List mm.yy

   * Monthly Change mm.yy

2. Run Hide Monthly Active Sheets.

3. Inspect visibility.

## **Pass**

* Raw Data is hidden.

* Master List is hidden.

* Monthly Change is hidden.

* Banners / CP Due / Unlock CP are not the primary target of this menu item.

## **Fail**

* Raw Data remains visible.

* Master List remains visible.

* Monthly Change remains visible.

* Import sheets are incorrectly included in the active-sheet hide list.

---

# **6\. Monthly Change duplicate report test**

## **Purpose**

Confirm v1.8.3 still errors when the exact Monthly Change report already exists.

The duplicate report guard throws before template copy.

## **Steps**

1. Run Build Monthly Change Report for a month that has required previous/current Raw Data.

2. Confirm the report is created.

3. Run Build Monthly Change Report again for the same month.

## **Pass**

* First run creates the Monthly Change report.

* Second run errors with a clear “Monthly Change report already exists” message.

* No duplicate (2) sheet is created.

* Existing Monthly Change report is not deleted.

* No copied template is left behind after the duplicate error.

## **Fail**

* A duplicate report is created.

* Existing report is deleted.

* Workflow partially creates a new sheet before erroring.

---

# **7\. Update Demo P without Monthly Change test**

## **Purpose**

Confirm missing Monthly Change is a controlled stop, not a partial Demo P update.

## **Steps**

1. In the workbook copy, temporarily rename or remove the expected Monthly Change sheet for the test month.

2. Run Update Demo P Monthly Sync.

3. Observe the result.

4. Restore the Monthly Change sheet name afterward.

## **Pass**

* Workflow stops with a clear message that Monthly Change is missing.

* Demo P is not partially updated.

* Timing report records the stop/error clearly.

## **Fail**

* Demo P is partially updated.

* Error is unclear.

* Workflow silently succeeds without Monthly Change.

---

# **8\. Create Master List placement test**

## **Purpose**

Confirm Master List created through the individual menu appears before the system tail block.

## **Steps**

1. Run Create Master List for the test month.

2. Inspect tab order.

3. Run Organize Tabs.

4. Inspect tab order again.

## **Pass**

* Master List appears after Demo P / Monthly Change as appropriate.

* Master List appears before Framework Timing Report.

* Master List does not appear after Framework Timing Report.

* Manual Organize Tabs does not unhide hidden import sheets.

## **Fail**

* Master List appears between system sheets.

* Master List appears after Framework Timing Report.

* Organize Tabs unhides hidden monthly import sheets.

---

# **9\. Archive Monthly Import Sheets test**

## **Purpose**

Confirm monthly import archive no longer fails solely because local protected cleanup refuses deletion.

v1.8.3 records archive success after verified archive copy and returns a local cleanup action.

If a local sheet is protected, v1.8.3 hides it instead of treating the archive copy as failed.

## **Steps**

1. Confirm archive spreadsheet ID is configured.

2. Confirm monthly import sheets exist:

   * Banners mm.yy

   * CP Due mm.yy

   * Unlock CP mm.yy

3. Run Archive Monthly Import Sheets.

4. Inspect archive workbook.

5. Inspect local workbook.

6. Review notification and Framework Timing Report.

## **Pass**

* Sheets are copied to archive.

* Archive copy verification succeeds.

* Local protected sheets are hidden or deleted according to protection rules.

* Workflow does not report failure solely because local deletion was refused.

* Summary reports Failed: 0 unless a real archive-copy or permission error occurred.

## **Fail**

* Archive copy succeeds but workflow still reports failure due only to protected local deletion.

* Local sheets remain visible when expected hidden.

* Archive workbook does not receive the copied sheets.

* Archive Index / local Index does not update.

---

# **10\. Archive Monthly Active Sheets test**

## **Purpose**

Confirm active monthly archive works for:

* Raw Data

* Master List

* Monthly Change

The v1.8.3 menu callback exists for Archive Monthly Active Sheets.

## **Steps**

1. Confirm archive spreadsheet ID is configured.

2. Confirm active monthly sheets exist:

   * Raw Data mm.yy

   * Master List mm.yy

   * Monthly Change mm.yy

3. Run Archive Monthly Active Sheets.

4. Inspect archive workbook.

5. Inspect local workbook.

6. Review notification and Framework Timing Report.

## **Pass**

* Active monthly sheets are copied to archive.

* Protected local sheets are retained and hidden if they cannot be deleted.

* Workflow does not report failure solely because local deletion was refused.

* Index / Archive Index refreshes.

## **Fail**

* Archive copy succeeds but workflow reports failure due only to protected local cleanup.

* Raw Data or Master List stays visible after archive if the approved result is hidden.

* Archive copy is missing.

---

# **11\. Index and Archive Index test**

## **Purpose**

Confirm Index includes local operational sheets and archive sheets after v1.8.3 workflows.

## **Steps**

1. Run Create Index Sheet / Refresh Index.

2. Confirm Index is first.

3. Confirm local sections include:

   * Demo P

   * Master List mm.yy

   * Monthly Change mm.yy

   * Disenrolled Exclusion

   * Raw Data mm.yy

   * Banners mm.yy

   * CP Due mm.yy

   * Unlock CP mm.yy

   * unformatted import sheets

4. Confirm archive side includes expected archived sheets.

5. Confirm hidden/visible status is accurate.

## **Pass**

* Index is first.

* Demo P remains second in actual tab order after Organize Tabs.

* Index lists unformatted imports.

* Index lists active monthly sheets.

* Archive Index side lists archived copies.

* Hidden status is accurate.

## **Fail**

* Index omits unformatted Raw Data / Banners / CP / Unlock sheets.

* Archive side is blank despite successful archive copies.

* Hidden status is wrong.

* Index refresh moves or unhides hidden sheets.

---

# **12\. Manual Organize Tabs hidden-state test**

## **Purpose**

Confirm manual Organize Tabs is the only full-workbook sort and preserves hidden sheets.

The manual menu item is wired to enforceGlobalSheetSortOrder.

## **Steps**

1. Manually hide:

   * Banners mm.yy

   * CP Due mm.yy

   * Unlock CP mm.yy

   * Raw Data mm.yy

   * Archive \- Demo P

   * RFF\_BASE\_TEMPLATE

2. Run Organize Tabs.

3. Inspect tab order.

4. Inspect hidden state.

## **Pass**

* Tabs are ordered correctly.

* Previously hidden sheets remain hidden.

* RFF\_BASE\_TEMPLATE remains hidden.

* No monthly import sheet is unhidden.

* No active/import sheet moves into the system tail block.

## **Fail**

* Organize Tabs unhides any monthly import sheet.

* Organize Tabs unhides Archive \- Demo P or RFF\_BASE\_TEMPLATE.

* Organize Tabs places operational sheets after Framework Timing Report.

---

# **13\. Dashboard Quality Workflow test**

## **Purpose**

Confirm the full Dashboard Quality Workflow now populates Section I, Section Q, and Section R.

v1.8.3 full workflow now calls the full template/format section workflow with health/signoff enabled.

v1.8.3 explicitly runs:

* Section I Framework Health Check

* Section Q Summary

* Section R Signoff

The Dashboard Quality shell contains SECTION Q - SUMMARY and SECTION R - SIGNOFF.

The writers now target Section Q and Section R.

## **Steps**

1. Run Dashboard Quality Workflow.

2. Open Dashboard Quality Report.

3. Confirm Section I has current rows.

4. Confirm Section Q Summary is populated.

5. Confirm Section R Signoff is populated.

6. Confirm sections do not remain NOT RUN.

7. Review Framework Timing Report for workflow completion.

## **Pass**

* Section I is populated.

* Section Q is populated.

* Section R is populated.

* Dashboard Quality Workflow completes.

* Timing report records Dashboard Quality Workflow completion.

* No legacy pre-v1.8.3 Summary/Signoff section mismatch appears.

## **Fail**

* Section I remains NOT RUN.

* Section Q remains NOT RUN.

* Section R remains NOT RUN.

* Summary or Signoff rows appear under the wrong section.

* Dashboard Quality Workflow errors.

---

# **14\. Framework Timing Report review**

## **Purpose**

Confirm v1.8.3 tests are logged and no expected controlled error is misread as a failure.

## **Steps**

After each major workflow, review Framework Timing Report.

Look for:

* Workflow started.

* Workflow completed.

* Any ERROR, CRITICAL, SLOW, or BOTTLENECK.

* Whether a CRITICAL entry was an expected controlled test, such as duplicate Monthly Change.

## **Pass**

* Expected workflows complete.

* Duplicate Monthly Change rerun may log an error, but it should be the expected “already exists” controlled error.

* Archive workflows do not show failure solely from protected local cleanup.

* Raw Data workflow logs final visibility enforcement.

## **Fail**

* Unexpected runtime exception.

* Archive copy failure.

* Raw Data final visibility step missing.

* Dashboard Quality Workflow does not complete.

* Manual Organize Tabs causes hidden sheets to reappear.

---

# **15\. Final Wave 1 closure checklist**

Wave 1 can be considered cleared only when all of the following pass:

## **Version and setup**

* v1.8.3 is installed.

* Menus load.

* System sheets exist.

* Templates exist or are refreshed.

## **Placement**

* Index is first.

* Demo P is second.

* Master List, Monthly Change, Disenrolled, Raw Data, Banners, CP Due, Unlock CP, short imports, and Archive Demo P are before the system tail.

* Framework Timing Report, Dashboard Quality Report, and Format Dashboard are in that exact order.

* Templates follow Format Dashboard.

* RFF\_BASE\_TEMPLATE remains last in the template/system block.

## **Visibility**

* Raw Data hides after formatting when configured hidden.

* Banners hides when configured hidden.

* CP Due hides when configured hidden.

* Unlock CP hides when configured hidden.

* Manual Organize Tabs preserves hidden state.

## **Monthly Change**

* First Monthly Change run creates the report.

* Same-month rerun errors.

* Same-month rerun does not create (2).

* Existing report is not deleted.

## **Archive**

* Monthly Import archive copies sheets to archive.

* Monthly Active archive copies sheets to archive.

* Protected local cleanup no longer causes false archive failure.

* Retained protected local sheets are hidden.

* Index / archive side refreshes.

## **Dashboard Quality**

* Full Dashboard Quality Workflow runs.

* Section I populated.

* Section Q populated.

* Section R populated.

* No unexpected NOT RUN sections remain after full workflow.

---

# **Recommended test order**

Run the tests in this order:

1. Confirm v1.8.3 script version.

2. Reload workbook and confirm menus.

3. Run Setup System Sheets.

4. Run Create / Refresh All Templates if needed.

5. Run Format Raw Data.

6. Run Format Banners Individual.

7. Run Format CP Due Date Individual.

8. Run Format Unlocked Care Plan Individual.

9. Run Format Monthly Sheets for one month.

10. Run Build Demo P.

11. Run Create Master List.

12. Run Build Monthly Change once.

13. Run Build Monthly Change again for the same month and confirm expected error.

14. Run Update Demo P Monthly Sync.

15. Run Hide Monthly Import Sheets.

16. Run Hide Monthly Active Sheets.

17. Run Archive Monthly Import Sheets.

18. Run Archive Monthly Active Sheets.

19. Run Create Index Sheet / Refresh Index.

20. Run Organize Tabs.

21. Run Dashboard Quality Workflow.

22. Review Framework Timing Report.

23. Confirm final tab order and hidden state.





| Index  CP Due Individual Unlock CP Individual Demo P Banners Individual Banners Individual CP Due Individual Unlock CP Individual Monthly Change Individual Archive Demo P Disenrolled Exclusion  Banner Monthly Format CP Due  Monthly Format Unlock CP  Monthly Format Dashboard Quality Report Master Creath Monthly Update Raw Data Monthly Format Master List Individual Raw Data Individual Master List Individual Raw Data Individual Framework Timing Report Format Dashboard  | Index Banner Monthly Format CP Due  Monthly Format Unlock CP  Monthly Format Demo P Disenrolled Exclusion Banners Individual CP Due Individual Unlock CP Individual Banner Monthly Format CP Due  Monthly Format Monthly Change Individual Archive Demo P Unlock CP  Monthly Format Monthly Change Monthly Update Dashboard Quality Report Master List Monthly Update Raw Data Monthly Format Raw Data Individual Master List Individual Raw Data Individual Framework Timing Report Format Dashboard  |
| :---- | :---- |

    Unlocked CP didn’t format with Format Monthly
