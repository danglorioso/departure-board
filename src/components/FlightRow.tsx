// components/FlightRow.tsx
import React from 'react';

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

const FlightRow: React.FC<FlightRowProps> = ({ flight }) => {
  // Determine status color for LED display
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('boarding')) return '#00ff00'; // Green
    if (statusLower.includes('cancel')) return '#ff0000'; // Red
    if (statusLower.includes('delay')) return '#ffff00'; // Yellow
    if (statusLower.includes('on time')) return '#ffff00'; // Yellow
    if (statusLower.includes('gate open')) return '#ffff00'; // Yellow
    return '#ffb700'; // Default amber
  };
  
  const statusColor = getStatusColor(flight.status);
  const gateColor = '#ffff00';
  
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr_2fr] gap-4 px-6 py-2" style={{ backgroundColor: '#000000' }}>
      <div className="led-text" style={{ color: '#ffb700', fontSize: '14px', letterSpacing: '0.05em' }}>
        {flight.scheduledTime}
      </div>
      <div className="led-text" style={{ color: '#ffb700', fontSize: '14px', letterSpacing: '0.05em' }}>
        {flight.destination.toUpperCase()}
      </div>
      <div className="led-text" style={{ color: gateColor, fontSize: '14px', letterSpacing: '0.05em', textShadow: `0 0 6px ${gateColor}` }}>
        {flight.gate || '--'}
      </div>
      <div className="led-text" style={{ color: statusColor, fontSize: '14px', letterSpacing: '0.05em', textShadow: `0 0 6px ${statusColor}` }}>
        {flight.status.toUpperCase()}
      </div>
    </div>
  );
};

export default FlightRow;