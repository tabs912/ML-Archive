# Independent Shading and Sync Audit v9

Lines [77 - 77]:
```javascript
const GrayShade = (function() {
```
Issue: In an Apps Script Library deployment, top-level `const` declarations are not reliably exposed as callable library members to host projects in the same way as global function declarations or `var` namespace objects. If host workbooks are expected to call `GrayShadeLibrary.GrayShade` or depend on the exported namespace, this can become a library visibility issue even though it is valid V8 JavaScript.
Fix:
```javascript
var GrayShade = (function() {
```

Lines [82 - 101]:
```javascript
function resolveRef_(ref, ss) {
  ss = ss || SpreadsheetApp.getActive();
  const raw = String(ref || '').trim();
  if (!raw) throw new Error('Empty reference');
  let m = raw.match(/^'(.*)'!(.+)$/);
```
Issue: `ss = ss || SpreadsheetApp.getActive()` introduces an Apps Script service call from a low-level parser helper whenever callers omit `ss`. In hot paths such as validation, shading, and edit-trigger handling, hidden calls to `SpreadsheetApp.getActive()` make API cost harder to reason about and can bind the helper to the wrong spreadsheet in library contexts.
Fix:
```javascript
function resolveRef_(ref, ss) {
  if (!ss) throw new Error('Spreadsheet context is required');
  const raw = String(ref || '').trim();
  if (!raw) throw new Error('Empty reference');
  let m = raw.match(/^'(.*)'!(.+)$/);
```

Lines [86 - 86]:
```javascript
let m = raw.match(/^'(.*)'!(.+)$/);
```
Issue: The quoted-sheet regex is greedy. A malformed reference with multiple quoted segments or exclamation points can over-capture more text than intended before the final `!`. This is a micro-level parsing edge case that can produce confusing sheet names.
Fix:
```javascript
let m = raw.match(/^'((?:[^']|'')*)'!(.+)$/);
```

Lines [103 - 105]:
```javascript
function safeGetRange_(sheet, a1) {
  try { return (!a1 || !/^[A-Za-z]+[0-9]+(:[A-Za-z]+[0-9]+)?$/.test(a1)) ? null : sheet.getRange(a1); } catch (e) { return null; }
}
```
Issue: This helper silently returns `null` for missing `sheet`, malformed A1 strings, protected range errors, and service failures. That is acceptable for best-effort visual shading, but unsafe for diagnostics because callers cannot distinguish invalid layout from transient API failure. It also recompiles the regex each invocation.
Fix:
```javascript
const STRICT_A1_RE = /^[A-Za-z]+[0-9]+(:[A-Za-z]+[0-9]+)?$/;

function safeGetRange_(sheet, a1) {
  if (!sheet || !a1 || !STRICT_A1_RE.test(a1)) return null;
  try {
    return sheet.getRange(a1);
  } catch (e) {
    return null;
  }
}

function requireRange_(sheet, a1) {
  if (!sheet) throw new Error('Sheet context is required for range ' + a1);
  if (!STRICT_A1_RE.test(String(a1 || ''))) throw new Error('Invalid A1 notation: ' + a1);
  return sheet.getRange(a1);
}
```

Lines [115 - 116]:
```javascript
const rA = a.getRow(), cA = a.getColumn();
const rB = b.getRow(), cB = b.getColumn();
```
Issue: `rangesIntersect_()` assumes both arguments are valid Range objects. If a caller passes `null` from `safeGetRange_()` or an uninitialized test double, this throws. Because the function is used in trigger logic, fail-fast validation produces clearer diagnostics.
Fix:
```javascript
function rangesIntersect_(a, b) {
  if (!a || !b) return false;
  const rA = a.getRow();
  const cA = a.getColumn();
  const rB = b.getRow();
  const cB = b.getColumn();
```

Lines [124 - 143]:
```javascript
function validate(ss, rules) {
  ss = ss || SpreadsheetApp.getActive(); const bad = [], ok = [];
  (rules || []).forEach((r, i) => {
```
Issue: This diagnostic helper mixes a hidden `SpreadsheetApp.getActive()` call with compressed declarations. It also uses `forEach`, which prevents clean `continue` flow and makes the validation path harder to short-circuit or profile. Since validation may run across every tab, explicit loops reduce callback overhead and improve readability.
Fix:
```javascript
function validate(ss, rules) {
  if (!ss) throw new Error('Spreadsheet context is required');
  const bad = [];
  const ok = [];
  for (let i = 0; i < (rules || []).length; i++) {
    const r = rules[i];
    try {
      const src = resolveRef_(r.src, ss);
      const srcRange = safeGetRange_(src.sheet, src.a1);
      if (!srcRange) {
        bad.push('Rule ' + (i + 1) + ' src invalid: ' + r.src);
        continue;
      }
      let targetsOk = true;
      for (const t of (r.targets || [])) {
        const trg = resolveRef_(t, ss);
        if (!safeGetRange_(trg.sheet, trg.a1)) {
          bad.push('Rule ' + (i + 1) + ' target invalid: ' + t);
          targetsOk = false;
        }
      }
      if (targetsOk) ok.push(r.src);
    } catch (e) {
      bad.push(String(r && r.src) + ' (' + (e && e.message ? e.message : e) + ')');
    }
  }
  return { bad, ok };
}
```

