export default function StudentLoading() {
  return (
    <div className="global-loading-screen">
      <div className="loading-card animate-in">
        <div className="loading-logo-wrap">
          <div className="loading-pulse-ring" />
          <img
            src="/vishwvedlogo.jpeg"
            alt="Student Portal"
            width={64}
            height={64}
            className="loading-logo-img"
          />
        </div>

        <div className="loading-text-wrap">
          <div className="loading-brand-title">Student Portal</div>
          <div className="loading-brand-sub">Loading tests &amp; assessments...</div>
        </div>

        <div className="loading-bar-track">
          <div className="loading-bar-progress" />
        </div>

        <p className="loading-hint">Preparing your portal...</p>
      </div>
    </div>
  )
}
