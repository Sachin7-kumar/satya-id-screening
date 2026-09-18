/**
 * SATYA-ID: Pre-Loaded Forensic Test Suite & Document Synthesis
 * Generates high-fidelity realistic Indian identity documents dynamically
 * on an HTML5 canvas for reliable, zero-dependency offline hackathon demos.
 */

export const TestCases = [
  {
    id: 'case_aadhaar_clean',
    name: 'Case 1: Authentic Aadhaar Card (Clean Control)',
    badge: 'AUTHENTIC',
    badgeClass: 'badge-success',
    type: 'Aadhaar Card',
    expectedScore: 98,
    data: {
      fullName: 'Rajesh Kumar Sharma',
      gender: 'Male',
      dob: '14/05/1988',
      idNumber: '2384 9102 4856', // Mathematically Valid Verhoeff (D5 polynomial): c = 0
      address: 'H-42, Sector 14, Rohini, New Delhi - 110085',
      qrType: 'UIDAI_SECURE_SIGNED_V2',
      qrPayload: 'V2_UIDAI_PKI_SIGNED:a9f82c...valid_ecc_signature',
      isTampered: false,
      tamperType: 'NONE'
    },
    ocrLines: [
      { text: 'Government of India', fieldName: 'Header', boxes: [{x:100,y:20,w:12,h:14,strokeWidth:2.1}] },
      { text: 'Rajesh Kumar Sharma', fieldName: 'Full Name', boxes: [{x:150,y:120,w:10,h:13,strokeWidth:2.2},{x:162,y:120,w:10,h:13,strokeWidth:2.2},{x:174,y:120,w:10,h:13,strokeWidth:2.2}] },
      { text: 'DOB: 14/05/1988', fieldName: 'Date of Birth', boxes: [{x:150,y:150,w:11,h:13,strokeWidth:2.1},{x:162,y:150,w:11,h:13,strokeWidth:2.1},{x:174,y:150,w:11,h:13,strokeWidth:2.1}] },
      { text: '2384 9102 4856', fieldName: 'Aadhaar Number', boxes: [{x:180,y:230,w:14,h:18,strokeWidth:2.8},{x:195,y:230,w:14,h:18,strokeWidth:2.8},{x:210,y:230,w:14,h:18,strokeWidth:2.8}] }
    ],
    metadata: {
      isMorphed: false,
      morphScore: 12
    }
  },
  {
    id: 'case_aadhaar_forged',
    name: 'Case 2: Forged DOB & Address Aadhaar (Mewat Syndicate Modus)',
    badge: 'CRITICAL FORGERY',
    badgeClass: 'badge-danger',
    type: 'Aadhaar Card',
    expectedScore: 14,
    data: {
      fullName: 'Amit R. Verma',
      gender: 'Male',
      dob: '28/11/2001', // Tampered from 1982 to 2001
      idNumber: '2384 9102 4857', // Checksum altered! Verhoeff polynomial fails!
      address: 'Village Nuh, Mewat, Haryana - 122107',
      qrType: 'SPOOFED_PLAINTEXT',
      qrPayload: 'https://uidai-portal-update.me/user?id=238491024857',
      isTampered: true,
      tamperType: 'DOB_AND_CHECKSUM_MUTATION',
      tamperBox: { x: 140, y: 145, w: 170, h: 32 }
    },
    ocrLines: [
      { text: 'Government of India', fieldName: 'Header', boxes: [{x:100,y:20,w:12,h:14,strokeWidth:2.1}] },
      { text: 'Amit R. Verma', fieldName: 'Full Name', boxes: [{x:150,y:120,w:10,h:13,strokeWidth:2.2}] },
      { 
        text: 'DOB: 28/11/2001', 
        fieldName: 'Date of Birth', 
        detectedFont: 'Arial-BoldMT (Substituted)',
        boxes: [
          {x:150,y:150,w:11,h:13,strokeWidth:2.1},
          {x:162,y:153,w:11,h:15,strokeWidth:3.4}, // severe baseline jitter
          {x:175,y:148,w:11,h:12,strokeWidth:1.8}
        ] 
      },
      { text: '2384 9102 4857', fieldName: 'Aadhaar Number', boxes: [{x:180,y:230,w:14,h:18,strokeWidth:2.8}] }
    ],
    metadata: {
      isMorphed: false,
      morphScore: 35
    }
  },
  {
    id: 'case_passport_morph',
    name: 'Case 3: Morphed Facial Portrait Passport (Border e-Gate Evasion)',
    badge: 'BIOMETRIC ATTACK',
    badgeClass: 'badge-danger',
    type: 'Passport',
    expectedScore: 22,
    data: {
      fullName: 'Vikrant Singh',
      gender: 'Male',
      dob: '08/02/1991',
      idNumber: 'Z4829104',
      country: 'IND',
      mrzLine1: 'P<IND<<SINGH<<VIKRANT<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'Z4829104<9IND9102084M3009123<<<<<<<<<<<<<<8',
      qrType: 'ICAO_CHIP_HASH',
      isTampered: true,
      tamperType: 'FACE_MORPH_PRESENTATION_ATTACK',
      tamperBox: { x: 45, y: 80, w: 125, h: 160 }
    },
    ocrLines: [
      { text: 'REPUBLIC OF INDIA / PASSPORT', fieldName: 'Header', boxes: [{x:50,y:25,w:14,h:14,strokeWidth:2.3}] },
      { text: 'SINGH VIKRANT', fieldName: 'Full Name', boxes: [{x:190,y:90,w:12,h:14,strokeWidth:2.2}] },
      { text: 'P<IND<<SINGH<<VIKRANT', fieldName: 'MRZ Line 1', boxes: [{x:30,y:280,w:11,h:16,strokeWidth:2.4}] }
    ],
    metadata: {
      isMorphed: true,
      morphScore: 92,
      laplacianVariance: 38.2,
      frequencySmoothnessIndex: 0.91,
      seamDiscontinuity: 0.84
    }
  },
  {
    id: 'case_pan_synthetic',
    name: 'Case 4: Counterfeit PAN Card (Synthetic Loan Fraud Nexus)',
    badge: 'SYNTHETIC ID',
    badgeClass: 'badge-warning',
    type: 'PAN Card',
    expectedScore: 19,
    data: {
      fullName: 'Sanjay Roy',
      fatherName: 'Alok Roy',
      dob: '19/09/1985',
      idNumber: 'ABCPE1234F', // 4th 'P' (Person), but 5th 'E' mismatches surname 'Roy' (R)!
      isTampered: true,
      tamperType: 'PAN_SURNAME_MISMATCH_AND_SPLICE',
      tamperBox: { x: 340, y: 110, w: 140, h: 130 }
    },
    ocrLines: [
      { text: 'INCOME TAX DEPARTMENT', fieldName: 'Header', boxes: [{x:120,y:25,w:12,h:14,strokeWidth:2.4}] },
      { text: 'SANJAY ROY', fieldName: 'Cardholder Name', boxes: [{x:50,y:110,w:10,h:13,strokeWidth:2.2}] },
      { text: 'ABCPE1234F', fieldName: 'Permanent Account Number', boxes: [{x:50,y:190,w:14,h:18,strokeWidth:2.9}] }
    ],
    metadata: {
      isMorphed: false,
      morphScore: 40
    }
  },
  {
    id: 'case_voter_phishing',
    name: 'Case 5: Phishing QR Code Counterfeit Voter ID (EPIC Card)',
    badge: 'PHISHING QR',
    badgeClass: 'badge-warning',
    type: 'Voter ID (EPIC)',
    expectedScore: 28,
    data: {
      fullName: 'Sunita Devi',
      gender: 'Female',
      dob: '03/07/1979',
      idNumber: 'WB/24/182/902184',
      qrType: 'SPOOFED_UNAUTHENTICATED_URL',
      qrPayload: 'http://nvsp-voter-service.in/voter/details?epic=WB24182902184',
      isTampered: true,
      tamperType: 'MALICIOUS_QR_REDIRECT',
      tamperBox: { x: 380, y: 150, w: 100, h: 100 }
    },
    ocrLines: [
      { text: 'ELECTION COMMISSION OF INDIA', fieldName: 'Header', boxes: [{x:80,y:25,w:12,h:14,strokeWidth:2.4}] },
      { text: 'SUNITA DEVI', fieldName: 'Elector Name', boxes: [{x:160,y:110,w:10,h:13,strokeWidth:2.2}] },
      { text: 'WB/24/182/902184', fieldName: 'EPIC Number', boxes: [{x:160,y:80,w:12,h:15,strokeWidth:2.5}] }
    ],
    metadata: {
      isMorphed: false,
      morphScore: 20
    }
  },
  {
    id: 'case_no_data_given',
    name: 'Case 6: Missing / Unspecified Particulars (No Data Given)',
    badge: 'NO DATA GIVEN',
    badgeClass: 'badge-forged',
    type: 'Unclassified Document (No Data Given)',
    expectedScore: 18,
    data: {
      fullName: 'NOT PROVIDED / NO DATA GIVEN',
      gender: 'NOT SPECIFIED',
      dob: 'NOT SPECIFIED',
      idNumber: 'NOT PROVIDED',
      address: 'NOT SPECIFIED / JURISDICTION UNRECORDED',
      qrType: 'NO_PAYLOAD_DETECTED',
      qrPayload: 'NONE',
      fileName: 'unspecified_document_record.raw',
      fileSize: '0.0 KB (Metadata Stripped)',
      resolution: '650 × 410 px',
      isTampered: true,
      tamperType: 'DATA_DEFICIENCY_AND_BLANK_RECORD',
      tamperBox: { x: 180, y: 110, w: 280, h: 100 }
    },
    ocrLines: [
      { text: 'IDENTITY CARD - SPECIMEN', fieldName: 'Header', boxes: [{x:100,y:25,w:12,h:14,strokeWidth:2.4}] },
      { text: '[NAME NOT ENTERED]', fieldName: 'Cardholder Name', boxes: [{x:190,y:128,w:10,h:13,strokeWidth:2.2}] },
      { text: '[ID NUMBER BLANK]', fieldName: 'Identification Number', boxes: [{x:190,y:188,w:12,h:15,strokeWidth:2.5}] }
    ],
    metadata: {
      isMorphed: false,
      morphScore: 0
    }
  }
];

