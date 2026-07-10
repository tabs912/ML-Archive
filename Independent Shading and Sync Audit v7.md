# Independent Shading and Sync Audit v7

Executive Summary: This v7 report incorporates the audit clarifications provided after v6: hardcoded file ID/data security concerns are out of scope, name fallback is an approved operational exception for a bounded 100-150 participant roster, duplicate identity detection is considered hardened, edit-trigger multi-cell coverage is considered patched, and direct/local menu callbacks are accepted for the stated deployment model. The remaining review therefore focuses on conditional deployment hygiene, source-vs-audit artifact cleanup, missing or unverifiable helpers in the pasted compilation, Apps Script API cost, operational noise, and maintainability. Overall quality is acceptable for the described restricted, small-team environment once the remaining runtime helper gap and source artifact cleanup are confirmed in the actual Apps Script project.

## Accepted audit clarifications / no longer flagged as open blockers

1. **HIGH-01 Unified compilation duplication:** Accepted as resolved for the actual deployment when detached audit files are not compiled as one monolithic source and the runtime project contains exactly one pristine global definition set.
2. **HIGH-02 Library/menu callback routing:** Accepted as resolved for the stated direct/local callback execution model, provided the host/library deployment really exposes matching local functions at runtime.
3. **HIGH-03 `onOpen()` entrypoint:** Accepted as resolved because the supplied framework includes a root `onOpen()` that builds the menu.
4. **HIGH-04 Name fallback:** Accepted as an approved operational exception because the roster is bounded and duplicate-name/duplicate-PMR detection aborts before writes.
5. **HIGH-05 Silent duplicate overwrite:** Accepted as patched because the mapping layer stores row-index arrays and `getValidatedTargetRow_()` aborts on duplicate PMR/name matches.
6. **HIGH-06 Multi-cell edit trigger blind spot:** Accepted as patched because `getSyncWatchRanges_()` and `GrayShade.rangesIntersect_()` check full mapped ranges.
7. **HIGH-07 Raw toast leakage:** Accepted as patched for user-facing flows where generic toasts are used and raw details are routed to logs/console.
8. **HIGH-08 Header validation asymmetry:** Accepted as patched because push and pull both use `buildIndexMapsOptimized_()` for critical `Participant PMR#` and `Name` header validation.
9. **HIGH-09 Full-grid master reads:** Accepted as directionally improved because broad `getDataRange()` lookups were replaced by bounded header/identity reads and row-level writes, though one remaining optimization is noted below.
10. **MEDIUM-01 Hardcoded file ID:** Not a concern in this deployment because files are limited to the authorized restricted folder.
11. **MEDIUM-03 / MEDIUM-04 cache parsing and TTL:** Accepted as patched if the deployed library contains the validated 15-second cache helper described in the clarification.
12. **MEDIUM-05 / MEDIUM-06 prefix stripping:** Accepted as patched because digit stripping was removed and dynamic regex labels are escaped.
13. **MEDIUM-07 date bounds:** Accepted as patched because explicit month/day bounds are present.
14. **MEDIUM-08 hidden tabs:** Not applicable because the workbook environment does not use hidden tabs.
15. **LOW-14 strict operations:** Confirmed; no loose equality concern was observed.

🚨 Critical / High Severity: Show-stoppers, security risks, or major logic flaws. (Include line numbers/references and specific remediation code).

1. **Executable source must not contain literal `[cite: ...]` audit markers.**
   * **Clarified status:** Treat this as a source hygiene blocker only if those markers exist in the actual Apps Script source. If they are only prompt/audit annotations, this is already resolved.
   * **Finding:** The pasted compilation includes multiple `[cite: ...]` fragments after executable statements. Apps Script will not parse those as valid JavaScript.
   * **Impact:** Parse-time failure if the annotated text is copied into Apps Script as source.
   * **Recommendation:** Keep citations in audit reports only; remove them from `.gs` source.

   ```javascript
   // Production source should be citation-free.
   const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
   ```

