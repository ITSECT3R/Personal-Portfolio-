import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Options for the useAnimateOnScroll hook
 */
interface AnimateOnScrollOptions {
  /** Threshold at which the callback fires (0-1). Default: 0.1 */
  threshold?: number;
  /** Root margin for the observer. Default: '0px' */
  rootMargin?: string;
  /** Whether to trigger only once. Default: true */
  triggerOnce?: boolean;
  /** Delay before adding the class (ms). Default: 0 */
  delay?: number;
}

/**
 * useAnimateOnScroll
 *
 * A lightweight React hook that uses IntersectionObserver to toggle
 * the 'is-animated' class when an element enters the viewport.
 *
 * @param options - Configuration options
 * @returns ref - Attach this ref to the element you want to animate
 * @returns isAnimated - Boolean indicating if the element is animated
 * @returns reset - Function to reset the animation state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isAnimated } = useAnimateOnScroll({ threshold: 0.2 });
 *
 *   return (
 *     <h1
 *       ref={ref}
 *       className={`text-effect text-typewriter ${isAnimated ? 'is-animated' : ''}`}
 *     >
 *       Hello, World!
 *     </h1>
 *   );
 * }
 * ```
 *
 * @example With auto-class toggle (no manual className)
 * ```tsx
 * function MyComponent() {
 *   const { ref } = useAnimateOnScroll();
 *
 *   // The hook automatically adds 'is-animated' to the element
 *   return (
 *     <h1 ref={ref} className="text-effect text-glitch">
 *       Full Stack Developer
 *     </h1>
 *   );
 * }
 * ```
 */
export function useAnimateOnScroll<T extends HTMLElement = HTMLElement>(
  options: AnimateOnScrollOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<T>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const reset = useCallback(() => {
    setIsAnimated(false);
    if (ref.current) {
      ref.current.classList.remove('is-animated');
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsAnimated(true);
                element.classList.add('is-animated');
              }, delay);
            } else {
              setIsAnimated(true);
              element.classList.add('is-animated');
            }

            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsAnimated(false);
            element.classList.remove('is-animated');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  return { ref, isAnimated, reset };
}

/**
 * useAnimateOnScrollMany
 *
 * For animating multiple elements with staggered delays.
 * Returns an array of refs to attach to each element.
 *
 * @param count - Number of elements to animate
 * @param options - Configuration options
 * @param staggerDelay - Delay between each element's animation (ms). Default: 100
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const words = ['Full', 'Stack', 'Developer'];
 *   const { refs, areAnimated } = useAnimateOnScrollMany(words.length, {}, 100);
 *
 *   return (
 *     <h1 className="text-reveal-up-container">
 *       {words.map((word, i) => (
 *         <span
 *           key={word}
 *           ref={refs[i]}
 *           className={`text-reveal-up-word ${areAnimated[i] ? 'is-animated' : ''}`}
 *         >
 *           {word}
 *         </span>
 *       ))}
 *     </h1>
 *   );
 * }
 * ```
 */
export function useAnimateOnScrollMany<T extends HTMLElement = HTMLElement>(
  count: number,
  options: Omit<AnimateOnScrollOptions, 'delay'> = {},
  staggerDelay: number = 100
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  const refs = useRef<(T | null)[]>(new Array(count).fill(null));
  const [areAnimated, setAreAnimated] = useState<boolean[]>(
    new Array(count).fill(false)
  );
  const containerRef = useRef<HTMLElement>(null);

  const reset = useCallback(() => {
    setAreAnimated(new Array(count).fill(false));
    refs.current.forEach(el => {
      if (el) el.classList.remove('is-animated');
    });
  }, [count]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as T[];
    if (elements.length === 0) return;

    // Observe the first element to trigger all
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('is-animated');
                setAreAnimated(prev => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }, index * staggerDelay);
            });

            if (triggerOnce) {
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            elements.forEach((el, index) => {
              el.classList.remove('is-animated');
              setAreAnimated(prev => {
                const next = [...prev];
                next[index] = false;
                return next;
              });
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe the first element
    if (elements[0]) {
      observer.observe(elements[0]);
    }

    return () => {
      observer.disconnect();
    };
  }, [count, threshold, rootMargin, triggerOnce, staggerDelay]);

  const setRef = useCallback(
    (index: number) => (el: T | null) => {
      refs.current[index] = el;
    },
    []
  );

  return {
    refs: Array.from({ length: count }, (_, i) => setRef(i)),
    areAnimated,
    reset,
    containerRef,
  };
}

export default useAnimateOnScroll;
