"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF8F2] border-t border-[#DDD7CA] py-16 text-xs font-mono text-[#77766F]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#193A2A] flex items-center justify-center text-[#FAF8F2] font-serif font-bold text-sm ring-1 ring-[#B8902A]/40">
              D
            </div>
            <div>
              <span className="font-bold tracking-widest text-sm text-[#193A2A]">DIV<span className="text-[#B8902A]">Y</span>NCI</span>
              <div className="text-[10px] text-[#77766F]">GROWTH STUDIO FOR D2C & SERVICE BRANDS</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#193A2A]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8902A] inline-block" />
              14-DAY SPRINT · ONE LIVE LOOP
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8902A] inline-block" />
              BUILT FOR SHOPIFY, KLAVIYO & CUSTOM STACKS
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8902A] inline-block" />
              YOU OWN 100% CODE & ZERO-PARTY DATA
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#F5F1E8] hover:bg-[#EFEBE0] text-[#193A2A] transition-colors flex items-center gap-2 border border-[#DDD7CA]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Founder & Direct Contact Fallback */}
        <div className="pt-6 border-t border-[#DDD7CA] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-[11px] text-[#193A2A]/80 font-medium space-y-1">
            <span className="font-bold text-[#193A2A]">Prefer to talk directly?</span>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[#193A2A] pt-1">
              <a href="mailto:hello@divynci.com" className="hover:text-[#B8902A] underline underline-offset-4">hello@divynci.com</a>
              <span>·</span>
              <a href="https://wa.me/message" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8902A] underline underline-offset-4">WhatsApp Founder Desk</a>
              <span>·</span>
              <a href="#audit" className="hover:text-[#B8902A] underline underline-offset-4">Book 20-Min Strategy Call</a>
            </div>
          </div>
          <div className="text-[10px] text-[#77766F] text-center md:text-right">
            <span>DIVYNCI Studio &middot; New Delhi &amp; Remote &middot; Sprint Slots Limited to 3/Mo</span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#DDD7CA] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#77766F] gap-4">
          <div>&copy; {new Date().getFullYear()} DIVYNCI INC. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-[#193A2A] transition-colors">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-[#193A2A] transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