/**
 * Dynamically synthesizes high-resolution document imagery onto an HTML5 canvas.
 * Renders realistic government card layouts, security guilloche patterns,
 * typography, portrait boxes, and embedded visual artifacts.
 */
export function renderSyntheticDocument(testCase) {
  const canvas = document.createElement('canvas');
  canvas.width = 650;
  canvas.height = 410;
  const ctx = canvas.getContext('2d');

  const { type, data } = testCase;

  // Background base
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (type.includes('Unclassified') || testCase.id === 'case_no_data_given') {
    _renderNoDataLayout(ctx, testCase);
  } else if (type.includes('Aadhaar')) {
    _renderAadhaarLayout(ctx, testCase);
  } else if (type.includes('Passport')) {
    _renderPassportLayout(ctx, testCase);
  } else if (type.includes('PAN')) {
    _renderPANLayout(ctx, testCase);
  } else {
    _renderVoterIDLayout(ctx, testCase);
  }

  // If tampered, draw compression/splice artifact on canvas for ELA to detect!
  if (testCase.data.isTampered && testCase.data.tamperBox) {
    _applyTamperArtifact(ctx, testCase.data.tamperBox);
  }

  return canvas;
}

function _renderAadhaarLayout(ctx, testCase) {
  const { data } = testCase;

  // Tricolor Top Strip
  const grad = ctx.createLinearGradient(0, 0, 650, 0);
  grad.addColorStop(0, '#ff9933');
  grad.addColorStop(0.5, '#ffffff');
  grad.addColorStop(1, '#138808');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 650, 12);

  // Security micro-pattern lines
  ctx.strokeStyle = 'rgba(200, 210, 225, 0.4)';
  ctx.lineWidth = 1;
  for (let y = 30; y < 400; y += 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(200, y - 10, 400, y + 10, 650, y);
    ctx.stroke();
  }

  // Emblem & Header
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.fillText('GOVERNMENT OF INDIA', 230, 45);
  ctx.font = '12px "Inter", sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('Unique Identification Authority of India', 230, 65);

  // Ashoka Pillar representation
  ctx.fillStyle = '#334155';
  ctx.fillRect(40, 30, 26, 40);

  // Photo Box
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(40, 95, 110, 140);
  ctx.strokeStyle = '#94a3b8';
  ctx.strokeRect(40, 95, 110, 140);

  // Avatar icon representation
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(95, 145, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(95, 210, 45, 25, 0, Math.PI, 0);
  ctx.fill();

  // Text Fields
  ctx.fillStyle = '#0f172a';
  ctx.font = '600 17px "Inter", sans-serif';
  ctx.fillText(data.fullName, 175, 120);

  ctx.font = '14px "Inter", sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText(`DOB: ${data.dob}`, 175, 150);
  ctx.fillText(`Gender: ${data.gender}`, 175, 175);

  ctx.font = '12px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText(`Address: ${data.address.slice(0, 38)}`, 175, 205);
  ctx.fillText(data.address.slice(38, 75), 175, 222);

  // QR Code Area
  ctx.fillStyle = '#000000';
  ctx.fillRect(490, 105, 120, 120);
  // White QR alignment patterns
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(500, 115, 30, 30);
  ctx.fillRect(570, 115, 30, 30);
  ctx.fillRect(500, 185, 30, 30);
  ctx.fillStyle = '#000000';
  ctx.fillRect(508, 123, 14, 14);
  ctx.fillRect(578, 123, 14, 14);
  ctx.fillRect(508, 193, 14, 14);

  // Big Aadhaar Number Strip
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 270, 650, 75);
  ctx.fillStyle = '#b91c1c';
  ctx.font = 'bold 26px "Courier New", monospace';
  ctx.letterSpacing = '4px';
  ctx.fillText(data.idNumber, 170, 318);

  // Bottom footer slogan
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillText('MERA AADHAAR, MERI PEHCHAN', 215, 380);

  // Red strip bottom
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(0, 398, 650, 12);
}

