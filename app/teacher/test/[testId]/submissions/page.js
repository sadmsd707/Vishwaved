import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTeacherSession } from '@/lib/session'
import db from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'

export const metadata = { title: 'Submissions — VishwaVed Academy' }

function ScoreBadge({ score, max }) {
  const pct = max > 0 ? Math.round((score / max) * 100) : 0
  const color = pct >= 75 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)'
  return (
    <span style={{ color, fontWeight: '700' }}>
      {score}/{max} ({pct}%)
    </span>
  )
}

export default async function SubmissionsPage({ params }) {
  const session = await getTeacherSession()
  const p = await params

  const test = await db.test.findFirst({
    where: { id: p.testId, teacherId: session.teacher.id },
  })
  if (!test) notFound()

  const submissions = await db.submission.findMany({
    where: { testId: test.id },
    orderBy: { submittedAt: 'desc' },
  })

  const avgScore = submissions.length > 0
    ? (submissions.reduce((s, sub) => s + (sub.maxScore > 0 ? sub.totalScore / sub.maxScore : 0), 0) / submissions.length * 100).toFixed(1)
    : '—'

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/teacher/dashboard" className="navbar-brand">VishwaVed Academy</Link>
          <div className="navbar-actions">
            <Link href={`/teacher/test/${test.id}`} className="btn btn-secondary btn-sm">← Test Overview</Link>
            <form action={logoutTeacher}>
              <button type="submit" className="btn btn-secondary btn-sm">Logout</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="flex-between mb-4">
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Submissions — {test.title}</h1>
            <p className="text-secondary text-sm mt-1">All submissions are auto-graded instantly on the server.</p>
          </div>
          <Link href={`/teacher/test/${test.id}/publish`} className="btn btn-primary">Publish Results →</Link>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value">{submissions.length}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{avgScore}{avgScore !== '—' ? '%' : ''}</div>
            <div className="stat-label">Avg Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {submissions.filter(s => s.isPublished || (test.resultsPublishAt && new Date(test.resultsPublishAt) <= new Date())).length}
            </div>
            <div className="stat-label">
              {test.resultsPublishAt && new Date(test.resultsPublishAt) > new Date() ? 'Scheduled' : 'Results Published'}
            </div>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="card text-center" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
            <h3>No submissions yet</h3>
            <p className="text-muted mt-1">Share the Test ID <strong>{test.testCode}</strong> with students.</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0 }}>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Roll / ID</th>
                    <th>Score</th>
                    <th>Submitted At</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, idx) => {
                    const isScheduleActive = test.resultsPublishAt && new Date(test.resultsPublishAt) > new Date()
                    const isSubPublished = sub.isPublished || (test.resultsPublishAt && new Date(test.resultsPublishAt) <= new Date())

                    return (
                      <tr key={sub.id}>
                        <td className="text-muted text-sm">{idx + 1}</td>
                        <td style={{ fontWeight: '600' }}>{sub.studentName}</td>
                        <td className="text-muted">{sub.studentRoll}</td>
                        <td><ScoreBadge score={sub.totalScore} max={sub.maxScore} /></td>
                        <td className="text-muted text-sm">
                          {new Date(sub.submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </td>
                        <td>
                          {isSubPublished ? (
                            <span className="badge badge-active">Published</span>
                          ) : isScheduleActive ? (
                            <span className="badge" style={{ background: 'var(--accent-1)', color: '#fff', fontSize: '0.75rem' }}>
                              ⏰ Scheduled
                            </span>
                          ) : (
                            <span className="badge badge-info">Pending</span>
                          )}
                        </td>
                        <td>
                          <Link href={`/teacher/test/${test.id}/submissions/${sub.id}`} className="btn btn-secondary btn-sm">
                            View →
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
