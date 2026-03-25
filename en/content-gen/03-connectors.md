# Section 7: Connectors

**Question this section answers:** "Can I connect to Y?"

**Audience:** Developer who needs to integrate with a specific external service. May be searching by service name (e.g., "Salesforce", "Kafka", "OpenAI").

**Tone:** Reference-oriented, searchable, consistent across all connectors. Every connector page follows the EXACT same structure.

---

## Connector Overview Page

**File:** `en/docs/connectors/overview.md`
**Status:** EXISTS — modernized with catalog tables and mermaid diagram

---

## Per-Connector Page Structure

Every connector gets 1–5 pages depending on complexity. The structure is:

```
connectors/catalog/<category>/<connector-name>/
├── overview.md          (REQUIRED — what it does, when to use it)
├── setup-guide.md       (REQUIRED — credentials, configuration)
├── action-reference.md  (If the connector has actions)
├── triggers.md          (If the connector has triggers)
└── examples.md          (If there are enough examples to warrant a page)
```

### Template: Connector Overview Page

**Prompt for AI:**

```
Generate a connector overview page for [CONNECTOR_NAME].

File: en/docs/connectors/catalog/<category>/<connector-package>/overview.md

Structure:
1. Title: "[Service Name] Connector"
2. One-paragraph description: what the connector does, what service it connects to
3. "What you can do" section: bullet list of key operations/actions
4. "Prerequisites" box: account requirements, API keys needed
5. "Quick Example" section: minimal code showing the most common operation
6. "What's Next" links: Setup Guide, Action Reference, related tutorials

Rules:
- Use the exact Ballerina package name for imports (e.g., `ballerinax/googleapis.gmail`)
- Show both low-code (describe visual designer steps) and pro-code (Ballerina code)
- Include the connection configuration in the example
- The code must be complete and runnable (include all imports)
```

### Template: Setup Guide Page

**Prompt for AI:**

```
Generate a setup guide for the [CONNECTOR_NAME] connector.

File: en/docs/connectors/catalog/<category>/<connector-package>/setup-guide.md

Structure:
1. Title: "Set Up [Service Name] Connector"
2. "Get Credentials" section: step-by-step to obtain API keys/OAuth tokens from the service
3. "Add to Project" section: `bal add <package>` or Ballerina.toml dependency
4. "Configure Connection" section: Config.toml entries, configurable variables
5. "Verify Connection" section: simple test to confirm it works
6. "Troubleshooting" section: common setup issues

Rules:
- Include screenshots or links to the service's developer console where applicable
- Show exact Config.toml format
- Handle both OAuth and API key auth methods if the service supports both
```

### Template: Action Reference Page

**Prompt for AI:**

```
Generate an action reference for the [CONNECTOR_NAME] connector.

File: en/docs/connectors/catalog/<category>/<connector-package>/action-reference.md

Structure:
1. Title: "[Service Name] Action Reference"
2. For each action/operation:
   - **Function signature** with parameters and return type
   - **Description** — what it does (one sentence)
   - **Parameters table** — name, type, required/optional, description
   - **Return type** — what it returns, including error types
   - **Code example** — minimal example calling this action

Rules:
- Group actions by resource/entity (e.g., Contacts, Deals, Emails)
- Use Ballerina function signatures
- Every action gets a code example
- Document error types that can be returned
```

### Template: Triggers Page

**Prompt for AI:**

```
Generate a triggers reference for the [CONNECTOR_NAME] connector.

File: en/docs/connectors/catalog/<category>/<connector-package>/triggers.md

Structure:
1. Title: "[Service Name] Triggers"
2. For each trigger event:
   - **Event type** and description
   - **Listener configuration** — how to set up the listener
   - **Event payload** — what data the event carries (record type)
   - **Code example** — complete listener service

Rules:
- Show the full listener service (not just the handler function)
- Document how the service handles subscription/verification if applicable
- Include error handling in examples
```

---

## Connector Categories

The 16 categories and the types of connectors in each:

| Category | Directory | Key connectors |
|---|---|---|
| AI & Machine Learning | `catalog/ai-ml/` | OpenAI, Claude, Vertex AI, Bedrock, Azure AI |
| Cloud & Infrastructure | `catalog/cloud-infrastructure/` | AWS Lambda, Azure Functions, Elastic Cloud |
| Communication | `catalog/communication/` | Gmail, Slack, Discord, AWS SNS |
| CRM & Sales | `catalog/crm-sales/` | Salesforce (many sub-connectors), HubSpot |
| Database | `catalog/database/` | JDBC, MSSQL, Redis, Redshift, CDC |
| Developer Tools | `catalog/developer-tools/` | GitHub, AMP, Copybook |
| E-Commerce | `catalog/ecommerce/` | Shopify, SAP Commerce |
| ERP & Business | `catalog/erp-business/` | SAP, SAP S/4HANA, Guidewire |
| Finance & Accounting | `catalog/finance-accounting/` | PayPal (orders, payments, invoices, subscriptions) |
| Healthcare | `catalog/healthcare/` | (FHIR connectors via Health Tool) |
| HRMS | `catalog/hrms/` | PeopleHR |
| Marketing & Social | `catalog/marketing-social/` | HubSpot Marketing (campaigns, emails, forms) |
| Messaging | `catalog/messaging/` | Azure Service Bus, AWS SQS, GCP Pub/Sub, Confluent |
| Productivity | `catalog/productivity-collaboration/` | Asana, DocuSign, Google Calendar |
| Security & Identity | `catalog/security-identity/` | SCIM, AWS Secrets Manager |
| Storage & File | `catalog/storage-file/` | AWS S3, Azure Storage, Alfresco, OneDrive |

---

## Build Your Own Pages

### Page: Create from OpenAPI Spec

**File:** `en/docs/connectors/build-your-own/create-from-openapi.md`

**What to cover:**
- Use `bal openapi` to generate connector from OpenAPI spec
- Input: OpenAPI 3.0 YAML/JSON file
- Output: Ballerina client module with typed operations
- Customizing generated code
- Complete example: generate connector from Petstore spec

### Page: Create from WSDL

**File:** `en/docs/connectors/build-your-own/create-from-wsdl.md`

**What to cover:**
- Generate connector from WSDL for SOAP services
- Input: WSDL file URL or local file
- Output: Ballerina client with SOAP operations
- Handling SOAP headers and faults

### Page: Custom Development

**File:** `en/docs/connectors/build-your-own/custom-development.md`

**What to cover:**
- When to build from scratch (no spec available)
- Creating a Ballerina client class
- Implementing operations as remote functions
- Connection management and pooling
- Error handling and retries
- Publishing to Ballerina Central
