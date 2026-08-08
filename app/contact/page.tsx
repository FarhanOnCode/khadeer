"use client";

import { config } from "@/src/config";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0b080c] text-white flex flex-col justify-between relative overflow-hidden pt-28">
      <Navbar />

      {/* Background Ambient Glow Orbs */}
      <div className="fixed top-[-100px] right-[-100px] w-[350px] h-[350px] bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[80px] rounded-full opacity-40 pointer-events-none"></div>
      <div className="fixed bottom-[100px] left-[-100px] w-[350px] h-[350px] bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[80px] rounded-full opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 sm:px-12 py-12 flex-1 flex flex-col justify-center items-center z-10">
        {/* Contact Card */}
        <div className="w-full max-w-3xl rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 sm:p-12 shadow-2xl text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-widest">
            🚧 Contact Form Coming Soon
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-wider font-geist">
              Let's <span className="text-accent">Connect</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
              My custom interactive contact form is currently in development! In the meantime, you can easily reach me through email or any of my social channels below.
            </p>
          </div>

          {/* Quick Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-2">
            <a
              href={`mailto:${config.contact.email}`}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/10 transition-all flex flex-col items-center gap-2 group"
            >
              <MdEmail className="text-2xl text-accent group-hover:scale-110 transition-transform" />
              <span className="text-xs uppercase tracking-wider text-slate-400">Email Me</span>
              <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-accent transition-colors truncate w-full text-center">
                {config.contact.email}
              </span>
            </a>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2">
              <MdLocationOn className="text-2xl text-accent" />
              <span className="text-xs uppercase tracking-wider text-slate-400">Location</span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {config.social.location}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Find me on
            </h3>
            <div className="flex justify-center gap-4">
              <a
                href={config.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent hover:text-black hover:border-accent transition-all text-lg"
              >
                <FaGithub />
              </a>
              <a
                href={config.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent hover:text-black hover:border-accent transition-all text-lg"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={config.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent hover:text-black hover:border-accent transition-all text-lg"
              >
                <FaXTwitter />
              </a>
              <a
                href={config.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-accent hover:text-black hover:border-accent transition-all text-lg"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
