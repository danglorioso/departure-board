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
        className="bg-neutral-700 text-white py-2 px-4 rounded-lg border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        {airports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.name} ({airport.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirportSelector;