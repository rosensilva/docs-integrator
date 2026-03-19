---
toc_max_heading_level: 4
---

# Actions

The `ballerinax/moesif` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Observability Provider`](#observability-provider) | Activates the Moesif observability provider at module initialization, automatically forwarding distributed traces and runtime metrics from your Ballerina service to Moesif.
 |

---

## Observability Provider

Activates the Moesif observability provider at module initialization, automatically forwarding distributed traces and runtime metrics from your Ballerina service to Moesif.


### Configuration (`MoesifConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `applicationId` | `string` | Required | Your Moesif Collector Application ID, used to authenticate trace and metrics submissions to the Moesif API. |
| `reporterBaseUrl` | `string` | `"https://api.moesif.net"` | Base URL of the Moesif API endpoint to which traces and metrics are sent. |
| `samplerType` | `string` | `"const"` | Trace sampling strategy: `"const"` (all-or-nothing), `"ratelimiting"` (max N traces per second), or `"probabilistic"` (a fraction of requests). |
| `samplerParam` | `decimal` | `1` | Sampler parameter value. For `const`: `1` = sample all, `0` = sample none. For `probabilistic`: a fraction between 0 and 1. For `ratelimiting`: maximum traces per second. |
| `tracingReporterFlushInterval` | `int` | `1000` | How often (in milliseconds) the tracing reporter flushes buffered spans to Moesif. |
| `tracingReporterBufferSize` | `int` | `10000` | Maximum number of spans to hold in the tracing reporter buffer before forcing a flush. |
| `metricsReporterFlushInterval` | `int` | `15000` | How often (in milliseconds) the metrics reporter sends collected metrics to Moesif. |
| `metricsReporterClientTimeout` | `int` | `10000` | HTTP client timeout in milliseconds for metrics reporting requests to Moesif. |
| `additionalAttributes` | `map<string>` | `{}` | Custom key-value pairs attached to all traces and metric data points sent to Moesif. |
| `isTraceLoggingEnabled` | `boolean` | `false` | When `true`, enables internal logging of trace data to assist with debugging the tracing pipeline. |
| `isPayloadLoggingEnabled` | `boolean` | `false` | When `true`, enables logging of HTTP request and response payloads within captured traces. |
| `idleTimePublishingEnabled` | `boolean` | `false` | When `true`, metrics are published to Moesif during idle periods even when no requests are being processed. |

### Initializing the Client

```ballerina
// Step 1 — In Ballerina.toml, enable observability and set the Moesif provider:
//
// [build-options]
// observabilityIncluded = true
//
// [ballerina.observe]
// tracingEnabled = true
// tracingProvider = "moesif"
// metricsEnabled = true
// metricsReporter = "moesif"

// Step 2 — In Config.toml, supply the required Application ID:
//
// [ballerinax.moesif]
// applicationId = "<YOUR_MOESIF_APPLICATION_ID>"

// Step 3 — In your Ballerina source file, import the module to activate the provider:
import ballerinax/moesif as _;
```

### Operations

#### Distributed Tracing

<details>
<summary>Activate distributed tracing</summary>

<div>

When the module is imported and observability is enabled in `Ballerina.toml`, the Moesif tracing provider is automatically initialized at startup. It captures all inbound and outbound HTTP calls as OpenTelemetry spans and forwards them to Moesif via the OTLP HTTP exporter. Sampling behaviour is controlled by `samplerType` and `samplerParam` in `Config.toml`.


**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `samplerType` | `string` | No | Sampling strategy: `"const"`, `"ratelimiting"`, or `"probabilistic"`. Set in `Config.toml`. |
| `samplerParam` | `decimal` | No | Sampling parameter value corresponding to the selected sampler type. Set in `Config.toml`. |
| `tracingReporterFlushInterval` | `int` | No | Interval in milliseconds between span flushes to Moesif. Set in `Config.toml`. |
| `tracingReporterBufferSize` | `int` | No | Maximum buffer size for queued spans. Set in `Config.toml`. |

**Returns:** `error?`

**Sample code:**

```ballerina
// Ballerina.toml
// [build-options]
// observabilityIncluded = true
//
// [ballerina.observe]
// tracingEnabled = true
// tracingProvider = "moesif"

// Config.toml
// [ballerinax.moesif]
// applicationId = "<YOUR_MOESIF_APPLICATION_ID>"
// samplerType = "probabilistic"
// samplerParam = 0.5

// main.bal
import ballerina/http;
import ballerinax/moesif as _;

service on new http:Listener(9090) {
    resource function get greet() returns string {
        return "Hello, World!";
    }
}
```

</div>

</details>

#### Metrics Reporting

<details>
<summary>Activate metrics reporting</summary>

<div>

When the module is active and metrics are enabled in `Ballerina.toml`, the Moesif metrics reporter automatically collects Ballerina runtime metrics (gauge and summary types) and periodically sends them to the Moesif metrics API. No manual invocation is required; the reporter runs in the background for the lifetime of the service.


**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `metricsReporterFlushInterval` | `int` | No | Interval in milliseconds at which metrics are sent to Moesif. Set in `Config.toml`. |
| `metricsReporterClientTimeout` | `int` | No | HTTP timeout in milliseconds for each metrics reporting request. Set in `Config.toml`. |
| `idleTimePublishingEnabled` | `boolean` | No | Whether to publish metrics during idle periods with no active requests. Set in `Config.toml`. |
| `additionalAttributes` | `map<string>` | No | Custom attributes attached to every metric data point. Set in `Config.toml`. |

**Returns:** `error?`

**Sample code:**

```ballerina
// Ballerina.toml
// [build-options]
// observabilityIncluded = true
//
// [ballerina.observe]
// metricsEnabled = true
// metricsReporter = "moesif"

// Config.toml
// [ballerinax.moesif]
// applicationId = "<YOUR_MOESIF_APPLICATION_ID>"
// metricsReporterFlushInterval = 10000
// idleTimePublishingEnabled = true
// additionalAttributes = {env = "production", region = "us-east-1"}

// main.bal
import ballerina/http;
import ballerinax/moesif as _;

service on new http:Listener(9090) {
    resource function get status() returns string {
        return "Metrics are auto-reported to Moesif";
    }
}
```

</div>

</details>
