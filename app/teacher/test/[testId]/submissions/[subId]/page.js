import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTeacherSession } from '@/lib/session'
import db from '@/lib/db'
import { logoutTeacher } from '@/actions/auth-redirect'
import { toggleSubmissionPublish } from '@/actions/publish'

export const metadata = { title: 'Student Submission — TestFlow' }

const OPTION_KEYS = ['A', 'B', 'C', 'D']

export default async function SubmissionDetailPage({ params }) {
  const session = await getTeacherSession()
  const p = await params

  const submission = await db.submission.findFirst({
    where: { id: p.subId },
    include: {
      test: true,
      answers: {
        include: { question: true },
        orderBy: { question: { order: 'asc' } },
      },
    },
  })

  if (!submission || submission.test.teacherId !== session.teacher.id) notFound()

  const pct = submission.maxScore > 0
    ? Math.round((submission.totalScore / submission.maxScore) * 100)
    : 0

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/teacher/dashboard" className="navbar-brand">TestFlow</Link>
          <div className="navbar-actions">
            <Link href={`/teacher/test/${submission.testId}/submissions`} className="btn btn-secondary btn-sm">← Submissions</Link>
            <form action={logoutTeacher}>
              <button type="submit" className="btn btn-secondary btn-sm">Logout</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container-sm" style={{ paddingTop: '2rem' }}>
        {/* Student Header */}
        <div className="card mb-4 animate-in">
          <div className="flex-between mb-3">
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{submission.studentName}</h2>
              <p className="text-muted text-sm">Roll/ID: {submission.studentRoll}</p>
              <p className="text-muted text-sm">
                Submitted: {new Date(submission.submittedAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="stat-value" style={{ fontSize: '2.5rem' }}>{submission.totalScore}/{submission.maxScore}</div>
              <div className="stat-label">{pct}%</div>
            </div>
          </div>

          <form action={async () => { 'use server'; await toggleSubmissionPublish(p.subId) }}>
            <button type="submit" className={`btn btn-sm ${submission.isPublished ? 'btn-danger' : 'btn-success'}`}>
              {submission.isPublished ? '🔒 Unpublish Result' : '📢 Publish Result'}
            </button>
          </form>
        </div>

        {/* Answers */}
        <h3 className="mb-3">Answer Breakdown</h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {submission.answers.map((answer, idx) => {
            const q = answer.question
            return (
              <div key={answer.id} className="card card-sm" style={{
                borderColor: answer.isCorrect ? 'rgba(34,211,160,0.3)' : 'rgba(248,113,113,0.25)',
                background: answer.isCorrect ? 'rgba(34,211,160,0.04)' : 'rgba(248,113,113,0.04)',
              }}>
                <div className="flex-between mb-2">
                  <div className="flex-gap">
                    <span className="text-muted text-sm">Q{idx + 1}</span>
                    <span className={`badge ${q.type === 'MCQ' ? 'badge-mcq' : 'badge-num'}`}>{q.type}</span>
                    <span style={{ fontSize: '1.1rem' }}>{answer.isCorrect ? '✅' : '❌'}</span>
                  </div>
                  <span className={`text-sm font-700 ${answer.isCorrect ? 'text-success' : 'text-danger'}`} style={{ fontWeight: 700 }}>
                    {answer.marksAwarded}/{q.marks} mark{q.marks !== 1 ? 's' : ''}
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{q.text}</p>

                {q.type === 'MCQ' && q.options && (
                  <div className="flex-gap">
                    {q.options.map((opt, i) => {
                      const isCorrect = String(i) === q.correctAnswer
                      const isStudentAnswer = answer.studentAnswer === String(i)
                      return (
                        <span key={i} style={{
                          fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px',
                          background: isCorrect ? 'rgba(34,211,160,0.15)' : isStudentAnswer ? 'rgba(248,113,113,0.12)' : 'rgba(255,255,255,0.04)',
                          color: isCorrect ? 'var(--success)' : isStudentAnswer ? 'var(--danger)' : 'var(--text-muted)',
                          border: '1px solid',
                          borderColor: isCorrect ? 'rgba(34,211,160,0.3)' : isStudentAnswer ? 'rgba(248,113,113,0.3)' : 'var(--border)',
                          fontWeight: (isCorrect || isStudentAnswer) ? '700' : '400',
                        }}>
                          {OPTION_KEYS[i]}. {opt} {isCorrect ? '✓' : ''}{isStudentAnswer && !isCorrect ? '✗' : ''}
                        </span>
                      )
                    })}
                  </div>
                )}

                {q.type === 'NUMERICAL' && (
                  <div className="flex-gap text-sm">
                    <span>Student answered: <strong style={{ color: answer.isCorrect ? 'var(--success)' : 'var(--danger)' }}>{answer.studentAnswer || '(blank)'}</strong></span>
                    <span className="text-muted">|</span>
                    <span>Correct: <strong style={{ color: 'var(--success)' }}>{q.correctAnswer}{q.tolerance ? ` ±${q.tolerance}` : ''}</strong></span>
                  </div>
                )}

                {q.explanation && (
                  <p className="text-xs text-muted mt-2" style={{ fontStyle: 'italic' }}>💡 {q.explanation}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
