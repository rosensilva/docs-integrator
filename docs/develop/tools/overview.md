---
title: Integration Tools
---

# Integration tools

Accelerate integration development with Ballerina CLI tools that generate service stubs, client code, schemas, and data converters from industry-standard specifications. These tools eliminate boilerplate and ensure your integrations conform to API contracts, protocol definitions, and data standards.

In WSO2 Integrator, most tools are accessible both from the command line and from the Visual Designer in VS Code.

![VS Code command palette showing bal tool commands](/img/develop/tools/overview/command-palette.png)

## Code generation tools

Generate Ballerina code from API specifications and protocol definitions.

- [OpenAPI Tool](openapi-tool.md) -- Generate HTTP services and clients from OpenAPI/Swagger specifications
- [GraphQL Tool](graphql-tool.md) -- Generate GraphQL services and clients from SDL schemas
- [AsyncAPI Tool](asyncapi-tool.md) -- Generate event-driven services from AsyncAPI specifications
- [gRPC Tool](grpc-tool.md) -- Generate gRPC services and clients from Protocol Buffer definitions
- [WSDL Tool](wsdl-tool.md) -- Generate clients for SOAP/WSDL web services
- [XSD Tool](xsd-tool.md) -- Generate Ballerina record types from XML Schema definitions

## Domain-specific tools

Specialized tools for healthcare and B2B integration domains.

- [Health Tool](health-tool.md) -- Generate FHIR and HL7 integration code for healthcare systems
- [EDI Tool](edi-tool.md) -- Generate Ballerina code from EDI schema definitions for B2B data exchange

## Code quality tools

- [Scan Tool](scan-tool.md) -- Run static code analysis to detect security, quality, and best practice issues

## Migration tools

- [Migration Tools](migration-tools.md) -- Migrate integrations from WSO2 MI, MuleSoft, and other platforms

## Quick reference

| Tool | Command | Input | Output | UI support |
|------|---------|-------|--------|------------|
| OpenAPI | `bal openapi` | OpenAPI YAML/JSON | Service stub or client | Visual Designer |
| GraphQL | `bal graphql` | GraphQL SDL | Service or client | Visual Designer |
| AsyncAPI | `bal asyncapi` | AsyncAPI spec | Event listener service | Visual Designer |
| gRPC | `bal grpc` | `.proto` file | Service stub and client | Visual Designer |
| WSDL | `bal wsdl` | WSDL file | SOAP client | Visual Designer |
| XSD | `bal xsd` | `.xsd` file | Record types | Visual Designer |
| Health | `bal health` | FHIR/HL7 profiles | Healthcare types and templates | CLI only |
| EDI | `bal edi` | EDI schema | EDI parser/generator | CLI only |
| Scan | `bal scan` | Source code | Analysis report | CLI only |

## What's next

Start with the [OpenAPI Tool](openapi-tool.md) if you are building REST API integrations, or browse the full list to find the tool that matches your specification format.
