---
title: Linking Ramp as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ramp
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Ramp connector syncs your corporate spend data – transactions, reimbursements, users, cards, and departments – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Ramp.
3. Select your environment – **Production** for live data, or **Sandbox (demo)** for testing.
4. Next, you need OAuth credentials from a Ramp developer app. In your [Ramp dashboard](https://demo.ramp.com/settings/developer) under **Settings** > **Developer API**, create a new developer app with the following scopes:
   - `transactions:read`
   - `reimbursements:read`
   - `users:read`
   - `cards:read`
   - `departments:read`

   Enable **Client credentials** for the app, then copy the Client ID and Client secret.

5. Back in PostHog, enter the **Client ID** and **Client secret**, then click **Next**.
6. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Ramp data in PostHog.

## Available tables

| Table            | Description                                              | Sync method  |
| ---------------- | -------------------------------------------------------- | ------------ |
| `transactions`   | Card transactions with merchant, amount, and status info | Incremental  |
| `reimbursements` | Employee reimbursement requests and approvals            | Full refresh |
| `users`          | Users in your Ramp account                               | Full refresh |
| `cards`          | Physical and virtual cards in your account               | Full refresh |
| `departments`    | Departments in your organization                         | Full refresh |

**Incremental** syncs for the `transactions` table use the `user_transaction_time` field to sync only new transactions since the last sync. **Full refresh** tables reload all data on each sync.

<CalloutBox icon="IconWarning" title="Incremental sync limitations" type="caution">

The Ramp API doesn't support an "updated since" filter for transactions, so changes to existing transactions – like a pending transaction being marked as cleared – won't appear until you run a full refresh. Consider running occasional full refreshes to capture these updates.

</CalloutBox>

## Configuration

<SourceParameters />
