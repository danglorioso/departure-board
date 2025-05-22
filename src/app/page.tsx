// app/page.tsx
import React from 'react';
import DepartureBoard from '../components/DepartureBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 p-4 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-amber-400">
          AeroTicker
        </h1>
        <p className="text-neutral-400 text-center mt-2">
          Live flight information displayed on a nostalgic split-flap board
        </p>
      </div>
      
      <DepartureBoard />
      
      <div className="mt-12 text-neutral-600 text-sm">
        <p>© 2025 AeroTicker - Bringing back the nostalgic airport experience</p>
      </div>
    </main>
  );
}