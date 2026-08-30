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
            background: 'var(--bg-base)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)',
            width: '100%',
            maxWidth: '720px',
            maxHeight: '90vh',
            overflow: 'auto',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {/* Modal Header */}
          <div style={{
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>✏️ Edit Student</h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Student ID: <strong style={{ color: 'var(--accent-1)' }}>{student.id}</strong>
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                fontSize: '1rem',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)',
              }}
            >
              ✕
            </button>
          </div>

          {/* Modal Body */}
          <div style={{ padding: '1.5rem 2rem' }}>
            {errors.general && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{errors.general}</div>}

            <form onSubmit={handleSubmit}>
              {/* Personal Details Box */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '1.1rem' }}>👤</span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Personal Details</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>First Name *</label>
                    <input name="firstName" type="text" className="form-input" defaultValue={student.firstName} required style={{ fontSize: '0.85rem' }} />
                    {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Middle Name *</label>
                    <input name="middleName" type="text" className="form-input" defaultValue={student.middleName} required style={{ fontSize: '0.85rem' }} />
                    {errors.middleName && <span className="form-error">{errors.middleName}</span>}
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Surname *</label>
                    <input name="surname" type="text" className="form-input" defaultValue={student.surname} required style={{ fontSize: '0.85rem' }} />
                    {errors.surname && <span className="form-error">{errors.surname}</span>}
                  </div>
                </div>
              </div>

              {/* Academic & DOB Box */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '1.1rem' }}>🎓</span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Academic Info</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Class *</label>
                    <input name="class" type="text" className="form-input" defaultValue={student.class} required style={{ fontSize: '0.85rem' }} />
                    {errors.class && <span className="form-error">{errors.class}</span>}
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Date of Birth *</label>
                    <input name="dob" type="date" className="form-input" defaultValue={dobFormatted} required style={{ fontSize: '0.85rem' }} />
                    {errors.dob && <span className="form-error">{errors.dob}</span>}
                  </div>
                </div>
              </div>

              {/* Contact Details Box */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '1.1rem' }}>📞</span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Contact Details</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Mobile No *</label>
                    <input name="mobile" type="tel" className="form-input" defaultValue={student.mobile} required style={{ fontSize: '0.85rem' }} />
                    {errors.mobile && <span className="form-error">{errors.mobile}</span>}
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Parent Mobile *</label>
                    <input name="parentMobile" type="tel" className="form-input" defaultValue={student.parentMobile} required style={{ fontSize: '0.85rem' }} />
                    {errors.parentMobile && <span className="form-error">{errors.parentMobile}</span>}
                  </div>
                </div>
              </div>

              {/* Family Details Box */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '1.1rem' }}>👨‍👩‍👦</span>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Family Details</span>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Mother&apos;s Name *</label>
                  <input name="mothersName" type="text" className="form-input" defaultValue={student.mothersName} required style={{ fontSize: '0.85rem' }} />
                  {errors.mothersName && <span className="form-error">{errors.mothersName}</span>}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setOpen(false)} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ fontSize: '0.85rem' }}>
                  {loading ? 'Saving…' : '💾 Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
