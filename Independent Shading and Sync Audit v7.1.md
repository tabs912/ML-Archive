# Independent Shading and Sync Audit v7.1

Executive Summary: This v7.1 report removes all previously accepted or resolved audit items and lists only findings that still need action or verification. Data security, hardcoded file ID secrecy, duplicate-name fallback, duplicate identity aborts, multi-cell edit coverage, direct/local callback acceptance, hidden-tab handling, strict equality, and other clarified items are intentionally omitted. The remaining work is concentrated around source hygiene, a missing helper in the supplied compilation, deployment documentation, verification of newest-sheet/blank-identity guards, validation completeness, sheet-reference error handling, operational logging noise, Apps Script API-cost reductions, and maintainability cleanup.

🚨 Critical / High Severity: Items that still need action

1. **Remove executable `[cite: ...]` artifacts from production source if they exist outside comments.**
   * **Action needed:** Confirm the actual Apps Script `.gs` source contains no bare citation placeholders after statements or expressions.
   * **Why it matters:** A line such as `const TARGET_FILE_ID = '...'; [cite: 468]` is not valid Apps Script JavaScript and can prevent parsing.
   * **Fix:** Keep citations in this report or comments only; never in executable source lines.

   ```javascript
   const TARGET_FILE_ID = '1tZlDjXSBf3aY8O1w_9wp5UAZqwdiU9SoQWtgBI4llpo';
   ```

2. **Add or verify `getAllVisibleSheets_()` in the deployed namespace.**
   * **Action needed:** The supplied compilation calls `getAllVisibleSheets_(ss)` from `applyGrayShadingAllSheets_()`, but the helper is not visible in the provided code.
   * **Why it matters:** The “Apply (all sheets)” menu action fails with `ReferenceError` if the helper is absent.
   * **Fix:** Add the helper or verify it exists in the deployed library file set.

   ```javascript
   function getAllVisibleSheets_(ss) {
     return ss.getSheets().filter(sh => !isSheetExcluded_(sh) && !sh.isSheetHidden());
   }
   ```

3. **Document the exact deployment topology for library vs direct/local execution.**
   * **Action needed:** Add a short README or deployment note explaining whether spreadsheets run a bound copy, call a library via host wrappers, or bind directly to the library HEAD reference.
   * **Why it matters:** Future maintainers can break menus/triggers if they install the library without the expected wrapper or direct-binding model.
   * **Fix:** Include the approved pattern and wrapper examples where applicable.

   ```javascript
   // Host wrapper example when using a centralized library.
   function onOpen(e) { GrayShadeLibrary.onOpen(e); }
   function syncCurrentSheetToHomeCareServices() { GrayShadeLibrary.syncCurrentSheetToHomeCareServices(); }
   ```

4. **Verify newest-sheet gating is present in the deployed push-sync path.**
   * **Action needed:** Confirm `syncDataToHomeCareServices_(sheet, isManual)` checks newest-sheet status before automatic trigger writes.
   * **Why it matters:** Without this guard, edits to older dated tabs can overwrite current master-log data.
   * **Fix:** Re-add or verify the automatic-sync guard.

   ```javascript
   if (!isManual && !isNewestSheet_(sheet)) return;
   ```

5. **Add an explicit blank-identity guard before opening or writing the master log.**
   * **Action needed:** Confirm push sync returns early when both `Participant PMR#` and `Name` are blank.
   * **Why it matters:** Blank/draft sheets should not trigger master-log lookup or append behavior.
   * **Fix:** Keep the guard immediately after `dataToSync` is assembled.

   ```javascript
   const pmr = String(dataToSync['Participant PMR#'] || '').trim();
   const name = String(dataToSync.Name || '').trim();
   if (!pmr && !name) return;
   ```

6. **Restore full target validation in `validate()`.**
   * **Action needed:** Expand validation so it checks every source and every target in each rule.
   * **Why it matters:** Source-only validation can pass while target ranges fail silently during shading.
   * **Fix:** Resolve each ref once and validate `r.targets` with clear messages.

7. **Make `resolveRef_()` throw when a sheet reference cannot be resolved.**
   * **Action needed:** Add explicit `if (!sheet) throw new Error(...)` checks.
   * **Why it matters:** Returning `{ sheet: null, a1 }` hides configuration issues and makes downstream errors harder to diagnose.
   * **Fix:** Fail fast at reference resolution time.

   ```javascript
   const sheet = ss.getSheetByName(sheetName);
   if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);
   return { sheet, a1 };
   ```

