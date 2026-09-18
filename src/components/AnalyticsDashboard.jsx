import React from 'react';
import InteractiveThreatMap from './InteractiveThreatMap';
import BatchStressTester from './BatchStressTester';

export default function AnalyticsDashboard() {
  return (
    <section id="analyticsSection" className="gov-card-container analytics-section-gov">
      <div className="gov-card-header">
        <div className="gov-card-title">
          <span>📊</span> NATIONAL CYBERCRIME THREAT INTELLIGENCE BULLETIN (MHA / I4C TELEMETRY)
        </div>
        <div className="gov-card-badge">OFFICIAL BULLETIN FY 2023-24</div>
      </div>

      <div className="gov-card-body">
        <div className="analytics-grid-gov">
          {/* Threat Vector Distribution */}
          <div className="gov-sub-card">
            <div className="sub-card-title">
              <span>Primary Document Forgery Modus Operandi</span>
              <span className="gov-pill pill-saffron">NCRB 2023</span>
            </div>

            <div className="vector-row">
              <div className="vector-text">
                <span>Forged Aadhaar (DOB / Address Splice)</span>
                <strong>44%</strong>
              </div>
              <div className="gov-progress-track">
                <div className="gov-progress-fill red" style={{ width: '44%' }}></div>
              </div>
            </div>

            <div className="vector-row">
              <div className="vector-text">
                <span>Synthetic PAN (Surname Mismatch &amp; Ghost KYC)</span>
                <strong>26%</strong>
              </div>
              <div className="gov-progress-track">
                <div className="gov-progress-fill yellow" style={{ width: '26%' }}></div>
              </div>
            </div>

            <div className="vector-row">
              <div className="vector-text">
                <span>Biometric Morphed Passports (e-Gates Bypass)</span>
                <strong>18%</strong>
              </div>
              <div className="gov-progress-track">
                <div className="gov-progress-fill blue" style={{ width: '18%' }}></div>
              </div>
            </div>

            <div className="vector-row">
              <div className="vector-text">
                <span>Phishing QR Voter / Driving Licenses</span>
                <strong>12%</strong>
              </div>
              <div className="gov-progress-track">
                <div className="gov-progress-fill green" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>

          {/* Repeat Template Cluster Analysis */}
          <div className="gov-sub-card">
            <div className="sub-card-title">
              <span>Counterfeit Template Cluster Signatures</span>
              <span className="gov-pill pill-green">FORENSIC MATCH</span>
            </div>
            <p className="sub-card-desc">
              SATYA-ID clusters seized fake identity cards by microscopic raster grid signatures, linking individual cards to organized cyber syndicates.
            </p>

            <div className="cluster-list-gov">
              <div className="cluster-item-gov">
                <div className="cluster-head">
                  <span className="cluster-id">CLUSTER-MEWAT-09</span>
                  <span className="gov-pill pill-forged">HIGH THREAT</span>
                </div>
                <div className="cluster-detail">142 Cards Intercepted &bull; Fake Aadhaar Font Substitution &bull; Mewat Hotspot</div>
              </div>

              <div className="cluster-item-gov">
                <div className="cluster-head">
                  <span className="cluster-id">CLUSTER-JAMTARA-03</span>
                  <span className="gov-pill pill-forged">HIGH THREAT</span>
                </div>
                <div className="cluster-detail">89 Cards Intercepted &bull; Spliced PAN Card DOB &bull; Ghost SIM Linkage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Threat Map & Batch Tester */}
        <div style={{ marginTop: '1.25rem' }}>
          <InteractiveThreatMap />
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <BatchStressTester />
        </div>
      </div>
    </section>
  );
}
