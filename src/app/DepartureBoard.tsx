'use client'

import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const DepartureBoard: React.FC = () => {
    const handleRefresh = () => {
        console.log('Refresh button clicked!');
        };

    return (
        <div className="flex-col items-center justify-center h-full w-11/12 max-w-4xl">

            {/* Refresh Button */}
            <div className="flex justify-end mb-2 mx-3">
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition duration-200"
                >
                    <FiRefreshCw className="text-lg" />
                    Refresh
                </button>
            </div>
        
        {/* Departure Board */}
        <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-neutral-700 text-white p-6 text-center text-xl font-semibold">
            Departure Board
        </div>
        <div className="p-6">
            <p className="text-neutral-300">
            Flight information will appear here. Coming soon.
            </p>
        </div>
        </div>
        </div>
    );
};

export default DepartureBoard;


// <div className="flex items-center justify-center h-full">
// {/* Refresh Button */}
// <div className="flex justify-end mb-2">
//     <button
//         onClick={handleRefresh}
//         className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition duration-200"
//     >
//         <FiRefreshCw className="text-lg" />
//         Refresh
//     </button>
// </div>

// {/* Departure Board */}
// <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg w-11/12 max-w-4xl">


// <div className="bg-neutral-700 text-white p-6 text-center text-xl font-semibold">
//     Departure Board
// </div>
// <div className="p-6">
//     <p className="text-neutral-300">
//     Flight information will appear here. Coming soon.
//     </p>
// </div>
// </div>
// </div>