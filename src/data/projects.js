/**
 * Projects shown in the featured grid and on the case-study pages.
 *
 * status: '' renders as an explicit "Status not set" placeholder.
 * cardDescription: optional short grid summary; falls back to description.
 * demoUrl / repoUrl: empty values render as disabled icons rather than fake
 * links. Feature states are honest: planned means not implemented yet.
 */

export const projects = [
  {
    slug: 'pulseops',
    title: 'PulseOps',
    kind: 'DevOps Monitoring Dashboard',
    preview: 'pulseops',
    status: 'In development',
    statusTone: 'amber',
    description:
      'A DevOps monitoring dashboard for bringing service health, deployments and incident signals into one operational view. Structured around a React interface, a Django REST API and a PostgreSQL data model.',
    cardDescription:
      'A DevOps monitoring dashboard for service health, deployments and incidents.',
    stack: ['react', 'django', 'postgresql', 'playwright'],
    demoUrl: '',
    repoUrl: '',

    tagline: 'One operational view for services, deployments and incidents.',
    summary:
      'PulseOps is a personal full-stack project exploring how a small team could monitor service health without stitching together several disconnected dashboards.',
    problem:
      'Small teams often read service health from one tool, deployment history from another and incident notes from a chat thread. The result is slow context switching and a weak audit trail when something goes wrong. PulseOps is an attempt to put those signals in one calm interface.',
    approach:
      'The application is split into a React front end, a Django REST API and a PostgreSQL database. The interface is designed around the questions an operator asks first: what is running, what changed, and what needs attention. Monitoring integrations are deliberately out of scope until the data model and UI are stable.',
    statusNote:
      'This project is in development. Features marked “Planned” are not implemented yet, and no live deployment is being presented as complete.',
    category: 'Personal project',
    focus: 'Service health',
    role: 'Sole developer',
    architecture: [
      {
        label: 'Interface',
        detail: 'React components present service health, deployment history and incident context.',
      },
      {
        label: 'API',
        detail: 'Django REST endpoints validate requests and expose read/write operations.',
      },
      {
        label: 'Data',
        detail: 'PostgreSQL stores services, deployments and incident records with explicit relationships.',
      },
      {
        label: 'Checks',
        detail: 'Playwright covers the critical flows once the corresponding screens exist.',
      },
    ],
    features: [
      {
        title: 'Service health overview',
        description:
          'A single view for service status, recent changes and open incidents. The layout and data contract are the current focus.',
        state: 'in-progress',
      },
      {
        title: 'Deployment timeline',
        description: 'A chronological record of deployments with environment and version metadata.',
        state: 'planned',
      },
      {
        title: 'Incident notes',
        description: 'Notes and status transitions attached to a specific incident rather than a chat thread.',
        state: 'planned',
      },
      {
        title: 'Authentication and roles',
        description: 'Restricted access for operators and read-only viewers.',
        state: 'planned',
      },
    ],
    decisions: [
      {
        title: 'Model the domain before the integrations',
        detail:
          'A monitoring tool is only useful if its data model is coherent. The first pass focuses on services, deployments and incidents instead of connector count.',
      },
      {
        title: 'Keep the interface quiet',
        detail:
          'A dashboard should surface exceptions, not decorate normal operation. Status colour and hierarchy are reserved for things that need attention.',
      },
      {
        title: 'Test the flows, not the implementation',
        detail:
          'Playwright scenarios are written around operator tasks so the tests remain useful when components change.',
      },
    ],
    contribution:
      'I am responsible for the project end to end: data modelling, Django endpoints, React interface, test scenarios and documentation as they are built. The project is still in development, so this is a record of the intended system rather than a shipped product.',
    nextSteps: [
      'Finish the service-health read model and its API contract.',
      'Connect the first monitoring data source and handle stale or missing data explicitly.',
      'Add deployment and incident flows with Playwright coverage.',
      'Write a short operational README before publishing the repository.',
    ],
  },
  {
    slug: 'office-management-system',
    title: 'Office Management System',
    kind: 'Internal operations platform',
    preview: 'office',
    status: 'In development',
    statusTone: 'amber',
    description:
      'An office management system for handling employees, attendance, tasks and internal records in a single workflow. The project is structured around a responsive React front end, Django REST endpoints and relational data.',
    cardDescription:
      'An office management system for employees, attendance, tasks and records.',
    stack: ['react', 'django', 'rest', 'postgresql'],
    demoUrl: '',
    repoUrl: '',

    tagline: 'A single place for the everyday records an office actually uses.',
    summary:
      'A personal full-stack project modelling common office workflows — people, attendance, tasks and internal records — with an emphasis on clear relationships and sensible constraints.',
    problem:
      'Small offices often manage people and operations across spreadsheets, messaging apps and memory. That makes attendance and task ownership hard to audit, and duplicates the same employee data in several places. The project explores a more coherent internal tool.',
    approach:
      'The data model starts with people, teams and time. Attendance and tasks reference those records instead of copying them. A React interface exposes the common operations, while Django REST endpoints enforce validation and permissions.',
    statusNote:
      'This project is in development. Some screens are concepts; nothing here should be read as a completed or deployed product.',
    category: 'Personal project',
    focus: 'Internal operations',
    role: 'Sole developer',
    architecture: [
      {
        label: 'Records',
        detail: 'Employees, teams and departments form the shared backbone for every workflow.',
      },
      {
        label: 'Attendance',
        detail: 'Daily presence and leave records reference the employee model rather than duplicating it.',
      },
      {
        label: 'Tasks',
        detail: 'Assignments carry an owner, a status and a due date with explicit transitions.',
      },
      {
        label: 'Reports',
        detail: 'Read-only summaries are derived from the operational tables.',
      },
    ],
    features: [
      {
        title: 'Employee directory',
        description: 'A searchable record of people, teams and roles with constrained fields.',
        state: 'in-progress',
      },
      {
        title: 'Attendance tracking',
        description: 'Daily presence and leave entries tied to an employee record.',
        state: 'planned',
      },
      {
        title: 'Task assignment',
        description: 'Tasks with an owner, status and due date, plus a simple activity history.',
        state: 'planned',
      },
      {
        title: 'Operational reports',
        description: 'Read-only summaries for attendance and open work.',
        state: 'planned',
      },
    ],
    decisions: [
      {
        title: 'Normalise before adding screens',
        detail:
          'The employee record is the source of truth. Attendance and tasks reference it instead of storing names or team labels twice.',
      },
      {
        title: 'Make state transitions explicit',
        detail:
          'A task status is not a free-text field. The allowed transitions live in the API so the UI cannot invent a state.',
      },
      {
        title: 'Design for a small team',
        detail:
          'The first version favours a compact, understandable workflow over configurable enterprise process modelling.',
      },
    ],
    contribution:
      'I am responsible for the schema design, API endpoints, React screens and the testing plan. The project is a learning vehicle for building a maintainable internal tool, not a claim of production use.',
    nextSteps: [
      'Finish the employee directory and its validation rules.',
      'Add attendance entries with a clear correction flow.',
      'Implement task transitions and an audit-friendly history.',
      'Decide which reports are genuinely useful before building them.',
    ],
  },
  {
    slug: 'cyberarena',
    title: 'CyberArena',
    kind: 'Cybersecurity Training Lab',
    preview: 'cyberarena',
    status: 'Planned',
    statusTone: 'muted',
    description:
      'A cybersecurity training lab for practising defensive scenarios in a controlled environment. The project focuses on structured exercises, progress tracking and a backend that keeps scenario data consistent.',
    cardDescription:
      'A cybersecurity training lab for practising defensive scenarios in a controlled environment.',
    stack: ['python', 'django', 'postgresql', 'playwright'],
    demoUrl: '',
    repoUrl: '',

    tagline: 'Structured defensive-security practice, without the guesswork.',
    summary:
      'A planned training lab for practising defensive security scenarios in a controlled environment, with clear objectives and honest progress tracking.',
    problem:
      'Security practice is often a pile of disconnected tutorials. Learners need a structured scenario, a defined scope and a way to see what they have actually completed. The lab is intended to provide that structure without pretending to be a production security platform.',
    approach:
      'The planned system models scenarios, objectives and attempts in a relational database. A Django API serves scenario content and progress; a React interface presents the lab. Isolation and offensive tooling are explicitly out of scope for the first version.',
    statusNote:
      'CyberArena is planned. No scenario engine, deployment or live environment exists yet. The case study describes the intended design.',
    category: 'Personal project',
    focus: 'Defensive training',
    role: 'Sole developer',
    architecture: [
      {
        label: 'Scenarios',
        detail: 'A scenario owns ordered objectives, hints and expected evidence.',
      },
      {
        label: 'Attempts',
        detail: 'Each attempt belongs to a learner and a scenario, with timestamps and outcomes.',
      },
      {
        label: 'API',
        detail: 'Django endpoints serve scenario content and record progress with validation.',
      },
      {
        label: 'Interface',
        detail: 'A React lab view presents the current objective, evidence and next step.',
      },
    ],
    features: [
      {
        title: 'Scenario catalogue',
        description: 'A structured list of exercises with difficulty and scope metadata.',
        state: 'planned',
      },
      {
        title: 'Ordered objectives',
        description: 'Each scenario contains objectives that must be completed in a defined order.',
        state: 'planned',
      },
      {
        title: 'Progress tracking',
        description: 'Attempts and completed objectives recorded against a learner.',
        state: 'planned',
      },
      {
        title: 'Evidence notes',
        description: 'A place to record findings and the reasoning behind a response.',
        state: 'planned',
      },
    ],
    decisions: [
      {
        title: 'Defensive by default',
        detail:
          'The first version focuses on investigation and response rather than offensive tooling or live targets.',
      },
      {
        title: 'Keep progress auditable',
        detail:
          'An objective is complete because an attempt recorded the required evidence, not because a checkbox was clicked.',
      },
      {
        title: 'Start with a small scenario set',
        detail:
          'A few well-written scenarios are more useful than a large catalogue with inconsistent quality.',
      },
    ],
    contribution:
      'CyberArena is a planned personal project. I have defined the problem and the intended data model; implementation has not started, and the case study is clearly marked as a design rather than a shipped lab.',
    nextSteps: [
      'Write two complete scenarios and validate the objective model against them.',
      'Build the scenario and attempt schema.',
      'Implement the read-only lab view before adding progress writes.',
      'Decide how evidence should be stored without collecting sensitive data.',
    ],
  },
]

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}
