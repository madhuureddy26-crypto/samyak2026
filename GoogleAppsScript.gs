/**
 * SAMYAK 2026 Registration receiver for Google Sheets.
 *
 * Setup:
 * 1. Create a Google Sheet and name the first tab "Registrations".
 * 2. In that Sheet, choose Extensions > Apps Script.
 * 3. Replace the editor contents with this code and save.
 * 4. Deploy > New deployment > select "Web app".
 * 5. Execute as: Me. Who has access: Anyone.
 * 6. Deploy and authorize when Google prompts you.
 * 7. Copy the Web app URL ending in /exec into index.html:
 *    const GOOGLE_SHEETS_WEB_APP_URL = '...';
 *
 * Public web apps can receive spam. Keep the Sheet private, review submissions,
 * and do not collect sensitive data you do not need.
 */
const SHEET_NAME = 'Registrations';

function doPost(e) {
  const params = (e && e.parameter) ? e.parameter : {};

  // Basic honeypot: ignore submissions where the hidden field was filled.
  if (params['bot-field']) {
    return ContentService.createTextOutput('OK');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'College',
        'Department',
        'Year of Study',
        'Competition',
        'Team Name',
        'Team Size'
      ]);
      sheet.setFrozenRows(1);
    }

    const row = [
      new Date(),
      safeCell_(params.fullName),
      safeCell_(params.email),
      safeCell_(params.phone),
      safeCell_(params.college),
      safeCell_(params.department),
      safeCell_(params.year),
      safeCell_(params.competition),
      safeCell_(params.teamName),
      safeCell_(params.teamSize)
    ];

    // Server-side validation for required fields.
    if (row.slice(1).some(value => String(value).trim() === '')) {
      return ContentService.createTextOutput('Missing required fields');
    }
    if (String(params.competition) === 'Code Puzzle' && String(params.teamSize) !== '1') {
      return ContentService.createTextOutput('Invalid Code Puzzle team size');
    }
    if (String(params.competition) !== 'Code Puzzle' && !['1', '2', '3'].includes(String(params.teamSize))) {
      return ContentService.createTextOutput('Invalid team size');
    }

    sheet.appendRow(row);
    return ContentService.createTextOutput('OK');
  } finally {
    lock.releaseLock();
  }
}

// Prevent values beginning with spreadsheet formula characters from being evaluated.
function safeCell_(value) {
  const text = String(value || '').trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
