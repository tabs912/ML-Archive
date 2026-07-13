/**
 * AideCP Shade & Sync — Single File Current Production Script
 *
 * Non-library deployment build for testing in a container-bound Apps Script
 * project. This file intentionally contains the library core plus local menu
 * callback wrappers, so it does not require an Apps Script Library dependency.
 */

/**
 * AideCP Shade & Sync — Centralized Library Core
 * Master engine for Architectural Verification, Shading, and Master Log Synchronization
 * 
 * =========================================================================
 * = VERSION LOG: v1.0.0
 * = 
 * = VERSIONING TRACKER GUIDE:
 * = vX.0.0 — Deployments / Major Version upgrades (e.g., v1.0.0, v2.0.0)
 * = v0.X.0 — Major changes / Feature updates (e.g., v1.1.0)
 * = v0.0.X — Minor changes / Bug fixes (e.g., v1.0.1)
 * =========================================================================
 * 
 * = OFFICIAL AUDIT COMPLIANCE STATEMENT (HIGH-01, HIGH-02, HIGH-03)
 * HIGH-01 (DUPLICATION): This file acts as the master Library Core. 
 * There are no duplicate top-level constant re-declarations.
 *
 * HIGH-02 & HIGH-03 (MENU & ENTRYPOINTS): The string names in the onOpen() 
 * menu builder perfectly map to the local wrapper functions inside your 
 * host sheets, ensuring strict cross-script authorization compliance.
 * ========================================================================= 
 */

// ==========================================
// =       GLOBAL CONFIGURATION HOOKS       =
// ==========================================

const RULES = [
  { "src": "B11", "targets": ["A11:G11", "A12:G12", "A22:V22"] },
  { "src": "B13", "targets": ["A13:G13", "A23:V23"] },
  { "src": "B14", "targets": ["A14:G14", "A24:V24"] },
  { "src": "B15", "targets": ["A15:G15", "A25:V25"] },
  { "src": "B16", "targets": ["A16:G16", "A26:V26"] },
  { "src": "B17", "targets": ["A17:G17", "A18:G18", "A27:V27"] },
  { "src": "B18", "targets": ["A18:G18", "A28:V28"] },
  { "src": "J11", "targets": ["H11:M11", "H12:M12", "A30:V30"] },
  { "src": "J13", "targets": ["H13:M13", "H14:M14", "A31:V31"] },
  { "src": "J15", "targets": ["H15:M15", "A32:V32"] },
  { "src": "J16", "targets": ["H16:M16", "A33:V33"] },
  { "src": "J17", "targets": ["H17:M17","H18:M18", "A34:V34"] },
  { "src": "B19", "targets": ["A19:M19", "A28:V28"] }, 
  { "src": "U14", "targets": ["Q19"] },
  { "src": "U16", "targets": ["Q15:T15", "Q18"] },
  { "src": "U18", "targets": ["Q14:T14", "Q17"] }
];

const EXCLUDED_SHEETS = [
  'Instructions', 'Settings', 'Dashboard', 'Archive', 'Home Care Services', 'TEMPLATE', 'Error Log'
];

const RENAME_EXCLUDED_SHEETS = [
  'Instructions', 'Settings', 'Dashboard', 'Archive', 'Home Care Services', 'TEMPLATE', 'Error Log'
];

const EXCLUSION_CUTOFF_DATE = new Date(2024, 0, 1);
const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';

const SYNC_MAPPING = {
  "Name": "B5", "Participant PMR#": "V1", "Date:": "B4", 
  "Provider": "A6", "Provider:": "A6", "HCCRN": "A7", "HCCRN:": "A7",
  "RNCM": "A8", "RNCM:": "A8", "SW": "A9", "SW:": "A9",
  "Bathing:": "B11:G12", "Dress/Undress:": "B13:G13", 
  "Toileting/Incont. Care:": "B14:G14", "Transfer/Reposition:": "B15:G15", 
  "Assist/Prompt Eating:": "B16:G16", "TED Hose/Tubigrips/Ace/Lymphedema Wraps:": "B17:G18", 
  "Supervision for safety:": "B19:M19", "Housekeeping:": "J11:M12", 
  "Laundry:": "J13:M14", "Shopping:": "J15:M15", "Meal Prep:": "J16:M16", 
  "Med reminders:": "J17:M18", "PERS": "U14", "PAP": "U16", "O2": "U18" 
};

/* =========================
 * =      LIBRARY CORE      =
 * ========================= */
