# Independent Shading and Sync Audit v6

Executive Summary: This v6 review treats the code as a Google Apps Script **Library** deployment, not a standalone bound script, and therefore the largest risk is deployment-model mismatch: local `onOpen()`/menu callback names are not sufficient unless host spreadsheets provide wrapper functions that call the library. Data security and file-ID secrecy are explicitly out of scope because all files are stored in a limited-access folder; findings focus on syntax validity, library wiring, runtime blockers, data correctness, Apps Script API cost, silent failures, and maintainability. The code as pasted is not deployable without cleanup because bare `[cite: ...]` tokens are present in executable JavaScript lines, the full source is repeated, `getAllVisibleSheets_()` is still missing, newest-sheet gating is absent, and several trigger/sync paths remain expensive or noisy.

🚨 Critical / High Severity: Show-stoppers, security risks, or major logic flaws. (Include line numbers/references and specific remediation code).

1. **Bare `[cite: ...]` markers make the pasted script syntactically invalid.**
   * **Approx. lines:** `TARGET_FILE_ID` declaration, `isSheetExcluded_()`, `getSyncWatchRanges_()`, `stripFieldPrefix_()`, `parseStrictDate_()`, `buildIndexMapsOptimized_()`, `getValidatedTargetRow_()`, `syncDataToHomeCareServices_()`, `applyServiceLogRowToLocalSheet_()`, `createNewSheetFromMaster()`, `sortSheetsByB4DateDescending_()`, `onOpen()`, `installedOnEdit()`, and `createOnEditTrigger_()`.
   * **Finding:** Strings like `[cite: 468]` are inserted outside comments and are not valid JavaScript. For example, `const TARGET_FILE_ID = '...'; [cite: 468]` will fail parsing.
   * **Impact:** Total parse-time failure before any library function can load.
   * **Recommendation:** Remove all citation artifacts from executable source. Keep citations only in documentation comments or this audit report.

   ```javascript
   // Good source code: citation removed from executable line.
   const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
   ```

2. **The supplied artifact still repeats the full script, contradicting the “no duplicate top-level re-declarations” statement.**
   * **Approx. lines:** first full source block and repeated full source block after the first `createOnEditTrigger_()`.
   * **Finding:** The compliance statement says there are no duplicate top-level constants, but the pasted artifact repeats `const RULES`, `const EXCLUDED_SHEETS`, `const TARGET_FILE_ID`, `const SYNC_MAPPING`, and all functions.
   * **Impact:** If deployed exactly as pasted, duplicate `const` declarations create parse-time failure even after citation markers are removed.
   * **Recommendation:** Keep exactly one source copy in the Apps Script library project.

   ```bash
   rg '^const (RULES|EXCLUDED_SHEETS|RENAME_EXCLUDED_SHEETS|TARGET_FILE_ID|SYNC_MAPPING)\b' path/to/exported.gs
   ```

3. **Library deployment requires host wrapper entrypoints; local `onOpen()` inside the library will not by itself run in every container spreadsheet.**
   * **Approx. lines:** `onOpen()`, menu `.addItem(...)` calls, and `createOnEditTrigger_()`.
   * **Finding:** The user clarified this is configured as a Google Apps Script Library. In Apps Script, host/container projects must expose simple triggers and menu callback functions or otherwise call into the library. A library function named `onOpen()` is not automatically a simple trigger in each consuming spreadsheet unless the host script calls it.
   * **Impact:** Menus and callbacks can fail to appear or fail to resolve when deployed as a library-only project.
   * **Recommendation:** Keep library functions namespaced, and add minimal host wrappers in every consuming spreadsheet.

   ```javascript
   // Host spreadsheet project, not the library project.
   function onOpen(e) { GrayShadeLibrary.onOpen(e); }
   function applyGrayShadingCurrentSheet_() { GrayShadeLibrary.applyGrayShadingCurrentSheet_(); }
   function applyGrayShadingAllSheets_() { GrayShadeLibrary.applyGrayShadingAllSheets_(); }
   function syncCurrentSheetToHomeCareServices() { GrayShadeLibrary.syncCurrentSheetToHomeCareServices(); }
   function pullUpdatesToCurrentSheet() { GrayShadeLibrary.pullUpdatesToCurrentSheet(); }
   function createNewSheetFromMaster() { GrayShadeLibrary.createNewSheetFromMaster(); }
   function createOnEditTrigger_() { GrayShadeLibrary.createOnEditTrigger_(); }
   ```

