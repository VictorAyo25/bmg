/**
 * BMG Engineering Limited
 * Website brief generator.
 *
 * WHAT IT DOES
 *   Creates a short Google Doc the client can finish in about ten minutes.
 *   Options are real Google Docs checkboxes. Free text is kept to a minimum
 *   and most of it is one or two words. Victor writes the full PRD from the
 *   answers, so this document only asks what cannot be decided without them.
 *
 * HOW TO RUN
 *   1. Go to script.google.com and create a new project.
 *   2. Paste this whole file into Code.gs, replacing what is there.
 *   3. Optional but recommended, for clickable checkboxes:
 *        Editor sidebar > Services > + > Google Docs API > Add.
 *        The identifier must stay as "Docs".
 *      If you skip this, the script still works and falls back to a plain
 *      empty box glyph that can be replaced with an X.
 *   4. Optional: set SHARE_WITH and FOLDER_ID in CONFIG below.
 *   5. Select createBmgBrief in the function dropdown and press Run.
 *   6. Approve the permission prompt on first run.
 *   7. The document URL is printed in the execution log.
 *
 * HOUSE RULES IF YOU EDIT THIS
 *   No em dash and no en dash anywhere, in code or in the document.
 *   The document is written in first person, Victor speaking to the client.
 *   Never use text background colour, it renders as highlighter pen. Shade
 *   table cells instead.
 *   Every question added has to earn its place. If Victor can decide it
 *   himself, it does not belong in here.
 */

var CONFIG = {
  DOC_TITLE: 'BMG Engineering Limited | Website Brief',
  PREPARED_BY: 'Victor Ayodeji',
  PREPARED_FOR: 'BMG Engineering Limited (RC 9085536)',
  CLIENT_CONTACT: 'Favour Olayode',

  // Leave empty to create the doc in the root of My Drive.
  FOLDER_ID: '',

  // Emails to give edit access to on creation. Example: ['client@example.com'].
  SHARE_WITH: [],

  // true  = real clickable Google Docs checkboxes (needs the Docs API service).
  // false = plain empty box character, no advanced service needed.
  INTERACTIVE_CHECKBOXES: true,

  BODY_FONT: 'Roboto',
  HEAD_FONT: 'Roboto'
};

/* Sampled from the BMG flyers. */
var T = {
  navy: '#0B2A63',
  blue: '#1B6FE8',
  ink: '#20242E',
  mute: '#6B7688',
  hair: '#E4EAF2',
  soft: '#F5F8FC',
  head: '#EDF2FA',
  white: '#FFFFFF'
};

var CB = '[cb] ';
var BOX = '☐  ';

/* ------------------------------------------------------------------ */
/* ENTRY POINT                                                         */
/* ------------------------------------------------------------------ */

function createBmgBrief() {
  var doc = DocumentApp.create(CONFIG.DOC_TITLE);
  var body = doc.getBody();

  body.setMarginTop(58).setMarginBottom(58).setMarginLeft(64).setMarginRight(64);

  buildCover_(body);

  for (var i = 0; i < SPEC.length; i++) {
    renderSection_(body, SPEC[i], i + 1);
  }

  // Docs is fussy about deleting paragraphs near the end of the body, and the
  // one trailing blank left after the final table is invisible, so leave it.
  doc.saveAndClose();

  var id = doc.getId();
  finishCheckboxes_(id);
  placeFile_(id);

  var url = 'https://docs.google.com/document/d/' + id + '/edit';
  Logger.log('Brief created: ' + url);
  return url;
}

/* ------------------------------------------------------------------ */
/* DOCUMENT CHROME                                                     */
/* ------------------------------------------------------------------ */

