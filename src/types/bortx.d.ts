declare module '@itsect3r/bortx/borders/styles';
declare module '@itsect3r/bortx/text/styles';

declare module '@itsect3r/bortx/react' {
  interface AnimateOnScrollOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    delay?: number;
  }

  interface AnimateOnScrollResult<T extends HTMLElement> {
    ref: React.RefCallback<T>;
    isAnimated: boolean;
  }

  export function useAnimateOnScroll<T extends HTMLElement = HTMLElement>(
    options?: AnimateOnScrollOptions
  ): AnimateOnScrollResult<T>;

  interface AnimateOnScrollManyResult<T extends HTMLElement> {
    refs: React.RefCallback<T>[];
    areAnimated: boolean[];
    containerRef: React.RefCallback<HTMLElement>;
  }

  export function useAnimateOnScrollMany<T extends HTMLElement = HTMLElement>(
    count: number,
    options?: AnimateOnScrollOptions,
    staggerDelay?: number
  ): AnimateOnScrollManyResult<T>;
}
