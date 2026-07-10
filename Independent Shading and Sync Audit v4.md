# Independent Shading and Sync Audit v4

Executive Summary: This Google Apps Script code is functionally cohesive and has addressed several earlier audit findings, including guarded lock release, formula escaping on reverse writes, strict date validation, cache JSON parsing, duplicate identity detection, and broader sync watch ranges. However, the implementation still carries meaningful operational and data-integrity risks: raw error logs can retain sensitive data, several hot paths make repeated or oversized Apps Script service calls, some failures are intentionally silent, and library/host deployment assumptions must be verified outside the source comments. Overall quality is acceptable for a small controlled team only after documenting deployment topology, pre-provisioning/protecting operational sheets, and reducing high-cost trigger-path calls.

🚨 Critical / High Severity: Show-stoppers, security risks, or major logic flaws. (Include line numbers/references and specific remediation code).

1. **Deployment exception notes must be proven by actual project layout, not only comments.**
   * **Approx. lines:** 6-16 and repeated-copy block after line 898.
   * **Finding:** The prompt contains two full copies of the script. The embedded audit note says duplicate global declarations are false positives, but if both copies are compiled in one Apps Script project, duplicate `const RULES`, `const TARGET_FILE_ID`, and other top-level declarations will break parsing.
   * **Security/logic impact:** A bad deployment can become a total outage. A successful audit cannot rely on comments that say duplication is intentional unless the repository/deployment artifacts prove the library and host wrapper separation.
   * **Recommendation:** Maintain a deployment manifest and CI/export check that verifies exactly one library source copy exists per Apps Script project.

   ```text
   Required deployment evidence:
   - Library Apps Script project contains one copy of GrayShade and host logic.
   - Container spreadsheets contain only wrappers such as onOpen() and installed trigger glue.
   - Generated/exported .gs bundles are checked for duplicate declarations before deployment.
   ```

2. **Raw Error Log writes can retain participant identifiers and operational details indefinitely.**
   * **Approx. lines:** 236-248, 399-414, 499-503, 584-587, 626-630, 863-883.
   * **Finding:** `logErrorToSheet_(ss, message)` appends raw messages. Callers can include PMR keys, participant names, sheet names, and internal exception text. The log is excluded from automation but not protected, capped, sanitized, or classified.
   * **Security impact:** The Error Log becomes a secondary sensitive-data store. The hardcoded file ID is out of scope per the restricted-folder note, but unbounded raw logs still increase privacy and audit-trail risk.
   * **Recommendation:** Sanitize identifiers, cap message length, add severity/source columns, protect the sheet, and enforce retention.

   ```javascript
   function sanitizeLogMessage_(message) {
     return String(message || '')
       .replace(/[\r\n\t]+/g, ' ')
       .replace(/PMR#?\s*\[[^\]]+\]/gi, 'PMR# [REDACTED]')
       .replace(/Name\s*\[[^\]]+\]/gi, 'Name [REDACTED]')
       .slice(0, 500);
   }

   function logErrorToSheet_(ss, message, severity = 'ERROR', source = 'Unknown') {
     try {
       const logSheet = getOrCreateErrorLogSheet_(ss);
       const nextRow = logSheet.getLastRow() + 1;
       logSheet.getRange(nextRow, 1, 1, 4).setValues([[
         new Date(), severity, source, sanitizeLogMessage_(message)
       ]]);
       trimErrorLog_(logSheet, 500);
     } catch (e) {
       console.error('Error log write failed: ' + e);
     }
   }
   ```

3. **Edit-trigger catch blocks can perform sheet creation, formatting, and writes during a failure storm.**
   * **Approx. lines:** 848-883 plus `logErrorToSheet_()` at 236-248.
   * **Finding:** `installedOnEdit(e)` logs shading and sync trigger failures directly to the workbook. If `Error Log` does not exist, the trigger may call `insertSheet`, `appendRow`, and `setFontWeight` from inside failure handling.
   * **Performance/reliability impact:** Trigger executions are latency-sensitive. Repeated failures can amplify SpreadsheetApp calls and worsen outages.
   * **Recommendation:** Pre-create/protect the Error Log from a manual setup function, and make trigger logging best-effort and lightweight.

   ```javascript
   function ensureOperationalSheets_() {
     const ss = SpreadsheetApp.getActiveSpreadsheet();
     const logSheet = getOrCreateErrorLogSheet_(ss);
     logSheet.protect().setDescription('Operational error log');
   }

   function logTriggerError_(ss, source, err) {
     // Prefer CacheService throttling or console fallback if logging fails.
     logErrorToSheet_(ss, err && err.message, 'ERROR', source);
   }
   ```

