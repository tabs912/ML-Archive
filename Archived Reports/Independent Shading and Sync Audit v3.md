# Independent Shading and Sync Audit v3

Executive Summary: The reviewed Google Apps Script has improved substantially: prior lock-release, reverse formula escaping, cache parsing, date-bound validation, duplicate identity detection, and sync-watch coverage issues are now partially or fully addressed. This v3 audit treats the script-duplication, library menu namespacing, and local `onOpen` concerns as documented deployment exceptions per the embedded audit notes, while still requiring deployment evidence that library/host splitting is real. Remaining material risks are concentrated in raw error-log retention, full/large range reads, expensive Apps Script calls inside edit-trigger paths, active-sheet assumptions, hidden silent exclusions, and partial operational edge cases.

🚨 Critical / High Severity: Show-stoppers, security risks, or major logic flaws. (Include line numbers/references and specific remediation code).

1. **Deployment exception requires verification: duplicated pasted source is not flagged as a blocker only if deployment truly splits library/host code.**
   * **Reference:** Audit exception notes state duplicate global declarations are false positives from single-file analysis; the pasted prompt still includes a complete second copy after `createOnEditTrigger_()`.
   * **Finding:** The exception is acceptable only if the duplicate source is an artifact of prompt/export concatenation and is not pasted into a single Apps Script file. If both copies exist in one Apps Script project scope, top-level `const` declarations will still fail parsing.
   * **Impact:** Potential parser failure if deployment does not match the documented exception.
   * **Recommendation:** Keep a deployment manifest or README proving which code lives in the library project and which wrappers live in container spreadsheets.

   ```text
   Required deployment evidence:
   - Library project contains exactly one copy of global constants/functions.
   - Host spreadsheet project contains only lightweight wrappers/onOpen.
   - No generated Apps Script file contains two copies of RULES/SYNC_MAPPING/TARGET_FILE_ID.
   ```

2. **Error Log stores raw operational messages and can become a sensitive data sink.**
   * **Reference:** `logErrorToSheet_(ss, message)` appends `message` directly to `Error Log`; callers include duplicate PMR/name strings, sync crash messages, pull faults, and workspace generation failures.
   * **Finding:** Errors can include participant names, PMR values, sheet names, or operational details. The log has no retention policy, no truncation, no severity column, and no sanitization.
   * **Impact:** The spreadsheet gains a secondary sensitive-data store. Restricted folder access helps, but raw error retention increases privacy and operational risk.
   * **Recommendation:** Sanitize, truncate, classify, and cap log retention.

   ```javascript
   function sanitizeLogMessage_(message) {
     return String(message || '')
       .replace(/[\r\n\t]+/g, ' ')
       .replace(/PMR# \[[^\]]+\]/gi, 'PMR# [REDACTED]')
       .slice(0, 500);
   }

   function logErrorToSheet_(ss, message, severity = 'ERROR') {
     try {
       let logSheet = ss.getSheetByName('Error Log');
       if (!logSheet) {
         logSheet = ss.insertSheet('Error Log');
         logSheet.appendRow(['Timestamp', 'Severity', 'Error Message']);
       }
       logSheet.appendRow([new Date(), severity, sanitizeLogMessage_(message)]);
       trimErrorLog_(logSheet, 500);
     } catch (e) {
       console.error('Error log write failed', e);
     }
   }
   ```

3. **`buildIndexMapsOptimized_()` can still perform large rectangular reads.**
   * **Reference:** `const identityData = sheet.getRange(1, 1, lastRow, Math.max(pmrIdx, nameIdx) + 1).getValues();`.
   * **Finding:** This is better than `getDataRange()`, but if `Participant PMR#` or `Name` are far to the right, it still reads every column from A through the larger identity column for every row.
   * **Impact:** Memory and runtime scale with a rectangular slice, not just two identity columns.
   * **Recommendation:** Read the PMR and Name columns separately after reading the header row.

   ```javascript
   const pmrValues = sheet.getRange(2, pmrIdx + 1, lastRow - 1, 1).getValues();
   const nameValues = sheet.getRange(2, nameIdx + 1, lastRow - 1, 1).getValues();

   for (let i = 0; i < lastRow - 1; i++) {
     const rowNum = i + 2;
     const pmrKey = String(pmrValues[i][0] || '').trim().toLowerCase();
     const nameKey = String(nameValues[i][0] || '').trim().toLowerCase();
     // populate maps
   }
   ```

