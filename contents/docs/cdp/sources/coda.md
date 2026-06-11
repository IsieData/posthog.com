---
title: Linking Coda as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Coda
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Coda connector syncs your Coda workspace data into PostHog, including docs, tables, and rows.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Coda.
3. Generate an API token from your [Coda account settings](https://coda.io/account). The token can only access docs that its creator can access.
4. Paste the API token in PostHog and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the sync completes, you can start using Coda data in PostHog.

## Available tables

Coda's data model is hierarchical: docs contain tables, and tables contain rows. The connector syncs all three levels:

| Table | Description | Primary key |
| ----- | ----------- | ----------- |
| `docs` | All docs accessible to your API token | `id` |
| `tables` | Tables within each doc | `_doc_id`, `id` |
| `rows` | Rows within each table, with cell values keyed by column name | `_doc_id`, `_table_id`, `id` |

The `_doc_id` and `_table_id` fields link child records back to their parents. Table and row IDs are only unique within their parent, so these composite keys are required to identify records across your workspace.

## Sync limitations

All Coda tables sync using **full refresh** only. Coda's API doesn't support filtering by last-modified time, so each sync reloads all data.

<CalloutBox icon="IconWarning" title="Large workspaces sync slowly" type="action">

Coda's rate limits for listing docs are strict (4 requests per 6 seconds). Workspaces with many docs will take longer to sync because rows must fan out across every doc and table.

</CalloutBox>

## Configuration

<SourceParameters />