4. **`buildIndexMapsOptimized_()` still reads a wide rectangular slice instead of only the needed identity columns.**
   * **Approx. lines:** 364-397.
   * **Finding:** `sheet.getRange(1, 1, lastRow, Math.max(pmrIdx, nameIdx) + 1).getValues()` reads every column from A through the farther identity column. If identity columns are far right, runtime and memory scale with unused columns.
   * **Performance impact:** This can approach Apps Script execution limits as the master log grows.
   * **Recommendation:** Read headers once, then read PMR and Name columns separately from row 2 onward.

   ```javascript
   function buildIndexMapsOptimized_(sheet) {
     const lastRow = sheet.getLastRow();
     const lastCol = sheet.getLastColumn();
     if (lastRow < 1 || lastCol < 1) throw new Error('Service log sheet has no contents.');

     const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h).trim());
     const pmrIdx = headers.indexOf('Participant PMR#');
     const nameIdx = headers.indexOf('Name');
     if (pmrIdx === -1 || nameIdx === -1) throw new Error('Missing identity headers.');

     const pmrMap = new Map();
     const nameMap = new Map();
     if (lastRow > 1) {
       const pmrValues = sheet.getRange(2, pmrIdx + 1, lastRow - 1, 1).getValues();
       const nameValues = sheet.getRange(2, nameIdx + 1, lastRow - 1, 1).getValues();
       for (let i = 0; i < lastRow - 1; i++) {
         const rowNum = i + 2;
         addIndexValue_(pmrMap, pmrValues[i][0], rowNum);
         addIndexValue_(nameMap, nameValues[i][0], rowNum);
       }
     }
     return { pmrMap, nameMap, headers };
   }
   ```

5. **Append path reintroduces a full-sheet read and backward scan.**
   * **Approx. lines:** 474-480.
   * **Finding:** New-row append uses `targetSheet.getDataRange().getValues()` and scans all values backward after the optimized identity lookup has already avoided a full matrix.
   * **Performance impact:** Appending remains O(rows × columns) memory and time.
   * **Recommendation:** Use `getLastRow() + 1` if blank-gap preservation is not required.

   ```javascript
   const appendRow = Math.max(targetSheet.getLastRow() + 1, 2);
   targetSheet.getRange(appendRow, 1, 1, newRow.length).setValues([newRow]);
   ```

6. **Duplicate identity logging exposes the duplicate key values.**
   * **Approx. lines:** 399-414.
   * **Finding:** Duplicate PMR/name messages include `[${pmrKey}]` and `[${nameKey}]`. This helps support but exposes sensitive identifiers in Error Log.
   * **Security impact:** Even with restricted access, this increases sensitive-data footprint.
   * **Recommendation:** Log redacted keys and include row counts/row numbers for troubleshooting.

   ```javascript
   logErrorToSheet_(sheetContext, `Sync skipped: duplicate PMR records (${pmrMatches.length})`, 'WARN', 'IdentityCheck');
   ```

7. **Reverse lookup can still call the master search with an empty key.**
   * **Approx. lines:** 563-587 and 521-542.
   * **Finding:** `findRowInMaster_(pmr, activeSS) || findRowInMaster_(name, activeSS)` calls the PMR lookup even when PMR is blank but Name is present.
   * **Performance/edge-case impact:** This causes an unnecessary master-file open/map build and can produce confusing duplicate/empty-key behavior if blank entries are present.
   * **Recommendation:** Skip empty search terms explicitly.

   ```javascript
   const terms = [pmr, name].map(v => String(v || '').trim()).filter(Boolean);
   let rowData = null;
   for (const term of terms) {
     rowData = findRowInMaster_(term, activeSS);
     if (rowData) break;
   }
   ```

