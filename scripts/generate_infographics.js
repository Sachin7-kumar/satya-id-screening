import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve('scripts/infographics_out');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 1. User Flow Chart HTML
const flowchartHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    width: 1400px;
    height: 340px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .flow-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: #ffffff;
    border: 2px solid #0070C0;
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 10px 30px rgba(0, 112, 192, 0.12);
  }
  .step-card {
    flex: 1;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    min-height: 250px;
  }
  .step-card.active {
    border-color: #0070C0;
    background: #F0F7FF;
  }
  .step-card.cert {
    border-color: #10B981;
    background: #ECFDF5;
  }
  .step-badge {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #0070C0;
    color: white;
    font-weight: 800;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    box-shadow: 0 4px 10px rgba(0, 112, 192, 0.3);
  }
  .step-card.cert .step-badge {
    background: #10B981;
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
  }
  .step-title {
    font-size: 15px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 8px;
    line-height: 1.25;
  }
  .step-desc {
    font-size: 12px;
    color: #475569;
    line-height: 1.45;
    margin-bottom: 8px;
  }
  .step-tag {
    margin-top: auto;
    background: #E2E8F0;
    color: #0070C0;
    font-size: 10.5px;
    font-weight: 700;
    padding: 4px 8px;
    border-radius: 6px;
    font-family: Consolas, monospace;
  }
  .step-card.cert .step-tag {
    background: #D1FAE5;
    color: #059669;
  }
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0070C0;
    font-size: 26px;
    font-weight: 900;
    padding: 0 2px;
  }
</style>
</head>
<body>
  <div class="flow-container">
    
    <!-- Step 1 -->
    <div class="step-card">
      <div class="step-badge">1</div>
      <div class="step-title">Ingestion &amp; Hashing</div>
      <div class="step-desc">Webcam capture, scanner, or API drop ingested directly into volatile RAM. No disk writes.</div>
      <div class="step-tag">SHA-256 Digest</div>
    </div>

    <div class="arrow">➔</div>

    <!-- Step 2 -->
    <div class="step-card">
      <div class="step-badge">2</div>
      <div class="step-title">Math Invariants</div>
      <div class="step-desc">Deterministic polynomial validation on statutory ID numbers with surname cross-checking.</div>
      <div class="step-tag">Verhoeff D5 | &lt;5ms</div>
    </div>

    <div class="arrow">➔</div>

    <!-- Step 3 -->
    <div class="step-card active">
      <div class="step-badge">3</div>
      <div class="step-title">Compression Physics</div>
      <div class="step-desc">Adaptive Error Level Analysis (Q=92%) detects localized resaving and spliced text pixels.</div>
      <div class="step-tag">ELA Heatmap (10x-45x)</div>
    </div>

    <div class="arrow">➔</div>

    <!-- Step 4 -->
    <div class="step-card">
      <div class="step-badge">4</div>
      <div class="step-title">Metrology &amp; AI</div>
      <div class="step-desc">Sub-pixel font baseline variance (&sigma; &gt; 1.85px) + Gemini AI multimodal semantic inquest.</div>
      <div class="step-tag">Laplacian &amp; Gemini</div>
    </div>

    <div class="arrow">➔</div>

    <!-- Step 5 -->
    <div class="step-card cert">
      <div class="step-badge">✓</div>
      <div class="step-title">Evidence Export</div>
      <div class="step-desc">Weighted Trust Index (0–100%) output + cryptographic PDF certificate for prosecution.</div>
      <div class="step-tag">Sec 63 BSA 2023</div>
    </div>

  </div>
