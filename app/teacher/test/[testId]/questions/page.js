import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTeacherSession } from '@/lib/session'
import db from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'
import QuestionsClient from './QuestionsClient'

export const metadata = { title: 'Questions — VishwaVed Academy' }

export default async function QuestionsPage({ params }) {
  const session = await getTeacherSession()
  const p = await params

  const test = await db.test.findFirst({
    where: { id: p.testId, teacherId: session.teacher.id },
    include: {
      questions: { orderBy: { order: 'asc' } },
    },
  })
  if (!test) notFound()

  const totalMarks = test.questions.reduce((s, q) => s + q.marks, 0)

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
            <h1 style={{ fontSize: '1.5rem' }}>Questions — {test.title}</h1>
            <div className="flex-gap mt-1">
              <span className="text-sm text-muted">
                {test.questions.length} question{test.questions.length !== 1 ? 's' : ''}
              </span>
              <span className="text-sm text-muted">Total: {totalMarks} mark{totalMarks !== 1 ? 's' : ''}</span>
              <span className="test-code" style={{ fontSize: '0.8rem', padding: '0.15rem 0.6rem' }}>{test.testCode}</span>
            </div>
          </div>
        </div>

        <QuestionsClient testId={test.id} questions={test.questions} />
      </div>
    </div>
  )
}
