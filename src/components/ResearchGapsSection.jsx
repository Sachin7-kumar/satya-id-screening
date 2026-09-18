import React from 'react';

export default function ResearchGapsSection() {
  return (
    <section id="researchSection" className="gov-card-container research-section-gov">
      <div className="gov-card-header">
        <div className="gov-card-title">
          <span>🔬</span> SCIENTIFIC GROUNDING: THE 5 FOUNDATIONAL RESEARCH GAPS RESOLVED BY SATYA-ID
        </div>
        <div className="gov-card-badge">STATE-OF-THE-ART FORENSICS</div>
      </div>

      <div className="gov-card-body">
        <div className="research-grid-gov">
          <div className="research-card-gov">
            <div className="research-num">01</div>
            <h3 className="research-title">Generative AI Inpainting</h3>
            <p className="research-text">
              Diffusion models seamlessly synthesize forged text and portraits without traditional pixel edge boundaries. SATYA-ID deploys high-pass Laplacian frequency spectrum analysis to catch localized skin-pore smoothing and frequency attenuation.
            </p>
          </div>

          <div className="research-card-gov">
            <div className="research-num">02</div>
            <h3 className="research-title">Font Metrology Blindness</h3>
            <p className="research-text">
              Standard commercial OCR discards typographical spatial metrics. SATYA-ID measures sub-pixel baseline alignment variance (&sigma; &gt; 1.85px) and stroke-width ratios to detect Arial/Calibri substitutions on official templates.
            </p>
          </div>

          <div className="research-card-gov">
            <div className="research-num">03</div>
            <h3 className="research-title">Phishing QR Code Spoofs</h3>
            <p className="research-text">
              Counterfeit PVC cards embed QR codes redirecting to lookalike verification websites. SATYA-ID parses payloads offline, checks for missing RSA/ECC digital signatures, and intercepts phishing redirects without network exposure.
            </p>
          </div>

          <div className="research-card-gov">
            <div className="research-num">04</div>
            <h3 className="research-title">Mathematical Checksum Bypasses</h3>
            <p className="research-text">
              Hand-modified Aadhaar numbers violate the D5 dihedral group polynomial. SATYA-ID implements the full Verhoeff algorithm to mathematically catch 100% of single-digit modifications and adjacent transposition errors in &lt;5ms.
            </p>
          </div>

          <div className="research-card-gov">
            <div className="research-num">05</div>
            <h3 className="research-title">Legal Evidentiary Admissibility</h3>
            <p className="research-text">
              Black-box deep learning scores are legally inadmissible in criminal trials under Section 63 of Bharatiya Sakshya Adhiniyam 2023. SATYA-ID generates instant, court-admissible forensic certificates with SHA-256 evidence digests and verifiable chain-of-custody.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
