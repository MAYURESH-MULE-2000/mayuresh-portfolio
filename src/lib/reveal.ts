/**
 * Reveal-on-scroll for the journal pages.
 *
 * Elements carrying `data-reveal` start hidden (see global.css) and get
 * `.is-revealed` once they scroll into view. `data-reveal-delay` staggers a
 * group. Users who prefer reduced motion get everything revealed immediately.
 */
export function observeReveals(root: ParentNode = document): () => void {
  const nodes = Array.from(
    root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
  )
  if (!nodes.length) return () => {}

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion || typeof IntersectionObserver === 'undefined') {
    nodes.forEach((node) => node.classList.add('is-revealed'))
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const delay = Number(el.dataset.revealDelay ?? 0)
        window.setTimeout(() => el.classList.add('is-revealed'), delay)
        observer.unobserve(el)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )

  nodes.forEach((node) => observer.observe(node))
  return () => observer.disconnect()
}
