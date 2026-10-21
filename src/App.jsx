import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import { scrollToSection } from './lib/scroll'
import CaseStudyPage from './pages/CaseStudyPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const target = location.state?.scrollTo ?? (location.hash ? location.hash.slice(1) : '')

    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    // Let the destination route paint before measuring section offsets.
    const frame = window.requestAnimationFrame(() => {
      scrollToSection(target)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [location.pathname, location.key, location.state, location.hash])

  return null
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main-content" tabIndex={-1} className="site-main shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
