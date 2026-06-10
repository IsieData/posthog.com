---
title: Linking MongoDB as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: MongoDB
---

The MongoDB connector can link your MongoDB collections to PostHog.

To link MongoDB:

1. Go to the [Data pipeline page](https://app.posthog.com/data-management/sources) and the sources tab in PostHog
2. Click **New source** and select MongoDB
3. Enter your connection details:
   - **Connection string** - Your MongoDB connection string, for example `mongodb://username:password@host:port/database?authSource=admin&tls=true` or `mongodb+srv://user:pass@cluster.mongodb.net/database`
   - **Database name** - (Optional) The database to connect to. Only needed if your connection string doesn't include the database name.
4. Click **Next**, select the collections you want to sync and the [sync method](/docs/cdp/sources#incremental-vs-full-table), then click **Import**

> **Tip:** MongoDB Atlas SRV connection strings often omit the database name (they look like `mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true`). If your connection string doesn't include a `/<database>` after the host, use the **Database name** field to specify which database to connect to.

Once the syncs are complete, you can start using MongoDB data in PostHog.

> **Note:** MongoDB data is unstructured so the returned columns are an `_id` field and a `data` column that contain the entire document contents. Data fields can be selected with dot notation (e.g. `data.field1`)

## Configuration

<SourceParameters />

### Incremental and append-only syncing

MongoDB supports incremental and append-only sync methods. For a field to be available for these sync methods, it must:

1. **Have an index** — only indexed fields are eligible.
2. **Be a supported type** — the following BSON types work:
   - `date` or `timestamp`
   - `int` or `long`
   - `double` or `decimal`
   - `objectId` (only for the `_id` field)

PostHog infers field types from the first 10,000 documents in the collection, so fields with mixed types may resolve to an unsupported type.

import InboundIpAddresses from '../_snippets/inbound-ip-addresses.mdx'

<InboundIpAddresses />