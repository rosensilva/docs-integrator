# Setup Guide

This guide walks you through creating a New Relic account and obtaining the License Key required to configure the `ballerinax/newrelic` observability extension.


## Prerequisites

- A New Relic account. If you do not have one, [sign up for a free account at New Relic](https://newrelic.com/signup).

## Step 1: Log in to New Relic and navigate to API Keys

1. Log in to your New Relic account at [one.newrelic.com](https://one.newrelic.com).
2. Click your account name in the top-right corner and select **API keys**.
3. Alternatively, navigate to **[one.newrelic.com > All capabilities > API keys](https://one.newrelic.com)**.

## Step 2: Create a License Key (Ingest key)

1. On the **API keys** page, click **Create a key**.
2. Set **Key type** to **Ingest - License**.
3. Provide a descriptive **Name** (e.g., `Ballerina Observability`).
4. Click **Create a key**.
5. Copy the generated key value — this is your `apiKey`.

:::warning
Store the License Key securely. Do not commit it to source control. Supply it at runtime via `Config.toml` under `[ballerinax.newrelic]` or via the `BALLERINA_NEW_RELIC_API_KEY` environment variable.
:::

## Step 3: Identify your New Relic region

New Relic operates in two regions:

- **US** (default): Data is sent to `metric-api.newrelic.com` and `otlp.nr-data.net`.
- **EU**: Data is sent to `metric-api.eu.newrelic.com` and `otlp.eu01.nr-data.net`.

Check your account's data center region in **Administration > Account settings**.
Set the `region` field to `"us"` or `"eu"` accordingly in your `Config.toml`.

:::note
If you signed up at `newrelic.com` (not `newrelic.com/de` or similar EU domains), your region is most likely `"us"`.
:::

## Step 4: (Optional) Set up a multi-account configuration

To send telemetry to multiple New Relic accounts simultaneously, collect a License Key
for each account following Step 2, then supply them as a comma-separated list in the
`BALLERINA_NEW_RELIC_API_KEY` environment variable:

```
BALLERINA_NEW_RELIC_API_KEY="<KEY_ACCOUNT_1>, <KEY_ACCOUNT_2>"
```

Or supply them as an array in `Config.toml`:

```toml
[ballerinax.newrelic]
apiKey = ["<KEY_ACCOUNT_1>", "<KEY_ACCOUNT_2>"]
```