Lines [146 - 157]:
```javascript
function applyAll(ss, rules) {
  ss = ss || SpreadsheetApp.getActive();
  (rules || []).forEach(rule => {
```
Issue: `applyAll()` performs one `setBackground()` call per target range. On all-sheet runs this can become dozens or hundreds of separate Spreadsheet service writes. It also swallows all rule and target errors, making broken mappings invisible outside the validation menu.
Fix:
```javascript
function applyAll(ss, rules) {
  if (!ss) throw new Error('Spreadsheet context is required');
  for (const rule of (rules || [])) {
    try {
      const ref = resolveRef_(rule.src, ss);
      const rng = safeGetRange_(ref.sheet, ref.a1);
      if (!rng) continue;
      const background = isBlank_(rng.getValue()) ? GRAY : null;
      for (const t of (rule.targets || [])) {
        const tr = resolveRef_(t, ss);
        const trg = safeGetRange_(tr.sheet, tr.a1);
        if (trg) trg.setBackground(background);
      }
    } catch (err) {
      console.warn('Gray shading rule skipped', err && err.message ? err.message : err);
    }
  }
}
```

Lines [164 - 177]:
```javascript
if (srcRef.sheet.getName() === editedSheet.getName()) {
  const srcRange = safeGetRange_(srcRef.sheet, srcRef.a1);
```
Issue: Comparing sheets by name can produce false positives if references ever cross spreadsheet contexts or if a sheet is renamed during a trigger flow. Apps Script Sheet objects expose `getSheetId()`, which is a stronger identity check within the workbook.
Fix:
```javascript
if (srcRef.sheet.getSheetId() === editedSheet.getSheetId()) {
  const srcRange = safeGetRange_(srcRef.sheet, srcRef.a1);
```

Lines [181 - 181]:
```javascript
return { applyAll, onEdit, validate, rangesIntersect: rangesIntersect_ };
```
Issue: `rangesIntersect_` is not defined in this scope; the function declared above is named `rangesIntersect`. This is a runtime-blocking ReferenceError when the IIFE evaluates, preventing the `GrayShade` namespace from being created.
Fix:
```javascript
return { applyAll, onEdit, validate, rangesIntersect: rangesIntersect };
```

Lines [189 - 198]:
```javascript
function logErrorToSheet_(ss, message) {
  try {
    let logSheet = ss.getSheetByName("Error Log");
```
Issue: Every log call performs `getSheetByName()`, may perform `insertSheet()`, and then uses `appendRow()`. `appendRow()` is convenient but slower and less controllable than a direct `setValues()` write. Repeated errors in trigger paths can create many service calls.
Fix:
```javascript
function logErrorToSheet_(ss, message) {
  try {
    let logSheet = ss.getSheetByName('Error Log');
    if (!logSheet) {
      logSheet = ss.insertSheet('Error Log');
      logSheet.getRange(1, 1, 1, 2).setValues([['Timestamp', 'Error Message']]).setFontWeight('bold');
    }
    const nextRow = Math.max(logSheet.getLastRow() + 1, 2);
    logSheet.getRange(nextRow, 1, 1, 2).setValues([[new Date(), String(message || '')]]);
  } catch (e) {
    console.error(String(message || ''));
  }
}
```

Lines [201 - 209]:
```javascript
function isSheetExcluded_(sheet) {
  if (EXCLUDED_SHEETS.includes(sheet.getName())) return true;
```
Issue: `EXCLUDED_SHEETS.includes()` is an O(n) array scan and `sheet.getName()` is called more than once across related callers. This is small here, but it runs in hot trigger paths. A frozen `Set` avoids repeated scans.
Fix:
```javascript
const EXCLUDED_SHEET_SET = new Set(EXCLUDED_SHEETS);

function isSheetExcluded_(sheet) {
  const sheetName = sheet.getName();
  if (EXCLUDED_SHEET_SET.has(sheetName)) return true;
  try {
    const ts = getSheetB4DateTimestamp_(sheet);
    return ts === 0 || ts < EXCLUSION_CUTOFF_DATE.getTime();
  } catch (err) {
    return true;
  }
}
```

Lines [226 - 226]:
```javascript
const SYNC_WATCH_RANGES = Object.freeze(Array.from(new Set(Object.values(SYNC_MAPPING).concat(['I5:M5', 'G6:M9']))));
```
Issue: `Object.values().concat()` creates an intermediate array before `Set` creation. This is only evaluated once, but the watch list is later reparsed from A1 strings on every edit. The better optimization is to precompute numeric bounds once.
Fix:
```javascript
function columnToNumber_(letters) {
  let n = 0;
  for (const ch of String(letters).toUpperCase()) n = n * 26 + ch.charCodeAt(0) - 64;
  return n;
}

function a1Bounds_(a1) {
  const m = String(a1).match(/^([A-Za-z]+)([0-9]+)(?::([A-Za-z]+)([0-9]+))?$/);
  if (!m) throw new Error('Invalid watch range: ' + a1);
  const c1 = columnToNumber_(m[1]);
  const r1 = Number(m[2]);
  return {
    r1,
    c1,
    r2: m[4] ? Number(m[4]) : r1,
    c2: m[3] ? columnToNumber_(m[3]) : c1
  };
}

const SYNC_WATCH_RANGES = Object.freeze([...new Set([...Object.values(SYNC_MAPPING), 'I5:M5', 'G6:M9'])]);
const SYNC_WATCH_BOUNDS = Object.freeze(SYNC_WATCH_RANGES.map(a1Bounds_));
```

