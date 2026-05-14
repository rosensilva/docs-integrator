---
title: Configurations
description: Step-by-step guide for declaring configurable variables and supplying values through the visual designer.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configurations

**Configurable variables** are settings you declare in your integration and supply values separately at runtime. They keep two things out of your code:

- **Secrets** — credentials, API keys, and tokens you don't want in source control.
- **Environment-specific settings** — URLs, ports, and feature flags that differ between development, staging, and production.

Because the values live outside the code, the same integration runs unchanged in every environment.

:::note
WSO2 Integrator's configuration support is built on Ballerina's config variable model.
:::

## Adding a configuration

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open your integration project in **WSO2 Integrator**.

   ![WSO2 Integrator sidebar showing the project structure with Configurations listed](/img/develop/integration-artifacts/supporting/configurations/step-1.png)

2. Click **+** next to **Configurations** in the sidebar.

3. In the **Add Configurable Variable** panel, fill in the following fields:

   ![Add Configurable Variable form showing Variable Name, Variable Type, Default Value, and Documentation fields](/img/develop/integration-artifacts/supporting/configurations/step-2.png)

   | Field | Description |
   |---|---|
   | **Variable Name** | The identifier used to reference the variable within your integration (for example, `apiEndpoint`). Required. |
   | **Variable Type** | The type of the variable (for example, `string`, `int`, `boolean`, or a record type). Required. |
   | **Default Value** | An optional default value. Leave empty to make the variable required. The integration fails to start unless you supply a value at runtime. |
   | **Documentation** | Optional Markdown description rendered as inline documentation. |

4. Click **Save**. The variable is written to a `config.bal` file at the project root and appears under **Configurations** in the sidebar.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Declare configurable variables at the module level using the `configurable` keyword:

```ballerina
// config.bal

// Required configuration
configurable string apiEndpoint = ?;
configurable string apiKey = ?;

// Optional configuration with defaults
configurable int maxRetries = 3;
configurable decimal timeoutSeconds = 30.0d;
configurable boolean enableCache = true;
configurable int cacheMaxSize = 1000;

// Grouped configuration using a record type
type NotificationConfig record {|
    boolean emailEnabled;
    boolean slackEnabled;
    string slackWebhookUrl;
|};

configurable NotificationConfig notificationConfig = {
    emailEnabled: true,
    slackEnabled: false,
    slackWebhookUrl: ""
};
```

The `?` placeholder marks a configurable variable as required. The integration fails to start unless you supply a value at runtime.

</TabItem>
</Tabs>

## Viewing configurations

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Click the icon next to **Configurations** in the sidebar to open the **Configurable Variables** panel.

![Configurable Variables panel showing variables grouped by Integration and Imported libraries](/img/develop/integration-artifacts/supporting/configurations/step-3.png)

The panel organizes variables into two groups:

1. **Integration** — variables declared in your integration project. Each entry shows the variable name, type, and default value.
2. **Imported libraries** — configurable variables exposed by libraries your integration uses (for example, the HTTP listener's `port`).

Use the **Search Configurables** box to filter by name. Click a variable to edit or delete it.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Configurable variables added through the visual designer are written to a `config.bal` file at the project root. Open the file directly to review them.

Configurables exposed by imported libraries are declared in the libraries' own source. Refer to each library's API documentation to see which configurables it exposes.

</TabItem>
</Tabs>

## Providing values

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Use the **Config Editor** in the **Configurable Variables** panel to set values for your configurable variables. The editor writes them to the project's `Config.toml` file. To open the panel, see [Viewing configurations](#viewing-configurations).

</TabItem>
<TabItem value="code" label="Ballerina Code">

Place a `Config.toml` file at the project root (alongside `Ballerina.toml`) to supply values for configurable variables. The runtime reads it automatically at startup.

```toml
apiEndpoint = "https://api.example.com/v2"
apiKey = "sk-abc123"
maxRetries = 5
timeoutSeconds = 60.0
enableCache = true
cacheMaxSize = 5000

[notificationConfig]
emailEnabled = true
slackEnabled = true
slackWebhookUrl = "https://hooks.slack.com/services/..."
```

</TabItem>
</Tabs>

:::tip Learn more
For details on supported types, alternative value sources (environment variables, CLI arguments, inline TOML), and resolution priority, refer to the Ballerina configurable variables documentation. To target different environments, point `BAL_CONFIG_FILES` at a per-environment file.
:::

## Best practices

| Practice | Description |
|---|---|
| **Never commit secrets** | Keep secrets out of `Config.toml` files in version control. Supply them through environment variables or a gitignored secrets file. See [Secrets and encryption](../../../deploy-operate/secure/secrets-encryption.md). |
| **Mark required values explicitly** | For configurations that must come from the environment (such as endpoints and credentials), leave **Default Value** empty in the Visual Designer and use the `?` placeholder in code so the value is required and misconfiguration fails fast at startup. |
| **Group related settings** | Use record types to group settings that belong to the same subsystem (for example, database configuration or CRM settings). |
| **Document defaults** | Use the **Documentation** field (or code comments) to explain the purpose and valid range of each setting. |

## What's next

- [Secrets and encryption](../../../deploy-operate/secure/secrets-encryption.md) — Securely manage credentials and other sensitive values.
- [Connections](connections.md) — Use configurable variables to parameterize connections.
