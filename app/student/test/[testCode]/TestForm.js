'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { submitTest } from '@/actions/submission'

const OPTION_KEYS = ['A', 'B', 'C', 'D']

export default function TestForm({ test, studentName, studentRoll }) {
  const [answers, setAnswers] = useState({})
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(test.timeLimit ? test.timeLimit * 60 : null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)
  const totalTime = test.timeLimit ? test.timeLimit * 60 : null

  const handleSubmit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    setError(null)
    const fd = new FormData()
    fd.set('studentName', studentName)
    fd.set('studentRoll', studentRoll)
    for (const [qId, ans] of Object.entries(answers)) {
      fd.set(`q_${qId}`, ans)
    }
    try {
      const result = await submitTest(test.testCode, fd)
      if (result?.errors) {
        setError(result.errors.general || 'Submission failed. Please try again.')
        setSubmitting(false)
      } else if (result?.redirectTo) {
        window.location.href = result.redirectTo
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }, [submitting, answers, studentName, studentRoll, test.testCode])

  // Countdown timer
  useEffect(() => {
    if (!timeLeft) return
    if (timeLeft <= 0) { handleSubmit(); return }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timeLeft, handleSubmit])

  function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const timerPct = totalTime ? (timeLeft / totalTime) * 100 : 100
  const timerClass = timeLeft !== null
    ? (timeLeft < 60 ? 'danger' : timeLeft < (totalTime * 0.15) ? 'warning' : '')
    : ''

  const questions = test.questions
  const oneByOne = test.displayMode === 'ONE_BY_ONE'
  const answeredCount = Object.keys(answers).length

  function setAnswer(qId, val) {
    setAnswers(prev => ({ ...prev, [qId]: val }))
  }

  function renderQuestion(q, idx) {
    return (
      <div key={q.id} className="card animate-in" style={{ marginBottom: oneByOne ? 0 : '1.25rem' }}>
        <div className="flex-between mb-3">
          <div className="flex-gap">
            <span className="text-muted text-sm">Q{idx + 1} of {questions.length}</span>
            <span className={`badge ${q.type === 'MCQ' ? 'badge-mcq' : 'badge-num'}`}>{q.type}</span>
            <span className="text-xs text-muted">{q.marks} mark{q.marks !== 1 ? 's' : ''}</span>
          </div>
          {answers[q.id] !== undefined && answers[q.id] !== '' && (
            <span className="badge badge-active">✓ Answered</span>
          )}
        </div>

        <p style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.5' }}>
          {q.text}
        </p>

        {q.type === 'MCQ' && q.options && (
          <div className="options-grid">
            {q.options.map((opt, i) => (
              <label key={i} className={`option-label ${answers[q.id] === String(i) ? 'selected' : ''}`}
                onClick={() => setAnswer(q.id, String(i))}>
                <input type="radio" name={`q_${q.id}`} value={i} onChange={() => {}} checked={answers[q.id] === String(i)} />
                <span className="option-key">{OPTION_KEYS[i]}</span>
                <span className="option-text">{opt}</span>
              </label>
            ))}
          </div>
        )}

        {q.type === 'NUMERICAL' && (
          <div>
            <input
              type="number"
              step="any"
              className="form-input"
              placeholder="Enter your numerical answer…"
              value={answers[q.id] ?? ''}
              onChange={(e) => setAnswer(q.id, e.target.value)}
              style={{ fontSize: '1.1rem', fontWeight: '600' }}
            />
            <div className="form-hint">Enter a numerical value. Decimals are allowed.</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="page" style={{ paddingBottom: '6rem' }}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div>
            <div className="navbar-brand">VishwaVed Academy</div>
            <div className="text-xs text-muted" style={{ marginTop: '0.1rem' }}>{test.title}</div>
          </div>
          <div className="flex-gap">
            <span className="text-sm text-muted">👤 {studentName}</span>
            <span className="badge badge-info">{answeredCount}/{questions.length} answered</span>
          </div>
        </div>
      </nav>

      {/* Timer */}
      {timeLeft !== null && (
        <div className="timer-container">
          <div className="timer-card">
            <div className="timer-label">Time Left</div>
            <div className={`timer-value ${timerClass}`}>{formatTime(timeLeft)}</div>
            <div className="timer-bar">
              <div className="timer-bar-fill" style={{
                width: `${timerPct}%`,
                background: timerPct < 15 ? 'var(--danger)' : timerPct < 30 ? 'var(--warning)' : 'var(--accent-grad)',
              }} />
            </div>
          </div>
        </div>
      )}

      <div className="container-sm" style={{ paddingTop: '2rem' }}>
        {/* Test Info */}
        {test.description && (
          <div className="alert alert-info mb-3">📋 {test.description}</div>
        )}

        {error && <div className="alert alert-error">{error}</div>}

        {/* One-by-one navigation */}
        {oneByOne && (
          <>
            {/* Question navigator dots */}
            <div className="q-nav mb-3">
              {questions.map((q, i) => (
                <button key={q.id} type="button"
                  className={`q-nav-btn ${i === currentQ ? 'current' : answers[q.id] ? 'answered' : ''}`}
                  onClick={() => setCurrentQ(i)}>
                  {i + 1}
                </button>
              ))}
            </div>

            {renderQuestion(questions[currentQ], currentQ)}

            <div className="flex-between mt-3">
              <button type="button" className="btn btn-secondary"
                onClick={() => setCurrentQ(c => Math.max(0, c - 1))}
                disabled={currentQ === 0}>
                ← Previous
              </button>
              {currentQ < questions.length - 1 ? (
                <button type="button" className="btn btn-primary"
                  onClick={() => setCurrentQ(c => Math.min(questions.length - 1, c + 1))}>
                  Next →
                </button>
              ) : (
                <button type="button" className="btn btn-success"
                  onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting…' : '✓ Submit Test'}
                </button>
              )}
            </div>
          </>
        )}

        {/* All questions at once */}
        {!oneByOne && (
          <>
            {questions.map((q, idx) => renderQuestion(q, idx))}
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(8,12,24,0.9)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
              <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-sm text-muted">{answeredCount}/{questions.length} questions answered</span>
                <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting…' : '✓ Submit Test'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