4. **`getAllVisibleSheets_()` is still called but not defined.**
   * **Approx. lines:** `applyGrayShadingAllSheets_()`.
   * **Finding:** The function calls `getAllVisibleSheets_(ss).forEach(...)`, but the v6 script does not define `getAllVisibleSheets_()`.
   * **Impact:** The “Apply (all sheets)” menu item fails at runtime.
   * **Recommendation:** Restore the helper.

   ```javascript
   function getAllVisibleSheets_(ss) {
     return ss.getSheets().filter(sh => !isSheetExcluded_(sh) && !sh.isSheetHidden());
   }
   ```

5. **Newest-sheet gating remains absent from push sync even though the trigger still reacts to edited cells.**
   * **Approx. lines:** `syncDataToHomeCareServices_(sheet, isManual = false)` and `installedOnEdit(e)`.
   * **Finding:** The v6 push sync gathers data and writes to the master log for any watched edit, without confirming the sheet is the newest dated tab.
   * **Impact:** Editing an older sheet can overwrite master-log fields with stale values.
   * **Recommendation:** Restore newest-date gating for automatic trigger sync and allow manual override only when explicitly invoked.

   ```javascript
   if (!isManual && !isNewestSheet_(sheet)) return;
   if (isManual && !isNewestSheet_(sheet)) {
     SpreadsheetApp.getActiveSpreadsheet().toast('Manual override: syncing older dated sheet.', 'Notice');
   }
   ```

6. **`syncDataToHomeCareServices_()` can append a row with blank identity values.**
   * **Approx. lines:** data collection through `targetRow === -1` append branch.
   * **Finding:** There is no early return when both `Participant PMR#` and `Name` are blank. Empty strings are passed to `getValidatedTargetRow_()`; if no blank match exists, the append branch creates a new row.
   * **Impact:** The master log can accumulate blank/anonymous rows and subsequent blank searches can behave unpredictably.
   * **Recommendation:** Restore the identity guard before opening the master log.

   ```javascript
   const pmr = String(dataToSync['Participant PMR#'] || '').trim();
   const name = String(dataToSync.Name || '').trim();
   if (!pmr && !name) {
     if (isManual) activeSS.toast('Skipped: no Name or PMR# found.', 'Sync Skipped');
     return;
   }
   ```

7. **`validate()` checks only source ranges and misses all target range failures.**
   * **Approx. lines:** `GrayShade.validate(ss, rules)`.
   * **Finding:** The function no longer loops through `r.targets`. It also calls `resolveRef_(r.src, ss)` twice.
   * **Impact:** Validation can report rules as OK while target ranges are invalid, leaving shading failures to be skipped silently later.
   * **Recommendation:** Validate source and target ranges and resolve each reference once.

8. **`resolveRef_()` returns null sheet references instead of failing fast.**
   * **Approx. lines:** quoted and unquoted sheet resolution.
   * **Finding:** `ss.getSheetByName(...)` can return null, and v6 returns `{ sheet: null, a1 }`.
   * **Impact:** Downstream code either silently skips via `safeGetRange_()` or throws less useful null errors.
   * **Recommendation:** Throw a clear `Sheet not found` error inside `resolveRef_()`.

9. **`isSheetExcluded_()` remains side-effecting and logs malformed dates during filtering.**
   * **Approx. lines:** `isSheetExcluded_(sheet)`.
   * **Finding:** The predicate calls `logErrorToSheet_()` when B4 date parsing returns `0`. This predicate is used by sorting, trigger guards, and all-sheet operations.
   * **Impact:** Routine scans mutate the workbook, produce repeated operational log rows, and slow trigger/filter paths.
   * **Recommendation:** Make exclusion checks pure; move date warnings to an explicit validation menu item.

