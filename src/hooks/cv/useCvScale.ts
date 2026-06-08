import { useState, useEffect } from 'react';

const CV_NATIVE_WIDTH = 850;

/**
 * Returns a zoom factor so the CV fits the viewport width.
 * Uses `zoom` (not `transform: scale`) so layout space shrinks too.
 * Only zooms out — never above 1.
 */
export function useCvScale(): number {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    function compute() {
      const vw = window.innerWidth;
      if (vw >= CV_NATIVE_WIDTH) {
        setZoom(1);
        return;
      }
      // Clamp: never go below 0.45 so text remains semi-legible
      const raw = vw / CV_NATIVE_WIDTH;
      setZoom(Math.max(raw, 0.45));
    }

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return zoom;
}
