'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav className="academy-nav">
        <div className="academy-nav-inner">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo" onClick={() => setIsOpen(false)}>
            <div className="brand-icon">🎓</div>
            <div>
              <div className="brand-name">VishwaVed</div>
              <div className="brand-sub">Academy</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#courses">Courses</a>
            <a href="#faculty">Faculty</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Desktop Actions */}
          <div className="nav-actions-desktop">
            <Link href="/student" className="btn btn-secondary btn-sm">Student Portal</Link>
            <Link href="/teacher/login" className="btn btn-primary btn-sm">Faculty Login</Link>
          </div>

          {/* Hamburger Menu Button (Three Lines) */}
          <button
            type="button"
            className={`hamburger-btn ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Over Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="drawer-header">
          <Link href="/" className="brand-logo" onClick={() => setIsOpen(false)}>
            <div className="brand-icon">🎓</div>
            <div>
              <div className="brand-name">VishwaVed</div>
              <div className="brand-sub">Academy</div>
            </div>
          </Link>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="drawer-body">
          <div className="drawer-section-title">Navigation</div>
          <ul className="drawer-links">
            <li>
              <a href="#about" onClick={() => setIsOpen(false)}>
                <span className="drawer-icon">🏫</span> About Academy
              </a>
            </li>
            <li>
              <a href="#courses" onClick={() => setIsOpen(false)}>
                <span className="drawer-icon">📚</span> Courses &amp; Curriculum
              </a>
            </li>
            <li>
              <a href="#features" onClick={() => setIsOpen(false)}>
                <span className="drawer-icon">✨</span> Why VishwaVed
              </a>
            </li>
            <li>
              <a href="#faculty" onClick={() => setIsOpen(false)}>
                <span className="drawer-icon">👨‍🏫</span> Faculty Members
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={() => setIsOpen(false)}>
                <span className="drawer-icon">💬</span> Student Reviews
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                <span className="drawer-icon">📍</span> Contact &amp; Location
              </a>
            </li>
          </ul>

          <div className="drawer-section-title mt-4">Portals &amp; Login</div>
          <div className="drawer-portals">
            <Link
              href="/student"
              className="drawer-portal-card student-portal-card"
              onClick={() => setIsOpen(false)}
            >
              <div className="portal-card-icon">📝</div>
              <div>
                <div className="portal-card-title">Student Portal</div>
                <div className="portal-card-desc">Take tests &amp; check results</div>
              </div>
            </Link>

            <Link
              href="/teacher/login"
              className="drawer-portal-card faculty-portal-card"
              onClick={() => setIsOpen(false)}
            >
              <div className="portal-card-icon">🎓</div>
              <div>
                <div className="portal-card-title">Faculty Login</div>
                <div className="portal-card-desc">Manage tests &amp; grades</div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}
