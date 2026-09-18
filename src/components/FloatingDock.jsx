import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/audioFX';

export default function FloatingDock({
  onOpenGemini,
  onOpenDeck,
  onOpenCert,
  onToggle3D,
  is3DActive,
  onTriggerScan,
  onScrollToSection
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [audioMuted, setAudioMuted] = useState(false);

  const handleAudioToggle = () => {
    const isEnabled = soundFX.toggle();
    setAudioMuted(!isEnabled);
    soundFX.playClick();
  };

  const dockItems = [
    {
      id: 'scan',
      label: 'Trigger Laser Scan',
      icon: '⚡',
      color: '#00f0ff',
      onClick: () => {
        soundFX.playClick();
        if (onTriggerScan) onTriggerScan();
      }
    },
    {
      id: '3d-exploder',
      label: is3DActive ? 'Switch to 2D View' : '3D Layer Exploder',
      icon: '🧊',
      color: '#38bdf8',
      active: is3DActive,
      onClick: () => {
        soundFX.playClick();
        if (onToggle3D) onToggle3D();
      }
    },
    {
      id: 'gemini',
      label: 'Google AI Studio Vision',
      icon: '🤖',
      color: '#a855f7',
      onClick: () => {
        soundFX.playClick();
        if (onOpenGemini) onOpenGemini();
      }
    },
    {
      id: 'deck',
      label: 'SIH Pitch Deck (12 Slides)',
      icon: '🚀',
      color: '#3b82f6',
      onClick: () => {
        soundFX.playClick();
        if (onOpenDeck) onOpenDeck();
      }
    },
    {
      id: 'cert',
      label: 'BSA 2023 Certificate',
      icon: '📜',
      color: '#f59e0b',
      onClick: () => {
        soundFX.playClick();
        if (onOpenCert) onOpenCert();
      }
    },
    {
      id: 'threats',
      label: 'National Threat Map',
      icon: '🗺️',
      color: '#ef4444',
      onClick: () => {
        soundFX.playClick();
        if (onScrollToSection) onScrollToSection('analyticsSection');
      }
    },
    {
      id: 'audio',
      label: audioMuted ? 'Unmute Cyber SFX' : 'Mute Cyber SFX',
      icon: audioMuted ? '🔇' : '🔊',
      color: '#10b981',
      onClick: handleAudioToggle
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        pointerEvents: 'auto'
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 14px',
          background: 'rgba(8, 14, 26, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '999px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 240, 255, 0.15)'
        }}
      >
        {dockItems.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div key={item.id} style={{ position: 'relative' }}>
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#040711',
                      border: `1px solid ${item.color}`,
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      boxShadow: `0 4px 15px rgba(0, 0, 0, 0.8), 0 0 10px ${item.color}40`,
                      zIndex: 1000
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dock Button */}
              <motion.button
                onClick={item.onClick}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  soundFX.playClick();
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ scale: 1.25, y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: item.active
                    ? `radial-gradient(circle, ${item.color}40 0%, #111a2e 100%)`
                    : 'rgba(17, 26, 46, 0.8)',
                  border: item.active ? `2px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                  boxShadow: isHovered ? `0 0 15px ${item.color}80` : 'none'
                }}
              >
                {item.icon}
              </motion.button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
