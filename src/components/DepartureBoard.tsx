// components/DepartureBoard.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import FlightRow, { Flight } from './FlightRow';
import AirportSelector from './AirportSelector';
import DigitalClock from './DigitalClock';

// Mock data until we connect to a real API
const airports = [
  { code: 'JFK', name: 'John F. Kennedy International' },
  { code: 'LAX', name: 'Los Angeles International' },
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'CDG', name: 'Paris Charles de Gaulle' },
  { code: 'NRT', name: 'Tokyo Narita' },
];

const mockFlights: Record<string, Flight[]> = {
  'JFK': [
    { id: '1', flightNumber: 'BA112', airline: 'British Airways', destination: 'LONDON', scheduledTime: '10:30', status: 'ON TIME', gate: 'A12' },
    { id: '2', flightNumber: 'DL401', airline: 'Delta', destination: 'PARIS', scheduledTime: '11:15', status: 'DELAYED', gate: 'B5' },
    { id: '3', flightNumber: 'AA189', airline: 'American', destination: 'MIAMI', scheduledTime: '12:00', status: 'BOARDING', gate: 'C7' },
    { id: '4', flightNumber: 'UA872', airline: 'United', destination: 'CHICAGO', scheduledTime: '12:45', status: 'ON TIME', gate: 'D3' },
    { id: '5', flightNumber: 'LH411', airline: 'Lufthansa', destination: 'FRANKFURT', scheduledTime: '13:20', status: 'ON TIME', gate: 'E9' },
    { id: '6', flightNumber: 'AF123', airline: 'Air France', destination: 'NICE', scheduledTime: '14:10', status: 'ON TIME', gate: 'F2' },
    { id: '7', flightNumber: 'NH009', airline: 'ANA', destination: 'TOKYO', scheduledTime: '15:00', status: 'BOARDING', gate: 'G11' },
    { id: '8', flightNumber: 'EK201', airline: 'Emirates', destination: 'DUBAI', scheduledTime: '16:30', status: 'ON TIME', gate: 'H4' },
  ],
  'LAX': [
    { id: '1', flightNumber: 'DL222', airline: 'Delta', destination: 'NEW YORK', scheduledTime: '09:30', status: 'BOARDING', gate: 'A5' },
    { id: '2', flightNumber: 'UA501', airline: 'United', destination: 'CHICAGO', scheduledTime: '10:45', status: 'ON TIME', gate: 'B9' },
    { id: '3', flightNumber: 'AA333', airline: 'American', destination: 'DALLAS', scheduledTime: '11:30', status: 'DELAYED', gate: 'C2' },
    { id: '4', flightNumber: 'AS456', airline: 'Alaska', destination: 'SEATTLE', scheduledTime: '12:15', status: 'ON TIME', gate: 'D7' },
    { id: '5', flightNumber: 'WN789', airline: 'Southwest', destination: 'PHOENIX', scheduledTime: '13:45', status: 'ON TIME', gate: 'E3' },
  ],
  'LHR': [
    { id: '1', flightNumber: 'BA456', airline: 'British Airways', destination: 'SINGAPORE', scheduledTime: '10:00', status: 'ON TIME', gate: 'A10' },
    { id: '2', flightNumber: 'VS789', airline: 'Virgin Atlantic', destination: 'NEW YORK', scheduledTime: '11:30', status: 'BOARDING', gate: 'B22' },
    { id: '3', flightNumber: 'LH654', airline: 'Lufthansa', destination: 'MUNICH', scheduledTime: '12:15', status: 'ON TIME', gate: 'C5' },
    { id: '4', flightNumber: 'AF321', airline: 'Air France', destination: 'PARIS', scheduledTime: '13:00', status: 'ON TIME', gate: 'D12' },
  ],
  'CDG': [
    { id: '1', flightNumber: 'AF100', airline: 'Air France', destination: 'NEW YORK', scheduledTime: '09:45', status: 'BOARDING', gate: 'K7' },
    { id: '2', flightNumber: 'AF200', airline: 'Air France', destination: 'TOKYO', scheduledTime: '11:20', status: 'ON TIME', gate: 'L14' },
    { id: '3', flightNumber: 'EK077', airline: 'Emirates', destination: 'DUBAI', scheduledTime: '13:10', status: 'ON TIME', gate: 'M3' },
    { id: '4', flightNumber: 'BA308', airline: 'British Airways', destination: 'LONDON', scheduledTime: '14:30', status: 'DELAYED', gate: 'N9' },
  ],
  'NRT': [
    { id: '1', flightNumber: 'NH111', airline: 'ANA', destination: 'LOS ANGELES', scheduledTime: '10:15', status: 'ON TIME', gate: '41' },
    { id: '2', flightNumber: 'JL002', airline: 'JAL', destination: 'SAN FRANCISCO', scheduledTime: '11:45', status: 'BOARDING', gate: '52' },
    { id: '3', flightNumber: 'UA890', airline: 'United', destination: 'CHICAGO', scheduledTime: '13:30', status: 'ON TIME', gate: '63' },
    { id: '4', flightNumber: 'SQ012', airline: 'Singapore Airlines', destination: 'SINGAPORE', scheduledTime: '15:00', status: 'ON TIME', gate: '74' },
  ],
};

