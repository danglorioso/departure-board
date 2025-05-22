// components/FlightRow.tsx
import React from 'react';
import SplitFlapDisplay from './SplitFlapDisplay';

export interface Flight {
  id: string;
  flightNumber: string;
  destination: string;
  scheduledTime: string;
  status: string;
  gate?: string;
  airline: string;
}

interface FlightRowProps {
  flight: Flight;
  index: number;
}

const FlightRow: React.FC<FlightRowProps> = ({ flight, index }) => {
  const delayBase = index * 300; // Stagger the animations
  
  return (
    <div className={`grid grid-cols-5 w-full py-4 ${index % 2 === 0 ? 'bg-neutral-800' : 'bg-neutral-900'}`}>
      <div className="px-1 w-full">
        <SplitFlapDisplay 
          text={flight.flightNumber} 
          delay={delayBase} 
          charCount={7} 
        />
      </div>
      <div className="px-1 w-full">
        <SplitFlapDisplay 
          text={flight.scheduledTime} 
          delay={delayBase + 100} 
          charCount={7} 
        />
      </div>
      <div className="px-1 w-full">
        <SplitFlapDisplay 
          text={flight.destination.toUpperCase()} 
          delay={delayBase + 200} 
          charCount={15} 
        />
      </div>
      <div className="px-1 w-full">
        <SplitFlapDisplay 
          text={flight.gate || 'TBD'} 
          delay={delayBase + 300} 
          charCount={5} 
        />
      </div>
      <div className="px-1 w-full">
        <SplitFlapDisplay 
          text={flight.status.toUpperCase()} 
          delay={delayBase + 400} 
          charCount={13} 
        />
      </div>
    </div>
  );
};

export default FlightRow;