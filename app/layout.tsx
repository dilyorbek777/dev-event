import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";

import LightRays from '@/components/LightRays';
import Navbar from "@/components/Navbar";

const geistSans = Schibsted_Grotesk({
  variable: "--font-schibsted-sans",
  subsets: ["latin"],
});

const mono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The event and hub you mustn't miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${mono.variable} antialiased`}
      >

        <Navbar />
        <div className="absolute top-0 inset-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.05}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <main>

          {children}
        </main>
      </body>
    </html>
  );
}
