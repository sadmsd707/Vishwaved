import Link from 'next/link'
import { getStudentSessionRequired } from '@/lib/session'
import { logoutStudent } from '@/actions/student-auth'
import StudentNav from '@/app/components/StudentNav'
import db from '@/lib/db'

export const metadata = { title: 'My Tests — VishwaVed Academy' }

export default async function StudentTestsPage() {
  const session = await getStudentSessionRequired()
  const student = session.student

  // Get all submissions by this student
  const submissions = await db.submission.findMany({
    where: { studentRoll: student.id.toLowerCase() },
    include: { test: true },
    orderBy: { submittedAt: 'desc' },
  })

  // Get available active tests
  const activeTests = await db.test.findMany({
    where: { isActive: true },
    include: {
      questions: { select: { id: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const submittedTestIds = new Set(submissions.map((s) => s.testId))

  return (
    <div className="page">
      <StudentNav
        studentName={student.name}
        studentId={student.id}
        studentClass={student.class}
        logoutAction={logoutStudent}
      />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>📝 My Tests</h1>
            <p className="text-secondary text-sm mt-1">Browse and attempt available tests.</p>
          </div>
          <Link href="/student/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value">{activeTests.length}</div>
            <div className="stat-label">Available Tests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{submissions.length}</div>
            <div className="stat-label">Attempted</div>
          </div>
        </div>

        {/* Code Input */}
        <div className="card mb-4 animate-in" style={{ background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.05) 0%, rgba(2, 132, 199, 0.05) 100%)', border: '1px solid var(--border-accent)' }}>
          <h4 style={{ marginBottom: '0.4rem' }}>Have a Test Code?</h4>
          <p className="text-secondary text-xs mb-3">Enter the code provided by your teacher to start a test directly.</p>
          <form action="/student/test/start" method="GET" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              name="code"
              type="text"
              className="form-input"
              placeholder="Enter Test Code (e.g. TEST-7F3A9C)"
              required
              style={{ flex: 1, minWidth: '200px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}
            />
            <button type="submit" className="btn btn-primary">Start Test →</button>
          </form>
        </div>

        {/* Active Tests */}
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>⚡ Active Tests</h2>
        {activeTests.length === 0 ? (
          <div className="card text-center mb-4" style={{ padding: '2rem' }}>
            <p className="text-muted" style={{ margin: 0 }}>No active tests available at the moment.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
            {activeTests.map((test) => {
              const alreadyTaken = submittedTestIds.has(test.id)
              return (
                <div key={test.id} className="card card-sm animate-in">
                  <div className="flex-between">
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex-gap mb-1">
                        <h4 style={{ margin: 0 }}>{test.title}</h4>
                        <span className="badge badge-active">Active</span>
                        {alreadyTaken && <span className="badge badge-inactive">Attempted</span>}
                      </div>
                      <div className="flex-gap text-xs text-muted">
                        <span>🔑 <strong className="test-code" style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem' }}>{test.testCode}</strong></span>
                        <span>📝 {(test.questions || []).length} Questions</span>
                        {test.timeLimit && <span>⏱ {test.timeLimit} mins</span>}
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <Link href={`/student/test/start?code=${test.testCode}`} className="btn btn-primary btn-sm">
                        {alreadyTaken ? 'Re-attempt' : 'Start Test →'}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Previous Submissions */}
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>📋 Test History</h2>
        {submissions.length === 0 ? (
          <div className="card text-center" style={{ padding: '2.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
            <h4>No test history</h4>
            <p className="text-muted text-sm mt-1">Completed tests will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {submissions.map((sub) => {
              const isPub = sub.isPublished || (sub.test?.resultsPublishAt && new Date(sub.test.resultsPublishAt) <= new Date())
              const percentage = sub.maxScore > 0 ? Math.round((sub.totalScore / sub.maxScore) * 100) : 0
              return (
                <div key={sub.id} className="card card-sm animate-in">
                  <div className="flex-between">
                    <div>
                      <h4 style={{ margin: 0 }}>{sub.test?.title || 'Assessment'}</h4>
                      <div className="flex-gap text-xs text-muted" style={{ marginTop: '0.35rem' }}>
                        <span>🔑 {sub.test?.testCode}</span>
                        <span>📅 {new Date(sub.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                        {isPub && <span>🏆 {sub.totalScore}/{sub.maxScore} ({percentage}%)</span>}
                      </div>
                    </div>
                    <div>
                      {isPub ? (
                        <Link
                          href={`/student/result/${sub.test?.testCode}?studentId=${encodeURIComponent(student.id)}&roll=${encodeURIComponent(student.id)}&name=${encodeURIComponent(student.name)}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Result →
                        </Link>
                      ) : (
                        <span className="badge badge-inactive">⏳ Pending</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
