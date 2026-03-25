# Section 9: Tutorials

**Question this section answers:** "Show me a complete, real example"

**Audience:** Developer who wants to follow along and build something end-to-end. Has basic knowledge from Get Started.

**Tone:** Narrative, step-by-step, encouraging. Each tutorial is a 30–45 minute guided experience. Include "what you'll build" and "what you'll learn" at the top.

**Key rule:** Tutorials ≠ Develop. Develop pages are 3-minute handbook lookups. Tutorials are 30-minute follow-along narratives. Different content types entirely.

**Note:** AI tutorials live in GenAI section, not here.

---

## Tutorial Template

Every tutorial follows this structure:

```markdown
---
title: "<Tutorial Title>"
description: "<What you'll build in one sentence>"
---

# <Tutorial Title>

<One paragraph: what you'll build and why it's useful.>

**What you'll learn:**
- Skill 1
- Skill 2
- Skill 3

**Time:** ~30 minutes

**Prerequisites:**
- WSO2 Integrator installed
- <Any accounts/services needed>

## What You'll Build

<Architecture diagram or description of the final system.>

## Step 1: <First step>

<Detailed instructions with code and explanations.>

## Step 2: <Second step>

...

## Step N: Test It

<How to verify the integration works.>

## Summary

<What you built, what you learned, what to explore next.>

## What's Next

- [Related tutorial](link) — description
- [Develop page for deep dive](link) — description
```

---

## Walkthroughs (10 tutorials)

### Salesforce ↔ Database Sync

**File:** `en/docs/tutorials/salesforce-db-sync.md`
**Status:** EXISTS — review and enhance

**What to build:** Bi-directional sync between Salesforce contacts and a MySQL database. When a contact is created/updated in Salesforce, sync to DB. When DB record changes, sync to Salesforce.

**Skills taught:** Salesforce connector, database connector, CDC, error handling, conflict resolution

### Kafka Event Processing Pipeline

**File:** `en/docs/tutorials/kafka-event-pipeline.md`

**What to build:** Order processing pipeline: receive orders from Kafka topic, validate, enrich with customer data from API, write to database, send confirmation email.

**Skills taught:** Kafka consumer, data transformation, HTTP client calls, database writes, email sending

### REST API Aggregation (Service Orchestration)

**File:** `en/docs/tutorials/rest-api-aggregation.md`

**What to build:** API that aggregates data from 3 different REST APIs (weather, news, stock) into a single unified response.

**Skills taught:** HTTP clients, parallel calls (workers), response aggregation, error handling for partial failures

### Content-Based Message Routing

**File:** `en/docs/tutorials/walkthroughs/content-based-routing.md`

**What to build:** Message router that inspects incoming orders and routes to different processing services based on order type (digital, physical, subscription).

**Skills taught:** Message inspection, conditional routing, multiple endpoints

### Data Transformation Pipeline

**File:** `en/docs/tutorials/walkthroughs/data-transformation-pipeline.md`

**What to build:** Pipeline that reads CSV files, transforms to JSON, enriches with API data, and writes to a database.

**Skills taught:** CSV processing, JSON transformation, data mapper, batch processing

### File Batch ETL

**File:** `en/docs/tutorials/file-batch-etl.md`

**What to build:** FTP watcher that picks up CSV files, transforms data, loads into database, moves processed files to archive.

**Skills taught:** FTP connector, CSV parsing, batch inserts, file management

### Email Notification Service

**File:** `en/docs/tutorials/walkthroughs/email-notification-service.md`

**What to build:** Service that monitors a database table for new entries and sends templated email notifications.

**Skills taught:** Scheduled polling, email templates, SMTP connector, HTML emails

### Change Data Capture Service

**File:** `en/docs/tutorials/walkthroughs/cdc-service.md`

**What to build:** Service that captures database changes and publishes events to Kafka.

**Skills taught:** CDC connector, Kafka producer, event schema design

### Healthcare HL7/FHIR Integration

**File:** `en/docs/tutorials/healthcare-hl7-fhir.md`

**What to build:** HL7v2 message receiver that transforms to FHIR resources and posts to a FHIR server.

**Skills taught:** Health tool, HL7 parsing, FHIR resource creation, healthcare data standards

### EDI Processing with FTP

**File:** `en/docs/tutorials/walkthroughs/edi-ftp-processing.md`

**What to build:** FTP watcher that processes EDI purchase orders, transforms to JSON, and sends to an order management API.

**Skills taught:** EDI tool, FTP connector, EDI→JSON transformation

---