2. **`getAllVisibleSheets_()` is referenced but not present in the supplied compilation.**
   * **Approx. line/function:** `applyGrayShadingAllSheets_()`.
   * **Finding:** The all-sheets menu action calls `getAllVisibleSheets_(ss)`, but the provided compilation does not define the helper.
   * **Impact:** “Apply (all sheets)” fails with `ReferenceError` unless the helper exists in another deployed library file.
   * **Recommendation:** Add the helper to the same library namespace or confirm it exists in a deployed companion file.

   ```javascript
   function getAllVisibleSheets_(ss) {
     return ss.getSheets().filter(sh => !isSheetExcluded_(sh) && !sh.isSheetHidden());
   }
   ```

3. **Deployment model must be documented because the clarification mixes library deployment and direct local callback execution.**
   * **Finding:** The clarification says the script is configured for a Google Apps Script Library, while also saying callbacks are mapped to local function definitions. Both can work, but only if host spreadsheets either run a bound copy or define wrappers that route to the library.
   * **Impact:** If future maintainers install the library without host wrappers, `onOpen()`, menu callbacks, and trigger setup can fail to invoke expected functions.
   * **Recommendation:** Add a short deployment README showing the exact approved topology: direct bound deployment, library HEAD reference, or host wrapper model.

   ```javascript
   // Host wrapper model if using the centralized library from container spreadsheets.
   function onOpen(e) { GrayShadeLibrary.onOpen(e); }
   function applyGrayShadingAllSheets_() { GrayShadeLibrary.applyGrayShadingAllSheets_(); }
   function syncCurrentSheetToHomeCareServices() { GrayShadeLibrary.syncCurrentSheetToHomeCareServices(); }
   ```

4. **Newest-sheet gating must be verified in the deployed code if stale-tab overwrite prevention remains a requirement.**
   * **Finding:** The pasted sync function does not visibly call `isNewestSheet_()` before pushing to the master log. The clarification references newest-sheet cache improvements, but the supplied compilation excerpt does not show the corresponding gating call.
   * **Impact:** If the actual deployed code matches the excerpt, edits on older tabs can still push stale values.
   * **Recommendation:** Confirm the deployed library includes both the cache helper and the sync-time gate.

   ```javascript
   if (!isManual && !isNewestSheet_(sheet)) return;
   ```

5. **Blank identity guard should be explicit before push sync opens the master log.**
   * **Finding:** The visible push flow gathers data and proceeds to target lookup without an obvious early return for both blank `Participant PMR#` and blank `Name`.
   * **Impact:** A blank or partially initialized sheet can consume master-log reads and may append incomplete rows if downstream guards do not catch it.
   * **Recommendation:** Keep a clear identity guard immediately after data extraction.

   ```javascript
   const pmr = String(dataToSync['Participant PMR#'] || '').trim();
   const name = String(dataToSync.Name || '').trim();
   if (!pmr && !name) return;
   ```

6. **Validation coverage regressed in the supplied compilation if `validate()` remains source-only.**
   * **Finding:** The visible `validate()` only checks `r.src` and does not validate every target in `r.targets`.
   * **Impact:** Invalid target ranges can pass validation and fail silently during shading.
   * **Recommendation:** Restore source and target validation, including target indexes in the error text.

7. **`resolveRef_()` should fail fast when a referenced sheet is missing.**
   * **Finding:** The visible helper returns `{ sheet: ss.getSheetByName(...), a1 }` without checking for null.
   * **Impact:** Missing sheet references become silent skips or later null errors.
   * **Recommendation:** Throw an explicit sheet-not-found error in `resolveRef_()`.

8. **`isSheetExcluded_()` has side effects when date gating fails.**
   * **Clarified status:** Safe exclusion on malformed B4 is accepted. The remaining concern is not data safety; it is operational noise and Apps Script cost.
   * **Finding:** The predicate logs to the Error Log when `ts === 0`. This function is called from sorting, trigger guards, and all-sheet workflows.
   * **Impact:** Normal scans can append repeated warnings and slow execution.
   * **Recommendation:** Keep `isSheetExcluded_()` pure and move date warnings to validation, or throttle log writes per sheet/date.

