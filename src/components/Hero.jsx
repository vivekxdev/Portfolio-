import { FileText, Send } from 'lucide-react'
import { Link } from 'react-router-dom'

import { hero, site } from '../data/site'
import ActivityStrip from './ActivityStrip'
import Reveal from './Reveal'
import SocialLinks from './SocialLinks'
import { TechInline } from './TechIcon'

function Intro() {
  return (
    <p className="mt-8 text-base leading-[40px] text-[color:var(--intro)] sm:text-[18px]">
      {hero.intro.map((segment, index) => {
        if (segment.strong) {
          return (
            <strong key={index} className="font-semibold text-title">
              {segment.text}
            </strong>
          )
        }

        if (segment.tech) {
          return <TechInline key={index} name={segment.tech} className="mx-0.5" />
        }

        return <span key={index}>{segment.text}</span>
      })}
    </p>
  )
}

function ResumeAction() {
  if (!site.resumeUrl) {
    return (
      <button
        type="button"
        disabled
        title="Add your resume URL in src/data/site.js"
        aria-label="Resume / CV — link not added yet"
        className="action-button action-button--secondary"
      >
        <FileText aria-hidden="true" className="size-4" strokeWidth={1.7} />
        {hero.resumeLabel}
      </button>
    )
  }

  return (
    <a
      href={site.resumeUrl}
      download={site.resumeFileName}
      className="action-button action-button--secondary"
    >
      <FileText aria-hidden="true" className="size-4" strokeWidth={1.7} />
      {hero.resumeLabel}
    </a>
  )
}

export default function Hero() {
  return (
    <Reveal as="section" className="mb-8" aria-labelledby="intro-name">
      <div
        className="avatar-ring"
        role="img"
        aria-label="Profile photo placeholder for Vivek Kumar"
        title="Profile photo placeholder — replace with your own photo"
      >
        <div className="avatar-inner" aria-hidden="true">
          VK
        </div>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <h1
          id="intro-name"
          className="font-serif text-[1.875rem] leading-9 font-medium tracking-[0.025em] text-title italic sm:text-4xl sm:leading-10"
        >
          {site.name}
        </h1>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-[11px] leading-4 text-subtle">
          <span className="size-1.5 rounded-full bg-[color:var(--success)]" aria-hidden="true" />
          {hero.availability}
        </span>
      </div>

      <Intro />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <ResumeAction />
        <Link to="/contact" className="action-button action-button--primary">
          <Send aria-hidden="true" className="size-4" strokeWidth={1.7} />
          {hero.contactLabel}
        </Link>
      </div>

      <SocialLinks />
      <ActivityStrip />
    </Reveal>
  )
}
