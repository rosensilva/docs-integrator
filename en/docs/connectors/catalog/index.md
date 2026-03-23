---
sidebar_position: 3
title: Connectors
description: "Can I connect to Y? Searchable catalog and reference for all connectors."
---

# Connectors

Browse the full catalog of pre-built connectors for SaaS applications, databases, messaging systems, cloud services, AI/ML providers, and more.

## Connector Catalog

### AI & Machine Learning

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AI Devant](catalog/ai-ml/ai.devant/overview.md) | AI-powered document chunking and binary file loading for RAG and AI pipelines | Chunk, Load | Bearer Token |
| [AI Memory MSSQL](catalog/ai-ml/ai.memory.mssql/overview.md) | MSSQL-backed short-term memory store for AI agent chat message persistence and retrieval | Put, Get, GetAll, Remove, IsFull, GetCapacity | Username/Password |
| [Anthropic LLM](catalog/ai-ml/ai.anthropic/overview.md) | LLM model provider for Anthropic Claude chat completions and structured generation | Chat, Generate, Tool Calling | API Key |
| [Azure AI Search](catalog/ai-ml/azure.ai.search/overview.md) | Azure AI Search service management for indexes, indexers, data sources, skillsets, and synonym maps | Create, Read, Update, Delete, List, Run, Reset, Analyze, Statistics | API Key |
| [Azure AI Search Index](catalog/ai-ml/azure.ai.search.index/overview.md) | AI-powered cloud search with full-text, semantic, and vector search over indexed documents | Search, Lookup, Index, Suggest, Autocomplete, Count | API Key |
| [Azure OpenAI](catalog/ai-ml/ai.azure/overview.md) | Azure-hosted OpenAI chat completions, embeddings, and AI Search knowledge base | Chat, Generate, Embed, Ingest, Retrieve, Delete | API Key |
| [DeepSeek](catalog/ai-ml/ai.deepseek/overview.md) | LLM chat completion and structured generation with DeepSeek models | Chat, Generate, Tool Calling | API Key |
| [Milvus](catalog/ai-ml/milvus/overview.md) | Open-source vector database for similarity search, vector upsert, and collection management | Create Collection, Load, Index, Upsert, Delete, Search, Query | API Token / Credentials |
| [Mistral](catalog/ai-ml/mistral/overview.md) | AI platform with chat completions, code generation, embeddings, OCR, moderation, fine-tuning, and batch processing | Chat, FIM, Embed, OCR, Moderate, Fine-tune, Batch | API Key |
| [Mistral AI](catalog/ai-ml/ai.mistral/overview.md) | LLM provider with chat completions, structured generation, and tool calling | Chat, Generate, Tool Calling | API Key |
| [NP](catalog/ai-ml/np/overview.md) | Model provider bridge for Ballerina's Natural Programming feature, supporting OpenAI and Azure OpenAI | Natural Language Processing, Structured Response Parsing | API Key |
| [Ollama](catalog/ai-ml/ai.ollama/overview.md) | Local LLM inference with chat completions, tool calling, and structured output generation | Chat, Generate | None (local server) |
| [OpenAI](catalog/ai-ml/openai/overview.md) | AI platform with chat completions, image generation, audio processing, embeddings, assistants, and fine-tuning | Chat, Images, Audio, Embeddings, Assistants, Files, Fine-Tuning, Batches, Moderations | API Key (Bearer Token) |
| [OpenAI (AI)](catalog/ai-ml/ai.openai/overview.md) | LLM model provider and embedding provider for OpenAI chat completions, structured generation, and text embeddings | Chat, Generate, Tool Calling, Embed | API Key |
| [OpenAI Audio](catalog/ai-ml/openai.audio/overview.md) | Text-to-speech, transcription, and audio translation using OpenAI TTS and Whisper models | Speech Generation, Transcription, Translation | API Key (Bearer Token) |
| [OpenAI Fine-Tunes](catalog/ai-ml/openai.finetunes/overview.md) | Fine-tune OpenAI models with custom training data, manage files and models | Upload, Fine-Tune, List, Retrieve, Delete, Monitor | API Key (Bearer Token) |
| [pgvector](catalog/ai-ml/ai.pgvector/overview.md) | Vector similarity search in PostgreSQL with dense, sparse, and hybrid embeddings | Add, Query, Delete | Username/Password |
| [Pinecone](catalog/ai-ml/ai.pinecone/overview.md) | Vector database with dense, sparse, and hybrid similarity search | Add, Query, Delete | API Key |
| [Weaviate](catalog/ai-ml/ai.weaviate/overview.md) | Vector database with semantic search, metadata filtering, and embedding storage | Add, Query, Delete | API Key |

