<!-- markdownlint-disable MD013 MD022 MD024 MD032 MD033 MD056 MD058 MD060 -->

# Master List Framework Specification v2.0 _ Draft — UPDATED to Current Script v1.7.6

**Source PDF layout:** `Master_List/Specs/Master List Framework Specification v2.0 _ Draft.pdf`.

**Authoritative implementation:** `Master_List/Current Production Script/v.1.7.6_Current_Production_Script`.

**Update rule:** This markdown keeps the original draft section flow and places extracted original tables in their page/section context. Stale version-authority references in extracted text/tables are updated to v1.7.6 where they appeared. If any retained draft content conflicts with the current production script, the current production script controls.


---

<!-- PDF page 1 -->

Master List Framework Specification v2.0


## 1. Executive Overview

The Master List Framework is the governing system for monthly Raw Data preservation, Demo P processing, Master List creation, Banner synchronization, Care Plan Due and Unlocked Care Plan synchronization, Monthly Change reporting, disenrollment tracking, dashboard-controlled templates, validation, timing, and QA reporting. The framework is documented according to the Current Production Script v1.7.6. Framework Specification v2.0 is the governing specification. The Current Production Script v1.7.6 is the implementation authority. 1.1 Framework Purpose ●​ Define the architecture standards for the Master List Framework. ●​ Preserve working production business logic and avoid unnecessary rebuilds. ●​ Govern Raw Data, Demo P, Banner, Care Plan Due, Unlocked Care Plan, Master List, Monthly Change, Disenrolled, Dashboard Quality, templates, timing, and validation workflows. ●​ Maintain a single-file Apps Script architecture until production stabilization is complete. ●​ Prioritize template-first formatting, one-pass processing, dashboard configuration caching, and reduced spreadsheet reads/writes. 1.2 Current Production Baseline


**Original Table 1 (PDF page 1, table 1)**

| Component | Current Role in v2.0 / v1.7.6 | Reference |
| --- | --- | --- |
| Framework Specification v2.0 | Primary governing authority | Primary governing authority |
| Current Production Script v1.7.6 | Current executable production baseline | Starting script for future development |


**Original Table 2 (PDF page 1, table 2)**

| Section | Dashboard Quality Content |
| --- | --- |
| A | Template Validation |
| B | Template Header Audit |
| C | Test 6 Date Formatting |
| D | Test 7 Validation Failure |


---

<!-- PDF page 2 -->


**Original Table 3 (PDF page 2, table 1)**

| E | Test 9 Monthly Change Subheaders |
| --- | --- |
| F | Test 10 Dashboard Audit, including Care Plan Sync validation |
| G | Framework Health Check, including Care Plan Sync validation |
| H | Signoff |
| I | Summary |
| J | Timing Summary |


**Original Table 4 (PDF page 2, table 2)**

| Protected Standard | v2.0 / v1.7.6 Production Meaning |
| --- | --- |
| Single File Architecture | Maintain the framework as one Apps Script file until production stabilization is complete. |
| Dashboard Driven Formatting | Dashboard configuration remains the formatting and template authority. |
| Template First Formatting | Build templates once; duplicate/copy templates and paste data during normal processing. |
| Primary PMR Row Architecture | Assign Primary PMR Row in Raw Data only; synchronize to Primary PMR Row only. |
| One Pass Processing | Read once, process once, write once whenever practical. |
| Source Data Preservation | Preserve imported source reports and avoid destructive processing unless explicitly approved. |
| Dashboard Quality Consolidation | Use Dashboard Quality Report sections A-J as the consolidated QA reporting structure. |
| Template Header Audit | Use one centralized header audit instead of repeated header verification inside individual processes. |
| Full Replacement Updates | Production releases must replace affected functions completely and remove obsolete logic. |


**Original Table 5 (PDF page 2, table 3)**

| Item | Standard |
| --- | --- |
| Source of Truth | Framework Specification v2.0 is the governing authority; Current Production Script v1.7.6 is the executable source of truth. |
|  |  |
| Date Prompt | User enters month only; system uses MM/01/YYYY. Year remains locked February-November and selectable December-January unless changed by approved production rule. |
| Standard Font | Arial 10pt black, left aligned, vertical middle. |
| Header Row | Row 4. |
| Data Start Row | Row 5. |


---

<!-- PDF page 3 -->


**Original Table 6 (PDF page 3, table 1)**

| Freeze | Rows 1-4 and Columns A:B. |
| --- | --- |
| Date Display Format | mm/dd/yyyy. |
| Sheet Date Format | mm.yy. |
| Delete Blank Rows After | After governed template row count or after row 400 when empty for legacy-compatible report cleanup; template row counts control where defined. |
| Dashboard Quality Report | Authoritative QA report; replaces standalone Test 6, Test 7, Test 9, Test 10, Template Validation, and Framework Health Check report sheets. |
| Dashboard Quality Section Timestamp | Every Dashboard Quality section header shall include last run timestamp, status, and duration where available. |
| Template Header Audit | Required centralized QA process validating required template headers for Raw Data, Banner, Care Plan Due, Unlocked Care Plan, Demo P, Master List, Monthly Change, Disenrolled, and Master List Change Log. |
| Care Plan Sync Validation | Required inside Dashboard Audit and Framework Health Check; not a separate Dashboard Quality section. |
| Primary PMR Assignment | Occurs only during Raw Data processing. |
| Master List Row Standard | Master List contains Primary PMR Rows only. |
| Demo P Tracking Columns | Demo P template must include Demo P Update Status, Demo P Update Month, and Demo P Source Sheet. |
| Row Height Enforcement | Raw Data, Demo P, Master List, and Disenrolled shall enforce data row height 25 at the end of processing to prevent Notes wrapping from expanding rows. |


---

<!-- PDF page 4 -->


## 3. Sheet Layout Standards


**Original Table 7 (PDF page 4, table 1)**

| Item | Standard |
| --- | --- |
| Row 1 - Title Row | Height 25, Level 3 fill. A1 = title, Arial 14pt bold, black, overflow. C1:D1 may contain framework/version notes only if it does not interfere with freeze settings. |
| Row 2 - Date Row | Height 20, Level 3 fill. A2=Date, B2=Start Date, C2=to, D2=End Date when the sheet uses date ranges. |
| Row 3 - Spacer Row | Height 10, Level 1 fill, no data. |
| Row 4 - Header Row | Height 40, Level 2 fill, wrap, horizontal left, vertical top. |
| Rows 5+ | Height 25, Arial 10pt, wrap clip, horizontal left, vertical center. |
| Merge/Frozen Cell Rule | No merged cells may partially cross frozen rows/columns. Break apart merged cells before applying freeze settings when needed. |
| Dashboard Quality Layout | Dashboard Quality Report uses governed section headers with timestamp/status/duration metadata. Section tables may vary by test but must remain within the consolidated A-J report. |
| Final Data Row Height Enforcement | Raw Data, Demo P, Master List, and Disenrolled apply standard data row height 25 at the end of their processing functions. |


**Original Table 8 (PDF page 4, table 2)**

| Sheet Type | Required Final Row Height Action |
| --- | --- |
| Raw Data | Apply standard data row height 25 after formatting and framework-owned column additions. |
| Demo P | Apply standard data row height 25 after copy-first/process-once/write-once processing. |
| Master List | Apply standard data row height 25 after Master List creation and synchronization. |
| Disenrolled Exclusion | Apply standard data row height 25 after standalone Disenrolled list creation. |


## 4. Color Management


**Original Table 9 (PDF page 4, table 3)**

| Sheet Type | Base Color | Use |
| --- | --- | --- |
| CP Due Date | #65CC99 | Report tabs, templates, headers, dashboard references |
| Unlock CP | #65CCC3 | Report tabs, templates, headers, dashboard references |
| Banners | #65A9CC | Report tabs, templates, headers, dashboard references |
| Demo P | #657FCC | Report tabs, templates, headers, dashboard references |
| Master List | #7665CC | Master List tabs, templates, headers, dashboard references |
| Monthly Change | #A165CC | Monthly Change tabs, templates, headers, dashboard references |
| Master List Change Log | #CC65CC | Change log/system sheet |
| Disenrolled Exclusion List | #CC65A1 | Disenrollment tracking/system sheet |
| Index Sheet | #668BCC | Index tab color |
| Raw Data | Dashboard -defined | Monthly source/import sheet type; color controlled by dashboard configuration |


---

<!-- PDF page 5 -->


**Original Table 10 (PDF page 5, table 1)**

| Dashboard Quality Report | Dashboard -defined | Consolidated QA report; color controlled by dashboard configuration |
| --- | --- | --- |


**Original Table 11 (PDF page 5, table 2)**

| Level | Lightness | Usage |
| --- | --- | --- |
| Level 1 | 60% | Row 3, sheet tab accents |
| Level 2 | 75% | Header row |
| Level 3 | 85% | Title rows, current sheet tabs |
| Level 4 | 97% | Alternating colors |


**Original Table 12 (PDF page 5, table 3)**

| Sheet Type | Report Title | Date Format | Example |
| --- | --- | --- | --- |
| Raw Data | Raw Data | MM.YY | Raw Data 05.26 |
| Demo P | Demographics - Participants | MM.YY | Demo P 05.26 |
| Banners | Banner Report | MM.YY | Banners 05.26 |
| Unlocked CP | Unlocked Care Plan Report | MM.YY | Unlocked CP 05.26 |
| CP Due | Care Plan Due Date Report | MM.YY | CP Due 05.26 |
| Monthly Change | Monthly Change Report | MM.YY | Monthly Change 05.26 |
| Master List | Master List | MM.YY | Master List 05.26 |
| Disenrolled | Disenrolled Exclusion List | MM.YY from prompt | Disenrolled 05.26 |
| ML Change Log | Master List Change Log | No month or as needed | ML Change Log |
| Dashboard Quality Report | Dashboard Quality Report | No month | Dashboard Quality Report |
| Timing Report / Current Timing Report | Timing Report | No month | Timing Report |


## 5.1 Naming Rules ●​ Monthly output sheets use MM.YY in the sheet name. ●​ Disenrolled Exclusion List uses the prompted month in the output sheet name. ●​ Dashboard Quality Report is not month-specific; sections record their own timestamps. ●​ Timing Report remains a framework timing log and Dashboard Quality Section J provides the timing summary. ●​ Template sheet names shall remain dashboard-controlled and may be hidden/system sheets. 6. Sheet Organization Standards


**Original Table 13 (PDF page 5, table 4)**

| Organization Rule | v2.0 Standard |
| --- | --- |
| Index Sheet | The Index sheet remains first. |


---

<!-- PDF page 6 -->


**Original Table 14 (PDF page 6, table 1)**

| Monthly Import Sheets | Monthly import sheets (Raw Data, Banner Report, Care Plan Due Date Report, Unlocked Care Plan Report) are grouped together. |
| --- | --- |
| Monthly Active Sheets | Operational sheets follow the import sheets in governed working order. |
| Visible Working Order | Index, Raw Data, Master List, Demo P, Care Plan Due, Unlocked Care Plan, Banners, Monthly Change. |
| System Sheets | Dashboard Quality Report, Framework Timing Report, Timing Summary Report, Index and other framework system sheets. |
| Templates | Template sheets remain grouped at the end of the workbook and are maintained through Create / Refresh Templates. |
| Tab Colors | Governed dashboard color standards apply. |


**Original Table 15 (PDF page 6, table 2)**

| Order | Template |
| --- | --- |
| 1 | Banners |
| 2 | CP Due Date |
| 3 | Unlocked CP |
| 4 | Raw Data |
| 5 | Demo P |
| 6 | Disenrolled Exclusion |
| 7 | Master List |
| 8 | Monthly Change |

●​ Banners ●​ CP Due Date ●​ Unlocked CP ●​ Raw Data ●​ Demo P ●​ Disenrolled Exclusion ●​ Master List ●​ Monthly Change 7. Dashboard Configuration Standards

The Format Dashboard remains the configuration authority for formatting, templates, sheet definitions, column definitions, validation, timing, and framework QA. Hardcoded formatting shall be minimized and reserved for protected structural standards or fallback/default handling. In v2.0, dashboard governance is expanded to include consolidated Dashboard Quality reporting, Template Header Audit, Care Plan Sync Validation, and section-only QA updates. The dashboard is a configuration source, not a participant-processing source. 7.1 Dashboard Configuration Authority


**Original Table 16 (PDF page 6, table 3)**

| Configuration Area | v2.0 Standard |
| --- | --- |


---

<!-- PDF page 7 -->


**Original Table 17 (PDF page 7, table 1)**

| SECTION A - GLOBAL SETTINGS | Date rules, font defaults, freeze settings, row heights, default column width, number and text formats, wrap and alignment defaults, color lightness levels, border standards, and template version. |
| --- | --- |
| SECTION B - TITLE ROWS | Governed title-row records for rows 1-4, including sheet type, purpose, value source, label, target cell, height, font size, font weight, fill level, alignment, wrap behavior, and notes. |
| SECTION C - SHEET DEFINITIONS | Sheet type, report title, template name, output naming pattern, base color, prompt-date behavior, end-date source, template row and column counts, row mode, minimum rows, buffer rows, test rows, and test-row behavior. |
| SECTION D - COLUMN DEFINITIONS | Header, width, header font size, date-column status, hidden-column status, data wrap, horizontal alignment, vertical alignment, and number format. |
| SECTION E - SHEET BEHAVIORS | Title-row use, filter use, alternating-color use, subheader use, hidden-template behavior, and output visibility. |
| SECTION F - SHEET HEADERS | Required sheet type, column order, header name, and source-of-data mapping for every governed sheet. |
| SECTION G - SYSTEM SHEET SURFACES | System sheet name, display name, sort order, output visibility, title fill color, title font color, global-default behavior, and system-surface notes. |
| Dashboard Quality Definitions | Dashboard Quality section ownership, timestamp requirements, section-only write behavior, consolidated report structure, and governed Quick and Workflow execution. |
| Timing Definitions | Framework Timing Report logging, combined timing reporting, performance summary, and Dashboard Quality timing participation. |
| Template Signatures and Refresh | Template signature validation, smart refresh behavior, fast refresh behavior, and governed full-rebuild fallback. |
| Dashboard Read and Cache Behavior | Dashboard configuration, header, header-map, sheet-dimension, monthly-sheet lookup, and template-signature cache behavior. |


**Original Table 18 (PDF page 7, table 2)**

| Rule | Requirement |
| --- | --- |
| Section-only updates | Each test writes only its assigned Dashboard Quality section. |
| Timestamped section headers | Each section header includes Last Run timestamp, status, and duration when available. |
| No hidden-template creation | Dashboard Quality Report shall not be generated from a hidden template as a normal test step. |
| No full rebuild | Run All Framework Tests + Dashboard shall not end by rebuilding the full Dashboard Quality report. |
| No standalone QA report sheets | Standalone Test 6, Test 7, Test 9, Test 10, Template Validation, and Framework Health Check report sheets are retired. |


---

<!-- PDF page 8 -->


**Original Table 19 (PDF page 8, table 1)**

| Summary and timing | Section I Summary and Section J Timing Summary are updated after the underlying sections have been written. |
| --- | --- |


## Appendix A remains the complete dashboard column configuration table and must be rebuilt from current production headers during the Appendix phase. Formatter and template builders must use 8.1 Dashboard Control Fields


**Original Table 20 (PDF page 8, table 2)**