function buildCover_(body) {
  var eyebrow = body.appendParagraph('WEBSITE BRIEF');
  style_(eyebrow, { font: CONFIG.HEAD_FONT, size: 9, bold: true, color: T.blue, after: 8 });

  var title = body.appendParagraph('BMG Engineering Limited');
  title.setHeading(DocumentApp.ParagraphHeading.TITLE);
  style_(title, { font: CONFIG.HEAD_FONT, size: 28, bold: true, color: T.navy, after: 4 });

  var sub = body.appendParagraph('Ten minutes, mostly ticking boxes');
  style_(sub, { font: CONFIG.HEAD_FONT, size: 14, color: T.mute, after: 20 });

  var lead = body.appendParagraph(
    "This is everything I need before I start building. I've kept it short on purpose. " +
    "If you're pressed for time, just do the ticking and skip the typing. The ticks on " +
    "their own tell me most of what I need, and I can pick up the rest on a five minute call."
  );
  style_(lead, { font: CONFIG.BODY_FONT, size: 11, color: T.ink, after: 14, lineSpacing: 1.35 });

  var lead2 = body.appendParagraph(
    "Where you don't know something, write NOT SURE rather than leaving it blank. " +
    "That way I know it still needs a decision instead of assuming nobody read the question."
  );
  style_(lead2, { font: CONFIG.BODY_FONT, size: 11, color: T.ink, after: 18, lineSpacing: 1.35 });

  fields_(body, [
    ['Filled in by', 'Add your role next to your name', CONFIG.CLIENT_CONTACT],
    ['Who has the final say', 'You, or somebody else?', ''],
    ['Date', '', ''],
    ['Built by', '', CONFIG.PREPARED_BY]
  ]);

  var next = body.appendParagraph(
    "Send it back and I'll write up the scope, then start on design. " +
    "We've already agreed the price, so this is just about pinning down what it covers."
  );
  style_(next, { font: CONFIG.BODY_FONT, size: 10, italic: true, color: T.mute, before: 10, lineSpacing: 1.3 });
}

function renderSection_(body, sec, index) {
  var label = sec.appendix ? sec.appendix : pad2_(index);
  var h = body.appendParagraph(label + '   ' + sec.h);
  h.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  style_(h, { font: CONFIG.HEAD_FONT, size: 18, bold: true, color: T.navy, before: 30, after: 4 });
  h.editAsText().setForegroundColor(0, label.length - 1, T.blue);

  body.appendHorizontalRule();

  if (sec.intro) {
    var ip = body.appendParagraph(sec.intro);
    style_(ip, { font: CONFIG.BODY_FONT, size: 10.5, color: T.mute, before: 6, after: 12, lineSpacing: 1.3 });
  }

  for (var i = 0; i < sec.blocks.length; i++) {
    renderBlock_(body, sec.blocks[i]);
  }
}

function renderBlock_(body, b) {
  switch (b.type) {

    case 'sub':
      var s = body.appendParagraph(b.text);
      s.setHeading(DocumentApp.ParagraphHeading.HEADING2);
      style_(s, { font: CONFIG.HEAD_FONT, size: 11.5, bold: true, color: T.ink, before: 18, after: 4 });
      if (b.hint) {
        var sh = body.appendParagraph(b.hint);
        style_(sh, { font: CONFIG.BODY_FONT, size: 9.5, italic: true, color: T.mute, after: 8 });
      }
      break;

    case 'para':
      var p = body.appendParagraph(b.text);
      style_(p, { font: CONFIG.BODY_FONT, size: 10.5, color: T.ink, after: 9, lineSpacing: 1.3 });
      break;

    case 'note':
      calloutBox_(body, b.text);
      break;

    case 'check':
      if (b.pickOne) {
        var po = body.appendParagraph('Pick one');
        style_(po, { font: CONFIG.BODY_FONT, size: 9, bold: true, color: T.blue, after: 4 });
      }
      for (var j = 0; j < b.items.length; j++) {
        var marker = CONFIG.INTERACTIVE_CHECKBOXES ? CB : BOX;
        var cp = body.appendParagraph(marker + b.items[j]);
        style_(cp, { font: CONFIG.BODY_FONT, size: 10.5, color: T.ink, after: 2, indent: 12, lineSpacing: 1.2 });
      }
      var sp = body.appendParagraph('');
      style_(sp, { size: 8, after: 0 });
      break;

    case 'fields':
      fields_(body, b.rows);
      break;

    case 'table':
      gridTable_(body, b.head, b.rows || [], b.blank || 0, b.widths);
      break;
  }
}

/* ------------------------------------------------------------------ */
/* TABLES                                                              */
/* ------------------------------------------------------------------ */

