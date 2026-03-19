# Setup Guide

This guide walks you through creating an Asana Personal Access Token to authenticate with the Asana connector.


## Prerequisites

- An active Asana account. If you do not have one, [sign up for free](https://asana.com/create-account).

## Step 1: Navigate to the Asana Developer Console

1. Log in to your Asana account.
2. Go to the [Asana Developer Console](https://app.asana.com/0/my-apps).

## Step 2: Create a Personal Access Token

1. In the Developer Console, click **+ Create new token**.
2. Enter a descriptive **Token name** (e.g., `Ballerina Asana Connector`).
3. Read and accept the **Asana API Terms and Conditions**.
4. Click **Create token**.
5. Copy the generated token immediately — it will not be shown again.

:::warning
Store the Personal Access Token securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.
:::

## Step 3: Find Your Workspace GID

Most Asana API operations require a workspace GID. To find yours:

1. Open Asana in your browser and navigate to any project.
2. The workspace GID can be found in the URL, or you can retrieve it programmatically using the `GET /workspaces` endpoint after configuring the connector.

:::tip
You can also use the Asana API Explorer at https://developers.asana.com/explorer to test API calls and discover resource GIDs.
:::
