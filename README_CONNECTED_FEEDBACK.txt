TCE504 · INTERACTIVE EXERCISE METABOLISM STORYBOOK
12 cases · six cards per case · website feedback connected

DEPLOYED FEEDBACK WEB APP
https://script.google.com/macros/s/AKfycbyzuvrcyqV1Ma0xf6_2g2eNwEd2OTfhAS0_0BK7kD1xeXqpw1BxrxJK892vPpuyvpQD/exec
Email destination configured in Apps Script: hazwanihanafi@usm.my

HOW TO PUBLISH
1) Extract this ZIP (do not upload only index.html; keep all files and the thumbnails folder).
2) Upload everything inside this folder to the ROOT of your GitHub Pages repository.
3) Open the GitHub Pages URL and scroll down to Student Feedback Box.
4) Select All 12 cases (or one case) and complete all six scoring questions and the learning comment.
5) Click Send feedback to lecturer.
6) IMPORTANT: Check the REAL Google Sheet made by setupFeedback() for the row, AND check hazwanihanafi@usm.my for the email.
7) If no row arrives, examine Apps Script > Executions; confirm Deployment > Manage deployments > Web app > Execute as Me / Who has access Anyone, and run setupFeedback() in the SAME project as the deployed web app.
8) If you edited the script AFTER deploying, edit the deployment and select a NEW VERSION, rather than simply clicking Save.

PLEASE NOTE
- The website uses browser fetch(mode=no-cors) for Apps Script, so the browser CANNOT read the server confirmation. The message 'request sent for processing' does not prove storage or email delivery.
- Do not test by repeatedly pressing Submit; check the spreadsheet first.
- setupFeedback() in GOOGLE_APPS_SCRIPT_Code.gs creates its OWN Google Sheet. It does NOT automatically save into the previously provided Excel template. Check Execution log for the sheet URL.
- Never put private information into public code repositories or share the response sheet publicly. The optional student name/matric are sent to the Google endpoint if provided.
- You may want to do a single test response labelled as TEST to confirm the live workflow, then remove that test row from the sheet.
- Script deployments have Google account permission and email-sending quotas.

FILES
- index.html: case dashboard + connected feedback form
- case-01.html … case-12.html: all twelve full interactive case pages
- thumbnails/: twelve dashboard photos
- GOOGLE_APPS_SCRIPT_Code.gs: matching sample backend (already deployed endpoint may have this code; do not paste blindly into a different Apps Script deployment)
- SETUP_README.txt: previous setup instructions

Generated website bundle. No live submission/email test was performed.
