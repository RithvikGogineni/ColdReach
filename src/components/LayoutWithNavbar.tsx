'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function LayoutWithNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login' || pathname === '/signup';
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
} 