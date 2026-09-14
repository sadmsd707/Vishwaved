import Link from 'next/link'
import { getStudentSessionRequired } from '@/lib/session'
import { logoutStudent } from '@/actions/student-auth'
import StudentNav from '@/app/components/StudentNav'
import { getStudentResources } from '@/actions/resources'

export const metadata = { title: 'Resources — VishwaVed Academy' }

const TYPE_ICONS = {
  LINK: '🔗',
  PDF: '📄',
  VIDEO: '🎬',
  NOTES: '📝',
  OTHER: '📁',
}

const TYPE_LABELS = {
  LINK: 'Link / Website',
  PDF: 'PDF Document',
  VIDEO: 'Video',
  NOTES: 'Notes',
  OTHER: 'Other',
}

export default async function StudentResourcesPage() {
  const session = await getStudentSessionRequired()
  const student = session.student

  const resources = await getStudentResources(student.class)

  // Group by subject
  const subjects = [...new Set(resources.map((r) => r.subject).filter(Boolean))].sort()
  const noSubjectResources = resources.filter((r) => !r.subject)

  return (
    <div className="page">
      <StudentNav
        studentName={student.name}
        studentId={student.id}
        studentClass={student.class}
        logoutAction={logoutStudent}
      />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="flex-between mb-4">
          <div>
            <h1>📚 Study Resources</h1>
            <p className="text-secondary text-sm mt-1">
              Notes, videos, PDFs and links shared by your teachers for Class {student.class}.
            </p>
          </div>
          <Link href="/student/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
        </div>

        {/* Stats */}
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value">{resources.length}</div>
            <div className="stat-label">Total Resources</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{subjects.length}</div>
            <div className="stat-label">Subjects</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{resources.filter((r) => r.type === 'VIDEO').length}</div>
            <div className="stat-label">Videos</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{resources.filter((r) => r.type === 'PDF' || r.type === 'NOTES').length}</div>
            <div className="stat-label">Notes / PDFs</div>
          </div>
        </div>

        {/* Resources */}
        {resources.length === 0 ? (
          <div className="card text-center animate-in" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
            <h2 style={{ marginBottom: '0.75rem' }}>No resources available yet</h2>
            <p className="text-muted" style={{ maxWidth: '420px', margin: '0 auto' }}>
              Your teachers haven&apos;t shared any study materials for your class yet. Check back later!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Resources grouped by subject */}
            {subjects.map((subj) => {
              const subjectResources = resources.filter((r) => r.subject === subj)
              return (
                <section key={subj}>
                  <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ background: 'var(--accent-1)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                      {subj}
                    </span>
                    <span className="text-xs text-muted">({subjectResources.length} resources)</span>
                  </h2>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {subjectResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </section>
              )
            })}

            {/* Resources without subject */}
            {noSubjectResources.length > 0 && (
              <section>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ background: 'var(--bg-elevated)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                    General
                  </span>
                  <span className="text-xs text-muted">({noSubjectResources.length} resources)</span>
                </h2>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {noSubjectResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ResourceCard({ resource }) {
  const icon = TYPE_ICONS[resource.type] || '📁'
  const typeLabel = TYPE_LABELS[resource.type] || resource.type

  return (
    <div className="card card-sm animate-in" style={{ borderLeft: '4px solid var(--accent-1)' }}>
      <div className="flex-between" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex-gap mb-1" style={{ alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem' }}>{icon}</span>
            <h4 style={{ margin: 0 }}>{resource.title}</h4>
          </div>
          {resource.description && (
            <p className="text-secondary text-xs" style={{ margin: '0.35rem 0 0', lineHeight: 1.4 }}>
              {resource.description}
            </p>
          )}
          <div className="flex-gap text-xs text-muted" style={{ marginTop: '0.5rem' }}>
            <span>{typeLabel}</span>
            <span>·</span>
            <span>By {resource.teacherName}</span>
            <span>·</span>
            <span>{new Date(resource.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            {resource.type === 'VIDEO' ? '▶ Watch' : resource.type === 'PDF' ? '📥 Download' : 'Open ↗'}
          </a>
        </div>
      </div>
    </div>
  )
}
