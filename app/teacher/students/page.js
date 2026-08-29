import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import { logoutTeacher } from '@/actions/auth-redirect'
import db from '@/lib/db'
import AddStudentForm, { DeleteStudentButton } from './StudentForm'

export const metadata = { title: 'Students — VishwaVed Academy' }

export default async function StudentsPage({ searchParams }) {
  const session = await getTeacherSession()
  const teacher = session.teacher
  const sp = await searchParams
  const classFilter = sp?.class || ''

  // Get all students for this teacher
  const whereClause = { teacherId: teacher.id }
  if (classFilter) whereClause.class = classFilter

  const students = await db.student.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  })

  // Get distinct classes for filter
  const allStudents = await db.student.findMany({
    where: { teacherId: teacher.id },
  })
  const classes = [...new Set(allStudents.map(s => s.class))].sort()
  const totalStudents = allStudents.length

  return (
    <div className="page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/teacher/dashboard" className="navbar-brand">VishwaVed Academy</Link>
          <div className="navbar-actions">
            <Link href="/teacher/dashboard" className="btn btn-secondary btn-sm">← Dashboard</Link>
            <span className="text-sm text-muted">👋 {teacher.name}</span>
            <form action={logoutTeacher}>
              <button type="submit" className="btn btn-secondary btn-sm">Logout</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '2rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>👨‍🎓 Students</h1>
            <p className="text-secondary text-sm mt-1">Add and manage students class-wise. Student ID is their login credential.</p>
          </div>
          <div className="stat-card" style={{ minWidth: 'auto', padding: '0.75rem 1.25rem' }}>
            <div className="stat-value">{totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>

        {/* Add Student Form */}
        <AddStudentForm classes={classes} />

        {/* Class Filter */}
        <div className="card" style={{ marginTop: '1.5rem', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Filter by Class:</span>
            <Link
              href="/teacher/students"
              className={`btn btn-sm ${!classFilter ? 'btn-primary' : 'btn-secondary'}`}
            >
              All ({totalStudents})
            </Link>
            {classes.map(c => {
              const count = allStudents.filter(s => s.class === c).length
              return (
                <Link
                  key={c}
                  href={`/teacher/students?class=${encodeURIComponent(c)}`}
                  className={`btn btn-sm ${classFilter === c ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {c} ({count})
                </Link>
              )
            })}
          </div>
        </div>

        {/* Student Table */}
        <div style={{ marginTop: '1.5rem' }}>
          {students.length === 0 ? (
            <div className="card text-center" style={{ padding: '3rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍🎓</div>
              <h3 style={{ marginBottom: '0.5rem' }}>
                {classFilter ? `No students in ${classFilter}` : 'No students yet'}
              </h3>
              <p className="text-muted">Use the form above to add your first student.</p>
            </div>
          ) : (
            <div className="card" style={{ overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Student ID</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Name</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Class</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>DOB</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Mobile</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Parent Mobile</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Mother&apos;s Name</th>
                    <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="animate-in" style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        <strong className="test-code" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>{s.id}</strong>
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        {s.firstName} {s.middleName} {s.surname}
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        <span className="badge badge-active">{s.class}</span>
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        {new Date(s.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{s.mobile}</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{s.parentMobile}</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{s.mothersName}</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        <DeleteStudentButton studentId={s.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
