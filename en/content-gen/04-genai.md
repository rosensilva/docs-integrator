# Section 8: GenAI

**Question this section answers:** "How do I build AI agents, RAG apps, or MCP servers?"

**Audience:** Developer building AI-powered integrations. May be new to LLMs/agents or experienced with Python AI frameworks but new to Ballerina.

**Tone:** Practical, hands-on. Explain AI concepts briefly, then show how to build with WSO2 Integrator. Not an AI textbook — just enough theory to build things.

**AI Split Rule:** This section is about YOU building AI-powered things. AI that helps YOU code faster (Copilot, AI suggestions) stays in Develop.

---

## Page: AI Integrations Overview

**File:** `en/docs/genai/overview.md`
**Status:** EXISTS — review against blueprint

**What to cover:**
- What "AI integration" means in WSO2 Integrator context
- Three pillars: Direct LLM Calls, AI Agents, RAG
- MCP as a connectivity layer
- When to use each approach
- Links to Getting Started, Key Concepts, and Develop AI Apps

---

## Getting Started

### Page: Setting Up WSO2 Integrator for AI

**File:** `en/docs/genai/getting-started/setup.md`

**What to cover:**
- Prerequisites: WSO2 Integrator installed, API key for an LLM provider
- Adding AI connector dependencies
- Configuring LLM provider credentials in Config.toml
- Verifying setup with a simple LLM call
- Supported providers: OpenAI, Anthropic (Claude), Azure OpenAI, Google Vertex AI, AWS Bedrock

### Page: Build a Smart Calculator Assistant

**File:** `en/docs/genai/getting-started/smart-calculator.md`

**What to cover:**
- Step-by-step: build an AI agent that can do math
- Define a tool (calculator function)
- Create agent with the tool
- Chat with the agent, watch it use the tool
- Complete runnable code
- This is the "Hello World" of AI agents

### Page: Build a Sample Hotel Booking Agent

**File:** `en/docs/genai/getting-started/hotel-booking-agent.md`

**What to cover:**
- More complex agent: multiple tools (search rooms, check availability, book room)
- Agent memory for multi-turn conversations
- Structured output (booking confirmation)
- Complete runnable code

---

## Key Concepts

**Audience for these pages:** Developer who needs to understand AI terminology before building. Keep each page SHORT (2–3 minute read).

### Page: What is an LLM?

**File:** `en/docs/genai/key-concepts/what-is-llm.md`

**What to cover:**
- LLM in one paragraph (not a deep ML explanation)
- How integrations use LLMs: text generation, classification, extraction, summarization
- Providers supported by WSO2 Integrator
- Token-based pricing model (briefly)
- Link to: Configuring LLM Providers

### Page: What is a Natural Function?

**File:** `en/docs/genai/key-concepts/what-is-natural-function.md`

**What to cover:**
- Ballerina's unique `natural` function concept
- Function signature defined by developer, implementation by LLM
- When to use: classification, extraction, summarization, translation
- Simple example: sentiment analysis as a natural function

### Page: What is an AI Agent?

**File:** `en/docs/genai/key-concepts/what-is-ai-agent.md`

**What to cover:**
- Agent = LLM + Tools + Memory
- How agents reason and decide which tool to use
- Difference from direct LLM calls
- Visual: Agent loop diagram (observe → think → act)

### Page: What are Tools?

**File:** `en/docs/genai/key-concepts/what-are-tools.md`

**What to cover:**
- Tools are functions the agent can call
- Tool definition: name, description, parameters
- How the LLM decides which tool to use (function calling)
- Tools can be: database queries, API calls, file operations, other integrations

### Page: What is AI Agent Memory?

**File:** `en/docs/genai/key-concepts/what-is-agent-memory.md`

**What to cover:**
- Short-term memory (conversation context)
- Long-term memory (persistent across sessions)
- Memory backends: in-memory, database, vector store
- When to use memory vs stateless agents

### Page: What is MCP?

**File:** `en/docs/genai/key-concepts/what-is-mcp.md`

**What to cover:**
- Model Context Protocol — open standard for AI tool connectivity
- Why MCP: standardized interface between agents and tools
- How MCP works: server exposes tools, client (agent) consumes them
- WSO2 Integrator as both MCP server and MCP client
- Link to: MCP Integration pages

### Page: What is RAG?

**File:** `en/docs/genai/key-concepts/what-is-rag.md`

