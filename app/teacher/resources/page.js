import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import TeacherNav from '@/app/components/TeacherNav'
import { logoutTeacher } from '@/actions/auth-redirect'
import { getTeacherResources } from '@/actions/resources'
import db from '@/lib/db'
import ResourcesManager from './ResourcesManager'

export const metadata = { title: 'Resources — VishwaVed Academy' }

export default async function ResourcesPage() {
  const session = await getTeacherSession()
  const teacher = session.teacher

  // Fetch resources
  const resources = await getTeacherResources()

  // Get distinct classes from students for the class filter
  const allStudents = await db.student.findMany({
    where: { teacherId: teacher.id },
  })
  const classes = [...new Set(allStudents.map((s) => s.class))].sort()

  return (
    <div className="page">
      <TeacherNav teacherName={teacher.name} logoutAction={logoutTeacher} />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>📚 Resources</h1>
            <p className="text-secondary text-sm mt-1">Share notes, PDFs, videos and links with your students.</p>
          </div>
          <Link href="/teacher/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>

        {/* Interactive Manager */}
        <ResourcesManager initialResources={resources} classes={classes} />
      </div>
    </div>
  )
}
