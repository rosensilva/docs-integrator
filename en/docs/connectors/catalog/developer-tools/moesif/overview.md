# Moesif Connector Overview

Moesif is an API observability and analytics platform that captures distributed traces, runtime metrics, and API event data for monitoring and debugging. The Ballerina `ballerinax/moesif` connector (v1.0.3) is an observability provider extension that integrates with Ballerina's built-in observability framework to automatically forward distributed traces and application metrics from your Ballerina services to the Moesif platform — no manual API calls required.


## Key Features

- Automatic distributed tracing using OpenTelemetry/OTLP, forwarded to Moesif's trace ingestion endpoint
- Automatic Ballerina runtime metrics collection and periodic reporting to the Moesif metrics API
- Configurable trace sampling strategies: constant (`const`), rate-limiting (`ratelimiting`), and probabilistic (`probabilistic`)
- Configurable flush intervals and buffer sizes for both the tracing reporter and metrics reporter
- Optional trace content and payload logging for deep API observability and debugging
- Support for custom additional attributes attached to all telemetry data sent to Moesif
- Idle-time metrics publishing to maintain continuous observability coverage during low-traffic periods

## Actions

The Moesif connector operates as a Ballerina observability provider — it does not expose a traditional client API with callable operations. Instead, importing the module activates the Moesif tracing and metrics reporters automatically at program startup. All configuration is supplied through `Config.toml` entries under the `[ballerinax.moesif]` section.


| Client | Actions |
|--------|---------|
| `Moesif Observability Provider` | Distributed tracing via OpenTelemetry/OTLP, metrics reporting, observability configuration |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Moesif Connector Documentation

* **[Moesif Connector Setup Guide](setup-guide.md)**: This guide walks you through creating a Moesif account, creating an application, and obtaining the Application ID required to configure the Ballerina Moesif observability provider.


* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to Contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Moesif Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-moesif)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
