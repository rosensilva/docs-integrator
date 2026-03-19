---
title: "Finance & Accounting"
description: "Finance and accounting connectors available in WSO2 Integrator."
---

# Finance & Accounting Connectors

<!-- TODO: Searchable grid/table with: name, icon, 1-line description, supported operations, link to detail page -->

## Available Connectors

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [Stripe](stripe/overview.md) | Payment processing platform with customers, charges, invoices, subscriptions, and payouts | Create, Read, Update, Delete, List | API Key (Bearer Token) |
| [PayPal Invoices](paypal.invoices/overview.md) | Invoicing platform with invoice CRUD, payments, refunds, search, and template management | Create, Read, Update, Delete, Send, Search, Templates | OAuth 2.0 (Client Credentials) |
| [PayPal Payments](paypal.payments/overview.md) | Payment platform with authorization, capture, void, and refund operations | Authorize, Capture, Void, Refund, Show Details | OAuth 2.0 (Client Credentials) |
| [PayPal Orders](paypal.orders/overview.md) | Payment orders API with creation, authorization, capture, and shipment tracking | Create, Read, Update, Authorize, Capture, Track | OAuth 2.0 (Client Credentials) |
| [PayPal Subscriptions](paypal.subscriptions/overview.md) | PayPal recurring billing platform for creating subscription plans and managing subscription lifecycles | Create, Read, Update, Activate, Deactivate, Suspend, Cancel, Revise, Capture, List | OAuth 2.0 |

## What's Next

- [Connection Configuration](configuration.md) — How to set up connections
- [Authentication Methods](authentication.md) — Supported auth types
