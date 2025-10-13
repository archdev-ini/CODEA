'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import './ScrollFloat.css';

interface ScrollFloatProps {
  children: ReactNode;
  className?: string;
  animation?: 'float-up' | 'float-down' | 'float-left' | 'float-right';
  delay?: string; // e.g., '100ms'
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  className,
  animation = 'float-up',
  delay,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current?.classList.add('is-visible');
        } else {
          // Optional: remove class to re-animate on scroll up/down
          // ref.current?.classList.remove('is-visible');
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const style = delay ? { '--animation-delay': delay } : {};

  return (
    <div
      ref={ref}
      className={`scroll-float ${animation} ${className || ''}`}
      style={style as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default ScrollFloat;
