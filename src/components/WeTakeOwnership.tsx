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
            <Sparkles className="w-3.5 h-3.5 text-[#B8902A]" />
            <span className="tracking-widest uppercase font-semibold">THE 14-DAY SPRINT</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#0D2818] tracking-tight serif-font leading-[1.08]">
            YOU AGREE ON THE OUTCOME. <br />
            <span className="italic font-normal text-[#4A5D4E]">WE DELIVER THE LIVE LOOP IN 14 DAYS.</span>
          </h2>
          <p className="text-[#0D2818]/80 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            No unbounded agency retainers. We work in single, focused 14-day production sprints to plug your highest-leaking touchpoint.
          </p>
        </div>

        {/* 14-DAY TIMELINE BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              phase: "DAYS 01–03",
              title: "DIAGNOSE & ALIGN",
              desc: "Agree on one primary KPI leak. Analyze drop-off data, unpack brand voice, and approve the experience schematic.",
              owner: "2 hrs founder time",
            },
            {
              phase: "DAYS 04–09",
              title: "RAPID BUILD",
              desc: "Engineered web experience, custom interactive logic, tailored copywriting, and responsive mobile-first UI.",
              owner: "100% DIVYNCI",
            },
            {
              phase: "DAYS 10–12",
              title: "TEST & INSTRUMENT",
              desc: "Connect to Klaviyo/Shopify/CRM, set up unique QR taxonomy, UTM event triggers, and zero-party data mapping.",
              owner: "100% DIVYNCI",
            },
            {
              phase: "DAYS 13–14",
              title: "DEPLOY & OBSERVE",
              desc: "Go live to audience. Real-time telemetry, 7-day conversion telemetry read-out, and continuous handover.",
              owner: "Shared launch",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#F4EFEA] border border-[#E5DEC9] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#B8902A] tracking-wider block">
                  {item.phase}
                </span>
                <h4 className="text-base font-bold text-[#0D2818] serif-font">
                  {item.title}
                </h4>
                <p className="text-xs text-[#4A5D4E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-[#E5DEC9] text-[10px] font-mono uppercase tracking-wider text-[#0D2818]/70 font-semibold">
                {item.owner}
              </div>
            </div>
          ))}
        </div>

        {/* RESPONSIBILITY & OWNERSHIP SPLIT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto font-mono text-xs">
          {/* YOU PROVIDE */}
          <div className="p-8 rounded-3xl bg-[#F4EFEA] border border-[#E5DEC9] space-y-4">
            <span className="text-xs font-bold text-[#0D2818] uppercase tracking-widest block border-b border-[#E5DEC9] pb-3">
              WHAT YOU PROVIDE (LOW OVERHEAD)
            </span>
            <ul className="space-y-2.5 text-[#0D2818]">
              <li className="flex items-center gap-2"><span>✓</span> Access to relevant store/analytics (Shopify, Klaviyo, GA4)</li>
              <li className="flex items-center gap-2"><span>✓</span> 1 key decision maker with fast sign-off</li>
              <li className="flex items-center gap-2"><span>✓</span> Brand assets (fonts, logo, product photography)</li>
              <li className="flex items-center gap-2"><span>✓</span> Total time required: ~3 hours across 14 days</li>
            </ul>
          </div>

          {/* DIVYNCI OWNS */}
          <div className="p-8 rounded-3xl bg-[#0D2818] text-[#FDFBF7] space-y-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#B8902A] to-transparent" />
            <span className="text-xs font-bold text-[#B8902A] uppercase tracking-widest block border-b border-[#E5DEC9]/30 pb-3">
              DIVYNCI DELIVERS (GUARANTEED)
            </span>
            <div className="space-y-2 text-[#FDFBF7]">
              <div>• Live interactive digital loop ready for public traffic</div>
              <div>• Custom QR routing &amp; physical print-ready collateral</div>
              <div>• CRM / Klaviyo integration with automated tag pipelines</div>
              <div>• 100% code &amp; zero-party customer data ownership handed to you</div>
              <div className="text-[#B8902A] pt-1 font-semibold">• 7-day post-launch telemetry &amp; conversion optimization review</div>
            </div>
          </div>
        </div>

        {/* PRICING ANCHOR & PILOT GUARANTEE */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#F4EFEA] border border-[#E5DEC9] text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-[#B8902A] uppercase tracking-widest block">
            TRANSPARENT SPRINT ENGAGEMENT
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0D2818] serif-font">
            Fixed Scope. Clear Deliverables. No Retainer Lock-in.
          </h3>
          <p className="text-xs sm:text-sm text-[#4A5D4E] font-sans max-w-xl mx-auto leading-relaxed">
            Free Growth Audit → Scoped 14-Day Sprint. We credit 100% of any audit time directly toward your build. If the agreed sprint scope isn&apos;t live in 14 days, you receive a full refund.
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href="#audit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D2818] text-[#FDFBF7] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#163B2C] transition-colors group shadow-sm"
            >
              <span>CLAIM FREE AUDIT FOR YOUR BRAND</span>
              <ArrowRight className="w-4 h-4 text-[#B8902A] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
