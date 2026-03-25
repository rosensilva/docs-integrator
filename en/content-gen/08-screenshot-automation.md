# Screenshot capture and documentation automation

**Purpose:** Enable any AI agent (Claude Code, Codex, etc.) to capture real WSO2 Integrator UI screenshots and create or update documentation pages with proper visual designer content.

**When to use:** Any time a documentation page needs real UI screenshots — artifact docs, transform docs, GenAI pages, tutorials, or any page that references the WSO2 Integrator visual designer.

---

## Prerequisites

Before starting a screenshot session, confirm the following:

| Requirement | Check command | Expected result |
|---|---|---|
| code-server running | `curl -s http://localhost:8080 -o /dev/null -w "%{http_code}"` | `200` or `302` |
| Ballerina installed | `bal version` | `2201.x.x` or higher |
| Node.js >= 20 | `node --version` | `v20.x.x` or higher |
| Docusaurus deps installed | `ls en/node_modules/.package-lock.json` | File exists |
| Playwright installed | `ls /tmp/node_modules/playwright` | Directory exists |

### One-time Playwright setup

```bash
cd /tmp && npm init -y && npm install playwright
npx playwright install chromium
```

This installs a headless Chromium browser that the screenshot scripts use. It persists across sessions until `/tmp` is cleared.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Screenshot Pipeline                     │
├───────────────────┬─────────────────────────────────────┤
│  Playwright       │   code-server + WSO2 Integrator     │
│  (headless)       │   (localhost:8080)                   │
├───────────────────┼─────────────────────────────────────┤
│ • Launches browser│ • Runs VS Code in browser            │
│ • Navigates pages │ • WSO2 Integrator: BI extension      │
│ • Clicks elements │ • Ballerina language server           │
│ • Takes PNGs      │ • Visual designer, flow canvas       │
│ • Saves to static/│ • Detects .bal files automatically   │
└───────────────────┴─────────────────────────────────────┘
```

### Why Playwright (not Puppeteer MCP)

The original workflow used Puppeteer MCP for screenshot capture. In practice, **Playwright via Node.js scripts** is more reliable because:

- Runs headless — no browser window management or focus issues
- Deterministic selectors — `aria-label`, `.monaco-list-row`, CSS classes all work
- Saves PNGs directly to disk — no base64 decoding step
- Scriptable — capture multiple screenshots in sequence with a single command
- No MCP dependency — works in any Claude Code session without special tool configuration

---

## Code-server setup

### Starting code-server

```bash
code serve-web --host 127.0.0.1 --port 8080
```

### URL format

```
http://127.0.0.1:8080?folder=/tmp/<project-name>/<project-name>
```

> **Token rotation:** code-server tokens rotate between sessions. If navigating returns a login page, confirm the current token with `code serve-web` output.

### WSO2 Integrator extension

The extension must be installed in code-server. If it shows 0 installed extensions:

1. Open Extensions panel (search bar in sidebar)
2. Search "Ballerina" — install the Ballerina extension by wso2
3. The WSO2 Integrator: BI extension should auto-install as a dependency, or search and install it separately

After installation, reload code-server. The WSO2 Integrator: BI icon appears in the activity bar.

### Workspace trust

VS Code blocks extensions in untrusted folders. The Playwright script handles this automatically by clicking "Yes, I trust the authors" when the dialog appears. If running manually, click the **Restricted Mode** badge in the status bar.

---

## Ballerina project setup

### For artifact documentation (services, events, files)

```bash
mkdir -p /tmp/<artifact-slug>-demo
cd /tmp/<artifact-slug>-demo
bal new <artifact-slug>-demo
```

Write the `.bal` stub file into the project. The WSO2 Integrator detects the service type from the Ballerina code and shows the appropriate designer.

### For transform documentation

```bash
mkdir -p /tmp/<doc-slug>_processing
cd /tmp/<doc-slug>_processing
bal new . -t main
```

> **Critical:** The function must be `public function main()` — the WSO2 Integrator only recognizes `main()` as an "Automation" artifact in the visual designer.

### For GenAI documentation (agents, RAG, MCP)

```bash
mkdir -p /tmp/<genai-slug>-demo
cd /tmp/<genai-slug>-demo
bal new <genai-slug>-demo
```

Write the service file with the appropriate imports (`ballerinax/ai.agent`, `ballerinax/openai.chat`, etc.). The extension will pull dependencies automatically.

---

## Ballerina stub reference

### Services (Integration as API)

| Artifact | File name | Key code pattern |
|---|---|---|
| HTTP Service | `greeting_service.bal` | `service /api on new http:Listener(8090) { ... }` |
| gRPC Service | `grpc_service.bal` | `@grpc:Descriptor {value: DEMO_DESC} service "DemoService" on new grpc:Listener(9090) { ... }` |
| GraphQL Service | `graphql_service.bal` | `service /graphql on new graphql:Listener(9090) { ... }` |
| TCP Service | `tcp_service.bal` | `service on new tcp:Listener(3000) { ... }` |
| WebSocket Service | `ws_service.bal` | `service /chat on new websocket:Listener(9090) { ... }` |

### Events (Event Integration)

| Artifact | File name | Key import |
|---|---|---|
| Kafka | `kafka_service.bal` | `import ballerinax/kafka;` |
| RabbitMQ | `rabbitmq_service.bal` | `import ballerinax/rabbitmq;` |
| MQTT | `mqtt_service.bal` | `import ballerinax/mqtt;` |
| Azure Service Bus | `asb_service.bal` | `import ballerinax/azure_service_bus as asb;` |
| GitHub Webhooks | `github_service.bal` | `import ballerinax/github;` |
| Salesforce Events | `sf_service.bal` | `import ballerinax/salesforce;` |

### AI Integration

| Artifact | File name | Key imports |
|---|---|---|
| AI Chat Agent | `chat_agent_service.bal` | `import ballerinax/ai.agent;` + `import ballerinax/openai.chat;` |
| MCP Service | `mcp_service.bal` | MCP-specific imports |

### File (File Integration)

| Artifact | File name | Key import |
|---|---|---|
| FTP/SFTP | `ftp_service.bal` | `import ballerinax/ftp;` |
| Local Files | `localfile_service.bal` | `import ballerina/file;` |

### Ballerina reserved keywords — avoid in stub code

Ballerina reserves many common English words as keywords. Using them as variable or parameter names causes compilation errors that are hard to diagnose. **Always run `bal build` after writing stub code** to catch these before starting screenshots.

| Reserved word | Common mistake | Fix |
|---|---|---|
| `order` | `Order order = ...` | `Order orderRecord = ...` |
| `type` | `string type = ...` | `string typeName = ...` |
| `error` | `json error = ...` | `json errorResponse = ...` |
| `check` | `boolean check = ...` | `boolean checkResult = ...` |
| `start` | `string start = ...` | `string startTime = ...` |
| `lock` | `Lock lock = ...` | `Lock lockObj = ...` |
| `table` | `Table table = ...` | `Table dataTable = ...` |
| `stream` | `Stream stream = ...` | `Stream dataStream = ...` |
| `worker` | `string worker = ...` | `string workerName = ...` |
| `transaction` | `string transaction = ...` | `string txnId = ...` |
| `service` | `Service service = ...` | `Service svc = ...` |
| `return` | `string return = ...` | `string result = ...` |
| `map` | `map map = ...` | `map dataMap = ...` |
| `future` | `future future = ...` | `future futureResult = ...` |

> **Rule of thumb:** Append a descriptive suffix (`Record`, `Value`, `Name`, `Result`, `Data`) to any variable that matches a common English word. For example, `Order orderRecord`, `string typeName`, `json errorData`.

---

## The Playwright screenshot script

### Template script

Save as `/tmp/capture-screenshots.mjs` and customize for each documentation page:

```javascript
import { chromium } from 'playwright';

