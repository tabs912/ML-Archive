# Version Update Verification — v1.7.3

Governing implementation artifact: `Master_List/Current Production Script/v.1.7.3_Current_Production_Script`.

## Completion Matrix

| Item | Status | Implementation proof |
|---|---:|---|
| v1.7.3 production script generated | Complete | Created a new production artifact from the latest approved v1.72 implementation so prior production versions remain immutable. |
| Runtime version constant updated | Complete | `MASTER_LIST_MERGE_ML_VERSION` is set to `1.7.3`, and `RFF_VERSION` continues to derive from that constant so dashboard, timing, template metadata, and quality report titles display the v1.7.3 release identifier. |
| v1.72 fixes carried forward with v1.7.3 Quick Start adjustment | Complete | The v1.7.3 artifact preserves the v1.72 Dashboard Quality rewrite, Format Dashboard highlighting, system/template tail-order lock, Index restore URL configuration, and Demo P monthly update date refresh behavior. Quick System Setup now intentionally leaves system sheets visible at completion instead of re-hiding them, Quick Build All Templates no longer runs a post-build global sheet sort so in-place hidden template build behavior is preserved, Index restore links now auto-detect the deployed Web App URL when `ML_INDEX_RESTORE_WEB_APP_URL` is not manually configured, Restore Action falls back to the clean `🔄 Click to Restore` label instead of legacy instructional text, Format Dashboard rebuild no longer runs end-of-flow system sheet hiding/moving, and Dashboard Quality error rows highlight red after the rebuild. |

## Local Static Verification

- `node --check /tmp/v173.js` passed for the v1.7.3 production script.
- Static marker scans confirmed `MASTER_LIST_MERGE_ML_VERSION = "1.7.3"`, `RFF_VERSION = MASTER_LIST_MERGE_ML_VERSION`, carried-forward v1.72 Dashboard Quality staged-buffer workflow markers, and the Quick System Setup no-end-hide behavior, the Quick Build All Templates no-post-sort behavior, the Index restore deployed Web App URL auto-detection path, removal of the old click-cell Restore Action fallback, the `buildHeaderIndexMap_` Dashboard Quality fixes, red ERROR-row highlighting, and no end-of-Format-Dashboard hide/move call are present.
- `./Framework/tools/prepare_pr.sh` reported only intended v1.7.3 text artifacts staged and no binary files.

## Live Runtime Follow-up

Run the copied-workbook deployment gates against `v.1.7.3_Current_Production_Script`: Quick System Setup (confirm system sheets remain visible at completion), Build Templates (confirm templates are not unhidden/re-sorted by a post-build global sort), Dashboard Quality Start Up / Validate Templates / Full, Create Monthly Update, Format Dashboard onEdit highlighting, Index restore URL flow (confirm Restore Action shows `🔄 Click to Restore` as the clean label/fallback and as the hyperlink label when a configured or deployed Web App URL is available), Dashboard Quality Section K/M validation, red highlighting for ERROR rows, and archive/restore workflows.