### Cloud & Infrastructure

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AWS Lambda](catalog/cloud-infrastructure/aws.lambda/overview.md) | Serverless function deployment to AWS Lambda with annotation-based compilation and event type support | Deploy, S3 Events, SQS Events, DynamoDB Events, SES Events, API Gateway | AWS IAM Role |
| [AWS Marketplace MPE](catalog/cloud-infrastructure/aws.marketplace.mpe/overview.md) | Retrieve customer entitlements for AWS Marketplace products | GetEntitlements | AWS Access Keys |
| [AWS Marketplace MPM](catalog/cloud-infrastructure/aws.marketplace.mpm/overview.md) | AWS Marketplace metering for customer resolution and usage billing | Resolve Customer, Batch Meter Usage | AWS Access Key |
| [Azure Functions](catalog/cloud-infrastructure/azure.functions/overview.md) | Serverless Azure Functions framework with HTTP, Queue, Blob, CosmosDB, and Timer triggers | HTTP Trigger, Queue Trigger, Blob Trigger, CosmosDB Trigger, Timer Trigger, Output Bindings | Azure App Settings (storage connection strings, function keys, CosmosDB connection strings) |
| [Elastic Cloud](catalog/cloud-infrastructure/elastic.elasticcloud/overview.md) | Elastic Cloud management with deployments, traffic filters, organizations, API keys, and stack versions | Create, List, Search, Update, Shutdown, Restore, Delete | API Key |

### Communication

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AWS SNS](catalog/communication/aws.sns/overview.md) | Pub/sub messaging service for topic-based notifications, SMS, and mobile push | Create Topic, Publish, Subscribe, Batch Publish, Platform Apps, SMS | AWS Access Keys |
| [Discord](catalog/communication/discord/overview.md) | Communication platform with messaging, guild management, roles, webhooks, and slash commands | Send Messages, Manage Channels, Manage Guilds, Manage Roles, Webhooks, Commands | Bot Token / OAuth 2.0 |
| [Gmail](catalog/communication/googleapis.gmail/overview.md) | Email service with message send/receive, drafts, threads, labels, and mailbox history | Send, List, Read, Modify, Delete, Drafts, Threads, Labels | OAuth 2.0 |
| [Slack](catalog/communication/slack/overview.md) | Team messaging platform with channels, direct messages, file sharing, and workspace administration | Send Message, Update Message, List Channels, Get History, Search, Upload File, React, Pin | Bearer Token / OAuth 2.0 |
| [Twilio](catalog/communication/twilio/overview.md) | Cloud communications platform for SMS, voice calls, WhatsApp, and messaging APIs | Create Message, Fetch Message, List Messages, Create Call, Fetch Call, List Calls, Manage Recordings | HTTP Basic (Account SID + Auth Token) / API Key |
| [Zoom Meetings](catalog/communication/zoom.meetings/overview.md) | Video conferencing platform for scheduling, managing, and reporting on meetings and webinars | Create, Read, Update, Delete, List, Register, Record, Report | OAuth 2.0 |
| [Zoom Scheduler](catalog/communication/zoom.scheduler/overview.md) | Zoom scheduling service for managing availability windows, meeting schedules, and bookings | Create, Read, Update, Delete, List, Analytics | OAuth 2.0 |