// ── Configuration ──────────────────────────────────────────
const DEST = '/Users/<USER>/Documents/GitHub/docs-integrator/en/static/img/<section>/<page>';
const PROJECT_URL = 'http://localhost:8080/?folder=/tmp/<project-name>/<project-name>';
const VIEWPORT = { width: 1400, height: 900 };

// ── Launch ─────────────────────────────────────────────────
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize(VIEWPORT);

console.log('Navigating to code-server...');
await page.goto(PROJECT_URL, { waitUntil: 'networkidle', timeout: 60000 });

// ── Trust workspace ────────────────────────────────────────
try {
  const trustBtn = page.locator('text=Yes, I trust the authors');
  await trustBtn.waitFor({ timeout: 5000 });
  await trustBtn.click();
  await page.waitForTimeout(5000);
} catch { console.log('No trust dialog'); }

// ── Wait for extensions to activate ────────────────────────
// The Ballerina language server and WSO2 Integrator need time
// to detect the project and build the sidebar tree.
console.log('Waiting for extensions...');
await page.waitForTimeout(15000);

// ── Open WSO2 Integrator sidebar ───────────────────────────
const biIcon = page.locator('a.action-label[aria-label="WSO2 Integrator: BI"]');
await biIcon.click();
console.log('Opened WSO2 Integrator sidebar');
await page.waitForTimeout(10000);

