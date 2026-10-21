import { skills } from '../data/skills'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { TechPill } from './TechIcon'

export default function SkillsSection() {
  return (
    <section className="section" aria-labelledby="skills-heading">
      <Reveal>
        <SectionHeading eyebrow="My Complete" title="Skills & Techstack" id="skills-heading" />
      </Reveal>

      <Reveal className="mt-8" delay={0.05}>
        <div
          className="flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Technology stack"
        >
          {skills.map((skill) => (
            <TechPill key={skill} name={skill} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
