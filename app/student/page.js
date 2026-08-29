'use client'
import { useState } from 'react'
import Link from 'next/link'
import { loginStudent } from '@/actions/student-auth'

export default function StudentLoginPage() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData(e.target)
    const result = await loginStudent(fd)
    setLoading(false)
    if (result?.errors) setErrors(result.errors)
  }

  return (
    <div className="page-center">
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="text-center mb-4">
          <Link href="/" className="navbar-brand" style={{ fontSize: '1.4rem' }}>VishwaVed Academy</Link>
          <h1 style={{ fontSize: '1.6rem', marginTop: '1.5rem', marginBottom: '0.35rem' }}>Student Login</h1>
          <p className="text-secondary text-sm">Login with your Student ID and Date of Birth.</p>
        </div>

        <div className="card animate-in">
          {errors.general && <div className="alert alert-error">{errors.general}</div>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Logging in…' : 'Login →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
