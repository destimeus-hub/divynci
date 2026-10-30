"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, MessageSquare, ChevronLeft } from "lucide-react";

// --- TYPES & INTERFACES ---

export type BusinessActivity = 
  | 'website_visitors' 
  | 'physical_visitors' 
  | 'monthly_customers' 
  | 'enquiries_leads' 
  | 'bookings' 
  | 'event_attendees' 
  | 'community_members' 
  | 'other';

export type GoalAction = 
  | 'purchase' 
  | 'book_service' 
  | 'send_enquiry' 
  | 'visit_location' 
  | 'sign_up' 
  | 'attend_event' 
  | 'try_something' 
  | 'join_community' 
  | 'return_again' 
  | 'something_else';

export type ConversionBaseline = 'under_1' | '1_2' | '3_5' | '6_10' | '10_plus' | 'unsure';

// State view stages:
// 1: Step 1 (Business Context)
// 2: Step 2 (Desired Action)
// 3: Step 3 (Current Monthly Outcome / Baseline)
// 'initial_insight': Initial Result Screen (Here's what your current numbers tell us)
// 4: Step 4 (Identify the Friction - Dynamic question)
// 5: Step 5 (Strategic Outcome / Opportunity Focus)
// 'final_result': Final Result Screen + WhatsApp Handoff
export type AuditStage = 1 | 2 | 3 | 'initial_insight' | 4 | 5 | 'final_result';

export interface AuditState {
  activityType: BusinessActivity;
  customActivityLabel: string;
  monthlyVolume: number | 'unsure';
  primaryGoal: GoalAction;
  customGoalLabel: string;
  conversionBaseline: ConversionBaseline;
  selectedFriction: string;
  desireArea: string;
  qualitativeFriction: string;
}

const INITIAL_AUDIT_STATE: AuditState = {
  activityType: 'website_visitors',
  customActivityLabel: '',
  monthlyVolume: 10000,
  primaryGoal: 'purchase',
  customGoalLabel: '',
  conversionBaseline: '1_2',
  selectedFriction: '',
  desireArea: 'Converting more of our existing audience into active users/buyers',
  qualitativeFriction: '',
};

const ACTIVITY_OPTIONS: { id: BusinessActivity; label: string; volumeLabel: string; unitPlural: string; unitSingular: string }[] = [
  { id: 'website_visitors', label: 'Website visitors', volumeLabel: 'Average monthly website visitors', unitPlural: 'visitors', unitSingular: 'visitor' },
  { id: 'physical_visitors', label: 'Physical visitors', volumeLabel: 'Average monthly foot traffic/visitors', unitPlural: 'visitors', unitSingular: 'visitor' },
  { id: 'monthly_customers', label: 'Monthly customers', volumeLabel: 'Average monthly active customers', unitPlural: 'customers', unitSingular: 'customer' },
  { id: 'enquiries_leads', label: 'Enquiries or leads', volumeLabel: 'Average monthly inbound enquiries or leads', unitPlural: 'enquiries', unitSingular: 'enquiry' },
  { id: 'bookings', label: 'Bookings', volumeLabel: 'Average monthly bookings/reservations', unitPlural: 'bookings', unitSingular: 'booking' },
  { id: 'event_attendees', label: 'Event attendees', volumeLabel: 'Average monthly event attendees', unitPlural: 'attendees', unitSingular: 'attendee' },
  { id: 'community_members', label: 'Community members', volumeLabel: 'Active monthly community members', unitPlural: 'members', unitSingular: 'member' },
  { id: 'other', label: 'Other', volumeLabel: 'Average monthly volume', unitPlural: 'people', unitSingular: 'person' },
];

