'use client';

import React from 'react';
import { SessionProvider } from "next-auth/react";
import { RoadmapProvider } from '@/app/contexts/RoadmapContext';

export default function RoadmapLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <RoadmapProvider>
        {children}
      </RoadmapProvider>
    </SessionProvider>
  )
}
