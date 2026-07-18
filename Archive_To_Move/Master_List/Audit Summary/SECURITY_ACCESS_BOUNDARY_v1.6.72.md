# Security Access Boundary — v1.6.72

## Purpose

Document the agreed access-control boundary for the Master List v1.6.72 cleanup candidate.

This document separates data security from public/private function cleanup. Function privacy improves maintainability and reduces accidental callable surface, but it does not secure spreadsheet data by itself.

## Current Access Decision

The owner confirmed the intended operating model:

1. The source Google Sheet is shared with three total people.
2. The owner is the only person with script access.
3. Wave 5 is closed with the validated v1.6.72 cleanup candidate.
4. Performance optimization will occur after Wave 6 is complete.
5. Script-level allowlist guards are not required at this time.

## Required Security Controls

### 1. Original Sheet Permissions

The original spreadsheet remains the primary data-security boundary. Users without access to the original spreadsheet should not be able to view source data through normal Sheets access.

### 2. Script Access

Script-editor access should remain limited to the owner. Other spreadsheet users may use approved menu workflows but should not receive script-editor permissions unless the public API and security boundary are revisited.

### 3. Deployment Review

Do not expose the project through a web app, API executable, or add-on deployment that can return protected data to users who do not have access to the original spreadsheet.

If a deployment is later required, review:

- who can access the deployment;
- whether it executes as the owner or the accessing user;
- whether it can read, export, copy, email, or archive source data;
- whether the destination is at least as restricted as the original spreadsheet.

### 4. Trigger Review

Installable triggers should be reviewed because they may execute under the trigger creator's authority. Keep owner-created triggers limited to expected maintenance workflows and ensure they do not publish or copy data into less-restricted locations.

### 5. Archive and Output Destinations

Archive spreadsheets, generated copies, exports, or output destinations must be at least as restricted as the original spreadsheet when they contain protected source data.

## Deferred Control

Script-level user allowlist guards are deferred by owner decision. Reconsider them only if:

- more users receive edit access;
- non-owner operators need restricted workflow access;
- web app/API deployments are introduced;
- archive/export workflows become externally shared;
- a compliance review requires explicit workflow-level authorization checks.

## Recommendation

Keep v1.6.72 as the closed Wave 5 cleanup candidate, keep the above access controls in place, close Wave 6 after v1.6.74 no-extra-sheet validation, and handle performance optimization in a later wave.
