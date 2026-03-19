# New Relic Connector Overview

New Relic is a cloud-based observability platform for monitoring application performance, infrastructure, and distributed traces. The Ballerina `ballerinax/newrelic` module (v1.0.3) is an observability extension that automatically instruments Ballerina services to export metrics and distributed traces to New Relic — no client instantiation or manual telemetry calls required beyond a side-effect import and configuration.


## Key Features

- Automatic HTTP service metrics collection: response time, request count, error rates, and in-flight request counts
- Distributed tracing via OpenTelemetry exported to New Relic's OTLP endpoint (`otlp.nr-data.net:4317`)
- Kafka publisher and consumer metrics tracking (publishers, consumers, publish error counts)
- Multi-account support — send telemetry to multiple New Relic accounts simultaneously using an array of License Keys
- US and EU region support via the `region` configuration field
- Custom metric attributes via `additionalAttributes` for enriching all exported metrics with static key-value tags
- Configurable trace sampling strategies: constant, rate-limiting, or probabilistic
- Zero-code instrumentation — the module activates entirely through a side-effect import and `Config.toml`

## Actions

The `ballerinax/newrelic` module is an observability extension, not a traditional API client. It activates automatically when imported, registering a metrics reporter and an OpenTelemetry trace provider with the Ballerina runtime. All telemetry is collected and pushed to New Relic passively — no programmatic client calls are needed in your integration code.


| Client | Actions |
|--------|---------|
| `New Relic Module` | Automatic metrics reporting, distributed tracing via OpenTelemetry, multi-account telemetry export |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## New Relic Connector Documentation

* **[New Relic Connector Setup Guide](setup-guide.md)**: This guide walks you through creating a New Relic account and obtaining the License Key required to configure the `ballerinax/newrelic` observability extension.


* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to Contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [New Relic Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-newrelic)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
