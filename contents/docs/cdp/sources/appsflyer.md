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

The AppsFlyer connector syncs aggregate attribution reports into PostHog. It pulls performance data from AppsFlyer's aggregate Pull API using your API token (V2).

Each source connects to one app. To sync multiple apps, create a separate source for each.

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

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `daily_report` | Daily aggregate performance metrics | Incremental |
| `geo_report` | Performance metrics broken down by country | Incremental |
| `partners_report` | Performance metrics by partner | Incremental |

**Incremental** tables sync only new or updated records on each run. All tables use the `date` field as the incremental cursor.

## Sync behavior

Incremental syncs use a 2-day lookback window because AppsFlyer doesn't finalize attribution data until roughly 48 hours after the UTC day ends. The connector re-fetches and merges the most recent two days on each sync to capture late-arriving attributions.

Full syncs pull up to 1000 days of historical data (the maximum window AppsFlyer's API supports).

## Configuration

<SourceParameters />
