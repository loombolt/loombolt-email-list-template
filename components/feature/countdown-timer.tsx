"use client";

import { useEffect, useState } from "react";
import { useCountdownStore } from "@/store/countdown-store";

interface CountdownTimerProps {
  className?: string;
}

export function CountdownTimer({ className = "" }: CountdownTimerProps) {
  const storedEndDate = useCountdownStore(state => state.endDate);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(storedEndDate);
      const difference = +endDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [storedEndDate]);

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-medium">{timeLeft.days}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Days</div>
      </div>
      <div className="text-xl font-light text-muted-foreground">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-medium">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Hours</div>
      </div>
      <div className="text-xl font-light text-muted-foreground">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-medium">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Mins</div>
      </div>
      <div className="text-xl font-light text-muted-foreground">:</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-medium">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Secs</div>
      </div>
    </div>
  );
}