function _renderPassportLayout(ctx, testCase) {
  const { data } = testCase;
  ctx.fillStyle = '#fffdfa';
  ctx.fillRect(0, 0, 650, 410);

  // Gold header bar
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, 650, 35);
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText('REPUBLIC OF INDIA / PASSPORT', 210, 23);

  // Photo
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(35, 60, 130, 170);
  // Portrait representation
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(100, 125, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(100, 205, 52, 32, 0, Math.PI, 0);
  ctx.fill();

  // If morphed, add subtle facial seam lines
  if (testCase.metadata && testCase.metadata.isMorphed) {
    ctx.strokeStyle = 'rgba(255, 0, 80, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(100, 125, 36, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Passport Fields
  ctx.fillStyle = '#1e293b';
  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Type / Code / Passport No.', 190, 70);
  ctx.font = 'bold 14px "Courier New", monospace';
  ctx.fillText(`P   IND   ${data.idNumber}`, 190, 88);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Given Name(s) & Surname', 190, 115);
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText(data.fullName, 190, 133);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Nationality / Sex / Date of Birth', 190, 160);
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.fillText(`INDIAN   ${data.gender}   ${data.dob}`, 190, 178);

  // MRZ Machine Readable Zone
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, 270, 650, 140);
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 17px "Courier New", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText(data.mrzLine1, 20, 320);
  ctx.fillText(data.mrzLine2, 20, 360);
}

