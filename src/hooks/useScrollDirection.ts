import { useState, useEffect, useRef } from 'react';

/**
 * Tracks scroll direction. Returns:
 *  - 'up'   when scrolling up or at top
 *  - 'down' when scrolling down past a threshold
 *
 * Only activates on mobile (≤ 768px). On desktop always returns 'up' (visible).
 */
export function useScrollDirection(): 'up' | 'down' {
  const [dir, setDir] = useState<'up' | 'down'>('up');
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
          setDir('up');
          lastY.current = window.scrollY;
          ticking.current = false;
          return;
        }

        const currentY = window.scrollY;
        // Ignore tiny scrolls (momentum bounce on iOS)
        if (Math.abs(currentY - lastY.current) < 8) {
          ticking.current = false;
          return;
        }

        // At the very top → always show
        if (currentY <= 8) {
          setDir('up');
        } else if (currentY > lastY.current) {
          // Scrolling down → hide
          setDir('down');
        } else {
          // Scrolling up → show
          setDir('up');
        }

        lastY.current = currentY;
        ticking.current = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return dir;
}