Lines [229 - 230]:
```javascript
function escapeForSheetCell_(value) { const t = String(value == null ? "" : value); return /^[=+\-@]/.test(t) ? "'" + t : t; }
function stripFieldPrefix_(value, label) { return String(value || "").replace(new RegExp('^' + label.replace(':', '').replace(/[.*+?^\${}()|[\]\\]/g, '\\$&') + '\\s*:\\s*', 'i'), "").trim(); }
```
Issue: Both helpers are dense one-liners. `stripFieldPrefix_()` rebuilds a dynamic regex for every field on every sync. Since labels are static, this can be made safer and cheaper with a small cache.
Fix:
```javascript
const FIELD_PREFIX_RE_CACHE = new Map();

function escapeForSheetCell_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function stripFieldPrefix_(value, label) {
  const cleanLabel = String(label || '').replace(':', '');
  if (!FIELD_PREFIX_RE_CACHE.has(cleanLabel)) {
    const escaped = cleanLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    FIELD_PREFIX_RE_CACHE.set(cleanLabel, new RegExp('^' + escaped + '\\s*:\\s*', 'i'));
  }
  return String(value || '').replace(FIELD_PREFIX_RE_CACHE.get(cleanLabel), '').trim();
}
```

Lines [232 - 242]:
```javascript
function getRangeText_(sheet, a1Notation) {
  if (!a1Notation.includes(':')) return sheet.getRange(a1Notation).getDisplayValue().trim();
```
Issue: This helper performs one Spreadsheet read per mapped field. `syncDataToHomeCareServices_()` calls it for every entry in `SYNC_MAPPING` plus notes, creating many remote reads per sync. The helper itself is fine for isolated reads, but the sync path should batch known form ranges where possible.
Fix:
```javascript
function getRangeText_(sheet, a1Notation) {
  const range = sheet.getRange(a1Notation);
  if (!a1Notation.includes(':')) return range.getDisplayValue().trim();
  const values = range.getDisplayValues();
  const parts = [];
  for (const row of values) {
    for (const cell of row) {
      const text = String(cell).trim();
      if (text) parts.push(text);
    }
  }
  return parts.join(' ');
}
```

Lines [245 - 249]:
```javascript
const m = String(text || "").replace(/／/g, '/').replace(/\./g, '/').match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2}|\d{4})\b/);
if (!m) return null; const month = Number(m[1]), day = Number(m[2]); let year = Number(m[3]);
```
Issue: The date parser performs multiple string allocations and keeps multiple statements on one line. The regex is recreated on each call, and two-digit years are always mapped to 2000+, which can silently convert `99` to 2099.
Fix:
```javascript
const STRICT_DATE_RE = /\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2}|\d{4})\b/;

function parseStrictDate_(text) {
  const normalized = String(text || '').replace(/[／.]/g, '/');
  const m = normalized.match(STRICT_DATE_RE);
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  let year = Number(m[3]);
  if (year < 100) year += 2000;
  if (year < 2000 || year > 2100) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const d = new Date(year, month - 1, day);
  return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day ? d : null;
}
```

Lines [252 - 254]:
```javascript
function getSheetB4DateTimestamp_(sheet) {
  const v = sheet.getRange("B4").getValue(); if (v instanceof Date && !isNaN(v.getTime())) return v.getTime();
```
Issue: This performs a `getValue()` call on `B4` and then, for non-Date values, a second call through `getRangeText_(B4:F4)`. On every sheet sort or newest-sheet calculation, that doubles reads for text dates.
Fix:
```javascript
function getSheetB4DateTimestamp_(sheet) {
  const displayText = getRangeText_(sheet, 'B4:F4');
  const parsed = parseStrictDate_(displayText);
  return parsed ? parsed.getTime() : 0;
}
```

Lines [257 - 270]:
```javascript
const lastRow = sheet.getLastRow(), lastCol = sheet.getLastColumn();
const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
```
Issue: `getLastRow()` and `getLastColumn()` are separate service calls, followed by separate reads for headers, PMR values, and Name values. The two narrow column reads are good for memory, but if PMR and Name are adjacent or close, a single bounded read can reduce service calls.
Fix:
```javascript
const lastRow = sheet.getLastRow();
const lastCol = sheet.getLastColumn();
if (lastRow < 1 || lastCol < 1) throw new Error('Service log empty.');
const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
const pmrIdx = headers.indexOf('Participant PMR#');
const nameIdx = headers.indexOf('Name');
if (pmrIdx === -1 || nameIdx === -1) throw new Error('Headers missing.');
const startCol = Math.min(pmrIdx, nameIdx) + 1;
const width = Math.abs(pmrIdx - nameIdx) + 1;
const identityData = lastRow > 1 ? sheet.getRange(2, startCol, lastRow - 1, width).getValues() : [];
```

