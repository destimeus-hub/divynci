"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Check, MessageSquare } from "lucide-react";
import { useEngine } from "@/context/EngineContext";

// --- MCQ CONSTANTS ---

const BRAND_CATEGORIES = [
  "Consumer / D2C",
  "Food & Beverage",
  "Fashion / Beauty / Lifestyle",
  "Health & Wellness",
  "Technology / SaaS",
  "Finance / Fintech",
  "Education",
  "Travel / Hospitality",
  "Real Estate",
  "Entertainment / Media",
  "B2B / Professional Services",
  "Other",
];

const SITUATIONS = [
  "We're launching something new",
  "We need more people to discover us",
  "We need to turn attention into sales",
  "We need to increase engagement",
  "We need to re-engage existing customers",
  "We're entering a new market or audience",
  "We need to change how people perceive the brand",
  "We have an opportunity we want to capitalize on",
  "Something else",
];

const OFFERS = [
  "New product",
  "Existing product",
  "Product collection",
  "Service",
  "Brand / rebrand",
  "Membership / community",
  "Event / experience",
  "Launch / announcement",
  "Something else",
];

const OUTCOMES = [
  "More of the right people know us",
  "More people try / buy",
  "More sign-ups / qualified leads",
  "More engagement",
  "More repeat purchases",
  "Stronger customer relationships",
  "More advocacy / UGC",
  "Successful launch momentum",
  "Something else",
];

const AUDIENCE_WHO = [
  "Existing customers",
  "Potential customers",
  "New / untapped audience",
  "Lapsed customers",
  "Professionals / decision-makers",
  "Community / fans",
  "Multiple groups",
  "Other",
];

const AUDIENCE_MATTERS = [
  "Price / value",
  "Convenience",
  "Quality",
  "Status / identity",
  "Discovery / novelty",
  "Trust / reassurance",
  "Belonging / community",
  "Sustainability / purpose",
  "Something else",
];

const CONSTRAINTS_OPTIONS = [
  "Tight deadline",
  "Fixed budget",
  "Existing brand guidelines",
  "Existing website / systems",
  "Legal / regulatory limitations",
  "Physical / operational limitations",
  "Specific tone we must maintain",
  "Nothing major",
  "Other",
];

