import Link from 'next/link'
import { getStudentSessionRequired } from '@/lib/session'
import { logoutStudent } from '@/actions/student-auth'
import StudentNav from '@/app/components/StudentNav'
import db from '@/lib/db'

export const metadata = { title: 'My Attendance — VishwaVed Academy' }

export default async function StudentAttendancePage() {
  const session = await getStudentSessionRequired()
  const student = session.student

  // Fetch attendance records for this student
  const attendanceRecords = await db.attendance.findMany({
    where: { studentId: student.id },
    orderBy: { date: 'desc' },
    take: 30,
  })

  const totalPresent = attendanceRecords.filter((a) => a.status === 'PRESENT').length
  const totalAbsent = attendanceRecords.filter((a) => a.status === 'ABSENT').length
  const totalLate = attendanceRecords.filter((a) => a.status === 'LATE').length
  const total = attendanceRecords.length
  const percentage = total > 0 ? Math.round((totalPresent / total) * 100) : 0

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
            <h1>📅 My Attendance</h1>
            <p className="text-secondary text-sm mt-1">View your attendance history and statistics.</p>
          </div>
          <Link href="/student/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--accent-1)' }}>{percentage}%</div>
            <div className="stat-label">Attendance Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalPresent}</div>
            <div className="stat-label">Days Present</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalAbsent}</div>
            <div className="stat-label">Days Absent</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalLate}</div>
            <div className="stat-label">Days Late</div>
          </div>
        </div>

        {/* Attendance Records */}
        {attendanceRecords.length === 0 ? (
          <div className="card text-center animate-in" style={{ padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No attendance records yet</h3>
            <p className="text-muted text-sm">Your attendance will appear here once your teacher marks it.</p>
          </div>
        ) : (
          <div className="card animate-in" style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.9rem' }}>
                      {new Date(record.date).toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${record.status === 'PRESENT' ? 'badge-active' : record.status === 'LATE' ? 'badge-active' : 'badge-inactive'}`}
                        style={record.status === 'LATE' ? { background: '#f59e0b22', color: '#f59e0b', border: '1px solid #f59e0b44' } : {}}>
                        {record.status === 'PRESENT' ? '✓ Present' : record.status === 'ABSENT' ? '✗ Absent' : '⏰ Late'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {record.remarks || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
