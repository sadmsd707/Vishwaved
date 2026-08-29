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
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="page">
      {/* Navbar */}
      <StudentNav
        studentName={student.name}
        studentId={student.id}
        studentClass={student.class}
        logoutAction={logoutStudent}
      />

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Welcome */}
        <div className="mb-4">
          <h1>Welcome, {student.name.split(' ')[0]}! 👋</h1>
          <p className="text-secondary text-sm mt-1">Student ID: <strong>{student.id}</strong> · Class: <strong>{student.class}</strong></p>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value">{submissions.length}</div>
            <div className="stat-label">Tests Taken</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{submissions.filter(s => s.isPublished).length}</div>
            <div className="stat-label">Results Published</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeTests.length}</div>
            <div className="stat-label">Active Tests</div>
          </div>
        </div>

        {/* Take Test Section */}
        <div className="card mb-4 animate-in">
          <h3 className="mb-3">📝 Take a Test</h3>
          <p className="text-secondary text-sm mb-3">Enter the test code provided by your teacher to start.</p>
          <form action="/student/test/start" method="GET" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input name="code" type="text" className="form-input" placeholder="Enter Test Code (e.g. TEST-7F3A9C)"
              required style={{ flex: 1, minWidth: '200px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }} />
            <button type="submit" className="btn btn-primary">Start Test →</button>
          </form>
        </div>

        {/* Past Results */}
        <h3 className="mb-3">📊 My Results</h3>
        {submissions.length === 0 ? (
          <div className="card text-center" style={{ padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No tests taken yet</h3>
            <p className="text-muted">Enter a test code above to take your first test.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {submissions.map(sub => (
              <div key={sub.id} className="card card-sm animate-in">
                <div className="flex-between">
                  <div>
                    <h4 style={{ margin: 0 }}>{sub.test?.title || 'Test'}</h4>
                    <div className="flex-gap text-xs text-muted" style={{ marginTop: '0.35rem' }}>
                      <span>🔑 {sub.test?.testCode}</span>
                      <span>📅 {new Date(sub.submittedAt).toLocaleDateString('en-IN')}</span>
                      {sub.isPublished && (
                        <span>📊 Score: <strong>{sub.totalScore}/{sub.maxScore}</strong></span>
                      )}
                    </div>
                  </div>
                  <div>
                    {sub.isPublished ? (
                      <Link href={`/student/result/${sub.test?.testCode}?studentId=${student.id}`} className="btn btn-primary btn-sm">
                        View Result
                      </Link>
                    ) : (
                      <span className="badge badge-inactive">Awaiting Results</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