| Control | Required | Description |
| --- | --- | --- |
| Column Width | Yes | Pixel width for each header. |
| Header Font Size | Yes | Font size for row 4 header display. |
| Data Font Size | Yes | Font size for rows 5+. |
| Date Format | Yes for dates | Applies mm/dd/yyyy display to configured date columns. |
| Hidden Column | Yes | Whether columns should be hidden after formatting. |
| Wrap Mode | Yes | Row 4 wrap; data rows clip unless overridden. |
| Horizontal Alignment | Yes | Default left. |
| Vertical Alignment | Yes | Headers top, data middle. |
| Row Height | Yes | Rows 1-4 and data rows. |
| Freeze Settings | Yes | Rows 1-4 and Columns A:B. |
| Template Row Count | Yes for templates | Defines the governed template row capacity. |
| Template Header Audit | Yes | Identifies whether the sheet participates in centralized template header audit. |
| Dashboard Quality Section | Yes for QA tests | Defines section ownership for consolidated Dashboard Quality Report. |
| Timing Participation | Yes for timed workflows | Defines whether a process logs to Current Timing Report and Dashboard Quality Section J. |
| Template Signature | Yes | Template signature validation. |
| Output Visibility | Yes | Hidden/visible output. |
| System Surface | Yes | Framework system sheet. |
| Cache Participation | Yes | Dashboard cache participation. |


**Original Table 21 (PDF page 8, table 3)**

| Section | Owner / Test - Current Section Title | Purpose | Write Rule |
| --- | --- | --- | --- |
| A | SECTION A - GLOBAL INPUTS VERIFICATION | Validate Format Dashboard global settings and required title-row governance inputs. | Section A only. |


---

<!-- PDF page 9 -->


**Original Table 22 (PDF page 9, table 1)**

| B | SECTION B - SHEET DEFINITIONS VERIFICATION | Validate governed Format Dashboard sheet definitions. | Section B only. |
| --- | --- | --- | --- |
| C | SECTION C - SHEET HEADERS VERIFICATION | Validate governed sheet header definitions and source mappings. | Section C only. |
| D | SECTION D - COLUMN DEFINITIONS VERIFICATION | Validate governed column definitions, widths, formats, visibility, wrap, and alignment settings. | Section D only. |
| E | SECTION E - SHEET BEHAVIOR VERIFICATION | Validate governed sheet behavior configuration and output visibility. | Section E only. |
| F | SECTION F - TEMPLATE STRUCTURE & VALIDATION | Validate template structure, required templates, row capacity, and template-level configuration. | Section F only. |
| H | SECTION H - FRAMEWORK HEALTH CHECK | Validate framework readiness, required functions, dependencies, and governed framework surfaces. | Section H only. |
| I | SECTION I - PERFORMANCE SUMMARY | Summarize timing and performance findings from the framework timing architecture. | Section I only. |
| J | SECTION J - MASTER LIST VALIDATION | Validate Master List structure, Primary PMR ownership, and required Master List outputs. | Section J only. |
| K | SECTION K - CARE PLAN SYNC VALIDATION | Validate Care Plan Due and Unlocked Care Plan synchronization to the authoritative Master List month. | Section K only. |
| L | SECTION L - WORKFLOW & SYNCHRONIZATION VERIFICATION | Verify contact processing, phone split, address combine, language handling, notes summary, banner summary, Care Plan synchronization, and Primary PMR assignment. | Section L only. |
| M | SECTION M - SUMMARY | Summarize consolidated Dashboard Quality results. | Section M only. |
| N | SECTION N - SIGNOFF | Provide release readiness and signoff status. | Section N only. |


**Original Table 23 (PDF page 9, table 2)**

| Order | Sheet / Template Definition | Header Audit Required |
| --- | --- | --- |
| 1 | Banners |  |
| 2 | CP Due Date |  |
| 3 | Unlocked CP |  |
| 4 | Raw Data |  |
| 5 | Demo P |  |
| 6 | Disenrolled Exclusion |  |
| 7 | Master List |  |
| 8 | Monthly Change |  |


**Original Table 24 (PDF page 9, table 3)**

| Template | Approved Row Count |
| --- | --- |
| Raw Data | 6500 |
| Banners | 400 |


---

<!-- PDF page 10 -->


**Original Table 25 (PDF page 10, table 1)**

| CP Due Date | 400 |
| --- | --- |
| Unlock CP | 400 |
| Demo P | 2500 |
| Master List | 400 |
| Monthly Change | 1000 |
| Disenrolled Exclusion List | 800 |
| Master List Change Log | 1000 |


**Original Table 26 (PDF page 10, table 2)**

| Organization Rule | v2.0 Standard |
| --- | --- |
| Index Sheet | The Index sheet remains first. |
| Monthly Import Sheets | Monthly import sheets (Raw Data, Banner Report, Care Plan Due Date Report, Unlocked Care Plan Report) are grouped together. |
| Monthly Active Sheets | Operational sheets follow the import sheets in governed working order. |
| Visible Working Order | Index, Raw Data, Master List, Demo P, Care Plan Due, Unlocked Care Plan, Banners, Monthly Change. |
| System Sheets | Dashboard Quality Report, Framework Timing Report, Timing Summary Report, Index and other framework system sheets. |
| Templates | Template sheets remain grouped at the end of the workbook and are maintained through Create / Refresh Templates. |
| Tab Colors | Governed dashboard color standards apply. |


**Original Table 27 (PDF page 10, table 3)**

| Order | Template |
| --- | --- |
| 1 | Banners |
| 2 | CP Due Date |
| 3 | Unlocked CP |
| 4 | Raw Data |
| 5 | Demo P |
| 6 | Disenrolled Exclusion |
| 7 | Master List |
| 8 | Monthly Change |

●​ Banners ●​ CP Due Date ●​ Unlocked CP


---

<!-- PDF page 11 -->

●​ Raw Data ●​ Demo P ●​ Disenrolled Exclusion ●​ Master List ●​ Monthly Change 7. Dashboard Configuration Standards

The Format Dashboard remains the configuration authority for formatting, templates, sheet definitions, column definitions, validation, timing, and framework QA. Hardcoded formatting shall be minimized and reserved for protected structural standards or fallback/default handling. In v2.0, dashboard governance is expanded to include consolidated Dashboard Quality reporting, Template Header Audit, Care Plan Sync Validation, and section-only QA updates. The dashboard is a configuration source, not a participant-processing source. 7.1 Dashboard Configuration Authority


**Original Table 28 (PDF page 11, table 1)**

| Configuration Area | v2.0 Standard |
| --- | --- |
| SECTION A - GLOBAL SETTINGS | Date rules, font defaults, freeze settings, row heights, default column width, number and text formats, wrap and alignment defaults, color lightness levels, border standards, and template version. |
| SECTION B - TITLE ROWS | Governed title-row records for rows 1-4, including sheet type, purpose, value source, label, target cell, height, font size, font weight, fill level, alignment, wrap behavior, and notes. |
| SECTION C - SHEET DEFINITIONS | Sheet type, report title, template name, output naming pattern, base color, prompt-date behavior, end-date source, template row and column counts, row mode, minimum rows, buffer rows, test rows, and test-row behavior. |
| SECTION D - COLUMN DEFINITIONS | Header, width, header font size, date-column status, hidden-column status, data wrap, horizontal alignment, vertical alignment, and number format. |
| SECTION E - SHEET BEHAVIORS | Title-row use, filter use, alternating-color use, subheader use, hidden-template behavior, and output visibility. |
| SECTION F - SHEET HEADERS | Required sheet type, column order, header name, and source-of-data mapping for every governed sheet. |
| SECTION G - SYSTEM SHEET SURFACES | System sheet name, display name, sort order, output visibility, title fill color, title font color, global-default behavior, and system-surface notes. |
| Dashboard Quality Definitions | Dashboard Quality section ownership, timestamp requirements, section-only write behavior, consolidated report structure, and governed Quick and Workflow execution. |
| Timing Definitions | Framework Timing Report logging, combined timing reporting, performance summary, and Dashboard Quality timing participation. |
| Template Signatures and Refresh | Template signature validation, smart refresh behavior, fast refresh behavior, and governed full-rebuild fallback. |
| Dashboard Read and Cache Behavior | Dashboard configuration, header, header-map, sheet-dimension, monthly-sheet lookup, and template-signature cache behavior. |


---

<!-- PDF page 12 -->

Dashboard Quality report shall not be deleted, recreated from a hidden template, fully rebuilt, or fully rewritten during normal QA execution.


**Original Table 29 (PDF page 12, table 1)**

| Rule | Requirement |
| --- | --- |
| Section-only updates | Each test writes only its assigned Dashboard Quality section. |
| Timestamped section headers | Each section header includes Last Run timestamp, status, and duration when available. |
| No hidden-template creation | Dashboard Quality Report shall not be generated from a hidden template as a normal test step. |
| No full rebuild | Run All Framework Tests + Dashboard shall not end by rebuilding the full Dashboard Quality report. |
| No standalone QA report sheets | Standalone Test 6, Test 7, Test 9, Test 10, Template Validation, and Framework Health Check report sheets are retired. |
| Summary and timing | Section I Summary and Section J Timing Summary are updated after the underlying sections have been written. |


## Appendix A remains the complete dashboard column configuration table and must be rebuilt from current production headers during the Appendix phase. Formatter and template builders must use 8.1 Dashboard Control Fields


**Original Table 30 (PDF page 12, table 2)**

| Control | Required | Description |
| --- | --- | --- |
| Column Width | Yes | Pixel width for each header. |
| Header Font Size | Yes | Font size for row 4 header display. |
| Data Font Size | Yes | Font size for rows 5+. |
| Date Format | Yes for dates | Applies mm/dd/yyyy display to configured date columns. |
| Hidden Column | Yes | Whether columns should be hidden after formatting. |
| Wrap Mode | Yes | Row 4 wrap; data rows clip unless overridden. |
| Horizontal Alignment | Yes | Default left. |
| Vertical Alignment | Yes | Headers top, data middle. |
| Row Height | Yes | Rows 1-4 and data rows. |
| Freeze Settings | Yes | Rows 1-4 and Columns A:B. |
| Template Row Count | Yes for templates | Defines the governed template row capacity. |
| Template Header Audit | Yes | Identifies whether the sheet participates in centralized template header audit. |
| Dashboard Quality Section | Yes for QA tests | Defines section ownership for consolidated Dashboard Quality Report. |


---

<!-- PDF page 13 -->


**Original Table 31 (PDF page 13, table 1)**

| Timing Participation | Yes for timed workflows | Defines whether a process logs to Current Timing Report and Dashboard Quality Section J. |
| --- | --- | --- |
| Template Signature | Yes | Template signature validation. |
| Output Visibility | Yes | Hidden/visible output. |
| System Surface | Yes | Framework system sheet. |
| Cache Participation | Yes | Dashboard cache participation. |


**Original Table 32 (PDF page 13, table 2)**

| Section | Owner / Test - Current Section Title | Purpose | Write Rule |
| --- | --- | --- | --- |
| A | SECTION A - GLOBAL INPUTS VERIFICATION | Validate Format Dashboard global settings and required title-row governance inputs. | Section A only. |
| B | SECTION B - SHEET DEFINITIONS VERIFICATION | Validate governed Format Dashboard sheet definitions. | Section B only. |
| C | SECTION C - SHEET HEADERS VERIFICATION | Validate governed sheet header definitions and source mappings. | Section C only. |
| D | SECTION D - COLUMN DEFINITIONS VERIFICATION | Validate governed column definitions, widths, formats, visibility, wrap, and alignment settings. | Section D only. |
| E | SECTION E - SHEET BEHAVIOR VERIFICATION | Validate governed sheet behavior configuration and output visibility. | Section E only. |
| F | SECTION F - TEMPLATE STRUCTURE & VALIDATION | Validate template structure, required templates, row capacity, and template-level configuration. | Section F only. |
| H | SECTION H - FRAMEWORK HEALTH CHECK | Validate framework readiness, required functions, dependencies, and governed framework surfaces. | Section H only. |
| I | SECTION I - PERFORMANCE SUMMARY | Summarize timing and performance findings from the framework timing architecture. | Section I only. |
| J | SECTION J - MASTER LIST VALIDATION | Validate Master List structure, Primary PMR ownership, and required Master List outputs. | Section J only. |
| K | SECTION K - CARE PLAN SYNC VALIDATION | Validate Care Plan Due and Unlocked Care Plan synchronization to the authoritative Master List month. | Section K only. |
| L | SECTION L - WORKFLOW & SYNCHRONIZATION VERIFICATION | Verify contact processing, phone split, address combine, language handling, notes summary, banner summary, Care Plan synchronization, and Primary PMR assignment. | Section L only. |
| M | SECTION M - SUMMARY | Summarize consolidated Dashboard Quality results. | Section M only. |
| N | SECTION N - SIGNOFF | Provide release readiness and signoff status. | Section N only. |


**Original Table 33 (PDF page 13, table 3)**

| Order | Sheet / Template Definition | Header Audit Required |
| --- | --- | --- |
| 1 | Banners |  |
| 2 | CP Due Date |  |


---

<!-- PDF page 14 -->


**Original Table 34 (PDF page 14, table 1)**

| 3 | Unlocked CP | Column |
| --- | --- | --- |
| 4 | Raw Data |  |
| 5 | Demo P |  |
| 6 | Disenrolled Exclusion |  |
| 7 | Master List |  |
| 8 | Monthly Change |  |


**Original Table 35 (PDF page 14, table 2)**

| Template | Approved Row Count |
| --- | --- |
| Raw Data | 6500 |
| Banners | 400 |
| CP Due Date | 400 |
| Unlock CP | 400 |
| Demo P | 2500 |
| Master List | 400 |
| Monthly Change | 1000 |
| Disenrolled Exclusion List | 800 |
| Master List Change Log | 1000 |

Every governed sheet must have a formal header-to-source mapping. Appendix C contains the authoritative mapping tables and must be rebuilt from current production headers. This section defines the governing mapping terminology and required synchronization standards.


**Original Table 36 (PDF page 14, table 3)**

| Mapping Term | Definition |
| --- | --- |
| Raw Data | Pulled directly from the monthly report import. Raw Data is the source of Primary PMR Row assignment. |
| Demo P | Copied or derived from formatted active Raw Data rows. Demo P uses copy-first/process-once/write-once architecture. |
| Sync from Banners | Updated from the Banners after Banner processing. |
| Sync Unlock CP | Updated from the Unlock CP using PMR-based matching. |
| Sync Care Plan Due | Updated from the CP Due Date using Participant Name + Enrollment Date matched to Participant Name + Capitation Date. |
| Process | Generated by script logic such as address combining, notes, contact summaries, Banner Summary, phone labeling, Primary PMR Row designation, or update tracking. |
| <blank> | Intentionally present but not populated by current workflow. |
| Dashboard Quality | Generated by QA tests and framework health checks into the consolidated Dashboard Quality Report. |


---

<!-- PDF page 15 -->


**Original Table 37 (PDF page 15, table 1)**

| Timing | Generated by timing logger into Current Timing Report and summarized in Dashboard Quality Section J. |
| --- | --- |


**Original Table 38 (PDF page 15, table 2)**

| Source | Match Rule | Fields Synchronized | Destination |
| --- | --- | --- | --- |
| Unlocked Care Plan | Unlocked CP PMR # matches Master List Participant PMR#. | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date. | Master List Primary PMR Row |
| Care Plan Due | Care Plan Due Participant Name + Enrollment Date matches Master List Participant Name + Capitation Date. | Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type. | Master List Primary PMR Row |
| Banner Report | Participant PMR# | Banner fields and Banner Summary | Master List Primary PMR Row |

Care Plan Sync validation belongs in Dashboard Quality Section F - Dashboard Audit and Section G - Framework Health Check. It shall not be implemented as a separate Dashboard Quality section. 9.3 Demo P Update Tracking Mapping Standard


**Original Table 39 (PDF page 15, table 3)**

| Header | Source | Required Value Standard |
| --- | --- | --- |
| Demo P Update Status | Process | Created / Updated / Processed status as produced by Demo P processing. |
| Demo P Update Month | Process | Current processing month in mm.yy format. |
| Demo P Source Sheet | Process | Raw Data mm.yy source sheet name. |


**Original Table 40 (PDF page 15, table 4)**

