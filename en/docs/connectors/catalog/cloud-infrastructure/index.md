---
title: "Cloud & Infrastructure"
description: "Cloud and infrastructure connectors available in WSO2 Integrator."
---

# Cloud & Infrastructure

<!-- TODO: Searchable grid/table with: name, icon, 1-line description, supported operations, link to detail page -->

## Available connectors

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [AWS Lambda](aws.lambda/overview.md) | Serverless function deployment to AWS Lambda with annotation-based compilation and event type support | Deploy, S3 Events, SQS Events, DynamoDB Events, SES Events, API Gateway | AWS IAM Role |
| [AWS Marketplace MPE](aws.marketplace.mpe/overview.md) | Retrieve customer entitlements for AWS Marketplace products | GetEntitlements | AWS Access Keys |
| [AWS Marketplace MPM](aws.marketplace.mpm/overview.md) | AWS Marketplace metering for customer resolution and usage billing | Resolve Customer, Batch Meter Usage | AWS Access Key |
| [Azure Functions](azure.functions/overview.md) | Serverless Azure Functions framework with HTTP, Queue, Blob, CosmosDB, and Timer triggers | HTTP Trigger, Queue Trigger, Blob Trigger, CosmosDB Trigger, Timer Trigger, Output Bindings | Azure App Settings (storage connection strings, function keys, CosmosDB connection strings) |
| [Elastic Cloud](elastic.elasticcloud/overview.md) | Elastic Cloud management with deployments, traffic filters, organizations, API keys, and stack versions | Create, List, Search, Update, Shutdown, Restore, Delete | API Key |
