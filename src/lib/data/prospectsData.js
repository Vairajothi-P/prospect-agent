import fs from "fs";
import path from "path";

// Parse a single CSV line handling optional quoted values
function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function mapSeniority(designation = "") {
  const d = designation.toLowerCase();
  if (
    d.includes("ceo") ||
    d.includes("founder") ||
    d.includes("cto") ||
    d.includes("cfo") ||
    d.includes("cio") ||
    d.includes("managing director") ||
    d.includes("chief")
  ) {
    return "c_level";
  }
  if (d.includes("vp") || d.includes("vice president")) {
    return "vp";
  }
  return "director";
}

function mapDepartment(designation = "") {
  const d = designation.toLowerCase();
  if (d.includes("sales")) return "sales";
  if (d.includes("marketing")) return "marketing";
  if (d.includes("cto") || d.includes("tech") || d.includes("engineering")) return "engineering";
  if (d.includes("cfo") || d.includes("finance")) return "finance";
  if (d.includes("operations") || d.includes("procurement")) return "operations";
  return "executive";
}

function mapCompanySize(employeeCount) {
  const count = Number(employeeCount) || 0;
  if (count <= 50) return "11-50";
  if (count <= 200) return "51-200";
  if (count <= 500) return "201-500";
  return "501-1000";
}

function getDefaultTechStack(industry = "") {
  const ind = industry.toLowerCase();
  if (ind.includes("it services") || ind.includes("edtech")) {
    return ["AWS", "React", "HubSpot", "Jira", "Slack"];
  }
  if (ind.includes("fintech")) {
    return ["AWS", "Salesforce", "PostgreSQL", "Razorpay", "Slack"];
  }
  if (ind.includes("healthcare") || ind.includes("pharma")) {
    return ["SAP", "Salesforce", "Microsoft 365", "Oracle"];
  }
  if (ind.includes("logistics") || ind.includes("auto") || ind.includes("manufacturing")) {
    return ["SAP ERP", "Zoho CRM", "Microsoft 365", "Tableau"];
  }
  if (ind.includes("retail") || ind.includes("food") || ind.includes("textiles")) {
    return ["Shopify", "Zoho CRM", "Tally", "WhatsApp Business"];
  }
  if (ind.includes("real estate")) {
    return ["Salesforce", "Zoho CRM", "Google Workspace", "Power BI"];
  }
  return ["Zoho CRM", "Microsoft 365", "Tally"];
}

function mapSignal(intentSignal, companyId, companyName, industry, city, leadSource, index) {
  const sig = (intentSignal || "").trim();
  if (!sig || sig.toLowerCase() === "no recent signal") {
    return [];
  }

  const s = sig.toLowerCase();
  let type = "expansion";
  let weight = "medium";

  if (s.includes("funded") || s.includes("funding")) {
    type = "funding";
    weight = "high";
  } else if (s.includes("leadership")) {
    type = "job_change";
    weight = "high";
  } else if (s.includes("hiring")) {
    type = "hiring_spree";
    weight = "high";
  } else if (s.includes("tech stack")) {
    type = "tech_install";
    weight = "high";
  } else if (s.includes("launched new product")) {
    type = "expansion";
    weight = "high";
  } else if (s.includes("office expansion")) {
    type = "expansion";
    weight = "medium";
  }

  const day = String(1 + (index % 18)).padStart(2, "0");

  return [
    {
      id: `sig_${companyId}`,
      type,
      title: sig,
      description: `${companyName} (${industry}, ${city}) — ${sig}. Lead Source: ${leadSource}.`,
      date: `2026-11-${day}`,
      weight
    }
  ];
}

function loadProspectsFromCsv() {
  const csvPath = path.join(process.cwd(), "src", "lib", "data", "prospects.csv");
  const rawContent = fs.readFileSync(csvPath, "utf-8");
  const lines = rawContent
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const prospects = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length < headers.length) continue;

    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? "";
    });

    const companyId = row["Company ID"];
    const companyName = row["Company Name"];
    const industry = row["Industry"];
    const city = row["City"];
    const employeeCount = parseInt(row["Employee Count"], 10) || 0;
    const website = row["Website"];
    const domain = website.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
    const contactPerson = row["Contact Person"];
    const nameParts = contactPerson.split(/\s+/).filter(Boolean);
    const firstName = nameParts[0] || contactPerson;
    const lastName = nameParts.slice(1).join(" ") || firstName;
    const designation = row["Designation"];
    const email = row["Email"];
    const phone = row["Phone"];
    const leadSource = row["Lead Source"];
    const intentSignal = row["Intent Signal"];
    const status = row["Status"];

    const slug = contactPerson
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const signals = mapSignal(
      intentSignal,
      companyId,
      companyName,
      industry,
      city,
      leadSource,
      i
    );

    const isRecentlyFunded = intentSignal.toLowerCase().includes("recently funded");

    prospects.push({
      id: companyId,
      firstName,
      lastName,
      fullName: contactPerson,
      title: designation,
      seniority: mapSeniority(designation),
      department: mapDepartment(designation),
      city,
      location: `${city}, India`,
      country: "India",
      linkedinUrl: `https://linkedin.com/in/${slug}-${companyId.toLowerCase()}`,
      bio: `${designation} at ${companyName} (${industry}) in ${city}. Lead Source: ${leadSource} • Status: ${status}.`,
      leadSource,
      intentSignal,
      status,
      company: {
        id: companyId,
        name: companyName,
        domain,
        website,
        industry,
        size: mapCompanySize(employeeCount),
        headcount: employeeCount,
        annualRevenue: null,
        headquarters: `${city}, India`,
        techStack: getDefaultTechStack(industry),
        funding: isRecentlyFunded
          ? {
              stage: "Recently Funded",
              amount: "Active Round",
              date: "2026-11-01",
              leadInvestor: "Growth Capital"
            }
          : null
      },
      contact: {
        workEmail: email,
        emailStatus: "verified",
        deliverabilityScore: 92 + (i % 8),
        phone,
        phoneType: "Direct Mobile",
        phoneStatus: "valid",
        isUnlocked: false
      },
      signals,
      crmStatus: {
        isSynced: false,
        syncedLeadId: null,
        syncedAt: null
      }
    });
  }

  return prospects;
}

export const INITIAL_PROSPECTS = loadProspectsFromCsv();

// In-memory runtime state (allows unlocking contacts, syncing to CRM, and adding notes)
export let prospectStore = JSON.parse(JSON.stringify(INITIAL_PROSPECTS));

// Reset store to initial state if needed
export function resetProspectStore() {
  prospectStore = JSON.parse(JSON.stringify(INITIAL_PROSPECTS));
  return prospectStore;
}
