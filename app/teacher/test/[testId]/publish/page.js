import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTeacherSession } from '@/lib/session'
import db from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'
import PublishClient from './PublishClient'

export const metadata = { title: 'Publish Results — VishwaVed Academy' }

export default async function PublishPage({ params }) {
  const session = await getTeacherSession()
  const p = await params

  const test = await db.test.findFirst({
    where: { id: p.testId, teacherId: session.teacher.id },
  })
  if (!test) notFound()

  const submissions = await db.submission.findMany({
    where: { testId: test.id },
    orderBy: { studentName: 'asc' },
  })

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/teacher/dashboard" className="navbar-brand">VishwaVed Academy</Link>
          <div className="navbar-actions">
            <Link href={`/teacher/test/${test.id}`} className="btn btn-secondary btn-sm">← Test Overview</Link>
            <form action={logoutTeacher}>
              <button type="submit" className="btn btn-secondary btn-sm">Logout</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="flex-between mb-4">
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Publish Results — {test.title}</h1>
            <p className="text-secondary text-sm mt-1">
              Control which students can see their results. Results are hidden by default.
            </p>
          </div>
          <span className="test-code" style={{ fontSize: '0.85rem', padding: '0.25rem 0.8rem' }}>{test.testCode}</span>
        </div>

        <PublishClient test={test} submissions={submissions} />
      </div>
    </div>
  )
}