### CRM & Sales

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [HubSpot Automation Actions](catalog/crm-sales/hubspot.automation.actions/overview.md) | Custom workflow actions for HubSpot CRM with extension definitions, functions, and callback completion | Create, Read, Update, Archive, Callbacks | OAuth 2.0, Developer API Key |
| [HubSpot CRM Associations](catalog/crm-sales/hubspot.crm.associations/overview) | CRM association management for linking objects like contacts, deals, companies, and tickets | Create, Read, Delete, Batch Create, Batch Read, Batch Archive, Archive Labels | OAuth 2.0 |
| [HubSpot CRM Associations Schema](catalog/crm-sales/hubspot.crm.associations.schema/overview) | HubSpot CRM association schema management for object type relationships and configurations | Create, Read, Update, Delete, Batch Create, Batch Update | OAuth 2.0, API Key |
| [HubSpot CRM Commerce Carts](catalog/crm-sales/hubspot.crm.commerce.carts/overview) | Commerce cart management with CRUD, search, and batch operations | Create, Read, Update, Delete, Search, Batch | OAuth 2.0 |
| [HubSpot CRM Commerce Discounts](catalog/crm-sales/hubspot.crm.commerce.discounts/overview) | HubSpot discount management with CRUD, batch operations, and search | Create, Read, Update, Archive, Batch, Search | OAuth 2.0, Private App Token |
| [HubSpot CRM Commerce Orders](catalog/crm-sales/hubspot.crm.commerce.orders/overview) | HubSpot order management with CRUD, batch operations, and search | Create, Read, Update, Archive, Batch, Search | OAuth 2.0, Private App Token |
| [HubSpot CRM Commerce Quotes](catalog/crm-sales/hubspot.crm.commerce.quotes/overview) | Commerce quotes management with CRUD, batch operations, and search | Create, Read, Update, Archive, Batch, Search | OAuth 2.0, API Key |
| [HubSpot CRM Commerce Taxes](catalog/crm-sales/hubspot.crm.commerce.taxes/overview) | Commerce tax management with CRUD, search, and batch operations | Create, Read, Update, Archive, Search, Batch | OAuth 2.0 / API Key |
| [HubSpot CRM Companies](catalog/crm-sales/hubspot.crm.obj.companies/overview.md) | Manage HubSpot CRM company records with full CRUD, batch operations, search, and merge | Create, Read, Update, Archive, Batch Create, Batch Read, Batch Update, Batch Archive, Batch Upsert, Merge, Search | OAuth 2.0 |
| [HubSpot CRM Contacts](catalog/crm-sales/hubspot.crm.obj.contacts/overview.md) | HubSpot CRM contacts management with CRUD, batch operations, search, merge, and GDPR deletion | Create, Read, Update, Delete, Batch Create, Batch Read, Batch Update, Batch Upsert, Batch Archive, Search, Merge, GDPR Delete | OAuth 2.0 / API Key |
| [HubSpot CRM Deals](catalog/crm-sales/hubspot.crm.obj.deals/overview.md) | HubSpot CRM deal management with CRUD, batch operations, search, and merge | Create, Read, Update, Archive, Batch Create, Batch Read, Batch Update, Batch Upsert, Search, Merge | OAuth 2.0 / API Key |
| [HubSpot CRM Engagement Meeting](catalog/crm-sales/hubspot.crm.engagement.meeting/overview.md) | HubSpot meeting engagements with CRUD, batch operations, and search | Create, Read, Update, Delete, Batch, Search | OAuth 2.0 |
| [HubSpot CRM Engagement Notes](catalog/crm-sales/hubspot.crm.engagement.notes/overview) | Engagement notes API for creating, reading, updating, and searching CRM notes | Create, Read, Update, Archive, Batch, Search | OAuth 2.0 |
| [HubSpot CRM Engagements Calls](catalog/crm-sales/hubspot.crm.engagements.calls/overview) | Call engagement tracking with CRUD, batch operations, and search | Create, Read, Update, Archive, Batch, Search | OAuth 2.0, API Key |
| [HubSpot CRM Engagements Communications](catalog/crm-sales/hubspot.crm.engagements.communications/overview) | HubSpot communication records for WhatsApp, LinkedIn, and other messaging channels | Create, Read, Update, Archive, Batch, Search | OAuth 2.0 |
| [HubSpot CRM Engagements Email](catalog/crm-sales/hubspot.crm.engagements.email/overview) | HubSpot email engagements with CRUD, batch, and search operations | Create, Read, Update, Delete, Batch, Search | OAuth 2.0, API Key |
| [HubSpot CRM Engagements Tasks](catalog/crm-sales/hubspot.crm.engagements.tasks/overview) | Task engagement tracking with CRUD, batch operations, and search | Create, Read, Update, Archive, Batch, Search | OAuth 2.0, API Key |
| [HubSpot CRM Extensions Timelines](catalog/crm-sales/hubspot.crm.extensions.timelines/overview) | Custom timeline events on HubSpot CRM records with template and token management | Create, Read, Update, Delete, Batch Create, Render | OAuth 2.0, API Key |
| [HubSpot CRM Extensions Videoconferencing](catalog/crm-sales/hubspot.crm.extensions.videoconferencing/overview) | Video conferencing settings management for HubSpot apps | Create, Read, Update, Delete | API Key |
| [HubSpot CRM Feedback](catalog/crm-sales/hubspot.crm.obj.feedback/overview.md) | HubSpot Feedback Submissions API for reading and managing customer survey feedback data | Create, Read, Update, Archive, Batch Read, Batch Create, Batch Update, Batch Upsert, Search | OAuth 2.0, Private App Token |
| [HubSpot CRM Import](catalog/crm-sales/hubspot.crm.import/overview) | Bulk import contacts, companies, deals, and other CRM objects into HubSpot via CSV | Import, List, Status, Errors, Cancel | OAuth 2.0 |
| [HubSpot CRM Leads](catalog/crm-sales/hubspot.crm.obj.leads/overview.md) | HubSpot CRM lead management with full CRUD, batch operations, and search | Create, Read, Update, Archive, Batch Create, Batch Read, Batch Update, Batch Archive, Upsert, Search | OAuth 2.0 / API Key |
| [HubSpot CRM Line Items](catalog/crm-sales/hubspot.crm.obj.lineitems/overview.md) | HubSpot CRM line items with single-record CRUD, batch operations, and keyword search | Create, Read, Update, Archive, Batch Create, Batch Read, Batch Update, Batch Archive, Batch Upsert, Search | OAuth 2.0 / Private App Token |
| [HubSpot CRM Lists](catalog/crm-sales/hubspot.crm.lists/overview) | CRM list management with dynamic/manual lists, memberships, and folder organization | Create, Read, Update, Delete, Search, Membership, Folders | OAuth 2.0, Private App |
| [HubSpot CRM Owners](catalog/crm-sales/hubspot.crm.owners/overview) | HubSpot CRM owner retrieval with filtering, pagination, and team assignments | List, Read | OAuth 2.0, Private App Token |
| [HubSpot CRM Pipelines](catalog/crm-sales/hubspot.crm.pipelines/overview) | CRM pipeline and stage management with full CRUD and audit trail support | Create, Read, Update, Delete, Audit | OAuth 2.0 |
| [HubSpot CRM Products](catalog/crm-sales/hubspot.crm.obj.products/overview) | HubSpot CRM product catalog management with individual and batch CRUD, search, and upsert | Create, Read, Update, Archive, Batch Create, Batch Read, Batch Update, Upsert, Search | OAuth 2.0, Bearer Token (Private App) |
| [HubSpot CRM Properties](catalog/crm-sales/hubspot.crm.properties/overview) | CRM property management with CRUD operations, batch processing, and property groups | Create, Read, Update, Archive, Batch Create, Batch Read, Batch Archive | OAuth 2.0 |
| [HubSpot CRM Schemas](catalog/crm-sales/hubspot.crm.obj.schemas/overview) | Manage HubSpot custom object schemas, properties, and inter-object associations | Create, Read, Update, Delete, Associate | OAuth 2.0, Bearer Token, API Key |
| [HubSpot CRM Tickets](catalog/crm-sales/hubspot.crm.obj.tickets/overview.md) | CRM platform for managing customer support ticket records with pipeline and priority tracking | Create, Read, Update, Delete, Search, Merge, Batch Create, Batch Read, Batch Update | OAuth 2.0 |
| [Salesforce](catalog/crm-sales/salesforce/overview.md) | CRM platform with records, queries, bulk data operations, and change event triggers | Create, Read, Update, Delete, Query, Bulk, Events | OAuth 2.0 |

