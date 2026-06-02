import React from 'react'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import { whyPostHogNav } from '../../navs/whyPostHog'
import WhyPostHogHeader from './Header'

type ReaderViewProps = React.ComponentProps<typeof ReaderView>

/**
 * Shared layout for the "Why PostHog?" page collection (`/`, `/101`, `/workflow`,
 * `/why`, `/moat`, `/start`). Wraps `ReaderView` with the collection's sidebar:
 *
 * - `productSelect`: the static `WhyPostHogHeader` (logomark + "Why PostHog?").
 * - `leftSidebar`: the `whyPostHogNav` link list (`TreeMenu` sidebar appearance),
 *   each entry an individual page with the current one highlighted.
 *
 * Inline search is provided by `ReaderView` itself — it replaces the nav with
 * search results while typing, no extra wiring needed.
 *
 * All other `ReaderView` props pass through so each page controls its own
 * content, SEO, prose size, etc. The sidebar defaults to pinned/visible.
 */
const WhyPostHogReader = ({ children, defaultNavVisible = true, ...props }: ReaderViewProps): JSX.Element => {
    return (
        <ReaderView
            {...props}
            defaultNavVisible={defaultNavVisible}
            productSelect={<WhyPostHogHeader />}
            leftSidebar={<TreeMenu items={whyPostHogNav} appearance="sidebar" />}
        >
            {children}
        </ReaderView>
    )
}

export default WhyPostHogReader