10. **`findRowInMaster_()` still does not skip blank search terms.**
    * **Approx. lines:** `findRowInMaster_(searchTerm, activeSS)` and `pullUpdatesToCurrentSheet()`.
    * **Finding:** Blank PMR or Name values are converted to `''` and searched against both maps.
    * **Impact:** Unnecessary master-file reads and confusing behavior around blank identity rows.
    * **Recommendation:** Return `null` immediately for blank search terms.

11. **`pullUpdatesToCurrentSheet()` can open and index the master workbook twice.**
    * **Approx. lines:** `findRowInMaster_(getRangeText_(sheet, "V1"), activeSS) || findRowInMaster_(getRangeText_(sheet, "B5"), activeSS)`.
    * **Finding:** Each lookup opens the target file and rebuilds maps; when PMR is blank or misses, Name lookup repeats the same work.
    * **Impact:** Avoidable Apps Script latency and quota consumption.
    * **Recommendation:** Build the target index once, then search both terms.

12. **`buildIndexMapsOptimized_()` still reads a wide rectangular identity range.**
    * **Approx. lines:** `identityData = sheet.getRange(1, 1, lastRow, Math.max(pmrIdx, nameIdx) + 1).getValues()`.
    * **Finding:** The function reads all columns from A through the farther identity column.
    * **Impact:** Runtime and memory scale with unused columns.
    * **Recommendation:** Read only the PMR and Name columns after the header row.

13. **`installedOnEdit(e)` performs many Apps Script calls on every relevant edit.**
    * **Approx. lines:** trigger guard, B4 branch, shading call, sync watch intersection, and sync call.
    * **Finding:** The trigger calls `isSheetExcluded_()`, may sort sheets immediately, rebuilds watch ranges, calls `sheet.getRange(a1)` for each watched range, and may run a full push sync.
    * **Impact:** Edit latency and execution time can increase significantly as workbook size grows.
    * **Recommendation:** Make trigger predicates pure, precompute watch rectangles, avoid immediate sort on edit, and keep sync minimal.

14. **`createOnEditTrigger_()` deletes all installable triggers named `onEdit`.**
    * **Approx. lines:** trigger filter with `['installedOnEdit', 'onEdit'].includes(...)`.
    * **Finding:** In a library/host setup, a host project may have unrelated installable triggers using handler `onEdit`.
    * **Impact:** Trigger setup can break unrelated automation.
    * **Recommendation:** Delete only the library-owned handler or require explicit setup documentation.

15. **`createNewSheetFromMaster()` copies the active sheet rather than a controlled template.**
    * **Approx. lines:** `newSheet = activeSS.getActiveSheet().copyTo(activeSS)`.
    * **Finding:** The created sheet inherits whatever tab the user had active.
    * **Impact:** Imported participant sheets can inherit wrong formatting/data.
    * **Recommendation:** Prefer a named `TEMPLATE` sheet when available.

⚠️ Medium Severity: Performance bottlenecks, architectural issues, and missing edge cases. (Provide refactored code snippets).

1. **Literal citation markers inside comments are acceptable, but citation markers outside comments must be removed.**
   * **Risk:** Documentation citations are fine in audit reports, not executable Apps Script lines.
   * **Recommendation:** Keep source code citation-free and maintain this report as the traceability document.

2. **`EXCLUSION_CUTOFF_DATE = new Date('2024-01-01')` can be timezone-sensitive.**
   * **Recommendation:** Use `new Date(2024, 0, 1)`.

3. **No `getNewestSheetNamesCached_()` / `isNewestSheet_()` helpers exist in v6.**
   * **Risk:** The B4 cache removal in `installedOnEdit()` references a cache key that no current helper rebuilds.
   * **Recommendation:** Restore helpers if newest gating remains a business rule; otherwise remove stale cache code.

4. **`safeGetRange_()` still swallows all errors.**
   * **Risk:** Useful for shading tolerance, but bad for required sync fields.
   * **Recommendation:** Add a strict range helper for sync.

