

| tem | New Standard |
| :---: | :---: |

| Normal text | Cambria 11 pt |
| :---- | :---- |

| Line spacing | 1.15 |
| :---- | :---- |

| Paragraph spacing | 5 pt before / 5 pt after |
| :---- | :---- |

| Lists | 0.25" left indent with matching hanging indent |
| :---- | :---- |

| Inline file names | Normal body font (Cambria), not Courier New |
| :---- | :---- |

| Code | Courier New only for actual code blocks or function examples |
| :---- | :---- |

| Tables | Header row repeats at the top of each page ("Repeat as header row") |
| :---- | :---- |

| Table header | Continue using \#C7D8EA / Calibri Bold 12 / \#366091 |
| :---- | :---- |

| Content Type | Font | Style |
| ----- | ----- | ----- |
| Body text | Cambria 11 | Regular |
| File names | Cambria 11 | **Bold** |
| Sheet names | Cambria 11 | **Bold** |
| Template names | Cambria 11 | **Bold** |
| Dashboard section names | Cambria 11 | **Bold** |
| Apps Script function names | Consolas 10.5 or 11 | Regular |
| Constants (`HEADER_ROW`, `DATA_START_ROW`) | Consolas | Regular |
| Document Properties (`RFF_ARCHIVE_SPREADSHEET_ID`) | Consolas | Regular |
| Menu commands | Cambria 11 | Bold |

For example:

