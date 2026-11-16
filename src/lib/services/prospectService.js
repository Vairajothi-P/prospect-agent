import { prospectStore } from "../data/prospectsData.js";

export class ProspectService {
  /**
   * Search prospects with multi-parameter filtering
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
      limit = 20,
      sortBy = "relevance",
      icp_context = null // { companyName, description, productName, category, targetIndustries, targetRoles }
    } = params;

    let filtered = [...prospectStore];

    // Compute dynamic ICP fit score if company context is provided
    if (icp_context) {
      filtered = filtered.map(p => {
        const { score, reason } = this.calculateIcpScore(p, icp_context);
        return {
          ...p,
          icpScore: score,
          icpReason: reason
        };
      });

      // Sort by ICP score descending
      filtered.sort((a, b) => (b.icpScore || 0) - (a.icpScore || 0));
    }

    // Text search query across name, company, title, tech stack
    if (query && query.trim() !== "") {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.fullName.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.company.name.toLowerCase().includes(q) ||
        p.company.domain.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.company.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by Job Titles
    if (Array.isArray(job_titles) && job_titles.length > 0) {
      filtered = filtered.filter(p =>
        job_titles.some(title => p.title.toLowerCase().includes(title.toLowerCase()))
      );
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

    // Filter by Industry
    if (Array.isArray(industries) && industries.length > 0) {
      filtered = filtered.filter(p =>
        industries.some(ind => p.company.industry.toLowerCase().includes(ind.toLowerCase()))
      );
    }

    // Filter by Company Size
    if (Array.isArray(company_size) && company_size.length > 0) {
      filtered = filtered.filter(p =>
        company_size.includes(p.company.size)
      );
    }

    // Filter by Location / Country
    if (Array.isArray(locations) && locations.length > 0) {
      filtered = filtered.filter(p =>
        locations.some(loc =>
          p.location.toLowerCase().includes(loc.toLowerCase()) ||
          p.country.toLowerCase().includes(loc.toLowerCase())
        )
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
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
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
   * Calculate smart ICP Match Score between a prospect and the onboarding Company Profile
   */
  static calculateIcpScore(prospect, icpContext = {}) {
    let score = 50; // Base score
    const reasons = [];

    const {
      companyName = "",
      description = "",
      productName = "",
      category = "",
      targetIndustries = [],
      targetRoles = [],
      targetLocations = [],
      targetCustomerTypes = []
    } = icpContext;

    const descLower = (description + " " + productName + " " + category).toLowerCase();

    // 1. Target Industry Match (+20 pts)
    const combinedIndustries = Array.isArray(targetIndustries) ? targetIndustries : [];
    if (combinedIndustries.length > 0) {
      if (combinedIndustries.some(ind => prospect.company.industry.toLowerCase().includes(ind.toLowerCase()))) {
        score += 20;
        reasons.push(`Target industry (${prospect.company.industry})`);
      }
    } else if (descLower.includes("saas") || descLower.includes("crm") || descLower.includes("automation")) {
      if (prospect.company.industry.toLowerCase().includes("software") || prospect.company.industry.toLowerCase().includes("tech")) {
        score += 20;
        reasons.push("Software/SaaS alignment");
      }
    }

    // 2. Target Location Match (+10 pts)
    if (Array.isArray(targetLocations) && targetLocations.length > 0) {
      const locMatch = targetLocations.some(loc => {
        const l = loc.toLowerCase();
        if (l.includes("global") || l.includes("worldwide")) return true;
        if (l.includes("north america") || l.includes("us") || l.includes("usa") || l.includes("united states")) {
          return (prospect.country || "").toLowerCase().includes("united states") || (prospect.location || "").toLowerCase().includes("usa") || (prospect.location || "").toLowerCase().includes("texas") || (prospect.location || "").toLowerCase().includes("california") || (prospect.location || "").toLowerCase().includes("new york");
        }
        if (l.includes("europe") || l.includes("emea") || l.includes("uk") || l.includes("kingdom")) {
          return (prospect.country || "").toLowerCase().includes("kingdom") || (prospect.location || "").toLowerCase().includes("london") || (prospect.location || "").toLowerCase().includes("berlin") || (prospect.country || "").toLowerCase().includes("germany");
        }
        return (prospect.country || "").toLowerCase().includes(l) || (prospect.location || "").toLowerCase().includes(l);
      });
      if (locMatch) {
        score += 10;
        reasons.push(`Target location match (${prospect.country || prospect.location})`);
      }
    }

    // 3. Target Customer Type / Company Size Match (+10 pts)
    if (Array.isArray(targetCustomerTypes) && targetCustomerTypes.length > 0) {
      const typeMatch = targetCustomerTypes.some(type => {
        const t = type.toLowerCase();
        if (t.includes("saas") && prospect.company.industry.toLowerCase().includes("saas")) return true;
        if (t.includes("enterprise") && (prospect.company.headcount >= 500 || prospect.company.size.includes("500") || prospect.company.size.includes("1000"))) return true;
        if (t.includes("mid-market") && (prospect.company.headcount >= 50 && prospect.company.headcount <= 500)) return true;
        if (t.includes("startup") && prospect.company.funding) return true;
        return false;
      });
      if (typeMatch) {
        score += 10;
        reasons.push(`Target customer segment match (${prospect.company.size} emp)`);
      }
    }

    // 4. Target Role / Seniority Match (+15 pts)
    if (Array.isArray(targetRoles) && targetRoles.length > 0) {
      if (targetRoles.some(role => prospect.title.toLowerCase().includes(role.toLowerCase()))) {
        score += 15;
        reasons.push(`High-intent buyer role (${prospect.title})`);
      }
    } else if (prospect.seniority === "vp" || prospect.seniority === "c_level") {
      score += 15;
      reasons.push(`Key decision maker (${prospect.title})`);
    }

    // 5. Tech Stack Synergy (+10 pts)
    const crmTechs = ["salesforce", "hubspot", "freshworks", "crm"];
    const hasCrmStack = prospect.company.techStack.some(t => crmTechs.includes(t.toLowerCase()));
    if (hasCrmStack) {
      score += 10;
      reasons.push(`Currently running ${prospect.company.techStack.slice(0, 2).join(", ")}`);
    }

    // 6. Buying Signal Alignment (+8 pts)
    if (prospect.signals && prospect.signals.length > 0) {
      const topSig = prospect.signals[0];
      score += 8;
      reasons.push(topSig.title);
    }

    // Cap between 65 and 99
    score = Math.min(99, Math.max(65, score));

    return {
      score,
      reason: reasons.length > 0 ? reasons.slice(0, 2).join(" • ") : "High potential B2B fit"
    };
  }

  /**
   * Sanitize contact details if not unlocked yet (mimicking LeadIQ's locked/unlocked state)
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
      location: p.location,
      country: p.country,
      linkedinUrl: p.linkedinUrl,
      bio: p.bio,
      company: p.company,
      signals: p.signals,
      crmStatus: p.crmStatus,
      icpScore: p.icpScore || 90,
      icpReason: p.icpReason || "Target Buyer Profile",
      contact: {
        isUnlocked,
        emailStatus: p.contact.emailStatus,
        deliverabilityScore: p.contact.deliverabilityScore,
        phoneStatus: p.contact.phoneStatus,
        phoneType: p.contact.phoneType,
        // If unlocked, reveal actual values; if locked, show masked preview
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
    return phone.slice(0, 5) + "-***-****";
  }
}