5. **`rangesIntersect_()` repeatedly calls Range methods.**
   * **Risk:** Minor but avoidable in hot paths.
   * **Recommendation:** Store row/column bounds in local constants.

6. **`applyAll()` and `GrayShade.onEdit()` contain nested silent catches.**
   * **Risk:** Shading failures disappear unless validation is run.
   * **Recommendation:** Count failures during manual operations and throttle trigger logging.

7. **`expandRulesForSheet_()` does not quote generated sheet names.**
   * **Risk:** Sheet names containing `!` or quotes can break generated references.
   * **Recommendation:** Add `quoteSheetName_()` when generating sheet-qualified A1 refs.

8. **`getSyncWatchRanges_()` rebuilds static data every time.**
   * **Recommendation:** Precompute `SYNC_WATCH_RANGES` once after `SYNC_MAPPING`.

9. **`getRangeText_()` uses `flat().map().filter()` and one Spreadsheet read per field.**
   * **Risk:** Repeated array allocations and Spreadsheet calls in sync paths.
   * **Recommendation:** Batch stable regions or use nested loops.

10. **`parseStrictDate_()` accepts the first date in arbitrary text.**
    * **Risk:** Multiple dates in B4:F4 can parse unexpectedly.
    * **Recommendation:** Require exactly one date or standardize B4.

11. **`logErrorToSheet_()` has no retention or duplicate-warning throttle.**
    * **Risk:** This is not a data-security concern per instruction, but it is an operational noise/quota issue.
    * **Recommendation:** Cap log rows and avoid repeated identical date-gating warnings.

12. **`console.error(message)` fallback omits the logging failure details.**
    * **Recommendation:** Include both the original message and `e.message`.

13. **`getValidatedTargetRow_()` logs duplicate key text.**
    * **Risk:** Data security is out of scope, but verbose messages can clutter operational logs.
    * **Recommendation:** Log duplicate type/count and optional row numbers.

14. **`syncDataToHomeCareServices_()` uses `isManual` for duplicate/busy/failure toasts but not for newest override behavior.**
    * **Recommendation:** Restore full manual-vs-automatic branching.

15. **Append branch uses `let nextRow` even though it is not reassigned.**
    * **Recommendation:** Use `const nextRow`.

16. **Append branch does not validate required master-only columns.**
    * **Risk:** Rows can be appended with empty unmapped required fields.
    * **Recommendation:** Validate required headers before append.

17. **`findRowInMaster_()` rebuilds maps per lookup.**
    * **Recommendation:** Create `getMasterContext_()` returning `{ targetSheet, maps }` and pass it through pull/import calls.

18. **`applyServiceLogRowToLocalSheet_()` writes one cell per mapped field.**
    * **Risk:** Manual pull/import performs many individual `setValue()` calls.
    * **Recommendation:** Accept for small templates or batch adjacent writes.

19. **`applyServiceLogRowToLocalSheet_()` writes only top-left cells for multi-cell mappings.**
    * **Risk:** This is intentional for text import, but should be documented because push reads full ranges while pull writes only the first cell.

20. **`pullUpdatesToCurrentSheet()` does not toast when no row is found.**
    * **Risk:** User may think nothing happened.
    * **Recommendation:** Add a “not found” toast.

21. **`createNewSheetFromMaster()` cleanup is unguarded.**
    * **Recommendation:** Wrap `deleteSheet` in its own try/catch.

22. **`new Date().toLocaleDateString()` creates locale-dependent sheet names.**
    * **Recommendation:** Format dates explicitly.

23. **`sortSheetsByB4DateDescending_()` moves dated sheets to absolute index positions.**
    * **Risk:** Control tabs can be displaced.
    * **Recommendation:** Define pinned-front and pinned-back groups.

24. **`renameDriveFileFromB5AndTab()` does not compare before `file.setName(...)`.**
    * **Risk:** Unnecessary DriveApp write call.

25. **Drive filename generation has no length/character normalization.**
    * **Risk:** Awkward or overly long Drive titles.

26. **`sanitizeSheetName_()` can return an empty string.**
    * **Recommendation:** Fallback to `'Untitled'`.