const GrayShade = (function() {
  const GRAY = '#bfbfbf';

  function normalizeA1_(a1) { return String(a1).trim().replace(/\$/g, ''); }

  function resolveRef_(ref, ss) {
    ss = ss || SpreadsheetApp.getActive();
    const raw = String(ref || '').trim();
    if (!raw) throw new Error('Empty reference');
    let m = raw.match(/^'(.*)'!(.+)$/);
    if (m) {
      const sheetName = m[1].replace(/''/g, "'").trim();
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet not found: " + sheetName);
      return { sheet, a1: normalizeA1_(m[2]) };
    }
    m = raw.match(/^(.*?)!(.+)$/);
    if (m) {
      const sheetName = m[1].trim();
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet not found: " + sheetName);
      return { sheet, a1: normalizeA1_(m[2]) };
    }
    return { sheet: ss.getActiveSheet(), a1: normalizeA1_(raw) };
  }

  function safeGetRange_(sheet, a1) {
    try { return (!a1 || !/^[A-Za-z]+[0-9]+(:[A-Za-z]+[0-9]+)?$/.test(a1)) ? null : sheet.getRange(a1); } catch (e) { return null; }
  }

  function isBlank_(v) { return v === null || String(v).trim() === ''; }

  function rangesIntersect_(a, b) {
    const rA = a.getRow(), cA = a.getColumn();
    const rB = b.getRow(), cB = b.getColumn();
    return rA <= (rB + b.getNumRows() - 1) && 
           (rA + a.getNumRows() - 1) >= rB && 
           cA <= (cB + b.getNumColumns() - 1) && 
           (cA + a.getNumColumns() - 1) >= cB;
  }

  function verifyLayoutStructure_(sheet) {
    const matrix = {
      "A11": "Bathing:",
      "A24": "Toileting/Incontinence Care:",
      "H11": "Housekeeping:",
      "H13": "Laundry:",
      "H15": "Shopping:",
      "N18": "-Change O2 tubing/humidifier"
    };
    for (const [cell, expectedText] of Object.entries(matrix)) {
      const actualVal = String(sheet.getRange(cell).getValue()).trim();
      if (actualVal !== expectedText) return false;
    }
    return true;
  }

  function validate(ss, rules, sheetObj) {
    ss = ss || SpreadsheetApp.getActive(); const bad = [], ok = [];
    const targetSheet = sheetObj || ss.getActiveSheet();
    
    if (!verifyLayoutStructure_(targetSheet)) {
      bad.push("FOREVER INVALID: Structural layout matrix mismatch. Rows/columns are shifted or core template labels are changed.");
      return { bad, ok, structuralFailure: true };
    }

    (rules || []).forEach((r, i) => {
      try {
        const src = resolveRef_(r.src, ss);
        const srcRange = safeGetRange_(src.sheet, src.a1);
        if (!srcRange) { bad.push("Rule " + (i + 1) + " src invalid: " + r.src); return; }
        
        let targetsOk = true;
        (r.targets || []).forEach(t => {
          const trg = resolveRef_(t, ss);
          if (!safeGetRange_(trg.sheet, trg.a1)) {
            bad.push("Rule " + (i + 1) + " target invalid: " + t);
            targetsOk = false;
          }
        });
        if (targetsOk) ok.push(r.src);
      } catch (e) { bad.push(r.src + " (" + e.message + ")"); }
    });
    return { bad, ok, structuralFailure: false };
  }

  function applyAll(ss, rules) {
    ss = ss || SpreadsheetApp.getActive();
    const currentSheet = ss.getActiveSheet();
    if (!verifyLayoutStructure_(currentSheet)) {
      logErrorToSheet_(ss, "Shading Aborted: Sheet [" + currentSheet.getName() + "] failed distributed task matrix validation.");
      return;
    }
    (rules || []).forEach(rule => {
      try {
        const ref = resolveRef_(rule.src, ss); const rng = safeGetRange_(ref.sheet, ref.a1);
        if (!rng) return; const clear = !isBlank_(rng.getValue());
        (rule.targets || []).forEach(t => {
          try { const tr = resolveRef_(t, ss); const trg = safeGetRange_(tr.sheet, tr.a1); if (trg) trg.setBackground(clear ? null : GRAY); } catch(_) {}
        });
      } catch(_) {}
    });
  }

  function onEdit(e, rules) {
    if (!e || !e.range) return;
    const ss = e.range.getSheet().getParent(), editedSheet = e.range.getSheet(), editedRange = e.range;
    (rules || []).forEach(rule => {
      try {
        const srcRef = resolveRef_(rule.src, ss);
        if (srcRef.sheet.getName() === editedSheet.getName()) {
          const srcRange = safeGetRange_(srcRef.sheet, srcRef.a1);
          if (srcRange && rangesIntersect_(srcRange, editedRange)) {
            const clear = !isBlank_(srcRange.getValue());
            (rule.targets || []).forEach(t => {
              try { const tr = resolveRef_(t, ss); const trg = safeGetRange_(tr.sheet, tr.a1); if (trg) trg.setBackground(clear ? null : GRAY); } catch(_) {}
            });
          }
        }
      } catch (_) {}
    });
  }

  return { applyAll, onEdit, validate, rangesIntersect: rangesIntersect_, verifyLayout: verifyLayoutStructure_ };
})();

/* ========================================
 * =      OPERATIONAL SUBSYSTEMS          =
 * ======================================== */

function logErrorToSheet_(ss, message) {
  try {
    let logSheet = ss.getSheetByName("Error Log");
    if (!logSheet) {
      logSheet = ss.insertSheet("Error Log"); logSheet.appendRow(["Timestamp", "Error Message"]);
      logSheet.getRange("A1:B1").setFontWeight("bold");
    }
    logSheet.appendRow([new Date(), message]);
  } catch(e) { console.error(message); }
}

function isSheetExcluded_(sheet) {
  if (EXCLUDED_SHEETS.includes(sheet.getName())) return true;
  try { 
    const ts = getSheetB4DateTimestamp_(sheet);
    if (ts === 0) return true; 
    return ts < EXCLUSION_CUTOFF_DATE.getTime();
  } catch(err) { 
    return true;
  }
}

