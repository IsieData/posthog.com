import TurndownService from 'turndown'
import { JSDOM } from 'jsdom'

export const preprocessHtmlForTabs = (html: string): string => {
    const dom = new JSDOM(html)
    const doc = dom.window.document

    const tabContainers = Array.from(doc.querySelectorAll('div.my-4')) as HTMLElement[]
    tabContainers.forEach((container) => {
        const ul = container.querySelector('ul')
        let tabs: HTMLElement[] = []

        if (ul) {
            tabs = Array.from(ul.querySelectorAll('button[role="tab"]')) as HTMLElement[]
        } else {
            tabs = Array.from(container.querySelectorAll('button[role="tab"]')) as HTMLElement[]
        }

        const panels = Array.from(container.querySelectorAll('[role="tabpanel"]')) as HTMLElement[]

        panels.forEach((panel, index) => {
            if (tabs[index]) {
                const tabLabel = tabs[index].textContent?.trim() || tabs[index].innerText?.trim() || ''
                if (tabLabel) {
                    panel.setAttribute('data-tab-label', tabLabel)
                }
            }
        })
    })

    const codeBlockContainers = Array.from(doc.querySelectorAll('div.code-block')) as HTMLElement[]
    codeBlockContainers.forEach((container) => {
        const tablist = container.querySelector('[role="tablist"]')
        if (tablist) {
            const tabs = Array.from(tablist.querySelectorAll('button[role="tab"]')) as HTMLElement[]
            const codeBlocks = Array.from(container.querySelectorAll('pre')) as HTMLElement[]

            codeBlocks.forEach((codeBlock, index) => {
                if (tabs[index]) {
                    const languageLabel = tabs[index].textContent?.trim() || tabs[index].innerText?.trim() || ''
                    if (languageLabel) {
                        codeBlock.setAttribute('data-language-label', languageLabel)
                    }
                }
            })
        }
    })

    return doc.documentElement.outerHTML
}

export const extractTitleFromHtml = (html: string): string => {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch) {
        let title = titleMatch[1].trim()
        const parts = title.split(' - ')
        if (parts.length > 1 && (parts[parts.length - 1] === 'Docs' || parts[parts.length - 1] === 'PostHog')) {
            title = parts.slice(0, -1).join(' - ')
        }
        if (title) return title
    }

    const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
    if (h1Match) {
        return h1Match[1].trim() || 'Untitled'
    }

    return 'Untitled'
}

export const extractMainContent = (html: string): string => {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    if (mainMatch) {
        return mainMatch[1]
    }

    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    if (articleMatch) {
        return articleMatch[1]
    }

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    if (bodyMatch) {
        return bodyMatch[1]
    }

    return html
}

// Pick the highest-resolution real URL from an `srcset`, ignoring base64 placeholders.
const largestSrcsetUrl = (srcset?: string | null): string => {
    if (!srcset) return ''
    const candidates = srcset
        .split(',')
        .map((part) => {
            const [url, descriptor] = part.trim().split(/\s+/)
            const width = descriptor && descriptor.endsWith('w') ? parseInt(descriptor, 10) : 0
            return { url, width: Number.isNaN(width) ? 0 : width }
        })
        .filter((c) => c.url && !c.url.startsWith('data:'))
    if (candidates.length === 0) return ''
    candidates.sort((a, b) => b.width - a.width)
    return candidates[0].url
}

// Resolve the best usable image URL from an element, skipping base64 blur-up placeholders.
const resolveImageUrl = (el: HTMLElement | null): string => {
    if (!el) return ''
    let src = el.getAttribute('src') || ''
    if (!src || src.startsWith('data:')) {
        src =
            el.getAttribute('data-src') ||
            largestSrcsetUrl(el.getAttribute('srcset')) ||
            largestSrcsetUrl(el.getAttribute('data-srcset')) ||
            ''
    }
    return !src || src.startsWith('data:') ? '' : src
}

