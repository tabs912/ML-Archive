# Independent Shading and Sync Audit v8

Lines [5 - 16]:
```javascript
/* =========================================================================
 * = OFFICIAL AUDIT COMPLIANCE STATEMENT (HIGH-01, HIGH-02, HIGH-03)        =
 * =========================================================================
 * HIGH-01 (DUPLICATION): This file is a unified compilation layout combining 
 * the Host Hook Layer and Library Core for single-file compliance auditing.
 * There are no duplicate top-level constant re-declarations.
 *
 * HIGH-02 & HIGH-03 (MENU & ENTRYPOINTS): The 'onOpen()' and 'installedOnEdit()'
 * hooks are declared locally within this namespace. Dotted lines 
 * ('GrayShadeLibrary.*') have been removed for this direct deployment execution model,
 * allowing callbacks to map strictly to local function contexts.
 * ========================================================================= */
```
Issue: This block explains the resolved compilation/menu/entrypoint posture, but it does not capture the remaining **Needs Action** item: future maintainers still need an external deployment checklist explaining whether each spreadsheet is bound directly to this code, uses the library HEAD reference, or uses local host wrappers. Without that operational document, a maintainer can install the library correctly but fail to wire host triggers/menus correctly.
Fix:
````markdown
# Deployment Checklist: Independent Shading and Sync

## Required deployment model
- Use the approved centralized Apps Script Library deployment.
- Each consuming spreadsheet must either:
  1. bind directly to the approved library HEAD/direct execution model, or
  2. define local host wrapper functions that call the library namespace.

## Host wrapper template, if wrappers are used
```javascript
function onOpen(e) {
  GrayShadeLibrary.onOpen(e);
}

function syncCurrentSheetToHomeCareServices() {
  GrayShadeLibrary.syncCurrentSheetToHomeCareServices();
}

function pullUpdatesToCurrentSheet() {
  GrayShadeLibrary.pullUpdatesToCurrentSheet();
}

function createNewSheetFromMaster() {
  GrayShadeLibrary.createNewSheetFromMaster();
}

function createOnEditTrigger_() {
  GrayShadeLibrary.createOnEditTrigger_();
}
```

## Manual install verification
- Confirm the library identifier and version/HEAD reference are attached to the host spreadsheet.
- Open the spreadsheet and verify the `Gray Shading` menu appears.
- Run `Create onEdit trigger` once from the menu.
- Confirm exactly one expected edit trigger exists after setup.
````

Lines [52 - 57]:
```javascript
// Operational assumption: this script is deployed only for files in the restricted
// folder authorized to sync with the configured Home Care Services log.
const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
```
Issue: The inline comment correctly documents the restricted-folder assumption, and no data-security change is needed. The remaining improvement is administrative: this assumption should also be mirrored in the deployment README so future copies of the library are not installed against the wrong master spreadsheet or an unapproved folder.
Fix:
```markdown
## Master log routing
- `TARGET_FILE_ID` intentionally points to the approved Home Care Services master spreadsheet.
- Do not change this ID unless a replacement master spreadsheet has been approved.
- Do not clone this script into unrelated folders without updating deployment documentation.
- The hardcoded ID is accepted for this restricted-folder workflow.
```

Lines [394 - 411]:
```javascript
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Gray Shading')
    .addItem('Apply (current sheet)', 'applyGrayShadingCurrentSheet_')
    .addItem('Apply (all sheets)', 'applyGrayShadingAllSheets_')
    .addSeparator()
    .addItem('Push Sync to Service Log (Current Sheet)', 'syncCurrentSheetToHomeCareServices')
    .addItem('Pull Updates to Current Sheet', 'pullUpdatesToCurrentSheet')
    .addItem('Create New Sheet from Master', 'createNewSheetFromMaster')
    .addSeparator()
    .addItem('Organize Tabs by Date', 'sortSheetsByB4DateDescending_')
    .addItem('Rename Drive File (B5 + Date)', 'renameDriveFileFromB5AndTab')
    .addItem('Remove "Copy of" (all sheets)', 'removeCopyOfPrefixAllSheets')
    .addSeparator()
    .addItem('Create onEdit trigger', 'createOnEditTrigger_')
    .addToUi();
}
```
Issue: The local callback mapping is accepted and no code change is intended. The remaining action is deployment verification: when the code is consumed as a library, the host spreadsheet must expose matching callback names or call this menu builder through a host `onOpen(e)` wrapper. This is an installation requirement, not a runtime algorithm bug.
Fix:
```javascript
// Host spreadsheet wrapper, only needed when the library is not directly bound.
function onOpen(e) {
  GrayShadeLibrary.onOpen(e);
}

function applyGrayShadingCurrentSheet_() {
  GrayShadeLibrary.applyGrayShadingCurrentSheet_();
}

function applyGrayShadingAllSheets_() {
  GrayShadeLibrary.applyGrayShadingAllSheets_();
}

function syncCurrentSheetToHomeCareServices() {
  GrayShadeLibrary.syncCurrentSheetToHomeCareServices();
}

function pullUpdatesToCurrentSheet() {
  GrayShadeLibrary.pullUpdatesToCurrentSheet();
}

function createNewSheetFromMaster() {
  GrayShadeLibrary.createNewSheetFromMaster();
}

function createOnEditTrigger_() {
  GrayShadeLibrary.createOnEditTrigger_();
}
```

Lines [437 - 444]:
```javascript
function createOnEditTrigger_() {
  const ss = SpreadsheetApp.getActive();
  ScriptApp.getProjectTriggers()
    .filter(t => ['installedOnEdit', 'onEdit'].includes(t.getHandlerFunction()))
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('installedOnEdit').forSpreadsheet(ss).onEdit().create();
  ss.toast('Background sync triggers successfully mapped!');
}
```
Issue: The broad trigger cleanup behavior is an **Approved Operational Exception** and no code change is intended. The remaining improvement is documentation: because this script intentionally owns edit-trigger configuration for the workbook project, maintainers need a checklist warning that unrelated installable `onEdit` handlers will be removed by this setup helper.
Fix:
```markdown
## Trigger ownership
- This project owns workbook edit-trigger configuration.
- Running `createOnEditTrigger_()` removes existing `installedOnEdit` and `onEdit` installable handlers before creating the approved trigger.
- Do not add unrelated installable edit triggers to the same Apps Script project unless this ownership policy is changed.
- After setup, verify only the approved `installedOnEdit` trigger remains.
```

Context:
Language/Environment: Google Apps Script (V8 Engine).
Purpose: A two-way sync, tab organization, and UI automation tool for a small team managing health care service logs.
