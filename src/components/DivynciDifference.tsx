"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const DivynciDifference: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 sm:py-32 relative bg-[#F4EFEA] border-t border-[#E5DEC9]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDFBF7] border border-[#E5DEC9] text-xs font-mono text-[#0D2818]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span className="tracking-widest uppercase font-semibold">THE DIVYNCI DIFFERENCE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#0D2818] tracking-tight serif-font leading-[1.08]">
            WE DON&apos;T BEGIN WITH A FORMAT, <br />
            <span className="italic font-normal text-[#4A5D4E]">PLATFORM, OR TECHNOLOGY.</span>
          </h2>
        </div>

        {/* CORE PHILOSOPHY STATEMENT CARD */}
        <div className="p-10 sm:p-16 rounded-3xl bg-[#0D2818] text-[#FDFBF7] space-y-8 text-center shadow-xl">
          <span className="text-xs font-mono font-bold text-[#E5DEC9] uppercase tracking-widest block">
            OUR CENTRAL PHILOSOPHY
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold serif-font tracking-tight leading-snug">
            WE BEGIN WITH WHAT IS TRUE ABOUT THE BUSINESS—AND FIND THE EXPERIENCE THAT CAN CHANGE WHAT HAPPENS NEXT.
          </h3>
          <p className="text-sm sm:text-base text-[#FDFBF7]/80 max-w-2xl mx-auto font-sans leading-relaxed">
            DIVYNCI does not sell fixed agency packages, productized tech tools, or predefined media templates. We identify the specific strategic gap in your business and engineer the exact digital or physical experience required to solve it.
          </p>
        </div>

        {/* CONTEXTUAL NAVIGATION LINK */}
        <div className="text-center pt-2">
          <a
            href="#approach"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wider hover:text-[#4A5D4E] transition-colors group"
          >
            <span>SEE HOW WE THINK</span>
            <ArrowRight className="w-4 h-4 text-[#4A5D4E] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
