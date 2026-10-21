/**
 * Interaction and accessibility checks. Not part of the production bundle.
 * Usage: node scripts/qa.mjs [baseUrl]
 * Requires the dev server and Playwright Chromium.
 */
import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://127.0.0.1:5173'
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
const page = await context.newPage()
const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (error) => errors.push(error.message))

const results = []
async function check(name, fn) {
  try {
    await fn()
    results.push(`PASS ${name}`)
  } catch (error) {
    results.push(`FAIL ${name}: ${error.message}`)
  }
}

await page.goto(base, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

await check('no active nav item at the top', async () => {
  assert.equal(await page.locator('header nav a[aria-current]').count(), 0)
})

await page.keyboard.press('Tab')
await page.waitForTimeout(50)
await check('skip link receives focus first', async () => {
  assert.equal((await page.locator(':focus').textContent()).trim(), 'Skip to content')
})

const themeButton = page.locator('header button[aria-pressed]')
await check('theme starts as light', async () => {
  assert.equal(await themeButton.getAttribute('aria-pressed'), 'false')
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), false)
})

await themeButton.click()
await page.waitForTimeout(150)
await check('theme toggle switches to dark and persists', async () => {
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), true)
  assert.equal(await page.evaluate(() => localStorage.getItem('theme')), 'dark')
  await page.reload({ waitUntil: 'networkidle' })
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), true)
  assert.equal(await page.locator('header button[aria-pressed]').getAttribute('aria-pressed'), 'true')
  await page.locator('header button[aria-pressed]').click()
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')), false)
})

await check('current focus panel summarizes the real work in progress', async () => {
  const panel = page.locator('[role="region"][aria-label="Current focus"]')
  assert.equal(await panel.count(), 1)
  const text = await panel.innerText()
  for (const label of ['Building', 'Learning', 'Testing', 'Open to']) {
    assert.match(text, new RegExp(label, 'i'))
  }
  assert.match(text, /PulseOps/)
  assert.match(text, /Playwright/)
  assert.match(await page.locator('main').innerText(), /Currently building PulseOps/)
})

await check('no fabricated GitHub contribution heatmap is rendered', async () => {
  assert.equal(await page.locator('.contribution-cell, #activity').count(), 0)
})

await page.locator('header nav a', { hasText: 'Projects' }).click()
await page.waitForTimeout(1400)
await check('header nav scrolls to the projects section', async () => {
  assert.equal(new URL(page.url()).hash, '#projects')
  const top = await page.locator('#projects').evaluate((el) => Math.round(el.getBoundingClientRect().top))
  assert.ok(top >= 60 && top <= 90, `projects top was ${top}`)
  const active = await page.locator('header nav a[aria-current="location"]').textContent()
  assert.equal(active.trim(), 'Projects')
})

await page.locator('.project-card h3 a').first().click()
await page.waitForURL('**/projects/pulseops')
await page.waitForFunction(() => document.querySelector('h1')?.textContent === 'PulseOps')
await check('project title opens the case study', async () => {
  assert.equal(new URL(page.url()).pathname, '/projects/pulseops')
  assert.equal(await page.locator('h1').textContent(), 'PulseOps')
  assert.equal(await page.title(), 'PulseOps case study — Vivek Kumar')
})

await page.locator('a[href="/projects/office-management-system"]').last().click()
await page.waitForURL('**/projects/office-management-system')
await page.waitForFunction(
  () => document.querySelector('h1')?.textContent === 'Office Management System',
)
await check('next project navigation works', async () => {
  assert.equal(await page.locator('h1').textContent(), 'Office Management System')
})

await page.getByRole('link', { name: 'All projects' }).first().click()
await page.waitForTimeout(1200)
await check('case-study back link returns to the project grid', async () => {
  assert.equal(new URL(page.url()).pathname, '/')
  assert.equal(new URL(page.url()).hash, '#projects')
  assert.ok((await page.evaluate(() => window.scrollY)) > 500)
})

await page.goto(`${base}/contact`, { waitUntil: 'networkidle' })
await check('contact page has page-specific metadata', async () => {
  assert.equal(await page.title(), 'Contact — Vivek Kumar')
  assert.equal(await page.locator('h1').textContent(), 'Get in touch')
})