function fields_(body, rows) {
  var t = body.appendTable();

  for (var i = 0; i < rows.length; i++) {
    var label = rows[i][0];
    var hint = rows[i][1] || '';
    var prefill = rows[i][2] || '';

    var row = t.appendTableRow();
    var left = row.appendTableCell('');
    var right = row.appendTableCell(prefill);

    var lp = left.getChild(0).asParagraph();
    lp.setText(label);
    style_(lp, { font: CONFIG.BODY_FONT, size: 10, bold: true, color: T.ink, after: 0 });

    if (hint) {
      var hp = left.appendParagraph(hint);
      style_(hp, { font: CONFIG.BODY_FONT, size: 8.5, italic: true, color: T.mute, before: 2, after: 0 });
    }

    left.setBackgroundColor(T.soft);
    padCell_(left);
    padCell_(right);

    style_(right.getChild(0).asParagraph(), {
      font: CONFIG.BODY_FONT, size: 10, after: 0, color: T.ink
    });
  }

  t.setColumnWidth(0, 172);
  t.setBorderColor(T.hair);
  t.setBorderWidth(0.5);

  gap_(body);
  return t;
}

function gridTable_(body, head, rows, blank, widths) {
  var t = body.appendTable();

  var hr = t.appendTableRow();
  for (var i = 0; i < head.length; i++) {
    var hc = hr.appendTableCell('');
    var hp = hc.getChild(0).asParagraph();
    hp.setText(head[i]);
    style_(hp, { font: CONFIG.HEAD_FONT, size: 9, bold: true, color: T.navy, after: 0 });
    hc.setBackgroundColor(T.head);
    padCell_(hc);
  }

  for (var r = 0; r < rows.length; r++) {
    var tr = t.appendTableRow();
    for (var c = 0; c < head.length; c++) {
      var cell = tr.appendTableCell(rows[r][c] || '');
      style_(cell.getChild(0).asParagraph(), { font: CONFIG.BODY_FONT, size: 9.5, color: T.ink, after: 0 });
      padCell_(cell);
    }
  }

  for (var b = 0; b < blank; b++) {
    var br = t.appendTableRow();
    for (var k = 0; k < head.length; k++) {
      var bc = br.appendTableCell('');
      padCell_(bc);
      style_(bc.getChild(0).asParagraph(), { font: CONFIG.BODY_FONT, size: 9.5, after: 0 });
    }
  }

  if (widths) {
    for (var w = 0; w < widths.length; w++) t.setColumnWidth(w, widths[w]);
  }

  t.setBorderColor(T.hair);
  t.setBorderWidth(0.5);

  gap_(body);
  return t;
}

function calloutBox_(body, text) {
  var t = body.appendTable();
  var cell = t.appendTableRow().appendTableCell('');
  var p = cell.getChild(0).asParagraph();
  p.setText(text);
  style_(p, { font: CONFIG.BODY_FONT, size: 10, color: T.ink, after: 0, lineSpacing: 1.3 });
  cell.setBackgroundColor(T.soft);
  cell.setPaddingTop(11).setPaddingBottom(11).setPaddingLeft(13).setPaddingRight(13);
  t.setBorderColor(T.soft);
  t.setBorderWidth(0);
  gap_(body);
  return t;
}

function padCell_(cell) {
  cell.setPaddingTop(7).setPaddingBottom(7).setPaddingLeft(9).setPaddingRight(9);
}

function gap_(body) {
  var g = body.appendParagraph('');
  style_(g, { size: 9, after: 0 });
}

/* ------------------------------------------------------------------ */
/* STYLE, CHECKBOXES, FILE PLACEMENT                                   */
/* ------------------------------------------------------------------ */

function style_(el, o) {
  var a = {};
  var A = DocumentApp.Attribute;
  if (o.font !== undefined) a[A.FONT_FAMILY] = o.font;
  if (o.size !== undefined) a[A.FONT_SIZE] = o.size;
  if (o.bold !== undefined) a[A.BOLD] = o.bold;
  if (o.italic !== undefined) a[A.ITALIC] = o.italic;
  if (o.color !== undefined) a[A.FOREGROUND_COLOR] = o.color;
  if (o.before !== undefined) a[A.SPACING_BEFORE] = o.before;
  if (o.after !== undefined) a[A.SPACING_AFTER] = o.after;
  if (o.indent !== undefined) a[A.INDENT_START] = o.indent;
  if (o.lineSpacing !== undefined) a[A.LINE_SPACING] = o.lineSpacing;
  el.setAttributes(a);
  return el;
}

function pad2_(n) {
  return n < 10 ? '0' + n : String(n);
}

function finishCheckboxes_(docId) {
  if (!CONFIG.INTERACTIVE_CHECKBOXES) return;
  try {
    if (typeof Docs === 'undefined') {
      throw new Error('Google Docs API advanced service is not enabled');
    }
    applyCheckboxBullets_(docId);
  } catch (e) {
    Logger.log('Clickable checkboxes unavailable, using plain boxes instead. Reason: ' + e.message);
    swapMarkersForGlyphs_(docId);
  }
}