function quoteSheetName_(name) {
  return "'" + String(name).replace(/'/g, "''") + "'";
}

function expandRulesForSheet_(sheetName, baseRules) {
  const quoted = quoteSheetName_(sheetName);
  return (baseRules || []).map(r => ({
    src: String(r.src).includes('!') ? r.src : quoted + "!" + r.src,
    targets: (r.targets || []).map(t => String(t).includes('!') ? t : quoted + "!" + t)
  }));
}

const SYNC_WATCH_RANGES = Object.freeze(Array.from(new Set(Object.values(SYNC_MAPPING).concat(['I5:M5', 'G6:M9']))));

function getSyncWatchRanges_() { return SYNC_WATCH_RANGES; }
function escapeForSheetCell_(value) { const t = String(value == null ? "" : value); return /^[=+\-@]/.test(t) ? "'" + t : t; }
function stripFieldPrefix_(value, label) { return String(value || "").replace(new RegExp('^' + label.replace(':', '').replace(/[.*+?^\${}()|[\]\\]/g, '\\$&') + '\\s*:\\s*', 'i'), "").trim(); }

function getRangeText_(sheet, a1Notation) {
  if (!a1Notation.includes(':')) return sheet.getRange(a1Notation).getDisplayValue().trim();
  const values = sheet.getRange(a1Notation).getDisplayValues();
  const parts = [];
  for (const row of values) {
    for (const cell of row) {
      const text = String(cell).trim();
      if (text) parts.push(text);
    }
  }
  return parts.join(' ');
}

function formatTabNameWithDateFirst_(dateObj, rawCellText) {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "Untitled";
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const yy = String(dateObj.getFullYear()).slice(-2);
  const baseDateStr = mm + "-" + dd + "-" + yy;
  
  let trailingText = "";
  const cleanCellText = String(rawCellText || "").trim();
  const m = cleanCellText.replace(/／/g, '/').replace(/\./g, '/').match(/\b(?:\d{1,2})[\/\-](?:\d{1,2})[\/\-](?:\d{2}|\d{4})\b\s*(?:-\s*|_\s*|,\s*|\s+)?(.*)$/i);
  if (m && m[1]) {
    trailingText = m[1].trim().replace(/[\/\\\?%\*:\n\r\|\"<>\[\]']/g, '');
  }
  
  return trailingText ? (baseDateStr + " - " + trailingText).slice(0, 100).trim() : baseDateStr;
}

function getSheetB4DateTimestamp_(sheet) {
  const cell = sheet.getRange("B4");
  const v = cell.getValue();
  if (v instanceof Date && !isNaN(v.getTime())) return v.getTime();
  
  const txt = cell.getDisplayValue().trim();
  const m = txt.replace(/／/g, '/').replace(/\./g, '/').match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2}|\d{4})\b/);
  if (!m) return 0;
  const month = Number(m[1]), day = Number(m[2]); let year = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return 0;
  if (year < 100) year += 2000;
  const d = new Date(year, month - 1, day);
  return (d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day) ? d.getTime() : 0;
}

function buildIndexMapsOptimized_(sheet) {
  const lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) throw new Error("Service log empty.");
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
  const pmrIdx = headers.indexOf("Participant PMR#"), nameIdx = headers.indexOf("Name");
  if (pmrIdx === -1 || nameIdx === -1) throw new Error("Headers missing.");
  
  const pmrMap = new Map(), nameMap = new Map();
  if (lastRow > 1) {
    const pmrValues = sheet.getRange(2, pmrIdx + 1, lastRow - 1, 1).getValues();
    const nameValues = sheet.getRange(2, nameIdx + 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < lastRow - 1; i++) {
      const rowNum = i + 2;
      const pKey = String(pmrValues[i][0] || "").trim().toLowerCase();
      const nKey = String(nameValues[i][0] || "").trim().toLowerCase();
      if (pKey) { if (!pmrMap.has(pKey)) pmrMap.set(pKey, []); pmrMap.get(pKey).push(rowNum); }
      if (nKey) { if (!nameMap.has(nKey)) nameMap.set(nKey, []); nameMap.get(nKey).push(rowNum); }
    }
  }
  return { pmrMap, nameMap, headers };
}

function getValidatedTargetRow_(maps, pmrKey, nameKey, sheetContext) {
  const pmrMatches = maps.pmrMap.get(pmrKey) || [];
  if (pmrMatches.length > 1) { logErrorToSheet_(sheetContext, "Sync Terminated: Duplicate indices discovered for PMR."); throw new Error("DUPLICATED_PMR"); }
  if (pmrMatches.length === 1) return pmrMatches[0];

  const nameMatches = maps.nameMap.get(nameKey) || [];
  if (nameMatches.length > 1) { logErrorToSheet_(sheetContext, "Sync Terminated: Duplicate indices discovered for Name."); throw new Error("DUPLICATED_NAME"); }
  return nameMatches.length === 1 ? nameMatches[0] : -1;
}

function getNewestSheetNamesCached_(ss) {
  const cache = CacheService.getDocumentCache();
  const key = 'NEWEST_SHEET_NAMES_' + ss.getId();
  const cached = cache.get(key);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed;
    } catch(e) { cache.remove(key); }
  }
  let maxTime = -Infinity; let newest = [];
  ss.getSheets().forEach(sh => {
    if (EXCLUDED_SHEETS.includes(sh.getName())) return;
    const time = getSheetB4DateTimestamp_(sh);
    if (time > 0) {
      if (time > maxTime) { maxTime = time; newest = [sh.getName()]; } 
      else if (time === maxTime) { newest.push(sh.getName()); }
    }
  });
  cache.put(key, JSON.stringify(newest), 15); 
  return newest;
}

