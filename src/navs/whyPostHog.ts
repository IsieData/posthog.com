/**
 * Shared sidebar nav for the "Why PostHog?" page collection.
 *
 * Each entry is its own individual page (not an anchor-scroll section), rendered
 * via `<TreeMenu items={whyPostHogNav} appearance="sidebar" />` inside the
 * `WhyPostHogReader` wrapper (`components/WhyPostHog`). The current page is
 * highlighted automatically from the pathname by `TreeMenu`.
 *
 * Flat list of `{ name, url }` — no section headers, no icons — to match the
 * wireframe. To add a page to the collection, add an entry here and create the
 * corresponding page that renders `WhyPostHogReader`.
 */
export interface WhyPostHogNavItem {
    name: string
    url: string
}

export const whyPostHogNav: WhyPostHogNavItem[] = [
    { name: 'Let PostHog code', url: '/' },
    { name: 'What is PostHog?', url: '/101' },
    { name: 'Works with your agents', url: '/workflow' },
    { name: 'Why we exist', url: '/why' },
    { name: 'Why people like us', url: '/moat' },
    { name: 'How to get started', url: '/start' },
]

export default whyPostHogNav
