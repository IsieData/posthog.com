---
title: Linking BigQuery as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: BigQuery
---

Connect your BigQuery tables to PostHog by configuring BigQuery as a source. You need to grant permissions so the connector can create, query, and delete temporary tables without exposing your entire BigQuery environment.

## Requirements

- A Google Cloud service account with the permissions described below
- A BigQuery dataset to import

PostHog supports two authentication methods for connecting to your service account:

- **Service account impersonation** – Provide a service account email and project ID, and PostHog impersonates your service account using its own credentials. No key file needed.
- **JSON key file** – Generate a service account JSON key file and upload it to PostHog.

## Service account permissions

Both authentication methods require a service account with permissions to read data from BigQuery and manage temporary tables.

1. Go to the [**Google Cloud Console**](https://console.cloud.google.com/) and navigate to **IAM & Admin** > **Service Accounts**.

2. Click **Create Service Account** and provide a descriptive name (e.g., `bigquery-posthog-source`).

3. Assign the required permissions. You can assign the **BigQuery Data Editor**, **BigQuery Job User**, and **BigQuery Read Session User** roles if that meets your security requirements. Alternatively, create a custom role with these permissions:

    ```
    bigquery.readsessions.create
    bigquery.readsessions.getData
    bigquery.datasets.get
    bigquery.jobs.create
    bigquery.tables.get
    bigquery.tables.list
    bigquery.tables.getData
    bigquery.tables.create
    bigquery.tables.updateData
    bigquery.tables.delete
    ```

## Option 1: Service account impersonation

With this method, you don't need to create, store, or share a JSON key file for your service account. Instead, you grant PostHog permission to impersonate your service account.

1. Add `posthog:{organization_id}` to your service account's **description** in Google Cloud. Replace `{organization_id}` with your PostHog organization ID from your [PostHog organization settings](https://app.posthog.com/settings/organization).

   This verifies your PostHog organization. Skipping this step causes errors when syncing data.

2. Assign PostHog's service account the **Service Account Token Creator** role (`roles/iam.serviceAccountTokenCreator`) and any role containing the `iam.serviceAccounts.get` permission on your service account.

   Navigate to **IAM & Admin** > **Service Accounts** in the Google Cloud Console. Select your service account with BigQuery access and click the **Principals with access** tab. Click **Grant access** and enter PostHog's service account email as the principal:

   ```
   posthog-batch-exports@posthog-external.iam.gserviceaccount.com
   ```

   Then assign the required roles. This allows PostHog to impersonate your service account and read its description to verify ownership.

3. In PostHog, go to **[Data pipelines](https://app.posthog.com/data-management/sources)** > **Sources** and click **New source**.

4. Select **BigQuery**, then connect to a new Google Cloud service account.

5. Select **Impersonate service account** and provide your service account email and Google Cloud project ID.

6. Enter the **Dataset ID** you want to import and complete the setup.

## Option 2: JSON key file

With this method, you generate a JSON key file for your service account and upload it to PostHog.

<CalloutBox icon="IconWarning" title="Prefer service account impersonation" type="caution">

The generated JSON key file contains long-lived credentials, which pose a security risk. We recommend [service account impersonation](#option-1-service-account-impersonation), which eliminates this risk.

</CalloutBox>

1. In the Google Cloud Console, go to **IAM & Admin** > **Service Accounts** and select your service account.

2. Click the **Keys** tab, then click **Add Key** > **Create new key**.

3. Choose **JSON** and download the key file. Store it securely.

4. In PostHog, go to **[Data pipelines](https://app.posthog.com/data-management/sources)** > **Sources** and click **New source**.

5. Select **BigQuery**, then connect to a new Google Cloud service account.

6. Select **Upload service account JSON key file** and upload your key file.

7. Enter the **Dataset ID** you want to import and complete the setup.

## Additional configuration options

- **Dataset ID for temporary tables** – If you're limiting permissions to the service account, specify a separate dataset for temporary tables.
- **Table prefix** – Add a prefix to the synced table names in PostHog.
- **Region** – In rare cases, BigQuery can't auto-locate your dataset. If you see an error like `Dataset xxx:xxx was not found in region`, toggle the switch to manually specify your region (e.g., `us-east1`).

## Configuration

<SourceParameters />

## How it works

PostHog creates and deletes [temporary tables](https://cloud.google.com/bigquery/docs/writing-results#temporary_and_permanent_tables) when querying your data. This is necessary for handling large BigQuery tables. Temporary tables help break down large data processing tasks into manageable chunks. However, they incur storage and query costs in BigQuery while they exist. We delete them as soon as the job is done.

PostHog requires a unique primary key when importing data and will look for it in this order:

1. PostHog will use the `id` column as the primary key if it exists
2. If the `id` column does not exist, PostHog will use any primary key constraints in the table

After selecting the primary key, PostHog will query the table to see if the column is unique. If it is not, PostHog will fail the import with a `DuplicatePrimaryKeysException`. If you have no `id` column and no primary key constraints, future incremental imports will fail.

### Costs

We minimize BigQuery costs by keeping queries to a minimum and deleting temporary tables immediately after use. Although the connector automates temporary table management, check [BigQuery’s pricing](https://cloud.google.com/bigquery/pricing) for details on storage and query costs.
