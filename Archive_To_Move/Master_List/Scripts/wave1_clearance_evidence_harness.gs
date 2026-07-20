/**
 * Wave 1 v1.7.5 clearance evidence harness for copied, non-production workbooks.
 *
 * Usage:
 * 1. Paste/import this file into the copied test Apps Script project alongside
 *    v.1.7.5_Current_Production_Script.
 * 2. Rename the copied spreadsheet so its name contains COPY, TEST, QA, or SANDBOX.
 * 3. Run initializeWave1ClearanceEvidenceLog().
 * 4. Run the evidence helper functions as each W1-Txx test is performed.
 *
 * This harness is intentionally evidence-focused. It does not run destructive
 * production workflows automatically, and it refuses to run unless the workbook
 * looks like a non-production copy.
 */

const WAVE1_EVIDENCE_SHEET_NAME = 'Wave 1 Clearance Evidence';
const WAVE1_CLEARANCE_VERSION = 'v1.7.5';
const WAVE1_NON_PRODUCTION_NAME_PATTERN = /\b(copy|test|qa|sandbox|staging|non[- ]?prod)\b/i;
const WAVE1_EVIDENCE_HEADERS = [
  'Timestamp',
  'Test ID',
  'Area',
  'Status',
  'Evidence Summary',
  'Artifact / Link / Command',
  'Notes',
  'Tester'
];

function assertWave1NonProductionWorkbook_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = ss ? String(ss.getName() || '') : '';
  if (!WAVE1_NON_PRODUCTION_NAME_PATTERN.test(name)) {
    throw new Error(
      'Wave 1 clearance harness refused to run because this workbook does not look like a copied test workbook. ' +
      'Rename the workbook to include COPY, TEST, QA, SANDBOX, STAGING, or NON-PROD before running. Workbook: ' + name
    );
  }
  return ss;
}

