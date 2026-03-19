---
toc_max_heading_level: 4
---

# Actions

The `ballerinax/idetraceprovider` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Trace Provider`](#trace-provider) | Automatically initializes an OTLP HTTP trace exporter when the Ballerina runtime starts with tracing enabled. |

---

## Trace Provider

Automatically initializes an OTLP HTTP trace exporter when the Ballerina runtime starts with tracing enabled.

### Configuration (`Module-Level Configurable`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `endpoint` | `string` | `http://localhost:59500/v1/traces` | The OTLP HTTP endpoint to which Ballerina traces are exported. Override via `Config.toml` to point to a custom OTLP backend. |

### Initializing the Client

```ballerina
import ballerinax/idetraceprovider as _;
```

### Operations

#### Trace Initialization

<details>
<summary>initialize</summary>

<div>

Initializes the OTLP trace exporter at Ballerina program startup using the configured endpoint. Invoked automatically by the Ballerina runtime's module initialization lifecycle when the module is imported and tracing is enabled — no explicit function call is required in application code.


**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `endpoint` | `string` | No | The OTLP HTTP endpoint configured via `[ballerinax.idetraceprovider]` in `Config.toml`. Defaults to `http://localhost:59500/v1/traces`.
 |

**Returns:** `error?`

**Sample code:**

```ballerina
// main.bal — import the module as a side effect to activate tracing
import ballerinax/idetraceprovider as _;

public function main() {
    // Application logic runs here; traces are automatically
    // exported to the configured OTLP endpoint.
}
```

</div>

</details>
