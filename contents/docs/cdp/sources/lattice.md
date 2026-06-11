---
title: Linking Lattice as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Lattice
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Lattice connector syncs your performance management data – users, departments, goals, feedback, and review cycles – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Lattice.
3. You need two things from Lattice:
   - **Region** – select **US** or **EMEA** to match where your Lattice data is hosted. US uses `api.latticehq.com` and EMEA uses `api.emea.latticehq.com`.
   - **API key** – a Lattice admin can generate one under **Admin > Settings > API Keys**. Lattice may require requesting API access before you can create keys.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Lattice data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `users` | User records from your Lattice org | Full refresh |
| `departments` | Department records | Full refresh |
| `goals` | Goal records | Full refresh |
| `feedbacks` | Feedback records | Full refresh |
| `review_cycles` | Review cycle records | Full refresh |
| `updates` | Update records | Full refresh |

**Full refresh** tables reload all data on each sync. Lattice's API doesn't support server-side timestamp filtering, so incremental sync isn't available.

## Sync behavior

API keys inherit the privileges of the user who created them. If a key lacks access to a specific table, syncs for that table return a 403 error. The key is still valid — you need to ensure the key creator has access to the data you want to sync.

Rate limit is 240 requests per minute. Syncs automatically retry with exponential backoff if rate limits are hit.

## Configuration

<SourceParameters />
