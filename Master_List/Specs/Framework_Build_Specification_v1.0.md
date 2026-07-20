# Master List Documentation Build Specification v1.0

**Status:** Production Build Contract\
**Authority:** Master List Framework Governance\
**Applies To:** All Markdown → DOCX, Google Docs, and PDF builds

------------------------------------------------------------------------

# 1. Purpose

This specification defines the required behavior of the documentation
build process.

The builder SHALL produce a publication-quality Microsoft Word document
from the Markdown source without requiring manual formatting.

The Markdown document is the **only** editable source.

------------------------------------------------------------------------

# 2. Source of Truth

  -----------------------------------------------------------------------
  Item                   Requirement
  ---------------------- ------------------------------------------------
  Editable source        Markdown (.md)

  Generated output       DOCX

  Secondary outputs      Google Docs, PDF

  Editing rule           Never edit generated documents to change
                         content. Update the Markdown source instead.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 3. Build Pipeline

``` text
Read Markdown
    ↓
Parse Document Structure
    ↓
Classify Content Types
    ↓
Apply Styles
    ↓
Convert Tables
    ↓
Convert Lists
    ↓
Generate TOC
    ↓
Insert Page Numbers
    ↓
Run Validation
    ↓
Write DOCX
```

The builder SHALL fail if any validation rule fails.

------------------------------------------------------------------------

# 4. Markdown Mapping

  Markdown   Word Style
  ---------- ------------
  \#         Title
  \##        Heading 1
  \###       Heading 2
  \####      Heading 3
  \#####     Heading 4
  Body       Normal

Heading levels SHALL NOT be skipped.

------------------------------------------------------------------------

# 5. Typography

## Title

-   Font: Calibri
-   Size: 26 pt
-   Color: #366091
-   Bold
-   Centered
-   26 pt before and after

## Subtitle

-   Calibri
-   12 pt
-   Italic
-   Color #4F81BD

## Heading 1

-   Calibri
-   20 pt
-   Bold
-   Color #4F81BD

## Heading 2

-   Calibri
-   16 pt
-   Bold
-   Color #4F81BD

## Heading 3

-   Calibri
-   14 pt
-   Bold
-   Color #4F81BD

## Heading 4

-   Calibri
-   12 pt
-   Bold
-   Color #4F81BD

## Normal Text

-   Cambria
-   11 pt
-   Line spacing 1.15
-   5 pt before
-   5 pt after

------------------------------------------------------------------------

# 6. Lists

Bullet and numbered lists SHALL use:

-   Cambria 11
-   1.15 spacing
-   5 pt before/after
-   0.25 inch left indent
-   0.25 inch hanging indent

Numbered lists SHALL preserve Markdown numbering.

------------------------------------------------------------------------

# 7. Tables

Every Markdown table SHALL become a native Word table.

Requirements:

-   Table Grid style
-   Header fill #C7D8EA
-   Header font Calibri Bold 12
-   Header text color #366091
-   Body Cambria 11
-   Top vertical alignment
-   Repeat Header Row enabled
-   Fit within page margins
-   AutoFit to window

Markdown pipe tables SHALL NOT appear in the final document.

------------------------------------------------------------------------

# 8. Identifier Classification

The builder SHALL classify inline identifiers before assigning
typography.

## Use Bold Cambria

-   File names
-   File paths
-   Sheet names
-   Template sheet names
-   Dashboard section names
-   Menu commands

Examples

-   **Master_List_Framework_Specification_v2.0.md**
-   **Template - Master List**
-   **Master List**
-   **SECTION A - GLOBAL SETTINGS**

## Use Consolas 10.5

-   Apps Script functions
-   Constants
-   Property keys
-   Code blocks

Examples

-   runMonthlyUpdate()
-   createMasterList()
-   HEADER_ROW
-   RFF_ARCHIVE_SPREADSHEET_ID

Backticks alone SHALL NOT determine formatting.

------------------------------------------------------------------------

# 9. Tables of Contents

The builder SHALL generate a native Word Table of Contents using Heading
1 through Heading 4.

------------------------------------------------------------------------

# 10. Page Layout

-   Letter (8.5 x 11)
-   Portrait
-   Top 0.70"
-   Bottom 0.70"
-   Left 0.75"
-   Right 0.75"
-   Centered page numbers

Landscape MAY be used for wide tables.

------------------------------------------------------------------------

# 11. Page Break Rules

The builder SHALL:

-   Start Heading 1 sections on a new page.
-   Start appendices on a new page.
-   Keep headings with the following paragraph.
-   Avoid orphaned headings.
-   Avoid splitting small tables across pages.

------------------------------------------------------------------------

# 12. Validation

The build SHALL fail if:

-   Markdown tables remain.
-   Heading styles are missing.
-   Fonts differ from this specification.
-   Line spacing is incorrect.
-   Repeat table headers are missing.
-   TOC is missing.
-   Page numbers are missing.
-   Markdown syntax appears in the output.

------------------------------------------------------------------------

# 13. Build Report

The builder SHALL output a report similar to:

``` text
Build Successful

Headings: XX
Tables: XX
Lists: XX
Identifiers Classified: XX

Warnings: 0
Errors: 0
Elapsed Time: XX sec
```

------------------------------------------------------------------------

# 14. Acceptance Criteria

A build is production-ready only when:

-   No manual formatting is required.
-   The DOCX matches this specification.
-   Google Docs import preserves formatting.
-   PDF export preserves formatting.
-   All validation checks pass.

------------------------------------------------------------------------

# 15. Implementation Guidance for Codex

The implementation SHOULD:

-   Parse Markdown into a document object model rather than processing
    line-by-line.
-   Apply formatting based on semantic content, not Markdown syntax
    alone.
-   Separate parsing, classification, formatting, and validation into
    distinct stages.
-   Centralize all formatting values in a configuration object.
-   Produce deterministic output so identical Markdown always generates
    identical documents.
