import React, { useState } from 'react'
import { IconArrowRight, IconAtSign, IconCheck, IconCoffee, IconSparkles } from '@posthog/icons'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import useProduct from 'hooks/useProduct'
import { useApp } from '../../../context/App'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'

export const SlackSlide = () => {
    const allProducts = useProduct() as any[]
    const product = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === 'posthog_slack') : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const screenshot = product?.screenshots?.home

    return (
        <div data-scheme="primary" className="@container rounded p-4 @md:p-6 h-full bg-[#F3F4F0] dark:bg-[#131316]">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center h-full">
                {screenshot ? (
                    <div className={`flex ${screenshot.classes || ''}`}>
                        <CloudinaryImage
                            src={(isDark && screenshot.srcDark ? screenshot.srcDark : screenshot.src) as any}
                            alt={screenshot.alt}
                            imgClassName={screenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                            <IconAtSign className="size-4" /> Access surfaces
                        </p>
                        <h2 className="text-2xl font-bold m-0">Meet PostHog where you work</h2>
                    </div>
                    <p className="text-secondary m-0">
                        Tag <code>@PostHog</code> in Slack for quick, proactive help, or open PostHog on Desktop to dig
                        into the bigger jobs. Either way it analyzes behavior, triages work, and ships PRs – without
                        leaving your tools.
                    </p>
                    <OSButton to="/slack" state={{ newWindow: true }} variant="secondary" asLink>
                        Explore PostHog Slackbot
                    </OSButton>
                </div>
            </div>
        </div>
    )
}

export const FixBugsSlide = () => {
    const [view, setView] = useState<'slack' | 'code'>('slack')
    const allProducts = useProduct() as any[]
    const codeProduct = Array.isArray(allProducts)
        ? allProducts.find((p: any) => p.handle === 'posthog_code')
        : undefined
    const slackProduct = Array.isArray(allProducts)
        ? allProducts.find((p: any) => p.handle === 'posthog_slack')
        : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const codeScreenshot = codeProduct?.screenshots?.home
    const slackScreenshot = slackProduct?.screenshots?.inbox
    const screenshot = view === 'slack' ? slackScreenshot : codeScreenshot

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="flex justify-center -mt-4 mb-4">
                <ToggleGroup
                    title="View"
                    hideTitle
                    options={[
                        { label: <span className="whitespace-nowrap">Slack</span>, value: 'slack' },
                        { label: <span className="whitespace-nowrap">Desktop</span>, value: 'code' },
                    ]}
                    value={view}
                    onValueChange={(v) => v && setView(v as 'slack' | 'code')}
                />
            </div>
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center">
                {screenshot ? (
                    <div className={`flex ${screenshot.classes || ''}`}>
                        <CloudinaryImage
                            src={(isDark && screenshot.srcDark ? screenshot.srcDark : screenshot.src) as any}
                            alt={screenshot.alt}
                            imgClassName={screenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                {view === 'slack' ? (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                <IconAtSign className="size-4" /> Scouts
                            </p>
                            <h2 className="text-2xl font-bold m-0">Scouts that never sleep</h2>
                        </div>
                        <p className="text-secondary m-0">
                            Scouts are long-running agents that watch your errors, logs, and session recordings – using
                            memory and your data to find and fix issues before anyone files a ticket.
                        </p>
                        {/* TODO: re-enable once /signals (or equivalent) lands.
                        <OSButton to="/signals" state={{ newWindow: true }} variant="primary" asLink>
                            <IconAtSign className="size-4" /> Learn more about Signals
                        </OSButton>
                        */}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                <IconCoffee className="size-4" /> PostHog on Desktop (beta)
                            </p>
                            <h2 className="text-2xl font-bold m-0">Scouts that never sleep</h2>
                        </div>
                        <p className="text-secondary m-0">
                            <strong>PostHog on Desktop</strong>, our AI code editor:
                        </p>
                        <ul className="list-none p-0 m-0 space-y-1.5">
                            <li className="flex items-center gap-2 text-secondary">
                                <IconCheck className="size-5 text-green shrink-0" /> Identifies product usage patterns
                            </li>
                            <li className="flex items-center gap-2 text-secondary">
                                <IconCheck className="size-5 text-green shrink-0" /> Triages bugs and errors
                            </li>
                            <li className="flex items-center gap-2 text-secondary">
                                <IconCheck className="size-5 text-green shrink-0" /> Creates pull requests automatically
                            </li>
                        </ul>
                        <OSButton to="/code" state={{ newWindow: true }} variant="secondary" asLink>
                            Explore PostHog Code
                        </OSButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export const AskAnythingSlide = () => {
    const [view, setView] = useState<'slack' | 'web'>('slack')
    const allProducts = useProduct() as any[]
    const aiProduct = Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === 'posthog_ai') : undefined
    const slackProduct = Array.isArray(allProducts)
        ? allProducts.find((p: any) => p.handle === 'posthog_slack')
        : undefined
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'
    const webScreenshot = aiProduct?.screenshots?.home
    const slackScreenshot = slackProduct?.screenshots?.insight
    const screenshot = view === 'slack' ? slackScreenshot : webScreenshot

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="flex justify-center -mt-4 mb-4">
                <ToggleGroup
                    title="View"
                    hideTitle
                    options={[
                        { label: <span className="whitespace-nowrap">Slack</span>, value: 'slack' },
                        { label: <span className="whitespace-nowrap">Web</span>, value: 'web' },
                    ]}
                    value={view}
                    onValueChange={(v) => v && setView(v as 'slack' | 'web')}
                />
            </div>
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-center">
                {screenshot ? (
                    <div className={`flex ${screenshot.classes || ''}`}>
                        <CloudinaryImage
                            src={(isDark && screenshot.srcDark ? screenshot.srcDark : screenshot.src) as any}
                            alt={screenshot.alt}
                            imgClassName={screenshot.imgClasses}
                        />
                    </div>
                ) : (
                    <div />
                )}
                {view === 'slack' ? (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                <IconSparkles className="size-4" /> PostHog AI
                            </p>
                            <h2 className="text-2xl font-bold m-0">Ask anything – or teach it new Skills</h2>
                        </div>
                        <p className="text-secondary m-0">
                            PostHog has 250+ data and analysis tools that are stitched together on-the-fly to answer any
                            customer usage or data question you have.
                        </p>
                        <p className="text-secondary m-0">
                            Teach it new Skills to handle the jobs you do over and over – so it goes from answering
                            questions to doing the work.
                        </p>
                        <OSButton to="/ai" state={{ newWindow: true }} variant="secondary" asLink>
                            Explore PostHog AI
                        </OSButton>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <p className="flex items-center gap-1.5 text-secondary text-sm font-semibold m-0">
                                <IconSparkles className="size-4" /> PostHog AI
                            </p>
                            <h2 className="text-2xl font-bold m-0">Ask anything – or teach it new Skills</h2>
                        </div>
                        <p className="text-secondary m-0">
                            PostHog has 250+ data and analysis tools that are stitched together on-the-fly to answer any
                            customer usage or data question you have.
                        </p>
                        <p className="text-secondary m-0">
                            Teach it new Skills to handle the jobs you do over and over – so it goes from answering
                            questions to doing the work.
                        </p>
                        <OSButton to="/ai" state={{ newWindow: true }} variant="secondary" asLink>
                            Explore PostHog AI
                        </OSButton>
                    </div>
                )}
            </div>
        </div>
    )
}
