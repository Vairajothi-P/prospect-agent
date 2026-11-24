"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Building2,
  Users,
  Target,
  Mail,
  ShieldCheck,
  Database,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Globe,
  Briefcase,
  Layers,
  Bot,
  Search,
  Lock,
  Unlock,
  Check,
  RotateCcw
} from "lucide-react";

// Integration Brand Logos for Workflow Visual
function SalesforceLogo({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#00A1E0">
      <path d="M10.15 4.77a6.22 6.22 0 0 1 5.38 0 5.25 5.25 0 0 1 4.54 3.73 4.9 4.9 0 0 1 2.93 4.5 4.9 4.9 0 0 1-4.9 4.9h-14A4.1 4.1 0 0 1 0 13.8a4.1 4.1 0 0 1 2.37-3.69 5.8 5.8 0 0 1 3.2-5.06 6.3 6.3 0 0 1 4.58-.28Z" />
    </svg>
  );
}

function HubSpotLogo({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF7A59">
      <path d="M18.5 7.2a3 3 0 0 0-2.3-2.9V3.5a1.5 1.5 0 1 0-3 0v.8a3 3 0 0 0-2.3 2.9 3 3 0 0 0 1.2 2.4l-2 3.6a2.7 2.7 0 0 0-.9-.2 2.7 2.7 0 1 0 2.7 2.7 2.7 2.7 0 0 0-.2-1l2-3.6a3 3 0 0 0 1.2.2 3 3 0 0 0 1.2-.2l3.4 2a2 2 0 1 0 1.5-2.6l-3.4-2a3 3 0 0 0-.6-1.9M14.7 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
  );
}

function SlackLogo({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#4A154B">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
    </svg>
  );
}

