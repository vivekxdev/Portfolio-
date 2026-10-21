import { FileText, Mail } from 'lucide-react'

import { footer, site, social } from '../data/site'
import { Github, Linkedin } from './BrandIcons'

function FooterLink({ url, label, title, download, children }) {
  if (!url) {
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={`${label} — link not added yet`}
        title={`${label} link not added yet — edit src/data/site.js`}
        className="footer-link"
      >
        {children}
        <span className="sr-only">{label}</span>
      </span>
    )
  }

  const isMail = url.startsWith('mailto:')
  return (
    <a
      href={url}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noopener noreferrer'}
      download={download}
      title={title ?? label}
      aria-label={isMail ? 'Email' : (title ?? `${label} (opens in a new tab)`)}
      className="footer-link"
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="shell py-10 md:px-8" aria-label="Contact and footer">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <span className="text-xs tracking-wide text-subtle">{footer.copyright}</span>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <FooterLink url={social.github.url} label="GitHub">
            <Github className="size-3.5" />
          </FooterLink>
          <FooterLink url={social.linkedin.url} label="LinkedIn">
            <Linkedin className="size-3.5" />
          </FooterLink>
          <FooterLink url={social.email.url} label="Email">
            <Mail aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
          </FooterLink>
          <FooterLink
            url={site.resumeUrl}
            label="Resume"
            title={`Download ${site.resumeFileName} (PDF)`}
            download={site.resumeFileName}
          >
            <FileText aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
          </FooterLink>
        </div>

        <span className="text-xs tracking-wide text-subtle">
          {footer.credit} <span className="font-semibold text-title">{footer.creditName}</span>
        </span>
      </div>
    </footer>
  )
}
