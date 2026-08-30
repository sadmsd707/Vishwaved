export default function TeacherLoading() {
  return (
    <div className="global-loading-screen">
      <div className="loading-card animate-in">
        <div className="loading-logo-wrap">
          <div className="loading-pulse-ring" />
          <img
            src="/vishwvedlogo.jpeg"
            alt="Faculty Portal"
            width={64}
            height={64}
            className="loading-logo-img"
          />
        </div>

        <div className="loading-text-wrap">
          <div className="loading-brand-title">Faculty Portal</div>
          <div className="loading-brand-sub">Loading dashboard &amp; records...</div>
        </div>

        <div className="loading-bar-track">
          <div className="loading-bar-progress" />
        </div>

        <p className="loading-hint">Please wait a moment</p>
      </div>
    </div>
  )
}
