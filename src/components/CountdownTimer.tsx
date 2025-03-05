import React, { useEffect, useState } from 'react';

interface TimerProps {
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ isActive }) => {
  const [time, setTime] = useState(600); // 600 seconds = 10 minutes

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return <div className="text-lg">{formatTime(time)}</div>;
};