8. **Remove side effects from `isSheetExcluded_()` or throttle them.**
   * **Action needed:** Avoid writing to Error Log from a predicate that runs during sorting, trigger guards, and all-sheet workflows.
   * **Why it matters:** Repeated B4/date warnings can create operational noise and extra SpreadsheetApp calls.
   * **Fix:** Keep the predicate pure and move malformed-date reporting to explicit validation, or throttle per sheet.

9. **Confirm the identity index reads only needed identity columns if scale grows.**
   * **Action needed:** If master-log size increases, verify `buildIndexMapsOptimized_()` reads only PMR and Name columns, not all columns between A and the farther identity column.
   * **Why it matters:** Rectangular reads still scale with unused columns.
   * **Fix:** Read PMR and Name columns separately after reading headers.

10. **Document trigger ownership before deleting `onEdit` handlers.**
    * **Action needed:** Clarify that `createOnEditTrigger_()` may delete installable triggers named `onEdit`, or narrow deletion to library-owned handlers only.
    * **Why it matters:** Workbooks with unrelated automation can lose triggers during setup.
    * **Fix:** Delete only known handler names owned by this script, or document that the helper owns all edit triggers in the project.

⚠️ Medium Severity: Items that still need action

1. **Use deterministic cutoff date construction.**
   * Replace `new Date('2024-01-01')` with `new Date(2024, 0, 1)`.

2. **Add a strict range helper for sync-critical reads.**
   * Keep `safeGetRange_()` for visual shading resilience, but use a throwing helper for required sync ranges.

3. **Reduce repeated Range getter calls in `rangesIntersect_()`.**
   * Store row/column bounds in local constants for hot edit-trigger checks.

4. **Avoid silent nested catches during manual shading operations.**
   * Manual apply flows should count/report skipped rules or invalid mappings instead of swallowing all failures.

5. **Quote generated sheet names in `expandRulesForSheet_()`.**
   * Prevent future breakage from sheet names containing `!` or quotes.

6. **Precompute sync watch ranges.**
   * Build `SYNC_WATCH_RANGES` once after `SYNC_MAPPING` rather than rebuilding a `Set` on each edit.

7. **Avoid `sheet.getRange(a1)` for every watched range on every edit.**
   * Precompute numeric A1 rectangles where practical.

8. **Reduce repeated Spreadsheet reads in `getRangeText_()` and sync collection.**
   * Accept current behavior for small forms; batch stable form blocks if runtime becomes noticeable.

9. **Document or tighten `parseStrictDate_()` first-date behavior.**
   * If B4:F4 can contain multiple dates, validate exactly one date.

10. **Add operational log retention/throttling.**
    * This is not a data-security issue; it is an Error Log noise and quota-control issue.

11. **Use `isManual` consistently for user feedback.**
    * Manual sync should toast busy, skipped, duplicate, older-sheet override, success, and failure states.

12. **Use `const nextRow` in append logic if it is not reassigned.**
    * Minor mutability cleanup.

13. **Validate master-only required columns before append.**
    * If the service log has required columns not populated by `SYNC_MAPPING`, add defaults or fail early.

14. **Skip blank terms in `findRowInMaster_()`.**
    * Add `if (!String(searchTerm || '').trim()) return null;`.

15. **Avoid building master indexes twice during pull.**
    * Create a target/master context once, then search PMR and Name against it.

16. **Document push/pull asymmetry for multi-cell mappings.**
    * Push reads full ranges; pull writes the imported value to the top-left cell only.

17. **Add a “not found” toast in `pullUpdatesToCurrentSheet()`.**
    * Avoid silent no-op behavior for users.

18. **Guard `deleteSheet` cleanup in `createNewSheetFromMaster()`.**
    * Cleanup failures should not hide the original error.

19. **Prefer copying a named `TEMPLATE` sheet during imports.**
    * Avoid copying whichever sheet happens to be active.

20. **Use deterministic fallback date formatting.**
    * Avoid `new Date().toLocaleDateString()` for sheet names if locale consistency matters.

21. **Keep sheet sorting out of hot edit paths where possible.**
    * Sorting is already move-minimized, but `setActiveSheet()` / `moveActiveSheet()` are still expensive.

22. **Compare before Drive rename.**
    * Avoid unnecessary `DriveApp.setName()` calls.

23. **Use separate Drive filename sanitation if needed.**
    * Sheet-name sanitation and Drive-title sanitation are related but not identical.

24. **Add an empty-name fallback to `sanitizeSheetName_()`.**
    * Use a fallback such as `Untitled`.

