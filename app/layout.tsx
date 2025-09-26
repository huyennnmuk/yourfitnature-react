import type { Metadata } from "next";
import "./globals.css";
import ScrollToTopButton from "./components/ScrollToTopButton"; // <-- Import here
import ReadingProgressBar from "./components/ReadingProgressBar";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from 'sonner';
import React from 'react';
import Script from 'next/script';
export const metadata: Metadata = {
  title: "YourFitNature: Right Gut Choice – Healthy Inside, Confident in Life",
  description: "YourFitNature - Balance Your Fitness & Nature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
      </head>
      <body
        className={`antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReadingProgressBar />
          {children}
          <ScrollToTopButton /> {/* <-- Add here so it appears on all pages */}
          <Toaster richColors />
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
