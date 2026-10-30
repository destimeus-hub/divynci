"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, QrCode, Repeat, ArrowRight, Smartphone, Sparkles, Check, Database, RefreshCw } from "lucide-react";

export const ThreeEngines: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<"acquire" | "capture" | "retain">("acquire");
  const [retentionDay, setRetentionDay] = useState(45);
  const [qrScanned, setQrScanned] = useState(false);

  return (
    <section id="engines" className="py-24 relative bg-[#080b12] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE THREE GROWTH ENGINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            INTERACTIVE SYSTEMS BUILT FOR <br />
            <span className="text-emerald-cyan">EVERY CUSTOMER TOUCHPOINT.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            DIVYNCI engineers three primary growth modules that turn traffic, physical packaging, and post-purchase customer touchpoints into repeat revenue loops.
          </p>
        </div>

        {/* Engine Tabs Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 gap-2">
            {[
              { id: "acquire", name: "ENGINE 01 — ACQUIRE", icon: Zap },
              { id: "capture", name: "ENGINE 02 — CAPTURE", icon: QrCode },
              { id: "retain", name: "ENGINE 03 — RETAIN", icon: Repeat },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeEngine === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveEngine(tab.id as any)}
                  className={`px-5 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Engine Active View */}
        <div className="glass-panel p-6 sm:p-10 rounded-2xl relative min-h-[460px]">
          <AnimatePresence mode="wait">
            {/* ENGINE 01: ACQUIRE (AI Product Personalizer) */}
            {activeEngine === "acquire" && (
              <motion.div
                key="acquire"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-block px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                    ACQUISITION & PERSONALIZATION
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    AI PRODUCT MATCHER & INTENT RECOGNITION
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Convert anonymous store visitors into high-intent buyers by guiding them through a dynamic product discovery journey that matches their declared preferences with exact SKUs.
                  </p>
                  <div className="space-y-2 font-mono text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Dynamic match scoring & personalized recommendations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span>Instant email / phone capture with personalized discount incentive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Immediate sync into Klaviyo customer profiles</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 glass-panel-glow p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono text-emerald-400 border-b border-white/10 pb-3">
                    <span>LIVE DEMO: PERSONALIZATION ENGINE</span>
                    <span>100% REVENUE ALIGNED</span>
                  </div>
                  <div className="p-4 rounded-lg bg-black/60 border border-white/10 space-y-3 font-mono text-xs">
                    <div className="text-gray-400">VISITOR INTENT SIGNAL →</div>
                    <div className="text-white">Goal: Sustained Energy & Focus</div>
                    <div className="text-cyan-400">SKU Matched: DIVYNCI Energy Matrix Pro</div>
                    <div className="text-emerald-400 font-bold">OFFER TRIGGERED: 15% OFF PERSONALIZED BUNDLE</div>
                  </div>
                  <div className="text-center font-mono text-xs text-gray-400">
                    Proven conversion uplift: <strong className="text-emerald-400">+18.4%</strong>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ENGINE 02: CAPTURE (Physical Package QR Scan) */}
            {activeEngine === "capture" && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-block px-3 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">
                    PHYSICAL-TO-DIGITAL DATA CAPTURE
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    PACKAGING TO ZERO-PARTY DATA LOOP
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Bridge physical retail & packaging touchpoints with digital customer profiles. A single QR scan on your product box unlocks an instant mobile reward experience that collects valuable zero-party data.
                  </p>
                  <div className="space-y-2 font-mono text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span>Physical product box QR integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>App-like instant mobile experience without downloads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span>Post-scan usage routine tracking & refill reminders</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 glass-panel-glow p-6 rounded-xl space-y-4 text-center">
                  <div className="text-xs font-mono text-cyan-400 border-b border-white/10 pb-3 flex justify-between">
                    <span>PHYSICAL BOX PACKAGING SCAN</span>
                    <span>TRY THE INTERACTION</span>
                  </div>

                  <div className="py-6 flex flex-col items-center justify-center space-y-3">
                    <div className="w-24 h-24 rounded-2xl bg-white p-2 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setQrScanned(true)}>
                      <QrCode className="w-20 h-20 text-black" />
                    </div>
                    <button
                      onClick={() => setQrScanned(true)}
                      className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-mono font-bold text-xs hover:bg-cyan-400 transition-colors"
                    >
                      SIMULATE PACKAGING SCAN
                    </button>
                  </div>

                  {qrScanned && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 rounded-lg bg-black/60 border border-cyan-500/40 text-xs font-mono text-emerald-400 space-y-1"
                    >
                      <div>✓ MOBILE EXPERIENCE LAUNCHED</div>
                      <div className="text-gray-300">+3 Usage signals captured into CRM profile!</div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ENGINE 03: RETAIN (Post-Purchase 90-Day Loop Slider) */}
            {activeEngine === "retain" && (
              <motion.div
                key="retain"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-block px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-mono font-bold">
                    POST-PURCHASE RETENTION ENGINE
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                    90-DAY AUTOMATED REVENUE LOOP
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    The sale isn&apos;t the end of the journey. DIVYNCI tracks usage signals over 90 days to deliver automated replenishment offers exactly when the customer is running low.
                  </p>
                  <div className="space-y-2 font-mono text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-400" />
                      <span>Automated replenishment window calculations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Usage signal check-ins via SMS / Webhooks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-400" />
                      <span>35%+ repeat purchase frequency uplift</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 glass-panel-glow p-6 rounded-xl space-y-6">
                  <div className="flex justify-between items-center text-xs font-mono text-yellow-400 border-b border-white/10 pb-3">
                    <span>90-DAY TIMELINE CONTROL</span>
                    <span>DRAG SLIDER BELOW</span>
                  </div>

                  {/* Interactive Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-mono text-gray-300">
                      <span>DAY {retentionDay} STATUS</span>
                      <span className="text-yellow-400 font-bold">
                        {retentionDay === 0 && "DAY 0: FIRST PURCHASE"}
                        {retentionDay > 0 && retentionDay <= 30 && "DAY 30: USAGE CHECK-IN"}
                        {retentionDay > 30 && retentionDay <= 60 && "DAY 45: REPLENISHMENT WINDOW"}
                        {retentionDay > 60 && retentionDay <= 90 && "DAY 90: REPEAT PURCHASE"}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={retentionDay}
                      onChange={(e) => setRetentionDay(Number(e.target.value))}
                      className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>

                  {/* Timeline state detail */}
                  <div className="p-4 rounded-lg bg-black/60 border border-white/10 text-xs font-mono space-y-2">
                    <div className="text-gray-400">AUTOMATED SYSTEM ACTION:</div>
                    <div className="text-white font-bold">
                      {retentionDay <= 15 && "Order delivered. Initial welcome usage guide sent."}
                      {retentionDay > 15 && retentionDay <= 40 && "Usage check-in survey sent. Customer intent score updated."}
                      {retentionDay > 40 && retentionDay <= 70 && "Predictive refill notification triggered via Klaviyo SMS."}
                      {retentionDay > 70 && "Repeat order processed! Customer LTV increased +42%."}
                    </div>
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
