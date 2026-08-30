'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { addStudent, deleteStudent, editStudent } from '@/actions/students'

export default function AddStudentForm({ classes }) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [editingStudent, setEditingStudent] = useState(null)

  // Listen for edit events from EditStudentButton
  useEffect(() => {
    function handleEditEvent(e) {
      setEditingStudent(e.detail)
      setErrors({})
      setSuccess(null)
    }
    window.addEventListener('editStudent', handleEditEvent)
    return () => window.removeEventListener('editStudent', handleEditEvent)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess(null)
    const fd = new FormData(e.target)

    if (editingStudent) {
      fd.append('studentId', editingStudent.id)
      const result = await editStudent(fd)
      setLoading(false)
      if (result?.errors) {
        setErrors(result.errors)
      } else if (result?.success) {
        setSuccess(`Student "${editingStudent.id}" updated successfully!`)
        setEditingStudent(null)
        e.target.reset()
      }
    } else {
      const result = await addStudent(fd)
      setLoading(false)
      if (result?.errors) {
        setErrors(result.errors)
      } else if (result?.success) {
        setSuccess(`Student added successfully! ID: ${result.studentId}`)
        e.target.reset()
      }
    }
  }

  function handleCancel() {
    setEditingStudent(null)
    setErrors({})
    setSuccess(null)
  }

  // Format DOB to YYYY-MM-DD for date input
  const dobValue = editingStudent?.dob
    ? new Date(editingStudent.dob).toISOString().split('T')[0]
    : ''

  return (
    <div className="card animate-in" id="student-form">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>
          {editingStudent ? (
            <>✏️ Edit Student — <span style={{ color: 'var(--accent-1)' }}>{editingStudent.id}</span></>
          ) : (
            '➕ Add New Student'
          )}
        </h3>
        {editingStudent && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem' }}
          >
            ✕ Cancel Edit
          </button>
        )}
      </div>
      {errors.general && <div className="alert alert-error">{errors.general}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} key={editingStudent?.id || 'add'}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {/* Student ID */}
          <div className="form-group">
            <label className="form-label" htmlFor="studentId">Student ID (Login ID) *</label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              className="form-input"
              placeholder="e.g. VV-001"
              required
              defaultValue={editingStudent?.id || ''}
              disabled={!!editingStudent}
              style={editingStudent ? { background: 'var(--bg-elevated)', color: 'var(--text-muted)', cursor: 'not-allowed' } : {}}
            />
            {errors.studentId && <span className="form-error">{errors.studentId}</span>}
          </div>

          {/* Class */}
          <div className="form-group">
            <label className="form-label" htmlFor="class">Class *</label>
            <input id="class" name="class" type="text" className="form-input" placeholder="e.g. 10th" required list="class-list" defaultValue={editingStudent?.class || ''} />
            <datalist id="class-list">
              {classes.map(c => <option key={c} value={c} />)}
            </datalist>
            {errors.class && <span className="form-error">{errors.class}</span>}
          </div>

          {/* First Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name *</label>
            <input id="firstName" name="firstName" type="text" className="form-input" placeholder="Rahul" required defaultValue={editingStudent?.firstName || ''} />
            {errors.firstName && <span className="form-error">{errors.firstName}</span>}
          </div>

          {/* Middle Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="middleName">Middle Name *</label>
            <input id="middleName" name="middleName" type="text" className="form-input" placeholder="Suresh" required defaultValue={editingStudent?.middleName || ''} />
            {errors.middleName && <span className="form-error">{errors.middleName}</span>}
          </div>

          {/* Surname */}
          <div className="form-group">
            <label className="form-label" htmlFor="surname">Surname *</label>
            <input id="surname" name="surname" type="text" className="form-input" placeholder="Patil" required defaultValue={editingStudent?.surname || ''} />
            {errors.surname && <span className="form-error">{errors.surname}</span>}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label className="form-label" htmlFor="dob">Date of Birth *</label>
            <input id="dob" name="dob" type="date" className="form-input" required defaultValue={dobValue} />
            {errors.dob && <span className="form-error">{errors.dob}</span>}
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label className="form-label" htmlFor="mobile">Mobile No *</label>
            <input id="mobile" name="mobile" type="tel" className="form-input" placeholder="9876543210" required defaultValue={editingStudent?.mobile || ''} />
            {errors.mobile && <span className="form-error">{errors.mobile}</span>}
          </div>

          {/* Parent Mobile */}
          <div className="form-group">
            <label className="form-label" htmlFor="parentMobile">Parent Mobile *</label>
            <input id="parentMobile" name="parentMobile" type="tel" className="form-input" placeholder="9876543211" required defaultValue={editingStudent?.parentMobile || ''} />
            {errors.parentMobile && <span className="form-error">{errors.parentMobile}</span>}
          </div>

          {/* Mother's Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="mothersName">Mother&apos;s Name *</label>
            <input id="mothersName" name="mothersName" type="text" className="form-input" placeholder="Sunita" required defaultValue={editingStudent?.mothersName || ''} />
            {errors.mothersName && <span className="form-error">{errors.mothersName}</span>}
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? (editingStudent ? 'Updating…' : 'Adding…')
              : (editingStudent ? '✏️ Update Student' : '+ Add Student')
            }
          </button>
          {editingStudent && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

// Expose a way for EditStudentButton to set the editing student
AddStudentForm.setEdit = null

export function DeleteStudentButton({ studentId }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this student?')) return
    setLoading(true)
    const fd = new FormData()
    fd.append('studentId', studentId)
    await deleteStudent(fd)
    setLoading(false)
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="btn btn-danger btn-sm" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
      {loading ? '…' : '✕'}
    </button>
  )
}

export function EditStudentButton({ student }) {
  function handleEdit() {
    // Dispatch a custom event to tell the form to enter edit mode
    const event = new CustomEvent('editStudent', { detail: student })
    window.dispatchEvent(event)
    // Scroll to the form
    document.getElementById('student-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      onClick={handleEdit}
      className="btn btn-sm"
      style={{
        fontSize: '0.7rem',
        padding: '0.25rem 0.5rem',
        background: 'var(--accent-1)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
      }}
      title="Edit student"
    >
      ✎
    </button>
  )
}