9. **The identity index optimization should match the stated single-dimension-list design.**
   * **Clarified status:** Full-grid `getDataRange()` removal is accepted as patched.
   * **Finding:** The excerpt still shows a rectangular read from column A through the farther identity column. That is much better than full-grid reads but not identical to single-column identity reads.
   * **Impact:** If identity columns are far right, unused columns are still loaded.
   * **Recommendation:** Read `Participant PMR#` and `Name` columns separately if master log growth becomes noticeable.

10. **Trigger ownership remains broad if `createOnEditTrigger_()` deletes both `installedOnEdit` and `onEdit`.**
    * **Clarified status:** Legacy trigger cleanup is accepted as intentional.
    * **Finding:** In a host workbook with other automations, deleting every installable trigger whose handler is `onEdit` can remove unrelated workflows.
    * **Impact:** Setup can unexpectedly break non-shading automation.
    * **Recommendation:** Document ownership clearly or delete only known trigger IDs/handler names owned by this library.

⚠️ Medium Severity: Performance bottlenecks, architectural issues, and missing edge cases. (Provide refactored code snippets).

1. **`EXCLUSION_CUTOFF_DATE = new Date('2024-01-01')` remains timezone-sensitive.**
   * **Recommendation:** Use `new Date(2024, 0, 1)`.

2. **`safeGetRange_()` still silently returns null for all exceptions.**
   * **Recommendation:** Keep it for visual shading, but add `getRequiredRange_()` for sync-critical reads.

3. **`rangesIntersect_()` repeatedly calls Range getters.**
   * **Recommendation:** Store row/column bounds in locals to reduce hot-path calls.

4. **`applyAll()` and `GrayShade.onEdit()` still use nested silent catches.**
   * **Recommendation:** Count/report errors during manual apply; keep trigger logging throttled.

5. **`expandRulesForSheet_()` does not quote generated sheet names.**
   * **Recommendation:** Quote sheet names when generating `Sheet!A1` refs.

6. **`getSyncWatchRanges_()` rebuilds static range lists.**
   * **Recommendation:** Precompute `SYNC_WATCH_RANGES` once after `SYNC_MAPPING`.

7. **`installedOnEdit()` calls `sheet.getRange(a1)` for each watched range.**
   * **Recommendation:** Precompute numeric A1 rectangles and compare bounds without creating Range objects on every edit.

8. **`getRangeText_()` uses one Spreadsheet read per field plus `flat().map().filter()`.**
   * **Recommendation:** Accept for small forms; otherwise batch stable form rectangles and use nested loops.

9. **`parseStrictDate_()` accepts the first date found in text.**
   * **Recommendation:** Require exactly one date in B4:F4 if accidental multiple dates are possible.

10. **Operational log retention is still undefined.**
    * **Clarified status:** Not a data-security issue. This is an operational noise/quota issue only.
    * **Recommendation:** Cap log rows and throttle repeated date-gating messages.

11. **`syncDataToHomeCareServices_()` should use `isManual` consistently.**
    * **Recommendation:** Manual mode should provide busy, skipped, duplicate, older-sheet override, success, and failure feedback; automatic mode should stay quiet unless logging is needed.

12. **Append path should use `const nextRow` if not reassigned.**
   * **Recommendation:** Prefer immutable local bindings.

13. **Append path should validate required master-only columns.**
   * **Recommendation:** If the master log has required columns not in `SYNC_MAPPING`, validate or default them before append.

14. **`findRowInMaster_()` should skip blank search terms.**
   * **Recommendation:** `if (!String(searchTerm || '').trim()) return null;`.

15. **`pullUpdatesToCurrentSheet()` can build indexes twice.**
   * **Recommendation:** Build a master context once and search PMR/name against it.

16. **`applyServiceLogRowToLocalSheet_()` writes one field at a time.**
   * **Recommendation:** Accept for small manual pulls; consider batching adjacent writes if import grows slow.

17. **Push reads full multi-cell ranges while pull writes only top-left cells.**
   * **Recommendation:** Document this asymmetric design because it is intentional but not obvious.

18. **`pullUpdatesToCurrentSheet()` should toast when no row is found.**
   * **Recommendation:** Add explicit “not found” feedback.

19. **`createNewSheetFromMaster()` cleanup should guard `deleteSheet`.**
   * **Recommendation:** Wrap cleanup in its own try/catch.

