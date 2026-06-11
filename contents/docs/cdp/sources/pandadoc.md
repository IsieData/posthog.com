---
title: Linking PandaDoc as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: PandaDoc
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

PandaDoc is a document automation platform for creating, sending, and tracking proposals, contracts, and other documents. This connector syncs your PandaDoc data into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to PandaDoc.
3. Create an API key in the [PandaDoc developer dashboard](https://app.pandadoc.com/a/#/settings/api-dashboard/configuration). Use a production key — sandbox keys have stricter rate limits.
4. Back in PostHog, paste the key into the `API key` field and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using PandaDoc data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `documents` | Documents in your PandaDoc account | Incremental |
| `templates` | Document templates | Full refresh |
| `forms` | Forms | Full refresh |
| `contacts` | Contacts | Full refresh |
| `members` | Workspace members | Full refresh |
| `document_folders` | Document folder structure | Full refresh |
| `template_folders` | Template folder structure | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

The `documents` table supports incremental sync using `date_modified` or `date_created` as the cursor field. Templates, forms, contacts, members, and folders don't support server-side date filtering, so they use full refresh only.

PandaDoc's default API rate limit is around 60 requests per minute. If your sync has many pages, it may throttle. The connector backs off and retries automatically when it hits rate limits.

## Configuration

<SourceParameters />
