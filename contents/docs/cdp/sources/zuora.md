---
title: Linking Zuora as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Zuora
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Zuora connector syncs your subscription billing and revenue data into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Zuora.
3. Select your Zuora environment. Credentials only work with their associated environment, so choose the one that matches your Zuora tenant:
   - **US Production** (default)
   - **US API Sandbox**
   - **US Cloud Production**
   - **US Cloud Sandbox**
   - **EU Production**
   - **EU Sandbox**
   - **Central Sandbox**
4. You need OAuth client credentials from Zuora. In your Zuora dashboard, go to **Settings** > **Administration** > **Manage Users**. A Zuora admin can create an OAuth client under a user account – the client inherits that user's permissions. Copy the **Client ID** and **Client secret**.
5. Back in PostHog, enter the **Client ID** and **Client secret** and click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Zuora data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `accounts` | Customer accounts in your Zuora tenant | Incremental |
| `subscriptions` | Subscription records | Incremental |
| `invoices` | Invoice records | Incremental |
| `payments` | Payment transactions | Incremental |
| `credit_memos` | Credit memo records | Incremental |
| `refunds` | Refund transactions | Incremental |
| `products` | Product catalog entries | Incremental |
| `orders` | Order records | Incremental |

All tables support **incremental** syncing, meaning only new or updated records sync on each run. Zuora tracks changes using the `updatedDate` field.

## Configuration

<SourceParameters />
