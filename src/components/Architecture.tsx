"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, Network, ArrowDown, Code, Eye, Cpu, Zap, Layers } from "lucide-react";

export const Architecture: React.FC = () => {
  const [viewMode, setViewMode] = useState<"business" | "technical">("business");
  const [activeNode, setActiveNode] = useState<string | null>("interaction");

  const nodes = [
    {
      id: "traffic",
      title: "ANONYMOUS TRAFFIC",
      techTitle: "HTTP / Web / Packaging QR",
      businessDetail: "D2C store visitors arriving from Meta, Google, or physical product scans.",
      techDetail: "Inbound requests handled by Next.js edge runtime with zero render delay.",
      inputs: "Ad campaigns, packaging QR, social traffic",
      outputs: "Raw visitor session payload",
      outcome: "Immediate engagement hook",
    },
    {
      id: "interaction",
      title: "INTERACTIVE EXPERIENCE",
      techTitle: "React / Motion / Custom Logic",
      businessDetail: "30-second product matcher quiz capturing declared customer preferences.",
      techDetail: "Client-side React state machine managing intent score calculation.",
      inputs: "User clicks, preference selections",
      outputs: "Zero-party data array",
      outcome: "35%+ opt-in rate boost",
    },
    {
      id: "data",
      title: "ZERO-PARTY DATA CAPTURE",
      techTitle: "Structured Schema / JSON Payload",
      businessDetail: "Explicit customer intent signals (goals, routine, ingredient priority).",
      techDetail: "Validated TypeScript payload ready for immediate webhooks.",
      inputs: "Declared user parameters",
      outputs: "Customer Intent Object",
      outcome: "High-value customer profile",
    },
    {
      id: "crm",
      title: "CRM & CDP SYNC",
      techTitle: "Klaviyo / Shopify / Postscript API",
      businessDetail: "Instant creation of segmented subscriber profile with custom properties.",
      techDetail: "Serverless API route executing REST/GraphQL mutation within 120ms.",
      inputs: "Customer Intent Object + Email",
      outputs: "Klaviyo Profile ID + Segment Tag",
      outcome: "Automated hyper-targeted campaigns",
    },
    {
      id: "revenue",
      title: "REVENUE LOOP",
      techTitle: "Predictive LTV & Replenishment Trigger",
      businessDetail: "Personalized checkout offer + 90-day automated replenishment reminders.",
      techDetail: "Webhook callback triggering post-purchase retention workflow.",
      inputs: "Segment tag + purchase event",
      outputs: "Repeat order transaction",
      outcome: "Repeat purchase & higher LTV",
    },
  ];

  return (
    <section id="architecture" className="py-24 relative bg-[#07090e] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Network className="w-3.5 h-3.5" />
            <span>LIVE SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            UNDER THE HOOD: <br />
            <span className="text-emerald-cyan">END-TO-END GROWTH ENGINE ARCHITECTURE.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Toggle between Business View and Technical View to see how DIVYNCI transforms raw traffic into structured CRM profiles and recurring sales.
          </p>
        </div>

        {/* View Toggle Bar (Business vs Technical) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-black/60 border border-white/10 gap-2 font-mono text-xs">
            <button
              onClick={() => setViewMode("business")}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                viewMode === "business"
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>BUSINESS VIEW</span>
            </button>
            <button
              onClick={() => setViewMode("technical")}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                viewMode === "technical"
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>TECHNICAL VIEW</span>
            </button>
          </div>
        </div>

        {/* Architecture Pipeline Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Nodes Pipeline */}
          <div className="lg:col-span-7 space-y-3">
            {nodes.map((node, index) => {
              const isSelected = activeNode === node.id;
              return (
                <div key={node.id} className="relative">
                  <button
                    onClick={() => setActiveNode(node.id)}
                    className={`w-full p-4 rounded-xl text-left font-mono transition-all flex items-center justify-between border ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                        : "bg-black/40 border-white/10 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-emerald-400">
                        0{index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">
                          {viewMode === "business" ? node.title : node.techTitle}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {viewMode === "business" ? node.businessDetail : node.techDetail}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 font-bold">
                      {isSelected ? "INSPECTING" : "INSPECT"}
                    </span>
                  </button>

                  {index < nodes.length - 1 && (
                    <div className="flex justify-center my-1 text-gray-600">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Node Detail Inspector Panel */}
          <div className="lg:col-span-5 glass-panel-glow p-6 sm:p-8 rounded-2xl relative space-y-5 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs font-bold text-cyan-400">NODE PARAMETERS</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">
                {viewMode} MODE
              </span>
            </div>

            {activeNode && (
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 font-mono text-xs"
              >
                {(() => {
                  const node = nodes.find((n) => n.id === activeNode)!;
                  return (
                    <>
                      <div>
                        <span className="text-gray-400 uppercase text-[10px]">SELECTED COMPONENT:</span>
                        <div className="text-lg font-extrabold text-white mt-0.5">
                          {viewMode === "business" ? node.title : node.techTitle}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-black/60 border border-white/10 space-y-1">
                        <span className="text-emerald-400 font-bold">DATA INPUTS:</span>
                        <p className="text-gray-300">{node.inputs}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-black/60 border border-white/10 space-y-1">
                        <span className="text-cyan-400 font-bold">DATA OUTPUTS:</span>
                        <p className="text-gray-300">{node.outputs}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                        <span className="text-emerald-400 font-bold">COMMERCIAL OUTCOME:</span>
                        <p className="text-white font-semibold">{node.outcome}</p>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
