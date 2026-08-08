"use client";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import ContactSection from "@/src/components/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col justify-between relative overflow-x-hidden w-full max-w-full">
      <Navbar />

      <div className="flex-1 pt-16 sm:pt-20 w-full max-w-full">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}
