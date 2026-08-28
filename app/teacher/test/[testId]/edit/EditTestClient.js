'use client'
import { useState } from 'react'
import Link from 'next/link'
import { updateTest } from '@/actions/test'

export default function EditTestClient({ test }) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function toLocalDatetime(d) {
    if (!d) return ''
    const dt = new Date(d)
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())
    return dt.toISOString().slice(0, 16)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    const fd = new FormData(e.target)
    const result = await updateTest(test.id, fd)
    setLoading(false)
    if (result?.errors) setErrors(result.errors)
  }

  return (
    <div className="card animate-in">
      {errors.general && <div className="alert alert-error">{errors.general}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Test Title *</label>
          <input name="title" type="text" className="form-input" defaultValue={test.title} required />
          {errors.title && <div className="form-error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Instructions / Description</label>
          <textarea name="description" className="form-textarea" defaultValue={test.description || ''} rows={3} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Time Limit (minutes)</label>
            <input name="timeLimit" type="number" min="1" max="300" className="form-input" defaultValue={test.timeLimit || ''} placeholder="Leave blank for none" />
          </div>
          <div className="form-group">
            <label className="form-label">Max Attempts per Student</label>
            <input name="maxAttempts" type="number" min="1" max="10" className="form-input" defaultValue={test.maxAttempts} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Available From</label>
            <input name="startAt" type="datetime-local" className="form-input" defaultValue={toLocalDatetime(test.startAt)} />
          </div>
          <div className="form-group">
            <label className="form-label">Available Until</label>
            <input name="endAt" type="datetime-local" className="form-input" defaultValue={toLocalDatetime(test.endAt)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Question Display Mode</label>
          <select name="displayMode" className="form-select" defaultValue={test.displayMode}>
            <option value="ALL">All questions on one page</option>
            <option value="ONE_BY_ONE">One question at a time</option>
          </select>
        </div>

        <hr className="divider" />
        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
          {loading ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
