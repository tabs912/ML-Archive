# Independent Shading and Sync Audit v5

Executive Summary: The v5 unified compilation is easier to reason about than the prior library/host split because it adds local `onOpen()` callbacks and removes dotted `GrayShadeLibrary.*` menu targets, but the supplied text still contains a second full pasted copy and therefore cannot be deployed exactly as shown without duplicate top-level declaration failures. There are no data-security findings in this report because the stated deployment model stores all files in a limited-access folder; remaining high-risk findings are functional correctness, deployment integrity, Apps Script quota/performance, data quality, silent failure, and maintainability issues. The most urgent blockers are missing helper definitions, repeated source duplication in the provided artifact, loss of newest-sheet gating, noisy date-gating logs inside sheet filters, and sync/read paths that still perform expensive Apps Script calls.

🚨 Critical / High Severity: Show-stoppers, security risks, or major logic flaws. (Include line numbers/references and specific remediation code).

1. **The supplied artifact still includes a full second copy despite the compliance statement saying there are no duplicate top-level redeclarations.**
   * **Approx. lines:** 6-15 and repeated copy after `createOnEditTrigger_()`.
   * **Finding:** The header states this is a single-file compliance layout with no duplicate top-level constants, but the pasted code repeats from the header through all global `const` declarations after the first `createOnEditTrigger_()` block. If pasted into one Apps Script file exactly as supplied, duplicate `const RULES`, `const EXCLUDED_SHEETS`, `const TARGET_FILE_ID`, and `const SYNC_MAPPING` declarations cause parse-time failure.
   * **Impact:** Total deployment failure before any menu or trigger can run.
   * **Recommendation:** Keep only one copy in the actual `.gs` file and add an automated duplicate-declaration check to deployment.

   ```bash
   # Example deployment sanity check against exported .gs files
   rg '^const (RULES|EXCLUDED_SHEETS|TARGET_FILE_ID|SYNC_MAPPING)\b' .
   ```

2. **`writeToRangeText_()` is called but not defined in the v5 code.**
   * **Approx. lines:** `applyServiceLogRowToLocalSheet_()` calls `writeToRangeText_(sheet, a1, val)` and `writeToRangeText_(sheet, "I5:M5", ...)`.
   * **Finding:** Earlier versions included this helper; the v5 compilation removed it.
   * **Impact:** Pull sync and create-from-master fail with `ReferenceError: writeToRangeText_ is not defined` as soon as data is applied to a local sheet.
   * **Recommendation:** Restore the helper and keep formula escaping for sheet-integrity protection.

   ```javascript
   function writeToRangeText_(sheet, a1Notation, value) {
     const targetCell = String(a1Notation).includes(':') ? String(a1Notation).split(':')[0] : a1Notation;
     sheet.getRange(targetCell).setValue(escapeForSheetCell_(value));
   }
   ```

3. **`getAllVisibleSheets_()` is called but not defined in the v5 code.**
   * **Approx. lines:** `applyGrayShadingAllSheets_()` calls `getAllVisibleSheets_(ss)`.
   * **Finding:** The helper existed in prior versions but is absent in the unified v5 compilation.
   * **Impact:** The menu item “Apply (all sheets)” fails at runtime.
   * **Recommendation:** Restore the helper.

   ```javascript
   function getAllVisibleSheets_(ss) {
     return ss.getSheets().filter(sh => !isSheetExcluded_(sh) && !sh.isSheetHidden());
   }
   ```

4. **`isSheetExcluded_()` logs every missing or malformed B4 date as an error during normal filtering.**
   * **Approx. lines:** `isSheetExcluded_(sheet)` calls `logErrorToSheet_()` when `ts === 0`.
   * **Finding:** Sheet filtering is used by sorting, all-sheet shading, and edit-trigger early exits. Logging from a predicate makes normal workbook scans mutate the workbook and can repeatedly append warnings for every template/control/partially completed sheet that lacks a valid B4 date.
   * **Impact:** Error Log noise, slower filtering, possible trigger latency, and confusing “errors” for expected draft tabs.
   * **Recommendation:** Keep predicates side-effect-free; report malformed dates only from explicit validation commands or throttle warnings.

   ```javascript
   function isSheetExcluded_(sheet) {
     if (EXCLUDED_SHEETS.includes(sheet.getName())) return true;
     const ts = getSheetB4DateTimestamp_(sheet);
     return ts > 0 && ts < EXCLUSION_CUTOFF_DATE.getTime();
   }
   ```

