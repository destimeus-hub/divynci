"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#DDD7CA] py-3.5 shadow-sm text-[#193A2A]"
          : "bg-[#FAF8F2]/80 backdrop-blur-xs py-4 text-[#193A2A]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 flex items-center justify-between h-12">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-full bg-[#193A2A] text-[#FAF8F2] flex items-center justify-center font-serif font-bold text-xs tracking-wider shadow-xs ring-1 ring-[#B8902A]/30 group-hover:ring-[#B8902A]/70 transition-all">
            D
          </div>
          <span className="font-bold tracking-[0.22em] text-sm uppercase text-[#193A2A]">
            DIVY<span className="text-[#B8902A]">N</span>CI
          </span>
        </Link>

        {/* High-Contrast Navigation Links aligned to Core Journey */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono tracking-[0.18em] font-semibold text-[#193A2A]">
          <a href="#missed-opportunity" className="hover:text-[#315B43] transition-colors uppercase">
            THE LEAKS
          </a>
          <a href="#philosophy" className="hover:text-[#315B43] transition-colors uppercase">
            WHY DIVYNCI
          </a>
          <a href="#approach" className="hover:text-[#315B43] transition-colors uppercase">
            HOW IT WORKS
          </a>
          <a href="#forms" className="hover:text-[#315B43] transition-colors uppercase">
            EXAMPLES
          </a>
          <a href="#ownership" className="hover:text-[#315B43] transition-colors uppercase">
            14-DAY SPRINT
          </a>
          <a href="#audit" className="hover:text-[#315B43] transition-colors uppercase text-[#B8902A]">
            FREE AUDIT
          </a>
        </nav>

        {/* Single Primary Action CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#audit"
            className="px-4.5 py-2 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono font-medium text-[11px] tracking-wider uppercase hover:bg-[#122a1e] transition-all shadow-xs flex items-center gap-2 ring-1 ring-[#B8902A]/40 hover:ring-[#B8902A]/80"
          >
            <span>GET FREE AUDIT</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#193A2A]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#FAF8F2] border-b border-[#DDD7CA] px-6 py-6 space-y-4 text-[#193A2A] font-mono text-xs font-semibold tracking-wider"
        >
          <a
            href="#missed-opportunity"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:opacity-75 uppercase"
          >
            THE LEAKS
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:opacity-75 uppercase"
          >
            WHY DIVYNCI
          </a>
          <a
            href="#approach"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:opacity-75 uppercase"
          >
            HOW IT WORKS
          </a>
          <a
            href="#forms"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:opacity-75 uppercase"
          >
            EXAMPLES
          </a>
          <a
            href="#ownership"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:opacity-75 uppercase"
          >
            14-DAY SPRINT
          </a>
          <a
            href="#audit"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:opacity-75 uppercase text-[#B8902A]"
          >
            FREE AUDIT
          </a>
          <a
            href="#audit"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 rounded-full bg-[#193A2A] text-[#FAF8F2] font-semibold text-xs tracking-widest uppercase mt-4"
          >
            GET FREE AUDIT
          </a>
        </motion.div>
      )}
    </motion.header>
  );
};
