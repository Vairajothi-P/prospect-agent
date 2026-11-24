import { prospectStore } from "../data/prospectsData.js";

const INDUSTRY_ALIASES = {
  "textiles": ["textiles", "textile", "apparel", "garment", "garments", "fashion", "fabric"],
  "it services": [
    "it services",
    "information technology",
    "software & saas",
    "software",
    "saas",
    "it",
    "artificial intelligence",
    "ai",
    "cybersecurity",
    "cloud infrastructure",
    "cloud"
  ],
  "pharma": [
    "pharma",
    "pharmaceutical",
    "pharmaceuticals",
    "healthcare & medtech",
    "medtech",
    "life sciences",
    "biotech",
    "medicine"
  ],
  "logistics": [
    "logistics",
    "logistics & supply chain",
    "supply chain",
    "shipping",
    "freight",
    "transport",
    "transportation",
    "warehousing"
  ],
  "fintech": [
    "fintech",
    "financial services & fintech",
    "financial services",
    "finance",
    "banking",
    "payments"
  ],
  "healthcare": [
    "healthcare",
    "healthcare & medtech",
    "health",
    "medtech",
    "medical",
    "hospital",
    "clinical"
  ],
  "auto components": [
    "auto components",
    "automotive",
    "auto",
    "automobile",
    "manufacturing & industrial",
    "manufacturing",
    "industrial"
  ],
  "real estate": [
    "real estate",
    "property",
    "proptech",
    "infrastructure",
    "infra",
    "construction"
  ],
  "retail": [
    "retail",
    "e-commerce & retail",
    "e-commerce",
    "ecommerce",
    "consumer",
    "d2c",
    "commerce"
  ],
  "edtech": [
    "edtech",
    "education",
    "e-learning",
    "learning",
    "software & saas",
    "saas",
    "software"
  ],
  "food processing": [
    "food processing",
    "food",
    "foods",
    "fmcg",
    "beverage",
    "agriculture",
    "agri"
  ],
  "manufacturing": [
    "manufacturing",
    "manufacturing & industrial",
    "industrial",
    "factory",
    "production"
  ]
};

const ROLE_ALIASES = {
  "founder & ceo": [
    "founder & ceo",
    "founder",
    "ceo",
    "chief executive",
    "head of global sales",
    "director of product management"
  ],
  "managing director": [
    "managing director",
    "md",
    "executive",
    "head of global sales",
    "vp of revenue operations"
  ],
  "cto": [
    "cto",
    "chief technology officer",
    "chief information officer",
    "cio",
    "engineering",
    "tech",
    "director of product management"
  ],
  "cfo": [
    "cfo",
    "chief financial officer",
    "finance",
    "financial"
  ],
  "vp sales": [
    "vp sales",
    "vp of sales",
    "sales",
    "head of global sales",
    "vp of revenue operations",
    "vp of sales & marketing",
    "director of demand generation"
  ],
  "head of procurement": [
    "head of procurement",
    "procurement",
    "purchasing",
    "supply",
    "vendor",
    "operations"
  ],
  "operations head": [
    "operations head",
    "operations",
    "revops",
    "vp of revenue operations",
    "coo",
    "director of product management"
  ],
  "marketing head": [
    "marketing head",
    "marketing",
    "demand generation",
    "director of demand generation",
    "vp of sales & marketing",
    "cmo",
    "growth"
  ]
};

const CITY_ALIASES = {
  "bengaluru": ["bengaluru", "bangalore", "karnataka"],
  "madurai": ["madurai", "tamil nadu", "tn"],
  "delhi ncr": ["delhi ncr", "delhi", "new delhi", "ncr", "gurgaon", "gurugram", "noida"],
  "kolkata": ["kolkata", "calcutta", "west bengal"],
  "hyderabad": ["hyderabad", "telangana"],
  "coimbatore": ["coimbatore", "tamil nadu", "tn"],
  "mumbai": ["mumbai", "bombay", "maharashtra"],
  "tiruchirappalli": ["tiruchirappalli", "trichy", "tamil nadu", "tn"],
  "pune": ["pune", "maharashtra"],
  "chennai": ["chennai", "madras", "tamil nadu", "tn"],
  "ahmedabad": ["ahmedabad", "gujarat"],
  "kochi": ["kochi", "cochin", "kerala"]
};

const EXPLICIT_CSV_INDUSTRIES = Object.keys(INDUSTRY_ALIASES);