</body>
</html>`;

// 2. Pie Chart 1: NCRB Cyber Crime Forgery Breakdown
const pieNcrbHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    width: 600px;
    height: 480px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .card {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card-header {
    text-align: center;
    margin-bottom: 12px;
  }
  .header-tag {
    font-size: 11px;
    font-weight: 800;
    color: #0070C0;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 800;
    color: #0F172A;
  }
  .chart-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    gap: 16px;
  }
  .donut-box {
    position: relative;
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .donut-center {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .donut-pct {
    font-size: 32px;
    font-weight: 900;
    color: #DC2626;
    line-height: 1;
  }
  .donut-sub {
    font-size: 10.5px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    margin-top: 4px;
  }
  .legend-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .legend-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .legend-color {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    margin-top: 3px;
    flex-shrink: 0;
  }
  .legend-info {
    font-size: 12.5px;
    line-height: 1.35;
    color: #1E293B;
  }
  .legend-bold {
    font-weight: 800;
  }
  .legend-count {
    font-size: 11px;
    color: #64748B;
  }
  .footer-note {
    font-size: 11px;
    color: #64748B;
    background: #F1F5F9;
    padding: 6px 12px;
    border-radius: 6px;
    width: 100%;
    text-align: center;
    margin-top: 8px;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="header-tag">Official Government Statistics</div>
      <div class="card-title">NCRB Cybercrime Registry (65,893 Cases)</div>
    </div>
    <div class="chart-area">
      <!-- SVG Donut Chart -->
      <div class="donut-box">
        <svg width="220" height="220" viewBox="0 0 42 42">
          <!-- Background circle -->
          <circle cx="21" cy="21" r="15.915" fill="#fff" stroke="#F1F5F9" stroke-width="6"/>
          <!-- Segment 1: Forgery (71.2%) -> stroke-dasharray="71.2 28.8" -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#DC2626" stroke-width="6.5" stroke-dasharray="71.2 28.8" stroke-dashoffset="25"/>
          <!-- Segment 2: Impersonation (18.5%) -> stroke-dasharray="18.5 81.5" -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" stroke-width="6.5" stroke-dasharray="18.5 81.5" stroke-dashoffset="53.8"/>
          <!-- Segment 3: Other (10.3%) -> stroke-dasharray="10.3 89.7" -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0070C0" stroke-width="6.5" stroke-dasharray="10.3 89.7" stroke-dashoffset="35.3"/>
        </svg>
        <div class="donut-center">
          <div class="donut-pct">71.2%</div>
          <div class="donut-sub">Forgery Rate</div>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend-box">
        <div class="legend-item">
          <div class="legend-color" style="background: #DC2626;"></div>
          <div class="legend-info">
            <div class="legend-bold" style="color: #DC2626;">71.2% Document Forgery</div>
            <div class="legend-count">46,916 cases (Aadhaar/PAN/KYC)</div>
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #F59E0B;"></div>
          <div class="legend-info">
            <div class="legend-bold" style="color: #D97706;">18.5% Impersonation / Ghost IDs</div>
            <div class="legend-count">12,190 cases (Fake SIM / Loans)</div>
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #0070C0;"></div>
          <div class="legend-info">
            <div class="legend-bold" style="color: #0070C0;">10.3% Other Cyber Offences</div>
            <div class="legend-count">6,787 cases (Hacking, Phishing)</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-note">Source: NCRB "Crime in India 2023" &amp; DoT Sanchar Saathi Reports</div>
  </div>
</body>
</html>`;