4. **Append path reintroduces a full service-log read to find the last data row.**
   * **Reference:** In `syncDataToHomeCareServices_()`, append path uses `const values = targetSheet.getDataRange().getValues();` and scans backward.
   * **Finding:** The optimized identity lookup avoids full-sheet reads, but append path reads the full sheet again.
   * **Impact:** Appending a new participant remains expensive on large logs.
   * **Recommendation:** Prefer `targetSheet.getLastRow() + 1` unless intentionally preserving blank row gaps.

   ```javascript
   const appendRow = Math.max(targetSheet.getLastRow() + 1, 2);
   targetSheet.getRange(appendRow, 1, 1, newRow.length).setValues([newRow]);
   ```

5. **Trigger error logging can create sheets and perform writes during edit-trigger execution.**
   * **Reference:** `installedOnEdit(e)` catch blocks call `logErrorToSheet_(sheet.getParent(), ...)`; `logErrorToSheet_()` may call `insertSheet`, `appendRow`, and `setFontWeight`.
   * **Finding:** Trigger failure handling performs multiple Spreadsheet service calls. During repeated errors, logging can increase latency and failure surface.
   * **Impact:** A failing trigger can become slower and noisier because the error path does more work.
   * **Recommendation:** Pre-create the Error Log during setup and keep trigger logging minimal.

   ```javascript
   function ensureErrorLogSheet_() {
     const ss = SpreadsheetApp.getActiveSpreadsheet();
     let sheet = ss.getSheetByName('Error Log');
     if (!sheet) {
       sheet = ss.insertSheet('Error Log');
       sheet.appendRow(['Timestamp', 'Severity', 'Error Message']);
     }
   }
   ```

6. **Host callback exception is accepted, but host wrappers are still required as a deployment control.**
   * **Reference:** Audit exception notes state `GrayShadeLibrary.functionName` callbacks are validated and host spreadsheets use local entry points.
   * **Finding:** This audit does not flag namespacing as a defect if that deployment assertion is true. The source itself still does not include those host wrappers.
   * **Impact:** New host spreadsheets can fail if copied without wrappers.
   * **Recommendation:** Add a host setup template to the report/repo.

   ```javascript
   function onOpen(e) { GrayShadeLibrary.buildMenu(); }
   function syncCurrentSheetToHomeCareServices() { GrayShadeLibrary.syncCurrentSheetToHomeCareServices(); }
   function createOnEditTrigger() { GrayShadeLibrary.createOnEditTrigger_(); }
   ```

7. **User-facing pull error can expose internal exception text.**
   * **Reference:** `pullUpdatesToCurrentSheet()` catch block calls `activeSS.toast(err.message, 'Canceled');`.
   * **Finding:** Some exceptions are intentionally user-readable, but raw messages can expose implementation details.
   * **Impact:** Lower than prior versions due controlled messages, but still inconsistent with safer generic-user / detailed-log pattern.
   * **Recommendation:** Show generic text and log details.

   ```javascript
   } catch (err) {
     logErrorToSheet_(activeSS, 'Reverse Pull Fault: ' + (err && err.message));
     activeSS.toast('Pull canceled. See Error Log for details.', 'Canceled');
   }
   ```

8. **Sorting can still displace control tabs by moving dated sheets to absolute indexes.**
   * **Reference:** `sortSheetsByB4DateDescending_()` filters excluded/hidden sheets into `sheetData`, then moves each to `index + 1`.
   * **Finding:** Even excluded sheets are not in `sheetData`, dated sheets are moved to positions starting at 1, which can push control tabs away from desired fixed positions.
   * **Impact:** Workbook navigation/control sheet layout can drift.
   * **Recommendation:** Define a dated-sheet region or keep control tabs pinned.

⚠️ Medium Severity: Performance bottlenecks, architectural issues, and missing edge cases. (Provide refactored code snippets).

1. **`safeGetRange_()` remains a silent failure helper.**
   * **Reference:** `catch (e) { return null; }`.
   * **Risk:** Fine for validation/shading, but inappropriate for required sync fields.
   * **Recommendation:** Use strict helper for required ranges.

   ```javascript
   function getRequiredRange_(sheet, a1) {
     const range = safeGetRange_(sheet, a1);
     if (!range) throw new Error(`Invalid required range: ${sheet.getName()}!${a1}`);
     return range;
   }
   ```