20. **`createNewSheetFromMaster()` should prefer a named `TEMPLATE` sheet.**
   * **Recommendation:** Copy `TEMPLATE` when present instead of the active sheet.

21. **`new Date().toLocaleDateString()` is locale-dependent.**
   * **Recommendation:** Use a deterministic date formatter for fallback sheet names.

22. **`sortSheetsByB4DateDescending_()` uses repeated `setActiveSheet()` / `moveActiveSheet()` calls.**
   * **Clarified status:** The code already skips moves when a sheet is in place.
   * **Remaining recommendation:** Keep this as a manual/menu operation or avoid running it too often in edit triggers.

23. **`renameDriveFileFromB5AndTab()` should compare before `file.setName(...)`.**
   * **Recommendation:** Avoid unnecessary DriveApp writes.

24. **Drive filename sanitation should be explicitly separate from sheet-name sanitation.**
   * **Recommendation:** Add a dedicated `sanitizeDriveFileName_()` if odd Drive titles become an issue.

25. **`sanitizeSheetName_()` can return an empty string.**
   * **Recommendation:** Fallback to `'Untitled'`.

26. **`removeCopyOfPrefixAllSheets()` silently ignores rename failures.**
   * **Recommendation:** Track success/failure counts and toast a summary.

27. **Validation menu items are not visible in the supplied `onOpen()` menu.**
   * **Recommendation:** Restore validation items if maintainers need menu-level mapping checks.

28. **`applyGrayShadingCurrentSheet_()` calls `SpreadsheetApp.getActive()` more than once.**
   * **Recommendation:** Store `const ss = SpreadsheetApp.getActive();`.

29. **No pure-helper tests are shown.**
   * **Recommendation:** Add lightweight tests for date parsing, sheet-name sanitization, formula escaping, and duplicate identity detection.

30. **Production comments should distinguish business exceptions from technical guarantees.**
   * **Recommendation:** Keep `AUDIT EXCEPTION` comments concise and move detailed rationale to deployment docs.

💡 Low Severity / Nitpicks: Variable naming, formatting, styling, and minor DRY improvements.

1. `var GrayShade` can remain if required for Apps Script library export, but `const GrayShade` is preferable when compatible.
2. Modern object shorthand in the `GrayShade` export is good.
3. `Date.now()` is fine for timestamps when numeric epoch values are intended; use `new Date()` for user-readable sheet logs.
4. Regex whitespace splitting with `/\s+/` is an improvement for names with irregular spaces.
5. `escapeForSheetCell_()` correctly protects spreadsheet formula integrity.
6. Keep explicit `SYNC_MAPPING` labels because they mirror real-world document layout.
7. `.flat()` is valid in Apps Script V8.
8. Strict equality (`===` / `!==`) is used consistently; no loose equality finding remains.
9. Prefer consistent multiline formatting over compressed one-line functions for auditability.
10. Add a README covering library installation, host wrappers or direct deployment mode, trigger ownership, required scopes, and accepted operational exceptions.
11. The hardcoded `TARGET_FILE_ID` remains accepted under the restricted-folder deployment assumption.
12. Avoid including external citation placeholders in production Apps Script source.
13. Keep the name-fallback exception comment near `getValidatedTargetRow_()` because it documents an approved business rule.
14. Consider freezing static configuration objects if maintainers should not mutate them at runtime.
15. Continue keeping `TEMPLATE` and `Error Log` excluded from operational sheet loops.

Context:
Language/Framework: Google Apps Script / JavaScript, deployed through a Google Apps Script Library or direct/local callback model as clarified, using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.

Purpose of the Code: The script provides independent gray shading for configured care-plan rows, push synchronization to a Home Care Services master log, reverse sync/import from that log, new sheet creation, chronological sheet organization, Drive file renaming, sheet renaming, “Copy of” cleanup, custom menu creation, and edit-trigger installation.

Specific Areas of Concern: Data security and hardcoded file ID secrecy are explicitly out of scope because all files are in a restricted folder. This v7 audit focuses on reconciling accepted audit clarifications with the supplied compilation, confirming deployment wiring, syntax cleanliness, remaining missing helpers, Apps Script API cost, trigger behavior, validation coverage, operational logging noise, JavaScript inefficiencies, strict operations, and maintainability.