### Database

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AWS Redshift](catalog/database/aws.redshift/overview.md) | Cloud data warehouse with SQL queries, batch operations, and stored procedure support | Query, Execute, Batch Execute, Call | Username/Password |
| [AWS Redshift Data](catalog/database/aws.redshiftdata/overview.md) | Data warehouse with async SQL execution, batch operations, and streamed result retrieval via the Redshift Data API | Execute, Batch Execute, Query, Describe | AWS Access Key / IAM Role |
| [CDC](catalog/database/cdc/overview.md) | Change Data Capture framework for streaming real-time database row changes (MySQL, PostgreSQL, MSSQL, Oracle) | Snapshot Read, Insert, Update, Delete, Truncate | Database Credentials |
| [Java JDBC](catalog/database/java.jdbc/overview.md) | Generic JDBC database connectivity with queries, DML, batch operations, and stored procedures | Query, Insert, Update, Delete, Batch Execute, Call Procedures | Username/Password |
| [MongoDB](catalog/database/mongodb/overview.md) | Document database with CRUD, aggregation pipelines, and index management | Insert, Find, Update, Delete, Aggregate, Index | SCRAM-SHA-256 / Connection String |
| [MSSQL](catalog/database/mssql/overview.md) | Relational database with SQL queries, batch operations, stored procedures, and CDC event triggers | Query, Execute, Batch Execute, Call, CDC | Username / Password |
| [MySQL](catalog/database/mysql/overview.md) | Relational database with SQL queries, batch operations, stored procedures, and CDC triggers | Query, Insert, Update, Delete, Batch Execute, Call, CDC Events | Username / Password |
| [Oracle DB](catalog/database/oracledb/overview.md) | Enterprise relational database with SQL queries, DML, stored procedures, and Oracle-specific type support | Query, Execute, Batch Execute, Call, Close | Username/Password |
| [PostgreSQL](catalog/database/postgresql/overview.md) | Object-relational database with SQL queries, batch operations, stored procedures, and CDC triggers | Query, Execute, Batch Execute, Call, CDC | Username/Password |
| [Redis](catalog/database/redis/overview.md) | In-memory data store with string, list, set, sorted set, and hash operations | Get, Set, List, Hash, Set, Sorted Set, Key Management | Password / ACL |
| [Snowflake](catalog/database/snowflake/overview.md) | Cloud data warehouse with SQL queries, DML/DDL execution, batch operations, and stored procedures | Query, Execute, Batch Execute, Call | Basic Auth, Key-Pair Auth |

