import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function TiltCard({ children, className = '', style = {} }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const glareX = useSpring(50, springConfig);
  const glareY = useSpring(50, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    rotateX.set(rotX);
    rotateY.set(rotY);

    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        ...style
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}

        {/* Dynamic Specular Glare Reflection */}
        {isHovered && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(0, 240, 255, 0.12) 0%, transparent 60%)`,
              zIndex: 10
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