5. **Newest-sheet gating was removed from push sync.**
   * **Approx. lines:** `syncDataToHomeCareServices_(sheet, isManual = false)` no longer checks `isNewestSheet_(sheet)` or equivalent before writing to the master log.
   * **Finding:** Prior versions intentionally avoided automatic push sync from older dated tabs unless manually overridden. The v5 function accepts every trigger invocation and writes to the service log after acquiring the lock.
   * **Impact:** Editing an older tab can overwrite master-log data with stale historical values.
   * **Recommendation:** Restore newest-sheet gating for automatic sync while permitting explicit manual override.

   ```javascript
   if (!isManual && !isNewestSheet_(sheet)) return;
   if (isManual && !isNewestSheet_(sheet)) {
     activeSS.toast('Manual override: syncing an older dated sheet.', 'Notice');
   }
   ```

6. **`validate()` no longer validates targets and calls `resolveRef_()` twice for each source.**
   * **Approx. lines:** `GrayShade.validate(ss, rules)`.
   * **Finding:** v5 simplifies validation to source-only checks and does not iterate `r.targets`. It also calls `resolveRef_(r.src, ss)` twice inside the same condition.
   * **Impact:** Invalid target ranges are missed, reducing the usefulness of validation and allowing silent shading failures in apply/edit paths.
   * **Recommendation:** Restore target validation and resolve once.

   ```javascript
   const src = resolveRef_(r.src, ss);
   const srcRange = safeGetRange_(src.sheet, src.a1);
   if (!srcRange) bad.push(`Rule ${i + 1} source invalid: ${r.src}`);
   for (const target of r.targets || []) {
     const ref = resolveRef_(target, ss);
     if (!safeGetRange_(ref.sheet, ref.a1)) bad.push(`Rule ${i + 1} target invalid: ${target}`);
   }
   ```

7. **`resolveRef_()` can return `{ sheet: null, a1 }`, and downstream code often treats it as a normal reference.**
   * **Approx. lines:** `resolveRef_(ref, ss)` returns `ss.getSheetByName(...)` without checking it.
   * **Finding:** Earlier versions threw explicit “Sheet not found” errors. v5 returns null sheet references and depends on later calls to fail or return null.
   * **Impact:** More silent skips in shading and validation, weaker error diagnostics, and harder debugging.
   * **Recommendation:** Throw when a sheet reference cannot be resolved.

   ```javascript
   const sheet = ss.getSheetByName(sheetName);
   if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);
   return { sheet, a1 };
   ```

8. **`findRowInMaster_()` does not guard a missing master sheet before passing it into `buildIndexMapsOptimized_()`.**
   * **Approx. lines:** `findRowInMaster_(searchTerm, activeSS)`.
   * **Finding:** `SpreadsheetApp.openById(...).getSheetByName(...)` can return null; `buildIndexMapsOptimized_(targetSheet)` then fails with a less helpful null dereference.
   * **Impact:** Pull sync and import flows fail with unclear errors.
   * **Recommendation:** Add explicit master sheet validation.

   ```javascript
   const targetSheet = SpreadsheetApp.openById(TARGET_FILE_ID).getSheetByName('Home Care Services');
   if (!targetSheet) throw new Error('Home Care Services sheet not found in master log.');
   ```

9. **`pullUpdatesToCurrentSheet()` can open/read the master log twice per invocation.**
   * **Approx. lines:** `findRowInMaster_(getRangeText_(sheet, "V1"), activeSS) || findRowInMaster_(getRangeText_(sheet, "B5"), activeSS)`.
   * **Finding:** Each `findRowInMaster_()` call opens the target spreadsheet and rebuilds identity maps. If the PMR lookup misses or PMR is blank, the name lookup repeats the same expensive work.
   * **Impact:** Unnecessary Apps Script calls and slower manual pull.
   * **Recommendation:** Read local PMR/name first, build master indexes once, then search both terms.

10. **`syncDataToHomeCareServices_()` no longer checks for both Name and PMR being blank before opening the master log.**
    * **Approx. lines:** data collection and target-open block in `syncDataToHomeCareServices_()`.
    * **Finding:** Prior versions skipped sync when no identity existed. v5 builds `dataToSync`, opens the target file, builds maps, then asks for a row with empty keys.
    * **Impact:** Unnecessary service calls; append branch may add a row with empty identity if no match is found.
    * **Recommendation:** Restore early identity guard.

    ```javascript
    const pmr = String(dataToSync['Participant PMR#'] || '').trim();
    const name = String(dataToSync.Name || '').trim();
    if (!pmr && !name) return;
    ```

