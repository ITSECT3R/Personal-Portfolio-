import { useEffect } from 'react';

export default function usePageBackground(pageId: string, cssValue?: string) {
  useEffect(() => {
    const prev = document.body.getAttribute('data-page');
    const prevVar = document.body.style.getPropertyValue('--app-bg');

    if (pageId) document.body.setAttribute('data-page', pageId);
    if (cssValue) document.body.style.setProperty('--app-bg', cssValue);

    return () => {
      if (prev) document.body.setAttribute('data-page', prev);
      else document.body.removeAttribute('data-page');

      if (prevVar) document.body.style.setProperty('--app-bg', prevVar);
      else document.body.style.removeProperty('--app-bg');
    };
  }, [pageId, cssValue]);
}
