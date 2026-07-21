# Master List Framework v1.7.7

This folder contains the deployable Google Apps Script framework project for the Master List v1.7.7 production baseline.

## Source Baseline

| Artifact | Source |
| --- | --- |
| Apps Script source | `Master_List/Current Production Script/v.1.7.7_Current_Production_Script` |
| Apps Script manifest | `Master_List/Current Production Script/appsscript.json` |
| Framework version constant | `MASTER_LIST_MERGE_ML_VERSION = "1.7.7"` |

## Files

| File | Purpose |
| --- | --- |
| `Code.gs` | Full Master List framework Apps Script implementation copied from the v1.7.7 production source. |
| `appsscript.json` | Apps Script manifest with V8 runtime, Stackdriver exception logging, spreadsheet/UI/script/storage scopes, and Central time zone. |

## Deployment Notes

1. Create or open the bound Google Apps Script project for the Master List workbook.
2. Replace the script source with `Code.gs`.
3. Replace the manifest with `appsscript.json`.
4. Save the project and reload the workbook so `onOpen()` rebuilds the menu.
5. Run `quickSystemSetup()` or the equivalent menu setup action before production workflow execution if system surfaces need to be initialized.
6. Run template validation and Dashboard Quality checks after deployment.

## Governance Notes

- Treat `Master_List/Current Production Script/v.1.7.7_Current_Production_Script` as the governing production source for this framework build.
- Do not edit generated deployment copies without updating the governing production source.
- Preserve public menu, trigger, web-app, and workflow entry-point names unless a breaking change is explicitly approved.
