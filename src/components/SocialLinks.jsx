import { Mail } from 'lucide-react'

import { social } from '../data/site'
import { Github, Linkedin } from './BrandIcons'

function MissingLink({ label, children }) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-label={`${label} — link not added yet`}
      title={`${label} link not added yet — edit src/data/site.js`}
      className="text-subtle opacity-40"
    >
      {children}
    </span>
  )
}

function SocialLink({ url, label, children }) {
  if (!url) return <MissingLink label={label}>{children}</MissingLink>

  const isMail = url.startsWith('mailto:')
  return (
    <a
      href={url}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noopener noreferrer'}
      aria-label={isMail ? 'Email' : `${label} (opens in a new tab)`}
      title={label}
      className="text-subtle transition-colors hover:text-title"
    >
      {children}
    </a>
  )
}

export default function SocialLinks() {
  return (
    <div className="mt-8 flex items-center gap-4" role="group" aria-label="Social links">
      <SocialLink url={social.github.url} label="GitHub">
        <Github className="size-5" />
      </SocialLink>
      <SocialLink url={social.linkedin.url} label="LinkedIn">
        <Linkedin className="size-5" />
      </SocialLink>
      <SocialLink url={social.email.url} label="Email">
        <Mail aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </SocialLink>
    </div>
  )
}
