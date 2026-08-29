import Link from 'next/link'

export const metadata = { title: 'Test Submitted — VishwaVed Academy' }

export default async function SubmittedPage({ searchParams }) {
  const sp = await searchParams
  const code = sp.code?.toString()

  return (
    <div className="page-center">
      <div className="card animate-in text-center" style={{ maxWidth: '460px' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Test Submitted!</h1>
        <p className="text-secondary" style={{ marginBottom: '1.5rem' }}>
          Your answers have been received and automatically graded. Results will be published by your teacher.
        </p>

        {code && (
          <div className="alert alert-info mb-3" style={{ textAlign: 'left' }}>
            <strong>Want to check your result later?</strong><br />
            Go to <em>View Result</em> and enter Test ID <strong>{code}</strong> along with your name and roll number.
          </div>
        )}

        <div className="flex-gap" style={{ justifyContent: 'center' }}>
          <Link href="/student/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          <Link href="/" className="btn btn-secondary">Home</Link>
        </div>
      </div>
    </div>
  )
}