11. **`buildIndexMapsOptimized_()` still reads a wide rectangular identity range.**
    * **Approx. lines:** `sheet.getRange(1, 1, lastRow, Math.max(pmrIdx, nameIdx) + 1).getValues()`.
    * **Finding:** It avoids a full data range but still reads unused columns from A through the farther identity column.
    * **Impact:** Cost scales with unused columns.
    * **Recommendation:** Read PMR and Name columns separately.

12. **`installedOnEdit(e)` calls `isSheetExcluded_(sheet)` at the top, which can now write to Error Log.**
    * **Approx. lines:** `installedOnEdit(e)` early guard plus side-effecting `isSheetExcluded_()`.
    * **Finding:** A simple edit on a malformed-date sheet can trigger logging before any sync/shading decision.
    * **Impact:** Edit-trigger latency and noisy logs.
    * **Recommendation:** Make exclusion checks pure and move warnings to validation.

13. **`createNewSheetFromMaster()` deletes partial sheets without guarding cleanup errors.**
    * **Approx. lines:** catch block with `if (newSheet) activeSS.deleteSheet(newSheet)`.
    * **Finding:** If deletion fails, logging may not run and the original error is obscured.
    * **Impact:** Partial sheets can remain or error handling can cascade.
    * **Recommendation:** Wrap cleanup in its own try/catch.

14. **`createOnEditTrigger_()` deletes every installable trigger whose handler is `onEdit`.**
    * **Approx. lines:** trigger helper filter includes `['installedOnEdit', 'onEdit']`.
    * **Finding:** A different workflow in the same project could legitimately use an installable `onEdit` handler.
    * **Impact:** Trigger setup can break unrelated automation.
    * **Recommendation:** Delete only the handler this library owns, or document this destructive behavior clearly.

15. **`newRow = maps.headers.map(h => escapeForSheetCell_(dataToSync[h]))` converts unmapped fields to blank strings.**
    * **Approx. lines:** append branch in `syncDataToHomeCareServices_()`.
    * **Finding:** `escapeForSheetCell_(undefined)` returns an empty string, which is acceptable for append. The update branch preserves unmapped existing values, but append creates no defaults for required master-only columns.
    * **Impact:** Master rows can be created without required non-mapped metadata.
    * **Recommendation:** Validate required append columns before writing, or provide explicit defaults.

⚠️ Medium Severity: Performance bottlenecks, architectural issues, and missing edge cases. (Provide refactored code snippets).

1. **`EXCLUSION_CUTOFF_DATE` uses string-date parsing.**
   * **Approx. line:** global cutoff declaration.
   * **Risk:** Timezone-dependent parsing can produce boundary surprises.
   * **Recommendation:** `const EXCLUSION_CUTOFF_DATE = new Date(2024, 0, 1);`

2. **No `getNewestSheetNamesCached_()` or `isNewestSheet_()` helper remains.**
   * **Approx. lines:** absent from operational subsystem.
   * **Risk:** If newest gating is still a business requirement, required helpers must be restored or replaced.

3. **`safeGetRange_()` remains intentionally silent.**
   * **Approx. lines:** library core range helper.
   * **Risk:** Appropriate for UI shading; weak for required sync fields.
   * **Recommendation:** Add `getRequiredRange_()` for sync-critical reads.

4. **`rangesIntersect_()` recomputes `a.getRow()`, `a.getColumn()`, and dimensions multiple times.**
   * **Risk:** Minor, but Range methods are service-backed objects and should be minimized in hot edit paths.
   * **Recommendation:** Store bounds in local constants, as prior versions did.

5. **`applyAll()` and `onEdit()` have nested silent `catch(_) {}` blocks.**
   * **Risk:** Shading failures become invisible unless validation is run manually.
   * **Recommendation:** Log or count failures during manual apply; keep trigger logging throttled.

6. **`expandRulesForSheet_()` does not quote sheet names.**
   * **Risk:** Sheet names containing `!` or quotes can break generated references.
   * **Recommendation:** Quote generated sheet references.

7. **`getSyncWatchRanges_()` rebuilds a static list on every edit.**
   * **Risk:** Minor but avoidable trigger-path work.
   * **Recommendation:** Precompute `SYNC_WATCH_RANGES` after `SYNC_MAPPING`.