27. **`removeCopyOfPrefixAllSheets()` silently ignores rename failures.**
    * **Recommendation:** Track success/failure counts.

28. **`onOpen()` menu omits validation actions.**
    * **Risk:** Users cannot easily run mapping/service-log validation from the menu.

29. **`applyGrayShadingCurrentSheet_()` calls `SpreadsheetApp.getActive()` twice.**
    * **Recommendation:** Store active spreadsheet in a local constant.

30. **No tests are described for pure helper behavior.**
    * **Recommendation:** Add lightweight tests for date parsing, sheet-name sanitation, formula escaping, and duplicate row detection.

💡 Low Severity / Nitpicks: Variable naming, formatting, styling, and minor DRY improvements.

1. `var GrayShade` can be `const GrayShade` unless Apps Script library export behavior specifically requires `var`.
2. The compliance statement should not include `[cite: ...]` artifacts inside source comments intended for production.
3. Prefer `includes()` consistently over `indexOf(...) !== -1`.
4. Use consistent formatting; v6 compresses many unrelated statements onto one line.
5. Replace comments like “OFFICIAL AUDIT COMPLIANCE STATEMENT” with deployment documentation outside executable source.
6. `RULES`, `EXCLUDED_SHEETS`, `RENAME_EXCLUDED_SHEETS`, and `SYNC_MAPPING` can be frozen if immutable.
7. Prefix restoration for Provider/HCCRN/RNCM/SW should be table-driven.
8. Duplicate aliases in `SYNC_MAPPING` should be documented.
9. `return {bad, ok};` should be spaced as `return { bad, ok };`.
10. Menu labels are understandable, but validation menu items should be restored.
11. “Profile,” “participant,” and “record” terminology should be standardized.
12. The hardcoded file ID is not flagged because the user confirmed limited-access-folder deployment.
13. No loose equality (`==`) was observed; strict equality is used consistently.
14. `escapeForSheetCell_()` is a good spreadsheet formula-integrity guard.
15. `onOpen()` being local is good for standalone bound scripts, but insufficient alone for library consumers.
16. `console.warn` object logging may be less useful in Apps Script executions than explicit string messages.
17. Consider a setup menu item for trigger installation, Error Log creation, and operational validation.
18. Avoid writing operational warnings from frequently called predicates.
19. Add a short README explaining library installation, host wrappers, trigger ownership, and required OAuth scopes.
20. Keep this audit report separate from executable Apps Script source.

Context:
Language/Framework: Google Apps Script / JavaScript configured as a Google Apps Script Library, using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.

Purpose of the Code: The script provides independent gray shading for configured care-plan rows, synchronization from local sheets to a Home Care Services master log, reverse sync/import from that log, new sheet creation, date-based sheet organization, Drive file renaming, sheet renaming, “Copy of” cleanup, custom menu creation, and edit-trigger installation.

Specific Areas of Concern: Data security, hardcoded file ID secrecy, and folder access are explicitly out of scope because files are stored in a limited-access folder. This v6 audit focuses on library deployment wiring, syntax validity, repeated source artifacts, missing helpers, Apps Script API cost, sync correctness, validation coverage, trigger behavior, JavaScript inefficiencies, strict operations, and maintainability.

## Exhaustive line-by-line review matrix