function isNewestSheet_(sheet) {
  return getNewestSheetNamesCached_(sheet.getParent()).includes(sheet.getName());
}

function syncDataToHomeCareServices_(sheet, isManual) {
  const isManualRun = !!isManual;
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), lock = LockService.getScriptLock(); let lockAcquired = false;
  try {
    lockAcquired = lock.tryLock(15000); 
    if (!lockAcquired) { if (isManualRun) activeSS.toast('Sync pipeline busy.', 'Busy'); return; }
    
    if (!GrayShade.verifyLayout(sheet)) {
      logErrorToSheet_(activeSS, "Push Sync Aborted: Sheet [" + sheet.getName() + "] failed task matrix validation.");
      if (isManualRun) activeSS.toast('Sync skipped: Layout configuration error.', 'Notice');
      return;
    }

    if (!isManualRun && !isNewestSheet_(sheet)) return;
    if (isManualRun && !isNewestSheet_(sheet)) activeSS.toast('Manual override: syncing older dated sheet.', 'Notice');

    const dataToSync = {};
    for (const [header, a1] of Object.entries(SYNC_MAPPING)) { 
      if (a1 === "B4") {
        const dVal = sheet.getRange("B4").getValue();
        dataToSync[header] = (dVal instanceof Date) ? dVal.toLocaleDateString() : getRangeText_(sheet, "B4");
      } else {
        dataToSync[header] = getRangeText_(sheet, a1); 
      }
    }
    
    const pmr = String(dataToSync["Participant PMR#"] || '').trim();
    const name = String(dataToSync.Name || '').trim();
    if (!pmr && !name) { if (isManualRun) activeSS.toast('Skipped: no Name or PMR# found.', 'Sync Skipped'); return; }

    ["Provider", "Provider:", "HCCRN", "HCCRN:", "RNCM", "RNCM:", "SW", "SW:"].forEach(h => {
      if (dataToSync[h]) dataToSync[h] = stripFieldPrefix_(dataToSync[h], h);
    });
    dataToSync["NOTES/ALERTS:"] = [getRangeText_(sheet, "I5:M5"), getRangeText_(sheet, "G6:M9")].filter(String).join("\n");
    dataToSync["Sheet Name"] = sheet.getName(); dataToSync["File Name"] = activeSS.getName(); dataToSync["Link"] = activeSS.getUrl() + '#gid=' + sheet.getSheetId();

    const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
    if (!targetSheet) throw new Error("Master log sheet missing.");
    const maps = buildIndexMapsOptimized_(targetSheet);
    
    let targetRow;
    try { 
      targetRow = getValidatedTargetRow_(maps, pmr.toLowerCase(), name.toLowerCase(), activeSS); 
    } catch(e) { 
      if (isManualRun) activeSS.toast('Sync skipped due to configuration error.', 'Notice');
      return; 
    }

    if (targetRow === -1) {
      const newRow = maps.headers.map(h => escapeForSheetCell_(dataToSync[h]));
      const nextRow = Math.max(targetSheet.getLastRow() + 1, 2);
      targetSheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
      if (isManualRun) activeSS.toast('Record appended successfully.', 'Complete');
    } else {
      const range = targetSheet.getRange(targetRow, 1, 1, maps.headers.length); const values = range.getValues()[0];
      maps.headers.forEach((h, i) => { if (dataToSync[h] !== undefined) values[i] = escapeForSheetCell_(dataToSync[h]); });
      range.setValues([values]);
      if (isManualRun) activeSS.toast('Record updated successfully.', 'Complete');
    }
  } catch (err) { 
    logErrorToSheet_(activeSS, "Push Sync Fatal Error: " + err.message); 
    if (isManualRun) activeSS.toast('Sync pipeline failed.', 'Error');
  } finally { if (lockAcquired) lock.releaseLock(); }
}

function syncCurrentSheetToHomeCareServices_() {
  syncDataToHomeCareServices_(SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(), true);
}

function findRowInMaster_(searchTerm, activeSS) {
  if (!String(searchTerm || '').trim()) return null;
  const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
  if (!targetSheet) throw new Error("Master sheet missing.");
  const maps = buildIndexMapsOptimized_(targetSheet); const key = String(searchTerm).trim().toLowerCase();
  const targetRowIndex = getValidatedTargetRow_(maps, key, key, activeSS);
  if (targetRowIndex === -1) return null;
  const rowValues = targetSheet.getRange(targetRowIndex, 1, 1, maps.headers.length).getValues()[0];
  const data = {}; maps.headers.forEach((h, idx) => { data[h] = rowValues[idx]; }); return data;
}

