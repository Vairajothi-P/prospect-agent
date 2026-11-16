# Prospecting Hub Service (`prospect-agent`)

> Autonomous B2B Prospecting Engine, Waterfall Contact Enrichment, Buying Signals, and AI Scribe Service designed for seamless integration into any CRM product (modeled after [LeadIQ Prospecting Hub](https://leadiq.com/prospecting-hub)).

---

## 🌟 Key Features

1. **Prospect Discovery Engine (`POST /api/v1/prospects/search`)**
   - Multi-criteria filtering: Job title, seniority (C-Level, VP, Director), industry, company headcount, revenue, location, and technology stack.
2. **Waterfall Contact Enrichment (`POST /api/v1/prospects/enrich`)**
   - Cascading verification protocol (B2B registry &rarr; MX handshake &rarr; SMTP port 25 ping &rarr; Telco carrier type check).
   - Delivers deliverable work emails (with % confidence score) and verified direct-dial mobile phone numbers.
   - Batch enrichment ("Unlock All") support.
3. **Buying Signals & Trigger Tracking (`GET /api/v1/signals`)**
   - Real-time trigger tracking: Job changes (past champions moving to target accounts), executive promotions, funding announcements, and hiring surges.
4. **LeadIQ "Scribe" AI Outreach Copilot (`POST /api/v1/ai/scribe`)**
   - Generates hyper-personalized cold outreach emails across 3 distinct angles:
     - *Event Trigger & Congratulatory Angle* (highest conversion)
     - *Pain-Point & RevOps Friction Angle*
     - *Peer Benchmark & Tech Stack Angle*
   - Includes subject lines, full email body, and 300-character LinkedIn InMail snippets.
5. **CRM Push Bridge & Deduplication (`POST /api/v1/crm/push`)**
   - Direct sync into your CRM database as `Lead` or `Contact`.
   - Built-in deduplication check (matching on email or domain) to avoid duplicate entries.
   - Asynchronous Webhook notifications support.
6. **Drop-in Client SDK (`src/sdk/prospect-client.js`)**
   - Zero-dependency client library that your CRM developers can copy directly into their CRM backend or frontend to execute actions in 3 lines of code.

---

## 🚀 Getting Started

### 1. Start the Prospecting Hub Service:
```bash
npm install
npm run dev
```

* **Interactive Hub & API Sandbox:** Open [http://localhost:3000](http://localhost:3000)
* **OpenAPI Specification:** [http://localhost:3000/api/v1/openapi](http://localhost:3000/api/v1/openapi)

### 2. Run Automated Verification Tests:
```bash
npm test
```

---

## 📚 Detailed Documentation & Integration Guide

For full cURL examples, request/response schemas, and SDK documentation, see [INTEGRATION_GUIDE.md](file:///D:/PiBi/prospect-agent/INTEGRATION_GUIDE.md).
