---
title: Linking Gong as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Gong
---

The Gong connector can link calls, users, scorecards, and workspaces to PostHog.

To link Gong:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Gong.

3. Get your API credentials from Gong. Go to **Company Settings** > **Ecosystem** > **API** and click **Create API Key**. This generates an Access Key and Access Key Secret. Copy both values.

4. Back in PostHog, paste the Access Key and Access Key Secret into the corresponding fields.

5. Optionally, add a prefix to your table names.

6. Click **Next**.

Once the syncs are complete, you can start using Gong data in PostHog.

## Sync modes

The `calls` table supports incremental sync – only new or updated calls sync after the initial import. The initial sync fetches calls from the last 365 days.

All other tables (`users`, `scorecards`, `workspaces`) use full refresh mode, re-downloading all data on each sync.

## Configuration

<SourceParameters />
