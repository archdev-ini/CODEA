'use client';

import { useState, useEffect } from 'react';

type CountdownProps = {
  date: Date;
};

type TimeUnit = 'Days' | 'Hours' | 'Minutes' | 'Seconds';

const Countdown: React.FC<CountdownProps> = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +date - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Set initial time left to prevent hydration mismatch
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  const timeUnits: { unit: TimeUnit; value: number }[] = [
    { unit: 'Days', value: timeLeft.days },
    { unit: 'Hours', value: timeLeft.hours },
    { unit: 'Minutes', value: timeLeft.minutes },
    { unit: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timeUnits.map(({ unit, value }) => (
        <div
          key={unit}
          className="flex flex-col items-center justify-center bg-card p-4 md:p-6 rounded-lg w-24 h-24 md:w-32 md:h-32 border"
        >
          <span className="text-3xl md:text-5xl font-bold text-primary tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
