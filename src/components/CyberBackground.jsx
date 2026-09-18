import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for dynamic 3D cyber grid
    const particleCount = Math.min(50, Math.floor(width / 30));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.6 + 0.8,
      alpha: Math.random() * 0.4 + 0.15
    }));

    let mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle 3D Perspective Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Rotating Radar Pulse in top-right background
      angle += 0.006;
      const radarX = width * 0.88;
      const radarY = height * 0.22;
      const radarRadius = Math.min(240, width * 0.2);

      ctx.beginPath();
      ctx.arc(radarX, radarY, radarRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(radarX, radarY, radarRadius * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.stroke();

      // Radar Sweep Needle
      ctx.beginPath();
      ctx.moveTo(radarX, radarY);
      ctx.lineTo(
        radarX + Math.cos(angle) * radarRadius,
        radarY + Math.sin(angle) * radarRadius
      );
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.28)';
      ctx.stroke();

      // Connected Particle Network with Mouse Parallax
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.x += (dx / dist) * 0.25;
          p.y += (dy / dist) * 0.25;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();

        // Connect adjacent particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - d / 110)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: '#040711'
      }}
    >
      {/* Fluid Aurora Blur Orbs (GPU accelerated) */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.25, 0.9, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          top: '-10%',
          left: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.18) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translateZ(0)'
        }}
      />

      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 70, -50, 0],
          scale: [1, 0.85, 1.2, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          top: '35%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)',
          filter: 'blur(90px)',
          transform: 'translateZ(0)'
        }}
      />

      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, 40, -60, 0],
          scale: [1, 1.15, 0.95, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '30%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(0, 240, 255, 0.05) 50%, transparent 70%)',
          filter: 'blur(100px)',
          transform: 'translateZ(0)'
        }}
      />

      {/* Foreground Canvas for Particle Grid & Hologram */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
