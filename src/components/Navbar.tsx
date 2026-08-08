"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { TbNotes } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start active
    lenis.start();

    // Handle smooth scroll animation frame
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track scroll for navbar backdrop elevation
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Handle resize
    const handleResize = () => {
      lenis?.resize();
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenis?.destroy();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/" && window.innerWidth > 1024 && lenis) {
      e.preventDefault();
      const target = document.querySelector(targetId) as HTMLElement;
      if (target) {
        lenis.scrollTo(target, {
          offset: 0,
          duration: 1.5,
        });
      }
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-3 md:top-6 z-[9999] mx-auto w-[92%] max-w-screen-lg rounded-full border transition-all duration-300 ${
          scrolled
            ? "border-accent/30 bg-[#0b080c]/90 shadow-[0_10px_30px_rgba(194,164,255,0.15)] backdrop-blur-xl"
            : "border-white/10 bg-[#0b080c]/70 shadow-lg backdrop-blur-lg"
        }`}
      >
        <div className="px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Logo - Shows KS by default, expands to Khadeer Shaik on hover */}
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="group flex items-center overflow-hidden rounded-full bg-accent/20 border border-accent/40 px-3 py-1.5 text-sm font-bold text-accent transition-all duration-500 ease-out hover:bg-accent hover:text-black shadow-sm hover:shadow-[0_0_15px_rgba(194,164,255,0.6)]"
                data-cursor="disable"
              >
                <span className="font-bold font-geist tracking-wider">KS</span>
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 ease-out group-hover:max-w-[150px] group-hover:ml-2.5 group-hover:opacity-100 text-xs font-semibold uppercase tracking-widest">
                  Khadeer Shaik
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex md:items-center md:justify-center md:gap-8">
              <Link
                href="/"
                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                  isActive("/") ? "text-accent font-bold" : "text-slate-300 hover:text-accent"
                }`}
              >
                <HoverLinks text="HOME" />
              </Link>

              <Link
                href="/about"
                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                  isActive("/about") ? "text-accent font-bold" : "text-slate-300 hover:text-accent"
                }`}
              >
                <HoverLinks text="ABOUT" />
              </Link>

              {pathname === "/" ? (
                <a
                  data-href="#work"
                  href="#work"
                  onClick={(e) => handleNavClick(e, "#work")}
                  className="text-xs font-semibold uppercase tracking-widest text-slate-300 hover:text-accent transition-colors"
                >
                  <HoverLinks text="WORK" />
                </a>
              ) : (
                <Link
                  href="/myworks"
                  className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                    isActive("/myworks") ? "text-accent font-bold" : "text-slate-300 hover:text-accent"
                  }`}
                >
                  <HoverLinks text="WORK" />
                </Link>
              )}

              <Link
                href="/contact"
                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                  isActive("/contact") ? "text-accent font-bold" : "text-slate-300 hover:text-accent"
                }`}
              >
                <HoverLinks text="CONTACT" />
              </Link>

              <Link
                href="/play"
                className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                  isActive("/play") ? "text-accent font-bold" : "text-slate-300 hover:text-accent"
                }`}
              >
                <HoverLinks text="PLAY" />
              </Link>
            </nav>

            {/* Desktop Actions & Resume */}
            <div className="hidden md:flex md:items-center md:gap-4">
              <a
                href="/KHADEER_SHAIK_Devloper.pdf"
                download="KHADEER_SHAIK_Devloper.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent hover:bg-accent hover:text-black transition-all shadow-sm hover:shadow-[0_0_15px_rgba(194,164,255,0.6)]"
                data-cursor="disable"
              >
                <span>Resume</span>
                <TbNotes className="text-sm" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href="/KHADEER_SHAIK_Devloper.pdf"
                download="KHADEER_SHAIK_Devloper.pdf"
                className="text-xs font-semibold text-accent underline underline-offset-4 flex items-center gap-1"
              >
                <span>Resume</span>
                <TbNotes />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-black transition-all"
                data-cursor="disable"
              >
                {mobileMenuOpen ? <HiX className="h-5 w-5" /> : <HiOutlineMenuAlt3 className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Dropdown */}
          {mobileMenuOpen && (
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-3 md:hidden animate-fadeIn">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold uppercase tracking-widest rounded-xl transition-all ${
                  isActive("/") ? "bg-accent/10 text-accent" : "text-slate-200 hover:bg-white/5 hover:text-accent"
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold uppercase tracking-widest rounded-xl transition-all ${
                  isActive("/about") ? "bg-accent/10 text-accent" : "text-slate-200 hover:bg-white/5 hover:text-accent"
                }`}
              >
                About
              </Link>

              {pathname === "/" ? (
                <a
                  data-href="#work"
                  href="#work"
                  onClick={(e) => handleNavClick(e, "#work")}
                  className="px-3 py-2 text-sm font-semibold uppercase tracking-widest text-slate-200 hover:bg-white/5 hover:text-accent rounded-xl transition-all"
                >
                  Work
                </a>
              ) : (
                <Link
                  href="/myworks"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-semibold uppercase tracking-widest rounded-xl transition-all ${
                    isActive("/myworks") ? "bg-accent/10 text-accent" : "text-slate-200 hover:bg-white/5 hover:text-accent"
                  }`}
                >
                  Work
                </Link>
              )}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold uppercase tracking-widest rounded-xl transition-all ${
                  isActive("/contact") ? "bg-accent/10 text-accent" : "text-slate-200 hover:bg-white/5 hover:text-accent"
                }`}
              >
                Contact
              </Link>

              <Link
                href="/play"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center justify-between ${
                  isActive("/play") ? "bg-accent text-black font-bold" : "text-accent hover:bg-accent/10"
                }`}
              >
                <span>Play Mode ♟️</span>
                <span>→</span>
              </Link>

              <a
                href="/KHADEER_SHAIK_Devloper.pdf"
                download="KHADEER_SHAIK_Devloper.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold uppercase tracking-widest text-accent hover:bg-accent/10 rounded-xl transition-all flex items-center justify-between"
              >
                <span>Download Resume 📄</span>
                <span>↓</span>
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Decorative ambient glowing circles */}
      <div className="landing-circle1 pointer-events-none fixed top-0 left-0 z-15 w-[300px] h-[300px] bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[60px] rounded-full animate-floatOrb1"></div>
      <div className="landing-circle2 pointer-events-none hidden sm:block fixed top-1/2 right-0 translate-x-[calc(100%-2px)] -translate-y-1/2 z-9 w-[300px] h-[300px] bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[50px] rounded-full animate-floatOrb2"></div>
    </>
  );
};

export default Navbar;
