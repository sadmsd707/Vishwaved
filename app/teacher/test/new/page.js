'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createTest } from '@/actions/test'

export default function NewTestPage() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData(e.target)
    const result = await createTest(fd)
    setLoading(false)
    if (result?.errors) setErrors(result.errors)
  }

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/teacher/dashboard" className="navbar-brand">VishwaVed Academy</Link>
          <Link href="/teacher/dashboard" className="btn btn-secondary btn-sm">← Dashboard</Link>
        </div>
      </nav>

      <div className="container-sm" style={{ paddingTop: '2.5rem' }}>
        <h1 className="mb-1">Create New Test</h1>
        <p className="text-secondary text-sm mb-4">Fill in the test details. You can add questions on the next screen.</p>

        <div className="card animate-in">
          {errors.general && <div className="alert alert-error">{errors.general}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="title">Test Title *</label>
              <input id="title" name="title" type="text" className="form-input" placeholder="e.g. Physics Unit 3 — Mechanics" required />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Instructions / Description</label>
              <textarea id="description" name="description" className="form-textarea" placeholder="Any instructions for students (optional)…" rows={3} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="timeLimit">Time Limit (minutes)</label>
                <input id="timeLimit" name="timeLimit" type="number" min="1" max="300" className="form-input" placeholder="e.g. 60 (leave blank for none)" />
                <div className="form-hint">Leave blank for no time limit.</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="maxAttempts">Max Attempts per Student</label>
                <input id="maxAttempts" name="maxAttempts" type="number" min="1" max="10" defaultValue="1" className="form-input" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="startAt">Available From</label>
                <input id="startAt" name="startAt" type="datetime-local" className="form-input" />
                <div className="form-hint">Leave blank to open immediately.</div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="endAt">Available Until</label>
                <input id="endAt" name="endAt" type="datetime-local" className="form-input" />
                <div className="form-hint">Leave blank for no end time.</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="displayMode">Question Display Mode</label>
              <select id="displayMode" name="displayMode" className="form-select">
                <option value="ALL">All questions on one page</option>
                <option value="ONE_BY_ONE">One question at a time (Next/Prev)</option>
              </select>
            </div>

            <hr className="divider" />

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? 'Creating…' : 'Create Test & Add Questions →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