8. **`getRangeText_()` uses `flat().map().filter()` temporary arrays.**
   * **Risk:** Fine for small ranges, but repeated across many sync fields.
   * **Recommendation:** Use nested loops in hot paths.

9. **`getRangeText_()` makes one Spreadsheet read per field.**
   * **Risk:** Push sync reads every mapped field and notes separately.
   * **Recommendation:** Batch stable template rectangles such as `A4:V19` and extract in memory if runtime grows.

10. **`parseStrictDate_()` accepts the first date found in arbitrary text.**
    * **Risk:** If B4:F4 contains multiple dates, the first match may not be intended.
    * **Recommendation:** Standardize B4 date format or validate exactly one date.

11. **`logErrorToSheet_()` still appends unbounded operational rows.**
    * **Risk:** This is not treated as a data-security concern per user instruction, but it is an operational maintainability and quota concern.
    * **Recommendation:** Add retention and duplicate-warning throttling.

12. **`console.error(message)` in `logErrorToSheet_()` catch can throw away the original logging exception.**
    * **Risk:** The fallback logs only the original message, not why sheet logging failed.
    * **Recommendation:** `console.error('Failed to write Error Log: ' + e + '; original: ' + message);`

13. **`getValidatedTargetRow_()` logs duplicate identifiers verbatim.**
    * **Risk:** Data security is out of scope, but verbose duplicate messages can clutter logs.
    * **Recommendation:** Log duplicate type and count, not full key text, unless support specifically needs it.

14. **`syncDataToHomeCareServices_()` ignores `isManual` except for the function signature.**
    * **Risk:** Manual mode no longer gives toasts or older-sheet override semantics.
    * **Recommendation:** Restore user feedback for manual runs.

15. **`nextRow` in append branch should be `const`, not `let`.**
    * **Risk:** Small scoping/style issue.

16. **`findRowInMaster_()` does not skip blank search terms.**
    * **Risk:** Empty PMR/name searches still build maps and evaluate duplicate logic.
    * **Recommendation:** Return null immediately for blank terms.

17. **`createNewSheetFromMaster()` copies the active sheet, not a dedicated `TEMPLATE`.**
    * **Risk:** Users can import onto a copy of the wrong sheet.
    * **Recommendation:** Prefer `activeSS.getSheetByName('TEMPLATE')` when present.

18. **`new Date().toLocaleDateString()` creates locale-dependent sheet names.**
    * **Risk:** Sheet naming varies by user locale and can affect sorting/renaming expectations.
    * **Recommendation:** Format dates explicitly, e.g. `M/d/yyyy`.

19. **`sortSheetsByB4DateDescending_()` moves dated sheets to absolute front positions.**
    * **Risk:** Control tabs can be displaced.
    * **Recommendation:** Define pinned-front and pinned-back sheet groups.

20. **`renameDriveFileFromB5AndTab()` always calls `file.setName(...)` after the early guard.**
    * **Risk:** It renames even when the current name already matches, causing unnecessary DriveApp calls.
    * **Recommendation:** Compare before renaming.

21. **Drive filename generation is not length-normalized.**
    * **Risk:** Long participant names and sheet names create unwieldy Drive titles.
    * **Recommendation:** Add `sanitizeDriveFileName_()` with length cap.

22. **`sanitizeSheetName_()` can return an empty string.**
    * **Risk:** Callers like `makeUniqueSheetName_()` may receive empty desired names.
    * **Recommendation:** Provide fallback such as `'Untitled'`.

23. **`makeUniqueSheetName_()` truncates base to 90 chars regardless of suffix length.**
    * **Risk:** It works, but the limit is implicit and less precise than calculating suffix length.

24. **`removeCopyOfPrefixAllSheets()` silently ignores rename failures.**
    * **Risk:** Users receive no cleanup result summary.
    * **Recommendation:** Track `renamed` and `failed` counts and toast both.

25. **`onOpen()` menu no longer includes validation items.**
    * **Risk:** v5 removed prior validation menu entries, making mapping validation less discoverable.
    * **Recommendation:** Add current/all sheet validation and service-log integrity validation menu items.

26. **`applyGrayShadingCurrentSheet_()` calls `SpreadsheetApp.getActive()` twice.**
    * **Risk:** Minor repeated active lookup.
    * **Recommendation:** Store `const ss = SpreadsheetApp.getActive();`.

27. **`installedOnEdit()` calls `sheet.getRange(a1)` for every watch range on every edit.**
    * **Risk:** Trigger-path Spreadsheet calls scale with watch range count.
    * **Recommendation:** Precompute A1 rectangles and compare numeric bounds without Range calls.

