'use client'
import { useState } from 'react'
import Link from 'next/link'
import { addStudent, deleteStudent } from '@/actions/students'

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
