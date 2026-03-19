# Setup Guide

This guide walks you through creating a Moesif account, creating an application, and obtaining the Application ID required to configure the Ballerina Moesif observability provider.


## Prerequisites

- A Moesif account. Sign up for free at [moesif.com](https://www.moesif.com/signup).

## Step 1: Create a Moesif Account

1. Go to [moesif.com](https://www.moesif.com/signup) and sign up for a free account.
2. Verify your email address when prompted.
3. Complete the onboarding form (company name, role, and intended use case).

## Step 2: Create a New Application

1. After logging in, you will be prompted to create your first application (or click **New Application** from the dashboard).
2. Enter an **Application Name** (e.g., `My Ballerina Service`).
3. Select the API type that best matches your service.
4. Click **Create** to finish creating the application.

## Step 3: Obtain Your Application ID

1. In the Moesif dashboard, navigate to **Settings** → **Installation** (or click the gear icon in the left sidebar).
2. Select the **Server Integration** or **API Keys** tab.
3. Your **Collector Application ID** is displayed — it is a base64-encoded string (e.g., `eyJhcCI6Ij...`).
4. Copy this value — you will supply it as `applicationId` in your `Config.toml`.

:::tip
Keep your Application ID secure. Do not commit it to source control. Use Ballerina's `configurable` feature and supply the value at runtime via a `Config.toml` file or environment variables.
:::

## Step 4: (Optional) Set Up Log Ingestion via OpenTelemetry Collector

Moesif can receive Ballerina logs forwarded through a Fluent Bit → OpenTelemetry Collector pipeline:

1. Deploy a [Fluent Bit](https://fluentbit.io/) sidecar alongside your Ballerina service to collect log output.
2. Configure Fluent Bit to forward log records to a running [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/).
3. In the OpenTelemetry Collector's exporter configuration, set the endpoint to Moesif's log ingestion URL:

    ```
    https://api.moesif.net/v1/logs/opentelemetry
    ```

4. Add the `X-Moesif-Application-Id` header with your Application ID value to the exporter headers.
5. Restart the collector for the configuration to take effect.

:::note
Log ingestion via OpenTelemetry Collector is optional infrastructure. Distributed traces and runtime metrics are forwarded directly by the Ballerina connector without requiring any additional pipeline components.
:::
