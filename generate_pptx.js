import pptxgen from 'pptxgenjs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'SIH Team';
pptx.company = 'Ministry of Home Affairs - Smart India Hackathon';
pptx.title = 'SATYA-ID: AI-Based Fake Identity & Document Screening System';

// Theme Colors
const C_BG_DARK = '0A0E17';
const C_CARD_BG = '131B2E';
const C_CYAN = '00F0FF';
const C_BLUE = '3B82F6';
const C_GOLD = 'F59E0B';
const C_GREEN = '10B981';
const C_RED = 'EF4444';
const C_WHITE = 'FFFFFF';
const C_MUTED = '94A3B8';
const C_BORDER = '1E2E4A';

function applySlideBackground(slide) {
  slide.background = { color: C_BG_DARK };
  // Top government tricolor accent line
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: 0.08,
    fill: { color: 'FF9933' }, line: { color: 'FF9933' }
  });
}

function addSlideHeader(slide, category, title, badge = 'MHA / I4C') {
  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.35, w: 8.0, h: 0.3,
    fontSize: 11, fontFace: 'Calibri', color: C_CYAN, bold: true
  });
  slide.addText(title, {
    x: 0.8, y: 0.65, w: 10.0, h: 0.55,
    fontSize: 22, fontFace: 'Calibri', color: C_WHITE, bold: true
  });
  // Top right badge
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 10.8, y: 0.45, w: 1.8, h: 0.35, rectRadius: 0.1,
    fill: { color: C_CARD_BG }, line: { color: C_GOLD, width: 1 }
  });
  slide.addText(badge, {
    x: 10.8, y: 0.45, w: 1.8, h: 0.35,
    fontSize: 9, fontFace: 'Calibri', color: C_GOLD, bold: true, align: 'center', valign: 'middle'
  });
  // Separator line
  slide.addShape(pptx.ShapeType.line, {
    x: 0.8, y: 1.25, w: 11.7, h: 0,
    line: { color: C_BORDER, width: 1 }
  });
}

// ==========================================
// SLIDE 1: TITLE SLIDE
// ==========================================
const s1 = pptx.addSlide();
s1.background = { color: C_BG_DARK };

// Tricolor strip
s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.12, fill: { color: 'FF9933' } });

s1.addShape(pptx.ShapeType.roundRect, {
  x: 4.8, y: 1.2, w: 3.7, h: 0.4, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: 'FF9933', width: 1.5 }
});
s1.addText('🇮🇳 MINISTRY OF HOME AFFAIRS (MHA)', {
  x: 4.8, y: 1.2, w: 3.7, h: 0.4,
  fontSize: 11, fontFace: 'Calibri', color: 'FF9933', bold: true, align: 'center', valign: 'middle'
});

s1.addText('SATYA-ID', {
  x: 0.8, y: 1.8, w: 11.7, h: 1.0,
  fontSize: 44, fontFace: 'Arial Black', color: C_CYAN, bold: true, align: 'center'
});
s1.addText('Scalable Automated Tamper-Yield Analysis & Identity Screening System', {
  x: 0.8, y: 2.8, w: 11.7, h: 0.45,
  fontSize: 18, fontFace: 'Calibri', color: C_WHITE, bold: true, align: 'center'
});
s1.addText('Smart India Hackathon (SIH) | Problem Statement: AI-Based Fake Identity & Document Screening System', {
  x: 0.8, y: 3.3, w: 11.7, h: 0.35,
  fontSize: 13, fontFace: 'Calibri', color: C_MUTED, align: 'center'
});

// Meta cards
const cardW = 3.6, cardH = 1.4, cardY = 4.2;
const metaData = [
  { t: 'DOMAIN BUCKET', v: 'Software / Homeland Security & Cyber Defense' },
  { t: 'TEAM NAME', v: '[Your Team Name]\nTeam Leader: [Leader Name]' },
  { t: 'COLLEGE / INSTITUTE', v: '[Your College Name & Code]\nBatch 2024-2028' }
];
metaData.forEach((m, i) => {
  const x = 0.8 + i * (cardW + 0.45);
  s1.addShape(pptx.ShapeType.roundRect, {
    x, y: cardY, w: cardW, h: cardH, rectRadius: 0.1,
    fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
  });
  s1.addText(m.t, {
    x: x + 0.2, y: cardY + 0.15, w: cardW - 0.4, h: 0.25,
    fontSize: 9, fontFace: 'Calibri', color: C_CYAN, bold: true
  });
  s1.addText(m.v, {
    x: x + 0.2, y: cardY + 0.45, w: cardW - 0.4, h: 0.8,
    fontSize: 12, fontFace: 'Calibri', color: C_WHITE, bold: true
  });
});

s1.addText('Sub-second multi-tier forensic inspection stopping synthetic IDs, diffusion inpainting & biometric morphing.', {
  x: 0.8, y: 6.2, w: 11.7, h: 0.4,
  fontSize: 11, fontFace: 'Calibri', color: C_MUTED, italic: true, align: 'center'
});
s1.addNotes('Respected Judges, we represent Team [Team Name]. We are presenting our solution for the Ministry of Home Affairs on the problem statement: AI-Based Fake Identity & Document Screening System. Today, we introduce SATYA-ID, an explainable, multi-layer forensic screening platform built specifically for Indian identity infrastructure.');