2. **`resolveRef_()` quoted-sheet regex is greedy.**
   * **Reference:** `raw.match(/^'(.*)'!(.+)$/)`.
   * **Risk:** Malformed references with extra quotes can parse unexpectedly.
   * **Recommendation:** Use stricter parsing if references ever become user-editable.

3. **`GrayShade.onEdit()` still only self-heals source edits.**
   * **Reference:** It checks `rangesIntersect_(srcRange, editedRange)` only.
   * **Risk:** Manual target formatting edits are not corrected unless the source changes later.
   * **Recommendation:** If target self-healing matters, check all source and target ranges for intersection.

4. **`isSheetExcluded_()` silently returns `true` on date extraction errors.**
   * **Reference:** `catch(e) { return true; }`.
   * **Risk:** Safe-by-exclusion prevents accidental edits but can hide broken sheet layouts.
   * **Recommendation:** Log a low-volume warning or validation finding.

5. **Newest-sheet cache can still be stale despite reduced TTL.**
   * **Reference:** `cache.put(..., 15)`.
   * **Risk:** Copy/delete/rename/import or script-driven date changes can make the newest-sheet decision stale for up to 15 seconds.
   * **Recommendation:** For manual sync or high-integrity writes, recompute without cache.

6. **`getSyncWatchRanges_()` recalculates static ranges on every edit.**
   * **Reference:** `Array.from(new Set(Object.values(SYNC_MAPPING)...))`.
   * **Recommendation:** Cache module-level watch ranges if `SYNC_MAPPING` is immutable.

   ```javascript
   const SYNC_WATCH_RANGES = Object.freeze(Array.from(new Set(
     Object.values(SYNC_MAPPING).concat(['I5:M5', 'G6:M9'])
   )));
   ```

7. **`getRangeText_()` still creates one Spreadsheet read per mapped field.**
   * **Reference:** `syncDataToHomeCareServices_()` loops through every `SYNC_MAPPING` entry.
   * **Risk:** Edit-trigger sync can issue many service calls.
   * **Recommendation:** Accept for small templates, or batch by stable rectangular regions if runtime increases.

8. **`logErrorToSheet_()` stores numeric `Date.now()` timestamp.**
   * **Reference:** `logSheet.appendRow([Date.now(), message]);`.
   * **Risk:** Numeric epoch is less readable to non-technical users than a date object.
   * **Recommendation:** Use `new Date()` unless numeric epoch is intentional.

9. **`createNewSheetFromMaster()` deletes partial sheet in catch without guarding delete failure.**
   * **Reference:** `if (newSheet) activeSS.deleteSheet(newSheet);`.
   * **Risk:** If deletion fails, original error handling is interrupted.
   * **Recommendation:** Wrap deletion in its own try/catch.

10. **`findRowInMaster_(searchTerm, activeSS)` can be called with an empty string.**
    * **Reference:** `pullUpdatesToCurrentSheet()` evaluates `findRowInMaster_(pmr, activeSS) || findRowInMaster_(name, activeSS)`.
    * **Risk:** Empty PMR still triggers a lookup path before falling back to name.
    * **Recommendation:** Skip empty search terms explicitly.

11. **Drive file rename still does not sanitize generated Drive filename.**
    * **Reference:** `const newFileName = `${formattedName} ${sheetTitle}-`;`.
    * **Risk:** Awkward/special characters may enter Drive filenames.
    * **Recommendation:** Add `sanitizeDriveFileName_()`.

12. **`renameDriveFileFromB5AndTab()` relies on active sheet.**
    * **Reference:** `const sheet = ss.getActiveSheet();`.
    * **Risk:** Safe as a menu action, but fragile if called from triggers or shared multi-user workflows.
    * **Recommendation:** Add a sheet-parameter helper.

13. **`removeCopyOfPrefixAllSheets()` does not report failures.**
    * **Reference:** catch logs only `console.warn(...)` and final toast only reports success count/no matches.
    * **Recommendation:** Track `failed` and include it in toast.

14. **`validateMappings*` functions do not validate sync data quality.**
    * **Reference:** They validate A1 refs only.
    * **Risk:** Duplicate PMRs, missing master headers, and name fallback ambiguity are not exposed in validation menu.
    * **Recommendation:** Add `validateServiceLogIntegrity_()`.

