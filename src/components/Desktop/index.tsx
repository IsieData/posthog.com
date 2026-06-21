import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import { AppIcon, GlassIcon } from 'components/OSIcons'
import {
    HOME_SILHOUETTE,
    DEMO_SILHOUETTE,
    DEMO_VIEWBOX,
    PLACEHOLDER_SILHOUETTE,
    DEMO_THUMBNAIL,
} from 'components/OSIcons/glyphs'
import { AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'
import DraggableDesktopIcon from './DraggableDesktopIcon'
import { Screensaver } from '../Screensaver'
import { useInactivityDetection } from '../../hooks/useInactivityDetection'
import NotificationsPanel from 'components/NotificationsPanel'
import Wallpapers from './Wallpapers'
import { motion, useMotionValue, animate } from 'framer-motion'
import HedgeHogModeEmbed from 'components/HedgehogMode'
import ReactConfetti from 'react-confetti'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'
import { navigate } from 'gatsby'

interface Product {
    name: string
    slug: string
    Icon: React.ComponentType<any>
    color?: string
}

export const useProductLinks = () => {
    const { posthogInstance, openNewChat, siteSettings, updateSiteSettings } = useApp()
    const { addToast } = useToast()
    const posthog = usePostHog()

    return [
        {
            label: 'Home',
            Icon: <GlassIcon path={HOME_SILHOUETTE} />,
            url: '/',
            source: 'desktop',
        },
        {
            // TODO: swap PLACEHOLDER_SILHOUETTE for the real Product OS glass path once available
            label: 'Product OS',
            Icon: <GlassIcon path={PLACEHOLDER_SILHOUETTE} />,
            url: '/products',
            source: 'desktop',
        },
        {
            // TODO: swap PLACEHOLDER_SILHOUETTE for the real Library glass path once available
            label: 'Library',
            Icon: <GlassIcon path={PLACEHOLDER_SILHOUETTE} />,
            url: '/posts',
            source: 'desktop',
        },
        {
            label: 'Pricing',
            Icon: <AppIcon name="pricing" />,
            url: '/pricing',
            source: 'desktop',
        },
        {
            label: 'customers.mdx',
            Icon: <AppIcon name="spreadsheet" />,
            url: '/customers',
            source: 'desktop',
        },
        {
            label: 'demo.mov',
            Icon: <GlassIcon path={DEMO_SILHOUETTE} viewBox={DEMO_VIEWBOX} image={DEMO_THUMBNAIL} fillOpacity={0.2} />,
            url: '/demo',
            source: 'desktop',
        },
        {
            label: 'Docs',
            Icon: <AppIcon name="notebook" />,
            url: '/docs',
            source: 'desktop',
        },
        {
            label: 'Talk to a human',
            Icon: <AppIcon name="envelope" />,
            url: '/talk-to-a-human',
            source: 'desktop',
        },
        {
            label: 'Ask a question',
            Icon: <AppIcon name="forums" />,
            onClick: () => openNewChat({ path: `ask-max` }),
            source: 'desktop',
        },
        ...(posthogInstance
            ? [
                  {
                      label: 'Open app ↗',
                      Icon: <AppIcon name="computerCoffee" />,
                      url: 'https://app.posthog.com',
                      external: true,
                      source: 'desktop',
                  },
              ]
            : [
                  {
                      label: 'Sign up ↗',
                      Icon: <AppIcon name="compass" />,
                      url: 'https://app.posthog.com/signup',
                      external: true,
                      source: 'desktop',
                  },
              ]),
        {
            label: 'Switch to website mode',
            Icon: <AppIcon name="switch" />,
            onClick: () => {
                updateSiteSettings({ ...siteSettings, experience: 'boring' })
                posthog?.capture('switched site mode', {
                    value: 'website',
                    source: 'desktop',
                })
                addToast({
                    title: 'Switched to website mode',
                    description: 'Hover the logo to return to OS mode.',
                    duration: 5000,
                    onUndo: () => {
                        updateSiteSettings({ ...siteSettings, experience: 'posthog' })
                    },
                })
            },
            source: 'desktop',
        },
    ]
}

export const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <AppIcon name="posthog" />,
        url: '/about',
        source: 'desktop',
    },
    {
        label: 'Changelog',
        Icon: <AppIcon name="invite" />,
        url: '/changelog',
        source: 'desktop',
    },
    // {
    //     label: 'Cool tech events',
    //     Icon: <AppIcon name="invite" />,
    //     url: '/events',
    //     source: 'desktop',
    // },
    {
        label: 'Company handbook',
        Icon: <AppIcon name="handbook" />,
        url: '/handbook',
        source: 'desktop',
    },
    {
        label: 'Store',
        Icon: <AppIcon name="shoppingBag" />,
        url: '/merch',
        source: 'desktop',
    },
    {
        label: 'Work here',
        Icon: <AppIcon name="typewriter" />,
        url: '/careers',
        source: 'desktop',
    },
    {
        label: 'Trash',
        Icon: <AppIcon name="trash" />,
        url: '/trash',
        source: 'desktop',
    },
]

