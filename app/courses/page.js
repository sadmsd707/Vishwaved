import Link from 'next/link'
import Navbar from '../components/Navbar'
import InquirySection from '../components/InquirySection'
import { ALL_COURSES } from './coursesData'

export const metadata = {
  title: 'Our Courses & Exam Programs — VishwaVed Science Academy',
  description: 'Explore comprehensive coaching programs for JEE Main, JEE Advanced, NEET, MHT-CET, and Foundation (Class 8th-10th) at VishwaVed Academy.',
}

export default function CoursesCatalogPage() {
  return (
    <>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="course-hero">
        <div className="course-hero-orb course-hero-orb-1" />
        <div className="course-hero-orb course-hero-orb-2" />

        <div className="container">
          <nav className="course-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Our Courses</span>
          </nav>

          <div className="course-hero-content text-center" style={{ margin: '0 auto', maxWidth: '840px' }}>
            <div className="course-hero-badges" style={{ justifyContent: 'center' }}>
              <span className="course-badge-tag">Academic Excellence</span>
              <span className="course-badge-pill">Admissions Open 2025–26</span>
            </div>

            <h1 className="course-hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Comprehensive <span className="gradient-text">Curriculum</span> for Every <span className="gradient-text-warm">Aspiration</span>
            </h1>

            <p className="course-hero-sub" style={{ margin: '1rem auto 2rem' }}>
              From foundational sciences to competitive exam prep, our courses are designed with expert faculty, rigorous mock testing, and personal mentoring to build mastery and confidence.
            </p>

            <div className="course-hero-actions" style={{ justifyContent: 'center' }}>
              <a href="#courses-grid" className="btn btn-primary btn-lg">Explore Programs ↓</a>
              <a href="#inquiry-section" className="btn btn-secondary btn-lg">Inquire for Admission ✍️</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COURSES GRID ─── */}
      <main className="section" id="courses-grid" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="section-header-compact text-center" style={{ marginBottom: '3rem' }}>
            <div className="section-tag">Programs Offered</div>
            <h2 className="section-heading">Select an Exam to View Complete Details</h2>
            <p className="section-sub" style={{ maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Click on any course card below to view syllabus breakdown, exam pattern, eligibility criteria, and batch schedules.
            </p>
          </div>

          <div className="catalog-grid">
            {ALL_COURSES.map((c) => (
              <div key={c.slug} className="catalog-card">
                <div className="catalog-card-header">
                  <div className="catalog-card-icon-wrap">
                    <span className="catalog-card-icon">{c.icon}</span>
                  </div>
                  <div className="catalog-card-tags">
                    <span className="catalog-tag">{c.tag}</span>
                    <span className="catalog-badge">{c.badge}</span>
                  </div>
                </div>

                <div className="catalog-card-body">
                  <h3 className="catalog-card-title">{c.title}</h3>
                  <p className="catalog-card-desc">{c.description.slice(0, 150)}...</p>

                  <div className="catalog-card-stats">
                    {c.quickStats.slice(0, 3).map((st, i) => (
                      <div key={i} className="catalog-stat-pill">
                        <span className="stat-pill-label">{st.label}:</span>
                        <span className="stat-pill-val">{st.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="catalog-card-footer">
                  <Link href={`/courses/${c.slug}`} className="btn btn-primary btn-full catalog-cta-btn">
                    <span>View Exam Information</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ─── UNIFIED INQUIRY & FOOTER SECTION ─── */}
      <div id="inquiry-section" className="inquiry-footer-unified-wrap">
        <div className="inquiry-footer-unified-overlay" />
        <div className="inquiry-footer-unified-content">
          <InquirySection />

          {/* Footer */}
          <footer className="academy-footer" id="contact">
            <div className="container">
              <div className="footer-grid">
                <div className="footer-col">
                  <Link href="/" className="brand-logo" style={{ marginBottom: '0.75rem' }}>
                    <div className="brand-icon" style={{ overflow: 'hidden', padding: 0 }}>
                      <img src="/vishwvedlogo.jpeg" alt="VishwaVed Logo" width="38" height="38" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div className="brand-name">VishwaVed</div>
                      <div className="brand-sub">Academy</div>
                    </div>
                  </Link>
                  <p className="footer-desc">
                    Empowering students with knowledge, skills, and confidence to excel in academics and competitive entrance exams.
                  </p>

                  <div className="footer-map-container">
                    <iframe
                      title="Vishwved Science Academy Location Map"
                      src="https://maps.google.com/maps?q=18.1831149,74.6084778+(Vishwved+science+academy)&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="footer-map-iframe"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                    <a
                      href="https://maps.app.goo.gl/QiHsDKMxjG1PszoU7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-map-link-btn"
                    >
                      <span>📍</span> Open in Google Maps ↗
                    </a>
                  </div>
                </div>

                <div className="footer-col">
                  <h4>All Courses</h4>
                  <ul className="footer-links">
                    <li><Link href="/courses/jee-mains">JEE (Main)</Link></li>
                    <li><Link href="/courses/jee-advanced">JEE (Advanced)</Link></li>
                    <li><Link href="/courses/neet">NEET (Medical)</Link></li>
                    <li><Link href="/courses/mht-cet">MHT-CET (State CET)</Link></li>
                    <li><Link href="/courses/foundation">Foundation (Class 8–10)</Link></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Portals</h4>
                  <ul className="footer-links">
                    <li><Link href="/student">Student Portal</Link></li>
                    <li><Link href="/teacher/login">Faculty Login</Link></li>
                    <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Contact Us</h4>
                  <ul className="footer-links">
                    <li>
                      <a
                        href="https://maps.app.goo.gl/QiHsDKMxjG1PszoU7"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit' }}
                      >
                        📍 P-97, near Bank of Maharashtra, MIDC, Baramati.
                      </a>
                    </li>
                    <li>📞 <a href="tel:+919309362791">9309362791</a> / <a href="tel:+918668655731">8668655731</a></li>
                    <li>📞 <a href="tel:+918766579632">8766579632</a> / <a href="tel:+919096346262">9096346262</a></li>
                    <li>✉️ <a href="mailto:vishw.vedacademy@gmail.com">vishw.vedacademy@gmail.com</a></li>
                    <li>🕐 Mon–Sat: 8 AM – 8 PM</li>
                  </ul>
                </div>
              </div>

              <div className="footer-bottom">
                <span>© {new Date().getFullYear()} VishwaVed Academy. All rights reserved.</span>
                <span><Link href="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link> · Built with ❤️ for education</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
