import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import DuckDBWaitlistSurvey from 'components/DuckDBWaitlistSurvey'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

type DuckDBBenefit = {
    title: string
    description: string
}

const duckDBBenefits: DuckDBBenefit[] = [
    {
        title: 'Exceptionally fast',
        description: 'Parallel query execution, vectorized processing, OLAP storage',
    },
    {
        title: 'Open source',
        description: 'Large extension ecosystem, active community, wide adoption',
    },
    {
        title: 'Amazing developer experience',
        description: 'Easy local prototyping, beautiful query language',
    },
    {
        title: 'Managed DuckLake metadata store',
        description: 'DuckLake catalog for open table format data',
    },
    {
        title: 'Single tenant instances',
        description: 'Dedicated resources, isolated performance, enhanced security',
    },
    {
        title: 'Seamless PostHog integration',
        description: 'Automated (free) data import, optimized schema, built for analytics',
    },
]

export default function Warehouse(): JSX.Element {
    // Define table columns
    const columns = [
        { name: 'Benefit', width: 'minmax(150px, 1fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(300px, 2fr)', align: 'left' as const },
        { name: '', width: '60px', align: 'center' as const },
    ]

    // Create table rows from duckDBBenefits
    const benefitRows = duckDBBenefits.map((benefit) => ({
        cells: [
            { content: <span className="font-bold">{benefit.title}</span> },
            { content: benefit.description, className: 'text-sm' },
            { content: '✅', className: 'text-xl' },
        ],
    }))

    return (
        <>
            <SEO
                title="Data warehouse - PostHog context warehouse"
                description="Managed Warehouse is PostHog's single-tenant DuckDB warehouse, automatically filled with your PostHog data – and anything else you sync in."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/opengraph_3_cf73189604.png"
                imageType="absolute"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Data warehouse">
                <p>
                    Managed Warehouse is the home for all of your data. It's a single-tenant{' '}
                    <Link to="https://duckdb.org/" external={true}>
                        DuckDB
                    </Link>{' '}
                    warehouse that's automatically filled with your PostHog data – and anything else you care to sync
                    in.
                </p>
                <p>
                    It's a full rebuild of our previous ClickHouse-based warehouse: faster, more powerful, and built to
                    power the rest of your stack – from <Link to="/data-stack/data-modeling">data modeling</Link> and
                    Endpoints to <Link to="/data-stack/self-driving">self-healing software</Link>. Each customer gets a{' '}
                    <span className="font-bold">dedicated data store</span> and flexible compute, fully managed by
                    PostHog, so you get the performance and reliability of a DuckDB warehouse without the operational
                    overhead.
                </p>
                <div className="dark:bg-dark bg-accent border border-input p-4 rounded">
                    <p className="!mt-0">
                        <strong>Note:</strong> Managed Warehouse is in{' '}
                        <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                            Beta
                        </span>
                        . Join the waitlist to get early access.
                    </p>
                    <div className="max-w-md">
                        <DuckDBWaitlistSurvey />
                    </div>
                </div>
                <p>
                    And it's not a locked box, either. We give you the credentials, so you have{' '}
                    <span className="font-bold">direct access to your data</span> – bring your favorite tools for BI and
                    modeling, or use our built-in tools to get started quickly.
                </p>

                <h2>Who it's for</h2>
                <ul>
                    <li>
                        <span className="font-bold">You're already on PostHog's warehouse.</span> Migrate to Managed
                        Warehouse for faster queries, more headroom, and the tooling the rest of the data stack is built
                        around.
                    </li>
                    <li>
                        <span className="font-bold">You have an external warehouse.</span> Bring your Snowflake or
                        BigQuery data back in-house so it lives next to your product data instead of an integration hop
                        away.
                    </li>
                    <li>
                        <span className="font-bold">You don't have a warehouse yet.</span> Start free with your PostHog
                        data already loaded, and grow into a real warehouse without a migration project down the line.
                    </li>
                </ul>

                <h2>All your PostHog data, loaded in for free</h2>
                <p>
                    We automatically import all your PostHog data (events, persons, groups, and more) into your
                    warehouse, so it's ready for side-by-side analysis with the rest of your business data.
                </p>
                <p>This import is free – which means zero cost to move your largest and most expensive data around.</p>

                <h2>Is PostHog warehouse native?</h2>
                <p>
                    Short answer: it's complicated. &ldquo;Warehouse native&rdquo; usually means a tool that runs
                    queries directly inside your existing warehouse (Snowflake, BigQuery, Databricks) without moving
                    data – the approach tools like Statsig and Amplitude take.
                </p>
                <p>
                    PostHog works differently. You can connect an external warehouse as a source and sync the tables you
                    need into PostHog, then run queries on our compute alongside your product data. Or skip the external
                    warehouse entirely and use Managed Warehouse as your source of truth. Either way, you get warehouse
                    data inside every PostHog tool – analytics, experiments, feature flags – without stitching vendors
                    together or maintaining complex ETL pipelines.
                </p>
                <p>
                    What we don't do (today) is execute queries directly on your external warehouse. If your hard
                    requirement is &ldquo;run all my analytics inside my existing Snowflake,&rdquo; that isn't how
                    PostHog works yet. We run queries on PostHog infrastructure – either in the warehouse or on data
                    synced into PostHog via our sources.
                </p>
                <p>
                    Companies like{' '}
                    <Link to="/customers/headshotpro" state={{ newWindow: true }}>
                        HeadshotPro
                    </Link>
                    ,{' '}
                    <Link to="/customers/webshare" state={{ newWindow: true }}>
                        Webshare
                    </Link>
                    , and{' '}
                    <Link to="/customers/elevenlabs" state={{ newWindow: true }}>
                        ElevenLabs
                    </Link>{' '}
                    already use PostHog's warehouse as their single source of truth.
                </p>

                <h2>Why DuckDB?</h2>
                <OSTable columns={columns} rows={benefitRows} editable={false} />

                <p className="mt-8">
                    <Link to="/docs/data-warehouse/integrated-warehouse" state={{ newWindow: true }}>
                        How PostHog's warehouse works (docs) →
                    </Link>
                </p>
            </ReaderView>
        </>
    )
}