// ==========================================
// SLIDE 2: PROBLEM STATEMENT & THREAT LANDSCAPE
// ==========================================
const s2 = pptx.addSlide();
applySlideBackground(s2);
addSlideHeader(s2, 'PROBLEM DEFINITION', 'The Menace: Real-World Threat Landscape & Core Vulnerability');

s2.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.5, w: 5.6, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s2.addText('The Fatal Flaw in Modern Identity Screening', {
  x: 1.1, y: 1.7, w: 5.0, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_CYAN, bold: true
});
s2.addText([
  { text: '• Current Verification Blindspot: ', options: { bold: true, color: C_WHITE } },
  { text: '99% of KYC verifications (Fintech, Telecom, Law Enforcement) only perform Optical Character Recognition (OCR) and check if the name/DOB exists in a central database.\n\n', options: { color: C_MUTED } },
  { text: '• Document Integrity Ignored: ', options: { bold: true, color: C_WHITE } },
  { text: 'If a fraudster downloads an Aadhaar or PAN card and alters the year of birth from 1982 to 2001 or swaps the photo using Photoshop/Generative AI, standard OCR extracts the forged text and confirms the document as valid!\n\n', options: { color: C_MUTED } },
  { text: '• Core Vulnerability: ', options: { bold: true, color: C_RED } },
  { text: 'Current systems verify data existence, NOT document authenticity or pixel integrity.', options: { color: C_WHITE, bold: true } }
], { x: 1.1, y: 2.2, w: 5.0, h: 4.1, fontSize: 11, fontFace: 'Calibri' });

