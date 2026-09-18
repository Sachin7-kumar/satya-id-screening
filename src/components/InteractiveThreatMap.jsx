import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/audioFX';

export default function InteractiveThreatMap() {
  const [selectedHub, setSelectedHub] = useState('mewat');

  const hubs = [
    {
      id: 'mewat',
      name: 'Mewat / Nuh Corridor',
      state: 'Haryana',
      coords: { x: 38, y: 35 },
      threatLevel: 'CRITICAL',
      color: '#ef4444',
      blockedSims: '42,190',
      activeCases: '1,420',
      seizedPvc: '8,500+',
      template: 'TEMPL-MHA-8902',
      modus: 'Bulk ghost SIM issuance using cloned UIDAI Aadhaar biometric slips and altered birth years for OTP banking fraud.'
    },
    {
      id: 'jamtara',
      name: 'Jamtara & Deoghar Cluster',
      state: 'Jharkhand',
      coords: { x: 68, y: 48 },
      threatLevel: 'CRITICAL',
      color: '#ef4444',
      blockedSims: '28,450',
      activeCases: '980',
      seizedPvc: '4,200+',
      template: 'TEMPL-MHA-4418',
      modus: 'Synthetic identity generation combining real PAN prefixes with fake names to open mule bank accounts for phishing extortion.'
    },
    {
      id: 'bengal',
      name: 'North 24 Parganas Border',
      state: 'West Bengal',
      coords: { x: 78, y: 55 },
      threatLevel: 'HIGH',
      color: '#f59e0b',
      blockedSims: '14,800',
      activeCases: '630',
      seizedPvc: '2,900+',
      template: 'TEMPL-MHA-7712',
      modus: 'AI-morphed portrait fabrication on travel passports and voter IDs targeting international airport e-gate bypass.'
    },
    {
      id: 'alwar',
      name: 'Alwar & Bharatpur Belt',
      state: 'Rajasthan',
      coords: { x: 34, y: 42 },
      threatLevel: 'HIGH',
      color: '#f59e0b',
      blockedSims: '19,200',
      activeCases: '540',
      seizedPvc: '12,000+',
      template: 'TEMPL-MHA-3301',
      modus: 'Industrial counterfeit PVC card printing using Photoshop templates with mismatched Verhoeff polynomials.'
    },
    {
      id: 'delhi',
      name: 'I4C Central Command HQ',
      state: 'New Delhi',
      coords: { x: 42, y: 32 },
      threatLevel: 'COMMAND HUB',
      color: '#00f0ff',
      blockedSims: '67,20,410 (National)',
      activeCases: '65,893',
      seizedPvc: '1,80,000+',
      template: 'SATYA-ID KERNEL v2.5',
      modus: 'Real-time multi-tier digital forensic screening, SHA-256 court evidence ledger, and national syndicate linkage.'
    }
  ];

  const currentHub = hubs.find((h) => h.id === selectedHub) || hubs[0];

  const handleSelect = (id) => {
    soundFX.playClick();
    setSelectedHub(id);
  };

  return (
    <div
      style={{
        background: 'rgba(8, 14, 26, 0.75)',
        backdropFilter: 'blur(16px)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        padding: '1.5rem',
        margin: '1.5rem 0',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🗺️</span> National Identity Forgery Syndicate Radar (MHA / I4C Feed)
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            Interactive geospatial intelligence tracking active counterfeit printing rings, ghost SIM clusters, and seized templates.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
          LIVE RADAR ACTIVE
        </div>
      </div>

      {/* Grid Layout: Radar Map + Intel Dossier */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
        
        {/* Interactive Geospatial Radar Map Container */}
        <div
          style={{
            position: 'relative',
            height: '340px',
            background: 'radial-gradient(circle at center, #0c182c 0%, #03060f 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.9)'
          }}
        >
          {/* Radar Sweep Rings */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ width: '100px', height: '100px', border: '1px dashed rgba(0, 240, 255, 0.15)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', width: '200px', height: '200px', border: '1px solid rgba(0, 240, 255, 0.1)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', width: '300px', height: '300px', border: '1px dashed rgba(0, 240, 255, 0.05)', borderRadius: '50%' }} />
          </div>

          {/* India Stylized Vector Outline */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.22,
              pointerEvents: 'none'
            }}
          >
            <path
              d="M 35 15 Q 45 10 50 15 Q 58 20 60 28 Q 70 32 82 40 Q 88 48 80 58 Q 70 65 65 75 Q 55 92 48 95 Q 40 85 35 70 Q 25 58 22 45 Q 25 30 35 15 Z"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="0.8"
            />
          </svg>

          {/* Interactive Hub Hotspots */}
          {hubs.map((hub) => {
            const isSelected = selectedHub === hub.id;
            return (
              <div
                key={hub.id}
                onClick={() => handleSelect(hub.id)}
                style={{
                  position: 'absolute',
                  left: `${hub.coords.x}%`,
                  top: `${hub.coords.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 20 : 10
                }}
              >
                {/* Outer Ripple */}
                <motion.div
                  animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: '-8px',
                    borderRadius: '50%',
                    border: `1.5px solid ${hub.color}`,
                    pointerEvents: 'none'
                  }}
                />

                {/* Center Node */}
                <div
                  style={{
                    width: isSelected ? '18px' : '12px',
                    height: isSelected ? '18px' : '12px',
                    borderRadius: '50%',
                    background: hub.color,
                    boxShadow: `0 0 15px ${hub.color}`,
                    border: '2px solid #fff',
                    transition: 'all 0.2s ease'
                  }}
                />

                {/* Node Label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: isSelected ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.65)',
                    border: isSelected ? `1px solid ${hub.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isSelected ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.62rem',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.8)'
                  }}
                >
                  {hub.name.split(' ')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Intelligence Dossier Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHub.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'rgba(5, 9, 18, 0.9)',
              border: `1px solid ${currentHub.color}60`,
              borderRadius: '12px',
              padding: '1.25rem',
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px ${currentHub.color}20`
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: currentHub.color, fontWeight: 'bold' }}>
                  LOCATION TELEMETRY
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>
                  {currentHub.name} ({currentHub.state})
                </h3>
              </div>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: `${currentHub.color}25`,
                  color: currentHub.color,
                  border: `1px solid ${currentHub.color}`
                }}
              >
                {currentHub.threatLevel}
              </span>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Blocked SIMs:</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff' }}>
                  {currentHub.blockedSims}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Active FIRs:</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff' }}>
                  {currentHub.activeCases}
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.6rem', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Seized PVCs:</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'var(--font-mono)', color: '#fff' }}>
                  {currentHub.seizedPvc}
                </div>
              </div>
            </div>

            {/* Modus Operandi & PSD Template */}
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '0.8rem' }}>
              <strong>Modus Operandi:</strong> {currentHub.modus}
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.2)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
              PRIMARY TEMPLATE FINGERPRINT: <strong>{currentHub.template}</strong>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
