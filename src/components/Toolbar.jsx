import React from 'react';

export default function Toolbar({ onOpenPresentation, onOpenCertificate, onOpenGemini }) {
  return (
    <div className="gov-toolbar">
      <div className="toolbar-left">
        <span className="gov-icon-badge">🛡️</span>
        <div>
          <div className="toolbar-heading">National Identity Forensic Screening Console</div>
          <div className="toolbar-sub">Autonomous 5-Tier Verification conformed to Section 63 BSA 2023</div>
        </div>
      </div>

      <div className="toolbar-actions">
        <button onClick={onOpenCertificate} className="gov-btn gov-btn-gold">
          <span>📜</span> Section 63 BSA Certificate
        </button>
        <button onClick={onOpenGemini} className="gov-btn gov-btn-secondary">
          <span>🤖</span> Gemini AI Copilot
        </button>
        <button onClick={onOpenPresentation} className="gov-btn gov-btn-primary">
          <span>📑</span> SIH 2026 Deck
        </button>
        <a
          href="/SIH2026-IDEA-Presentation-SATYA-ID.pptx"
          download="SIH2026-IDEA-Presentation-SATYA-ID.pptx"
          className="gov-btn gov-btn-outline"
        >
          <span>📥</span> Download PPTX
        </a>
      </div>
    </div>
  );
}
