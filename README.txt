SAMYAK 2026 — Google Sheets Registration Integration

WHAT THIS PACKAGE DOES
- Adds Google Sheets submission code to the website.
- Includes GoogleAppsScript.gs, the server-side receiver that appends registrations to a Google Sheet.
- Keeps the branding image embedded in index.html.
- Keeps Team Name compulsory.
- Code Puzzle must have team size 1; other competitions allow sizes 1, 2, or 3.

IMPORTANT: THE CONNECTION NEEDS YOUR GOOGLE APPS SCRIPT URL
This package cannot write to your personal Google Sheet until you create the Sheet, deploy the script, and paste its Web App URL into index.html. Do not publish it as registration-ready until tested.

SET UP THE GOOGLE SHEET
1. Sign in to Google and create a new Google Sheet named "SAMYAK 2026 Registrations".
2. Rename the first sheet tab to "Registrations" (the script can also create it if missing).
3. Click Extensions > Apps Script.
4. Open GoogleAppsScript.gs from this ZIP in a text editor, copy all its contents, paste into the Apps Script editor, and save.
5. Click Deploy > New deployment.
6. Choose type "Web app".
7. Set "Execute as" to "Me".
8. Set "Who has access" to "Anyone" so public participants can submit without signing into Google. Google may show a security/authorization prompt; review and authorize your own script.
9. Click Deploy and copy the Web app URL ending in /exec.

CONNECT THE WEBSITE
1. Open index.html in a text editor.
2. Find this line:
   const GOOGLE_SHEETS_WEB_APP_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
3. Replace the placeholder with the actual URL you copied, keeping the quotes.
4. Save index.html.
5. Deploy the updated website to Netlify or your existing static hosting provider.

TEST BEFORE ANNOUNCING REGISTRATION
1. Open the public website URL.
2. Submit a test entry with details you control.
3. Open the Google Sheet and verify a new row appears in the "Registrations" tab.
4. If you edit/redeploy Apps Script code later, create a new version in Manage deployments if required.
5. Do not treat the website's browser message alone as proof of saving: the browser uses a cross-origin request and cannot read the Apps Script response. Verify the row in the Sheet.

PRIVACY AND SECURITY
- Keep the Google Sheet private; only share it with event organizers who need access.
- The public Apps Script endpoint can be spammed. The script includes a basic hidden-field honeypot and validates team size, but it is not a full anti-abuse system.
- Do not collect passwords, government IDs, payment card data, or other sensitive information in this form.
- This setup writes to Google Sheets; it does not send confirmation emails automatically.
