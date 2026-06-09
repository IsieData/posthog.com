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

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Confluence connector syncs your Confluence Cloud workspace data into PostHog, including spaces, pages, blog posts, attachments, tasks, labels, and comments.

<CalloutBox icon="IconWarning" title="Confluence Cloud only" type="info">

This connector supports Confluence Cloud sites (`your-domain.atlassian.net`) only. Confluence Data Center and Server instances aren't supported.

</CalloutBox>

## Adding a data source

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and select the **Sources** tab.
2. Click **+ New source** and select Confluence by clicking the **Link** button.
3. Enter your Confluence Cloud subdomain. This is the first part of your Confluence URL – for `acme.atlassian.net`, enter `acme`.
4. Enter the email address associated with your Atlassian account.
5. Get your API token:
   - Go to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens) and click **Create API token**.
   - Give your token a name (e.g. "PostHog data warehouse") and click **Create**.
   - Copy the token and paste it into PostHog.
6. _Optional:_ Add a prefix to your table names.
7. Click **Next**.

The data warehouse then starts syncing your Confluence data. You can see details and progress in the [data pipeline sources tab](https://app.posthog.com/data-management/sources).

## Available tables

The Confluence source syncs the following tables:

| Table             | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| spaces            | All spaces in your Confluence instance                         |
| pages             | All pages across all spaces                                    |
| blogposts         | Blog posts from all spaces                                     |
| attachments       | Files attached to pages and blog posts                         |
| tasks             | Tasks created within pages                                     |
| labels            | Labels applied to content                                      |
| footer_comments   | Comments added to the footer section of pages                  |
| inline_comments   | Comments added inline within page content                      |

## Sync modes

Confluence tables support **full refresh only**. Each sync re-downloads all data from Confluence. Incremental syncing isn't available because the Confluence Cloud REST API v2 doesn't support server-side timestamp filtering.

## Configuration

<SourceParameters />