### Developer Tools

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AMP](catalog/developer-tools/amp/overview.md) | Ballerina observability extension that exports OpenTelemetry traces to the WSO2 AI Agent Management Platform | Tracing | API Key |
| [Copybook](catalog/developer-tools/copybook/overview.md) | COBOL copybook serialization and deserialization library for mainframe data integration | Serialize, Deserialize, Encode, Decode | None |
| [Github](catalog/developer-tools/github/overview.md) | Source control platform with repository, issue, pull request, and organization management | Create, Read, Update, Delete, List, Merge, Review | Personal Access Token |
| [IDE Trace Provider](catalog/developer-tools/idetraceprovider/overview.md) | OpenTelemetry trace export extension for Ballerina IDE and development environments | Initialize, Configure, Export Traces | None |
| [Moesif](catalog/developer-tools/moesif/overview.md) | API observability provider for forwarding distributed traces and metrics to Moesif | Distributed Tracing, Metrics Reporting | API Key (Application ID) |
| [New Relic](catalog/developer-tools/newrelic/overview.md) | Observability extension that auto-exports Ballerina runtime metrics and distributed traces to New Relic | Metrics Export, Distributed Tracing, Multi-account Fan-out | API Key (License Key) |
| [WSO2 APIM Catalog](catalog/developer-tools/wso2.apim.catalog/overview.md) | WSO2 API Manager Service Catalog for registering and managing backend service definitions | Create, Read, Update, Delete, Import, Export, Settings | OAuth 2.0 Password Grant |

### E-Commerce

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [SAP Commerce](catalog/ecommerce/sap.commerce.webservices/overview.md) | E-commerce platform with product catalog, cart management, orders, and B2B procurement | Products, Carts, Orders, Customers, Stores, Tickets, Quotes | OAuth 2.0 (Client Credentials) |
| [Shopify Admin](catalog/ecommerce/shopify.admin/overview.md) | E-commerce platform with product, order, customer, fulfillment, and webhook management | Create, Read, Update, List, Search | API Key |