| Header | Source | Required Value Standard |
| --- | --- | --- |
| Master List Update Status | Process | Created / Updated / Unchanged / Synced status as produced by Master List processing. |
| Master List Update Month | Process | Current processing month in mm.yy format. |
| Master List Source Sheet | Process | Demo P mm.yy source sheet name or approved source sheet reference. |


---

<!-- PDF page 16 -->


## 10. Monthly Change Report Rules


**Original Table 41 (PDF page 16, table 1)**

| Rule Area | v2.0 / v1.7.6 Rule |
| --- | --- |
| Required Sections | Enrollments, Disenrollments, Demographic Changes, Caseload Changes, Contact Changes, Banner Changes, Care Plan Changes. |
| Duplicates | No duplicates are allowed except approved Contact Changes logic. |
| Enrollments | Included when Capitation Date is the current report month. |
| Disenrollments | Included when Disenrollment Date, Disenrollment Effective Date, or Date of Death meets the previous-month/current workflow rule. |
| Contact Fields | Route to Contact Changes according to approved current production logic. |
| Banner Fields | Route to Banner Changes. |
| Caseload Fields | Route to Caseload Changes. |
| Oxygen | Routes to Service Changes unless superseded by final business rule. |
| Primary PMR Row-only Changes | Handled as Primary Row Update without replacing all participant source/detail rows. |
| Raw Data/Demo P Primary Rows Only | Monthly Change processing compares against the current Raw Data/Demo P Primary PMR row architecture and shall not recreate secondary Master List rows. |
| Standalone Disenrolled | Disenrolled Exclusion List is created through its standalone workflow and may be used to exclude disenrolled participants from inappropriate non-disenrollment change reporting. |

Master List is the primary operational participant repository. In v2.0 , Master List contains Primary PMR Rows only. This replaces prior language that retained secondary rows on Master List as operational source/detail rows. Source/detail rows remain available in Raw Data and Demo P where needed for processing, but Master List is now the consolidated Primary PMR operational view.


**Original Table 42 (PDF page 16, table 2)**

| Processing Rule | v2.0 / v1.7.6 Standard |
| --- | --- |
| Primary Operational Repository | Master List is the primary operational participant repository. |
| Row Architecture | Master List contains Primary PMR Rows only. |
| Synchronization Target | Only the Primary PMR Row is the downstream synchronization target. |
| Sync-Derived Values | All sync-derived values must be consolidated onto the Primary PMR Row. |
| Source/Detail Rows | Source/detail rows are retained in Raw Data and Demo P where needed for processing and auditability, but shall not be written as secondary operational Master List rows. |
| Processing Includes | Banner Summary, address processing, language processing, split and label phones, contact summary, notes combination, update tracking, synchronization, sorting if retained by production script, and validation. |
| One Pass Update Architecture | Compare current Demo P to prior Master List, identify changed participants/Primary PMR rows, and update only necessary rows. |


---

<!-- PDF page 17 -->


**Original Table 43 (PDF page 17, table 1)**

| Primary PMR-Only Changes | If changes are limited to Primary PMR Row fields, replace/update only the Primary PMR Row. |
| --- | --- |
| Care Plan Sync | Unlocked CP sync and Care Plan Due sync must populate Master List Primary PMR Rows only. |
| Update Tracking | Master List Update Status, Master List Update Month, and Master List Source Sheet are governed process fields. |

●​ Every participant shall have exactly one Primary PMR Row. ●​ The Primary PMR Row shall be identified using the Primary PMR Row field. ●​ Primary PMR Row assignment occurs during Raw Data processing only. ●​ The Primary PMR Row field shall be copied to Demo P and used downstream, but not reassigned downstream. ●​ Demo P, Master List, Monthly Change, and Disenrolled shall not perform a sequential block scan to reassign Primary PMR ownership. Ownership Rules All participant-level synchronized data shall be written only to the Primary PMR Row.


**Original Table 44 (PDF page 17, table 2)**

| Data Category | Ownership Target |
| --- | --- |
| Banner fields | Primary PMR Row |
| Care Plan fields | Primary PMR Row |
| Unlocked CP fields | Primary PMR Row |
| HHA fields | Primary PMR Row |
| O2 fields | Primary PMR Row |
| PAP fields | Primary PMR Row |
| PERS fields | Primary PMR Row |
| Processing summaries | Primary PMR Row |
| Contact summaries | Primary PMR Row |
| Notes summaries | Primary PMR Row |
| Banner Summary | Primary PMR Row |
| Contact Summary | Primary PMR Row |
| Participant Summary fields | Primary PMR Row |
| Update tracking fields | Primary PMR Row |

●​ Raw Data may contain source rows and supporting detail rows. ●​ Demo P may preserve copied active rows required for processing and auditability. ●​ Source/detail rows may contain contact records, phone records, service records, or supporting participant data. ●​ Source/detail rows shall not be used as downstream synchronization targets.


---

<!-- PDF page 18 -->

●​ Master List shall contain Primary PMR Rows only. Monthly Update Rules

●​ If monthly changes affect only Primary PMR Row fields, replace/update the Primary PMR Row only. ●​ If source/detail fields change, process those changes through Raw Data/Demo P logic and update only the affected Primary PMR output row or related report output. ●​ Do not replace all participant rows when only Primary PMR fields change. Synchronization Rules

●​ All external synchronization processes shall target the Primary PMR Row. ●​ Banner synchronization shall target the Primary PMR Row. ●​ Care Plan Due synchronization shall target the Primary PMR Row. ●​ Unlocked CP synchronization shall target the Primary PMR Row. ●​ HHA, O2, PAP, and PERS synchronization shall target the Primary PMR Row. Protected Standard Primary PMR Ownership is a protected framework standard. It may not be removed, bypassed, or modified without explicit approval. 11.2 One Pass Processing Standard Purpose The One Pass Processing Standard minimizes spreadsheet interaction overhead by optimizing read and write operations. It applies to Master List processing and, where practical, to Raw Data, Demo P, Banner, Care Plan, Monthly Change, and Disenrolled workflows. Processing Rule Framework execution logic shall perform consolidated reads, in-memory processing, and consolidated writes whenever practical.


**Original Table 45 (PDF page 18, table 1)**

| Processing Step | v2.0 / v1.7.6 Standard |
| --- | --- |
| Read | Read required sheet values once or in the fewest practical bulk reads. |
| Process | Construct Banner Summary flags, execute address processing, generate contact summaries, aggregate notes, apply phone labels, apply update tracking, and use existing Primary PMR Row ownership. |
| Write | Commit processed values to the sheet in a final consolidated write stage whenever practical. |

●​ Demo P shall copy active Raw Data rows first, then process once, then write once. ●​ Demo P shall not verify or reassign Primary PMR Row because Primary PMR ownership is assigned in Raw Data and copied to Demo P. ●​ Demo P shall not perform Banner source memory synchronization as a separate processing pass. Performance Goal Eliminate redundant sheet-wide I/O cycles for identical data objects to ensure framework scalability. Avoid repeated getValues(), setValues(), dashboard reads, formatting passes, and participant reprocessing loops. ​ 11.3 Synchronization Ownership Matrix


**Original Table 46 (PDF page 18, table 2)**

| Source | Match Rule | Target | Notes |
| --- | --- | --- | --- |


---

<!-- PDF page 19 -->


**Original Table 47 (PDF page 19, table 1)**

| Banner | Participant PMR# / approved Banner matching logic | Primary PMR Row | Banner flags and Banner Summary synchronize to Primary PMR Row. |
| --- | --- | --- | --- |
| Care Plan Due | Participant Name + Enrollment Date to Participant Name + Capitation Date | Primary PMR Row | Sync Enrollment Date, Last Care Plan, Next Care Plan Due, CP Type. |
| Unlocked Care Plan | PMR # to Participant PMR# | Primary PMR Row | Sync Participant Name, PMR #, IDT Meeting Date, Care Plan Start Date. |
| HHA CP | Approved HHA CP matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| HHA ISR | Approved HHA ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| O2 ISR | Approved O2 ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| PAP ISR | Approved PAP ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| PERS ISR | Approved PERS ISR matching logic | Primary PMR Row | Target remains Primary PMR Row. |
| Secondary Contact Rows | Not a synchronization target | Contact Processing Only | Contact/source rows are used for processing, not sync target output. |
| Demo P Update Tracking | Process generated | Primary PMR Row | Demo P Update Status, Month, Source Sheet. |
| Master List Update Tracking | Process generated | Primary PMR Row | Master List Update Status, Month, Source Sheet. |


**Original Table 48 (PDF page 19, table 2)**

| Validation | Dashboard Quality Location | Purpose |
| --- | --- | --- |
| Unlocked CP Sync Validation | Section F Dashboard Audit and Section G Framework Health Check | Verify PMR-based sync and missing/unmatched CP fields. |
| Care Plan Due Sync Validation | Section F Dashboard Audit and Section G Framework Health Check | Verify Participant Name + Enrollment Date to Participant Name + Capitation Date sync. |

Care Plan Sync validation shall not be assigned a new standalone Dashboard Quality section. It belongs inside Dashboard Audit and Framework Health Check. 11.4 Demo P Processing Standard Demo P processing follows copy-first, process-once, write-once architecture.


**Original Table 49 (PDF page 19, table 3)**

| Processing Step | v2.0 Standard |
| --- | --- |
| Copy | Copy active Raw Data rows |
| Process | Process in memory |
| Primary PMR | Do not assign or verify Primary PMR |
| Write | Single consolidated write |
| Tracking | Populate Demo P Update Status, Update Month, Source Sheet |


---

<!-- PDF page 20 -->


## 12. Banner Processing Rules

The v2.0 correction is that monthly Banner formatting shall use the faster current production production formatting process where approved, rather than the slower Banner-pattern conversion that was tested during stabilization. Template creation remains governed by Template First Formatting, but monthly Banner processing must prioritize data movement over repeated formatting. 12.1 Banner Source Fields


**Original Table 50 (PDF page 20, table 1)**

| Source FieldSource Field | SourceSource | Processing RuleProcessing Rule |
| --- | --- | --- |
| Last Name | Banners / Raw Data | Used for identity support and report context. |
| First Name | Banners / Raw Data | Used for identity support and report context. |
| Participant PMR# | Banners / Raw Data | Primary participant match key for Banner synchronization. |
| Safety - 2 Person | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Wanderer | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Interpreter Needed | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Fall Risk | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| DPOA or Guardian Active | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |
| Palliative Care | Banners | Banner flag synchronized to Raw Data Primary PMR Row. |


**Original Table 51 (PDF page 20, table 2)**

| RuleRule | v2.0 Standard |
| --- | --- |
| Raw Data Banner Fields | Raw Data receives Banner values by Sync from Banners after Banner processing. |
| Master List Banner Fields | Copies from Demo P |
| Banner Summary | Banner Summary is script-built in Demo P Process and must summarize relevant Banner flags on the Primary PMR Row. |
| Primary PMR Target | No Banner value shall be written to a non-primary Master List row. |
| Header Dependency | Banner synchronization depends on governed headers and is validated by Template Header Audit rather than repeated full header verification inside Banner processing. |
| Monthly Formatting | Monthly Banner processing shall use the faster current production formatting logic where approved. |


---

<!-- PDF page 21 -->

●​ Avoid repeated setColumnWidths(), setBackgrounds(), setFontSizes(), and full-format verification passes. ●​ Retain Banner business logic and replace only performance bottlenecks or obsolete formatting paths. 13. Care Plan Processing Rules

Care Plan fields must be written to the Master List Primary PMR Row only. Care Plan synchronization must be validated inside Dashboard Quality Section F - Dashboard Audit and Section G - Framework Health Check. 13.1 Care Plan Source Fields


**Original Table 52 (PDF page 21, table 1)**

| Report | Source Fields | Purpose |
| --- | --- | --- |
| CP Due Date | Participant Name; Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type | Provides Care Plan Due synchronization fields. |
| Unlock CP | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date | Provides Unlocked CP synchronization fields. |


**Original Table 53 (PDF page 21, table 2)**

| StepStep | SynchronizationSynchroniza tion | Match RuleMatch Rule | Fields SyncedFields Synced | TargetTarget |
| --- | --- | --- | --- | --- |
| 1 | Unlocked CP Sync | Unlocked CP PMR # matches Master List Participant PMR#. | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date. | Master List Primary PMR Row only. |
| 2 | Care Plan Due Sync | Care Plan Due Participant Name + Enrollment Date matches Master List Participant Name + Capitation Date. | Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type. | Master List Primary PMR Row only. |


## 13.3 Care Plan Source Fields


**Original Table 54 (PDF page 21, table 3)**

| Source FieldSource Field | SourceSource | Processing RuleProcessing Rule |
| --- | --- | --- |
| PMR #/ Participant PMR#. | Unlocked CP / Master List | Used for identity support and report context. |
| Participant Name | Unlocked CP | Unlock CP synchronized to Master List Primary PMR Row. |
| IDT Meeting Date | Unlocked CP | Unlock CP synchronized to Master List Primary PMR Row. |
| Care Plan Start Date | Unlocked CP | Unlock CP synchronized to Master List Primary PMR Row. |
| Participant Name | CP Due Date / Master List | Used for identity support and report context. |
| Enrollment Date / Capitation Date. | CP Due Date / Master List | Used for identity support and report context. |
| Last Care Plan | CP Due Date | CP Due Date synchronized to Master List Primary PMR Row. |


---

<!-- PDF page 22 -->


**Original Table 55 (PDF page 22, table 1)**

| Next Care Plan Due | CP Due Date | CP Due Date synchronized to Master List Primary PMR Row. |
| --- | --- | --- |
| CP Type | CP Due Date | CP Due Date synchronized to Master List Primary PMR Row. |


**Original Table 56 (PDF page 22, table 2)**

| Validation AreaValidation Area | Dashboard Quality LocationDashboard Quality Location | Required ResultRequired Result |
| --- | --- | --- |
| Unlocked CP Matches | Section F - Test 10 Dashboard Audit | Report matched, unmatched, and missing key counts. |
| Care Plan Due Matches | Section F - Test 10 Dashboard Audit | Report matched, unmatched, and missing key counts. |
| Unlocked CP Health | Section G - Framework Health Check | Pass/fail summary for Unlocked CP synchronization readiness. |
| Care Plan Due Health | Section G - Framework Health Check | Pass/fail summary for Care Plan Due synchronization readiness. |
| Rows Missing CP Data | Sections F and G | Identify rows missing IDT Meeting Date, Care Plan Start Date, Next Care Plan Due, or CP Type where applicable. |

Care Plan Sync validation shall not be created as a separate Dashboard Quality section. It is an audit/health result inside existing Sections F and G. 13.4 Care Plan Formatting and Template Rules


**Original Table 57 (PDF page 22, table 3)**

| SheetSheet | Template / Formatting StandardTemplate / Formatting Standard |
| --- | --- |
| CP Due Date | Monthly formatting uses the faster current production production process where approved. Template creation uses corrected template steps. |
| Unlock CP | Monthly formatting uses the faster current production production process where approved. Apply Full Template Formatting remains allowed for the Unlocked Care Plan template path. |

●​ Care Plan Due and Unlocked CP sheets use the standard title/header/data layout. ●​ Formatting verification shall not run during normal monthly processing. ●​ Template Header Audit validates required Care Plan headers centrally. ●​ Care Plan source sheets must not be destructively altered except by approved formatting workflow. 14. Demo P Processing Rules

Demo P remains the primary monthly participant processing sheet. In v2.0 , Demo P processing is corrected to copy active Raw Data rows first, process once, and write once. Primary PMR ownership is not assigned or verified in Demo P because it is assigned in Raw Data and copied to Demo P. Demo P must preserve required source information for processing and auditability while generating the governed Demo P update tracking columns. 14.1 Demo P Required Architecture


**Original Table 58 (PDF page 22, table 4)**