function containsTerm(text = "", term = "") {
  const haystack = String(text || "").toLowerCase().trim();
  const needle = String(term || "").toLowerCase().trim();
  if (!haystack || !needle) return false;
  if (haystack === needle) return true;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(haystack);
}

export class ProspectService {
  /**
   * Match a prospect's industry against a list of target industries
   */
  static matchesIndustry(prospectIndustry = "", targetIndustries = []) {
    if (!Array.isArray(targetIndustries) || targetIndustries.length === 0) {
      return { matched: true, exact: false };
    }

    const pInd = prospectIndustry.toLowerCase().trim();
    const aliases = INDUSTRY_ALIASES[pInd] || [pInd];

    let matched = false;
    let exact = false;

    for (const rawTarget of targetIndustries) {
      const target = String(rawTarget || "").toLowerCase().trim();
      if (!target) continue;

      if (pInd === target || containsTerm(target, pInd) || containsTerm(pInd, target)) {
        matched = true;
        exact = true;
        break;
      }

      if (aliases.some(alias => target === alias || containsTerm(target, alias) || containsTerm(alias, target))) {
        matched = true;
      }
    }

    return { matched, exact };
  }

  /**
   * Extract explicit CSV industry keywords mentioned in company/product text
   */
  static extractIndustriesFromText(text = "") {
    const lower = String(text || "").toLowerCase();
    if (!lower.trim()) return [];

    const detected = new Set();
    for (const csvInd of EXPLICIT_CSV_INDUSTRIES) {
      if (containsTerm(lower, csvInd)) {
        detected.add(csvInd);
      }
    }
    return Array.from(detected);
  }

  /**
   * Match a prospect's location against target locations
   */
  static matchesLocation(prospect, targetLocations = []) {
    if (!Array.isArray(targetLocations) || targetLocations.length === 0) {
      return { matched: true, exactCity: false };
    }

    const city = (prospect.city || prospect.location || "").toLowerCase().trim();
    const country = (prospect.country || "india").toLowerCase().trim();
    const cityAliases = CITY_ALIASES[city] || [city];

    let matched = false;
    let exactCity = false;

    for (const rawLoc of targetLocations) {
      const l = String(rawLoc || "").toLowerCase().trim();
      if (!l) continue;

      // Exact city or state alias match
      if (
        city === l ||
        cityAliases.some(alias => l === alias || containsTerm(l, alias) || containsTerm(alias, l))
      ) {
        matched = true;
        exactCity = true;
        break;
      }

      // Country / Region / Global match
      if (
        containsTerm(l, "global") ||
        containsTerm(l, "worldwide") ||
        l === "all" ||
        containsTerm(l, "india") ||
        containsTerm(l, "apac") ||
        containsTerm(l, "asia") ||
        containsTerm(country, l)
      ) {
        matched = true;
      }
    }

    return { matched, exactCity };
  }

  /**
   * Match a prospect's company size/type against target customer types
   */
  static matchesCustomerType(prospect, targetCustomerTypes = []) {
    if (!Array.isArray(targetCustomerTypes) || targetCustomerTypes.length === 0) {
      return true;
    }

    const headcount = Number(prospect.company?.headcount) || 0;
    const size = (prospect.company?.size || "").toLowerCase();
    const industry = (prospect.company?.industry || "").toLowerCase();
    const intentSignal = (prospect.intentSignal || "").toLowerCase();

    return targetCustomerTypes.some(rawType => {
      const t = String(rawType || "").toLowerCase().trim();
      if (!t) return false;

      if (t.includes("enterprise") || t.includes("1,000") || t.includes("1000") || t.includes("large")) {
        return headcount >= 400 || size.includes("501") || size.includes("1000");
      }
      if (t.includes("mid-market") || t.includes("mid market") || t.includes("medium")) {
        return headcount >= 50 && headcount <= 500;
      }
      if (t.includes("smb") || t.includes("small")) {
        return headcount <= 120;
      }
      if (t.includes("early-stage") || t.includes("early stage")) {
        return headcount <= 60;
      }
      if (t.includes("growth") || t.includes("startup")) {
        return (headcount >= 25 && headcount <= 250) || intentSignal.includes("funded");
      }
      if (t.includes("saas") || t.includes("tech")) {
        return ["it services", "fintech", "edtech"].includes(industry);
      }
      if (t.includes("agenc") || t.includes("consult")) {
        return industry === "it services" || headcount <= 180;
      }
      if (t.includes("b2b")) {
        return true;
      }

      // Custom segment text check against industry or size
      return industry.includes(t) || size.includes(t);
    });
  }