8. **User-facing raw `err.message` can expose implementation details.**
   * **Approx. lines:** 584-587.
   * **Finding:** Pull sync catches errors, logs them, then shows `activeSS.toast(err.message, 'Canceled')`.
   * **Security/UX impact:** Some errors are intentionally user-safe, but future errors may leak internal structure or operational details.
   * **Recommendation:** Show a generic user message and keep details in the sanitized log.

   ```javascript
   } catch (err) {
     logErrorToSheet_(activeSS, 'Reverse Pull Fault: ' + (err && err.message), 'ERROR', 'PullSync');
     activeSS.toast('Pull canceled. See Error Log for details.', 'Canceled');
   }
   ```

9. **Sheet sorting can move business tabs into positions reserved for control tabs.**
   * **Approx. lines:** 637-668.
   * **Finding:** Excluded/hidden sheets are not included in `sheetData`, but dated sheets are moved to absolute positions starting at 1. This can push Instructions/Dashboard/Archive away from intended fixed locations.
   * **Architecture impact:** Workbook navigation becomes unstable as the number of dated sheets changes.
   * **Recommendation:** Define a dated-sheet region after pinned front tabs and before pinned back tabs.

   ```javascript
   const PINNED_FRONT = ['Instructions', 'Dashboard'];
   const PINNED_BACK = ['Archive', 'TEMPLATE', 'Error Log'];
   // Move sorted dated sheets starting at PINNED_FRONT.length + 1.
   ```

10. **The code still depends heavily on active spreadsheet/sheet state.**
    * **Approx. lines:** 27, 507-510, 563-587, 589-631, 679-705, 802-813.
    * **Finding:** Menu actions are expected to run with user-active context, but helpers mix active SpreadsheetApp calls with sheet parameters.
    * **Logic/race impact:** In multi-user or trigger contexts, active-sheet assumptions can target the wrong sheet if functions are reused outside menus.
    * **Recommendation:** Separate pure helpers that accept `ss`/`sheet` from menu wrappers that read active context.

⚠️ Medium Severity: Performance bottlenecks, architectural issues, and missing edge cases. (Provide refactored code snippets).

1. **`safeGetRange_()` intentionally swallows all range errors.**
   * **Approx. lines:** 53-60.
   * **Risk:** Appropriate for visual shading validation, but dangerous for required sync fields because invalid mapping silently skips work.
   * **Recommendation:** Add strict required-range helper for sync paths.

   ```javascript
   function getRequiredRange_(sheet, a1) {
     const range = safeGetRange_(sheet, a1);
     if (!range) throw new Error(`Invalid required range: ${sheet.getName()}!${a1}`);
     return range;
   }
   ```

2. **Quoted-sheet reference regex is greedy.**
   * **Approx. lines:** 31-39.
   * **Risk:** `^'(.*)'!(.+)$` can parse unexpected embedded quotes if mapping values ever become user editable.
   * **Recommendation:** Use a non-greedy expression or explicit parser.

