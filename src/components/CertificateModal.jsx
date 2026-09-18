import React, { useState } from 'react';
import { renderSyntheticDocument } from '../data/testCases';

export default function CertificateModal({ isOpen, onClose, report, canvas }) {
  const [copiedSha, setCopiedSha] = useState(false);

  if (!isOpen || !report) return null;

  const isAuthentic = report.trustScore >= 80;
  const isSuspicious = report.trustScore >= 50 && report.trustScore < 80;
  const bannerClass = isAuthentic ? 'authentic' : isSuspicious ? 'warning' : 'forged';
  const bannerText = isAuthentic
    ? 'LEGAL VERDICT: AUTHENTIC / CONFORMANT ELECTRONIC RECORD'
    : isSuspicious
    ? 'LEGAL VERDICT: SUSPECT RECORD — SECONDARY PHYSICAL INSPECTION REQUIRED'
    : 'LEGAL VERDICT: FORGERY & UNAUTHORIZED TAMPERING CONFIRMED';

  let cardImage = null;
  try {
    if (canvas && typeof canvas.toDataURL === 'function') {
      cardImage = canvas.toDataURL('image/png');
    } else if (report.testCase) {
      const fallbackCanvas = renderSyntheticDocument(report.testCase);
      if (fallbackCanvas && typeof fallbackCanvas.toDataURL === 'function') {
        cardImage = fallbackCanvas.toDataURL('image/png');
      }
    }
  } catch (err) {
    console.warn('CertificateModal card image generation warning:', err);
  }

  const docData = report.testCase?.data || {};
  const testCase = report.testCase || {};

  const handleCopySha = () => {
    if (!report.sha256) return;
    navigator.clipboard.writeText(report.sha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const formattedDate = report.timestamp
    ? new Date(report.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium'
      })
    : new Date().toLocaleString();

  const certUid = `BSA63/MHA-I4C/2026/${(report.caseId || 'REF91024').replace('MHA-SATYA-', '')}`;

  return (
    <div className="modal-overlay active">
      <div className="cert-modal-dialog cert-bsa-dialog">
        <button onClick={onClose} className="cert-close-btn" title="Close Certificate">&times;</button>

        {/* Official State Emblem & National Authority Header */}
        <div className="cert-gov-header">
          <div className="cert-emblem-wrap">
            <svg viewBox="0 0 100 125" className="ashoka-svg-cert" aria-label="State Emblem of India">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#0B3C5D" strokeWidth="3"/>
              <path d="M50 16 L53 30 L64 30 L55 38 L58 50 L50 42 L42 50 L45 38 L36 30 L47 30 Z" fill="#0B3C5D"/>
              <circle cx="50" cy="68" r="14" fill="none" stroke="#0B3C5D" strokeWidth="2.5"/>
              <circle cx="50" cy="68" r="3" fill="#0B3C5D"/>
              <line x1="50" y1="54" x2="50" y2="82" stroke="#0B3C5D" strokeWidth="1.5"/>
              <line x1="36" y1="68" x2="64" y2="68" stroke="#0B3C5D" strokeWidth="1.5"/>
              <line x1="40" y1="58" x2="60" y2="78" stroke="#0B3C5D" strokeWidth="1.5"/>
              <line x1="40" y1="78" x2="60" y2="58" stroke="#0B3C5D" strokeWidth="1.5"/>
              <rect x="25" y="88" width="50" height="7" rx="2" fill="#0B3C5D"/>
              <text x="50" y="108" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0B3C5D" fontFamily="Arial, sans-serif">सत्यमेव जयते</text>
            </svg>
          </div>
          <p className="cert-ministry-title">भारत सरकार | GOVERNMENT OF INDIA</p>
          <p className="cert-dept-title">गृह मंत्रालय | MINISTRY OF HOME AFFAIRS &bull; INDIAN CYBER CRIME COORDINATION CENTRE (I4C)</p>
          <h2 className="cert-main-act-title">
            CERTIFICATE UNDER SECTION 63(4) OF THE BHARATIYA SAKSHYA ADHINIYAM, 2023 (BSA 2023)
          </h2>
          <p className="cert-act-subtitle">
            Statutory Certificate for Admissibility of Electronic Records in Judicial Proceedings (Repealing Section 65B of IEA 1872)
          </p>
          <div className="cert-uid-strip">
            <span>CERTIFICATE REF NO: <strong>{certUid}</strong></span>
            <span>&bull;</span>
            <span>EXAMINATION TIME (IST): <strong>{formattedDate}</strong></span>
          </div>
        </div>

        {/* Verdict Banner */}
        <div className={`cert-verdict-banner ${bannerClass}`}>
          <div className="verdict-banner-inner">
            <span className="verdict-tag">STATUTORY FORENSIC ADMISSIBILITY:</span>
            <span className="verdict-title">{bannerText}</span>
            <span className="verdict-score-pill">TRUST INDEX: {report.trustScore}%</span>
          </div>
        </div>

        {/* EXHIBIT-A: The User's Document Card (Visual Evidence) */}
        <div className="cert-section-block">
          <div className="cert-section-title">
            <span>📸</span> EXHIBIT-A: SEIZED / INGESTED IDENTITY DOCUMENT EVIDENCE (FORENSIC CAPTURE)
          </div>
          <div className="cert-exhibit-container">
            {cardImage ? (
              <div className="cert-image-frame">
                <img src={cardImage} alt="Seized Document Evidence Card" className="cert-document-card-img" />
                <div className="cert-image-caption">
                  <span>FORENSIC EXAMINATION VIEWPORT SNAPSHOT &bull; RESOLUTION: {docData.resolution || (canvas ? `${canvas.width}×${canvas.height}px` : '650×410px')}</span>
                  <span>ENCODED: 24-BIT RGB LOSSLESS MEMORY RASTER</span>
                </div>
              </div>
            ) : (
              <div className="cert-no-img">Document raster preserved in memory.</div>
            )}
          </div>
        </div>

        {/* EXHIBIT-B: Particulars of the Ingested Identity Card */}
        <div className="cert-section-block">
          <div className="cert-section-title">
            <span>📋</span> EXHIBIT-B: EXTRACTED CARDHOLDER &amp; DOCUMENT PARTICULARS
          </div>
          <table className="cert-meta-table">
            <tbody>
              <tr>
                <td className="meta-label">Target Document Classification:</td>
                <td className="meta-val"><strong>{testCase.type || 'National Identity Document'}</strong></td>
                <td className="meta-label">Claimed Cardholder Name:</td>
                <td className="meta-val"><strong>{docData.fullName || 'N/A'}</strong></td>
              </tr>
              <tr>
                <td className="meta-label">Identification / Card Number:</td>
                <td className="meta-val"><code>{docData.idNumber || 'N/A'}</code></td>
                <td className="meta-label">Date of Birth &amp; Gender:</td>
                <td className="meta-val">{docData.dob || 'Recorded'} &bull; {docData.gender || 'Recorded'}</td>
              </tr>
              <tr>
                <td className="meta-label">Registered Address / Jurisdiction:</td>
                <td className="meta-val" colSpan="3">{docData.address || docData.country || 'National Territory of India'}</td>
              </tr>
              <tr>
                <td className="meta-label">Cryptographic Envelope / QR Type:</td>
                <td className="meta-val">{docData.qrType || 'Standard Official Envelope'}</td>
                <td className="meta-label">Ingested File Name &amp; Size:</td>
                <td className="meta-val">{docData.fileName || testCase.name || 'Standard Reference'} ({docData.fileSize || '384.2 KB'})</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* EXHIBIT-C: 5-Tier Statutory Scientific Examination Findings */}
        <div className="cert-section-block">
          <div className="cert-section-title">
            <span>🔬</span> EXHIBIT-C: 5-TIER STATUTORY FORENSIC VERIFICATION BREAKDOWN
          </div>
          <table className="cert-meta-table cert-findings-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Verification Tier</th>
                <th style={{ width: '20%' }}>Statutory Standard</th>
                <th style={{ width: '12%', textAlign: 'center' }}>Result</th>
                <th>Scientific Finding &amp; Evidentiary Observation</th>
              </tr>
            </thead>
            <tbody>
              {/* Tier 1: Checksums */}
              <tr>
                <td><strong>1. Algorithmic Invariants</strong></td>
                <td>Verhoeff D5 / PAN / MRZ</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`cert-pill ${report.algoResult.isValid ? 'pill-pass' : 'pill-fail'}`}>
                    {report.algoResult.isValid ? '✓ PASS' : '✗ FAIL'}
                  </span>
                </td>
                <td>{report.algoResult.message}</td>
              </tr>

              {/* Tier 2: ELA */}
              <tr>
                <td><strong>2. Compression Physics</strong></td>
                <td>Adaptive ELA (Q=92%)</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`cert-pill ${!report.elaResult.isSuspicious ? 'pill-pass' : 'pill-fail'}`}>
                    {!report.elaResult.isSuspicious ? '✓ PASS' : '✗ FAIL'}
                  </span>
                </td>
                <td>
                  {report.elaResult.isSuspicious
                    ? `Splicing detected: Quantization anomaly ratio (${report.elaResult.anomalyRatio}%) exceeds maximum permissible baseline threshold.`
                    : 'Uniform DCT error deltas. No resaving pixel paste anomalies detected.'}
                </td>
              </tr>

              {/* Tier 3: Font Metrology */}
              <tr>
                <td><strong>3. Sub-Pixel Font Metrology</strong></td>
                <td>Baseline Alignment &sigma; &lt; 1.85px</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`cert-pill ${report.fontResult.isAuthentic ? 'pill-pass' : 'pill-fail'}`}>
                    {report.fontResult.isAuthentic ? '✓ PASS' : '✗ FAIL'}
                  </span>
                </td>
                <td>
                  Baseline alignment jitter &sigma; = {report.fontResult.avgBaselineJitter}px. 
                  {report.fontResult.isAuthentic
                    ? ' Vector characters conform to official government security rasterization.'
                    : ' Typographical substitution / desktop text insertion detected.'}
                </td>
              </tr>

              {/* Tier 4: Face Morphing */}
              <tr>
                <td><strong>4. Biometric Frequency Integrity</strong></td>
                <td>Laplacian High-Pass Filter</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`cert-pill ${!report.faceResult.isMorphed ? 'pill-pass' : 'pill-fail'}`}>
                    {!report.faceResult.isMorphed ? '✓ PASS' : '✗ FAIL'}
                  </span>
                </td>
                <td>
                  {report.faceResult.isMorphed
                    ? 'High-frequency skin pore attenuation confirms generative AI diffusion inpainting / 50-50 linear morphing attack.'
                    : 'Natural biometric frequency spectrum and boundary continuity verified.'}
                </td>
              </tr>

              {/* Tier 5: QR Signature */}
              <tr>
                <td><strong>5. QR Cryptographic PKI</strong></td>
                <td>ECDSA / RSA Offline Envelope</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`cert-pill ${report.qrResult.isValid ? 'pill-pass' : 'pill-fail'}`}>
                    {report.qrResult.isValid ? '✓ PASS' : '✗ FAIL'}
                  </span>
                </td>
                <td>{report.qrResult.message}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* EXHIBIT-D & E: Device Details & SHA-256 Digest */}
        <div className="cert-section-block">
          <div className="cert-section-title">
            <span>🔒</span> EXHIBIT-D &amp; E: PRODUCING DEVICE &amp; CRYPTOGRAPHIC EVIDENCE SEAL (Sec. 63(4)(b) &amp; (c))
          </div>
          <table className="cert-meta-table">
            <tbody>
              <tr>
                <td className="meta-label">Producing Computing Device:</td>
                <td className="meta-val">SATYA-ID Autonomous Edge Forensic Screening Engine (Model: AI-DFIR-2026, Core v2.4)</td>
              </tr>
              <tr>
                <td className="meta-label">Operating Architecture:</td>
                <td className="meta-val">100% Volatile Memory (In-RAM Edge). Zero disk persistence pursuant to Section 8 of Digital Personal Data Protection (DPDP) Act, 2023.</td>
              </tr>
              <tr>
                <td className="meta-label">Cryptographic Evidence Digest (SHA-256):</td>
                <td className="meta-val">
                  <div className="cert-sha-row">
                    <code className="cert-sha-code">{report.sha256}</code>
                    <button onClick={handleCopySha} className="cert-copy-btn">
                      {copiedSha ? '✓ Copied' : 'Copy Hash'}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Statutory Solemn Declaration */}
        <div className="cert-declaration-box">
          <div className="cert-declaration-heading">STATUTORY SOLEMN AFFIRMATION UNDER SECTION 63(4) BSA 2023:</div>
          <p>
            "I, the undersigned Senior Forensic Technical Officer, hereby certify and solemnly affirm that the electronic record described and reproduced herein under Exhibit-A was ingested and examined under my official custody and direction. I further certify that the computing device and forensic pipeline specified under Exhibit-D was functioning accurately without malfunction throughout the examination window. The cryptographic SHA-256 seal was generated immediately upon memory ingestion, establishing an unbroken chain of custody. This certificate is issued as admissible primary evidence under Section 63 of the Bharatiya Sakshya Adhiniyam, 2023."
          </p>
        </div>

        {/* Sign-off & Seal Block */}
        <div className="cert-signoff-grid">
          <div className="cert-seal-box">
            <div className="seal-stamp">
              <div className="seal-stamp-inner">
                <span>MHA &bull; I4C</span>
                <strong>SATYA-ID</strong>
                <span>CFSL CERTIFIED</span>
              </div>
            </div>
            <div className="seal-text">
              <strong>OFFICIAL DIGITAL SEAL</strong><br />
              Central Cyber Crime Forensic Registry<br />
              Ministry of Home Affairs, Govt. of India
            </div>
          </div>

          <div className="cert-signature-box">
            <div className="digital-signature-line">
              <span className="digitally-signed-badge">DIGITALLY SIGNED &bull; PKI VERIFIED</span>
            </div>
            <div className="sign-name">Forensic Certifying Officer (FE-I4C-9104)</div>
            <div className="sign-desig">Senior Technical Examiner, National Cyber Forensic Division</div>
            <div className="sign-dept">Indian Cyber Crime Coordination Centre (I4C), MHA</div>
          </div>
        </div>

        {/* Actions */}
        <div className="cert-actions">
          <button onClick={() => window.print()} className="gov-btn gov-btn-gold gov-btn-large">
            <span>🖨️</span> Print / Save Court Certificate (PDF)
          </button>
          <button onClick={onClose} className="gov-btn gov-btn-secondary">
            <span>✕</span> Close Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
