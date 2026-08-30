import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import { logoutTeacher } from '@/actions/auth-redirect'
import { getEnquiriesList } from '@/actions/enquiry'
import TeacherNav from '@/app/components/TeacherNav'
import EnquiriesManager from './EnquiriesManager'

export const metadata = { title: 'Admission Enquiries — VishwaVed Academy' }

export default async function EnquiriesPage() {
  const session = await getTeacherSession()
  const teacher = session.teacher

  const enquiries = await getEnquiriesList()

  return (
    <div className="page">
      {/* Navbar */}
      <TeacherNav teacherName={teacher.name} logoutAction={logoutTeacher} />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="flex-between mb-4" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>📬 Admission Enquiries</h1>
            <p className="text-secondary text-sm mt-1">
              Review and manage incoming admission and course inquiries from prospective students.
            </p>
          </div>
          <div className="flex-gap" style={{ flexWrap: 'wrap' }}>
            <Link href="/teacher/dashboard" className="btn btn-secondary btn-sm">
              📊 Dashboard
            </Link>
            <Link href="/teacher/students" className="btn btn-secondary btn-sm">
              👨‍🎓 Students
            </Link>
            <Link href="/teacher/attendance" className="btn btn-secondary btn-sm">
              📅 Attendance
            </Link>
          </div>
        </div>

        {/* Interactive Enquiries Management Component */}
        <EnquiriesManager initialEnquiries={enquiries} />
      </div>
    </div>
  )
}
