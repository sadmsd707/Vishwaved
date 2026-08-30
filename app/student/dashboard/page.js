import Link from 'next/link'
import { getStudentSessionRequired } from '@/lib/session'
import { logoutStudent } from '@/actions/student-auth'
import db from '@/lib/db'
import StudentNav from '@/app/components/StudentNav'

export const metadata = { title: 'Student Dashboard — VishwaVed Academy' }

export default async function StudentDashboardPage() {
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

  // Helper to check if a submission's result is published
  const isSubmissionPublished = (s) => {
    if (s.isPublished) return true
    if (s.test?.resultsPublishAt && new Date(s.test.resultsPublishAt) <= new Date()) return true
    return false
  }

  // Published results
  const publishedSubmissions = submissions.filter(isSubmissionPublished)
  const submittedTestIds = new Set(submissions.map((s) => s.testId))

  return (
    <div className="page">
      {/* Navbar */}
      <StudentNav
        studentName={student.name}
        studentId={student.id}
        studentClass={student.class}
        logoutAction={logoutStudent}
      />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Welcome */}
        <div className="mb-4">
          <h1>Welcome, {student.name.split(' ')[0]}! 👋</h1>
          <p className="text-secondary text-sm mt-1">
            Student ID: <strong>{student.id}</strong> · Class: <strong>{student.class}</strong>
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value">{activeTests.length}</div>
            <div className="stat-label">Active Tests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{submissions.length}</div>
            <div className="stat-label">Tests Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{publishedSubmissions.length}</div>
            <div className="stat-label">Results Available</div>
          </div>
        </div>

        {/* ─── SECTION 1: ACTIVE TESTS ─── */}
        <section id="active-tests" className="mb-5" style={{ scrollMarginTop: '80px' }}>
          <div className="flex-between mb-3">
            <div>
              <h2 style={{ fontSize: '1.35rem', margin: 0 }}>⚡ Active Tests</h2>
              <p className="text-secondary text-xs mt-1">Tests available for you to attempt right now.</p>
            </div>
          </div>

          {/* Code Input Box */}
          <div className="card mb-3 animate-in" style={{ background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.05) 0%, rgba(2, 132, 199, 0.05) 100%)', border: '1px solid var(--border-accent)' }}>
            <h4 style={{ marginBottom: '0.4rem' }}>Have a Test Code?</h4>
            <p className="text-secondary text-xs mb-3">Enter any specific test code given by your teacher to start directly.</p>
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

          {/* Active Test Cards */}
          {activeTests.length === 0 ? (
            <div className="card text-center" style={{ padding: '2rem' }}>
              <p className="text-muted" style={{ margin: 0 }}>No active tests scheduled at the moment.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
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
        </section>

        {/* ─── SECTION 2: PREVIOUS TESTS ─── */}
        <section id="previous-tests" className="mb-5" style={{ scrollMarginTop: '80px' }}>
          <div className="flex-between mb-3">
            <div>
              <h2 style={{ fontSize: '1.35rem', margin: 0 }}>📋 Previous Tests</h2>
              <p className="text-secondary text-xs mt-1">History of all assessments you have submitted.</p>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="card text-center" style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
              <h4>No previous tests found</h4>
              <p className="text-muted text-sm mt-1">When you complete an assessment, it will appear here.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {submissions.map((sub) => {
                const isPub = isSubmissionPublished(sub)
                const isScheduledFuture = !isPub && sub.test?.resultsPublishAt && new Date(sub.test.resultsPublishAt) > new Date()
                return (
                  <div key={sub.id} className="card card-sm animate-in">
                    <div className="flex-between">
                      <div>
                        <h4 style={{ margin: 0 }}>{sub.test?.title || 'Assessment'}</h4>
                        <div className="flex-gap text-xs text-muted" style={{ marginTop: '0.35rem' }}>
                          <span>🔑 {sub.test?.testCode}</span>
                          <span>📅 Submitted: {new Date(sub.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <div>
                        {isPub ? (
                          <span className="badge badge-active">✓ Results Published</span>
                        ) : isScheduledFuture ? (
                          <span className="badge" style={{ background: 'var(--accent-1)', color: '#fff', fontSize: '0.75rem' }}>
                            ⏰ Scheduled ({new Date(sub.test.resultsPublishAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })})
                          </span>
                        ) : (
                          <span className="badge badge-inactive">⏳ Evaluation Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* ─── SECTION 3: RESULTS ─── */}
        <section id="results" style={{ scrollMarginTop: '80px' }}>
          <div className="flex-between mb-3">
            <div>
              <h2 style={{ fontSize: '1.35rem', margin: 0 }}>📊 Results &amp; Scorecards</h2>
              <p className="text-secondary text-xs mt-1">Official published test scores and solution breakdowns.</p>
            </div>
          </div>

          {publishedSubmissions.length === 0 ? (
            <div className="card text-center" style={{ padding: '2.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
              <h4>No published results yet</h4>
              <p className="text-muted text-sm mt-1">Your teacher will publish results once evaluation is complete.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {publishedSubmissions.map((sub) => {
                const percentage = sub.maxScore > 0 ? Math.round((sub.totalScore / sub.maxScore) * 100) : 0
                return (
                  <div key={sub.id} className="card card-sm animate-in" style={{ borderLeft: '4px solid var(--accent-1)' }}>
                    <div className="flex-between">
                      <div>
                        <h4 style={{ margin: 0 }}>{sub.test?.title || 'Assessment'}</h4>
                        <div className="flex-gap text-xs text-muted" style={{ marginTop: '0.35rem' }}>
                          <span>🔑 {sub.test?.testCode}</span>
                          <span>🏆 Score: <strong style={{ color: 'var(--accent-1)', fontSize: '0.9rem' }}>{sub.totalScore} / {sub.maxScore}</strong> ({percentage}%)</span>
                        </div>
                      </div>
                      <div>
                        <Link
                          href={`/student/result/${sub.test?.testCode}?studentId=${student.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Full Breakdown →
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
