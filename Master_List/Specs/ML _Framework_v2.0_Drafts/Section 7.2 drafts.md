### **7.2 Global Sort Order and Category Sort Process**

The framework enforces a strict, non-overlapping numerical rank system to manage the global sort order of all tabs. The sorting engine evaluates every sheet in the workbook from left to right (starting at Tab 1\) and dynamically computes its required index based on its assigned rank, preventing new sheets from accumulating at the template boundary.

Sheet ranks are assigned based on a hardcoded category sort profile. Monthly sheets are dynamically ranked using a mathematical formula that extracts the month from the sheet name to group tabs chronologically (newest to oldest).

#### **7.2.1 Governing Sort Categories**

The framework organizes sheets into six distinct rank blocks to ensure operational, import, and system tabs remain isolated from one another.

| Category | Sheets / Prefixes | Rank / Range |
| ----- | ----- | ----- |
| **1\. Core Infrastructure** | Index, Disenrolled Exclusion, Demo P | Ranks 5, 10, 15 |
| **2\. Active Sheets** | Master List, Monthly Change, Raw Data | Ranks 21 to 98 |
| **3\. Monthly Import Sheets** | Banner, CP Due, Unlocked Care Plan | Ranks 115 to 192 |
| **4\. Temporary & Archives** | Raw Data \- (Imports), B/CD/UC/RD, Archive \- Demo P | Ranks 210 to 240 |
| **5\. New / Catch-All** | Any newly generated or unrecognized sheet | Rank 250 |
| **6\. System & Templates** | Timing Report, Quality Report, Dashboard, Templates | Ranks 500 to 900 |

#### **7.2.2 Date Extraction and Mathematical Sort Logic**

To group monthly sheets into their proper "Month Windows" and arrange them from newest to oldest (December to January), the framework extracts the numerical month from the sheet's name.

The extraction engine parses both strict `MM.DD.YY` standard dates and `MM.YY` shorthand strings (e.g., "Banners 05.26"). Once the month (1-12) is extracted, the framework uses dynamic mathematical deduction to assign a definitive rank.

**Active Sheets (Grouped by Month, then Alphabetical)** Applies to: `Master List`, `Monthly Change`, and formatted `Raw Data` outputs.

* **Formula:** `105 - (Month * 7)`  
* **Behavior:** December is mathematically assigned the lowest number (Rank 21), anchoring it to the left. January is assigned the highest number (Rank 98), placing it on the right.

**Monthly Import Sheets (Grouped by Month, then Alphabetical)** Applies to: `Banner`, `CP Due`, and `Unlocked Care Plan` outputs.

* **Formula:** `199 - (Month * 7)`  
* **Behavior:** December is mathematically assigned the lowest number (Rank 115), anchoring it to the left. January is assigned the highest number (Rank 192), placing it on the right.

#### **7.2.3 Exact Month-Window Ranks**

Based on the mathematical sort logic, the framework enforces the following absolute ranks for monthly windows:

| Month | Active Sheets Rank | Import Sheets Rank |
| ----- | ----- | ----- |
| December | 21 | 115 |
| November | 28 | 122 |
| October | 35 | 129 |
| September | 42 | 136 |
| August | 49 | 143 |
| July | 56 | 150 |
| June | 63 | 157 |
| May | 70 | 164 |
| April | 77 | 171 |
| March | 84 | 178 |
| February | 91 | 185 |
| January | 98 | 192 |

#### **7.2.4 Tie-Breaker and Visibility Rules**

If multiple sheets share the exact same rank (e.g., `Banners 05.26`, `CP Due 05.26`, and `Unlocked 05.26` all compute to Rank 164), the framework's core sorting engine applies an alphabetical tie-breaker. This forces all monthly imports for a given month to consistently group together in alphabetical order within their shared rank window.

System and template sheets (Ranks 500+) may be temporarily shown for movement or formatting by workflow scripts, then immediately restored to their prior hidden state. Operational sheet organization and placement logic must not permanently expose hidden system/template sheets.

