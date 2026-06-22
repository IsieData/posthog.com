import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import DWInstallationPlatforms from './dw-installation-platforms'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function Sources(): JSX.Element {
    return (
        <>
            <SEO
                title="Get data in - PostHog context warehouse"
                description="Collect data from your product, website, and external tools – then filter, transform, and enrich it on the way in."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/cdp_3f8703b873.jpg"
                imageType="absolute"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Get data in">
                <p>
                    Say goodbye to pipeline wrangling. Collect data from your product, website, and external tools,
                    filter and enrich it in transit, and build a bank of data that knows your business inside out.
                </p>
                <p>
                    It's a CDP, but because it's built into PostHog, everything you collect is immediately available in
                    your analytics, flags, and experiments. No syncing required.
                </p>

                <h2>Capture from your product and website</h2>
                <p>
                    Install a PostHog SDK and you'll start capturing events, pageviews, and user data right away –
                    including autocaptured clicks, form interactions, and more without writing custom tracking for every
                    action. All of it is automatically available in your warehouse for analysis and modeling.
                </p>
                <p>
                    <Link to="/docs/getting-started/install" state={{ newWindow: true }}>
                        Install a PostHog SDK →
                    </Link>
                </p>

                <h2>Sync from your other tools</h2>
                <p>
                    Connect your external databases, SaaS tools, ad platforms, and more to sync data in bulk into your
                    PostHog warehouse. Join a revenue column from Stripe to a signup event, or blend ad spend with
                    product usage – without standing up a pipeline to do it.
                </p>
                <div className="max-w-2xl">
                    <DWInstallationPlatforms showFiltering={true} />
                </div>
                <p>
                    <Link to="/docs/data-warehouse/start-here" state={{ newWindow: true }}>
                        View our get started docs →
                    </Link>
                </p>

                <h2>Transform data on the way in</h2>
                <p>
                    Our realtime transformation apps and{' '}
                    <Link to="/docs/hog" state={{ newWindow: true }}>
                        Hog functions
                    </Link>{' '}
                    let you transform event data before it's saved to your events store, so data is cleaned and curated
                    at ingestion time and quality is high from the start.
                </p>
                <ul>
                    <li>
                        <strong>Data enrichment:</strong> Add context like GeoIP location, user agent parsing, or
                        company data
                    </li>
                    <li>
                        <strong>Property mapping:</strong> Standardize property names and formats across different
                        sources
                    </li>
                    <li>
                        <strong>Data validation:</strong> Ensure data quality by validating and cleaning incoming events
                    </li>
                    <li>
                        <strong>PII scrubbing:</strong> Remove or hash sensitive information before storage
                    </li>
                    <li>
                        <strong>Event filtering:</strong> Drop unwanted events or filter by specific criteria
                    </li>
                </ul>
                <p>
                    <Link to="/docs/cdp/transformations" state={{ newWindow: true }}>
                        Learn about realtime transformations →
                    </Link>
                </p>

                <h2>How does PostHog work with data warehouses?</h2>
                <p>
                    PostHog includes an integrated data warehouse that works with the rest of your PostHog tools, so
                    your data never needs to travel. You can model and query data in PostHog, or use it across tools
                    such as feature flags and experiments – no stitching multiple vendors together in complex ETL
                    pipelines. You can also connect external warehouses (like Snowflake or BigQuery) as sources to use
                    your warehouse tables inside PostHog.{' '}
                    <Link to="/data-stack/warehouse" state={{ newWindow: true }}>
                        Learn more about the PostHog warehouse
                    </Link>
                    .
                </p>
            </ReaderView>
        </>
    )
}
