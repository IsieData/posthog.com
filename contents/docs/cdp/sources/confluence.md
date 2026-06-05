---
title: Linking Confluence as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Confluence
---

The Confluence connector syncs your Confluence Cloud workspace data into PostHog, including spaces, pages, blog posts, attachments, tasks, labels, and comments.

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Confluence by clicking the **Link** button.
3. Enter your Atlassian subdomain (the part before `.atlassian.net` in your Confluence URL).
4. Enter the email address associated with your Atlassian account.
5. Get your API token:
   - Go to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens) and click **Create API token**.
   - Give your token a descriptive name and click **Create**.
   - Copy the generated token.
6. Paste your API token into PostHog.
7. _Optional:_ Add a prefix to your table names.
8. Click **Next**.

<CalloutBox icon="IconInfo" title="Only Confluence Cloud is supported" type="fyi">

This connector only works with Confluence Cloud sites (`your-domain.atlassian.net`). Confluence Server and Confluence Data Center are not supported.

</CalloutBox>

The data warehouse then starts syncing your Confluence data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

The Confluence source syncs the following tables:

| Table           | Description                                            |
| --------------- | ------------------------------------------------------ |
| spaces          | All spaces in your Confluence workspace                |
| pages           | All pages across your Confluence spaces                |
| blogposts       | Blog posts published in your Confluence spaces         |
| attachments     | Files attached to pages and blog posts                 |
| tasks           | Tasks created within Confluence pages                  |
| labels          | Labels applied to pages, blog posts, and other content |
| footer_comments | Comments added to the footer of pages                  |
| inline_comments | Inline comments added directly to page content         |

## Sync modes

Confluence tables support **full refresh only**. Each sync re-downloads all data from Confluence. Incremental syncing isn't available because Confluence's v2 API supports sorting but doesn't support server-side filtering by timestamp.

## Configuration

<SourceParameters />
