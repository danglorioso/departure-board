'use client'

import React from 'react';

const DepartureBoard: React.FC = () => {
  return (
      <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg w-11/12 max-w-4xl">
        <div className="bg-neutral-700 text-white p-6 text-center text-xl font-semibold">
          Departure Board
        </div>
        <div className="p-6">
          <p className="text-neutral-300">
            Flight information will appear here. Coming soon.
          </p>
        </div>
      </div>
  );
};

export default DepartureBoard;