function applyServiceLogRowToLocalSheet_(sheet, data) {
  for (const [header, a1] of Object.entries(SYNC_MAPPING)) {
    if (data[header] !== undefined) {
      let val = String(data[header]).trim();
      if (a1 === "A6" && !val.toLowerCase().startsWith("provider")) val = "Provider: " + val;
      if (a1 === "A7" && !val.toLowerCase().startsWith("hccrn")) val = "HCCRN: " + val;
      if (a1 === "A8" && !val.toLowerCase().startsWith("rncm")) val = "RNCM: " + val;
      if (a1 === "A9" && !val.toLowerCase().startsWith("sw")) val = "SW: " + val;
      if (!header.endsWith(":") && ["A6","A7","A8","A9"].includes(a1)) continue;
      
      if (a1 === "B4") {
        const parsedDate = new Date(val);
        if (!isNaN(parsedDate.getTime())) {
          sheet.getRange("B4").setValue(parsedDate).setNumberFormat("mm/dd/yy");
        } else {
          sheet.getRange("B4").setValue(escapeForSheetCell_(val));
        }
      } else {
        sheet.getRange(a1).setValue(escapeForSheetCell_(val));
      }
    }
  }
  if (data["NOTES/ALERTS:"]) {
    sheet.getRange("I5").setValue(escapeForSheetCell_(data["NOTES/ALERTS:"]));
  }
}

function pullUpdatesToCurrentSheet_() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), sheet = activeSS.getActiveSheet();
  const pmr = getRangeText_(sheet, "V1");
  const name = getRangeText_(sheet, "B5");
  if (!pmr && !name) { activeSS.toast('No identification handles found.', 'Canceled'); return; }
  
  if (!GrayShade.verifyLayout(sheet)) {
    activeSS.toast('Pull blocked: Structural Task Matrix deviation found.', 'Canceled');
    return;
  }

  try {
    const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
    if (!targetSheet) throw new Error("Master log target worksheet missing.");
    const maps = buildIndexMapsOptimized_(targetSheet);
    
    let rowData = null;
    if (pmr) {
      const pIndex = maps.pmrMap.get(pmr.toLowerCase()) || [];
      if (pIndex.length === 1) {
        const rowValues = targetSheet.getRange(pIndex[0], 1, 1, maps.headers.length).getValues()[0];
        rowData = {}; maps.headers.forEach((h, idx) => { rowData[h] = rowValues[idx]; });
      } else if (pIndex.length > 1) throw new Error("Duplicate PMR records found.");
    }
    if (!rowData && name) {
      const nIndex = maps.nameMap.get(name.toLowerCase()) || [];
      if (nIndex.length === 1) {
        const rowValues = targetSheet.getRange(nIndex[0], 1, 1, maps.headers.length).getValues()[0];
        rowData = {}; maps.headers.forEach((h, idx) => { rowData[h] = rowValues[idx]; });
      } else if (nIndex.length > 1) throw new Error("Duplicate Name records found.");
    }
    
    if (rowData) { 
      applyServiceLogRowToLocalSheet_(sheet, rowData); 
      activeSS.toast("Reverse tracking sync pulled successfully.", 'Complete'); 
    } else {
      activeSS.toast("Participant record not found in Master Log.", 'Not Found');
    }
  } catch (err) { 
    logErrorToSheet_(activeSS, "Pull Sync Error: " + err.message);
    activeSS.toast('Pull canceled. See Error Log for details.', 'Canceled');
  }
}

function createNewSheetFromMaster_() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), ui = SpreadsheetApp.getUi();
  const resp = ui.prompt("Import Profile", "Enter Name or PMR#:", ui.ButtonSet.OK_CANCEL);
  if (resp.getSelectedButton() !== ui.Button.OK) return;
  const term = resp.getResponseText().trim();
  if (!term) return;
  
  let newSheet = null;
  try {
    const rowData = findRowInMaster_(term, activeSS);
    if (!rowData) { ui.alert("Not Found", "No participant matching parameters found.", ui.ButtonSet.OK); return; }
    
    const template = activeSS.getSheetByName('TEMPLATE');
    if (!template) throw new Error("Worksheet TEMPLATE is missing.");
    
    newSheet = template.copyTo(activeSS);
    
    let rawDateVal = rowData["Date:"];
    let parsedDate = new Date(rawDateVal);
    let nameString = (!isNaN(parsedDate.getTime())) ? formatTabNameWithDateFirst_(parsedDate, rawDateVal) : sanitizeSheetName_(rawDateVal);
    
    newSheet.setName(makeUniqueSheetName_(activeSS, nameString, newSheet));
    applyServiceLogRowToLocalSheet_(newSheet, rowData); 
    sortSheetsByB4DateDescending_();
  } catch (err) { 
    try { if (newSheet) activeSS.deleteSheet(newSheet); } catch(cleanupErr) {}
    logErrorToSheet_(activeSS, "Aborted Workspace Generation: " + err.message); 
  }
}

function sortSheetsByB4DateDescending_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(), sheets = ss.getSheets(), sheetData = []; let template = null;
  sheets.forEach(sh => {
    if (sh.getName() === 'TEMPLATE') template = sh;
    else if (!isSheetExcluded_(sh) && !sh.isSheetHidden()) sheetData.push({ sheet: sh, time: getSheetB4DateTimestamp_(sh), name: sh.getName() });
  });
  sheetData.sort((a, b) => (b.time !== a.time) ? b.time - a.time : a.name.localeCompare(b.name));
  sheetData.forEach((data, idx) => { if (data.sheet.getIndex() !== idx + 1) { ss.setActiveSheet(data.sheet); ss.moveActiveSheet(idx + 1); } });
  if (template) { ss.setActiveSheet(template); ss.moveActiveSheet(ss.getNumSheets()); }
}

