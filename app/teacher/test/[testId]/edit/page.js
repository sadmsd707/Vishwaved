import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTeacherSession } from '@/lib/session'
import db from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'
import EditTestClient from './EditTestClient'

export const metadata = { title: 'Edit Test — VishwaVed Academy' }

export default async function EditTestPage({ params }) {
  const session = await getTeacherSession()
  const p = await params

  const test = await db.test.findFirst({
    where: { id: p.testId, teacherId: session.teacher.id },
  })
  if (!test) notFound()

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

      <div className="container-sm" style={{ paddingTop: '2.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Edit Test Settings</h1>
        <p className="text-secondary text-sm mb-4">{test.title}</p>
        <EditTestClient test={test} />
      </div>
    </div>
  )
}