### ERP & Business Operations

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [Guidewire InsuranceNow](catalog/erp-business/guidewire.insnow/overview.md) | Insurance platform with applications, policies, claims, drivers, and document management | Create, Read, Update, Delete, Bind, Convert | Basic Auth / Bearer Token |
| [IBM CTG](catalog/erp-business/ibm.ctg/overview.md) | IBM CICS Transaction Gateway connector for invoking mainframe CICS programs via ECI | Execute, Close | Basic (User ID/Password) |
| [SAP](catalog/erp-business/sap/overview.md) | SAP HTTP client with built-in CSRF token handling for S/4HANA and other SAP APIs | GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS | Basic Auth / OAuth 2.0 |
| [SAP Sales Area](catalog/erp-business/sap.s4hana.salesarea_0001/overview.md) | SAP S/4HANA Sales Area master data — retrieve and query Sales Organization, Distribution Channel, and Division combinations | Read, List, Batch Query | Basic Auth |
| [SAP Sales District](catalog/erp-business/sap.s4hana.api_salesdistrict_srv/overview.md) | SAP S/4HANA sales district master data and multilingual text descriptions via OData v2 | List Districts, Get District, List Texts, Get Text, Navigate | Basic Auth |
| [SAP Sales Inquiry](catalog/erp-business/sap.s4hana.api_sales_inquiry_srv/overview.md) | Read SAP S/4HANA pre-sales inquiry documents including items, partners, and pricing elements via OData v2 | List, Read | Basic Auth (username/password) |
| [SAP Sales Order](catalog/erp-business/sap.s4hana.api_sales_order_srv/overview.md) | SAP S/4HANA Sales Order (A2X) API for full order lifecycle management including items, billing, pricing, and scheduling | Create, Read, Update, Delete, List | Basic Auth, OAuth 2.0 |
| [SAP Sales Order Analytics](catalog/erp-business/sap.s4hana.ce_salesorder_0001/overview.md) | SAP S/4HANA Sales Order OData v4 API for full lifecycle management of sales orders and related entities | Create, Read, Update, Delete, List, Batch | Basic Auth, OAuth 2.0, Bearer Token |
| [SAP Sales Order Simulation](catalog/erp-business/sap.s4hana.api_sales_order_simulation_srv/overview.md) | SAP S/4HANA Sales Order Simulation API for synchronous pricing, material availability, and credit limit checks | Simulate, Read, Create, Update, Delete, Batch | Basic Auth, OAuth 2.0, Bearer Token |
| [SAP Sales Organization](catalog/erp-business/sap.s4hana.api_salesorganization_srv/overview.md) | SAP S/4HANA Sales Organization master data — lookup and listing of organizational units and multilingual texts | List Sales Organizations, Get Sales Organization, List Texts, Get Text, Navigate | Basic Auth |
| [SAP Sales Quotation](catalog/erp-business/sap.s4hana.api_sales_quotation_srv/overview.md) | SAP S/4HANA Sales Quotation API with full CRUD, partners, pricing, texts, process flow, and approval actions | Create, Read, Update, Delete, Approve, Reject, Batch | Basic Auth |
| [SAP SD Incoterms](catalog/erp-business/sap.s4hana.api_sd_incoterms_srv/overview.md) | SAP S/4HANA OData API for reading Incoterms classification and version master data with multilingual text support | List, Read | Basic Authentication |
| [SAP SD Sold-to-Party Determination](catalog/erp-business/sap.s4hana.api_sd_sa_soldtopartydetn/overview.md) | SAP S/4HANA OData service for querying sold-to party assignments in sales scheduling agreements | Read, List | Basic Auth |

### Finance & Accounting

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [PayPal Invoices](catalog/finance-accounting/paypal.invoices/overview.md) | Invoicing platform with invoice CRUD, payments, refunds, search, and template management | Create, Read, Update, Delete, Send, Search, Templates | OAuth 2.0 (Client Credentials) |
| [PayPal Orders](catalog/finance-accounting/paypal.orders/overview.md) | Payment orders API with creation, authorization, capture, and shipment tracking | Create, Read, Update, Authorize, Capture, Track | OAuth 2.0 (Client Credentials) |
| [PayPal Payments](catalog/finance-accounting/paypal.payments/overview.md) | Payment platform with authorization, capture, void, and refund operations | Authorize, Capture, Void, Refund, Show Details | OAuth 2.0 (Client Credentials) |
| [PayPal Subscriptions](catalog/finance-accounting/paypal.subscriptions/overview.md) | PayPal recurring billing platform for creating subscription plans and managing subscription lifecycles | Create, Read, Update, Activate, Deactivate, Suspend, Cancel, Revise, Capture, List | OAuth 2.0 |
| [Stripe](catalog/finance-accounting/stripe/overview.md) | Payment processing platform with customers, charges, invoices, subscriptions, and payouts | Create, Read, Update, Delete, List | API Key (Bearer Token) |

### Healthcare

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|

### HRMS

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [People HR](catalog/hrms/peoplehr/overview.md) | HR management system with employee records, holidays, salaries, vacancies, applicants, and appraisals | Create, Read, Update, Delete, Query | API Key |

