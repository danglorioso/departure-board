// app/page.tsx
'use client'

import React from 'react';
import DepartureBoard from '../components/DepartureBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8" style={{ backgroundColor: '#000000' }}>
      <DepartureBoard />
    </main>
  );
}