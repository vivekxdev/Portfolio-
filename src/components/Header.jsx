import { useLocation, useNavigate } from 'react-router-dom'

import { navLinks, site } from '../data/site'
import { useActiveSection } from '../lib/hooks'
import { scrollToSection } from '../lib/scroll'
import { Github } from './BrandIcons'
import ThemeToggle from './ThemeToggle'

const ids = navLinks.map((link) => link.id)

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const active = useActiveSection(ids, 0.35, location.pathname)

  const onNav = (event, id) => {
    event.preventDefault()
    if (isHome) {
      scrollToSection(id)
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <header className="site-header shell">
      <div className="flex w-full items-center justify-between gap-3">
        <nav aria-label="Primary" className="flex items-center gap-4 text-base">
          {navLinks.map((link) => {
            const isActive = isHome && active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => onNav(event, link.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`text-title transition-colors hover:underline hover:decoration-2 hover:underline-offset-4 ${
                  isActive ? 'font-medium underline decoration-2 underline-offset-4' : ''
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          {site.githubUrl ? (
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              title="GitHub"
              className="grid size-8 place-items-center rounded-md text-title transition-colors hover:bg-muted"
            >
              <Github className="size-5" />
            </a>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              aria-label="GitHub profile — link not added yet"
              title="Add your GitHub URL in src/data/site.js"
              className="grid size-8 cursor-not-allowed place-items-center rounded-md text-title opacity-35"
            >
              <Github className="size-5" />
            </span>
          )}

          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
