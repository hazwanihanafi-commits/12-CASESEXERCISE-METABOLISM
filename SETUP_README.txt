TCE504 — WEBSITE FEEDBACK WITH EMAIL NOTIFICATIONS

RECIPIENT: hazwanihanafi@usm.my

1. Go to https://script.google.com/ and create a NEW project (do not overwrite your existing TCE504 pre/post-test script).
2. Paste GOOGLE_APPS_SCRIPT_Code.gs into Code.gs.
3. Select setupFeedback in the function dropdown, click Run, and authorize Google Sheets + email access.
4. View the Execution log. Copy the Google Sheet URL. It will contain the Website_Feedback tab.
5. Deploy > New deployment > Web app. Execute as: Me; Who has access: Anyone.
6. Copy the web app URL ending in /exec.
7. Open index.html in a text editor. Find: const FEEDBACK_ENDPOINT = '';
8. Paste your URL between the single quotes. Save index.html.
9. Upload all files and thumbnails to GitHub Pages (keep their folder structure).
10. Submit ONE test response and confirm it appears in the Website_Feedback tab and an email arrives at hazwanihanafi@usm.my. Check Apps Script Executions if either fails.

IMPORTANT:
- Browser POST uses no-cors. The site can only confirm a request was sent, NOT that the row/email succeeded. Verify using the Sheet and inbox.
- Public web apps can be spammed; consider adding an institution-only access strategy if misuse occurs.
- Google email quotas apply; individual emails may be rate-limited. Mail failures are logged in the sheet.
- Names/matric numbers are optional. No student marks are calculated.
- Six perception ratings produce a score /30 and percentage. The overall usefulness rating /5 is recorded separately.
