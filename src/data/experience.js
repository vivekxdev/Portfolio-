import { site } from './site'

/**
 * Experience & learning timeline.
 *
 * No employers, job titles or dates are invented. These entries describe
 * project-based work and self-directed learning. Replace them with real roles
 * when you have professional experience — the UI renders any entries here.
 *
 * Shape:
 *   organisation  main line (employer or practice)
 *   title         role / focus
 *   type          "Full Time", "Internship", "Self-directed", …
 *   period        dates, or "Ongoing"
 *   location      optional; leave empty to hide
 *   logo          short initials for the placeholder mark
 */

export const experience = [
  {
    id: 'independent-projects',
    organisation: 'Independent Projects',
    logo: 'IP',
    title: 'Full-Stack Developer',
    type: 'Self-directed',
    period: 'Ongoing',
    location: '',
    summary:
      'Designing and building complete web applications to practise the full delivery cycle — data modelling, API design, interface implementation, testing and documentation.',
    responsibilities: [
      'Build responsive React interfaces with reusable components and accessible forms.',
      'Develop Django REST endpoints backed by PostgreSQL schemas and migrations.',
      'Write Playwright checks and perform manual and API testing on core user flows.',
      'Use Git and GitHub for version control and iterative project work.',
    ],
    stack: ['react', 'django', 'postgresql', 'playwright', 'git'],
  },
  {
    id: 'testing-practice',
    organisation: 'Testing Practice',
    logo: 'TP',
    title: 'QA & API Testing',
    type: 'Self-directed',
    period: 'Ongoing',
    location: '',
    summary:
      'Treating testing as part of development rather than a final step: checking the happy path, the failure path, and the cases that are easy to miss.',
    responsibilities: [
      'Write end-to-end scenarios in Playwright for critical application flows.',
      'Validate API responses, status codes and validation errors in Postman.',
      'Run exploratory manual passes across desktop and mobile viewports.',
    ],
    stack: ['playwright', 'postman', 'manual', 'sql'],
  },
  {
    id: 'continuous-learning',
    organisation: 'Continuous Learning',
    logo: 'CL',
    title: 'Backend & Data Foundations',
    type: 'Courses & documentation',
    period: 'Ongoing',
    location: '',
    summary:
      'Strengthening the fundamentals behind the code: relational modelling, REST conventions, authentication patterns and maintainable application structure.',
    responsibilities: [
      'Studying REST API design, authentication and relational data modelling.',
      'Practising debugging and error handling across frontend and backend code.',
      'Reviewing documentation and source code to improve structure and naming.',
    ],
    stack: ['python', 'django', 'postgresql', 'javascript'],
  },
]

export const experienceCta = {
  label: 'Download resume',
  href: site.resumeUrl,
}
