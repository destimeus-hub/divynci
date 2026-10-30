"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const BeforeAfter: React.FC = () => {
  const [isDistilled, setIsDistilled] = useState(false);

  return (
    <section id="transformation" className="py-28 sm:py-36 relative bg-[#FAF8F2] border-t border-[#DED7C9]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-24">

        {/* 1. OPENING */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold text-[#416B4F] tracking-widest uppercase block">
            YOUR CONTEXT IS IN.
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#193A2A] tracking-tight serif-font leading-[1.1]">
            THAT&apos;S THE SITUATION. <br />
            <span className="italic font-normal text-[#416B4F]">
              HERE&apos;S WHAT&apos;S ACTUALLY GOING ON UNDERNEATH IT.
            </span>
          </h2>
        </div>

        {/* 2. THE FOUNDER'S ANSWERS & DISTILLATION INTERACTION */}
        <div className="max-w-3xl mx-auto bg-[#F5F1E8] border border-[#DED7C9] p-8 sm:p-12 rounded-3xl space-y-8 shadow-xs relative overflow-hidden text-center">
          <div className="flex items-center justify-between border-b border-[#DED7C9] pb-4 font-mono text-xs text-[#77766F]">
            <span className="font-bold text-[#193A2A] tracking-wider uppercase">
              EDITORIAL BRIEF DISTILLATION
            </span>
            <button
              onClick={() => setIsDistilled(!isDistilled)}
              className="text-[#416B4F] font-bold hover:underline flex items-center gap-1.5"
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
                  className="p-4 rounded-2xl bg-white border border-[#DED7C9] text-xs sm:text-sm font-sans text-[#193A2A] shadow-xs max-w-md mx-auto"
                >
                  &ldquo;Launching a new offering into a crowded market.&rdquo;
                </motion.div>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="p-4 rounded-2xl bg-white border border-[#DED7C9] text-xs sm:text-sm font-sans text-[#193A2A] shadow-xs max-w-md mx-auto"
                >
                  &ldquo;People know the category exists, but don&apos;t understand why we&apos;re different.&rdquo;
                </motion.div>
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="p-4 rounded-2xl bg-white border border-[#DED7C9] text-xs sm:text-sm font-sans text-[#193A2A] shadow-xs max-w-md mx-auto"
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
                <span className="text-xs font-mono text-[#416B4F] font-bold tracking-widest uppercase block">
                  A TENSION WORTH EXPLORING
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#193A2A] serif-font tracking-tight leading-snug">
                  THE CHALLENGE ISN&apos;T AWARENESS. <br />
                  <span className="italic font-normal text-[#416B4F]">IT&apos;S BELIEF.</span>
                </h3>
              </motion.div>
            )}
          </div>

          <p className="text-xs text-[#77766F] font-mono border-t border-[#DED7C9] pt-4">
            Click above to watch how DIVYNCI distills raw context into strategic clarity.
          </p>
        </div>

        {/* 3. DIVYNCI'S PHILOSOPHY */}
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#416B4F] tracking-widest uppercase block">
              THIS IS WHERE WE START.
            </span>
            <p className="text-sm sm:text-base text-[#193A2A] font-medium leading-relaxed max-w-xl mx-auto">
              You bring the context. We find the tension worth solving. <br />
              Then we create the experience that changes what happens next.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#193A2A] text-[#FAF8F2] space-y-6 shadow-lg text-center">
            <h3 className="text-3xl sm:text-5xl font-extrabold serif-font tracking-tight">
              THE IDEA COMES FIRST. <br />
              <span className="italic font-normal text-[#DED7C9]">EVERYTHING ELSE FOLLOWS.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#DED7C9]/85 max-w-2xl mx-auto font-sans leading-relaxed">
              We don&apos;t begin with a format, platform, or technology. We begin with what needs to change. The right mechanism comes after the right idea—and it can be digital, physical, participatory, simple, complex, or something entirely unexpected.
            </p>
          </div>
        </div>

        {/* 4. SMALL RANGE DEMONSTRATION */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-xs font-mono font-bold text-[#77766F] tracking-widest uppercase block">
              DIFFERENT PROBLEMS Require DIFFERENT MECHANISMS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "AWARENESS", desc: "Make people notice." },
              { title: "TRIAL", desc: "Give them a reason to try." },
              { title: "RELATIONSHIP", desc: "Give them a reason to return." },
              { title: "PARTICIPATION", desc: "Give them a reason to become part of it." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-[#F5F1E8] border border-[#DED7C9] space-y-2 text-left"
              >
                <span className="text-xs font-mono font-bold text-[#416B4F] uppercase tracking-wider block">
                  {item.title}
                </span>
                <p className="text-sm font-extrabold text-[#193A2A] serif-font">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FINAL MOMENT & CTA */}
        <div className="text-center max-w-2xl mx-auto space-y-6 pt-6">
          <span className="text-xs font-mono font-bold text-[#416B4F] tracking-widest uppercase block">
            WE KNOW WHERE TO LOOK.
          </span>
          <h3 className="text-4xl sm:text-6xl font-extrabold text-[#193A2A] serif-font tracking-tight leading-tight">
            LET&apos;S FIND <br />
            <span className="italic font-normal text-[#416B4F]">WHAT&apos;S POSSIBLE.</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#77766F] font-medium">
            You&apos;ve given us the context. Now let&apos;s go further.
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href="#experience"
              className="px-9 py-4 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#122a1e] transition-all inline-flex items-center gap-2.5 shadow-md"
            >
              <span>LET&apos;S GO FURTHER</span>
              <ArrowRight className="w-4 h-4 text-[#DED7C9]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