28. **`installedOnEdit()` sorts sheets immediately after a B4 edit.**
    * **Risk:** Sorting can be disruptive during edits and is service-call heavy.
    * **Recommendation:** Consider deferring sort to a menu action or time-based trigger.

29. **`createOnEditTrigger_()` does not toast if trigger deletion/creation fails.**
    * **Risk:** Users get no friendly feedback on permission/runtime failures.
    * **Recommendation:** Wrap in try/catch and alert/toast appropriately.

30. **No automated tests are present for pure helpers.**
    * **Risk:** Date parsing, sheet-name sanitization, identity duplicate detection, and formula escaping can regress unnoticed.
    * **Recommendation:** Add clasp/gas-local tests or a lightweight JS harness for pure functions.

💡 Low Severity / Nitpicks: Variable naming, formatting, styling, and minor DRY improvements.

1. `var GrayShade` can be `const GrayShade` unless Apps Script export behavior requires `var`.
2. The `OFFICIAL AUDIT COMPLIANCE STATEMENT` is too strong while the supplied text still contains a repeated copy.
3. Prefer `includes()` over `indexOf(...) !== -1` in Apps Script V8.
4. Use consistent semicolon and line-break style; v5 compresses many statements onto one line.
5. Avoid comments saying “FIXED” unless linked to a versioned change record.
6. `RULES`, `EXCLUDED_SHEETS`, and `SYNC_MAPPING` could be `Object.freeze(...)` if immutable.
7. Prefix-restoration logic for A6/A7/A8/A9 should be table-driven.
8. `Provider` and `Provider:` duplicate aliases should be documented or converted to alias metadata.
9. `return {bad, ok};` should include spacing for readability: `return { bad, ok };`.
10. Menu item labels are clear, but validation menu items should be restored.
11. “Import Profile” and “participant” terminology should be standardized.
12. `syncDataToHomeCareServices_(sheet, isManual = false)` should use `isManual` or remove it.
13. Prefer explicit helper names such as `getTargetServiceLogSheet_()`.
14. Consider moving audit/compliance prose out of executable code into deployment docs.
15. No loose equality (`==`) was observed; strict equality is used consistently.
16. `escapeForSheetCell_()` correctly guards formula-like leading characters.
17. The hardcoded file ID is not flagged, per the limited-access-folder instruction.
18. `sortSheetsByB4DateDescending_()` should document whether no-date sheets are excluded intentionally.
19. `removeCopyOfPrefixAllSheets()` should include sheet names in console warnings if warnings are kept.
20. `onOpen()` being local is an improvement over dotted library menu callbacks for single-file deployment.

Context:
Language/Framework: Google Apps Script / JavaScript using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.

Purpose of the Code: The code implements gray shading for configured care-plan rows, synchronization from local sheets to a Home Care Services master log, reverse sync/import from that log, new sheet creation, date-based sheet organization, Drive file renaming, sheet renaming, “Copy of” cleanup, custom menu creation, and edit-trigger installation.

Specific Areas of Concern: Data security and file-ID secrecy are explicitly out of scope because all files are stored in a limited-access folder. This v5 review focuses on deployment correctness, missing functions, line-by-line runtime behavior, Apps Script API costs, silent failures, stale/older-sheet sync behavior, validation coverage, JavaScript inefficiencies, strict operations, and maintainability.

## Exhaustive line-by-line review matrix

