# Independent Shading and Sync Audit

Executive Summary: The reviewed Google Apps Script is a useful small-team automation for independent gray shading and two-way Home Care Services synchronization, and the latest version fixes some prior risks such as unsafe lock release, reverse-sync formula escaping, and fail-closed service-log sheet lookup. The code is still not production-ready as pasted because the entire script is duplicated, menu callbacks are likely wired incorrectly for Apps Script library usage, edit-trigger sync coverage still misses many mapped cells, and participant matching can still fall back to ambiguous names. The hardcoded file ID is intentionally excluded from security concern per the restricted-folder operating assumption; remaining risks are correctness, API cost, silent failure, data integrity, and maintainability.

🚨 Critical / High Severity: Show-stoppers, security risks, or major logic flaws. (Include line numbers/references and specific remediation code).

1. **Show-stopper: the submitted script is duplicated in full.**
   * **Reference:** First pasted copy ends at `createOnEditTrigger_()`, then a second complete copy begins at the repeated `/** GrayShade + Two-Way Data Sync — Master Library */` header. Approximate source references: first copy ending near `createOnEditTrigger_`; repeated declarations immediately after.
   * **Finding:** Top-level constants such as `RULES`, `EXCLUDED_SHEETS`, `RENAME_EXCLUDED_SHEETS`, `EXCLUSION_CUTOFF_DATE`, `TARGET_FILE_ID`, and `SYNC_MAPPING` are redeclared in the same global scope.
   * **Impact:** Apps Script V8 / JavaScript will fail parsing with an error similar to `SyntaxError: Identifier 'RULES' has already been declared`.
   * **Recommendation:** Remove the duplicate second copy before deployment.

   ```javascript
   /**
    * GrayShade + Two-Way Data Sync — Master Library
    */
   var GrayShade = (function() {
     // exactly one core definition
   })();

   const RULES = [/* exactly one rules definition */];
   const EXCLUDED_SHEETS = [/* exactly one list */];
   const RENAME_EXCLUDED_SHEETS = [/* exactly one list */];
   const EXCLUSION_CUTOFF_DATE = new Date('2024-01-01');
   const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
   const SYNC_MAPPING = {/* exactly one mapping */};
   ```

2. **Likely broken Apps Script menu callbacks due to dotted library function names.**
   * **Reference:** `buildMenu()` uses callback names such as `GrayShadeLibrary.applyGrayShadingCurrentSheet_` and `GrayShadeLibrary.syncCurrentSheetToHomeCareServices`.
   * **Finding:** Apps Script custom menu callbacks are resolved as callable functions in the container-bound project. Dotted library namespace strings are fragile and commonly fail unless the bound spreadsheet exposes wrapper functions.
   * **Impact:** The custom menu may render, but users may receive function-not-found errors when selecting menu items.
   * **Recommendation:** If this code is deployed directly in the spreadsheet, use local callback names and add `onOpen`. If this code is a true library, put wrapper functions in the consuming spreadsheet project.

   ```javascript
   function onOpen(e) {
     buildMenu();
   }

   function buildMenu() {
     SpreadsheetApp.getUi()
       .createMenu('Gray Shading')
       .addItem('Apply (current sheet)', 'applyGrayShadingCurrentSheet_')
       .addItem('Apply (all sheets)', 'applyGrayShadingAllSheets_')
       .addSeparator()
       .addItem('Push Sync to Service Log (Current Sheet)', 'syncCurrentSheetToHomeCareServices')
       .addItem('Pull Updates to Current Sheet', 'pullUpdatesToCurrentSheet')
       .addItem('Create New Sheet from Master', 'createNewSheetFromMaster')
       .addSeparator()
       .addItem('Organize Tabs by Date', 'triggerManualOrganization')
       .addItem('Rename Drive File (B5 + Date)', 'renameDriveFileFromB5AndTab')
       .addItem('Remove "Copy of" (all sheets)', 'removeCopyOfPrefixAllSheets')
       .addSeparator()
       .addItem('Validate (current sheet)', 'validateMappingsCurrentSheet_')
       .addItem('Validate (all sheets)', 'validateMappingsAllSheets_')
       .addSeparator()
       .addItem('Create onEdit trigger', 'createOnEditTrigger_')
       .addToUi();
   }
   ```

3. **No `onOpen(e)` entrypoint exists in the pasted code.**
   * **Reference:** `buildMenu()` is defined, but no `onOpen` function calls it.
   * **Finding:** Apps Script will not automatically call `buildMenu()` unless `onOpen` or an external wrapper invokes it.
   * **Impact:** Manual sync, pull, create-from-master, validation, sorting, and trigger installation can be inaccessible to end users.
   * **Recommendation:** Add the `onOpen` shown above or, for a library deployment, add this to the bound spreadsheet:

   ```javascript
   function onOpen(e) {
     GrayShadeLibrary.buildMenu();
   }
   ```

