'use client'
import { useState } from 'react'
import Link from 'next/link'
import { startTest } from '@/actions/submission'

export default function StudentHomePage() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('take') // 'take' | 'result'

  async function handleTakeTest(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData(e.target)
    const result = await startTest(fd)
    setLoading(false)
    if (result?.errors) setErrors(result.errors)
  }

  return (
    <div className="page-center">
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div className="text-center mb-4">
          <Link href="/" className="navbar-brand" style={{ fontSize: '1.4rem' }}>VishwaVed Academy</Link>
          <h1 style={{ fontSize: '1.6rem', marginTop: '1.5rem', marginBottom: '0.35rem' }}>Student Portal</h1>
          <p className="text-secondary text-sm">Take an assessment or view your published results.</p>
        </div>

        {/* Tab Toggle */}
        <div className="type-toggle mb-4">
          <button type="button" className={`type-toggle-btn ${tab === 'take' ? 'active' : ''}`} onClick={() => { setTab('take'); setErrors({}) }}>
            📝 Take Test
          </button>
          <button type="button" className={`type-toggle-btn ${tab === 'result' ? 'active' : ''}`} onClick={() => { setTab('result'); setErrors({}) }}>
            📊 View Result
          </button>
        </div>

        {tab === 'take' && (
          <div className="card animate-in">
            <h3 className="mb-3">Login & Start Test</h3>
            {errors.general && <div className="alert alert-error">{errors.general}</div>}

            <form onSubmit={handleTakeTest}>
              <div className="form-group">
                <label className="form-label" htmlFor="studentId">Student ID *</label>
                <input id="studentId" name="studentId" type="text" className="form-input"
                  placeholder="Enter your Student ID" required
                  style={{ letterSpacing: '0.05em', fontWeight: '600' }} />
                {errors.studentId && <div className="form-error">{errors.studentId}</div>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="dob">Date of Birth *</label>
                <input id="dob" name="dob" type="date" className="form-input" required />
                {errors.dob && <div className="form-error">{errors.dob}</div>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="testCode">Test Code *</label>
                <input id="testCode" name="testCode" type="text" className="form-input"
                  placeholder="e.g. TEST-7F3A9C" required
                  style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }} />
                {errors.testCode && <div className="form-error">{errors.testCode}</div>}
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Verifying…' : 'Login & Start Test →'}
              </button>
            </form>
          </div>
        )}

        {tab === 'result' && (
          <div className="card animate-in">
            <h3 className="mb-3">View Your Result</h3>
            <form action="/student/result" method="GET">
              <div className="form-group">
                <label className="form-label" htmlFor="rsid">Student ID *</label>
                <input id="rsid" name="studentId" type="text" className="form-input"
                  placeholder="Enter your Student ID" required
                  style={{ letterSpacing: '0.05em', fontWeight: '600' }} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="rc">Test Code *</label>
                <input id="rc" name="code" type="text" className="form-input"
                  placeholder="e.g. TEST-7F3A9C" required
                  style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }} />
              </div>
              <button type="submit" className="btn btn-primary btn-full">View Result →</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