function getWave1EvidenceSheet_() {
  const ss = assertWave1NonProductionWorkbook_();
  let sheet = ss.getSheetByName(WAVE1_EVIDENCE_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(WAVE1_EVIDENCE_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== WAVE1_EVIDENCE_HEADERS[0]) {
    sheet.clear();
    sheet.getRange(1, 1, 1, WAVE1_EVIDENCE_HEADERS.length).setValues([WAVE1_EVIDENCE_HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function appendWave1Evidence_(testId, area, status, evidenceSummary, artifact, notes) {
  const sheet = getWave1EvidenceSheet_();
  const user = Session.getActiveUser && Session.getActiveUser().getEmail ? Session.getActiveUser().getEmail() : '';
  sheet.appendRow([
    new Date(),
    String(testId || ''),
    String(area || ''),
    String(status || ''),
    String(evidenceSummary || ''),
    String(artifact || ''),
    String(notes || ''),
    user || ''
  ]);
  SpreadsheetApp.flush();
  return sheet;
}

function initializeWave1ClearanceEvidenceLog() {
  const ss = assertWave1NonProductionWorkbook_();
  const sheet = getWave1EvidenceSheet_();
  appendWave1Evidence_(
    'SETUP',
    'Evidence log',
    'STARTED',
    'Wave 1 clearance evidence log initialized for ' + WAVE1_CLEARANCE_VERSION,
    ss.getUrl(),
    'Attach command output, screenshots, exported PDFs/CSVs, and execution logs to the corresponding W1-Txx rows.'
  );
  return sheet;
}

function recordWave1Evidence(testId, status, evidenceSummary, artifact, notes) {
  return appendWave1Evidence_(testId, 'Manual evidence', status, evidenceSummary, artifact, notes);
}

function recordWave1StaticCommandEvidence(w1t01NodeCheckOutput, w1t02ManifestJsonOutput, w1t03DeleteSheetSearchOutput) {
  appendWave1Evidence_(
    'W1-T01',
    'Static syntax',
    w1t01NodeCheckOutput ? 'PASS/REVIEW' : 'MISSING',
    'Node syntax-check command output recorded.',
    'node --check',
    w1t01NodeCheckOutput || 'Paste W1-T01 command output here or attach W1-T01_T03_command_output.txt.'
  );
  appendWave1Evidence_(
    'W1-T02',
    'Manifest parse',
    w1t02ManifestJsonOutput ? 'PASS/REVIEW' : 'MISSING',
    'Manifest JSON parse command output recorded.',
    'python3 -m json.tool',
    w1t02ManifestJsonOutput || 'Paste W1-T02 manifest parse output here or attach W1-T01_T03_command_output.txt.'
  );
  appendWave1Evidence_(
    'W1-T03',
    'Central destructive guard',
    w1t03DeleteSheetSearchOutput ? 'PASS/REVIEW' : 'MISSING',
    'deleteSheet search command output recorded.',
    'rg -n "\\.deleteSheet\\(" or python3 single-file fallback',
    w1t03DeleteSheetSearchOutput || 'Paste W1-T03 deleteSheet search output here or attach W1-T01_T03_command_output.txt. If rg is unavailable, use the documented python3 fallback command.'
  );
  return getWave1EvidenceSheet_();
}

function logWave1ManualEvidenceChecklist() {
  const rows = [
    ['W1-T08', 'Web restore HTML escaping', 'PENDING', 'Attach deployed web output screenshot/source showing escaped < > & quotes and formula-like text.'],
    ['W1-T09', 'Busy lock path', 'PENDING', 'Attach concurrent/busy response and execution log proving no un-acquired releaseLock error.'],
    ['W1-T10', 'Protected local sheet deletion guard', 'PENDING', 'Attach protected-sheet before/after evidence and guard error logs.'],
    ['W1-T11', 'Archive replacement verification', 'PENDING', 'Attach archive before/after, verified copy, and local-delete-after-archive evidence.'],
    ['W1-T12', 'Protected archive sheet guard', 'PENDING', 'Attach protected archive before/after and failure evidence.'],
    ['W1-T13', 'Monthly Change/template/report destructive paths', 'PENDING', 'Attach Monthly Change rebuild evidence in copied workbook.'],
    ['W1-T14', 'End-to-end regression smoke', 'PENDING', 'Attach regression summary covering active-sheet builds, createIndexSheet, archive/raw path, and web restore smoke.']
  ];
  rows.forEach(function(row) {
    appendWave1Evidence_(row[0], row[1], row[2], row[3], '', 'Use recordWave1Evidence() to update this item with actual evidence links/notes.');
  });
  return getWave1EvidenceSheet_();
}

function runWave1TemplatePresenceEvidence() {
  const ss = assertWave1NonProductionWorkbook_();
  const requiredTemplates = [
    'Template - Banner Report',
    'Template - Care Plan Due',
    'Template - Unlocked Care Plan',
    'Template - Raw Data',
    'Template - Demo P',
    'Template - Disenrolled Exclusion',
    'Template - Monthly Change'
  ];
  const missing = requiredTemplates.filter(function(name) { return !ss.getSheetByName(name); });
  appendWave1Evidence_(
    'W1-T14',
    'Template readiness',
    missing.length ? 'FAIL' : 'PASS',
    missing.length ? 'Missing templates: ' + missing.join(', ') : 'All required active-build templates are present.',
    ss.getUrl(),
    'Use before running end-to-end regression tests.'
  );
  return missing;
}

function runWave1ProtectedDeletionGuardEvidence() {
  assertWave1NonProductionWorkbook_();
  if (typeof deleteSheetIfExists_ !== 'function') {
    throw new Error('deleteSheetIfExists_ is not available. Paste/import this harness alongside v1.7.5 production script first.');
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const protectedNames = [
    'Format Dashboard',
    'Index',
    'Framework Timing Report',
    'Dashboard Quality Report',
    'RFF_BASE_TEMPLATE',
    'Archive - Demo P'
  ];
  const results = [];
  protectedNames.forEach(function(name) {
    const before = !!ss.getSheetByName(name);
    let threw = false;
    let message = '';
    try {
      deleteSheetIfExists_(ss, name, 'Wave 1 protected deletion guard evidence harness');
    } catch (err) {
      threw = true;
      message = err && err.message ? err.message : String(err);
    }
    const after = !!ss.getSheetByName(name);
    results.push(name + ': before=' + before + ', threw=' + threw + ', after=' + after + ', message=' + message);
  });
  appendWave1Evidence_(
    'W1-T10',
    'Protected local sheet deletion guard',
    results.every(function(line) { return line.indexOf('before=true') === -1 || (line.indexOf('threw=true') !== -1 && line.indexOf('after=true') !== -1); }) ? 'PASS/REVIEW' : 'FAIL/REVIEW',
    results.join(' | '),
    ss.getUrl(),
    'Review before/after screenshots too; this log is not a substitute for visual evidence.'
  );
  return results;
}

function runWave1HtmlEscapeEvidence() {
  assertWave1NonProductionWorkbook_();
  if (typeof escapeHtml_ !== 'function') {
    throw new Error('escapeHtml_ is not available. Paste/import this harness alongside v1.7.5 production script first.');
  }
  const raw = '<script>alert("x")</script>&\'=HYPERLINK("bad")';
  const escaped = escapeHtml_(raw);
  const harmless = escaped.indexOf('<script>') === -1 && escaped.indexOf('&lt;script&gt;') !== -1 && escaped.indexOf('&amp;') !== -1;
  appendWave1Evidence_(
    'W1-T08',
    'Web restore HTML escaping',
    harmless ? 'PASS/UNIT-ONLY' : 'FAIL',
    'escapeHtml_ raw input rendered as: ' + escaped,
    'Attach deployed doGet screenshot/source separately.',
    'This unit evidence supports W1-T08 but final clearance still requires actual web output evidence.'
  );
  return { raw: raw, escaped: escaped, harmless: harmless };
}

function summarizeWave1ClearanceEvidence() {
  const sheet = getWave1EvidenceSheet_();
  const values = sheet.getDataRange().getValues();
  const required = ['W1-T01', 'W1-T02', 'W1-T03', 'W1-T08', 'W1-T09', 'W1-T10', 'W1-T11', 'W1-T12', 'W1-T13', 'W1-T14'];
  const latest = {};
  values.slice(1).forEach(function(row) {
    latest[String(row[1] || '')] = String(row[3] || '');
  });
  const missing = required.filter(function(testId) { return !latest[testId] || latest[testId].indexOf('PENDING') !== -1 || latest[testId].indexOf('MISSING') !== -1; });
  appendWave1Evidence_(
    'SUMMARY',
    'Release clearance',
    missing.length ? 'NOT CLEAR' : 'REVIEW FOR CLEARANCE',
    missing.length ? 'Missing or pending evidence: ' + missing.join(', ') : 'All required test IDs have non-pending evidence rows. Owner review still required.',
    SpreadsheetApp.getActiveSpreadsheet().getUrl(),
    'Wave 1 is clear only after W1-T01 through W1-T03 and W1-T08 through W1-T14 pass and evidence is attached.'
  );
  return { missingOrPending: missing, latestStatuses: latest };
}