interface IconPosition {
    x: number
    y: number
}

type IconPositions = Record<string, IconPosition>

const STORAGE_KEY = 'desktop-icon-positions'

const validateIconPositions = (
    positions: IconPositions,
    constraintsRef: React.RefObject<HTMLDivElement>,
    productLinks: ReturnType<typeof useProductLinks>
): boolean => {
    const iconWidth = 112
    const iconHeight = 75
    const allApps = [...productLinks, ...apps]

    for (const app of allApps) {
        if (!positions[app.label]) {
            return false
        }
    }

    // Get current viewport dimensions
    const containerWidth =
        constraintsRef.current?.getBoundingClientRect().width ||
        (typeof window !== 'undefined' ? window.innerWidth : 1200)
    const containerHeight =
        constraintsRef.current?.getBoundingClientRect().height ||
        (typeof window !== 'undefined' ? window.innerHeight : 800)

    for (const position of Object.values(positions)) {
        // Check if icon is completely outside viewport bounds
        if (
            position.x < 0 ||
            position.y < 0 ||
            position.x + iconWidth > containerWidth ||
            position.y + iconHeight > containerHeight
        ) {
            return false
        }
    }
    return true
}

export default function Desktop() {
    const productLinks = useProductLinks()
    const {
        constraintsRef,
        siteSettings,
        screensaverPreviewActive,
        setScreensaverPreviewActive,
        setConfetti,
        confetti,
        compact,
        websiteMode,
        posthogInstance,
        updateSiteSettings,
        initialHomepage,
    } = useApp()
    const [iconPositions, setIconPositions] = useState<IconPositions>({})
    const { isInactive, dismiss } = useInactivityDetection({
        enabled: !siteSettings.screensaverDisabled,
    })
    const [rendered, setRendered] = useState(false)
    const [navVisible, setNavVisible] = useState(false)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [fakeCursorActive, setFakeCursorActive] = useState(false)
    const cursorX = useMotionValue(0)
    const cursorY = useMotionValue(0)
    const cursorScale = useMotionValue(1)
    const cursorOpacity = useMotionValue(0)
    const { addToast } = useToast()
    function generateInitialPositions(columns = 2): IconPositions {
        const positions: IconPositions = {}

        // Default positions if container isn't available yet
        const containerWidth =
            constraintsRef.current?.getBoundingClientRect().width ||
            (typeof window !== 'undefined' ? window.innerWidth : 1200)
        const containerHeight =
            constraintsRef.current?.getBoundingClientRect().height ||
            (typeof window !== 'undefined' ? window.innerHeight : 800)

        const iconWidth = 112
        const iconHeight = 75
        const paddingHorizontal = 4
        const paddingVertical = 20
        const columnSpacing = 128 // Space between columns (icon width + gap)

        const startY = paddingVertical
        const availableHeight = containerHeight - paddingVertical * 2 // Top and bottom padding
        const maxIconsPerColumn = Math.floor(availableHeight / iconHeight)

        // Position productLinks starting from the left
        let currentColumn = 0
        const leftIcons = columns === 1 ? [...productLinks, ...apps] : productLinks
        leftIcons.forEach((app, index) => {
            const columnIndex = Math.floor(index / maxIconsPerColumn)
            const positionInColumn = index % maxIconsPerColumn

            positions[app.label] = {
                x: paddingHorizontal + columnIndex * columnSpacing,
                y: startY + positionInColumn * iconHeight,
            }

            currentColumn = Math.max(currentColumn, columnIndex + 1)
        })

        if (columns === 1) {
            return positions
        }

        // Start from the rightmost position and flow left
        const rightmostStart = containerWidth - paddingHorizontal - iconWidth
        // Ensure at least one column gap from productLinks
        const minStartFromLeft = (currentColumn + 1) * columnSpacing + paddingHorizontal
        const rightStartColumn = Math.max(rightmostStart, minStartFromLeft)

        apps.forEach((app, index) => {
            const columnIndex = Math.floor(index / maxIconsPerColumn)
            const positionInColumn = index % maxIconsPerColumn

            positions[app.label] = {
                x: rightStartColumn - columnIndex * columnSpacing,
                y: startY + positionInColumn * iconHeight,
            }
        })

        if (columns > 1) {
            const isAnyIconOutOfBounds = Object.values(positions).some(
                (position) =>
                    position.x < 0 ||
                    position.y < 0 ||
                    position.x + iconWidth > containerWidth ||
                    position.y + iconHeight > containerHeight
            )

            if (isAnyIconOutOfBounds) {
                return generateInitialPositions(1)
            }
        }

        return positions
    }

    useEffect(() => {
        const savedPositions = localStorage.getItem(STORAGE_KEY)
        if (savedPositions) {
            try {
                const parsedPositions = JSON.parse(savedPositions)

                // Validate that all positions are within viewport bounds
                if (validateIconPositions(parsedPositions, constraintsRef, productLinks)) {
                    setIconPositions(parsedPositions)
                } else {
                    // Some icons are out of bounds, reset to initial positions
                    setIconPositions(generateInitialPositions())
                }
            } catch (error) {
                console.error('Error parsing saved positions:', error)
                setIconPositions(generateInitialPositions())
            }
        } else {
            setIconPositions(generateInitialPositions())
        }

        const handleResize = () => {
            setIconPositions(generateInitialPositions())
        }

        setTimeout(() => {
            setRendered(true)
        }, 400)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }
        }
    }, [posthogInstance])

    const runFakeCursorAnimation = useCallback(() => {
        if (!initialHomepage || !rendered) return

        const startX = window.innerWidth * 0.85
        const startY = window.innerHeight * 0.8

        cursorX.set(startX)
        cursorY.set(startY)
        cursorScale.set(1)
        cursorOpacity.set(0)

        setFakeCursorActive(true)

        const iconWidth = 112
        const iconHeight = 75
        const homePos = iconPositions['Home'] || { x: 0, y: 0 }
        const container = constraintsRef.current
        const containerRect = container?.getBoundingClientRect()
        let targetX = startX
        let targetY = startY
        if (containerRect) {
            targetX = containerRect.left + homePos.x + iconWidth / 2
            targetY = containerRect.top + homePos.y + iconHeight / 2
        }

        const homeIconEl = document.querySelector<HTMLElement>('[data-icon-label="Home"]')
        const zoomHoverEl = homeIconEl?.querySelector<HTMLElement>(':scope > div > div')

        // Fade in → move to icon → hover → click → exit right
        animate(cursorOpacity, 1, {
            duration: 0.25,
            onComplete: () => {
                let movesDone = 0
                const onMoveDone = () => {
                    movesDone++
                    if (movesDone < 2) return
                    // Simulate hover
                    if (zoomHoverEl) zoomHoverEl.style.top = '-0.5px'
                    setTimeout(() => {
                        // Click press
                        if (zoomHoverEl) zoomHoverEl.style.top = '0.5px'
                        animate(cursorScale, 0.8, {
                            duration: 0.08,
                            onComplete: () => {
                                if (zoomHoverEl) zoomHoverEl.style.top = '-0.5px'
                                animate(cursorScale, 1, {
                                    duration: 0.1,
                                    onComplete: () => {
                                        if (zoomHoverEl) zoomHoverEl.style.top = ''
                                        const homeLink = homeIconEl?.querySelector<HTMLElement>('a[href="/"]')
                                        if (homeLink) {
                                            homeLink.click()
                                        } else {
                                            navigate('/')
                                        }
                                        // Brief pause then exit
                                        setTimeout(() => {
                                            animate(cursorX, window.innerWidth + 40, {
                                                duration: 0.5,
                                                ease: [0.4, 0, 1, 1],
                                            })
                                            animate(cursorOpacity, 0, {
                                                duration: 0.3,
                                                delay: 0.2,
                                                onComplete: () => {
                                                    setFakeCursorActive(false)
                                                },
                                            })
                                        }, 300)
                                    },
                                })
                            },
                        })
                    }, 350)
                }
                animate(cursorX, targetX, {
                    duration: 1,
                    ease: [0.5, 0, 0.3, 1],
                    onComplete: onMoveDone,
                })
                animate(cursorY, targetY, {
                    duration: 1,
                    ease: [0.2, 0.8, 0.4, 1],
                    onComplete: onMoveDone,
                })
            },
        })
    }, [initialHomepage, rendered])

    useEffect(() => {
        if (initialHomepage && rendered) {
            const timeout = setTimeout(runFakeCursorAnimation, 500)
            return () => clearTimeout(timeout)
        }
    }, [initialHomepage, rendered, runFakeCursorAnimation])

    useEffect(() => {
        document.documentElement.style.cursor = fakeCursorActive ? 'none' : ''
        return () => {
            document.documentElement.style.cursor = ''
        }
    }, [fakeCursorActive])

    const handlePositionChange = (appLabel: string, position: IconPosition) => {
        const newPositions = { ...iconPositions, [appLabel]: position }
        setIconPositions(newPositions)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
    }

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
        }
        setNavVisible(true)
    }

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setNavVisible(false)
        }, 2000)
    }

    const allApps = [...productLinks, ...apps]

    const handleScreensaverDismiss = () => {
        addToast({
            title: 'Screensaver dismissed',
            description: 'Want to disable it permanently?',
            duration: 10000,
            actionLabel: 'Disable screensaver',
            onAction: () => {
                updateSiteSettings({ ...siteSettings, screensaverDisabled: true })
                addToast({
                    title: 'Screensaver disabled',
                    description: (
                        <>
                            Change this setting in{' '}
                            <Link
                                to="/display-options"
                                className="text-red dark:text-yellow font-semibold"
                                state={{ newWindow: true }}
                            >
                                Display options
                            </Link>
                            .
                        </>
                    ),
                    duration: 10000,
                    onUndo: () => {
                        updateSiteSettings({ ...siteSettings, screensaverDisabled: false })
                    },
                })
            },
        })
        setScreensaverPreviewActive(false)
        dismiss()
    }

    return (
        <>
            <ContextMenu
                menuItems={[
                    {
                        type: 'item',
                        children: (
                            <Link to="/about" state={{ newWindow: true }}>
                                About PostHog
                            </Link>
                        ),
                    },
                    {
                        type: 'item',
                        children: (
                            <Link to="/display-options" state={{ newWindow: true }}>
                                Display options
                            </Link>
                        ),
                        shortcut: [','],
                    },
                    {
                        type: 'item',
                        children: (
                            <Link to="/kbd" state={{ newWindow: true }}>
                                Keyboard shortcuts
                            </Link>
                        ),
                        shortcut: ['.'],
                    },
                    {
                        type: 'item',
                        children: (
                            <button
                                onClick={() => {
                                    localStorage.removeItem(STORAGE_KEY)
                                    setIconPositions(generateInitialPositions())
                                }}
                            >
                                Reset icons
                            </button>
                        ),
                    },
                ]}
            >
                <div
                    data-scheme="primary"
                    data-app="Desktop"
                    className="fixed size-full website:-z-10 website:inset-0 os:top-0 os:pt-12"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Wallpapers wallpaper={siteSettings.wallpaper} reduceMotion={siteSettings.performanceBoost} />

                    <nav className="website:hidden">
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: rendered ? 1 : 0 }}
                            className="list-none m-0 -mt-2 md:mt-0 p-0 grid sm:grid-cols-4 grid-cols-3 gap-2"
                        >
                            {allApps.map((app) => {
                                const position = iconPositions[app.label] || { x: 0, y: 0 }

                                return (
                                    <DraggableDesktopIcon
                                        key={app.label}
                                        app={app}
                                        initialPosition={position}
                                        onPositionChange={(newPosition) => handlePositionChange(app.label, newPosition)}
                                    />
                                )
                            })}
                        </motion.ul>
                    </nav>
                </div>
                {!compact && !websiteMode && (
                    <Screensaver
                        isActive={isInactive || screensaverPreviewActive}
                        onDismiss={handleScreensaverDismiss}
                    />
                )}
                {!websiteMode && <HedgeHogModeEmbed />}
            </ContextMenu>
            <NotificationsPanel />
            {confetti && (
                <div className="fixed inset-0 pointer-events-none">
                    <ReactConfetti
                        onConfettiComplete={() => setConfetti(false)}
                        recycle={false}
                        numberOfPieces={1200}
                        gravity={0.12}
                        initialVelocityY={20}
                        initialVelocityX={10}
                        tweenDuration={200}
                    />
                    <ReactConfetti
                        recycle={false}
                        numberOfPieces={800}
                        confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: window.innerHeight }}
                        initialVelocityY={-8}
                        initialVelocityX={5}
                        gravity={0.15}
                        tweenDuration={1}
                    />
                </div>
            )}
            {fakeCursorActive && (
                <motion.img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/james_cursor_default_d6f7983b0a.png"
                    alt=""
                    className="fixed top-0 left-0 h-8 pointer-events-none z-[99999]"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        scale: cursorScale,
                        opacity: cursorOpacity,
                        translateX: '-25%',
                        translateY: '-10%',
                    }}
                />
            )}
        </>
    )
}
