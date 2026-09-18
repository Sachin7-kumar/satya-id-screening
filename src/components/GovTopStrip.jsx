import React, { useState } from 'react';

export default function GovTopStrip() {
  const [lang, setLang] = useState('en');

  const handleFontSize = (action) => {
    const root = document.documentElement;
    const current = parseFloat(getComputedStyle(root).fontSize) || 16;
    if (action === 'inc' && current < 20) root.style.fontSize = (current + 1) + 'px';
    if (action === 'dec' && current > 12) root.style.fontSize = (current - 1) + 'px';
    if (action === 'reset') root.style.fontSize = '16px';
  };

  return (
    <div className="gov-top-wrapper">
      {/* Official Saffron-White-Green Tricolor Ribbon */}
      <div className="gov-tricolor-ribbon"></div>

      {/* Top Utility Strip */}
      <div className="gov-utility-strip">
        <div className="gov-utility-container">
          <div className="gov-utility-left">
            <span className="gov-flag-emblem">🇮🇳</span>
            <span className="gov-hindi-title">भारत सरकार</span>
            <span className="gov-pipe">|</span>
            <span className="gov-eng-title">GOVERNMENT OF INDIA</span>
            <span className="gov-pipe">|</span>
            <span className="gov-dept-title">गृह मंत्रालय (MINISTRY OF HOME AFFAIRS)</span>
          </div>

          <div className="gov-utility-right">
            <a href="#mainContent" className="gov-skip-link">Skip to main content</a>
            <span className="gov-pipe">|</span>
            <div className="gov-accessibility-controls">
              <span className="accessibility-label">Text Size:</span>
              <button onClick={() => handleFontSize('dec')} title="Decrease text size" className="gov-a-btn">A-</button>
              <button onClick={() => handleFontSize('reset')} title="Normal text size" className="gov-a-btn">A</button>
              <button onClick={() => handleFontSize('inc')} title="Increase text size" className="gov-a-btn">A+</button>
            </div>
            <span className="gov-pipe">|</span>
            <button 
              className="gov-lang-btn" 
              onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
              title="Toggle Language"
            >
              {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
