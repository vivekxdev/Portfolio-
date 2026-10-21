import { Braces, ClipboardCheck, Database, MonitorSmartphone, Send } from 'lucide-react'

/**
 * Shared technology metadata. Keeping this outside the component file means
 * TechIcon.jsx can export only components (which keeps Fast Refresh happy).
 */
export const TECH = {
  html5: { label: 'HTML5', src: '/tech/html5.svg' },
  css: { label: 'CSS3', src: '/tech/css.svg' },
  javascript: { label: 'JavaScript', src: '/tech/javascript.svg' },
  react: { label: 'React', src: '/tech/react.svg' },
  python: { label: 'Python', src: '/tech/python.svg' },
  django: { label: 'Django', src: '/tech/django.svg', className: 'dark:brightness-[2.6]' },
  postgresql: { label: 'PostgreSQL', src: '/tech/postgresql.svg' },
  playwright: { label: 'Playwright', src: '/tech/playwright.svg' },
  git: { label: 'Git', src: '/tech/git.svg' },
  github: { label: 'GitHub', src: '/tech/github.svg', className: 'dark:invert' },
  postman: { label: 'Postman', src: '/tech/postman.svg' },
  rest: { label: 'REST APIs', Icon: Braces },
  responsive: { label: 'Responsive Design', Icon: MonitorSmartphone },
  sql: { label: 'SQL', Icon: Database },
  manual: { label: 'Manual Testing', Icon: ClipboardCheck },
  apitest: { label: 'API Testing', Icon: Send },
  vscode: { label: 'VS Code', src: '/tech/vscode.svg' },
}

export function techLabel(name) {
  return TECH[name]?.label ?? name
}