15. **Error Log sheet is excluded from operations but not protected.**
    * **Reference:** `EXCLUDED_SHEETS` includes `Error Log`.
    * **Risk:** Users with edit access can alter audit records.
    * **Recommendation:** Protect or periodically export logs if audit trail integrity matters.

16. **`activeSS.toast('Syncing older sheet configuration data.', 'Override Engine')` is unclear.**
    * **Reference:** manual older-sheet sync message.
    * **Risk:** User may not understand that this is an older-date override.
    * **Recommendation:** Use plain-language message.

17. **Template movement uses absolute workbook end.**
    * **Reference:** `ss.moveActiveSheet(ss.getNumSheets())`.
    * **Risk:** If multiple fixed-end sheets are introduced, this policy becomes insufficient.
    * **Recommendation:** Define a fixed ordering policy for all control sheets.

18. **Accepted audit exceptions should live outside executable source.**
    * **Reference:** `AUDIT EXCEPTION NOTES` block.
    * **Risk:** Runtime code becomes mixed with governance/audit debate.
    * **Recommendation:** Move accepted-risk notes to deployment documentation and keep source comments concise.

💡 Low Severity / Nitpicks: Variable naming, formatting, styling, and minor DRY improvements.

1. Use `const GrayShade` unless `var` is required for Apps Script library export behavior.
2. Rename public `rangesIntersect_` export to `rangesIntersect`.
3. Use object shorthand in the returned `GrayShade` API.
4. `EXCLUDED_SHEETS.indexOf(...) !== -1` can be `.includes(...)` in Apps Script V8.
5. Consolidate duplicate personnel aliases in `SYNC_MAPPING` into explicit alias metadata.
6. Extract repeated provider/HCCRN/RNCM/SW prefix restoration into a helper.
7. Validation message assembly is duplicated between current-sheet and all-sheets validators.
8. Long one-line expressions in sync and date code reduce readability.
9. Consider adding severity/source columns to Error Log.
10. Consider replacing `appendRow` in hot logging paths with `getRange(nextRow, ...).setValues(...)` for consistency.
11. `sanitizeSheetName_()` is good for Sheets but should not be reused for Drive filenames.
12. Add comments explaining why newest-sheet gating exists, not just what it does.
13. Avoid source comments saying “Audit-Compliant”; compliance should be represented by tests, deployment notes, and audit reports.
14. No loose equality (`==`) was observed; strict equality is used consistently.
15. Continue keeping `TEMPLATE` and `Error Log` in both exclusion lists.
16. Consider a small changelog block in documentation rather than inline `AUDIT EXCEPTION` comments.

Context:
Language/Framework: Google Apps Script / JavaScript using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, `LockService`, and `DriveApp`.

Purpose of the Code: The code implements independent gray shading for Aide CP/care-plan rows, background push sync to a Home Care Services master log, reverse sync from that log, new-sheet creation from master records, automatic tab organization by date, Drive file renaming, sheet renaming, copy-prefix cleanup, mapping validation, error logging, custom menu creation, and edit-trigger installation.

Specific Areas of Concern: Hardcoded file ID is explicitly not a concern because the files are deployed inside a restricted-access folder. The v3 focus is validating the latest audit-exception posture, preserving the accepted name-fallback behavior with guardrails, reducing remaining Apps Script API cost, hardening error-log handling, preventing stale cache/silent exclusion issues, and documenting host/library deployment requirements.

## Line-by-line review matrix

