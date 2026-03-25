# Global Rules for All Documentation Pages

**Include this file as context in EVERY AI prompt.** These rules override any default behavior of the AI model.

---

## Product Identity

- **Product name:** WSO2 Integrator (always use this exact name)
- **Powered by:** Ballerina programming language
- **IDE:** WSO2 Integrator IDE (VS Code fork with built-in integration plugin)
- **Deployment platform:** WSO2 Integration Platform (cloud), Docker, Kubernetes, cloud providers
- **Target audience:** Integration developers (Java/enterprise background, new to Ballerina)

## Design Principles

### Principle 1: Question-Driven Navigation
Every top-level section answers one developer question. If content doesn't clearly belong to one question, the structure is wrong.

| Developer asks... | Section |
|---|---|
| "I'm new — what is this?" | Get Started |
| "How do I build and test X?" | Develop |
| "Can I connect to Y?" | Connectors |
| "How do I build AI agents, RAG, or MCP?" | GenAI |
| "Show me a complete, real example" | Tutorials |
| "How do I ship, run, and secure this?" | Deploy & Operate |
| "What's the exact syntax / config / API?" | Reference |

### Principle 2: The Boundary Rule
If your code is still on your machine → **Develop**. Once you're pushing it somewhere else → **Deploy & Operate**.

### Principle 3: The AI Split Rule
If AI is helping YOU code faster (Copilot, AI suggestions, AI test gen) → stays in **Develop**. If YOU are building an AI-powered integration (agents, RAG, MCP) → **GenAI**.

### Principle 4: Develop ≠ Tutorials
**Develop** = handbook lookup (3 min read, specific answer). **Tutorials** = end-to-end narrative (30–45 min, follow along). Different developer modes, different content types.

### Principle 5: Two Layers of Explanation
**Get Started → Key Concepts** = vocabulary (2–3 sentences per component). **Develop/GenAI** = skills (complete working knowledge).

### Principle 6: Connectors Are Top-Level
"Can I connect to X?" is the most frequent evaluator question. LLM connectors live in Connectors. GenAI references them.

---

## Terminology Rules

**ALWAYS use the left column. NEVER use the right column.**

| Use this | NOT this |
|---|---|
| WSO2 Integrator | BI, Ballerina Integrator |
| WSO2 Integrator IDE | VS Code, VS Code extension, the extension |
| WSO2 Integration Platform | WSO2 Devant, iPaaS, Choreo |
| push to cloud | deploy to Devant, deploy to iPaaS |
| integration | flow, pipeline, process |
| service | API (unless about API management) |
| connector | adapter, driver |
| visual designer | drag-and-drop editor, canvas |
| pro-code | source code view, text mode |
| agent | bot, assistant |

**NEVER use MI/ESB terms:** mediators, sequences, proxy services, message stores, message processors, inbound endpoints, API artifacts.

---

## Page Template

Every page MUST follow this structure:

```markdown
---
title: "<Page Title>"
description: "<One sentence — what and when>"
---

# <Page Title>

<Intro paragraph: 2–3 sentences explaining what this page covers and when you'd use it.>

:::info Prerequisites
- WSO2 Integrator installed ([Install guide](../get-started/install.md))
- <Any other specific prerequisites>
:::

## <Main concept>

<Explanation: concept → steps → examples → advanced.>

### Step-by-step (if applicable)

1. Step one with explanation
2. Step two with explanation

### Code Example

<details>
<summary>Low-code (Visual Designer)</summary>

<!-- Screenshot or description of the visual designer steps -->

</details>

```ballerina
// Pro-code equivalent — complete, runnable example
import ballerina/http;

service /hello on new http:Listener(8080) {
    resource function get .() returns string {
        return "Hello, World!";
    }
}
```

## <Next concept or section>

...

## What's Next

- [Next logical page](./next-page.md) — One-line description
- [Related page](./related-page.md) — One-line description
```

### Rules for the Template

1. **Title** — Action-oriented for Develop/GenAI ("Add Error Handling"), descriptive for Reference ("Error Handling Reference")
2. **Intro** — 2–3 sentences: what and when. No fluff.
3. **Prerequisites** — Collapsible box. Only include if the page truly requires prior setup.
4. **Main content** — Progressive: concept → steps → examples → advanced
5. **Code examples** — Complete, runnable Ballerina code. Include BOTH low-code (visual designer screenshot/description) AND pro-code (Ballerina source). Use `bal` or `ballerina` as the code fence language.
6. **What's Next** — 2–3 links to the logical next pages. Every page must have this.

---

## Code Example Standards

- Every code example must be **complete and runnable** — not snippets
- Include `import` statements
- Use realistic variable names (not `foo`, `bar`)
- Show both happy path and error handling where relevant
- For visual designer: describe the steps or include a screenshot placeholder `<!-- TODO: Add visual designer screenshot -->`
- Mark unverified code with `<!-- TODO: verify this compiles with bal build -->`

## Cross-Linking Rules

- Use relative paths: `../deploy-operate/deploy/docker-kubernetes.md`
- Link to the MOST SPECIFIC page, not a parent
- Every page should have 3–5 cross-links minimum
- Connector references should link to the connector's overview page in `connectors/catalog/`

## Formatting Rules

- Use Docusaurus admonitions: `:::tip`, `:::info`, `:::warning`, `:::danger`
- Use tables for comparisons and feature lists
- Use `<details>` for collapsible sections (prerequisites, advanced topics)
- Keep paragraphs short (3–4 sentences max)
- Use bullet lists for 3+ items, inline for 2
- Heading hierarchy: `##` for main sections, `###` for subsections, `####` rarely