### Marketing & Social Media

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [HubSpot Marketing Campaigns](catalog/marketing-social/hubspot.marketing.campaigns/overview) | Marketing campaign management with CRUD, batch operations, asset associations, and reporting | Create, Read, Update, Delete, Batch, Assets, Metrics, Revenue | OAuth 2.0 / API Key |
| [HubSpot Marketing Emails](catalog/marketing-social/hubspot.marketing.emails/overview) | Marketing email management with CRUD, A/B testing, drafts, revisions, and statistics | Create, Read, Update, Delete, Publish, Clone, A/B Test, Statistics | OAuth 2.0 |
| [HubSpot Marketing Events](catalog/marketing-social/hubspot.marketing.events/overview.md) | Marketing event management with CRUD, attendance tracking, participation analytics, and list associations | Create, Read, Update, Delete, Batch, Attendance, Analytics | OAuth 2.0 |
| [HubSpot Marketing Forms](catalog/marketing-social/hubspot.marketing.forms/overview) | Marketing forms management with field groups, styling, legal consent, and form lifecycle operations | Create, List, Get, Update, Patch, Archive | OAuth 2.0 |
| [HubSpot Marketing Subscriptions](catalog/marketing-social/hubspot.marketing.subscriptions/overview.md) | Communication preference management with subscription status tracking across email, SMS, and WhatsApp | Read, Update, Batch Read, Batch Update, Opt-Out | OAuth 2.0 / API Key |
| [HubSpot Marketing Transactional](catalog/marketing-social/hubspot.marketing.transactional/overview.md) | Transactional email sending and SMTP token management via HubSpot Marketing API | Send Email, List Tokens, Create Token, Get Token, Reset Password, Delete Token | OAuth 2.0 |
| [Mailchimp Marketing](catalog/marketing-social/mailchimp.marketing/overview.md) | Email marketing platform with audience management, campaigns, automations, and analytics | Create, Read, Update, Delete, Send, Schedule, Search | API Key |
| [Mailchimp Transactional](catalog/marketing-social/mailchimp.transactional/overview.md) | Transactional email service with message sending, templates, webhooks, and delivery analytics | Send, Search, Templates, Webhooks, Tags, Senders, Rejects | API Key |
| [Salesforce Marketing Cloud](catalog/marketing-social/salesforce.marketingcloud/overview.md) | Digital marketing platform with journeys, campaigns, contacts, data extensions, assets, and transactional email | Create, Read, Update, Delete, Search, Send, Import | OAuth 2.0 (Client Credentials) |
| [Twitter](catalog/marketing-social/twitter/overview.md) | Social media platform with tweet management, user lookup, DMs, likes, retweets, bookmarks, and lists | Create, Read, Delete, Search, Like, Retweet, Bookmark, DM, Follow | OAuth 2.0 (PKCE / App-Only Bearer Token) |

### Messaging

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AWS SQS](catalog/messaging/aws.sqs/overview.md) | Fully managed message queuing with standard and FIFO queues, batch operations, and event-driven consumption | Send, Receive, Delete, Batch Send, Batch Delete, Queue Management | AWS IAM (Access Key + Secret Key) |
| [Azure Service Bus](catalog/messaging/asb/overview.md) | Enterprise message broker with queues, topics, subscriptions, and event-driven message processing | Send, Receive, Schedule, Settle, Admin, Listen | Connection String |
| [Confluent Avro SerDes](catalog/messaging/confluent.cavroserdes/overview.md) | Avro serialization and deserialization library using the Confluent Schema Registry wire format | Serialize, Deserialize | API Key |
| [Confluent Schema Registry](catalog/messaging/confluent.cregistry/overview.md) | Schema management for Kafka with schema registration and retrieval | Register, Retrieve | API Key |
| [Google Cloud Pub/Sub](catalog/messaging/gcloud.pubsub/overview.md) | Pub/Sub messaging service with topic publishing, subscription consumption, and flow control | Publish, Subscribe, Ack, Nack | GCP Service Account Key |
| [IBM MQ](catalog/messaging/ibm.ibmmq/overview.md) | Enterprise messaging middleware with queue and topic operations, and event-driven message consumption | Put, Get, Publish, Subscribe, Transactions | Username/Password |
| [JMS](catalog/messaging/java.jms/overview.md) | JMS broker integration with queue/topic messaging, durable subscriptions, and event-driven consumption | Send, Receive, Subscribe, Acknowledge, Commit, Rollback | Username/Password |
| [Kafka](catalog/messaging/kafka/overview.md) | Distributed event streaming with producers, consumers, and listener-based triggers | Produce, Consume, Poll, Subscribe, Commit, Seek | SASL (PLAIN, SCRAM-SHA-256, SCRAM-SHA-512) |
| [NATS](catalog/messaging/nats/overview.md) | High-performance pub/sub and persistent JetStream messaging with publish, subscribe, request-reply, and stream management | Publish, Subscribe, Request-Reply, Stream Create/Update/Delete/Purge, Consume, Ack/Nak | None / Username-Password / Token / Mutual TLS |
| [RabbitMQ](catalog/messaging/rabbitmq/overview.md) | AMQP 0-9-1 message broker with queue/exchange management, pub/sub, and consumer services | Publish, Consume, Queue Declare, Exchange Declare, Bind, Ack, Nack | Username / Password |
| [Solace](catalog/messaging/solace/overview.md) | Event broker with publish/subscribe, queuing, durable subscriptions, and listener triggers | Send, Receive, Acknowledge, Commit, Rollback | Basic Auth, Kerberos, OAuth 2.0 |

