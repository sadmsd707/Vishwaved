'use client'

import { useState } from 'react'
import { createResource, deleteResource } from '@/actions/resources'

const RESOURCE_TYPES = [
  { value: 'LINK', label: '🔗 Link / Website', icon: '🔗' },
  { value: 'PDF', label: '📄 PDF Document', icon: '📄' },
  { value: 'VIDEO', label: '🎬 Video', icon: '🎬' },
  { value: 'NOTES', label: '📝 Notes', icon: '📝' },
  { value: 'OTHER', label: '📁 Other', icon: '📁' },
]

function getTypeIcon(type) {
  return RESOURCE_TYPES.find((t) => t.value === type)?.icon || '📁'
}

function getTypeLabel(type) {
  return RESOURCE_TYPES.find((t) => t.value === type)?.label || type
}

export default function ResourcesManager({ initialResources = [], classes = [] }) {
  const [resources, setResources] = useState(initialResources)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(null)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('ALL')
  const [classFilter, setClassFilter] = useState('ALL')

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [type, setType] = useState('LINK')
  const [subject, setSubject] = useState('')
  const [targetClass, setTargetClass] = useState('')

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setUrl('')
    setType('LINK')
    setSubject('')
    setTargetClass('')
    setError('')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await createResource({ title, description, url, type, subject, targetClass })

    if (res.error) {
      setError(res.error)
      setLoading(false)
      return
    }

    // Add to list optimistically
    setResources((prev) => [
      {
        id: res.id,
        title,
        description,
        url,
        type,
        subject,
        targetClass,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])

    resetForm()
    setShowForm(false)
    setLoading(false)
  }

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete resource "${title}"? This cannot be undone.`)) return
    setActionLoading(id)
    try {
      const res = await deleteResource(id)
      if (res.success) {
        setResources((prev) => prev.filter((r) => r.id !== id))
      }
    } catch {
      alert('Failed to delete resource')
    } finally {
      setActionLoading(null)
    }
  }

  // Filters
  const distinctSubjects = [...new Set(resources.map((r) => r.subject).filter(Boolean))].sort()

  const filteredResources = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase())) ||
      (r.subject && r.subject.toLowerCase().includes(search.toLowerCase()))
    const matchesSubject = subjectFilter === 'ALL' || r.subject === subjectFilter
    const matchesClass = classFilter === 'ALL' || r.targetClass === classFilter || (!r.targetClass && classFilter === 'ALL')
    return matchesSearch && matchesSubject && matchesClass
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{resources.length}</div>
          <div className="stat-label">Total Resources</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{distinctSubjects.length}</div>
          <div className="stat-label">Subjects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{resources.filter((r) => !r.targetClass).length}</div>
          <div className="stat-label">Shared with All</div>
        </div>
      </div>

      {/* Add Resource Form Toggle */}
      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
          style={{ alignSelf: 'flex-start' }}
        >
          + Add New Resource
        </button>
      ) : (
        <div className="card animate-in" style={{ border: '1px solid var(--border-accent)' }}>
          <h3 style={{ marginBottom: '1rem' }}>📚 Add New Resource</h3>
          {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleCreate}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {/* Title */}
              <div className="form-group">
                <label className="form-label" htmlFor="res-title">Title *</label>
                <input
                  id="res-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Chapter 5 — Thermodynamics Notes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* URL */}
              <div className="form-group">
                <label className="form-label" htmlFor="res-url">URL / Link *</label>
                <input
                  id="res-url"
                  type="url"
                  className="form-input"
                  placeholder="https://drive.google.com/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              {/* Type */}
              <div className="form-group">
                <label className="form-label" htmlFor="res-type">Resource Type</label>
                <select
                  id="res-type"
                  className="form-input"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {RESOURCE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label className="form-label" htmlFor="res-subject">Subject</label>
                <input
                  id="res-subject"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Physics, Mathematics"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Target Class */}
              <div className="form-group">
                <label className="form-label" htmlFor="res-class">Share with Class</label>
                <select
                  id="res-class"
                  className="form-input"
                  value={targetClass}
                  onChange={(e) => setTargetClass(e.target.value)}
                >
                  <option value="">All Classes</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <span className="text-xs text-muted" style={{ marginTop: '0.25rem', display: 'block' }}>
                  Leave as &quot;All Classes&quot; to share with every student.
                </span>
              </div>

              {/* Description */}
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="res-desc">Description (optional)</label>
                <textarea
                  id="res-desc"
                  className="form-input"
                  placeholder="Brief description of this resource..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding…' : '📤 Add Resource'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => { resetForm(); setShowForm(false) }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filter */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <input
            type="text"
            placeholder="🔍 Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
          />
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="form-input"
          >
            <option value="ALL">All Subjects</option>
            {distinctSubjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="form-input"
          >
            <option value="ALL">All Classes</option>
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources List */}
      {filteredResources.length === 0 ? (
        <div className="card text-center animate-in" style={{ padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{ marginBottom: '0.5rem' }}>
            {resources.length === 0 ? 'No resources yet' : 'No matching resources'}
          </h3>
          <p className="text-muted text-sm">
            {resources.length === 0
              ? 'Share notes, PDFs, videos and links with your students.'
              : 'Try adjusting your search or filters.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {filteredResources.map((resource) => (
            <div key={resource.id} className="card card-sm animate-in" style={{ borderLeft: `4px solid var(--accent-1)` }}>
              <div className="flex-between" style={{ alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex-gap mb-1" style={{ alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem' }}>{getTypeIcon(resource.type)}</span>
                    <h4 style={{ margin: 0 }}>{resource.title}</h4>
                    {resource.subject && (
                      <span className="badge badge-active" style={{ fontSize: '0.7rem' }}>{resource.subject}</span>
                    )}
                    {resource.targetClass ? (
                      <span className="badge badge-inactive" style={{ fontSize: '0.7rem' }}>📎 Class: {resource.targetClass}</span>
                    ) : (
                      <span className="badge" style={{ fontSize: '0.7rem', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--accent-1)', border: '1px solid rgba(13, 148, 136, 0.2)' }}>🌐 All Classes</span>
                    )}
                  </div>
                  {resource.description && (
                    <p className="text-secondary text-xs" style={{ margin: '0.35rem 0 0', lineHeight: 1.4 }}>{resource.description}</p>
                  )}
                  <div className="flex-gap text-xs text-muted" style={{ marginTop: '0.5rem' }}>
                    <span>{getTypeLabel(resource.type)}</span>
                    <span>·</span>
                    <span>Added {new Date(resource.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="flex-gap" style={{ flexShrink: 0 }}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Open ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(resource.id, resource.title)}
                    disabled={actionLoading === resource.id}
                    className="btn btn-sm"
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                    title="Delete resource"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
