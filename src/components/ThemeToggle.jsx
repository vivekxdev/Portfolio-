import { Moon, Sun } from 'lucide-react'
import { useState } from 'react'

function getIsDark() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

/** Light is the default (matching the reference); the choice is persisted. */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getIsDark)

  const toggle = () => {
    const next = !isDark
    const root = document.documentElement
    root.classList.toggle('dark', next)
    root.style.colorScheme = next ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      /* storage may be unavailable — the toggle still works for this session */
    }
    setIsDark(next)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next ? '#0a0a0a' : '#ffffff')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid size-8 shrink-0 place-items-center rounded-md text-title transition-colors hover:bg-muted"
    >
      {isDark ? (
        <Sun className="size-[18px]" aria-hidden="true" strokeWidth={1.7} />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" strokeWidth={1.7} />
      )}
    </button>
  )
}