await page.locator('header nav a', { hasText: 'Work' }).click()
await page.waitForTimeout(1400)
await check('section navigation works from a non-home route', async () => {
  assert.equal(new URL(page.url()).pathname, '/')
  assert.equal(new URL(page.url()).hash, '#work')
  const top = await page.locator('#work').evaluate((el) => Math.round(el.getBoundingClientRect().top))
  assert.ok(top >= 60 && top <= 90, `work top was ${top}`)
  assert.equal(await page.title(), 'Vivek Kumar — Full-Stack Developer')
  assert.equal(
    (await page.locator('header nav a[aria-current="location"]').textContent()).trim(),
    'Work',
  )
})

await page.goto(`${base}/contact`, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: 'Send message' }).click()
await check('contact validation blocks an empty form and focuses the first error', async () => {
  assert.equal(await page.locator('#contact-name-error').count(), 1)
  assert.equal(await page.locator('#contact-email-error').count(), 1)
  assert.equal(await page.locator('#contact-message-error').count(), 1)
  assert.equal(await page.evaluate(() => document.activeElement.id), 'contact-name')
})

await page.locator('#contact-name').fill('A Visitor')
await page.locator('#contact-email').fill('visitor@example.com')
await page.locator('#contact-message').fill('I would like to talk about a full-stack role on your team.')
await page.getByRole('button', { name: 'Send message' }).click()
await page.waitForTimeout(500)
await check('valid contact submission offers the mailto draft fallback', async () => {
  assert.equal(
    await page.locator('text=Your email app should have opened with a draft').count(),
    1,
  )
})

await page.goto(`${base}/projects/cyberarena`, { waitUntil: 'networkidle' })
await check('direct case-study URLs load', async () => {
  assert.equal(await page.locator('h1').textContent(), 'CyberArena')
  assert.equal(await page.locator('text=Planned').count() > 0, true)
})

await page.goto(`${base}/does-not-exist`, { waitUntil: 'networkidle' })
await check('unknown routes render the 404 page', async () => {
  assert.equal(await page.locator('h1').textContent(), 'This page does not exist.')
  assert.equal(await page.title(), 'Page not found — Vivek Kumar')
})

for (const [label, path] of [
  ['resume PDF', '/Vivek-Kumar-Resume.pdf'],
  ['OG image', '/og-image.png'],
  ['apple touch icon', '/apple-touch-icon.png'],
  ['favicon', '/favicon.svg'],
  ['robots.txt', '/robots.txt'],
]) {
  await check(`static asset exists: ${label}`, async () => {
    const response = await context.request.get(`${base}${path}`)
    assert.equal(response.status(), 200)
  })
}

for (const width of [1440, 768, 390, 320]) {
  const testPage = await context.newPage()
  await testPage.setViewportSize({ width, height: 900 })
  await testPage.goto(base, { waitUntil: 'networkidle' })
  await check(`no horizontal overflow at ${width}px`, async () => {
    const metrics = await testPage.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }))
    assert.ok(metrics.scroll <= metrics.client, `${metrics.scroll} > ${metrics.client}`)
  })
  await testPage.close()
}

const reducedContext = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const reducedPage = await reducedContext.newPage()
await reducedPage.goto(base, { waitUntil: 'networkidle' })
await check('reduced motion leaves all sections visible', async () => {
  const opacities = await reducedPage.evaluate(() =>
    [...document.querySelectorAll('main section')].map((section) =>
      Number(getComputedStyle(section).opacity),
    ),
  )
  assert.ok(opacities.every((value) => value === 1), JSON.stringify(opacities))
})
await check('reduced motion switches the theme instantly', async () => {
  await reducedPage.locator('header button[aria-pressed]').click()
  await reducedPage.waitForTimeout(60)
  const state = await reducedPage.evaluate(() => ({
    dark: document.documentElement.classList.contains('dark'),
    overlay: document.querySelectorAll('.theme-reveal').length,
  }))
  assert.equal(state.dark, true, 'the theme did not change')
  assert.equal(state.overlay, 0, 'a reveal overlay was added')
})
await reducedContext.close()

const unexpectedErrors = errors.filter(
  (message) => !message.includes('mailto:') && !message.includes('ERR_ABORTED'),
)
await check('no unexpected console errors', async () => {
  assert.deepEqual(unexpectedErrors, [])
})

console.log(results.join('\n'))
console.log(unexpectedErrors.length ? `Console errors:\n${unexpectedErrors.join('\n')}` : 'Console is clean.')
await browser.close()

if (results.some((result) => result.startsWith('FAIL'))) {
  process.exitCode = 1
}
