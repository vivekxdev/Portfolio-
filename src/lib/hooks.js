import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view for the navbar indicator.
 * Uses one IntersectionObserver rather than scroll listeners.
 */
export function useActiveSection(ids, offset = 0.35, watch = '') {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    // Keep the ids currently crossing the observer's narrow band. This lets us
    // clear the indicator when the page is at the very top (no section active)
    // instead of leaving the last visited section highlighted.
    const visible = new Set()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })

        if (!visible.size) {
          setActive('')
          return
        }

        // The band is thin, so more than one section is rare. Prefer the
        // earliest section in document order when it happens.
        setActive(ids.find((id) => visible.has(id)) ?? '')
      },
      { rootMargin: `-${Math.round(offset * 100)}% 0px -${Math.round((1 - offset) * 100)}% 0px` },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids, offset, watch])

  return active
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** Locks body scroll while a modal / mobile menu is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}
