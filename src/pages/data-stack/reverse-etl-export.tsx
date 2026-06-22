import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function ReverseETLExport(): JSX.Element {
    return (
        <>
            <SEO
                title="Send data out - PostHog context warehouse"
                description="Export, stream, and sync your PostHog data to external systems so you can activate it across your entire tech stack."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/cdp_3f8703b873.jpg"
                imageType="absolute"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Send data out">
                <p>
                    PostHog gives you multiple ways to export and stream your data to external systems, so you can
                    activate your product data across your entire tech stack.
                </p>
                <h2 className="flex items-center">
                    Reverse ETL
                    <span className="rounded-sm bg-highlight py-0.5 ml-2 px-1 text-xs font-bold text-red dark:text-yellow">
                        Coming soon
                    </span>
                </h2>
                <p>
                    Deliver cleaned and modeled data from your PostHog warehouse to your operational tools for
                    marketing, sales, and customer success via our <Link to="/integrations">CDP destinations</Link>,
                    like you can with <Link to="/docs/cdp/destinations">realtime data</Link> already.
                </p>

                <h2>Batch exports</h2>
                <p>Schedule regular exports of your data to data warehouses and cloud storage.</p>
                <ul>
                    <li>
                        <strong>Azure Blob Storage</strong>
                    </li>
                    <li>
                        <strong>BigQuery</strong>
                    </li>
                    <li>
                        <strong>Snowflake</strong>
                    </li>
                    <li>
                        <strong>Amazon S3</strong>
                    </li>
                    <li>
                        <strong>PostgreSQL</strong>
                    </li>
                    <li>
                        <strong>Redshift</strong>
                    </li>
                </ul>
                <p>Batch export features:</p>
                <ul>
                    <li>
                        <strong>Scheduled exports:</strong> Hourly, daily, or custom schedules
                    </li>
                    <li>
                        <strong>Incremental updates:</strong> Only export new or changed data
                    </li>
                    <li>
                        <strong>Historical backfills:</strong> Export historical data
                    </li>
                    <li>
                        <strong>Custom schemas:</strong> Define the structure of exported data
                    </li>
                    <li>
                        <strong>Compression:</strong> Reduce storage costs with compressed exports
                    </li>
                </ul>

                <p>
                    <Link to="/docs/cdp/batch-exports" state={{ newWindow: true }}>
                        Configure batch exports →
                    </Link>
                </p>

                <h2>Realtime event streaming</h2>
                <p>Stream events to external systems in real-time as they're ingested into PostHog.</p>
                <ul>
                    <li>
                        <strong>Webhooks:</strong> Send events to any HTTP endpoint in real-time
                    </li>
                    <li>
                        <strong>Slack:</strong> Send events to Slack channels
                    </li>
                    <li>
                        <strong>SaaS tools:</strong> Send events to SaaS tools like Braze, Customer.io, and more
                    </li>
                    <li>
                        <strong>Custom destinations:</strong> Build your own destination using our plugin framework
                    </li>
                </ul>
                <p>Real-time streaming is ideal for:</p>
                <ul>
                    <li>Triggering immediate actions based on user behavior</li>
                    <li>Keeping external systems synchronized with PostHog</li>
                    <li>Building real-time dashboards and monitoring</li>
                    <li>Feeding machine learning models with fresh data</li>
                </ul>
                <p>
                    <Link to="/docs/cdp/destinations" state={{ newWindow: true }}>
                        Explore event destinations →
                    </Link>
                </p>

                <h2>Webhooks &amp; notifications</h2>
                <p>Configure webhooks to notify external systems when specific events or conditions occur.</p>
                <ul>
                    <li>
                        <strong>Event webhooks:</strong> Trigger on specific user actions or system events
                    </li>
                    <li>
                        <strong>Threshold alerts:</strong> Send notifications when metrics exceed limits
                    </li>
                    <li>
                        <strong>Scheduled webhooks:</strong> Regular updates on key metrics
                    </li>
                    <li>
                        <strong>Custom payloads:</strong> Format data to match your destination's requirements
                    </li>
                </ul>
                <p>Common webhook use cases:</p>
                <ul>
                    <li>Sync user properties to CRM systems like Salesforce or HubSpot</li>
                    <li>Trigger marketing automation workflows in tools like Braze or Customer.io</li>
                    <li>Update customer success platforms like Vitally or Gainsight</li>
                    <li>Send alerts to Slack, PagerDuty, or monitoring tools</li>
                </ul>
                <p>
                    <Link to="/docs/webhooks" state={{ newWindow: true }}>
                        Learn about webhooks →
                    </Link>
                </p>

                <h2>Export formats and protocols</h2>

                <h3>Data formats</h3>
                <ul>
                    <li>
                        <strong>JSON:</strong> Standard format for webhooks and APIs
                    </li>
                    <li>
                        <strong>CSV:</strong> For spreadsheet and traditional database imports
                    </li>
                    <li>
                        <strong>Parquet:</strong> Columnar format for efficient warehouse storage
                    </li>
                </ul>

                <h3>Delivery methods</h3>
                <ul>
                    <li>
                        <strong>HTTP/HTTPS:</strong> RESTful APIs and webhooks
                    </li>
                    <li>
                        <strong>Cloud storage:</strong> Direct writes to S3, GCS, Azure Blob
                    </li>
                </ul>

                <h2 id="integrations-library">Integrations library</h2>
                <Link to="/integrations">Explore our integrations library →</Link>
            </ReaderView>
        </>
    )
}