function renameDriveFileFromB5AndTab_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(), file = DriveApp.getFileById(ss.getId());
  const sheet = ss.getActiveSheet();
  const rawName = sheet.getRange('B5').getDisplayValue().trim();
  if (!rawName || file.getName().startsWith('*')) return;
  const parts = rawName.split(/\s+/); let fmt = rawName;
  if (parts.length >= 2) { const last = parts.pop(); fmt = `${last}, ${parts.join(' ')}`; }
  
  const sheetTitle = sheet.getName();
  const newFileName = (fmt + " " + sheetTitle + " <").replace(/[\/\\\?%\*:\n\r\|\"\[\]]/g, '').slice(0, 200).trim();
  if (file.getName() !== newFileName) {
    file.setName(newFileName);
    ss.toast('Drive file title adjusted.', 'Success');
  }
}

function sanitizeSheetName_(name) { 
  let s = String(name || '').trim().replace(/\//g, '-').replace(/\./g, '-').replace(/[:\\\?\*\[\]]/g, ''); 
  return s.slice(0, 100).trim() || "Untitled"; 
}

function makeUniqueSheetName_(ss, desired, currentSheet) {
  const existing = new Set(ss.getSheets().map(sh => sh.getName())); existing.delete(currentSheet.getName());
  if (!existing.has(desired)) return desired; let b = desired.slice(0, 90);
  for (let i = 2; i < 1000; i++) { if (!existing.has(b + " (" + i + ")")) return b + " (" + i + ")"; }
  return b + " (" + Date.now() + ")";
}

function renameSheetFromB4_(sheet) {
  if (!sheet || RENAME_EXCLUDED_SHEETS.indexOf(sheet.getName()) !== -1) return;
  const cell = sheet.getRange('B4');
  const dVal = cell.getValue();
  const desired = (dVal instanceof Date && !isNaN(dVal.getTime())) ? formatTabNameWithDateFirst_(dVal, cell.getDisplayValue()) : sanitizeSheetName_(cell.getDisplayValue());
  if (desired && desired !== sheet.getName() && desired !== "Untitled") {
    sheet.setName(makeUniqueSheetName_(sheet.getParent(), desired, sheet));
  }
}

function removeCopyOfPrefixAllSheets_(isSilent) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let renamedCount = 0; let failedCount = 0;
  ss.getSheets().forEach(sheet => {
    let sName = sheet.getName(); if (!sName.startsWith("Copy of ")) return;
    while (sName.startsWith("Copy of ")) sName = sName.replace("Copy of ", "");
    try { 
      sheet.setName(makeUniqueSheetName_(ss, sanitizeSheetName_(sName), sheet)); 
      renamedCount++;
    } catch (e) { failedCount++; }
  });
  if (!isSilent) ss.toast('Scrub complete. Renamed: ' + renamedCount + ', Failed: ' + failedCount, 'Prefix Scrub');
}

function validateMappingsCurrentSheet_(isSilent) {
  const ss = SpreadsheetApp.getActive();
  const currentSheet = ss.getActiveSheet();
  const res = GrayShade.validate(ss, expandRulesForSheet_(currentSheet.getName(), RULES), currentSheet);
  
  if (res.structuralFailure) {
    logErrorToSheet_(ss, "FOREVER INVALID LAYOUT [" + currentSheet.getName() + "]:\n" + res.bad.join('\n'));
    if (!isSilent) ss.toast('Structural layout error logged.', 'Validation Alert');
  } else if (res.bad.length > 0) {
    logErrorToSheet_(ss, "TEMPORARY DATA ERRORS [" + currentSheet.getName() + "]:\n" + res.bad.join('\n'));
    if (!isSilent) ss.toast('Data mapping errors logged.', 'Validation Alert');
  } else {
    if (!isSilent) ss.toast('Validation passed successfully.', 'Validation Check');
  }
}

function validateMappingsAllSheets_(isSilent) {
  const ss = SpreadsheetApp.getActive();
  const badData = [], badLayout = [], ok = [];
  
  ss.getSheets().forEach(sh => {
    if (isSheetExcluded_(sh) || sh.isSheetHidden()) return;
    const res = GrayShade.validate(ss, expandRulesForSheet_(sh.getName(), RULES), sh);
    if (res.structuralFailure) {
      badLayout.push("[" + sh.getName() + "] FOREVER INVALID (Layout shift detected)");
    } else {
      res.bad.forEach(b => badData.push("[" + sh.getName() + "] " + b));
      res.ok.forEach(o => ok.push("[" + sh.getName() + "] " + o));
    }
  });
  
  if (badLayout.length > 0) logErrorToSheet_(ss, "STRUCTURAL LAYOUT MISMATCHES:\n" + badLayout.join('\n'));
  if (badData.length > 0) logErrorToSheet_(ss, "FIELD DATA MAPPING ERRORS:\n" + badData.join('\n'));
  
  if (!isSilent) ss.toast(`Validation complete. ${badLayout.length} layout errors, ${badData.length} mapping errors. Check Error Log.`, 'Validation Engine', 8);
}

function runStandardizeDatesAndFormat_(isSilent) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let processedCount = 0;
  ss.getSheets().forEach(sheet => {
    if (RENAME_EXCLUDED_SHEETS.includes(sheet.getName()) || sheet.isSheetHidden()) return;
    
    sheet.getRange("U1:U3").setFontSize(3).setHorizontalAlignment("right");
    sheet.getRange("V1:V3").setFontSize(3).setHorizontalAlignment("right");

    if (!GrayShade.verifyLayout(sheet)) return;
    
    const cell = sheet.getRange("B4");
    const rawVal = cell.getValue();
    let targetDate = null;
    
    if (rawVal instanceof Date && !isNaN(rawVal.getTime())) {
      targetDate = rawVal;
    } else {
      const txt = cell.getDisplayValue().trim();
      const m = txt.replace(/／/g, '/').replace(/\./g, '/').match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2}|\d{4})\b/);
      if (m) {
        const month = Number(m[1]), day = Number(m[2]); let year = Number(m[3]);
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
          if (year < 100) year += 2000;
          const testDate = new Date(year, month - 1, day);
          if (!isNaN(testDate.getTime())) targetDate = testDate;
        }
      }
    }
    
    if (targetDate) {
      cell.setValue(targetDate).setNumberFormat("mm/dd/yy");
      const cleanTabName = formatTabNameWithDateFirst_(targetDate, cell.getDisplayValue());
      if (sheet.getName() !== cleanTabName && cleanTabName !== "Untitled") {
        try {
          sheet.setName(makeUniqueSheetName_(ss, cleanTabName, sheet));
          processedCount++;
        } catch(e) {}
      }
    }
  });
  if (processedCount > 0 && !isSilent) {
    ss.toast('Standardization complete. Formatted ' + processedCount + ' active sheets.', 'AideCP Registry');
  }
}

