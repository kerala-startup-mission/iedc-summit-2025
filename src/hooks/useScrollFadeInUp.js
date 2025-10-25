import { useEffect, useRef, useState } from "react";

export const useScrollFadeInUp = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Element is visible when it enters the viewport (bottom 80% of screen)
        if (rect.bottom > windowHeight * 0.2 && rect.top < windowHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, isVisible };
};