4. **Ambiguous participant identity matching remains high risk.**
   * **Reference:** `syncDataToHomeCareServices_()` computes `rowIndexToUpdate = pmrMap.get(pmrKey) || nameMap.get(nameKey) || -1`; `pullUpdatesToCurrentSheet()` uses `findRowInMaster_(pmr) || findRowInMaster_(name)`.
   * **Finding:** PMR appears to be the durable identifier, but the code falls back to exact name matching.
   * **Impact:** Duplicate participant names can cause wrong-record updates or imports.
   * **Recommendation:** Require PMR for automatic push sync. If name fallback is operationally required, allow it only when exactly one matching row exists.

   ```javascript
   const pmr = String(dataToSync['Participant PMR#'] || '').trim();
   if (!pmr) {
     if (isManual) activeSS.toast('Skipped: PMR# is required for safe sync.', 'Sync Skipped');
     return;
   }
   const rowIndexToUpdate = pmrMap.get(pmr.toLowerCase()) || -1;
   ```

5. **Duplicate PMRs and duplicate names are still silently hidden.**
   * **Reference:** `buildRowIndexByColumn_()` uses `if (key && !map.has(key)) map.set(key, r + 1);`.
   * **Finding:** First matching row wins; later duplicate identities are ignored.
   * **Impact:** Duplicate PMRs should be a hard data-quality failure, and duplicate names should make name fallback ambiguous.
   * **Recommendation:** Build a map to arrays and fail when duplicates are detected.

   ```javascript
   function buildRowIndexesByColumn_(values, headers, headerName) {
     const idx = headers.indexOf(headerName);
     const map = new Map();
     if (idx === -1) return map;

     for (let r = 1; r < values.length; r++) {
       const key = String(values[r][idx] || '').trim().toLowerCase();
       if (!key) continue;
       if (!map.has(key)) map.set(key, []);
       map.get(key).push(r + 1);
     }
     return map;
   }

   function getUniqueRowIndexOrThrow_(indexMap, key, label) {
     const matches = indexMap.get(String(key || '').trim().toLowerCase()) || [];
     if (matches.length > 1) throw new Error(`Duplicate ${label} found in service log.`);
     return matches.length === 1 ? matches[0] : -1;
   }
   ```

6. **Edit-trigger sync coverage still misses edits inside mapped ranges.**
   * **Reference:** `installedOnEdit()` watches single cells in `syncTriggerCells`, including `B11`, `I5`, and `G6`.
   * **Finding:** Sync reads multi-cell ranges such as `B11:G12`, `J11:M12`, `I5:M5`, and `G6:M9`, but the trigger checks only single anchor cells.
   * **Impact:** Edits to `C11`, `G12`, `M5`, `H8`, or `M12` can change synced data without triggering sync.
   * **Recommendation:** Build watch ranges from `SYNC_MAPPING` plus notes ranges.

   ```javascript
   function getSyncWatchRanges_() {
     return Array.from(new Set(Object.values(SYNC_MAPPING).concat(['I5:M5', 'G6:M9'])));
   }

   function shouldSyncEdit_(sheet, editedRange) {
     return getSyncWatchRanges_().some(a1 => {
       const watched = sheet.getRange(a1);
       return GrayShade.rangesIntersect_(editedRange, watched);
     });
   }
   ```

7. **Manual sync error toast leaks raw exception messages.**
   * **Reference:** `syncDataToHomeCareServices_()` catch block: `activeSS.toast('Error: ' + err.message, 'Sync Failed');`.
   * **Finding:** The code improved by limiting the toast to manual sync only, but it still exposes internal exception text to the user.
   * **Impact:** Apps Script errors can reveal implementation details, sheet names, missing headers, or operational internals.
   * **Recommendation:** Log details server-side and show a generic user message.

   ```javascript
   } catch (err) {
     console.error('Sync Error', {
       message: err && err.message,
       stack: err && err.stack,
       sheetName: sheet && sheet.getName()
     });
     if (isManual) activeSS.toast('Sync failed. Please contact an administrator if this repeats.', 'Sync Failed');
   }
   ```

