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
  
  // Staggered Reveal Sequence: Step 1 -> Step 2 -> Step 3 (plays ONCE on arrival; replays only on button press)
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Highperformr-Inspired Modern Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <div 
              onClick={onLaunchProspectAI}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img 
                src="/pibi-logo.png" 
                alt="PiBi Logo" 
                className="h-8 w-auto transition-transform group-hover:scale-105" 
              />
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Prospect AI
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200/80">
                GTM Engine
              </span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-teal-600 transition-colors">
              Platform
            </a>
            <a href="#signals" className="hover:text-teal-600 transition-colors flex items-center gap-1.5">
              <span>Buying Signals</span>
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            </a>
            <a href="#how-it-works" className="hover:text-teal-600 transition-colors">
              How It Works
            </a>
            <a href="#roi" className="hover:text-teal-600 transition-colors">
              ROI &amp; Metrics
            </a>
            <a href="#testimonials" className="hover:text-teal-600 transition-colors">
              Customers
            </a>
          </nav>

          {/* Right Corner: The Key "Prospect AI" Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExploreHub}
              className="hidden sm:flex text-xs font-bold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Live Demo Hub
            </button>
            <button
              onClick={onLaunchProspectAI}
              className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-98 group"
              title="Launch Prospect AI Platform"
            >
              <Sparkles className="w-4 h-4 text-teal-200 transition-transform group-hover:rotate-12" />
              <span>Prospect AI</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-10 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white">
        {/* Subtle Decorative Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-200/30 via-teal-100/20 to-blue-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Top Announcement Pill */}
          <div 
            onClick={onLaunchProspectAI}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-teal-200/80 shadow-2xs text-xs font-semibold text-slate-700 hover:border-teal-400 transition-all cursor-pointer mb-8 group"
          >
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-teal-800 font-bold">Autonomous GTM Intelligence</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 group-hover:text-teal-600 transition-colors">
              Discover High-Intent ICP Buyers in Seconds
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight max-w-5xl leading-[1.1] text-balance">
            Turn Live Buying Signals into{" "}
            <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
              Predictable Revenue Pipeline
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed text-balance">
            Stop wasting hours on stale lead databases. PiBi Prospect AI identifies verified B2B decision-makers 
            tracking executive promotions, funding rounds, and hiring sprints — with instant multi-angle AI outreach 
            and 1-click CRM deduplication.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onLaunchProspectAI}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/35 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 group"
            >
              <Sparkles className="w-5 h-5 text-teal-200" />
              <span>Launch Prospect AI</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreHub}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold text-base px-7 py-4 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-teal-600" />
              <span>Explore Live Prospect Hub</span>
            </button>
          </div>

          {/* Micro Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>450M+ Verified Decision-Makers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>100% CRM Deduplication</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>AI Multi-Angle Scribe Pitches</span>
            </div>
          </div>

          {/* 3. Hero Visual Showcase - Interactive Mockup of Prospect AI Command Center */}
          <div className="mt-14 w-full max-w-6xl relative group">
            {/* Ambient Teal Radial Glow to make it pop off the page */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-teal-500/30 via-emerald-400/25 to-teal-500/30 rounded-3xl blur-2xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-teal-100/90 via-slate-100/70 to-teal-100/60 border-2 border-teal-300/90 shadow-[0_20px_60px_-15px_rgba(13,148,136,0.3)] ring-4 ring-teal-500/15">
              {/* Window Bar */}
              <div className="bg-white rounded-2xl border border-teal-200/80 overflow-hidden shadow-sm">
                {/* Browser Title Bar */}
                <div className="bg-gradient-to-r from-teal-50/70 via-slate-50 to-teal-50/40 px-4 py-3 border-b border-teal-100/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
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
                </div>

                {/* Dashboard Showcase Content */}
                <div className="p-4 sm:p-6 bg-gradient-to-b from-teal-50/20 via-slate-50/40 to-slate-50/60 flex flex-col gap-5 text-left">
                  {/* Top Bar inside Mockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-teal-50/60 via-white to-white p-4 rounded-xl border border-teal-200/80 shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black shadow-sm shadow-teal-600/30">
                        AI
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Target ICP: Smart CRM &amp; CPQ</h3>
                          <span className="bg-teal-100/80 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                            2 Products Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Matching: Software &amp; SaaS, FinTech • Personas: VP of RevOps, Head of Sales
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-semibold shadow-2xs">
                        Matched: <strong className="text-slate-900 font-black">12 Hot Prospects</strong>
                      </div>
                      <div className="text-xs text-teal-800 bg-teal-100/70 px-3 py-1.5 rounded-lg border border-teal-300/80 font-extrabold shadow-2xs flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>98% Match Rate</span>
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Split: Prospect Signal + AI Scribe Outreach Engine */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {/* Left Column: Real-time Buying Signal & Prospect Lead */}
                    <div className="lg:col-span-5 bg-white p-4.5 rounded-xl border border-teal-100 shadow-2xs flex flex-col gap-3.5 hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between pb-2 border-b border-teal-50">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          Live Intent Trigger
                        </span>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
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
                          <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            ER
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">Elena Rostova</div>
                            <div className="text-[11px] text-slate-500">VP of Revenue Operations • CloudNova</div>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-300 px-2.5 py-1 rounded-md shadow-2xs">
                          98% ICP
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                        <span>Email: <strong className="text-slate-800">elena.rostova@cloudnova.io</strong></span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Right Column: AI Scribe Instant Pitch Preview */}
                    <div className="lg:col-span-7 bg-white p-4.5 rounded-xl border border-teal-100 shadow-2xs flex flex-col gap-3 hover:border-teal-300 transition-colors">
                      <div className="flex items-center justify-between pb-2 border-b border-teal-50 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-teal-600" />
                          <span className="text-xs font-extrabold text-slate-900">AI Scribe Dynamic Multi-Angle Pitch</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {samplePitchAngles.map((angle, idx) => (
                            <button
                              key={angle.title}
                              onClick={() => setInteractiveAngle(idx)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                                interactiveAngle === idx
                                  ? "bg-teal-600 text-white shadow-xs"
                                  : "text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                              }`}
                            >
                              Angle {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-b from-teal-50/30 to-slate-50 rounded-xl p-3.5 border border-teal-200/60 text-xs flex flex-col gap-2">
                        <div className="font-semibold text-slate-600 flex items-center gap-1.5">
                          <span className="text-slate-400">Subject:</span>
                          <span className="text-slate-900 font-bold">{samplePitchAngles[interactiveAngle].subject}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                          {samplePitchAngles[interactiveAngle].body}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-teal-50">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-500">Auto-Push:</span>
                          <span className="text-[11px] font-bold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded border border-teal-300/80">
                            Smart CRM Webhook (200 OK)
                          </span>
                        </div>
                        <button
                          onClick={onLaunchProspectAI}
                          className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-teal-600/20 active:scale-98"
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

      {/* 5. Workflow Visualization (Highperformr-style Intent Pipeline: Siloed Data -> Actionable Intent Data) */}
      <section id="features" className="pt-6 pb-6 sm:pt-8 sm:pb-8 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Exact Badge from Image 1 */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-300 text-xs font-bold text-emerald-800 shadow-2xs mb-5">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Database className="w-3.5 h-3.5" />
                <span>FROM SILOED DATA</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>TO ACTIONABLE INTENT DATA</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Keep existing workflows intact. Prospect AI signals enriches your CRM with its data &amp; trusted sources you bring.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
              Consolidate existing accounts, continuously enrich contacts with high-intent buying signals, and automatically trigger outreach across your revenue stack.
            </p>
          </div>

          {/* Interactive 3-Stage Pipeline Diagram (Image 1 Reference) */}
          <div className="relative flex flex-col xl:flex-row items-center justify-between gap-6 lg:gap-4 my-6">
            
            {/* STAGE 1 (LEFT): Centralize account data from multiple sources */}
            <div className="w-full xl:w-72 shrink-0 flex flex-col">
              <div className="text-center xl:text-left mb-3">
                <span className="text-xs font-extrabold text-slate-700 block">
                  Centralize account data
                </span>
                <span className="text-[11px] font-medium text-slate-400 block">
                  from multiple sources
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex flex-col gap-4">
                {/* Integration Logos Row */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center p-1" title="Salesforce">
                    <SalesforceLogo className="w-5 h-5" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center p-1" title="HubSpot">
                    <HubSpotLogo className="w-5 h-5" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-[10px] flex items-center justify-center" title="Pipedrive">
                    P
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center p-1" title="Slack">
                    <SlackLogo className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">CRM / Existing leads</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Automatically ingests existing accounts, cleans duplicates, and synchronizes status in real-time.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-600 font-semibold">
                    <span>Database Status:</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                      ✓ Deduplication Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 font-semibold">
                    <span>2-Way Webhook:</span>
                    <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold border border-teal-200">
                      200 OK Live
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONNECTOR 1: Flow into Center with Circular Node Icons */}
            <div className="hidden xl:flex items-center justify-center px-2 relative">
              <div className="flex flex-col items-center gap-2">
                <div className="grid grid-cols-2 gap-2 p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-600 shadow-2xs hover:scale-105 transition-transform" title="Multi-Source Ingestion">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs hover:scale-105 transition-transform" title="Data Enrichment">
                    <Database className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-600 shadow-2xs hover:scale-105 transition-transform" title="Signal Intelligence">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-2xs hover:scale-105 transition-transform" title="ICP Qualification">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
                {/* Connecting Line with Arrow */}
                <div className="flex items-center gap-1 text-emerald-600">
                  <div className="h-0.5 w-12 bg-emerald-500 rounded-full" />
                  <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              </div>
            </div>

            {/* STAGE 2 (CENTER): Enrich and prioritize contacts (Main Window Mockup) */}
            <div className="flex-1 max-w-2xl w-full">
              <div className="text-center xl:text-left mb-3">
                <span className="text-xs font-extrabold text-slate-700 block">
                  Enrich and prioritize contacts
                </span>
                <span className="text-[11px] font-medium text-slate-400 block">
                  Automated ICP matching with verified buying intent
                </span>
              </div>

              {/* Center Window Mockup with Green Border from Image 1 */}
              <div className="bg-white rounded-2xl border-2 border-emerald-500/80 shadow-xl overflow-hidden">
                {/* Window Header */}
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-slate-700 ml-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      <span>Prospect AI</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Live ICP Engine
                  </span>
                </div>

                {/* Window Body */}
                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div className="text-center sm:text-left">
                    <h5 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Consolidate accounts and build list with ICP contacts
                    </h5>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Matches multi-product personas against real-time verified company signals
                    </p>
                  </div>

                  {/* Micro Table of Enriched Contacts */}
                  <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-100/70 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                          <th className="py-2 px-3">Contact</th>
                          <th className="py-2 px-3">Company</th>
                          <th className="py-2 px-3">Role</th>
                          <th className="py-2 px-3">ICP Match</th>
                          <th className="py-2 px-3 text-right">Intent Trigger</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/70 bg-white">
                        <tr className="hover:bg-teal-50/30 transition-colors">
                          <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-extrabold text-[10px] flex items-center justify-center">ER</span>
                            <span>Elena Rostova</span>
                          </td>
                          <td className="py-2 px-3 text-slate-700 font-semibold">CloudNova Systems</td>
                          <td className="py-2 px-3 text-slate-500">VP of RevOps</td>
                          <td className="py-2 px-3">
                            <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              98% ICP
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-emerald-600 text-[11px]">
                            🔥 Promoted (10m ago)
                          </td>
                        </tr>

                        <tr className="hover:bg-teal-50/30 transition-colors">
                          <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-[10px] flex items-center justify-center">AP</span>
                            <span>Arthur Pendelton</span>
                          </td>
                          <td className="py-2 px-3 text-slate-700 font-semibold">Acme Corp</td>
                          <td className="py-2 px-3 text-slate-500">Target Lead</td>
                          <td className="py-2 px-3">
                            <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              95% ICP
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-amber-600 text-[11px]">
                            ⚡ $35M Series B
                          </td>
                        </tr>

                        <tr className="hover:bg-teal-50/30 transition-colors">
                          <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-extrabold text-[10px] flex items-center justify-center">SL</span>
                            <span>Sarah Lin</span>
                          </td>
                          <td className="py-2 px-3 text-slate-700 font-semibold">LogiFlow Logistics</td>
                          <td className="py-2 px-3 text-slate-500">CIO</td>
                          <td className="py-2 px-3">
                            <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              92% ICP
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-blue-600 text-[11px]">
                            💼 Tech Eval RFQ
                          </td>
                        </tr>

                        <tr className="hover:bg-teal-50/30 transition-colors">
                          <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-extrabold text-[10px] flex items-center justify-center">MV</span>
                            <span>Marcus Vance</span>
                          </td>
                          <td className="py-2 px-3 text-slate-700 font-semibold">DataScale IO</td>
                          <td className="py-2 px-3 text-slate-500">Director Product</td>
                          <td className="py-2 px-3">
                            <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              90% ICP
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right font-semibold text-slate-600 text-[11px]">
                            👥 Hiring 12 SDRs
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Window Bottom Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-500 font-medium">
                      Showing 4 of <strong>1,420 Enriched ICP Contacts</strong>
                    </span>
                    <button
                      onClick={onLaunchProspectAI}
                      className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
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
              <div className="flex items-center gap-1 text-emerald-600">
                <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>

            {/* STAGE 3 (RIGHT): Action Cards Stack (Exact Fan Layout from Image 1) */}
            <div className="w-full xl:w-80 shrink-0 flex flex-col">
              <div className="text-center xl:text-left mb-3">
                <span className="text-xs font-extrabold text-slate-700 block">
                  Actionable Revenue Handoff
                </span>
                <span className="text-[11px] font-medium text-slate-400 block">
                  Click to switch action trigger
                </span>
              </div>

              {/* 3 Action Cards (Clickable Fan Carousel) */}
              <div className="flex flex-col gap-3">
                {/* Card 1: Push event-related lead data / signals */}
                <div
                  onClick={() => setActiveWorkflowCard(0)}
                  className={`rounded-2xl p-4.5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md transition-all cursor-pointer ${
                    activeWorkflowCard === 0
                      ? "bg-white ring-teal-500/30 shadow-lg scale-102 z-10"
                      : "bg-white hover:shadow-lg hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <SalesforceLogo className="w-4 h-4" />
                    <HubSpotLogo className="w-4 h-4" />
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">P</span>
                    <SlackLogo className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2.5 leading-snug">
                    Push event-related lead data/ signals to event attendees in your company
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Instantly notifies assigned account owners with verified mobile numbers and LinkedIn URLs.
                  </p>
                </div>

                {/* Card 2: Send job change alerts for AEs/CSMs */}
                <div
                  onClick={() => setActiveWorkflowCard(1)}
                  className={`rounded-2xl p-4.5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md transition-all cursor-pointer ${
                    activeWorkflowCard === 1
                      ? "bg-white ring-teal-500/30 shadow-lg scale-102 z-10"
                      : "bg-white hover:shadow-lg hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <SalesforceLogo className="w-4 h-4" />
                    <HubSpotLogo className="w-4 h-4" />
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">P</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2.5 leading-snug">
                    Send job change alerts for AEs/ CSMs to follow up
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Monitors former champions joining target accounts to accelerate warm intro opportunities.
                  </p>
                </div>

                {/* Card 3: Send audience list and contacts for marketing campaigns */}
                <div
                  onClick={() => setActiveWorkflowCard(2)}
                  className={`rounded-2xl p-4.5 border-2 border-teal-500 ring-2 ring-teal-500/20 shadow-md transition-all cursor-pointer ${
                    activeWorkflowCard === 2
                      ? "bg-white ring-teal-500/30 shadow-lg scale-102 z-10"
                      : "bg-white hover:shadow-lg hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <SalesforceLogo className="w-4 h-4" />
                    <HubSpotLogo className="w-4 h-4" />
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-black text-[9px] flex items-center justify-center">P</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2.5 leading-snug">
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

      {/* 6. How It Works (3 Simple Steps) - Staggered Reveal Sequence (Step 1 -> Step 2 -> Step 3) */}
      <section 
        id="how-it-works" 
        ref={workflowSectionRef}
        className="pt-8 pb-16 sm:pt-10 sm:pb-20 bg-white border-t border-slate-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Workflow Sequence
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              From Company Setup to Booked Meetings in 3 Steps
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Designed for sales leaders, founders, and SDR teams who want results without complexity.
            </p>

            {/* Replay Sequence Button */}
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={startStepSequence}
                className="w-9 h-9 rounded-full bg-teal-50 hover:bg-teal-100/90 text-teal-700 hover:text-teal-800 border border-teal-200 transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
                title="Replay sequence"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Flow Container: 3 Teal Cards Revealing Sequentially (Step 1 alone initially, then Step 2, then Step 3) */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2 min-h-[380px]">
            
            {/* Step 1: Visible initially */}
            <div
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
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
                    {activeStep === 1 && (
                      <span className="absolute -inset-1 rounded-2xl bg-teal-400/40 animate-ping" />
                    )}
                    <div className="w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-4 ring-teal-100">
                      1
                    </div>
                  </div>

                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full border bg-teal-600 text-white border-teal-700 shadow-2xs flex items-center gap-1.5">
                    {activeStep === 1 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    <span>Step 01</span>
                  </span>
                </div>

                <h4 className="text-xl font-black text-slate-900">
                  Setup Company &amp; Products
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Enter your company profile, website, and portfolio. Select your target industries, buyer roles, locations, and customer tiers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-teal-100 flex flex-col gap-1.5 text-xs font-semibold text-teal-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 stroke-[3]" />
                  <span>Target Industries &amp; Personas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 stroke-[3]" />
                  <span>Multi-Product ICP Matrix</span>
                </div>
              </div>
            </div>

            {/* Step 2: Animates in next */}
            <div
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
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
                    {activeStep === 2 && (
                      <span className="absolute -inset-1 rounded-2xl bg-teal-400/40 animate-ping" />
                    )}
                    <div className="w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-4 ring-teal-100">
                      2
                    </div>
                  </div>

                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full border bg-teal-600 text-white border-teal-700 shadow-2xs flex items-center gap-1.5">
                    {activeStep === 2 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    <span>Step 02</span>
                  </span>
                </div>

                <h4 className="text-xl font-black text-slate-900">
                  Match ICP &amp; Buying Signals
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Prospect AI dynamically scans 450M+ verified profiles matching your criteria, filtering by job change triggers and live funding alerts.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-teal-100 flex flex-col gap-1.5 text-xs font-semibold text-teal-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 stroke-[3]" />
                  <span>Real-Time Job Change Triggers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 stroke-[3]" />
                  <span>98% High-Intent ICP Score</span>
                </div>
              </div>
            </div>

            {/* Step 3: Animates in next */}
            <div
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
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="relative">
                    {activeStep === 3 && (
                      <span className="absolute -inset-1 rounded-2xl bg-teal-400/40 animate-ping" />
                    )}
                    <div className="w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center bg-teal-600 text-white shadow-md shadow-teal-600/30 ring-4 ring-teal-100">
                      3
                    </div>
                  </div>

                  <span className="text-[11px] font-black tracking-widest uppercase px-3 py-1 rounded-full border bg-teal-600 text-white border-teal-700 shadow-2xs flex items-center gap-1.5">
                    {activeStep === 3 && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    <span>Step 03</span>
                  </span>
                </div>

                <h4 className="text-xl font-black text-slate-900">
                  Generate Pitches &amp; Sync CRM
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  Review tailored AI Scribe outreach angles. Push verified contacts directly to your CRM with automatic duplicate skipping and owner routing.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-teal-100 flex flex-col gap-1.5 text-xs font-semibold text-teal-800">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 stroke-[3]" />
                  <span>3 Tailored AI Scribe Angles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600 stroke-[3]" />
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
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    revealedCount >= stepNum
                      ? "w-8 bg-teal-600"
                      : "w-2.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Numbers & ROI Section - Boxed Card Container */}
      <section id="roi" className="pt-6 pb-2 sm:pt-8 sm:pb-4 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-teal-800/50 relative overflow-hidden ring-1 ring-white/10">
            {/* Subtle inner decorative glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
              <div className="pt-4 md:pt-0">
                <div className="text-3xl sm:text-5xl font-black text-teal-400 tracking-tight">450M+</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Verified B2B Decision-Makers</div>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl sm:text-5xl font-black text-teal-400 tracking-tight">3.8x</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Average Response Rate Increase</div>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl sm:text-5xl font-black text-teal-400 tracking-tight">&lt; 15s</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Signal Detection to Outreach</div>
              </div>
              <div className="pt-4 md:pt-0 md:pl-6">
                <div className="text-3xl sm:text-5xl font-black text-teal-400 tracking-tight">100%</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Automated CRM Deduplication</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section id="testimonials" className="pt-4 pb-5 sm:pt-6 sm:pb-6 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 mb-6">
            <Users className="w-6 h-6" />
          </div>
          <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 leading-relaxed">
            &ldquo;PiBi Prospect AI completely replaced our tedious SDR research workflows. Catching executive role changes and generating custom pitch angles in seconds has doubled our qualified pipeline within 30 days.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* 9. Final High-Impact CTA Banner */}
      <section className="pt-6 pb-14 sm:pt-8 sm:pb-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-teal-300 bg-teal-900/60 border border-teal-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                Get Started Today
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight">
                Ready to Experience Prospect AI?
              </h2>
              <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                Setup your company profile in under 2 minutes and start discovering verified high-intent prospects right now.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onLaunchProspectAI}
                  className="w-full sm:w-auto bg-white hover:bg-slate-100 text-teal-900 font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Launch Prospect AI</span>
                  <ArrowRight className="w-4 h-4 text-teal-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/pibi-logo.png" alt="PiBi Logo" className="h-6 w-auto" />
            <span className="font-bold text-slate-800">PiBi Prospect AI</span>
            <span>&copy; {new Date().getFullYear()} PiBi Technologies Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 font-semibold">
            <button onClick={onLaunchProspectAI} className="hover:text-teal-600 transition-colors cursor-pointer">
              Company Profile
            </button>
            <button onClick={onExploreHub} className="hover:text-teal-600 transition-colors cursor-pointer">
              Prospect Hub
            </button>
            <a href="#features" className="hover:text-teal-600 transition-colors">
              Platform Features
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
