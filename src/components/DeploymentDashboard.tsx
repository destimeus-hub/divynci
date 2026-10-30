"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Layers, Check, Compass, Cpu, Palette, Megaphone, Activity } from "lucide-react";

// --- OPPORTUNITY EXAMPLES & CAPABILITY POOL ---

type OpportunityType = "launch" | "retention" | "physical" | "community" | "demand";

interface Capability {
  id: string;
  name: string;
  category: string;
  description: string;
}

const ALL_CAPABILITIES: Record<string, Capability> = {
  strategy: { id: "strategy", name: "STRATEGY", category: "FOUNDATION", description: "Opportunity framing & experience architecture" },
  idea: { id: "idea", name: "IDEA", category: "CREATIVE", description: "Core creative concept & campaign hook" },
  experience: { id: "experience", name: "EXPERIENCE", category: "DESIGN", description: "Interactive customer journey & touchpoints" },
  design: { id: "design", name: "DESIGN", category: "VISUAL", description: "Editorial visual identity & spatial layout" },
  production: { id: "production", name: "PRODUCTION", category: "EXECUTION", description: "Asset creation, physical & digital build" },
  technology: { id: "technology", name: "TECHNOLOGY", category: "ENGINEERING", description: "Bespoke digital architecture & infrastructure" },
  content: { id: "content", name: "CONTENT", category: "CREATIVE", description: "Editorial storytelling & campaign messaging" },
  spatial: { id: "spatial", name: "SPATIAL", category: "PHYSICAL", description: "Physical environment & venue activation" },
  personalization: { id: "personalization", name: "PERSONALIZATION", category: "DATA", description: "Contextual customer response loops" },
  relationship: { id: "relationship", name: "RELATIONSHIP", category: "RETENTION", description: "Post-conversion engagement loops" },
  community: { id: "community", name: "COMMUNITY", category: "ENGAGEMENT", description: "Member participation & advocacy systems" },
  participation: { id: "participation", name: "PARTICIPATION", category: "INTERACTION", description: "Interactive mechanics & user involvement" },
  integration: { id: "integration", name: "INTEGRATION", category: "SYSTEMS", description: "Seamless connection across brand touchpoints" },
  measurement: { id: "measurement", name: "MEASUREMENT", category: "ANALYTICS", description: "Impact verification & strategic iteration" },
};

const OPPORTUNITY_PRESETS: Record<
  OpportunityType,
  {
    label: string;
    tag: string;
    description: string;
    capabilities: string[];
  }
> = {
  launch: {
    label: "LAUNCH",
    tag: "PRODUCT / BRAND ANNOUNCEMENT",
    description: "Creating immediate discovery momentum and turning interest into initial adoption.",
    capabilities: ["idea", "experience", "content", "design", "production", "measurement"],
  },
  retention: {
    label: "RETENTION",
    tag: "POST-PURCHASE RELATIONSHIP",
    description: "Designing the secondary experiences that turn one-off transactions into recurring engagement.",
    capabilities: ["experience", "personalization", "content", "relationship", "integration", "measurement"],
  },
  physical: {
    label: "PHYSICAL EXPERIENCE",
    tag: "SPATIAL & VENUE ACTIVATION",
    description: "Bridging physical spaces and digital participation to create memorable real-world moments.",
    capabilities: ["idea", "spatial", "production", "participation", "design", "measurement"],
  },
  community: {
    label: "COMMUNITY",
    tag: "MEMBERSHIP & ADVOCACY",
    description: "Building participation structures that empower audience members to share, refer, and belong.",
    capabilities: ["idea", "participation", "content", "community", "experience", "measurement"],
  },
  demand: {
    label: "DEMAND",
    tag: "CONVERSION & ACQUISITION",
    description: "Removing friction from the consideration phase and maximizing high-intent customer action.",
    capabilities: ["strategy", "experience", "content", "technology", "integration", "measurement"],
  },
};

