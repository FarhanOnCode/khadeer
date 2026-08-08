"use client";

import Link from "next/link";
import { config } from "../config";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0d0a0f] border-t border-white/10 pt-12 pb-6 text-slate-300 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10">
          {/* Column 1: Brand & Bio (2 cols wide on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 border border-accent/40 text-accent font-bold group-hover:bg-accent group-hover:text-black transition-all">
                KS
              </span>
              <span className="text-lg font-bold uppercase tracking-wider text-white font-geist group-hover:text-accent transition-colors">
                {config.developer.fullName}
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md font-light">
              Full Stack Developer & AI Engineer specializing in high-performance web applications, 3D interactive experiences, and clean software architecture.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent border-b border-accent/30 pb-2 inline-block">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/myworks" className="hover:text-accent transition-colors">
                  My Works
                </Link>
              </li>
              <li>
                <Link href="/play" className="hover:text-accent transition-colors">
                  Play Mode (Chess)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent border-b border-accent/30 pb-2 inline-block">
              Get in Touch
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MdEmail className="text-accent text-base shrink-0" />
                <a
                  href={`mailto:${config.contact.email}`}
                  className="hover:text-accent transition-colors truncate"
                >
                  {config.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-accent text-base shrink-0" />
                <span>{config.social.location}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Connections */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent border-b border-accent/30 pb-2 inline-block">
              Social Links
            </h3>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href={config.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-black hover:border-accent transition-all"
              >
                <FaGithub className="text-base" />
              </a>
              <a
                href={config.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-black hover:border-accent transition-all"
              >
                <FaLinkedinIn className="text-base" />
              </a>
              <a
                href={config.contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-black hover:border-accent transition-all"
              >
                <FaXTwitter className="text-base" />
              </a>
              <a
                href={config.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-black hover:border-accent transition-all"
              >
                <FaInstagram className="text-base" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>
            Copyright © {new Date().getFullYear()} <span className="text-white font-medium">{config.developer.fullName}</span>. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <span className="text-rose-500">❤️</span> by Khadeer Shaik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