export const ProductMatcher: React.FC = () => {
  const { state } = useEngine();
  const audit = state.auditResult;

  // Step 1 to 6 = Strategic Questions, 7 = Contact Info, 8 = Completion State
  const [step, setStep] = useState(1);

  // 01 / BRAND
  const [brandCategory, setBrandCategory] = useState<string>("");
  const [brandOneLiner, setBrandOneLiner] = useState<string>("");

  // 02 / SITUATION
  const [situationOption, setSituationOption] = useState<string>("");
  const [situationMore, setSituationMore] = useState<string>("");

  // 03 / OFFER
  const [offerOption, setOfferOption] = useState<string>("");
  const [offerDescribe, setOfferDescribe] = useState<string>("");

  // 04 / OUTCOME (Max 2 selections)
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([]);
  const [outcomeSpecific, setOutcomeSpecific] = useState<string>("");

  // 05 / AUDIENCE
  const [audienceWho, setAudienceWho] = useState<string>("");
  const [audienceMatters, setAudienceMatters] = useState<string[]>([]);
  const [audienceMore, setAudienceMore] = useState<string>("");

  // 06 / CONSTRAINTS (Multi-select)
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);
  const [constraintsMore, setConstraintsMore] = useState<string>("");

  // Contact Form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactWebsite, setContactWebsite] = useState("");
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  // Handlers for Multi-Selects with limits
  const toggleOutcome = (item: string) => {
    if (selectedOutcomes.includes(item)) {
      setSelectedOutcomes(selectedOutcomes.filter((o) => o !== item));
    } else if (selectedOutcomes.length < 2) {
      setSelectedOutcomes([...selectedOutcomes, item]);
    }
  };

  const toggleAudienceMatters = (item: string) => {
    if (audienceMatters.includes(item)) {
      setAudienceMatters(audienceMatters.filter((m) => m !== item));
    } else if (audienceMatters.length < 2) {
      setAudienceMatters([...audienceMatters, item]);
    }
  };

  const toggleConstraint = (item: string) => {
    if (item === "Nothing major") {
      setSelectedConstraints(["Nothing major"]);
      return;
    }
    const filtered = selectedConstraints.filter((c) => c !== "Nothing major");
    if (filtered.includes(item)) {
      setSelectedConstraints(filtered.filter((c) => c !== item));
    } else {
      setSelectedConstraints([...filtered, item]);
    }
  };

  // Submit Contact Form -> Move to Completion State
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!contactName.trim()) errors.name = "Name is required.";
    if (!contactEmail.trim() || !contactEmail.includes("@")) errors.email = "Valid work email is required.";
    if (!contactCompany.trim()) errors.company = "Company is required.";

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactErrors({});
    setStep(8);
  };

  // WhatsApp Pre-filled Lead Dispatch
  const handleWhatsAppDispatch = () => {
    const message = `Hi DIVYNCI, I completed the Campaign Discovery.

NAME: ${contactName.trim()}
WORK EMAIL: ${contactEmail.trim()}
COMPANY: ${contactCompany.trim()}${contactWebsite ? `\nWEBSITE: ${contactWebsite.trim()}` : ""}

--------------------------------
01 / BRAND:
${brandCategory}${brandOneLiner ? `\nWhat we do: ${brandOneLiner.trim()}` : ""}

02 / SITUATION:
${situationOption}${situationMore ? `\nContext: ${situationMore.trim()}` : ""}

03 / OFFER:
${offerOption}${offerDescribe ? `\nDetails: ${offerDescribe.trim()}` : ""}

04 / OUTCOME:
${selectedOutcomes.join(", ")}${outcomeSpecific ? `\nNotes: ${outcomeSpecific.trim()}` : ""}

05 / AUDIENCE:
Target: ${audienceWho}
Values: ${audienceMatters.join(", ")}${audienceMore ? `\nMore: ${audienceMore.trim()}` : ""}

06 / CONSTRAINTS:
${selectedConstraints.join(", ") || "Nothing major"}${constraintsMore ? `\nNotes: ${constraintsMore.trim()}` : ""}

I'd like to discuss the campaign strategy with DIVYNCI.`;

    const whatsappUrl = `https://wa.me/919125499551?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="project-questionnaire" className="py-24 sm:py-32 relative bg-[#FDFBF7] border-y border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5F1E8] border border-[#DED7C9] text-xs font-mono text-[#193A2A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOUNDER CAMPAIGN DISCOVERY</span>
          </div>

          {audit ? (
            <div className="p-4 rounded-2xl bg-[#193A2A] text-[#FAF8F2] text-xs font-mono max-w-xl mx-auto space-y-1 shadow-md">
              <span className="text-[#A3B899] font-bold block uppercase tracking-wider">
                WE'VE SEEN THE GAP. NOW TELL US WHAT'S BEHIND IT.
              </span>
              <p className="text-[#DED7C9] font-sans">
                Audit inherited: <strong>{audit.campaignObj || "Campaign Opportunity"}</strong> ({audit.reach} reach • {audit.action})
              </p>
            </div>
          ) : (
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#193A2A] tracking-tight serif-font">
              Don&apos;t take our word for it. <br />
              <span className="italic font-normal text-[#416B4F]">Try the experience.</span>
            </h2>
          )}

          <p className="text-[#193A2A]/80 text-base sm:text-lg font-medium">
            Give us a brand. We’ll show you what’s possible.
          </p>
          <p className="text-[#77766F] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            You bring the context. We&apos;ll work out the idea, experience, mechanics, and technology to make it happen.
          </p>
        </div>

        {/* Discovery Card Container */}
        <div className="max-w-3xl mx-auto bg-[#F5F1E8] border border-[#DED7C9] p-6 sm:p-10 lg:p-12 rounded-3xl space-y-8 relative shadow-xs min-h-[500px] flex flex-col justify-between">
          {/* Subtle Step Indicator (01 / 06 to 06 / 06) */}
          {step <= 6 && (
            <div className="flex items-center justify-between border-b border-[#DED7C9] pb-4 font-mono text-xs text-[#77766F]">
              <div className="flex items-center gap-2">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1 text-[#193A2A] font-bold hover:underline transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                )}
              </div>
              <span className="font-bold tracking-widest text-[#193A2A]">
                0{step} / 06
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* 01 / BRAND */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#416B4F] font-bold tracking-widest uppercase block">
                    01 / BRAND
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#193A2A] tracking-tight serif-font">
                    WHAT IS YOUR BRAND ABOUT?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                    Give us the starting point. What do you make, sell, or stand for?
                  </p>
                </div>

                <div className="space-y-5 py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {BRAND_CATEGORIES.map((cat) => {
                      const isSelected = brandCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setBrandCategory(cat)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm text-left font-bold transition-all border flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-white border-[#193A2A] text-[#193A2A] shadow-xs ring-1 ring-[#193A2A]"
                              : "bg-[#FAF8F2] border-[#DED7C9] text-[#77766F] hover:bg-white hover:text-[#193A2A]"
                          }`}
                        >
                          <span>{cat}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#193A2A] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase">
                      IN ONE LINE, WHAT DOES YOUR BRAND ACTUALLY DO?
                    </label>
                    <input
                      type="text"
                      value={brandOneLiner}
                      onChange={(e) => setBrandOneLiner(e.target.value)}
                      placeholder="Tell us what you make, sell, or help people do."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm placeholder-[#77766F]/60 focus:outline-none focus:border-[#193A2A]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    disabled={!brandCategory}
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center gap-2 disabled:opacity-40 shadow-xs"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 02 / SITUATION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#416B4F] font-bold tracking-widest uppercase block">
                    02 / SITUATION
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#193A2A] tracking-tight serif-font leading-snug">
                    WHAT IS THE REAL SITUATION RIGHT NOW — AND WHY DOES THIS CAMPAIGN NEED TO EXIST?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                    Choose what is closest. We&apos;ll dig deeper only where useful.
                  </p>
                </div>

                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SITUATIONS.map((sit) => {
                      const isSelected = situationOption === sit;
                      return (
                        <button
                          key={sit}
                          onClick={() => setSituationOption(sit)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm text-left font-semibold transition-all border flex items-center justify-between min-h-[56px] ${
                            isSelected
                              ? "bg-white border-[#193A2A] text-[#193A2A] shadow-xs ring-1 ring-[#193A2A]"
                              : "bg-[#FAF8F2] border-[#DED7C9] text-[#77766F] hover:bg-white hover:text-[#193A2A]"
                          }`}
                        >
                          <span>{sit}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#193A2A] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase">
                      TELL US A LITTLE MORE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={situationMore}
                      onChange={(e) => setSituationMore(e.target.value)}
                      placeholder="What's happening right now that makes this the right moment?"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm placeholder-[#77766F]/60 focus:outline-none focus:border-[#193A2A]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full border border-[#DED7C9] text-[#193A2A] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                  <button
                    disabled={!situationOption}
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center gap-2 disabled:opacity-40 shadow-xs"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 03 / OFFER */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#416B4F] font-bold tracking-widest uppercase block">
                    03 / OFFER
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#193A2A] tracking-tight serif-font">
                    WHAT ARE WE PUTTING INTO THE WORLD?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                    What is this campaign actually putting in front of people?
                  </p>
                </div>

                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {OFFERS.map((off) => {
                      const isSelected = offerOption === off;
                      return (
                        <button
                          key={off}
                          onClick={() => setOfferOption(off)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm text-left font-semibold transition-all border flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-white border-[#193A2A] text-[#193A2A] shadow-xs ring-1 ring-[#193A2A]"
                              : "bg-[#FAF8F2] border-[#DED7C9] text-[#77766F] hover:bg-white hover:text-[#193A2A]"
                          }`}
                        >
                          <span>{off}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#193A2A] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase">
                      WHAT ARE WE PUTTING OUT THERE? (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={offerDescribe}
                      onChange={(e) => setOfferDescribe(e.target.value)}
                      placeholder="Name it or describe it briefly."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm placeholder-[#77766F]/60 focus:outline-none focus:border-[#193A2A]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full border border-[#DED7C9] text-[#193A2A] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                  <button
                    disabled={!offerOption}
                    onClick={() => setStep(4)}
                    className="px-8 py-3.5 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center gap-2 disabled:opacity-40 shadow-xs"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 04 / OUTCOME */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#416B4F] font-bold tracking-widest uppercase block">
                      04 / OUTCOME
                    </span>
                    <span className="text-xs font-mono text-[#77766F] font-bold">
                      ({selectedOutcomes.length}/2 MAX)
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#193A2A] tracking-tight serif-font">
                    WHAT SHOULD CHANGE BECAUSE OF THIS CAMPAIGN?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                    Choose the clearest shift you want to create. <strong className="text-[#193A2A]">One clear shift is better than a long wish-list.</strong>
                  </p>
                </div>

                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {OUTCOMES.map((out) => {
                      const isSelected = selectedOutcomes.includes(out);
                      return (
                        <button
                          key={out}
                          onClick={() => toggleOutcome(out)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm text-left font-semibold transition-all border flex items-center justify-between min-h-[56px] ${
                            isSelected
                              ? "bg-white border-[#193A2A] text-[#193A2A] shadow-xs ring-1 ring-[#193A2A]"
                              : "bg-[#FAF8F2] border-[#DED7C9] text-[#77766F] hover:bg-white hover:text-[#193A2A]"
                          }`}
                        >
                          <span>{out}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#193A2A] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase">
                      ANYTHING SPECIFIC WE SHOULD KNOW? (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={outcomeSpecific}
                      onChange={(e) => setOutcomeSpecific(e.target.value)}
                      placeholder="e.g. Must achieve 1,000 signups in month one."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm placeholder-[#77766F]/60 focus:outline-none focus:border-[#193A2A]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-full border border-[#DED7C9] text-[#193A2A] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                  <button
                    disabled={selectedOutcomes.length === 0}
                    onClick={() => setStep(5)}
                    className="px-8 py-3.5 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center gap-2 disabled:opacity-40 shadow-xs"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 05 / AUDIENCE */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#416B4F] font-bold tracking-widest uppercase block">
                    05 / AUDIENCE
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#193A2A] tracking-tight serif-font leading-snug">
                    WHO ARE WE TRYING TO MOVE — AND WHAT ALREADY MATTERS TO THEM?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                    Tell us who they are and what makes them care, hesitate, choose, or act.
                  </p>
                </div>

                <div className="space-y-4 py-1">
                  {/* First MCQ: WHO ARE THEY? */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold text-[#416B4F] uppercase">
                      1. WHO ARE THEY?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AUDIENCE_WHO.map((item) => {
                        const isSelected = audienceWho === item;
                        return (
                          <button
                            key={item}
                            onClick={() => setAudienceWho(item)}
                            className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                              isSelected
                                ? "bg-[#193A2A] text-[#FAF8F2] border-[#193A2A]"
                                : "bg-[#FAF8F2] border-[#DED7C9] text-[#193A2A] hover:bg-white"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Second MCQ: WHAT MATTERS MOST TO THEM? */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono font-bold text-[#416B4F] uppercase">
                        2. WHAT MATTERS MOST TO THEM?
                      </label>
                      <span className="text-[11px] font-mono text-[#77766F] font-bold">
                        ({audienceMatters.length}/2 MAX)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {AUDIENCE_MATTERS.map((item) => {
                        const isSelected = audienceMatters.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => toggleAudienceMatters(item)}
                            className={`p-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between ${
                              isSelected
                                ? "bg-white border-[#193A2A] text-[#193A2A] ring-1 ring-[#193A2A]"
                                : "bg-[#FAF8F2] border-[#DED7C9] text-[#77766F] hover:bg-white hover:text-[#193A2A]"
                            }`}
                          >
                            <span>{item}</span>
                            {isSelected && <Check className="w-3 h-3 text-[#193A2A] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase">
                      TELL US ANYTHING ELSE THAT MATTERS (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={audienceMore}
                      onChange={(e) => setAudienceMore(e.target.value)}
                      placeholder="What do they want, fear, value, or currently do instead?"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-xs sm:text-sm placeholder-[#77766F]/60 focus:outline-none focus:border-[#193A2A]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3 rounded-full border border-[#DED7C9] text-[#193A2A] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                  <button
                    disabled={!audienceWho || audienceMatters.length === 0}
                    onClick={() => setStep(6)}
                    className="px-8 py-3.5 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center gap-2 disabled:opacity-40 shadow-xs"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* 06 / CONSTRAINTS */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono text-[#416B4F] font-bold tracking-widest uppercase block">
                    06 / CONSTRAINTS
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#193A2A] tracking-tight serif-font">
                    WHAT MUST WE RESPECT OR WORK AROUND?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed">
                    Great ideas still have to work in the real world. Select all that apply.
                  </p>
                </div>

                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {CONSTRAINTS_OPTIONS.map((item) => {
                      const isSelected = selectedConstraints.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleConstraint(item)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm text-left font-semibold transition-all border flex items-center justify-between min-h-[54px] ${
                            isSelected
                              ? "bg-white border-[#193A2A] text-[#193A2A] shadow-xs ring-1 ring-[#193A2A]"
                              : "bg-[#FAF8F2] border-[#DED7C9] text-[#77766F] hover:bg-white hover:text-[#193A2A]"
                          }`}
                        >
                          <span>{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#193A2A] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase">
                      ANYTHING ELSE THAT COULD MAKE A GREAT IDEA DIFFICULT TO EXECUTE? (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={constraintsMore}
                      onChange={(e) => setConstraintsMore(e.target.value)}
                      placeholder="Budget, deadlines, systems, approvals, legal limits, or anything else we should know."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm placeholder-[#77766F]/60 focus:outline-none focus:border-[#193A2A]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setStep(5)}
                    className="px-6 py-3 rounded-full border border-[#DED7C9] text-[#193A2A] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>BACK</span>
                  </button>
                  <button
                    disabled={selectedConstraints.length === 0}
                    onClick={() => setStep(7)}
                    className="px-8 py-3.5 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center gap-2 disabled:opacity-40 shadow-xs"
                  >
                    <span>ALMOST THERE →</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: CONTACT DETAILS */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-mono font-bold text-[#416B4F] tracking-widest uppercase block">
                    ALMOST THERE.
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-[#193A2A] serif-font leading-snug">
                    YOU BRING THE CONTEXT.<br />
                    WE&apos;LL FIND THE OPPORTUNITY.
                  </h3>
                </div>

                <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase mb-1">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm focus:outline-none focus:border-[#193A2A]"
                      />
                      {contactErrors.name && (
                        <p className="text-xs text-red-600 font-medium mt-1">{contactErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase mb-1">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm focus:outline-none focus:border-[#193A2A]"
                      />
                      {contactErrors.email && (
                        <p className="text-xs text-red-600 font-medium mt-1">{contactErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase mb-1">
                        COMPANY *
                      </label>
                      <input
                        type="text"
                        value={contactCompany}
                        onChange={(e) => setContactCompany(e.target.value)}
                        placeholder="Acme Inc."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm focus:outline-none focus:border-[#193A2A]"
                      />
                      {contactErrors.company && (
                        <p className="text-xs text-red-600 font-medium mt-1">{contactErrors.company}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#193A2A] uppercase mb-1">
                        WEBSITE (OPTIONAL)
                      </label>
                      <input
                        type="url"
                        value={contactWebsite}
                        onChange={(e) => setContactWebsite(e.target.value)}
                        placeholder="https://company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#DED7C9] text-[#193A2A] text-sm focus:outline-none focus:border-[#193A2A]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(6)}
                      className="px-6 py-3 rounded-full border border-[#DED7C9] text-[#193A2A] font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white transition-all"
                    >
                      ← BACK
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center gap-2.5 shadow-md"
                    >
                      <span>SEND DISCOVERY TO DIVYNCI →</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 8: COMPLETION STATE */}
            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6 space-y-6 max-w-xl mx-auto"
              >
                <div className="w-14 h-14 rounded-full bg-[#416B4F]/15 border border-[#416B4F]/30 mx-auto flex items-center justify-center text-[#193A2A]">
                  <Check className="w-7 h-7 text-[#416B4F]" />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-[#416B4F] tracking-widest uppercase block">
                    THAT&apos;S ENOUGH TO START.
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#193A2A] serif-font leading-tight">
                    YOU BRING THE CONTEXT.<br />
                    WE&apos;LL FIND THE OPPORTUNITY.
                  </h3>
                  <p className="text-sm sm:text-base text-[#193A2A] font-semibold pt-2">
                    WE&apos;VE GOT THE PICTURE.<br />
                    NOW WE FIND THE RIGHT EXPERIENCE.
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={handleWhatsAppDispatch}
                    className="px-8 py-4 rounded-full bg-[#193A2A] text-[#FAF8F2] font-mono text-xs font-bold tracking-wider uppercase hover:bg-[#122a1e] transition-all flex items-center justify-center gap-2.5 shadow-md"
                  >
                    <span>START THE CONVERSATION →</span>
                    <MessageSquare className="w-4 h-4 text-[#DED7C9]" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
