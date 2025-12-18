'use client'

import React, { useState, useEffect } from 'react';

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: '#0a0a0a', padding: '20px', border: '3px solid #1a1a1a' }}>
      {/* Analog clock circle */}
      <div className="relative" style={{ width: '120px', height: '120px' }}>
        {/* Clock circle */}
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="55"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 60 + 45 * Math.cos(angle);
            const y1 = 60 + 45 * Math.sin(angle);
            const x2 = 60 + 50 * Math.cos(angle);
            const y2 = 60 + 50 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#666"
                strokeWidth="2"
              />
            );
          })}
          {/* Hour hand */}
          <line
            x1="60"
            y1="60"
            x2={60 + 30 * Math.cos((time.getHours() % 12 * 30 + time.getMinutes() / 2 - 90) * (Math.PI / 180))}
            y2={60 + 30 * Math.sin((time.getHours() % 12 * 30 + time.getMinutes() / 2 - 90) * (Math.PI / 180))}
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Minute hand */}
          <line
            x1="60"
            y1="60"
            x2={60 + 42 * Math.cos((time.getMinutes() * 6 - 90) * (Math.PI / 180))}
            y2={60 + 42 * Math.sin((time.getMinutes() * 6 - 90) * (Math.PI / 180))}
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Center dot */}
          <circle cx="60" cy="60" r="4" fill="#fff" />
        </svg>
      </div>
    </div>
  );
};

export default DigitalClock;
