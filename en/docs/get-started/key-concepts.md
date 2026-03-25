---
sidebar_position: 3
title: Key Concepts
description: The vocabulary you need to understand WSO2 Integrator.
---

# Key Concepts

This page introduces every major product component in 2–3 sentences. Think of it as your vocabulary guide — it gives you the map. The [Develop](/docs/develop/integration-artifacts/overview) section is the territory.

## Services

Expose your integrations over HTTP, GraphQL, gRPC, WebSocket, or TCP. Services are the most common artifact — they define endpoints that external systems call.

## Automations

Scheduled or manually triggered integrations that run without an external request. Use automations for periodic data sync, cleanup tasks, or report generation.

## Event Handlers

Reactive integrations triggered by messages from Kafka, RabbitMQ, NATS, or MQTT. Event handlers process streaming data in real time.

## File Processors

Integrations triggered by file arrival on FTP, SFTP, or local directories. Process CSV, JSON, XML, or fixed-width files in batch or one at a time.

## AI Agents

Intelligent artifacts backed by large language models (LLMs). Agents can reason, use tools, maintain conversation memory, and orchestrate multi-step workflows.

## Connectors

Pre-built modules for connecting to external systems — Salesforce, databases, Kafka, OpenAI, and 200+ more. Each connector handles authentication, serialization, and error handling. → [Connectors](/docs/connectors/overview)

## Visual Data Mapper

A drag-and-drop data transformation tool in the VS Code extension. Map fields between source and target schemas visually, with AI-assisted suggestions. → [Visual Data Mapper](/docs/develop/transform/data-mapper)

## Natural Functions

LLM calls treated as typed function calls in your integration code. Define an input type and output type, and the platform handles the prompt, API call, and response parsing.

## Config.toml

The file where you define environment-specific configuration — database URLs, API keys, feature flags. Different environments (dev, test, prod) get different Config.toml files.

## Integration Control Plane (ICP)

A dashboard for monitoring, managing, and troubleshooting running integrations in production. View logs, metrics, and trace requests across services. → [ICP](/docs/deploy-operate/observe/icp)

## Ballerina

The programming language powering everything under the hood. You don't need to be a Ballerina expert to use the visual designer, but knowing the basics unlocks pro-code capabilities.

## Low-Code ↔ Pro-Code

Seamless switching between the visual designer and the code editor. Changes in one view are instantly reflected in the other. This is not a code generation tool — it's a bidirectional sync.
