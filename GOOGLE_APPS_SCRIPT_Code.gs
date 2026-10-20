/** TCE504 website feedback — deploy as a NEW standalone Apps Script project.
 * 1. Create Google Sheet. 2. Extensions > Apps Script. 3. Paste this file.
 * 4. Run setupFeedback once, authorize. 5. Deploy > New deployment > Web app.
 * Execute as: Me. Who has access: Anyone (public student submissions).
 * 6. Paste the resulting /exec URL into index.html FEEDBACK_ENDPOINT.
 */
const FEEDBACK_TO = 'hazwanihanafi@usm.my';
const SHEET_NAME = 'Website_Feedback';
const HEADERS = ['Received at','Submission ID','Student name','Matric','Case','Overall rating','Learning','Cases','Visuals','Interactive','Navigation','Recommendation','Total / 30','Percent','Average / 5','Helpful','Improve','Other','Email status'];
function setupFeedback(){
  const props=PropertiesService.getScriptProperties();
  let id=props.getProperty('FEEDBACK_SPREADSHEET_ID');
  if(!id){const ss=SpreadsheetApp.create('TCE504 Exercise Metabolism — Website Feedback');id=ss.getId();props.setProperty('FEEDBACK_SPREADSHEET_ID',id);}
  const ss=SpreadsheetApp.openById(id);let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh)sh=ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0){sh.appendRow(HEADERS);sh.setFrozenRows(1);}
  Logger.log('Feedback Google Sheet: '+ss.getUrl());
  return ss.getUrl();
}
function doPost(e){
  const lock=LockService.getScriptLock();lock.waitLock(25000);
  try{
    const d=JSON.parse(e.postData.contents||'{}');
    if(d.type!=='website_feedback')throw Error('Unsupported submission type');
    const clean=v=>String(v==null?'':v).slice(0,3000).replace(/^[=+@\-\t\r]/,v=>'\''+v);
    const vals=['Learning','Cases','Visuals','Interactive','Navigation','Recommendation'].map(k=>Number((d.scores||{})[k]));
    if(vals.some(n=>!Number.isInteger(n)||n<1||n>5))throw Error('Invalid ratings');
    const total=vals.reduce((a,b)=>a+b,0);
    const pct=Math.round(total/30*100),avg=(total/6).toFixed(2);
    if(!d.case||!d.helpful||!d.submissionId)throw Error('Missing required fields');
    const id=PropertiesService.getScriptProperties().getProperty('FEEDBACK_SPREADSHEET_ID');
    if(!id)throw Error('Run setupFeedback first');
    const ss=SpreadsheetApp.openById(id);const sh=ss.getSheetByName(SHEET_NAME);
    const submissionId=clean(d.submissionId);
    // Deduplicate retries by submission ID.
    const existing=sh.getLastRow()>1?sh.getRange(2,2,sh.getLastRow()-1,1).createTextFinder(submissionId).matchEntireCell(true).findNext():null;
    if(existing)return output_({ok:true,duplicate:true});
    const row=[new Date(),submissionId,clean(d.studentName),clean(d.matric),clean(d.case),Number(d.rating)||'',...vals,total,pct,avg,clean(d.helpful),clean(d.improvement),clean(d.other),'Pending'];
    sh.appendRow(row);const rowNumber=sh.getLastRow();
    try{
      const subject='TCE504 website feedback · '+pct+'% · '+clean(d.case).slice(0,80);
      const body=['New TCE504 Exercise Metabolism website feedback','',
        'Case: '+clean(d.case),'Student: '+(clean(d.studentName)||'Anonymous'),
        'Matric: '+(clean(d.matric)||'Not provided'),'Overall rating: '+(Number(d.rating)||'Not provided')+'/5',
        'Evaluation: '+total+'/30 ('+pct+'%), average '+avg+'/5','',
        'What helped: '+clean(d.helpful),'What to improve: '+clean(d.improvement),
        'Other comments: '+clean(d.other),'','Spreadsheet: '+ss.getUrl()].join('\n');
      MailApp.sendEmail(FEEDBACK_TO,subject,body);
      sh.getRange(rowNumber,19).setValue('Sent');
    }catch(mailError){sh.getRange(rowNumber,19).setValue('Email error: '+String(mailError).slice(0,180));console.error(mailError);}
    return output_({ok:true});
  }catch(err){console.error(err);return output_({ok:false,error:String(err)});}
  finally{lock.releaseLock();}
}
function output_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
