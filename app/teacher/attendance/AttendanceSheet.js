'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { saveAttendance } from '@/actions/attendance'

export default function AttendanceSheet({
  students,
  classes,
  selectedClass,
  selectedDate,
  initialAttendanceMap,
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [date, setDate] = useState(selectedDate)
  const [currentClass, setCurrentClass] = useState(selectedClass)
  const [attendance, setAttendance] = useState(() => {
    const map = {}
    for (const s of students) {
      map[s.id] = initialAttendanceMap[s.id] || { status: 'PRESENT', remarks: '' }
    }
    return map
  })
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Filter students by selected class
  const filteredStudents = currentClass
    ? students.filter((s) => s.class === currentClass)
    : students

  function handleDateChange(newDate) {
    setDate(newDate)
    router.push(`/teacher/attendance?date=${newDate}&class=${encodeURIComponent(currentClass || '')}`)
  }

  function handleClassChange(newClass) {
    setCurrentClass(newClass)
    router.push(`/teacher/attendance?date=${date}&class=${encodeURIComponent(newClass || '')}`)
  }

  function setStudentStatus(studentId, status) {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { ...(prev[studentId] || {}), status },
    }))
    setSavedSuccess(false)
  }

  function setStudentRemarks(studentId, remarks) {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { ...(prev[studentId] || {}), remarks },
    }))
    setSavedSuccess(false)
  }

  function markAll(status) {
    setAttendance((prev) => {
      const next = { ...prev }
      for (const s of filteredStudents) {
        next[s.id] = { ...(next[s.id] || {}), status }
      }
      return next
    })
    setSavedSuccess(false)
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    setSavedSuccess(false)

    const records = filteredStudents.map((s) => ({
      studentId: s.id,
      status: attendance[s.id]?.status || 'PRESENT',
      remarks: attendance[s.id]?.remarks || '',
    }))

    const res = await saveAttendance(date, currentClass, records)
    setSaving(false)

    if (res?.errors) {
      setError(res.errors.general || 'Failed to save attendance.')
    } else {
      setSavedSuccess(true)
    }
  }

  // Count stats
  const total = filteredStudents.length
  let presentCount = 0
  let absentCount = 0
  let lateCount = 0

  for (const s of filteredStudents) {
    const st = attendance[s.id]?.status || 'PRESENT'
    if (st === 'PRESENT') presentCount++
    else if (st === 'ABSENT') absentCount++
    else if (st === 'LATE') lateCount++
  }

  const attendancePercent = total > 0 ? Math.round((presentCount / total) * 100) : 0

  return (
    <div>
      {/* Controls Bar */}
      <div className="card mb-4 animate-in">
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Date Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <label htmlFor="attDate" style={{ fontWeight: 600, fontSize: '0.9rem' }}>📅 Date:</label>
            <input
              id="attDate"
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              style={{ padding: '0.4rem 0.75rem', width: 'auto' }}
            />
          </div>

          {/* Class Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Class:</span>
            <button
              type="button"
              className={`btn btn-sm ${!currentClass ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleClassChange('')}
            >
              All
            </button>
            {classes.map((c) => (
              <button
                key={c}
                type="button"
                className={`btn btn-sm ${currentClass === c ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleClassChange(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Quick Mark All */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => markAll('PRESENT')}
              title="Mark all listed students as Present"
            >
              ✓ All Present
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => markAll('ABSENT')}
              title="Mark all listed students as Absent"
            >
              ✕ All Absent
            </button>
          </div>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{presentCount}</div>
          <div className="stat-label">Present</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{absentCount}</div>
          <div className="stat-label">Absent</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-1)' }}>{attendancePercent}%</div>
          <div className="stat-label">Attendance Rate</div>
        </div>
      </div>

      {error && <div className="alert alert-error mb-3">{error}</div>}
      {savedSuccess && (
        <div className="alert alert-success mb-3 animate-in">
          ✅ Attendance recorded successfully for <strong>{new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>!
        </div>
      )}

      {/* Attendance Table */}
      {filteredStudents.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>👨‍🎓</div>
          <h3>No students found</h3>
          <p className="text-muted text-sm mt-1">
            {currentClass ? `No students registered in class ${currentClass}.` : 'Please add students first from the Students menu.'}
          </p>
        </div>
      ) : (
        <div className="card" style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>ID</th>
                <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Student Name</th>
                <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Class</th>
                <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '0.75rem 0.5rem', fontWeight: 700 }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => {
                const currentStatus = attendance[s.id]?.status || 'PRESENT'
                const currentRemarks = attendance[s.id]?.remarks || ''

                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.7rem 0.5rem' }}>
                      <strong className="test-code" style={{ fontSize: '0.78rem', padding: '0.15rem 0.5rem' }}>
                        {s.id}
                      </strong>
                    </td>
                    <td style={{ padding: '0.7rem 0.5rem', fontWeight: 600 }}>
                      {s.firstName} {s.middleName} {s.surname}
                    </td>
                    <td style={{ padding: '0.7rem 0.5rem' }}>
                      <span className="badge badge-active">{s.class}</span>
                    </td>
                    <td style={{ padding: '0.7rem 0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          onClick={() => setStudentStatus(s.id, 'PRESENT')}
                          style={{
                            padding: '0.3rem 0.7rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            border: '1px solid',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            background: currentStatus === 'PRESENT' ? 'var(--success)' : 'transparent',
                            color: currentStatus === 'PRESENT' ? '#fff' : 'var(--text-secondary)',
                            borderColor: currentStatus === 'PRESENT' ? 'var(--success)' : 'var(--border)',
                          }}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => setStudentStatus(s.id, 'ABSENT')}
                          style={{
                            padding: '0.3rem 0.7rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            border: '1px solid',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            background: currentStatus === 'ABSENT' ? 'var(--danger)' : 'transparent',
                            color: currentStatus === 'ABSENT' ? '#fff' : 'var(--text-secondary)',
                            borderColor: currentStatus === 'ABSENT' ? 'var(--danger)' : 'var(--border)',
                          }}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => setStudentStatus(s.id, 'LATE')}
                          style={{
                            padding: '0.3rem 0.7rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            border: '1px solid',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            background: currentStatus === 'LATE' ? 'var(--warning)' : 'transparent',
                            color: currentStatus === 'LATE' ? '#fff' : 'var(--text-secondary)',
                            borderColor: currentStatus === 'LATE' ? 'var(--warning)' : 'var(--border)',
                          }}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '0.7rem 0.5rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Optional note"
                        value={currentRemarks}
                        onChange={(e) => setStudentRemarks(s.id, e.target.value)}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.82rem' }}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Bottom Save Action */}
          <div style={{ padding: '1.25rem 0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving Attendance…' : '💾 Save Attendance'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