| RuleRule | v2.0 Standardv2.0 Standard |
| --- | --- |
| Primary Source | Raw Data is the authoritative monthly import source. |
| Copy First | Demo P must copy active Raw Data rows before performing Demo P processing. |


---

<!-- PDF page 23 -->


**Original Table 59 (PDF page 23, table 1)**

| Process Once | Demo P applies required process fields in a single consolidated pass whenever practical. |
| --- | --- |
| Write Once | Demo P should use consolidated writes instead of repeated row-by-row writes. |
| Primary PMR Ownership | Demo P shall not assign, verify, or rescan Primary PMR Row ownership. |
| Banner Memory Sync | Not apart of Demo P processing |
| Disenrolled PMR Exclusion Set | Demo P may use the Disenrolled PMR set to exclude disenrolled PMRs from active Demo P output where approved by workflow. |
| Final Row Height | Demo P shall enforce row height 25 after processing. |


**Original Table 60 (PDF page 23, table 2)**

| Required ColumnRequired Column | SourceSource | RuleRule |
| --- | --- | --- |
| Primary PMR Row | Copied from Raw Data | Authoritative ownership marker. Not reassigned in Demo P. |
| Demo P Update Status | Process | Required template/header column populated by Demo P processing. |
| Demo P Update Month | Process | Required template/header column populated with current processing month. |
| Demo P Source Sheet | Process | Required template/header column populated with Raw Data source sheet name. |

The Demo P template must include Demo P Update Status, Demo P Update Month, and Demo P Source Sheet. These columns are governed by the Template Header Audit. 14.3 Demo P Banner Relationship


**Original Table 61 (PDF page 23, table 3)**

| AreaArea | v2.0 Standardv2.0 Standard |
| --- | --- |
| Banner Fields | Not a part of Demo P processing - copies from Raw Data |
| Banner Memory Sync Removal | Not a part of Demo P processing - copies from Raw Data |
| Banner Summary | Banner Summary is generated by script logic and belongs on the Primary PMR Row downstream. |


**Original Table 62 (PDF page 23, table 4)**

| Removed / Prohibited StepRemoved / Prohibited Step | Replacement StandardReplacement Standard |
| --- | --- |
| Demo P Working Source - assign Primary PMR Row by sequential block scan | Primary PMR Row is assigned in Raw Data and copied to Demo P. |
| Demo P Working Source - verify Primary PMR Row from Raw Data | No verification step required in Demo P; Template Header Audit validates the column exists. |
| Demo P Working Source - sync newest Banners mm.yy source into memory | Not a part of Demo P processing - copies from Raw Data |
| Repeated Demo P participant scans | Use copy-first/process-once/write-once architecture. |


**Original Table 63 (PDF page 23, table 5)**

| HeaderHeader | Required MeaningRequired Meaning | ValidationValidation |
| --- | --- | --- |


---

<!-- PDF page 24 -->


**Original Table 64 (PDF page 24, table 1)**

| Demo P Update Status | Indicates processing/update status for the Demo P row. | Template Header Audit; optional Dashboard Audit summary. |
| --- | --- | --- |
| Demo P Update Month | Stores current report month in mm.yy format. | Template Header Audit; optional Dashboard Audit summary. |
| Demo P Source Sheet | Stores the Raw Data source sheet name. | Template Header Audit; optional Dashboard Audit summary. |


**Original Table 65 (PDF page 24, table 2)**

| Processing Step | Current v2.0 Standard |
| --- | --- |
| Copy | Copy active Raw Data rows |
| Process | Perform governed processing |
| Banner | Use Banner values from Raw Data |
| Primary PMR | Do not assign or verify ownership |
| Write | Single consolidated write |
| Format | Apply governed formatting |

Disenrollment processing is now a standalone governed workflow. The framework shall maintain a Disenrolled Exclusion List, but the Repair Disenrolled List workflow and menu item are retired. Disenrolled participants may remain in RTZ/Demo P source data but should be excluded from inappropriate non-disenrollment monthly changes where approved by workflow. The Disenrolled Exclusion List and Master List Change Log remain system sheets and may be hidden by default. 15.1 Standalone Disenrolled Workflow


**Original Table 66 (PDF page 24, table 3)**

| RuleRule | v2.0 Standardv2.0 Standard |
| --- | --- |
| Workflow Name | Create Disenrolled List. |
| Prompt | Create Disenrolled List prompts for the reporting month/date and uses that prompted value for the output sheet name. |
| Output Naming | Disenrolled MM.YY. |
| Source | Raw Data for the prompted month unless otherwise approved by production workflow. |
| PMR Use | Disenrolled PMR sets may be used by Demo P processing to exclude disenrolled PMRs from active output where approved. |
| Template | Disenrolled Exclusion List uses its governed template and approved reduced column set. |
| Final Row Count | Disenrolled template row count standard is 800. |
| Final Row Height | Disenrolled output enforces row height 25 after processing. |


**Original Table 67 (PDF page 24, table 4)**

| ValidationValidation | Required BehaviorRequired Behavior |
| --- | --- |
| Template Header Audit | Validates only the approved Disenrolled column set, not removed columns. |
| Dashboard Count | Disenrolled output row count must align with dashboard template row count standard unless source data requires fewer used rows. |
| Date Prompt Naming | Output sheet name must use the month/date from the prompt. |
| No Repair Menu | Repair Disenrolled List shall not appear in menus or framework dispatchers. |


---

<!-- PDF page 25 -->


---

<!-- PDF page 26 -->


## 16. Framework Development Standards

The Framework Development Standards remain protected. The framework shall be evolved from the current production script and shall not be rebuilt from memory. The Current Production Script v1.7.6 is the implementation authority for future framework development.


**Original Table 68 (PDF page 26, table 1)**

| Development Rule | v2.0 Standard |
| --- | --- |
| Production source | Use Current Production Script v1.7.6 as the current executable baseline. |
| Governing specification | Use Framework Specification v2.0 as the governing authority after final assembly. |
| Historical references | Document only the current production framework. Historical architecture, migration history, lineage discussions, and retired production references are not part of the governing specification. |
| Review requirement | Always inspect the full script before modifying. |
| Full replacement requirement | Full replacement scripts only unless explicitly requested. |
| Patch prohibition | No patch snippets for production releases. |
| Code cleanup | Remove obsolete, deprecated, duplicate, orphaned, unused, and dead code. |
| Working logic preservation | Keep working business logic unchanged unless specifically requested or required by approved architecture. |
| Single-file architecture | Maintain clean single-file section architecture until production stabilization is complete. |
| Menu cleanup | Remove retired menu items such as Repair Disenrolled List when retired by specification. |
| Dashboard Quality | Use consolidated Dashboard Quality sections A-J rather than standalone QA report sheets. |


**Original Table 69 (PDF page 26, table 2)**

| Rule | Requirement |
| --- | --- |
| Review full script before changes | Required before every production script update. |
| No patch updates | Production releases must be full replacement versions. |
| Full replacement updates | Replace affected functions completely. |
| Remove obsolete logic | Required during every production release. |
| Remove duplicate logic | Required during every production release. |
| Remove orphan code | Required during every production release. |
| Remove dead code | Required during every production release. |
| Remove deprecated helpers | Required during every production release. |
| Build for long-term maintenance | No layered temporary fixes or hidden legacy logic. |
| Preserve approved business logic | Do not rebuild Monthly Change, Master List, Contact, Banner, Care Plan, or Demo P logic unless correcting approved bottlenecks or architecture defects. |


**Original Table 70 (PDF page 26, table 3)**

| Review Area | Required Action |
| --- | --- |


---

<!-- PDF page 27 -->


**Original Table 71 (PDF page 27, table 1)**

| Duplicate function review | Identify and remove duplicate implementations. |
| --- | --- |
| Duplicate constant review | Remove duplicate or obsolete global constants. |
| Duplicate menu review | Remove duplicate and retired menu items. |
| Unused helper review | Remove helpers that are not referenced by active workflow, audit, QA, menu, or framework functions. |
| Orphan function review | Remove functions not called by menu, workflow, validation, QA test, framework dashboard, or active helper chain. |
| Dead code review | Remove unreachable code paths. |
| Legacy code review | Remove legacy commented-out code and backup functions. |


**Original Table 72 (PDF page 27, table 2)**

| Update Step | Requirement |
| --- | --- |
| Review entire script | Required before change. |
| Determine impacted functions | Identify all upstream/downstream dependencies. |
| Replace affected functions completely | Do not layer patches. |
| Verify references | Verify helper, menu, trigger, dashboard, validation, QA, and timing references. |
| Verify menus | Confirm no retired menu item remains. |
| Verify triggers | Confirm no broken trigger references. |
| Verify helpers | Confirm helpers exist exactly once. |
| Update version | Increment version, release notes, and change log. |

●​ Do not split the framework into multiple Google Apps Script (.gs) files during active development. ●​ Do not recommend modular architecture during production stabilization. ●​ All framework components shall remain within a single production script until Dashboard, template, Primary PMR, Monthly Change, validation, Dashboard Quality, timing, and QA architecture are finalized. ●​ After a stable production release, modularization may be reviewed, but it is not the current approved architecture. Required Script Sections


**Original Table 73 (PDF page 27, table 3)**

| Script Section | Required |
| --- | --- |
| CONFIGURATION | Yes |
| MENU FUNCTIONS | Yes |
| DASHBOARD FUNCTIONS | Yes |
| TEMPLATE FUNCTIONS | Yes |
| FORMATTERS | Yes |
| SYNC FUNCTIONS | Yes |


---

<!-- PDF page 28 -->


**Original Table 74 (PDF page 28, table 1)**

| MONTHLY CHANGE FUNCTIONS | Yes |
| --- | --- |
| MASTER LIST FUNCTIONS | Yes |
| DISENROLLMENT FUNCTIONS | Yes |
| VALIDATION FUNCTIONS | Yes |
| FRAMEWORK TEST FUNCTIONS | Yes |
| DASHBOARD QUALITY FUNCTIONS | Yes |
| FRAMEWORK DASHBOARD FUNCTIONS | Yes where retained by production script |
| TIMING FUNCTIONS | Yes |
| HELPER FUNCTIONS | Yes |


**Original Table 75 (PDF page 28, table 2)**

| Release Package Item | Required |
| --- | --- |
| Version Number | Yes |
| Change Summary | Yes |
| Removed Code Summary | Yes |
| Helper Audit Summary | Yes |
| Framework Health Check Summary | Yes |
| Testing Checklist | Yes |
| Performance Impact Review | Yes |
| Full Replacement Script | Yes |


**Original Table 76 (PDF page 28, table 3)**

| Rule | Requirement |
| --- | --- |
| Patch-style fixes | Not permitted for production releases. |


---

<!-- PDF page 29 -->


**Original Table 77 (PDF page 29, table 1)**

| Partial production replacements | Not permitted unless explicitly requested. |
| --- | --- |
| Obsolete logic | Remove. |
| Duplicate logic | Remove. |
| Deprecated logic | Remove. |
| Unused helpers | Remove. |
| Dead code | Remove. |
| Orphan functions | Remove. |
| Commented-out legacy code | Remove. |
| Backup functions | Remove. |
| Unused variables/constants | Remove. |


**Original Table 78 (PDF page 29, table 2)**

| Verification Area | Required |
| --- | --- |
| Entire script reviewed | Yes |
| Impacted functions identified | Yes |
| Affected functions completely replaced | Yes |
| Helper references verified | Yes |
| Menu references verified | Yes |
| Trigger references verified | Yes |
| Dashboard references verified | Yes |
| Validation references verified | Yes |
| Dashboard Quality references verified | Yes |
| Timing references verified | Yes |

●​ Build for long-term maintainability. ●​ Avoid technical debt. ●​ Avoid temporary workarounds. ●​ Keep working sections unchanged unless specifically requested. ●​ All production releases shall be delivered as full replacement versions. 16.F Production Update Standard Purpose The Production Update Standard mandates rigorous end-to-end review for all future enhancements. Isolated patches and fragmented modifications are prohibited in favor of complete affected-function replacement and comprehensive audit. Production Update Requirements


**Original Table 79 (PDF page 29, table 3)**

| Audit / Review | Required |
| --- | --- |
| Full production script inspection | Yes |
| Validation against Framework Specification v2.0 | Yes |
| Operational workflow assessment | Yes |
| Shared helper dependency verification | Yes |


---

<!-- PDF page 30 -->


**Original Table 80 (PDF page 30, table 1)**

| Custom menu integration verification | Yes |
| --- | --- |
| Dashboard configuration/reference evaluation | Yes |
| Dashboard Quality section/reference evaluation | Yes |
| Performance timing and execution dependency review | Yes |
| Internal validation rules and logic tree audit | Yes |
| Framework testing regression analysis | Yes |


**Original Table 81 (PDF page 30, table 2)**

| Deliverable | Required |
| --- | --- |
| Architecture Audit | Yes |
| Helper Audit | Yes |
| Dependency Audit | Yes |
| Performance Audit | Yes |
| Removed Code Summary | Yes |
| Change Summary | Yes |
| Testing Recommendations | Yes |
| Framework Health Check Summary | Yes |
| Recommended Next Version | Yes |
| Full Replacement Script | Yes |


**Original Table 82 (PDF page 30, table 3)**

| Architecture Standard | Must Preserve |
| --- | --- |
| Single File Code Architecture | Yes |
| Primary PMR Row Data Architecture | Yes |
| One Pass Processing Methodology | Yes |
| Dashboard-Driven Formatting Logic | Yes |
| Standardized Template Architecture | Yes |
| Dashboard Quality Consolidated Reporting | Yes |
| Centralized Validation Framework | Yes |
| Template Header Audit | Yes |
| Standardized QA Testing Architecture | Yes |
| Timing Framework | Yes |

The Production Update Standard is a protected framework protocol. Modifications, bypasses, or deletions of these requirements are prohibited without explicit governance approval. 16.G Editorial Governance Update (v2.0) The framework specification is an editorial document describing the implementation in the Current Production Script v1.7.6. Future revisions shall edit the existing specification, preserve structure and technical depth where accurate, remove obsolete historical architecture, and document only the current production framework.


---

<!-- PDF page 31 -->


## 17. Helper Audit Standards Purpose The Helper Audit ensures that all shared helper functions required by the Master List Framework exist, are referenced correctly, and are maintained in a clean, dependency-safe state. Helper Audit Requirement


**Original Table 83 (PDF page 31, table 1)**

| Audit Item | Pass Requirement |
| --- | --- |
| All referenced helper functions exist | Pass required |
| No duplicate helper functions exist | Pass required |
| No orphan helper functions exist | Pass required |
| No unused helper functions exist | Pass required |
| No deprecated helper functions remain | Pass required |
| No helper references are broken | Pass required |


**Original Table 84 (PDF page 31, table 2)**

| Reference Area | May Reference Helpers |
| --- | --- |
| Menu Functions | Yes |
| Dashboard Functions | Yes |
| Template Functions | Yes |
| Formatters | Yes |
| Sync Functions | Yes |
| Monthly Change Functions | Yes |
| Master List Functions | Yes |
| Disenrollment Functions | Yes |
| Validation Functions | Yes |
| Framework Test Functions | Yes |
| Dashboard Quality Functions | Yes |
| Timing Functions | Yes |
| Other approved helper functions | Yes |


**Original Table 85 (PDF page 31, table 3)**

| Helper | Purpose / Standard |
| --- | --- |
| toBool _ | Boolean normalization. |
| truthy _ | Truthy value normalization. |
| toNumber _ | Numeric normalization. |
| normalizeHeader _ | Header normalization. |
| normalizeAlignment _ | Alignment normalization. |


---

<!-- PDF page 32 -->


**Original Table 86 (PDF page 32, table 1)**

| normalizeText _ | Text normalization. |
| --- | --- |
| normalizeKey _ | Key normalization. |
| compareValues _ | Value comparison. |
| getWrapStrategy _ | Wrap strategy normalization. |
| safeColor _ | Color fallback/validation. |
| safeSheetName _ | Safe sheet name generation. |

