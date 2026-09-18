import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundFX } from '../utils/audioFX';

export default function Exploded3DInspector({ sourceCanvas, elaResult, testCase }) {
  const [explosionDepth, setExplosionDepth] = useState(48);
  const [rotX, setRotX] = useState(24);
  const [rotY, setRotY] = useState(-25);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [visibleLayers, setVisibleLayers] = useState({
    base: true,
    ela: true,
    font: true,
    biometrics: true,
    anomaly: true
  });

  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const baseImageSrc = sourceCanvas ? sourceCanvas.toDataURL() : '';
  const elaImageSrc = elaResult?.elaCanvas ? elaResult.elaCanvas.toDataURL() : '';

  // Auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpin) return;
    const interval = setInterval(() => {
      setRotY((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoSpin]);

  // Interactive mouse drag orbit in 3D
  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setRotY((prev) => prev + dx * 0.5);
    setRotX((prev) => Math.max(-60, Math.min(80, prev - dy * 0.5)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const toggleLayer = (layerKey) => {
    soundFX.playClick();
    setVisibleLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div
      className="exploded-3d-container"
      style={{
        background: 'rgba(5, 9, 18, 0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        padding: '1.5rem',
        margin: '1.2rem 0',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 240, 255, 0.08)',
        userSelect: 'none'
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: '800',
              color: 'var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <span>🧊</span> 3D ISOMETRIC MULTI-STRATA DOCUMENT EXPLODER
            <span
              style={{
                fontSize: '0.65rem',
                background: 'rgba(0, 240, 255, 0.15)',
                color: 'var(--accent-cyan)',
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid rgba(0, 240, 255, 0.3)'
              }}
            >
              PHYSICS ENGINE
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Click & drag viewport to orbit in 3D. Inspect layer-by-layer compression anomalies, glyph baselines, and biometric seams.
          </p>
        </div>

        {/* Sliders & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Strata Separation:
            </label>
            <input
              type="range"
              min="0"
              max="90"
              value={explosionDepth}
              onChange={(e) => setExplosionDepth(parseInt(e.target.value, 10))}
              style={{ accentColor: 'var(--accent-cyan)', cursor: 'pointer', width: '110px' }}
            />
            <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', minWidth: '40px' }}>
              {explosionDepth}px
            </span>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              setIsAutoSpin(!isAutoSpin);
            }}
            className={`btn ${isAutoSpin ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          >
            {isAutoSpin ? '⏹️ Stop Spin' : '🔄 Auto-Orbit'}
          </button>
        </div>
      </div>

      {/* Layer Visibility Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <button
          onClick={() => toggleLayer('base')}
          style={{
            fontSize: '0.72rem',
            padding: '4px 10px',
            borderRadius: '6px',
            border: visibleLayers.base ? '1px solid #ffffff' : '1px solid #334155',
            background: visibleLayers.base ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {visibleLayers.base ? '✓' : '✗'} L1: Physical Card
        </button>

        <button
          onClick={() => toggleLayer('ela')}
          style={{
            fontSize: '0.72rem',
            padding: '4px 10px',
            borderRadius: '6px',
            border: visibleLayers.ela ? '1px solid #00f0ff' : '1px solid #334155',
            background: visibleLayers.ela ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
            color: '#00f0ff',
            cursor: 'pointer'
          }}
        >
          {visibleLayers.ela ? '✓' : '✗'} L2: ELA Thermal Matrix
        </button>

        <button
          onClick={() => toggleLayer('font')}
          style={{
            fontSize: '0.72rem',
            padding: '4px 10px',
            borderRadius: '6px',
            border: visibleLayers.font ? '1px solid #f59e0b' : '1px solid #334155',
            background: visibleLayers.font ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            color: '#f59e0b',
            cursor: 'pointer'
          }}
        >
          {visibleLayers.font ? '✓' : '✗'} L3: Font Vectors
        </button>

        <button
          onClick={() => toggleLayer('biometrics')}
          style={{
            fontSize: '0.72rem',
            padding: '4px 10px',
            borderRadius: '6px',
            border: visibleLayers.biometrics ? '1px solid #a855f7' : '1px solid #334155',
            background: visibleLayers.biometrics ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
            color: '#a855f7',
            cursor: 'pointer'
          }}
        >
          {visibleLayers.biometrics ? '✓' : '✗'} L4: Biometric Seams
        </button>

        <button
          onClick={() => toggleLayer('anomaly')}
          style={{
            fontSize: '0.72rem',
            padding: '4px 10px',
            borderRadius: '6px',
            border: visibleLayers.anomaly ? '1px solid #ef4444' : '1px solid #334155',
            background: visibleLayers.anomaly ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
            color: '#ef4444',
            cursor: 'pointer'
          }}
        >
          {visibleLayers.anomaly ? '✓' : '✗'} L5: Anomaly Callouts
        </button>
      </div>

      {/* 3D Isometric Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{
          perspective: 1400,
          minHeight: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '2.5rem 1rem',
          cursor: isDragging.current ? 'grabbing' : 'grab',
          background: 'radial-gradient(circle at center, rgba(12, 22, 44, 0.4) 0%, rgba(2, 5, 12, 0.8) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255, 255, 255, 0.4)',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '3px 8px',
            borderRadius: '4px'
          }}
        >
          ROT: X={Math.round(rotX)}° | Y={Math.round(rotY)}° | Z-SEP={explosionDepth}px
        </div>

        <motion.div
          style={{
            position: 'relative',
            width: '420px',
            height: '260px',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`
          }}
          animate={{
            rotateX: rotX,
            rotateY: rotY
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          {/* Layer 1: Base Physical Document */}
          {visibleLayers.base && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9)',
                background: '#fff',
                transform: `translateZ(0px)`,
                overflow: 'hidden',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {baseImageSrc && (
                <img src={baseImageSrc} alt="Base Layer" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  left: 6,
                  background: 'rgba(0, 0, 0, 0.85)',
                  color: '#fff',
                  fontSize: '0.62rem',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                LAYER 1: PHYSICAL CARD RASTER
              </div>
            </div>
          )}

          {/* Layer 2: Error Level Analysis Thermal Heatmap */}
          {visibleLayers.ela && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                border: '2px solid var(--accent-cyan)',
                background: 'transparent',
                transform: `translateZ(${explosionDepth * 1}px)`,
                opacity: 0.85,
                pointerEvents: 'none',
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.25)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {elaImageSrc && (
                <img src={elaImageSrc} alt="ELA Layer" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  left: 6,
                  background: 'rgba(0, 240, 255, 0.9)',
                  color: '#031124',
                  fontSize: '0.62rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                LAYER 2: ELA COMPRESSION THERMAL RESIDUALS
              </div>
            </div>
          )}

          {/* Layer 3: Typography & Sub-Pixel Baseline Jitter Grid */}
          {visibleLayers.font && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                border: '2px dashed var(--accent-gold)',
                background: 'rgba(245, 158, 11, 0.05)',
                transform: `translateZ(${explosionDepth * 2}px)`,
                pointerEvents: 'none',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Grid Vector Lines */}
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '35%', left: '25%', right: '10%', height: '1px', background: 'var(--accent-gold)' }}></div>
                <div style={{ position: 'absolute', top: '48%', left: '25%', right: '10%', height: '1px', background: 'var(--accent-gold)' }}></div>
                <div style={{ position: 'absolute', top: '75%', left: '20%', right: '20%', height: '1px', background: 'var(--accent-gold)' }}></div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  left: 6,
                  background: 'rgba(245, 158, 11, 0.9)',
                  color: '#031124',
                  fontSize: '0.62rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                LAYER 3: SUB-PIXEL FONT BASELINE & KERNING VECTORS
              </div>
            </div>
          )}

          {/* Layer 4: Biometric Face Seam Heatmap */}
          {visibleLayers.biometrics && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                border: '2px solid #a855f7',
                background: 'rgba(168, 85, 247, 0.04)',
                transform: `translateZ(${explosionDepth * 3}px)`,
                pointerEvents: 'none',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Facial Bounding Zone */}
              <div
                style={{
                  position: 'absolute',
                  top: '18%',
                  left: '6%',
                  width: '65px',
                  height: '80px',
                  border: '1.5px solid #a855f7',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: 0,
                    background: '#a855f7',
                    color: '#fff',
                    fontSize: '0.5rem',
                    fontWeight: 'bold',
                    padding: '1px 4px',
                    borderRadius: '2px'
                  }}
                >
                  BIOMETRIC CONTOUR
                </span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  left: 6,
                  background: 'rgba(168, 85, 247, 0.9)',
                  color: '#fff',
                  fontSize: '0.62rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                LAYER 4: LAPLACIAN BIOMETRIC FACE MORPH SEAMS
              </div>
            </div>
          )}

          {/* Layer 5: Anomaly Callouts & Tamper Spikes */}
          {visibleLayers.anomaly && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                border: '2px solid var(--accent-red)',
                background: 'transparent',
                transform: `translateZ(${explosionDepth * 4}px)`,
                pointerEvents: 'none',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {testCase?.data?.isTampered && (
                <div
                  style={{
                    position: 'absolute',
                    top: '32%',
                    left: '24%',
                    width: '130px',
                    height: '40px',
                    border: '2px solid #ff1744',
                    background: 'rgba(255, 23, 68, 0.25)',
                    borderRadius: '4px',
                    boxShadow: '0 0 15px rgba(255, 23, 68, 0.6)'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: 0,
                      background: '#ff1744',
                      color: '#fff',
                      fontSize: '0.6rem',
                      fontWeight: '800',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    ⚠️ TAMPER SPIKE DETECTED
                  </span>
                </div>
              )}
              <div
                style={{
                  position: 'absolute',
                  bottom: 6,
                  left: 6,
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: '#fff',
                  fontSize: '0.62rem',
                  fontWeight: 'bold',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                LAYER 5: FORENSIC ANOMALY POINTERS
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Angle Presets */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button
          className="btn btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          onClick={() => {
            soundFX.playClick();
            setRotX(24);
            setRotY(-25);
          }}
        >
          📐 Isometric Angle
        </button>
        <button
          className="btn btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          onClick={() => {
            soundFX.playClick();
            setRotX(55);
            setRotY(-35);
          }}
        >
          🔍 Top-Down Perspective
        </button>
        <button
          className="btn btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          onClick={() => {
            soundFX.playClick();
            setRotX(10);
            setRotY(75);
          }}
        >
          ⚡ Side Cross-Section
        </button>
        <button
          className="btn btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
          onClick={() => {
            soundFX.playClick();
            setRotX(0);
            setRotY(0);
          }}
        >
          📋 Flat Stack
        </button>
      </div>
    </div>
  );
}
