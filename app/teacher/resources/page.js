import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import TeacherNav from '@/app/components/TeacherNav'
import { logoutTeacher } from '@/actions/auth-redirect'

export const metadata = { title: 'Resources — VishwaVed Academy' }

export default async function ResourcesPage() {
  const session = await getTeacherSession()
  const teacher = session.teacher

  return (
    <div className="page">
      <TeacherNav teacherName={teacher.name} logoutAction={logoutTeacher} />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>📚 Resources</h1>
            <p className="text-secondary text-sm mt-1">Upload and manage study materials for your students.</p>
          </div>
          <Link href="/teacher/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>

        {/* Coming Soon Card */}
        <div className="card text-center animate-in" style={{ padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
          <h2 style={{ marginBottom: '0.75rem' }}>Resources Module Coming Soon</h2>
          <p className="text-muted" style={{ maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            Share notes, PDFs, videos, and other study materials with your students. Organize resources by class and subject.
          </p>
          <div className="stats-grid" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="stat-card">
              <div className="stat-value">—</div>
              <div className="stat-label">Files Uploaded</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">—</div>
              <div className="stat-label">Subjects</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">—</div>
              <div className="stat-label">Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