Lines [289 - 296]:
```javascript
function getNewestSheetNamesCached_(ss) {
  const cache = CacheService.getDocumentCache();
```
Issue: The cache key only includes spreadsheet ID, so a stale value can remain valid after sheet renames, imports, or date edits until invalidation. The script removes the key on B4 edits, but not after sheet creation, deletion, or copy/import operations outside the trigger path.
Fix:
```javascript
function invalidateNewestSheetCache_(ss) {
  CacheService.getDocumentCache().remove('NEWEST_SHEET_NAMES_' + ss.getId());
}

// Call invalidateNewestSheetCache_(activeSS) after createNewSheetFromMaster(), renameSheetFromB4_(), and any administrative sheet-copy workflow.
```

Lines [309 - 309]:
```javascript
return getNewestSheetNamesCached_(sheet.getParent()).includes(sheet.getName());
```
Issue: If no dated sheets are found, this returns `false` for every sheet. In earlier logic, an empty newest list often meant no gating decision could be made and the script allowed operation. This stricter behavior can silently skip syncs when all date parsing fails.
Fix:
```javascript
function isNewestSheet_(sheet) {
  const newest = getNewestSheetNamesCached_(sheet.getParent());
  return newest.length === 0 || newest.includes(sheet.getName());
}
```

Lines [313 - 314]:
```javascript
const isManualRun = !!isManual;
const activeSS = SpreadsheetApp.getActiveSpreadsheet(), lock = LockService.getScriptLock(); let lockAcquired = false;
```
Issue: The lock is a script-wide lock, so one workbook can block syncs in another workbook when the library is shared. If collisions only need to be prevented per spreadsheet, a document lock is a better fit in a bound-container context; in a pure library context, this needs explicit deployment testing.
Fix:
```javascript
const isManualRun = Boolean(isManual);
const activeSS = sheet.getParent();
const lock = LockService.getDocumentLock() || LockService.getScriptLock();
let lockAcquired = false;
```

Lines [320 - 321]:
```javascript
if (!isManualRun && !isNewestSheet_(sheet)) return;
if (isManualRun && !isNewestSheet_(sheet)) activeSS.toast('Manual override: syncing older dated sheet.', 'Notice');
```
Issue: `isNewestSheet_(sheet)` is called twice for manual runs, causing duplicate cache/service work on a manual sync. Compute once.
Fix:
```javascript
const newestSheet = isNewestSheet_(sheet);
if (!isManualRun && !newestSheet) return;
if (isManualRun && !newestSheet) activeSS.toast('Manual override: syncing older dated sheet.', 'Notice');
```

Lines [323 - 324]:
```javascript
const dataToSync = {};
for (const [header, a1] of Object.entries(SYNC_MAPPING)) { dataToSync[header] = getRangeText_(sheet, a1); }
```
Issue: `Object.entries(SYNC_MAPPING)` allocates a new array on every sync, and `getRangeText_()` performs many individual Spreadsheet reads. This is the largest API-cost hotspot in the push path.
Fix:
```javascript
const SYNC_MAPPING_ENTRIES = Object.freeze(Object.entries(SYNC_MAPPING));

const dataToSync = {};
for (const [header, a1] of SYNC_MAPPING_ENTRIES) {
  dataToSync[header] = getRangeText_(sheet, a1);
}
```

Lines [332 - 332]:
```javascript
dataToSync["NOTES/ALERTS:"] = [getRangeText_(sheet, "I5:M5"), getRangeText_(sheet, "G6:M9")].filter(String).join("\n");
```
Issue: This creates an array and uses `.filter(String)` for only two elements. It also performs two additional range reads. The array allocation is minor, but this line runs in the sync hot path.
Fix:
```javascript
const noteTop = getRangeText_(sheet, 'I5:M5');
const noteBody = getRangeText_(sheet, 'G6:M9');
dataToSync['NOTES/ALERTS:'] = noteTop && noteBody ? noteTop + '\n' + noteBody : (noteTop || noteBody);
```

Lines [333 - 333]:
```javascript
dataToSync["Sheet Name"] = sheet.getName(); dataToSync["File Name"] = activeSS.getName(); dataToSync["Link"] = activeSS.getUrl() + '#gid=' + sheet.getSheetId();
```
Issue: Three metadata assignments are compressed into one line and include `activeSS.getUrl()`, which is an Apps Script service call. If the target sheet does not have a `Link` header, this call is unnecessary.
Fix:
```javascript
dataToSync['Sheet Name'] = sheet.getName();
dataToSync['File Name'] = activeSS.getName();
// Only compute URL if the master log has a Link column after headers are loaded.
```

