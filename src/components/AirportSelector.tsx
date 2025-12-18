// components/AirportSelector.tsx
import React from 'react';

interface Airport {
  code: string;
  name: string;
}

interface AirportSelectorProps {
  airports: Airport[];
  selectedAirport: string;
  onSelectAirport: (code: string) => void;
}

const AirportSelector: React.FC<AirportSelectorProps> = ({ 
  airports, 
  selectedAirport, 
  onSelectAirport 
}) => {
  return (
    <div className="mb-4">
      <select 
        value={selectedAirport}
        onChange={(e) => onSelectAirport(e.target.value)}
        className="led-text text-sm py-2 px-4 focus:outline-none"
        style={{
          backgroundColor: '#1a1a1a',
          color: '#ffb700',
          border: '2px solid #333',
        }}
      >
        {airports.map((airport) => (
          <option key={airport.code} value={airport.code} style={{ backgroundColor: '#1a1a1a', color: '#ffb700' }}>
            {airport.name} ({airport.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirportSelector;