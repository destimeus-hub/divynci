"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";

export const SelfReferentialApplication: React.FC = () => {
  const [scale, setScale] = useState("");
  const [opportunity, setOpportunity] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="apply" className="py-28 relative bg-[#F5F1E8] border-t border-[#DDD7CA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {/* Editorial Self-Referential Pitch */}
        <div className="editorial-card p-10 sm:p-16 rounded-3xl text-center space-y-8 max-w-4xl mx-auto border-[#193A2A]">
          <span className="text-xs font-mono text-[#315B43] font-bold uppercase tracking-widest">
            THE ULTIMATE PROOF
          </span>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#193A2A] tracking-tight serif-font">
            This website is the pitch.
          </h2>

          <p className="text-[#77766F] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            You interacted with a discovery experience. You engaged with custom components. You saw how customer preferences adapt the journey. If we can make our own site this intentional and interactive, imagine what we will build for your brand.
          </p>

          <div className="pt-4">
            <h3 className="text-2xl font-bold text-[#193A2A] serif-font">
              Imagine this built around your product.
            </h3>
          </div>
        </div>

        {/* Studio Application Form */}
        <div className="max-w-3xl mx-auto editorial-card p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-[#315B43] font-bold">START A PROJECT</span>
            <h3 className="text-3xl font-extrabold text-[#193A2A] serif-font">Tell us about your brand.</h3>
            <p className="text-xs text-[#77766F]">
              Tell us where you&apos;re losing customer intent. We&apos;ll show you what we would build.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              {/* STEP 1: Scale */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#193A2A]">
                  01 — WHAT IS YOUR BRAND&apos;S ANNUAL SCALE?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["$1M–$5M", "$5M–$20M", "$20M+"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setScale(opt)}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                        scale === opt
                          ? "bg-[#193A2A] text-[#FAF8F2] border-[#193A2A]"
                          : "bg-[#F5F1E8] border-[#DDD7CA] text-[#193A2A] hover:bg-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: Opportunity */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#193A2A]">
                  02 — WHERE IS THE BIGGEST OPPORTUNITY?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Website Personalization", val: "Website" },
                    { label: "Packaging / Retail QR", val: "Packaging" },
                    { label: "Post-Purchase Loop", val: "Post-Purchase" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setOpportunity(opt.val)}
                      className={`p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                        opportunity === opt.val
                          ? "bg-[#315B43] text-[#FAF8F2] border-[#315B43]"
                          : "bg-[#F5F1E8] border-[#DDD7CA] text-[#193A2A] hover:bg-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Contact */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-[#193A2A]">
                  03 — WHERE SHOULD WE SEND YOUR CUSTOM PLAN?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email (e.g. founder@brand.com)"
                    className="w-full px-5 py-3.5 rounded-full bg-white border border-[#DDD7CA] text-[#193A2A] placeholder-[#77766F] text-xs focus:outline-none focus:border-[#193A2A]"
                  />
                  <input
                    type="url"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Brand Website URL (https://...)"
                    className="w-full px-5 py-3.5 rounded-full bg-white border border-[#DDD7CA] text-[#193A2A] placeholder-[#77766F] text-xs focus:outline-none focus:border-[#193A2A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#193A2A] text-[#FAF8F2] font-semibold text-sm hover:bg-[#122a1e] transition-all flex items-center justify-center gap-2"
              >
                <span>REQUEST CUSTOM GROWTH PLAN</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-[#315B43]/10 border border-[#315B43]/30 text-center space-y-4 font-mono"
            >
              <CheckCircle2 className="w-12 h-12 text-[#193A2A] mx-auto" />
              <h4 className="text-xl font-bold text-[#193A2A] serif-font">INQUIRY RECEIVED</h4>
              <p className="text-xs text-[#77766F] max-w-md mx-auto">
                We have logged your parameters ({scale || "$5M+"} scale) for <strong>{email}</strong>. Our team will review your brand&apos;s opportunity and respond within 24 hours.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