function _renderPANLayout(ctx, testCase) {
  const { data } = testCase;
  // Income tax blue gradient
  const grad = ctx.createLinearGradient(0, 0, 650, 410);
  grad.addColorStop(0, '#e0f2fe');
  grad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 650, 410);

  // Header
  ctx.fillStyle = '#0369a1';
  ctx.font = 'bold 15px "Inter", sans-serif';
  ctx.fillText('INCOME TAX DEPARTMENT', 220, 35);
  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('GOVT. OF INDIA', 280, 52);

  // Photo
  ctx.fillStyle = '#64748b';
  ctx.fillRect(40, 80, 115, 145);
  ctx.strokeStyle = '#0284c7';
  ctx.strokeRect(40, 80, 115, 145);

  // Avatar
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.arc(97, 135, 30, 0, Math.PI * 2);
  ctx.fill();

  // Signature box
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(40, 245, 115, 45);
  ctx.strokeStyle = '#94a3b8';
  ctx.strokeRect(40, 245, 115, 45);
  ctx.fillStyle = '#000000';
  ctx.font = 'italic 16px cursive';
  ctx.fillText('Sanjay Roy', 55, 275);

  // PAN details
  ctx.fillStyle = '#0c4a6e';
  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Name', 185, 105);
  ctx.font = 'bold 16px "Inter", sans-serif';
  ctx.fillText(data.fullName, 185, 125);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText("Father's Name", 185, 155);
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText(data.fatherName, 185, 175);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillText('Date of Birth', 185, 205);
  ctx.font = 'bold 14px "Inter", sans-serif';
  ctx.fillText(data.dob, 185, 225);

  // Permanent Account Number Box
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(180, 260, 310, 50);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Courier New", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText(data.idNumber, 215, 294);

  // Hologram representation
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(520, 120, 80, 90);
  ctx.fillStyle = '#d97706';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('ITD HOLOGRAM', 525, 170);
}

