"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type SituationKey = "LAUNCH" | "RETENTION" | "DEMAND" | "EXPERIENCE" | "COMMUNITY" | "B2B / SERVICE";

interface SituationData {
  id: SituationKey;
  label: string;
  situation: string;
  thinking: string;
  experienceTitle: string;
  experienceDesc: string;
  visualType: "launch" | "retention" | "demand" | "experience" | "community" | "b2b";
}

const SITUATIONS: SituationData[] = [
  {
    id: "LAUNCH",
    label: "LAUNCH",
    situation: "A new product needs attention before launch — not just another announcement.",
    thinking: "Create a reason to participate before the product is available. Shift anticipation into active commitment.",
    experienceTitle: "Participatory Launch Vault",
    experienceDesc: "An immersive countdown & unlock experience where prospective customers reveal tiers of product secrets and lock in launch priority through collective momentum.",
    visualType: "launch",
  },
  {
    id: "RETENTION",
    label: "RETENTION",
    situation: "The first transaction happens, but the relationship goes quiet.",
    thinking: "Find a reason for the customer to return that feels useful and personalized, not like another promotional broadcast.",
    experienceTitle: "Routine-Driven Re-engagement Loop",
    experienceDesc: "A utility-first interactive portal that syncs with product usage timelines, offering tailored advice, timely replenishment nudges, and progressive value.",
    visualType: "retention",
  },
  {
    id: "DEMAND",
    label: "DEMAND",
    situation: "People are interested, but too much intent disappears before the next meaningful action.",
    thinking: "Find the friction between interest and action. Guide buyers through their exact decision barriers in real-time.",
    experienceTitle: "Guided Diagnostic Journey",
    experienceDesc: "An interactive friction-reduction flow that evaluates buyer requirements instantly, clarifying value and dynamically presenting the single best path forward.",
    visualType: "demand",
  },
  {
    id: "EXPERIENCE",
    label: "EXPERIENCE",
    situation: "People arrive, experience the brand, and leave with nothing that brings them back.",
    thinking: "Turn the physical or real-world moment into the beginning of a digital relationship without creating friction.",
    experienceTitle: "Spatial & Physical-to-Digital Bridge",
    experienceDesc: "A seamless touchpoint experience linking physical packaging, pop-ups, or unboxing to exclusive interactive digital dimensions.",
    visualType: "experience",
  },
  {
    id: "COMMUNITY",
    label: "COMMUNITY",
    situation: "Audience exists, but participation is becoming passive.",
    thinking: "Give people a reason to contribute, return, and become co-creators alongside the brand.",
    experienceTitle: "Co-Creation & Contribution Engine",
    experienceDesc: "A participatory space where community feedback, voting, and shared milestones actively shape upcoming releases and perks.",
    visualType: "community",
  },
  {
    id: "B2B / SERVICE",
    label: "B2B / SERVICE",
    situation: "The value is difficult to understand before someone talks to sales.",
    thinking: "Make the value easier to experience interactively before asking for a formal high-friction conversation.",
    experienceTitle: "Interactive Opportunity Showcase",
    experienceDesc: "A self-guided discovery instrument where B2B buyers input their operational parameters and visually experience their potential ROI.",
    visualType: "b2b",
  },
];