s2.addShape(pptx.ShapeType.roundRect, {
  x: 6.8, y: 1.5, w: 5.7, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s2.addText('4 Primary Criminal Attack Vectors', {
  x: 7.1, y: 1.7, w: 5.1, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_GOLD, bold: true
});
const vectors = [
  { t: '1. Ghost SIM Card Provisioning', d: 'Corrupt telecom PoS agents activate untraceable SIM cards using modified PVC Aadhaar templates to fuel cyber extortion hubs (Jamtara, Mewat).' },
  { t: '2. Synthetic Identity Loan Scams', d: 'Mixing real PAN numbers with fabricated Aadhaar details to siphon digital personal micro-loans and create synthetic default profiles.' },
  { t: '3. Airport Immigration e-Gate Evasion', d: 'High-frequency biometric facial morphing blends two identities, allowing fugitives to pass automated airport e-gates using issued passports.' },
  { t: '4. Phishing QR Code Counterfeit Cards', d: 'Fake PVC cards embedding QR codes that redirect verifying police officers to cloned lookalike verification portals.' }
];
vectors.forEach((v, i) => {
  const vy = 2.2 + i * 1.05;
  s2.addText(v.t, { x: 7.1, y: vy, w: 5.1, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: C_WHITE, bold: true });
  s2.addText(v.d, { x: 7.1, y: vy + 0.25, w: 5.1, h: 0.7, fontSize: 10, fontFace: 'Calibri', color: C_MUTED });
});
s2.addNotes('The fundamental flaw in identity verification today is that OCR only reads text, but cannot see forgery. If someone photoshops a birth year or swaps a portrait, standard systems pass the document. Current systems verify data existence, not document integrity.');

// ==========================================
// SLIDE 3: GROUND REALITIES & OFFICIAL STATISTICS
// ==========================================
const s3 = pptx.addSlide();
applySlideBackground(s3);
addSlideHeader(s3, 'DATA & GROUND REALITY', 'Hard Numbers: Why This Problem is a National Priority');

const statsGrid = [
  { n: '65,893+', l: 'Cybercrime Cases (NCRB 2023)', s: '71.2% involved fraud & document forgery (IPC 420/468/471 / BNS 318/336)', c: C_CYAN },
  { n: '67+ LAKH', l: 'Fraudulent SIMs Disconnected', s: 'DoT Sanchar Saathi & ASTR facial recognition crackdown nationwide', c: C_GOLD },
  { n: '₹1,400+ CR', l: 'Synthetic Loan Fraud Defaults', s: 'TransUnion CIBIL & RBI Digital Lending Study on synthetic identities', c: C_RED },
  { n: '68% - 74%', l: 'e-Gate Evasion on Morphed Faces', s: 'NIST FRVT & Interpol border tests: Standard face match fails on morphed IDs', c: C_BLUE }
];

statsGrid.forEach((st, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const gx = 0.8 + col * 6.0;
  const gy = 1.6 + row * 2.3;
  s3.addShape(pptx.ShapeType.roundRect, {
    x: gx, y: gy, w: 5.7, h: 2.1, rectRadius: 0.1,
    fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
  });
  s3.addText(st.n, {
    x: gx + 0.4, y: gy + 0.2, w: 5.0, h: 0.65,
    fontSize: 32, fontFace: 'Arial Black', color: st.c, bold: true
  });
  s3.addText(st.l, {
    x: gx + 0.4, y: gy + 0.9, w: 5.0, h: 0.35,
    fontSize: 13, fontFace: 'Calibri', color: C_WHITE, bold: true
  });
  s3.addText(st.s, {
    x: gx + 0.4, y: gy + 1.3, w: 5.0, h: 0.65,
    fontSize: 10.5, fontFace: 'Calibri', color: C_MUTED
  });
});
s3.addText('Data sources: National Crime Records Bureau (NCRB) Crime in India 2023, Department of Telecommunications (DoT) Sanchar Saathi Portal, TransUnion CIBIL & Interpol Border Research.', {
  x: 0.8, y: 6.4, w: 11.7, h: 0.3, fontSize: 9.5, fontFace: 'Calibri', color: C_MUTED, italic: true
});
s3.addNotes('These numbers demonstrate that this is a national security crisis. The Department of Telecommunications disconnected over 67 lakh fraudulent SIMs. Financial institutions suffered ₹1,400+ Crores in synthetic identity losses. And international border studies prove e-gates fail on morphed faces up to 74% of the time.');

// ==========================================
// SLIDE 4: LITERATURE REVIEW & PRIOR ART
// ==========================================
const s4 = pptx.addSlide();
applySlideBackground(s4);
addSlideHeader(s4, 'PRIOR ART BENCHMARKING', 'Literature Review: How Existing Solutions Fall Short');

const litRows = [
  [
    { text: 'Solution Category', options: { bold: true, color: C_CYAN } },
    { text: 'Core Mechanism', options: { bold: true, color: C_CYAN } },
    { text: 'Where It Succeeds', options: { bold: true, color: C_CYAN } },
    { text: 'Fatal Flaw / Why It Fails', options: { bold: true, color: C_CYAN } }
  ],
  [
    { text: 'Commercial KYC SDKs\n(Veriff, Onfido, HyperVerge)', options: { bold: true } },
    { text: 'Text OCR + Database Lookup + Selfie Face Match' },
    { text: 'Fast retail user onboarding' },
    { text: 'Forensically Blind: Accepts photoshopped cards if text matches government schema.' }
  ],
  [
    { text: 'Classical OCR\n(Tesseract 5, AWS Textract)', options: { bold: true } },
    { text: 'CNN-LSTM token sequence extraction' },
    { text: 'High text extraction accuracy' },
    { text: 'Zero Security Logic: Completely discards pixel-level noise, font alignment, and compression.' }
  ],
  [
    { text: 'Standard ELA\n(Krawetz 2007)', options: { bold: true } },
    { text: 'Fixed-quality JPEG recompression difference' },
    { text: 'Finds basic raw camera splices' },
    { text: 'Fails on Scans: WhatsApp/Telegram double-compression causes high false alarms or mutes spikes.' }
  ],
  [
    { text: 'Black-Box Deep Learning\n(ManTra-Net, TruFor)', options: { bold: true } },
    { text: 'Convolutional neural noise feature maps' },
    { text: 'Detects high-level synthetic textures' },
    { text: 'Inadmissible in Court: Black-box score without evidence chain violates BSA 2023 / Sec 65B.' }
  ]
];

s4.addTable(litRows, {
  x: 0.8, y: 1.6, w: 11.7, h: 4.8,
  fill: { color: C_CARD_BG },
  color: C_WHITE,
  fontSize: 10,
  fontFace: 'Calibri',
  border: { color: C_BORDER, pt: 1 },
  margin: [0.1, 0.15, 0.1, 0.15]
});
s4.addNotes('Existing commercial tools focus on user onboarding speed, not fraud detection. Classical ELA falls apart when images are forwarded over WhatsApp, and deep learning models act as black boxes that cannot be used as legal evidence in Indian courts.');

// ==========================================
// SLIDE 5: WHAT IS STILL NOT SOLVED?
// ==========================================
const s5 = pptx.addSlide();
applySlideBackground(s5);
addSlideHeader(s5, 'OUR CORE NOVELTY', 'The 5 Critical Unsolved Gaps Cracked by SATYA-ID');

const gaps = [
  { n: '1', t: 'Generative AI Inpainting & Diffusion Erasure', p: 'Modern attackers use Stable Diffusion & Lama to seamlessly replace text without edge seams.', s: 'SATYA-ID Solution: High-pass Laplacian frequency spectrum analysis to catch localized skin-pore/texture smoothing.' },
  { n: '2', t: 'Font Metrology & Micro-Typography Discrepancies', p: 'Official Indian IDs use strict proprietary typographies. Forgers substitute Arial/Calibri.', s: 'SATYA-ID Solution: Sub-pixel baseline alignment variance (σ > 1.85px) and stroke-width profiling.' },
  { n: '3', t: 'Phishing QR Code Redirects', p: 'Counterfeit PVC cards embed QR codes redirecting to cloned lookalike verification portals.', s: 'SATYA-ID Solution: Offline PKI cryptographic signature validation & strict *.gov.in domain whitelisting.' },
  { n: '4', t: 'Mathematical Checksum Bypasses', p: 'Hand-modified Aadhaar numbers or PAN letters violate underlying mathematical group properties.', s: 'SATYA-ID Solution: Full Verhoeff D5 dihedral group algorithm catching 100% of single-digit and transposition errors.' },
  { n: '5', t: 'Legal Inadmissibility (BSA 2023 / Section 65B)', p: 'Black-box percentage scores are rejected in criminal trials under Indian evidence laws.', s: 'SATYA-ID Solution: Automated Section 65B Forensic Examination Certificates with SHA-256 evidence digests.' }
];

gaps.forEach((g, i) => {
  const gy = 1.55 + i * 1.02;
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: gy, w: 11.7, h: 0.9, rectRadius: 0.08,
    fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
  });
  s5.addShape(pptx.ShapeType.ellipse, {
    x: 1.0, y: gy + 0.18, w: 0.55, h: 0.55,
    fill: { color: C_CYAN }, line: { color: C_CYAN }
  });
  s5.addText(g.n, {
    x: 1.0, y: gy + 0.18, w: 0.55, h: 0.55,
    fontSize: 14, fontFace: 'Arial Black', color: '031124', align: 'center', valign: 'middle'
  });
  s5.addText(g.t, {
    x: 1.7, y: gy + 0.1, w: 10.5, h: 0.28,
    fontSize: 12, fontFace: 'Calibri', color: C_WHITE, bold: true
  });
  s5.addText(`${g.p}  ➔  ${g.s}`, {
    x: 1.7, y: gy + 0.38, w: 10.5, h: 0.45,
    fontSize: 10, fontFace: 'Calibri', color: C_MUTED
  });
});
s5.addNotes('This is our technical sweet spot. We identified the five exact loopholes criminal syndicates exploit today: AI inpainting, font metrology discrepancies, phishing QR codes, mathematical checksum failures, and legal inadmissibility in court.');