export default function LandingPage({ onLaunchProspectAI, onExploreHub, isDarkMode = false }) {
  const [activeFeatureTab, setActiveFeatureTab] = useState("signals");
  const [interactiveAngle, setInteractiveAngle] = useState(0);
  const [activeWorkflowCard, setActiveWorkflowCard] = useState(0);
<<<<<<< HEAD
  
  // Staggered Reveal Sequence: Step 1 -> Step 2 -> Step 3 (plays ONCE on arrival; replays only on button press)
=======

  // Staggered Reveal Sequence: Initially ONLY Step 1 is visible, then Step 2 animates in, then Step 3 animates in
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
  const [revealedCount, setRevealedCount] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const workflowSectionRef = useRef(null);
  const timerRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const startStepSequence = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRevealedCount(1); // Step 1 alone
    setActiveStep(1);

    timerRef.current = setTimeout(() => {
      setRevealedCount(2); // Step 2 reveals
      setActiveStep(2);

      timerRef.current = setTimeout(() => {
        setRevealedCount(3); // Step 3 reveals
        setActiveStep(3);

        // After Step 3 completes, settle all 3 cards permanently (NO auto-loop)
        timerRef.current = setTimeout(() => {
          setActiveStep(null);
        }, 1800);
      }, 1500);
    }, 1400);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Runs only ONE time when user reaches this section
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startStepSequence();
        }
      },
      { threshold: 0.2 }
    );

    if (workflowSectionRef.current) {
      observer.observe(workflowSectionRef.current);
    } else {
      hasAnimatedRef.current = true;
      startStepSequence();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      observer.disconnect();
    };
  }, []);

  const samplePitchAngles = [
    {
      title: "High-Response SDR Angle",
      subject: "Quick question regarding CloudNova's RevOps roadmap",
      body: "Hi Elena, noticed you recently stepped into the VP of RevOps role at CloudNova Systems — congrats! Usually when revops teams scale past Series B, pipeline hygiene and CPQ delays slow down deals. Would you be open to a 10-min chat next Tuesday on how we eliminate SDR admin?"
    },
    {
      title: "Executive ROI Angle",
      subject: "Accelerating CloudNova's revenue cycle by 32%",
      body: "Hi Elena, congrats on the new role leading Revenue Operations. We recently helped similar B2B tech scale-ups cut manual quoting cycles from 4 days to 45 minutes with automated CPQ guardrails. Worth exploring for your Q3 roadmap?"
    },
    {
      title: "LinkedIn 300-Char InMail",
      subject: "Connecting on RevOps automation",
      body: "Hi Elena, congratulations on evaluating new CRM & sales infra at CloudNova! We built Pipeline Intelligence to automate deal scoring and eliminate manual data entry. Would love to share how we compare to legacy tools."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-[#0f172a] flex flex-col font-sans selection:bg-[#059669] selection:text-white relative overflow-x-hidden">
      {/* Background Dot Texture & Multi-Corner Glow Effects (from reference) */}
      <div className="fixed inset-0 pointer-events-none -z-20 opacity-35 bg-[radial-gradient(#cbd5e1_0.75px,transparent_0.75px)] [background-size:24px_24px]" />
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-80 [background-image:radial-gradient(at_0_0,#2563eb08_0,#0000_50%),radial-gradient(at_100%_0,#05966908_0,#0000_50%),radial-gradient(at_100%_100%,#2563eb08_0,#0000_50%),radial-gradient(at_0_100%,#05966908_0,#0000_50%)]" />

      {/* 1. Floating Pill Header (Matching https://landing-page-crm-eosin.vercel.app/) */}
      <header className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-xl px-5 py-3.5 shadow-lg shadow-slate-200/40">
            {/* Left: Brand Logo & Title */}
            <div className="w-full md:w-auto flex items-center justify-between">
              <div
                onClick={onLaunchProspectAI}
                className="flex items-center gap-3 cursor-pointer group select-none"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-slate-100 flex items-center justify-center bg-white shrink-0">
                  <img
                    src="/pibi-logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain p-1 transition-transform group-hover:scale-105"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#2563eb] to-[#059669] bg-clip-text text-transparent">
                  Prospect AI
                </span>
              </div>
            </div>

            {/* Center: Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
              <a href="#platform" className="text-slate-600 hover:text-[#059669] transition-colors">
                Platform
              </a>
              <a href="#features" className="text-slate-600 hover:text-[#059669] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-slate-600 hover:text-[#059669] transition-colors">
                How It Works
              </a>
              <a href="#roi" className="text-slate-600 hover:text-[#059669] transition-colors">
                ROI &amp; Metrics
              </a>
              <a href="#testimonials" className="text-slate-600 hover:text-[#059669] transition-colors">
                Customers
              </a>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onLaunchProspectAI}
                className="rounded-xl bg-[#097391] hover:bg-[#075f78] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#097391]/25 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 group active:scale-95"
                title="Launch Prospect AI Platform"
              >
                <Sparkles className="w-4 h-4 text-cyan-200 transition-transform group-hover:rotate-12" />
                <span>Launch Prospect AI</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Matching https://landing-page-crm-eosin.vercel.app/ styling & typography) */}
      <section id="platform" className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
        {/* Radial Ambient Glow Layers from Reference */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(43,155,126,0.1),transparent_40%),radial-gradient(circle_at_80%_25%,rgba(13,91,145,0.1),transparent_40%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black leading-tight tracking-tight text-[#1e293b] max-w-5xl text-balance">
            Turn Live Buying Signals into{" "}
            <span className="bg-gradient-to-r from-[#2563eb] to-[#059669] bg-clip-text text-transparent">
              Predictable Revenue Pipeline
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-slate-500 max-w-2xl text-base md:text-lg font-medium leading-relaxed text-balance">
            A unified platform that connects autonomous prospect discovery, waterfall enrichment, and multi-angle AI outreach into one powerful system. Scale faster and stay profitable.
          </p>

          {/* Hero CTAs (Exact Button Styles from Reference) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onLaunchProspectAI}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#097391] hover:bg-[#075f78] text-white px-8 py-4 font-black shadow-xl hover:shadow-[#097391]/35 transition-all hover:scale-105 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Launch Prospect AI</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreHub}
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-slate-200 px-8 py-4 text-[#1e293b] font-black hover:bg-slate-50 transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              <Zap className="w-4 h-4 text-[#097391]" />
              <span>Explore Live Hub</span>
            </button>
          </div>

          {/* Micro Stat Highlights with Left Border (Direct Reference Pattern) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-left">
            <div className="border-l-4 border-[#059669] pl-4">
              <p className="text-2xl md:text-4xl font-black text-[#1e293b]">3x</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Pipeline Growth</p>
            </div>
            <div className="border-l-4 border-[#2563eb] pl-4">
              <p className="text-2xl md:text-4xl font-black text-[#1e293b]">98%</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Accuracy</p>
            </div>
            <div className="border-l-4 border-[#1e293b] pl-4">
              <p className="text-2xl md:text-4xl font-black text-[#1e293b]">Zero</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Manual SDR Admin</p>
            </div>
          </div>

          {/* 3. Hero Visual Showcase - Interactive Mockup of Prospect AI Command Center */}
<<<<<<< HEAD
          <div className="mt-14 w-full max-w-6xl relative group">
            {/* Ambient Teal Radial Glow to make it pop off the page */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-teal-500/30 via-emerald-400/25 to-teal-500/30 rounded-3xl blur-2xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-teal-100/90 via-slate-100/70 to-teal-100/60 border-2 border-teal-300/90 shadow-[0_20px_60px_-15px_rgba(13,148,136,0.3)] ring-4 ring-teal-500/15">
=======
          <div className="mt-12 w-full max-w-6xl">
            <div className="relative rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/70 via-slate-100/50 to-slate-200/70 border border-slate-200 shadow-2xl shadow-slate-300/40">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
              {/* Window Bar */}
              <div className="bg-white rounded-2xl border border-teal-200/80 overflow-hidden shadow-sm">
                {/* Browser Title Bar */}
                <div className="bg-gradient-to-r from-teal-50/70 via-slate-50 to-teal-50/40 px-4 py-3 border-b border-teal-100/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
<<<<<<< HEAD
                    <div className="ml-2 hidden sm:flex items-center gap-1.5 bg-white/80 border border-teal-200/60 px-3 py-0.5 rounded-full shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      <span className="text-xs font-semibold text-slate-500">
                        https://smartcrm.pibi.io/prospect-ai
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-300/80 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                      Live ICP Match Active
                    </span>
                    <button
                      onClick={onLaunchProspectAI}
                      className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-sm shadow-teal-600/20"
                    >
                      <span>Open in App</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
=======
                    <span className="text-xs font-semibold text-slate-400 ml-2 hidden sm:inline font-mono">
                      https://smartcrm.pibi.io/prospect-ai
                    </span>
                  </div>
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                </div>

                {/* Dashboard Showcase Content */}
                <div className="p-4 sm:p-6 bg-gradient-to-b from-teal-50/20 via-slate-50/40 to-slate-50/60 flex flex-col gap-5 text-left">
                  {/* Top Bar inside Mockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-teal-50/60 via-white to-white p-4 rounded-xl border border-teal-200/80 shadow-2xs">
                    <div className="flex items-center gap-3">
<<<<<<< HEAD
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black shadow-sm shadow-teal-600/30">
=======
                      <div className="w-10 h-10 rounded-xl bg-[#059669]/10 border border-[#059669]/20 flex items-center justify-center text-[#059669] font-black">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                        AI
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
<<<<<<< HEAD
                          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Target ICP: Smart CRM &amp; CPQ</h3>
                          <span className="bg-teal-100/80 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
=======
                          <h3 className="font-bold text-[#1e293b] text-sm sm:text-base">Target ICP: Smart CRM &amp; CPQ</h3>
                          <span className="bg-[#059669]/10 text-[#059669] text-xs font-bold px-2 py-0.5 rounded-lg border border-[#059669]/20">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                            2 Products Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Matching: Software &amp; SaaS, FinTech • Personas: VP of RevOps, Head of Sales
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
<<<<<<< HEAD
                      <div className="text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-semibold shadow-2xs">
                        Matched: <strong className="text-slate-900 font-black">12 Hot Prospects</strong>
                      </div>
                      <div className="text-xs text-teal-800 bg-teal-100/70 px-3 py-1.5 rounded-lg border border-teal-300/80 font-extrabold shadow-2xs flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>98% Match Rate</span>
=======
                      <div className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold">
                        Matched: <strong className="text-[#1e293b] font-black">12 Hot Prospects</strong>
                      </div>
                      <div className="text-xs text-[#059669] bg-[#059669]/10 px-3 py-1.5 rounded-lg border border-[#059669]/20 font-bold">
                        98% Match Rate
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Split: Prospect Signal + AI Scribe Outreach Engine */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Left Column: Real-time Buying Signal & Prospect Lead */}
<<<<<<< HEAD
                    <div className="lg:col-span-5 bg-white p-4.5 rounded-xl border border-teal-100 shadow-2xs flex flex-col gap-3.5 hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between pb-2 border-b border-teal-50">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          Live Intent Trigger
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
=======
                    <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-[#2563eb]/20 shadow-2xs flex flex-col gap-3.5">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          Live Intent Trigger
                        </span>
                        <span className="text-[11px] font-bold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/20">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                          10m ago
                        </span>
                      </div>

                      <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl">
                        <div className="flex items-start gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-amber-950">
                              Elena Rostova promoted to VP of Revenue Operations
                            </p>
                            <p className="text-[11px] text-amber-800/90 mt-0.5">
                              CloudNova Systems just announced executive restructuring post-$35M Series B.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-teal-50/40 via-white to-slate-50 rounded-xl border border-teal-200/70 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-3">
<<<<<<< HEAD
                          <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            ER
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">Elena Rostova</div>
                            <div className="text-[11px] text-slate-500">VP of Revenue Operations • CloudNova</div>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-300 px-2.5 py-1 rounded-md shadow-2xs">
=======
                          <div className="w-9 h-9 rounded-full bg-[#097391] text-white font-bold flex items-center justify-center text-xs">
                            ER
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1e293b]">Elena Rostova</div>
                            <div className="text-[11px] text-slate-500">VP of Revenue Operations • CloudNova</div>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-[#059669] bg-[#059669]/10 border border-[#059669]/20 px-2.5 py-1 rounded-md shadow-2xs">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                          98% ICP
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
<<<<<<< HEAD
                        <span>Email: <strong className="text-slate-800">elena.rostova@cloudnova.io</strong></span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
=======
                        <span>Email: <strong className="text-slate-700 font-mono">elena.rostova@cloudnova.io</strong></span>
                        <span className="text-[#059669] font-bold flex items-center gap-1">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Right Column: AI Scribe Instant Pitch Preview */}
<<<<<<< HEAD
                    <div className="lg:col-span-7 bg-white p-4.5 rounded-xl border border-teal-100 shadow-2xs flex flex-col gap-3 hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between pb-2 border-b border-teal-50 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-teal-600" />
                          <span className="text-xs font-extrabold text-slate-900">AI Scribe Dynamic Multi-Angle Pitch</span>
=======
                    <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-[#059669]/20 shadow-2xs flex flex-col gap-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#059669]" />
                          <span className="text-xs font-bold text-[#1e293b]">AI Scribe Dynamic Multi-Angle Pitch</span>
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                        </div>
                        <div className="flex items-center gap-1">
                          {samplePitchAngles.map((angle, idx) => (
                            <button
                              key={angle.title}
                              onClick={() => setInteractiveAngle(idx)}
<<<<<<< HEAD
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                                interactiveAngle === idx
                                  ? "bg-teal-600 text-white shadow-xs"
                                  : "text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                              }`}
=======
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg cursor-pointer transition-all ${interactiveAngle === idx
                                ? "bg-[#097391] text-white shadow-2xs"
                                : "text-slate-500 hover:bg-slate-100"
                                }`}
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                            >
                              Angle {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-b from-teal-50/30 to-slate-50 rounded-xl p-3.5 border border-teal-200/60 text-xs flex flex-col gap-2">
                        <div className="font-semibold text-slate-600 flex items-center gap-1.5">
                          <span className="text-slate-400">Subject:</span>
                          <span className="text-[#1e293b] font-bold">{samplePitchAngles[interactiveAngle].subject}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                          {samplePitchAngles[interactiveAngle].body}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-teal-50">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-500">Auto-Push:</span>
<<<<<<< HEAD
                          <span className="text-[11px] font-bold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded border border-teal-300/80">
=======
                          <span className="text-[11px] font-bold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/20">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                            Smart CRM Webhook (200 OK)
                          </span>
                        </div>
                        <button
                          onClick={onLaunchProspectAI}
<<<<<<< HEAD
                          className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-teal-600/20 active:scale-98"
=======
                          className="rounded-lg bg-[#097391] hover:bg-[#075f78] text-white text-xs font-bold px-4 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:scale-105"
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                        >
                          <span>Generate for Your ICP</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Workflow Visualization (Features & Bento Section - Styling matching Section 2 of reference) */}
      <section id="features" className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-lg text-xs font-bold mb-4 bg-[#059669]/10 text-[#059669] border border-[#059669]/20 uppercase tracking-widest">
              Autonomous Intent Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e293b] leading-tight tracking-tight">
              Keep existing workflows intact. Prospect AI enriches your stack with live signals.
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600 font-medium">
              Consolidate existing accounts, continuously enrich contacts with high-intent buying signals, and automatically trigger outreach across your revenue stack.
            </p>
          </div>

          {/* 3-Stage Pipeline Diagram (Direct Ref Style) */}
          <div className="relative flex flex-col xl:flex-row items-center justify-between gap-4 lg:gap-3 my-4">

            {/* STAGE 1 (LEFT): Centralize account data from multiple sources */}
            <div className="w-full xl:w-64 shrink-0 flex flex-col">
              <div className="text-center xl:text-left mb-2">
                <span className="text-xs font-extrabold text-[#1e293b] block">
                  Centralize account data
                </span>
                <span className="text-[11px] font-medium text-slate-400 block">
                  from multiple sources
                </span>
              </div>

<<<<<<< HEAD
              <div className="bg-white rounded-2xl p-5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex flex-col gap-4">
=======
              <div className="group relative p-4 sm:p-4.5 rounded-2xl border transition-all duration-300 bg-white shadow-md hover:shadow-lg flex flex-col gap-3 border-[#2563eb]/20 hover:border-[#2563eb]/40">
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                {/* Integration Logos Row */}
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center p-1 shadow-2xs" title="Salesforce">
                    <SalesforceLogo className="w-4 h-4" />
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center p-1 shadow-2xs" title="HubSpot">
                    <HubSpotLogo className="w-4 h-4" />
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-slate-900 text-white font-black text-[9px] flex items-center justify-center shadow-2xs" title="Pipedrive">
                    P
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center p-1 shadow-2xs" title="Slack">
                    <SlackLogo className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#1e293b]">CRM &amp; Existing Leads</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Automatically ingests existing accounts, cleans duplicates, and synchronizes status in real-time.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-600 font-semibold">
                    <span>Database Status:</span>
                    <span className="text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded font-bold border border-[#059669]/20 whitespace-nowrap">
                      ✓ Deduplication Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 font-semibold">
                    <span>2-Way Webhook:</span>
                    <span className="text-[#2563eb] bg-[#2563eb]/10 px-2 py-0.5 rounded font-bold border border-[#2563eb]/20 whitespace-nowrap">
                      200 OK Live
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONNECTOR 1: Flow into Center with Circular Node Icons */}
            <div className="hidden xl:flex items-center justify-center px-1 relative">
              <div className="flex flex-col items-center gap-1.5">
                <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#059669] shadow-2xs hover:scale-105 transition-transform" title="Multi-Source Ingestion">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#2563eb] shadow-2xs hover:scale-105 transition-transform" title="Data Enrichment">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-500 shadow-2xs hover:scale-105 transition-transform" title="Signal Intelligence">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#059669] shadow-2xs hover:scale-105 transition-transform" title="ICP Qualification">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                </div>
                {/* Connecting Line with Arrow */}
                <div className="flex items-center gap-1 text-[#059669]">
                  <div className="h-0.5 w-8 bg-[#097391] rounded-full" />
                  <ArrowRight className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                </div>
              </div>
            </div>

            {/* STAGE 2 (CENTER): Enrich and prioritize contacts (Main Window Mockup) */}
            <div className="flex-1 max-w-xl w-full">
              <div className="text-center xl:text-left mb-2">
                <span className="text-xs font-extrabold text-[#1e293b] block">
                  Enrich and prioritize contacts
                </span>
                <span className="text-[11px] font-medium text-slate-400 block">
                  Automated ICP matching with verified buying intent
                </span>
              </div>

              {/* Center Window Mockup with Teal Border */}
              <div className="bg-white rounded-2xl border-2 border-[#059669] shadow-lg overflow-hidden ring-4 ring-[#059669]/10">
                {/* Window Header */}
                <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-[#1e293b] ml-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Prospect AI Engine</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded-md border border-[#059669]/20 whitespace-nowrap">
                    Live ICP Engine
                  </span>
                </div>

                {/* Window Body */}
                <div className="p-3.5 sm:p-4 flex flex-col gap-2.5">
                  <div className="text-center sm:text-left">
                    <h5 className="text-xs sm:text-sm font-extrabold text-[#1e293b]">
                      Consolidate accounts and build list with ICP contacts
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Matches multi-product personas against real-time verified company signals
                    </p>
                  </div>

                  {/* Micro Table of Enriched Contacts (All column values strictly on 1 single line) */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                          <th className="py-2 px-2.5 whitespace-nowrap">Contact</th>
                          <th className="py-2 px-2.5 whitespace-nowrap">Company</th>
                          <th className="py-2 px-2.5 whitespace-nowrap">Role</th>
                          <th className="py-2 px-2.5 whitespace-nowrap">ICP Match</th>
                          <th className="py-2 px-2.5 text-right whitespace-nowrap">Intent Trigger</th>
                          <th className="py-2 px-2.5 text-right whitespace-nowrap">ICP Match</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/70 bg-white">
                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-[#1e293b] flex items-center gap-1.5 whitespace-nowrap">
                            <span className="w-5 h-5 rounded-full bg-[#097391] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">ER</span>
                            <span className="whitespace-nowrap">Elena Rostova</span>
                          </td>
                          <td className="py-2 px-2.5 text-slate-700 font-semibold whitespace-nowrap">CloudNova Systems</td>
                          <td className="py-2 px-2.5 text-slate-500 whitespace-nowrap">VP of RevOps</td>
                          <td className="py-2 px-2.5 whitespace-nowrap">
                            <td className="py-2 px-2.5 text-right whitespace-nowrap">
                              <span className="text-[10px] font-extrabold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/20 whitespace-nowrap">
                                98% ICP
                              </span>
                            </td>
                            <td className="py-2 px-2.5 text-right font-semibold text-[#059669] text-[11px] whitespace-nowrap">
                              🔥 Promoted (10m ago)
                            </td>
                        </tr>

                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-[#1e293b] flex items-center gap-1.5 whitespace-nowrap">
                            <span className="w-5 h-5 rounded-full bg-[#2563eb] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">AP</span>
                            <span className="whitespace-nowrap">Arthur Pendelton</span>
                          </td>
                          <td className="py-2 px-2.5 text-slate-700 font-semibold whitespace-nowrap">Acme Corp</td>
                          <td className="py-2 px-2.5 text-slate-500 whitespace-nowrap">Target Lead</td>
                          <td className="py-2 px-2.5 whitespace-nowrap">
                            <td className="py-2 px-2.5 text-right whitespace-nowrap">
                              <span className="text-[10px] font-extrabold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/20 whitespace-nowrap">
                                95% ICP
                              </span>
                            </td>
                            <td className="py-2 px-2.5 text-right font-semibold text-amber-600 text-[11px] whitespace-nowrap">
                              ⚡ $35M Series B
                            </td>
                        </tr>

                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-[#1e293b] flex items-center gap-1.5 whitespace-nowrap">
                            <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">SL</span>
                            <span className="whitespace-nowrap">Sarah Lin</span>
                          </td>
                          <td className="py-2 px-2.5 text-slate-700 font-semibold whitespace-nowrap">LogiFlow Logistics</td>
                          <td className="py-2 px-2.5 text-slate-500 whitespace-nowrap">CIO</td>
                          <td className="py-2 px-2.5 whitespace-nowrap">
                            <td className="py-2 px-2.5 text-right whitespace-nowrap">
                              <span className="text-[10px] font-extrabold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/20 whitespace-nowrap">
                                92% ICP
                              </span>
                            </td>
                            <td className="py-2 px-2.5 text-right font-semibold text-[#2563eb] text-[11px] whitespace-nowrap">
                              💼 Tech Eval RFQ
                            </td>
                        </tr>

                        <tr className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2 px-2.5 font-bold text-[#1e293b] flex items-center gap-1.5 whitespace-nowrap">
                            <span className="w-5 h-5 rounded-full bg-[#1e293b] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">MV</span>
                            <span className="whitespace-nowrap">Marcus Vance</span>
                          </td>
                          <td className="py-2 px-2.5 text-slate-700 font-semibold whitespace-nowrap">DataScale IO</td>
                          <td className="py-2 px-2.5 text-slate-500 whitespace-nowrap">Director Product</td>
                          <td className="py-2 px-2.5 whitespace-nowrap">
                            <td className="py-2 px-2.5 text-right whitespace-nowrap">
                              <span className="text-[10px] font-extrabold text-[#059669] bg-[#059669]/10 px-2 py-0.5 rounded border border-[#059669]/20 whitespace-nowrap">
                                90% ICP
                              </span>
                            </td>
                            <td className="py-2 px-2.5 text-right font-semibold text-slate-600 text-[11px] whitespace-nowrap">
                              👥 Hiring 12 SDRs
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Window Bottom Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
                      Showing 4 of <strong>1,420 Enriched ICP Contacts</strong>
                    </span>
                    <button
                      onClick={onLaunchProspectAI}
                      className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <span>Launch Prospect AI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CONNECTOR 2: Arrow leading into Action Cards */}
            <div className="hidden xl:flex items-center justify-center px-1">
              <div className="flex items-center gap-1 text-[#059669]">
                <div className="h-0.5 w-6 bg-[#097391] rounded-full" />
                <ArrowRight className="w-3.5 h-3.5 text-[#059669] shrink-0" />
              </div>
            </div>

            {/* STAGE 3 (RIGHT): Action Cards Stack */}
            <div className="w-full xl:w-72 shrink-0 flex flex-col">
              <div className="text-center xl:text-left mb-2">
                <span className="text-xs font-extrabold text-[#1e293b] block">
                  Actionable Revenue Handoff
                </span>
                <span className="text-[11px] font-medium text-slate-400 block">
                  Click to switch action trigger
                </span>
              </div>

              {/* 3 Action Cards (Clickable Fan Carousel) */}
<<<<<<< HEAD
              <div className="flex flex-col gap-3">
                {/* Card 1: Push event-related lead data / signals */}
                <div
                  onClick={() => setActiveWorkflowCard(0)}
                  className={`rounded-2xl p-4.5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md transition-all cursor-pointer ${
                    activeWorkflowCard === 0
                      ? "bg-white ring-teal-500/30 shadow-lg scale-102 z-10"
                      : "bg-white hover:shadow-lg hover:scale-[1.01]"
                  }`}
=======
              <div className="flex flex-col gap-2.5">
                {/* Card 1 */}
                <div
                  onClick={() => setActiveWorkflowCard(0)}
                  className={`rounded-2xl p-3.5 sm:p-4 border transition-all cursor-pointer ${activeWorkflowCard === 0
                    ? "bg-white border-[#059669] ring-2 ring-[#059669]/20 shadow-md scale-102"
                    : "bg-white/80 border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300"
                    }`}
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <SalesforceLogo className="w-3.5 h-3.5" />
                    <HubSpotLogo className="w-3.5 h-3.5" />
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-900 text-white font-black text-[8px] flex items-center justify-center">P</span>
                    <SlackLogo className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-extrabold text-[#1e293b] mt-2 leading-snug">
                    Push event-related lead data/ signals to event attendees in your company
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Instantly notifies assigned account owners with verified mobile numbers and LinkedIn URLs.
                  </p>
                </div>

                {/* Card 2 */}
                <div
                  onClick={() => setActiveWorkflowCard(1)}
<<<<<<< HEAD
                  className={`rounded-2xl p-4.5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md transition-all cursor-pointer ${
                    activeWorkflowCard === 1
                      ? "bg-white ring-teal-500/30 shadow-lg scale-102 z-10"
                      : "bg-white hover:shadow-lg hover:scale-[1.01]"
                  }`}
=======
                  className={`rounded-2xl p-3.5 sm:p-4 border transition-all cursor-pointer ${activeWorkflowCard === 1
                    ? "bg-white border-[#059669] ring-2 ring-[#059669]/20 shadow-md scale-102"
                    : "bg-white/80 border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300"
                    }`}
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <SalesforceLogo className="w-3.5 h-3.5" />
                    <HubSpotLogo className="w-3.5 h-3.5" />
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-900 text-white font-black text-[8px] flex items-center justify-center">P</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#1e293b] mt-2 leading-snug">
                    Send job change alerts for AEs/ CSMs to follow up
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Monitors former champions joining target accounts to accelerate warm intro opportunities.
                  </p>
                </div>

                {/* Card 3 */}
                <div
                  onClick={() => setActiveWorkflowCard(2)}
<<<<<<< HEAD
                  className={`rounded-2xl p-4.5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md transition-all cursor-pointer ${
                    activeWorkflowCard === 2
                      ? "bg-white ring-teal-500/30 shadow-lg scale-102 z-10"
                      : "bg-white hover:shadow-lg hover:scale-[1.01]"
                  }`}
=======
                  className={`rounded-2xl p-3.5 sm:p-4 border transition-all cursor-pointer ${activeWorkflowCard === 2
                    ? "bg-white border-[#059669] ring-2 ring-[#059669]/20 shadow-md scale-102"
                    : "bg-white/80 border-slate-200 opacity-80 hover:opacity-100 hover:border-slate-300"
                    }`}
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <SalesforceLogo className="w-3.5 h-3.5" />
                    <HubSpotLogo className="w-4 h-4" />
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">P</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#1e293b] mt-2.5 leading-snug">
                    Send audience list and contacts for marketing &amp; SDR campaigns
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Deploys high-converting multi-angle AI Scribe pitches directly into your outbound cadence.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. How It Works (3 Steps Sequence - Exact Design & Palette from Reference) */}
      <section
        id="how-it-works"
        ref={workflowSectionRef}
        className="py-16 sm:py-20 bg-white/60 border-t border-slate-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-4 py-2 rounded-lg text-xs font-bold mb-4 bg-[#059669]/10 text-[#059669] border border-[#059669]/20 uppercase tracking-widest">
              Workflow Sequence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e293b] tracking-tight leading-tight">
              From Company Setup to Booked Meetings in 3 Steps
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-600 font-medium">
              Designed for revenue leaders, founders, and SDR teams who want predictable pipeline without complexity.
            </p>

            {/* Replay Sequence Button */}
            <div className="mt-5 flex items-center justify-center">
              <button
                type="button"
                onClick={startStepSequence}
                className="w-10 h-10 rounded-xl bg-[#059669]/10 hover:bg-[#059669]/20 text-[#059669] border border-[#059669]/20 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                title="Replay sequence"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* 3 Step Cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2 min-h-[380px]">

            {/* Step 1 */}
            <div
<<<<<<< HEAD
              className={`relative rounded-3xl p-7 sm:p-8 border-2 transition-all duration-700 flex flex-col justify-between overflow-hidden ${
                activeStep === 1
                  ? "bg-gradient-to-b from-teal-50 via-white to-teal-50/50 border-teal-500 ring-4 ring-teal-500/20 shadow-xl shadow-teal-600/15 scale-[1.02] z-10"
                  : "bg-white/95 border-teal-300/80 shadow-sm hover:border-teal-400 hover:shadow-md"
              }`}
            >
              {/* Progress Line on active reveal */}
              {activeStep === 1 && (
                <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden bg-teal-100">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-full animate-pulse" />
=======
              className={`relative rounded-3xl p-7 sm:p-8 border-2 transition-all duration-700 flex flex-col justify-between overflow-hidden ${revealedCount === 1
                ? "bg-gradient-to-b from-[#097391]/10 via-white to-white border-[#097391] ring-4 ring-[#097391]/20 shadow-xl shadow-[#097391]/15 scale-[1.02] z-10"
                : "bg-white border-slate-200/90 shadow-sm"
                }`}
            >
              {revealedCount === 1 && (
                <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden bg-[#097391]/20">
                  <div className="h-full bg-[#097391] w-full animate-pulse" />
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
<<<<<<< HEAD
                    {activeStep === 1 && (
                      <span className="absolute -inset-1 rounded-2xl bg-teal-400/40 animate-ping" />
=======
                    {revealedCount === 1 && (
                      <span className="absolute -inset-1 rounded-2xl bg-[#097391]/40 animate-ping" />
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                    )}
                    <div className="w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center bg-[#097391] text-white shadow-md shadow-[#097391]/30 ring-4 ring-[#097391]/15">
                      1
                    </div>
                  </div>

<<<<<<< HEAD
                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full border bg-teal-600 text-white border-teal-700 shadow-2xs flex items-center gap-1.5">
                    {activeStep === 1 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
=======
                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border bg-[#097391] text-white border-transparent shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                    <span>Step 01</span>
                  </span>
                </div>

                <h4 className="text-xl font-black text-[#1e293b]">
                  Setup Company &amp; Products
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                  Enter your company profile, website, and portfolio. Select your target industries, buyer roles, locations, and customer tiers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-1.5 text-xs font-semibold text-[#097391]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#097391] stroke-[3]" />
                  <span>Target Industries &amp; Personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#097391] stroke-[3]" />
                  <span>Multi-Product ICP Matrix</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
<<<<<<< HEAD
              className={`relative rounded-3xl p-7 sm:p-8 border-2 transition-all duration-700 flex flex-col justify-between overflow-hidden ${
                revealedCount >= 2
                  ? "opacity-100 translate-y-0 scale-100 " +
                    (activeStep === 2
                      ? "bg-gradient-to-b from-teal-50 via-white to-teal-50/50 border-teal-500 ring-4 ring-teal-500/20 shadow-xl shadow-teal-600/15 scale-[1.02] z-10"
                      : "bg-white/95 border-teal-300/80 shadow-sm hover:border-teal-400 hover:shadow-md")
                  : "opacity-0 translate-y-8 scale-90 pointer-events-none invisible md:visible"
              }`}
            >
              {/* Progress Line on active reveal */}
              {activeStep === 2 && (
                <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden bg-teal-100">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-full animate-pulse" />
=======
              className={`relative rounded-3xl p-7 sm:p-8 border-2 transition-all duration-700 flex flex-col justify-between overflow-hidden ${revealedCount >= 2
                ? "opacity-100 translate-y-0 scale-100 " +
                (revealedCount === 2
                  ? "bg-gradient-to-b from-[#097391]/10 via-white to-white border-[#097391] ring-4 ring-[#097391]/20 shadow-xl shadow-[#097391]/15 scale-[1.02] z-10"
                  : "bg-white border-slate-200/90 shadow-sm")
                : "opacity-0 translate-y-8 scale-90 pointer-events-none invisible md:visible"
                }`}
            >
              {revealedCount === 2 && (
                <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden bg-[#097391]/20">
                  <div className="h-full bg-[#097391] w-full animate-pulse" />
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
<<<<<<< HEAD
                    {activeStep === 2 && (
                      <span className="absolute -inset-1 rounded-2xl bg-teal-400/40 animate-ping" />
=======
                    {revealedCount === 2 && (
                      <span className="absolute -inset-1 rounded-2xl bg-[#097391]/40 animate-ping" />
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                    )}
                    <div className="w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center bg-[#097391] text-white shadow-md shadow-[#097391]/30 ring-4 ring-[#097391]/15">
                      2
                    </div>
                  </div>

<<<<<<< HEAD
                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full border bg-teal-600 text-white border-teal-700 shadow-2xs flex items-center gap-1.5">
                    {activeStep === 2 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
=======
                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border bg-[#097391] text-white border-transparent shadow-xs flex items-center gap-1.5">
                    {revealedCount === 2 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                    <span>Step 02</span>
                  </span>
                </div>

                <h4 className="text-xl font-black text-[#1e293b]">
                  Match ICP &amp; Buying Signals
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                  Prospect AI dynamically scans 450M+ verified profiles matching your criteria, filtering by job change triggers and live funding alerts.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-1.5 text-xs font-semibold text-[#097391]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#097391] stroke-[3]" />
                  <span>Real-Time Job Change Triggers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#097391] stroke-[3]" />
                  <span>98% High-Intent ICP Score</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
<<<<<<< HEAD
              className={`relative rounded-3xl p-7 sm:p-8 border-2 transition-all duration-700 flex flex-col justify-between overflow-hidden ${
                revealedCount >= 3
                  ? "opacity-100 translate-y-0 scale-100 " +
                    (activeStep === 3
                      ? "bg-gradient-to-b from-teal-50 via-white to-teal-50/50 border-teal-500 ring-4 ring-teal-500/20 shadow-xl shadow-teal-600/15 scale-[1.02] z-10"
                      : "bg-white/95 border-teal-300/80 shadow-sm hover:border-teal-400 hover:shadow-md")
                  : "opacity-0 translate-y-8 scale-90 pointer-events-none invisible md:visible"
              }`}
            >
              {/* Progress Line on active reveal */}
              {activeStep === 3 && (
                <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden bg-teal-100">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 w-full animate-pulse" />
=======
              className={`relative rounded-3xl p-7 sm:p-8 border-2 transition-all duration-700 flex flex-col justify-between overflow-hidden ${revealedCount >= 3
                ? "opacity-100 translate-y-0 scale-100 " +
                (revealedCount === 3
                  ? "bg-gradient-to-b from-[#097391]/10 via-white to-white border-[#097391] ring-4 ring-[#097391]/20 shadow-xl shadow-[#097391]/15 scale-[1.02] z-10"
                  : "bg-white border-slate-200/90 shadow-sm")
                : "opacity-0 translate-y-8 scale-90 pointer-events-none invisible md:visible"
                }`}
            >
              {revealedCount === 3 && (
                <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden bg-[#097391]/20">
                  <div className="h-full bg-[#097391] w-full animate-pulse" />
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
<<<<<<< HEAD
                    {activeStep === 3 && (
                      <span className="absolute -inset-1 rounded-2xl bg-teal-400/40 animate-ping" />
=======
                    {revealedCount === 3 && (
                      <span className="absolute -inset-1 rounded-2xl bg-[#097391]/40 animate-ping" />
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                    )}
                    <div className="w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center bg-[#097391] text-white shadow-md shadow-[#097391]/30 ring-4 ring-[#097391]/15">
                      3
                    </div>
                  </div>

<<<<<<< HEAD
                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full border bg-teal-600 text-white border-teal-700 shadow-2xs flex items-center gap-1.5">
                    {activeStep === 3 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
=======
                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-lg border bg-[#097391] text-white border-transparent shadow-xs flex items-center gap-1.5">
                    {revealedCount === 3 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
>>>>>>> 590faccffcfe6ae20ab045ac4c803518b7232673
                    <span>Step 03</span>
                  </span>
                </div>

                <h4 className="text-xl font-black text-[#1e293b]">
                  Generate Pitches &amp; Sync CRM
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium">
                  Review tailored AI Scribe outreach angles. Push verified contacts directly to your CRM with automatic duplicate skipping and owner routing.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-1.5 text-xs font-semibold text-[#097391]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#097391] stroke-[3]" />
                  <span>3 Tailored AI Scribe Angles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#097391] stroke-[3]" />
                  <span>100% Clean CRM Deduplication</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sequential Step Progress Tracker */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="text-xs font-bold text-slate-400">Sequence Progress:</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`h-2.5 rounded-full transition-all duration-500 ${revealedCount >= stepNum
                    ? "w-8 bg-[#097391]"
                    : "w-2.5 bg-slate-200"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Numbers & ROI Section (Button Color Container) */}
      <section id="roi" className="pt-6 pb-6 sm:pt-8 sm:pb-8 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#097391] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-teal-600/40 relative overflow-hidden">
            {/* Subtle inner decorative glows */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">450M+</div>
                <div className="text-xs sm:text-sm font-semibold text-teal-100 mt-2">Verified Decision-Makers</div>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">3.8x</div>
                <div className="text-xs sm:text-sm font-semibold text-teal-100 mt-2">Response Rate Increase</div>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">&lt; 15s</div>
                <div className="text-xs sm:text-sm font-semibold text-teal-100 mt-2">Signal to Outreach</div>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">100%</div>
                <div className="text-xs sm:text-sm font-semibold text-teal-100 mt-2">CRM Deduplication</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section (Styled like Section 3 of reference) */}
      <section id="testimonials" className="scroll-mt-28 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1e293b] mb-10">
            What customers say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <blockquote className="p-8 rounded-2xl bg-white border border-slate-200 text-left shadow-lg relative overflow-hidden group transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#059669]/5 rounded-full -mr-12 -mt-12 group-hover:bg-[#059669]/10 transition-colors" />
              <p className="text-slate-700 text-lg italic leading-relaxed font-medium relative z-10">
                &ldquo;PiBi Prospect AI scaled our qualified pipeline 3x in 60 days. The automated buying signal alerts and instant multi-angle AI pitches are a dream for our SDR team.&rdquo;
              </p>
              <footer className="mt-6 text-base font-bold text-[#1e293b] relative z-10">
                — Elena R., <span className="text-[#059669] font-bold">VP of Revenue Operations</span>
              </footer>
            </blockquote>

            <blockquote className="p-8 rounded-2xl bg-white border border-slate-200 text-left shadow-lg relative overflow-hidden group transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#2563eb]/5 rounded-full -mr-12 -mt-12 group-hover:bg-[#2563eb]/10 transition-colors" />
              <p className="text-slate-700 text-lg italic leading-relaxed font-medium relative z-10">
                &ldquo;Beautiful UI and 100% clean CRM deduplication. Our reps spend zero time manually scouring LinkedIn and enter every sales call with tailored context.&rdquo;
              </p>
              <footer className="mt-6 text-base font-bold text-[#1e293b] relative z-10">
                — Marcus V., <span className="text-[#2563eb] font-bold">Head of Global Sales</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 8. Final High-Impact CTA Banner (Styled directly like Section 4 of reference) */}
      <section id="demo" className="mt-4 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#2563eb] rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            {/* Corner glowing blur orbs from reference */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#059669]/20 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
            <div className="bg-[#097391] rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden border border-teal-600/40">
              {/* Corner glowing blur orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/15 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

              <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">
                Ready to grow with PiBi Prospect AI?
              </h3>
              <p className="mt-4 text-blue-100 max-w-xl mx-auto relative z-10 font-medium leading-relaxed">
                <p className="mt-4 text-teal-100 max-w-xl mx-auto relative z-10 font-medium leading-relaxed">
                  Setup your company profile in under 2 minutes and start discovering verified high-intent prospects right now. Join high-performing revenue teams already scaling with PiBi.
                </p>
                <div className="mt-8 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onLaunchProspectAI}
                    className="inline-flex items-center gap-3 rounded-xl bg-[#097391] hover:bg-[#075f78] text-white border-2 border-white/20 px-8 py-3.5 font-bold shadow-2xl transform-gpu hover:scale-105 transition-all cursor-pointer active:scale-95"
                    className="inline-flex items-center gap-3 rounded-xl bg-white hover:bg-slate-100 text-[#097391] px-8 py-3.5 font-black shadow-2xl transform-gpu hover:scale-105 transition-all cursor-pointer active:scale-95 border border-white"
                  >
                    <span>Launch Prospect AI ↗</span>
                  </button>
                </div>
            </div>
          </div>
      </section>

      {/* 9. Clean Modern Multi-Column Footer (Matching Reference Footer) */}
      <footer className="px-6 py-14 border-t border-slate-200 bg-white/60 backdrop-blur-sm" id="footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-xs tracking-[0.2em] text-slate-400 uppercase font-black">Contact</h3>
            <p className="text-xl font-extrabold text-[#1e293b]">business@pibitech.com</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <button onClick={onLaunchProspectAI} className="text-[#059669] font-bold hover:underline underline-offset-4 cursor-pointer">
                Get Started
              </button>
              <span className="text-slate-200">/</span>
              <a href="https://www.pibitech.com" target="_blank" rel="noreferrer" className="text-slate-500 font-bold hover:underline underline-offset-4">
                Company Website
              </a>
            </div>
          </div>

          <div className="space-y-4 md:border-x border-slate-100 md:px-10">
            <h3 className="text-xs tracking-[0.2em] text-slate-400 uppercase font-black">Platform</h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <button onClick={onLaunchProspectAI} className="text-slate-600 font-semibold hover:text-[#059669] transition-colors text-left cursor-pointer">
                Company Onboarding &amp; ICP Setup
              </button>
              <button onClick={onExploreHub} className="text-slate-600 font-semibold hover:text-[#059669] transition-colors text-left cursor-pointer">
                Live Prospect Hub &amp; Signals
              </button>
            </div>
          </div>

          <div className="space-y-4 md:text-right">
            <h3 className="text-xs tracking-[0.2em] text-slate-400 uppercase font-black">Follow</h3>
            <a
              href="https://in.linkedin.com/company/pi-bi-technologies"
              target="_blank"
              rel="noreferrer"
              className="text-xl font-extrabold text-[#2563eb] hover:text-[#059669] transition-colors inline-block"
            >
              LinkedIn ↗
            </a>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Pi-Bi info Technologies LLP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