export const RangeShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState<SituationKey>("LAUNCH");
  const current = SITUATIONS.find((s) => s.id === selectedId) || SITUATIONS[0];

  const formsRange = [
    { label: "DIGITAL", desc: "Interactive web applications & spatial portals" },
    { label: "PHYSICAL", desc: "Packaging, QR, & physical touchpoint bridges" },
    { label: "PARTICIPATORY", desc: "Crowdsourced unlocks & collaborative loops" },
    { label: "CONTENT", desc: "Dynamic narrative engines & personalized media" },
    { label: "COMMUNITY", desc: "Co-creation spaces & collective incentive systems" },
    { label: "HYBRID", desc: "Cross-channel journeys matching real-world context" },
  ];

  return (
    <section id="forms" className="py-24 sm:py-32 relative bg-[#F4EFEA] border-t border-[#E5DEC9] text-[#0D2818]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20 sm:space-y-24">

        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDFBF7] border border-[#E5DEC9] text-xs font-mono tracking-wider uppercase text-[#0D2818]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span>BUSINESS SITUATIONS & EXPERIENCES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#0D2818] tracking-tight serif-font leading-[1.1]">
            THE FORM FOLLOWS <br />
            <span className="italic font-normal text-[#4A5D4E]">THE OPPORTUNITY.</span>
          </h2>

          <p className="text-[#4A5D4E] text-base sm:text-lg max-w-2xl mx-auto font-sans">
            Different problems demand completely different experiences. We don&apos;t start with a fixed format. We start with what needs to change.
          </p>
        </div>

        {/* MAIN INTERACTIVE EXPLORER */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#4A5D4E] uppercase">
              SELECT A BUSINESS SITUATION TO SEE HOW THE FORM TRANSFORMS
            </span>
          </div>

          {/* SITUATION SELECTOR PILLS */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            {SITUATIONS.map((sit) => {
              const active = sit.id === selectedId;
              return (
                <button
                  key={sit.id}
                  onClick={() => setSelectedId(sit.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 border ${
                    active
                      ? "bg-[#0D2818] text-[#FDFBF7] border-[#0D2818] shadow-md scale-105"
                      : "bg-[#FDFBF7] text-[#0D2818] border-[#E5DEC9] hover:border-[#0D2818] hover:bg-[#F4EFEA]"
                  }`}
                >
                  {sit.label}
                </button>
              );
            })}
          </div>

          {/* TRANSFORMING EXPERIENCE CARD CONTAINER */}
          <div className="rounded-3xl p-6 sm:p-12 border border-[#E5DEC9] bg-[#FDFBF7] min-h-[440px] flex flex-col justify-between shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full"
              >
                {/* LEFT COLUMN: EDITORIAL THINKING & STRUCTURE */}
                <div className="lg:col-span-6 space-y-8">
                  {/* SITUATION */}
                  <div className="space-y-2 border-l-2 border-[#0D2818] pl-4">
                    <div className="text-xs font-mono font-bold tracking-widest text-[#4A5D4E] uppercase">
                      THE SITUATION
                    </div>
                    <p className="text-lg sm:text-xl text-[#0D2818] font-medium leading-snug">
                      “{current.situation}”
                    </p>
                  </div>

                  {/* THINKING */}
                  <div className="space-y-2 border-l-2 border-[#E5DEC9] pl-4">
                    <div className="text-xs font-mono font-bold tracking-widest text-[#4A5D4E] uppercase">
                      THE THINKING
                    </div>
                    <p className="text-sm sm:text-base text-[#4A5D4E] leading-relaxed">
                      {current.thinking}
                    </p>
                  </div>

                  {/* RESULTING EXPERIENCE */}
                  <div className="pt-4 border-t border-[#E5DEC9] space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0D2818] uppercase">
                      <span>THE RESULTING EXPERIENCE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#4A5D4E]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0D2818] serif-font">
                      {current.experienceTitle}
                    </h3>
                    <p className="text-sm text-[#4A5D4E] leading-relaxed">
                      {current.experienceDesc}
                    </p>
                  </div>
                </div>

                {/* RIGHT COLUMN: ABSTRACT VISUAL REPRESENTATION */}
                <div className="lg:col-span-6 bg-[#F4EFEA] rounded-2xl p-6 sm:p-8 min-h-[280px] sm:min-h-[320px] flex items-center justify-center border border-[#E5DEC9] overflow-hidden relative">
                  {current.visualType === "launch" && (
                    <div className="w-full space-y-6 text-center">
                      <div className="relative flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                          className="w-32 h-32 rounded-full border border-[#0D2818] absolute"
                        />
                        <div className="w-20 h-20 rounded-full bg-[#0D2818] text-[#FDFBF7] flex flex-col items-center justify-center font-mono text-xs font-bold tracking-widest relative z-10 shadow-lg">
                          <span>UNLOCK</span>
                          <span className="text-[9px] text-[#E5DEC9]">PHASE 01</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-mono font-semibold tracking-wider text-[#0D2818]">
                          PARTICIPATORY LAUNCH VAULT
                        </div>
                        <div className="text-[11px] text-[#4A5D4E] font-mono">
                          Anticipation built into collective unlock momentum
                        </div>
                      </div>
                    </div>
                  )}

                  {current.visualType === "retention" && (
                    <div className="w-full space-y-6">
                      <div className="flex justify-center items-center gap-4">
                        {[1, 2, 3].map((step) => (
                          <motion.div
                            key={step}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 12 + step * 4, ease: "linear" }}
                            className="w-14 h-14 rounded-full border-2 border-dashed border-[#0D2818] flex items-center justify-center font-mono text-[11px] font-bold text-[#0D2818] bg-[#FDFBF7]"
                          >
                            LOOP {step}
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-xs font-mono font-semibold tracking-wider text-[#0D2818]">
                          RE-ENGAGEMENT LOOP
                        </div>
                        <div className="text-[11px] text-[#4A5D4E] font-mono">
                          Utility-first automated customer routine syncing
                        </div>
                      </div>
                    </div>
                  )}

                  {current.visualType === "demand" && (
                    <div className="w-full space-y-3">
                      {["Friction Point Identified", "Real-Time Qualification", "Optimized Path Selected"].map((label, idx) => (
                        <div
                          key={label}
                          className="p-3 bg-[#FDFBF7] border border-[#E5DEC9] rounded-xl flex items-center justify-between text-xs font-mono text-[#0D2818]"
                        >
                          <span>0{idx + 1}. {label}</span>
                          <span className="w-2 h-2 rounded-full bg-[#0D2818]" />
                        </div>
                      ))}
                    </div>
                  )}

                  {current.visualType === "experience" && (
                    <div className="w-full space-y-4 text-center">
                      <div className="relative w-44 h-28 mx-auto bg-[#FDFBF7] border border-[#0D2818] rounded-2xl p-4 flex flex-col justify-between shadow-xs overflow-hidden">
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#4A5D4E]">
                          <span>TOUCHPOINT</span>
                          <span className="text-[#0D2818] font-bold">ACTIVE</span>
                        </div>
                        <div className="text-left font-serif text-xs font-bold text-[#0D2818]">
                          Physical → Digital Gateway
                        </div>
                      </div>
                    </div>
                  )}

                  {current.visualType === "community" && (
                    <div className="w-full space-y-4 text-center">
                      <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
                        {[1, 2, 3, 4, 5, 6].map((node) => (
                          <div
                            key={node}
                            className="p-2.5 rounded-xl bg-[#FDFBF7] border border-[#E5DEC9] text-center font-mono text-[10px] font-bold text-[#0D2818]"
                          >
                            MEMBER {node}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {current.visualType === "b2b" && (
                    <div className="w-full space-y-3">
                      <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#E5DEC9] space-y-2 font-mono text-xs text-[#0D2818]">
                        <div className="flex justify-between text-[10px] font-bold text-[#4A5D4E]">
                          <span>PARAM</span>
                          <span>IMPACT MODEL</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Value Clarity</span>
                          <span className="text-[#0D2818] font-bold">Self-Guided</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* FORMS HORIZONTAL GRID */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#4A5D4E] uppercase block">
              POSSIBLE MEDIUMS &amp; INTERVENTIONS
            </span>
            <h4 className="text-2xl sm:text-3xl font-bold text-[#0D2818] serif-font">
              The output takes whatever form the problem demands.
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {formsRange.map((form, idx) => (
              <div
                key={idx}
                className="bg-[#FDFBF7] border border-[#E5DEC9] rounded-2xl p-5 space-y-2 text-center hover:border-[#0D2818] transition-colors"
              >
                <div className="text-xs font-mono font-bold tracking-widest text-[#0D2818]">
                  {form.label}
                </div>
                <div className="text-[11px] text-[#4A5D4E] leading-tight font-sans">
                  {form.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTEXTUAL NAVIGATION LINK */}
        <div className="text-center pt-2">
          <a
            href="#ownership"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wider hover:text-[#4A5D4E] transition-colors group"
          >
            <span>SEE WHAT THIS COULD LOOK LIKE</span>
            <ArrowRight className="w-4 h-4 text-[#4A5D4E] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
