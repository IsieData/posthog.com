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

Connect your AppsFlyer account to pull aggregate performance reports into the PostHog data warehouse. Each source syncs data for one app.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to AppsFlyer.
3. You need an API token (V2) from AppsFlyer. In AppsFlyer, go to your account menu and select **Security center > AppsFlyer API tokens**. Copy your V2 API token.
4. Find your **App ID** in the AppsFlyer dashboard. For iOS apps, it looks like `id123456789`. For Android apps, it's the package name (e.g., `com.example.app`).
5. Back in PostHog, enter the API token and App ID, then click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using AppsFlyer data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `daily_report` | Daily aggregate performance metrics across all media sources and campaigns | Incremental |
| `geo_report` | Daily aggregate metrics broken down by country | Incremental |
| `partners_report` | Daily aggregate metrics broken down by partner | Incremental |

**Incremental** tables sync only new or updated records on each run.

## Sync behavior

AppsFlyer doesn't finalize data until roughly 48 hours after the UTC day ends. To account for this, each incremental sync re-fetches the trailing two days of data and merges it with existing rows. This captures late-arriving attribution data without requiring a full refresh.

The initial sync pulls up to 1,000 days of historical data (the maximum window AppsFlyer's aggregate Pull API supports). Subsequent syncs continue from the last synced date minus the two-day lookback window.

## Requirements

This source uses AppsFlyer's aggregate Pull API, which requires a subscription that includes Pull API access. If you see a 403 error during setup, check that your account subscription includes the Pull API.

## Configuration

<SourceParameters />
