import React from 'react';

export default function GovFooter() {
  return (
    <footer className="gov-footer-compact">
      <div className="gov-footer-container">
        <div className="gov-footer-left">
          <div className="footer-line-1">
            <strong>भारत सरकार | Government of India</strong> &bull; Ministry of Home Affairs (MHA) &bull; Indian Cyber Crime Coordination Centre (I4C)
          </div>
          <div className="footer-line-2">
            सत्य-ID (Problem Statement: SIH26188) &bull; 100% In-RAM Execution Conforming to Section 63 BSA 2023 &amp; Section 8 DPDP Act 2023.
          </div>
        </div>

        <div className="gov-footer-right">
          <div className="footer-links-row">
            <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer">cybercrime.gov.in</a>
            <span className="sep">&bull;</span>
            <a href="https://mha.gov.in" target="_blank" rel="noreferrer">mha.gov.in</a>
            <span className="sep">&bull;</span>
            <a href="https://sancharsaathi.gov.in" target="_blank" rel="noreferrer">sancharsaathi.gov.in</a>
            <span className="sep">&bull;</span>
            <a href="https://uidai.gov.in" target="_blank" rel="noreferrer">uidai.gov.in</a>
          </div>
          <div className="footer-copy">
            &copy; 2026 Government of India &bull; Smart India Hackathon 2026 Initiative
          </div>
        </div>
      </div>
    </footer>
  );
}
