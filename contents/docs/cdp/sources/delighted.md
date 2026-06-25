---
title: Linking Delighted as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Delighted
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Delighted connector syncs your NPS and survey data into PostHog, including survey responses, people, unsubscribes, bounces, and account-level metrics.

## Getting your Delighted API key

PostHog authenticates with Delighted using an API key.

1. Log in to your [Delighted dashboard](https://app.delighted.com/).
2. Go to **Settings > API**.
3. Copy your API key. Each Delighted project has its own API key with read access to that project's data.

## Linking Delighted

1. Go to the [Data pipeline sources page](https://app.posthog.com/data-management/sources) in PostHog.
2. Click **+ New source** and then click **Link** next to Delighted.
3. Paste your Delighted **API key**.
4. _Optional:_ Add a prefix to your table names.
5. Click **Next**, choose the tables you want to sync, and then click **Import**.

The data warehouse then starts syncing your Delighted data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Configuration

<SourceParameters />

## Available tables

| Table              | Description                                           | Sync method    |
| ------------------ | ----------------------------------------------------- | -------------- |
| `survey_responses` | Individual NPS or survey responses from recipients    | Incremental    |
| `people`           | Survey recipients and their properties                | Incremental    |
| `unsubscribes`     | People who have unsubscribed from surveys             | Incremental    |
| `bounces`          | Email addresses that bounced                          | Incremental    |
| `metrics`          | Account-level NPS metrics snapshot                    | Full refresh   |

- **Incremental** tables sync only new or updated records on each run.
- **Full refresh** tables reload all data on each sync.

## Sync modes

Delighted tables support different sync modes depending on whether the API exposes server-side timestamp filters:

| Table              | Sync mode    | Incremental filter                          |
| ------------------ | ------------ | ------------------------------------------- |
| `survey_responses` | Incremental  | `updated_at` or `created_at`                |
| `people`           | Incremental  | `created_at` (append-only)                  |
| `unsubscribes`     | Incremental  | `unsubscribed_at` (append-only)             |
| `bounces`          | Incremental  | `bounced_at` (append-only)                  |
| `metrics`          | Full refresh | Single-row snapshot, reloads on every sync  |

The `survey_responses` table supports a true `updated_at` cursor, so updated responses are re-synced. The `people`, `unsubscribes`, and `bounces` tables are append-only based on their event timestamp.

## Supported tables

<SourceTables />
