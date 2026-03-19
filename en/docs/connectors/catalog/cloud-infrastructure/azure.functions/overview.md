# Azure Functions Connector Overview

Azure Functions is a serverless compute service from Microsoft that lets you run event-driven code without managing infrastructure. The Ballerina `ballerinax/azure.functions` connector (v4.2.0) enables you to build Azure Functions in Ballerina, supporting HTTP, Queue, Blob, CosmosDB, and Timer triggers together with input and output bindings, and compiles to a native Azure Functions deployment artifact.


## Key Features

- HTTP trigger with configurable auth levels (anonymous, function, admin) and Ballerina resource function routing
- Azure Storage Queue trigger and output binding for message-driven integrations
- Azure Blob Storage trigger and output binding for file and binary content processing
- CosmosDB change-feed trigger, input binding, and output binding for document-level event handling
- Timer trigger for scheduled functions using CRON expressions with optional run-on-startup
- Twilio SMS output binding for sending notifications directly from any trigger callback
- Multi-output support via annotated tuple return types for writing to multiple Azure services in one invocation
- Automatic Azure Functions deployment artifact generation via `bal build --cloud=azure_functions`

## Triggers

Triggers allow your Ballerina code to react to events in Azure — HTTP requests, queue messages, blob changes, CosmosDB document updates, and scheduled timers. Each listener type corresponds to one Azure trigger, is configured via an annotation on the listener declaration, and dispatches events to your service callbacks automatically.


Supported trigger events:

| Event | Callback | Description |
|-------|----------|-------------|
| HTTP request received | `resource function` | Fired when an HTTP request arrives at the Azure Function endpoint. |
| Queue message received | `onMessage` | Fired when a new message is placed on the configured Azure Storage queue. |
| Blob created or updated | `onUpdate` | Fired when a blob is created or updated at the configured Blob Storage path. |
| CosmosDB documents changed | `onUpdate` | Fired when documents in the configured CosmosDB collection are created or modified. |
| Timer fired | `onTrigger` | Fired on a schedule defined by a CRON expression. |

See the **[Trigger Reference](trigger-reference.md)** for listener configuration, service callbacks, and the `EventData` payload structure.

## Azure Functions Connector Documentation

* **[Azure Functions Connector Setup Guide](setup-guide.md)**: This guide walks you through creating an Azure Function App and configuring the Azure resources and credentials required by the Azure Functions connector.

* **[Trigger Reference](trigger-reference.md)**: Reference for event-driven integration using the listener and service model.

## How to Contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Azure Functions Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-azure.functions)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
