---
title: Linking monday.com as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Monday
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The monday.com connector pulls your monday.com data — boards, items, users, and workspaces — into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to monday.com.
3. Get your API token from monday.com:
   - Click your avatar in the bottom left, then select **Developers**.
   - Go to **My access tokens** and copy your personal API token. Admins can also use the account-level API token.
4. Back in PostHog, paste the token in the API token field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using monday.com data in PostHog.

## Available tables

| Table | Description | Primary key |
| ----- | ----------- | ----------- |
| `boards` | Boards your token can access | `id` |
| `items` | Items from all accessible boards | `_board_id`, `id` |
| `users` | Users in your monday.com account | `id` |
| `workspaces` | Workspaces your token can access | `id` |

The `items` table includes a `_board_id` column linking each item back to its parent board. Use this for joins or filtering by board.

## Sync limitations

All monday.com tables are **full refresh only**. monday.com's API doesn't support server-side filtering by modification date, so each sync reloads all data from the source.

## Configuration

<SourceParameters />
