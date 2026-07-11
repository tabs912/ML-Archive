README.md
Google Apps Script Development Repository
Purpose
This repository serves as the central engineering workspace for Google Apps Script development, architecture review, code cleanup, optimization, testing, and production release preparation.
The repository is intended for:
Architecture review
Code review
Production script development
Performance optimization
Code cleanup
Bug fixes
Dependency analysis
Framework governance
Documentation
Release preparation
Production scripts are reviewed, optimized, versioned, validated, and documented here before deployment.

Repository Organization
This repository contains multiple independent projects.
Each project maintains its own:
Current Production
Specifications
Audit Summaries
Reports
Documentation
Git branch
Example
<Project>/

Current_Production/
Audit_Summary/
spec/
scripts/
Reports/
Archive/
Projects remain independent unless explicitly approved.
Business logic from one project shall never be merged into another project.

Repository Root Requirements
Required files
AGENTS.md
README.md
Required folders
Archive_To_Move/

Current Production
The Current_Production folder contains the current approved production source.
Only files inside Current_Production shall be treated as the production baseline.
Archived versions are reference material only.

Archive_To_Move
Temporary holding location for files waiting to be transferred into the ARCHIVE_ONLY repository.
These files are not considered part of active production.
Do not
review
build
compare
package
include in release notes
using files inside this folder.

Binary File Policy
The following files are excluded from code review unless specifically requested.
*.pdf
*.xlsx
*.docx
*.pptx
*.png
*.jpg
*.jpeg
*.gif
*.zip

Diff Cleanup Policy
Before generating a Git diff:
Review only source files.
Ignore:
Archive_To_Move/
Ignore binary files.
Primary review folders are
<Project>/Current_Production
<Project>/Audit_Summary
<Project>/spec

Branch Policy
Persistent branches
main
codex_Master_List
codex_AideCP_Shade_&_Sync
Temporary branches may be created for development.
Temporary branches should be deleted after merge.

Startup Procedure
Before making recommendations:
Read README.md
Read AGENTS.md
Identify the active project.
Identify the active branch.
Review the governing specification.
Review the current production script.
Review project documentation.
Review prior audit summaries.
Confirm project architecture.
Begin analysis.
No recommendations shall be made without completing the startup review.

Standard Code Review Workflow
Every review shall include
Architecture Review
Review
overall architecture
execution flow
module organization
interfaces
project structure
naming consistency

Dependency Review
Identify
missing helpers
orphan helpers
duplicate helpers
circular dependencies
missing references
dead references

Code Cleanup Review
Identify
duplicate code
obsolete code
dead code
unreachable code
unnecessary variables
unnecessary constants
unused functions
redundant processing
repeated Spreadsheet calls

Runtime Review
Evaluate
execution flow
Spreadsheet API usage
cache opportunities
memory usage
batching opportunities
runtime bottlenecks
write minimization
read minimization

Google Apps Script Review
Review
triggers
menus
libraries
services
PropertiesService
CacheService
LockService
Utilities
SpreadsheetApp usage
UrlFetchApp usage
installable triggers

Performance Review
Identify
slow loops
repeated getValues()
repeated setValues()
repeated getRange()
unnecessary formatting
unnecessary sorting
duplicate filtering
repeated calculations
Recommend
batch operations
caching
one-pass processing
helper consolidation

Production Script Review
Before generating production code
Review
production script
governing specification
project documentation
architecture
dependencies
helper functions
validation logic
dashboard/configuration references
menu integration
triggers
regression risks

Reference Verification
Verify
helper references
menu references
trigger references
dashboard references
configuration references
validation references
timing references
library references
external services
No broken references shall remain.

Framework Health Check
Every review shall include
Architecture Health
Dependency Health
Helper Health
Runtime Health
Performance Health
Maintainability
Duplicate Logic
Dead Code
Complexity
Largest Functions
Longest Execution Paths
High Risk Functions
Spreadsheet I/O Review

Production Update Rules
Production updates shall
replace complete affected functions
remove obsolete code
remove duplicate implementations
preserve approved business logic
preserve public interfaces unless approved
include new version number
include release notes
include testing recommendations
Avoid partial patches whenever practical.

Versioning Standard
Every generated production script receives a new version.
vX
Production milestone
vX.XX
Major feature release
vX.XX.XX
Minor enhancement
Examples
v1
v1.01
v1.01.01
v1.01.02
v1.02
Previous production versions shall never be overwritten.

Script Production Standards
Generated production scripts should
preserve business logic
improve maintainability
improve readability
improve performance
minimize Spreadsheet API calls
minimize runtime
use batch processing
remove duplicate code
remove obsolete code
include documentation
include version updates
include release notes

Deliverables
Every production review shall produce
Executive Summary
Overall assessment
Functional Summary
Summary of all major functionality
Dependency Audit
Complete dependency review
Helper Audit
Helper utilization
Orphan Audit
Unused functions
Performance Audit
Performance findings
Health Check
Framework health
Risk Assessment
High, Medium, Low
Recommended Improvements
Prioritized recommendations
Version Recommendation
Next version
Release Notes
Summary of changes
Testing Plan
Recommended validation steps

Git Synchronization
This repository is the authoritative development repository.
Temporary development environments may not synchronize correctly.
Before ending any work session verify
git status
git branch
git remote -v
git log --oneline -5
Never assume synchronization completed successfully.
Commit frequently.
Push after verifying synchronization.

Engineering Principles
Preserve working business logic.
Follow the governing specification.
Remove obsolete code.
Remove duplicate logic.
Prefer complete function replacement over patches.
Optimize for readability and maintainability.
Minimize Spreadsheet API operations.
Batch reads and writes whenever practical.
Produce fully documented production releases.
Every production script shall receive a new version number.

