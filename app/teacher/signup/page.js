'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signupTeacher } from '@/actions/auth'

export default function SignupPage() {
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData(e.target)
    const result = await signupTeacher(fd)
    setLoading(false)
    if (result?.errors) setErrors(result.errors)
    if (result?.success) setSuccess(true)
  }

  return (
    <div className="page-center">
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div className="text-center mb-4">
          <Link href="/" className="navbar-brand" style={{ fontSize: '1.4rem' }}>VishwaVed Academy</Link>
          <h1 style={{ fontSize: '1.6rem', marginTop: '1.5rem', marginBottom: '0.35rem' }}>Faculty Registration</h1>
          <p className="text-secondary text-sm">Set up your faculty account to create and manage assessments.</p>
        </div>

        {success ? (
          <div className="card animate-in text-center">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Account Created!</h3>
            <p className="text-secondary text-sm mb-3">You can now log in with your credentials.</p>
            <Link href="/teacher/login" className="btn btn-primary btn-full">Go to Login →</Link>
          </div>
        ) : (
          <div className="card animate-in">
            {errors.general && <div className="alert alert-error">{errors.general}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" className="form-input" placeholder="Dr. Priya Sharma" required />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" className="form-input" placeholder="faculty@vishwaved.academy" required />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="form-input" placeholder="At least 8 characters" required />
                {errors.password && <div className="form-error">{errors.password}</div>}
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
            <p className="text-center text-sm text-muted mt-3">
              Already have an account? <Link href="/teacher/login">Faculty Login →</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
