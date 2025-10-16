import { useEffect, useRef, useState } from 'react';

const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) {
      setCount(0);
      return;
    }

    // Extract numeric value from string (e.g., "10,000+" -> 10000)
    const endValue = typeof end === 'string' 
      ? parseInt(end.replace(/[^0-9]/g, '')) 
      : end;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      startTimeRef.current = null;
    };
  }, [end, duration, shouldStart]);

  // Format the count back to match the original format
  const formatCount = () => {
    if (typeof end === 'string') {
      const hasComma = end.includes(',');
      const hasPlus = end.includes('+');
      
      let formatted = count.toLocaleString('en-US');
      if (!hasComma) {
        formatted = count.toString();
      }
      if (hasPlus && count === parseInt(end.replace(/[^0-9]/g, ''))) {
        formatted += '+';
      }
      
      return formatted;
    }
    return count;
  };

  return formatCount();
};

export default useCountUp;
