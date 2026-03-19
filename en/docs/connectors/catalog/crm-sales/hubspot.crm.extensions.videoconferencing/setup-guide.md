---
title: "Setup Guide"
description: "How to set up and configure the ballerinax/hubspot.crm.extensions.videoconferencing connector."
---

# Setup Guide

This guide walks you through creating a HubSpot developer app and obtaining the API key required to use the HubSpot CRM Extensions Videoconferencing connector.


## Prerequisites

- A HubSpot developer account. If you do not have one, [sign up for a free HubSpot developer account](https://developers.hubspot.com/get-started).

## Create a HubSpot Developer App

1. Log in to your [HubSpot developer account](https://app.hubspot.com/signup-hubspot/developers).
2. Navigate to **Apps** in the top navigation bar.
3. Click **Create app**.
4. Under **App Info**, fill in a name (e.g., `Ballerina Video Conferencing`) and optionally a description.
5. Click **Create app** to save.


## Get Your App ID

1. After creating the app, you will be taken to the app settings page.
2. Copy the **App ID** shown on the page — you will use this as the `appId` parameter in API calls.


:::note
The App ID is an integer that uniquely identifies your HubSpot app. It is used as a path parameter in all videoconferencing settings API calls.
:::

## Get Your Developer API Key

1. In your HubSpot developer account, navigate to **Apps** and select your app.
2. Go to the **Auth** tab.
3. Find and copy the **Developer API Key** (also known as `hapikey`).


:::tip
Store the API key securely. Do not commit it to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

:::

## Configure Videoconferencing Webhook URLs

Before HubSpot can interact with your video conferencing service, you need to prepare
the HTTPS endpoints your service exposes:

- **Create Meeting URL** (required): Endpoint HubSpot calls to create a new video conference.
- **Update Meeting URL** (optional): Endpoint HubSpot calls when meeting details change.
- **Delete Meeting URL** (optional): Endpoint HubSpot calls when a meeting is deleted.
- **User Verify URL** (optional): Endpoint HubSpot calls to verify a user exists in your system.

All URLs must use the `https` protocol.


:::warning
All webhook URLs must use HTTPS. HTTP URLs are not accepted by the HubSpot API.
:::

## Next Steps

- [Actions Reference](action-reference.md) - Available operations
