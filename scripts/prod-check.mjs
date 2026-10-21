/**
 * Production route and asset checks against the built preview.
 * Usage: node scripts/prod-check.mjs [baseUrl]
 * Requires `npm run build` and a running `npm run preview`.
 */
import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'

const base = process.argv[2] ?? 'http://localhost:4173'
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
const page = await context.newPage()
const errors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text())
})
page.on('pageerror', (error) => errors.push(error.message))

for (const [path, title, heading] of [
  ['/', 'Vivek Kumar — Full-Stack Developer', 'Vivek Kumar'],
  ['/contact', 'Contact — Vivek Kumar', 'Get in touch'],
  ['/projects/pulseops', 'PulseOps case study — Vivek Kumar', 'PulseOps'],
  ['/does-not-exist', 'Page not found — Vivek Kumar', 'This page does not exist.'],
]) {
  const response = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
  assert.equal(response.status(), 200, `${path} status`)
  assert.equal(await page.title(), title, `${path} title`)
  assert.equal(await page.locator('h1').first().textContent(), heading, `${path} heading`)
  console.log(`PASS production route ${path}`)
}

for (const path of [
  '/Vivek-Kumar-Resume.pdf',
  '/og-image.png',
  '/apple-touch-icon.png',
  '/favicon.svg',
  '/tech/vscode.svg',
]) {
  const response = await context.request.get(`${base}${path}`)
  assert.equal(response.status(), 200, `${path} status`)
  console.log(`PASS production asset ${path}`)
}

assert.deepEqual(errors, [])
console.log('PASS production console is clean')
await browser.close()
