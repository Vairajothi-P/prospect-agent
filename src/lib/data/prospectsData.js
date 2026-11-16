// Standalone Prospecting Hub Data Store
// Realistic B2B Database with contact verification status, firmographics, and buying signals

export const INITIAL_PROSPECTS = [
  {
    id: "prsp_001",
    firstName: "Elena",
    lastName: "Rostova",
    fullName: "Elena Rostova",
    title: "VP of Revenue Operations",
    seniority: "vp",
    department: "operations",
    location: "Austin, Texas",
    country: "United States",
    linkedinUrl: "https://linkedin.com/in/elena-rostova-sample",
    bio: "Passionate RevOps leader scaling sales funnels, pipeline analytics, and tech stack efficiency. Ex-Stripe, ex-Datadog.",
    company: {
      id: "comp_101",
      name: "CloudNova Systems",
      domain: "cloudnova.io",
      industry: "Software & SaaS",
      size: "201-500",
      headcount: 340,
      annualRevenue: "$38M",
      headquarters: "Austin, TX, USA",
      techStack: ["Salesforce", "HubSpot", "AWS", "Snowflake", "Slack", "Segment"],
      funding: {
        stage: "Series B",
        amount: "$35,000,000",
        date: "2026-10-18",
        leadInvestor: "Sequoia Capital"
      }
    },
    contact: {
      workEmail: "elena.rostova@cloudnova.io",
      emailStatus: "verified",
      deliverabilityScore: 98,
      phone: "+1-512-555-0182",
      phoneType: "Direct Mobile",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_101",
        type: "job_change",
        title: "Promoted to VP of RevOps",
        description: "Promoted from Director to VP of RevOps at CloudNova Systems 6 weeks ago.",
        date: "2026-10-01",
        weight: "high"
      },
      {
        id: "sig_102",
        type: "funding",
        title: "Company raised $35M Series B",
        description: "CloudNova raised $35M to accelerate enterprise sales and go-to-market infrastructure.",
        date: "2026-10-18",
        weight: "high"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  },
  {
    id: "prsp_002",
    firstName: "Marcus",
    lastName: "Vance",
    fullName: "Marcus Vance",
    title: "Chief Information Officer",
    seniority: "c_level",
    department: "engineering",
    location: "San Francisco, California",
    country: "United States",
    linkedinUrl: "https://linkedin.com/in/marcus-vance-sample",
    bio: "CIO driving AI modernization, zero-trust cloud security, and enterprise CRM workflow consolidation across 1,200+ employees.",
    company: {
      id: "comp_102",
      name: "HyperScale AI",
      domain: "hyperscale.ai",
      industry: "Artificial Intelligence",
      size: "501-1000",
      headcount: 820,
      annualRevenue: "$95M",
      headquarters: "San Francisco, CA, USA",
      techStack: ["Kubernetes", "Google Cloud", "PostgreSQL", "Salesforce", "Databricks"],
      funding: {
        stage: "Series C",
        amount: "$80,000,000",
        date: "2026-09-05",
        leadInvestor: "Andreessen Horowitz"
      }
    },
    contact: {
      workEmail: "mvance@hyperscale.ai",
      emailStatus: "verified",
      deliverabilityScore: 96,
      phone: "+1-415-555-0199",
      phoneType: "Direct Office / Mobile",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_103",
        type: "job_change",
        title: "New CIO Appointment",
        description: "Joined HyperScale AI as CIO. Previously Champion at Apex Dynamics.",
        date: "2026-10-25",
        weight: "critical"
      },
      {
        id: "sig_104",
        type: "hiring_spree",
        title: "Active Sales & RevOps Hiring",
        description: "HyperScale opened 24 new engineering and commercial positions this month.",
        date: "2026-11-04",
        weight: "medium"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  },
  {
    id: "prsp_003",
    firstName: "Sarah",
    lastName: "Jenkins",
    fullName: "Sarah Jenkins",
    title: "Head of Global Sales",
    seniority: "vp",
    department: "sales",
    location: "London, England",
    country: "United Kingdom",
    linkedinUrl: "https://linkedin.com/in/sarah-jenkins-sales",
    bio: "Building high-velocity SDR and Account Executive teams in EMEA and North America. Focused on outbound pipeline acceleration.",
    company: {
      id: "comp_103",
      name: "FinPulse Global",
      domain: "finpulse.co.uk",
      industry: "Financial Services & FinTech",
      size: "51-200",
      headcount: 145,
      annualRevenue: "$19M",
      headquarters: "London, UK",
      techStack: ["HubSpot CRM", "Stripe", "Next.js", "Intercom", "Mixpanel"],
      funding: {
        stage: "Series A",
        amount: "$14,000,000",
        date: "2026-08-12",
        leadInvestor: "Index Ventures"
      }
    },
    contact: {
      workEmail: "s.jenkins@finpulse.co.uk",
      emailStatus: "verified",
      deliverabilityScore: 94,
      phone: "+44-20-7946-0144",
      phoneType: "Direct Mobile",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_105",
        type: "expansion",
        title: "EMEA to US Expansion",
        description: "FinPulse announced US market entry and is procuring sales tools for remote sales team.",
        date: "2026-11-02",
        weight: "high"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  },
  {
    id: "prsp_004",
    firstName: "Rohan",
    lastName: "Mehta",
    fullName: "Rohan Mehta",
    title: "Director of Product Management",
    seniority: "director",
    department: "product",
    location: "Bengaluru, Karnataka",
    country: "India",
    linkedinUrl: "https://linkedin.com/in/rohan-mehta-pm",
    bio: "Leading CRM integrations, workflow automation, and partner ecosystems. Specializing in frictionless SaaS onboarding.",
    company: {
      id: "comp_104",
      name: "LogiFlow Logistics",
      domain: "logiflow.in",
      industry: "Logistics & Supply Chain",
      size: "201-500",
      headcount: 280,
      annualRevenue: "$22M",
      headquarters: "Bengaluru, India",
      techStack: ["React", "Node.js", "MongoDB", "AWS", "Freshworks"],
      funding: {
        stage: "Series B",
        amount: "$22,000,000",
        date: "2026-07-20",
        leadInvestor: "Tiger Global"
      }
    },
    contact: {
      workEmail: "rohan.mehta@logiflow.in",
      emailStatus: "verified",
      deliverabilityScore: 92,
      phone: "+91-98450-12890",
      phoneType: "Direct Mobile",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_106",
        type: "tech_install",
        title: "Evaluating New CRM Infrastructure",
        description: "LogiFlow posted requirements for automating sales pipeline and supply vendor onboarding.",
        date: "2026-11-09",
        weight: "high"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  },
  {
    id: "prsp_005",
    firstName: "David",
    lastName: "Kim",
    fullName: "David Kim",
    title: "Chief Technology Officer",
    seniority: "c_level",
    department: "engineering",
    location: "New York, New York",
    country: "United States",
    linkedinUrl: "https://linkedin.com/in/david-kim-tech",
    bio: "CTO scaling microservices and data pipelines for health-tech intelligence. Passionate about developer tooling and data privacy.",
    company: {
      id: "comp_105",
      name: "AuraMed Health",
      domain: "auramed.health",
      industry: "Healthcare & MedTech",
      size: "51-200",
      headcount: 110,
      annualRevenue: "$15M",
      headquarters: "New York, NY, USA",
      techStack: ["Next.js", "Python", "FastAPI", "PostgreSQL", "HIPAA Vault", "Snowflake"],
      funding: {
        stage: "Series A",
        amount: "$12,500,000",
        date: "2026-05-30",
        leadInvestor: "General Catalyst"
      }
    },
    contact: {
      workEmail: "dkim@auramed.health",
      emailStatus: "verified",
      deliverabilityScore: 97,
      phone: "+1-212-555-0143",
      phoneType: "Direct Mobile",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_107",
        type: "compliance_event",
        title: "SOC2 Type II Certified",
        description: "AuraMed completed SOC2 compliance and is actively integrating enterprise partner tools.",
        date: "2026-10-12",
        weight: "medium"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  },
  {
    id: "prsp_006",
    firstName: "Camila",
    lastName: "Santos",
    fullName: "Camila Santos",
    title: "Director of Demand Generation",
    seniority: "director",
    department: "marketing",
    location: "Toronto, Ontario",
    country: "Canada",
    linkedinUrl: "https://linkedin.com/in/camila-santos-mktg",
    bio: "Data-driven B2B marketer driving inbound-outbound alignment, lead qualification, and CRM marketing attribution.",
    company: {
      id: "comp_106",
      name: "OmniReach Marketing",
      domain: "omnireach.com",
      industry: "Marketing & Advertising",
      size: "51-200",
      headcount: 85,
      annualRevenue: "$9M",
      headquarters: "Toronto, Canada",
      techStack: ["HubSpot", "Marketo", "Google Analytics 4", "LinkedIn Ads", "Zapier"],
      funding: {
        stage: "Seed",
        amount: "$4,500,000",
        date: "2026-04-15",
        leadInvestor: "Bessemar Venture Partners"
      }
    },
    contact: {
      workEmail: "camila@omnireach.com",
      emailStatus: "verified",
      deliverabilityScore: 91,
      phone: "+1-416-555-0177",
      phoneType: "Direct Mobile",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_108",
        type: "job_change",
        title: "Joined OmniReach as Director",
        description: "Took helm of Demand Generation to lead multi-channel outbound strategy.",
        date: "2026-10-20",
        weight: "high"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  },
  {
    id: "prsp_007",
    firstName: "Alexander",
    lastName: "Wright",
    fullName: "Alexander Wright",
    title: "VP of Enterprise Partnerships",
    seniority: "vp",
    department: "sales",
    location: "Chicago, Illinois",
    country: "United States",
    linkedinUrl: "https://linkedin.com/in/alex-wright-bizdev",
    bio: "Enterprise dealmaker orchestrating strategic alliances and channel sales across Fortune 500 accounts.",
    company: {
      id: "comp_107",
      name: "Apex Logistics & Trade",
      domain: "apexlogistics.com",
      industry: "Logistics & Supply Chain",
      size: "501-1000",
      headcount: 750,
      annualRevenue: "$120M",
      headquarters: "Chicago, IL, USA",
      techStack: ["Salesforce CRM", "SAP", "Microsoft 365", "Tableau"],
      funding: {
        stage: "Growth Equity",
        amount: "$50,000,000",
        date: "2026-03-22",
        leadInvestor: "Insight Partners"
      }
    },
    contact: {
      workEmail: "awright@apexlogistics.com",
      emailStatus: "verified",
      deliverabilityScore: 95,
      phone: "+1-312-555-0164",
      phoneType: "Direct Office",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_109",
        type: "expansion",
        title: "Launching New Distribution Hubs",
        description: "Announced 3 new regional logistics hubs requiring digital vendor management.",
        date: "2026-11-05",
        weight: "medium"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  },
  {
    id: "prsp_008",
    firstName: "Priya",
    lastName: "Nair",
    fullName: "Priya Nair",
    title: "Head of Customer Success & Operations",
    seniority: "director",
    department: "operations",
    location: "Singapore",
    country: "Singapore",
    linkedinUrl: "https://linkedin.com/in/priya-nair-cs",
    bio: "Obsessed with net retention, customer health score modeling, and automating CRM handoffs between Sales and CS.",
    company: {
      id: "comp_108",
      name: "Synthetix Cloud",
      domain: "synthetixcloud.io",
      industry: "Software & SaaS",
      size: "51-200",
      headcount: 160,
      annualRevenue: "$21M",
      headquarters: "Singapore",
      techStack: ["Gainsight", "Salesforce", "Zendesk", "Jira", "BigQuery"],
      funding: {
        stage: "Series B",
        amount: "$28,000,000",
        date: "2026-09-19",
        leadInvestor: "Temasek Holdings"
      }
    },
    contact: {
      workEmail: "priya.nair@synthetixcloud.io",
      emailStatus: "verified",
      deliverabilityScore: 99,
      phone: "+65-6712-3456",
      phoneType: "Direct Mobile",
      phoneStatus: "valid",
      isUnlocked: false
    },
    signals: [
      {
        id: "sig_110",
        type: "hiring_spree",
        title: "Expanding CS & Onboarding Team",
        description: "Synthetix is hiring 10+ Customer Success Managers across APAC and EMEA.",
        date: "2026-11-07",
        weight: "high"
      }
    ],
    crmStatus: {
      isSynced: false,
      syncedLeadId: null,
      syncedAt: null
    }
  }
];

// In-memory runtime state (allows unlocking contacts, syncing to CRM, and adding notes)
export let prospectStore = JSON.parse(JSON.stringify(INITIAL_PROSPECTS));

// Reset store to initial state if needed
export function resetProspectStore() {
  prospectStore = JSON.parse(JSON.stringify(INITIAL_PROSPECTS));
  return prospectStore;
}