8. **Required header validation is only partial and not reused.**
   * **Reference:** `syncDataToHomeCareServices_()` validates `Participant PMR#` and `Name`, but `findRowInMaster_()` still reads `headers` and proceeds even if indexes are `-1`.
   * **Finding:** Reverse sync can search with missing identity headers and simply return no match or match only one available field.
   * **Impact:** Missing/malformed master headers cause inconsistent push vs. pull behavior.
   * **Recommendation:** Centralize `getRequiredHeaders_()` and use it in push and reverse sync.

   ```javascript
   function getRequiredHeaders_(sheet) {
     if (sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) {
       throw new Error('Service log is missing a header row.');
     }
     const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
       .map(h => String(h).trim());
     ['Participant PMR#', 'Name'].forEach(required => {
       if (!headers.includes(required)) throw new Error(`Missing required header: ${required}`);
     });
     return headers;
   }
   ```

9. **Script still performs full-sheet reads on the master log.**
   * **Reference:** `targetSheet.getDataRange().getValues()` in `syncDataToHomeCareServices_()` and `findRowInMaster_()`.
   * **Finding:** Full-sheet reads load every row and column even though lookup initially needs only headers, PMR, and Name.
   * **Impact:** Runtime and memory scale with entire service-log size; this can hit Apps Script limits as the log grows.
   * **Recommendation:** Read header row and identity columns first, then fetch only the matched row.

⚠️ Medium Severity: Performance bottlenecks, architectural issues, and missing edge cases. (Provide refactored code snippets).

1. **The hardcoded file ID is operationally acceptable but should be documented.**
   * **Reference:** `const TARGET_FILE_ID = '...'`.
   * **Note:** Per instruction, this is not considered a security issue. Still, document the restricted-folder assumption so future maintainers do not copy the script into another environment accidentally.

   ```javascript
   // Operational assumption: this script is deployed only for files in the restricted
   // folder authorized to sync with the configured Home Care Services log.
   const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
   ```

2. **`isSheetExcluded_()` can throw while evaluating whether to exclude a sheet.**
   * **Reference:** `isSheetExcluded_()` calls `getSheetB4DateTimestamp_(sheet)` without a guard.
   * **Risk:** A non-standard, protected, or malformed sheet can break broader workflows.

   ```javascript
   function isSheetExcluded_(sheet) {
     if (EXCLUDED_SHEETS.includes(sheet.getName())) return true;
     try {
       const ts = getSheetB4DateTimestamp_(sheet);
       return ts > 0 && ts < EXCLUSION_CUTOFF_DATE.getTime();
     } catch (err) {
       console.warn('Unable to evaluate sheet exclusion by date', {
         sheetName: sheet.getName(),
         message: err && err.message
       });
       return true;
     }
   }
   ```

3. **`CacheService` JSON parsing can fail silently into a trigger failure.**
   * **Reference:** `if (cached) return JSON.parse(cached);`.
   * **Risk:** Corrupted or old cache values can throw.

   ```javascript
   if (cached) {
     try {
       const parsed = JSON.parse(cached);
       if (Array.isArray(parsed)) return parsed;
     } catch (err) {
       cache.remove(key);
     }
   }
   ```

4. **Newest-sheet cache can be stale.**
   * **Reference:** `getNewestSheetNamesCached_()` caches for 60 seconds and invalidates only exact `B4` edits.
   * **Risk:** Sheet copy, delete, rename, import, or edits elsewhere in merged `B4:F4` can make the cached newest sheet incorrect.
   * **Recommendation:** For correctness-critical auto-sync, recompute or use a shorter TTL.

5. **`stripFieldPrefix_()` removes all digits and uses an unescaped dynamic regex.**
   * **Reference:** `.replace(/[0-9]/g, '')` and `new RegExp('^' + cleanLabel + ...)`.
   * **Risk:** Valid provider/staff names or credentials containing digits are corrupted.

   ```javascript
   function escapeRegExp_(text) {
     return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   }

   function stripFieldPrefix_(value, label) {
     const cleanLabel = String(label || '').replace(':', '');
     return String(value || '')
       .replace(new RegExp('^' + escapeRegExp_(cleanLabel) + '\\s*:\\s*', 'i'), '')
       .trim();
   }
   ```

6. **`parseStrictDate_()` should explicitly validate bounds before constructing a Date.**
   * **Reference:** `parseStrictDate_()` constructs `new Date(year, month - 1, day)` and relies on rollover checks.

   ```javascript
   if (month < 1 || month > 12 || day < 1 || day > 31) return null;
   ```

7. **`sortSheetsByB4DateDescending_()` sorts excluded and hidden sheets.**
   * **Reference:** `const sheets = ss.getSheets();`.
   * **Risk:** Control tabs such as `Instructions`, `Settings`, `Dashboard`, `Archive`, and `Home Care Services` may be moved.

   ```javascript
   const sheets = ss.getSheets().filter(sh => !isSheetExcluded_(sh) && !sh.isSheetHidden());
   ```

