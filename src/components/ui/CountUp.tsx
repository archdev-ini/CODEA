'use client';

import { useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
}

export default function CountUp({
  to,
  from = 0,
  duration = 0.8,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const current = Math.floor(progress * (to - from) + from);
      if (ref.current) {
        ref.current.textContent = String(current).padStart(2, '0');
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [to, from, duration]);

  return <span className={className} ref={ref} />;
}
