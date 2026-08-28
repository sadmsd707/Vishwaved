import Link from 'next/link'

export const metadata = {
  title: 'TestFlow — Secure Online Testing Platform',
  description: 'Create and take secure MCQ and numerical tests. Built for teachers and students.',
}

export default function LandingPage() {
  return (
    <main className="hero">
      <div>
        <div className="hero-badge">
          <span>⚡</span>
          <span>Secure · Fast · Simple</span>
        </div>

        <h1 style={{ maxWidth: '700px', margin: '0 auto 1rem' }}>
          The <span className="gradient-text">Online Test Platform</span> for Modern Classrooms
        </h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto', color: 'var(--text-secondary)' }}>
          Create MCQ &amp; numerical tests. Share a single Test ID with students. Results published on your terms — fully secure.
        </p>

        <div className="hero-cta-grid">
          <Link href="/student" className="hero-cta-card">
            <div className="hero-cta-icon">📝</div>
            <div className="hero-cta-title">Take a Test</div>
            <div className="hero-cta-desc">Enter your Test ID and start instantly. No account required.</div>
          </Link>

          <Link href="/teacher/login" className="hero-cta-card">
            <div className="hero-cta-icon">🎓</div>
            <div className="hero-cta-title">Teacher Login</div>
            <div className="hero-cta-desc">Manage tests, view submissions, and publish results.</div>
          </Link>
        </div>

        <p className="mt-4 text-xs text-muted">
          New teacher? <Link href="/teacher/signup">Create a free account →</Link>
        </p>
      </div>
    </main>
  )
}
