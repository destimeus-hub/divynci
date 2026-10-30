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
            <div className="w-8 h-8 rounded-full bg-[#193A2A] flex items-center justify-center text-[#FAF8F2] font-serif font-bold text-sm">
              D
            </div>
            <div>
              <span className="font-bold tracking-widest text-sm text-[#193A2A]">DIVYNCI</span>
              <div className="text-[10px] text-[#77766F]">GROWTH & INTERACTIVE STUDIO FOR CONSUMER BRANDS</div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[11px] text-[#193A2A]">
            <span>14-DAY GUARANTEED DEPLOYMENT</span>
            <span>KLAVIYO & SHOPIFY CERTIFIED</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#F5F1E8] hover:bg-[#EFEBE0] text-[#193A2A] transition-colors flex items-center gap-2 border border-[#DDD7CA]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 border-t border-[#DDD7CA] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#77766F] gap-4">
          <div>© {new Date().getFullYear()} DIVYNCI INC. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <span>PRIVACY PROTOCOL</span>
            <span>TERMS OF ENGAGEMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
