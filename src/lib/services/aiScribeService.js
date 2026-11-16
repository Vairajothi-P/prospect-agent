import { ProspectService } from "./prospectService.js";

export class AiScribeService {
  /**
   * Generate hyper-personalized sales outreach emails (LeadIQ Scribe equivalent)
   */
  static async generatePitch(prospectId, options = {}) {
    const rawProspect = ProspectService.getRawProspectById(prospectId);
    if (!rawProspect) {
      return { success: false, error: `Prospect with ID ${prospectId} not found.` };
    }

    const {
      productName = "SmartCRM",
      valueProp = "Automate 80% of sales data entry and sync enriched leads directly to your pipeline.",
      senderName = "[Your Name]",
      senderTitle = "Account Executive",
      tone = "conversational"
    } = options;

    const firstName = rawProspect.firstName;
    const title = rawProspect.title;
    const companyName = rawProspect.company.name;
    const industry = rawProspect.company.industry;
    const topSignal = rawProspect.signals && rawProspect.signals[0] ? rawProspect.signals[0] : null;

    // Check if an external LLM key is configured (e.g., GEMINI_API_KEY)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const liveAiTemplates = await this.callGeminiApi({
          geminiKey,
          prospect: rawProspect,
          productName,
          valueProp,
          senderName,
          senderTitle
        });
        if (liveAiTemplates && liveAiTemplates.length > 0) {
          return {
            success: true,
            provider: "gemini-live-ai",
            prospect: {
              id: rawProspect.id,
              name: rawProspect.fullName,
              title,
              company: companyName
            },
            templates: liveAiTemplates
          };
        }
      } catch (err) {
        console.warn("Live LLM generation fallback triggered:", err.message);
      }
    }

    // Contextual High-Quality Heuristic Engine (Offline / Instant fallback)
    const templates = [
      {
        id: "tpl_trigger",
        name: "Event Trigger & Congratulatory Angle",
        badge: "Highest Response Rate (38%)",
        subject: topSignal && topSignal.type === "job_change"
          ? `Congrats on the ${title} role, ${firstName} + scaling ${companyName}`
          : topSignal && topSignal.type === "funding"
          ? `Congrats on ${companyName}'s recent raise, ${firstName}`
          : `Quick question regarding ${companyName}'s ${industry} roadmap`,
        body: `Hi ${firstName},\n\n${
          topSignal
            ? `Noticed that ${topSignal.description.toLowerCase()}—congratulations!`
            : `Came across your leadership profile heading up ${title} at ${companyName}.`
        }\n\nUsually when scaling teams in ${industry}, keeping sales pipelines clean without bogging down reps with manual data entry becomes a major hurdle.\n\nAt ${productName}, we help teams like yours ${valueProp.toLowerCase()}\n\nWould you be open to a 10-minute chat next Tuesday or Thursday to see how we compare to your current workflow?\n\nBest regards,\n${senderName}\n${senderTitle}`,
        linkedInSnippet: `Hi ${firstName}, congratulations on ${
          topSignal ? topSignal.title.toLowerCase() : "the exciting work at " + companyName
        }! We recently built ${productName} to ${valueProp.toLowerCase()} Would love to connect and share a quick benchmark.`,
        confidenceScore: 95
      },
      {
        id: "tpl_painpoint",
        name: "Pain-Point & RevOps Friction Angle",
        badge: "Direct Value Pitch",
        subject: `Solving CRM data hygiene for ${companyName}'s reps`,
        body: `Hi ${firstName},\n\nManaging pipeline visibility at ${companyName} (${rawProspect.company.size} employees) often means dealing with outdated contacts, missing phone numbers, and reps spending 4+ hours a week on admin.\n\n${productName} was designed to bridge this exact gap: ${valueProp}\n\nAre you available for a brief 10-minute demo this week to see how teams in ${industry} eliminated manual contact research?\n\nCheers,\n${senderName}`,
        linkedInSnippet: `Hi ${firstName}, noticed your work leading ${title} at ${companyName}. Are your reps spending too much time researching leads? We automated this at ${productName}. Let's connect!`,
        confidenceScore: 91
      },
      {
        id: "tpl_socialproof",
        name: "Peer Benchmark & Tech Stack Angle",
        badge: "Credibility Focus",
        subject: `${companyName} + ${rawProspect.company.techStack.slice(0, 2).join(" & ")} integration`,
        body: `Hi ${firstName},\n\nI saw that ${companyName} is actively running ${rawProspect.company.techStack.slice(0, 2).join(" and ")}.\n\nWe recently partnered with similar high-growth teams in ${industry} to automate direct prospect enrichment and push verified leads straight into their CRM in 1 click.\n\nCould I send over a 2-minute video walkthrough showing how this works alongside your current stack?\n\nBest,\n${senderName}\n${senderTitle}`,
        linkedInSnippet: `Hi ${firstName}, loved seeing ${companyName}'s growth. Since you're running ${rawProspect.company.techStack[0]}, thought you might find our latest integration benchmark interesting. Open to connecting?`,
        confidenceScore: 89
      }
    ];

    return {
      success: true,
      provider: "contextual-heuristic-engine",
      prospect: {
        id: rawProspect.id,
        name: rawProspect.fullName,
        title,
        company: companyName
      },
      templates
    };
  }

  static async callGeminiApi({ geminiKey, prospect, productName, valueProp, senderName, senderTitle }) {
    const prompt = `You are a world-class B2B SaaS outbound sales copywriter like LeadIQ Scribe.
Write 3 personalized cold email variations for:
Prospect: ${prospect.fullName}, ${prospect.title} at ${prospect.company.name} (${prospect.company.industry}, ${prospect.company.size} employees).
Signals: ${JSON.stringify(prospect.signals || [])}
Our Product: ${productName}
Our Value Proposition: ${valueProp}
Sender: ${senderName}, ${senderTitle}

Format as a strict JSON array of objects with keys:
"name", "subject", "body", "linkedInSnippet", "confidenceScore"`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(text);
  }
}
