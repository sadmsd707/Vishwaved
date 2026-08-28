import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTeacherSession } from '@/lib/session'
import db from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'
import { toggleTestActive, deleteTest } from '@/actions/test'

export async function generateMetadata({ params }) {
  const p = await params
  const test = await db.test.findUnique({ where: { id: p.testId } })
  return { title: test ? `${test.title} — VishwaVed Academy` : 'Test — VishwaVed Academy' }
}

export default async function TestOverviewPage({ params }) {
  const session = await getTeacherSession()
  const p = await params

  const test = await db.test.findFirst({
    where: { id: p.testId, teacherId: session.teacher.id },
    include: {
      _count: { select: { questions: true, submissions: true } },
    },
  })
  if (!test) notFound()

  const publishedCount = await db.submission.count({
    where: { testId: test.id, isPublished: true },
  })

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/teacher/dashboard" className="navbar-brand">VishwaVed Academy</Link>
          <div className="navbar-actions">
            <span className="text-sm text-muted">{session.teacher.name}</span>
            <form action={logoutTeacher}>
              <button type="submit" className="btn btn-secondary btn-sm">Logout</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="flex-gap mb-1">
          <Link href="/teacher/dashboard" className="text-sm text-muted">← Dashboard</Link>
        </div>

        <div className="flex-between mb-4 mt-2">
          <div>
            <div className="flex-gap mb-1">
              <h1 style={{ fontSize: '1.6rem' }}>{test.title}</h1>
              <span className={`badge ${test.isActive ? 'badge-active' : 'badge-inactive'}`}>
                {test.isActive ? '● Active' : '○ Disabled'}
              </span>
            </div>
            {test.description && <p className="text-secondary text-sm">{test.description}</p>}
          </div>
        </div>

        {/* Test Code */}
        <div className="card mb-4" style={{ background: 'rgba(99,102,241,0.06)' }}>
          <div className="flex-between">
            <div>
              <div className="text-xs text-muted mb-1" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>Student Test ID</div>
              <div className="test-code">{test.testCode}</div>
              <p className="text-xs text-muted mt-2">Share this ID with students so they can access the test.</p>
            </div>
            <div className="flex-gap">
              <form action={async () => { 'use server'; await toggleTestActive(p.testId) }}>
                <button type="submit" className={`btn btn-sm ${test.isActive ? 'btn-danger' : 'btn-success'}`}>
                  {test.isActive ? 'Disable Test' : 'Enable Test'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value">{test._count.questions}</div>
            <div className="stat-label">Questions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{test._count.submissions}</div>
            <div className="stat-label">Submissions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{publishedCount}</div>
            <div className="stat-label">Results Published</div>
          </div>
          {test.timeLimit && (
            <div className="stat-card">
              <div className="stat-value">{test.timeLimit}</div>
              <div className="stat-label">Minutes</div>
            </div>
          )}
        </div>

        {/* Actions Grid */}
        <div className="grid-2">
          <Link href={`/teacher/test/${test.id}/questions`} className="card" style={{ cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📝</div>
            <h3>Manage Questions</h3>
            <p className="text-sm text-muted mt-1">Add, edit or delete MCQ and numerical questions.</p>
          </Link>

          <Link href={`/teacher/test/${test.id}/submissions`} className="card" style={{ cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📊</div>
            <h3>View Submissions</h3>
            <p className="text-sm text-muted mt-1">See all student submissions and auto-calculated scores.</p>
          </Link>

          <Link href={`/teacher/test/${test.id}/publish`} className="card" style={{ cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📢</div>
            <h3>Publish Results</h3>
            <p className="text-sm text-muted mt-1">Control which students can see their scores.</p>
          </Link>

          <Link href={`/teacher/test/${test.id}/edit`} className="card" style={{ cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>⚙️</div>
            <h3>Edit Settings</h3>
            <p className="text-sm text-muted mt-1">Update title, time limit, dates, and display mode.</p>
          </Link>
        </div>

        {/* Danger zone */}
        <div className="card mt-4" style={{ borderColor: 'rgba(248,113,113,0.2)' }}>
          <h4 className="text-danger mb-2">Danger Zone</h4>
          <p className="text-sm text-muted mb-3">Deleting a test permanently removes all questions and submissions.</p>
          <form action={async () => { 'use server'; await deleteTest(p.testId) }}>
            <button type="submit" className="btn btn-danger btn-sm"
              onClick="return confirm('Delete this test and all its data?')"
            >
              Delete Test
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