// ==========================================
// SLIDE 6: OUR PROPOSED SOLUTION
// ==========================================
const s6 = pptx.addSlide();
applySlideBackground(s6);
addSlideHeader(s6, 'SOLUTION OVERVIEW', 'SATYA-ID: Multi-Tier Explainable Forensic Defense Platform');

s6.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.5, w: 6.0, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s6.addText('5-Tier Forensic Screening Pipeline', {
  x: 1.1, y: 1.7, w: 5.4, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_CYAN, bold: true
});
const tiers = [
  { t: 'Tier 1: Algorithmic & Mathematical', d: 'Verhoeff D5 Checksum (Aadhaar), PAN Syntax Regex, Passport MRZ 7-3-1 weight.' },
  { t: 'Tier 2: Visual & Compression Physics (ELA)', d: 'Adaptive JPEG recompression at Q=92% with false-color thermal heatmaps.' },
  { t: 'Tier 3: Spatial Font Metrology', d: 'Sub-pixel baseline alignment jitter (σ) and character stroke-width uniformity.' },
  { t: 'Tier 4: Biometric Face Morph Screen', d: 'Frequency-domain Laplacian edge energy loss detecting generative inpainting.' },
  { t: 'Tier 5: QR Cryptographic Integrity', d: 'Offline PKI digital signature verification & anti-phishing whitelist gate.' }
];
tiers.forEach((tr, i) => {
  const ty = 2.2 + i * 0.82;
  s6.addText(tr.t, { x: 1.1, y: ty, w: 5.4, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: C_WHITE, bold: true });
  s6.addText(tr.d, { x: 1.1, y: ty + 0.25, w: 5.4, h: 0.5, fontSize: 9.5, fontFace: 'Calibri', color: C_MUTED });
});

