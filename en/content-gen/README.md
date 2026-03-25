# Content Generation Guide

This directory contains structured prompt files for generating WSO2 Integrator documentation pages using AI models (Claude, GPT, Gemini, etc.) to produce consistent, high-quality documentation.

## How to Use

### Step 1: Read the Rules First

Before generating any page, read `00-rules.md`. It contains:
- Design principles that govern all content
- Terminology rules (what to say, what NOT to say)
- The page template every page must follow
- Cross-linking conventions

**Always include `00-rules.md` in your AI prompt as context.**

### Step 2: Pick Your Section

Each section has its own prompt file:

| File | Section | Pages |
|---|---|---|
| `01-get-started.md` | Get Started | ~10 pages |
| `02-develop.md` | Develop | ~60 pages |
| `03-connectors.md` | Connectors | Per-connector (200+) |
| `04-genai.md` | GenAI | ~30 pages |
| `05-tutorials.md` | Tutorials | ~35 pages |
| `06-deploy-operate.md` | Deploy & Operate | ~25 pages |
| `07-reference.md` | Reference | ~30 pages |

### Step 3: Generate a Page

Copy the prompt for the specific page you want to generate, prepend the rules from `00-rules.md`, and send to your AI model.

**Example prompt to send to AI:**

```
[Paste contents of 00-rules.md here]

---

Now generate the following page:

[Paste the specific page prompt from the section file]
```

### Step 4: Review and Save

1. Review the AI output for accuracy
2. Verify code examples compile (use `bal build` if possible)
3. Save to the file path specified in the prompt
4. Check cross-links point to existing pages

## Tips for Best Results

- **One page at a time** — Generate each page individually for best quality
- **Include neighboring pages** — If a page references others, mention what those pages cover so the AI can write accurate cross-links
- **Code examples matter** — If the AI generates Ballerina code, verify it compiles. If you're unsure, mark it with `<!-- TODO: verify code -->`
- **Don't copy-paste product docs** — The AI should write original content. If you need to reference Ballerina docs, link to them instead
- **Iterate** — If the first output isn't right, refine the prompt. Add context like "this page is for developers who already know X"

## File Path Convention

All generated pages go into `en/docs/` following the sidebar structure:

```
en/docs/
├── get-started/          ← Section 5
├── develop/              ← Section 6
│   ├── create-integrations/
│   ├── project-views/
│   ├── integration-artifacts/
│   ├── design-logic/
│   ├── transform/
│   ├── test/
│   ├── debugging/
│   ├── organize-code/
│   └── tools/
├── connectors/           ← Section 7
│   ├── catalog/
│   └── build-your-own/
├── genai/                ← Section 8
├── tutorials/            ← Section 9
├── deploy-operate/       ← Section 10
└── reference/            ← Section 11
```
