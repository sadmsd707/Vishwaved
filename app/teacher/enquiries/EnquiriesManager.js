'use client'

import { useState } from 'react'
import { updateEnquiryStatus, deleteEnquiry, updateEnquiryNotes } from '@/actions/enquiry'

export default function EnquiriesManager({ initialEnquiries = [] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [courseFilter, setCourseFilter] = useState('ALL')
  const [editingNotesId, setEditingNotesId] = useState(null)
  const [tempNotes, setTempNotes] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="badge badge-warning">⏳ Pending</span>
      case 'CONTACTED':
        return <span className="badge badge-info">📞 Contacted</span>
      case 'ENROLLED':
        return <span className="badge badge-success">✅ Enrolled</span>
      case 'CLOSED':
        return <span className="badge badge-danger">🔒 Closed</span>
      default:
        return <span className="badge">{status}</span>
    }
  }

  // Course badge styling
  const getCourseBadge = (course) => {
    let colorClass = 'badge-primary'
    if (course.includes('NEET')) colorClass = 'badge-success'
    else if (course.includes('JEE')) colorClass = 'badge-info'
    else if (course.includes('CET')) colorClass = 'badge-warning'
    return <span className={`badge ${colorClass}`}>{course}</span>
  }

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id)
    try {
      const res = await updateEnquiryStatus(id, newStatus)
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        )
      }
    } catch (err) {
      alert('Failed to update status')
    } finally {
      setActionLoading(null)
    }
  }

  // Handle delete
  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete the enquiry from "${name}"?`)) return
    setActionLoading(id)
    try {
      const res = await deleteEnquiry(id)
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id))
      }
    } catch (err) {
      alert('Failed to delete enquiry')
    } finally {
      setActionLoading(null)
    }
  }

  // Handle note save
  const handleSaveNotes = async (id) => {
    setActionLoading(id)
    try {
      const res = await updateEnquiryNotes(id, tempNotes)
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, notes: tempNotes } : e))
        )
        setEditingNotesId(null)
      }
    } catch (err) {
      alert('Failed to save notes')
    } finally {
      setActionLoading(null)
    }
  }

  // Filtered list
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      (e.message && e.message.toLowerCase().includes(search.toLowerCase())) ||
      (e.notes && e.notes.toLowerCase().includes(search.toLowerCase()))

    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter
    const matchesCourse = courseFilter === 'ALL' || e.course === courseFilter

    return matchesSearch && matchesStatus && matchesCourse
  })

  // Distinct courses for filter
  const distinctCourses = [...new Set(enquiries.map((e) => e.course))].filter(Boolean)

  // Stats calculation
  const total = enquiries.length
  const pendingCount = enquiries.filter((e) => e.status === 'PENDING').length
  const contactedCount = enquiries.filter((e) => e.status === 'CONTACTED').length
  const enrolledCount = enquiries.filter((e) => e.status === 'ENROLLED').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* ─── Metric Cards ─── */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Total Inquiries</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(217, 119, 6, 0.3)' }}>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{pendingCount}</div>
          <div className="stat-label">Pending Follow-up</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(2, 132, 199, 0.3)' }}>
          <div className="stat-value" style={{ color: 'var(--info)' }}>{contactedCount}</div>
          <div className="stat-label">Contacted</div>
        </div>
        <div className="stat-card" style={{ borderColor: 'rgba(5, 150, 105, 0.3)' }}>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{enrolledCount}</div>
          <div className="stat-label">Enrolled</div>
        </div>
      </div>

      {/* ─── Filter & Search Bar ─── */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Top row: search & course dropdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
            <div>
              <input
                type="text"
                placeholder="🔍 Search by student name, phone or note..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="input"
                style={{ width: '100%' }}
              >
                <option value="ALL">All Courses ({enquiries.length})</option>
                {distinctCourses.map((c) => (
                  <option key={c} value={c}>
                    {c} ({enquiries.filter((e) => e.course === c).length})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status:</span>
            {[
              { key: 'ALL', label: 'All' },
              { key: 'PENDING', label: 'Pending' },
              { key: 'CONTACTED', label: 'Contacted' },
              { key: 'ENROLLED', label: 'Enrolled' },
              { key: 'CLOSED', label: 'Closed' },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={`btn btn-sm ${statusFilter === tab.key ? 'btn-primary' : 'btn-secondary'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Enquiries List / Table ─── */}
      {filteredEnquiries.length === 0 ? (
        <div className="card text-center" style={{ padding: '3.5rem 1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📬</div>
          <h3>No Enquiries Found</h3>
          <p className="text-secondary" style={{ marginTop: '0.5rem' }}>
            {enquiries.length === 0
              ? 'New student inquiries submitted through the landing page will appear here.'
              : 'No inquiries match your current search or filter criteria.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredEnquiries.map((enq) => {
            const cleanPhone = enq.phone.replace(/[^0-9]/g, '')
            const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone
            const waText = encodeURIComponent(`Hello ${enq.name}, Greetings from VishwaVed Academy! We received your admission inquiry for ${enq.course}. How can we assist you today?`)

            const formattedDate = enq.createdAt
              ? new Date(enq.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recent'

            return (
              <div
                key={enq.id}
                className="card"
                style={{
                  padding: '1.25rem 1.5rem',
                  borderLeft: enq.status === 'PENDING' ? '4px solid var(--warning)' : enq.status === 'ENROLLED' ? '4px solid var(--success)' : '4px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  {/* Student Details */}
                  <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{enq.name}</h3>
                      {getCourseBadge(enq.course)}
                      {getStatusBadge(enq.status)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        <span>📞</span>
                        <a href={`tel:${enq.phone}`} style={{ color: 'inherit' }}>{enq.phone}</a>
                      </div>

                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        <span>🕒</span> {formattedDate}
                      </div>
                    </div>

                    {/* Student Message */}
                    {enq.message && (
                      <div
                        style={{
                          marginTop: '0.75rem',
                          padding: '0.65rem 0.85rem',
                          background: 'var(--bg-elevated)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.9rem',
                          color: 'var(--text-secondary)',
                          borderLeft: '2px solid var(--accent-1)',
                        }}
                      >
                        <strong style={{ color: 'var(--text-primary)' }}>Message:</strong> {enq.message}
                      </div>
                    )}

                    {/* Teacher Internal Notes */}
                    <div style={{ marginTop: '0.75rem' }}>
                      {editingNotesId === enq.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <textarea
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            placeholder="Add follow-up notes (e.g. called parent, visit scheduled for Monday)..."
                            className="input"
                            rows={2}
                            style={{ fontSize: '0.85rem' }}
                          />
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              type="button"
                              onClick={() => handleSaveNotes(enq.id)}
                              disabled={actionLoading === enq.id}
                              className="btn btn-primary btn-sm"
                            >
                              Save Note
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNotesId(null)}
                              className="btn btn-secondary btn-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                          {enq.notes ? (
                            <span style={{ color: 'var(--text-primary)', background: '#fef3c7', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                              📝 <strong>Note:</strong> {enq.notes}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No notes added</span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingNotesId(enq.id)
                              setTempNotes(enq.notes || '')
                            }}
                            className="btn btn-sm"
                            style={{ padding: '0.15rem 0.45rem', fontSize: '0.75rem', background: 'transparent', border: '1px solid var(--border)' }}
                          >
                            ✏️ {enq.notes ? 'Edit' : '+ Note'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.65rem', flex: '0 0 auto' }}>
                    {/* Status Dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        disabled={actionLoading === enq.id}
                        className="input"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="ENROLLED">Enrolled</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                    </div>

                    {/* Quick Connect & Delete */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <a
                        href={`https://wa.me/${waPhone}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm"
                        style={{ background: '#16a34a', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        title="Chat on WhatsApp"
                      >
                        <span>💬</span> WhatsApp
                      </a>

                      <a
                        href={`tel:${enq.phone}`}
                        className="btn btn-secondary btn-sm"
                        title="Call Student"
                      >
                        <span>📞</span> Call
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDelete(enq.id, enq.name)}
                        disabled={actionLoading === enq.id}
                        className="btn btn-danger btn-sm"
                        title="Delete Enquiry"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