const DepartureBoard: React.FC = () => {
  const [selectedAirport, setSelectedAirport] = useState('JFK');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlights = useCallback(() => {
    setIsLoading(true);
    
    // Simulate API fetch with a timeout
    setTimeout(() => {
      setFlights(mockFlights[selectedAirport] || []);
      setIsLoading(false);
    }, 800);
    
    // TODO: Replace with actual API call when you have one
    // Example:
    // fetch(`https://api.example.com/flights/${selectedAirport}?type=${viewMode}`)
    //  .then(response => response.json())
    //  .then(data => {
    //    setFlights(data);
    //    setLastUpdated(new Date());
    //  })
    //  .catch(error => console.error('Error fetching flight data:', error))
    //  .finally(() => setIsLoading(false));
  }, [selectedAirport]);

  useEffect(() => {
    fetchFlights();
  }, [selectedAirport, fetchFlights]);

  const handleRefresh = () => {
    fetchFlights();
  };

  return (
    <div className="w-full max-w-5xl">
      {/* Main Departure Board */}
      <div className="overflow-hidden w-full dot-matrix" style={{ 
        backgroundColor: '#0a0a0a', 
        border: '8px solid #1a1a1a',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        {/* Header with title and clock */}
        <div className="relative p-6 pb-4" style={{ backgroundColor: '#000000' }}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: '#ffb700', color: '#000' }}>
                <span className="text-xl">✈</span>
              </div>
              <h1 className="led-text" style={{ 
                color: '#ffffff', 
                fontSize: '28px',
                textShadow: '0 0 8px #ffffff',
                letterSpacing: '0.1em'
              }}>
                DEPARTURES
              </h1>
            </div>
            
            <div className="absolute right-6 top-6">
              <DigitalClock />
            </div>
          </div>
        </div>
        
        {/* Column Headers */}
        <div className="grid grid-cols-[1fr_2fr_1fr_2fr] gap-4 px-6 py-2" style={{ backgroundColor: '#000000' }}>
          <div className="led-text" style={{ color: '#ffb700', fontSize: '11px' }}>time</div>
          <div className="led-text" style={{ color: '#ffb700', fontSize: '11px' }}>to</div>
          <div className="led-text" style={{ color: '#ffb700', fontSize: '11px' }}>gate</div>
          <div className="led-text" style={{ color: '#ffb700', fontSize: '11px' }}>remarks</div>
        </div>
        
        {/* Flight Rows */}
        <div className="overflow-y-auto" style={{ 
          backgroundColor: '#000000',
          maxHeight: '400px',
          minHeight: '300px'
        }}>
          {isLoading ? (
            <div className="p-12 text-center" style={{ color: '#666' }}>
              <div className="animate-spin mb-4 mx-auto">
                <FiRefreshCw className="h-8 w-8" />
              </div>
              <p className="led-text" style={{ fontSize: '10px' }}>LOADING...</p>
            </div>
          ) : flights.length > 0 ? (
            flights.map((flight, index) => (
              <FlightRow key={flight.id} flight={flight} index={index} />
            ))
          ) : (
            <div className="p-12 text-center led-text" style={{ color: '#666', fontSize: '10px' }}>
              NO FLIGHTS FOUND
            </div>
          )}
        </div>
        
        {/* Footer with date */}
        <div className="flex justify-end px-6 py-4" style={{ backgroundColor: '#000000' }}>
          <div className="led-text" style={{ color: '#ffffff', fontSize: '12px', letterSpacing: '0.15em' }}>
            {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
          </div>
        </div>
      </div>
      
      {/* Controls below board */}
      <div className="flex justify-between items-center mt-4 w-full">
        <AirportSelector 
          airports={airports} 
          selectedAirport={selectedAirport} 
          onSelectAirport={setSelectedAirport} 
        />
        
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 led-text px-4 py-2"
          style={{
            color: isLoading ? '#333' : '#666',
            backgroundColor: '#1a1a1a',
            border: '2px solid #333',
            fontSize: '8px'
          }}
        >
          <FiRefreshCw className={`text-sm ${isLoading ? 'animate-spin' : ''}`} />
          REFRESH
        </button>
      </div>
    </div>
  );
};

export default DepartureBoard;