### Productivity & Collaboration

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [Asana](catalog/productivity-collaboration/asana/overview.md) | Project management platform with tasks, projects, sections, goals, and team collaboration | Create, Read, Update, Delete, Search, Batch | Personal Access Token / OAuth 2.0 |
| [Candid](catalog/productivity-collaboration/candid/overview.md) | Nonprofit data platform with search, profiles, financials, and PDF report downloads | Search, Profile, Lookup, PDF Download | API Key |
| [DocuSign Admin](catalog/productivity-collaboration/docusign.dsadmin/overview.md) | DocuSign organization administration with user management, permissions, bulk imports/exports, and group operations | List Organizations, Create User, Update User, Close Membership, Permissions, Groups, Export, Import, DSGroups | OAuth 2.0 |
| [Google Calendar](catalog/productivity-collaboration/googleapis.calendar/overview.md) | Calendar and event management with scheduling, quick-add, filtering, and service account delegation | Create, Read, Update, Delete, Query, Quick Add | OAuth 2.0 |
| [Google Calendar](catalog/productivity-collaboration/googleapis.gcalendar/overview.md) | Google Calendar integration for managing calendars, events, ACL rules, and free/busy queries | Create, Read, Update, Delete, List, Free/Busy Query | OAuth 2.0 |
| [Google Sheets](catalog/productivity-collaboration/googleapis.sheets/overview.md) | Cloud spreadsheet platform with worksheet management, cell/row/column CRUD, range operations, and data filtering | Create, Read, Update, Delete, Append, Filter | OAuth 2.0 |
| [Jira](catalog/productivity-collaboration/jira/overview.md) | Project tracking and issue management with JQL search, workflows, and full CRUD operations | Create, Read, Update, Delete, Search, Transition, Bulk | Basic Auth (API Token) / OAuth 2.0 |
| [Smartsheet](catalog/productivity-collaboration/smartsheet/overview.md) | Work management platform with sheets, rows, columns, folders, workspaces, and collaboration | Create, Read, Update, Delete, Share, Search, Webhooks | API Token / OAuth 2.0 |
| [Trello](catalog/productivity-collaboration/trello/overview.md) | Project management with boards, lists, cards, checklists, and team collaboration | Create, Read, Update, Delete, Search | API Key + Token |

### Security & Identity

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AWS Secrets Manager](catalog/security-identity/aws.secretmanager/overview.md) | Secrets management service for retrieving and describing AWS secrets | Describe, Get Secret Value, Batch Get | AWS Access Keys / IAM Role |
| [SCIM](catalog/security-identity/scim/overview.md) | SCIM 2.0 identity provisioning with user, group, and bulk management operations | Create, Read, Update, Delete, Search, Bulk | OAuth 2.0 (Client Credentials) |

### Storage & File Management

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [Alfresco](catalog/storage-file/alfresco/overview.md) | Enterprise content management platform with document CRUD, versioning, shared links, and collaboration features | Create, Read, Update, Delete, Upload, Download, Copy, Move, Search | Basic Authentication |
| [AWS S3](catalog/storage-file/aws.s3/overview.md) | Object storage with bucket management, object CRUD, presigned URLs, and multipart uploads | Create, Read, Delete, List, Presign, Multipart Upload | AWS Access Keys / IAM Role |
| [Microsoft OneDrive](catalog/storage-file/microsoft.onedrive/overview.md) | Cloud file storage with drive/item CRUD, content upload/download, sharing, and search | List, Create, Read, Update, Delete, Upload, Download, Copy, Share, Search | OAuth 2.0 |

## Build Your Own

- [Create from OpenAPI Spec](build-your-own/create-from-openapi.md) — Generate connectors directly in the IDE from an OpenAPI definition
- [Custom Development](build-your-own/custom-development.md) — Build a connector from scratch using Ballerina
