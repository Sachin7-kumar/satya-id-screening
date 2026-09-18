import React from 'react';

export default function Navbar({ onOpenPresentation, onOpenGemini, onOpenCertificate }) {
  return (
    <header className="gov-site-header">
      <div className="header-main-container">
        <div className="header-brand-section">
          {/* Ashoka Lion Capital Emblem */}
          <div className="ashoka-emblem-box">
            <svg viewBox="0 0 100 125" className="ashoka-svg" aria-label="State Emblem of India">
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

          <div className="header-title-block">
            <div className="dept-label">
              गृह मंत्रालय | MINISTRY OF HOME AFFAIRS &bull; INDIAN CYBER CRIME COORDINATION CENTRE (I4C)
            </div>
            <h1 className="portal-main-title">
              सत्य-ID <span className="title-divider">/</span> SATYA-ID
              <span className="ps-id-badge">SIH1608</span>
            </h1>
            <div className="portal-sub-title">
              National AI-Powered Fake Identity &amp; Document Screening System (100% In-RAM Local Edge)
            </div>
          </div>
        </div>

        <div className="header-actions-block">
          <div className="gov-status-tag" title="100% In-RAM Local Edge Forensic Pipeline">
            <span className="pulse-dot"></span> 100% In-RAM Local Edge
          </div>
          <button onClick={onOpenCertificate} className="gov-btn gov-btn-gold" title="Open Statutory BSA 2023 Forensic Court Certificate">
            <span>⚖️</span> Section 63 BSA Certificate
          </button>
        </div>
      </div>
    </header>
  );
}
