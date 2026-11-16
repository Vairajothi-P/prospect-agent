import { prospectStore } from "../data/prospectsData.js";

export class SignalService {
  /**
   * Get all active buying signals across prospects and companies
   */
  static getSignals(params = {}) {
    const {
      type = null,
      weight = null,
      company_id = null,
      limit = 20
    } = params;

    let allSignals = [];

    for (const prospect of prospectStore) {
      if (prospect.signals && prospect.signals.length > 0) {
        for (const sig of prospect.signals) {
          allSignals.push({
            id: sig.id,
            type: sig.type,
            title: sig.title,
            description: sig.description,
            date: sig.date,
            weight: sig.weight,
            prospect: {
              id: prospect.id,
              fullName: prospect.fullName,
              title: prospect.title,
              location: prospect.location,
              isUnlocked: prospect.contact.isUnlocked
            },
            company: {
              id: prospect.company.id,
              name: prospect.company.name,
              domain: prospect.company.domain,
              industry: prospect.company.industry,
              size: prospect.company.size,
              funding: prospect.company.funding
            },
            recommendedAction: this.getRecommendedAction(sig.type, prospect)
          });
        }
      }
    }

    // Filter by type if requested
    if (type) {
      allSignals = allSignals.filter(s => s.type.toLowerCase() === type.toLowerCase());
    }

    // Filter by weight if requested ('critical', 'high', 'medium')
    if (weight) {
      allSignals = allSignals.filter(s => s.weight.toLowerCase() === weight.toLowerCase());
    }

    // Filter by company if requested
    if (company_id) {
      allSignals = allSignals.filter(s => s.company.id === company_id);
    }

    // Sort by date descending (newest first)
    allSignals.sort((a, b) => new Date(b.date) - new Date(a.date));

    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const paginated = allSignals.slice(0, limitNum);

    return {
      success: true,
      total: allSignals.length,
      signals: paginated
    };
  }

  static getRecommendedAction(signalType, prospect) {
    switch (signalType) {
      case "job_change":
        return `Congratulate ${prospect.firstName} on their recent transition and pitch your CRM before their tech stack is finalized.`;
      case "funding":
        return `Reach out regarding budget allocation for scaling commercial operations post-fundraise.`;
      case "hiring_spree":
        return `Offer automated sales rep onboarding and CRM workflow standardization to support new hires.`;
      case "tech_install":
        return `Position your solution as the easiest native complement to their newly deployed software stack.`;
      case "expansion":
        return `Introduce multi-region pipeline reporting and cross-border currency/territory support.`;
      default:
        return `Engage with context-aware cold outreach.`;
    }
  }
}
