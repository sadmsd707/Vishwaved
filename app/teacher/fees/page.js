import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import TeacherNav from '@/app/components/TeacherNav'
import { logoutTeacher } from '@/actions/auth-redirect'

export const metadata = { title: 'Fees Management — VishwaVed Academy' }

export default async function FeesPage() {
  const session = await getTeacherSession()
  const teacher = session.teacher

  return (
    <div className="page">
      <TeacherNav teacherName={teacher.name} logoutAction={logoutTeacher} />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>💰 Fees Management</h1>
            <p className="text-secondary text-sm mt-1">Track and manage student fee records.</p>
          </div>
          <Link href="/teacher/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>

        {/* Coming Soon Card */}
        <div className="card text-center animate-in" style={{ padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💰</div>
          <h2 style={{ marginBottom: '0.75rem' }}>Fees Module Coming Soon</h2>
          <p className="text-muted" style={{ maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            You&apos;ll be able to track student fee payments, generate receipts, send reminders, and view payment history — all from this page.
          </p>
          <div className="stats-grid" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="stat-card">
              <div className="stat-value">—</div>
              <div className="stat-label">Total Collected</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">—</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">—</div>
              <div className="stat-label">Overdue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
