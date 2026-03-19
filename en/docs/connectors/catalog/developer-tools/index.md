---
title: "Developer Tools"
description: "Developer tools connectors available in WSO2 Integrator."
---

# Developer Tools Connectors

<!-- TODO: Searchable grid/table with: name, icon, 1-line description, supported operations, link to detail page -->

## Available Connectors

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [Github](github/overview.md) | Source control platform with repository, issue, pull request, and organization management | Create, Read, Update, Delete, List, Merge, Review | Personal Access Token |
| [AMP](amp/overview.md) | Ballerina observability extension that exports OpenTelemetry traces to the WSO2 AI Agent Management Platform | Tracing | API Key |
| [Copybook](copybook/overview.md) | COBOL copybook serialization and deserialization library for mainframe data integration | Serialize, Deserialize, Encode, Decode | None |
| [IDE Trace Provider](idetraceprovider/overview.md) | OpenTelemetry trace export extension for Ballerina IDE and development environments | Initialize, Configure, Export Traces | None |
| [New Relic](newrelic/overview.md) | Observability extension that auto-exports Ballerina runtime metrics and distributed traces to New Relic | Metrics Export, Distributed Tracing, Multi-account Fan-out | API Key (License Key) |
| [Moesif](moesif/overview.md) | API observability provider for forwarding distributed traces and metrics to Moesif | Distributed Tracing, Metrics Reporting | API Key (Application ID) |
| [WSO2 APIM Catalog](wso2.apim.catalog/overview.md) | WSO2 API Manager Service Catalog for registering and managing backend service definitions | Create, Read, Update, Delete, Import, Export, Settings | OAuth 2.0 Password Grant |

## What's Next

- [Connection Configuration](configuration.md) — How to set up connections
- [Authentication Methods](authentication.md) — Supported auth types
