import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'
import OSTable from 'components/OSTable'
import FeatureTable from './FeatureTable'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

type AIFeature = {
    title: string
    description: string
    status?: 'available' | 'coming_soon'
}

const aiFeatures: AIFeature[] = [
    {
        title: 'Generate SQL queries',
        description:
            'Generate SQL queries from natural language prompts, making data exploration accessible to everyone.',
    },
    {
        title: 'Answer questions about your data',
        description:
            'Ask questions about your data in natural language and get accurate, data-driven answers without even knowing what SQL is.',
    },
    {
        title: 'Fix SQL queries',
        description:
            'Made a mistake in your SQL query? PostHog AI can automatically fix it for you, no more debugging required.',
    },
    {
        title: 'Optimize SQL queries',
        description:
            'PostHog AI can analyze and optimize your SQL queries for better performance, so you can get results faster.',
    },
    {
        title: 'Ask questions from Slack',
        description: 'Slack is where you live anyway, just ask your data questions there.',
        status: 'coming_soon',
    },
    {
        title: 'Iterative metric validation',
        description: 'Do your metrics actually make sense? PostHog AI will automatically validate them for you.',
        status: 'coming_soon',
    },
    {
        title: 'Agentic data notebooks',
        description:
            'Automatically generate data notebooks with charts, insights, and explanations based on your data.',
        status: 'coming_soon',
    },
]

type SQLEditorFeature = {
    title: string
    description: string
    comingSoon?: boolean
}

const sqlEditorFeatures: SQLEditorFeature[] = [
    {
        title: 'Direct data access',
        description:
            'Query all your data in PostHog, including PostHog-specific tables (events, persons) and synced warehouse sources',
    },
    {
        title: 'HogQL support',
        description:
            "Uses PostHog's SQL variant with simplified property access (dot notation like properties.$current_url), null handling, and ClickHouse functions",
    },
    {
        title: 'Autocomplete',
        description: 'Intelligent code completion for tables, columns, and SQL keywords to speed up query writing',
    },
    {
        title: 'Schema browser',
        description:
            'View and search the schema of all available sources, PostHog tables, and saved views directly in the editor',
    },
    {
        title: 'Save as views',
        description: 'Save queries as views accessible from the data warehouse tab, visible to all project users',
    },
    {
        title: 'Draft queries',
        description: 'Save draft queries for later without cluttering the saved views list',
        comingSoon: true,
    },
    {
        title: 'DuckDB syntax support',
        description: 'Full support for DuckDB SQL syntax and functions when connected to a managed DuckDB warehouse',
        comingSoon: true,
    },
    {
        title: 'Add queries to notebooks',
        description: 'Use PostHog notebooks to collect warehouse info, research topics, or just as a scratch pad',
    },
    {
        title: 'Write SQL without knowing SQL',
        description: 'Let PostHog AI write SQL for you',
    },
    {
        title: 'Simplified syntax',
        description: 'Access properties with dot notation like properties.$browser',
    },
    {
        title: 'Smart joins',
        description: 'Automatic joins between events, persons, and groups',
    },
    {
        title: 'Product functions',
        description: 'Built-in functions for cohorts, feature flags, and more',
    },
    {
        title: 'Time zone handling',
        description: 'Automatic time zone conversion for your project',
    },
]

export default function AskPostHogAnything(): JSX.Element {
    // SQL editor table columns
    const columns = [
        { name: 'Feature', width: 'minmax(150px, 1fr)', align: 'left' as const },
        { name: 'Description', width: 'minmax(300px, 2fr)', align: 'left' as const },
        { name: '', width: '60px', align: 'center' as const },
    ]

    const featureRows = sqlEditorFeatures.map((feature) => ({
        cells: [
            { content: <span className="font-bold">{feature.title}</span> },
            { content: feature.description, className: 'text-sm' },
            {
                content: feature.comingSoon ? (
                    <span className="rounded-sm bg-highlight py-0.5 px-1 text-xs font-bold text-red dark:text-yellow">
                        Coming soon
                    </span>
                ) : (
                    '✅'
                ),
                className: 'text-xl',
            },
        ],
    }))

    return (
        <>
            <SEO
                title="Querying data - PostHog context warehouse"
                description="Ask PostHog anything. Query your data in plain English with PostHog AI, or write SQL directly against your warehouse."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/opengraph_3_cf73189604.png"
                imageType="absolute"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Querying data">
                <p>
                    With all your data in one place, PostHog becomes omniscient about your business. Ask questions in
                    plain English, write SQL when you know exactly what you want, or let PostHog AI do the grunt work.
                </p>

                <h2>Ask @PostHog anything</h2>
                <p>
                    PostHog AI isn't a bolt-on chatbot – it's the SQL-writing, code-completing, statistically-minded
                    sidekick that's wired through the whole stack. It queries your warehouse tables, clickstream event
                    data, errors, and more to answer tough questions using your complete source-of-truth business
                    context.
                </p>
                <p>
                    And everyone gets to use it. Product teams can ask questions and get insights without waiting on the
                    data team, which frees the data team up to build the complex models that make those answers good in
                    the first place.
                </p>

                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/h_800,c_limit,q_auto,f_auto/Post_Hog_ai_response_ed994d3859.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/h_800,c_limit,q_auto,f_auto/Post_Hog_ai_response_ed994d3859.png"
                    alt="Conversation with PostHog AI"
                    classes="rounded"
                    zoom={false}
                />
                <div className="mb-8">
                    <h3>Features</h3>
                    <FeatureTable features={aiFeatures} />
                </div>

                <h2>Write SQL directly</h2>
                <p>
                    When you know exactly what you want and just need to ask for it properly, drop into the SQL editor.
                    Run ad-hoc queries against your warehouse using PostHog SQL – a dialect optimized for analytics –
                    and model your product data alongside data from any source, all within PostHog.
                </p>

                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_light_b0cdbebe8f.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_data_warehouse_dark_8f465ecfaa.png"
                    alt="PostHog SQL editor screenshot"
                    classes="rounded"
                    zoom={false}
                />

                <h3>Features</h3>
                <OSTable columns={columns} rows={featureRows} editable={false} />
                <p>
                    <Link to="/docs/data-warehouse/sql" state={{ newWindow: true }}>
                        Read the SQL editor docs →
                    </Link>
                </p>

                <h2>Take it anywhere</h2>
                <p>
                    Querying doesn't have to happen inside PostHog. Ask questions from Slack, or give your agents access
                    over MCP so PostHog can answer questions and pull data right inside the tools your team already
                    uses.
                </p>
            </ReaderView>
        </>
    )
}
