import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/audioFX';

export default function LaserScanHUD({ isScanning, onComplete, testCase }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('INGESTION');
  const [scrambledText, setScrambledText] = useState('INITIALIZING_NEURAL_KERNEL');

  const stages = [
    { p: 15, text: 'CALCULATING_SHA256_FINGERPRINT', label: 'Hashing & Integrity' },
    { p: 35, text: 'EXECUTING_VERHOEFF_D5_POLYNOMIAL', label: 'Algorithmic Checksums' },
    { p: 60, text: 'ANALYZING_JPEG_DCT_COEFFICIENTS', label: 'Error Level Analysis' },
    { p: 80, text: 'COMPUTING_SUBPIXEL_FONT_BASELINE_SD', label: 'Micro-Typography' },
    { p: 95, text: 'LAPLACIAN_SPECTRAL_FACE_MORPH_SCAN', label: 'Biometric Screening' },
    { p: 100, text: 'SYNTHESIS_COMPLETE_VERDICT_LOCKED', label: 'Evaluation Complete' }
  ];

  useEffect(() => {
    if (!isScanning) {
      setScanProgress(0);
      return;
    }

    soundFX.playScanSweep();
    let currentP = 0;
    const interval = setInterval(() => {
      currentP += 4;
      if (currentP >= 100) {
        currentP = 100;
        setScanProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      } else {
        setScanProgress(currentP);
        const st = stages.find((s) => currentP <= s.p) || stages[stages.length - 1];
        setCurrentStage(st.label);
        setScrambledText(st.text);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isScanning, onComplete]);

  if (!isScanning) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="laser-scan-hud-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 50,
          borderRadius: 'inherit',
          overflow: 'hidden',
          background: 'rgba(5, 10, 20, 0.45)',
          backdropFilter: 'blur(2px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.2rem',
          boxShadow: 'inset 0 0 40px rgba(0, 240, 255, 0.3)'
        }}
      >
        {/* Animated Sweeping Laser Bar */}
        <motion.div
          animate={{
            top: ['0%', '98%', '0%']
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #00f0ff, #ffffff, #00f0ff, transparent)',
            boxShadow: '0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.8)',
            zIndex: 10
          }}
        />

        {/* Top HUD Diagnostics */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="pulse-dot" style={{ background: 'var(--accent-cyan)', boxShadow: '0 0 10px #00f0ff' }}></span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: '700', letterSpacing: '1px' }}>
              BIOMETRIC LASER HUD // LIVE
            </span>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fff', fontWeight: '800' }}>
            {scanProgress}%
          </div>
        </div>

        {/* Center Target Crosshairs */}
        <div style={{ position: 'relative', alignSelf: 'center', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              border: '1px dashed rgba(0, 240, 255, 0.6)',
              borderRadius: '50%'
            }}
          />
          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: '12px',
              border: '2px solid rgba(0, 240, 255, 0.3)',
              borderTopColor: 'var(--accent-cyan)',
              borderBottomColor: 'var(--accent-cyan)',
              borderRadius: '50%'
            }}
          />
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: '700' }}>
            LOCKING
          </span>
        </div>

        {/* Bottom Status Ticker */}
        <div style={{ zIndex: 12, background: 'rgba(3, 7, 15, 0.8)', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
            <span>PHASE: {currentStage}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{scrambledText}</span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00f0ff, #3b82f6)',
                boxShadow: '0 0 10px #00f0ff'
              }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
