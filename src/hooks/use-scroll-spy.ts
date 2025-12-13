'use client';
import { useState, useEffect, useRef } from 'react';

export function useScrollSpy(
  selectors: string[],
  options?: IntersectionObserverInit
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = selectors
      .map((selector) => document.querySelector(selector))
      .filter((el): el is Element => el !== null);

    if (observer.current) {
      observer.current.disconnect();
    }

    const observerOptions = options || { rootMargin: '-50% 0px -50% 0px' };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [selectors, options]);

  return activeId;
}
