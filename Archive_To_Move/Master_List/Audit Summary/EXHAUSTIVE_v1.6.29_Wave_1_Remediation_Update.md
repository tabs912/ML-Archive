# Master List v1.6.29 — Wave 1 Remediation Update

## Scope

This update refines Wave 1 of the validated remediation plan for the completed exhaustive review. It applies to:

- EXH-001
- EXH-002
- EXH-008
- The Raw Data policy portion of EXH-004

## Wave 1 — Demo P Data-Safety Remediation

### Objective

Make Demo P updates safe while preserving Raw Data as the intact source of truth.

### Findings addressed

- EXH-001
- EXH-002
- EXH-008
- Raw Data policy portion of EXH-004, now clarified as Raw Data must remain intact

### Required implementation principles

- Read Raw Data only.
- Do not edit Raw Data.
- Do not delete Raw Data as part of Demo P processing.
- Build all Demo P replacement rows in memory before changing Demo P.
- Run all required Demo P processing on the in-memory replacement rows before flattening.
- Preserve the business rule that each participant has one primary Demo P row with secondary/contact data combined onto that primary row.
- Avoid live row-by-row or batch-row deletion from Demo P where a retained-row rewrite is safer.

## Specific safer sequence for Monthly Demo P Sync

### Current unsafe sequence

The current implementation performs the following sequence:

1. Identify changed PMRs.
2. Delete matching Demo P rows.
3. Locate Raw Data.
4. Build fresh rows.
5. Append fresh rows.

The current code confirms that deletion happens before Raw Data lookup and fresh-row construction.

### Recommended safe sequence

1. Identify changed PMRs.
2. Locate and validate Raw Data.
3. Read matching Raw Data rows without editing Raw Data.
4. Map matching Raw Data rows into Demo P headers in memory.
5. Run all required Demo P processing on the mapped in-memory rows.
6. Flatten participant secondary rows onto primary rows in memory.
7. Validate replacement PMR coverage.
8. Build retained Demo P rows in memory by excluding old changed-PMR rows.
9. Combine retained rows with the fresh processed-and-flattened rows.
10. Validate duplicate-primary and expected-PMR rules.
11. Write the Demo P body once.
12. Clear excess old Demo P body rows only after the successful write.
13. Run post-write validation.

This preserves the clarified business model: Raw Data remains intact, and Demo P is the processed and flattened participant view.

## Demo P processing-before-flattening rule

Replacement rows must not be flattened before Demo P processing. The correct order is:

1. Map Raw Data rows to Demo P columns.
2. Run Demo P processing in memory, including name, banner, address, language, phone, contact, and notes/summary processing.
3. Flatten the processed rows so each participant has one primary Demo P row with secondary/contact data combined onto that primary row.

## Updated decision register

| Decision | Previous status | Updated status |
|---|---|---|
| Should Raw Data remain intact? | Required decision | Resolved: Yes. Raw Data remains unedited and intact. |
| Should Demo P combine secondary participant rows onto primary rows? | Implied by code | Resolved: Yes. This is Demo P's purpose. |
| Should `appsscript.json` be added? | Required decision | Resolved: added under `Master_List/Current Production Script/`. |
| Should Raw Data import sheets be deleted after formatting? | Still needs clarification if formatting workflows are in scope | Not resolved for `formatRawData()` / `formatMonthlyRawDataSheetFromSource_()` because those workflows currently delete source import tabs after output creation. |
| Should active-sheet fallback remain for Demo P build? | Required decision | Still recommended to allow only if the active sheet passes strict Raw Data validation. |

## Implementation readiness

Wave 1 is ready for implementation once approved, provided the implementation preserves these constraints:

- Raw Data is read-only and intact.
- Demo P replacement rows are fully processed before flattening.
- Demo P is rewritten from validated in-memory retained and replacement rows rather than using delete-then-append or append-then-delete sequencing.
- Public workflow entry points and approved business logic remain stable.