Additional helpers may be added as the framework evolves, but duplicate helper implementations are not allowed. 18. Framework Health Check Standards Purpose The Framework Health Check verifies that all critical framework components exist, are functioning correctly, and are ready for production use. It serves as the final framework readiness review prior to release. Framework Health Check Requirement

●​ A Framework Health Check shall be completed before every production release. ●​ A release shall not be considered production-ready until all Framework Health Check items pass. ●​ Framework Health Check output belongs in Dashboard Quality Section G. ●​ Framework Health Check shall update Section G only and shall not erase or rebuild the full Dashboard Quality Report. Framework Component Verification


**Original Table 87 (PDF page 32, table 2)**

| Component Category | Required Verification |
| --- | --- |
| MENU FUNCTIONS | Exist and referenced correctly. |
| DASHBOARD FUNCTIONS | Exist and referenced correctly. |
| TEMPLATE FUNCTIONS | Exist and referenced correctly. |
| FORMATTER FUNCTIONS | Exist and referenced correctly. |
| SYNC FUNCTIONS | Exist and referenced correctly. |
| MONTHLY CHANGE FUNCTIONS | Exist and referenced correctly. |
| MASTER LIST FUNCTIONS | Exist and referenced correctly. |
| DISENROLLMENT FUNCTIONS | Create Disenrolled exists; Repair Disenrolled retired/absent. |
| VALIDATION FUNCTIONS | Exist and referenced correctly. |
| FRAMEWORK TEST FUNCTIONS | Exist and referenced correctly. |
| DASHBOARD QUALITY FUNCTIONS | Exist and section assignments A-J are valid. |
| TIMING FUNCTIONS | Exist and write to the current timing log. |
| HELPER FUNCTIONS | Exist and no broken references. |


**Original Table 88 (PDF page 32, table 3)**

| Reference Type | Requirement |
| --- | --- |
| Menu references | All menu references exist; retired triggers removed. |
| Helper references | All helper references exist. |
| Dashboard references | All dashboard references exist. |
| Dashboard Quality references | All section references exist and map to A-J. |


---

<!-- PDF page 33 -->


**Original Table 89 (PDF page 33, table 1)**

| Validation references | All validation references exist. |
| --- | --- |
| Framework references | All framework references exist. |
| Timing references | All timing references exist. |
| Trigger references | All trigger references exist or retired triggers are removed. |


**Original Table 90 (PDF page 33, table 2)**

| Protected Component | Required |
| --- | --- |
| Framework Dashboard / Dashboard Quality | Yes |
| Dashboard Validation | Yes |
| Template Validation | Yes |
| Template Header Audit | Yes |
| Helper Audit | Yes |
| Dependency Audit | Yes |
| Orphan Function Audit | Yes |
| Duplicate Function Audit | Yes |
| Framework Health Check | Yes |
| Timing Logs | Yes |
| Care Plan Sync Validation | Yes, inside Dashboard Audit and Framework Health Check. |


**Original Table 91 (PDF page 33, table 3)**

| Criterion | Pass Requirement |
| --- | --- |
| No missing functions | Pass required |
| No missing helpers | Pass required |
| No missing references | Pass required |
| No ReferenceErrors | Pass required |
| No missing framework components | Pass required |
| No missing validation components | Pass required |
| No missing dashboard components | Pass required |
| No missing Dashboard Quality components | Pass required |
| No missing timing components | Pass required |
| Care Plan Sync validation result | Must be present in Sections F and G. |

Framework Health Check is a mandatory release gate. Production releases shall not be issued until all Framework Health Check items pass successfully.


---

<!-- PDF page 34 -->


## 19. Testing Workflow Standards Purpose The Testing Workflow ensures that all framework components operate correctly before release and that production updates do not introduce regressions, missing dependencies, missing Dashboard Quality sections, or ReferenceErrors. Testing Requirement

●​ Testing shall be performed before every production release. ●​ Testing shall be recommended after every framework update. ●​ All production releases shall complete the required testing workflow. ●​ Dashboard Quality Report is the consolidated testing output. Dashboard Quality Section Test Matrix


**Original Table 92 (PDF page 34, table 1)**

| Section | Test / Output | Purpose | Standalone Report Sheet |
| --- | --- | --- | --- |
| A | Template Validation | Validate templates and template configuration. | Retired; writes to Section A. |
| B | Template Header Audit | Validate governed headers across templates. | New consolidated section. |
| C | Test 6 Date Formatting | Validate date formatting. | Retired; writes to Section C. |
| D | Test 7 Validation Failure | Validate/report framework validation failures. | Retired; writes to Section D. |
| E | Test 9 Monthly Change Subheaders | Validate Monthly Change sections/subheaders. | Retired; writes to Section E. |
| F | Test 10 Dashboard Audit | Validate dashboard and include CP Sync audit. | Retired; writes to Section F. |
| G | Framework Health Check | Validate release readiness and include CP Sync health. | Retired as standalone report; writes to Section G. |
| H | Signoff | Release readiness/signoff output. | Consolidated. |
| I | Summary | Consolidated QA summary. | Consolidated. |
| J | Timing Summary | Timing summary from current timing log. | Consolidated. |

Testing Categories


**Original Table 93 (PDF page 34, table 2)**

| Category | Required in v2.0 |
| --- | --- |
| Dashboard Integrity Test | Yes; output in Dashboard Audit section. |
| Template Validation | Yes; output in Section A. |
| Template Header Audit | Yes; output in Section B. |
| Fast Structure Validation | Yes where retained; may be included in Template Validation or Dashboard Audit. |
| Format Preview | Optional/QA as needed; not part of monthly processing. |
| Framework Dashboard / Dashboard Quality | Yes; consolidated output required. |
| Helper Audit | Yes. |
| Dependency Audit | Yes. |


---

<!-- PDF page 35 -->


**Original Table 94 (PDF page 35, table 1)**

| Orphan Function Audit | Yes. |
| --- | --- |
| Duplicate Function Audit | Yes. |
| Framework Health Check | Yes; output in Section G. |
| Care Plan Sync Validation | Yes; output in Sections F and G. |


**Original Table 95 (PDF page 35, table 2)**

| Retired Output / Behavior | Replacement |
| --- | --- |
| Standalone Template Validation Report | Dashboard Quality Section A. |
| Standalone Test 6 Date Format Report | Dashboard Quality Section C. |
| Standalone Test 7 Validation Failure Report | Dashboard Quality Section D. |
| Standalone Test 9 Monthly Change Subheader Report | Dashboard Quality Section E. |
| Standalone Test 10 Dashboard Audit Report | Dashboard Quality Section F. |
| Standalone Framework Health Check Report | Dashboard Quality Section G. |
| Dashboard Quality hidden-template creation | Direct section updates on existing Dashboard Quality Report. |
| Dashboard Quality full rebuild after all tests | Section I Summary and Section J Timing Summary update only. |


## 19.1 Editorial Update (v2.0) Testing documentation shall describe the current production implementation only. Historical workflows, retired report architectures, and legacy testing processes shall not be retained unless required for current production behavior. 21. Versioning Standards

Text file names for scripts must always start with v. Versioning standards ensure consistent release tracking, framework governance, testing accountability, and change management throughout the life of the Master List Framework.


**Original Table 96 (PDF page 35, table 3)**

| Release Type | Format | Use |
| --- | --- | --- |
| Major | X.0.0 | Major architecture or workflow redesign. |
| Feature | X.X.0 | New functionality, reports, dashboard capabilities. |
| Bug Fix | X.X.X | Bug fixes, validation fixes, minor improvements. |
| Population Pass | X.X.X Label | Documentation migration or specification completion pass. |


**Original Table 97 (PDF page 35, table 4)**

| Item | Standard |
| --- | --- |
| Current production script baseline | v1.7.6 |
| Framework specification target | v2.0 |
| Current implementation authority | Current Production Script v1.7.6 |


**Original Table 98 (PDF page 35, table 5)**

| Requirement | Required |
| --- | --- |


---

<!-- PDF page 36 -->


**Original Table 99 (PDF page 36, table 1)**

| Increment version number | Yes |
| --- | --- |
| Update version header | Yes |
| Update release documentation | Yes |
| Update changelog | Yes |
| Update known issues / open items | Yes when applicable |


**Original Table 100 (PDF page 36, table 2)**

| Release Document Item | Required |
| --- | --- |
| Version Number | Yes |
| Release Date | Yes |
| Change Summary | Yes |
| Removed Code Summary | Yes |
| Helper Audit Summary | Yes |
| Framework Health Check Summary | Yes |
| Testing Checklist | Yes |
| Performance Review Summary | Yes |
| Known Issues | Yes |
| Recommended Next Version | Yes |

All approved framework decisions shall be incorporated into the next governing specification revision. Framework updates shall be cumulative. Approved governance decisions shall not require recreation from historical specifications once incorporated into the current governing document. The current governing specification shall be treated as the authoritative framework baseline. When approved framework decisions affect:

●​ Architecture ●​ Processing Logic ●​ Dashboard Configuration ●​ Validation Rules ●​ Template Definitions ●​ Column Definitions ●​ Sheet Definitions ●​ Data Source Mappings ●​ Synchronization Logic the governing specification and affected appendices shall be updated accordingly. 21.2 Latest Approved Output Governance

The current governing framework baseline shall be established by:

●​ Current Governing Specification ●​ Current Production Baseline


---

<!-- PDF page 37 -->

●​ Approved framework artifacts include: ●​ Framework Specification Documents ●​ Official Framework Updates ●​ Framework Addendum Records ●​ Active Production Scripts ●​ Formal Architecture Audits ●​ System Validation Reports ●​ Performance Timing Reports ●​ Authorized Data Mapping Updates When newer approved artifacts are issued:

●​ Review against the current governing specification. ●​ Review against the current production baseline. ●​ Identify governance impacts. ●​ Identify architecture impacts. Identify required specification updates. Supporting artifacts shall not supersede the governing specification or approved production baseline unless formally approved. The Master List Framework shall evolve through cumulative governance updates. 21.3 Script Lineage Governance

The framework maintains a strict hierarchical lineage:

●​ Current Governing Specification ●​ Current Production Baseline ●​ Current Approved Production Script ●​ Current Approved Framework Update Future development recommendations shall be derived from the newest approved level available. When a newer approved production script exists:

●​ Compare against the current production baseline. ●​ Compare against the governing specification. ●​ Identify architecture deltas. ●​ Update future recommendations to align with the newest approved script. Regression to prior executable versions is prohibited except when explicitly required for regression review or historical audit. Archived reference scripts do not govern the current framework. 21.4 Executable Script Accessibility Governance

The framework mandates the absolute availability of the latest authorized production script in its entirety prior to any modification, architectural optimization, formal audit, logical reconstruction, or version advancement activities. Validated repositories for executable logic comprise:

●​ Internal Knowledge Base Repository Files ●​ Current Authorized Production Script Uploads ●​ Verified Production Script Archival Lineage ●​ Exhaustive Script Attachments within Active Sessions In instances where the definitive production baseline is inaccessible, fragmented, or only partially transparent:


---

<!-- PDF page 38 -->

●​ Prohibit the assumption of internal logic. ●​ Forbid memory-based logical code reconstruction. ●​ Avoid inaccurate declarations of comprehensive audit. ●​ Demand the delivery of exhaustive source files. Conceptual framework governance reviews remain permissible absent the executable file. Technical script modifications necessitate total source transparency and availability. The most recently authorized complete version serves as the definitive executable implementation baseline. 21.5 Knowledge Base Governance

Purpose The Master List GPT Knowledge Base establishes a formal authority hierarchy and file organization standard to ensure framework integrity and documentation consistency. Knowledge Base Index A centralized Knowledge Base Index shall be maintained as the authoritative log. This index must be updated whenever governing framework artifacts, production baselines, executable scripts, update logs, validation reports, timing summaries, mapping documents, or historical lineage files are added, replaced, retired, or renamed. Knowledge Authority Order Tier 1 – Governing Authority

●​ Current Framework Specification ●​ Current Daily Framework Review Protocol ●​ Current GPT Instructions Tier 2 – Active Production Authority

●​ Current Production Baseline ●​ Current Approved Production Script Tier 3 – Active Supporting Artifacts

●​ Dashboard Quality Reports ●​ Validation Reports ●​ Timing Reports ●​ Mapping Documents ●​ Framework Update Log


**Original Table 101 (PDF page 38, table 1)**

| Protected Component | v2.0 Status |
| --- | --- |
| Framework Dashboard / Dashboard Quality | Protected; Dashboard Quality sections A-J are the consolidated QA output. |
| Framework QA Tests | Protected. |
| Template Validation | Protected; writes Section A. |
| Template Header Audit | Protected; writes Section B. |
| Dashboard Validation | Protected. |
| Helper Audit | Protected. |
| Dependency Audit | Protected. |
| Orphan Function Audit | Protected. |
| Duplicate Function Audit | Protected. |


---

<!-- PDF page 39 -->


**Original Table 102 (PDF page 39, table 1)**

| Framework Health Check | Protected; writes Section G. |
| --- | --- |
| Timing Logs | Protected; summarized in Section J. |
| Dashboard Configuration | Protected. |
| Care Plan Sync Validation | Protected; included in Sections F and G. |


**Original Table 103 (PDF page 39, table 2)**

| Protected Behavior | Standard |
| --- | --- |
| Freeze Rows 1-4 | Protected. |
| Freeze Columns A:B | Protected. |
| Header Row 4 | Protected. |
| Data Start Row 5 | Protected. |
| Dashboard-Controlled Formatting | Protected. |
| Dashboard-Controlled Validation | Protected. |
| Dashboard-Controlled Column Widths | Protected. |
| Dashboard-Controlled Date Formats | Protected. |
| Dashboard-Controlled Hidden Columns | Protected. |
| Dashboard Quality section-only updates | Protected. |
| Timestamped Dashboard Quality section headers | Protected. |


**Original Table 104 (PDF page 39, table 3)**

| Architecture | Protected Standard |
| --- | --- |
| Single File Architecture | Protected during production stabilization. |
| Primary PMR Row Architecture | Protected. |
| Master List Primary PMR Rows Only | Protected. |
| One Pass Processing Architecture | Protected. |
| Template First Formatting | Protected. |
| Dashboard Configuration Cache | Protected. |
| Framework Dashboard / Dashboard Quality Architecture | Protected. |
| Framework Validation Architecture | Protected. |
| Framework Testing Architecture | Protected. |
| Care Plan Sync Architecture | Protected. |
| Demo P Copy-First / Process-Once Architecture | Protected. |
| Standalone Disenrolled Architecture | Protected. |


**Original Table 105 (PDF page 39, table 4)**

| Processing Standard | Protected / Retired Status |
| --- | --- |
| Master List Processing Workflow | Protected. |
| Monthly Change Processing Workflow | Protected. |
| Banner Processing Workflow | Protected. |
| Care Plan Processing Workflow | Protected. |


---

<!-- PDF page 40 -->


**Original Table 106 (PDF page 40, table 1)**

| Demo P Processing Workflow | Protected with v2.0 copy-first/process-once corrections. |
| --- | --- |
| Disenrollment Processing Workflow | Protected as standalone Create Disenrolled List. |
| Repair Disenrolled List | Retired; shall not be reintroduced without approval. |
| Demo P Primary PMR reassignment/verification | Retired; Primary PMR assignment occurs in Raw Data. |
| Dashboard Quality full rebuild | Retired; section-only updates required. |
| Standalone QA report sheets | Retired; Dashboard Quality sections A-J required. |


**Original Table 107 (PDF page 40, table 2)**

