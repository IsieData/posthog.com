---
title: Linking Jira as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Jira
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Jira Cloud connector syncs your issues, projects, users, and related metadata into PostHog's data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Jira.
3. Get your Jira credentials:
   - **Subdomain** – Your Jira Cloud subdomain (the part before `.atlassian.net` in your Jira URL).
   - **Email** – The email address associated with your Atlassian account.
   - **API token** – Go to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens), click **Create API token**, give it a label, and copy the generated token.
4. Paste your subdomain, email, and API token into PostHog and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Jira data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `issues` | All issues in accessible projects | Incremental |
| `projects` | All projects the authenticated user has access to | Full refresh |
| `users` | Users in your Jira instance | Full refresh |
| `fields` | Custom and system fields defined in your instance | Full refresh |
| `issue_types` | Issue types (Bug, Task, Story, etc.) | Full refresh |
| `statuses` | Workflow statuses across all projects | Full refresh |
| `priorities` | Issue priority levels | Full refresh |
| `resolutions` | Resolution types (Done, Won't Do, etc.) | Full refresh |
| `dashboards` | Dashboards the authenticated user can access | Full refresh |
| `filters` | Saved JQL filters the authenticated user can access | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

Only the `issues` table supports incremental sync – it uses JQL's `updated >= "..."` filter to fetch only changed records. All other tables use full refresh because they lack server-side timestamp filtering.

Per-issue detail streams like comments, worklogs, watchers, and transitions aren't included. These require a separate API call for each issue and can cause performance issues at scale.

## Configuration

<SourceParameters />
