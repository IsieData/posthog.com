import React from 'react'
import PricingSvgImport from './svgs/pricing.svg'

// Pricing is a compound glass icon (a stack of dollar bills with a $) that doesn't
// fit the single-path `GlassIcon` model, so it lives as its own SVG (shadows
// recoloured to the system dark-green #033003). gatsby-plugin-react-svg turns files
// under `svgs/` into React components, but the project's *.svg type declaration
// types them as images — so cast to a component.
const PricingSvg = PricingSvgImport as unknown as React.FC<React.SVGProps<SVGSVGElement>>

interface PricingIconProps {
    className?: string
}

/**
 * The pricing desktop icon. Matches the other glass icons' size (`size-9` / 36px)
 * and hover pop, but renders its own multi-layer SVG instead of `GlassIcon`.
 */
export default function PricingIcon({ className = '' }: PricingIconProps) {
    return (
        <span
            className={`relative inline-flex items-center justify-center size-9 transition-transform duration-200 ease-out group-hover:scale-[1.03] ${className}`}
        >
            <PricingSvg className="block size-full overflow-visible" />
        </span>
    )
}
