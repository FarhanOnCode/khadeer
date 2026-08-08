"use client";

import { config } from "@/src/config";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function AboutPage() {
  return (
    <div className="about-page min-h-screen bg-[#0b080c] text-white relative overflow-hidden flex flex-col justify-between pt-28">
      <Navbar />

      {/* Background Ambient Glow Orbs */}
      <div className="fixed top-[-100px] left-[-100px] w-[350px] h-[350px] bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[80px] rounded-full opacity-40 pointer-events-none"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[80px] rounded-full opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-12 py-12 flex-1 flex flex-col justify-center items-center z-10">
        {/* Main Content Card */}
        <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          {/* Left Column - Image */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-accent/40 shadow-[0_0_40px_rgba(194,164,255,0.25)] transition-transform duration-500 hover:scale-105">
              <img
                src="/images/Khadeer.jpeg"
                alt="Khadeer Shaik"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b080c] via-transparent to-transparent opacity-60"></div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xs uppercase tracking-widest text-accent font-semibold font-geist">
                Get to know me
              </h2>
              <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-wider text-white font-geist leading-tight">
                About <span className="text-accent">{config.developer.fullName}</span>
              </h1>
              <p className="text-sm sm:text-base text-accent/80 font-mono font-medium">
                AI Engineer & Full-Stack Developer • Hyderabad, India
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {config.about.description}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-xs font-semibold text-accent uppercase tracking-wider">
                3+ Years Experience
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-slate-200 uppercase tracking-wider">
                AI & Web Architecture
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Chess Engine Creator
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