// ── Dismiss login banner (if present) ──────────────────────
try {
  const closeBtn = page.locator('text=Close').first();
  await closeBtn.waitFor({ timeout: 3000 });
  await closeBtn.click();
  await page.waitForTimeout(1000);
} catch { /* no banner */ }

// ── Hide secondary sidebar (Chat panel) ────────────────────
try {
  const toggle = page.locator('a.action-label[aria-label*="Toggle Secondary Side Bar"]');
  const cls = await toggle.getAttribute('class');
  if (cls && cls.includes('checked')) {
    await toggle.click();
    await page.waitForTimeout(500);
  }
} catch { /* ignore */ }

// ── Hide bottom panel ──────────────────────────────────────
try {
  const togglePanel = page.locator('a.action-label[aria-label*="Toggle Panel"]');
  const panelClass = await togglePanel.getAttribute('class');
  if (panelClass && panelClass.includes('checked')) {
    await togglePanel.click();
    await page.waitForTimeout(500);
  }
} catch { /* ignore */ }

// ════════════════════════════════════════════════════════════
// SCREENSHOTS — customize this section per page
// ════════════════════════════════════════════════════════════

// Screenshot 1: Integration overview (sidebar + design canvas)
await page.screenshot({ path: `${DEST}/integration-overview.png` });
console.log('Saved integration-overview.png');

// Screenshot 2: Add Artifact picker
// The button is inside a webview frame — must iterate frames
const frames = page.frames();
for (const frame of frames) {
  try {
    const btn = frame.locator('text=Add Artifact').first();
    if (await btn.isVisible({ timeout: 1000 })) {
      await btn.click();
      await page.waitForTimeout(3000);
      await page.screenshot({ path: `${DEST}/add-artifact.png` });
      console.log('Saved add-artifact.png');
      await page.keyboard.press('Escape');
      break;
    }
  } catch { /* skip frame */ }
}

// Screenshot 3: Service designer (click service in sidebar tree)
const serviceRow = page.locator('.monaco-list-row .label-name', { hasText: 'HTTP Service' }).first();
await serviceRow.click();
await page.waitForTimeout(5000);
await page.screenshot({ path: `${DEST}/service-designer.png` });
console.log('Saved service-designer.png');

// Screenshot 4: Flow designer (click handler in sidebar tree)
const handlerRow = page.locator('.monaco-list-row .label-name', { hasText: /^chat$/ }).first();
await handlerRow.click();
await page.waitForTimeout(8000);
await page.screenshot({ path: `${DEST}/flow-designer.png` });
console.log('Saved flow-designer.png');

// ════════════════════════════════════════════════════════════

