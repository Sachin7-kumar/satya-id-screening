import React from 'react';

export default function StatsBanner() {
  return (
    <section className="gov-stats-banner">
      <div className="gov-stat-card">
        <div className="stat-card-border-left saffron"></div>
        <div className="gov-stat-content">
          <div className="stat-val">65,893+</div>
          <div className="stat-label">Cyber Forgery Cases</div>
          <div className="stat-source">NCRB "Crime in India 2023" (71.2% Forgery Rate)</div>
        </div>
      </div>

      <div className="gov-stat-card">
        <div className="stat-card-border-left navy"></div>
        <div className="gov-stat-content">
          <div className="stat-val">67.2 Lakh</div>
          <div className="stat-label">Ghost SIM Cards Blocked</div>
          <div className="stat-source">DoT Sanchar Saathi &amp; ASTR Facial AI Registry</div>
        </div>
      </div>

      <div className="gov-stat-card">
        <div className="stat-card-border-left green"></div>
        <div className="gov-stat-content">
          <div className="stat-val">18–34 ms</div>
          <div className="stat-label">Screening Latency</div>
          <div className="stat-source">1,620 Docs/Min Edge Throughput (0 Cloud Delay)</div>
        </div>
      </div>

      <div className="gov-stat-card">
        <div className="stat-card-border-left blue"></div>
        <div className="gov-stat-content">
          <div className="stat-val">₹0.04</div>
          <div className="stat-label">Cost Per Screening</div>
          <div className="stat-source">94% Cost Cut vs ₹4.50 Cloud KYC API Subscriptions</div>
        </div>
      </div>
    </section>
  );
}
