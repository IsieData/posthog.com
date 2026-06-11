---
title: Linking HiBob as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: HiBob
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The HiBob connector syncs your HR data – employees and tasks – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to HiBob.
3. You need a **Service User** in Bob. Legacy API tokens are no longer supported – only Service Users work. In Bob, go to **Settings → Integrations → Automation → Service Users** and create a new service user. Add it to a permission group with read access to the data categories you want to sync (for example, **People**). For details, see [HiBob's Service Users documentation](https://apidocs.hibob.com/docs/service-users).
4. Back in PostHog, enter the **Service User ID** and **Service User token** and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using HiBob data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `employees` | Employee directory including active and inactive employees | Full refresh |
| `tasks` | Tasks assigned in Bob | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

All HiBob tables are full refresh only – the HiBob API does not expose an "updated since" filter that returns complete records, so each sync reloads all data.

## Configuration

<SourceParameters />
