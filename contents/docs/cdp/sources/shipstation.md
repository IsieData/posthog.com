---
title: Linking ShipStation as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: ShipStation
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The ShipStation connector syncs order, shipping, and fulfillment data into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to ShipStation.
3. In ShipStation, go to **Settings > Account > API Settings** and generate an API key and API secret. API access requires a ShipStation plan that includes API access.
4. Back in PostHog, enter your API key and API secret, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `orders` | Order records with items, shipping details, and status | Incremental |
| `shipments` | Shipment records for completed orders | Incremental |
| `fulfillments` | Fulfillment records tracking order completion | Incremental |
| `products` | Product catalog from your connected stores | Full refresh |
| `customers` | Customer records from your orders | Full refresh |
| `stores` | Connected selling channels (Amazon, eBay, Shopify, etc.) | Full refresh |
| `warehouses` | Warehouse locations configured in ShipStation | Full refresh |

**Incremental** tables sync only new or updated records on each run. For `orders`, you can sync by `modifyDate` (captures updates to existing orders) or `createDate` (captures only new orders). For `shipments` and `fulfillments`, incremental sync uses `createDate`.

**Full refresh** tables reload completely on each sync.

## Timezone handling

All timestamps in the ShipStation API use US Pacific time, not UTC. The connector handles this automatically when filtering for incremental syncs.

## Rate limits

ShipStation enforces a hard limit of 40 requests per minute. The connector handles rate limiting automatically with retries and backoff. Initial syncs may take some time if you have a large dataset.

## Sync limitations

Webhook sync isn't currently supported. The connector pulls data on your configured schedule.

## Configuration

<SourceParameters />