Lines [335 - 337]:
```javascript
const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
if (!targetSheet) throw new Error("Master log sheet missing.");
const maps = buildIndexMapsOptimized_(targetSheet);
```
Issue: `SpreadsheetApp.openById()` is called separately in push, pull, and lookup flows. Within one execution, cache the target spreadsheet/sheet to avoid repeated open calls.
Fix:
```javascript
function getTargetSheet_() {
  const targetSS = SpreadsheetApp.openById(TARGET_FILE_ID);
  const targetSheet = targetSS.getSheetByName('Home Care Services');
  if (!targetSheet) throw new Error('Master log sheet missing.');
  return targetSheet;
}

const targetSheet = getTargetSheet_();
const maps = buildIndexMapsOptimized_(targetSheet);
if (maps.headers.includes('Link')) {
  dataToSync['Link'] = activeSS.getUrl() + '#gid=' + sheet.getSheetId();
}
```

Lines [350 - 352]:
```javascript
const newRow = maps.headers.map(h => escapeForSheetCell_(dataToSync[h]));
const nextRow = Math.max(targetSheet.getLastRow() + 1, 2);
targetSheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
```
Issue: `maps.headers.map()` converts missing fields to empty strings through `escapeForSheetCell_(undefined)`, which is safe, but no required-field check is visible at this write boundary. `targetSheet.getLastRow()` is another service call after `buildIndexMapsOptimized_()` already called it.
Fix:
```javascript
const requiredHeaders = ['Name', 'Participant PMR#'];
if (!requiredHeaders.some(h => String(dataToSync[h] || '').trim())) return;
const newRow = maps.headers.map(h => escapeForSheetCell_(dataToSync[h]));
const nextRow = Math.max(maps.lastRow + 1, 2);
targetSheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
```

Lines [355 - 357]:
```javascript
const range = targetSheet.getRange(targetRow, 1, 1, maps.headers.length); const values = range.getValues()[0];
maps.headers.forEach((h, i) => { if (dataToSync[h] !== undefined) values[i] = escapeForSheetCell_(dataToSync[h]); });
range.setValues([values]);
```
Issue: The first line combines range creation and read. The `forEach` callback adds overhead and hides mutation of `values`. A `for` loop is clearer for a row update hot path.
Fix:
```javascript
const range = targetSheet.getRange(targetRow, 1, 1, maps.headers.length);
const values = range.getValues()[0];
for (let i = 0; i < maps.headers.length; i++) {
  const header = maps.headers[i];
  if (Object.prototype.hasOwnProperty.call(dataToSync, header)) {
    values[i] = escapeForSheetCell_(dataToSync[header]);
  }
}
range.setValues([values]);
```

Lines [367 - 369]:
```javascript
function syncCurrentSheetToHomeCareServices() {
  syncDataToHomeCareServices_(SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(), true);
}
```
Issue: This chains two Apps Script calls and assumes the active spreadsheet is the intended host. In a library deployment, using `SpreadsheetApp.getActive()` consistently with menu context is safer and shorter.
Fix:
```javascript
function syncCurrentSheetToHomeCareServices() {
  const ss = SpreadsheetApp.getActive();
  syncDataToHomeCareServices_(ss.getActiveSheet(), true);
}
```

Lines [372 - 379]:
```javascript
const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName("Home Care Services");
if (!targetSheet) throw new Error("Master sheet missing.");
const maps = buildIndexMapsOptimized_(targetSheet); const key = String(searchTerm).trim().toLowerCase();
```
Issue: The target sheet is reopened and index maps are rebuilt for each lookup. Although `pullUpdatesToCurrentSheet()` avoids this path, `createNewSheetFromMaster()` still uses it. Split index lookup from target opening so callers can reuse maps.
Fix:
```javascript
function findRowInMasterWithMaps_(searchTerm, targetSheet, maps, activeSS) {
  const key = String(searchTerm || '').trim().toLowerCase();
  if (!key) return null;
  const targetRowIndex = getValidatedTargetRow_(maps, key, key, activeSS);
  if (targetRowIndex === -1) return null;
  const rowValues = targetSheet.getRange(targetRowIndex, 1, 1, maps.headers.length).getValues()[0];
  const data = {};
  for (let i = 0; i < maps.headers.length; i++) data[maps.headers[i]] = rowValues[i];
  return data;
}
```

Lines [384 - 400]:
```javascript
for (const [header, a1] of Object.entries(SYNC_MAPPING)) {
  if (data[header] !== undefined) {
```
Issue: `Object.entries(SYNC_MAPPING)` allocates every reverse application. Each field write uses `setValue()` individually, creating many Spreadsheet write calls. Since the target cells are non-contiguous this is not trivially batchable with `setValues()`, but the entries array should still be precomputed.
Fix:
```javascript
for (const [header, a1] of SYNC_MAPPING_ENTRIES) {
  if (Object.prototype.hasOwnProperty.call(data, header)) {
    // existing transformation and write logic
  }
}
```

