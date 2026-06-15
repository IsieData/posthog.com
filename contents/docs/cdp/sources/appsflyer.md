---
title: Linking AppsFlyer as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AppsFlyer
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The AppsFlyer connector syncs aggregate mobile attribution reports into the PostHog data warehouse. It pulls performance data from AppsFlyer's aggregate Pull API using your API token (V2). Each source connects to a single AppsFlyer app—to sync multiple apps, create a separate source for each.

## Requirements

You need:

- **API token (V2)** — find this in AppsFlyer under your account menu → **Security center** → **AppsFlyer API tokens**.
- **App ID** — your app's identifier as shown in the AppsFlyer dashboard (e.g. `id123456789` for iOS or the Android package name).
- **Pull API subscription** — the aggregate Pull API requires an active subscription. If you receive a 403 error, confirm your AppsFlyer account includes Pull API access.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to AppsFlyer.
3. Enter your **App ID** and **API token (V2)**, then click **Next**.
4. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using AppsFlyer data in PostHog.

## Available tables

| Table             | Description                              | Sync method |
| ----------------- | ---------------------------------------- | ----------- |
| `daily_report`    | Daily aggregate performance metrics      | Incremental |
| `geo_report`      | Performance metrics broken down by country | Incremental |
| `partners_report` | Performance metrics by partner           | Incremental |

All tables sync incrementally on the `date` field, fetching only new or updated records on each run.

## Sync behavior

- **Incremental sync with lookback** - AppsFlyer doesn't finalize attribution data until roughly 48 hours after the UTC day ends. Each incremental sync re-fetches the trailing two days to capture late-arriving attributions. Duplicates are merged on the dimension key.
- **Initial sync** - The first sync can pull up to approximately 1,000 days of historical data, the maximum window supported by the AppsFlyer aggregate Pull API.
- **One app per source** - Each source connects to a single AppsFlyer app. To import data from multiple apps, create a separate source for each one.

## Configuration

<SourceParameters />
