"use client";

import React from "react";
import { EngineProvider } from "@/context/EngineContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MissedOpportunity } from "@/components/MissedOpportunity";
import { DivynciDifference } from "@/components/DivynciDifference";
import { HowWeThink } from "@/components/HowWeThink";
import { RangeShowcase } from "@/components/RangeShowcase";
import { WeTakeOwnership } from "@/components/WeTakeOwnership";
import { RoiCalculator } from "@/components/RoiCalculator";
import { ProductMatcher } from "@/components/ProductMatcher";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <EngineProvider>
      <div className="min-h-screen bg-[#FDFBF7] text-[#0D2818] selection:bg-[#0D2818] selection:text-[#FDFBF7]">
        <Navbar />
        <main>
          {/* 1. HERO — TURN ATTENTION INTO GROWTH */}
          <Hero />

          {/* 2. THE MISSED OPPORTUNITY */}
          <MissedOpportunity />

          {/* 3. THE DIVYNCI DIFFERENCE */}
          <DivynciDifference />

          {/* 4. HOW WE THINK */}
          <HowWeThink />

          {/* 5. THE FORM FOLLOWS THE OPPORTUNITY */}
          <RangeShowcase />

          {/* 6. WE TAKE OWNERSHIP */}
          <WeTakeOwnership />

          {/* 7 & 8. GROWTH AUDIT & PERSONALIZED AUDIT RESULT */}
          <RoiCalculator />

          {/* 9 & 10. BRAND QUESTIONNAIRE & FINAL CONVERSATION HANDOFF */}
          <ProductMatcher />
        </main>
        <Footer />
      </div>
    </EngineProvider>
  );
}