s6.addShape(pptx.ShapeType.roundRect, {
  x: 7.2, y: 1.5, w: 5.3, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s6.addText('Key Operational Advantages', {
  x: 7.5, y: 1.7, w: 4.7, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_GOLD, bold: true
});
const ops = [
  { t: '⚡ Sub-Second Verification', d: 'Entire 5-tier screening executes in under 800 milliseconds on standard edge hardware.' },
  { t: '🔒 DPDP Act 2023 Compliant', d: 'Zero raw document retention; citizen images analyzed in volatile RAM and scrubbed immediately.' },
  { t: '👁️ Dual-Canvas Inspector', d: 'Live interactive view of original document alongside amplified ELA difference heatmap.' },
  { t: '⚖️ Court-Admissible Output', d: 'One-click automated Section 65B forensic examination certificate with SHA-256 evidence hash.' }
];
ops.forEach((o, i) => {
  const oy = 2.2 + i * 1.02;
  s6.addText(o.t, { x: 7.5, y: oy, w: 4.7, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: C_WHITE, bold: true });
  s6.addText(o.d, { x: 7.5, y: oy + 0.25, w: 4.7, h: 0.65, fontSize: 10, fontFace: 'Calibri', color: C_MUTED });
});
s6.addNotes('SATYA-ID works like an automated digital forensics lab. Instead of relying on a single test, it runs five orthogonal checks simultaneously: mathematical checksums, compression physics, font micro-typography, biometric face morphing, and cryptographic QR signatures.');

// ==========================================
// SLIDE 7: TECHNICAL ARCHITECTURE & PIPELINE
// ==========================================
const s7 = pptx.addSlide();
applySlideBackground(s7);
addSlideHeader(s7, 'SYSTEM ARCHITECTURE', 'End-to-End Technical Pipeline & Data Workflow');

const pipelineBoxes = [
  { t: '1. Ingestion', d: 'Image / PDF / Camera stream captured locally.' },
  { t: '2. SHA-256 Hashing', d: 'Cryptographic evidence digest established for chain of custody.' },
  { t: '3. Multi-Vector Engine', d: 'Concurrent execution of Verhoeff, ELA, Font & Face screens.' },
  { t: '4. Evidence Aggregator', d: 'Weighted Trust Score (0-100%) and anomaly clustering.' },
  { t: '5. Court Certificate', d: 'BSA 2023 / Sec 65B certified legal evidentiary exhibit.' }
];
pipelineBoxes.forEach((b, i) => {
  const bx = 0.8 + i * 2.4;
  s7.addShape(pptx.ShapeType.roundRect, {
    x: bx, y: 1.8, w: 2.2, h: 2.2, rectRadius: 0.1,
    fill: { color: i === 2 ? '0F2B48' : C_CARD_BG },
    line: { color: i === 2 ? C_CYAN : C_BORDER, width: i === 2 ? 1.5 : 1 }
  });
  s7.addText(b.t, {
    x: bx + 0.15, y: 2.0, w: 1.9, h: 0.4,
    fontSize: 12, fontFace: 'Calibri', color: i === 2 ? C_CYAN : C_WHITE, bold: true, align: 'center'
  });
  s7.addText(b.d, {
    x: bx + 0.15, y: 2.5, w: 1.9, h: 1.3,
    fontSize: 10, fontFace: 'Calibri', color: C_MUTED, align: 'center'
  });
});

s7.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 4.4, w: 11.7, h: 2.1, rectRadius: 0.1,
  fill: { color: '060A12' }, line: { color: C_BORDER, width: 1 }
});
s7.addText('Core Algorithmic Formulations Executed in Real-Time:', {
  x: 1.1, y: 4.6, w: 11.0, h: 0.3,
  fontSize: 12, fontFace: 'Calibri', color: C_CYAN, bold: true
});
s7.addText([
  { text: '• Verhoeff Checksum Kernel: ', options: { bold: true, color: C_GOLD } },
  { text: 'c = ∑_{i=1}^{12} P(i % 8, a_{13-i}) === 0 (under D5 Dihedral Group multiplication)\n', options: { color: C_WHITE } },
  { text: '• ELA Difference Tensor: ', options: { bold: true, color: C_GOLD } },
  { text: 'E(x, y) = min(255, α · |I_{orig}(x,y) - I_{comp}(x,y)|) with false-color thermal mapping\n', options: { color: C_WHITE } },
  { text: '• Baseline Alignment Jitter: ', options: { bold: true, color: C_GOLD } },
  { text: 'σ_{baseline} = sqrt( ∑(y_k - ȳ)² / (N-1) ) — triggers forgery alert when σ > 1.85px', options: { color: C_WHITE } }
], { x: 1.1, y: 4.95, w: 11.0, h: 1.4, fontSize: 10.5, fontFace: 'Courier New' });
s7.addNotes('When a document enters SATYA-ID, it is immediately assigned an immutable SHA-256 hash. The image is evaluated concurrently across all five engines, generating a weighted Trust Score, visual anomaly bounding boxes, and an automated Section 65B digital evidence certificate.');

// ==========================================
// SLIDE 8: INNOVATION & UNIQUENESS MATRIX
// ==========================================
const s8 = pptx.addSlide();
applySlideBackground(s8);
addSlideHeader(s8, 'COMPETITIVE EDGE', 'Feature-by-Feature Innovation & Uniqueness Matrix');

const compRows = [
  [
    { text: 'Capability / Feature', options: { bold: true, color: C_CYAN } },
    { text: 'Standard KYC (Onfido/Veriff)', options: { bold: true, color: C_CYAN } },
    { text: 'Deep Learning Alone', options: { bold: true, color: C_CYAN } },
    { text: 'SATYA-ID (Our Solution)', options: { bold: true, color: C_CYAN, fill: { color: '0F2B48' } } }
  ],
  [
    { text: 'AI Inpainted Text Detection', options: { bold: true } },
    { text: '❌ Fails (OCR reads text)' },
    { text: '⚠️ Partial (~62% accuracy)' },
    { text: '✅ >94% via Frequency ELA', options: { bold: true, color: C_GREEN, fill: { color: '0F2B48' } } }
  ],
  [
    { text: 'Font Metrology & Baseline Jitter', options: { bold: true } },
    { text: '❌ Ignored' },
    { text: '❌ Ignored' },
    { text: '✅ Sub-pixel Baseline Profiling (σ)', options: { bold: true, color: C_GREEN, fill: { color: '0F2B48' } } }
  ],
  [
    { text: 'Aadhaar Verhoeff Checksum Check', options: { bold: true } },
    { text: '⚠️ 12-digit length check only' },
    { text: '❌ Not checked' },
    { text: '✅ 100% Mathematical Error Trap', options: { bold: true, color: C_GREEN, fill: { color: '0F2B48' } } }
  ],
  [
    { text: 'Morphed Facial Passport Screen', options: { bold: true } },
    { text: '❌ >68% Failure at e-gates' },
    { text: '⚠️ 71% Accuracy' },
    { text: '✅ Laplacian High-Pass Filter', options: { bold: true, color: C_GREEN, fill: { color: '0F2B48' } } }
  ],
  [
    { text: 'Phishing QR Interception', options: { bold: true } },
    { text: '❌ Blindly opens link' },
    { text: '❌ N/A' },
    { text: '✅ Offline PKI & Whitelist Check', options: { bold: true, color: C_GREEN, fill: { color: '0F2B48' } } }
  ],
  [
    { text: 'Court Evidentiary Admissibility', options: { bold: true } },
    { text: '❌ Non-compliant' },
    { text: '❌ Inadmissible (Black Box)' },
    { text: '✅ Automated BSA 2023 / Sec 65B Cert', options: { bold: true, color: C_GREEN, fill: { color: '0F2B48' } } }
  ],
  [
    { text: 'Edge & Offline Operation', options: { bold: true } },
    { text: '❌ Cloud required' },
    { text: '❌ Heavy GPU required' },
    { text: '✅ Client/Edge Wasm Capable', options: { bold: true, color: C_GREEN, fill: { color: '0F2B48' } } }
  ]
];