Lines [388 - 391]:
```javascript
if (a1 === "A6" && !val.toLowerCase().startsWith("provider")) val = "Provider: " + val;
if (a1 === "A7" && !val.toLowerCase().startsWith("hccrn")) val = "HCCRN: " + val;
if (a1 === "A8" && !val.toLowerCase().startsWith("rncm")) val = "RNCM: " + val;
if (a1 === "A9" && !val.toLowerCase().startsWith("sw")) val = "SW: " + val;
```
Issue: `val.toLowerCase()` is recomputed up to four times per field. This is small but unnecessary in a loop.
Fix:
```javascript
const lowerVal = val.toLowerCase();
if (a1 === 'A6' && !lowerVal.startsWith('provider')) val = 'Provider: ' + val;
if (a1 === 'A7' && !lowerVal.startsWith('hccrn')) val = 'HCCRN: ' + val;
if (a1 === 'A8' && !lowerVal.startsWith('rncm')) val = 'RNCM: ' + val;
if (a1 === 'A9' && !lowerVal.startsWith('sw')) val = 'SW: ' + val;
```

Lines [394 - 395]:
```javascript
const targetCell = a1.includes(':') ? a1.split(':')[0] : a1;
sheet.getRange(targetCell).setValue(escapeForSheetCell_(val));
```
Issue: `a1.split(':')` allocates an array for every multi-cell mapping. Use `indexOf()` and `slice()` for this tiny hot helper.
Fix:
```javascript
const colon = a1.indexOf(':');
const targetCell = colon === -1 ? a1 : a1.slice(0, colon);
sheet.getRange(targetCell).setValue(escapeForSheetCell_(val));
```

Lines [405 - 446]:
```javascript
function pullUpdatesToCurrentSheet() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), sheet = activeSS.getActiveSheet();
```
Issue: The function manually duplicates row-to-object conversion logic for PMR and Name. This increases maintenance cost and risks asymmetrical fixes. It also uses separate `getRange()` reads after finding an index, which is unavoidable for the selected row but should be centralized.
Fix:
```javascript
function readMappedRow_(targetSheet, maps, rowIndex) {
  const rowValues = targetSheet.getRange(rowIndex, 1, 1, maps.headers.length).getValues()[0];
  const data = {};
  for (let i = 0; i < maps.headers.length; i++) data[maps.headers[i]] = rowValues[i];
  return data;
}
```

Lines [449 - 471]:
```javascript
function createNewSheetFromMaster() {
  const activeSS = SpreadsheetApp.getActiveSpreadsheet(), ui = SpreadsheetApp.getUi();
```
Issue: The copied TEMPLATE sheet is not activated before sorting. If downstream users expect the created workspace to be visible immediately, sorting may move it without selecting it. The cache of newest-sheet names is also not invalidated after creating a new dated sheet.
Fix:
```javascript
newSheet = template.copyTo(activeSS);
newSheet.setName(makeUniqueSheetName_(activeSS, sanitizeSheetName_(rowData['Date:'] || new Date().toISOString().split('T')[0]), newSheet));
applyServiceLogRowToLocalSheet_(newSheet, rowData);
invalidateNewestSheetCache_(activeSS);
activeSS.setActiveSheet(newSheet);
sortSheetsByB4DateDescending_();
```

Lines [474 - 482]:
```javascript
function sortSheetsByB4DateDescending_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(), sheets = ss.getSheets(), sheetData = []; let template = null;
```
Issue: This routine calls `isSheetExcluded_(sh)` and then `getSheetB4DateTimestamp_(sh)` again for included sheets, duplicating date reads. Sorting many sheets will therefore perform avoidable range reads.
Fix:
```javascript
function sortSheetsByB4DateDescending_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetData = [];
  let template = null;
  for (const sh of ss.getSheets()) {
    const name = sh.getName();
    if (name === 'TEMPLATE') {
      template = sh;
      continue;
    }
    if (EXCLUDED_SHEET_SET.has(name) || sh.isSheetHidden()) continue;
    const time = getSheetB4DateTimestamp_(sh);
    if (time > 0 && time >= EXCLUSION_CUTOFF_DATE.getTime()) sheetData.push({ sheet: sh, time, name });
  }
  // existing sort and move logic
}
```

Lines [494 - 494]:
```javascript
const newFileName = (fmt + " " + sheetTitle + "-").replace(/[\/\\\?%\*:\n\r\|\"<>]/g, '').slice(0, 200).trim();
```
Issue: In the pasted script, the regex appears split across a physical newline inside the character class. If that newline is present in the actual `.gs` source rather than only in prompt wrapping, it can create a syntax error or an unintended pattern.
Fix:
```javascript
const DRIVE_INVALID_NAME_RE = /[\/\\?%*:|"<>\r\n]/g;
const newFileName = (fmt + ' ' + sheetTitle + '-').replace(DRIVE_INVALID_NAME_RE, '').slice(0, 200).trim();
```