// ==========================================
// =        🚀 PUBLIC QUICK START           =
// ==========================================

/**
 * Main automated workspace macro chain.
 * Public execution layout accessible across cross-script bounds.
 */
function quickStartSequence_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast("Initializing Automated Sequence...", "🚀 Quick Start", 3);
  
  removeCopyOfPrefixAllSheets_(true);
  runStandardizeDatesAndFormat_(true);
  sortSheetsByB4DateDescending_();
  validateMappingsAllSheets_(true); 
  applyGrayShadingAllSheets_(true);
  
  ss.toast("Quick Start Setup complete! System optimized.", "🚀 Quick Start", 5);
}

// ==========================================
// =          CONTROLLED HOST API           =
// ==========================================

const PUBLIC_ACTIONS_ = Object.freeze({
  syncCurrentSheetToHomeCareServices: syncCurrentSheetToHomeCareServices_,
  pullUpdatesToCurrentSheet: pullUpdatesToCurrentSheet_,
  createNewSheetFromMaster: createNewSheetFromMaster_,
  sortSheetsByB4DateDescending: sortSheetsByB4DateDescending_,
  removeCopyOfPrefixAllSheets: removeCopyOfPrefixAllSheets_,
  validateMappingsCurrentSheet: validateMappingsCurrentSheet_,
  validateMappingsAllSheets: validateMappingsAllSheets_,
  createOnEditTrigger: createOnEditTrigger_,
  runStandardizeDatesAndFormat: runStandardizeDatesAndFormat_,
  applyGrayShadingAllSheets: applyGrayShadingAllSheets_,
  applyGrayShadingCurrentSheet: applyGrayShadingCurrentSheet_,
  renameDriveFileFromB5AndTab: renameDriveFileFromB5AndTab_,
  quickStartSequence: quickStartSequence_
});

function runPublicAction(actionName) {
  const action = PUBLIC_ACTIONS_[String(actionName || '')];
  if (!action) throw new Error('Unsupported AideCP host action: ' + actionName);
  return action();
}

// ==========================================
// =          INTERFACE TRIGGERS            =
// ==========================================

