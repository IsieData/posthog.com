---
title: Linking Braintree as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Braintree
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Braintree connector syncs your payments data into PostHog, including transactions, refunds, and disputes.

## Linking Braintree

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Braintree.

3. Select your **Environment** — either **Production** or **Sandbox**. Sandbox and production environments use separate API hosts and keys, so make sure the environment matches your keys.

4. You need API keys from Braintree. In your [Braintree control panel](https://www.braintreegateway.com/), go to **Settings** > **API Keys**. Copy your **Public key** and **Private key**.

5. Back in PostHog, paste your keys into the **Public key** and **Private key** fields.

6. Click **Next**.

7. Select the schemas you want to sync and configure the sync method and frequency. Click **Import**.

Once the syncs are complete, you can start using Braintree data in PostHog.

## Available tables

| Table        | Description                               | Sync mode   |
| ------------ | ----------------------------------------- | ----------- |
| transactions | Payment transactions                      | Incremental |
| refunds      | Refund records                            | Incremental |
| disputes     | Chargebacks and disputes                  | Incremental |

## Sync modes

All Braintree tables support incremental syncing using `createdAt` as the replication key. PostHog only fetches new records on each sync, reducing both sync time and API usage.

## Configuration

<SourceParameters />
