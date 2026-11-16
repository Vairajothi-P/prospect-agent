# CRM Integration Guide: Standalone Prospecting Hub

This guide explains how to connect your CRM platform to this standalone **Prospecting Hub Service (`prospect-agent`)**, modeled after [LeadIQ Prospecting Hub](https://leadiq.com/prospecting-hub).

---

## 1. Quickstart & Service Run

### Start the Service:
```bash
npm install
npm run dev
```
The Prospecting Hub API will be live at `http://localhost:3000`.  
The interactive testing dashboard is accessible at `http://localhost:3000/`.

---

## 2. Authentication

All requests to `/api/v1/*` must include the Bearer API Key header:
```http
Authorization: Bearer phub_live_sec_9942a1b7e
```
*(You can also set custom keys using the `PROSPECT_API_KEY` environment variable).*

---

## 3. Drop-in JavaScript / TypeScript SDK

We have included a zero-dependency client SDK at `src/sdk/prospect-client.js`. You can directly copy this file into your CRM project.

### Example in Your CRM:
```javascript
import { ProspectClient } from './src/sdk/prospect-client.js';

const prospectHub = new ProspectClient({
  baseUrl: 'http://localhost:3000/api/v1',
  apiKey: 'phub_live_sec_9942a1b7e'
});

// 1. Search Prospects
const { prospects } = await prospectHub.searchProspects({
  job_titles: ['VP of Sales', 'Chief Technology Officer'],
  industries: ['Software & SaaS'],
  seniority: ['vp', 'c_level']
});

// 2. Waterfall Unlock Email & Phone
const enriched = await prospectHub.enrichProspect(prospects[0].id);
console.log('Verified Email:', enriched.data.contact.workEmail.email);
console.log('Mobile Phone:', enriched.data.contact.directPhone.number);

// 3. Generate Personalized Cold Outreach (LeadIQ Scribe)
const scribePitch = await prospectHub.generateScribePitch(prospects[0].id, {
  product_name: 'NextGen CRM',
  value_proposition: 'Eliminates 80% of manual data entry for sales reps.'
});

// 4. Push to CRM with Duplicate Prevention
const syncResult = await prospectHub.pushToCrm({
  prospect_id: prospects[0].id,
  target_entity: 'Lead',
  deduplication_strategy: 'skip_if_exists'
});
console.log('CRM Sync Result:', syncResult.message);
```

---

## 4. REST API Endpoints Reference

### 4.1. Prospect Discovery
* **`POST /api/v1/prospects/search`**
```bash
curl -X POST http://localhost:3000/api/v1/prospects/search \
  -H "Authorization: Bearer phub_live_sec_9942a1b7e" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "RevOps",
    "seniority": ["vp"],
    "industries": ["Software & SaaS"]
  }'
```

### 4.2. Waterfall Enrichment
* **`POST /api/v1/prospects/enrich`**
```bash
curl -X POST http://localhost:3000/api/v1/prospects/enrich \
  -H "Authorization: Bearer phub_live_sec_9942a1b7e" \
  -H "Content-Type: application/json" \
  -d '{
    "prospect_id": "prsp_001"
  }'
```

### 4.3. Buying Signals & Triggers
* **`GET /api/v1/signals`**
```bash
curl http://localhost:3000/api/v1/signals \
  -H "Authorization: Bearer phub_live_sec_9942a1b7e"
```

### 4.4. AI Scribe Outreach Copilot
* **`POST /api/v1/ai/scribe`**
```bash
curl -X POST http://localhost:3000/api/v1/ai/scribe \
  -H "Authorization: Bearer phub_live_sec_9942a1b7e" \
  -H "Content-Type: application/json" \
  -d '{
    "prospect_id": "prsp_001",
    "product_name": "NextGen CRM",
    "value_proposition": "Automates sales pipeline and leads enrichment."
  }'
```

### 4.5. CRM Sync & Push
* **`POST /api/v1/crm/push`**
```bash
curl -X POST http://localhost:3000/api/v1/crm/push \
  -H "Authorization: Bearer phub_live_sec_9942a1b7e" \
  -H "Content-Type: application/json" \
  -d '{
    "prospect_id": "prsp_001",
    "target_entity": "Lead",
    "deduplication_strategy": "skip_if_exists"
  }'
```

---

## 5. OpenAPI Specification

You can import the full OpenAPI 3.0 specification directly into Postman, Swagger UI, or Insomnia:
* `GET http://localhost:3000/api/v1/openapi`