## Exhaustive line-by-line review matrix

| Approx. line(s) | Code area | Finding | Severity |
| --- | --- | --- | --- |
| Header/comment block | Compliance statement | Accepted as deployment clarification, but production source should not include external `[cite]` placeholders. | Medium |
| Global constants | `RULES`, exclusions, target ID, mapping | Hardcoded file ID accepted; citation artifacts must be removed from executable declarations. | High if artifacts are in source |
| `GrayShade` export | Library core | Export shorthand is good; `var` is acceptable if needed for Apps Script global export. | Low |
| `resolveRef_` | Reference parsing | Sheet-not-found should throw explicitly; regex remains greedy. | High |
| `safeGetRange_` | Range helper | Silent null is acceptable for shading, not for required sync. | Medium |
| `validate` | Mapping validation | Source-only validation should be expanded to targets. | High |
| `applyAll` | Shading apply | Silent catches preserve UI stability but hide mapping defects. | Medium |
| `GrayShade.onEdit` | Shading edit handler | Multi-cell source coverage is okay; target-format self-heal is still limited. | Medium |
| `logErrorToSheet_` | Operational logging | Not a data-security issue; add retention/throttling for noise and quotas. | Medium |
| `isSheetExcluded_` | Date-gating predicate | Safe exclusion accepted; logging from predicate can be noisy/costly. | High |
| `expandRulesForSheet_` | Rule expansion | Generated sheet refs should quote sheet names. | Medium |
| `getSyncWatchRanges_` | Watch range helper | Multi-cell coverage accepted; precompute list to reduce edit-path work. | Medium |
| `escapeForSheetCell_` | Formula integrity | Good protection. | Info |
| `stripFieldPrefix_` | Prefix cleanup | Digit corruption and regex escaping concerns accepted as patched. | Info |
| `getRangeText_` | Field extraction | Repeated Spreadsheet reads and array churn remain. | Medium |
| `parseStrictDate_` | Date parser | Bounds check accepted; first-date matching should be documented. | Low |
| `buildIndexMapsOptimized_` | Master index | Duplicate vector design accepted; verify implementation reads only needed identity columns if scale grows. | Medium |
| `getValidatedTargetRow_` | Identity matching | Name fallback accepted; duplicate abort is the correct guardrail. | Info |
| `syncDataToHomeCareServices_` | Push sync | Verify newest gating and blank identity guard are present in deployed code. | High |
| `findRowInMaster_` | Pull lookup | Header validation accepted; skip blank terms and avoid duplicate index builds. | Medium |
| `applyServiceLogRowToLocalSheet_` | Reverse write | Inline top-left writes are now present; document push/pull asymmetry. | Medium |
| `pullUpdatesToCurrentSheet` | Manual pull | Could build master index twice and lacks not-found toast. | Medium |
| `createNewSheetFromMaster` | Import sheet generation | Cleanup exists; guard delete failure and prefer TEMPLATE source. | Medium |
| `sortSheetsByB4DateDescending_` | Sheet organization | Hidden-tab concern accepted as non-issue; avoid frequent sort from edit path. | Medium |
| `renameDriveFileFromB5AndTab` | Drive rename | Compare before rename and optionally sanitize Drive title. | Low |
| `sanitizeSheetName_` / `makeUniqueSheetName_` | Name helpers | Generally good; add empty-name fallback. | Low |
| `removeCopyOfPrefixAllSheets` | Cleanup utility | Silent failure summary should be improved. | Medium |
| `onOpen` | Menu setup | Accepted for local/direct model; library consumers need documented wrappers or direct binding. | Medium |
| `applyGrayShadingAllSheets_` | Menu callback | Requires `getAllVisibleSheets_()` to exist in deployed namespace. | High |
| `installedOnEdit` | Trigger handler | Range coverage accepted; optimize watch checks and avoid excessive sort/log work. | Medium |
| `createOnEditTrigger_` | Trigger setup | Legacy cleanup accepted; document that `onEdit` handlers may be removed. | Medium |
