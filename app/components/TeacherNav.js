'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function TeacherNav({ teacherName, logoutAction }) {
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
        <Link href="/teacher/dashboard" className="navbar-brand">VishwaVed Academy</Link>
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            type="button"
            className="teacher-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            <span className={`t-ham-line ${isOpen ? 'open' : ''}`} />
            <span className={`t-ham-line ${isOpen ? 'open' : ''}`} />
            <span className={`t-ham-line ${isOpen ? 'open' : ''}`} />
          </button>

          {isOpen && (
            <div className="teacher-dropdown animate-in">
              <div className="t-dropdown-header">
                <span>👋</span>
                <span>{teacherName}</span>
              </div>
              <div className="t-dropdown-divider" />
              <Link href="/teacher/dashboard" className="t-dropdown-item" onClick={() => setIsOpen(false)}>
                <span>📊</span> Dashboard
              </Link>
              <Link href="/teacher/students" className="t-dropdown-item" onClick={() => setIsOpen(false)}>
                <span>👨‍🎓</span> Students
              </Link>
              <Link href="/teacher/test/new" className="t-dropdown-item" onClick={() => setIsOpen(false)}>
                <span>📝</span> Create Test
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
