import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import db from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'
import TeacherNav from '@/app/components/TeacherNav'

export const metadata = { title: 'Dashboard — VishwaVed Academy' }

export default async function DashboardPage() {
  const session = await getTeacherSession()
  const teacher = session.teacher

  const tests = await db.test.findMany({
    where: { teacherId: teacher.id },
    include: {
      questions: true,
      submissions: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  // Add _count manually for compatibility
  for (const t of tests) {
    t._count = {
      questions: (t.questions || []).length,
      submissions: (t.submissions || []).length,
    }
  }

  const totalTests = tests.length
  const totalSubmissions = tests.reduce((s, t) => s + t._count.submissions, 0)
  const activeTests = tests.filter((t) => t.isActive).length

  return (
    <div className="page">
      {/* Navbar */}
      <TeacherNav teacherName={teacher.name} logoutAction={logoutTeacher} />

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>My Tests</h1>
            <p className="text-secondary text-sm mt-1">Create, manage and publish your tests from here.</p>
          </div>
          <div className="flex-gap" style={{ flexWrap: 'wrap' }}>
            <Link href="/teacher/students" className="btn btn-secondary">👨‍🎓 Students</Link>
            <Link href="/teacher/attendance" className="btn btn-secondary">📅 Attendance</Link>
            <Link href="/teacher/test/new" className="btn btn-primary">+ Create Test</Link>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalTests}</div>
            <div className="stat-label">Total Tests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeTests}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalSubmissions}</div>
            <div className="stat-label">Submissions</div>
          </div>
        </div>

        {/* Test List */}
        {tests.length === 0 ? (
          <div className="card text-center" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No tests yet</h3>
            <p className="text-muted mb-3">Create your first test to get started.</p>
            <Link href="/teacher/test/new" className="btn btn-primary">Create Your First Test</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {tests.map((test) => (
              <div key={test.id} className="card card-sm animate-in">
                <div className="flex-between">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex-gap mb-1">
                      <h3 style={{ margin: 0 }}>{test.title}</h3>
                      <span className={`badge ${test.isActive ? 'badge-active' : 'badge-inactive'}`}>
                        {test.isActive ? '● Active' : '○ Disabled'}
                      </span>
                    </div>
                    <div className="flex-gap text-xs text-muted">
                      <span>🔑 <strong className="test-code" style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem' }}>{test.testCode}</strong></span>
                      <span>📝 {test._count.questions} questions</span>
                      <span>👥 {test._count.submissions} submissions</span>
                      {test.timeLimit && <span>⏱ {test.timeLimit} min</span>}
                    </div>
                  </div>
                  <div className="flex-gap" style={{ flexShrink: 0 }}>
                    <Link href={`/teacher/test/${test.id}`} className="btn btn-secondary btn-sm">Manage</Link>
                    <Link href={`/teacher/test/${test.id}/submissions`} className="btn btn-secondary btn-sm">Results</Link>
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
