"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const HowWeThink: React.FC = () => {
  const [isDistilled, setIsDistilled] = useState(false);

  return (
    <section id="approach" className="py-24 sm:py-32 relative bg-[#FDFBF7] border-t border-[#E5DEC9]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-16">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFEA] border border-[#E5DEC9] text-xs font-mono text-[#0D2818]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span className="tracking-widest uppercase font-semibold">HOW WE THINK</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#0D2818] tracking-tight serif-font leading-[1.08]">
            TURNING BUSINESS CONTEXT <br />
            <span className="italic font-normal text-[#4A5D4E]">INTO FOCUSED OPPORTUNITY.</span>
          </h2>
          <p className="text-[#0D2818]/80 text-base sm:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            You bring the context, ambition, and real-world constraints. We find the strategic tension and build the experience that unlocks growth.
          </p>
        </div>

        {/* INTERACTIVE EDITORIAL DISTILLATION BOARD */}
        <div className="bg-[#F4EFEA] border border-[#E5DEC9] p-8 sm:p-12 rounded-3xl space-y-8 shadow-xs relative overflow-hidden text-center">
          <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-4 font-mono text-xs text-[#4A5D4E]">
            <span className="font-bold text-[#0D2818] tracking-wider uppercase">
              STRATEGIC CONTEXT DISTILLATION
            </span>
            <button
              onClick={() => setIsDistilled(!isDistilled)}
              className="text-[#4A5D4E] font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isDistilled ? "RESET CONTEXT" : "DISTILL STRATEGIC TENSION"}</span>
            </button>
          </div>

          {/* Raw Fragments Container */}
          <div className="min-h-[200px] flex flex-col items-center justify-center space-y-4 py-4">
            {!isDistilled ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3 w-full"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5DEC9] text-xs sm:text-sm font-sans text-[#0D2818] shadow-xs max-w-md mx-auto"
                >
                  &ldquo;Launching a new offering into a crowded market.&rdquo;
                </motion.div>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5DEC9] text-xs sm:text-sm font-sans text-[#0D2818] shadow-xs max-w-md mx-auto"
                >
                  &ldquo;People know the category exists, but don&apos;t understand why we&apos;re different.&rdquo;
                </motion.div>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5DEC9] text-xs sm:text-sm font-sans text-[#0D2818] shadow-xs max-w-md mx-auto"
                >
                  &ldquo;We need high-intent trial and genuine word-of-mouth momentum.&rdquo;
                </motion.div>
              </motion.div>
            ) : (
              /* Distilled Insight Reveal */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 px-4 space-y-3"
              >
                <span className="text-xs font-mono text-[#4A5D4E] font-bold tracking-widest uppercase block">
                  A TENSION WORTH EXPLORING
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0D2818] serif-font tracking-tight leading-snug">
                  THE CHALLENGE ISN&apos;T AWARENESS. <br />
                  <span className="italic font-normal text-[#4A5D4E]">IT&apos;S BELIEF.</span>
                </h3>
              </motion.div>
            )}
          </div>

          <p className="text-xs text-[#4A5D4E] font-mono border-t border-[#E5DEC9] pt-4">
            Click above to watch how DIVYNCI distills raw context into strategic clarity.
          </p>
        </div>

        {/* 3 STEP PHILOSOPHY MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "FOUNDER CONTEXT", desc: "You provide what is true about your business, market, and customers." },
            { step: "02", title: "STRATEGIC TENSION", desc: "DIVYNCI identifies the hidden friction point causing attention loss." },
            { step: "03", title: "THE EXPERIENCE", desc: "We design and build the exact physical or digital intervention needed." },
          ].map((item) => (
            <div key={item.step} className="p-6 rounded-2xl bg-[#F4EFEA] border border-[#E5DEC9] space-y-2 text-left">
              <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase tracking-wider block">
                {item.step} / {item.title}
              </span>
              <p className="text-xs text-[#0D2818] font-sans font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CONTEXTUAL NAVIGATION LINK */}
        <div className="text-center pt-2">
          <a
            href="#forms"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wider hover:text-[#4A5D4E] transition-colors group"
          >
            <span>EXPLORE THE APPROACH</span>
            <ArrowRight className="w-4 h-4 text-[#4A5D4E] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