await browser.close();
console.log('Done!');
```

### Running the script

```bash
cd /tmp && node capture-screenshots.mjs
```

---

## Key selectors reference

These CSS selectors and aria-labels work reliably in code-server with WSO2 Integrator: BI.

### Activity bar

| Element | Selector |
|---|---|
| WSO2 Integrator icon | `a.action-label[aria-label="WSO2 Integrator: BI"]` |
| Explorer icon | `a.action-label[aria-label*="Explorer"]` |
| Extensions icon | `a.action-label[aria-label*="Extensions"]` |
| Toggle Primary Sidebar | `a.action-label[aria-label*="Toggle Primary Side Bar"]` |
| Toggle Secondary Sidebar | `a.action-label[aria-label*="Toggle Secondary Side Bar"]` |
| Toggle Bottom Panel | `a.action-label[aria-label*="Toggle Panel"]` |

### Sidebar tree items

| Element | Selector |
|---|---|
| Any tree row by text | `.monaco-list-row .label-name` with `hasText` filter |
| Entry Points section | `.monaco-list-row .label-name:has-text("Entry Points")` |
| Specific service | `.monaco-list-row .label-name:has-text("HTTP Service")` |
| Specific handler | `.monaco-list-row .label-name:has-text("chat")` |
| Types section | `.monaco-list-row .label-name:has-text("Types")` |
| Functions section | `.monaco-list-row .label-name:has-text("Functions")` |

### Webview content (inside frames)

Buttons like **Add Artifact**, **Create**, **Configure** render inside VS Code webview iframes. To interact with them:

```javascript
// Iterate all frames to find the one containing the element
const frames = page.frames();
for (const frame of frames) {
  try {
    const btn = frame.locator('text=Add Artifact').first();
    if (await btn.isVisible({ timeout: 1000 })) {
      await btn.click();
      break;
    }
  } catch { /* skip */ }
}
```

### Webview limitation

The WSO2 Integrator creation form renders in a cross-origin VS Code webview iframe. Playwright **cannot** fill form fields or click radio buttons inside it. For creation form screenshots:

| Action | Works in Playwright? |
|---|---|
| Screenshot of the form | Yes (captures full page including iframes) |
| Clicking/filling form fields | No (cross-origin restriction) |
| Sidebar interactions | Yes |
| Artifacts picker panel | Yes |
| Designer views | Yes |
| Flow designer canvas | Yes |

For creation form interaction, either ask the user to fill the form manually or use the CDP (Chrome DevTools Protocol) approach documented below.

---

## Screenshot naming conventions

### Artifact documentation

```
en/static/img/develop/integration-artifacts/<category>/<artifact>/
├── step-1.png              # Sidebar with artifact in project tree
├── step-2.png              # Artifacts panel
├── step-creation-form.png  # Creation form
├── step-3.png              # Designer overview
├── step-4.png              # Flow designer canvas
└── listener-config-1.png   # Listener configuration form
```

### Transform documentation

```
en/static/img/develop/transform/<doc-slug>/
├── <doc-slug>-<section>-flow.png    # Flow designer views
└── <doc-slug>-<section>-panel.png   # Side panel views
```

### GenAI documentation

```
en/static/img/genai/<subsection>/<page-slug>/
├── integration-overview.png  # Sidebar + design canvas
├── add-artifact.png          # Artifacts picker panel
├── service-designer.png      # Service designer with resources
└── flow-designer.png         # Flow designer canvas
```

### Tutorial documentation

Tutorials need **more screenshots than other page types** because they walk through every step of the visual designer. Each tutorial step that has a "Visual Designer" tab should have at least one screenshot.

```
en/static/img/tutorials/walkthroughs/<tutorial-slug>/
├── integration-overview.png              # Full IDE with sidebar tree expanded
├── add-artifact.png                      # Artifacts picker panel
├── create-http-service.png               # HTTP Service creation form (if applicable)
├── service-designer.png                  # Service designer showing all resources
├── types-sidebar.png                     # Types section expanded in sidebar
├── functions-sidebar.png                 # Functions section expanded in sidebar
├── flow-designer-<resource-name>.png     # Flow designer for each resource handler
├── flow-designer-<function-name>.png     # Flow designer for each helper function
├── flow-node-config.png                  # Node configuration panel (clicking a node)
└── source-code-view.png                  # Full source code in editor (optional)
```

### Screenshot-to-tutorial-step mapping

Use this table to decide which screenshots to capture for each tutorial step:

| Tutorial step | Screenshots needed | What to show |
|---|---|---|
| Create the project | `add-artifact.png`, `create-http-service.png` | Artifacts panel with service type highlighted, creation form with base path and port |
| Define data types | `types-sidebar.png` | Sidebar Types section expanded, showing all record types |
| Build a resource handler | `flow-designer-<resource>.png` | Flow designer for that resource — shows Start, function calls, log, respond nodes |
| Build a helper function | `functions-sidebar.png`, `flow-designer-<function>.png` | Sidebar Functions section, then the function's flow (loops, expressions, return) |
| Add another resource | `flow-designer-<resource>.png` | Flow designer for the second resource |
| Complete service overview | `service-designer.png` | Service designer showing all resources listed together |
| Overview (top of page) | `integration-overview.png` | Full IDE — sidebar tree with project structure + design canvas |

### Playwright script structure for tutorials

For tutorials, the Playwright script should capture screenshots in this order:

1. **Integration overview** — immediately after opening the WSO2 Integrator sidebar
2. **Add Artifact** — click "Add Artifact" button in the webview, screenshot, then Escape
3. **Service designer** — click the service node in the sidebar tree
4. **Each resource flow** — click each resource handler in the sidebar tree, wait 8s for flow to render
5. **Types sidebar** — click the Types section in the sidebar tree
6. **Functions sidebar** — click the Functions section in the sidebar tree
7. **Each function flow** — click each function in the sidebar tree, wait 8s for flow to render
8. **Source code view** — switch to Explorer, double-click `main.bal`

> **Timing:** Flow designer views need 8 seconds to render. Service designer needs 5 seconds. Sidebar tree interactions need 2-3 seconds.

### Image references in markdown

Always use absolute static paths:

```markdown
![Descriptive alt text](/img/genai/agents/chat-agents/integration-overview.png)
```

- Alt text must be descriptive (not just "screenshot")
- Place the image after the step it belongs to, indented under the step number

---

## Markdown patterns

### Dual-tab pattern (Visual Designer + Ballerina Code)

Every code section that has a visual designer equivalent gets wrapped in tabs:

```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Open** the **WSO2 Integrator: BI** sidebar in VS Code.
2. Click **+** next to **Entry Points**.
3. In the **Artifacts** panel, select **<Artifact Name>** under **<Section>**.

   ![Artifacts panel showing <Artifact Name>](/img/<path>/add-artifact.png)

