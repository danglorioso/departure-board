// components/DepartureBoard.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import FlightRow, { Flight } from './FlightRow';
import AirportSelector from './AirportSelector';

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
    { id: '1', flightNumber: 'BA112', airline: 'British Airways', destination: 'London', scheduledTime: '10:30', status: 'On Time', gate: 'A12' },
    { id: '2', flightNumber: 'DL401', airline: 'Delta', destination: 'Paris', scheduledTime: '11:15', status: 'Delayed', gate: 'B5' },
    { id: '3', flightNumber: 'AA189', airline: 'American', destination: 'Miami', scheduledTime: '12:00', status: 'Boarding', gate: 'C7' },
    { id: '4', flightNumber: 'UA872', airline: 'United', destination: 'Chicago', scheduledTime: '12:45', status: 'On Time', gate: 'D3' },
    { id: '5', flightNumber: 'LH411', airline: 'Lufthansa', destination: 'Frankfurt', scheduledTime: '13:20', status: 'On Time', gate: 'E9' },
  ],
  'LAX': [
    { id: '1', flightNumber: 'DL222', airline: 'Delta', destination: 'New York', scheduledTime: '09:30', status: 'Boarding', gate: 'A5' },
    { id: '2', flightNumber: 'UA501', airline: 'United', destination: 'Chicago', scheduledTime: '10:45', status: 'On Time', gate: 'B9' },
    { id: '3', flightNumber: 'AA333', airline: 'American', destination: 'Dallas', scheduledTime: '11:30', status: 'Delayed', gate: 'C2' },
  ],
  // Add more airports and their flights as needed
};

const DepartureBoard: React.FC = () => {
  const [selectedAirport, setSelectedAirport] = useState('JFK');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewMode, setViewMode] = useState<'departures' | 'arrivals'>('departures');

  useEffect(() => {
    fetchFlights();
  }, [selectedAirport, viewMode]);

  const fetchFlights = () => {
    setIsLoading(true);
    
    // Simulate API fetch with a timeout
    setTimeout(() => {
      setFlights(mockFlights[selectedAirport] || []);
      setLastUpdated(new Date());
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
  };

  const handleRefresh = () => {
    fetchFlights();
  };

  const formatLastUpdated = () => {
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-6xl">
      {/* Header with airport selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4">
        <AirportSelector 
          airports={airports} 
          selectedAirport={selectedAirport} 
          onSelectAirport={setSelectedAirport} 
        />
        
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <button
            onClick={() => setViewMode('departures')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'departures' 
                ? 'bg-amber-500 text-black' 
                : 'bg-neutral-700 text-white hover:bg-neutral-600'
            }`}
          >
            Departures
          </button>
          <button
            onClick={() => setViewMode('arrivals')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'arrivals' 
                ? 'bg-amber-500 text-black' 
                : 'bg-neutral-700 text-white hover:bg-neutral-600'
            }`}
          >
            Arrivals
          </button>
        </div>
      </div>

      {/* Departure Board */}
      <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg w-full">
        <div className="bg-neutral-700 text-white p-6 text-center">
          <div className="text-3xl font-bold mb-2">
            {selectedAirport} {viewMode === 'departures' ? 'Departures' : 'Arrivals'}
          </div>
          <div className="text-amber-400 text-lg">
            {isLoading ? 'Updating...' : `Last updated: ${formatLastUpdated()}`}
          </div>
        </div>
        
        {/* Table Header */}
        <div className="grid grid-cols-5 w-full bg-neutral-900 py-3 text-neutral-400 font-medium text-sm border-b border-neutral-700">
          <div className="px-1">FLIGHT</div>
          <div className="px-1">TIME</div>
          <div className="px-1">{viewMode === 'departures' ? 'DESTINATION' : 'ORIGIN'}</div>
          <div className="px-1">GATE</div>
          <div className="px-1">STATUS</div>
        </div>
        
        {/* Flight Rows */}
        <div className="max-h-96 overflow-y-auto w-full">
          {isLoading ? (
            <div className="p-12 text-center text-neutral-400">
              <div className="animate-spin mb-4 mx-auto">
                <FiRefreshCw className="h-8 w-8" />
              </div>
              <p>Loading flight information...</p>
            </div>
          ) : flights.length > 0 ? (
            flights.map((flight, index) => (
              <FlightRow key={flight.id} flight={flight} index={index} />
            ))
          ) : (
            <div className="p-12 text-center text-neutral-400">
              No flights found for this airport.
            </div>
          )}
        </div>
      </div>
      
      {/* Refresh Button */}
      <div className="flex justify-end mt-4 w-full">
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 text-neutral-400 hover:text-white text-sm font-medium transition duration-200 disabled:text-neutral-600"
        >
          <FiRefreshCw className={`text-lg ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {/* Footer with information */}
      <div className="mt-6 text-center text-neutral-500 text-sm">
        <p>Data refreshes automatically every few minutes. Click refresh for the latest information.</p>
        <p className="mt-2">NOTE: Currently using mock data. API integration coming soon.</p>
      </div>
    </div>
  );
};

export default DepartureBoard;