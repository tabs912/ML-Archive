# Independent Shading and Sync Audit v2

Executive Summary: The reviewed Google Apps Script is materially improved from earlier drafts: lock release is now guarded, reverse-sync writes are escaped, missing master sheet handling no longer falls back to the first tab, and full sync-watch ranges are now derived from `SYNC_MAPPING`. The script is still not production-ready as pasted because the full source is duplicated, menu/library callback wiring remains deployment-fragile without a host `onOpen`/wrapper, duplicate identity rows can silently overwrite map entries, full-sheet reads remain expensive, and several error/logging paths can fail silently or retain sensitive operational details. The hardcoded file ID is excluded from security concern by requirement because files are in a restricted-access folder.

🚨 Critical / High Severity: Show-stoppers, security risks, or major logic flaws. (Include line numbers/references and specific remediation code).

1. **Show-stopper: the submitted code is duplicated in full.**
   * **Reference:** The first copy ends at `createOnEditTrigger_()`, then the source repeats from the opening `/** GrayShade + Two-Way Data Sync — Master Library */` comment. Approximate line range: first copy lines 1-690; second copy starts immediately afterward.
   * **Finding:** Global declarations (`var GrayShade`, `const RULES`, `const EXCLUDED_SHEETS`, `const TARGET_FILE_ID`, `const SYNC_MAPPING`, and many function declarations) are repeated.
   * **Impact:** Duplicate top-level `const` declarations cause parse-time failure in Apps Script V8. The script may not deploy or run at all.
   * **Recommendation:** Remove the duplicate second copy before any runtime testing.

   ```javascript
   // Keep exactly one global copy of each declaration.
   var GrayShade = (function() {
     // library core
   })();

   const RULES = [/* one definition */];
   const EXCLUDED_SHEETS = [/* one definition */];
   const RENAME_EXCLUDED_SHEETS = [/* one definition */];
   const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
   const SYNC_MAPPING = {/* one definition */};
   ```

2. **Menu callback wiring remains fragile and no `onOpen(e)` host entrypoint is provided.**
   * **Reference:** `buildMenu()` callback strings use `GrayShadeLibrary.applyGrayShadingCurrentSheet_`, `GrayShadeLibrary.syncCurrentSheetToHomeCareServices`, etc.; no local `onOpen(e)` appears in the submitted code.
   * **Finding:** The code comment says callback wiring uses `GrayShadeLibrary.*` because it builds from the library context, but Apps Script menu item handlers are normally resolved in the container-bound project. A library can build the menu, but the clicked function must still be resolvable in the bound project context or through wrappers.
   * **Impact:** The menu can render but fail when a user clicks an item. If no host `onOpen` calls `buildMenu()`, the menu may not render at all.
   * **Recommendation:** Add host wrappers in every spreadsheet using the library, or remove the namespace for direct-bound deployment.

   ```javascript
   // In the bound spreadsheet project:
   function onOpen(e) {
     GrayShadeLibrary.buildMenu();
   }

   function syncCurrentSheetToHomeCareServices() {
     GrayShadeLibrary.syncCurrentSheetToHomeCareServices();
   }

   function applyGrayShadingCurrentSheet() {
     GrayShadeLibrary.applyGrayShadingCurrentSheet_();
   }
   ```

