import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const metadata: Metadata = {
  title: "Khadeer Shaik - Full Stack Developer",
  description: "Personal portfolio of Khadeer Shaik, Full Stack Developer & 3D Interactive Web Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0b080c] text-[#eae5ec] antialiased selection:bg-[#c2a4ff] selection:text-black">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