const RANGE_EXAMPLES = [
  {
    title: "DIGITAL EXPERIENCE",
    category: "INTERACTIVE WEB & CAMPAIGN",
    desc: "Bespoke digital touchpoints designed for immersive discovery and active customer participation.",
    tag: "DIGITAL",
  },
  {
    title: "PHYSICAL ACTIVATION",
    category: "SPATIAL & EVENT",
    desc: "Real-world pop-up experiences and venue interactions that leave a lasting physical impression.",
    tag: "PHYSICAL",
  },
  {
    title: "CAMPAIGN MOMENT",
    category: "CREATIVE & NARRATIVE",
    desc: "High-impact storytelling initiatives built to capture market attention and drive category shift.",
    tag: "CAMPAIGN",
  },
  {
    title: "COMMUNITY SYSTEM",
    category: "PARTICIPATION & ADVOCACY",
    desc: "Structured incentive loops and community spaces that turn customers into long-term advocates.",
    tag: "COMMUNITY",
  },
  {
    title: "CONTENT SYSTEM",
    category: "EDITORIAL & MEDIA",
    desc: "Scalable editorial frameworks that maintain continuous brand presence across channels.",
    tag: "CONTENT",
  },
  {
    title: "HYBRID EXPERIENCE",
    category: "PHYSICAL + DIGITAL",
    desc: "Unified touchpoints seamlessly connecting real-world presence with digital follow-through.",
    tag: "HYBRID",
  },
];