3. **Duplicate identity keys silently overwrite previous rows.**
   * **Reference:** `buildRowIndexByColumn_(values, headers, headerName)` uses `if (key) map.set(key, r + 1);`.
   * **Finding:** Later rows overwrite earlier rows for the same PMR or name. This is more dangerous than keeping the first match because the selected row depends on sheet ordering.
   * **Impact:** Duplicate PMR/name rows can cause the wrong master row to be updated or pulled. This remains a major data-integrity risk even if name fallback is an accepted business exception.
   * **Recommendation:** Build key-to-array indexes and reject duplicates for PMR; for accepted name fallback, require a single unique matching name.

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

   function getUniqueRowIndex_(index, key, label) {
     const matches = index.get(String(key || '').trim().toLowerCase()) || [];
     if (matches.length > 1) throw new Error(`Duplicate ${label}: ${key}`);
     return matches.length === 1 ? matches[0] : -1;
   }
   ```

4. **Accepted name fallback is documented, but it still needs guardrails.**
   * **Reference:** Comment in `syncDataToHomeCareServices_()` states: `AUDIT EXCEPTION: Name-based fallback is intentional... Future audits should not flag this as an ambiguous identity matching risk.`
   * **Finding:** The business decision is explicitly accepted, so this audit does not classify name fallback itself as a security defect. However, the implementation still lacks duplicate-name detection, audit logging when name fallback is used, and a user-visible warning for manual sync.
   * **Impact:** A known/accepted operational risk can still produce silent wrong-row updates if duplicates exist.
   * **Recommendation:** Keep the fallback only with uniqueness enforcement and log when fallback is used.

   ```javascript
   let rowIndexToUpdate = getUniqueRowIndex_(pmrIndex, pmrKey, 'PMR');
   if (rowIndexToUpdate === -1 && nameKey) {
     rowIndexToUpdate = getUniqueRowIndex_(nameIndex, nameKey, 'Name');
     if (rowIndexToUpdate !== -1) logErrorToSheet_(activeSS, `Name fallback used for ${name}`);
   }
   ```

5. **Reverse sync still does not validate required master headers.**
   * **Reference:** `findRowInMaster_()` reads `headers`, computes `pmrColIndex` and `nameColIndex`, but does not fail if either is missing.
   * **Finding:** Push sync checks required headers and logs/returns, but reverse sync can proceed with `-1` indexes and effectively search partial/no identity columns.
   * **Impact:** Pull/import behavior becomes inconsistent and can silently fail to find valid participants.
   * **Recommendation:** Reuse a strict `getRequiredHeaders_()` in both push and pull paths.

   ```javascript
   function getRequiredHeaders_(sheet) {
     if (sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) {
       throw new Error('Master log has no header row.');
     }
     const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
       .map(h => String(h).trim());
     ['Participant PMR#', 'Name'].forEach(h => {
       if (!headers.includes(h)) throw new Error(`Missing required header: ${h}`);
     });
     return headers;
   }
   ```

6. **Full-sheet reads remain a scalability bottleneck.**
   * **Reference:** `syncDataToHomeCareServices_()` and `findRowInMaster_()` call `targetSheet.getDataRange().getValues()`.
   * **Finding:** The script reads every cell in the master log for each push/pull lookup.
   * **Impact:** Runtime and memory usage grow with the entire service log; this can hit Apps Script limits as row/column count grows.
   * **Recommendation:** Read the header row and identity columns first, then fetch only the matched row.

   ```javascript
   function findCandidateRow_(sheet, headers, searchTerm) {
     const lastRow = sheet.getLastRow();
     if (lastRow < 2) return -1;

     const pmrCol = headers.indexOf('Participant PMR#') + 1;
     const nameCol = headers.indexOf('Name') + 1;
     const needle = String(searchTerm || '').trim().toLowerCase();
     if (!needle) return -1;

     const pmrs = sheet.getRange(2, pmrCol, lastRow - 1, 1).getValues();
     const names = sheet.getRange(2, nameCol, lastRow - 1, 1).getValues();
     for (let i = 0; i < pmrs.length; i++) {
       if (String(pmrs[i][0] || '').trim().toLowerCase() === needle ||
           String(names[i][0] || '').trim().toLowerCase() === needle) {
         return i + 2;
       }
     }
     return -1;
   }
   ```

7. **Error logging can store sensitive operational details indefinitely.**
   * **Reference:** `logErrorToSheet_(ss, message)` appends arbitrary error messages to an `Error Log` sheet.
   * **Finding:** Errors can include participant names, sheet names, operational details, or stack-adjacent messages. The log has no retention, no truncation, and no access-control boundary beyond spreadsheet access.
   * **Impact:** Error logging improves supportability but creates a secondary sensitive-data store.
   * **Recommendation:** Sanitize, truncate, and classify log messages; consider retention cleanup.

   ```javascript
   function sanitizeLogMessage_(message) {
     return String(message || '')
       .replace(/[\r\n]+/g, ' ')
       .slice(0, 500);
   }
   ```

8. **`logErrorToSheet_()` can create protected/workflow side effects during trigger execution.**
   * **Reference:** `logErrorToSheet_()` creates `Error Log`, appends headers, and styles `A1:B1` from catch blocks.
   * **Finding:** Error handling performs multiple Spreadsheet service calls and can itself fail or slow down triggers. It is also called from `installedOnEdit()` catch blocks.
   * **Impact:** Repeated failures can cascade into repeated attempts to create/write/style log sheets.
   * **Recommendation:** Keep a very small `console.error` fallback and avoid styling during error path; create the log sheet during setup instead.

9. **Cache parsing is still unguarded.**
   * **Reference:** `if (cached) return JSON.parse(cached);` in `getNewestSheetNamesCached_()`.
   * **Finding:** Corrupt or unexpected cache content throws and can break sync gating.
   * **Impact:** A cache value can cause trigger failure until cache expires or is removed.
   * **Recommendation:** Guard JSON parsing and remove invalid cache entries.

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

10. **`createOnEditTrigger_()` still leaves legacy `onEdit` installable triggers.**
    * **Reference:** Trigger deletion filters only `installedOnEdit`.
    * **Finding:** Older or manually created installable triggers named `onEdit` can remain and fire in parallel.
    * **Impact:** Duplicate background execution, duplicate sync, or unexpected formatting can occur.
    * **Recommendation:** Delete both known handler names before creating the current trigger.

   ```javascript
   ScriptApp.getProjectTriggers()
     .filter(t => ['installedOnEdit', 'onEdit'].includes(t.getHandlerFunction()))
     .forEach(t => ScriptApp.deleteTrigger(t));
   ```

⚠️ Medium Severity: Performance bottlenecks, architectural issues, and missing edge cases. (Provide refactored code snippets).

1. **`safeGetRange_()` silently swallows all errors.**
   * **Reference:** `catch (e) { return null; }`.
   * **Recommendation:** Keep it for validation/best-effort shading, but use strict range access for required sync fields.

   ```javascript
   function getRequiredRange_(sheet, a1) {
     const range = safeGetRange_(sheet, a1);
     if (!range) throw new Error(`Invalid required range: ${sheet.getName()}!${a1}`);
     return range;
   }
   ```

2. **`resolveRef_()` regex for quoted sheet names is greedy.**
   * **Reference:** `raw.match(/^'(.*)'!(.+)$/)`.
   * **Risk:** Greedy capture can behave unexpectedly with malformed references containing additional quotes.
   * **Recommendation:** Use a safer pattern or validate generated refs only.

3. **`GrayShade.onEdit()` still responds only to source edits.**
   * **Reference:** The function checks intersection only against `srcRange`.
   * **Risk:** Edits/manual formatting changes in target ranges do not reassert shading.
   * **Recommendation:** If target edits should self-heal, check both `rule.src` and `rule.targets` for intersection.

4. **`isSheetExcluded_()` can throw while evaluating exclusion.**
   * **Reference:** Calls `getSheetB4DateTimestamp_(sheet)` without `try/catch`.
   * **Recommendation:** Catch date-read failures and default to excluding unknown sheets.

5. **Newest-sheet cache can be stale.**
   * **Reference:** 60-second cache, invalidated only on exact `B4` edit.
   * **Risk:** Sheet copy/delete/rename/import or script-driven date changes can leave stale newest-sheet decisions.
   * **Recommendation:** Recompute for auto-sync or reduce TTL.

6. **`parseStrictDate_()` lacks explicit month/day bounds before `new Date`.**
   * **Reference:** Constructs `new Date(year, month - 1, day)` and then checks rollover.
   * **Recommendation:** Add explicit bounds for readability and safety.

   ```javascript
   if (month < 1 || month > 12 || day < 1 || day > 31) return null;
   ```

7. **`stripFieldPrefix_()` still corrupts digits and uses an unescaped dynamic regex.**
   * **Reference:** `.replace(/[0-9]/g, '')` and `new RegExp('^' + cleanLabel + ...)`.
   * **Recommendation:** Escape label text and stop removing all digits.

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

8. **`getRangeText_()` repeats `getRange()` calls for every mapped field.**
   * **Reference:** `syncDataToHomeCareServices_()` loops through all `SYNC_MAPPING` entries.
   * **Risk:** Many Apps Script service calls per edit.
   * **Recommendation:** Keep the helper but isolate collection and consider broader block reads for stable templates.

9. **`sortSheetsByB4DateDescending_()` still performs repeated sheet moves.**
   * **Reference:** Repeated `ss.setActiveSheet()` and `ss.moveActiveSheet()`.
   * **Risk:** Slow and quota-heavy with many tabs.
   * **Recommendation:** Keep manual-only for large workbooks or add a threshold.

10. **Sorting dated sheets to `index + 1` can still move them ahead of protected/control tabs.**
    * **Reference:** Dated filtered sheets are moved to positions starting at 1.
    * **Risk:** Even though excluded sheets are not in `sheetData`, they may be displaced by moves.
    * **Recommendation:** Define a fixed control-tab zone or sort only within a contiguous dated-sheet region.

11. **`createNewSheetFromMaster()` can leave a partial copied sheet.**
    * **Reference:** `copyTo(activeSS)` occurs before apply/rename/sort completes.
    * **Recommendation:** Track `newSheet` and notify or delete it on failure.

12. **`removeCopyOfPrefixAllSheets()` can fail on duplicate names.**
    * **Reference:** Direct `sheet.setName(sheetName)` after removing prefix.
    * **Recommendation:** Use `makeUniqueSheetName_()`.

13. **`renameDriveFileFromB5AndTab()` uses active sheet context.**
    * **Reference:** `const sheet = ss.getActiveSheet();`.
    * **Risk:** Safe for menu action, fragile if reused from trigger or multi-user context.
    * **Recommendation:** Split into `renameDriveFileFromB5AndTabForSheet_(sheet)` and have the menu wrapper pass active sheet.

14. **Drive file names are not sanitized.**
    * **Reference:** `const newFileName = `${formattedName} ${sheetTitle}-`;`.
    * **Recommendation:** Sanitize and length-limit Drive names.

15. **`getAllVisibleSheets_()` redundantly excludes `TEMPLATE`.**
    * **Reference:** `isSheetExcluded_(sh)` already covers `TEMPLATE`, then code also checks `sh.getName() !== 'TEMPLATE'`.
    * **Recommendation:** Remove redundant condition or centralize exclusions.

16. **The `Error Log` sheet can grow unbounded.**
    * **Reference:** `logSheet.appendRow([new Date(), message]);`.
    * **Recommendation:** Add retention cleanup or cap to latest N rows.

17. **No automated validation function checks duplicates in master log.**
    * **Reference:** Validation functions check range mappings but not master data quality.
    * **Recommendation:** Add a menu validation item for duplicate PMRs/names and missing required headers.

18. **`getSyncWatchRanges_()` is recalculated on every edit.**
    * **Reference:** `return Array.from(new Set(...))` inside helper.
    * **Risk:** Small but unnecessary repeated allocation.
    * **Recommendation:** Cache static watch ranges in a module-level constant if `SYNC_MAPPING` is immutable.

💡 Low Severity / Nitpicks: Variable naming, formatting, styling, and minor DRY improvements.

1. `var GrayShade` can be `const GrayShade` unless global `var` is required for Apps Script library export semantics.
2. `rangesIntersect_` is public through `return`, so prefer public name `rangesIntersect` without trailing underscore.
3. Use object shorthand: `return { applyAll, onEdit, validate, rangesIntersect: rangesIntersect_ };`.
4. Replace `new Date().getTime()` with `Date.now()`.
5. Replace `rawName.split(' ')` with `rawName.split(/\s+/)`.
6. Use `const cleanText` in `parseStrictDate_()` because the variable is not reassigned.
7. Use `.includes()` instead of `indexOf(...) !== -1` for readability where Apps Script V8 is assumed.
8. Avoid production comments like `AUDIT EXCEPTION` and `Note for Auditors`; move accepted-risk rationale to a governance note or audit appendix.
9. `SYNC_MAPPING` duplicates personnel aliases (`Provider` and `Provider:`); consider explicit alias metadata.
10. Validation message construction is duplicated between current-sheet and all-sheets validation.
11. `getRangeText_()` uses `flat()`, acceptable in V8 but worth noting if legacy runtime compatibility is ever needed.
12. Prefer a setup function to create/style `Error Log` instead of doing formatting during error handling.
13. Consider grouping constants near the top: exclusions, file ID, mapping, watch ranges, and colors.
14. Consider splitting the monolith into `GrayShadeCore.gs`, `Config.gs`, `ErrorLogging.gs`, `DateHelpers.gs`, `PushSync.gs`, `ReverseSync.gs`, `Organization.gs`, `RenameHelpers.gs`, `Menu.gs`, `Triggers.gs`, and `Validation.gs`.
15. Strict equality is used consistently; no loose `==` issues were found.
16. Avoid long one-line conditionals in production code where readability matters, especially in sync and date logic.

Context:
Language/Framework: Google Apps Script / JavaScript using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.

Purpose of the Code: The code implements independent gray shading for Aide CP/care-plan rows and two-way synchronization between local participant sheets and a master Home Care Services spreadsheet. It also supports reverse sync, new sheet creation from master records, sheet organization by B4 date, Drive file renaming, sheet renaming, copy-prefix cleanup, mapping validation, error logging, menu creation, and edit-trigger installation.

Specific Areas of Concern: Hardcoded file ID is explicitly not a concern because files are in a restricted-access folder. Primary concerns are duplicated pasted code, Apps Script library menu callback deployment, missing host `onOpen`/wrappers, duplicate identity handling despite accepted name fallback, full master-log reads, unguarded cache parsing, error-log data retention, range/date silent failures, API-heavy sorting, partial sheet creation, and long-term maintainability of the monolithic script.

## Line-by-line review matrix

| Approx. line(s) | Code area | Review finding | Severity |
| --- | --- | --- | --- |
| 1-4 | Header | Clear purpose statement; “Audit-Compliant” is aspirational and should not replace validation evidence. | Low |
| 8 | `var GrayShade` | `var` is acceptable for Apps Script globals, but `const` is preferable unless library export needs `var`. | Low |
| 9 | `GRAY` | Constant is scoped correctly. | Info |
| 11-13 | `normalizeA1_` | Safe simple normalization; does not validate A1 beyond later `safeGetRange_`. | Info |
| 15-39 | `resolveRef_` | Useful support for quoted/unquoted sheet refs; quoted regex is greedy and error messages expose raw refs in logs. | Medium |
| 41-48 | `safeGetRange_` | Swallows all errors; acceptable for validation/shading but not for required sync operations. | Medium |
| 50-52 | `isBlank_` | Correctly treats whitespace as blank. | Info |
| 54-60 | `setGray_` | Simple and readable; `setBackground(null)` behavior should be verified against desired theme reset behavior. | Low |
| 62-76 | `rangesIntersect_` | Correct rectangular intersection logic. | Info |
| 78-119 | `validate` | Good user-facing validation, but does not detect duplicate rules or overlapping/conflicting targets. | Medium |
| 121-140 | `applyAll` | Repeated `getRange`/`setBackground` calls are fine for small rule sets but API-heavy across many sheets. | Medium |
| 142-176 | `GrayShade.onEdit` | Only source edits trigger target updates; target edits do not self-heal. | Medium |
| 178-183 | GrayShade exports | Public `rangesIntersect_` has private-style name. | Low |
| 191-208 | `RULES` | Static config is readable; potential overlapping targets (`A18:G18`, `A28:V28`) should be intentional/documented. | Low |
| 210-216 | Exclusions | `Error Log` and `TEMPLATE` are correctly excluded. | Info |
| 218 | Cutoff date | `new Date('2024-01-01')` can be timezone-sensitive; acceptable but local date constructor is clearer. | Low |
| 224-235 | `logErrorToSheet_` | Error logging improves supportability but can grow unbounded and store sensitive details. | High |
| 241-245 | `isSheetExcluded_` | Can throw on date extraction; guard with `try/catch`. | Medium |
| 247-252 | `expandRulesForSheet_` | Clear expansion helper; no escaping for sheet names containing `!`, though generated sheet names likely safe. | Low |
| 254-256 | `getAllVisibleSheets_` | Redundant `TEMPLATE` exclusion because `isSheetExcluded_` already handles it. | Low |
| 258-267 | `parseStrictDate_` | Rollover check is good; add explicit bounds and use `const cleanText`. | Medium |
| 269-274 | `getSheetB4DateTimestamp_` | Reads `B4` and `B4:F4` per sheet; repeated in sorting/newest scans. | Medium |
| 276-294 | `getNewestSheetNamesCached_` | Cache JSON parse is unguarded; cache can go stale. | High |
| 296-299 | `isNewestSheet_` | Clear wrapper, but correctness depends on stale-prone cache. | Medium |
| 305 | `TARGET_FILE_ID` | Accepted by requirement due restricted-access folder; document assumption. | Info |
| 307-316 | `SYNC_MAPPING` | Compact but hard to scan; duplicate personnel aliases complicate reverse sync. | Low |
| 318-320 | `getSyncWatchRanges_` | Good improvement: watches full mapped ranges; can be cached. | Low |
| 322-325 | `escapeForSheetCell_` | Good formula-injection mitigation; also used in reverse sync. | Info |
| 327-330 | `stripFieldPrefix_` | Removes all digits and builds unescaped regex. | Medium |
| 332-336 | `getRangeText_` | Simple but causes many Apps Script reads. | Medium |
| 338-347 | `buildRowIndexByColumn_` | Last duplicate key wins silently. | High |
| 349-450 | `syncDataToHomeCareServices_` | Lock handling fixed; still full-sheet read, duplicate identity risk, name fallback accepted but under-guarded. | High |
| 378-384 | Missing master sheet branch | Logs and returns; for manual sync, should also toast “See Error Log.” | Medium |
| 386-392 | Header validation | Present for push sync only; should be centralized and reused. | Medium |
| 399-401 | Name fallback comment | Accepted business exception; still needs duplicate detection and audit trace. | Medium |
| 430-433 | Sync catch | Uses `err.message`; if `err` is non-Error, message can be undefined. | Medium |
| 441-444 | `syncCurrentSheet...` | Good manual wrapper. | Info |
| 450-453 | `writeToRangeText_` | Reverse formula escaping is fixed. | Info |
| 455-479 | `findRowInMaster_` | Full-sheet read and no required-header validation. | High |
| 481-498 | `applyServiceLogRowToLocalSheet_` | Prefix restoration works but is repetitive; duplicate alias logic is brittle. | Medium |
| 500-523 | `pullUpdatesToCurrentSheet` | Error logging added; name fallback accepted but duplicate ambiguity remains. | Medium |
| 525-565 | `createNewSheetFromMaster` | Try/catch added but partial copied sheets can remain. | Medium |
| 571-603 | `sortSheetsByB4DateDescending_` | Filters excluded/hidden sheets and moves template last; repeated sheet moves are expensive and can reorder control regions. | Medium |
| 605-608 | `triggerManualOrganization` | User-friendly toast. | Info |
| 614-640 | `renameDriveFileFromB5AndTab` | Uses active sheet and unsanitized Drive name. | Medium |
| 646-653 | `sanitizeSheetName_` | Good Sheets-specific sanitation. | Info |
| 655-666 | `makeUniqueSheetName_` | Good uniqueness handling; use `Date.now()`. | Low |
| 668-680 | `renameSheetFromB4_` | Simple and safe; raw B4 date semantics depend on display value. | Low |
| 686-703 | `removeCopyOfPrefixAllSheets` | Direct rename can collide; failure only logged. | Medium |
| 711-729 | `buildMenu` | Dotted library callback wiring needs host validation/wrappers. | High |
| 735-746 | Apply functions | Straightforward but API-heavy across many sheets. | Medium |
| 752-775 | Validation functions | Useful, but message-building duplicated. | Low |
| 781-816 | `installedOnEdit` | Good independent bubbles and full watch ranges; log writes during trigger can be costly. | Medium |
| 822-831 | `createOnEditTrigger_` | Does not delete legacy `onEdit` triggers. | Medium |
| second copy | Entire repeated script | Must be removed; otherwise parse failure. | High |
