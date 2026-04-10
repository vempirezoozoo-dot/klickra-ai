import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--color-primary)] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'var(--color-primary)' : 'transparent',
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pointer-events-none z-[9999] hidden md:block"
        style={{
          x: position.x,
          y: position.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
