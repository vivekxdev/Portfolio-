/**
 * Generates the static share assets and the placeholder resume PDF.
 * Usage: node scripts/generate-assets.mjs [baseUrl]
 */
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const base = process.argv[2] ?? 'http://127.0.0.1:5173'
const currentYear = new Date().getFullYear()
const generatedOn = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())
const browser = await chromium.launch()
await mkdir('public', { recursive: true })

const fonts = `
  @font-face {
    font-family: 'Hanken Grotesk';
    font-style: normal;
    font-weight: 300 900;
    src: url('/fonts/hanken-grotesk-latin.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Instrument Serif';
    font-style: italic;
    font-weight: 400;
    src: url('/fonts/instrument-serif-italic-latin.woff2') format('woff2');
  }
`

const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto(base, { waitUntil: 'domcontentloaded' })

await page.setContent(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  ${fonts}
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 1200px; height: 630px; }
  body {
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 58px 72px 44px;
    background:
      radial-gradient(circle at 88% 18%, rgba(120, 132, 180, 0.13), transparent 34%),
      #fbfbfa;
    color: #333333;
    font-family: 'Hanken Grotesk', system-ui, sans-serif;
    overflow: hidden;
  }
  .top { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 13px; font-size: 15px; letter-spacing: 0.14em; text-transform: uppercase; color: #70707d; }
  .mark { display: grid; place-items: center; width: 42px; height: 42px; border: 1px dashed rgba(0,0,0,.28); border-radius: 50%; font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 17px; color: #333; }
  .top-note { font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: #8a8a92; }
  .main { display: flex; align-items: center; justify-content: space-between; gap: 70px; }
  .copy { max-width: 780px; }
  .eyebrow { font-size: 13px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #70707d; }
  h1 { margin: 12px 0 0; font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; font-size: 108px; line-height: .94; letter-spacing: .01em; color: #2f2f2f; }
  .role { margin: 18px 0 0; font-size: 23px; font-weight: 500; color: #4d4d55; }
  .intro { margin: 16px 0 0; max-width: 670px; font-size: 18px; line-height: 1.65; color: #62626b; }
  .chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 24px; }
  .chip { border: 1px solid #dededb; border-radius: 6px; background: #f4f4f2; padding: 5px 9px; font-size: 12px; font-weight: 500; color: #4d4d55; }
  .portrait { position: relative; flex: 0 0 auto; width: 240px; height: 240px; border: 1px dashed rgba(0,0,0,.26); border-radius: 50%; padding: 5px; }
  .portrait-inner { display: grid; place-items: center; width: 228px; height: 228px; border-radius: 50%; background: #e9edf3; color: #4f5561; font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 78px; letter-spacing: .02em; }
  .bottom { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e2df; padding-top: 18px; font-size: 12px; letter-spacing: .04em; color: #77777f; }
</style>
</head>
<body>
  <div class="top">
    <div class="brand"><span class="mark">VK</span><span>Portfolio</span></div>
    <div class="top-note">Portfolio · ${currentYear}</div>
  </div>
  <div class="main">
    <div class="copy">
      <div class="eyebrow">Full-stack developer</div>
      <h1>Vivek Kumar</h1>
      <p class="role">React · Python · Django · PostgreSQL</p>
      <p class="intro">Building practical, reliable web applications end to end with React on the front end, Django and PostgreSQL on the server, and Playwright for the flows that matter.</p>
      <div class="chips">
        <span class="chip">React</span><span class="chip">JavaScript</span><span class="chip">Python</span>
        <span class="chip">Django</span><span class="chip">PostgreSQL</span><span class="chip">REST APIs</span>
        <span class="chip">Playwright</span>
      </div>
    </div>
    <div class="portrait"><div class="portrait-inner">VK</div></div>
  </div>
  <div class="bottom">
    <span>React · Python · Django · PostgreSQL · Playwright</span>
    <span>Portfolio</span>
  </div>
</body>
</html>`)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: 'public/og-image.png', fullPage: false })

await page.setViewportSize({ width: 180, height: 180 })
await page.setContent(`<!doctype html>
<html><head><style>
  ${fonts}
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 180px; height: 180px; }
  body { display: grid; place-items: center; background: #fbfbfa; }
  .tile { display: grid; place-items: center; width: 180px; height: 180px; background: #fbfbfa; }
  .mark { display: grid; place-items: center; width: 128px; height: 128px; border: 2px dashed rgba(0,0,0,.26); border-radius: 50%; font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 58px; color: #333; }
</style></head><body><div class="tile"><div class="mark">VK</div></div></body></html>`)
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: 'public/apple-touch-icon.png', fullPage: false })

await browser.close()

// ---------------------------------------------------------------------------
// Placeholder resume PDF
// ---------------------------------------------------------------------------

const pdfBrowser = await chromium.launch()
const pdfPage = await pdfBrowser.newPage()
await pdfPage.goto(base, { waitUntil: 'domcontentloaded' })
await pdfPage.setContent(`<!doctype html>
<html><head><meta charset="utf-8" /><style>
  ${fonts}
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body { padding: 46px 52px 34px; color: #2f2f2f; font-family: 'Hanken Grotesk', system-ui, sans-serif; font-size: 10.5px; line-height: 1.5; }
  h1 { margin: 0; font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; font-size: 40px; letter-spacing: .01em; line-height: 1; }
  .role { margin-top: 7px; font-size: 13px; font-weight: 600; color: #52525c; }
  .contact { margin-top: 9px; color: #6b6b73; font-size: 9.5px; }
  .contact span + span::before { content: '  ·  '; }
  .rule { height: 1px; background: #e3e3e0; margin: 17px 0 15px; }
  h2 { margin: 18px 0 7px; font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; font-size: 21px; letter-spacing: .02em; color: #333; }
  p { margin: 0; }
  .muted { color: #5e5e66; }
  .row { display: flex; justify-content: space-between; gap: 18px; }
  .item { break-inside: avoid; margin-bottom: 11px; }
  .item-title { font-size: 11px; font-weight: 600; color: #333; }
  .item-sub { font-size: 9.5px; color: #6b6b73; margin-top: 1px; }
  .item-body { margin-top: 5px; color: #52525c; }
  .status { font-size: 8.5px; color: #8a6a1f; white-space: nowrap; }
  .tag { display: inline-block; border: 1px solid #e0e0dd; border-radius: 4px; padding: 1px 5px; margin: 0 4px 4px 0; font-size: 8.5px; color: #55555d; background: #f7f7f5; }
  ul { margin: 4px 0 0; padding-left: 14px; color: #52525c; }
  li { margin-bottom: 2px; }
  .note { margin-top: 18px; border-top: 1px solid #e3e3e0; padding-top: 8px; color: #8a8a90; font-size: 8px; line-height: 1.45; }
  @page { size: A4; margin: 0; }
</style></head><body>
  <h1>Vivek Kumar</h1>
  <div class="role">Full-Stack Developer</div>
  <div class="contact">
    <span>vivek@example.com</span><span>github.com/vivek-kumar</span><span>linkedin.com/in/vivek-kumar</span>
  </div>
  <div class="rule"></div>

  <p class="muted">Full-stack developer focused on practical web applications: React interfaces, Django REST APIs, PostgreSQL data models and Playwright checks for critical user flows. Comfortable working across the stack and documenting decisions as the system evolves.</p>

  <h2>Skills</h2>
  <p>
    <span class="tag">HTML5</span><span class="tag">CSS3</span><span class="tag">JavaScript</span><span class="tag">React</span><span class="tag">Python</span><span class="tag">Django</span><span class="tag">REST APIs</span><span class="tag">PostgreSQL</span><span class="tag">SQL</span><span class="tag">Playwright</span><span class="tag">Manual testing</span><span class="tag">API testing</span><span class="tag">Git</span><span class="tag">GitHub</span><span class="tag">Postman</span>
  </p>

  <h2>Selected projects</h2>
  <div class="item">
    <div class="row"><span class="item-title">PulseOps — DevOps Monitoring Dashboard</span><span class="status">In development</span></div>
    <div class="item-sub">React · Django · PostgreSQL · Playwright</div>
    <p class="item-body">A dashboard concept for service health, deployments and incident context. Working on the domain model and read API; monitoring integrations are not implemented yet.</p>
  </div>
  <div class="item">
    <div class="row"><span class="item-title">Office Management System</span><span class="status">In development</span></div>
    <div class="item-sub">React · Django REST Framework · PostgreSQL</div>
    <p class="item-body">An internal-operations project modelling employees, attendance, tasks and records with explicit relationships and constrained state transitions.</p>
  </div>
  <div class="item">
    <div class="row"><span class="item-title">CyberArena — Cybersecurity Training Lab</span><span class="status">Planned</span></div>
    <div class="item-sub">Python · Django · PostgreSQL · Playwright</div>
    <p class="item-body">A planned defensive-security practice environment. The data model and scenario structure are defined; implementation has not started.</p>
  </div>

  <h2>Experience & learning</h2>
  <div class="item">
    <div class="row"><span class="item-title">Independent Projects — Full-Stack Developer</span><span class="item-sub">Self-directed · Ongoing</span></div>
    <ul>
      <li>Build responsive React interfaces and Django REST endpoints backed by PostgreSQL.</li>
      <li>Test core flows with Playwright and validate API behaviour in Postman.</li>
      <li>Use Git and GitHub for version control and project documentation.</li>
    </ul>
  </div>
  <div class="item">
    <div class="row"><span class="item-title">Testing Practice — QA & API Testing</span><span class="item-sub">Self-directed · Ongoing</span></div>
    <ul>
      <li>Write end-to-end scenarios for critical flows and check failure paths.</li>
      <li>Run exploratory desktop and mobile passes across in-progress applications.</li>
    </ul>
  </div>

  <div class="note">Placeholder resume generated from the portfolio content on ${generatedOn}. Contact details and profile URLs are placeholders, and professional employment history has not been supplied. Replace this document with a real resume before publishing.</div>
</body></html>`)
await pdfPage.evaluate(() => document.fonts.ready)
await pdfPage.pdf({
  path: 'public/Vivek-Kumar-Resume.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
})
await pdfBrowser.close()

console.log('Generated public/og-image.png, public/apple-touch-icon.png and public/Vivek-Kumar-Resume.pdf')
