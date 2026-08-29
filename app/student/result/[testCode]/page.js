import Link from 'next/link'
import { notFound } from 'next/navigation'
import db from '@/lib/db'
import { getStudentSession } from '@/lib/session'

export const metadata = { title: 'Your Result — VishwaVed Academy' }

const OPTION_KEYS = ['A', 'B', 'C', 'D']

export default async function ResultPage({ params, searchParams }) {
  const p = await params
  const sp = await searchParams
  const session = await getStudentSession()

  const studentName = sp.name?.toString().trim() || session?.student?.name
  const studentRoll = sp.roll?.toString().trim() || sp.studentId?.toString().trim() || session?.student?.id

  if (!studentName || !studentRoll) {
    return (
      <div className="page-center">
        <div className="card text-center" style={{ maxWidth: '420px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚠️</div>
          <h2>Missing Details</h2>
          <p className="text-muted mt-2">Please login to view your test results.</p>
          <Link href="/student" className="btn btn-primary mt-3">Back to Student Login</Link>
        </div>
      </div>
    )
  }

  const test = await db.test.findUnique({
    where: { testCode: p.testCode },
    select: { id: true, title: true, showAnswers: true, showPerQuestion: true, testCode: true },
  })
  if (!test) notFound()

  const submission = await db.submission.findFirst({
    where: {
      testId: test.id,
      studentRoll: studentRoll.toLowerCase(),
    },
    include: {
      answers: {
        include: {
          question: {
            select: {
              id: true, type: true, text: true, options: true, marks: true, order: true,
              correctAnswer: true,
              explanation: true,
            },
          },
        },
        orderBy: { question: { order: 'asc' } },
      },
    },
    orderBy: { submittedAt: 'desc' },
  })

  if (!submission) {
    return (
      <div className="page-center">
        <div className="card text-center" style={{ maxWidth: '420px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
          <h2>No Submission Found</h2>
          <p className="text-muted mt-2">We couldn&apos;t find a submission for <strong>{studentName}</strong> with roll <strong>{studentRoll}</strong> on this test.</p>
          <Link href="/student" className="btn btn-secondary mt-3">Try Again</Link>
        </div>
      </div>
    )
  }

  if (!submission.isPublished) {
    return (
      <div className="page-center">
        <div className="card text-center" style={{ maxWidth: '420px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⏳</div>
          <h2>Results Not Published Yet</h2>
          <p className="text-muted mt-2">Your teacher hasn&apos;t published results for this test yet. Please check back later.</p>
          <Link href="/student" className="btn btn-secondary mt-3">Back to Portal</Link>
        </div>
      </div>
    )
  }

  const pct = submission.maxScore > 0
    ? Math.round((submission.totalScore / submission.maxScore) * 100)
    : 0

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference * (1 - pct / 100)

  return (
    <div className="page">
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="navbar-brand">VishwaVed Academy</Link>
          <Link href="/student" className="btn btn-secondary btn-sm">Back to Portal</Link>
        </div>
      </nav>

      <div className="container-sm" style={{ paddingTop: '2rem' }}>
        <div className="text-center mb-2">
          <p className="text-muted text-sm">Result for</p>
          <h1 style={{ fontSize: '1.5rem' }}>{test.title}</h1>
          <p className="text-secondary text-sm mt-1">👤 {studentName} · Roll: {studentRoll}</p>
        </div>

        {/* Score Ring */}
        <div className="card animate-in mb-4" style={{ textAlign: 'center' }}>
          <div className="score-ring-wrap">
            <div className="score-ring">
              <svg width="160" height="160" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <circle className="score-ring-bg" cx="60" cy="60" r="54" />
                <circle className="score-ring-fill" cx="60" cy="60" r="54"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset} />
              </svg>
              <div className="score-ring-text">
                <div className="score-ring-pct">{pct}%</div>
                <div className="score-ring-sub">{submission.totalScore}/{submission.maxScore}</div>
              </div>
            </div>
          </div>

          <h2 style={{ margin: '0 0 0.25rem' }}>
            {pct >= 90 ? '🏆 Excellent!' : pct >= 75 ? '⭐ Great Job!' : pct >= 50 ? '👍 Good Effort' : '💪 Keep Practicing'}
          </h2>
          <p className="text-secondary text-sm">
            Submitted on {new Date(submission.submittedAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}
          </p>
        </div>

        {/* Per-question breakdown */}
        {test.showPerQuestion && submission.answers.length > 0 && (
          <>
            <h3 className="mb-3">Question Breakdown</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {submission.answers.map((ans, idx) => {
                const q = ans.question
                return (
                  <div key={ans.id} className="result-q-card">
                    <div className="result-q-header">
                      <span className="result-q-icon">{ans.isCorrect ? '✅' : '❌'}</span>
                      <span className="result-q-text">Q{idx + 1}. {q.text}</span>
                      <span className={`result-q-marks ${ans.isCorrect ? 'correct' : 'wrong'}`}>
                        {ans.marksAwarded}/{q.marks}
                      </span>
                    </div>
                    {test.showAnswers && (
                      <div className="result-q-body">
                        {q.type === 'MCQ' && q.options && (
                          <div className="flex-gap" style={{ flexWrap: 'wrap' }}>
                            {q.options.map((opt, i) => {
                              const isCor = String(i) === q.correctAnswer
                              const isStu = ans.studentAnswer === String(i)
                              return (
                                <span key={i} style={{
                                  fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: '5px',
                                  background: isCor ? 'rgba(34,211,160,0.15)' : isStu ? 'rgba(248,113,113,0.12)' : 'rgba(255,255,255,0.04)',
                                  color: isCor ? 'var(--success)' : isStu ? 'var(--danger)' : 'var(--text-muted)',
                                  border: '1px solid', borderColor: isCor ? 'rgba(34,211,160,0.3)' : isStu ? 'rgba(248,113,113,0.3)' : 'var(--border)',
                                  fontWeight: (isCor || isStu) ? '700' : '400',
                                }}>
                                  {OPTION_KEYS[i]}. {opt} {isCor ? '✓' : ''}
                                </span>
                              )
                            })}
                          </div>
                        )}
                        {q.type === 'NUMERICAL' && (
                          <div className="flex-gap text-sm">
                            <span>Your answer: <strong style={{ color: ans.isCorrect ? 'var(--success)' : 'var(--danger)' }}>{ans.studentAnswer || '(blank)'}</strong></span>
                            <span className="text-muted">·</span>
                            <span>Correct: <strong style={{ color: 'var(--success)' }}>{q.correctAnswer}</strong></span>
                          </div>
                        )}
                        {q.explanation && (
                          <p className="text-xs text-muted mt-2" style={{ fontStyle: 'italic' }}>💡 {q.explanation}</p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}

        <div className="text-center mt-4">
          <Link href={session?.student ? "/student/dashboard" : "/student"} className="btn btn-secondary">
            {session?.student ? "← Back to Dashboard" : "Back to Student Login"}
          </Link>
        </div>
      </div>
    </div>
  )
}
