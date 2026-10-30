"use client";

import React, { createContext, useContext, useState } from "react";

export interface DataSignal {
  id: string;
  label: string;
  value: string;
  timestamp: string;
}

export interface AuditData {
  campaignObj?: string;
  reach?: string;
  action?: string;
  rateLabel?: string;
  afterActionLabel?: string;
  diffActions?: number;
  diffMonthlyValue?: number | null;
}

export interface EngineState {
  goal: string | null;
  priority: string | null;
  routine: string | null;
  email: string | null;
  intentScore: number;
  productMatch: number;
  signalsCaptured: DataSignal[];
  calculatedRoi: {
    monthlyVisitors: number;
    aov: number;
    currentConv: number;
    upsideMonthly: number;
    profilesCaptured: number;
  } | null;
  hasCompletedQuiz: boolean;
  auditResult: AuditData | null;
}

interface EngineContextType {
  state: EngineState;
  setGoal: (goal: string) => void;
  setPriority: (priority: string) => void;
  setRoutine: (routine: string) => void;
  submitEmail: (email: string) => void;
  updateRoi: (visitors: number, aov: number, conv: number) => void;
  setAuditResult: (audit: AuditData) => void;
  resetDemo: () => void;
}

const initialEngineState: EngineState = {
  goal: null,
  priority: null,
  routine: null,
  email: null,
  intentScore: 0,
  productMatch: 0,
  signalsCaptured: [],
  calculatedRoi: null,
  hasCompletedQuiz: false,
  auditResult: null,
};

const EngineContext = createContext<EngineContextType | undefined>(undefined);

export const EngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<EngineState>(initialEngineState);

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const setGoal = (goal: string) => {
    setState((prev) => {
      const newSignals = [
        ...prev.signalsCaptured.filter((s) => s.id !== "goal"),
        { id: "goal", label: "Declared Goal", value: goal, timestamp: getTime() },
      ];
      return {
        ...prev,
        goal,
        intentScore: Math.min(100, prev.intentScore + 25),
        signalsCaptured: newSignals,
      };
    });
  };

  const setPriority = (priority: string) => {
    setState((prev) => {
      const newSignals = [
        ...prev.signalsCaptured.filter((s) => s.id !== "priority"),
        { id: "priority", label: "Core Priority", value: priority, timestamp: getTime() },
      ];
      return {
        ...prev,
        priority,
        intentScore: Math.min(100, prev.intentScore + 25),
        signalsCaptured: newSignals,
      };
    });
  };

  const setRoutine = (routine: string) => {
    setState((prev) => {
      const newSignals = [
        ...prev.signalsCaptured.filter((s) => s.id !== "routine"),
        { id: "routine", label: "Usage Routine", value: routine, timestamp: getTime() },
      ];
      return {
        ...prev,
        routine,
        intentScore: Math.min(100, prev.intentScore + 25),
        productMatch: 98,
        signalsCaptured: newSignals,
      };
    });
  };

  const submitEmail = (email: string) => {
    setState((prev) => {
      const newSignals = [
        ...prev.signalsCaptured.filter((s) => s.id !== "email"),
        { id: "email", label: "Verified Contact", value: email, timestamp: getTime() },
      ];
      return {
        ...prev,
        email,
        intentScore: 96,
        signalsCaptured: newSignals,
        hasCompletedQuiz: true,
      };
    });
  };

  const updateRoi = (monthlyVisitors: number, aov: number, currentConv: number) => {
    // Interactive uplift calculation formula
    const currentRevenue = monthlyVisitors * (currentConv / 100) * aov;
    const improvedConv = Math.min(currentConv * 1.65, currentConv + 1.8);
    const newRevenue = monthlyVisitors * (improvedConv / 100) * aov;
    const upsideMonthly = Math.round(newRevenue - currentRevenue);
    const profilesCaptured = Math.round(monthlyVisitors * 0.32);

    setState((prev) => ({
      ...prev,
      calculatedRoi: {
        monthlyVisitors,
        aov,
        currentConv,
        upsideMonthly,
        profilesCaptured,
      },
    }));
  };

  const setAuditResult = (audit: AuditData) => {
    setState((prev) => ({
      ...prev,
      auditResult: audit,
    }));
  };

  const resetDemo = () => {
    setState(initialEngineState);
  };

  return (
    <EngineContext.Provider
      value={{
        state,
        setGoal,
        setPriority,
        setRoutine,
        submitEmail,
        updateRoi,
        setAuditResult,
        resetDemo,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
};

export const useEngine = () => {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error("useEngine must be used within an EngineProvider");
  }
  return context;
};
