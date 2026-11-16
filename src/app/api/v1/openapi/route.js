import { NextResponse } from "next/server";

export async function GET() {
  const openApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "Prospecting Hub API (LeadIQ Architecture)",
      version: "1.0.0",
      description: "Standalone B2B Prospecting, Waterfall Enrichment, Buying Signals, and AI Scribe API for CRM integration."
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local Development Server"
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "API_KEY"
        }
      }
    },
    security: [{ BearerAuth: [] }],
    paths: {
      "/prospects/search": {
        post: {
          summary: "Search & filter prospective leads",
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    query: { type: "string" },
                    job_titles: { type: "array", items: { type: "string" } },
                    seniority: { type: "array", items: { type: "string" } },
                    industries: { type: "array", items: { type: "string" } },
                    company_size: { type: "array", items: { type: "string" } },
                    locations: { type: "array", items: { type: "string" } },
                    technologies: { type: "array", items: { type: "string" } },
                    has_signals: { type: "boolean" },
                    page: { type: "integer", default: 1 },
                    limit: { type: "integer", default: 20 }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Filtered list of prospects" }
          }
        }
      },
      "/prospects/{id}": {
        get: {
          summary: "Get prospect details by ID",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            200: { description: "Prospect details" },
            404: { description: "Prospect not found" }
          }
        }
      },
      "/prospects/enrich": {
        post: {
          summary: "Waterfall contact enrichment (unlock emails & direct dial phones)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    prospect_id: { type: "string" },
                    prospect_ids: { type: "array", items: { type: "string" } },
                    requested_fields: { type: "array", items: { type: "string" } }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "Enrichment and verification results" }
          }
        }
      },
      "/signals": {
        get: {
          summary: "List actionable buying signals and triggers",
          parameters: [
            { name: "type", in: "query", schema: { type: "string" } },
            { name: "weight", in: "query", schema: { type: "string" } },
            { name: "company_id", in: "query", schema: { type: "string" } },
            { name: "limit", in: "query", schema: { type: "integer" } }
          ],
          responses: {
            200: { description: "List of buying signals" }
          }
        }
      },
      "/ai/scribe": {
        post: {
          summary: "Generate context-aware cold outreach emails (LeadIQ Scribe)",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["prospect_id"],
                  properties: {
                    prospect_id: { type: "string" },
                    product_name: { type: "string" },
                    value_proposition: { type: "string" },
                    sender_name: { type: "string" },
                    sender_title: { type: "string" },
                    tone: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "3 personalized outreach angles" }
          }
        }
      },
      "/crm/push": {
        post: {
          summary: "Push enriched prospect into CRM with duplicate detection",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    prospect_id: { type: "string" },
                    target_entity: { type: "string", enum: ["Lead", "Contact"], default: "Lead" },
                    assigned_owner: { type: "string" },
                    deduplication_strategy: { type: "string", enum: ["skip_if_exists", "update_existing", "force_create"] },
                    webhook_url: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: "CRM Record created or updated" }
          }
        }
      }
    }
  };

  return NextResponse.json(openApiSpec);
}

