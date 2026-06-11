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

The Ramp connector syncs your corporate card and spend data into the PostHog data warehouse, including transactions, reimbursements, users, cards, and departments.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Ramp.
3. Select your **Environment**: **Production** for live data or **Sandbox (demo)** for testing.
4. In Ramp, have an admin create a developer app by going to **Settings → Developer API**. Grant the following scopes (scopes are fixed at app creation): `transactions:read`, `reimbursements:read`, `users:read`, `cards:read`, and `departments:read`. Enable **client credentials** authentication for the app.
5. Copy the app's **Client ID** and **Client secret** from Ramp.
6. Back in PostHog, enter the **Client ID** and **Client secret**, then click **Next**.
7. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Ramp data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `transactions` | Card transactions | Incremental |
| `reimbursements` | Employee reimbursements | Full refresh |
| `users` | Ramp users | Full refresh |
| `cards` | Corporate cards | Full refresh |
| `departments` | Company departments | Full refresh |

**Incremental** tables sync only new records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `transactions` table syncs incrementally based on transaction time. Ramp's API doesn't expose an "updated since" filter, so changes to existing transactions (such as a pending status becoming cleared) require an occasional full refresh to capture.

## Configuration

<SourceParameters />
