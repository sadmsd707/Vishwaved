'use client'
import { useState } from 'react'
import Link from 'next/link'
import { addStudent, deleteStudent, editStudent } from '@/actions/students'

export default function AddStudentForm({ classes }) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess(null)
    const fd = new FormData(e.target)
    const result = await addStudent(fd)
    setLoading(false)
    if (result?.errors) {
      setErrors(result.errors)
    } else if (result?.success) {
      setSuccess(`Student added successfully! ID: ${result.studentId}`)
      e.target.reset()
    }
  }

  return (
    <div className="card animate-in">
      <h3 style={{ marginBottom: '1rem' }}>➕ Add New Student</h3>
      {errors.general && <div className="alert alert-error">{errors.general}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {/* Student ID */}
          <div className="form-group">
            <label className="form-label" htmlFor="studentId">Student ID (Login ID) *</label>
            <input id="studentId" name="studentId" type="text" className="form-input" placeholder="e.g. VV-001" required />
            {errors.studentId && <span className="form-error">{errors.studentId}</span>}
          </div>

          {/* Class */}
          <div className="form-group">
            <label className="form-label" htmlFor="class">Class *</label>
            <input id="class" name="class" type="text" className="form-input" placeholder="e.g. 10th" required list="class-list" />
            <datalist id="class-list">
              {classes.map(c => <option key={c} value={c} />)}
            </datalist>
            {errors.class && <span className="form-error">{errors.class}</span>}
          </div>

          {/* First Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">First Name *</label>
            <input id="firstName" name="firstName" type="text" className="form-input" placeholder="Rahul" required />
            {errors.firstName && <span className="form-error">{errors.firstName}</span>}
          </div>

          {/* Middle Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="middleName">Middle Name *</label>
            <input id="middleName" name="middleName" type="text" className="form-input" placeholder="Suresh" required />
            {errors.middleName && <span className="form-error">{errors.middleName}</span>}
          </div>

          {/* Surname */}
          <div className="form-group">
            <label className="form-label" htmlFor="surname">Surname *</label>
            <input id="surname" name="surname" type="text" className="form-input" placeholder="Patil" required />
            {errors.surname && <span className="form-error">{errors.surname}</span>}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label className="form-label" htmlFor="dob">Date of Birth *</label>
            <input id="dob" name="dob" type="date" className="form-input" required />
            {errors.dob && <span className="form-error">{errors.dob}</span>}
          </div>

          {/* Mobile */}
          <div className="form-group">
            <label className="form-label" htmlFor="mobile">Mobile No *</label>
            <input id="mobile" name="mobile" type="tel" className="form-input" placeholder="9876543210" required />
            {errors.mobile && <span className="form-error">{errors.mobile}</span>}
          </div>

          {/* Parent Mobile */}
          <div className="form-group">
            <label className="form-label" htmlFor="parentMobile">Parent Mobile *</label>
            <input id="parentMobile" name="parentMobile" type="tel" className="form-input" placeholder="9876543211" required />
            {errors.parentMobile && <span className="form-error">{errors.parentMobile}</span>}
          </div>

          {/* Mother's Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="mothersName">Mother&apos;s Name *</label>
            <input id="mothersName" name="mothersName" type="text" className="form-input" placeholder="Sunita" required />
            {errors.mothersName && <span className="form-error">{errors.mothersName}</span>}
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding…' : '+ Add Student'}
          </button>
        </div>
      </form>
    </div>
  )
}

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
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Format DOB to YYYY-MM-DD for date input
  const dobFormatted = student.dob
    ? new Date(student.dob).toISOString().split('T')[0]
    : ''

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData(e.target)
    fd.append('studentId', student.id)
    const result = await editStudent(fd)
    setLoading(false)
    if (result?.errors) {
      setErrors(result.errors)
    } else if (result?.success) {
      setOpen(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
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

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '2rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0 }}>✏️ Edit Student — <span style={{ color: 'var(--accent-1)' }}>{student.id}</span></h3>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.3rem',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>

          {errors.general && <div className="alert alert-error">{errors.general}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input name="firstName" type="text" className="form-input" defaultValue={student.firstName} required />
                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Middle Name *</label>
                <input name="middleName" type="text" className="form-input" defaultValue={student.middleName} required />
                {errors.middleName && <span className="form-error">{errors.middleName}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Surname *</label>
                <input name="surname" type="text" className="form-input" defaultValue={student.surname} required />
                {errors.surname && <span className="form-error">{errors.surname}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Class *</label>
                <input name="class" type="text" className="form-input" defaultValue={student.class} required />
                {errors.class && <span className="form-error">{errors.class}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth *</label>
                <input name="dob" type="date" className="form-input" defaultValue={dobFormatted} required />
                {errors.dob && <span className="form-error">{errors.dob}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Mobile No *</label>
                <input name="mobile" type="tel" className="form-input" defaultValue={student.mobile} required />
                {errors.mobile && <span className="form-error">{errors.mobile}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Parent Mobile *</label>
                <input name="parentMobile" type="tel" className="form-input" defaultValue={student.parentMobile} required />
                {errors.parentMobile && <span className="form-error">{errors.parentMobile}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Mother&apos;s Name *</label>
                <input name="mothersName" type="text" className="form-input" defaultValue={student.mothersName} required />
                {errors.mothersName && <span className="form-error">{errors.mothersName}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setOpen(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                {loading ? 'Saving…' : '💾 Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