Lines [507 - 511]:
```javascript
const existing = new Set(ss.getSheets().map(sh => sh.getName())); existing.delete(currentSheet.getName());
if (!existing.has(desired)) return desired; let b = desired.slice(0, 90);
```
Issue: `ss.getSheets().map()` allocates an array before creating the `Set`, and multiple statements are compressed on one line. The fallback can exceed the 100-character sheet-name limit when `Date.now()` is appended to a 90-character base.
Fix:
```javascript
function makeUniqueSheetName_(ss, desired, currentSheet) {
  const existing = new Set();
  for (const sh of ss.getSheets()) existing.add(sh.getName());
  existing.delete(currentSheet.getName());
  if (!existing.has(desired)) return desired;
  const base = desired.slice(0, 90).trim();
  for (let i = 2; i < 1000; i++) {
    const candidate = (base + ' (' + i + ')').slice(0, 100);
    if (!existing.has(candidate)) return candidate;
  }
  return (base.slice(0, 84) + ' (' + Date.now() + ')').slice(0, 100);
}
```

Lines [514 - 517]:
```javascript
function renameSheetFromB4_(sheet) {
  if (!sheet || RENAME_EXCLUDED_SHEETS.indexOf(sheet.getName()) !== -1) return;
```
Issue: `RENAME_EXCLUDED_SHEETS.indexOf()` is an O(n) scan. This function can run in edit triggers, so use a `Set` and cache `sheet.getName()`.
Fix:
```javascript
const RENAME_EXCLUDED_SHEET_SET = new Set(RENAME_EXCLUDED_SHEETS);

function renameSheetFromB4_(sheet) {
  if (!sheet) return;
  const currentName = sheet.getName();
  if (RENAME_EXCLUDED_SHEET_SET.has(currentName)) return;
  const desired = sanitizeSheetName_(sheet.getRange('B4').getDisplayValue());
  if (desired !== currentName) sheet.setName(makeUniqueSheetName_(sheet.getParent(), desired, sheet));
}
```

Lines [520 - 531]:
```javascript
function removeCopyOfPrefixAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
```
Issue: This loops all sheets and calls `makeUniqueSheetName_()` for every renamed tab. `makeUniqueSheetName_()` itself calls `ss.getSheets()`, so multiple renamed sheets cause repeated full sheet-list reads.
Fix:
```javascript
function removeCopyOfPrefixAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const existing = new Set(sheets.map(sheet => sheet.getName()));
  let renamedCount = 0;
  let failedCount = 0;
  for (const sheet of sheets) {
    let sName = sheet.getName();
    if (!sName.startsWith('Copy of ')) continue;
    existing.delete(sName);
    while (sName.startsWith('Copy of ')) sName = sName.replace('Copy of ', '');
    const desired = sanitizeSheetName_(sName);
    let finalName = desired;
    for (let i = 2; existing.has(finalName) && i < 1000; i++) finalName = (desired.slice(0, 90) + ' (' + i + ')').slice(0, 100);
    try {
      sheet.setName(finalName);
      existing.add(finalName);
      renamedCount++;
    } catch (e) {
      failedCount++;
    }
  }
  ss.toast('Scrub complete. Renamed: ' + renamedCount + ', Failed: ' + failedCount, 'Prefix Scrub');
}
```

Lines [533 - 541]:
```javascript
function validateMappingsCurrentSheet_() {
  const ss = SpreadsheetApp.getActive();
```
Issue: `SpreadsheetApp.getUi()` is called at the end rather than cached, which is minor. The bigger issue is that validation messages can exceed UI alert limits despite slicing, and slicing can cut a line mid-message, making debugging harder.
Fix:
```javascript
const MAX_ALERT_CHARS = 30000;
function showValidationMessage_(msg) {
  SpreadsheetApp.getUi().alert(msg.length > MAX_ALERT_CHARS ? msg.slice(0, MAX_ALERT_CHARS - 80) + '\n...truncated...' : msg);
}
```

Lines [543 - 557]:
```javascript
function validateMappingsAllSheets_() {
  const ss = SpreadsheetApp.getActive();
```
Issue: This calls `isSheetExcluded_(sh)`, which reads B4 dates, then validates every mapping by calling `getRange()` repeatedly. That is expected for a manual diagnostic, but the routine should avoid date parsing side effects and use the same exclusion Set shortcut first.
Fix:
```javascript
for (const sh of ss.getSheets()) {
  const sheetName = sh.getName();
  if (EXCLUDED_SHEET_SET.has(sheetName) || sh.isSheetHidden()) continue;
  if (getSheetB4DateTimestamp_(sh) < EXCLUSION_CUTOFF_DATE.getTime()) continue;
  const res = GrayShade.validate(ss, expandRulesForSheet_(sheetName, RULES));
  // existing aggregation
}
```

Lines [584 - 590]:
```javascript
function applyGrayShadingCurrentSheet_() { GrayShade.applyAll(SpreadsheetApp.getActive(), expandRulesForSheet_(SpreadsheetApp.getActive().getActiveSheet().getName(), RULES)); }
function applyGrayShadingAllSheets_() { 
  const ss = SpreadsheetApp.getActive(); 
```
Issue: `applyGrayShadingCurrentSheet_()` calls `SpreadsheetApp.getActive()` twice in one line. It should cache the spreadsheet once, both for API hygiene and readability.
Fix:
```javascript
function applyGrayShadingCurrentSheet_() {
  const ss = SpreadsheetApp.getActive();
  const sheetName = ss.getActiveSheet().getName();
  GrayShade.applyAll(ss, expandRulesForSheet_(sheetName, RULES));
}
```