4. Configure the fields and click **Create**.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// Existing code block — keep UNCHANGED
import ballerina/http;
// ...
```

</TabItem>
</Tabs>
```

### Critical Docusaurus formatting rules

These cause build failures if not followed:

1. **Blank line required** before and after every `<Tabs>`, `<TabItem>`, `</TabItem>`, `</Tabs>` tag
2. **Blank line required** before and after every code fence (` ``` `) inside a tab
3. **No trailing spaces** on any line
4. The `<Tabs>` and `</Tabs>` must be at the root level (not indented)
5. `<TabItem>` tags go on their own line
6. The `import Tabs` / `import TabItem` lines go after the frontmatter, before the first heading

### What gets tabs vs what does not

**Gets tabs:**
- Variable declarations, JSON/XML construction
- Parsing, type conversion functions
- Foreach loops, iterations
- Function calls, mutations
- Data mapping examples
- Service creation steps

**Does NOT get tabs:**
- Page title and intro paragraph
- "Best Practices" sections (advice-only)
- "What's Next" link sections
- Text-only explanations
- CLI/bash-only sections (tooling commands, not visual designer constructs)

### Visual Designer tab content patterns

| Code pattern | Visual Designer instruction |
|---|---|
| Variable declaration | Add a **Variable** step — click **+**, select **Variable**, set type and expression |
| Record type definition | Navigate to **Types** in the sidebar, click **+**, select **Import** tab, paste definition |
| Parsing (`jsondata:parseString`) | Add a **Variable** step — set type and parse expression |
| Foreach loop | Add a **Foreach** step under **Control** — set **Collection** and **Variable** |
| If/else | Add an **If** step under **Control** — set the **Condition** expression |
| Custom expression | Add a **Custom Expression** step — enter the expression |
| Data mapping | Use the [Visual Data Mapper](../develop/transform/data-mapper.md) |
| Module imports | Handled automatically by the visual designer — no step needed |
| `io:println` | Appears as a **Function Call** node — mention briefly or skip |

---

## Documentation style rules

All content must comply with the Microsoft Style Guide. Key rules enforced:

| Rule | Example |
|---|---|
| Sentence case headings | "Creating a basic chat agent" not "Creating a Basic Chat Agent" |
| Active voice, present tense | "Click **Create**" not "The Create button should be clicked" |
| **Bold** for UI labels | **WSO2 Integrator: BI**, **Entry Points**, **Create** |
| `Backticks` for code in prose | `http:Listener`, `json`, `/helpdesk` |
| Em dash for asides | "variable declarations — agent calls" not "variable declarations - agent calls" |
| Numbered lists for steps | Sequential tasks always numbered |
| "for example" not "e.g." | Spelled out in full |

### Scope rules

- **New documents:** 100% compliance required
- **Existing documents:** Apply guidelines only to newly added/modified content

---

## Terminology

Always use these canonical terms:

| Use this | Not this |
|---|---|
| WSO2 Integrator | BI, Ballerina Integrator, VS Code |
| WSO2 Integrator IDE | VS Code extension, the extension |
| integration | flow, pipeline, process |
| service | API (unless about API management) |
| connector | adapter, driver |
| visual designer | drag-and-drop editor, canvas |
| pro-code | source code view, text mode |
| agent | bot, assistant |

---

## Complete workflow: end-to-end example

Here is the full workflow for documenting a new page (using GenAI chat agents as the example):

### Step 1: Create the Ballerina project

```bash
mkdir -p /tmp/chat-agent-demo
cd /tmp/chat-agent-demo
bal new chat-agent-demo
```

Write the `.bal` stub file with the service code matching the documentation page content.

### Step 2: Create the screenshot directory

```bash
mkdir -p en/static/img/genai/agents/chat-agents
```

### Step 3: Write and run the Playwright script

Customize the template script (see above) with:
- `DEST` pointing to the screenshot directory
- `PROJECT_URL` pointing to the Ballerina project in code-server
- Screenshot actions matching the page content

```bash
cd /tmp && node capture-screenshots.mjs
```

### Step 4: Verify screenshots

```bash
ls -lh en/static/img/genai/agents/chat-agents/
```

Open each PNG to verify content is correct and readable.

### Step 5: Update the markdown

1. Add `import Tabs` and `import TabItem` after frontmatter
2. Add an **Overview** section with the integration overview screenshot
3. Wrap code sections in dual-tab pattern
4. Add screenshots under the appropriate Visual Designer steps
5. Fix headings to sentence case

> **Important:** Only add `![](...)` image references in the markdown **after** the real screenshots exist on disk. Never commit placeholder 1x1px images — Docusaurus caches image dimensions at build time and will render them at 1x1px even after the real screenshots replace them.

### Step 6: Clear Docusaurus cache

```bash
rm -rf en/.docusaurus
```

Docusaurus caches image dimensions (width/height) from the first time it processes each image. If you ever replaced a placeholder image with a real screenshot, or re-captured screenshots at a different resolution, the cached dimensions will be stale. **Always clear the cache after replacing images.**

If running a dev server, restart it after clearing:

```bash
cd en && npm run start
```

### Step 7: Build validation

```bash
cd en && npm run build
```

The build must pass with no new errors. Pre-existing broken links are acceptable.

> **If images render at 1x1px on the dev site:** This means Docusaurus cached old dimensions. Clear `.docusaurus/` and restart the dev server. See the Troubleshooting section for details.

### Step 8: Commit

```bash
git checkout -b docs/<short-topic>
git add en/docs/<path-to-doc>.md
git add en/static/img/<path-to-screenshots>/
git commit -m "docs(<scope>): add visual designer screenshots for <page>"
```

---

## Advanced: CDP interaction for webview forms

For creation form interaction inside cross-origin webview iframes, use the Chrome DevTools Protocol directly:

### Finding the webview target

```bash
curl -s http://localhost:<CDP_PORT>/json
```

### The iframe structure

```
Main page (127.0.0.1:8080)
  └── VS Code webview shell (vscode-cdn.net)
        └── Active frame ("active-frame")
              └── Form HTML (radio buttons, inputs)
```

### Dispatching clicks via CDP

```python
import asyncio, websockets, json

async def click_in_webview():
    uri = "ws://localhost:<CDP_PORT>/devtools/page/<WEBVIEW_TARGET_ID>"
    async with websockets.connect(uri) as ws:
        # Enable Runtime
        await ws.send(json.dumps({"id": 1, "method": "Runtime.enable"}))
        await ws.recv()

        # Find active-frame context
        # ... collect executionContextCreated events ...

        # Execute click in the correct context
        await ws.send(json.dumps({
            "id": 2,
            "method": "Runtime.evaluate",
            "params": {
                "contextId": ACTIVE_FRAME_CONTEXT_ID,
                "expression": "document.querySelector('button[type=submit]')?.click()"
            }
        }))
```

> **Note:** CDP interaction is complex and fragile. Prefer Playwright for everything except form field interaction inside webview iframes.

---

## React fiber click trick

When JavaScript `dispatchEvent` does not work on flow designer nodes (React synthetic events):

```javascript
const el = document.querySelector('.your-selector');
const propsKey = Object.keys(el).find(k => k.startsWith('__reactProps$'));
el[propsKey].onClick({
    stopPropagation: () => {},
    preventDefault: () => {},
    nativeEvent: {},
    bubbles: true
});
```

**Important:** This works for opening panels from a closed state but **not** for switching between already-open nodes. Close the panel first, then open the new one.

---

## Troubleshooting

### Extension not activating in headless mode

**Symptom:** Playwright navigates to code-server but the WSO2 Integrator sidebar shows nothing.

**Fix:** Increase the wait time after navigation. Extensions need 10-15 seconds to activate:

```javascript
await page.waitForTimeout(15000);
```

### Tree items not found

**Symptom:** `.monaco-list-row .label-name` selectors fail.

**Fix:** The Ballerina language server needs time to parse the `.bal` file and populate the tree. Wait longer, or check that `bal build` succeeds locally first.

### Screenshots are blank or show Welcome page

**Symptom:** Screenshots capture the Welcome tab instead of the WSO2 Integrator view.

**Fix:** Ensure you click the WSO2 Integrator icon and wait for the view to load:

```javascript
const biIcon = page.locator('a.action-label[aria-label="WSO2 Integrator: BI"]');
await biIcon.click();
await page.waitForTimeout(10000); // Wait for design view to render
```

### Webview buttons not clickable

**Symptom:** `page.locator('text=Add Artifact')` times out.

**Fix:** The button is inside a webview iframe. Iterate all frames:

```javascript
for (const frame of page.frames()) {
  try {
    const btn = frame.locator('text=Add Artifact').first();
    if (await btn.isVisible({ timeout: 1000 })) {
      await btn.click();
      break;
    }
  } catch { /* skip */ }
}
```

### Docusaurus build fails after adding tabs

**Common causes:**
- Missing blank line before/after `<Tabs>`, `<TabItem>`, `</Tabs>` tags
- Missing blank line before/after code fences inside tabs
- Trailing spaces on lines
- Indented `<Tabs>` tags (must be at root level)

### Images render at 1x1px on the doc site

**Symptom:** Screenshots exist on disk at full resolution (for example 1400x900) but display as a single dot on the Docusaurus dev site or build.

**Cause:** Docusaurus caches image dimensions in the `.docusaurus/` directory. If placeholder images (1x1px or very small) were processed first, those cached dimensions persist even after replacing with real screenshots.

**Fix:**

```bash
rm -rf en/.docusaurus
# Restart the dev server
cd en && npm run start
```

**Prevention:** Never add `![](...)` image references in markdown until the real screenshot files exist at the target path. If you must use placeholders, make them at least 800x600px (not 1x1px).

### Login banner covers the design view

**Fix:** Dismiss it in the script:

```javascript
try {
  const closeBtn = page.locator('text=Close').first();
  await closeBtn.waitFor({ timeout: 3000 });
  await closeBtn.click();
} catch { /* no banner */ }
```

### Ballerina build fails with "invalid token" or "missing identifier"

**Symptom:** `bal build` outputs errors like `invalid token 'order'` or `missing identifier` on lines that look correct.

**Cause:** A Ballerina reserved keyword is used as a variable or parameter name. Common culprits: `order`, `type`, `error`, `check`, `start`, `lock`, `table`, `stream`.

**Fix:** Rename the variable with a descriptive suffix — for example `order` becomes `orderRecord`, `type` becomes `typeName`. See the "Ballerina reserved keywords" table in the Ballerina stub reference section.

**Prevention:** Always run `bal build` immediately after writing stub code, before starting the Playwright screenshot session.

---

## Prompt templates for AI agents

### Artifact / GenAI page prompt

Copy this prompt to start a screenshot + documentation session for an artifact or GenAI page:

```
I need you to capture real WSO2 Integrator UI screenshots and update the documentation page at:
`en/docs/<section>/<page>.md`

**Reference:** Read `en/content-gen/08-screenshot-automation.md` for the complete workflow, selectors, and patterns.

**Ballerina project:** Create at `/tmp/<slug>-demo/` with this stub:
```ballerina
<paste the Ballerina stub code>
```

**Screenshots needed:**
1. `integration-overview.png` — Sidebar + design canvas
2. `add-artifact.png` — Artifacts picker showing <artifact> under <section>
3. `service-designer.png` — Service designer with resources
4. `flow-designer.png` — Flow designer for <handler>

**Save to:** `en/static/img/<section>/<page>/`

**Document updates:**
1. Add Tabs/TabItem imports
2. Wrap code sections in Visual Designer / Ballerina Code tabs
3. Add screenshots under Visual Designer steps
4. Fix headings to sentence case

**Validation:** Run `rm -rf en/.docusaurus && cd en && npm run build` after editing.
```

### Tutorial page prompt

Copy this prompt for tutorials, which need more comprehensive step-by-step screenshots:

```
I need you to capture real WSO2 Integrator UI screenshots for the tutorial at:
`en/docs/tutorials/walkthroughs/<tutorial-slug>.md`

**Reference:** Read `en/content-gen/08-screenshot-automation.md` — especially the
"Tutorial documentation" and "Screenshot-to-tutorial-step mapping" sections.

**Ballerina project:** Create at `/tmp/<slug>-demo/` with this stub:
```ballerina
<paste the complete Ballerina service code>
```

**Important:** Run `bal build` first to verify the stub compiles. Fix any reserved keyword
issues before starting screenshots.

**Screenshots needed (capture all that apply):**
1. `integration-overview.png` — Full IDE with sidebar tree expanded
2. `add-artifact.png` — Artifacts picker panel
3. `create-http-service.png` — Service creation form (if applicable)
4. `service-designer.png` — Service designer showing all resources
5. `types-sidebar.png` — Types section expanded in sidebar
6. `functions-sidebar.png` — Functions section expanded in sidebar
7. `flow-designer-<resource-name>.png` — Flow designer for EACH resource handler
8. `flow-designer-<function-name>.png` — Flow designer for EACH helper function
9. `source-code-view.png` — Full source code in editor (optional)

**Save to:** `en/static/img/tutorials/walkthroughs/<tutorial-slug>/`

**Document updates:**
1. Add Tabs/TabItem imports
2. Every tutorial step with code gets Visual Designer / Ballerina Code tabs
3. Each Visual Designer tab gets the matching screenshot(s) from above
4. Overview section gets `integration-overview.png`
5. Fix headings to sentence case

**Validation:**
1. Clear cache: `rm -rf en/.docusaurus`
2. Build: `cd en && npm run build`
3. Dev server: verify images render at full size (not 1x1px)
```

---

## Reference documents

The following source documents in `~/Downloads/docgen-master/` contain the original detailed specifications:

| File | What it covers |
|---|---|
| `01-system-overview.md` | Architecture, repo layout, IA sections, terminology, UI flow |
| `02-setup-and-configuration.md` | Claude Code permissions, MCP servers, code-server, Ballerina, npm |
| `03-screenshot-capture-workflow.md` | Puppeteer pipeline, session setup, decode scripts, webview workarounds |
| `04-artifact-docs-process.md` | Ballerina stubs, markdown patterns, prompt template, artifact queue |
| `05-transform-docs-process.md` | Dual-tab pattern, Visual Designer content patterns, per-doc notes |
| `06-style-and-ia-reference.md` | Microsoft Style Guide, terminology, branch/commit conventions |
| `07-manual-steps-checklist.md` | Pre-session, during-session, post-session, and PR checklists |