function applyCheckboxBullets_(docId) {
  var doc = Docs.Documents.get(docId);
  var content = doc.body.content;
  var hits = [];

  for (var i = 0; i < content.length; i++) {
    var el = content[i];
    if (!el.paragraph || !el.paragraph.elements) continue;
    var first = el.paragraph.elements[0];
    if (!first || !first.textRun) continue;
    if (first.textRun.content.indexOf(CB) !== 0) continue;
    hits.push({ start: el.startIndex, end: el.endIndex, mark: first.startIndex });
  }

  if (!hits.length) return;

  var requests = [];

  // Group consecutive checkbox paragraphs so each run becomes one list.
  var runStart = null;
  var prevEnd = null;
  for (var j = 0; j < hits.length; j++) {
    if (runStart === null) {
      runStart = hits[j].start;
    } else if (hits[j].start !== prevEnd) {
      requests.push(bulletRequest_(runStart, prevEnd));
      runStart = hits[j].start;
    }
    prevEnd = hits[j].end;
  }
  requests.push(bulletRequest_(runStart, prevEnd));

  // Remove the markers last, working backwards so earlier indexes stay valid.
  for (var k = hits.length - 1; k >= 0; k--) {
    requests.push({
      deleteContentRange: {
        range: { startIndex: hits[k].mark, endIndex: hits[k].mark + CB.length }
      }
    });
  }

  Docs.Documents.batchUpdate({ requests: requests }, docId);
}

function bulletRequest_(start, end) {
  return {
    createParagraphBullets: {
      range: { startIndex: start, endIndex: end },
      bulletPreset: 'BULLET_CHECKBOX'
    }
  };
}

function swapMarkersForGlyphs_(docId) {
  var doc = DocumentApp.openById(docId);
  doc.getBody().replaceText('\\[cb\\] ', BOX);
  doc.saveAndClose();
}

function placeFile_(docId) {
  var file = DriveApp.getFileById(docId);

  if (CONFIG.FOLDER_ID) {
    try {
      DriveApp.getFolderById(CONFIG.FOLDER_ID).addFile(file);
      DriveApp.getRootFolder().removeFile(file);
    } catch (e) {
      Logger.log('Could not move the file into FOLDER_ID: ' + e.message);
    }
  }

  for (var i = 0; i < CONFIG.SHARE_WITH.length; i++) {
    try {
      file.addEditor(CONFIG.SHARE_WITH[i]);
    } catch (e) {
      Logger.log('Could not share with ' + CONFIG.SHARE_WITH[i] + ': ' + e.message);
    }
  }
}

/* ================================================================== */
/* CONTENT                                                             */
/* ================================================================== */

