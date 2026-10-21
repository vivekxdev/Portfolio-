/**
 * Visual QA helper — not part of the production app.
 * Usage: node scripts/screenshots.mjs [baseUrl]
 */
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const base = process.argv[2] ?? 'http://127.0.0.1:5173'
const outDir = '.tmp'

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()

async function capture(name, viewport, url = '/') {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
  const errors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto(`${base}${url}`, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    await document.fonts.ready
  })

  // Scroll slowly so every IntersectionObserver reveal has time to run.
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const step = Math.round(viewport.height * 0.5)
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(180)
  }
  await page.waitForTimeout(900)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(700)

  await page.screenshot({ path: `${outDir}/${name}-full.png`, fullPage: true })
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: false })

  const metrics = await page.evaluate(() => {
    const box = (selector) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }
    }
    return {
      title: document.title,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
      main: box('#main-content'),
      hero: box('#main-content > section'),
      heading: box('#projects-heading'),
      card: box('.project-card'),
      shot: box('.project-shot'),
      writing: box('#writing .writing-row'),
      theme: localStorage.getItem('theme'),
    }
  })

  console.log(name, JSON.stringify(metrics), errors.length ? { errors } : 'no console errors')
  await page.close()
}

await capture('desktop', { width: 1440, height: 1000 })
await capture('laptop', { width: 1280, height: 800 })
await capture('tablet', { width: 768, height: 1024 })
await capture('mobile', { width: 390, height: 844 })
await capture('mobile-small', { width: 320, height: 700 })
await capture('case-study', { width: 1440, height: 1000 }, '/projects/pulseops')
await capture('case-study-mobile', { width: 390, height: 844 }, '/projects/cyberarena')
await capture('contact', { width: 1440, height: 1000 }, '/contact')
await capture('contact-mobile', { width: 390, height: 844 }, '/contact')
await capture('not-found', { width: 1440, height: 900 }, '/does-not-exist')

// Dark mode: load once, click the toggle, then capture.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.locator('header button').click()
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
    await page.waitForTimeout(180)
  }
  await page.waitForTimeout(900)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${outDir}/dark-full.png`, fullPage: true })
  await page.screenshot({ path: `${outDir}/dark.png`, fullPage: false })
  console.log('dark', 'saved')
  await page.close()
}

await browser.close()
