import { Moon, Sun } from 'lucide-react'
import { useRef, useState } from 'react'

const REVEAL_MS = 700

function getIsDark() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function applyTheme(isDark) {
  const root = document.documentElement
  root.classList.toggle('dark', isDark)
  root.style.colorScheme = isDark ? 'dark' : 'light'

  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  } catch {
    /* Storage may be unavailable; the toggle still works for this session. */
  }

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', isDark ? '#0a0a0a' : '#ffffff')
}

/** Light is the default (matching the reference); the choice is persisted. */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getIsDark)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionRef = useRef(false)

  const finish = () => {
    transitionRef.current = false
    setIsTransitioning(false)
    document.documentElement.removeAttribute('data-theme-transition')
  }

  const toggle = () => {
    if (transitionRef.current) return

    const next = !isDark
    const root = document.documentElement
    const direction = next ? 'to-dark' : 'to-light'

    // Reduced motion gets the final theme immediately, with no wipe.
    if (prefersReducedMotion()) {
      applyTheme(next)
      setIsDark(next)
      return
    }

    transitionRef.current = true
    setIsTransitioning(true)
    root.dataset.themeTransition = direction

    // Browsers without View Transitions get a matching full-viewport wipe.
    if (typeof document.startViewTransition !== 'function') {
      const overlay = document.createElement('div')
      overlay.className = 'theme-reveal'
      overlay.dataset.direction = direction
      overlay.setAttribute('aria-hidden', 'true')
      document.body.appendChild(overlay)
      applyTheme(next)
      setIsDark(next)

      let cleaned = false
      const cleanup = () => {
        if (cleaned) return
        cleaned = true
        overlay.remove()
        finish()
      }

      overlay.addEventListener('animationend', cleanup, { once: true })
      window.setTimeout(cleanup, REVEAL_MS + 200)
      return
    }

    try {
      const transition = document.startViewTransition(() => {
        applyTheme(next)
        setIsDark(next)
      })
      transition.finished.finally(finish)
    } catch {
      applyTheme(next)
      setIsDark(next)
      finish()
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isTransitioning}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid size-8 shrink-0 place-items-center rounded-md text-title transition-colors hover:bg-muted disabled:cursor-wait disabled:opacity-60"
    >
      {isDark ? (
        <Sun className="size-[18px]" aria-hidden="true" strokeWidth={1.7} />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" strokeWidth={1.7} />
      )}
    </button>
  )
}