| Approx. line(s) | Code area | Finding | Severity |
| --- | --- | --- | --- |
| 1-4 | Header | Clear unified-compilation intent. | Info |
| 6-15 | Compliance statement | Contradicted by repeated full copy in supplied artifact. | High |
| 19-39 | `RULES` | Static mapping is readable; overlapping targets should be documented. | Low |
| 41-47 | Exclusion arrays | Good operational exclusions; protection/setup still needed. | Medium |
| 49 | `EXCLUSION_CUTOFF_DATE` | String date parsing can be timezone-sensitive. | Medium |
| 50 | `TARGET_FILE_ID` | Not a concern per limited-access-folder instruction. | Info |
| 52-63 | `SYNC_MAPPING` | Dense mapping; duplicate aliases are intentional but should be documented. | Low |
| 69 | `var GrayShade` | Works but `const` preferred if possible. | Low |
| 72 | `normalizeA1_` | Good simple normalization. | Info |
| 74-89 | `resolveRef_` | Does not throw when sheet is missing; quoted regex is greedy. | High |
| 91-93 | `safeGetRange_` | Silent null on errors. | Medium |
| 95 | `isBlank_` | Correct blank test for current use. | Info |
| 97-102 | `rangesIntersect_` | Correct math but repeated Range method calls. | Medium |
| 105-111 | `validate` | Source-only; no target validation; duplicate resolve call. | High |
| 114-127 | `applyAll` | Nested silent catches; repeated range writes. | Medium |
| 130-147 | `onEdit` | Source-only self-heal; silent failures. | Medium |
| 149 | Export object | Object shorthand good; exported underscore method is odd. | Low |
| 157-164 | `logErrorToSheet_` | Operational log unbounded; no retention/throttle. | Medium |
| 166-180 | `isSheetExcluded_` | Predicate has side effect by logging malformed dates. | High |
| 182-187 | `expandRulesForSheet_` | Does not quote sheet names. | Medium |
| 189 | `getSyncWatchRanges_` | Static list rebuilt on every edit. | Medium |
| 190 | `escapeForSheetCell_` | Good formula integrity guard. | Info |
| 191 | `stripFieldPrefix_` | Regex escaping present; dense one-liner. | Low |
| 193-196 | `getRangeText_` | Repeated service calls and temp arrays. | Medium |
| 198-203 | `parseStrictDate_` | Strict validation good; first-date match should be documented. | Low |
| 205-208 | `getSheetB4DateTimestamp_` | Reads B4 then B4:F4; acceptable but repeated. | Medium |
| 210-224 | `buildIndexMapsOptimized_` | Still reads wide identity rectangle. | High |
| 226-234 | `getValidatedTargetRow_` | Duplicate detection good; messages verbose. | Medium |
| 236-263 | `syncDataToHomeCareServices_` | Lock-safe but missing newest gating and blank identity guard. | High |
| 239 | Lock acquisition | Correct guarded release later. | Info |
| 240-247 | Data collection | Many individual `getRangeText_` calls. | Medium |
| 249-250 | Target open | Missing helper abstraction; target sheet checked here. | Low |
| 253 | Duplicate catch return | Silent automated skip; no manual feedback. | Medium |
| 256-259 | Append branch | Uses `getLastRow()` improvement; required defaults not validated. | Medium |
| 261-263 | Catch/finally | Lock release correct; logging is generic. | Info |
| 266-273 | `findRowInMaster_` | Missing null targetSheet guard; blank term not skipped. | High |
| 275-289 | `applyServiceLogRowToLocalSheet_` | Calls missing `writeToRangeText_`; runtime blocker. | High |
| 292-297 | `pullUpdatesToCurrentSheet` | Can open/read master twice; no user toast on failures. | High |
| 299-310 | `createNewSheetFromMaster` | Active sheet copy and unguarded cleanup. | Medium |
| 312-320 | `sortSheetsByB4DateDescending_` | Absolute moves can displace control tabs. | Medium |
| 322-327 | `renameDriveFileFromB5AndTab` | No compare-before-set; no Drive filename length normalization. | Medium |
| 329 | `sanitizeSheetName_` | Can return empty string. | Medium |
| 330-335 | `makeUniqueSheetName_` | Reasonable uniqueness; base truncation is implicit. | Low |
| 337-341 | `renameSheetFromB4_` | Concise and functional; relies on sanitize result. | Low |
| 343-350 | `removeCopyOfPrefixAllSheets` | Silent catch and no result summary. | Medium |
| 356-372 | `onOpen` menu | Local callbacks are an improvement; validation items missing. | Medium |
| 374 | `applyGrayShadingCurrentSheet_` | Calls `SpreadsheetApp.getActive()` twice. | Low |
| 375 | `applyGrayShadingAllSheets_` | Calls missing `getAllVisibleSheets_`; runtime blocker. | High |
| 376 | Manual push wrapper | Good local callback. | Info |
| 378-386 | `installedOnEdit` | Side-effecting exclusion, expensive watch range calls, immediate sort. | High |
| 384 | Shading catch | Logs errors; okay but can be noisy. | Medium |
| 385 | Sync watch check | Calls `sheet.getRange()` for each watched range. | Medium |
| 388-393 | `createOnEditTrigger_` | Deletes `onEdit` triggers beyond owned handler; should narrow scope. | Medium |
| repeated copy | Entire second pasted copy | Fatal if deployed as one file; remove repeated block. | High |
