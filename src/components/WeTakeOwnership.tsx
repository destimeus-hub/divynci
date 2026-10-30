"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const WeTakeOwnership: React.FC = () => {
  return (
    <section id="ownership" className="py-24 sm:py-32 relative bg-[#FDFBF7] border-t border-[#E5DEC9]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFEA] border border-[#E5DEC9] text-xs font-mono text-[#0D2818]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span className="tracking-widest uppercase font-semibold">WE TAKE OWNERSHIP</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#0D2818] tracking-tight serif-font leading-[1.08]">
            YOU HAND OFF THE PROBLEM. <br />
            <span className="italic font-normal text-[#4A5D4E]">WE HANDLE WHAT IT TAKES TO SOLVE IT.</span>
          </h2>
          <p className="text-[#0D2818]/80 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            You bring the context, ambition, and constraints. DIVYNCI owns the path from strategic framing to live experience and measurement.
          </p>
        </div>

        {/* OWNERSHIP SCOPE GRID */}
        <div className="bg-[#F4EFEA] border border-[#E5DEC9] p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase tracking-widest block">
              FULL-CYCLE RESPONSIBILITY
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0D2818] serif-font">
              EVERYTHING AFTER THE BRIEF IS OUR RESPONSIBILITY.
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto pt-2">
            {[
              "STRATEGY",
              "IDEA DEVELOPMENT",
              "EXPERIENCE DESIGN",
              "PRODUCTION",
              "TECHNICAL & PHYSICAL EXECUTION",
              "INTEGRATION",
              "MEASUREMENT & ITERATION",
            ].map((scope, idx) => (
              <span
                key={idx}
                className="px-5 py-3 rounded-full bg-[#FDFBF7] border border-[#E5DEC9] font-mono text-xs font-bold text-[#0D2818]"
              >
                {scope}
              </span>
            ))}
          </div>
        </div>

        {/* RESPONSIBILITY SPLIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto font-mono text-xs">
          {/* FOUNDER */}
          <div className="p-8 rounded-3xl bg-[#F4EFEA] border border-[#E5DEC9] space-y-4">
            <span className="text-xs font-bold text-[#0D2818] uppercase tracking-widest block border-b border-[#E5DEC9] pb-3">
              YOU PROVIDE
            </span>
            <ul className="space-y-2.5 text-[#0D2818]">
              <li>✓ BUSINESS CONTEXT</li>
              <li>✓ GROWTH AMBITION</li>
              <li>✓ REAL-WORLD CONSTRAINTS</li>
            </ul>
          </div>

          {/* DIVYNCI */}
          <div className="p-8 rounded-3xl bg-[#0D2818] text-[#FDFBF7] space-y-4 shadow-md">
            <span className="text-xs font-bold text-[#E5DEC9] uppercase tracking-widest block border-b border-[#E5DEC9]/30 pb-3">
              DIVYNCI OWNS
            </span>
            <div className="grid grid-cols-2 gap-2 text-[#FDFBF7]">
              <span>• STRATEGY</span>
              <span>• CONCEPT</span>
              <span>• DESIGN</span>
              <span>• PRODUCTION</span>
              <span>• TECHNICAL BUILD</span>
              <span>• LAUNCH</span>
              <span className="col-span-2 text-[#E5DEC9]">• MEASUREMENT &amp; ITERATION</span>
            </div>
          </div>
        </div>

        {/* CONTEXTUAL NAVIGATION LINK */}
        <div className="text-center pt-2">
          <a
            href="#audit"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wider hover:text-[#4A5D4E] transition-colors group"
          >
            <span>SEE WHAT COMES NEXT</span>
            <ArrowRight className="w-4 h-4 text-[#4A5D4E] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
