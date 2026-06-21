---
title: Why we rebuilt our data warehouse and how it unlocks self-driving products
date: 2026-06-17
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - eric-duong
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/data-warehouse-rebuild.png
featuredImageType: full
category: General
tags:
    - Data warehouse
    - Infrastructure
    - PostHog news
seo:
    metaTitle: Why we rebuilt our data warehouse and how it unlocks self-driving products
    metaDescription: "PostHog rebuilt its data warehouse on DuckDB, moving away from ClickHouse to give data engineers the tools they actually want — and to power the next generation of AI-driven product development."
---


PostHog's original data warehouse had a single goal: delay the moment a company needs to hire their first data engineer.

It did that job for a 20-person company where the CEO is still running their own SQL queries. You could build dashboards, answer business questions, and skip the six-month data infrastructure project.

The problem was the next chapter for these companies, here's the pattern we kept seeing:

- Company grows, product is going well, and PostHog is the centre of gravity for understanding how the business is doing.
- They hit 30-50 people and data questions get more complex, they hire a data engineer.
- Data engineer looks at what's available in PostHog, can't do everything they need, and starts exporting data to an external warehouse.
- PostHog becomes middleware. Events go in, data goes out. The center of gravity for understanding the business moves somewhere else.

So what was stopping data engineers from being happy on our platform?

### Problem 1: HogQL

HogQL is our SQL dialect, a fork of ClickHouse SQL. It's enabled us to safely build direct SQL querying on our multi tenant data infrastructure but Clickhouse SQL is not the first language that data engineers and analysts reach for when building analyses. 

Data engineers come in with SQL knowledge from a handful of popular engines. These dialects have market demand, good documentation, and an ecosystem of tools.

The answer: to make HogQL good enough for data engineers, we'd need to treat it as a first-class product. Better error messages, smarter suggestions, serious LLM completions, deep documentation. That's a significant investment, and while we've continued to improve the language for in app use, we needed to rethink what data engineers would feel at home using.

### Problem 2: ClickHouse as a query engine

ClickHouse is excellent at what it was designed for. We use it internally and have built a lot on top of it. But it has gaps when you use it as a data warehouse query engine.

- **No cost-based query optimizer.** ClickHouse is unmatched when you hand-craft queries to match your schema. But data engineers expect to write declarative SQL and let the engine figure out the execution plan, which is how every major warehouse works. ClickHouse doesn't do this well enough.

- **S3/Parquet support took a long time to mature.** Hive partitioning only landed in version 25.8. Predicate pushdown still has rough edges, and partitioned Parquet performance lags where we need it.

- **Query consistency across versions.** We've seen ClickHouse change query results between releases, or based on which settings were enabled. Our test suite catches this for our own queries, but we can't test every shape of customer data and query a warehouse needs to handle.


### Problem 3: Multi-tenancy

This one is structural. PostHog's ClickHouse cluster is optimised for fast, interactive queries, the kind a user fires off in a browser and expects an answer to within seconds or minutes.

Data warehouse queries don't work like that. A modeling job can run for hours. Sometimes days. Running those workloads on a shared multi-tenant cluster would have unpredictable knock-on effects across the entire platform — and "unpredictable" is not a word you want associated with your customers' data infrastructure.

## The bet: DuckDB

We needed a query engine with a cost-based optimizer, modern S3/Parquet support, a SQL dialect that data engineers want to use, and an ownership model that gives us confidence in its future. DuckDB checks all of those boxes.

DuckDB came out of the Database Architectures Group at CWI Amsterdam, the same academic environment that produced MonetDB. It has one of the most carefully designed query optimizers of any OLAP engine. Its SQL dialect is derived from PostgreSQL, which means it's immediately familiar to anyone who's worked with Postgres, including most of our early warehouse customers. And unlike our other options, it's governed by the DuckDB Foundation and MIT licensed. None of the features we depend on are going to get locked behind a cloud tier.

There's also the ecosystem. DuckDB has an extension model, you can add capabilities without forking the codebase or going through a painful UDF deployment process. It has out of the box support for all the popular data catalogs and the team behind DuckDB has built Ducklake, a novel take on the existing catalogs.

## What we've built on top of DuckDB

Deciding on DuckDB was step one. The hard part was the architecture.

The obvious move, one shared DuckDB instance, doesn't work. We needed single-tenant isolation: one DuckDB instance per organisation, so a long-running job for one customer can't impact anyone else. Here's what the new managed warehouse looks like:

- **Fully single-tenant DuckDB instances:** Every organisation gets their own. It's not shared with anyone else.
- **A lifecycle service:** Instances sleep when idle and wake up when a query arrives. 
- **A Postgres Wire protocol endpoint:** Most modern data stack tooling speaks Postgres, so does our warehouse. You connect with `psql`, point your BI tool at it, wire up PostHog Code or Claude via MCP, and it just works. We translate the Postgres catalog so your tools can introspect the schema, and queries run as DuckDB SQL.
- **DuckHog:** This is the part I'm most excited about. DuckHog is a DuckDB extension that lets you point local compute at your warehouse data. You import it, connect to your S3-backed data lake, and then pull subsets of data locally to work with using DuckDB, pandas, polars, or whatever you prefer, then write results back to your warehouse. For agents that want to iterate quickly on data, this is a better pattern than sending every query to the cluster: grab a subset, run fast local loops, go back out for more data if needed.
- **DuckLake as our catalog:** Underneath this is DuckLake, which separates storage from compute. Your data lives in S3 independent of whatever's querying it, so we're not locked into DuckDB forever. If a better engine comes along, we can swap it in without touching how the data is stored.

## All your data, ready in PostHog

One of the things that makes this different from spinning up a standalone warehouse: we're already mirroring all PostHog event data to S3, partitioned by organisation. When you spin up your managed warehouse instance, your event data is there. You didn't have to set up a pipeline.

The same goes for data sources you want to connect — Stripe, Postgres, whatever external systems you're syncing — all of it lands in your warehouse, queryable through the same endpoint as your PostHog events.

We still support HogQL for PostHog product queries, funnels, cohorts, and retention analysis. But for warehouse queries, you write DuckDB SQL, picking the right tool for the right query, and they both have access to the same data.

## Good data = good context for agents

The data warehouse is the context layer for AI-driven product development.

PostHog Code works by taking signals from your product — including failed queries, error patterns, conversion drops, and user behaviour — and routing them to agents that can act on them. That loop requires the data to be trustworthy, complete, and in one place. If your product data is in PostHog, your revenue data is in another warehouse, and your user data is somewhere else, any agent working with those signals is working with an incomplete picture.

A unified warehouse gives your agent access to your PostHog events, revenue data, Postgres tables, and any other data source you have, so that it has the context to do things that weren't possible before. Not just "this funnel dropped", but "this funnel dropped, here's the revenue impact, here are the cohorts affected, here's what those users have in common, here's an action plan and a PR already open to fix the issue." That's the signal quality that makes agentic workflows useful.

Try it for yourself — join the waitlist to get notified when we release the Managed Warehouse beta.

<DuckDBWaitlistSurvey />
