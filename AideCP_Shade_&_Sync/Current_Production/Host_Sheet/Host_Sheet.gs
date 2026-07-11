/**
 * HOST SHEET WRAPPER
 * Connects the local spreadsheet to the Centralized AideCP Shade & Sync Library
 */

function onOpen(e) { AideCPShadeSync.onOpen(e); }

// *** REQUIRED FIX: Routes background cell edits to the library ***
function installedOnEdit(e) { AideCPShadeSync.installedOnEdit(e); }

// --- Sync Functions ---
function syncCurrentSheetToHomeCareServices() { AideCPShadeSync.syncCurrentSheetToHomeCareServices(); }
function pullUpdatesToCurrentSheet() { AideCPShadeSync.pullUpdatesToCurrentSheet(); }
function createNewSheetFromMaster() { AideCPShadeSync.createNewSheetFromMaster(); }

// --- Maintenance Functions ---
function sortSheetsByB4DateDescending_() { AideCPShadeSync.sortSheetsByB4DateDescending_(); }
function removeCopyOfPrefixAllSheets() { AideCPShadeSync.removeCopyOfPrefixAllSheets(); }
function validateMappingsCurrentSheet_() { AideCPShadeSync.validateMappingsCurrentSheet_(); }
function validateMappingsAllSheets_() { AideCPShadeSync.validateMappingsAllSheets_(); }
function createOnEditTrigger_() { AideCPShadeSync.createOnEditTrigger_(); }

// --- Setup Functions ---
function quickStartSequence_() { AideCPShadeSync.quickStartSequence_(); }
function runStandardizeDatesAndFormat_() { AideCPShadeSync.runStandardizeDatesAndFormat_(); }
function applyGrayShadingAllSheets_() { AideCPShadeSync.applyGrayShadingAllSheets_(); }

// --- Root Menu Functions ---
function applyGrayShadingCurrentSheet_() { AideCPShadeSync.applyGrayShadingCurrentSheet_(); }
function renameDriveFileFromB5AndTab() { AideCPShadeSync.renameDriveFileFromB5AndTab(); }