Lines [598 - 598]:
```javascript
if (!e || !e.range) return; const sheet = e.range.getSheet(); if (isSheetExcluded_(sheet)) return;
```
Issue: This combines guard, variable initialization, and exclusion checks on one line. `isSheetExcluded_(sheet)` can read B4, so every edit in every included candidate sheet incurs date parsing before checking whether the edit touches a relevant range.
Fix:
```javascript
if (!e || !e.range) return;
const editedRange = e.range;
const sheet = editedRange.getSheet();
if (EXCLUDED_SHEET_SET.has(sheet.getName())) return;
```

Lines [600 - 601]:
```javascript
const rStart = e.range.getRow(), cStart = e.range.getColumn();
const rEnd = rStart + e.range.getNumRows() - 1, cEnd = cStart + e.range.getNumColumns() - 1;
```
Issue: `e.range` is dereferenced repeatedly. Cache the range object once for cleaner trigger code.
Fix:
```javascript
const editedRange = e.range;
const rStart = editedRange.getRow();
const cStart = editedRange.getColumn();
const rEnd = rStart + editedRange.getNumRows() - 1;
const cEnd = cStart + editedRange.getNumColumns() - 1;
```

Lines [603 - 606]:
```javascript
if (rStart === 4 && rEnd === 4 && cStart <= 6 && cEnd >= 2) {
  CacheService.getDocumentCache().remove('NEWEST_SHEET_NAMES_' + sheet.getParent().getId());
  renameSheetFromB4_(sheet);
}
```
Issue: The cache invalidation call constructs a key inline and calls `sheet.getParent().getId()` in the trigger path. Centralize invalidation to avoid duplicated key construction and to make future sheet-copy invalidations consistent.
Fix:
```javascript
if (rStart === 4 && rEnd === 4 && cStart <= 6 && cEnd >= 2) {
  invalidateNewestSheetCache_(sheet.getParent());
  renameSheetFromB4_(sheet);
}
```

Lines [611 - 623]:
```javascript
for (const a1 of SYNC_WATCH_RANGES) {
  let m = a1.match(/^([A-Za-z]+)([0-9]+)(?::([A-Za-z]+)([0-9]+))?$/);
```
Issue: The trigger reparses every watch range with regex on every edit. This negates part of the benefit of precomputing `SYNC_WATCH_RANGES` and adds avoidable CPU overhead in the hottest function.
Fix:
```javascript
let hitsSync = false;
for (const bounds of SYNC_WATCH_BOUNDS) {
  if (rStart <= bounds.r2 && rEnd >= bounds.r1 && cStart <= bounds.c2 && cEnd >= bounds.c1) {
    hitsSync = true;
    break;
  }
}
```

Lines [628 - 640]:
```javascript
function createOnEditTrigger_() {
  const ss = SpreadsheetApp.getActive();
```
Issue: The catch block calls `SpreadsheetApp.getUi()` after a trigger-installation failure. If the failure occurs in a non-UI execution context, that alert can also fail. Cache the UI in menu-driven contexts or log fallback errors safely.
Fix:
```javascript
function createOnEditTrigger_() {
  const ss = SpreadsheetApp.getActive();
  try {
    ScriptApp.getProjectTriggers()
      .filter(t => ['installedOnEdit', 'onEdit'].includes(t.getHandlerFunction()))
      .forEach(t => ScriptApp.deleteTrigger(t));
    ScriptApp.newTrigger('installedOnEdit').forSpreadsheet(ss).onEdit().create();
    ss.toast('Background sync triggers successfully mapped!', 'Success');
  } catch (e) {
    logErrorToSheet_(ss, 'Trigger Installation Failed: ' + (e && e.message ? e.message : e));
    try {
      SpreadsheetApp.getUi().alert('Trigger Installation Failed: Please confirm authorization and deployment context.');
    } catch (uiErr) {
      console.error('Trigger Installation Failed', uiErr);
    }
  }
}
```

## Validated & Resolved (Artifact / Tooling Limitation)

Lines [5 - 16]: The monolithic audit-compilation comments and duplicate-declaration scanner warnings are treated as tooling artifacts when production files are deployed in the approved library/host structure. No execution-code action is included in the findings above.

Lines [641 - end of pasted prompt]: The prompt includes a second full copy of the same script. This is treated as a prompt/paste artifact for review purposes. If the duplicate block is present in the actual `.gs` file, remove it before deployment; otherwise no production-code finding is recorded here.

## Approved Operational Exception (No Change Intended)

Lines [282 - 286]: Name fallback after PMR lookup is accepted for the 100-150 participant operating model, with duplicate-name blocking retained. No algorithm change is requested.

Lines [628 - 636]: Project-level cleanup of `installedOnEdit` and `onEdit` handlers is accepted as the workbook trigger-ownership model. The required action is governance documentation, not code alteration.

Lines [52 - 53]: The hardcoded `TARGET_FILE_ID` is accepted for the restricted-folder workflow. The required action is external deployment documentation, not runtime indirection.
