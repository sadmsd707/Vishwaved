'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  publishAll,
  unpublishAll,
  publishSelected,
  setPublishSchedule,
  clearPublishSchedule,
  updateShowSettings,
} from '@/actions/publish'

export default function PublishClient({ test, submissions }) {
  const [selected, setSelected] = useState([])
  const [isPending, startTransition] = useTransition()
  const [msg, setMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  // Local state for schedule input
  function toLocalDatetimeInput(d) {
    if (!d) return ''
    const dt = new Date(d)
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())
    return dt.toISOString().slice(0, 16)
  }

  const [scheduleTime, setScheduleTime] = useState(
    test.resultsPublishAt ? toLocalDatetimeInput(test.resultsPublishAt) : ''
  )

  const isScheduleActive =
    test.resultsPublishAt && new Date(test.resultsPublishAt) > new Date()
  const isSchedulePast =
    test.resultsPublishAt && new Date(test.resultsPublishAt) <= new Date()

  const allPublished =
    submissions.length > 0 && submissions.every((s) => s.isPublished)
  const isEffectivelyPublished = allPublished || isSchedulePast

  function notifySuccess(text) {
    setMsg(text)
    setErrorMsg(null)
    setTimeout(() => setMsg(null), 5000)
  }

  function notifyError(text) {
    setErrorMsg(text)
    setMsg(null)
  }

  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function handlePublishAll() {
    startTransition(async () => {
      const res = await publishAll(test.id)
      if (res?.success) {
        notifySuccess('✅ All results published immediately!')
      } else {
        notifyError(res?.errors?.general || 'Failed to publish results.')
      }
    })
  }

  function handleUnpublishAll() {
    if (!confirm('Are you sure you want to unpublish all results? Students will not be able to view them.')) return
    startTransition(async () => {
      const res = await unpublishAll(test.id)
      if (res?.success) {
        notifySuccess('🔒 All results unpublished and schedule cleared.')
        setScheduleTime('')
      } else {
        notifyError(res?.errors?.general || 'Failed to unpublish results.')
      }
    })
  }

  function handlePublishSelected() {
    if (selected.length === 0) {
      notifyError('⚠️ Please select at least one student.')
      return
    }
    startTransition(async () => {
      const res = await publishSelected(test.id, selected)
      if (res?.success) {
        notifySuccess(`✅ Published results for ${selected.length} selected student(s).`)
        setSelected([])
      } else {
        notifyError(res?.errors?.general || 'Failed to publish selected results.')
      }
    })
  }

  function handleSaveSchedule(e) {
    e.preventDefault()
    if (!scheduleTime) {
      notifyError('Please pick a date and time to schedule results.')
      return
    }
    const chosenDate = new Date(scheduleTime)
    if (isNaN(chosenDate.getTime())) {
      notifyError('Invalid date/time.')
      return
    }
    startTransition(async () => {
      const res = await setPublishSchedule(test.id, chosenDate.toISOString())
      if (res?.success) {
        notifySuccess(
          `⏰ Results scheduled to publish on ${chosenDate.toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}`
        )
      } else {
        notifyError(res?.errors?.general || 'Failed to set schedule.')
      }
    })
  }

  function handleClearSchedule() {
    startTransition(async () => {
      const res = await clearPublishSchedule(test.id)
      if (res?.success) {
        notifySuccess('Schedule cleared. Results will only publish when manually triggered.')
        setScheduleTime('')
      } else {
        notifyError(res?.errors?.general || 'Failed to clear schedule.')
      }
    })
  }

  // Quick schedule presets
  function applyPreset(minutesToAdd, setHour = null, addDays = 0) {
    const target = new Date()
    if (addDays > 0) {
      target.setDate(target.getDate() + addDays)
    }
    if (setHour !== null) {
      target.setHours(setHour, 0, 0, 0)
    } else {
      target.setMinutes(target.getMinutes() + minutesToAdd)
    }
    setScheduleTime(toLocalDatetimeInput(target.toISOString()))
  }

  return (
    <div>
      {msg && <div className="alert alert-success mb-3">{msg}</div>}
      {errorMsg && <div className="alert alert-error mb-3">{errorMsg}</div>}

      {/* ─── LIVE STATUS BANNER ─── */}
      <div
        className="card mb-4"
        style={{
          borderLeft: isEffectivelyPublished
            ? '5px solid var(--success)'
            : isScheduleActive
            ? '5px solid var(--accent-1)'
            : '5px solid var(--warning)',
          background: isEffectivelyPublished
            ? 'rgba(5, 150, 105, 0.04)'
            : isScheduleActive
            ? 'rgba(13, 148, 136, 0.04)'
            : 'rgba(217, 119, 6, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--text-muted)' }}>
              Current Result Status
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.35rem' }}>
              {isEffectivelyPublished ? (
                <>
                  <span className="badge badge-active" style={{ fontSize: '0.85rem' }}>● Published Live</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Students can view their results and scorecards.
                  </span>
                </>
              ) : isScheduleActive ? (
                <>
                  <span className="badge" style={{ fontSize: '0.85rem', background: 'var(--accent-1)', color: '#fff' }}>
                    ⏰ Scheduled Auto-Publish
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Will release on {new Date(test.resultsPublishAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </>
              ) : (
                <>
                  <span className="badge badge-inactive" style={{ fontSize: '0.85rem' }}>🔒 Hidden / Unpublished</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Results are hidden from students until you publish or set a time.
                  </span>
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {isScheduleActive && (
              <button
                onClick={handleClearSchedule}
                className="btn btn-secondary btn-sm"
                disabled={isPending}
              >
                ✕ Cancel Schedule
              </button>
            )}
            {!isEffectivelyPublished ? (
              <button
                onClick={handlePublishAll}
                className="btn btn-success btn-sm"
                disabled={isPending}
              >
                📢 Publish All Now
              </button>
            ) : (
              <button
                onClick={handleUnpublishAll}
                className="btn btn-danger btn-sm"
                disabled={isPending}
              >
                🔒 Unpublish All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── TWO MAIN ACTION CARDS: INSTANT OR SCHEDULE ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Option 1: Schedule Result Publishing */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>⏰</span>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Set Time for Publishing</h3>
            </div>
            <p className="text-secondary text-xs" style={{ marginBottom: '1rem', lineHeight: 1.5 }}>
              Choose a specific date and time. Results will automatically become visible to all students when this time arrives.
            </p>

            <form onSubmit={handleSaveSchedule}>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Publish Date &amp; Time *</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  required
                />
              </div>

              {/* Quick Presets */}
              <div style={{ marginBottom: '1rem' }}>
                <div className="text-xs text-muted" style={{ marginBottom: '0.4rem', fontWeight: 600 }}>Quick Presets:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    onClick={() => applyPreset(30)}
                  >
                    +30 Mins
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    onClick={() => applyPreset(60)}
                  >
                    +1 Hour
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    onClick={() => applyPreset(180)}
                  >
                    +3 Hours
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    onClick={() => applyPreset(0, 10, 1)}
                  >
                    Tomorrow 10 AM
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                    onClick={() => applyPreset(0, 18, 1)}
                  >
                    Tomorrow 6 PM
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={isPending || !scheduleTime}
                  style={{ flex: 1 }}
                >
                  {isPending ? 'Saving…' : '⏰ Set Release Time'}
                </button>
                {test.resultsPublishAt && (
                  <button
                    type="button"
                    onClick={handleClearSchedule}
                    className="btn btn-secondary btn-sm"
                    disabled={isPending}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Option 2: Instant Manual Publishing */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Instant / Manual Publishing</h3>
            </div>
            <p className="text-secondary text-xs" style={{ marginBottom: '1rem', lineHeight: 1.5 }}>
              Instantly publish or unpublish all student results immediately without waiting for any schedule.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={handlePublishAll}
                className="btn btn-success"
                disabled={isPending || allPublished}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                📢 {allPublished ? 'All Results Already Published' : 'Publish All Results Now'}
              </button>

              <button
                onClick={handleUnpublishAll}
                className="btn btn-secondary"
                disabled={isPending || (submissions.length > 0 && submissions.every(s => !s.isPublished) && !test.resultsPublishAt)}
                style={{ width: '100%', justifyContent: 'center', color: 'var(--danger)' }}
              >
                🔒 Unpublish &amp; Hide All
              </button>
            </div>
          </div>

          <div className="text-xs text-muted" style={{ marginTop: '1.5rem', background: 'var(--bg-elevated)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
            💡 <strong>Tip:</strong> Publishing all results will immediately allow students to see their marks and rankings on their dashboard.
          </div>
        </div>
      </div>

      {/* ─── VISIBILITY SETTINGS ─── */}
      <div className="card mb-4">
        <h3 className="mb-3" style={{ fontSize: '1.05rem' }}>👁️ Result Visibility Settings</h3>
        <form action={updateShowSettings.bind(null, test.id)}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="showAnswers"
                defaultChecked={test.showAnswers}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-1)' }}
              />
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  Show Correct Answers &amp; Explanations
                </div>
                <div className="text-xs text-muted">
                  Allow students to see answer keys and solutions once results are released.
                </div>
              </div>
            </label>
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="showPerQuestion"
                defaultChecked={test.showPerQuestion}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-1)' }}
              />
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                  Show Per-Question Marks Breakdown
                </div>
                <div className="text-xs text-muted">
                  Display marks awarded for each individual question to the student.
                </div>
              </div>
            </label>
          </div>
          <button type="submit" className="btn btn-secondary btn-sm">Save Visibility Settings</button>
        </form>
      </div>

      {/* ─── PER-STUDENT SUBMISSION TABLE ─── */}
      {submissions.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
          <h3>No submissions yet</h3>
          <p className="text-muted text-sm mt-1">Once students submit the test, you can review and manage their individual result status here.</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <div
            style={{
              padding: '1.25rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem' }}>Individual Student Submissions</h3>
              <p className="text-xs text-muted" style={{ margin: '0.2rem 0 0' }}>
                Total {submissions.length} submission(s)
              </p>
            </div>
            <button
              onClick={handlePublishSelected}
              className="btn btn-primary btn-sm"
              disabled={isPending || selected.length === 0}
            >
              Publish Selected ({selected.length})
            </button>
          </div>
          <div className="table-wrap" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelected(e.target.checked ? submissions.map((s) => s.id) : [])
                      }
                      checked={selected.length === submissions.length && submissions.length > 0}
                      style={{ accentColor: 'var(--accent-1)' }}
                    />
                  </th>
                  <th>Student Name</th>
                  <th>Roll / ID</th>
                  <th>Score</th>
                  <th>Submitted At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => {
                  const pct =
                    sub.maxScore > 0
                      ? Math.round((sub.totalScore / sub.maxScore) * 100)
                      : 0
                  const isSubPublished = sub.isPublished || isSchedulePast

                  return (
                    <tr key={sub.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(sub.id)}
                          onChange={() => toggleSelect(sub.id)}
                          style={{ accentColor: 'var(--accent-1)' }}
                        />
                      </td>
                      <td style={{ fontWeight: '600' }}>{sub.studentName}</td>
                      <td className="text-muted" style={{ fontSize: '0.85rem' }}>{sub.studentRoll}</td>
                      <td
                        style={{
                          fontWeight: '700',
                          color:
                            pct >= 75
                              ? 'var(--success)'
                              : pct >= 50
                              ? 'var(--warning)'
                              : 'var(--danger)',
                        }}
                      >
                        {sub.totalScore}/{sub.maxScore} ({pct}%)
                      </td>
                      <td className="text-muted text-xs">
                        {new Date(sub.submittedAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td>
                        {isSubPublished ? (
                          <span className="badge badge-active">Published</span>
                        ) : isScheduleActive ? (
                          <span className="badge" style={{ background: 'var(--accent-1)', color: '#fff', fontSize: '0.72rem' }}>
                            ⏰ Scheduled
                          </span>
                        ) : (
                          <span className="badge badge-info">Pending / Hidden</span>
                        )}
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