  /**
   * Match a prospect's designation against target buyer roles
   */
  static matchesRole(prospectTitle = "", targetRoles = []) {
    if (!Array.isArray(targetRoles) || targetRoles.length === 0) {
      return { matched: true, exact: false };
    }

    const pTitle = prospectTitle.toLowerCase().trim();
    const aliases = ROLE_ALIASES[pTitle] || [pTitle];

    let matched = false;
    let exact = false;

    for (const rawRole of targetRoles) {
      const r = String(rawRole || "").toLowerCase().trim();
      if (!r) continue;

      if (pTitle === r || containsTerm(pTitle, r) || containsTerm(r, pTitle)) {
        matched = true;
        exact = true;
        break;
      }

      if (aliases.some(alias => r === alias || containsTerm(r, alias) || containsTerm(alias, r))) {
        matched = true;
      }
    }

    return { matched, exact };
  }

  /**
   * Search prospects with multi-parameter filtering + Excel ICP matching
   */
  static searchProspects(params = {}) {
    const {
      query = "",
      job_titles = [],
      seniority = [],
      departments = [],
      industries = [],
      company_size = [],
      locations = [],
      technologies = [],
      has_signals = false,
      is_unlocked = null,
      page = 1,
      limit = 100,
      sortBy = "relevance",
      icp_context = null // { companyName, description, productName, category, targetIndustries, targetRoles, targetLocations, targetCustomerTypes }
    } = params;

    let filtered = [...prospectStore];

    // Filter and score Excel prospects against company details & product details
    if (icp_context) {
      const explicitProductIndustries = this.extractIndustriesFromText(
        `${icp_context.productName || ""} ${icp_context.category || ""}`
      );
      const baseTargetIndustries = Array.isArray(icp_context.targetIndustries)
        ? icp_context.targetIndustries
        : [];
      const fallbackTextIndustries =
        baseTargetIndustries.length === 0
          ? this.extractIndustriesFromText(
              `${icp_context.companyName || ""} ${icp_context.description || ""} ${icp_context.productName || ""} ${icp_context.category || ""}`
            )
          : [];

      const effectiveTargetIndustries = Array.from(
        new Set([...baseTargetIndustries, ...explicitProductIndustries, ...fallbackTextIndustries])
      );
      const targetLocations = Array.isArray(icp_context.targetLocations)
        ? icp_context.targetLocations
        : [];
      const targetCustomerTypes = Array.isArray(icp_context.targetCustomerTypes)
        ? icp_context.targetCustomerTypes
        : [];
      const targetRoles = Array.isArray(icp_context.targetRoles)
        ? icp_context.targetRoles
        : [];

      const effectiveContext = {
        ...icp_context,
        effectiveTargetIndustries
      };

      const evaluated = filtered.map(p => {
        const evalResult = this.calculateIcpScore(p, effectiveContext);
        return {
          prospect: {
            ...p,
            icpScore: evalResult.score,
            icpReason: evalResult.reason
          },
          ...evalResult
        };
      });

      const hasIndustries = effectiveTargetIndustries.length > 0;
      const hasLocations = targetLocations.length > 0;
      const hasCustomerTypes = targetCustomerTypes.length > 0;
      const hasRoles = targetRoles.length > 0;
      const anyRoleMatchesInDataset =
        !hasRoles || evaluated.some(item => item.roleMatched);

      let matchedItems = evaluated.filter(item => {
        if (hasIndustries && !item.industryMatched) return false;
        if (hasLocations && !item.locationMatched) return false;
        if (hasCustomerTypes && !item.customerTypeMatched) return false;
        if (hasRoles && anyRoleMatchesInDataset && !item.roleMatched) return false;
        return true;
      });

      // Sort by ICP score descending, then active signals, then positive lead status
      const statusRank = {
        "Meeting Booked": 4,
        "Replied": 3,
        "New": 2,
        "Contacted": 1,
        "Not Interested": 0
      };

      matchedItems.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const sigDiff = (b.prospect.signals?.length || 0) - (a.prospect.signals?.length || 0);
        if (sigDiff !== 0) return sigDiff;
        return (statusRank[b.prospect.status] ?? 0) - (statusRank[a.prospect.status] ?? 0);
      });