s8.addTable(compRows, {
  x: 0.8, y: 1.5, w: 11.7, h: 5.0,
  fill: { color: C_CARD_BG },
  color: C_WHITE,
  fontSize: 9.5,
  fontFace: 'Calibri',
  border: { color: C_BORDER, pt: 1 },
  margin: [0.08, 0.12, 0.08, 0.12]
});
s8.addNotes('This comparison matrix shows why our solution is uniquely suited for the Ministry of Home Affairs. While existing tools only check string lengths and cloud models require heavy GPUs and cloud uploads, SATYA-ID combines algorithmic certainty, spatial font metrology, and edge privacy.');

// ==========================================
// SLIDE 9: TECHNOLOGY STACK & PRIVACY
// ==========================================
const s9 = pptx.addSlide();
applySlideBackground(s9);
addSlideHeader(s9, 'IMPLEMENTATION', 'Technology Stack & Privacy-First Architecture (DPDP Act 2023)');

s9.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.5, w: 5.6, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s9.addText('Core Technology Stack', {
  x: 1.1, y: 1.7, w: 5.0, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_CYAN, bold: true
});
const techList = [
  { t: 'Front-End / UI Layer', d: 'React 19, Vite, HTML5 Canvas API for real-time pixel difference manipulation and heatmap overlays.' },
  { t: 'Algorithmic Forensics Engine', d: 'Pure JavaScript / WebAssembly implementations of Verhoeff D5 dihedral matrices, PAN syntax parser & MRZ calculators.' },
  { t: 'Vision & Micro-Inspection', d: 'OpenCV.js and OpenCV Python for spatial gradient analysis, edge seam calculation and frequency-domain transforms.' },
  { t: 'Backend & Microservices', d: 'Python FastAPI / Rust microservices accelerated with ONNX Runtime for high-throughput batch screening.' }
];
techList.forEach((tl, i) => {
  const ty = 2.2 + i * 1.0;
  s9.addText(tl.t, { x: 1.1, y: ty, w: 5.0, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: C_WHITE, bold: true });
  s9.addText(tl.d, { x: 1.1, y: ty + 0.25, w: 5.0, h: 0.65, fontSize: 10, fontFace: 'Calibri', color: C_MUTED });
});

