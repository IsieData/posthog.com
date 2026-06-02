---
title: Linking Mailjet as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Mailjet
---

The Mailjet connector can link contacts, campaigns, messages, and statistics to PostHog.

To link Mailjet:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Mailjet.

3. Next, you need your API key and secret key from Mailjet. Go to your [API key management page](https://app.mailjet.com/account/apikeys) in Mailjet. Copy the **API key** and **Secret key** values (create a new key pair if needed).

4. Back in PostHog, paste the API key and secret key in the corresponding fields and click **Next**.

5. On the next page, set up the schemas you want to sync and modify the method and frequency as needed. Once done, click **Import**.

Once the syncs are complete, you can start using Mailjet data in PostHog.

## Synced tables

The Mailjet connector syncs the following tables:

| Table | Description | Sync method |
|-------|-------------|-------------|
| `contact` | Email contacts in your Mailjet account | Full refresh |
| `contactslist` | Contact lists | Full refresh |
| `listrecipient` | Contacts subscribed to each list | Full refresh |
| `campaign` | Email campaigns | Full refresh |
| `campaigndraft` | Draft campaigns | Full refresh |
| `message` | Sent email messages | Full refresh |
| `contactmetadata` | Custom contact properties | Full refresh |
| `template` | Email templates | Full refresh |
| `openinformation` | Email open events | Incremental |
| `clickstatistics` | Link click statistics | Incremental |

The statistics tables (`openinformation` and `clickstatistics`) support incremental sync, meaning only new data since the last sync is fetched. All other tables are fully refreshed on each sync.

## Configuration

<SourceParameters />
