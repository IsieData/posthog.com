---
title: Linking Campaign Monitor as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: CampaignMonitor
---

The Campaign Monitor connector can link clients, campaigns, subscriber lists, segments, templates, and subscriber activity to PostHog.

To link Campaign Monitor:

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.

2. Click **+ New source** and then click **Link** next to Campaign Monitor.

3. Next, you need an API key from Campaign Monitor. In your Campaign Monitor account, go to **Account settings** > **API keys**. Create a new API key or copy an existing one.

4. You also need your Client ID. Find this in your client's **Settings** page, or retrieve it by calling the Campaign Monitor API's `clients.json` endpoint. The Client ID identifies which client's data to sync.

5. Back in PostHog, paste the API key and Client ID, then click **Next**.

6. On the next page, set up the schemas you want to sync. All tables currently use full refresh sync. Once done, click **Import**.

Once the syncs are complete, you can start using Campaign Monitor data in PostHog.

## Synced tables

The Campaign Monitor connector syncs the following tables:

| Table | Description |
|-------|-------------|
| `clients` | Account-level client records |
| `campaigns` | Sent email campaigns with delivery metadata |
| `scheduled_campaigns` | Campaigns scheduled to send in the future |
| `draft_campaigns` | Draft campaigns not yet sent or scheduled |
| `lists` | Subscriber lists for the client |
| `segments` | Segments defined within the client's lists |
| `templates` | Email templates configured in the account |
| `suppression_list` | Globally suppressed email addresses |
| `active_subscribers` | Active subscribers across all lists |
| `unsubscribed_subscribers` | Subscribers who have unsubscribed |
| `bounced_subscribers` | Subscribers whose emails have bounced |

Subscriber tables include a `ListID` field to identify which list each subscriber belongs to.

## Limitations

- **Full refresh only** - All tables sync using full refresh. Incremental sync may be added once the Campaign Monitor API's date filtering is verified.
- **Rate limits** - Campaign Monitor enforces approximately 1 request per second. The connector handles rate limiting automatically with retries.

## Configuration

<SourceParameters />