## Enterprise Integration Patterns — EIP (11 patterns)

**Directory:** `en/docs/tutorials/patterns/`

Each EIP page explains the pattern concept, shows when to use it, and provides a complete Ballerina implementation.

### Template for each EIP page:

```markdown
# <Pattern Name>

## The Pattern
<2-3 sentence description of the pattern and the problem it solves.>

## When to Use
<Bullet list of scenarios where this pattern applies.>

## Implementation
<Complete Ballerina implementation with comments explaining each part.>

## Variations
<Common variations of this pattern.>

## Related Patterns
<Links to related EIP pages.>
```

### Patterns to document:

| Pattern | File | Key concept |
|---|---|---|
| Content-Based Router | `content-based-router.md` | Route messages based on content |
| Message Filter | `message-filter.md` | Drop messages that don't match criteria |
| Scatter-Gather | `scatter-gather.md` | Fan-out to multiple services, aggregate responses |
| Recipient List | `recipient-list.md` | Dynamic routing to multiple destinations |
| Message Translator | `message-translator.md` | Transform message format between systems |
| Circuit Breaker & Retry | `circuit-breaker.md` | Resilient calls with failure detection |
| Saga / Compensation | `saga-compensation.md` | Distributed transactions with rollback |
| Publish-Subscribe | `publish-subscribe.md` | Decouple producers and consumers |
| Guaranteed Delivery | `guaranteed-delivery.md` | Ensure messages are never lost |
| Idempotent Receiver | `idempotent-receiver.md` | Handle duplicate messages safely |
| API Gateway & Orchestration | `api-gateway-orchestration.md` | API composition and routing |

---

## Pre-Built Integration Samples (10 samples)

**Directory:** `en/docs/tutorials/pre-built/`

These are shorter than walkthroughs — ready-to-run samples with explanations. Each should take 10–15 minutes.

| Sample | File | What it does |
|---|---|---|
| Google Sheets → Salesforce Contacts | `google-sheets-salesforce.md` | Sync spreadsheet rows to CRM |
| GitHub → Email Summary Report | `github-email-summary.md` | Daily digest of repo activity |
| Google Drive → OneDrive Sync | `google-drive-onedrive.md` | Cross-cloud file sync |
| MySQL → Salesforce Products | `mysql-salesforce-products.md` | Database to CRM sync |
| Gmail → Salesforce Leads (w/ OpenAI) | `gmail-salesforce-leads.md` | AI-powered lead extraction |
| Kafka → Salesforce Price Book | `kafka-salesforce-pricebook.md` | Real-time price updates |
| Salesforce → Twilio SMS | `salesforce-twilio-sms.md` | Event-triggered notifications |
| HubSpot → Google Contacts | `hubspot-google-contacts.md` | CRM to contacts sync |
| FTP EDI → Salesforce Opportunity | `ftp-edi-salesforce.md` | EDI document processing |
| Shopify → Outlook Welcome Email | `shopify-outlook-email.md` | E-commerce event emails |

---

## Sample Projects (5 projects)

**Directory:** `en/docs/tutorials/samples/`

GitHub projects you can `git clone` and `bal run`. Each page explains the architecture, how to run it, and how to modify it.

| Project | File | Architecture |
|---|---|---|
| Hospital Service | `hospital-service.md` | Healthcare appointment management API |
| E-Commerce Order Service | `ecommerce-order-service.md` | Order processing with inventory check |
| Event-Driven Microservices | `event-driven-microservices.md` | Kafka-based microservice architecture |
| Data Service with bal persist | `data-service-persist.md` | Type-safe CRUD with database |
| RESTful API with Data Mapper | `restful-api-data-mapper.md` | Visual data transformation |

---

## Migration Guides (3 guides)

**Directory:** `en/docs/tutorials/migration/`

Each guide helps developers migrate from a specific platform. Include: concept mapping table, code translation examples, migration steps.

| Guide | File | From platform |
|---|---|---|
| Coming from WSO2 MI | `from-wso2-mi.md` | WSO2 Micro Integrator → WSO2 Integrator |
| Coming from MuleSoft | `from-mulesoft.md` | MuleSoft Anypoint → WSO2 Integrator |
| Coming from TIBCO | `from-tibco.md` | TIBCO BusinessWorks → WSO2 Integrator |

**For each migration guide, include:**
- Concept mapping table (old platform term → WSO2 Integrator term)
- Architecture comparison
- Step-by-step migration process
- Common patterns translated (with code examples in both platforms)
- What's different / what's better
- Migration tools available