export const DeploymentDashboard: React.FC = () => {
  const [activeOpportunity, setActiveOpportunity] = useState<OpportunityType>("launch");
  const currentPreset = OPPORTUNITY_PRESETS[activeOpportunity];

  return (
    <section id="process" className="py-28 sm:py-36 relative bg-[#FAF8F2] border-t border-[#DED7C9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-28">

        {/* HERO / POSITIONING HEADER */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F1E8] border border-[#DED7C9] text-xs font-mono text-[#193A2A]">
            <Sparkles className="w-3.5 h-3.5 text-[#416B4F]" />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="text-4xl sm:text-7xl font-extrabold text-[#193A2A] tracking-tight serif-font leading-[1.05]">
            YOU GIVE US THE PROBLEM. <br />
            <span className="italic font-normal text-[#416B4F]">WE TAKE IT FROM THERE.</span>
          </h2>
          <p className="text-[#193A2A]/80 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            You bring the context, ambition, and constraints. We figure out the right experience—then handle what it takes to bring it to life.
          </p>
        </div>

        {/* MAIN INTERACTION: CAPABILITY COMPOSITION INSTRUMENT */}
        <div className="bg-white border border-[#DED7C9] p-8 sm:p-12 rounded-3xl space-y-10 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#DED7C9] pb-6 gap-4">
            <div>
              <span className="text-xs font-mono text-[#416B4F] font-bold block uppercase tracking-widest">
                DYNAMIC CAPABILITY ASSEMBLY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#193A2A] serif-font">
                The opportunity changes. The build changes with it.
              </h3>
            </div>
            <span className="text-xs font-mono text-[#77766F]">
              SELECT AN OPPORTUNITY TYPE
            </span>
          </div>

          {/* SELECTABLE OPPORTUNITY PILLS */}
          <div className="flex flex-wrap gap-2.5">
            {(Object.keys(OPPORTUNITY_PRESETS) as OpportunityType[]).map((key) => {
              const preset = OPPORTUNITY_PRESETS[key];
              const isSelected = activeOpportunity === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveOpportunity(key)}
                  className={`px-5 py-3 rounded-2xl text-xs font-mono font-bold transition-all border ${
                    isSelected
                      ? "bg-[#193A2A] text-[#FAF8F2] border-[#193A2A] shadow-md"
                      : "bg-[#FAF8F2] border-[#DED7C9] text-[#193A2A] hover:bg-[#F5F1E8]"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* DYNAMIC CAPABILITY POOL GRID */}
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 font-mono">
              <span className="text-xs font-bold text-[#193A2A] uppercase">
                ASSEMBLED CAPABILITIES FOR &ldquo;{currentPreset.label}&rdquo;
              </span>
              <span className="text-[11px] text-[#77766F]">
                {currentPreset.tag}
              </span>
            </div>

            <p className="text-sm text-[#193A2A]/80 font-sans italic">
              &ldquo;{currentPreset.description}&rdquo;
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeOpportunity}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2"
              >
                {currentPreset.capabilities.map((capId) => {
                  const cap = ALL_CAPABILITIES[capId];
                  return (
                    <div
                      key={capId}
                      className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#DED7C9] space-y-2 text-left hover:border-[#193A2A] transition-all"
                    >
                      <span className="text-[9px] font-mono font-bold text-[#416B4F] tracking-widest block uppercase">
                        {cap.category}
                      </span>
                      <div className="text-xs font-mono font-bold text-[#193A2A]">
                        {cap.name}
                      </div>
                      <p className="text-[10px] font-sans text-[#77766F] leading-snug">
                        {cap.description}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <p className="text-[11px] font-mono text-[#77766F] text-center italic pt-4">
              Illustrative composition only. We don&apos;t have one fixed delivery template—we assemble what the opportunity actually requires.
            </p>
          </div>
        </div>

        {/* SECTION: WHAT YOU GIVE US */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold text-[#416B4F] uppercase tracking-widest block">
              INPUT CONTEXT
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-[#193A2A] serif-font leading-tight">
              YOU DON&apos;T NEED <br />
              <span className="italic font-normal text-[#416B4F]">TO KNOW THE ANSWER.</span>
            </h3>
            <p className="text-sm sm:text-base text-[#77766F] leading-relaxed">
              You give us what&apos;s true about the business. We&apos;ll figure out what experience needs to exist.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { num: "01", title: "CONTEXT", desc: "What's happening in your market, brand, and customer environment?" },
              { num: "02", title: "AMBITION", desc: "What specific metric or customer action needs to change?" },
              { num: "03", title: "AUDIENCE", desc: "Who are we trying to move, motivate, or re-engage?" },
              { num: "04", title: "CONSTRAINTS", desc: "What operational, brand, or technical realities must we work around?" },
            ].map((item) => (
              <div key={item.num} className="p-6 rounded-3xl bg-white border border-[#DED7C9] space-y-2">
                <span className="text-xs font-mono font-bold text-[#416B4F]">{item.num}</span>
                <h4 className="text-base font-bold text-[#193A2A] serif-font">{item.title}</h4>
                <p className="text-xs text-[#77766F] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: WHAT WE TAKE ON */}
        <div className="bg-white border border-[#DED7C9] p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-[#416B4F] uppercase tracking-widest block">
              OWNERSHIP FIELD
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-[#193A2A] serif-font">
              EVERYTHING AFTER THAT IS OUR JOB.
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto pt-2">
            {[
              "STRATEGY",
              "IDEA",
              "EXPERIENCE DESIGN",
              "CREATIVE",
              "CONTENT",
              "PRODUCTION",
              "TECHNOLOGY",
              "INTEGRATION",
              "MEASUREMENT",
              "ITERATION",
            ].map((cap, idx) => (
              <span
                key={idx}
                className="px-5 py-3 rounded-full bg-[#FAF8F2] border border-[#DED7C9] font-mono text-xs font-bold text-[#193A2A]"
              >
                {cap}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#77766F] font-sans text-center max-w-md mx-auto">
            Whatever the idea requires, we bring the right combination together.
          </p>
        </div>

        {/* THE KEY STATEMENT */}
        <div className="p-10 sm:p-16 rounded-3xl bg-[#193A2A] text-[#FAF8F2] text-center space-y-6 shadow-xl max-w-5xl mx-auto">
          <span className="text-xs font-mono font-bold text-[#DED7C9] uppercase tracking-widest block">
            CORE PRINCIPLE
          </span>
          <h3 className="text-3xl sm:text-6xl font-extrabold serif-font tracking-tight leading-tight">
            WE DON&apos;T HAVE <br />
            <span className="italic font-normal text-[#DED7C9]">A STANDARD OUTPUT.</span>
          </h3>
          <p className="text-sm sm:text-base text-[#DED7C9]/90 max-w-2xl mx-auto leading-relaxed">
            Because your problem isn&apos;t standard. Sometimes the right answer is digital. Sometimes it&apos;s physical. Sometimes it&apos;s a campaign, a community, a content system, or something much simpler. We choose the form after we understand the opportunity.
          </p>
        </div>

        {/* THE FORM FOLLOWS THE OPPORTUNITY (SHOW RANGE) */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#416B4F] uppercase tracking-widest block">
              ADAPTIVE RANGE
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-[#193A2A] serif-font">
              THE FORM FOLLOWS THE OPPORTUNITY.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RANGE_EXAMPLES.map((ex, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-[#DED7C9] space-y-4 hover:border-[#193A2A] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#416B4F]">
                    <span>{ex.category}</span>
                    <span className="px-2 py-0.5 rounded bg-[#FAF8F2] border border-[#DED7C9]">{ex.tag}</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#193A2A] serif-font">{ex.title}</h4>
                  <p className="text-xs text-[#77766F] leading-relaxed">{ex.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OWNERSHIP MOMENT */}
        <div className="bg-white border border-[#DED7C9] p-8 sm:p-12 rounded-3xl space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h3 className="text-3xl sm:text-5xl font-extrabold text-[#193A2A] serif-font">
              YOUR TEAM DOESN&apos;T NEED TO BECOME OUR TEAM.
            </h3>
            <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
              You shouldn&apos;t have to coordinate strategy, creative, production, technology, and execution between five different partners. DIVYNCI owns the path from opportunity to live experience.
            </p>
          </div>

          {/* OWNERSHIP SPLIT VISUAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto font-mono text-xs">
            {/* YOU */}
            <div className="p-7 rounded-2xl bg-[#FAF8F2] border border-[#DED7C9] space-y-4">
              <span className="text-xs font-bold text-[#193A2A] uppercase tracking-widest block border-b border-[#DED7C9] pb-3">
                YOU PROVIDE
              </span>
              <ul className="space-y-2.5 text-[#193A2A]">
                <li className="flex items-center gap-2">✓ CONTEXT</li>
                <li className="flex items-center gap-2">✓ AMBITION</li>
                <li className="flex items-center gap-2">✓ APPROVAL</li>
              </ul>
            </div>

            {/* DIVYNCI */}
            <div className="p-7 rounded-2xl bg-[#193A2A] text-[#FAF8F2] space-y-4 shadow-md">
              <span className="text-xs font-bold text-[#DED7C9] uppercase tracking-widest block border-b border-[#DED7C9]/30 pb-3">
                DIVYNCI OWNS
              </span>
              <div className="grid grid-cols-2 gap-2 text-[#FAF8F2]">
                <span>• STRATEGY</span>
                <span>• IDEA</span>
                <span>• DESIGN</span>
                <span>• BUILD</span>
                <span>• PRODUCTION</span>
                <span>• LAUNCH</span>
                <span className="col-span-2 text-[#DED7C9]">• MEASUREMENT &amp; ITERATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* REMOVE SPEED CLAIMS / OWNERSHIP OVER SPEED */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F2] border border-[#DED7C9] text-center space-y-4 max-w-4xl mx-auto">
          <h4 className="text-2xl sm:text-4xl font-extrabold text-[#193A2A] serif-font">
            YOU DON&apos;T HAVE TO BUILD THE TEAM. <br />
            <span className="italic font-normal text-[#416B4F]">WE BRING WHAT THE IDEA NEEDS.</span>
          </h4>
          <p className="text-xs sm:text-sm text-[#77766F] max-w-xl mx-auto">
            We move from opportunity to execution without unnecessary layers or friction.
          </p>
        </div>

        {/* FINAL SECTION CONTINUATION */}
        <div className="max-w-4xl mx-auto space-y-6 text-center pt-6">
          <div className="space-y-3">
            <h3 className="text-4xl sm:text-6xl font-extrabold text-[#193A2A] serif-font tracking-tight leading-tight">
              GIVE US SOMETHING <br />
              <span className="italic font-normal text-[#416B4F]">WORTH SOLVING.</span>
            </h3>
            <p className="text-sm sm:text-base text-[#77766F] max-w-lg mx-auto">
              You&apos;ve seen how we think. Now tell us what&apos;s happening in your world.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#193A2A] uppercase tracking-wider hover:text-[#416B4F] transition-colors group"
            >
              <span>TELL US YOUR SITUATION</span>
              <ArrowRight className="w-4 h-4 text-[#416B4F] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