8. **Tab sorting is API-heavy.**
   * **Reference:** repeated `ss.setActiveSheet(data.sheet)` and `ss.moveActiveSheet(index + 1)`.
   * **Risk:** Slow/quota-heavy with many tabs.
   * **Recommendation:** Keep sorting manual-only or defer when sheet count exceeds a threshold.

9. **`createOnEditTrigger_()` leaves legacy `onEdit` triggers installed.**
   * **Reference:** filter only checks `installedOnEdit`.

   ```javascript
   ScriptApp.getProjectTriggers()
     .filter(t => ['installedOnEdit', 'onEdit'].includes(t.getHandlerFunction()))
     .forEach(t => ScriptApp.deleteTrigger(t));
   ```

10. **`createNewSheetFromMaster()` can leave partial copied sheets.**
    * **Reference:** `const newSheet = currentSheet.copyTo(activeSS);` occurs before subsequent write/rename/sort operations.
    * **Recommendation:** Wrap the flow in `try/catch`, track `newSheet`, and notify users if a partial sheet remains.

11. **`safeGetRange_()` silently swallows all range errors.**
    * **Reference:** catch block returns `null`.
    * **Recommendation:** Keep it for validation/best-effort shading, but use a strict variant for required sync ranges.

   ```javascript
   function getRequiredRange_(sheet, a1) {
     const range = safeGetRange_(sheet, a1);
     if (!range) throw new Error(`Invalid required range: ${sheet.getName()}!${a1}`);
     return range;
   }
   ```

12. **Independent shading bubble is useful but may mask sync failures.**
    * **Reference:** `installedOnEdit()` separates shading and sync into independent try/catch blocks.
    * **Risk:** This improves user experience, but sync failures only log to console during background triggers.
    * **Recommendation:** Consider a lightweight audit sheet or failure counter for repeated background sync errors.

💡 Low Severity / Nitpicks: Variable naming, formatting, styling, and minor DRY improvements.

1. `var GrayShade` can be `const GrayShade` unless `var` is required for Apps Script library exposure.
2. Publicly exported `rangesIntersect_` uses private-style naming; prefer `rangesIntersect` in the public API.
3. Use object shorthand in the returned API: `return { applyAll, onEdit, validate, rangesIntersect: rangesIntersect_ };`.
4. Replace `new Date().getTime()` with `Date.now()`.
5. Replace `rawName.split(' ')` with `rawName.split(/\s+/)`.
6. Sanitize Drive file names separately from sheet names before `file.setName(newFileName)`.
7. `removeCopyOfPrefixAllSheets()` should use `makeUniqueSheetName_()` to avoid duplicate tab-name failures.
8. `removeCopyOfPrefixAllSheets()` should report partial failures in its toast, not only log warnings.
9. `SYNC_MAPPING` duplicates personnel aliases such as `Provider` and `Provider:`; a field-alias structure would reduce special-case reverse-sync logic.
10. `getRangeText_()` uses `flat()`, which is acceptable for Apps Script V8 but should be noted if legacy runtime compatibility matters.
11. Validation message construction is duplicated between `validateMappingsCurrentSheet_()` and `validateMappingsAllSheets_()`.
12. The all-in-one script should be split into `GrayShadeCore.gs`, `Config.gs`, `DateHelpers.gs`, `ServiceLogPushSync.gs`, `ServiceLogReverseSync.gs`, `SheetOrganization.gs`, `RenameHelpers.gs`, `Menu.gs`, `Triggers.gs`, and `Validation.gs`.
13. Section comments explain what the code does; add comments explaining why business rules exist, especially newest-sheet sync gating.
14. No loose equality (`==`) issues were identified; strict equality is used consistently.
15. `let cleanText` in `parseStrictDate_()` can be `const cleanText`.
16. Avoid inline `// FIX:` comments in production code; convert them into durable rationale comments or move them to changelog/release notes.

Context:
Language/Framework: Google Apps Script / JavaScript using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.

Purpose of the Code: The script provides independent gray shading for care-plan/service rows and two-way synchronization between local participant sheets and a master Home Care Services spreadsheet. It also supports reverse sync, creating new sheets from master records, organizing tabs by date, renaming sheets/Drive files, validating mappings, building a custom menu, and installing an edit trigger.

Specific Areas of Concern: No concern with the hardcoded file ID because all files are in a restricted-access folder. Primary concerns are duplicated pasted code, Apps Script menu callback wiring, missing `onOpen`, ambiguous name fallback, duplicate PMR/name handling, incomplete edit-trigger range coverage, exception-message leakage, partial header validation, stale cache behavior, full-sheet API reads, and long-term maintainability of a monolithic all-in-one script.