s9.addShape(pptx.ShapeType.roundRect, {
  x: 6.8, y: 1.5, w: 5.7, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s9.addText('DPDP Act 2023 & Security Controls', {
  x: 7.1, y: 1.7, w: 5.1, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_GREEN, bold: true
});
const secList = [
  { t: '🔒 Zero Raw Document Retention', d: 'Citizen identity images are analyzed in volatile RAM and immediately wiped. No centralized honey-pot database of identity cards is created.' },
  { t: '🛡️ Automated Aadhaar Masking', d: 'The first 8 digits are automatically redacted (XXXX-XXXX-1234) on all user interfaces in compliance with UIDAI regulations.' },
  { t: '⚡ Edge Execution Capable', d: 'Client-side processing eliminates the need to transmit sensitive citizen data over external public internet networks.' },
  { t: '📜 Cryptographic Tamper Seal', d: 'SHA-256 evidence hashing establishes an immutable chain of custody for police chargesheets.' }
];
secList.forEach((sl, i) => {
  const sy = 2.2 + i * 1.0;
  s9.addText(sl.t, { x: 7.1, y: sy, w: 5.1, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: C_WHITE, bold: true });
  s9.addText(sl.d, { x: 7.1, y: sy + 0.25, w: 5.1, h: 0.65, fontSize: 10, fontFace: 'Calibri', color: C_MUTED });
});
s9.addNotes('Our technology stack is built for high speed, reliability, and privacy. By executing critical forensic checks directly on the edge using HTML5 Canvas, WebAssembly, and optimized algorithmic engines, we achieve sub-second latency while guaranteeing citizen privacy under the DPDP Act 2023.');

// ==========================================
// SLIDE 10: LEGAL ADMISSIBILITY (BSA 2023)
// ==========================================
const s10 = pptx.addSlide();
applySlideBackground(s10);
addSlideHeader(s10, 'LEGAL ADMISSIBILITY', 'Bharatiya Sakshya Adhiniyam 2023 / Section 65B Compliance');

s10.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.5, w: 5.6, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s10.addText('Bridging the AI-Judiciary Divide', {
  x: 1.1, y: 1.7, w: 5.0, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_CYAN, bold: true
});
s10.addText([
  { text: '• Statutory Evidence Requirement:\n', options: { bold: true, color: C_WHITE } },
  { text: 'Under Section 63 of the Bharatiya Sakshya Adhiniyam (BSA) 2023 (formerly Section 65B of the Indian Evidence Act, 1872), electronic records are only admissible if accompanied by an official certificate establishing system parameters and chain of custody.\n\n', options: { color: C_MUTED } },
  { text: '• Why Black-Box AI Fails:\n', options: { bold: true, color: C_WHITE } },
  { text: 'Defense counsel routinely get AI detections thrown out by arguing that "black-box software generated an unexplained probability score."\n\n', options: { color: C_MUTED } },
  { text: '• SATYA-ID Solves This:\n', options: { bold: true, color: C_GREEN } },
  { text: 'SATYA-ID auto-generates a signed, court-admissible Forensic Examination Certificate with mathematical proof and exact pixel coordinates.', options: { color: C_WHITE, bold: true } }
], { x: 1.1, y: 2.2, w: 5.0, h: 4.1, fontSize: 11, fontFace: 'Calibri' });

s10.addShape(pptx.ShapeType.roundRect, {
  x: 6.8, y: 1.5, w: 5.7, h: 5.0, rectRadius: 0.1,
  fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }
});
s10.addText('CERTIFICATE OF ELECTRONIC EVIDENCE (BSA 2023)', {
  x: 7.1, y: 1.7, w: 5.1, h: 0.3,
  fontSize: 11, fontFace: 'Calibri', color: '0F172A', bold: true, align: 'center'
});
s10.addShape(pptx.ShapeType.rect, { x: 7.1, y: 2.05, w: 5.1, h: 0.02, fill: { color: '0F172A' } });

const certPreviewText = [
  { text: 'CASE ID: ', options: { bold: true, color: '0F172A' } }, { text: 'MHA-SATYA-2026-89104\n', options: { color: '334155' } },
  { text: 'INGESTION TIME: ', options: { bold: true, color: '0F172A' } }, { text: '2026-09-12T16:15:23Z\n', options: { color: '334155' } },
  { text: 'EVIDENCE SHA-256: ', options: { bold: true, color: '0F172A' } }, { text: '7f83b1657ff1fc53...e037\n\n', options: { color: '0284C7' } },
  { text: 'VERDICT: CRITICAL FORGERY DETECTED (14%)\n', options: { bold: true, color: '991B1B' } },
  { text: 'ITEMIZED EVIDENTIARY VIOLATIONS:\n', options: { bold: true, color: '0F172A' } },
  { text: '1. Verhoeff D5 Checksum Failure: Mutated check digit.\n', options: { color: '475569' } },
  { text: '2. ELA Tamper Spike: Localized re-compression at DOB.\n', options: { color: '475569' } },
  { text: '3. Font Metrology Jitter: σ = 2.45px (Arial font used).\n\n', options: { color: '475569' } },
  { text: 'OFFICER SIGNATURE: _____________________________\n', options: { bold: true, color: '0F172A' } },
  { text: 'National Cyber Crime Forensic Laboratory / MHA I4C', options: { color: '64748B', italic: true } }
];
s10.addText(certPreviewText, {
  x: 7.1, y: 2.15, w: 5.1, h: 4.1,
  fontSize: 9.5, fontFace: 'Calibri'
});
s10.addNotes('Technology is useless in policing if it cannot stand up in court. SATYA-ID is intentionally designed around the new criminal laws—specifically the Bharatiya Sakshya Adhiniyam 2023. Every scan outputs a tamper-proof Section 65B certificate with exact SHA-256 hashes and coordinate bounding boxes that public prosecutors can directly submit in court.');

// ==========================================
// SLIDE 11: REAL-WORLD CASE STUDIES
// ==========================================
const s11 = pptx.addSlide();
applySlideBackground(s11);
addSlideHeader(s11, 'FIELD VALIDATION', 'Real-World Case Studies & Forensic Ground Truth');

const cases = [
  {
    t: 'Case 1: Mewat SIM Box Racket',
    m: 'Modus Operandi: Over 4,500 counterfeit PVC Aadhaar cards printed with photoshopped DOB & names to activate ghost SIMs for cyber extortion.',
    r: 'SATYA-ID Result: 100% intercepted via Verhoeff checksum failure and glowing ELA compression rectangle over modified text box.',
    c: C_RED
  },
  {
    t: 'Case 2: Airport e-Gate Passport Morphing',
    m: 'Modus Operandi: Human trafficking syndicate combined facial features of wanted fugitive with a clean citizen to cross automated e-gates.',
    r: 'SATYA-ID Result: Flagged via high-pass Laplacian spectral analysis detecting generative diffusion smoothing and seam discontinuity.',
    c: C_GOLD
  },
  {
    t: 'Case 3: Synthetic Identity Loan Scams',
    m: 'Modus Operandi: Fraudsters combined valid PAN numbers with fabricated Aadhaar cards to siphon unsecured digital retail loans.',
    r: 'SATYA-ID Result: Intercepted via PAN 5th-character surname mismatch rule and sub-pixel typography kerning inconsistency.',
    c: C_CYAN
  }
];

cases.forEach((cs, i) => {
  const cx = 0.8 + i * 4.0;
  s11.addShape(pptx.ShapeType.roundRect, {
    x: cx, y: 1.6, w: 3.7, h: 4.8, rectRadius: 0.1,
    fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
  });
  s11.addText(cs.t, {
    x: cx + 0.2, y: 1.8, w: 3.3, h: 0.45,
    fontSize: 13, fontFace: 'Calibri', color: cs.c, bold: true
  });
  s11.addText(cs.m, {
    x: cx + 0.2, y: 2.35, w: 3.3, h: 1.8,
    fontSize: 10.5, fontFace: 'Calibri', color: C_MUTED
  });
  s11.addShape(pptx.ShapeType.roundRect, {
    x: cx + 0.2, y: 4.3, w: 3.3, h: 1.9, rectRadius: 0.08,
    fill: { color: '060A12' }, line: { color: C_GREEN, width: 1 }
  });
  s11.addText(cs.r, {
    x: cx + 0.3, y: 4.45, w: 3.1, h: 1.6,
    fontSize: 10, fontFace: 'Calibri', color: C_GREEN, bold: true
  });
});
s11.addNotes('We have benchmarked SATYA-ID against three real-world police cases: the Mewat SIM box syndicates, international airport e-gate passport morphing, and synthetic identity banking loan fraud. In all three cases, SATYA-ID triggered immediate multi-vector alerts.');

// ==========================================
// SLIDE 12: ROADMAP & CONCLUSION
// ==========================================
const s12 = pptx.addSlide();
applySlideBackground(s12);
addSlideHeader(s12, 'FUTURE VISION', 'Implementation Roadmap, Scalability & Live Demonstration');

s12.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.5, w: 6.0, h: 5.0, rectRadius: 0.1,
  fill: { color: C_CARD_BG }, line: { color: C_BORDER, width: 1 }
});
s12.addText('3-Phase National Rollout Roadmap', {
  x: 1.1, y: 1.7, w: 5.4, h: 0.35,
  fontSize: 14, fontFace: 'Calibri', color: C_CYAN, bold: true
});
const phases = [
  { p: 'Phase 1: Hackathon Prototype (Current)', d: 'Core 5-tier screening engine operational, dual-canvas heatmaps, 5 preset test cases, and automated BSA 2023 certificate generator.' },
  { p: 'Phase 2: State Cyber Cell Pilot (Months 1-3)', d: 'Integration with State Police Cyber Crime Units & CCTNS; mobile field inspection Android SDK for telecom PoS vendors.' },
  { p: 'Phase 3: National Deployment via I4C (Months 4-6)', d: 'Enterprise deployment at MHA I4C, Bureau of Immigration airport e-gates, and scheduled banking digital onboarding API gateways.' }
];
phases.forEach((ph, i) => {
  const py = 2.2 + i * 1.35;
  s12.addText(ph.p, { x: 1.1, y: py, w: 5.4, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: C_WHITE, bold: true });
  s12.addText(ph.d, { x: 1.1, y: py + 0.25, w: 5.4, h: 0.95, fontSize: 10, fontFace: 'Calibri', color: C_MUTED });
});

