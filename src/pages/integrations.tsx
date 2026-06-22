import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import IntegrationsLibrary from 'components/IntegrationsLibrary'

export default function IntegrationsPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Integrations - PostHog"
                description="All sources, destinations, and integrations available in PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView hideLeftSidebar={true} title="Integrations">
                <p>
                    <span className="font-bold">Sources</span> bring data from other services into your PostHog data
                    warehouse. <span className="font-bold">Destinations</span> send data out to other services.{' '}
                    <span className="font-bold">Transformations</span> enrich and standardize your incoming event data.
                </p>
                <IntegrationsLibrary />
            </ReaderView>
        </>
    )
}