25. **Report `removeCopyOfPrefixAllSheets()` results.**
    * Track renamed and failed counts in the final toast.

26. **Restore validation menu items if maintainers use UI validation.**
    * Add current/all-sheet mapping validation and service-log integrity validation if useful.

27. **Store `SpreadsheetApp.getActive()` once in `applyGrayShadingCurrentSheet_()`.**
    * Minor repeated lookup cleanup.

28. **Add lightweight pure-helper tests.**
    * Cover date parsing, sheet-name sanitation, formula escaping, duplicate detection, and range intersection.

29. **Separate business exceptions from technical guarantees in comments.**
    * Keep source comments short; move rationale to deployment docs.

💡 Low Severity / Nitpicks: Items that still need action

1. Prefer consistent multiline formatting over compressed one-line functions.
2. Keep `var GrayShade` only if needed for Apps Script library export; otherwise prefer `const`.
3. Use `new Date()` for user-readable sheet logs and `Date.now()` only when numeric epoch values are intended.
4. Consider freezing static configuration objects if maintainers should not mutate them.
5. Standardize “profile,” “participant,” and “record” terminology.
6. Keep the name-fallback audit exception comment near `getValidatedTargetRow_()`.
7. Keep explicit `SYNC_MAPPING` labels because they mirror the real form layout.
8. Avoid external citation placeholders in production Apps Script source.
9. Add a README covering library installation, direct/local deployment, wrapper requirements, trigger ownership, scopes, and accepted operational exceptions.
10. Continue excluding `TEMPLATE` and `Error Log` from operational sheet loops.

Context:
Language/Framework: Google Apps Script / JavaScript using `SpreadsheetApp`, `DriveApp`, `ScriptApp`, `CacheService`, and `LockService`.

Purpose of the Code: The script provides gray shading for configured care-plan rows, push sync to a Home Care Services master log, reverse sync/import from that log, new sheet creation, chronological sheet organization, Drive file renaming, sheet renaming, “Copy of” cleanup, custom menu creation, and edit-trigger installation.

Specific Areas of Concern: This v7.1 report intentionally excludes accepted/resolved findings and data-security/file-ID concerns. It includes only remaining action items around source hygiene, missing helpers, deployment documentation, newest-sheet/blank-identity verification, validation coverage, sheet-reference errors, Apps Script API costs, logging noise, and maintainability.

## Remaining-action line-by-line matrix

| Code area | Remaining action | Severity |
| --- | --- | --- |
| Source artifact cleanup | Remove executable `[cite: ...]` markers if present in `.gs` source. | High |
| `applyGrayShadingAllSheets_` | Add/verify `getAllVisibleSheets_()`. | High |
| Deployment topology | Document direct/local vs library-wrapper execution. | High |
| `syncDataToHomeCareServices_` | Verify newest-sheet gating and blank-identity guard. | High |
| `validate` | Restore target validation. | High |
| `resolveRef_` | Throw on missing sheets. | High |
| `isSheetExcluded_` | Remove/throttle Error Log side effects. | High |
| `buildIndexMapsOptimized_` | Consider true two-column identity reads if scale grows. | Medium |
| `createOnEditTrigger_` | Document or narrow trigger deletion ownership. | High |
| `EXCLUSION_CUTOFF_DATE` | Use numeric date constructor. | Medium |
| `safeGetRange_` | Add strict sync range helper. | Medium |
| `rangesIntersect_` | Cache bounds locally. | Medium |
| `expandRulesForSheet_` | Quote generated sheet names. | Medium |
| `getSyncWatchRanges_` | Precompute static watch range list. | Medium |
| `installedOnEdit` | Reduce per-edit range calls and avoid frequent sorting. | Medium |
| `getRangeText_` | Batch or simplify repeated field reads if runtime grows. | Medium |
| `findRowInMaster_` / pull flow | Skip blank terms and avoid double index builds. | Medium |
| `applyServiceLogRowToLocalSheet_` | Document top-left write behavior for multi-cell mappings. | Medium |
| `createNewSheetFromMaster` | Guard cleanup and prefer `TEMPLATE`. | Medium |
| `renameDriveFileFromB5AndTab` | Compare before rename; optionally sanitize Drive title. | Low |
| `sanitizeSheetName_` | Add empty-name fallback. | Low |
| `removeCopyOfPrefixAllSheets` | Report renamed/failed counts. | Medium |
| Menu setup | Restore validation menu items if desired. | Medium |
| Tests/docs | Add pure-helper tests and deployment README. | Medium |
