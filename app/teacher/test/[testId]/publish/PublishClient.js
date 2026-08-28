'use client'
import { useState } from 'react'
import Link from 'next/link'
import { publishAll, unpublishAll, publishSelected, updateShowSettings } from '@/actions/publish'

export default function PublishClient({ test, submissions }) {
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  const allPublished = submissions.length > 0 && submissions.every(s => s.isPublished)
  const nonePublished = submissions.every(s => !s.isPublished)

  function toggleSelect(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  async function handlePublishAll() {
    setLoading(true)
    await publishAll(test.id)
    setMsg('✅ All results published.')
    setLoading(false)
  }

  async function handleUnpublishAll() {
    setLoading(true)
    await unpublishAll(test.id)
    setMsg('🔒 All results unpublished.')
    setLoading(false)
  }

  async function handlePublishSelected() {
    if (selected.length === 0) return setMsg('⚠️ Select at least one student.')
    setLoading(true)
    await publishSelected(test.id, selected)
    setMsg(`✅ Published results for ${selected.length} student(s).`)
    setSelected([])
    setLoading(false)
  }

  return (
    <div>
      {msg && <div className="alert alert-success mb-3">{msg}</div>}

      {/* Visibility Settings */}
      <div className="card mb-4">
        <h3 className="mb-3">Result Visibility Settings</h3>
        <form action={updateShowSettings.bind(null, test.id)}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" name="showAnswers" defaultChecked={test.showAnswers}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-1)' }} />
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Show Correct Answers</div>
                <div className="text-xs text-muted">Students can see correct answers after results are published.</div>
              </div>
            </label>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" name="showPerQuestion" defaultChecked={test.showPerQuestion}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-1)' }} />
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Show Per-Question Breakdown</div>
                <div className="text-xs text-muted">Students can see marks for each question.</div>
              </div>
            </label>
          </div>
          <button type="submit" className="btn btn-secondary btn-sm">Save Settings</button>
        </form>
      </div>

      {/* Bulk Actions */}
      <div className="card mb-4">
        <h3 className="mb-3">Bulk Publish</h3>
        <div className="flex-gap">
          <button onClick={handlePublishAll} className="btn btn-success" disabled={loading || allPublished}>
            📢 Publish All Results
          </button>
          <button onClick={handleUnpublishAll} className="btn btn-danger" disabled={loading || nonePublished}>
            🔒 Unpublish All
          </button>
        </div>
      </div>

      {/* Per-Student */}
      {submissions.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
          <h3>No submissions yet</h3>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Individual Students</h3>
            <button onClick={handlePublishSelected} className="btn btn-primary btn-sm" disabled={loading || selected.length === 0}>
              Publish Selected ({selected.length})
            </button>
          </div>
          <div className="table-wrap" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" onChange={(e) => setSelected(e.target.checked ? submissions.map(s => s.id) : [])}
                      style={{ accentColor: 'var(--accent-1)' }} />
                  </th>
                  <th>Student</th>
                  <th>Roll</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => {
                  const pct = sub.maxScore > 0 ? Math.round((sub.totalScore / sub.maxScore) * 100) : 0
                  return (
                    <tr key={sub.id}>
                      <td>
                        <input type="checkbox" checked={selected.includes(sub.id)} onChange={() => toggleSelect(sub.id)}
                          style={{ accentColor: 'var(--accent-1)' }} />
                      </td>
                      <td style={{ fontWeight: '600' }}>{sub.studentName}</td>
                      <td className="text-muted">{sub.studentRoll}</td>
                      <td style={{ fontWeight: '700', color: pct >= 75 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                        {sub.totalScore}/{sub.maxScore} ({pct}%)
                      </td>
                      <td>
                        <span className={`badge ${sub.isPublished ? 'badge-active' : 'badge-info'}`}>
                          {sub.isPublished ? 'Published' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