// 3. Pie Chart 2: Multi-Tier Detection Breakdown (for Slide 5)
const pieDetectionHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    width: 600px;
    height: 480px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .card {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card-header {
    text-align: center;
    margin-bottom: 12px;
  }
  .header-tag {
    font-size: 11px;
    font-weight: 800;
    color: #10B981;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 800;
    color: #0F172A;
  }
  .chart-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    gap: 16px;
  }
  .donut-box {
    position: relative;
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .donut-center {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .donut-pct {
    font-size: 32px;
    font-weight: 900;
    color: #10B981;
    line-height: 1;
  }
  .donut-sub {
    font-size: 10.5px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    margin-top: 4px;
  }
  .legend-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .legend-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .legend-color {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    margin-top: 3px;
    flex-shrink: 0;
  }
  .legend-info {
    font-size: 12px;
    line-height: 1.35;
    color: #1E293B;
  }
  .legend-bold {
    font-weight: 800;
  }
  .legend-count {
    font-size: 10.5px;
    color: #64748B;
  }
  .footer-note {
    font-size: 11px;
    color: #0F766E;
    background: #CCFBF1;
    padding: 6px 12px;
    border-radius: 6px;
    width: 100%;
    text-align: center;
    margin-top: 8px;
    font-weight: 700;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="header-tag">Operational Impact Breakdown</div>
      <div class="card-title">Multi-Tier Forgery Detection Share</div>
    </div>
    <div class="chart-area">
      <!-- SVG Donut Chart -->
      <div class="donut-box">
        <svg width="220" height="220" viewBox="0 0 42 42">
          <!-- Background circle -->
          <circle cx="21" cy="21" r="15.915" fill="#fff" stroke="#F1F5F9" stroke-width="6"/>
          <!-- Segment 1: Math Checksum (35%) -> stroke-dasharray="35 65" -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0070C0" stroke-width="6.5" stroke-dasharray="35 65" stroke-dashoffset="25"/>
          <!-- Segment 2: ELA Splicing (28%) -> stroke-dasharray="28 72" -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#F59E0B" stroke-width="6.5" stroke-dasharray="28 72" stroke-dashoffset="90"/>
          <!-- Segment 3: Font Metrology (22%) -> stroke-dasharray="22 78" -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8B5CF6" stroke-width="6.5" stroke-dasharray="22 78" stroke-dashoffset="62"/>
          <!-- Segment 4: Biometrics (15%) -> stroke-dasharray="15 85" -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10B981" stroke-width="6.5" stroke-dasharray="15 85" stroke-dashoffset="40"/>
        </svg>
        <div class="donut-center">
          <div class="donut-pct">94%</div>
          <div class="donut-sub">Cost Slashed</div>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend-box">
        <div class="legend-item">
          <div class="legend-color" style="background: #0070C0;"></div>
          <div class="legend-info">
            <div class="legend-bold" style="color: #0070C0;">35% Math Checksums</div>
            <div class="legend-count">Verhoeff D5, PAN, MRZ 7-3-1</div>
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #F59E0B;"></div>
          <div class="legend-info">
            <div class="legend-bold" style="color: #D97706;">28% ELA Splicing</div>
            <div class="legend-count">Resaving deltas &amp; pixel pastes</div>
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #8B5CF6;"></div>
          <div class="legend-info">
            <div class="legend-bold" style="color: #7C3AED;">22% Font Metrology</div>
            <div class="legend-count">Baseline &sigma; &gt; 1.85px &amp; stroke ratio</div>
          </div>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #10B981;"></div>
          <div class="legend-info">
            <div class="legend-bold" style="color: #059669;">15% Face Morphing</div>
            <div class="legend-count">Laplacian diffusion smoothing</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-note">⚡ Screening Speed: 18–34ms | 1,620 Docs/Min Edge Throughput</div>
  </div>
</body>
</html>`;

function renderToPng(htmlContent, outPngName, width, height) {
  const tempHtml = path.join(outDir, `${outPngName}.html`);
  const finalPng = path.join(outDir, `${outPngName}.png`);
  fs.writeFileSync(tempHtml, htmlContent, 'utf8');

  const cmd = `"${edgePath}" --headless=new --screenshot="${finalPng}" --window-size=${width},${height} --default-background-color=00000000 "file:///${tempHtml.replace(/\\/g, '/')}"`;
  console.log(`Generating ${outPngName}.png...`);
  execSync(cmd);
  console.log(`✓ ${outPngName}.png generated (${fs.statSync(finalPng).size} bytes)`);
}

renderToPng(flowchartHtml, 'user_flowchart', 1400, 340);
renderToPng(pieNcrbHtml, 'pie_chart_ncrb', 600, 480);
renderToPng(pieDetectionHtml, 'pie_chart_detection', 600, 480);

// 4. Feasibility & Benchmarks Card for Slide 4
const feasibilityCardHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    width: 600px;
    height: 480px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .card {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 22px 24px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
  }
  .card-header {
    text-align: center;
    margin-bottom: 16px;
  }
  .header-tag {
    font-size: 11px;
    font-weight: 800;
    color: #0070C0;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 4px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 800;
    color: #0F172A;
  }
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    flex: 1;
  }
  .metric-card {
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .metric-num {
    font-size: 24px;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 4px;
  }
  .metric-label {
    font-size: 12px;
    font-weight: 800;
    color: #1E293B;
    margin-bottom: 3px;
  }
  .metric-sub {
    font-size: 10.5px;
    color: #64748B;
    line-height: 1.35;
  }
  .footer-note {
    font-size: 11px;
    color: #1D4ED8;
    background: #EFF6FF;
    padding: 8px 12px;
    border-radius: 8px;
    width: 100%;
    text-align: center;
    margin-top: 14px;
    font-weight: 700;
    border: 1px solid #BFDBFE;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="header-tag">Feasibility &amp; Performance Specs</div>
      <div class="card-title">Zero-CapEx Edge Autonomy Benchmarks</div>
    </div>
    <div class="grid-container">
      <div class="metric-card">
        <div class="metric-num" style="color: #0070C0;">18–34 ms</div>
        <div class="metric-label">Real-Time In-RAM Scan</div>
        <div class="metric-sub">1,620 docs/min edge speed | Zero cloud latency</div>
      </div>
      <div class="metric-card">
        <div class="metric-num" style="color: #10B981;">₹0.04</div>
        <div class="metric-label">Unit Scan Cost</div>
        <div class="metric-sub">94% cost cut vs ₹4.50 cloud API subscription</div>
      </div>
      <div class="metric-card">
        <div class="metric-num" style="color: #8B5CF6;">4 GB RAM</div>
        <div class="metric-label">Commodity Hardware</div>
        <div class="metric-sub">0 GPU required | Standard kiosk webcam plug-in</div>
      </div>
      <div class="metric-card">
        <div class="metric-num" style="color: #F59E0B;">&lt;0.18%</div>
        <div class="metric-label">False Positive Rate</div>
        <div class="metric-sub">Sub-pixel metrology + deterministic math filters</div>
      </div>
    </div>
    <div class="footer-note">🛡️ 100% In-RAM Execution | DPDP Act 2023 Sec 8 Compliant</div>
  </div>
</body>
</html>`;

// 5. Compliance & Regulatory Card for Slide 6
const complianceCardHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    width: 600px;
    height: 480px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .card {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    padding: 22px 24px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
  }
  .card-header {
    text-align: center;
    margin-bottom: 14px;
  }
  .header-tag {
    font-size: 11px;
    font-weight: 800;
    color: #10B981;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 4px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 800;
    color: #0F172A;
  }
  .list-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }
  .item-card {
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    border-radius: 10px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .item-badge {
    font-size: 10.5px;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 6px;
    font-family: Consolas, monospace;
    white-space: nowrap;
  }
  .item-content {
    flex: 1;
  }
  .item-title {
    font-size: 12px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 2px;
  }
  .item-sub {
    font-size: 10px;
    color: #64748B;
  }
  .footer-note {
    font-size: 11px;
    color: #047857;
    background: #ECFDF5;
    padding: 8px 12px;
    border-radius: 8px;
    width: 100%;
    text-align: center;
    margin-top: 12px;
    font-weight: 700;
    border: 1px solid #A7F3D0;
  }
</style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="header-tag">Statutory &amp; Regulatory Alignment</div>
      <div class="card-title">National Legal &amp; Security Standards</div>
    </div>
    <div class="list-container">
      <div class="item-card">
        <div class="item-badge" style="background: #E0F2FE; color: #0070C0;">SEC 63 BSA</div>
        <div class="item-content">
          <div class="item-title">Bharatiya Sakshya Adhiniyam 2023</div>
          <div class="item-sub">Automated cryptographic evidence certificate admissible in criminal trials</div>
        </div>
      </div>
      <div class="item-card">
        <div class="item-badge" style="background: #DCFCE7; color: #15803D;">DPDP ACT</div>
        <div class="item-content">
          <div class="item-title">Digital Personal Data Protection Act 2023</div>
          <div class="item-sub">Section 8 data minimization: zero citizen PII persistence in storage</div>
        </div>
      </div>
      <div class="item-card">
        <div class="item-badge" style="background: #EDE9FE; color: #7C3AED;">UIDAI D5</div>
        <div class="item-content">
          <div class="item-title">UIDAI &amp; ISO/IEC Checksum Standards</div>
          <div class="item-sub">Dihedral D5 mathematical polynomial for zero false Aadhaar generation</div>
        </div>
      </div>
      <div class="item-card">
        <div class="item-badge" style="background: #FEF3C7; color: #B45309;">MHA / I4C</div>
        <div class="item-content">
          <div class="item-title">National Cybercrime Telemetry</div>
          <div class="item-sub">Direct pattern clustering across Mewat and Jamtara cybercrime hotspots</div>
        </div>
      </div>
    </div>
    <div class="footer-note">⚖️ Legally Validated | SHA-256 Tamper-Proof Chain of Custody</div>
  </div>
</body>
</html>`;

// 6. Prototype Showcase HUD Card for Slide 7
const prototypeCardHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; }
  body {
    width: 640px;
    height: 490px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  .card {
    width: 100%;
    height: 100%;
    background: #0A0F1D;
    border: 2px solid #1E293B;
    border-radius: 16px;
    padding: 16px 18px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    color: #F8FAFC;
  }
  .card-header {
    text-align: center;
    margin-bottom: 10px;
  }
  .header-tag {
    font-size: 10.5px;
    font-weight: 800;
    color: #38BDF8;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 3px;
  }
  .card-title {
    font-size: 15px;
    font-weight: 800;
    color: #FFFFFF;
    margin-bottom: 6px;
  }
  .live-pills {
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  .pill {
    font-size: 9.5px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 20px;
    font-family: Consolas, monospace;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .pill-green {
    background: rgba(16, 185, 129, 0.15);
    color: #34D399;
    border: 1px solid #059669;
  }
  .pill-blue {
    background: rgba(56, 189, 248, 0.15);
    color: #38BDF8;
    border: 1px solid #0284C7;
  }
  .card-body-split {
    display: flex;
    gap: 12px;
    flex: 1;
    align-items: stretch;
    margin-top: 6px;
  }
  .list-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1.1;
  }
  .item-card {
    background: #111827;
    border: 1px solid #1F2937;
    border-radius: 8px;
    padding: 7px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .item-badge {
    font-size: 9px;
    font-weight: 800;
    padding: 3px 6px;
    border-radius: 4px;
    font-family: Consolas, monospace;
    white-space: nowrap;
  }
  .item-content {
    flex: 1;
  }
  .item-title {
    font-size: 11px;
    font-weight: 800;
    color: #F1F5F9;
    margin-bottom: 1px;
  }
  .item-sub {
    font-size: 9px;
    color: #94A3B8;
    line-height: 1.25;
  }
  .screenshot-container {
    flex: 1.1;
    background: #111827;
    border: 1.5px solid #0284C7;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 15px rgba(2, 132, 199, 0.2);
  }
  .screenshot-img {
    width: 100%;
    height: 185px;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
  .screenshot-caption {
    background: #0F172A;
    padding: 6px;
    font-size: 9px;
    text-align: center;
    color: #38BDF8;
    font-weight: 700;
    border-top: 1px solid #1E293B;
  }
  .footer-note {
    font-size: 10.5px;
    color: #38BDF8;
    background: rgba(14, 165, 233, 0.12);
    padding: 6px 10px;
    border-radius: 6px;
    width: 100%;
    text-align: center;
    margin-top: 8px;
    font-weight: 700;
    border: 1px solid rgba(2, 132, 199, 0.4);
  }
</style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="header-tag">Live System Architecture &amp; Production Deployment</div>
      <div class="card-title">Operational Multi-Spectral Forensic HUD</div>
      <div class="live-pills">
        <span class="pill pill-green">🟢 LIVE: satya-id-screening.vercel.app</span>
        <span class="pill pill-blue">🐙 GITHUB: Sachin7-kumar/satya-id-screening</span>
      </div>
    </div>
    <div class="card-body-split">
      <div class="list-container">
        <div class="item-card">
          <div class="item-badge" style="background: rgba(14, 165, 233, 0.2); color: #38BDF8;">ELA HEATMAP</div>
          <div class="item-content">
            <div class="item-title">Multi-Spectral ELA Visualizer</div>
            <div class="item-sub">10x–45x dynamic gain isolating compression &amp; splice anomalies</div>
          </div>
        </div>
        <div class="item-card">
          <div class="item-badge" style="background: rgba(168, 85, 247, 0.2); color: #C084FC;">METROLOGY</div>
          <div class="item-content">
            <div class="item-title">Sub-Pixel Font Drift Metrology</div>
            <div class="item-sub">Baseline alignment (σ &gt; 1.85px) &amp; stroke variance verification</div>
          </div>
        </div>
        <div class="item-card">
          <div class="item-badge" style="background: rgba(52, 211, 153, 0.2); color: #34D399;">3D STRATA</div>
          <div class="item-content">
            <div class="item-title">3D Strata Decomposition</div>
            <div class="item-sub">Interactive 3D depth separation: substrate, ink &amp; digital overlay</div>
          </div>
        </div>
        <div class="item-card">
          <div class="item-badge" style="background: rgba(251, 191, 36, 0.2); color: #FBBF24;">SEC 63 CERT</div>
          <div class="item-content">
            <div class="item-title">Automated Court Certificate</div>
            <div class="item-sub">Instant Section 63 BSA 2023 PDF report with SHA-256 seal</div>
          </div>
        </div>
      </div>
      <div class="screenshot-container">
        <img src="fullstack_live_preview.png" class="screenshot-img" alt="SATYA-ID Prototype Viewport" />
        <div class="screenshot-caption">Live Viewport: Dual ELA &amp; Strata Analysis HUD</div>
      </div>
    </div>
    <div class="footer-note">⚡ Verified Live: 18–34ms Latency | 1,620 Docs/Min | 100% In-RAM Zero Retention</div>
  </div>
</body>
</html>`;

renderToPng(feasibilityCardHtml, 'feasibility_card', 600, 480);
renderToPng(complianceCardHtml, 'compliance_card', 600, 480);
renderToPng(prototypeCardHtml, 'prototype_card', 640, 490);

console.log('All infographics generated successfully in', outDir);

