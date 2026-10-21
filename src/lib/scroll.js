/**
 * Scrolls to a section id, accounting for the fixed navbar.
 * Used by nav links so the URL hash stays shareable.
 */
export function scrollToSection(id, { updateHash = true } = {}) {
  const element = document.getElementById(id)
  if (!element) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })

  if (updateHash) {
    window.history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`)
  }
}
