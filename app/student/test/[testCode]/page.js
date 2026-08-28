import { notFound, redirect } from 'next/navigation'
import db from '@/lib/db'
import TestForm from './TestForm'

export async function generateMetadata({ params }) {
  const p = await params
  const test = await db.test.findUnique({ where: { testCode: p.testCode } })
  return { title: test ? `${test.title} — TestFlow` : 'Test — TestFlow' }
}

export default async function TakeTestPage({ params, searchParams }) {
  const p = await params
  const sp = await searchParams

  const studentName = sp.name?.toString().trim()
  const studentRoll = sp.roll?.toString().trim()

  if (!studentName || !studentRoll) {
    redirect('/student')
  }

  // Fetch test — NEVER include correctAnswer or explanation in this query
  const test = await db.test.findUnique({
    where: { testCode: p.testCode },
    select: {
      id: true,
      title: true,
      description: true,
      timeLimit: true,
      startAt: true,
      endAt: true,
      isActive: true,
      maxAttempts: true,
      displayMode: true,
      testCode: true,
      questions: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          type: true,
          text: true,
          options: true,
          marks: true,
          order: true,
          // ⛔ correctAnswer, explanation are NOT selected — never sent to browser
        },
      },
    },
  })

  if (!test || !test.isActive) notFound()

  const now = new Date()
  if (test.startAt && now < new Date(test.startAt)) {
    return (
      <div className="page-center">
        <div className="card text-center" style={{ maxWidth: '400px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⏰</div>
          <h2>Test Not Started</h2>
          <p className="text-muted mt-2">This test opens on {new Date(test.startAt).toLocaleString()}.</p>
        </div>
      </div>
    )
  }
  if (test.endAt && now > new Date(test.endAt)) {
    return (
      <div className="page-center">
        <div className="card text-center" style={{ maxWidth: '400px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⌛</div>
          <h2>Test Ended</h2>
          <p className="text-muted mt-2">This test has closed.</p>
        </div>
      </div>
    )
  }

  const attempts = await db.submission.count({
    where: { testId: test.id, studentRoll: studentRoll.toLowerCase() },
  })
  if (attempts >= test.maxAttempts) {
    return (
      <div className="page-center">
        <div className="card text-center" style={{ maxWidth: '400px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚫</div>
          <h2>Already Submitted</h2>
          <p className="text-muted mt-2">You have already submitted this test.</p>
        </div>
      </div>
    )
  }

  return (
    <TestForm
      test={test}
      studentName={studentName}
      studentRoll={studentRoll}
    />
  )
}
