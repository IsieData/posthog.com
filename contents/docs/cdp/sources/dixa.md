---
title: Linking Dixa as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Dixa
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Enter your Dixa API token to pull your customer service data – conversations, agents, end users, queues, and tags – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Dixa.
3. Generate an API token in Dixa under **Settings > Integrations > API Tokens**. You need admin access to create the token.
4. Back in PostHog, enter the API token and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Dixa data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `conversations` | Customer service conversations | Incremental |
| `agents` | Agent records | Full refresh |
| `endusers` | End user records | Full refresh |
| `queues` | Queue records | Full refresh |
| `tags` | Tag records | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `conversations` table syncs incrementally using the `updated_at` field. The Dixa Exports API requires a time window of at most 31 days per request, so the connector walks forward in 30-day windows from either your last sync or 2015 for a full export. The export endpoint is rate limited to 10 requests per minute, so large historical backfills can take a while.

All other tables (agents, endusers, queues, tags) are full refresh only since the Dixa API doesn't support incremental filtering for these endpoints.

## Configuration

<SourceParameters />
