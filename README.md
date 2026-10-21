# Vivek Kumar — Portfolio

A compact, light-first editorial portfolio rebuilt as a close adaptation of
[taqui.in](https://taqui.in/). It uses React, Vite, Tailwind CSS, Framer Motion,
Lucide icons and React Router.

The design deliberately keeps the reference's proportions: a 768px header rail,
a 704px page column, a 56px sticky header, a 144px profile mark and a restrained
type system. Dark mode is an intentional adaptation (the reference's dark mode
could not be verified).

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 with CSS custom properties for light/dark tokens
- Framer Motion for subtle, reduced-motion-aware reveals
- Lucide React + self-hosted Hanken Grotesk and Instrument Serif
- React Router 7 for the SPA routes

## Run locally

Requirements: Node.js 20.19+ or 22.12+ (Vite 8).

```powershell
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

```powershell
npm run lint       # oxlint
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: profile, projects, experience, writing, skills, quote |
| `/projects/:slug` | Case study for `pulseops`, `office-management-system`, `cyberarena` |
| `/contact` | Contact form with validation and a mailto draft fallback |
| `*` | Friendly 404 page |

`vercel.json` contains the SPA rewrite needed for direct visits to client-side
routes on Vercel.

## Editing content

All content lives in `src/data/`:

- `site.js` — name, role, email, GitHub, LinkedIn, resume URL, hero intro,
  current focus, nav and footer.
- `projects.js` — project cards and full case studies. Empty `demoUrl` /
  `repoUrl` values render as disabled actions. Feature states are `in-progress`
  or `planned`; use `done` (shown as “Implemented”) only when a feature actually
  works.
- `experience.js` — experience/learning rows. Add real employers, titles,
  dates and locations when you have them.
- `writing.js` — draft topics. Add `url` and `date` only after publishing.
  Entries without a URL render as drafts, not links.
- `skills.js` — ordered skill keys.
- `tech.js` — technology labels and icon mappings. Add a new SVG to
  `public/tech/` and a matching key here.

### Replace before publishing

The following values are documented placeholders, not real details:

- **Email:** `vivek@example.com` in `src/data/site.js`.
- **GitHub / LinkedIn:** placeholder profile URLs in `src/data/site.js`.
- **Profile image:** the hero uses a neutral `VK` monogram in `Hero.jsx`.
- **Resume:** `public/Vivek-Kumar-Resume.pdf` is a generated placeholder. Replace
  it with a real PDF (same filename, or update `site.resumeUrl` and
  `site.resumeFileName`).
- **Experience:** entries describe self-directed project work. No employer,
  job title, date or professional achievement has been invented.
- **Projects:** PulseOps and Office Management System are marked “In
  development”; CyberArena is marked “Planned”. Case-study feature states are
  `in-progress` or `planned`, never falsely “Implemented”.
- **Project visuals:** the previews are interface concepts with illustrative
  data, labelled “Concept preview” rather than presented as product screenshots.

After deploying, replace the relative OG image paths in `index.html` with
absolute URLs using your production domain so social previews resolve reliably.

## Contact form

By default there is **no backend**. Submitting a valid form opens the visitor's
email app with a pre-filled draft (`mailto:`); the UI says that nothing has been
sent yet. The direct email can also be copied.

To connect a real endpoint, set:

```powershell
$env:VITE_CONTACT_ENDPOINT = "https://your-api.example.com/contact"
npm run dev
```

The form POSTs JSON:

```json
{ "name": "…", "email": "…", "message": "…" }
```

The endpoint should validate input, rate-limit submissions and return a 2xx
response. Vite variables are public, so never put an API secret in
`VITE_CONTACT_ENDPOINT`. If a request fails, the form offers the same mailto
fallback rather than claiming the message was sent.

## Theme and accessibility

- Light is the default. An inline script applies a stored `localStorage.theme`
  before first paint to avoid a flash.
- The header toggle persists the choice and updates `color-scheme` and
  `theme-color`.
- `prefers-reduced-motion` disables reveal transforms and smooth scrolling;
  smooth scrolling is also skipped when the user requests reduced motion.
- Sections have skip-link support, visible focus rings, keyboard-operable
  accordions, labelled form fields and `aria-live` contact feedback.

## Visual and interaction checks

The QA scripts use Playwright's Chromium. Install it once:

```powershell
npx playwright install chromium
```

With the dev server running:

```powershell
node scripts/screenshots.mjs
```

Writes desktop, laptop, tablet, mobile, small-mobile, dark, case-study, contact
and 404 screenshots to `.tmp/` (ignored by git) and reports console errors,
overflow and key layout measurements.

```powershell
npm run test:ui
```

Runs the interaction and accessibility checks: active navigation, theme
persistence, routing, contact validation and mailto fallback, static assets,
horizontal overflow at 320–1440px, reduced motion and console errors. The
expectations intentionally mirror the current sample content, so update
`scripts/qa.mjs` when names or routes change.

For the built site, use two terminals:

```powershell
npm run build
npm run preview
```

```powershell
npm run test:prod
```

This checks the production preview, direct SPA routes, static assets and the
console. `scripts/prod-check.mjs` also accepts an explicit base URL.

```powershell
node scripts/generate-assets.mjs
```

Regenerates `public/og-image.png`, `public/apple-touch-icon.png` and the
placeholder `public/Vivek-Kumar-Resume.pdf` using the identity and copy embedded
in the script. Update that copy if your content changes. It also needs the dev
server for the self-hosted fonts.

## Deploy to Vercel

1. Push the project to a GitHub repository (or use the Vercel CLI).
2. In Vercel, create a project and use:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
3. Add `VITE_CONTACT_ENDPOINT` under **Settings → Environment Variables** if you
   have a contact API. Redeploy after changing it.
4. Deploy. `vercel.json` handles direct visits to `/contact` and case studies.

CLI route:

```powershell
npm install -g vercel
vercel
vercel --prod
```

### Custom domain (Windows PowerShell)

Use the exact DNS values Vercel shows in **Project → Settings → Domains**; they
can change, so do not copy a stale IP from a blog post.

```powershell
# Add the domain in the Vercel dashboard first, then check propagation:
Resolve-DnsName your-domain.com -Type A
Resolve-DnsName www.your-domain.com -Type CNAME

# Flush the local Windows DNS cache after changing records:
ipconfig /flushdns
```

For an apex domain, create the `A` record Vercel displays (commonly
`76.76.21.21`). For `www`, create the `CNAME` Vercel displays (commonly
`cname.vercel-dns.com`). Wait for DNS propagation, then confirm Vercel shows the
domain as valid and HTTPS as issued.

## Notes on honesty

This portfolio is a work in progress. It intentionally avoids invented
employers, dates, metrics, screenshots, deployments, article links or personal
details. Missing information is rendered as a disabled action, an explicit
“not published” state or a documented placeholder. Replace the placeholders
above before sharing the site as a finished portfolio.