3. **Unquoted sheet names containing `!` are unsupported.**
   * **Approx. lines:** 41-49 and 265-270.
   * **Risk:** `expandRulesForSheet_()` constructs `${sheetName}!${r.src}` without quoting; a sheet name containing `!` breaks reference parsing.
   * **Recommendation:** Quote sheet names when generating A1 references.

   ```javascript
   function quoteSheetName_(name) {
     return `'${String(name).replace(/'/g, "''")}'`;
   }
   ```

4. **`GrayShade.onEdit()` self-heals only source-cell edits, not target-format edits.**
   * **Approx. lines:** 154-188.
   * **Risk:** If a user manually changes target background colors, the target remains wrong until the source changes.
   * **Recommendation:** If target protection matters, detect target intersections and reapply from the source.

5. **`validate()` validates A1 references but not semantic rule conflicts.**
   * **Approx. lines:** 90-131.
   * **Risk:** Overlapping targets such as `A18:G18` can be controlled by multiple source rules without validation warnings.
   * **Recommendation:** Add conflict detection for target ranges with different source controls.

6. **`applyAll()` and `applyGrayShadingAllSheets_()` can make many SpreadsheetApp calls.**
   * **Approx. lines:** 133-152 and 802-813.
   * **Risk:** For every sheet/rule/target, the script resolves ranges and calls `setBackground` individually.
   * **Recommendation:** Accept for small workbooks; otherwise group contiguous target ranges or use RangeList where possible.

   ```javascript
   sheet.getRangeList(['A11:G11', 'A12:G12']).setBackground(GRAY);
   ```

7. **`isSheetExcluded_()` hides date extraction errors by returning true.**
   * **Approx. lines:** 254-263.
   * **Risk:** Safe-by-exclusion prevents accidental processing but can silently remove sheets from sync/shading workflows.
   * **Recommendation:** Throttle-log exclusion errors or expose them in validation.

8. **`EXCLUSION_CUTOFF_DATE = new Date('2024-01-01')` can be timezone-sensitive.**
   * **Approx. line:** 230.
   * **Risk:** String date parsing can differ by runtime timezone and produce off-by-one boundary behavior.
   * **Recommendation:** Use numeric constructor.

   ```javascript
   const EXCLUSION_CUTOFF_DATE = new Date(2024, 0, 1);
   ```

9. **Newest-sheet cache invalidation remains incomplete.**
   * **Approx. lines:** 296-319 and 848-856.
   * **Risk:** The cache is removed on direct single-cell `B4` edits only. Sheet copy, import, manual rename, script-driven B4 writes, deletion, or external changes may leave stale newest decisions for up to 15 seconds.
   * **Recommendation:** Force recomputation for manual sync and clear cache after sheet creation/import/sort workflows.

10. **`getNewestSheetNamesCached_()` scans every sheet and reads B4/B4:F4 for each cache miss.**
    * **Approx. lines:** 296-319 and 289-294.
    * **Apps Script API cost:** Cache misses call `ss.getSheets()` and then at least one `getRange()` per non-excluded sheet.
    * **Recommendation:** Store date metadata in a settings sheet or document properties if workbook size grows.

11. **`getSyncWatchRanges_()` rebuilds a static list on every edit.**
    * **Approx. lines:** 343-345 and 872-873.
    * **Recommendation:** Precompute after `SYNC_MAPPING` declaration.

    ```javascript
    const SYNC_WATCH_RANGES = Object.freeze(Array.from(new Set(
      Object.values(SYNC_MAPPING).concat(['I5:M5', 'G6:M9'])
    )));
    ```

12. **`installedOnEdit()` calls `sheet.getRange(a1)` for every watch range on every edit.**
    * **Approx. lines:** 872-873.
    * **Apps Script API cost:** Each watched range intersection requires a service call to obtain a Range object.
    * **Recommendation:** Precompute watch rectangles from A1 notation once and compare row/column bounds without `sheet.getRange()` in the trigger path.

13. **`getRangeText_()` performs one Spreadsheet read per mapped field.**
    * **Approx. lines:** 358-362 and 432-444.
    * **Apps Script API cost:** Push sync reads each `SYNC_MAPPING` range individually plus note ranges.
    * **Recommendation:** For stable template layouts, batch rectangular groups such as `A4:V19` and extract values in memory.

14. **`values.flat().map(...).filter(String).join(' ')` creates multiple temporary arrays.**
    * **Approx. lines:** 358-362.
    * **JavaScript inefficiency:** Minor at current range sizes, but avoidable.
    * **Recommendation:** Use nested loops for hot paths.

    ```javascript
    const parts = [];
    for (const row of values) {
      for (const cell of row) {
        const text = String(cell).trim();
        if (text) parts.push(text);
      }
    }
    return parts.join(' ');
    ```

15. **`logErrorToSheet_()` uses numeric `Date.now()` instead of `new Date()`.**
    * **Approx. line:** 245.
    * **Risk:** Less readable for spreadsheet users and harder to filter without formatting.
    * **Recommendation:** Use `new Date()` unless epoch milliseconds are intentionally required.

16. **`stripFieldPrefix_()` removes only the first colon from labels.**
    * **Approx. lines:** 352-356.
    * **Risk:** Current labels are simple; future multi-colon labels may not clean as expected.
    * **Recommendation:** Normalize labels with a helper that strips only a trailing colon.

17. **`findRowInMaster_()` rebuilds identity maps for every lookup.**
    * **Approx. lines:** 521-542 and 575.
    * **Apps Script API cost:** Pull with both PMR and Name may open/read the master twice.
    * **Recommendation:** Open target sheet and build maps once, then search multiple keys.

18. **`createNewSheetFromMaster()` deletes a partial sheet without guarding delete failure.**
    * **Approx. lines:** 626-630.
    * **Risk:** If `deleteSheet` fails, the original error handling path is interrupted.
    * **Recommendation:** Wrap cleanup separately.

    ```javascript
    try {
      if (newSheet) activeSS.deleteSheet(newSheet);
    } catch (cleanupErr) {
      logErrorToSheet_(activeSS, 'Partial sheet cleanup failed: ' + cleanupErr.message, 'WARN', 'CreateSheet');
    }
    ```

19. **`createNewSheetFromMaster()` copies the active sheet as the template.**
    * **Approx. lines:** 604-606.
    * **Risk:** If the user is not on the intended template-like sheet, the new sheet inherits unexpected formatting/data.
    * **Recommendation:** Copy a named `TEMPLATE` sheet when available.

20. **Drive file rename does not sanitize the generated Drive filename.**
    * **Approx. lines:** 679-705.
    * **Risk:** Sheet titles and participant names can introduce awkward control characters or overly long filenames.
    * **Recommendation:** Add Drive-specific sanitation and length limit.

21. **`removeCopyOfPrefixAllSheets()` suppresses rename failures from the final toast.**
    * **Approx. lines:** 750-770.
    * **Risk:** Users may believe cleanup succeeded when some sheets failed to rename.
    * **Recommendation:** Track and report failed count.

22. **`createOnEditTrigger_()` deletes triggers named `onEdit` as well as `installedOnEdit`.**
    * **Approx. lines:** 889-898.
    * **Risk:** If the container project has another legitimate installable trigger named `onEdit`, this helper deletes it.
    * **Recommendation:** Limit deletion to known handler names or add a confirmation/setup note.

23. **Validation menus do not validate service-log headers or duplicate identities.**
    * **Approx. lines:** 819-842.
    * **Risk:** Users can validate shading mappings while sync integrity remains broken.
    * **Recommendation:** Add `validateServiceLogIntegrity_()` menu item.

24. **Manual older-sheet sync message is unclear.**
    * **Approx. lines:** 424-427.
    * **Risk:** “Override Engine” is not user-friendly and does not explain newest-sheet gating.
    * **Recommendation:** Use plain operational language.

25. **No explicit protection is applied to `TEMPLATE` or `Error Log`.**
    * **Approx. lines:** 222-228.
    * **Risk:** Exclusion avoids automation but not user edits/deletions.
    * **Recommendation:** Protect operational sheets during setup.

💡 Low Severity / Nitpicks: Variable naming, formatting, styling, and minor DRY improvements.

1. Use `const GrayShade` instead of `var GrayShade` unless Apps Script library export behavior specifically requires `var`.
2. Rename exported `rangesIntersect_` to `rangesIntersect`; trailing underscores conventionally imply private helpers.
3. Use object shorthand in the `GrayShade` return object.
4. Replace `EXCLUDED_SHEETS.indexOf(name) !== -1` with `EXCLUDED_SHEETS.includes(name)` in Apps Script V8.
5. `getAllVisibleSheets_()` redundantly checks `sh.getName() !== 'TEMPLATE'` even though `TEMPLATE` is in `EXCLUDED_SHEETS`.
6. Consolidate duplicate personnel aliases in `SYNC_MAPPING` (`Provider` and `Provider:`, etc.) into explicit alias metadata.
7. Extract repeated Provider/HCCRN/RNCM/SW prefix restoration in `applyServiceLogRowToLocalSheet_()` into a helper.
8. Validation message construction is duplicated between current-sheet and all-sheets validators.
9. Long one-line statements in sort/sync blocks reduce readability and make line-by-line debugging harder.
10. Comments such as “Audit-Compliant” should be avoided in source; compliance should be evidenced by tests, deployment notes, and audit reports.
11. “Executes instantly on paint threads” is not an Apps Script execution model guarantee and should be rephrased.
12. Keep `TEMPLATE` and `Error Log` in both exclusion lists, but document why each is excluded.
13. Add a small deployment README instead of embedding long audit-exception debate in executable code.
14. No loose equality (`==`) was observed; strict equality is used consistently.
15. Prefer `new Date(2024, 0, 1)` over string-date parsing for the cutoff.
16. Consider `Object.freeze()` for `RULES`, `EXCLUDED_SHEETS`, and `SYNC_MAPPING` if they should be immutable.
17. Add a changelog/version line to the report or deployment docs rather than source comments.
18. Use consistent toast titles (`Error`, `Canceled`, `Complete`) for user clarity.
19. Avoid exposing “profile” terminology inconsistently with “participant” terminology.
20. Consider adding unit-like local tests for pure helpers (`parseStrictDate_`, `sanitizeSheetName_`, `rangesIntersect_`) using clasp/gas-local tooling.

Context:
Language/Framework: Google Apps Script / JavaScript (V8 runtime assumed), using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.

Purpose of the Code: The script provides independent gray shading for configured care-plan rows, push sync from local sheets to a Home Care Services master log, reverse sync from the master log to local sheets, new-sheet creation from master records, sheet/date organization, Drive file renaming, sheet renaming, copy-prefix cleanup, validation menus, custom menu creation, error logging, and edit-trigger installation.

Specific Areas of Concern: Hardcoded file ID is explicitly not a concern because all files are in a restricted-access folder. The v4 review focuses on line-by-line correctness, Apps Script API cost, security of operational logging, silent failure modes, cache and trigger behavior, deployment exception evidence, data integrity for duplicate identity keys, and maintainability of the monolithic script.

## Exhaustive line-by-line review matrix

| Approx. line(s) | Code area | Finding | Severity |
| --- | --- | --- | --- |
| 1-4 | Header | Purpose is clear; “Audit-Compliant” is aspirational and should not replace evidence. | Low |
| 6-16 | Audit exception notes | Accepted only with deployment proof; typo `ONDIT` should be corrected to `ONEDIT`. | Medium |
| 20 | `var GrayShade` | Works as Apps Script global; prefer `const` if library export permits. | Low |
| 21 | `GRAY` | Good local constant. | Info |
| 23-25 | `normalizeA1_` | Safe simple normalization; strips `$` anchors. | Info |
| 27-29 | `resolveRef_` default `SpreadsheetApp.getActive()` | Convenient but couples helper to active context. | Medium |
| 30 | Empty reference check | Correct fail-fast. | Info |
| 32-39 | Quoted sheet regex | Greedy capture; acceptable for static config but fragile for user-provided refs. | Medium |
| 40-49 | Unquoted sheet regex | Handles common refs; unquoted sheet names containing `!` break. | Medium |
| 51 | Active sheet fallback | Useful for local refs; can be wrong outside menu/trigger context. | Medium |
| 53-60 | `safeGetRange_` | Returns null on all errors; silent by design but risky for required sync ranges. | Medium |
| 62-64 | `isBlank_` | Handles whitespace and null; `undefined` becomes blank via String. | Info |
| 66-72 | `setGray_` | Simple; verify `setBackground(null)` behavior for desired reset style. | Low |
| 74-88 | `rangesIntersect_` | Intersection math is correct and strict-equality-free. | Info |
| 90-131 | `validate` | Validates A1 references only; no overlapping/conflicting rule detection. | Medium |
| 96-103 | Source validation | Good error capture; messages include raw refs. | Low |
| 111-125 | Target validation | Good coverage; repeated logic could be extracted. | Low |
| 133-152 | `applyAll` | Potentially many Spreadsheet calls across sheets/rules/targets. | Medium |
| 137 | `catch (_) { return; }` | Silent skip may hide config errors outside validation. | Medium |
| 140 | `srcRange.getValue()` | Reads top-left value only; okay for single-cell src rules. | Info |
| 142-150 | Target loop | Repeated `setBackground` calls; consider RangeList where practical. | Medium |
| 154-188 | `GrayShade.onEdit` | Source-only self-healing; target manual formatting edits not corrected. | Medium |
| 157-159 | Event guards | Good event defensive checks. | Info |
| 164-186 | Broad catch | Logs to console only; acceptable for library core but less visible to users. | Low |
| 190-195 | Public exports | Exports private-looking `rangesIntersect_`. | Low |
| 203-220 | `RULES` | Static mapping is readable; overlapping targets should be documented. | Low |
| 222-228 | Exclusion lists | Good inclusion of `TEMPLATE` and `Error Log`; protect them too. | Medium |
| 230 | Cutoff date | String date parsing can be timezone-sensitive. | Low |
| 236-248 | `logErrorToSheet_` | Raw unbounded log writes and possible sheet creation in hot paths. | High |
| 239 | `insertSheet` | Should be setup-time rather than trigger-time. | High |
| 240-241 | `appendRow` + styling | Extra service calls; acceptable only outside hot path. | Medium |
| 243 | `Date.now()` | Less spreadsheet-friendly than `new Date()`. | Medium |
| 245-247 | Console fallback | Good fallback, but still may include raw message. | Low |
| 254-263 | `isSheetExcluded_` | Safe-by-exclusion but hides B4/date errors. | Medium |
| 265-270 | `expandRulesForSheet_` | Does not quote sheet names; assumes no `!`. | Medium |
| 272-274 | `getAllVisibleSheets_` | Redundant `TEMPLATE` check. | Low |
| 276-287 | `parseStrictDate_` | Improved month/day bounds and exact date validation. | Info |
| 278 | Date regex | Accepts first matching date in arbitrary text; intended but should be documented. | Low |
| 289-294 | `getSheetB4DateTimestamp_` | Reads B4 then B4:F4; repeated across scans. | Medium |
| 296-319 | `getNewestSheetNamesCached_` | Cache parsing fixed; invalidation remains partial. | Medium |
| 306-314 | Cache miss sheet scan | One or more reads per sheet; acceptable at small scale. | Medium |
| 317 | 15-second TTL | Reduced stale window; still stale for manual high-integrity sync. | Medium |
| 321-324 | `isNewestSheet_` | Clear wrapper; relies on cache correctness. | Medium |
| 330 | `TARGET_FILE_ID` | Accepted by restricted-folder assumption; not flagged. | Info |
| 332-341 | `SYNC_MAPPING` | Dense static config; duplicate aliases increase write ambiguity. | Low |
| 343-345 | `getSyncWatchRanges_` | Correct range coverage; rebuilds static data per call. | Low |
| 347-350 | `escapeForSheetCell_` | Good formula-injection mitigation for Sheets. | Info |
| 352-356 | `stripFieldPrefix_` | Regex escaping fixed; only simple colon normalization. | Low |
| 358-362 | `getRangeText_` | Many service calls and temp arrays. | Medium |
| 364-397 | `buildIndexMapsOptimized_` | Better than full data range, but still rectangular identity read. | High |
| 365-366 | `getLastRow/getLastColumn` | Good bounds source; still two service calls. | Low |
| 369 | Header read | Necessary and bounded. | Info |
| 373-375 | Required headers | Correct fail-fast behavior. | Info |
| 381 | Identity range read | Reads unused columns between A and identity columns. | High |
| 383-395 | Index map population | Duplicate rows stored; good for detection. | Info |
| 399-414 | `getValidatedTargetRow_` | Duplicate detection added; raw duplicate keys logged. | High |
| 406-414 | Name fallback | Accepted operational exception; duplicate guard helps. | Medium |
| 416-505 | `syncDataToHomeCareServices_` | Main sync path is lock-safe but API-heavy. | High |
| 417-419 | Active spreadsheet + lock | Good lock guard; active context should be wrapper-only. | Medium |
| 422-426 | Lock acquisition | Correct non-blocking behavior. | Info |
| 428-431 | Newest sheet gate | Good safety; manual toast wording unclear. | Medium |
| 433-445 | Data gathering | One `getRangeText_` call per mapping plus notes. | Medium |
| 447-450 | Metadata fields | Link construction is useful; sheet/file names may be sensitive in logs if errors occur. | Low |
| 453-455 | Empty identity return | Silent automated skip; manual skip lacks toast. | Medium |
| 457-459 | Target open | Required service call; should be centralized helper. | Low |
| 461-471 | Duplicate target row handling | Correctly skips duplicates. | Info |
| 473-482 | Append branch | Reintroduces full-sheet read to find append row. | High |
| 484-496 | Update branch | Reads and writes one row; good batching. | Info |
| 500-503 | Catch logging | Sanitization missing; manual user message generic. | High |
| 504-505 | Finally lock release | Correct guarded release. | Info |
| 507-510 | Manual sync wrapper | Simple; active-sheet dependent by design. | Low |
| 516-519 | `writeToRangeText_` | Escapes reverse values; writes only top-left of multi-cell mapping. | Medium |
| 521-542 | `findRowInMaster_` | Builds maps per lookup; empty term can still trigger scan. | Medium |
| 533-537 | Duplicate lookup handling | Converts technical duplicate to user-facing error. | Info |
| 539-542 | Row data object | Correct row batching. | Info |
| 544-561 | `applyServiceLogRowToLocalSheet_` | Repetitive prefix restoration; writes many cells individually. | Medium |
| 548-551 | Prefix conditions | Works but should be data-driven. | Low |
| 553-555 | Alias skip logic | Non-colon alias skip prevents duplicate writes; hard to read. | Low |
| 560 | Notes write | Writes combined notes to top-left only. | Medium |
| 563-587 | `pullUpdatesToCurrentSheet` | Can call lookup twice; raw error toast remains. | High |
| 568-569 | PMR/name reads | Good identifiers; use terms array to skip blanks. | Medium |
| 575 | `findRowInMaster_(pmr) || findRowInMaster_(name)` | Rebuilds maps twice in worst case. | Medium |
| 583-587 | Catch | Logs raw error and toasts raw message. | High |
| 589-631 | `createNewSheetFromMaster` | Good try/catch; active sheet copy can use wrong template. | Medium |
| 604-606 | Copy active sheet | Use named TEMPLATE if expected. | Medium |
| 609-613 | Date fallback | Good fallback; consider strict parse/format standardization. | Low |
| 626 | Delete partial sheet | Cleanup not guarded. | Medium |
| 637-668 | `sortSheetsByB4DateDescending_` | Template last; dated moves can displace control tabs. | High |
| 642-650 | Sheet classification | Good hidden/excluded filtering. | Info |
| 652-655 | Sorting | Clear date/name sort. | Info |
| 657-662 | Absolute moves | Potentially disruptive to control tabs. | High |
| 664-667 | Template to end | Good for one fixed-back sheet; not enough for multiple back tabs. | Medium |
| 670-673 | Manual organization wrapper | Clear toast. | Info |
| 679-705 | Drive rename | Whitespace split improved; Drive filename not sanitized. | Medium |
| 682 | `DriveApp.getFileById(ss.getId())` | Correct for bound spreadsheet file; requires Drive scope. | Info |
| 687 | Active sheet read | Menu-safe but not helper-safe. | Medium |
| 690-696 | Name formatting | Simple Western-name assumption; acceptable for small team but document. | Low |
| 699 | Filename construction | Could be too long or contain awkward characters. | Medium |
| 702-704 | Rename toast | Avoids showing sensitive title; good. | Info |
| 711-717 | `sanitizeSheetName_` | Good Sheet-specific sanitization. | Info |
| 719-730 | `makeUniqueSheetName_` | Good collision handling; fallback truncates timestamp candidate. | Info |
| 732-744 | `renameSheetFromB4_` | Uses display value; protected by exclusion list. | Low |
| 750-770 | `removeCopyOfPrefixAllSheets` | Uses unique names; suppresses failure count. | Medium |
| 756 | `while startsWith` loop | Correct for repeated prefixes. | Info |
| 759 | Sanitized unique rename | Improvement over raw rename. | Info |
| 761 | Catch warning | Message lacks sheet name/error details. | Low |
| 778-796 | `buildMenu` | Accepted library callback pattern; requires host wrapper documentation. | Medium |
| 802-806 | Current sheet apply | Active context by design. | Low |
| 808-813 | All-sheets apply | Potentially API-heavy. | Medium |
| 819-842 | Mapping validation | Useful but excludes service-log integrity checks. | Medium |
| 824-829 | Current validation alert | 30k truncation prevents UI overflow. | Info |
| 833-842 | All validation | Potentially large but truncated. | Low |
| 848-883 | `installedOnEdit` | Good layer isolation; trigger-path logging/range calls are costly. | High |
| 852 | `isSheetExcluded_` in trigger | Safe but silent if date read fails. | Medium |
| 856-860 | B4 special handling | Correct cache removal for direct B4 edit only. | Medium |
| 864-868 | Shading try/catch | Good isolation; log write can be expensive. | Medium |
| 872-873 | Watch range intersection | Full range coverage good; calls `getRange` repeatedly. | Medium |
| 875-877 | Sync trigger | Runs sync after shading; can be slow on edit. | Medium |
| 879-881 | Sync trigger catch | Raw logging concern. | High |
| 889-898 | `createOnEditTrigger_` | Cleans legacy `onEdit`; may delete unrelated trigger with same handler name. | Medium |
| repeated copy | Entire second pasted copy | Accepted only as prompt/export artifact; fatal if deployed as one compiled file. | High |
