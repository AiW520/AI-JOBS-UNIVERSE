import { useRef, useEffect } from 'react';

export function useParallax(speed: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = rect.top + scrolled;
      const distance = (scrolled - offset) * speed;
      element.style.transform = `translate3d(0, ${distance}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}