| Approx. line(s) | Code area | Finding | Severity |
| --- | --- | --- | --- |
| 1-4 | Header | Clear purpose. | Info |
| 6-16 | Compliance statement | Contradicted by repeated source and invalid source citation artifacts. | High |
| 19-39 | `RULES` | Static shading config readable; overlapping targets should be documented. | Low |
| 41-47 | Exclusion arrays | Good operational exclusions. | Info |
| 49 | `EXCLUSION_CUTOFF_DATE` | String date parsing can be timezone-sensitive. | Medium |
| 52-54 | Target file assumption | File ID not a concern per limited-access-folder instruction. | Info |
| 55 | `TARGET_FILE_ID` line | Bare `[cite]` token after declaration is syntax error. | High |
| 57-68 | `SYNC_MAPPING` | Dense aliases; acceptable but should be documented. | Low |
| 74 | `var GrayShade` | Works for global library export; `const` cleaner if supported. | Low |
| 77 | `normalizeA1_` | Simple and effective. | Info |
| 79-94 | `resolveRef_` | Missing sheet checks; greedy quoted regex. | High |
| 96-98 | `safeGetRange_` | Silent null on errors. | Medium |
| 100 | `isBlank_` | Correct strict equality. | Info |
| 102-107 | `rangesIntersect_` | Correct but repeated Range calls. | Medium |
| 109-115 | `validate` | Source-only, no target validation, duplicate resolve. | High |
| 117-130 | `applyAll` | Silent catches and many per-target calls. | Medium |
| 132-149 | `onEdit` | Source-only shading update and silent catches. | Medium |
| 151 | Export object | Object shorthand good. | Info |
| 159-166 | `logErrorToSheet_` | Operationally unbounded logs. | Medium |
| 168-185 | `isSheetExcluded_` | Side-effecting predicate; executable citation artifacts. | High |
| 187-192 | `expandRulesForSheet_` | Does not quote sheet names. | Medium |
| 194 | `getSyncWatchRanges_` | Rebuilds static set; citation artifact is syntax error. | High |
| 195 | `escapeForSheetCell_` | Good formula integrity guard. | Info |
| 196 | `stripFieldPrefix_` | Dense but regex-escaped; citation artifact is syntax error. | High |
| 198-201 | `getRangeText_` | One read per field and temp arrays. | Medium |
| 203-209 | `parseStrictDate_` | Strict bounds good; citation artifact is syntax error. | High |
| 211-214 | `getSheetB4DateTimestamp_` | Repeated range reads. | Medium |
| 216-231 | `buildIndexMapsOptimized_` | Wide identity read; citation artifacts are syntax errors. | High |
| 233-247 | `getValidatedTargetRow_` | Duplicate guard good; citation artifacts are syntax errors. | High |
| 249-294 | `syncDataToHomeCareServices_` | Lock-safe but missing newest/blank identity guards; many citations are syntax errors. | High |
| 296-303 | `findRowInMaster_` | Target guard added; blank search still not skipped. | Medium |
| 305-323 | `applyServiceLogRowToLocalSheet_` | Inline write helper restored; citation artifacts are syntax errors. | High |
| 325-330 | `pullUpdatesToCurrentSheet` | Opens/indexes master twice; no not-found toast. | Medium |
| 332-347 | `createNewSheetFromMaster` | Active sheet copy and unguarded cleanup; citation artifact. | Medium |
| 349-357 | `sortSheetsByB4DateDescending_` | Side-effecting exclusion and absolute moves; citation artifact. | High |
| 359-364 | `renameDriveFileFromB5AndTab` | No compare-before-set or filename normalization. | Medium |
| 367 | `sanitizeSheetName_` | Can return empty string. | Medium |
| 368-373 | `makeUniqueSheetName_` | Reasonable uniqueness; implicit base length. | Low |
| 375-379 | `renameSheetFromB4_` | Concise; depends on sanitize output. | Low |
| 381-388 | `removeCopyOfPrefixAllSheets` | Silent catch and no summary. | Medium |
| 394-411 | `onOpen` | Local callback pattern mismatches library deployment without host wrappers; citation artifacts are syntax errors. | High |
| 413 | `applyGrayShadingCurrentSheet_` | Repeated active lookup. | Low |
| 414 | `applyGrayShadingAllSheets_` | Calls missing `getAllVisibleSheets_`. | High |
| 415 | `syncCurrentSheetToHomeCareServices` | Local wrapper good, but host wrapper still needed for library consumers. | Medium |
| 417-435 | `installedOnEdit` | Trigger path is expensive; citation artifact in condition is syntax error. | High |
| 437-444 | `createOnEditTrigger_` | Deletes broad `onEdit` handlers; citation artifacts are syntax errors. | High |
| repeated copy | Entire second pasted copy | Fatal if present in actual library source. | High |
