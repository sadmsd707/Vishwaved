export default function Loading() {
  return (
    <div className="global-loading-screen">
      <div className="loading-card animate-in">
        <div className="loading-logo-wrap">
          <div className="loading-pulse-ring" />
          <div className="loading-pulse-ring-2" />
          <img
            src="/vishwvedlogo.jpeg"
            alt="VishwaVed Academy"
            width={64}
            height={64}
            className="loading-logo-img"
          />
        </div>

        <div className="loading-text-wrap">
          <div className="loading-brand-title">VishwaVed Academy</div>
          <div className="loading-brand-sub">Empowering Minds · Shaping Futures</div>
        </div>

        <div className="loading-bar-track">
          <div className="loading-bar-progress" />
        </div>

        <p className="loading-hint">Loading, please wait...</p>
      </div>
    </div>
  )
}