**What to cover:**
- Retrieval-Augmented Generation in one paragraph
- Three steps: Chunking → Embedding → Querying
- When to use RAG: company knowledge bases, document Q&A, support bots
- RAG vs fine-tuning (briefly)
- Link to: RAG development pages

---

## Develop AI Applications

### Direct LLM Calls (3 pages)

**Files:** `en/docs/genai/develop/direct-llm/configuring-providers.md`, `constructing-prompts.md`, `handling-responses.md`

**What to cover:**
- **Configuring LLM Providers** — OpenAI, Anthropic, Azure OpenAI, Vertex AI, Bedrock. Config.toml setup, API key management, model selection, fallback providers
- **Constructing Prompts** — System prompts, user prompts, prompt templates, variable injection, multi-turn conversations, structured output prompting
- **Handling Responses** — Parsing LLM responses, streaming responses, error handling (rate limits, token limits, timeouts), response validation

### Natural Functions (3 pages)

**Files:** `en/docs/genai/develop/natural-functions/defining.md`, `constructing-prompts.md`, `handling-responses.md`

**What to cover:**
- **Defining Natural Functions** — `natural` keyword syntax, parameter types, return types, function descriptions for LLM context
- **Constructing Prompts** — How the runtime constructs prompts from natural function definitions, customizing prompt behavior
- **Handling Responses** — Type-safe response parsing, error cases, validation

### RAG (2 pages)

**Files:** `en/docs/genai/develop/rag/chunking-documents.md` + `generating-embeddings.md` + `connecting-vector-dbs.md`, `rag-querying.md`

**What to cover:**
- **RAG Ingestion** — Document chunking strategies, generating embeddings with LLM providers, storing in vector databases (Pinecone, Weaviate, Qdrant, pgvector)
- **RAG Querying** — Query embedding, similarity search, context assembly, LLM generation with retrieved context, relevance filtering

### AI Agents (6 pages)

**Files:** `en/docs/genai/develop/agents/creating-agent.md`, `adding-tools.md`, `adding-memory.md`, `advanced-config.md`, `agent-observability.md`, `agent-evaluations.md`

**What to cover:**
- **Creating an AI Agent** — Agent definition, LLM binding, system prompt, basic conversation loop. Complete example.
- **Adding Tools to an Agent** — Tool definition syntax, Ballerina functions as tools, connector actions as tools, tool descriptions for LLM
- **Adding Memory to an Agent** — Conversation memory, persistent memory stores, memory window management
- **Advanced AI Agent Configurations** — Temperature, max tokens, stop sequences, tool choice, parallel tool calls, structured output
- **AI Agent Observability** — Tracing agent decisions, logging tool calls, cost tracking, latency monitoring
- **AI Agent Evaluations** — Testing agents with eval datasets, measuring accuracy, regression testing

### MCP Integration (2 pages)

**Files:** `en/docs/genai/develop/mcp/creating-mcp-server.md`, `agents-with-mcp.md`

**What to cover:**
- **Creating an MCP Server** — Expose Ballerina functions as MCP tools, server configuration, tool schemas, authentication
- **Building AI Agents with MCP Servers** — Consume external MCP tools in agents, MCP client configuration, tool discovery

---

## GenAI Tutorials (4 pages)

**Files:** `en/docs/genai/tutorials/`

These are 30–45 minute end-to-end tutorials. Each builds a complete working application.

- **HR Knowledge Base Agent with RAG** — Ingest HR policy PDFs, build vector index, create agent that answers employee questions
- **Customer Care Agent with MCP** — Agent that connects to CRM (Salesforce) and ticketing (Jira) via MCP, handles customer inquiries
- **IT Helpdesk Chatbot with Persistent Memory** — Multi-session chatbot with long-term memory, escalation rules, ticket creation
- **Legal Document Q&A System with MCP and RAG** — Ingest legal contracts, RAG for retrieval, MCP for clause comparison, structured answers

---

## GenAI Reference (3 pages)

**Files:** `en/docs/genai/reference/`

- **Ballerina Copilot Setup and Usage Guide** — Install Copilot extension, features (code completion, generation, explanation), settings, privacy
- **AI Governance and Security** — Responsible AI practices, data privacy with LLMs, prompt injection prevention, output filtering, compliance
- **Troubleshooting and Common Issues** — Rate limiting, token limits, model not responding, authentication errors, common mistakes