| Data Standard | Protected |
| --- | --- |
| Column Configuration Tables | Yes |
| Sheet Definitions | Yes |
| Data Source Mapping Tables | Yes |
| Color Standards | Yes |
| Naming Standards | Yes |
| Template Row Counts | Yes |
| Demo P Update Tracking Columns | Yes |
| Master List Update Tracking Columns | Yes |
| Disenrolled Reduced Column Set | Yes |


**Original Table 108 (PDF page 40, table 3)**

| Required Documentation | Required for Protected Standard Change |
| --- | --- |
| Reason for Change | Yes |
| Impact Analysis | Yes |
| Testing Requirements | Yes |
| Rollback Strategy | Yes |
| Release Blocking Review | Yes |


**Original Table 109 (PDF page 40, table 4)**

| Goal | Protected Outcome |
| --- | --- |
| Framework Consistency | Yes |
| Framework Stability | Yes |
| Framework Maintainability | Yes |
| Framework Testability | Yes |
| Framework Reliability | Yes |
| Long-Term Development Integrity | Yes |


---

<!-- PDF page 41 -->


## Appendix A - Column Configuration Table


**Original Table 110 (PDF page 41, table 1)**

| Header | Width | Header Font Size | Date Column | Hide Column | Data Wrap | Horizontal Alignment | Owner/Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AD1 - Phone | 90 |  |  | Yes |  |  |  |
| AD1 - Phone Valid Dates From | 80 | 7 | Date | Yes |  |  |  |
| AD2 - Phone | 90 |  |  | Yes |  |  |  |
| AD2 - Phone Valid Dates From | 110 | 7 | Date | Yes |  |  |  |
| AD2 - Phone Valid Dates To | 110 | 7 | Date | Yes |  |  |  |
| AD3 - Phone | 90 |  |  | Yes |  |  |  |
| AD3 - Phone Valid Dates From | 110 | 7 | Date | Yes |  |  |  |
| AD3 - Phone Valid Dates To | 110 | 7 | Date | Yes |  |  |  |
| Additional Important Information | 105 | 7 |  | Yes |  |  |  |
| Address 1 - Street | 250 |  |  | Yes |  |  |  |
| Capitation Date | 100 |  | Date | No |  |  |  |
| Care Plan Start Date | 100 |  | Date | No |  |  |  |
| Caseload - Supervising MD | 105 | 7 |  | Yes |  |  |  |
| Change Timestamp | 140 |  | Date | No |  |  |  |
| AD1 - Phone Valid Dates To | 110 | 7 | Date | Yes |  |  |  |
| Company | 90 |  |  | Yes |  |  |  |
| Contact - 1 | 140 |  |  | Yes |  |  |  |
| Contact - 2 | 140 |  |  | Yes |  |  |  |
| Contact - 3 | 140 |  |  | Yes |  |  |  |
| Contact - 4 | 140 |  |  | Yes |  |  |  |
| Contact - 5 | 140 |  |  | Yes |  |  |  |
| Contact - 6 | 140 |  |  | Yes |  |  |  |
| Contact - 7 | 140 |  |  | Yes |  |  |  |
| Contact - 8 | 140 |  |  | Yes |  |  |  |
| Contact - First Name | 90 | 9 |  | Yes |  |  |  |
| Contact - Last Name | 90 | 9 |  | Yes |  |  |  |
| Contact - Notes | 100 |  |  | Yes |  |  |  |
| Contact - Primary Language | 90 |  |  | Yes |  |  |  |


---

<!-- PDF page 42 -->


**Original Table 111 (PDF page 42, table 1)**

| Header | Width | Header Font Size | Date Column | Hide Column | Data Wrap | Horizontal Alignment | Owner/Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Contact - Summary | 140 |  |  | Yes |  |  |  |
| CP Updated | 140 |  | Date | No |  |  |  |
| Custom Field 1 - Label | 140 |  |  | Yes |  |  |  |
| Custom Field 1 - Value | 140 |  |  | Yes |  |  |  |
| Date of Birth | 90 |  | Date | No |  |  |  |
| Date of Death | 80 |  | Date | No |  |  |  |
| Demo P Update Month | 140 |  | Date | No |  |  |  |
| Demo P Update Status | 140 |  | Date | No |  |  |  |
| Disenrollment Date | 115 |  | Date | No |  |  |  |
| Disenrollment Effective Date | 115 |  | Date | No |  |  |  |
| DPOA or Guardian Active | 90 | 7 |  | No |  |  |  |
| Enrollment Date | 100 |  | Date | No |  |  |  |
| IDT Meeting Date | 100 | 9 | Date | No |  |  |  |
| Last Care Plan | 100 |  | Date | No |  |  |  |
| Next Care Plan Due | 100 |  | Date | No |  |  |  |
| Phone 1 - Label | 85 |  |  | Yes |  |  |  |
| Phone 2 - Label | 85 |  |  | Yes |  |  |  |
| Phone 3 - Label | 85 |  |  | Yes |  |  |  |
| Phone 4 - Label | 85 |  |  | Yes |  |  |  |
| Primary PMR Row | 110 |  |  | Yes |  |  |  |
| Relationship | 110 |  |  | Yes |  |  |  |
| Type of Contact | 90 |  |  | Yes |  |  |  |


## Appendix B - Sheet Definitions


**Original Table 112 (PDF page 42, table 2)**

| Sheet | Purpose | Primary Sources | Processing/Rules |
| --- | --- | --- | --- |
| Imported Data | Authoritative monthly import source and Primary PMR ownership source. | Monthly imported data. | Preserve source data. Assign Primary PMR Row here only. Add approved framework-owned columns only. |


---

<!-- PDF page 43 -->


**Original Table 113 (PDF page 43, table 1)**

| Sheet | Purpose | Primary Sources | Processing/Rules |
| --- | --- | --- | --- |
| Master List | Primary operational participant repository. | Demo P; Banner; CP Due Date; Unlock CP. | Primary operational repository. Synchronize process outputs to Primary PMR Row only. No direct monthly imports. |
| Demo P | Monthly participant processing and comparison sheet. | Copy of active Raw Data plus Banner synchronization and process-generated fields. | Copy active participants. Process once. Generate comparison results. Populate Demo P tracking fields. Does not assign Primary PMR ownership. |
| Banners | Banner flags source. | Banner report import. | Import monthly banner data. Synchronize banner values to Demo P and Master List Primary PMR Row. |
| CP Due Date | Care plan due dates source. | Care Plan Due report import. | Import care plan due data. Synchronize Enrollment Date, Last Care Plan, Next Care Plan Due, and CP Type to Master List. |
| Unlock CP | Unlocked care plan source. | Unlocked Care Plan report import. | Import unlocked care plan data. Synchronize PMR-based care plan fields to Master List. |
| Monthly Change | Monthly audit/report output. | Generated by framework processing. | Generate change audit grouped by change type. Primary PMR Row changes only. |
| Disenrolled Exclusion List | Standalone disenrollment tracker/exclusion source. | Imported data and framework processing. | Generate monthly exclusion list. No repair processing. |
| Master List Change Log | Audit/change log. | Generated by framework. | Hidden audit log of framework actions. |
| Format Dashboard | Formatting and framework control center. | Manual configuration. | Controls formatting, templates, validation, timing, and dashboard-driven behavior. |
| Dashboard Quality Report | Authoritative consolidated QA report. | Framework validation and dashboard audits. | Generate consolidated quality report by section with timestamps. |
| Timing Report | Performance log. | Framework timing capture. | Record processing duration by step and total execution time. |


---

<!-- PDF page 44 -->

Global formatting standard is defined by the Format Dashboard. Appendix A documents only column attributes that differ from the global standard. Columns not listed here inherit the default formatting.


---

<!-- PDF page 45 -->


## Appendix C - Data Source Mapping Tables ​ v2.0 Final Governing Edition

Authority: Current Production Script v1.7.6 and Format Dashboard v1.7.6. Purpose: This appendix is the human-readable governing reference for production sheet headers, column order, data sources, and processing rules. Format Dashboard SECTION F remains the authoritative implementation source. Terminology: Raw Data identifies the formatted Raw Data worksheet. Unformatted Data identifies the imported monthly participant dataset before formatting. Framework process identifies generated, synchronized, compared, or audited values. Appendix C.1 - Demo P Mapping

Demo P is created from Raw Data and enriched in one pass. Columns 1-46 copy participant data, columns 47-52 carry banner values synchronized into Raw Data, and columns 53-80 are generated by Demo P processing.


