---
title: Linking Custom REST source as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Custom
---

<CalloutBox icon="IconInfo" title="Alpha release" type="fyi">

This source is currently in **alpha**. The interface and available tables may change.

</CalloutBox>

The Custom REST source lets you set up a source using custom configured mappings. You define a REST API source by providing a manifest that follows the same shape as PostHog's built-in REST sources, so the existing REST engine handles pagination, auth, JSONPath extraction, and incremental params with no per-source code.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to Custom REST source.
3. Configure the connector using the fields below:
   - **Manifest (JSON)** (required) — a JSON document describing the REST API to sync. The manifest follows the same shape as PostHog's built-in REST sources. At minimum it contains:
     - `client.base_url` — the base URL of the API to sync from. On PostHog Cloud this must use `https://`, and internal or private hosts are rejected.
     - `client.auth` — an optional auth block describing how to authenticate. Credentials are **not** embedded inline in the manifest (keys like `token`, `api_key`, and `password` are rejected here); reference the dedicated auth fields below instead.
     - `resources` — a list of resources, each with a `name` and an `endpoint` (with a `path` and an optional `method` of `GET` or `POST`). Each resource becomes a table. Optional `params`, `json` body, pagination, `data_selector`, `incremental`, and `sort_mode` (`asc` or `desc`) fields pass through to the REST engine. `PUT`, `PATCH`, and `DELETE` are not permitted, so a manifest can only read upstream data.
   - **Bearer token** — the secret used when your manifest's `client.auth.type` is bearer auth. Stored separately from the manifest so it can be redacted.
   - **API key** — the secret used when your manifest authenticates with an API key.
   - **Auth password** — the secret used when your manifest authenticates with a password.

   Provide whichever one of the three auth secrets matches the auth type declared in your manifest. The selected secret is rejoined with the manifest at sync time.
4. Back in PostHog, enter the manifest and the relevant auth credential, then click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using your custom data in PostHog.

## Available tables

This source has no fixed set of tables. The tables it produces depend entirely on the resources you declare in your manifest — each resource's `name` becomes a table, and its `endpoint` determines what data is fetched. Whether a table syncs incrementally or via full refresh depends on whether you configure an `incremental` cursor for that resource in the manifest.

## Configuration

<SourceParameters />