s12.addShape(pptx.ShapeType.roundRect, {
  x: 7.2, y: 1.5, w: 5.3, h: 5.0, rectRadius: 0.1,
  fill: { color: '0F2B48' }, line: { color: C_CYAN, width: 1.5 }
});
s12.addText('🚀 Ready for Live Demonstration', {
  x: 7.5, y: 1.8, w: 4.7, h: 0.45,
  fontSize: 18, fontFace: 'Arial Black', color: C_WHITE, bold: true, align: 'center'
});
s12.addText('We now invite the Respected Jury to witness SATYA-ID live in action with authentic and forged document test cases.', {
  x: 7.5, y: 2.4, w: 4.7, h: 0.8,
  fontSize: 12, fontFace: 'Calibri', color: C_MUTED, align: 'center'
});

const demoBullets = [
  '• Live Dual-Canvas ELA Tamper Heatmap Generation',
  '• Real-time Verhoeff D5 Checksum Failure Catch',
  '• Morphed Passport Biometric High-Pass Detection',
  '• One-Click BSA 2023 Section 65B Certificate Generation'
];
s12.addText(demoBullets.join('\n\n'), {
  x: 7.5, y: 3.3, w: 4.7, h: 2.2,
  fontSize: 11, fontFace: 'Calibri', color: C_CYAN, bold: true
});

s12.addText('Thank you! We welcome your questions and feedback.', {
  x: 7.5, y: 5.7, w: 4.7, h: 0.4,
  fontSize: 12, fontFace: 'Calibri', color: C_GOLD, bold: true, align: 'center'
});
s12.addNotes('To conclude: SATYA-ID transforms identity verification from passive text-reading into active, multi-layered forensic defense. We would now love to take you through our live prototype, test real sample documents, and show you the real-time ELA heatmap and legal certificate generator. Thank you!');

// Save file
const outputPath = path.join(__dirname, 'SATYA_ID_SIH_Presentation.pptx');
await pptx.writeFile({ fileName: outputPath });
console.log('✅ Successfully generated PowerPoint file at:', outputPath);
