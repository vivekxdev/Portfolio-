/**
 * ============================================================================
 *  SITE CONTENT — edit this file to personalise the portfolio.
 * ============================================================================
 *
 *  PLACEHOLDERS — replace before publishing:
 *    • email
 *    • githubUrl / linkedinUrl
 *    • resumeUrl (the PDF in public/ is a placeholder resume)
 *    • avatar (the monogram in Hero.jsx is a neutral photo placeholder)
 *
 *  Empty strings are treated as "not added yet" by the UI: the action is
 *  rendered in a disabled state instead of linking somewhere fake.
 */

export const site = {
  name: 'Vivek Kumar',
  role: 'Full-Stack Developer',
  wordmark: 'Vivek Kumar',

  // TODO: replace these with your real details.
  email: 'vivek@example.com',
  githubUrl: 'https://github.com/vivek-kumar',
  linkedinUrl: 'https://www.linkedin.com/in/vivek-kumar',
  resumeUrl: '/Vivek-Kumar-Resume.pdf',
  resumeFileName: 'Vivek-Kumar-Resume.pdf',

  location: '', // e.g. "India" — leave empty to hide.

  meta: {
    title: 'Vivek Kumar — Full-Stack Developer',
    description:
      'Vivek Kumar is a full-stack developer building reliable web applications with React, Python, Django, PostgreSQL, REST APIs and Playwright.',
  },
}

export const hero = {
  role: 'Full-Stack Developer',
  availability: 'Open to opportunities',
  intro: [
    { text: 'Full-Stack Developer', strong: true },
    { text: ' building practical web applications end to end. I work with ' },
    { tech: 'react' },
    { text: ' and ' },
    { tech: 'javascript' },
    { text: ' on the front end, ' },
    { tech: 'python' },
    { text: ' and ' },
    { tech: 'django' },
    { text: ' on the server, ' },
    { tech: 'rest' },
    { text: ' between the two, ' },
    { tech: 'postgresql' },
    { text: ' for data, and ' },
    { tech: 'playwright' },
    { text: ' to test the flows that matter.' },
  ],
  resumeLabel: 'Resume / CV',
  contactLabel: 'Get in touch',
  focus: [
    { label: 'Building', value: 'PulseOps' },
    { label: 'Learning', value: 'Secure APIs' },
    { label: 'Testing', value: 'Playwright' },
    { label: 'Open to', value: 'Full-stack roles' },
  ],
  statusLine: 'Currently building PulseOps',
  statusMeta: 'Open to full-stack opportunities · Updated October 2026',
}

export const social = {
  github: { label: 'GitHub', url: site.githubUrl },
  linkedin: { label: 'LinkedIn', url: site.linkedinUrl },
  email: { label: 'Email', url: site.email ? `mailto:${site.email}` : '' },
  resume: { label: 'Resume', url: site.resumeUrl },
}

export const navLinks = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'writing', label: 'Writing', href: '#writing' },
]

export const footer = {
  copyright: `© ${new Date().getFullYear()} Vivek Kumar. All rights reserved.`,
  credit: 'Designed & built by',
  creditName: 'Vivek Kumar',
}