      filtered = matchedItems.map(item => item.prospect);
    }

    // Text search query across name, company, title, industry, city, signal, status, tech stack
    if (query && query.trim() !== "") {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.fullName.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.company.name.toLowerCase().includes(q) ||
        p.company.industry.toLowerCase().includes(q) ||
        p.company.domain.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.intentSignal || "").toLowerCase().includes(q) ||
        (p.leadSource || "").toLowerCase().includes(q) ||
        (p.status || "").toLowerCase().includes(q) ||
        p.company.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by Job Titles
    if (Array.isArray(job_titles) && job_titles.length > 0) {
      filtered = filtered.filter(p => this.matchesRole(p.title, job_titles).matched);
    }

    // Filter by Seniority
    if (Array.isArray(seniority) && seniority.length > 0) {
      filtered = filtered.filter(p =>
        seniority.map(s => s.toLowerCase()).includes(p.seniority.toLowerCase())
      );
    }

    // Filter by Department
    if (Array.isArray(departments) && departments.length > 0) {
      filtered = filtered.filter(p =>
        departments.map(d => d.toLowerCase()).includes(p.department.toLowerCase())
      );
    }

    // Filter by Industry (supports exact Excel industry & UI dropdown labels)
    if (Array.isArray(industries) && industries.length > 0) {
      filtered = filtered.filter(p =>
        this.matchesIndustry(p.company.industry, industries).matched
      );
    }

    // Filter by Company Size
    if (Array.isArray(company_size) && company_size.length > 0) {
      filtered = filtered.filter(p =>
        company_size.includes(p.company.size)
      );
    }

    // Filter by Location / Country / City
    if (Array.isArray(locations) && locations.length > 0) {
      filtered = filtered.filter(p =>
        this.matchesLocation(p, locations).matched
      );
    }

    // Filter by Tech Stack
    if (Array.isArray(technologies) && technologies.length > 0) {
      filtered = filtered.filter(p =>
        technologies.some(tech =>
          p.company.techStack.some(t => t.toLowerCase() === tech.toLowerCase())
        )
      );
    }

    // Filter by Signals presence
    if (has_signals) {
      filtered = filtered.filter(p => p.signals && p.signals.length > 0);
    }

    // Filter by Unlock status
    if (is_unlocked !== null && is_unlocked !== undefined) {
      filtered = filtered.filter(p => p.contact.isUnlocked === is_unlocked);
    }

    // Total matched count
    const total = filtered.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(200, parseInt(limit, 10) || 100));
    const totalPages = Math.ceil(total / limitNum);

    // Apply pagination
    const offset = (pageNum - 1) * limitNum;
    const results = filtered.slice(offset, offset + limitNum);

    // Format prospects according to whether they are unlocked or masked
    const sanitizedResults = results.map(p => this.sanitizeProspect(p));

    return {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      prospects: sanitizedResults
    };
  }

  /**
   * Find prospect by ID
   */
  static getProspectById(id) {
    const prospect = prospectStore.find(p => p.id === id);
    if (!prospect) return null;
    return this.sanitizeProspect(prospect);
  }

  /**
   * Get raw prospect object (for internal services like enrichment)
   */
  static getRawProspectById(id) {
    return prospectStore.find(p => p.id === id) || null;
  }

  /**
   * Calculate smart ICP Match Score between an Excel prospect and Company/Product Profile
   */
  static calculateIcpScore(prospect, icpContext = {}) {
    let score = 45;
    const reasons = [];

    const {
      companyName = "",
      description = "",
      productName = "",
      category = "",
      targetIndustries = [],
      effectiveTargetIndustries = null,
      targetRoles = [],
      targetLocations = [],
      targetCustomerTypes = []
    } = icpContext;

    const industriesToCheck = Array.isArray(effectiveTargetIndustries)
      ? effectiveTargetIndustries
      : Array.isArray(targetIndustries)
      ? targetIndustries
      : [];

    const descLower = `${companyName} ${description} ${productName} ${category}`.toLowerCase();

    // 1. Target Industry Match (+20 / +24 pts)
    const indCheck = this.matchesIndustry(prospect.company.industry, industriesToCheck);
    if (industriesToCheck.length > 0 && indCheck.matched) {
      score += indCheck.exact ? 24 : 18;
      reasons.push(`Industry match (${prospect.company.industry})`);
    }

    // 2. Target Location Match (+10 / +14 pts)
    const locCheck = this.matchesLocation(prospect, targetLocations);
    if (Array.isArray(targetLocations) && targetLocations.length > 0 && locCheck.matched) {
      score += locCheck.exactCity ? 14 : 9;
      reasons.push(locCheck.exactCity ? `City match (${prospect.city})` : `Region match (${prospect.city}, India)`);
    }

    // 3. Target Customer Type / Company Size Match (+10 pts)
    const customerTypeMatched = this.matchesCustomerType(prospect, targetCustomerTypes);
    if (Array.isArray(targetCustomerTypes) && targetCustomerTypes.length > 0 && customerTypeMatched) {
      score += 10;
      reasons.push(`Size fit (${prospect.company.headcount} emp)`);
    }

    // 4. Target Role / Designation Match (+14 / +18 pts)
    const roleCheck = this.matchesRole(prospect.title, targetRoles);
    if (Array.isArray(targetRoles) && targetRoles.length > 0 && roleCheck.matched) {
      score += roleCheck.exact ? 18 : 13;
      reasons.push(`Buyer role (${prospect.title})`);
    } else if (!Array.isArray(targetRoles) || targetRoles.length === 0) {
      if (prospect.seniority === "c_level" || prospect.seniority === "vp") {
        score += 12;
        reasons.push(`Decision maker (${prospect.title})`);
      }
    }

    // 5. Intent Signal & Product Context Synergy (+8 pts)
    if (prospect.signals && prospect.signals.length > 0) {
      const topSig = prospect.signals[0];
      score += 7;
      if (
        (topSig.title.toLowerCase().includes("sales") && (descLower.includes("sales") || descLower.includes("crm"))) ||
        (topSig.title.toLowerCase().includes("tech") && (descLower.includes("automation") || descLower.includes("software") || descLower.includes("crm")))
      ) {
        score += 4;
      }
      reasons.push(topSig.title);
    }

    // 6. Lead Status Adjustment
    if (prospect.status === "Meeting Booked" || prospect.status === "Replied") {
      score += 4;
    } else if (prospect.status === "Not Interested") {
      score -= 6;
    }

    // Cap between 60 and 99
    score = Math.min(99, Math.max(60, score));

    return {
      score,
      reason: reasons.length > 0 ? reasons.slice(0, 3).join(" • ") : "Matched Excel prospect",
      industryMatched: indCheck.matched,
      industryExact: indCheck.exact,
      locationMatched: locCheck.matched,
      locationExactCity: locCheck.exactCity,
      customerTypeMatched,
      roleMatched: roleCheck.matched,
      roleExact: roleCheck.exact
    };
  }

  /**
   * Sanitize contact details if not unlocked yet
   */
  static sanitizeProspect(p) {
    const isUnlocked = p.contact.isUnlocked;

    return {
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName,
      fullName: p.fullName,
      title: p.title,
      seniority: p.seniority,
      department: p.department,
      city: p.city,
      location: p.location,
      country: p.country,
      linkedinUrl: p.linkedinUrl,
      bio: p.bio,
      leadSource: p.leadSource,
      intentSignal: p.intentSignal,
      status: p.status,
      company: p.company,
      signals: p.signals,
      crmStatus: p.crmStatus,
      icpScore: p.icpScore || 85,
      icpReason: p.icpReason || "Matched Excel Prospect",
      contact: {
        isUnlocked,
        emailStatus: p.contact.emailStatus,
        deliverabilityScore: p.contact.deliverabilityScore,
        phoneStatus: p.contact.phoneStatus,
        phoneType: p.contact.phoneType,
        workEmail: isUnlocked
          ? p.contact.workEmail
          : this.maskEmail(p.contact.workEmail),
        phone: isUnlocked
          ? p.contact.phone
          : this.maskPhone(p.contact.phone)
      }
    };
  }

  static maskEmail(email) {
    if (!email) return null;
    const [user, domain] = email.split("@");
    if (!domain) return "e***@***.com";
    const visibleUser = user.length > 2 ? `${user.slice(0, 2)}***` : `${user[0]}***`;
    return `${visibleUser}@${domain}`;
  }

  static maskPhone(phone) {
    if (!phone) return null;
    const clean = String(phone).trim();
    if (clean.length <= 5) return clean + "*****";
    return clean.slice(0, 5) + "*****";
  }
}
