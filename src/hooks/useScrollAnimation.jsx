import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      y = 50,
      opacity = 0,
      duration = 1,
      ease = 'power3.out',
      delay = 0,
      stagger = 0,
      start = 'top 80%',
      end = 'bottom 20%',
      markers = false,
      once = true
    } = options;

    const ctx = gsap.context(() => {
      // Check if element has children for stagger animation
      const targets = element.children.length > 0 ? element.children : element;

      gsap.fromTo(
        targets,
        {
          y,
          opacity,
          willChange: 'transform, opacity'
        },
        {
          y: 0,
          opacity: 1,
          duration,
          ease,
          delay,
          stagger,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            markers,
            once,
            toggleActions: 'play none none none'
          },
          clearProps: 'willChange'
        }
      );
    }, element);

    return () => ctx.revert();
  }, [options]);

  return elementRef;
};

export default useScrollAnimation;