* **v1.7.6\_Current\_Production\_Script** → **Bold Cambria**  
* **Template \- Master List** → **Bold Cambria** (it's a sheet/template name, not code)  
* **Master List** → **Bold Cambria** (sheet name)  
* `createMasterList()` → Consolas  
* `runMonthlyUpdate()` → Consolas  
* `HEADER_ROW` → Consolas  
* `RFF_ARCHIVE_SPREADSHEET_ID` → Consolas

I also think we should make the builder context-aware so it doesn't rely solely on Markdown formatting. It can automatically recognize common framework elements:

* **File names** → Bold Cambria  
* **Sheet names** → Bold Cambria  
* **Template names** → Bold Cambria  
* **Apps Script functions** (e.g., names followed by `()`) → Consolas  
* **Script constants** (e.g., all-caps identifiers with underscores) → Consolas  
* **Document property keys** → Consolas

# **Appendix I – Markdown Document Build Specification**

## **I.1 Purpose**

Defines the required behavior of the Markdown-to-DOCX build process.

This specification is authoritative for all generated documentation.

The builder SHALL produce identical formatting regardless of platform.

---

## **I.2 Source Document**

```
Input:
Markdown (.md)

Output:
Microsoft Word (.docx)

Optional:
Google Docs
PDF
```

Markdown is the only editable source.

---

## **I.3 Processing Order**

```
Read Markdown

↓

Parse document hierarchy

↓

Classify content

↓

Apply typography

↓

Build tables

↓

Build lists

↓

Build TOC

↓

Insert page numbers

↓

Perform validation

↓

Write DOCX
```

---

## **I.4 Heading Mapping**

| Markdown | Word Style |
| ----- | ----- |
| \# | Title |
| \#\# | Heading 1 |
| \#\#\# | Heading 2 |
| \#\#\#\# | Heading 3 |
| \#\#\#\#\# | Heading 4 |

No exceptions.

---

## **I.5 Typography Mapping**

| Content Type | Style |
| ----- | ----- |
| Body | Normal |
| Heading 1 | Heading 1 |
| Heading 2 | Heading 2 |
| Tables | Table Style |
| Lists | List Style |

---

## **I.6 Identifier Classification**

Instead of using Markdown backticks literally:

Builder SHALL classify each identifier.

Decision tree:

```
runMonthlyUpdate()

↓

Function

↓

Consolas
```

```
HEADER_ROW

↓

Constant

↓

Consolas
```

```
Template - Master List

↓

Sheet Name

↓

Bold Cambria
```

```
Master_List_Framework_v2.md

↓

File Name

↓

Bold Cambria
```

---

## **I.7 Table Rules**

Every Markdown table SHALL become

* Word table  
* Repeat Header Row  
* Grid borders  
* AutoFit Window  
* Header fill C7D8EA  
* Header font Calibri 12 Bold  
* Body Cambria 11

Never leave Markdown pipes.

---

## **I.8 Lists**

Bullets

* Left indent .25"

Numbers

1.   
2.   
3. 

Preserve numbering exactly.

Never renumber.

---

## **I.9 Page Break Rules**

Examples

```
Heading 1

Always starts new page
```

```
Appendix

Always new page
```

```
Heading 2

Never alone at page bottom
```

---

## **I.10 Validation**

Builder SHALL fail if

* Markdown tables remain  
* Missing heading style  
* Wrong font  
* Wrong spacing  
* Missing repeat header row  
* Missing TOC  
* Missing page number

---

## **I.11 Build Report**

Builder SHALL output

```
✓ Parsed 82 headings

✓ Built 41 tables

✓ Converted 126 lists

✓ Classified 238 identifiers

✓ Validation Passed

Time
Warnings
Errors
```

---

## **I.12 Regression Rules**

Builder SHALL preserve

* heading order  
* table order  
* list numbering  
* anchor links  
* TOC hierarchy

---

## **I.13 Future Extensions**

Reserved for

* diagrams  
* SVG  
* Mermaid  
* screenshots  
* callouts  
* hyperlinks  
* index

---

## **I.14 Acceptance Tests**

The builder is considered production-ready only if it:

* Produces no Markdown syntax in the DOCX.  
* Applies every approved heading style exactly.  
* Uses the required fonts, colors, spacing, and indents.  
* Converts every Markdown table into a native Word table with repeating headers.  
* Classifies identifiers correctly (functions, constants, file names, sheet names, menu commands, etc.).  
* Generates a correct table of contents and page numbering.  
* Passes all validation checks without manual editing.

---

I would also take it one step further and create a **Build Specification v1.0** as a standalone document rather than burying it in the framework specification. The framework specification should define **what** the framework is, while the build specification defines **how** the documentation is transformed into publication-quality output. That separation makes both documents easier to maintain and gives Codex a single, authoritative build contract to implement.

For example, instead of saying "Heading 1 is 20 pt," the specification should say:

```
Heading 1

Font: Calibri
Size: 20 pt
Bold: Yes
Color: #4F81BD
Alignment: Left
Left indent: 0"
Right indent: 0"
First line indent: 0"
Space before: 20 pt
Space after: 20 pt
Line spacing: Single
Keep with next: Yes
Keep lines together: Yes
Page break before: Yes
Outline level: 1
Widow/orphan control: Off
```

And similarly for Normal text:

```
Normal

Font: Cambria
Size: 11 pt
Alignment: Left
Left indent: 0"
Right indent: 0"
First line indent: 0"
Line spacing: 1.15
Space before: 5 pt
Space after: 5 pt
Widow/orphan control: On
Hyphenation: Off
```

The same level of detail should be applied to tables, lists, headers, footers, captions, and every other document element.

### **Recommendation**

I would expand the current build specification into a **complete document style specification**. That would serve as the single source of truth for every layout and formatting property, allowing Codex to generate documents without guessing any defaults. It's likely to be around 15–20 pages and would eliminate most formatting ambiguities during implementation.

### **Current Style Baseline**

**Title**

* Calibri 26 pt  
* \#366091  
* 26 pt before / after

**Subtitle**

* Calibri 12 pt Italic  
* \#4F81BD  
* 12 pt before / after

**Heading 1**

* Calibri 20 pt  
* \#4F81BD  
* 20 pt before / after

**Heading 2**

* Calibri 16 pt  
* \#4F81BD  
* 16 pt before / after

**Heading 3**

* Calibri 14 pt  
* \#4F81BD  
* 14 pt before / after

**Heading 4**

* Calibri 12 pt  
* \#4F81BD  
* 12 pt before / after

**Body**

* Cambria 11 pt  
* Single spacing  
* 3 pt before / after

**Tables**

* Header fill: **\#C7D8EA**  
* Header text: Calibri Bold 12 pt  
* Header font color: **\#366091**  
* Body: Cambria 11 pt  
* 0.5 pt borders  
* Top-aligned cells

---

## **My plan from here**

Now that the formatting is established, I'll stop creating formatting test documents. Instead, every new draft will be an actual expansion of the specification.

The progression will be:

* **Working Draft 03** – Complete Part I (Framework Foundation)  
* **Working Draft 04** – Part II (Architecture)  
* **Working Draft 05** – Part III (Development Standards)  
* **Working Draft 06** – Reference Appendices  
* **Working Draft 07** – Final review and polish  
* **Version 2.0 Release**

From this point forward, every draft should feel like a new edition of the specification rather than another prototype. I think that will make the project progress much more smoothly.

Your formatting standard is now the authoritative style guide for every draft.

| Style | Font | Size | Color | Paragraph Spacing |
| ----- | ----- | ----- | ----- | ----- |
| **Title** | Calibri | **26 pt** | **\#366091** | 26 pt before / 26 pt after |
| **Subtitle** | Calibri *Italic* | **12 pt** | **\#4F81BD** | 12 pt before / 12 pt after |
| **Heading 1** | Calibri | **20 pt** | **\#4F81BD** | 20 pt before / 20 pt after |
| **Heading 2** | Calibri | **16 pt** | **\#4F81BD** | 16 pt before / 16 pt after |
| **Heading 3** | Calibri | **14 pt** | **\#4F81BD** | 14 pt before / 14 pt after |
| **Heading 4** | Calibri | **12 pt** | **\#4F81BD** | 12 pt before / 12 pt after |
| **Normal** | Cambria | **11 pt** | Black | 3 pt before / 3 pt after |

I'll also implement the rest of your standards exactly:

* Single line spacing  
* No first-line indent  
* 1" margins  
* Left aligned  
* Table header fill **\#A2BDDC**  
* Table header text **Calibri Bold** with font color **\#366091**  
* Table body **Cambria 11 pt**  
* 0.5 pt black borders  
* Top vertical alignment  
* No paragraph indents

## **One improvement I'd like to make**

Instead of manually formatting each heading, I'll define **custom styles** in the document that match your specification. That way:

* Every Heading 1 is guaranteed to be 20 pt, \#4F81BD, with 20 pt spacing.  
* Every Heading 2 is guaranteed to be 16 pt, and so on.  
* If you later decide to change Heading 2 from 16 pt to 18 pt, I can update the style once and the entire document updates consistently.

This is especially important because the specification will likely exceed 100 pages, and using styles ensures it remains easy to maintain.

Perfect. I think we now have enough information to establish a **Document Style Standard** that I can use consistently for the specification and future framework documents.

Here's the style guide I'll follow unless you decide to change it.

| Element | Standard |
| ----- | ----- |
| **Page Size** | Letter (8.5 × 11\) |
| **Margins** | 1" on all sides |
| **Alignment** | Left |
| **Body Font** | Cambria 11 pt |
| **Body Color** | Black (\#000000) |
| **Line Spacing** | Single |
| **Paragraph Spacing** | 3 pt before / 3 pt after |
| **First Line Indent** | None |

### **Heading Styles**

| Style | Font | Size | Color | Spacing |
| ----- | ----- | ----- | ----- | ----- |
| Title | Calibri | 26 pt | \#366091 | 26 pt before / after |
| Subtitle | Calibri Italic | 12 pt | \#4F81BD | 12 pt before / after |
| Heading 1 | Calibri | 20 pt | \#4F81BD | 20 pt before / after |
| Heading 2 | Calibri | 16 pt | \#4F81BD | 16 pt before / after |
| Heading 3 | Calibri | 14 pt | \#4F81BD | 14 pt before / after |
| Heading 4 | Calibri | 12 pt | \#4F81BD | 12 pt before / after |

### **Tables**

* Left aligned  
* No paragraph indents  
* No cell padding (to the extent Word allows)  
* Vertical alignment: Top  
* Outside/inside borders: 0.5 pt black  
* Header row:  
  * Fill: **\#A2BDDC**  
  * Font: **Calibri 11 pt**  
  * **Bold**  
  * Font color: \*\*\#366

I meant a formatting template for me complete so you know what formatting to use on the completed document

Yes—that's actually a much better idea.

Instead of me inventing a publication style, if you give me **your preferred formatting template**, I can make the completed specification match it exactly.

What I'd like is a **sample Word document** that represents the style you want. It doesn't need to be related to the Master List Framework.

It can simply demonstrate things like:

* Cover page  
* Heading styles (Heading 1, 2, 3, etc.)  
* Fonts and font sizes  
* Colors  
* Table formatting  
* Bullet styles  
* Numbered lists  
* Page headers/footers  
* Page numbering  
* Margins  
* Spacing before/after headings  
* Appendix formatting  
* Landscape pages (if used)  
* Callout or note boxes (if any)

Even a 5–10 page document is enough if it shows the formatting.

Once you upload it, I'll use it as the formatting authority and produce the finished specification in the same style, including:

* Identical heading hierarchy  
* Matching table styles  
* Matching fonts and spacing  
* Matching page layout  
* Matching cover page style  
* Matching headers/footers  
* Matching appendix formatting  
* Automatic table of contents  
* Professional pagination

The result will look like it belongs to the same document family as your template while preserving all of the technical content from your specification. This approach will produce a much more polished and consistent final document than starting from a generic Word template.

Title: Calibri 26pt \- \#366091 \- Line spacing 26pt before and after Subtitle Calibri 12pt Italic \#4f81bd- Line spacing 12pt before and after Heading 1 Calibri 20pt \#4f81bd- Line spacing 20pt before and after Heading 2 Calibri 16pt \#4f81bd- Line spacing 16pt before and after Heading 3 Calibri 14pt \#4f81bd- Line spacing 14pt before and after Heading 4 Calibri 12pt \#4f81bd- Line spacing 12pt before and after Normal Text \- Cambria 11pt \#000000- Line spacing 3pt before and after Page Setup 1 inch margin Left Align Tables No Indents No padding Top Alignment Outline .5 black Left alignment \- table position Header fill color \- \#a2bddc Here are the specs I have let me know if there is something else you need.

