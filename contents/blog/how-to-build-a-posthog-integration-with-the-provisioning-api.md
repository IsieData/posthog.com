---
date: "2026-06-24"
title: "How to build a PostHog integration with the provisioning API"
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/Template_cover_14_0da4d45933.jpg
featuredImageType: full
author:
  - matt-brooker
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Engineering
tags:
  - Engineering
  - Integrations
seo:
  metaTitle: "How to build a PostHog integration with the provisioning API"
  metaDescription: "A walkthrough of building a partner integration on PostHog's provisioning API: spin up a real PostHog account for your users in three API calls, no signup page."
---

If you build a platform that other people ship apps on, your users eventually ask for analytics. The annoying part is the handoff: they leave your product, sign up for PostHog, copy an API key, paste it back, and wire it up. Every step there is a place to drop off.

The [provisioning API](/docs/integrate/provisioning) removes the handoff. Your app creates a real PostHog account for your user, gets back a project key, and wires it up. The user never sees a signup page. This is how partners like Insforge provision PostHog for their users today.

To show exactly how it works, I built a small reference app called HogFarm: a toy farm-website builder where you type in a farm name and email, click one button, and get a live site with PostHog analytics already attached. The code is on [GitHub](https://github.com/Brooker-Fam/hogfarm) and it's deployed [here](https://hogfarm-guava-tri.vercel.app). This post walks through what's actually involved.

## The whole thing is three API calls

```
1. POST /api/agentic/provisioning/account_requests   → authorization code
2. POST /api/agentic/oauth/token                      → access + refresh tokens
3. POST /api/agentic/provisioning/resources           → project API key (phc_…)
```

Call one creates or finds the account. Call two trades the resulting code for tokens. Call three provisions a project and hands back the `phc_` key your user's app sends events with. Everything else is the plumbing that makes those three calls safe to run from a client that holds no secret.

## How your app identifies itself: CIMD

There's no partner signup form. You host a small JSON document at a stable HTTPS URL, and that URL *is* your `client_id`. The first time you call the API, PostHog fetches the document, validates it, and registers your OAuth app automatically. This is a Client ID Metadata Document (CIMD).

In HogFarm it's served straight from the app:

```json
{
  "client_id": "https://hogfarm.example.com/.well-known/posthog-client.json",
  "client_name": "HogFarm",
  "redirect_uris": ["https://hogfarm.example.com/api/oauth/callback"],
  "token_endpoint_auth_method": "none",
  "grant_types": ["authorization_code"],
  "response_types": ["code"],
  "com.posthog": {
    "scopes": ["insight:read", "project:read", "person:read"]
  }
}
```

The one rule that trips people up: `client_id` has to be the exact URL the document is served from. The `com.posthog.scopes` array is an optional ceiling. Tokens issued to your app can never exceed it, no matter what an individual request asks for.

## How the token exchange stays safe: PKCE

HogFarm is a public client. It holds no secret, so it proves the token exchange with PKCE: generate a random verifier, send only its SHA-256 hash with the account request, then replay the verifier at token exchange.

```ts
const verifier = base64url(randomBytes(32))
const challenge = base64url(sha256(verifier))
```

The challenge travels with call one. The verifier stays on your server until call two.

## Creating the account

```ts
const res = await fetch(`${HOST}/api/agentic/provisioning/account_requests`, {
  method: "POST",
  headers: { "API-Version": "0.1d", "Content-Type": "application/json" },
  body: JSON.stringify({
    id: crypto.randomUUID(),
    email,
    name,
    client_id: clientId,
    code_challenge: challenge,
    code_challenge_method: "S256",
    scopes: ["insight:read", "project:read", "person:read"],
    configuration: { region: "US", organization_name: farmName },
  }),
})
```

The response comes back as one of a few shapes, and a real integration has to handle each:

- **New email** → `{ type: "oauth", code }`. The account is created and linked silently. You get an authorization code right away and finish the flow server-side. The user gets a welcome email to set their password.
- **Existing PostHog user** → `{ type: "requires_auth", url }`. That person already has an account, so they consent in the browser first. You send them to `url`, and PostHog redirects back to your `redirect_uri` with a code.
- **First call from a brand-new CIMD client** → HTTP 202 `{ type: "registering" }`. PostHog is fetching your metadata document in the background. Wait the returned `retry_after` seconds and call again. You hit this exactly once per deployment.

## Trading the code for tokens, then provisioning

Once you have a code, the rest is mechanical. Exchange it:

```ts
await fetch(`${HOST}/api/agentic/oauth/token`, {
  method: "POST",
  headers: { "API-Version": "0.1d", "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code,
    code_verifier: verifier,
  }),
})
```

Then provision a project with the access token:

```ts
const res = await fetch(`${HOST}/api/agentic/provisioning/resources`, {
  method: "POST",
  headers: {
    "API-Version": "0.1d",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    service_id: "free",
    label_prefix: farmName,
    configuration: { project_name: `${farmName} site` },
  }),
})
```

The response carries `complete.access_configuration.api_key` (the `phc_` project token) and `host`. That's the key your user's site initializes the PostHog SDK with. `service_id: "free"` provisions a free-tier project and needs no payment details, which is the right default for "just give my user analytics." When they outgrow it, `pay_as_you_go` takes a Stripe shared payment token so they can upgrade without leaving your product.

At this point HogFarm drops the `phc_` key into the generated farm site and the user is sending events. No signup page, no copy-paste.

## "Open in PostHog"

The last touch is a button that takes the user into their PostHog project. The simplest version is a direct link to `{host}/project/{teamId}` (PostHog prompts login if they aren't signed in). HogFarm uses that.

If you want a fully seamless no-login deep link, there are two richer options, and it's worth knowing neither is on by default for a freshly self-registered partner:

- The privileged `/deep_links` endpoint mints a single-use magic login. PostHog enables it per partner, so it returns `deep_links_not_enabled` until then.
- The `requires_auth` handshake (re-run `account_requests` for the user's email, send them to the returned consent URL) lands them in their project after a quick login.

## What I learned building it

A few things that aren't obvious from the docs until you hit them:

- **Your CIMD URL has to be publicly fetchable.** I deployed behind Vercel's default deployment protection and the very first call failed, because PostHog couldn't reach the metadata document behind the SSO gate. If registration never completes, check that the `.well-known` URL is reachable without auth.
- **The first call always 202s.** A brand-new CIMD client triggers a background registration. Build the retry in from the start rather than treating the 202 as an error.
- **`label_prefix` is capped at 25 characters.** A long enough name will 400 the resources call. Trim it before you send it.
- **Don't store tokens you don't need to.** A production integration persists the access and refresh tokens (encrypted) so it can keep calling PostHog for that user. If you don't need ongoing calls, store just the project key and team id and skip the secret entirely.

## Try it

The full app is about 200 lines of TypeScript. Clone it, point the CIMD URL at your own deployment, and you have a working provisioning integration:

- Code: [github.com/Brooker-Fam/hogfarm](https://github.com/Brooker-Fam/hogfarm)
- Docs: [Provisioning API](/docs/integrate/provisioning) and [OAuth + CIMD](/docs/api/oauth)

If you're building a platform and want to give your users PostHog without the handoff, this is the path.
