/**
 * HOST SHEET WRAPPER
 * Connects the local spreadsheet to the Centralized AideCP Shade & Sync Library.
 *
 * Apps Script menus and installable triggers require host-project global
 * callback functions. To keep the library API small, menu callbacks route
 * through the library's single controlled dispatcher instead of exposing every
 * library implementation as a public library function.
 */

function onOpen(e) { AideCPShadeSync.onOpen(e); }
function installedOnEdit(e) { AideCPShadeSync.installedOnEdit(e); }

function runAideCpAction_(actionName) {
  return AideCPShadeSync.runPublicAction(actionName);
}

// --- Sync Functions ---
function syncCurrentSheetToHomeCareServices() { runAideCpAction_('syncCurrentSheetToHomeCareServices'); }
function pullUpdatesToCurrentSheet() { runAideCpAction_('pullUpdatesToCurrentSheet'); }
function createNewSheetFromMaster() { runAideCpAction_('createNewSheetFromMaster'); }

// --- Maintenance Functions ---
function sortSheetsByB4DateDescending() { runAideCpAction_('sortSheetsByB4DateDescending'); }
function sortSheetsByB4DateDescending_() { sortSheetsByB4DateDescending(); }
function removeCopyOfPrefixAllSheets() { runAideCpAction_('removeCopyOfPrefixAllSheets'); }
function validateMappingsCurrentSheet() { runAideCpAction_('validateMappingsCurrentSheet'); }
function validateMappingsCurrentSheet_() { validateMappingsCurrentSheet(); }
function validateMappingsAllSheets() { runAideCpAction_('validateMappingsAllSheets'); }
function validateMappingsAllSheets_() { validateMappingsAllSheets(); }
function createOnEditTrigger() { runAideCpAction_('createOnEditTrigger'); }
function createOnEditTrigger_() { createOnEditTrigger(); }

// --- Setup Functions ---
function quickStartSequence() { runAideCpAction_('quickStartSequence'); }
function quickStartSequence_() { quickStartSequence(); }
function runStandardizeDatesAndFormat() { runAideCpAction_('runStandardizeDatesAndFormat'); }
function runStandardizeDatesAndFormat_() { runStandardizeDatesAndFormat(); }
function applyGrayShadingAllSheets() { runAideCpAction_('applyGrayShadingAllSheets'); }
function applyGrayShadingAllSheets_() { applyGrayShadingAllSheets(); }

// --- Root Menu Functions ---
function applyGrayShadingCurrentSheet() { runAideCpAction_('applyGrayShadingCurrentSheet'); }
function applyGrayShadingCurrentSheet_() { applyGrayShadingCurrentSheet(); }
function renameDriveFileFromB5AndTab() { runAideCpAction_('renameDriveFileFromB5AndTab'); }
