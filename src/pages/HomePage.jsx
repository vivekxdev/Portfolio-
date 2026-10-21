import ExperienceSection from '../components/ExperienceSection'
import Hero from '../components/Hero'
import ProjectSection from '../components/ProjectSection'
import QuoteBlock from '../components/QuoteBlock'
import SkillsSection from '../components/SkillsSection'
import WritingSection from '../components/WritingSection'
import { site } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'

export default function HomePage() {
  usePageMeta(site.meta.title, site.meta.description)

  return (
    <>
      <Hero />
      <ProjectSection />
      <ExperienceSection />
      <WritingSection />
      <SkillsSection />
      <QuoteBlock />
    </>
  )
}
