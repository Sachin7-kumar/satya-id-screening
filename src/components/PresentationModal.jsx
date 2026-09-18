import React, { useState, useEffect } from 'react';
import { SIH_SLIDES } from '../data/slides';

export default function PresentationModal({ isOpen, onClose }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(SIH_SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSlide = SIH_SLIDES[currentSlideIndex];

  return (
    <div className="deck-modal active">
      <div className="deck-topbar">
        <div className="deck-brand">
          <span>🇮🇳</span> SATYA-ID | SIH 2025 OFFICIAL IDEA PRESENTATION (6-SLIDE TEMPLATE)
        </div>
        <div className="deck-controls">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Slide {currentSlideIndex + 1} of {SIH_SLIDES.length}
          </span>
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="btn btn-secondary"
          >
            ◀ Prev
          </button>
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(SIH_SLIDES.length - 1, prev + 1))}
            disabled={currentSlideIndex === SIH_SLIDES.length - 1}
            className="btn btn-primary"
          >
            Next ▶
          </button>
          <a
            href="/SIH2026-IDEA-Presentation-SATYA-ID.pdf"
            download="SIH2026-IDEA-Presentation-SATYA-ID.pdf"
            className="btn btn-primary"
            style={{ textDecoration: 'none', background: '#0070C0', color: '#fff' }}
          >
            📄 Download Official 2026 PDF
          </a>
          <a
            href="/SIH2026-IDEA-Presentation-SATYA-ID.pptx"
            download="SIH2026-IDEA-Presentation-SATYA-ID.pptx"
            className="btn btn-gold"
            style={{ textDecoration: 'none' }}
          >
            📥 Download 2026 PPTX
          </a>
          <a
            href="/presentation.html"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            🖨️ PDF Print View
          </a>
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className="btn btn-secondary"
          >
            📝 Notes [N]
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            ✕ Exit [Esc]
          </button>
        </div>
      </div>

      <div className="deck-slide-frame">
        <div className="deck-slide-content-wrapper">
          {currentSlideIndex > 0 && (
            <div className="deck-slide-header">
              <div className="deck-slide-category">{currentSlide.category}</div>
              <div className="deck-slide-badge">{currentSlide.badge}</div>
            </div>
          )}
          {currentSlideIndex > 0 && (
            <h2 className="deck-slide-title">{currentSlide.title}</h2>
          )}

          <div
            className="deck-slide-body"
            dangerouslySetInnerHTML={{ __html: currentSlide.content }}
          />
        </div>
      </div>

      {showNotes && (
        <div className="speaker-notes-drawer active">
          <strong>SPEAKER NOTES (TALKING POINTS FOR JURY):</strong>
          <div style={{ marginTop: '0.35rem' }}>{currentSlide.notes}</div>
        </div>
      )}
    </div>
  );
}
