'use client'

import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Intercept navigation link clicks to trigger instant visual feedback
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      if (
        href &&
        !href.startsWith('#') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('http') &&
        !target.hasAttribute('target')
      ) {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
      }
    }

    document.addEventListener('click', handleAnchorClick)

    const handleBeforeUnload = () => setLoading(true)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  if (!loading) return null

  return (
    <div className="top-progress-bar-container" aria-hidden="true">
      <div className="top-progress-bar-fill" />
    </div>
  )
}
