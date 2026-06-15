---
title: Linking Ortto as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Ortto
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Ortto connector syncs your marketing automation data – people, accounts, audiences, tags, and custom field definitions – into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Ortto.
3. Next, you need an API key from Ortto. In your Ortto account, go to **Settings → API keys** and create a new custom API key. Copy its value.
4. Back in PostHog, paste the API key and select the **Region** that matches your Ortto instance – Global, Australia, or Europe. Your API key only works with the region where your Ortto account is hosted. Click **Next**.
5. _Optional:_ Add a prefix to your table names.
6. Select the tables you want to sync, set the sync frequency, then click **Import**.

Once the syncs are complete, you can start using Ortto data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `people` | Contacts in your Ortto account, including built-in and custom fields | Full refresh |
| `accounts` | Organizations (accounts) with built-in and custom fields | Full refresh |
| `audiences` | Audience segments | Full refresh |
| `tags` | Tags used to label contacts | Full refresh |
| `person_custom_fields` | Custom field definitions for people | Full refresh |
| `account_custom_fields` | Custom field definitions for accounts | Full refresh |

**Full refresh** tables reload all data on each sync. Ortto's API doesn't support incremental syncing, so all tables fully refresh on each sync.

## Custom fields

Custom fields for people and accounts are automatically discovered at runtime. The connector fetches custom field definitions from Ortto and includes them alongside built-in fields without any additional configuration.

## Configuration

<SourceParameters />