var SPEC = [

  /* 01 ------------------------------------------------------------ */
  {
    h: 'The basics',
    intro: "Facts for the footer, the contact page and Google. I've filled in what I already have.",
    blocks: [
      { type: 'fields', rows: [
        ['Registered name', '', 'BMG Engineering Limited'],
        ['RC number', '', '9085536'],
        ['Year founded', '', ''],
        ['What BMG does, in one line', 'Finish this: BMG Engineering is a company that ...', ''],
        ['How many people work there', 'Rough is fine', ''],
        ['Office address', 'Full address including the state', ''],
        ['Can the address go on the site', 'Yes, no, or city only', ''],
        ['Where do you work', 'Lagos only? Nationwide? Beyond?', ''],
        ['Phone number', '', '0906 331 7044'],
        ['Email', 'Ideally not a Gmail address', ''],
        ['Office hours', '', ''],
        ['Domain name', 'What you want it to be, and whether you already own it', ''],
        ['Social media', 'Paste whatever exists. Skip the ones you do not have', '']
      ]},

      { type: 'sub', text: 'What you are registered with', hint: 'This is what makes a developer or a tender board take you seriously. Tick what you hold.' },
      { type: 'check', items: [
        'CAC, RC 9085536',
        'COREN',
        'Nigerian Society of Engineers',
        'ASHRAE',
        'ISO certification',
        'Registered on a government tender platform',
        'Dealership or partner certificate from an equipment brand',
        'Professional indemnity or public liability insurance'
      ]}
    ]
  },

  /* 02 ------------------------------------------------------------ */
  {
    h: 'What you do',
    intro: 'The most important page on this form. Tick what you do now, not what you plan to do next year.',
    blocks: [
      { type: 'check', items: [
        'HVAC design, load calculations, ducts, chilled water, AHUs',
        'Full MEP design, mechanical and electrical and plumbing',
        'Revit and BIM modelling for other firms',
        'Installation on site',
        'Testing, balancing and commissioning',
        'Maintenance contracts',
        'Repairs and emergency callouts',
        'Retrofits and upgrades',
        'Energy audits',
        'Equipment supply',
        'Project management and site supervision',
        'Fire protection',
        'Plumbing',
        'Electrical power distribution',
        'BMS, CCTV, access control',
        'Solar and backup power',
        'Cold rooms and refrigeration',
        'Surveys and expert reports'
      ]},
      { type: 'fields', rows: [
        ['Anything I missed', '', ''],
        ['The one you want more of', 'The service that pays', '']
      ]},

      { type: 'sub', text: 'Which sounds most like BMG' },
      { type: 'check', pickOne: true, items: [
        'Designers. We do the drawings and specifications, somebody else builds it.',
        'Contractors. We install it and hand over a working system.',
        'Both. We design it, we build it, we keep it running.',
        'Maintenance first. Most of our work is keeping existing systems alive.'
      ]},

      { type: 'sub', text: 'Buildings you have actually worked in' },
      { type: 'check', items: [
        'Homes and estates',
        'Offices',
        'Hotels',
        'Hospitals and labs',
        'Malls and retail',
        'Schools and universities',
        'Banks',
        'Factories',
        'Data centres and server rooms',
        'Oil, gas and energy',
        'Government buildings',
        'Churches and mosques',
        'Warehouses and cold storage'
      ]}
    ]
  },

  /* 03 ------------------------------------------------------------ */
  {
    h: 'Who it is for',
    intro: 'Everything on the home page depends on this.',
    blocks: [
      { type: 'sub', text: 'Who does the site need to convince' },
      { type: 'check', items: [
        'Property developers',
        'Main contractors',
        'Architects and consultants looking for an MEP partner',
        'Facility and estate managers',
        'Building owners such as banks, hotels, hospitals and malls',
        'Government and tender boards',
        'Individuals and small businesses'
      ]},

      { type: 'sub', text: 'If the site only does one thing well' },
      { type: 'check', pickOne: true, items: [
        'Make you look real. Somebody Googles BMG and finds a proper, registered, capable firm.',
        'Bring in enquiries. Everything pushes the visitor to call or message.',
        'Show the work. The projects do the selling.',
        'Explain what you do. Most people only know BMG for one thing.'
      ]},

      { type: 'sub', text: 'What should a visitor do' },
      { type: 'check', items: [
        'Call you',
        'Message you on WhatsApp',
        'Fill in an enquiry form',
        'Download your company profile',
        'Book a call or a site visit'
      ]},
      { type: 'fields', rows: [
        ['What usually wins you the job', 'Price, a referral, being fast, being technical, knowing somebody', '']
      ]}
    ]
  },

  /* 04 ------------------------------------------------------------ */
  {
    h: 'How it should look',
    intro: "Your flyers already do half the work here. I'd build on that navy and blue rather than start again.",
    blocks: [
      { type: 'check', pickOne: true, items: [
        'Corporate and safe. Nothing risky. Comfortable in front of a tender board.',
        'Technical. Precise, engineering led, happy to show drawings and numbers.',
        'Bold and premium. Big type, strong contrast, the most expensive firm in the room.',
        'Clean and quiet. Plenty of space, photography doing the talking.'
      ]},

      { type: 'sub', text: 'Colours', hint: "Pulled off your flyers. Only correct them if they're wrong." },
      { type: 'fields', rows: [
        ['Deep navy', '', '#0B2A63'],
        ['Bright blue', '', '#1B6FE8'],
        ['Any colour to avoid', 'A competitor colour, or one you just hate', '']
      ]},

      { type: 'sub', text: 'What it must not look like' },
      { type: 'check', items: [
        'A template a thousand other companies are using',
        'Busy and cluttered',
        'Dated',
        'Playful or jokey',
        'Full of stock photos of people shaking hands',
        'Walls of text with nothing to look at'
      ]},
      { type: 'fields', rows: [
        ['A website you like', "Any industry. Paste a link if one comes to mind, skip it if not", ''],
        ['Do you have the logo as a vector file', 'AI, EPS or SVG. If not, a big PNG will do', '']
      ]}
    ]
  },

  /* 05 ------------------------------------------------------------ */
  {
    h: 'Proof you can show',
    intro: "Nothing sells engineering like finished work. Be straight with me about what actually exists.",
    blocks: [
      { type: 'check', items: [
        'Photos of finished jobs',
        'Drawings or Revit screenshots',
        'Client names we are allowed to publish',
        'Client or partner logos',
        'Written testimonials',
        'Team photos',
        'A company profile PDF',
        'Almost none of this yet'
      ]},
      { type: 'fields', rows: [
        ['How many projects could go on the site', 'A real number please', ''],
        ['Can we name the clients', 'All, some, or none', ''],
        ['How good are the photos', 'Be honest. Phone photos are workable, I just need to know in advance', '']
      ]},

      { type: 'sub', text: 'Numbers worth putting on the home page', hint: "Only fill in what's true. Leave the rest blank. One real number beats four vague ones." },
      { type: 'fields', rows: [
        ['Years in business', '', ''],
        ['Projects completed', '', ''],
        ['Engineers on the team', '', ''],
        ['Anything else you count', 'Tonnage installed, square metres, clients served', '']
      ]}
    ]
  },

  /* 06 ------------------------------------------------------------ */
  {
    h: 'How enquiries reach you',
    intro: 'This is the part that decides whether the site actually makes you money.',
    blocks: [
      { type: 'check', items: [
        'Phone number people can tap to call',
        'WhatsApp chat button',
        'Email address',
        'An enquiry form',
        'Address with a map',
        'Request a callback'
      ]},

      { type: 'sub', text: 'Where should form enquiries land' },
      { type: 'check', pickOne: true, items: [
        'An email inbox',
        'Email plus a spreadsheet so nothing gets lost',
        'Forwarded to WhatsApp',
        'Into a CRM, name it below'
      ]},

      { type: 'fields', rows: [
        ['Which email address', '', ''],
        ['WhatsApp number for the button', '', ''],
        ['Who watches it', 'Name, and how fast they usually reply', ''],
        ['Who updates the site after launch', 'Somebody at BMG, or me when you ask', '']
      ]}
    ]
  },

  /* 07 ------------------------------------------------------------ */
  {
    h: 'What I need you to send me',
    intro: "Nothing to fill in here, it's just the list. Tick things off as you send them.",
    blocks: [
      { type: 'check', items: [
        'Logo files, vector if you have them',
        'Project photos, the originals rather than the WhatsApp versions',
        'Details for a handful of projects, where, what, when',
        'Client or partner logos',
        'Team photos, names and titles',
        'Certificates and registrations',
        'Any testimonials, with permission to use them',
        'A rough description of each service, notes are fine',
        'Company profile PDF, if one exists',
        'Domain login, or the go ahead for me to buy one'
      ]},
      { type: 'fields', rows: [
        ['Who is sending all this', '', CONFIG.CLIENT_CONTACT],
        ['Realistic date it can be with me', 'This is the thing that decides the launch date, nothing else', ''],
        ['Anything else on your mind', 'Free space. Write whatever', '']
      ]},
      { type: 'note', text: "If gathering all that is going to take weeks, tell me now. I can start on structure and design with placeholders and drop the real content in later." }
    ]
  },

  /* A -------------------------------------------------------------- */
  {
    appendix: 'A',
    h: 'What I already have',
    intro: "Picked up from your flyers, so you don't have to type it out. Just flag anything wrong.",
    blocks: [
      { type: 'table',
        head: ['Item', 'What I have', 'Right?'],
        widths: [130, 285, 55],
        rows: [
          ['Legal name', 'BMG Engineering Limited', ''],
          ['RC number', '9085536', ''],
          ['Phone and WhatsApp', '0906 331 7044', ''],
          ['Colours', 'Deep navy, bright blue, white', ''],
          ['What you cover technically', 'HVAC design, load calculations, ducts, chilled water, AHUs, rooftop units, VRF and DX split systems, Revit and BIM, BOQs', ''],
          ['Software you use', 'Carrier HAP, Autodesk Revit', ''],
          ['Who you already deal with', 'Mechanical, MEP and project engineers, HVAC technicians and supervisors', ''],
          ['Founder photo', 'The person on your flyers is the founder, you confirmed that', '']
        ]
      }
    ]
  }
];
