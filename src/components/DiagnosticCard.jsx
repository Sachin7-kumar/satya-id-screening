import React, { useState } from 'react';
import { speechEngine } from '../utils/speechVoice';

export default function DiagnosticCard({ report, onOpenCertificate, onOpenEditData }) {
  const [copiedSha, setCopiedSha] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!report) {
    return (
      <div className="gov-card-container diagnostic-card-gov">
        <div className="gov-card-header">
          <div className="gov-card-title">
            <span>⚖️</span> OFFICIAL FORENSIC EXAMINATION REPORT
          </div>
          <div className="header-case-badge">STATUS: STANDBY</div>
        </div>
        <div className="gov-card-body" style={{ textAlign: 'center', padding: '3.8rem 1.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#F8FAFC',
            border: '2px solid #CBD5E1',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            marginBottom: '0.85rem'
          }}>
            ⚖️
          </div>
          <div style={{ fontWeight: 800, color: 'var(--gov-navy)', fontSize: '0.98rem', marginBottom: '0.4rem' }}>
            AWAITING EVIDENCE RECORD INGESTION
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748B', maxWidth: '360px', margin: '0 auto 1.25rem auto', lineHeight: 1.5 }}>
            No document record currently in volatile memory. Select an evidence scenario or upload a document card to execute 5-tier statutory forensic verification.
          </div>
          <div style={{ display: 'inline-block', background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '0.4rem 0.85rem', borderRadius: '4px', fontSize: '0.72rem', color: 'var(--gov-navy)' }}>
            <strong>Statutory Admissibility:</strong> Section 63 BSA 2023 &bull; Section 8 DPDP Act 2023
          </div>
        </div>
      </div>
    );
  }

  const { trustScore, algoResult, elaResult, fontResult, faceResult, qrResult, sha256, caseId, testCase } = report;

  const isAuthentic = trustScore >= 80;
  const isSuspicious = trustScore >= 50 && trustScore < 80;
  const bannerType = isAuthentic ? 'success' : isSuspicious ? 'warning' : 'danger';
  const bannerBadge = isAuthentic ? 'OFFICIAL RECORD CONFORMANT' : isSuspicious ? 'SUSPICIOUS / ELEVATED RISK' : 'CRITICAL TAMPERING / FORGERY';
  const cardData = testCase?.data || {};

  let verdictTheme = 'danger';
  let verdictTitle = 'CRITICAL FORGERY & TAMPERING DETECTED';
  let verdictDesc = 'Multiple forensic violations identified. Document fails statutory mathematical and typographical standards.';

  if (trustScore >= 80) {
    verdictTheme = 'success';
    verdictTitle = 'VERIFIED AUTHENTIC DOCUMENT';
    verdictDesc = 'All mathematical checksums, compression physics, and font metrologies conform to official statutory specifications.';
  } else if (trustScore >= 50) {
    verdictTheme = 'warning';
    verdictTitle = 'SUSPECT DOCUMENT • SECONDARY INSPECTION ADVISED';
    verdictDesc = 'Localized typographical baseline jitter or recompression artifacts detected. Secondary physical inspection advised.';
  }

  const handleCopySha = () => {
    if (!sha256) return;
    navigator.clipboard.writeText(sha256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      speechEngine.stop();
      setIsSpeaking(false);
    } else {
      speechEngine.speakVerdict(
        report,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  return (
    <div className="gov-card-container diagnostic-card-gov">
      <div className="gov-card-header">
        <div className="gov-card-title">
          <span>⚖️</span> OFFICIAL FORENSIC EXAMINATION REPORT
        </div>
        <div className="header-case-badge">
          CASE ID: <strong>{caseId || 'MHA-SATYA-102941'}</strong>
        </div>
      </div>

      <div className="gov-card-body">
        {/* Verdict Banner */}
        <div className={`gov-verdict-banner ${verdictTheme}`}>
          <div className="verdict-banner-header">
            <span className="verdict-badge-pill">OFFICIAL VERDICT</span>
            <span className="verdict-score">TRUST INDEX: <strong>{trustScore}%</strong></span>
          </div>
          <div className="verdict-banner-title">{verdictTitle}</div>
          <div className="verdict-banner-desc">{verdictDesc}</div>
        </div>

        {/* SHA-256 Digest Bar */}
        <div className="gov-sha-box">
          <div className="sha-label">
            <span>🔒 Cryptographic Evidence Digest (SHA-256):</span>
            <button onClick={handleCopySha} className="gov-copy-btn">
              {copiedSha ? '✓ Copied' : 'Copy Hash'}
            </button>
          </div>
          <div className="sha-value" title={sha256}>{sha256}</div>
        </div>

        {/* 5-Tier Forensic Verification Table */}
        <div className="gov-table-heading">
          <span>5-TIER STATUTORY FORENSIC VERIFICATION BREAKDOWN</span>
        </div>

        <table className="gov-checklist-table">
          <thead>
            <tr>
              <th>Forensic Verification Tier</th>
              <th>Statutory Metric</th>
              <th style={{ textAlign: 'center' }}>Result</th>
            </tr>
          </thead>
          <tbody>
            {/* Tier 1: Algorithmic Checksum */}
            <tr>
              <td>
                <div className="tier-name">1. Algorithmic Invariants</div>
                <div className="tier-sub">{algoResult.message}</div>
              </td>
              <td>
                <span style={{ fontWeight: 600, color: 'var(--gov-navy)' }}>
                  {algoResult.standard || 'UIDAI Verhoeff / ITD PAN / ICAO MRZ'}
                </span>
              </td>
              <td style={{ textAlign: 'center' }}>
                <span className={`status-pill ${algoResult.isValid ? 'pass' : 'fail'}`}>
                  {algoResult.isValid ? '✓ PASS' : '✗ FAIL'}
                </span>
              </td>
            </tr>

            {/* Tier 2: ELA Compression */}
            <tr>
              <td>
                <div className="tier-name">2. Compression Physics (ELA)</div>
                <div className="tier-sub">
                  {elaResult.isSuspicious
                    ? `Anomaly ratio (${elaResult.anomalyRatio}%) exceeds statutory threshold (resaving splice detected).`
                    : 'Uniform quantization deltas. No spliced pixels detected.'}
                </div>
              </td>
              <td>DCT Quantization Error</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`status-pill ${!elaResult.isSuspicious ? 'pass' : 'fail'}`}>
                  {!elaResult.isSuspicious ? '✓ PASS' : '✗ FAIL'}
                </span>
              </td>
            </tr>

            {/* Tier 3: Font Metrology */}
            <tr>
              <td>
                <div className="tier-name">3. Sub-Pixel Font Metrology</div>
                <div className="tier-sub">
                  Baseline jitter &sigma; = {fontResult.avgBaselineJitter}px 
                  {fontResult.isAuthentic ? ' (Conforms to official template typography)' : ' (Typographical substitution detected)'}
                </div>
              </td>
              <td>Baseline &sigma; &lt; 1.85px</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`status-pill ${fontResult.isAuthentic ? 'pass' : 'fail'}`}>
                  {fontResult.isAuthentic ? '✓ PASS' : '✗ FAIL'}
                </span>
              </td>
            </tr>

            {/* Tier 4: Face Morphing */}
            <tr>
              <td>
                <div className="tier-name">4. Biometric Frequency Integrity</div>
                <div className="tier-sub">
                  {faceResult.isMorphed 
                    ? 'Laplacian frequency attenuation confirms generative inpainting / face morphing.'
                    : 'Natural skin-pore texture and biometric frequency spectrum verified.'}
                </div>
              </td>
              <td>Laplacian Smoothing Filter</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`status-pill ${!faceResult.isMorphed ? 'pass' : 'fail'}`}>
                  {!faceResult.isMorphed ? '✓ PASS' : '✗ FAIL'}
                </span>
              </td>
            </tr>

            {/* Tier 5: QR Cryptography */}
            <tr>
              <td>
                <div className="tier-name">5. QR Cryptographic Signature</div>
                <div className="tier-sub">{qrResult.message}</div>
              </td>
              <td>Offline PKI Verification</td>
              <td style={{ textAlign: 'center' }}>
                <span className={`status-pill ${qrResult.isValid ? 'pass' : 'fail'}`}>
                  {qrResult.isValid ? '✓ PASS' : '✗ FAIL'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Action Row */}
        <div className="gov-card-actions">
          <button onClick={onOpenCertificate} className="gov-btn gov-btn-gold gov-btn-large" title="Generate Section 63 BSA 2023 Certificate">
            <span>📜</span> Section 63 BSA Certificate
          </button>
          <button onClick={onOpenEditData} className="gov-btn gov-btn-primary" title="Edit Cardholder Particulars or Set as No Data Given">
            <span>✏️</span> Edit Card Data
          </button>
          <button onClick={handleToggleVoice} className="gov-btn gov-btn-secondary">
            {isSpeaking ? '⏹️ Stop Briefing' : '🔊 Voice Briefing'}
          </button>
        </div>
      </div>
    </div>
  );
}
