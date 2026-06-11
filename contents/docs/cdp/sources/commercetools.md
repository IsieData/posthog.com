---
title: Linking commercetools as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: commercetools
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your commercetools API client credentials to pull your commerce data into the PostHog data warehouse. The sync uses OAuth2 client credentials to authenticate.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to commercetools.
3. You need four things from commercetools:
   - **Region** – select the region your commercetools project is hosted in (North America GCP, North America AWS, Europe GCP, Europe AWS, or Australia GCP).
   - **Project key** – your commercetools project identifier, shown in the Merchant Center under Settings > Developer settings.
   - **Client ID** – from your API client credentials.
   - **Client secret** – from your API client credentials.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using commercetools data in PostHog.

## Creating API credentials in commercetools

To create API credentials with the right scopes:

1. Open the [commercetools Merchant Center](https://mc.commercetools.com/).
2. Go to **Settings > Developer settings > API clients**.
3. Click **Create new API client**.
4. Give the client a name (e.g., "PostHog Data Warehouse").
5. Under **Scopes**, select the **view** scopes for the datasets you want to sync:
   - `view_orders` – required for orders and carts
   - `view_customers` – required for customers
   - `view_payments` – required for payments
   - `view_products` – required for product projections and inventory
   - `view_categories` – required for categories
   - `view_discount_codes` – required for discount codes
6. Click **Create API client** and copy the credentials.

Your project key and region appear alongside the generated credentials.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `orders` | Orders from your commercetools project | Incremental |
| `customers` | Customer records | Incremental |
| `payments` | Payment records | Incremental |
| `carts` | Shopping carts | Incremental |
| `product_projections` | Product data projections | Incremental |
| `categories` | Product categories | Incremental |
| `discount_codes` | Discount codes | Incremental |
| `inventory` | Inventory entries | Incremental |

All tables sync incrementally using the `lastModifiedAt` timestamp, so only new or updated records are fetched on each run.

## Sync behavior

commercetools limits offset pagination to 10,000 results. For large datasets, the sync automatically re-anchors the query window using `lastModifiedAt` timestamps to work around this limit. This ensures large initial syncs and incremental updates complete successfully.

Authentication tokens last approximately 48 hours. If a sync runs longer, the token refreshes automatically.

## Configuration

<SourceParameters />
