---
title: Linking Azure DevOps as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: AzureDevOps
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

Sync projects, repositories, builds, pull requests, and work item revisions from your Azure DevOps organization into PostHog.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Azure DevOps.
3. You need a personal access token from Azure DevOps. Create one under **User settings > Personal access tokens** in your Azure DevOps organization. Grant read scopes for the data you want to sync: **Work Items (Read)**, **Code (Read)**, **Build (Read)**, and **Project and Team (Read)**. See Microsoft's [Create a PAT](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) guide for detailed steps.
4. Back in PostHog, enter your **Organization** (the first path segment of your Azure DevOps URL — for `dev.azure.com/myorg` enter `myorg`) and paste your token in the **Personal access token** field, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using Azure DevOps data in PostHog.

## Available tables

| Table | Description | Sync method |
| ----- | ----------- | ----------- |
| `projects` | Projects in your organization | Full refresh |
| `repositories` | Git repositories across all projects | Full refresh |
| `builds` | Build runs across all projects | Incremental |
| `pull_requests` | Pull requests across all projects | Incremental |
| `work_item_revisions` | Work item revision history (bugs, tasks, user stories, etc.) | Incremental |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync details

- `builds` syncs incrementally based on queue time, oldest first.
- `pull_requests` syncs incrementally based on creation date, newest first.
- `work_item_revisions` uses Azure DevOps's reporting endpoint to sync the full revision history incrementally based on changed date. Each row is a single revision, identified by the composite key `(id, rev)`.

## Configuration

<SourceParameters />
