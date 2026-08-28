'use client'
import { useState } from 'react'
import Link from 'next/link'
import { addQuestion, deleteQuestion } from '@/actions/questions'

const OPTION_KEYS = ['A', 'B', 'C', 'D']

export default function QuestionsClient({ testId, questions }) {
  const [qType, setQType] = useState('MCQ')
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    setLoading(true)
    setFormErrors({})
    setSuccess(false)
    const fd = new FormData(e.target)
    fd.set('type', qType)
    const result = await addQuestion(testId, fd)
    setLoading(false)
    if (result?.errors) setFormErrors(result.errors)
    if (result?.success) {
      setSuccess(true)
      e.target.reset()
    }
  }

  async function handleDelete(qId) {
    if (!confirm('Delete this question?')) return
    await deleteQuestion(qId)
  }

  return (
    <div>
      {/* Existing Questions */}
      <div className="card mb-4">
        <div className="section-header">
          <div className="section-title">Questions ({questions.length})</div>
        </div>

        {questions.length === 0 ? (
          <div className="empty-state" style={{ padding: '2rem' }}>
            <div className="empty-icon">❓</div>
            <div className="empty-title">No questions yet</div>
            <p className="text-sm text-muted">Add your first question below.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {questions.map((q, idx) => (
              <div key={q.id} style={{
                padding: '1rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
              }}>
                <div className="flex-between">
                  <div style={{ flex: 1 }}>
                    <div className="flex-gap mb-1">
                      <span className="text-muted text-sm">Q{idx + 1}</span>
                      <span className={`badge ${q.type === 'MCQ' ? 'badge-mcq' : 'badge-num'}`}>{q.type}</span>
                      <span className="text-sm text-muted">{q.marks} mark{q.marks !== 1 ? 's' : ''}</span>
                    </div>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', margin: 0 }}>{q.text}</p>
                    {q.type === 'MCQ' && q.options && (
                      <div className="mt-1 flex-gap">
                        {q.options.map((opt, i) => (
                          <span key={i} style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            background: parseInt(q.correctAnswer) === i ? 'rgba(34,211,160,0.15)' : 'rgba(255,255,255,0.04)',
                            color: parseInt(q.correctAnswer) === i ? 'var(--success)' : 'var(--text-muted)',
                            border: '1px solid',
                            borderColor: parseInt(q.correctAnswer) === i ? 'rgba(34,211,160,0.3)' : 'var(--border)',
                          }}>
                            {OPTION_KEYS[i]}. {opt}
                          </span>
                        ))}
                      </div>
                    )}
                    {q.type === 'NUMERICAL' && (
                      <span className="text-xs text-muted mt-1 block">
                        Answer: <strong style={{ color: 'var(--success)' }}>{q.correctAnswer}</strong>
                        {q.tolerance ? ` ±${q.tolerance}` : ' (exact)'}
                      </span>
                    )}
                  </div>
                  <button onClick={() => handleDelete(q.id)} className="btn btn-danger btn-sm" style={{ flexShrink: 0 }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Question Form */}
      <div className="card">
        <h3 className="mb-3">Add Question</h3>

        <div className="type-toggle">
          <button type="button" className={`type-toggle-btn ${qType === 'MCQ' ? 'active' : ''}`} onClick={() => setQType('MCQ')}>
            📋 Multiple Choice (MCQ)
          </button>
          <button type="button" className={`type-toggle-btn ${qType === 'NUMERICAL' ? 'active' : ''}`} onClick={() => setQType('NUMERICAL')}>
            🔢 Numerical
          </button>
        </div>

        {success && <div className="alert alert-success">✅ Question added successfully!</div>}
        {formErrors.general && <div className="alert alert-error">{formErrors.general}</div>}

        <form onSubmit={handleAdd}>
          <div className="form-group">
            <label className="form-label">Question Text *</label>
            <textarea name="text" className="form-textarea" rows={2} placeholder="Enter the question..." required />
            {formErrors.text && <div className="form-error">{formErrors.text}</div>}
          </div>

          {qType === 'MCQ' && (
            <>
              <div className="form-group">
                <label className="form-label">Options *</label>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {['optA', 'optB', 'optC', 'optD'].map((name, i) => (
                    <div key={name} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{
                        width: '28px', height: '28px', borderRadius: '7px',
                        background: 'rgba(99,102,241,0.1)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-3)', flexShrink: 0,
                      }}>{OPTION_KEYS[i]}</span>
                      <input name={name} type="text" className="form-input" placeholder={`Option ${OPTION_KEYS[i]}`} required />
                    </div>
                  ))}
                </div>
                {formErrors.options && <div className="form-error">{formErrors.options}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Correct Answer *</label>
                <select name="correctAnswer" className="form-select" required>
                  <option value="">-- Select correct option --</option>
                  <option value="0">A</option>
                  <option value="1">B</option>
                  <option value="2">C</option>
                  <option value="3">D</option>
                </select>
                {formErrors.correctAnswer && <div className="form-error">{formErrors.correctAnswer}</div>}
              </div>
            </>
          )}

          {qType === 'NUMERICAL' && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Correct Answer *</label>
                <input name="correctAnswer" type="number" step="any" className="form-input" placeholder="e.g. 9.8" required />
                {formErrors.correctAnswer && <div className="form-error">{formErrors.correctAnswer}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Tolerance (±)</label>
                <input name="tolerance" type="number" step="any" min="0" className="form-input" placeholder="0 = exact match" />
                <div className="form-hint">Acceptable deviation from correct answer.</div>
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Marks *</label>
              <input name="marks" type="number" min="1" defaultValue="1" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Explanation (shown after result)</label>
              <input name="explanation" type="text" className="form-input" placeholder="Optional explanation..." />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding…' : '+ Add Question'}
          </button>
        </form>
      </div>
    </div>
  )
}
