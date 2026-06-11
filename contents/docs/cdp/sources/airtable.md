---
title: Linking Airtable as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Airtable
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Airtable connector syncs your Airtable bases, tables, and records into PostHog.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Airtable by clicking the **Link** button.
3. Create a personal access token at [airtable.com/create/tokens](https://airtable.com/create/tokens) with the following scopes:
   - `data.records:read` — allows reading record data
   - `schema.bases:read` — allows reading base and table metadata
4. Grant the token access to the bases you want to sync.
5. Paste your token into the **Personal access token** field and click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Records sync from every table in every base your token can access.

## Available tables

| Table | Description | Sync methods |
| ----- | ----------- | ------------ |
| `bases` | Airtable bases your token can access | Full refresh |
| `tables` | Tables within each base (includes `_base_id` for joining) | Full refresh |
| `records` | Records from all tables across all bases (includes `_base_id` and `_table_id` for joining) | Incremental (append), Full refresh |

## Sync behavior

### Incremental sync for records

The `records` table supports incremental syncing using the `createdTime` field. When you enable incremental sync, only records created after the last sync are fetched.

**Limitation:** Incremental sync only captures newly created records. Updates to existing records aren't detected because Airtable records don't expose a last-modified timestamp. Use full refresh to capture updates.

### Full refresh for metadata

The `bases` and `tables` endpoints are metadata listings that don't support incremental sync. They reload fully on each sync, but these are typically small.

### Joining tables

Records synced from Airtable include parent keys so you can join across tables:

- `tables` rows include `_base_id`
- `records` rows include both `_base_id` and `_table_id`

Records use a composite primary key of `(_base_id, _table_id, id)` because Airtable record IDs are only unique within a single table.

## Configuration

<SourceParameters />
