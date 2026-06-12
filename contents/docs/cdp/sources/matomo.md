---
title: Linking Matomo as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Matomo
---

import { CalloutBox } from "components/Docs/CalloutBox";

The Matomo connector syncs web analytics data from Matomo Cloud or self-hosted instances into PostHog. Combine your historical Matomo data with PostHog's product analytics for deeper analysis.

## Available tables

| Table | Description |
|---|---|
| visits | Raw visit log with individual visitor sessions and their actions |
| visits_summary | Daily aggregate metrics like total visits, unique visitors, and bounce rate |
| actions_summary | Daily aggregate metrics for page views, downloads, and outlinks |
| referrers | Daily breakdown of traffic sources by referrer type and name |
| countries | Daily breakdown of visits by country |

## Linking Matomo

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the sources tab in PostHog
2. Click **New source** and select Matomo
3. Enter your Matomo instance details:
   - **Instance URL:** Your Matomo URL, such as `https://myorg.matomo.cloud` for Matomo Cloud or `https://analytics.example.com` for self-hosted
   - **Site ID:** The numeric ID of the site you want to sync (found in Matomo under Administration > Measurables > Manage)
   - **API token:** A personal API token with read access to the site
4. *Optional:* Add a prefix to your table names
5. Select the tables you want to sync
6. Click **Next**

The data warehouse starts syncing your Matomo data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Creating an API token

To create an API token in Matomo:

1. Log in to your Matomo instance
2. Go to **Administration** (gear icon) > **Personal** > **Security**
3. Scroll to **Auth tokens** and click **Create new token**
4. Give it a description (e.g., "PostHog sync") and click **Create new token**
5. Copy the token immediately — it won't be shown again

The token needs read access to the site you're syncing. Admin or Super User tokens work, but you can also use a token scoped to view-only access for the specific site.

## Configuration

<SourceParameters />

## Sync behavior

### Visits table

The visits table syncs individual visitor sessions using Matomo's Live API. Each visit includes the visitor's actions (page views, events, downloads) and metadata like browser, device, and location.

- **Incremental sync** uses `serverTimestamp` as the cursor, fetching only visits newer than the last sync
- Visits from the past hour are deferred to the next sync to ensure their action list is complete

### Report tables

The report tables (`visits_summary`, `actions_summary`, `referrers`, `countries`) sync daily aggregate data.

- **Incremental sync** uses the `_date` field as the cursor
- Each sync re-pulls the last 3 days to capture any late-arriving data from Matomo's archiving process
- Reports are deduplicated on `_date` (and `label` for breakdown tables)

## Migrating from Matomo

If you're moving from Matomo to PostHog, use this source to bring your historical data into PostHog's data warehouse for analysis. For a complete migration that converts Matomo events to PostHog's event schema, see the [Matomo migration guide](/docs/migrate/matomo).
