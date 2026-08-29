'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function StudentNav({ studentName, studentId, studentClass, logoutAction }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  // Close on click outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false)
    }
    if (isOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/student/dashboard" className="navbar-brand">VishwaVed Academy</Link>
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="teacher-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Student Menu"
            aria-expanded={isOpen}
          >
            <span className={`t-ham-line ${isOpen ? 'open' : ''}`} />
            <span className={`t-ham-line ${isOpen ? 'open' : ''}`} />
            <span className={`t-ham-line ${isOpen ? 'open' : ''}`} />
          </button>

          {isOpen && (
            <div className="teacher-dropdown animate-in">
              <div className="t-dropdown-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>👨‍🎓</span>
                  <span style={{ fontWeight: 700 }}>{studentName}</span>
                </div>
                <div className="text-xs text-muted" style={{ fontWeight: 500, paddingLeft: '1.4rem' }}>
                  ID: {studentId} · Class: {studentClass}
                </div>
              </div>
              <div className="t-dropdown-divider" />
              <Link href="/student/dashboard" className="t-dropdown-item" onClick={() => setIsOpen(false)}>
                <span>📊</span> Dashboard
              </Link>
              <div className="t-dropdown-divider" />
              <form action={logoutAction}>
                <button type="submit" className="t-dropdown-item t-dropdown-logout">
                  <span>🚪</span> Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
