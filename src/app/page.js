"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  Database,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code,
  Copy,
  Check,
  Send,
  Building2,
  Mail,
  Phone,
  Filter,
  Zap,
  RefreshCw,
  TrendingUp,
  Briefcase,
  Layers,
  ArrowRight,
  Bot,
  Settings,
  Moon,
  Sun,
  Bell,
  AlertTriangle,
  User,
  LogOut,
  ShieldCheck,
  X,
  HelpCircle,
  Plus,
  Trash2,
  Target,
  Edit3,
  CheckCircle,
  BarChart3,
  Users,
  Compass,
  MapPin,
  Globe
} from "lucide-react";
import LandingPage from "../components/LandingPage";

// Inline LinkedIn Icon SVG
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.76-.79 1.76-1.76s-.79-1.76-1.76-1.76a1.76 1.76 0 1 0 0 3.52m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
    </svg>
  );
}

// Official PiBi Logo Image
function PiBiLogo({ className = "h-7 w-auto", ...props }) {
  return (
    <img
      src="/pibi-logo.png"
      alt="PiBi Logo"
      className={`object-contain ${className}`}
      {...props}
    />
  );
}

export default function ProspectingHubDashboard() {
  // Main view state: "landing" (Highperformr-style landing) | "company_onboarding" (Image 1) | "prospect_hub" (Image 2)
  const [currentView, setCurrentView] = useState("landing");

  // Company Profile State (from Image 1)
  const [companyProfile, setCompanyProfile] = useState({
    name: "Smart CRM",
    description: "Next-generation B2B CRM, CPQ, and Sales Pipeline Automation platform designed to accelerate revenue operations and eliminate manual SDR admin.",
    website: "https://smartcrm.pibi.io",
    targetIndustries: ["Software & SaaS", "Financial Services & FinTech", "Artificial Intelligence"],
    targetLocations: ["North America (US & Canada)", "EMEA / Europe", "Global / Worldwide"],
    targetCustomerTypes: ["B2B SaaS / Tech Companies", "Mid-Market (50-500 employees)", "Enterprise (1,000+ employees)"]
  });

  // Multiple Products & Services Portfolio
  const [products, setProducts] = useState([
    {
      id: "prod_1",
      name: "Pipeline Automation & Deal Intelligence",
      category: "CRM & Revenue Operations",
      description: "Next-generation B2B sales pipeline automation, automated deal scoring, and stage progression alerts.",
      targetIndustries: ["Software & SaaS", "Financial Services & FinTech", "Artificial Intelligence", "Logistics & Supply Chain"],
      targetRoles: ["VP of Revenue Operations", "Head of Global Sales", "Chief Information Officer", "Director of Product Management"]
    },
    {
      id: "prod_2",
      name: "CPQ Quoting & Billing Engine",
      category: "Sales Automation & CPQ",
      description: "Automate complex price configurations, margin guardrails, and enterprise contract drafting.",
      targetIndustries: ["Software & SaaS", "Logistics & Supply Chain", "Healthcare & MedTech"],
      targetRoles: ["Head of Global Sales", "Director of Demand Generation", "Chief Information Officer"]
    },
    {
      id: "prod_3",
      name: "Customer Intelligence & Retention AI",
      category: "Customer Success & Retention",
      description: "Predictive account health scoring and proactive retention insights for client success teams.",
      targetIndustries: ["Software & SaaS", "Financial Services & FinTech", "Artificial Intelligence"],
      targetRoles: ["Chief Information Officer", "VP of Revenue Operations"]
    }
  ]);

  const [activeProductIds, setActiveProductIds] = useState(["prod_1", "prod_2"]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    description: "",
    targetIndustries: ["Software & SaaS"],
    targetRoles: ["VP of Revenue Operations"]
  });

  const ALL_ICP_INDUSTRIES = [
    "Software & SaaS",
    "Financial Services & FinTech",
    "Artificial Intelligence",
    "Logistics & Supply Chain",
    "Healthcare & MedTech",
    "E-Commerce & Retail",
    "Cybersecurity",
    "Cloud Infrastructure"
  ];

  const ALL_ICP_ROLES = [
    "VP of Revenue Operations",
    "Head of Global Sales",
    "Chief Information Officer",
    "Director of Product Management",
    "Director of Demand Generation",
    "VP of Sales & Marketing",
    "Chief Technology Officer"
  ];

  const selectedProducts = products.filter(p => activeProductIds.includes(p.id));
  const activeProduct = selectedProducts[0] || products[0] || {
    id: "prod_1",
    name: "Pipeline Automation & Deal Intelligence",
    category: "CRM & Revenue Operations",
    description: "",
    targetIndustries: ["Software & SaaS"],
    targetRoles: ["VP of Revenue Operations"]
  };

  const handleToggleProductSelection = (prodId) => {
    setActiveProductIds(prev => {
      if (prev.includes(prodId)) {
        if (prev.length === 1) {
          return prev; // Maintain at least 1 selected product
        }
        return prev.filter(id => id !== prodId);
      } else {
        return [...prev, prodId];
      }
    });
  };

  const handleSelectAllProducts = () => {
    if (activeProductIds.length === products.length) {
      setActiveProductIds([products[0].id]);
    } else {
      setActiveProductIds(products.map(p => p.id));
    }
  };

  // Company Profile 3 Target Criteria State & Handlers
  const [customIndustryInput, setCustomIndustryInput] = useState("");
  const [customLocationInput, setCustomLocationInput] = useState("");
  const [customCustomerTypeInput, setCustomCustomerTypeInput] = useState("");

  const DEFAULT_COMPANY_INDUSTRIES = [
    "Software & SaaS",
    "Financial Services & FinTech",
    "Artificial Intelligence",
    "Logistics & Supply Chain",
    "Healthcare & MedTech",
    "E-Commerce & Retail",
    "Cybersecurity",
    "Manufacturing & Industrial"
  ];

  const DEFAULT_COMPANY_LOCATIONS = [
    "North America (US & Canada)",
    "EMEA / Europe",
    "United Kingdom",
    "Asia-Pacific (APAC)",
    "India",
    "Latin America (LATAM)",
    "Australia & NZ",
    "Global / Worldwide"
  ];

  const DEFAULT_CUSTOMER_TYPES = [
    "B2B SaaS / Tech Companies",
    "Mid-Market (50-500 employees)",
    "Enterprise (1,000+ employees)",
    "Growth Startups (Series A-C)",
    "Early-Stage Startups",
    "SMBs / Small Businesses",
    "B2B Agencies & Consultancies"
  ];

  const handleToggleCompanyIndustry = (ind) => {
    const list = companyProfile.targetIndustries || [];
    const updated = list.includes(ind) ? list.filter(i => i !== ind) : [...list, ind];
    setCompanyProfile({ ...companyProfile, targetIndustries: updated });
  };

  const handleAddCustomIndustry = () => {
    if (!customIndustryInput.trim()) return;
    const val = customIndustryInput.trim();
    if (!companyProfile.targetIndustries?.includes(val)) {
      setCompanyProfile({
        ...companyProfile,
        targetIndustries: [...(companyProfile.targetIndustries || []), val]
      });
    }
    setCustomIndustryInput("");
  };

  const handleToggleCompanyLocation = (loc) => {
    const list = companyProfile.targetLocations || [];
    const updated = list.includes(loc) ? list.filter(l => l !== loc) : [...list, loc];
    setCompanyProfile({ ...companyProfile, targetLocations: updated });
  };

  const handleAddCustomLocation = () => {
    if (!customLocationInput.trim()) return;
    const val = customLocationInput.trim();
    if (!companyProfile.targetLocations?.includes(val)) {
      setCompanyProfile({
        ...companyProfile,
        targetLocations: [...(companyProfile.targetLocations || []), val]
      });
    }
    setCustomLocationInput("");
  };

  const handleToggleCompanyCustomerType = (type) => {
    const list = companyProfile.targetCustomerTypes || [];
    const updated = list.includes(type) ? list.filter(t => t !== type) : [...list, type];
    setCompanyProfile({ ...companyProfile, targetCustomerTypes: updated });
  };

  const handleAddCustomCustomerType = () => {
    if (!customCustomerTypeInput.trim()) return;
    const val = customCustomerTypeInput.trim();
    if (!companyProfile.targetCustomerTypes?.includes(val)) {
      setCompanyProfile({
        ...companyProfile,
        targetCustomerTypes: [...(companyProfile.targetCustomerTypes || []), val]
      });
    }
    setCustomCustomerTypeInput("");
  };

  const [formSaved, setFormSaved] = useState(false);

  // Prospect Hub States (Image 2)
  const [activeTab, setActiveTab] = useState("prospects"); // prospects | signals
  const [prospects, setProspects] = useState([]);
  const [signals, setSignals] = useState([]);
  const [crmRecords, setCrmRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeniority, setSelectedSeniority] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  // Scribe AI State
  const [scribeProspect, setScribeProspect] = useState(null);
  const [scribeLoading, setScribeLoading] = useState(false);
  const [scribeResults, setScribeResults] = useState(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);

  // Waterfall Audit State
  const [enrichingId, setEnrichingId] = useState(null);
  const [waterfallAuditModal, setWaterfallAuditModal] = useState(null);

  // CRM Push State
  const [pushingId, setPushingId] = useState(null);
  const [crmPushFeedback, setCrmPushFeedback] = useState(null);

  // Copied State
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedText, setCopiedText] = useState(null);

  // Top-Right Action States (Alerts, Settings, Dark Mode, Profile)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Settings Configuration State
  const [settingsForm, setSettingsForm] = useState({
    apiKey: "phub_live_sec_9942a1b7e",
    webhookUrl: "https://smartcrm.pibi.io/api/v1/webhook",
    deduplicationStrategy: "skip_if_exists",
    defaultOwner: "Inbound SDR Team"
  });

  // Alerts List State
  const [alertsList, setAlertsList] = useState([
    {
      id: "alt_1",
      title: "New Buying Signal Detected",
      detail: "Elena Rostova promoted to VP of RevOps at CloudNova Systems.",
      time: "10m ago",
      type: "signal"
    },
    {
      id: "alt_2",
      title: "Series B Funding Alert",
      detail: "CloudNova Systems raised $35M Series B funding.",
      time: "1h ago",
      type: "funding"
    },
    {
      id: "alt_3",
      title: "CRM Webhook Sync Active",
      detail: "Webhook destination connected to Smart CRM (200 OK deliverability).",
      time: "2h ago",
      type: "system"
    }
  ]);

  const API_KEY = "phub_live_sec_9942a1b7e";

  // Fetch prospects filtered by company ICP profile & active products
  useEffect(() => {
    fetchProspects();
    fetchSignals();
    fetchCrmRecords();
  }, [searchQuery, selectedSeniority, selectedIndustry, companyProfile, activeProductIds, products]);

  const fetchProspects = async () => {
    setLoading(true);
    try {
      const selectedProds = products.filter(p => activeProductIds.includes(p.id));
      const combinedTargetIndustries = Array.from(new Set([
        ...(companyProfile.targetIndustries || []),
        ...selectedProds.flatMap(p => p.targetIndustries || [])
      ]));
      const combinedTargetRoles = Array.from(new Set(
        selectedProds.flatMap(p => p.targetRoles || [])
      ));
      const combinedNames = selectedProds.map(p => p.name).join(" & ");
      const combinedCategories = Array.from(new Set(selectedProds.map(p => p.category))).join(" / ");

      const payload = {
        query: searchQuery,
        seniority: selectedSeniority !== "all" ? [selectedSeniority] : [],
        industries: selectedIndustry !== "all" ? [selectedIndustry] : [],
        icp_context: {
          companyName: companyProfile.name,
          description: companyProfile.description,
          website: companyProfile.website,
          targetIndustries: combinedTargetIndustries,
          targetLocations: companyProfile.targetLocations || [],
          targetCustomerTypes: companyProfile.targetCustomerTypes || [],
          productName: combinedNames,
          category: combinedCategories,
          targetRoles: combinedTargetRoles
        }
      };

      const res = await fetch("/api/v1/prospects/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setProspects(data.prospects || []);
      }
    } catch (err) {
      console.error("Failed to fetch prospects:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSignals = async () => {
    try {
      const res = await fetch("/api/v1/signals", {
        headers: { "Authorization": `Bearer ${API_KEY}` }
      });
      const data = await res.json();
      if (data.success) {
        setSignals(data.signals || []);
      }
    } catch (err) {
      console.error("Failed to fetch signals:", err);
    }
  };

  const fetchCrmRecords = async () => {
    try {
      const res = await fetch("/api/v1/crm/push", {
        headers: { "Authorization": `Bearer ${API_KEY}` }
      });
      const data = await res.json();
      if (data.success) {
        setCrmRecords(data.records || []);
      }
    } catch (err) {
      console.error("Failed to fetch CRM records:", err);
    }
  };

  // Submit Company Profile and transition to Prospect AI Hub
  const handleSaveAndLaunchHub = (e) => {
    e?.preventDefault();
    setFormSaved(true);
    fetchProspects();
    setCurrentView("prospect_hub");
  };

  // Product Portfolio Handlers
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: "",
      category: "",
      description: "",
      targetIndustries: ["Software & SaaS"],
      targetRoles: ["VP of Revenue Operations"]
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category,
      description: prod.description || "",
      targetIndustries: [...prod.targetIndustries],
      targetRoles: [...prod.targetRoles]
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e?.preventDefault();
    if (!productForm.name.trim()) return;

    if (editingProductId) {
      setProducts(prev => prev.map(p => p.id === editingProductId ? {
        ...p,
        name: productForm.name.trim(),
        category: productForm.category.trim() || "B2B Solution",
        description: productForm.description.trim(),
        targetIndustries: productForm.targetIndustries.length > 0 ? productForm.targetIndustries : ["Software & SaaS"],
        targetRoles: productForm.targetRoles.length > 0 ? productForm.targetRoles : ["VP of Revenue Operations"]
      } : p));
    } else {
      const newProd = {
        id: `prod_${Date.now()}`,
        name: productForm.name.trim(),
        category: productForm.category.trim() || "B2B Solution",
        description: productForm.description.trim(),
        targetIndustries: productForm.targetIndustries.length > 0 ? productForm.targetIndustries : ["Software & SaaS"],
        targetRoles: productForm.targetRoles.length > 0 ? productForm.targetRoles : ["VP of Revenue Operations"]
      };
      setProducts(prev => [...prev, newProd]);
      setActiveProductIds(prev => [...prev, newProd.id]);
    }
    setShowProductModal(false);
  };

  const handleDeleteProduct = (prodId) => {
    if (products.length <= 1) {
      alert("A company must have at least one product or service listed.");
      return;
    }
    setProducts(prev => prev.filter(p => p.id !== prodId));
    setActiveProductIds(prev => {
      const next = prev.filter(id => id !== prodId);
      if (next.length > 0) return next;
      const remaining = products.filter(p => p.id !== prodId);
      return remaining.length > 0 ? [remaining[0].id] : [];
    });
  };

  // Quick preset loader
  const handleLoadPreset = (type) => {
    if (type === "saas") {
      setCompanyProfile({
        name: "Smart CRM (PiBi)",
        description: "AI-driven CRM and Sales Acceleration platform that automates 80% of sales data entry and pipeline tracking for SaaS teams.",
        website: "https://smartcrm.pibi.io",
        targetIndustries: ["Software & SaaS", "Financial Services & FinTech", "Artificial Intelligence"],
        targetLocations: ["North America (US & Canada)", "EMEA / Europe", "Global / Worldwide"],
        targetCustomerTypes: ["B2B SaaS / Tech Companies", "Mid-Market (50-500 employees)", "Enterprise (1,000+ employees)"]
      });
      setProducts([
        {
          id: "prod_saas_1",
          name: "Smart Pipeline Automation",
          category: "CRM & RevOps Automation",
          description: "Automate deal pipelines and forecast revenue with AI.",
          targetIndustries: ["Software & SaaS", "Financial Services & FinTech"],
          targetRoles: ["VP of Revenue Operations", "Head of Global Sales", "Chief Information Officer"]
        },
        {
          id: "prod_saas_2",
          name: "Lead Intelligence Enricher",
          category: "Data Enrichment",
          description: "Enrich B2B records with real-time intent data and contact details.",
          targetIndustries: ["Software & SaaS", "Artificial Intelligence"],
          targetRoles: ["Head of Global Sales", "Director of Demand Generation"]
        }
      ]);
      setActiveProductIds(["prod_saas_1", "prod_saas_2"]);
    } else if (type === "fintech") {
      setCompanyProfile({
        name: "FinPulse Engine",
        description: "Enterprise billing, automated reconciliations, and cross-border payment rails for modern financial technology scaleups.",
        website: "https://finpulse.co.uk",
        targetIndustries: ["Financial Services & FinTech", "Software & SaaS"],
        targetLocations: ["United Kingdom", "EMEA / Europe", "North America (US & Canada)"],
        targetCustomerTypes: ["B2B SaaS / Tech Companies", "Enterprise (1,000+ employees)", "Growth Startups (Series A-C)"]
      });
      setProducts([
        {
          id: "prod_fin_1",
          name: "Global Ledger & Payment Rails",
          category: "FinTech & Payments",
          description: "Multi-currency clearing and enterprise ledger automation.",
          targetIndustries: ["Financial Services & FinTech", "Software & SaaS"],
          targetRoles: ["Chief Information Officer", "Head of Global Sales", "Director of Product Management"]
        }
      ]);
      setActiveProductIds(["prod_fin_1"]);
    }
  };

  // 1. Waterfall Contact Enrichment
  const handleEnrich = async (prospectId) => {
    setEnrichingId(prospectId);
    try {
      const res = await fetch("/api/v1/prospects/enrich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ prospect_id: prospectId })
      });
      const data = await res.json();
      if (data.success) {
        setWaterfallAuditModal(data);
        fetchProspects();
      }
    } catch (err) {
      console.error("Enrichment error:", err);
    } finally {
      setEnrichingId(null);
    }
  };

  // 2. Batch Unlock All Filtered
  const handleBatchUnlock = async () => {
    const lockedIds = prospects.filter(p => !p.contact.isUnlocked).map(p => p.id);
    if (lockedIds.length === 0) return;
    setLoading(true);
    try {
      await fetch("/api/v1/prospects/enrich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ prospect_ids: lockedIds })
      });
      await fetchProspects();
    } catch (err) {
      console.error("Batch unlock error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. AI Scribe Outreach Generation (Tailored to Selected Product!)
  const handleOpenScribe = async (prospect) => {
    setScribeProspect(prospect);
    setScribeLoading(true);
    setScribeResults(null);
    setActiveAngleIndex(0);

    try {
      const res = await fetch("/api/v1/ai/scribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          prospect_id: prospect.id,
          product_name: selectedProducts.map(p => p.name).join(" & ") || activeProduct.name || companyProfile.name,
          value_proposition: selectedProducts.map(p => `${p.name}: ${p.description}`).join(" | ") || activeProduct.description || companyProfile.description
        })
      });
      const data = await res.json();
      if (data.success) {
        setScribeResults(data);
      }
    } catch (err) {
      console.error("Scribe error:", err);
    } finally {
      setScribeLoading(false);
    }
  };

  // 4. Push to CRM
  const handlePushToCrm = async (prospect, deduplicationStrategy = "skip_if_exists") => {
    setPushingId(prospect.id);
    try {
      const res = await fetch("/api/v1/crm/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          prospect_id: prospect.id,
          target_entity: "Lead",
          assigned_owner: `${companyProfile.name} SDR Team`,
          deduplication_strategy: deduplicationStrategy
        })
      });
      const data = await res.json();
      setCrmPushFeedback({
        prospectName: prospect.fullName,
        result: data
      });
      fetchProspects();
      fetchCrmRecords();
    } catch (err) {
      console.error("CRM push error:", err);
    } finally {
      setPushingId(null);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const unlockedCount = prospects.filter(p => p.contact.isUnlocked).length;
  const syncedCount = prospects.filter(p => p.crmStatus.isSynced).length;

  // View: Landing Page (Highperformr.ai inspired)
  if (currentView === "landing") {
    return (
      <LandingPage
        onLaunchProspectAI={() => setCurrentView("company_onboarding")}
        onExploreHub={() => setCurrentView("prospect_hub")}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode ? "bg-[#0B0F19] text-slate-100" : "bg-[#F8FAFC] text-slate-900"
    }`}>
      {/* 1. Global PiBi Prospect AI Top Navigation Bar */}
      <header className={`border-b sticky top-0 z-50 px-6 py-2.5 shadow-2xs transition-colors duration-200 ${
        isDarkMode ? "bg-[#0D1117] border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Growth AI */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div
              onClick={() => setCurrentView("landing")}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
              title="Return to Landing Page"
            >
              <PiBiLogo className="h-8 w-auto shrink-0 transition-transform group-hover:scale-105" />
              <span className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                Prospect AI
              </span>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView("landing")}
              className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-teal-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="Back to Landing Page"
            >
              <span>← Landing</span>
            </button>

            {/* Growth AI Indicator */}
            <div className={`hidden sm:flex items-center gap-1.5 font-extrabold px-3 py-1 rounded-full text-xs shadow-2xs border ${
              isDarkMode ? "bg-teal-950/60 text-teal-400 border-teal-800/60" : "bg-teal-50 text-teal-700 border-teal-200"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
              <span>Growth AI</span>
            </div>
          </div>

          {/* Center: The 2 Main Steps (Company Profile & Prospect AI Hub) - Made Bigger & Centered */}
          <div className="flex items-center justify-center flex-1 max-w-xl px-2">
            <div className={`flex items-center p-1 rounded-xl border shadow-2xs w-full max-w-md ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100/90 border-slate-200/90"
            }`}>
              <button
                onClick={() => setCurrentView("company_onboarding")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all text-xs sm:text-sm cursor-pointer ${
                  currentView === "company_onboarding"
                    ? isDarkMode
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700 font-black"
                      : "bg-white text-slate-900 shadow-sm border border-slate-200/70 font-black"
                    : isDarkMode
                    ? "text-slate-400 hover:text-white font-semibold"
                    : "text-slate-600 hover:text-slate-950 font-semibold"
                }`}
              >
                <Building2 className={`w-4 h-4 ${currentView === "company_onboarding" ? "text-[#0066FF]" : "text-slate-400"}`} />
                <span>1. Company Profile</span>
              </button>

              <button
                onClick={() => setCurrentView("prospect_hub")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all text-xs sm:text-sm cursor-pointer ${
                  currentView === "prospect_hub"
                    ? isDarkMode
                      ? "bg-slate-800 text-white shadow-sm border border-slate-700 font-black"
                      : "bg-white text-slate-900 shadow-sm border border-slate-200/70 font-black"
                    : isDarkMode
                    ? "text-slate-400 hover:text-white font-semibold"
                    : "text-slate-600 hover:text-slate-950 font-semibold"
                }`}
              >
                <Zap className={`w-4 h-4 ${currentView === "prospect_hub" ? "text-teal-600" : "text-slate-400"}`} />
                <span>2. Prospect AI Hub</span>
              </button>
            </div>
          </div>

          {/* Right Header Controls - Fully Working Interactivity (Alerts, Settings, Dark Mode, Profile) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-slate-400 relative">
              {/* 1. Alerts & Notifications Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowAlerts(!showAlerts);
                    setShowSettings(false);
                    setShowProfile(false);
                  }}
                  title="System & Signal Alerts"
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer relative ${
                    showAlerts
                      ? "bg-amber-500/20 text-amber-500 border-amber-500/40"
                      : isDarkMode
                      ? "hover:bg-slate-800 text-slate-300 border-transparent"
                      : "hover:bg-slate-100 text-slate-600 border-transparent"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
                    {alertsList.length}
                  </span>
                </button>

                {/* Alerts Popover Panel */}
                {showAlerts && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border p-4 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
                  }`}>
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-amber-500" />
                        <h4 className="font-bold text-xs uppercase tracking-wider">Alerts &amp; Signals</h4>
                      </div>
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                        {alertsList.length} Active
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto my-2">
                      {alertsList.map((alt) => (
                        <div key={alt.id} className="py-2.5 flex items-start gap-2.5 text-xs">
                          <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800 dark:text-slate-200">{alt.title}</span>
                              <span className="text-[10px] text-slate-400">{alt.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{alt.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => setAlertsList([])}
                        className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => {
                          setShowAlerts(false);
                          setCurrentView("prospect_hub");
                          setActiveTab("signals");
                        }}
                        className="text-[11px] font-bold text-[#0066FF] hover:underline cursor-pointer"
                      >
                        View Signal Radar →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Settings Gear Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(true);
                    setShowAlerts(false);
                    setShowProfile(false);
                  }}
                  title="CRM & Prospect AI Settings"
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    showSettings
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700"
                      : isDarkMode
                      ? "hover:bg-slate-800 text-slate-300 border-transparent"
                      : "hover:bg-slate-100 text-slate-600 border-transparent"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* 3. Dark / Light Mode Toggle Button (REAL WORKING SWITCH) */}
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                title={isDarkMode ? "Switch to LeadIQ Light Mode" : "Switch to Dark Mode"}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700"
                    : "hover:bg-slate-100 text-slate-600 border-transparent"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {/* 4. User Profile Avatar [K] Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfile(!showProfile);
                    setShowAlerts(false);
                    setShowSettings(false);
                  }}
                  title="User Profile & Workspace"
                  className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer ring-2 ring-transparent hover:ring-purple-300 transition-all"
                >
                  A
                </button>

                {/* Profile Dropdown Menu */}
                {showProfile && (
                  <div className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl border p-4 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"
                  }`}>
                    {/* User Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Admin</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">admin@pibi.io</p>
                      </div>
                    </div>

                    {/* Workspace details */}
                    <div className="py-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Workspace:</span>
                        <span className="font-bold text-slate-900 dark:text-white">Smart CRM (Prod)</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Plan Tier:</span>
                        <span className="font-bold text-teal-700 bg-teal-50 dark:bg-teal-950/60 dark:text-teal-300 px-2 py-0.5 rounded text-[10px]">
                          Enterprise Unlimited
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>API Server:</span>
                        <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">localhost:3000 (Live)</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <button
                        onClick={() => {
                          setShowProfile(false);
                          setShowSettings(true);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        CRM API Configurations
                      </button>

                      <a
                        href="/api/v1/openapi"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                      >
                        <Code className="w-3.5 h-3.5 text-[#0066FF]" />
                        OpenAPI Spec ↗
                      </a>

                      <button
                        onClick={() => {
                          setShowProfile(false);
                          alert("Signed out from Prospect AI session.");
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Disconnect Session
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MODAL 3: FULLY WORKING SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150 border my-auto ${
            isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] flex items-center justify-center">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Prospect AI &amp; CRM Settings</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Configure API keys, webhooks &amp; deduplication rules</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* API Key */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Prospecting API Secret Key
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={settingsForm.apiKey}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-xs text-indigo-600 shadow-2xs"
                  />
                  <button
                    onClick={() => handleCopy(settingsForm.apiKey, "settings_key")}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                  >
                    {copiedText === "settings_key" ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedText === "settings_key" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Webhook Endpoint */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  CRM Push Webhook URL
                </label>
                <input
                  type="url"
                  value={settingsForm.webhookUrl}
                  onChange={(e) => setSettingsForm({ ...settingsForm, webhookUrl: e.target.value })}
                  placeholder="https://your-crm.com/api/v1/prospect-webhook"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white shadow-2xs"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Triggered asynchronously when contacts are unlocked or synced.</span>
              </div>

              {/* Deduplication Strategy */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  CRM Deduplication Strategy
                </label>
                <select
                  value={settingsForm.deduplicationStrategy}
                  onChange={(e) => setSettingsForm({ ...settingsForm, deduplicationStrategy: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0066FF] focus:bg-white shadow-2xs"
                >
                  <option value="skip_if_exists">Skip if duplicate email/domain exists (Recommended)</option>
                  <option value="update_existing">Update existing CRM record with new enriched phone/title</option>
                  <option value="force_create">Always create duplicate lead record with tag</option>
                </select>
              </div>

              {/* Default Lead Owner */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Default Lead Owner
                </label>
                <input
                  type="text"
                  value={settingsForm.defaultOwner}
                  onChange={(e) => setSettingsForm({ ...settingsForm, defaultOwner: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white shadow-2xs"
                />
              </div>
            </div>

            {settingsSavedToast && (
              <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Settings saved successfully!
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettingsSavedToast(true);
                  setTimeout(() => {
                    setSettingsSavedToast(false);
                    setShowSettings(false);
                  }, 1200);
                }}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Save Configurations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD / EDIT PRODUCT MODAL (PURE WHITE THEME) */}
      {showProductModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-5 border my-auto bg-white border-slate-200 text-slate-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {editingProductId ? "Edit Product / Service" : "Add Product or Service"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Define this product's name, category, and target ICP criteria
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4 text-xs">
              {/* Product Name */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Product / Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. CPQ Quoting & Billing Engine"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white shadow-2xs"
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  placeholder="e.g. Sales Automation, FinTech, Analytics"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white shadow-2xs"
                />
              </div>

              {/* Value Proposition / Description */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Value Proposition &amp; Pitch Summary
                </label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Explain what problem this product solves (used by AI Scribe for personalized pitches)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white leading-relaxed shadow-2xs"
                />
              </div>

              {/* Target Buyer Industries */}
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Target Buyer Industries (ICP Focus)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_ICP_INDUSTRIES.map(ind => {
                    const isSel = productForm.targetIndustries.includes(ind);
                    return (
                      <button
                        type="button"
                        key={ind}
                        onClick={() => {
                          const next = isSel
                            ? productForm.targetIndustries.filter(i => i !== ind)
                            : [...productForm.targetIndustries, ind];
                          setProductForm({ ...productForm, targetIndustries: next });
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                          isSel
                            ? "bg-teal-600 text-white border-teal-700 font-bold shadow-2xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "}{ind}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Buyer Personas / Roles */}
              <div>
                <label className="font-bold text-slate-800 block mb-1.5">
                  Target Buyer Roles &amp; Personas
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_ICP_ROLES.map(role => {
                    const isSel = productForm.targetRoles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => {
                          const next = isSel
                            ? productForm.targetRoles.filter(r => r !== role)
                            : [...productForm.targetRoles, role];
                          setProductForm({ ...productForm, targetRoles: next });
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                          isSel
                            ? "bg-teal-600 text-white border-teal-700 font-bold shadow-2xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "}{role}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingProductId ? "Update Product" : "Save Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 1: COMPANY PROFILE & PRODUCTS ONBOARDING SCREEN (Exact replica of Image 1) */}
      {currentView === "company_onboarding" && (
        <div className="max-w-5xl w-full mx-auto p-6 flex flex-col gap-6 animate-in fade-in duration-200">
          {/* Step 1 Title Header */}
          <div className={`border rounded-2xl p-5 shadow-xs transition-colors ${
            isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="text-xs font-bold uppercase text-[#0066FF] tracking-wider mb-1">
              Step 1: Onboard Your Company &amp; Products
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Setup Company Profile to Generate Tailored Prospects
            </h2>
          </div>

          <form onSubmit={handleSaveAndLaunchHub} className="flex flex-col gap-6">
            {/* CARD 1: Company Profile (Matching Image 1) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
              <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-600" />
                Company Profile
              </h3>

              {/* Company Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyProfile.name}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, name: e.target.value })}
                  placeholder="Your Company Name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-2xs"
                />
              </div>

              {/* Company Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Company Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={companyProfile.description}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, description: e.target.value })}
                  placeholder="Describe your company, key value proposition, and problems you solve for clients..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-2xs leading-relaxed"
                />
              </div>

              {/* Company Website */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Company Website <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={companyProfile.website}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, website: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-2xs"
                />
              </div>

              {/* Company ICP & Targeting Criteria Divider */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target ICP Criteria &amp; Market Alignment
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Used for company-wide prospect qualification</span>
              </div>

              {/* 1. Target Industry */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>Target Industry</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {(companyProfile.targetIndustries || []).length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_COMPANY_INDUSTRIES.map((ind) => {
                    const isSel = (companyProfile.targetIndustries || []).includes(ind);
                    return (
                      <button
                        type="button"
                        key={ind}
                        onClick={() => handleToggleCompanyIndustry(ind)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSel
                            ? "bg-teal-600 text-white border-teal-700 font-bold shadow-2xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "}{ind}
                      </button>
                    );
                  })}
                  {(companyProfile.targetIndustries || []).filter(i => !DEFAULT_COMPANY_INDUSTRIES.includes(i)).map(custom => (
                    <button
                      type="button"
                      key={custom}
                      onClick={() => handleToggleCompanyIndustry(custom)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-teal-600 text-white border-teal-700 shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <span>✓ {custom}</span>
                      <X className="w-3 h-3 ml-0.5 opacity-80 hover:opacity-100" />
                    </button>
                  ))}
                </div>
                {/* Custom Industry Add Input */}
                <div className="flex items-center gap-2 max-w-sm mt-0.5">
                  <input
                    type="text"
                    value={customIndustryInput}
                    onChange={(e) => setCustomIndustryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomIndustry();
                      }
                    }}
                    placeholder="Add custom industry..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomIndustry}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg shrink-0 cursor-pointer transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* 2. Target Location */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>Target Location</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {(companyProfile.targetLocations || []).length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_COMPANY_LOCATIONS.map((loc) => {
                    const isSel = (companyProfile.targetLocations || []).includes(loc);
                    return (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => handleToggleCompanyLocation(loc)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSel
                            ? "bg-teal-600 text-white border-teal-700 font-bold shadow-2xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "}{loc}
                      </button>
                    );
                  })}
                  {(companyProfile.targetLocations || []).filter(l => !DEFAULT_COMPANY_LOCATIONS.includes(l)).map(custom => (
                    <button
                      type="button"
                      key={custom}
                      onClick={() => handleToggleCompanyLocation(custom)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-teal-600 text-white border-teal-700 shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <span>✓ {custom}</span>
                      <X className="w-3 h-3 ml-0.5 opacity-80 hover:opacity-100" />
                    </button>
                  ))}
                </div>
                {/* Custom Location Add Input */}
                <div className="flex items-center gap-2 max-w-sm mt-0.5">
                  <input
                    type="text"
                    value={customLocationInput}
                    onChange={(e) => setCustomLocationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomLocation();
                      }
                    }}
                    placeholder="Add custom location/country..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomLocation}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg shrink-0 cursor-pointer transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* 3. Target Customer Type */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    <span>Target Customer Type</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {(companyProfile.targetCustomerTypes || []).length} selected
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DEFAULT_CUSTOMER_TYPES.map((type) => {
                    const isSel = (companyProfile.targetCustomerTypes || []).includes(type);
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => handleToggleCompanyCustomerType(type)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSel
                            ? "bg-teal-600 text-white border-teal-700 font-bold shadow-2xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "}{type}
                      </button>
                    );
                  })}
                  {(companyProfile.targetCustomerTypes || []).filter(t => !DEFAULT_CUSTOMER_TYPES.includes(t)).map(custom => (
                    <button
                      type="button"
                      key={custom}
                      onClick={() => handleToggleCompanyCustomerType(custom)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-teal-600 text-white border-teal-700 shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <span>✓ {custom}</span>
                      <X className="w-3 h-3 ml-0.5 opacity-80 hover:opacity-100" />
                    </button>
                  ))}
                </div>
                {/* Custom Customer Type Add Input */}
                <div className="flex items-center gap-2 max-w-sm mt-0.5">
                  <input
                    type="text"
                    value={customCustomerTypeInput}
                    onChange={(e) => setCustomCustomerTypeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomCustomerType();
                      }
                    }}
                    placeholder="Add custom customer segment..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCustomerType}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg shrink-0 cursor-pointer transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: Products & Services Portfolio (List Each Product Separately) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                    <Briefcase className="w-5 h-5 text-slate-700" />
                    <span>Company Products &amp; Services</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {products.length} {products.length === 1 ? "Product" : "Products"}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-600 text-white shadow-2xs">
                      {activeProductIds.length} Active for ICP
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select one or more products to combine target industries and buyer roles for multi-product ICP matching.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handleSelectAllProducts}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl border border-slate-200 transition-all cursor-pointer"
                  >
                    {activeProductIds.length === products.length ? "Deselect Others" : "Select All Products"}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddProduct}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-98 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product / Service</span>
                  </button>
                </div>
              </div>

              {/* Products List - Each product with multi-select checkbox */}
              <div className="flex flex-col gap-3.5">
                {products.map((prod, index) => {
                  const isSelected = activeProductIds.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleToggleProductSelection(prod.id)}
                      className={`rounded-xl p-4.5 transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-teal-50/25 border-teal-500 ring-2 ring-teal-500/15 shadow-2xs"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                        {/* Left: Checkbox Selector & Title */}
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleProductSelection(prod.id);
                            }}
                            className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                              isSelected
                                ? "border-teal-600 bg-teal-600 text-white shadow-2xs"
                                : "border-slate-300 bg-white hover:border-teal-500"
                            }`}
                            title={isSelected ? "Click to deselect" : "Click to select"}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                              <h4 className="text-sm font-bold text-slate-900">{prod.name}</h4>
                              <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                                {prod.category}
                              </span>
                            </div>
                            {prod.description && (
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {prod.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right: Active Status Badge & Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleToggleProductSelection(prod.id)}
                            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 border-teal-300 hover:bg-teal-100/60"
                                : "text-slate-600 hover:text-teal-700 hover:bg-teal-50 border-slate-200"
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-teal-600 stroke-[3]" />
                                <span>Active ICP Product</span>
                              </>
                            ) : (
                              <span>+ Select for ICP</span>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEditProduct(prod)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {products.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Tags: Industries & Personas */}
                      <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Target Buyer Industries (ICP Focus):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {prod.targetIndustries.map(ind => (
                              <span
                                key={ind}
                                className="bg-teal-50 text-teal-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-teal-100"
                              >
                                ✓ {ind}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Target Buyer Personas / Roles:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {prod.targetRoles.map(role => (
                              <span
                                key={role}
                                className="bg-teal-50 text-teal-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-teal-100"
                              >
                                ✓ {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit & Launch Hub Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 flex-wrap">
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
                  <span>Currently targeting: <strong className="text-slate-800">{activeProductIds.length} {activeProductIds.length === 1 ? "Product" : "Products"} Selected</strong> ({selectedProducts.map(p => p.name).join(", ")})</span>
                </div>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-teal-600/10 flex items-center gap-2 cursor-pointer active:scale-98 shrink-0"
                >
                  <span>Save Profile &amp; Launch Prospect AI Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 2: PROSPECT AI DASHBOARD - STREAMLINED & FOCUSED ON CORE PROSPECTS */}
      {currentView === "prospect_hub" && (
        <div className="flex-1 flex flex-col animate-in fade-in duration-200">
          {/* Compact ICP & Quick Action Bar (Replaces all redundant hero banners) */}
          <div className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-4 transition-colors ${
            isDarkMode ? "bg-slate-900/90 border-slate-800 text-white" : "bg-white border-slate-200 shadow-2xs text-slate-900"
          }`}>
            {/* Left: Active Targeting Summary */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`font-extrabold px-3 py-1 rounded-full text-xs border ${
                isDarkMode ? "bg-teal-950/60 text-teal-400 border-teal-800" : "bg-teal-50 text-teal-700 border-teal-200"
              }`}>
                Active ICP Match
              </span>
              <div className="text-xs flex items-center gap-1.5">
                <span className="text-slate-400">Target Company:</span>
                <strong className="font-bold">{companyProfile.name}</strong>
              </div>
              <div className="flex items-center gap-1.5 text-xs flex-wrap">
                <span className="text-slate-400 font-medium">Products ({activeProductIds.length}):</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {products.map(p => {
                    const isSel = activeProductIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleToggleProductSelection(p.id)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                          isSel
                            ? "bg-teal-600 text-white border-teal-700 shadow-2xs"
                            : isDarkMode
                            ? "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                            : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                        title={isSel ? `Active for ICP (${p.name}). Click to toggle.` : `Inactive (${p.name}). Click to enable.`}
                      >
                        {isSel && <Check className="w-3 h-3 stroke-[3]" />}
                        <span className="truncate max-w-[120px] sm:max-w-[160px]">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setCurrentView("company_onboarding")}
                className="text-xs text-[#0066FF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                Manage Profile &amp; ICP
              </button>
            </div>

            {/* Right: Essential Stat Badges & Quick Unlock */}
            <div className="flex items-center gap-2.5">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${
                isDarkMode ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}>
                <span className="text-slate-400">Matched Prospects:</span>
                <span className="font-black text-slate-900 dark:text-white">{prospects.length}</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${
                isDarkMode ? "bg-teal-950/40 border-teal-800 text-teal-300" : "bg-teal-50 border-teal-200 text-teal-800"
              }`}>
                <span className="text-teal-600 dark:text-teal-400 font-medium">Unlocked:</span>
                <span className="font-black">{unlockedCount} / {prospects.length}</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${
                isDarkMode ? "bg-amber-950/40 border-amber-800 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-800"
              }`}>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Signals:</span>
                <span className="font-black">{signals.length}</span>
              </div>
              <button
                onClick={handleBatchUnlock}
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Unlock className="w-3.5 h-3.5" />
                Unlock All ({prospects.length})
              </button>
            </div>
          </div>

          {/* Main Dashboard Tabs & Table Area (Core Prospects Workspace) */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
            <div className={`flex items-center justify-center gap-3 border-b pb-3 transition-colors ${
              isDarkMode ? "border-slate-800" : "border-slate-200"
            }`}>
              <button
                onClick={() => setActiveTab("prospects")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === "prospects"
                    ? "bg-[#176A9E] text-white shadow-sm"
                    : isDarkMode
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Search className="w-4 h-4" />
                Prospect Discovery &amp; Enrichment
              </button>

              <button
                onClick={() => setActiveTab("signals")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === "signals"
                    ? "bg-[#176A9E] text-white shadow-sm"
                    : isDarkMode
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Buying Signals Radar
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "signals"
                    ? "bg-white/20 text-white"
                    : "bg-amber-100 text-amber-900"
                }`}>
                  {signals.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("crm")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === "crm"
                    ? "bg-[#176A9E] text-white shadow-sm"
                    : isDarkMode
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Database className="w-4 h-4" />
                CRM Database Sync
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "crm"
                    ? "bg-white/20 text-white"
                    : "bg-teal-100 text-teal-800"
                }`}>
                  {crmRecords.length}
                </span>
              </button>
            </div>

            {/* TAB 1: PROSPECTS DISCOVERY & ENRICHMENT */}
            {activeTab === "prospects" && (
              <div className="flex flex-col gap-4">
                {/* Filter Bar */}
                <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
                    <div className="relative flex-1 min-w-[220px]">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by title, name, company, or tech (e.g. RevOps, Salesforce)..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:bg-white transition-colors"
                      />
                    </div>

                    <select
                      value={selectedSeniority}
                      onChange={(e) => setSelectedSeniority(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:border-[#0066FF]"
                    >
                      <option value="all">All Seniorities</option>
                      <option value="c_level">C-Level (CIO, CTO)</option>
                      <option value="vp">VP Level</option>
                      <option value="director">Director Level</option>
                    </select>

                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:border-[#0066FF]"
                    >
                      <option value="all">All Industries</option>
                      <option value="Software & SaaS">Software &amp; SaaS</option>
                      <option value="Financial Services & FinTech">FinTech</option>
                      <option value="Artificial Intelligence">AI</option>
                      <option value="Logistics & Supply Chain">Logistics</option>
                      <option value="Healthcare & MedTech">HealthTech</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBatchUnlock}
                      disabled={loading}
                      className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      Unlock All Filtered
                    </button>
                  </div>
                </div>

                {/* Prospects Table */}
                <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3.5">Prospect &amp; ICP Fit</th>
                          <th className="px-5 py-3.5">Company &amp; Industry</th>
                          <th className="px-5 py-3.5">Contact Verification</th>
                          <th className="px-5 py-3.5">Active Signals</th>
                          <th className="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {prospects.map((prospect) => {
                          const isUnlocked = prospect.contact.isUnlocked;
                          const isSynced = prospect.crmStatus.isSynced;
                          const icpScore = prospect.icpScore || 90;

                          return (
                            <tr key={prospect.id} className="hover:bg-slate-50/70 transition-colors">
                              {/* Prospect Column with ICP Match Badge */}
                              <td className="px-5 py-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center font-bold text-[#0066FF] text-xs shrink-0 shadow-2xs">
                                    {prospect.firstName[0]}{prospect.lastName[0]}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-900">{prospect.fullName}</span>
                                      <a
                                        href={prospect.linkedinUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-400 hover:text-[#0066FF] transition-colors"
                                      >
                                        <LinkedInIcon className="w-3.5 h-3.5" />
                                      </a>

                                      {/* Smart ICP Fit Badge */}
                                      <span
                                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                                          icpScore >= 90
                                            ? "bg-teal-50 text-teal-700 border-teal-200"
                                            : "bg-blue-50 text-blue-700 border-blue-200"
                                        }`}
                                        title={prospect.icpReason}
                                      >
                                        🎯 {icpScore}% ICP Fit
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-600 font-medium">{prospect.title}</p>
                                    <span className="inline-block text-[11px] text-slate-400 mt-0.5">
                                      {prospect.location} • <span className="text-slate-500 font-medium">{prospect.icpReason}</span>
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Company Column */}
                              <td className="px-5 py-4">
                                <div>
                                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                    {prospect.company.name}
                                  </div>
                                  <p className="text-xs text-slate-500">{prospect.company.industry}</p>
                                  <div className="flex items-center gap-1.5 mt-1.5">
                                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                                      {prospect.company.size} emp
                                    </span>
                                    {prospect.company.funding && (
                                      <span className="text-[10px] font-semibold bg-teal-50 text-teal-800 px-1.5 py-0.5 rounded border border-teal-200">
                                        {prospect.company.funding.stage} ({prospect.company.funding.amount})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Contact Info (Waterfall Locked/Unlocked) */}
                              <td className="px-5 py-4">
                                <div className="flex flex-col gap-1.5">
                                  {/* Work Email */}
                                  <div className="flex items-center gap-2 text-xs">
                                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                                    <span className={isUnlocked ? "font-mono font-medium text-slate-900" : "font-mono text-slate-400"}>
                                      {prospect.contact.workEmail}
                                    </span>
                                    {isUnlocked ? (
                                      <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-1.5 py-0.2 rounded border border-teal-200">
                                        {prospect.contact.deliverabilityScore}% Valid
                                      </span>
                                    ) : (
                                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded flex items-center gap-0.5 border border-slate-200">
                                        <Lock className="w-2.5 h-2.5" /> Locked
                                      </span>
                                    )}
                                  </div>

                                  {/* Phone */}
                                  <div className="flex items-center gap-2 text-xs">
                                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                                    <span className={isUnlocked ? "font-mono font-medium text-slate-900" : "font-mono text-slate-400"}>
                                      {prospect.contact.phone}
                                    </span>
                                    {isUnlocked && (
                                      <span className="text-[10px] text-slate-500">({prospect.contact.phoneType})</span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Buying Signals */}
                              <td className="px-5 py-4">
                                {prospect.signals && prospect.signals.length > 0 ? (
                                  <div className="flex flex-col gap-1">
                                    {prospect.signals.map((sig) => (
                                      <div
                                        key={sig.id}
                                        className="text-xs bg-amber-50 border border-amber-200 text-amber-900 px-2 py-1 rounded-md max-w-xs shadow-2xs"
                                      >
                                        <span className="font-bold block text-amber-950">{sig.title}</span>
                                        <span className="text-[11px] text-amber-800 line-clamp-1">
                                          {sig.description}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-xs text-slate-400 italic">No triggers detected</span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {!isUnlocked ? (
                                    <button
                                      onClick={() => handleEnrich(prospect.id)}
                                      disabled={enrichingId === prospect.id}
                                      className="flex items-center gap-1 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white px-2.5 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                                      title="Waterfall Unlock verified email & phone"
                                    >
                                      {enrichingId === prospect.id ? (
                                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                      ) : (
                                        <Unlock className="w-3.5 h-3.5" />
                                      )}
                                      Unlock
                                    </button>
                                  ) : (
                                    <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-200 font-bold">
                                      Enriched
                                    </span>
                                  )}

                                  {/* AI Scribe Button (Pitches their company product!) */}
                                  <button
                                    onClick={() => handleOpenScribe(prospect)}
                                    className="flex items-center gap-1 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                                    title={`Generate Personalized Pitch for ${companyProfile.name}`}
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                                    Scribe AI
                                  </button>

                                  {/* Push to CRM Button */}
                                  <button
                                    onClick={() => handlePushToCrm(prospect)}
                                    disabled={pushingId === prospect.id}
                                    className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors border shadow-2xs cursor-pointer ${
                                      isSynced
                                        ? "bg-blue-50 hover:bg-blue-100 text-[#0066FF] border-blue-200 font-semibold"
                                        : "bg-teal-600 hover:bg-teal-700 text-white border-teal-700 font-bold active:scale-98"
                                    }`}
                                    title={isSynced ? "Lead is synced to CRM" : "Push Lead to CRM with duplicate validation"}
                                  >
                                    {pushingId === prospect.id ? (
                                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    ) : isSynced ? (
                                      <Check className="w-3.5 h-3.5 text-[#0066FF]" />
                                    ) : (
                                      <Send className="w-3.5 h-3.5" />
                                    )}
                                    <span>{isSynced ? "In CRM" : "Push CRM"}</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BUYING SIGNALS RADAR */}
            {activeTab === "signals" && (
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    Actionable Buying Signals &amp; Trigger Tracking
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Real-time trigger alerts: job transitions of past champions, new executive hires, funding rounds, and hiring surges.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {signals.map((sig) => (
                    <div
                      key={sig.id}
                      className="bg-white border border-slate-200/90 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                            {sig.type.replace("_", " ")}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{sig.date}</span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-base mt-2">{sig.title}</h3>
                        <p className="text-xs text-slate-600 mt-1">{sig.description}</p>

                        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-900">{sig.prospect.fullName}</p>
                            <p className="text-[11px] text-slate-500">{sig.prospect.title} at <span className="font-semibold text-[#0066FF]">{sig.company.name}</span></p>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500">{sig.company.size} employees</span>
                        </div>

                        <div className="mt-3 text-xs bg-blue-50/80 border border-blue-200 p-2.5 rounded-lg text-blue-900">
                          <span className="font-bold block text-[#0055D6]">Recommended Action:</span>
                          {sig.recommendedAction}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEnrich(sig.prospect.id)}
                          className="text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-300"
                        >
                          Enrich Contact
                        </button>
                        <button
                          onClick={() => {
                            const prsp = prospects.find(p => p.id === sig.prospect.id);
                            if (prsp) handleOpenScribe(prsp);
                          }}
                          className="text-xs bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Generate Pitch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CRM RECORDS & SYNC STATUS */}
            {activeTab === "crm" && (
              <div className="flex flex-col gap-4">
                <div className="bg-white border border-slate-200/90 rounded-xl p-5 flex items-center justify-between shadow-sm">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Database className="w-5 h-5 text-teal-600" />
                      {companyProfile.name} Synced CRM Records
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Directly synced leads, contacts, and account records with real-time deduplication.
                    </p>
                  </div>
                  <button
                    onClick={fetchCrmRecords}
                    className="flex items-center gap-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh CRM Records
                  </button>
                </div>

                <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-700">
                      <thead className="bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3.5">CRM Record ID</th>
                          <th className="px-5 py-3.5">Full Name &amp; Title</th>
                          <th className="px-5 py-3.5">Company</th>
                          <th className="px-5 py-3.5">Email / Phone</th>
                          <th className="px-5 py-3.5">Lead Source &amp; Owner</th>
                          <th className="px-5 py-3.5">Entity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {crmRecords.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                              No records synced to CRM yet. Click &quot;Push CRM&quot; on any prospect to sync!
                            </td>
                          </tr>
                        ) : (
                          crmRecords.map((rec) => (
                            <tr key={rec.crmRecordId} className="hover:bg-slate-50/70 transition-colors">
                              <td className="px-5 py-4 font-mono text-xs text-[#0066FF] font-bold">
                                {rec.crmRecordId}
                              </td>
                              <td className="px-5 py-4">
                                <span className="font-bold text-slate-900 block">{rec.fullName}</span>
                                <span className="text-xs text-slate-500">{rec.title || "Target Lead"}</span>
                              </td>
                              <td className="px-5 py-4 font-semibold text-slate-800">
                                {rec.company}
                              </td>
                              <td className="px-5 py-4 font-mono text-xs text-slate-700">
                                <div className="font-medium">{rec.email || "No email"}</div>
                                <div className="text-slate-400">{rec.phone || ""}</div>
                              </td>
                              <td className="px-5 py-4 text-xs text-slate-600 max-w-xs">
                                <span className="text-teal-700 font-bold">{rec.leadSource || "Prospecting API"}</span>
                                <span className="block text-slate-400 text-[11px] truncate">Owner: {rec.assignedOwner || "Sales Team"}</span>
                              </td>
                              <td className="px-5 py-4">
                                <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-bold border border-teal-200">
                                  {rec.entityType || "Lead"}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


          </main>
        </div>
      )}

      {/* MODAL 1: AI SCRIBE (LeadIQ Scribe Outreach Generator) */}
      {scribeProspect && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150 my-auto overflow-hidden">
            {/* Modal Fixed Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5 shrink-0 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Prospect AI Scribe Copilot</h3>
                  <p className="text-xs text-slate-500">
                    Pitching <strong className="text-slate-700">{companyProfile.name}</strong> to {scribeProspect.fullName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setScribeProspect(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
              {scribeLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 text-[#0066FF] animate-spin" />
                  <p className="text-sm text-slate-700 font-semibold">
                    Synthesizing {companyProfile.name} value proposition with prospect signals...
                  </p>
                </div>
              ) : scribeResults ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    {scribeResults.templates.map((tpl, idx) => (
                      <button
                        key={tpl.id}
                        onClick={() => setActiveAngleIndex(idx)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          activeAngleIndex === idx
                            ? "bg-teal-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 bg-slate-100"
                        }`}
                      >
                        {tpl.name}
                      </button>
                    ))}
                  </div>

                  {scribeResults.templates[activeAngleIndex] && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                          {scribeResults.templates[activeAngleIndex].badge}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          Confidence: {scribeResults.templates[activeAngleIndex].confidenceScore}%
                        </span>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Subject Line</label>
                        <div className="mt-1 flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 font-medium">
                          <span>{scribeResults.templates[activeAngleIndex].subject}</span>
                          <button
                            onClick={() => handleCopy(scribeResults.templates[activeAngleIndex].subject, "subj")}
                            className="text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            {copiedText === "subj" ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Email Body</label>
                        <div className="mt-1 relative bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 whitespace-pre-line font-sans leading-relaxed">
                          {scribeResults.templates[activeAngleIndex].body}
                          <button
                            onClick={() => handleCopy(scribeResults.templates[activeAngleIndex].body, "body")}
                            className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1 rounded bg-slate-100 cursor-pointer"
                            title="Copy Body"
                          >
                            {copiedText === "body" ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">LinkedIn 300-Char InMail</label>
                        <div className="mt-1 bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-700">
                          {scribeResults.templates[activeAngleIndex].linkedInSnippet}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Modal Fixed Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 p-4 shrink-0 bg-slate-50">
              <button
                onClick={() => setScribeProspect(null)}
                className="text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: WATERFALL AUDIT MODAL */}
      {waterfallAuditModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Waterfall Enrichment Verified</h3>
                  <p className="text-xs text-slate-500">{waterfallAuditModal.data.fullName} unlocked</p>
                </div>
              </div>
              <button
                onClick={() => setWaterfallAuditModal(null)}
                className="text-slate-400 hover:text-slate-700 transition-colors text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
              <div>
                <span className="text-xs font-mono text-slate-900 block font-bold">
                  {waterfallAuditModal.data.contact.workEmail.email}
                </span>
                <span className="text-[11px] font-semibold text-teal-700">
                  Deliverability: {waterfallAuditModal.data.contact.workEmail.deliverabilityScore}% ({waterfallAuditModal.data.contact.workEmail.verificationProtocol})
                </span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-900 block font-bold">
                  {waterfallAuditModal.data.contact.directPhone.number}
                </span>
                <span className="text-[11px] text-slate-500">
                  Type: {waterfallAuditModal.data.contact.directPhone.type} (Status: {waterfallAuditModal.data.contact.directPhone.status})
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Waterfall Audit Trail</p>
              <div className="space-y-2">
                {waterfallAuditModal.data.waterfallAudit.map((step) => (
                  <div key={step.step} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <span className="font-bold text-slate-800 block">{step.provider}</span>
                      <span className="text-[11px] text-slate-500">{step.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setWaterfallAuditModal(null)}
              className="mt-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* TOAST FEEDBACK: CRM PUSH RESULT */}
      {crmPushFeedback && (
        <div className="fixed bottom-6 right-6 max-w-md w-full bg-white border border-slate-200 rounded-xl p-4 shadow-xl z-50 animate-in slide-in-from-bottom duration-200 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm text-slate-900">CRM Push Result: {crmPushFeedback.prospectName}</h4>
            <p className="text-xs text-slate-600 mt-0.5">{crmPushFeedback.result.message}</p>
            {crmPushFeedback.result.crmRecordId && (
              <span className="inline-block mt-1 font-mono text-[11px] bg-slate-100 text-[#0066FF] px-2 py-0.5 rounded border border-slate-200 font-bold">
                CRM ID: {crmPushFeedback.result.crmRecordId}
              </span>
            )}
          </div>
          <button
            onClick={() => setCrmPushFeedback(null)}
            className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
