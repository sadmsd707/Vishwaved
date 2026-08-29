import { redirect, notFound } from 'next/navigation'
import { getStudentSessionRequired } from '@/lib/session'
import db from '@/lib/db'

export default async function StartTestPage({ searchParams }) {
  const session = await getStudentSessionRequired()
  const student = session.student
  const sp = await searchParams
  const testCode = sp?.code?.toString().trim().toUpperCase()

  if (!testCode) redirect('/student/dashboard')

  const test = await db.test.findUnique({ where: { testCode } })
  if (!test) redirect('/student/dashboard')
  if (!test.isActive) redirect('/student/dashboard')

  // Check max attempts
  const existingCount = await db.submission.count({
    where: { testId: test.id, studentRoll: student.id.toLowerCase() },
  })
  if (existingCount >= test.maxAttempts) redirect('/student/dashboard')

  // Redirect to test page with student info from session
  redirect(`/student/test/${testCode}?name=${encodeURIComponent(student.name)}&roll=${encodeURIComponent(student.id)}`)
}
