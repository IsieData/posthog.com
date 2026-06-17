---
title: Send PostHog conversion events to Microsoft Ads
templateId:
    - template-microsoft-ads
---

import FeedbackQuestions from "../_snippets/feedback-questions.mdx"
import PostHogMaintained from "../_snippets/posthog-maintained.mdx"

> **IMPORTANT:** This is an experimental destination that we do not provide official support for.

This destination sends offline conversion events to Microsoft Advertising (Bing Ads) using the [offline conversions API](https://learn.microsoft.com/en-us/advertising/campaign-management-service/applyofflineconversions?view=bingads-13). You'll also need access to the relevant Microsoft Advertising account.

## Installation

1. In Microsoft Advertising, create the offline conversion goal you want to send conversions to. Conversions are matched to this goal by name, so note the exact **Conversion name**. Wait at least two hours after creating the goal before sending conversions to it.

2. In PostHog, click the [Data pipeline](https://app.posthog.com/data-management/destinations) tab in the left sidebar.

3. Click the [Destinations](https://app.posthog.com/data-management/destinations?search=microsoft) tab.

4. Search for **Microsoft Ads Conversions** and click **+ Create**.

5. Connect your Microsoft Advertising account at the configuration step.

6. Enter your **Customer ID** (the manager account the account belongs to) and **Account ID** (the ad account that owns the conversion goal). You can find both under **Settings** > **Accounts and Billing** in Microsoft Advertising.

7. Set the **Conversion name** to match the offline conversion goal you created in step 1.

8. Set up your event and property filters to remove unnecessary events. You only want to send events that are conversions. Filter out unrelated events or ones missing required data like `msclkid`.

9. Press **Create & enable**, test your destination, and then watch your conversions get sent to Microsoft Ads.

<HideOnCDPIndex>

## Configuration

<TemplateParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all the destination on the platform. The [source code](https://github.com/PostHog/posthog/blob/master/nodejs/src/cdp/templates/_destinations/microsoft_ads/microsoft.template.ts) is available on GitHub.

<PostHogMaintained />

<FeedbackQuestions />

</HideOnCDPIndex>
