---
title: "Connectors Overview"
description: "What are connectors and how they work in WSO2 Integrator."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connectors Overview

Connectors are pre-built integration components that let you connect WSO2 Integrator to external services, APIs, databases, and messaging systems — without writing low-level HTTP or protocol code.

## What Is a Connector?

A connector is a Ballerina package that wraps an external service's API into a set of typed, ready-to-use clients and operations. Instead of manually constructing HTTP requests, handling authentication, and parsing responses, you work with strongly-typed Ballerina records and function calls.

![Connection Page](/img/connectors/overview/connection-landing-page.png)

For example, to send an SMS via Twilio:
<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Create a Twilio connection by following the steps in [Connections](../develop/integration-artifacts/supporting/connections.md).

2. In the canvas, click **+** to add a new operation.

3. From the connector list, select the client you created, then choose the **Create Message** action.

   ![Select Twilio Client](/img/connectors/overview/select-twilio.png)

4. In the action configuration panel, fill the following values,
    ```
    Payload: 
    {
	To: "+1234567890",
	From: "+0987654321",
	Body: "Hello from WSO2 Integrator!"
    }
    ```

   ![Fill Twilio Create Message](/img/connectors/overview/fill-twilio-create-message.png)

5. Click **Save**. The action is now part of your integration flow.

   ![Twilio Create Message Completed](/img/connectors/overview/twilio-completed.png)

</TabItem>
<TabItem value="source" label="Source" default>

    ```ballerina
    import ballerinax/twilio;

    twilio:Client twilio = check new ({
        auth: {
            username: accountSid,
            password: authToken
        }
    });

    twilio:CreateMessageRequest message = {
        to: "+1234567890",
        from_: "+0987654321",
        body: "Hello from WSO2 Integrator!"
    };

    twilio:Message response = check twilio->createMessage(message);
    ```
</TabItem>
</Tabs>

## How Connectors Work in WSO2 Integrator

WSO2 Integrator is built on Ballerina, and connectors are distributed as packages on [Ballerina Central](https://central.ballerina.io). When you add a connector to your integration project:

1. **Import** — Add the connector package as a dependency in your `Ballerina.toml`
2. **Configure** — Provide credentials and connection settings (API keys, OAuth tokens, endpoints) using Ballerina's `configurable` variables
3. **Invoke** — Call connector operations directly in your integration logic using Ballerina's `check` expression for error handling

## Actions and Triggers

Connectors expose two types of integration points:

| Type | Description | Example |
|------|-------------|---------|
| **Actions** | Outbound calls you make to the external service | Send a message, create a record, query data |
| **Triggers** | Inbound events the external service sends to your integration | New database row, incoming message, file upload |

Not all connectors support both — see each connector's documentation for what's available.

## Next Steps

- [Connector Catalog](index.md) — Browse all available connectors
- [Build Your Own](build-your-own/custom-development.md) — Create a custom connector