const GOAL_OPTIONS: { id: GoalAction; label: string; verb: string; baselineHeader: string }[] = [
  { id: 'purchase', label: 'Purchase a product / service', verb: 'purchase', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY CURRENTLY PURCHASE?' },
  { id: 'book_service', label: 'Book a call or service', verb: 'book', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY CURRENTLY BOOK?' },
  { id: 'send_enquiry', label: 'Submit an enquiry or request a quote', verb: 'enquire', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY CURRENTLY ENQUIRE?' },
  { id: 'visit_location', label: 'Visit a physical location', verb: 'visit', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY CURRENTLY VISIT?' },
  { id: 'sign_up', label: 'Sign up for an account / trial', verb: 'sign up', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY CURRENTLY SIGN UP?' },
  { id: 'attend_event', label: 'Attend an event or experience', verb: 'attend', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY ACTUALLY ATTEND?' },
  { id: 'try_something', label: 'Try something new', verb: 'try it', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY CURRENTLY TRY IT?' },
  { id: 'join_community', label: 'Join a community', verb: 'join', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO FIND YOU, HOW MANY CURRENTLY JOIN?' },
  { id: 'return_again', label: 'Return for a repeat transaction', verb: 'come back', baselineHeader: 'OUT OF EVERY 100 PEOPLE WHO BUY, HOW MANY COME BACK AGAIN?' },
  { id: 'something_else', label: 'Something else', verb: 'take action', baselineHeader: 'OUT OF EVERY 100 PEOPLE, HOW MANY CURRENTLY TAKE THAT NEXT STEP?' },
];

const BASELINE_OPTIONS: { id: ConversionBaseline; label: string; midpoint: number }[] = [
  { id: 'under_1', label: '< 1%', midpoint: 0.005 },
  { id: '1_2', label: '1–2%', midpoint: 0.015 },
  { id: '3_5', label: '3–5%', midpoint: 0.040 },
  { id: '6_10', label: '6–10%', midpoint: 0.080 },
  { id: '10_plus', label: '> 10%', midpoint: 0.120 },
  { id: 'unsure', label: "I'm not sure", midpoint: 0 },
];

const DESIRE_OPTIONS = [
  "More people discovering us for the first time",
  "Converting more of our existing audience into active users/buyers",
  "Raising the quality and intent of inbound enquiries",
  "Increasing repeat frequency and customer lifetime value",
  "Building deeper brand connection and engagement",
];

const DIVYNCI_WHATSAPP_NUMBER = "15550192834"; // Formatted standard number target

export const RoiCalculator: React.FC = () => {
  const [stage, setStage] = useState<AuditStage>(1);
  const [auditState, setAuditState] = useState<AuditState>(INITIAL_AUDIT_STATE);
  const [volumeInputText, setVolumeInputText] = useState<string>("10,000");

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    if (!rawVal) {
      setVolumeInputText("");
      setAuditState((prev) => ({ ...prev, monthlyVolume: 0 }));
      return;
    }
    const num = parseInt(rawVal, 10);
    setVolumeInputText(num.toLocaleString());
    setAuditState((prev) => ({ ...prev, monthlyVolume: num }));
  };

  const handleToggleUnsureVolume = () => {
    if (auditState.monthlyVolume === 'unsure') {
      setAuditState((prev) => ({ ...prev, monthlyVolume: 10000 }));
      setVolumeInputText("10,000");
    } else {
      setAuditState((prev) => ({ ...prev, monthlyVolume: 'unsure' }));
      setVolumeInputText("");
    }
  };

  // Helpers
  const currentActivityObj = ACTIVITY_OPTIONS.find((a) => a.id === auditState.activityType) || ACTIVITY_OPTIONS[0];
  const currentGoalObj = GOAL_OPTIONS.find((g) => g.id === auditState.primaryGoal) || GOAL_OPTIONS[0];
  const currentBaselineObj = BASELINE_OPTIONS.find((b) => b.id === auditState.conversionBaseline) || BASELINE_OPTIONS[1];

  const activityLabel = auditState.activityType === 'other'
    ? (auditState.customActivityLabel || 'Other Activity')
    : currentActivityObj.label;

  const goalLabel = auditState.primaryGoal === 'something_else'
    ? (auditState.customGoalLabel || 'Custom Goal')
    : currentGoalObj.label;

  // Dynamic friction options for Step 4 based on primary goal
  const getFrictionQuestionAndOptions = () => {
    switch (auditState.primaryGoal) {
      case 'purchase':
      case 'try_something':
        return {
          question: "WHERE DO YOU THINK POTENTIAL CUSTOMERS MOST OFTEN DROP OFF?",
          options: [
            "They do not notice us",
            "They show interest but do not purchase",
            "They hesitate before buying",
            "They purchase once but do not return",
            "I’m not sure yet"
          ]
        };
      case 'send_enquiry':
        return {
          question: "WHERE DO POTENTIAL CLIENTS MOST OFTEN GO QUIET?",
          options: [
            "Before making an enquiry",
            "After sending an enquiry",
            "During the follow-up",
            "Before booking a call",
            "I’m not sure yet"
          ]
        };
      case 'book_service':
      case 'visit_location':
        return {
          question: "WHERE DO YOU FEEL PEOPLE MOST OFTEN DROP OUT OF THE BOOKING JOURNEY?",
          options: [
            "Before choosing a service",
            "Before starting the booking",
            "During the booking process",
            "After showing initial interest",
            "I’m not sure yet"
          ]
        };
      case 'return_again':
        return {
          question: "WHAT DO YOU THINK STOPS PEOPLE FROM COMING BACK?",
          options: [
            "They forget about us",
            "They do not see a reason to return",
            "The follow-up is inconsistent",
            "The experience could be better",
            "I’m not sure yet"
          ]
        };
      default:
        return {
          question: "WHERE IN THE JOURNEY DO INTERESTED PEOPLE MOST OFTEN STALL?",
          options: [
            "Before taking the initial step",
            "Right when making a decision",
            "During the onboarding or process",
            "After their first experience",
            "I’m not sure yet"
          ]
        };
    }
  };

  const frictionConfig = getFrictionQuestionAndOptions();

  // Calculations
  const calculateInitialMetrics = () => {
    if (auditState.monthlyVolume === 'unsure' || auditState.conversionBaseline === 'unsure') {
      return null;
    }
    const V = auditState.monthlyVolume as number;
    const R_curr = currentBaselineObj.midpoint;
    const A_curr = Math.round(V * R_curr);

    return {
      V,
      R_curr_pct: (R_curr * 100).toFixed(1).replace(/\.0$/, ''),
      A_curr,
      unit: A_curr === 1 ? currentActivityObj.unitSingular : currentActivityObj.unitPlural,
    };
  };

  const initialMetrics = calculateInitialMetrics();

  // WhatsApp Link Generator for Final Handoff
  const generateWhatsAppUrl = () => {
    const volumeStr = auditState.monthlyVolume === 'unsure' ? 'Unsure' : auditState.monthlyVolume.toLocaleString();
    const baselineStr = currentBaselineObj.label;
    const outcomeStr = initialMetrics ? `~${initialMetrics.A_curr.toLocaleString()} ${initialMetrics.unit}/mo` : 'Uncalculated';
    const frictionStr = auditState.selectedFriction || 'Unspecified friction';
    const desireStr = auditState.desireArea;
    const qualitativeStr = auditState.qualitativeFriction.trim() || 'None provided';

    const message = `Hi DIVYNCI, I just completed the Conversational Growth Audit.\n\n• Business Activity: ${activityLabel}\n• Monthly Volume: ${volumeStr}\n• Primary Goal: ${goalLabel}\n• Current Baseline: ${baselineStr} (${outcomeStr})\n• Identified Friction: ${frictionStr}\n• Desired Shift: ${desireStr}\n• Context Note: "${qualitativeStr}"\n\nI'd like to discuss how we can address this growth gap together.`;

    return `https://wa.me/${DIVYNCI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  // Step Navigation Logic
  const handleNext = () => {
    if (stage === 1) setStage(2);
    else if (stage === 2) setStage(3);
    else if (stage === 3) setStage('initial_insight');
    else if (stage === 'initial_insight') setStage(4);
    else if (stage === 4) setStage(5);
    else if (stage === 5) setStage('final_result');
  };

  const handleBack = () => {
    if (stage === 2) setStage(1);
    else if (stage === 3) setStage(2);
    else if (stage === 'initial_insight') setStage(3);
    else if (stage === 4) setStage('initial_insight');
    else if (stage === 5) setStage(4);
    else if (stage === 'final_result') setStage(5);
  };

  const handleReset = () => {
    setAuditState(INITIAL_AUDIT_STATE);
    setStage(1);
    setVolumeInputText("10,000");
  };

  return (
    <section id="audit" className="py-24 sm:py-36 relative bg-[#FDFBF7] border-t border-[#E5DEC9]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFEA] border border-[#E5DEC9] text-xs font-mono text-[#0D2818]">
            <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
            <span className="tracking-widest uppercase font-semibold">DIVYNCI CONVERSATIONAL GROWTH AUDIT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0D2818] tracking-tight serif-font leading-[1.08]">
            UNCOVER THE HIDDEN GAP <br />
            <span className="italic font-normal text-[#4A5D4E]">IN YOUR GROWTH ENGINE.</span>
          </h2>
          <p className="text-[#0D2818]/80 text-base font-medium max-w-lg mx-auto leading-relaxed">
            A 2-to-4 minute interactive diagnostic designed for founders to identify friction and unlock baseline potential.
          </p>
        </div>

        {/* MAIN CONVERSATIONAL CONTAINER */}
        <div className="bg-[#F4EFEA] border border-[#E5DEC9] rounded-3xl p-6 sm:p-12 shadow-xs relative overflow-hidden transition-all duration-300">
          
          {/* HEADER BAR FOR AUDIT PROGRESS */}
          <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-4 mb-8 font-mono text-xs text-[#4A5D4E] font-bold">
            <div className="flex items-center gap-2">
              {stage !== 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="p-1 hover:text-[#0D2818] transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
              )}
              {stage !== 1 && <span className="text-[#E5DEC9]">|</span>}
              <span>
                {stage === 1 && "STAGE 1 / 5 — BUSINESS CONTEXT"}
                {stage === 2 && "STAGE 2 / 5 — DESIRED ACTION"}
                {stage === 3 && "STAGE 3 / 5 — CONVERSION BASELINE"}
                {stage === 'initial_insight' && "INITIAL DIAGNOSTIC INSIGHT"}
                {stage === 4 && "STAGE 4 / 5 — FRICTION IDENTIFICATION"}
                {stage === 5 && "STAGE 5 / 5 — STRATEGIC OPPORTUNITY"}
                {stage === 'final_result' && "FINAL STRATEGIC DIAGNOSTIC"}
              </span>
            </div>

            {(stage === 'initial_insight' || stage === 'final_result') && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-[#4A5D4E] hover:text-[#0D2818] flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RE-AUDIT</span>
              </button>
            )}
          </div>

          {/* TRANSITIONAL STAGE CONTENT */}
          <AnimatePresence mode="wait">
            
            {/* STEP 1: BUSINESS CONTEXT */}
            {stage === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2818] tracking-tight serif-font uppercase">
                    LET’S START WITH WHERE YOU ARE TODAY.
                  </h3>
                  <p className="text-sm text-[#4A5D4E]">
                    A few quick details will help us understand the scale of your business and identify where an opportunity may exist.
                  </p>
                </div>

                {/* Activity Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wide">
                    HOW DO PEOPLE MOST MEANINGFULLY ENGAGE WITH YOUR BUSINESS RIGHT NOW?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ACTIVITY_OPTIONS.map((act) => {
                      const isSelected = auditState.activityType === act.id;
                      return (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => setAuditState((prev) => ({ ...prev, activityType: act.id }))}
                          className={`p-4 rounded-xl text-xs font-mono font-semibold text-left transition-all border flex items-center justify-between ${
                            isSelected
                              ? "bg-[#FDFBF7] border-[#0D2818] text-[#0D2818] shadow-xs ring-1 ring-[#0D2818]"
                              : "bg-[#FDFBF7]/60 border-[#E5DEC9] text-[#4A5D4E] hover:text-[#0D2818] hover:border-[#0D2818]/40"
                          }`}
                        >
                          <span>{act.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0D2818]" />}
                        </button>
                      );
                    })}
                  </div>

                  {auditState.activityType === 'other' && (
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Specify custom activity type..."
                        value={auditState.customActivityLabel}
                        onChange={(e) => setAuditState((prev) => ({ ...prev, customActivityLabel: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E5DEC9] text-[#0D2818] font-mono text-xs focus:outline-none focus:border-[#0D2818]"
                      />
                    </div>
                  )}
                </div>

                {/* Volume Input */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wide">
                    {currentActivityObj.volumeLabel}
                  </label>
                  
                  <div className="space-y-2">
                    {auditState.monthlyVolume !== 'unsure' ? (
                      <input
                        type="text"
                        value={volumeInputText}
                        onChange={handleVolumeChange}
                        placeholder="e.g. 10,000"
                        className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E5DEC9] text-[#0D2818] font-mono font-bold text-sm focus:outline-none focus:border-[#0D2818]"
                      />
                    ) : (
                      <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E5DEC9] text-xs font-mono text-[#4A5D4E] italic">
                        Monthly volume marked as &quot;Unsure&quot;. We will activate Qualitative Insight Mode.
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={handleToggleUnsureVolume}
                        className="text-xs font-mono font-semibold text-[#4A5D4E] hover:text-[#0D2818] underline transition-colors"
                      >
                        {auditState.monthlyVolume === 'unsure' ? "I want to enter an estimated number" : "I'm not sure right now"}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-[#4A5D4E] italic">
                    Rough estimates are perfectly fine. We are looking for scale, not exact accounting.
                  </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-[#E5DEC9]">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-full bg-[#0D2818] text-[#FDFBF7] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#122a1e] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-4 h-4 text-[#FDFBF7]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DESIRED ACTION */}
            {stage === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase block">
                    Got it. Now let’s look at what happens next.
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2818] tracking-tight serif-font uppercase">
                    WHAT DO PEOPLE USUALLY DO AFTER THEY FIRST FIND OR ENCOUNTER YOU?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GOAL_OPTIONS.map((goal) => {
                    const isSelected = auditState.primaryGoal === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setAuditState((prev) => ({ ...prev, primaryGoal: goal.id }))}
                        className={`p-4 rounded-xl text-xs font-mono font-semibold text-left transition-all border flex items-center justify-between ${
                          isSelected
                            ? "bg-[#FDFBF7] border-[#0D2818] text-[#0D2818] shadow-xs ring-1 ring-[#0D2818]"
                            : "bg-[#FDFBF7]/60 border-[#E5DEC9] text-[#4A5D4E] hover:text-[#0D2818] hover:border-[#0D2818]/40"
                        }`}
                      >
                        <span>{goal.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0D2818]" />}
                      </button>
                    );
                  })}
                </div>

                {auditState.primaryGoal === 'something_else' && (
                  <div className="pt-2">
                    <input
                      type="text"
                      placeholder="Specify custom action..."
                      value={auditState.customGoalLabel}
                      onChange={(e) => setAuditState((prev) => ({ ...prev, customGoalLabel: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#E5DEC9] text-[#0D2818] font-mono text-xs focus:outline-none focus:border-[#0D2818]"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DEC9]">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-full border border-[#E5DEC9] bg-[#FDFBF7] text-[#0D2818] font-mono text-xs font-bold uppercase hover:bg-[#E5DEC9]/40 transition-all"
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-full bg-[#0D2818] text-[#FDFBF7] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#122a1e] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-4 h-4 text-[#FDFBF7]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BASELINE CONVERSION PERFORMANCE */}
            {stage === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2818] tracking-tight serif-font uppercase">
                    {currentGoalObj.baselineHeader}
                  </h3>
                  <p className="text-sm text-[#4A5D4E]">
                    Select the baseline percentage range that best matches your current performance.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {BASELINE_OPTIONS.map((opt) => {
                    const isSelected = auditState.conversionBaseline === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAuditState((prev) => ({ ...prev, conversionBaseline: opt.id }))}
                        className={`p-4 rounded-xl text-xs font-mono font-bold text-center transition-all border ${
                          isSelected
                            ? "bg-[#0D2818] text-[#FDFBF7] border-[#0D2818] shadow-md"
                            : "bg-[#FDFBF7] border-[#E5DEC9] text-[#0D2818] hover:bg-[#FDFBF7]/80"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {auditState.conversionBaseline === 'unsure' && (
                  <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E5DEC9] text-xs font-mono text-[#4A5D4E] space-y-1">
                    <span className="font-bold text-[#0D2818] block uppercase">Qualitative Insight Mode Activated</span>
                    <p>We won&apos;t make up estimated figures. We&apos;ll focus on exploring unmeasured friction points in the next steps.</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DEC9]">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-full border border-[#E5DEC9] bg-[#FDFBF7] text-[#0D2818] font-mono text-xs font-bold uppercase hover:bg-[#E5DEC9]/40 transition-all"
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-full bg-[#0D2818] text-[#FDFBF7] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#122a1e] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>VIEW INITIAL INSIGHT</span>
                    <ArrowRight className="w-4 h-4 text-[#FDFBF7]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* INITIAL RESULT SCREEN (AFTER STEP 3) */}
            {stage === 'initial_insight' && (
              <motion.div
                key="initial_insight"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase tracking-wider block">
                    INITIAL DIAGNOSTIC SUMMARY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D2818] serif-font uppercase tracking-tight">
                    HERE’S WHAT YOUR CURRENT NUMBERS TELL US.
                  </h3>
                </div>

                {/* PERSONALIZED NUMBERS CARD */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#FDFBF7] border border-[#E5DEC9] space-y-6">
                  <div className="space-y-3 font-mono text-xs text-[#0D2818]">
                    <div className="p-4 rounded-xl bg-[#F4EFEA] border border-[#E5DEC9]">
                      {initialMetrics ? (
                        <p className="text-sm font-serif italic leading-relaxed text-[#0D2818]">
                          &quot;You currently receive approximately <strong>{initialMetrics.V.toLocaleString()} {activityLabel.toLowerCase()}</strong> each month, resulting in around <strong>{initialMetrics.A_curr.toLocaleString()} {initialMetrics.unit}</strong> taking your primary goal ({goalLabel.toLowerCase()}).&quot;
                        </p>
                      ) : (
                        <p className="text-sm font-serif italic leading-relaxed text-[#0D2818]">
                          &quot;You currently manage an active baseline of <strong>{activityLabel.toLowerCase()}</strong> with the goal of driving <strong>{goalLabel.toLowerCase()}</strong>, though exact conversion volumes are currently unmeasured.&quot;
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="font-bold uppercase text-[#0D2818] block">CONTEXTUAL INSIGHT:</span>
                      <p className="text-xs font-sans text-[#4A5D4E] leading-relaxed">
                        The opportunity may not be about reaching more people. It may be about helping more of the people already finding you take the next step.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-[#4A5D4E] uppercase tracking-widest font-bold">
                    ILLUSTRATIVE INSIGHT BASED ON YOUR INPUTS
                  </div>
                </div>

                {/* IN-SITE CONTINUATION BRIDGE (NO WHATSAPP HERE) */}
                <div className="p-8 rounded-2xl bg-[#0D2818] text-[#FDFBF7] space-y-6 text-center shadow-lg">
                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-bold serif-font tracking-wide uppercase">
                      THE NEXT STEP IS IDENTIFYING THE GAP.
                    </h4>
                    <p className="text-xs font-sans text-[#FDFBF7]/80 max-w-md mx-auto leading-relaxed">
                      Now let’s look at where momentum is getting lost in the customer experience.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FDFBF7] text-[#0D2818] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F4EFEA] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>CONTINUE → FIND THE GAP</span>
                      <ArrowRight className="w-4 h-4 text-[#0D2818]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: FIND THE GAP (DYNAMIC FRICTION IDENTIFICATION) */}
            {stage === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase block">
                    That helps us narrow it down. Now let’s look at where the opportunity may be getting lost.
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2818] tracking-tight serif-font uppercase">
                    {frictionConfig.question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {frictionConfig.options.map((opt) => {
                    const isSelected = auditState.selectedFriction === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAuditState((prev) => ({ ...prev, selectedFriction: opt }))}
                        className={`w-full p-4 rounded-xl text-xs font-mono font-semibold text-left transition-all border flex items-center justify-between ${
                          isSelected
                            ? "bg-[#FDFBF7] border-[#0D2818] text-[#0D2818] shadow-xs ring-1 ring-[#0D2818]"
                            : "bg-[#FDFBF7]/60 border-[#E5DEC9] text-[#4A5D4E] hover:text-[#0D2818] hover:border-[#0D2818]/40"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0D2818]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DEC9]">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-full border border-[#E5DEC9] bg-[#FDFBF7] text-[#0D2818] font-mono text-xs font-bold uppercase hover:bg-[#E5DEC9]/40 transition-all"
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!auditState.selectedFriction}
                    className={`px-8 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      auditState.selectedFriction
                        ? "bg-[#0D2818] text-[#FDFBF7] hover:bg-[#122a1e] shadow-md cursor-pointer"
                        : "bg-[#E5DEC9] text-[#4A5D4E] cursor-not-allowed"
                    }`}
                  >
                    <span>CONTINUE</span>
                    <ArrowRight className="w-4 h-4 text-current" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: STRATEGIC OPPORTUNITY & QUALITATIVE CONTEXT */}
            {stage === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0D2818] tracking-tight serif-font uppercase">
                    WHERE WOULD YOU MOST LIKE TO SEE A TRANSFORMATIVE SHIFT?
                  </h3>
                  <p className="text-sm text-[#4A5D4E]">
                    Select your primary target outcome, and optionally add context on what feels hard right now.
                  </p>
                </div>

                <div className="space-y-3">
                  {DESIRE_OPTIONS.map((area) => {
                    const isSelected = auditState.desireArea === area;
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setAuditState((prev) => ({ ...prev, desireArea: area }))}
                        className={`w-full p-4 rounded-xl text-xs font-mono font-semibold text-left transition-all border flex items-center justify-between ${
                          isSelected
                            ? "bg-[#FDFBF7] border-[#0D2818] text-[#0D2818] shadow-xs ring-1 ring-[#0D2818]"
                            : "bg-[#FDFBF7]/60 border-[#E5DEC9] text-[#4A5D4E] hover:text-[#0D2818] hover:border-[#0D2818]/40"
                        }`}
                      >
                        <span>{area}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0D2818]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wide">
                    ADDITIONAL CONTEXT (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    value={auditState.qualitativeFriction}
                    onChange={(e) => setAuditState((prev) => ({ ...prev, qualitativeFriction: e.target.value }))}
                    placeholder="Share any specific notes about past initiatives or challenges (optional)..."
                    className="w-full p-4 rounded-xl bg-[#FDFBF7] border border-[#E5DEC9] text-[#0D2818] font-mono text-xs focus:outline-none focus:border-[#0D2818] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E5DEC9]">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-full border border-[#E5DEC9] bg-[#FDFBF7] text-[#0D2818] font-mono text-xs font-bold uppercase hover:bg-[#E5DEC9]/40 transition-all"
                  >
                    BACK
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-full bg-[#0D2818] text-[#FDFBF7] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#122a1e] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>GENERATE FINAL DIAGNOSTIC</span>
                    <ArrowRight className="w-4 h-4 text-[#FDFBF7]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* FINAL RESULT SCREEN & WHATSAPP HANDOFF */}
            {stage === 'final_result' && (
              <motion.div
                key="final_result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase tracking-wider block">
                    COMPLETE AUDIT DIAGNOSTIC
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0D2818] serif-font uppercase tracking-tight">
                    HERE’S WHERE YOUR NEXT OPPORTUNITY MAY BE.
                  </h3>
                </div>

                {/* PERSONALIZED DIAGNOSTIC ANALYSIS CARD */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#FDFBF7] border border-[#E5DEC9] space-y-6">
                  
                  {/* 1. DATA SUMMARY */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase tracking-wider block">
                      1. WHAT YOUR DATA SUGGESTS
                    </span>
                    <p className="text-xs font-mono text-[#0D2818] leading-relaxed">
                      With {auditState.monthlyVolume === 'unsure' ? 'your current monthly volume' : `${auditState.monthlyVolume.toLocaleString()} ${activityLabel.toLowerCase()}`}, your baseline conversion for {goalLabel.toLowerCase()} currently sits at {currentBaselineObj.label}.
                    </p>
                  </div>

                  {/* 2. THE FRICTION GAP */}
                  <div className="space-y-2 pt-3 border-t border-[#E5DEC9]">
                    <span className="text-xs font-mono font-bold text-[#4A5D4E] uppercase tracking-wider block">
                      2. IDENTIFIED GAP LOCATION
                    </span>
                    <p className="text-xs font-mono text-[#0D2818] leading-relaxed">
                      You identified that momentum is primarily lost where: <strong>&quot;{auditState.selectedFriction}&quot;</strong>. This points directly to experience friction between initial discovery and active decision-making.
                    </p>
                  </div>

                  {/* 3. DIVYNCI STRATEGIC INTERVENTION */}
                  <div className="space-y-2 pt-3 border-t border-[#E5DEC9]">
                    <span className="text-xs font-mono font-bold text-[#0D2818] uppercase tracking-wider block">
                      3. STRATEGIC INTERVENTION FOCUS
                    </span>
                    <p className="text-sm font-serif italic text-[#0D2818] leading-relaxed">
                      &quot;Based on what you shared, the first opportunity to investigate may be the gap between initial interest and meaningful action—specifically aimed at {auditState.desireArea.toLowerCase()}.&quot;
                    </p>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-[#4A5D4E] italic font-bold">
                    THIS IS AN INITIAL DIAGNOSTIC, NOT A FORECAST OR GUARANTEED OUTCOME.
                  </div>
                </div>

                {/* CONTINUATION TO BRAND QUESTIONNAIRE & WHATSAPP HANDOFF */}
                <div className="p-8 rounded-2xl bg-[#0D2818] text-[#FDFBF7] space-y-6 text-center shadow-lg">
                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-bold serif-font tracking-wide uppercase">
                      READY TO SHARE DEEPER BRAND CONTEXT?
                    </h4>
                    <p className="text-xs font-sans text-[#FDFBF7]/80 max-w-lg mx-auto leading-relaxed">
                      Now that we have identified your primary strategic gap, tell us about your brand context to outline potential interventions.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <a
                      href="#project-questionnaire"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FDFBF7] text-[#0D2818] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#F4EFEA] transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>START BRAND QUESTIONNAIRE →</span>
                      <ArrowRight className="w-4 h-4 text-[#0D2818]" />
                    </a>
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#FDFBF7]/40 text-[#FDFBF7] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FDFBF7]/10 transition-all flex items-center justify-center gap-2"
                    >
                      <span>DISCUSS ON WHATSAPP</span>
                      <MessageSquare className="w-4 h-4 text-[#FDFBF7]" />
                    </a>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
