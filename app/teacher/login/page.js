'use client'
import { useState } from 'react'
import Link from 'next/link'
import { loginTeacher } from '@/actions/auth'

export default function LoginPage() {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData(e.target)
    const result = await loginTeacher(fd)
    setLoading(false)
    if (result?.errors) setErrors(result.errors)
  }

  return (
    <div className="page-center">
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="text-center mb-4">
          <Link href="/" className="navbar-brand" style={{ fontSize: '1.4rem' }}>VishwaVed Academy</Link>
          <h1 style={{ fontSize: '1.6rem', marginTop: '1.5rem', marginBottom: '0.35rem' }}>Faculty Login</h1>
          <p className="text-secondary text-sm">Access your dashboard and manage your assessments.</p>
        </div>

        <div className="card animate-in">
          {errors.general && <div className="alert alert-error">{errors.general}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" className="form-input" placeholder="faculty@vishwaved.academy" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="form-input" placeholder="Your password" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Logging in…' : 'Login to Dashboard'}
            </button>
          </form>
          <p className="text-center text-sm text-muted mt-3">
            Don&apos;t have an account? <Link href="/teacher/signup">Register as Faculty →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
