---
title: "Setup Guide"
description: "How to set up and configure the ballerinax/hubspot.crm.commerce.taxes connector."
---

# Setup Guide

This guide walks you through creating a HubSpot private app or OAuth app and obtaining the credentials required to use the HubSpot CRM Commerce Taxes connector.


## Prerequisites

- A HubSpot account with a Commerce Hub subscription. If you do not have one, [sign up for a free HubSpot account](https://app.hubspot.com/signup).

## Create a HubSpot Developer Account (for OAuth)

1. Go to the [HubSpot Developer Portal](https://developers.hubspot.com/).
2. Click **Create a developer account** (or log in if you already have one).
3. Complete the registration form and verify your email.


## Create an OAuth App

1. In the HubSpot Developer Portal, navigate to **Apps** in the top navigation.
2. Click **Create app**.
3. Fill in the **App info** tab with a name and description.
4. Go to the **Auth** tab.
5. Note the **Client ID** and **Client Secret** — you will need these for authentication.
6. Under **Redirect URLs**, add your callback URL (e.g., `https://localhost/callback`).
7. Under **Scopes**, add the following scopes:
    - `crm.objects.commercepayments.read`
    - `crm.objects.commercepayments.write`
    - `e-commerce`
8. Click **Save**.


:::note
If you only need basic access, you can use a Private App instead of OAuth. Private apps use a simpler API key-based authentication.
:::

## Generate OAuth Tokens

1. Construct the authorization URL:

    ```
    https://app.hubspot.com/oauth/authorize?client_id=<YOUR_CLIENT_ID>&redirect_uri=<YOUR_REDIRECT_URI>&scope=crm.objects.commercepayments.read%20crm.objects.commercepayments.write%20e-commerce
    ```

2. Open the URL in a browser and select the HubSpot account to authorize.
3. After authorization, HubSpot redirects to your callback URL with a `code` query parameter. Copy the `code` value.
4. Exchange the code for tokens using a POST request:

    ```
    POST https://api.hubapi.com/oauth/v1/token
    Content-Type: application/x-www-form-urlencoded

    grant_type=authorization_code
    &code=<AUTHORIZATION_CODE>
    &client_id=<YOUR_CLIENT_ID>
    &client_secret=<YOUR_CLIENT_SECRET>
    &redirect_uri=<YOUR_REDIRECT_URI>
    ```

5. The response contains `access_token` and `refresh_token`. Copy the `refresh_token`.


:::tip
The refresh token does not expire unless the app is uninstalled. Store it securely and use Ballerina's `configurable` feature with a `Config.toml` file to supply credentials at runtime.
:::

## Alternative — Create a Private App

1. In your HubSpot account, click the gear icon and go to **Settings**.
2. In the left sidebar, navigate to **Integrations > Private Apps**.
3. Click **Create a private app**.
4. Enter a name and description for the app.
5. Go to the **Scopes** tab and add the required scopes:
    - `crm.objects.commercepayments.read`
    - `crm.objects.commercepayments.write`
    - `e-commerce`
6. Click **Create app** and confirm.
7. Copy the **Access token** displayed — this is your bearer token.


:::warning
Private app tokens provide full access to the scopes you configure. Treat them like passwords — never commit them to source control.
:::

## Next Steps

- [Actions Reference](action-reference.md) - Available operations
