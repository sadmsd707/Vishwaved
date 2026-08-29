import Link from 'next/link'
import { getTeacherSession } from '@/lib/session'
import { logoutTeacher } from '@/actions/auth-redirect'
import db, { sql } from '@/lib/db'
import TeacherNav from '@/app/components/TeacherNav'
import AttendanceSheet from './AttendanceSheet'

export const metadata = { title: 'Attendance — VishwaVed Academy' }

export default async function AttendancePage({ searchParams }) {
  const session = await getTeacherSession()
  const teacher = session.teacher

  const sp = await searchParams
  const todayStr = new Date().toISOString().split('T')[0]
  const selectedDate = sp?.date || todayStr
  const selectedClass = sp?.class || ''

  // Get all students for this teacher
  const allStudents = await db.student.findMany({
    where: { teacherId: teacher.id },
    orderBy: { firstName: 'asc' },
  })

  // Extract distinct classes
  const classes = [...new Set(allStudents.map((s) => s.class))].sort()

  // Get existing attendance records for the selected date
  const dateObj = new Date(selectedDate)
  const existingAttendance = await sql`
    SELECT "student_id", "status", "remarks"
    FROM "Attendance"
    WHERE "teacher_id" = ${teacher.id} AND "date" = ${dateObj}
  `

  const initialAttendanceMap = {}
  for (const row of existingAttendance) {
    initialAttendanceMap[row.student_id] = {
      status: row.status,
      remarks: row.remarks || '',
    }
  }

  return (
    <div className="page">
      {/* Navbar */}
      <TeacherNav teacherName={teacher.name} logoutAction={logoutTeacher} />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>📅 Daily Attendance</h1>
            <p className="text-secondary text-sm mt-1">
              Mark and track student attendance class-wise for any date.
            </p>
          </div>
          <div className="flex-gap">
            <Link href="/teacher/students" className="btn btn-secondary btn-sm">
              👨‍🎓 Manage Students
            </Link>
          </div>
        </div>

        {/* Interactive Sheet */}
        <AttendanceSheet
          students={allStudents}
          classes={classes}
          selectedClass={selectedClass}
          selectedDate={selectedDate}
          initialAttendanceMap={initialAttendanceMap}
        />
      </div>
    </div>
  )
}