| Approx. line(s) | Code area | Finding | Severity |
| --- | --- | --- | --- |
| 1-4 | Header | Purpose is clear; “Audit-Compliant” is aspirational. | Low |
| 6-16 | Audit exception notes | Accepted for this v3 review, but should be backed by deployment docs. | Medium |
| 20 | `var GrayShade` | Acceptable global; `const` preferred if library export does not need `var`. | Low |
| 21 | `GRAY` | Proper constant scope. | Info |
| 23-25 | `normalizeA1_` | Safe normalization; validation occurs later. | Info |
| 27-51 | `resolveRef_` | Good quoted/unquoted support; quoted regex is greedy. | Medium |
| 53-60 | `safeGetRange_` | Silent null on all errors. | Medium |
| 62-64 | `isBlank_` | Whitespace handling is correct. | Info |
| 66-72 | `setGray_` | Simple; verify `null` background reset behavior. | Low |
| 74-88 | `rangesIntersect_` | Correct intersection math. | Info |
| 90-131 | `validate` | Validates refs but not duplicate/conflicting rules. | Medium |
| 133-152 | `applyAll` | API-heavy across all sheets/rules. | Medium |
| 154-188 | `GrayShade.onEdit` | Source-only shading trigger. | Medium |
| 190-195 | Exports | Public underscore API. | Low |
| 203-220 | `RULES` | Static rules are readable; overlapping targets should be documented. | Low |
| 222-228 | Exclusions | Includes `TEMPLATE` and `Error Log`; good. | Info |
| 230 | Cutoff date | String date can be timezone-sensitive. | Low |
| 236-248 | `logErrorToSheet_` | Raw, unbounded log storage. | High |
| 254-263 | `isSheetExcluded_` | Safe-by-exclusion but silent on errors. | Medium |
| 265-270 | `expandRulesForSheet_` | Good helper; assumes sheet names do not contain `!`. | Low |
| 272-274 | `getAllVisibleSheets_` | Redundant `TEMPLATE` check. | Low |
| 276-287 | `parseStrictDate_` | Improved bounds check. | Info |
| 289-294 | `getSheetB4DateTimestamp_` | Repeated range reads. | Medium |
| 296-319 | `getNewestSheetNamesCached_` | Cache parsing fixed; staleness remains. | Medium |
| 321-324 | `isNewestSheet_` | Clear wrapper around cached data. | Medium |
| 330 | `TARGET_FILE_ID` | Accepted by restricted-folder assumption. | Info |
| 332-341 | `SYNC_MAPPING` | Dense and duplicate aliases. | Low |
| 343-345 | `getSyncWatchRanges_` | Correct full range coverage; can be cached. | Low |
| 347-350 | `escapeForSheetCell_` | Good formula injection mitigation. | Info |
| 352-356 | `stripFieldPrefix_` | Regex escaping fixed and digit stripping removed. | Info |
| 358-362 | `getRangeText_` | Many repeated Spreadsheet reads. | Medium |
| 364-397 | `buildIndexMapsOptimized_` | Better than full data range, but still reads rectangular identity span. | High |
| 399-414 | `getValidatedTargetRow_` | Duplicate detection added; raw duplicate identifiers logged. | High |
| 416-505 | `syncDataToHomeCareServices_` | Lock safe; append path still full-sheet reads. | High |
| 507-510 | Manual sync wrapper | Simple and useful. | Info |
| 516-519 | `writeToRangeText_` | Reverse writes escaped. | Info |
| 521-542 | `findRowInMaster_` | Uses optimized maps; empty search can still call lookup. | Medium |
| 544-561 | `applyServiceLogRowToLocalSheet_` | Repetitive prefix handling. | Low |
| 563-587 | `pullUpdatesToCurrentSheet` | Improved errors; raw `err.message` toast remains. | High |
| 589-631 | `createNewSheetFromMaster` | Deletes partial sheet but delete itself is unguarded. | Medium |
| 637-668 | `sortSheetsByB4DateDescending_` | Template last; dated sheet absolute moves can displace control layout. | High |
| 670-673 | Manual sort wrapper | Clear toast. | Info |
| 679-705 | Drive rename | Whitespace split fixed; Drive filename still not sanitized. | Medium |
| 711-717 | `sanitizeSheetName_` | Good sheet-name sanitation. | Info |
| 719-730 | `makeUniqueSheetName_` | Uses `Date.now`; good. | Info |
| 732-744 | `renameSheetFromB4_` | Straightforward; uses display value. | Low |
| 750-770 | `removeCopyOfPrefixAllSheets` | Unique name used; failure count not surfaced. | Medium |
| 778-796 | `buildMenu` | Accepted library callback pattern requires host deployment docs. | Medium |
| 802-813 | Apply menu handlers | Straightforward; API-heavy on all sheets. | Medium |
| 819-842 | Validation | Useful range validation; no master integrity validation. | Medium |
| 848-883 | `installedOnEdit` | Good independent layers; error logging in trigger can be costly. | Medium |
| 889-898 | `createOnEditTrigger_` | Legacy trigger cleanup fixed. | Info |
| repeated copy | Entire second pasted copy | Accepted as prompt artifact only; must not exist as single compiled Apps Script file. | High if deployed together |
