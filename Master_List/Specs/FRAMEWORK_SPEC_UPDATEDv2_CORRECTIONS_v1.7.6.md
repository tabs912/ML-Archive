# Master List Framework Specification UPDATEDv2 — Corrections, Updates, and Additions Only

## Source Files Compared

- Specification reviewed: `Master_List/Specs/Master_List_Framework_Specification_v2.0_UPDATEDv2.md`
- Implementation source of truth: `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`

## Corrections / Updates Required

| ID | UPDATEDv2 Location | Current UPDATEDv2 Text / Meaning | Production-Correct Update |
|---|---|---|---|
| 1 | Section 2, Production Script Manifest | States the production script contains `15,785` lines. | Update to `15,670` lines. The declared-function inventory remains correct: 672 total functions, 64 public Apps Script-callable functions, and 608 internal underscore helpers. |
| 2 | Section 5, Format Dashboard Standards | Lists `SECTION D - COLUMN DEFINITIONS`, `SECTION E - SHEET BEHAVIORS`, `SECTION F - SHEET HEADERS`, and `SECTION G - SYSTEM SHEET SURFACES`. | Replace with production order: `SECTION D - SHEET BEHAVIORS`, `SECTION E - SYSTEM SHEET SURFACES`, `SECTION F - COLUMN DEFINITIONS`, and `SECTION G - SHEET HEADERS`. |
| 3 | Section 6, Sheet Layout Standards | States hidden columns are governed by Format Dashboard Section D. | Update hidden-column governance to Format Dashboard Section F because column definitions are implemented as Section F. |
| 4 | Section 6, Sheet Layout Standards | States alternating colors and filters are governed by Format Dashboard Section E. | Update alternating-color and filter governance to Format Dashboard Section D because sheet behaviors are implemented as Section D. |
| 5 | Section 11, Data Ownership and Lineage | States Section F is the data dictionary for header order/source lineage and Section D is the presentation dictionary for column formatting. | Update to Section G for header order/source lineage and Section F for column presentation/formatting. |
| 6 | Section 12, Mapping, Column, and Header Governance | States column definitions are governed by Section D and header definitions by Section F. | Update column definitions to Section F and header definitions to Section G. |
| 7 | Section 20, Template Governance | States templates resolve from Section C sheet definitions, Section E behaviors, Section F headers, Section D column definitions, and Section A global standards. | Update to Section C sheet definitions, Section D behaviors, Section G headers, Section F column definitions, and Section A global standards. |
| 8 | Section 25, Framework Health Check and Testing Standards | The testing workflow says to validate dashboard global, sheet, behavior, column, and header sections without reflecting the implemented dashboard section order. | Clarify the production order: Section A global inputs / Section B title rows, Section C sheet definitions, Section D sheet behaviors, Section F column definitions, and Section G sheet headers. |
| 9 | Appendix A, Dashboard Configuration Summary | Lists dashboard categories in stale order: column definitions before sheet behaviors and system sheet surfaces after sheet headers. | Update the appendix category order to match production: global settings, title rows, sheet definitions, sheet behaviors, system sheet surfaces, column definitions, sheet headers. |
| 10 | Appendix C, Data Source Mapping Summary | States complete source mapping should be rebuilt from Format Dashboard Section F source-of-data lineage. | Update source-of-data lineage to Format Dashboard Section G. |

## Additions Required

No new framework behavior was identified in `v.1.7.6_Current_Production_Script` that requires adding a new major architecture, workflow, sheet lifecycle, synchronization, validation, QA, template, dashboard, protected-standard, naming, or configuration section to `Master_List_Framework_Specification_v2.0_UPDATEDv2.md`.

## Updates Not Required

No production-supported evidence was found requiring corrections to the UPDATEDv2 descriptions of:

- Public entry points.
- `onOpen` menu group responsibilities.
- Create Monthly Update workflow order.
- Demo P processing ownership.
- Master List Primary PMR row ownership.
- Banner, Care Plan Due, and Unlocked Care Plan synchronization ownership.
- Monthly Change report governance.
- Disenrolled Exclusion governance.
- Dashboard Quality Sections A-Q.
- Index, archive, and restore governance.
- Cache, timing, validation, warning, and blocking-error strategy.

## Implementation Note

This report intentionally does not rewrite the specification. It is limited to corrections, updates, and additions needed for `Master_List_Framework_Specification_v2.0_UPDATEDv2.md` to accurately reflect the v1.7.6 production script.
