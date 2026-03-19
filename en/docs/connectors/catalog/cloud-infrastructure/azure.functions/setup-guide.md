# Setup Guide

This guide walks you through creating an Azure Function App and configuring the Azure resources and credentials required by the Azure Functions connector.


## Prerequisites

- An active Microsoft Azure account. If you do not have one, [sign up for a free Azure account](https://azure.microsoft.com/free/).
- Access to the [Azure Portal](https://portal.azure.com/) or the Azure CLI (`az login`).

## Step 1: Create a Resource Group

1. Log in to the [Azure Portal](https://portal.azure.com/).
2. In the left navigation, select **Resource groups**, then click **+ Create**.
3. Choose your **Subscription**, enter a **Resource group name** (e.g., `my-functions-rg`), and select a **Region**.
4. Click **Review + create**, then **Create**.

## Step 2: Create an Azure Storage Account

Azure Functions requires a Storage Account for internal runtime state and for Queue and Blob triggers.

1. In the Azure Portal, search for **Storage accounts** and click **+ Create**.
2. Select your resource group and enter a globally unique **Storage account name** (3–24 lowercase alphanumeric characters).
3. Choose the same **Region** as your resource group, then click **Review + create** → **Create**.
4. After deployment, open the storage account and go to **Security + networking → Access keys**.
5. Copy the **Connection string** under `key1` — this is the value you will use for the `AzureWebJobsStorage` application setting.

:::note
The storage account name must be globally unique across all Azure subscriptions. Use only lowercase letters and digits, 3–24 characters.
:::

## Step 3: Create the Azure Function App

1. In the Azure Portal, search for **Function App** and click **+ Create**.
2. Fill in the required fields:
    - **Subscription**: Your Azure subscription.
    - **Resource Group**: The resource group you created above.
    - **Function App name**: A globally unique name (e.g., `my-ballerina-app`).
    - **Runtime stack**: Select **Custom Handler**.
    - **Version**: `custom`.
    - **Region**: Same as your resource group.
    - **Operating System**: **Windows** (Linux is not supported for custom handlers with this connector).
    - **Plan type**: Consumption (Serverless) or your preferred hosting plan.
3. Click **Review + create**, then **Create**.

:::warning
You must select **Windows** as the operating system. The connector's custom handler is not supported on Linux-hosted Function Apps.
:::

## Step 4: Configure Application Settings

Application settings in Azure Functions act as environment variables. Connection strings and
credentials referenced in your trigger and binding annotations must be added here.

1. Open your Function App and navigate to **Settings → Configuration → Application settings**.
2. Click **+ New application setting** for each of the following (add only the settings relevant to your triggers/bindings):

    | Setting Name | Value | Used By |
    |---|---|---|
    | `AzureWebJobsStorage` | Storage account connection string from Step 2 | Queue and Blob triggers/outputs; runtime |
    | `CosmosDBConnection` | CosmosDB account connection string | CosmosDB trigger, input, and output |
    | `AzureWebJobsTwilioAccountSid` | Twilio Account SID | Twilio SMS output |
    | `AzureWebJobsTwilioAuthToken` | Twilio Auth Token | Twilio SMS output |

3. Click **Save** after adding all required settings.

:::tip
You can use custom names for these settings instead of the defaults. Set the `connection` field (Queue/Blob) or `connectionStringSetting` field (CosmosDB) in the trigger annotation to the exact name of your custom App Setting.
:::

## Step 5: Get the CosmosDB Connection String (if using CosmosDB)

1. In the Azure Portal, open your **Azure Cosmos DB** account.
2. Under **Settings**, select **Keys**.
3. Copy the **PRIMARY CONNECTION STRING**.
4. Add it as an Application Setting (e.g., `CosmosDBConnection`) in your Function App as described in the previous step.

## Step 6: Get Twilio Credentials (if using Twilio SMS output)

1. Log in to the [Twilio Console](https://console.twilio.com/).
2. From the dashboard, copy your **Account SID** and **Auth Token**.
3. Add them as Application Settings `AzureWebJobsTwilioAccountSid` and `AzureWebJobsTwilioAuthToken` in your Function App.