export const createTurndownService = (title: string) => {
    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced',
        bulletListMarker: '-',
        emDelimiter: '*',
        strongDelimiter: '**',
        fence: '```',
    })

    turndownService.addRule('removeScriptsAndStyles', {
        filter: ['script', 'style'],
        replacement: () => '',
    })

    turndownService.addRule('removeComments', {
        filter: (node) => {
            return node.nodeType === 8
        },
        replacement: () => '',
    })

    turndownService.addRule('removeEmptyParagraphs', {
        filter: (node) => {
            return node.nodeName === 'P' && (!node.textContent || node.textContent.trim() === '')
        },
        replacement: () => '',
    })

    turndownService.addRule('handleTabPanels', {
        filter: (node) => {
            return node.nodeName === 'DIV' && node.getAttribute('role') === 'tabpanel'
        },
        replacement: (content, node) => {
            const panelContent = content.trim()
            if (!panelContent) return ''

            const tabLabel = node.getAttribute('data-tab-label') || 'Tab'

            return `## ${tabLabel}\n\n${panelContent}\n\n`
        },
    })

    turndownService.addRule('removeTabLists', {
        filter: (node) => {
            if (node.nodeName === 'UL' && node.querySelector('button[role="tab"]')) {
                return true
            }
            return node.nodeName === 'DIV' && node.getAttribute('role') === 'tablist'
        },
        replacement: () => '',
    })

    turndownService.addRule('removeStyleAttributes', {
        filter: (node) => {
            return node.nodeName === 'STYLE' || (node.nodeType === 1 && node.getAttribute('style'))
        },
        replacement: (content, node) => {
            if (node.nodeName === 'STYLE') {
                return ''
            }
            return content
        },
    })

    turndownService.addRule('cleanCodeBlocks', {
        filter: (node) => node.nodeName === 'PRE',
        replacement: (content, node) => {
            const codeElement = node.querySelector('code') || node

            const styleTags = Array.from(codeElement.querySelectorAll('style')) as HTMLElement[]
            styleTags.forEach((style) => style.remove())

            const scrollViewports = Array.from(
                codeElement.querySelectorAll('[data-radix-scroll-area-viewport]')
            ) as HTMLElement[]
            scrollViewports.forEach((viewport) => {
                while (viewport.firstChild) {
                    viewport.parentNode?.insertBefore(viewport.firstChild, viewport)
                }
                viewport.remove()
            })

            const tokenLines = codeElement.querySelectorAll('.token-line')
            let code = ''
            if (tokenLines.length > 0) {
                code = Array.from(tokenLines)
                    .map((line) => {
                        const text = (line as HTMLElement).textContent || ''
                        return text.trimEnd()
                    })
                    .filter((line) => line.length > 0)
                    .join('\n')
            } else {
                code = (codeElement as HTMLElement).textContent || ''
            }

            code = code.trim()
            if (!code) return ''

            const classAttr = codeElement.getAttribute('class') || node.getAttribute('class') || ''
            const languageMatch = classAttr.match(/language-(\w+)/)
            const language = languageMatch ? languageMatch[1] : ''

            const languageLabel = node.getAttribute('data-language-label')

            const codeBlock = language ? `\`\`\`${language}\n${code}\n\`\`\`` : `\`\`\`\n${code}\n\`\`\``

            if (languageLabel) {
                return `\n### ${languageLabel}\n\n${codeBlock}\n\n`
            }

            return `\n${codeBlock}\n\n`
        },
    })

    // gatsby-plugin-image (e.g. blog featured images) renders a base64 blur-up placeholder <img>
    // alongside <picture>/srcset sources. Recover the real URL and drop the placeholder so the
    // markdown gets a clean `![alt](url)` instead of a giant data: URI. Inline blog images are
    // plain absolute Cloudinary <img> tags and pass straight through.
    turndownService.addRule('cleanPicture', {
        filter: 'picture',
        replacement: (_content, node) => {
            const el = node as unknown as HTMLElement
            const img = el.querySelector('img') as HTMLElement | null
            const alt = (img?.getAttribute('alt') || '').replace(/\s+/g, ' ').trim()
            let src = resolveImageUrl(img)
            if (!src) {
                const source = el.querySelector('source') as HTMLElement | null
                src = resolveImageUrl(source)
            }
            return src ? `![${alt}](${src})` : ''
        },
    })

    turndownService.addRule('cleanImages', {
        filter: 'img',
        replacement: (_content, node) => {
            const el = node as unknown as HTMLElement
            const alt = (el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim()
            const src = resolveImageUrl(el)
            return src ? `![${alt}](${src})` : ''
        },
    })

    let hasH1 = false
    turndownService.addRule('normalizeH1', {
        filter: (node) => {
            return node.nodeName === 'H1'
        },
        replacement: (content, node) => {
            if (!hasH1) {
                hasH1 = true
                return `# ${title}\n\n`
            }
            return `## ${content}\n\n`
        },
    })

    const formatHrefForMarkdown = (href: string): string => {
        if (href.startsWith('/') && !href.startsWith('//')) {
            const [pathPart, hash] = href.replace(/\.html$/, '').split('#')
            const pathWithMd = pathPart && !pathPart.endsWith('.md') ? `${pathPart}.md` : pathPart
            return hash ? `${pathWithMd}#${hash}` : pathWithMd
        }
        return href
    }

    turndownService.addRule('processLinks', {
        filter: (node) => {
            return node.nodeName === 'A' && node.getAttribute('href')
        },
        replacement: (content, node) => {
            const href = node.getAttribute('href') || ''
            const markdownHref = formatHrefForMarkdown(href)
            return `[${content}](${markdownHref})`
        },
    })

    turndownService.addRule('removeScrollViewports', {
        filter: (node) => {
            return (
                node.nodeName === 'DIV' &&
                (node.getAttribute('data-radix-scroll-area-viewport') !== null ||
                    node.className?.includes('scroll-area'))
            )
        },
        replacement: (content) => content,
    })

    turndownService.addRule('removeTableOfContents', {
        filter: (node) => {
            const id = node.getAttribute && node.getAttribute('id')
            return id === 'toc' || id === 'mobile-toc'
        },
        replacement: () => '',
    })

    turndownService.addRule('handleHorizontalRules', {
        filter: (node) => {
            return node.nodeName === 'HR'
        },
        replacement: () => {
            return '\n\n---\n\n'
        },
    })

    const getTableCellMarkdown = (cell: HTMLElement): string => {
        const produceMarkdownFromNode = (node: Node): string => {
            if (node.nodeType === 3) {
                return node.textContent || ''
            }

            if (node.nodeType === 1) {
                const el = node as HTMLElement

                if (el.nodeName === 'A') {
                    const href = el.getAttribute('href') || ''
                    const text = (el.textContent || '').trim()
                    if (!text) {
                        return ''
                    }
                    const markdownHref = formatHrefForMarkdown(href)
                    return `[${text}](${markdownHref})`
                }

                let accumulated = ''
                el.childNodes.forEach((child) => {
                    accumulated += produceMarkdownFromNode(child)
                })
                return accumulated
            }

            return ''
        }

        let result = ''
        cell.childNodes.forEach((child) => {
            result += produceMarkdownFromNode(child)
        })

        const text = result.trim()
        if (!text) {
            return ''
        }

        return text.replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\s+/g, ' ')
    }

    turndownService.addRule('handleTables', {
        filter: (node) => {
            return node.nodeName === 'TABLE'
        },
        replacement: (content, node) => {
            const thead = node.querySelector('thead')
            const tbody = node.querySelector('tbody') || node
            const rows: string[] = []

            if (thead) {
                const headerRow = thead.querySelector('tr')
                if (headerRow) {
                    const headers = Array.from(headerRow.querySelectorAll('th, td'))
                        .map((cell) => getTableCellMarkdown(cell as HTMLElement))
                        .filter((text) => text.length > 0)

                    if (headers.length > 0) {
                        rows.push('| ' + headers.join(' | ') + ' |')
                        rows.push('| ' + headers.map(() => '---').join(' | ') + ' |')
                    }
                }
            }

            const bodyRows = Array.from(tbody.querySelectorAll('tr'))
            bodyRows.forEach((row) => {
                const cells = Array.from(row.querySelectorAll('td, th'))
                    .map((cell) => getTableCellMarkdown(cell as HTMLElement))
                    .filter((text) => text.length > 0)

                if (cells.length > 0) {
                    rows.push('| ' + cells.join(' | ') + ' |')
                }
            })

            if (rows.length > 0) {
                return '\n\n' + rows.join('\n') + '\n\n'
            }

            return '\n\n' + content.trim() + '\n\n'
        },
    })

    turndownService.addRule('formatQuestItems', {
        filter: (node) => {
            if (node.nodeName === 'A') {
                const href = node.getAttribute('href') || ''
                return href.startsWith('#quest-item-')
            }
            return false
        },
        replacement: (content, node) => {
            const href = node.getAttribute('href') || ''
            const text = content.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ')
            if (text) {
                return `[${text}](${href})`
            }
            return ''
        },
    })

    turndownService.addRule('formatFeedbackSections', {
        filter: (node) => {
            if (node.nodeName === 'H3') {
                const text = node.textContent?.trim() || ''
                return text === 'Community questions' || text === 'Was this page useful?'
            }
            return false
        },
        replacement: (content) => {
            return `\n\n### ${content.trim()}\n\n`
        },
    })

    return turndownService
}

export const postProcessMarkdown = (markdown: string, title: string): string => {
    let result = markdown

    result = result.replace(/^---[\s\S]*?---\n*/m, '')

    const lines = result.split('\n')
    const cleanedLines: string[] = []
    let inCodeBlock = false

    for (const line of lines) {
        const isCodeBlockStart = line.trim().startsWith('```')

        if (isCodeBlockStart) {
            inCodeBlock = !inCodeBlock
            cleanedLines.push(line)
        } else if (inCodeBlock) {
            cleanedLines.push(line)
        } else {
            if (line.includes('[data-') && line.includes(']{')) {
                continue
            }

            if (line.match(/^\[data-radix-scroll-area-viewport\]/)) {
                continue
            }

            const cleaned = line.replace(/[ \t]+$/, '')
            if (cleaned || cleanedLines.length === 0 || cleanedLines[cleanedLines.length - 1]) {
                cleanedLines.push(cleaned)
            }
        }
    }

    result = cleanedLines.join('\n')

    result = result.replace(/\n{4,}/g, '\n\n\n')
    result = result.replace(/^\s*-\s*$/gm, '')

    if (!result.trim().startsWith('# ')) {
        result = `# ${title}\n\n${result}`
    }

    return result.trim()
}
