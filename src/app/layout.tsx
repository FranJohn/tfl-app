import React from 'react';
import { Metadata } from 'next';
import './styles/main.scss'; 
import TitleBar from './components/TitleBar';

export const metadata: Metadata = {
  title: 'Tube Track App', 
  description: 'Track the real-time status of tube lines in London.', 
  keywords: ['TFL', 'Tube Lines', 'Real-time Status'], 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </head>
      <body>
        <TitleBar backgroundColor="#597aa0" textColor="#ffffff" title="Tube Track: Real-time Tube Line Information" />
        {children}
      </body>
    </html>
  );
};