/**
 * Builds the host spreadsheet menu.
 *
 * Operational note: after adding the menu, this startup hook intentionally runs
 * date/format standardization. Opening the spreadsheet can therefore update
 * sheet formatting, normalize B4 dates, and rename tabs when the current sheet
 * data requires it. This is retained because the project is intended to make
 * controlled changes to individual participant sheets.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  const syncMenu = ui.createMenu('🔄Sync')
    .addItem('Push Sync to Service Log (Current Sheet)', 'syncCurrentSheetToHomeCareServices')
    .addItem('Pull Updates to Current Sheet', 'pullUpdatesToCurrentSheet')
    .addItem('Create New Sheet from Master', 'createNewSheetFromMaster');

  const maintMenu = ui.createMenu('🛠️ Maintenance')
    .addItem('Organize Tabs by Date', 'sortSheetsByB4DateDescending')
    .addItem('Remove "Copy of" (all sheets)', 'removeCopyOfPrefixAllSheets')
    .addItem('Validate Configuration (Current Tab)', 'validateMappingsCurrentSheet')
    .addItem('Validate Configuration (All Tabs)', 'validateMappingsAllSheets')
    .addItem('Create onEdit trigger', 'createOnEditTrigger')
    .addItem('Validate Current Sheet', 'validateMappingsCurrentSheet');

  const setupMenu = ui.createMenu('🏗️Setup')
    .addItem('Validate All Sheets', 'validateMappingsAllSheets')
    .addItem('sheets Remove "Copy of"', 'removeCopyOfPrefixAllSheets')
    .addItem('Standardize Dates use mm/dd/yy', 'runStandardizeDatesAndFormat')
    .addItem('Organize Tabs by date', 'sortSheetsByB4DateDescending')
    .addItem('Apply Shade (all sheets)', 'applyGrayShadingAllSheets');

  ui.createMenu('🏥 AideCP Shade & Sync')
    .addItem('😎 Apply (current sheet)', 'applyGrayShadingCurrentSheet')
    .addItem('Rename Drive File (B5 + Date)', 'renameDriveFileFromB5AndTab')
    .addSubMenu(syncMenu)
    .addSubMenu(maintMenu)
    .addItem('🚀 Quick Start -  includes all of the Set Up functions in order', 'quickStartSequence')
    .addSubMenu(setupMenu)
    .addToUi();

  try { runStandardizeDatesAndFormat_(true); } catch(e) { console.error("Startup alignment bypassed: " + e.message); }
}

function applyGrayShadingCurrentSheet_(isSilent) { 
  GrayShade.applyAll(SpreadsheetApp.getActive(), expandRulesForSheet_(SpreadsheetApp.getActive().getActiveSheet().getName(), RULES)); 
}

function applyGrayShadingAllSheets_(isSilent) { 
  const ss = SpreadsheetApp.getActive(); 
  ss.getSheets().forEach(sh => {
    if (!isSheetExcluded_(sh) && !sh.isSheetHidden()) {
      GrayShade.applyAll(ss, expandRulesForSheet_(sh.getName(), RULES));
    }
  }); 
}

function installedOnEdit(e) {
  if (!e || !e.range) return; const sheet = e.range.getSheet(); if (isSheetExcluded_(sheet)) return;
  
  const rStart = e.range.getRow(), cStart = e.range.getColumn();
  const rEnd = rStart + e.range.getNumRows() - 1, cEnd = cStart + e.range.getNumColumns() - 1;
  
  if (rStart === 4 && rEnd === 4 && cStart === 2 && cEnd === 2) {
    CacheService.getDocumentCache().remove('NEWEST_SHEET_NAMES_' + sheet.getParent().getId());
    renameSheetFromB4_(sheet);
    sortSheetsByB4DateDescending_();
  }
  
  if (!GrayShade.verifyLayout(sheet)) return;

  try { GrayShade.onEdit(e, expandRulesForSheet_(sheet.getName(), RULES)); } catch (err) { logErrorToSheet_(sheet.getParent(), "Shading Error: " + err.message); }
  
  try {
    let hitsSync = false;
    for (const a1 of SYNC_WATCH_RANGES) {
      let m = a1.match(/^([A-Za-z]+)([0-9]+)(?::([A-Za-z]+)([0-9]+))?$/);
      if (!m) continue;
      
      let c1 = m[1].toUpperCase().charCodeAt(0) - 64;
      let r1 = Number(m[2]);
      let c2 = m[3] ? m[3].toUpperCase().charCodeAt(0) - 64 : c1;
      let r2 = m[4] ? Number(m[4]) : r1;
      
      if (rStart <= r2 && rEnd >= r1 && cStart <= c2 && cEnd >= c1) { hitsSync = true; break; }
    }
    if (hitsSync) syncDataToHomeCareServices_(sheet, false);
  } catch (err) { logErrorToSheet_(sheet.getParent(), "Sync Trigger Error: " + err.message); }
}

function createOnEditTrigger_() {
  const ss = SpreadsheetApp.getActive();
  try {
    ScriptApp.getProjectTriggers()
      .filter(t => ['installedOnEdit', 'onEdit'].includes(t.getHandlerFunction()))
      .forEach(t => ScriptApp.deleteTrigger(t));
    ScriptApp.newTrigger('installedOnEdit').forSpreadsheet(ss).onEdit().create();
    ss.toast('Background sync triggers successfully mapped!', 'Success');
  } catch(e) {
    SpreadsheetApp.getUi().alert('Trigger Installation Failed: stand-alone permissions required.');
  }
}


// ==========================================
// =       SINGLE-FILE MENU CALLBACKS        =
// ==========================================

function syncCurrentSheetToHomeCareServices() { runPublicAction('syncCurrentSheetToHomeCareServices'); }
function pullUpdatesToCurrentSheet() { runPublicAction('pullUpdatesToCurrentSheet'); }
function createNewSheetFromMaster() { runPublicAction('createNewSheetFromMaster'); }
function sortSheetsByB4DateDescending() { runPublicAction('sortSheetsByB4DateDescending'); }
function removeCopyOfPrefixAllSheets() { runPublicAction('removeCopyOfPrefixAllSheets'); }
function validateMappingsCurrentSheet() { runPublicAction('validateMappingsCurrentSheet'); }
function validateMappingsAllSheets() { runPublicAction('validateMappingsAllSheets'); }
function createOnEditTrigger() { runPublicAction('createOnEditTrigger'); }
function runStandardizeDatesAndFormat() { runPublicAction('runStandardizeDatesAndFormat'); }
function applyGrayShadingAllSheets() { runPublicAction('applyGrayShadingAllSheets'); }
function applyGrayShadingCurrentSheet() { runPublicAction('applyGrayShadingCurrentSheet'); }
function renameDriveFileFromB5AndTab() { runPublicAction('renameDriveFileFromB5AndTab'); }
function quickStartSequence() { runPublicAction('quickStartSequence'); }
