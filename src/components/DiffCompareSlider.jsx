import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundFX } from '../utils/audioFX';

export default function DiffCompareSlider({ sourceCanvas, elaResult, testCase }) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const baseSrc = sourceCanvas ? sourceCanvas.toDataURL() : '';
  const elaSrc = elaResult?.elaCanvas ? elaResult.elaCanvas.toDataURL() : '';

  const handlePointerDown = (e) => {
    isDragging.current = true;
    soundFX.playClick();
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(clampedPct);
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        padding: '1rem',
        background: 'rgba(4, 7, 16, 0.8)',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        userSelect: 'none'
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>⚡</span> INTERACTIVE DIFF WIPE COMPARATOR
        </div>
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          SPLIT: <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{Math.round(sliderPos)}%</span> ORIGINAL vs <span style={{ color: '#ff1744', fontWeight: 'bold' }}>{Math.round(100 - sliderPos)}%</span> ELA RESIDUALS
        </div>
      </div>

      {/* Comparison Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{
          position: 'relative',
          width: '100%',
          height: '340px',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'ew-resize',
          background: '#020409',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.9)'
        }}
      >
        {/* Layer 1: ELA Thermal Heatmap (Full Background) */}
        {elaSrc && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#050a18'
            }}
          >
            <img
              src={elaSrc}
              alt="ELA Heatmap"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
            {/* Tag Right */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'rgba(255, 23, 68, 0.85)',
                color: '#fff',
                fontSize: '0.62rem',
                fontWeight: '800',
                padding: '3px 8px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.5px'
              }}
            >
              ELA COMPRESSION DIFFERENCE
            </div>
          </div>
        )}

        {/* Layer 2: Base Original Document (Clipped by slider position) */}
        {baseSrc && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0b1324'
            }}
          >
            <img
              src={baseSrc}
              alt="Original Document"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
            {/* Tag Left */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                background: 'rgba(0, 240, 255, 0.85)',
                color: '#031124',
                fontSize: '0.62rem',
                fontWeight: '800',
                padding: '3px 8px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.5px'
              }}
            >
              ORIGINAL INGESTED RASTER
            </div>
          </div>
        )}

        {/* Vertical Divider Line with Glow Handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPos}%`,
            width: '2px',
            background: '#fff',
            boxShadow: '0 0 12px #00f0ff, 0 0 25px rgba(0, 240, 255, 0.8)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}
        >
          {/* Handle Knob */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00f0ff, #3b82f6)',
              border: '2px solid #fff',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#030b18',
              fontSize: '0.75rem',
              fontWeight: '900'
            }}
          >
            ↔
          </div>
        </div>
      </div>

      {/* Helper instruction */}
      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center' }}>
        Drag slider left or right to reveal localized compression variances and spliced text boundaries.
      </div>
    </div>
  );
}
