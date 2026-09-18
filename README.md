# SATYA-ID: AI-Based Fake Identity & Document Screening System (React + Vite)
**Smart India Hackathon (SIH) - Ministry of Home Affairs (MHA) / I4C**

A production-grade, multi-tier forensic identity screening web application built with **React**, **Vite**, and **HTML5 Canvas**.

---

## 🚀 How to Run the React App

In this directory (`D:\react\satya-id-screening`):

### 1. Start Development Server
```bash
npm run dev
```
Then open the displayed local URL (typically `http://localhost:5173`) in your browser.

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Architecture
```
D:\react\satya-id-screening/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                # Government tricolor & system status bar
│   │   ├── StatsBanner.jsx           # Real stats (67L SIMs, 65k cases, ₹1400+ Cr loss)
│   │   ├── Toolbar.jsx               # Quick launch buttons (Pitch deck, certificate)
│   │   ├── TestSuiteSelector.jsx     # 5 preset test cases + custom drag-drop upload
│   │   ├── ForensicCanvasViewer.jsx  # Dual canvas with ELA heatmap & sensitivity sliders
│   │   ├── DiagnosticCard.jsx        # Trust score gauge & 5-tier diagnostic statuses
│   │   ├── AnalyticsDashboard.jsx    # National cyber crime threat analytics & syndicate radar
│   │   ├── ResearchGapsSection.jsx   # 5 unsolved technical gaps resolved by SATYA-ID
│   │   ├── CertificateModal.jsx      # BSA 2023 / Sec 65B Electronic Examination Certificate
│   │   └── PresentationModal.jsx     # 16:9 interactive SIH pitch deck with speaker notes
│   ├── data/
│   │   ├── testCases.js              # 5 pre-loaded test documents & canvas synthesis
│   │   └── slides.js                 # 12 official SIH slides with jury talking points
│   ├── forensics/
│   │   ├── checksums.js              # Verhoeff D5 algorithm, PAN syntax rules, MRZ weights
│   │   ├── ela.js                    # Canvas JPEG difference & thermal heatmap engine
│   │   ├── fontAnalysis.js           # Sub-pixel baseline alignment jitter (σ) & kerning
│   │   └── faceMorph.js              # Biometric frequency-domain diffusion & inpainting detection
│   ├── App.jsx                       # Main application state & orchestrator
│   └── index.css                     # Defense/law-enforcement dark theme stylesheet
├── RESEARCH_REPORT_AND_CASE_STUDIES.md# Full academic SOTA review, unsolved gaps & case studies
├── SIH_PRESENTATION_DECK.md          # Complete 12-slide pitch deck text and speaker notes
└── package.json                      # Scripts & dependencies
```

---

## 🎯 Hackathon Presentation Highlights
1. **Interactive 16:9 SIH Pitch Deck Mode**: Click **"Present SIH Pitch Deck"** to deliver your presentation directly inside the web app with keyboard navigation (`Arrow keys`, `Spacebar`, `N` for speaker notes, `Esc` to exit).
2. **1-Click Pre-Loaded Test Cases**: Test 5 realistic attack vectors without needing judges to search for personal IDs.
3. **Court-Ready Evidence**: Generate printable Section 65B (BSA 2023) digital forensic certificates with SHA-256 evidence digests.
