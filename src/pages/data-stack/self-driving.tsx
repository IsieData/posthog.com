import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

export default function SelfDriving(): JSX.Element {
    return (
        <>
            <SEO
                title="Self-healing software - PostHog context warehouse"
                description="The payoff of putting all your context in one place: PostHog can analyze usage, triage bugs, and open PRs to improve your product automatically."
                image="https://res.cloudinary.com/dmukukwp6/image/upload/selfdriving_3f4c644a54.png"
                imageType="absolute"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="Self-healing software">
                <p>
                    Here's the payoff for putting all your data and context in one place: your product can start
                    improving itself.
                </p>
                <p>
                    It's not just about insights and dashboards. PostHog can analyze what's actually happening in your
                    product and ship code fixes and improvements on your behalf, freeing you up to work on the
                    high-leverage stuff.
                </p>

                <h2>From signal to PR, automatically</h2>
                <p>
                    Gone are the days of manually triaging bugs. When a user hits an error, PostHog can watch the
                    session recording, understand what they were trying to do, check for other instances of the same
                    issue (and related ones), and open a pull request to fix it – all without you having to ask.
                </p>
                <p>
                    The same loop applies to conversion. PostHog can spot where users drop off, form a hypothesis, and
                    open a PR with an experiment to test a fix – using the full context of what it knows your users
                    need.
                </p>

                <h2>Why your data makes this possible</h2>
                <p>
                    Claude Code, Codex, and other AI dev tools have access to your code, and with MCP they might reach
                    your analytics or error tracking. But they mostly just write code and ignore the product context a
                    human carries in their head – and they don't run themselves.
                </p>
                <p>
                    PostHog is different because the context layer is already here: product usage, errors, replays,
                    experiments, and your modeled business data all live together. That's what lets PostHog self-drive
                    development based on what your users actually do, instead of guessing.
                </p>

                <h2>This is PostHog Code</h2>
                <p>
                    Self-healing software is powered by PostHog Code – the AI dev tool that understands your product. It
                    identifies usage patterns, triages bugs, and opens PRs automatically, self-driving the development
                    of your product.
                </p>
                <p>
                    <CallToAction to="/code" size="sm">
                        Explore PostHog Code
                    </CallToAction>
                </p>
                <p>
                    <Link to="/blog/self-driving-product" state={{ newWindow: true }}>
                        Read more: PostHog Code and the self-driving product →
                    </Link>
                </p>
            </ReaderView>
        </>
    )
}
