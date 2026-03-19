# IDE Trace Provider Connector Overview

The `ballerinax/idetraceprovider` (v0.9.0) is a Ballerina observability extension that exports traces using the OpenTelemetry Protocol (OTLP) over HTTP to a configurable endpoint, designed specifically for IDE and development environments. It integrates transparently with the Ballerina observability framework and activates automatically at program startup, sending trace data to any OTLP-compatible receiver such as the Ballerina VSCode extension's built-in trace viewer at `http://localhost:59500/v1/traces`.


## Key Features

- Exports Ballerina program traces using the OpenTelemetry Protocol (OTLP) over HTTP
- Zero-code activation via side-effect import (`import ballerinax/idetraceprovider as _`) — no client instantiation required
- Configurable OTLP endpoint — defaults to `http://localhost:59500/v1/traces` for seamless local IDE integration
- Seamlessly integrates with the Ballerina observability framework (`ballerina/observe`)
- GraalVM native image compatible for use in cloud-native and performance-sensitive deployments
- Designed for development workflows — pairs directly with the Ballerina VSCode extension's trace visualization panel

## Actions

The IDE Trace Provider does not expose a traditional client. Instead, it activates automatically at Ballerina program startup when imported as a side-effect module. Tracing is configured entirely through `Config.toml`, and the provider initializes the OTLP exporter when tracing is enabled and the provider name is set to `idetraceprovider`.


| Client | Actions |
|--------|---------|
| `Trace Provider` | OTLP trace export initialization and endpoint configuration |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## IDE Trace Provider Connector Documentation

* **[IDE Trace Provider Connector Setup Guide](setup-guide.md)**: This guide walks you through setting up an OTLP-compatible trace receiver endpoint so the IDE Trace Provider can deliver Ballerina traces for visualization.


* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to Contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [IDE Trace Provider Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-idetraceprovider)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