function _renderVoterIDLayout(ctx, testCase) {
  const { data } = testCase;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 650, 410);

  ctx.fillStyle = '#047857';
  ctx.fillRect(0, 0, 650, 40);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "Inter", sans-serif';
  ctx.fillText('ELECTION COMMISSION OF INDIA / VOTER IDENTITY CARD', 100, 26);

  // Photo
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(40, 75, 110, 135);
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(95, 125, 26, 0, Math.PI * 2);
  ctx.fill();

  // EPIC No
  ctx.fillStyle = '#065f46';
  ctx.font = 'bold 18px "Courier New", monospace';
  ctx.fillText(data.idNumber, 175, 85);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText("Elector's Name", 175, 120);
  ctx.font = 'bold 15px "Inter", sans-serif';
  ctx.fillStyle = '#111827';
  ctx.fillText(data.fullName, 175, 140);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText("Gender / DOB", 175, 170);
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.fillStyle = '#111827';
  ctx.fillText(`${data.gender} / ${data.dob}`, 175, 190);

  // QR Code
  ctx.fillStyle = '#000000';
  ctx.fillRect(480, 80, 120, 120);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(490, 90, 30, 30);
  ctx.fillRect(560, 90, 30, 30);
  ctx.fillRect(490, 160, 30, 30);
}

function _renderNoDataLayout(ctx, testCase) {
  const { data } = testCase;
  // Canvas base
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 650, 410);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 8, 634, 394);

  // Top header strip
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(8, 8, 634, 45);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "Inter", sans-serif';
  ctx.fillText('IDENTITY DOCUMENT EVIDENCE RECORD (DATA NOT GIVEN)', 25, 36);

  // Watermark
  ctx.save();
  ctx.translate(325, 230);
  ctx.rotate(-Math.PI / 9);
  ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
  ctx.font = '900 32px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PARTICULARS NOT INSCRIBED', 0, 0);
  ctx.restore();

  // Empty Photo Frame
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(35, 75, 120, 150);
  ctx.strokeStyle = '#94a3b8';
  ctx.strokeRect(35, 75, 120, 150);
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 11px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('[PHOTO NOT GIVEN]', 95, 155);
  ctx.textAlign = 'left';

  // Field Placeholders
  ctx.font = '11px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Cardholder Full Name:', 180, 100);
  ctx.font = 'bold 16px "Courier New", monospace';
  ctx.fillStyle = '#b91c1c';
  ctx.fillText(data.fullName || 'NOT PROVIDED / NO DATA GIVEN', 180, 122);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Identification / Card Number:', 180, 160);
  ctx.font = 'bold 16px "Courier New", monospace';
  ctx.fillStyle = '#b91c1c';
  ctx.fillText(data.idNumber || 'NOT PROVIDED', 180, 182);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Date of Birth & Gender:', 180, 220);
  ctx.font = 'bold 13px "Inter", sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText(`${data.dob || 'NOT SPECIFIED'} • ${data.gender || 'NOT SPECIFIED'}`, 180, 240);

  ctx.font = '11px "Inter", sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Jurisdiction / Registered Address:', 180, 275);
  ctx.font = 'bold 12px "Inter", sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText(data.address || 'NOT SPECIFIED / JURISDICTION UNRECORDED', 180, 295);

  // QR Code placeholder
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(490, 80, 120, 120);
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#94a3b8';
  ctx.strokeRect(490, 80, 120, 120);
  ctx.setLineDash([]);
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 11px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('[NO QR PAYLOAD]', 550, 145);
  ctx.textAlign = 'left';
}

function _applyTamperArtifact(ctx, box) {
  // Inject localized compression and high-frequency noise difference
  // This simulates the exact pixel artifact left by Photoshop / inpainting tools!
  const imgData = ctx.getImageData(box.x, box.y, box.w, box.h);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    // Add subtle quantization noise offset
    const noise = (Math.random() - 0.5) * 28;
    d[i] = Math.min(255, Math.max(0, d[i] + noise));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise));
  }
  ctx.putImageData(imgData, box.x, box.y);
}
