"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export const MissedOpportunity: React.FC = () => {
  return (
    <section id="missed-opportunity" className="py-24 sm:py-32 relative bg-[#FDFBF7] border-t border-[#E5DEC9]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFEA] border border-[#E5DEC9] text-xs font-mono text-[#0D2818]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span className="tracking-widest uppercase font-semibold">THE MISSED OPPORTUNITY</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#0D2818] tracking-tight serif-font leading-[1.08]">
            YOU ALREADY HAVE ATTENTION. <br />
            <span className="italic font-normal text-[#4A5D4E]">THE QUESTION IS WHERE IT GOES.</span>
          </h2>
          <p className="text-[#0D2818]/80 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Most brands don&apos;t fail because people don&apos;t notice them. They fail because the value disappears between discovery, decision, and repeat engagement.
          </p>
        </div>

        {/* 4 STAGES OF LEAKAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "DISCOVERY",
              desc: "People encounter your brand, but the experience offers no reason to stay or engage.",
            },
            {
              step: "02",
              title: "INTEREST",
              desc: "Audience curiosity exists, but unaddressed friction stops them from taking action.",
            },
            {
              step: "03",
              title: "ACTION",
              desc: "A initial purchase or booking happens, but the transaction ends without a follow-through.",
            },
            {
              step: "04",
              title: "RETURN",
              desc: "Attention resets to zero because no continuous relationship loop was created.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-8 rounded-3xl bg-[#F4EFEA] border border-[#E5DEC9] space-y-4 text-left flex flex-col justify-between hover:border-[#0D2818]/40 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#4A5D4E] tracking-wider block">
                  {item.step} / {item.title}
                </span>
                <h3 className="text-xl font-bold text-[#0D2818] serif-font">
                  {item.title} FRICTION
                </h3>
                <p className="text-xs text-[#4A5D4E] font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RECOGNITION BLOCK & CONTEXTUAL LINK */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F4EFEA] border border-[#E5DEC9] text-center space-y-6 max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl font-serif italic text-[#0D2818] leading-relaxed">
            &quot;Something in our customer journey may be underperforming.&quot;
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href="#philosophy"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wider hover:text-[#4A5D4E] transition-colors group"
            >
              <span>SEE WHAT&apos;S BEING MISSED</span>
              <ArrowRight className="w-4 h-4 text-[#4A5D4E] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
