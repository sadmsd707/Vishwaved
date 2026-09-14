import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import db, { sql } from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'
import TeacherNav from '@/app/components/TeacherNav'

export const metadata = { title: 'Dashboard — VishwaVed Academy' }

export default async function DashboardPage() {
  const session = await getTeacherSession()
  const teacher = session.teacher

  // ─── Fetch all data for overview ───
  const tests = await db.test.findMany({
    where: { teacherId: teacher.id },
    include: { questions: true, submissions: true },
    orderBy: { createdAt: 'desc' },
  })

  for (const t of tests) {
    t._count = {
      questions: (t.questions || []).length,
      submissions: (t.submissions || []).length,
    }
  }

  const students = await db.student.findMany({
    where: { teacherId: teacher.id },
  })

  // Today's attendance
  const todayStr = new Date().toISOString().split('T')[0]
  const todayDate = new Date(todayStr)
  let todayAttendance = []
  try {
    todayAttendance = await sql`
      SELECT * FROM "Attendance"
      WHERE "teacher_id" = ${teacher.id} AND "date" = ${todayDate}
    `
  } catch {}

  // Enquiries count
  let enquiries = []
  try {
    enquiries = await sql`
      SELECT "id", "status" FROM "Enquiry" ORDER BY "created_at" DESC
    `
  } catch {}

  // Resources count
  let resourceCount = 0
  try {
    const res = await sql`
      SELECT COUNT(*) as c FROM "Resource" WHERE "teacher_id" = ${teacher.id}
    `
    resourceCount = parseInt(res[0]?.c || '0', 10)
  } catch {}

  // ─── Computed stats ───
  const totalTests = tests.length
  const activeTests = tests.filter((t) => t.isActive).length
  const totalSubmissions = tests.reduce((s, t) => s + t._count.submissions, 0)
  const totalStudents = students.length
  const classes = [...new Set(students.map((s) => s.class))].sort()
  const todayPresent = todayAttendance.filter((a) => a.status === 'PRESENT').length
  const todayAbsent = todayAttendance.filter((a) => a.status === 'ABSENT').length
  const todayMarked = todayAttendance.length
  const pendingEnquiries = enquiries.filter((e) => e.status === 'PENDING').length
  const totalEnquiries = enquiries.length
  const recentTests = tests.slice(0, 5)

  return (
    <div className="page">
      <TeacherNav teacherName={teacher.name} logoutAction={logoutTeacher} />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="mb-4">
          <h1>📊 Dashboard</h1>
          <p className="text-secondary text-sm mt-1">Welcome back, {teacher.name}! Here&apos;s your complete overview.</p>
        </div>

        {/* ─── Main Stats Grid ─── */}
        <div className="stats-grid mb-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          <div className="stat-card">
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-label">👨‍🎓 Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{classes.length}</div>
            <div className="stat-label">📚 Classes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalTests}</div>
            <div className="stat-label">📝 Total Tests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{activeTests}</div>
            <div className="stat-label">⚡ Active Tests</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalSubmissions}</div>
            <div className="stat-label">📋 Submissions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{resourceCount}</div>
            <div className="stat-label">📚 Resources</div>
          </div>
        </div>

        {/* ─── Quick Overview Sections ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

          {/* Today's Attendance */}
          <div className="card animate-in">
            <div className="flex-between mb-3">
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>📅 Today&apos;s Attendance</h3>
              <Link href="/teacher/attendance" className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>View All →</Link>
            </div>
            {todayMarked === 0 ? (
              <div className="text-center" style={{ padding: '1.5rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                <p className="text-muted text-sm" style={{ margin: 0 }}>Attendance not marked yet today.</p>
                <Link href="/teacher/attendance" className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}>Mark Attendance</Link>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: 'rgba(5, 150, 105, 0.08)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success, #059669)' }}>{todayPresent}</div>
                    <div className="text-xs text-muted">Present</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>{todayAbsent}</div>
                    <div className="text-xs text-muted">Absent</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-1)' }}>{todayMarked}</div>
                    <div className="text-xs text-muted">Total Marked</div>
                  </div>
                </div>
                {totalStudents > 0 && (
                  <div className="text-xs text-muted" style={{ textAlign: 'center' }}>
                    {Math.round((todayPresent / todayMarked) * 100)}% attendance rate · {totalStudents - todayMarked} students unmarked
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enquiries Overview */}
          <div className="card animate-in">
            <div className="flex-between mb-3">
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>📬 Enquiries</h3>
              <Link href="/teacher/enquiries" className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>View All →</Link>
            </div>
            {totalEnquiries === 0 ? (
              <div className="text-center" style={{ padding: '1.5rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📬</div>
                <p className="text-muted text-sm" style={{ margin: 0 }}>No enquiries received yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: 'rgba(217, 119, 6, 0.08)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#d97706' }}>{pendingEnquiries}</div>
                  <div className="text-xs text-muted">Pending</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: 'rgba(5, 150, 105, 0.08)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success, #059669)' }}>{enquiries.filter((e) => e.status === 'ENROLLED').length}</div>
                  <div className="text-xs text-muted">Enrolled</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '0.75rem', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-1)' }}>{totalEnquiries}</div>
                  <div className="text-xs text-muted">Total</div>
                </div>
              </div>
            )}
          </div>

          {/* Students by Class */}
          <div className="card animate-in">
            <div className="flex-between mb-3">
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>👨‍🎓 Students by Class</h3>
              <Link href="/teacher/students" className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>Manage →</Link>
            </div>
            {students.length === 0 ? (
              <div className="text-center" style={{ padding: '1.5rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍🎓</div>
                <p className="text-muted text-sm" style={{ margin: 0 }}>No students added yet.</p>
                <Link href="/teacher/students" className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}>Add Students</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {classes.map((cls) => {
                  const count = students.filter((s) => s.class === cls).length
                  return (
                    <div key={cls} style={{ padding: '0.5rem 1rem', background: 'var(--bg-elevated)', borderRadius: '8px', border: '1px solid var(--border)', minWidth: '80px', textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent-1)' }}>{count}</div>
                      <div className="text-xs text-muted">{cls}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Resources & Fees Quick Card */}
          <div className="card animate-in">
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>⚡ Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <Link href="/teacher/test/new" className="btn btn-primary" style={{ textAlign: 'center', padding: '1rem' }}>
                📝 Create Test
              </Link>
              <Link href="/teacher/attendance" className="btn btn-secondary" style={{ textAlign: 'center', padding: '1rem' }}>
                📅 Attendance
              </Link>
              <Link href="/teacher/resources" className="btn btn-secondary" style={{ textAlign: 'center', padding: '1rem' }}>
                📚 Resources ({resourceCount})
              </Link>
              <Link href="/teacher/fees" className="btn btn-secondary" style={{ textAlign: 'center', padding: '1rem' }}>
                💰 Fees
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Recent Tests ─── */}
        <div className="mb-4">
          <div className="flex-between mb-3">
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>📝 Recent Tests</h2>
          </div>

          {tests.length === 0 ? (
            <div className="card text-center" style={{ padding: '3rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ marginBottom: '0.5rem' }}>No tests yet</h3>
              <p className="text-muted mb-3">Create your first test to get started.</p>
              <Link href="/teacher/test/new" className="btn btn-primary">Create Your First Test</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {recentTests.map((test) => (
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
              {tests.length > 5 && (
                <div className="text-center" style={{ padding: '0.5rem' }}>
                  <span className="text-sm text-muted">Showing 5 of {tests.length} tests · View all from the menu</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
