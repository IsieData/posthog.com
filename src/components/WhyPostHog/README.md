# WhyPostHog

Shared layout for the **"Why PostHog?"** page collection — the homepage plus a
handful of narrative/marketing pages that share one sidebar navigation.

It's modeled on the session replay product layout (`ReaderViewProduct`), but
without the side-by-side Product/Pricing/Docs tabs or anchor-scroll sections.
Each nav entry is its own **individual page** (like the docs nav).

## What it renders

`WhyPostHogReader` wraps [`ReaderView`](../ReaderView) and injects:

- **`productSelect`** → [`Header.tsx`](./Header.tsx): a static `IconLogomark` +
  "Why PostHog?" label (no dropdown, not a link). It collapses to an icon-only
  state via `useSidebarExpanded()`, matching `ProductSwitcher`.
- **`leftSidebar`** → [`TreeMenu`](../TreeMenu) with `appearance="sidebar"`,
  fed by [`whyPostHogNav`](../../navs/whyPostHog.ts). The current page is
  highlighted automatically from the pathname.

Inline search is provided by `ReaderView` itself — typing in the sidebar search
box replaces the nav list with search results, then restores it when cleared.
No extra wiring is needed here.

All other `ReaderView` props pass through (`title`, `hideTitle`, `proseSize`,
`hideRightSidebar`, `showQuestions`, SEO is set by the page, etc.). The sidebar
defaults to pinned/visible (`defaultNavVisible = true`).

## Usage

```tsx
import WhyPostHogReader from 'components/WhyPostHog'
import { SEO } from 'components/seo'

export default function MyPage() {
    return (
        <WhyPostHogReader title="My page" proseSize="lg">
            <SEO title="My page – PostHog" />
            <h1>My page</h1>
            {/* narrative prose */}
        </WhyPostHogReader>
    )
}
```

## Adding a page to the collection

1. Add a `{ name, url }` entry to [`src/navs/whyPostHog.ts`](../../navs/whyPostHog.ts).
2. Create the page in `src/pages/` rendering `WhyPostHogReader`.
3. If the URL replaces or moves an existing page, add a redirect in `vercel.json`.

## Pages in the collection

| Page | URL |
| --- | --- |
| Let PostHog code (homepage) | `/` |
| What is PostHog? | `/101` |
| Works with your agents | `/workflow` |
| Why we exist | `/why` |
| Why people like us | `/moat` |
| How to get started | `/start` |
