import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-center">
      <div className="card text-center animate-in" style={{ maxWidth: '420px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🔍</div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Page Not Found</h1>
        <p className="text-secondary mb-4">The page you&apos;re looking for doesn&apos;t exist or you don&apos;t have access.</p>
        <div className="flex-gap" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">Go Home</Link>
          <Link href="/student" className="btn btn-secondary">Student Portal</Link>
        </div>
      </div>
    </div>
  )
}
