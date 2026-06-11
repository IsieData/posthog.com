---
title: Linking Deel as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Deel
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Deel connector syncs your workforce and payroll data – people, contracts, invoices, and invoice adjustments – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Deel.

3. Create an API token in the [Deel developer center](https://app.deel.com/developer-center) under **More > Developer**. Choose an **organization token** rather than a personal token – personal tokens stop working when the user leaves the organization.

4. Grant the token read scopes for the data you want to sync: `people:read`, `contracts:read`, and `accounting:read`.

5. Back in PostHog, paste the API token in the **API token** field and click **Next**.

6. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Deel data in PostHog.

## Available tables

| Table                 | Description                | Sync method  |
| --------------------- | -------------------------- | ------------ |
| `people`              | Workforce and employee data | Full refresh |
| `contracts`           | Employment contracts        | Full refresh |
| `invoices`            | Invoice records             | Full refresh |
| `invoice_adjustments` | Invoice adjustment entries  | Full refresh |

**Full refresh** tables reload all data on each sync. Deel's core objects don't expose an updated-since filter, and invoices can change status after issuing, so each sync fetches all records.

## Sync behavior

The `contracts` table partitions data by `created_at` month for efficient loading.

## Required scopes

Each table requires its corresponding read scope:

| Table                 | Required scope      |
| --------------------- | ------------------- |
| `people`              | `people:read`       |
| `contracts`           | `contracts:read`    |
| `invoices`            | `accounting:read`   |
| `invoice_adjustments` | `accounting:read`   |

If your token lacks the scope for a table, the sync fails for that table with an access denied error. The token itself remains valid – you just need to enable the appropriate scope in the Deel developer center.

## Rate limiting

Deel enforces a 5 requests per second limit shared across all API tokens in your organization. PostHog spaces requests automatically to stay within this limit.

## Configuration

<SourceParameters />