**Original Table 114 (PDF page 45, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Last Name | Raw Data | Copy governed Raw Data value. |
| 2 | First Name | Raw Data | Copy governed Raw Data value. |
| 3 | Preferred Name | Raw Data | Copy governed Raw Data value. |
| 4 | Date of Birth | Raw Data | Copy governed Raw Data value. |
| 5 | Participant PMR# | Raw Data | Copy governed Raw Data value. |
| 6 | Phone Number | Raw Data | Copy governed Raw Data value. |
| 7 | Address Line 1 | Raw Data | Copy governed Raw Data value. |
| 8 | Address Line 2 | Raw Data | Copy governed Raw Data value. |
| 9 | City | Raw Data | Copy governed Raw Data value. |
| 10 | State | Raw Data | Copy governed Raw Data value. |
| 11 | Zip | Raw Data | Copy governed Raw Data value. |
| 12 | Oxygen | Raw Data | Copy governed Raw Data value. |
| 13 | Primary Language | Raw Data | Copy governed Raw Data value. |
| 14 | Residence Type | Raw Data | Copy governed Raw Data value. |
| 15 | Contact - Last Name | Raw Data | Copy governed Raw Data value. |
| 16 | Contact - First Name | Raw Data | Copy governed Raw Data value. |
| 17 | Type of Contact | Raw Data | Copy governed Raw Data value. |
| 18 | Contact - Primary Language | Raw Data | Copy governed Raw Data value. |
| 19 | Relationship | Raw Data | Copy governed Raw Data value. |
| 20 | AD1 - Phone | Raw Data | Copy governed Raw Data value. |
| 21 | AD1 - Phone Valid Dates From | Raw Data | Copy governed Raw Data value. |


---

<!-- PDF page 46 -->


**Original Table 115 (PDF page 46, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 22 | AD1 - Phone Valid Dates To | Raw Data | Copy governed Raw Data value. |
| 23 | AD2 - Phone | Raw Data | Copy governed Raw Data value. |
| 24 | AD2 - Phone Valid Dates From | Raw Data | Copy governed Raw Data value. |
| 25 | AD2 - Phone Valid Dates To | Raw Data | Copy governed Raw Data value. |
| 26 | AD3 - Phone | Raw Data | Copy governed Raw Data value. |
| 27 | AD3 - Phone Valid Dates From | Raw Data | Copy governed Raw Data value. |
| 28 | AD3 - Phone Valid Dates To | Raw Data | Copy governed Raw Data value. |
| 29 | Company | Raw Data | Copy governed Raw Data value. |
| 30 | Contact - Notes | Raw Data | Copy governed Raw Data value. |
| 31 | Capitation Date | Raw Data | Copy governed Raw Data value. |
| 32 | Enrollment Status | Raw Data | Copy governed Raw Data value. |
| 33 | Disenrollment Date | Raw Data | Copy governed Raw Data value. |
| 34 | Disenrollment Effective Date | Raw Data | Copy governed Raw Data value. |
| 35 | Disenrollment Reason | Raw Data | Copy governed Raw Data value. |
| 36 | Date of Death | Raw Data | Copy governed Raw Data value. |
| 37 | Caseload - Social Work | Raw Data | Copy governed Raw Data value. |
| 38 | Caseload - RN | Raw Data | Copy governed Raw Data value. |
| 39 | Caseload - PCP | Raw Data | Copy governed Raw Data value. |
| 40 | Caseload - HCC | Raw Data | Copy governed Raw Data value. |
| 41 | Caseload - Activities | Raw Data | Copy governed Raw Data value. |
| 42 | Caseload - OT | Raw Data | Copy governed Raw Data value. |
| 43 | Caseload - PT | Raw Data | Copy governed Raw Data value. |
| 44 | Caseload - RD | Raw Data | Copy governed Raw Data value. |
| 45 | Caseload - Supervising MD | Raw Data | Copy governed Raw Data value. |
| 46 | Additional Important Information | Raw Data | Copy governed Raw Data value. |
| 47 | Safety - 2 Person | Raw Data (Banner synchronized) | Use banner value synchronized into Raw Data. |
| 48 | Wanderer | Raw Data (Banner synchronized) | Use banner value synchronized into Raw Data. |
| 49 | Interpreter Needed | Raw Data (Banner synchronized) | Use banner value synchronized into Raw Data. |


---

<!-- PDF page 47 -->


**Original Table 116 (PDF page 47, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 50 | Fall Risk | Raw Data (Banner synchronized) | Use banner value synchronized into Raw Data. |
| 51 | DPOA or Guardian Active | Raw Data (Banner synchronized) | Use banner value synchronized into Raw Data. |
| 52 | Palliative Care | Raw Data (Banner synchronized) | Use banner value synchronized into Raw Data. |
| 53 | Primary PMR Row | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 54 | Banner Summary | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 55 | Phone 1 - Label | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 56 | Phone 1 - Value | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 57 | Phone 2 - Label | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 58 | Phone 2 - Value | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 59 | Phone 3 - Label | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 60 | Phone 3 - Value | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 61 | Phone 4 - Label | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 62 | Phone 4 - Value | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 63 | Address 1 - Street | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 64 | Custom Field 1 - Label | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 65 | Custom Field 1 - Value | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 66 | Notes | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 67 | Contact - 1 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 68 | Contact - 2 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 69 | Contact - 3 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 70 | Contact - 4 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |


---

<!-- PDF page 48 -->


**Original Table 117 (PDF page 48, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 71 | Contact - 5 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 72 | Contact - 6 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 73 | Contact - 7 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 74 | Contact - 8 | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 75 | Contact - Summary | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 76 | Participant Name | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 77 | Name | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 78 | Demo P Update Status | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 79 | Demo P Update Month | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |
| 80 | Demo P Source Sheet | Demo P process | Generate, derive, consolidate, or track during Demo P processing. |

The Banner Report is formatted from the imported banner source and provides participant-level banner indicators.


**Original Table 118 (PDF page 48, table 2)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Last Name | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |
| 2 | First Name | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |
| 3 | Participant PMR# | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |
| 4 | Safety - 2 Person | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |
| 5 | Wanderer | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |
| 6 | Interpreter Needed | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |
| 7 | Fall Risk | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |
| 8 | DPOA or Guardian Active | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |


---

<!-- PDF page 49 -->


**Original Table 119 (PDF page 49, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 9 | Palliative Care | Primary Data | Format imported Banner Report value; synchronize by Participant PMR#. |

The Care Plan Due Date Report is formatted from the imported care plan due source and synchronized to the Master List Primary PMR Row.


**Original Table 120 (PDF page 49, table 2)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Participant Name | Primary Data | Format imported Care Plan Due value for synchronization. |
| 2 | Enrollment Date | Primary Data | Format imported Care Plan Due value for synchronization. |
| 3 | Last Care Plan | Primary Data | Format imported Care Plan Due value for synchronization. |
| 4 | Next Care Plan Due | Primary Data | Format imported Care Plan Due value for synchronization. |
| 5 | CP Type | Primary Data | Format imported Care Plan Due value for synchronization. |

The Unlocked Care Plan Report is formatted from the imported unlocked care plan source and synchronized to the Master List Primary PMR Row.


**Original Table 121 (PDF page 49, table 3)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Participant Name | Primary Data | Format imported Unlocked Care Plan value for synchronization. |
| 2 | PMR # | Primary Data | Format imported Unlocked Care Plan value for synchronization. |
| 3 | IDT Meeting Date | Primary Data | Format imported Unlocked Care Plan value for synchronization. |
| 4 | Care Plan Start Date | Primary Data | Format imported Unlocked Care Plan value for synchronization. |


**Original Table 122 (PDF page 49, table 4)**

| Source Sheet | Match Rule | Destinati on Sheet | Target Row | Destination Columns | Processing Rule |
| --- | --- | --- | --- | --- | --- |
| Unlocked Care Plan Report | PMR # matches Master List Participant PMR# | Master List | Primary PMR Row only | Participant Name; PMR #; IDT Meeting Date; Care Plan Start Date | Normalize PMR and synchronize only to the matched Primary PMR Row. |


---

<!-- PDF page 50 -->


**Original Table 123 (PDF page 50, table 1)**

| Source Sheet | Match Rule | Destinati on Sheet | Target Row | Destination Columns | Processing Rule |
| --- | --- | --- | --- | --- | --- |
| Care Plan Due Date Report | Participant Name + Enrollment Date matches Master List Participant Name + Capitation Date | Master List | Primary PMR Row only | Enrollment Date; Last Care Plan; Next Care Plan Due; CP Type | Synchronize only to the matched Primary PMR Row. |


## Appendix C.6 - Master List Mapping

Master List contains one operational Primary PMR Row per participant. All 37 governed columns are sourced from Demo P.


**Original Table 124 (PDF page 50, table 2)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Participant Name | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 2 | Name | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 3 | Preferred Name | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 4 | Date of Birth | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 5 | Address 1 - Street | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 6 | City | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 7 | State | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 8 | Zip | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 9 | Phone 1 - Value | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 10 | Phone 2 - Value | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 11 | Participant PMR# | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |


---

<!-- PDF page 51 -->


**Original Table 125 (PDF page 51, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 12 | Primary Language | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 13 | Residence Type | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 14 | Notes | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 15 | IDT Meeting Date | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 16 | Care Plan Start Date | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 17 | Enrollment Date | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 18 | Last Care Plan | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 19 | Next Care Plan Due | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 20 | CP Type | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 21 | Completed | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 22 | Face Sheet | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 23 | HHA | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 24 | Oxygen | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 25 | Equipment | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 26 | Caseload - Social Work | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |


---

<!-- PDF page 52 -->


**Original Table 126 (PDF page 52, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 27 | Caseload - RN | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 28 | Caseload - PCP | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 29 | Caseload - HCC | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 30 | Caseload - Activities | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 31 | Caseload - OT | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 32 | Caseload - PT | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 33 | Caseload - RD | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 34 | Caseload - Supervising MD | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 35 | Capitation Date | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 36 | Enrollment Status | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |
| 37 | Primary PMR Row | Demo P | Copy from the governed Demo P Primary PMR Row; retain synchronized care plan values where applicable. |

Disenrolled Exclusion uses the governed 66-column layout. Participant values originate from Demo P; the audit column is populated by the framework.


**Original Table 127 (PDF page 52, table 2)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Participant Name | Demo P | Copy from the matched Demo P participant record. |
| 2 | Name | Demo P | Copy from the matched Demo P participant record. |


---

<!-- PDF page 53 -->


**Original Table 128 (PDF page 53, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 3 | Preferred Name | Demo P | Copy from the matched Demo P participant record. |
| 4 | Date of Birth | Demo P | Copy from the matched Demo P participant record. |
| 5 | Address 1 - Street | Demo P | Copy from the matched Demo P participant record. |
| 6 | City | Demo P | Copy from the matched Demo P participant record. |
| 7 | State | Demo P | Copy from the matched Demo P participant record. |
| 8 | Zip | Demo P | Copy from the matched Demo P participant record. |
| 9 | Phone 1 - Value | Demo P | Copy from the matched Demo P participant record. |
| 10 | Phone 2 - Value | Demo P | Copy from the matched Demo P participant record. |
| 11 | Participant PMR# | Demo P | Copy from the matched Demo P participant record. |
| 12 | Primary Language | Demo P | Copy from the matched Demo P participant record. |
| 13 | Residence Type | Demo P | Copy from the matched Demo P participant record. |
| 14 | Notes | Demo P | Copy from the matched Demo P participant record. |
| 15 | IDT Meeting Date | Demo P | Copy from the matched Demo P participant record. |
| 16 | Care Plan Start Date | Demo P | Copy from the matched Demo P participant record. |
| 17 | Enrollment Date | Demo P | Copy from the matched Demo P participant record. |
| 18 | Last Care Plan | Demo P | Copy from the matched Demo P participant record. |
| 19 | Next Care Plan Due | Demo P | Copy from the matched Demo P participant record. |
| 20 | CP Type | Demo P | Copy from the matched Demo P participant record. |
| 21 | Oxygen | Demo P | Copy from the matched Demo P participant record. |
| 22 | Caseload - Social Work | Demo P | Copy from the matched Demo P participant record. |
| 23 | Caseload - RN | Demo P | Copy from the matched Demo P participant record. |


---

<!-- PDF page 54 -->


**Original Table 129 (PDF page 54, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 24 | Caseload - PCP | Demo P | Copy from the matched Demo P participant record. |
| 25 | Caseload - HCC | Demo P | Copy from the matched Demo P participant record. |
| 26 | Caseload - Activities | Demo P | Copy from the matched Demo P participant record. |
| 27 | Caseload - OT | Demo P | Copy from the matched Demo P participant record. |
| 28 | Caseload - PT | Demo P | Copy from the matched Demo P participant record. |
| 29 | Caseload - RD | Demo P | Copy from the matched Demo P participant record. |
| 30 | Caseload - Supervising MD | Demo P | Copy from the matched Demo P participant record. |
| 31 | Capitation Date | Demo P | Copy from the matched Demo P participant record. |
| 32 | Enrollment Status | Demo P | Copy from the matched Demo P participant record. |
| 33 | Disenrollment Date | Demo P | Copy from the matched Demo P participant record. |
| 34 | Disenrollment Effective Date | Demo P | Copy from the matched Demo P participant record. |
| 35 | Disenrollment Reason | Demo P | Copy from the matched Demo P participant record. |
| 36 | Date of Death | Demo P | Copy from the matched Demo P participant record. |
| 37 | Contact - Last Name | Demo P | Copy from the matched Demo P participant record. |
| 38 | Contact - First Name | Demo P | Copy from the matched Demo P participant record. |
| 39 | Type of Contact | Demo P | Copy from the matched Demo P participant record. |
| 40 | Contact - Primary Language | Demo P | Copy from the matched Demo P participant record. |
| 41 | Relationship | Demo P | Copy from the matched Demo P participant record. |
| 42 | AD1 - Phone | Demo P | Copy from the matched Demo P participant record. |
| 43 | AD1 - Phone Valid Dates From | Demo P | Copy from the matched Demo P participant record. |
| 44 | AD1 - Phone Valid Dates To | Demo P | Copy from the matched Demo P participant record. |


---

<!-- PDF page 55 -->


**Original Table 130 (PDF page 55, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 45 | AD2 - Phone | Demo P | Copy from the matched Demo P participant record. |
| 46 | AD2 - Phone Valid Dates From | Demo P | Copy from the matched Demo P participant record. |
| 47 | AD2 - Phone Valid Dates To | Demo P | Copy from the matched Demo P participant record. |
| 48 | AD3 - Phone | Demo P | Copy from the matched Demo P participant record. |
| 49 | AD3 - Phone Valid Dates From | Demo P | Copy from the matched Demo P participant record. |
| 50 | AD3 - Phone Valid Dates To | Demo P | Copy from the matched Demo P participant record. |
| 51 | Company | Demo P | Copy from the matched Demo P participant record. |
| 52 | Contact - Notes | Demo P | Copy from the matched Demo P participant record. |
| 53 | Safety - 2 Person | Demo P | Copy from the matched Demo P participant record. |
| 54 | Wanderer | Demo P | Copy from the matched Demo P participant record. |
| 55 | Interpreter Needed | Demo P | Copy from the matched Demo P participant record. |
| 56 | Fall Risk | Demo P | Copy from the matched Demo P participant record. |
| 57 | DPOA or Guardian Active | Demo P | Copy from the matched Demo P participant record. |
| 58 | Palliative Care | Demo P | Copy from the matched Demo P participant record. |
| 59 | Last Name | Demo P | Copy from the matched Demo P participant record. |
| 60 | First Name | Demo P | Copy from the matched Demo P participant record. |
| 61 | Phone Number | Demo P | Copy from the matched Demo P participant record. |
| 62 | Address Line 1 | Demo P | Copy from the matched Demo P participant record. |
| 63 | Address Line 2 | Demo P | Copy from the matched Demo P participant record. |
| 64 | Additional Important Information | Demo P | Copy from the matched Demo P participant record. |
| 65 | Added to Disenrolled Exclusion | Framework audit | Populate when added to Disenrolled Exclusion. |


---

<!-- PDF page 56 -->


**Original Table 131 (PDF page 56, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 66 | PMR # | Demo P | Copy from the matched Demo P participant record. |

Monthly Change is generated by comparing governed monthly Raw Data datasets. Its 54 columns mirror the Raw Data governed column set.


**Original Table 132 (PDF page 56, table 2)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Last Name | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 2 | First Name | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 3 | Preferred Name | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 4 | Date of Birth | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 5 | Participant PMR# | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 6 | Phone Number | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 7 | Address Line 1 | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 8 | Address Line 2 | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 9 | City | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |


---

<!-- PDF page 57 -->


**Original Table 133 (PDF page 57, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 10 | State | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 11 | Zip | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 12 | Oxygen | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 13 | Primary Language | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 14 | Residence Type | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 15 | Contact - Last Name | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 16 | Contact - First Name | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 17 | Type of Contact | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 18 | Contact - Primary Language | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 19 | Relationship | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 20 | AD1 - Phone | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 21 | AD1 - Phone Valid Dates From | Populates via process | Compare prior and current Raw Data values and |


---

<!-- PDF page 58 -->


**Original Table 134 (PDF page 58, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
|  |  |  | populate the governed change output. |
| 22 | AD1 - Phone Valid Dates To | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 23 | AD2 - Phone | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 24 | AD2 - Phone Valid Dates From | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 25 | AD2 - Phone Valid Dates To | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 26 | AD3 - Phone | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 27 | AD3 - Phone Valid Dates From | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 28 | AD3 - Phone Valid Dates To | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 29 | Company | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 30 | Contact - Notes | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 31 | Capitation Date | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 32 | Enrollment Status | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |


---

<!-- PDF page 59 -->


**Original Table 135 (PDF page 59, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 33 | Disenrollment Date | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 34 | Disenrollment Effective Date | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 35 | Disenrollment Reason | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 36 | Date of Death | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 37 | Caseload - Social Work | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 38 | Caseload - RN | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 39 | Caseload - PCP | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 40 | Caseload - HCC | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 41 | Caseload - Activities | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 42 | Caseload - OT | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 43 | Caseload - PT | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 44 | Caseload - RD | Populates via process | Compare prior and current Raw Data values and |


---

<!-- PDF page 60 -->


**Original Table 136 (PDF page 60, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
|  |  |  | populate the governed change output. |
| 45 | Caseload - Supervising MD | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 46 | Additional Important Information | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 47 | Notes | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 48 | Safety - 2 Person | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 49 | Wanderer | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 50 | Interpreter Needed | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 51 | Fall Risk | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 52 | DPOA or Guardian Active | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 53 | Palliative Care | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |
| 54 | Primary PMR Row | Populates via process | Compare prior and current Raw Data values and populate the governed change output. |


---

<!-- PDF page 61 -->


## Appendix C.9 - Raw Data Mapping

Raw Data is the formatted monthly participant dataset. Columns 1-47 originate in the imported unformatted source, columns 48-53 synchronize from Banners, and column 54 is assigned during Raw Data formatting.


**Original Table 137 (PDF page 61, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 1 | Last Name | Unformatted Data | Copy and normalize imported participant data. |
| 2 | First Name | Unformatted Data | Copy and normalize imported participant data. |
| 3 | Preferred Name | Unformatted Data | Copy and normalize imported participant data. |
| 4 | Date of Birth | Unformatted Data | Copy and normalize imported participant data. |
| 5 | Participant PMR# | Unformatted Data | Copy and normalize imported participant data. |
| 6 | Phone Number | Unformatted Data | Copy and normalize imported participant data. |
| 7 | Address Line 1 | Unformatted Data | Copy and normalize imported participant data. |
| 8 | Address Line 2 | Unformatted Data | Copy and normalize imported participant data. |
| 9 | City | Unformatted Data | Copy and normalize imported participant data. |
| 10 | State | Unformatted Data | Copy and normalize imported participant data. |
| 11 | Zip | Unformatted Data | Copy and normalize imported participant data. |
| 12 | Oxygen | Unformatted Data | Copy and normalize imported participant data. |
| 13 | Primary Language | Unformatted Data | Copy and normalize imported participant data. |
| 14 | Residence Type | Unformatted Data | Copy and normalize imported participant data. |
| 15 | Contact - Last Name | Unformatted Data | Copy and normalize imported participant data. |
| 16 | Contact - First Name | Unformatted Data | Copy and normalize imported participant data. |
| 17 | Type of Contact | Unformatted Data | Copy and normalize imported participant data. |
| 18 | Contact - Primary Language | Unformatted Data | Copy and normalize imported participant data. |
| 19 | Relationship | Unformatted Data | Copy and normalize imported participant data. |


---

<!-- PDF page 62 -->


**Original Table 138 (PDF page 62, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 20 | AD1 - Phone | Unformatted Data | Copy and normalize imported participant data. |
| 21 | AD1 - Phone Valid Dates From | Unformatted Data | Copy and normalize imported participant data. |
| 22 | AD1 - Phone Valid Dates To | Unformatted Data | Copy and normalize imported participant data. |
| 23 | AD2 - Phone | Unformatted Data | Copy and normalize imported participant data. |
| 24 | AD2 - Phone Valid Dates From | Unformatted Data | Copy and normalize imported participant data. |
| 25 | AD2 - Phone Valid Dates To | Unformatted Data | Copy and normalize imported participant data. |
| 26 | AD3 - Phone | Unformatted Data | Copy and normalize imported participant data. |
| 27 | AD3 - Phone Valid Dates From | Unformatted Data | Copy and normalize imported participant data. |
| 28 | AD3 - Phone Valid Dates To | Unformatted Data | Copy and normalize imported participant data. |
| 29 | Company | Unformatted Data | Copy and normalize imported participant data. |
| 30 | Contact - Notes | Unformatted Data | Copy and normalize imported participant data. |
| 31 | Capitation Date | Unformatted Data | Copy and normalize imported participant data. |
| 32 | Enrollment Status | Unformatted Data | Copy and normalize imported participant data. |
| 33 | Disenrollment Date | Unformatted Data | Copy and normalize imported participant data. |
| 34 | Disenrollment Effective Date | Unformatted Data | Copy and normalize imported participant data. |
| 35 | Disenrollment Reason | Unformatted Data | Copy and normalize imported participant data. |
| 36 | Date of Death | Unformatted Data | Copy and normalize imported participant data. |
| 37 | Caseload - Social Work | Unformatted Data | Copy and normalize imported participant data. |
| 38 | Caseload - RN | Unformatted Data | Copy and normalize imported participant data. |
| 39 | Caseload - PCP | Unformatted Data | Copy and normalize imported participant data. |
| 40 | Caseload - HCC | Unformatted Data | Copy and normalize imported participant data. |


---

<!-- PDF page 63 -->


**Original Table 139 (PDF page 63, table 1)**

| Column Order | Destination Header | Source of Data | Processing Rule |
| --- | --- | --- | --- |
| 41 | Caseload - Activities | Unformatted Data | Copy and normalize imported participant data. |
| 42 | Caseload - OT | Unformatted Data | Copy and normalize imported participant data. |
| 43 | Caseload - PT | Unformatted Data | Copy and normalize imported participant data. |
| 44 | Caseload - RD | Unformatted Data | Copy and normalize imported participant data. |
| 45 | Caseload - Supervising MD | Unformatted Data | Copy and normalize imported participant data. |
| 46 | Additional Important Information | Unformatted Data | Copy and normalize imported participant data. |
| 47 | Notes | Unformatted Data | Copy and normalize imported participant data. |
| 48 | Safety - 2 Person | Banners | Synchronize banner indicator by Participant PMR#. |
| 49 | Wanderer | Banners | Synchronize banner indicator by Participant PMR#. |
| 50 | Interpreter Needed | Banners | Synchronize banner indicator by Participant PMR#. |
| 51 | Fall Risk | Banners | Synchronize banner indicator by Participant PMR#. |
| 52 | DPOA or Guardian Active | Banners | Synchronize banner indicator by Participant PMR#. |
| 53 | Palliative Care | Banners | Synchronize banner indicator by Participant PMR#. |
| 54 | Primary PMR Row | Format Raw Data | Assign the governed Primary PMR Row indicator. |

Future changes to headers, column order, data sources, or synchronization rules must first be approved in the production framework and Format Dashboard, then incorporated into this appendix during the next governed documentation update.


---

<!-- PDF page 64 -->

Master List Framework Specification v2.0 ​ Appendices D-I - Fully Automated Governing Edition

Authority: Current Production Script v1.7.6 and the current Format Dashboard. This document replaces outdated A-J Dashboard Quality references and retired sheet references with the current production implementation. Appendix D - Color Standards Table

Production sheet colors are governed by the Format Dashboard. The hexadecimal values below reflect the active production sheet-type defaults. System/report surfaces without a fixed production constant remain dashboard-controlled.


**Original Table 140 (PDF page 64, table 1)**

| Sheet Type | Color | Governance |
| --- | --- | --- |
| CP Due Date | #65CC99 | Format Dashboard / production default |
| Unlock CP | #65CCC3 | Format Dashboard / production default |
| Banners | #65A9CC | Format Dashboard / production default |
| Raw Data | #657FCC | Format Dashboard / production default |
| Demo P | #657FCC | Format Dashboard / production default |
| Master List | #7665CC | Format Dashboard / production default |
| Monthly Change | #A165CC | Format Dashboard / production default |
| Disenrolled Exclusion List | #CC65A1 | Format Dashboard / production default |
| Index | Dashboard-controlled | Format Dashboard |
| Dashboard Quality Report | Dashboard-controlled | System surface |
| Framework Timing Report | Dashboard-controlled | System surface |

Monthly operational sheets use the governed MM.YY suffix. System sheets do not use a monthly suffix. Retired Master List Change Log naming has been removed because it is not present in Current Production Script v1.7.6.


**Original Table 141 (PDF page 64, table 2)**

| Sheet Name / Prefix | Report Title | Example | Date Behavior |
| --- | --- | --- | --- |
| Raw Data | Raw Data | Raw Data 05.26 | Monthly |
| Demo P | Demographics - Participants | Demo P 05.26 | Monthly |
| Banners | Banner Report | Banners 05.26 | Monthly |


---

<!-- PDF page 65 -->


**Original Table 142 (PDF page 65, table 1)**

| Sheet Name / Prefix | Report Title | Example | Date Behavior |
| --- | --- | --- | --- |
| Unlock CP | Unlocked Care Plan Report | Unlock CP 05.26 | Monthly |
| CP Due | CP Due Date | CP Due 05.26 | Monthly |
| Monthly Change | Monthly Change Report | Monthly Change 05.26 | Monthly |
| Master List | Master List | Master List 05.26 | Monthly |
| Disenrolled | Disenrolled Exclusion List | Disenrolled 05.26 | Monthly |
| Dashboard Quality Report | Dashboard Quality Report | Dashboard Quality Report | System / no month |
| Framework Timing Report | Framework Timing Report | Framework Timing Report | System / no month |

Dashboard Quality Report is the consolidated framework-quality artifact. Current production uses Sections A-Q. Each process writes only its assigned section or approved batch group; standalone QA report sheets remain retired.


**Original Table 143 (PDF page 65, table 2)**

| Section | Purpose | Pass Criteria |
| --- | --- | --- |
| A - Global Inputs Verification | Verify required global settings and dashboard inputs. | No missing required global input; status PASS. |
| B - Sheet Definitions Verification | Verify governed sheet definitions, types, titles, colors, and processing flags. | No missing or invalid sheet definitions. |
| C - Sheet Headers Verification | Verify governed headers and source assignments for every sheet type. | No missing, duplicated, or misordered governed headers. |
| D - Column Definitions Verification | Verify widths, formats, visibility, alignment, and wrap controls. | No invalid or missing governed column definitions. |
| E - Sheet Behavior Verification | Verify filters, freezes, cleanup rules, template behavior, and participation flags. | No missing or invalid governed behaviors. |
| F - Template Structure & Validation | Verify template presence, signatures, row capacity, and structural readiness. | All required templates valid and current. |
| G - Layout Snapshot Settings | Verify governed layout snapshot settings and structural formatting controls. | Snapshot settings present and valid. |
| H - Framework Health Check | Verify functions, helpers, references, dependencies, and framework readiness. | No blocking failures or ReferenceErrors. |
| I - Performance Summary | Summarize timing findings, bottlenecks, and performance status. | Current performance summary present. |
| J - Master List Validation | Validate Master List structure, Primary PMR rows, and required output integrity. | Master List validation passes. |
| K - Care Plan Sync Validation | Validate Unlock CP and Care Plan Due synchronization results. | Required match, unmatched, and missing-key results reported. |


---

<!-- PDF page 66 -->


**Original Table 144 (PDF page 66, table 1)**

| Section | Purpose | Pass Criteria |
| --- | --- | --- |
| L - Workflow & Synchronization Verification | Verify end-to-end workflow and synchronization architecture. | Required workflows and synchronization paths pass. |
| M - Summary | Consolidate current framework results into overall readiness status. | Summary accurately reflects Sections A-L. |
| N - Signoff | Provide final release-readiness/signoff output. | Signoff status and blocking issues populated. |


**Original Table 145 (PDF page 66, table 2)**

| Retired Standalone Report / Behavior | Current Replacement |
| --- | --- |
| Template Validation Report | Dashboard Quality Section F |
| Template Header Audit Report | Dashboard Quality Section C |
| Test 6 Date Format Report | Dashboard Quality Sections C-D, as applicable |
| Test 7 Validation Failure Report | Relevant verification section and Section M summary |
| Test 9 Monthly Change Subheader Report | Dashboard Quality workflow verification |
| Test 10 Dashboard Audit Report | Dashboard Quality Sections A-G |
| Framework Health Check Report | Dashboard Quality Section H |
| Dashboard Quality hidden-template creation | Removed |
| Dashboard Quality full rebuild after each test | Removed; approved section or batch updates only |


**Original Table 146 (PDF page 66, table 3)**

| Release Review Area | Required Checklist |
| --- | --- |
| Pre-Release Review | Version Number Updated; Changelog Updated; Release Notes Updated; Framework Specification v2.0 Alignment Checked; Current Approved Production Script identified. |
| Code Review | Syntax Review; Brace Balance; Parenthesis Balance; Bracket Balance; Full Script Review; no reconstructed or missing source code. |
| Reference Review | Menu; Helper; Trigger; Dashboard; Dashboard Quality A-N; Validation; Timing; Template; Synchronization references verified. |
| Audit Review | Framework Delta Review; Architecture Audit; Helper Audit; Dependency Audit; Orphan Function Audit; Duplicate Function Audit; Framework Health Check. |
| Testing Review | Dashboard Quality Sections A-Q generated or updated as applicable; Template Structure; Headers; Columns; Behaviors; Health; Master List; Care Plan Sync; Workflow Verification. |
| Performance Review | Spreadsheet reads/writes; formatting operations; sheet copies; participant loops; dashboard cache use; section writes; current Framework Timing Report reviewed. |


---

<!-- PDF page 67 -->


**Original Table 147 (PDF page 67, table 1)**

| Release Review Area | Required Checklist |
| --- | --- |
| Release Approval Criteria | No ReferenceErrors; no missing helpers/functions; no blocking Dashboard Quality failures; no failed health checks; no critical performance issue; release approval boundary observed. |


**Original Table 148 (PDF page 67, table 2)**

| Package Area | Required Items |
| --- | --- |
| Required Release Information | Version Number; Release Date; Release Type; Author; Current Approved Production Script source. |
| Framework Delta Review | Governance deltas; implementation deltas; retired architecture avoided; cumulative framework continuity confirmed. |
| Change Documentation | Change Summary; Functions Added/Modified/Removed; Framework, Dashboard, Dashboard Quality, Validation, Timing, Template, and Synchronization components updated. |
| Audit Documentation | Architecture Audit; Helper Audit; Dependency Audit; Orphan/Duplicate Function Audit; Performance Audit; Framework Health Check. |
| Testing Documentation | Tests Executed; Dashboard Quality Section Results A-N; Pass/Fail counts; known issues; Care Plan Sync and workflow verification results. |
| Performance Documentation | Performance impact; expected runtime change; timing report summary; bottlenecks; optimization notes. |
| Required Deliverables | Full Replacement Script when applicable; TXT download; release notes; testing recommendations; framework health check; recommended next version. |
| Release Completion Standard | A release candidate is complete when all required package components are provided. Promotion to Current Approved Production Script remains an approval boundary. |


**Original Table 149 (PDF page 67, table 3)**

| Decision | Status | Reason / Standard | Reference |
| --- | --- | --- | --- |
| Single File Architecture | Approved | Required through production stabilization; avoids unsupported modular redesign. | Section 16.D |
| Dashboard Driven Framework | Approved | Dashboard configuration governs production formatting and sheet behavior. | Sections 7-8 |
| Dashboard Controlled Templates | Approved | Templates are generated and refreshed from dashboard configuration. | Sections 7-8, 20.A |


---

<!-- PDF page 68 -->


**Original Table 150 (PDF page 68, table 1)**

| Decision | Status | Reason / Standard | Reference |
| --- | --- | --- | --- |
| Template First Formatting | Approved | Monthly outputs inherit verified template formatting rather than rebuilding formatting repeatedly. | Section 20.A |
| Dashboard Controlled Column Standards | Approved | Widths, formats, visibility, alignment, and wrap behavior originate in dashboard definitions. | Section 8; Appendix A |
| Dashboard Configuration Loaded Once Per Process | Approved | Reduces repeated reads and participant-loop overhead. | Section 20.B |
| Verified Templates Are Formatting Authority | Approved | Output sheets inherit approved template formatting. | Section 20.A |
| Primary PMR Row Architecture | Approved | Participant-level synchronized data belongs on the Primary PMR Row. | Section 11.1 |
| Master List Primary PMR Rows Only | Approved | Secondary operational Master List rows remain retired. | Section 11; Appendix B |
| Primary PMR Assignment in Raw Data Only | Approved | Primary PMR ownership is assigned in Raw Data and copied downstream. | Sections 11.1, 14 |
| One Pass Processing Architecture | Approved | Read once, process once, and write once whenever practical. | Sections 11.2, 20 |
| Demo P Copy-First / Process-Once Architecture | Approved | Demo P copies Raw Data first, processes once, and writes once. | Section 14 |
| Demo P Update Tracking Columns | Approved | Demo P Update Status, Month, and Source Sheet remain governed fields. | Appendices A-C |
| Care Plan Two-Stage Sync | Approved | Unlock CP matches by PMR; Care Plan Due matches by participant name plus enrollment/capitation date. | Section 13; Appendix C |
| Dashboard Quality Consolidation | Approved | Current consolidated Dashboard Quality architecture uses Sections A-Q. | Sections 7, 19; Appendix F |


---

<!-- PDF page 69 -->


**Original Table 151 (PDF page 69, table 1)**

| Decision | Status | Reason / Standard | Reference |
| --- | --- | --- | --- |
| Centralized Header Verification | Approved | Governed header verification replaces duplicated full-header checks in individual workflows. | Sections 8, 19; Appendix F |
| Section-Oriented Dashboard Quality Writes | Approved | Dashboard Quality uses approved section or batch updates rather than hidden-template recreation or repeated full rebuilds. | Sections 7, 19; Appendix F |
| Standalone Create Disenrolled List | Approved | Create Disenrolled remains standalone; retired repair architecture is not reintroduced. | Section 15; Appendices B-C |
| Current Disenrolled Governed Column Set | Approved | Disenrolled columns follow the current Format Dashboard and Appendix C mapping. | Appendix C |
| Full Replacement Production Updates | Approved | Production script deliveries are complete replacements unless a patch is explicitly requested. | Section 16 |
| Testing Recommended After Every Update | Approved | Testing reduces deployment and regression risk. | Section 19 |
| Performance Review Required Before Release | Approved | Timing and performance regressions must be identified before release. | Section 20 |
| Protected Standards Enforcement | Approved | Protected standards cannot be removed, bypassed, or redesigned without approval. | Section 22 |

Appendices D-I Governance Note

These appendices document current production governance only. Any future change to sheet colors, names, Dashboard Quality ownership, release requirements, or protected architecture must first be approved in the production framework and then incorporated into the next governing specification revision. Master List Framework Specification v2.0 ​ Appendices J–L Fully Automated Governing Edition

Authority ​ Current Production Script v1.7.6 and Framework Specification v2.0. Historical implementation references have been removed from current governance. Appendix J – Current Production Status


**Original Table 152 (PDF page 69, table 2)**

| Status Area | Current v2.0 Standard |
| --- | --- |
| Framework Status | Production Stabilization. |


---

<!-- PDF page 70 -->


**Original Table 153 (PDF page 70, table 1)**

| Current Approved Production Script | v1.7.6 |
| --- | --- |
| Governing Specification | Framework Specification v2.0. |
| Architecture Status | Single File Architecture; Dashboard Driven Framework; Template First Formatting; Primary PMR Row Architecture; Master List Primary PMR Rows Only; One Pass Processing; Dashboard Quality Consolidation. |
| Development Focus | Maintain production stability; synchronize documentation with current framework; continue performance optimization. |
| Current Priority 1 | Validate current production against Dashboard Quality Sections A–N. |
| Current Priority 2 | Verify governed template headers against Format Dashboard. |
| Current Priority 3 | Verify Care Plan synchronization validation. |
| Current Priority 4 | Continue performance review of Demo P, Disenrolled, and synchronization workflows. |


**Original Table 154 (PDF page 70, table 2)**

| Open Item | Status / Direction |
| --- | --- |
| Timing optimization of Demo P | Continue monitoring; copy-first/process-once/write-once remains governing architecture. |
| Timing optimization of Disenrolled | Continue monitoring; use governed template once. |
| Dashboard Quality updates | Continue section-oriented updates; no hidden-template creation or repeated full rebuild. |
| Template Header Validation | Verify against current Format Dashboard. |
| Care Plan Synchronization | Verify Unlock CP and Care Plan Due validation. |
| Appendix synchronization | Keep Appendices A–L synchronized with production framework. |
| Future modularization | Deferred until production stabilization completes. |


**Original Table 155 (PDF page 70, table 3)**

| Confirmed Finding | Approved Production Standard |
| --- | --- |
| Repeated formatting operations | Template First Formatting using verified templates. |
| Repeated dashboard reads | Load dashboard configuration once per process. |
| Repeated spreadsheet read/write cycles | Read once, process once, write once. |


---

<!-- PDF page 71 -->


**Original Table 156 (PDF page 71, table 1)**

| Dashboard Quality hidden-template creation | Removed. |
| --- | --- |
| Dashboard Quality repeated rebuilds | Section-oriented updates only. |
| Repeated Demo P scans | Primary PMR assigned in Raw Data and copied downstream. |
| Repeated Banner synchronization passes | Removed from Demo P processing. |
| Repeated template creation | Use governed template once. |
| Monthly formatting rebuilds | Use verified templates and approved formatting paths. |


---

**Extraction summary:** 156 tables were extracted from the source PDF and placed in page/section order in this markdown draft.
