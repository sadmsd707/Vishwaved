import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '../../components/Navbar'
import InquirySection from '../../components/InquirySection'
import { COURSES_DATA, ALL_COURSES } from '../coursesData'

export async function generateStaticParams() {
  return Object.keys(COURSES_DATA).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const course = COURSES_DATA[slug]
  if (!course) {
    return {
      title: 'Course Not Found — VishwaVed Academy',
    }
  }

  return {
    title: `${course.title} — VishwaVed Science Academy`,
    description: course.description.slice(0, 160),
  }
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params
  const course = COURSES_DATA[slug]

  if (!course) {
    notFound()
  }

  const otherCourses = ALL_COURSES.filter((c) => c.slug !== slug)

  return (
    <>
      <Navbar />

      {/* ─── COURSE HERO ─── */}
      <section className="course-hero">
        <div className="course-hero-orb course-hero-orb-1" />
        <div className="course-hero-orb course-hero-orb-2" />

        <div className="container">
          {/* Breadcrumb */}
          <nav className="course-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/courses">Courses</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{course.shortTitle}</span>
          </nav>

          <div className="course-hero-content">
            <div className="course-hero-badges">
              <span className="course-badge-tag">{course.tag}</span>
              <span className="course-badge-pill">{course.badge}</span>
            </div>

            <div className="course-hero-title-wrap">
              <div className="course-hero-icon-large">{course.icon}</div>
              <h1 className="course-hero-title">{course.title}</h1>
            </div>

            <p className="course-hero-sub">{course.heroTagline}</p>

            <div className="course-hero-actions">
              <a href="#inquiry-section" className="btn btn-primary btn-lg">
                Enroll / Inquire Now ✍️
              </a>
              <a href="#exam-pattern" className="btn btn-secondary btn-lg">
                View Exam Pattern ↓
              </a>
              <a href="tel:+919309362791" className="btn btn-outline btn-lg course-call-btn">
                📞 Call Admissions
              </a>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="course-stats-card">
            <div className="course-stats-grid">
              {course.quickStats.map((st, i) => (
                <div key={i} className="course-stat-item">
                  <span className="course-stat-icon">{st.icon}</span>
                  <div className="course-stat-info">
                    <span className="course-stat-label">{st.label}</span>
                    <span className="course-stat-val">{st.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <main className="course-main-wrap">
        <div className="container">
          <div className="course-page-layout">
            {/* Left Main Stream */}
            <div className="course-main-content">
              {/* 01. Overview */}
              <section className="course-detail-section" id="overview">
                <div className="course-section-header">
                  <span className="course-section-number">01</span>
                  <div>
                    <span className="course-section-tag">Exam Overview</span>
                    <h2 className="course-section-title">About the Examination</h2>
                  </div>
                </div>
                <div className="course-rich-text">
                  <p>{course.description}</p>
                </div>
              </section>

              {/* 02. Eligibility */}
              <section className="course-detail-section" id="eligibility">
                <div className="course-section-header">
                  <span className="course-section-number">02</span>
                  <div>
                    <span className="course-section-tag">Requirements</span>
                    <h2 className="course-section-title">Eligibility &amp; Qualifying Criteria</h2>
                  </div>
                </div>

                <div className="eligibility-grid">
                  {Object.entries(course.eligibility).map(([key, value], idx) => {
                    const titles = {
                      qualification: 'Academic Qualification',
                      subjects: 'Required Subjects',
                      ageLimit: 'Age Limit',
                      attempts: 'Number of Attempts',
                      admissionCriteria: 'Board % / Cutoff',
                      academicCriteria: 'Qualifying Standard',
                      minimumMarks: 'Minimum Marks Required',
                      domicile: 'State Domicile / Quota',
                      streams: 'Eligible Streams',
                      boards: 'Recognized Boards',
                      selection: 'Admission & Selection',
                    }
                    const icons = {
                      qualification: '🎓',
                      subjects: '📚',
                      ageLimit: '🎂',
                      attempts: '🔁',
                      admissionCriteria: '📊',
                      academicCriteria: '🎯',
                      minimumMarks: '📈',
                      domicile: '📍',
                      streams: '🔬',
                      boards: '🏫',
                      selection: '📝',
                    }
                    return (
                      <div key={key} className="eligibility-card">
                        <div className="eligibility-card-header">
                          <span className="eligibility-icon">{icons[key] || '✅'}</span>
                          <h4>{titles[key] || key}</h4>
                        </div>
                        <p>{value}</p>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* 03. Exam Pattern */}
              <section className="course-detail-section" id="exam-pattern">
                <div className="course-section-header">
                  <span className="course-section-number">03</span>
                  <div>
                    <span className="course-section-tag">Structure</span>
                    <h2 className="course-section-title">Exam Pattern &amp; Marking Scheme</h2>
                  </div>
                </div>

                <div className="pattern-overview-cards">
                  <div className="pattern-stat-pill">
                    <span className="pill-label">Total Marks</span>
                    <span className="pill-val">{course.examPattern.totalMarks}</span>
                  </div>
                  <div className="pattern-stat-pill">
                    <span className="pill-label">Exam Duration</span>
                    <span className="pill-val">{course.examPattern.duration}</span>
                  </div>
                  <div className="pattern-stat-pill">
                    <span className="pill-label">Questions</span>
                    <span className="pill-val">{course.examPattern.attemptQuestions}</span>
                  </div>
                </div>

                <div className="marking-scheme-box">
                  <div className="marking-scheme-title">
                    <span>⚖️</span> Marking Scheme Details
                  </div>
                  <p>{course.examPattern.markingScheme}</p>
                </div>

                {/* Section Table / Breakdown */}
                <div className="pattern-sections-grid">
                  {course.examPattern.sections.map((sec, idx) => (
                    <div key={idx} className="pattern-section-card">
                      <div className="pattern-card-top">
                        <h4 className="pattern-subject-title">{sec.subject}</h4>
                        {sec.totalMarks && <span className="pattern-marks-badge">{sec.totalMarks} Marks</span>}
                      </div>
                      <div className="pattern-card-details">
                        {sec.mcqs && (
                          <div className="pattern-detail-row">
                            <span className="detail-label">MCQ Section:</span>
                            <span className="detail-value">{sec.mcqs}</span>
                          </div>
                        )}
                        {sec.numerical && (
                          <div className="pattern-detail-row">
                            <span className="detail-label">Questions Type:</span>
                            <span className="detail-value">{sec.numerical}</span>
                          </div>
                        )}
                      </div>
                      {sec.highlight && (
                        <div className="pattern-highlight">
                          <span className="highlight-icon">💡</span> {sec.highlight}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* 04. Key Syllabus Highlights */}
              <section className="course-detail-section" id="syllabus">
                <div className="course-section-header">
                  <span className="course-section-number">04</span>
                  <div>
                    <span className="course-section-tag">Curriculum</span>
                    <h2 className="course-section-title">Key Syllabus &amp; High-Yield Focus</h2>
                  </div>
                </div>

                <div className="syllabus-grid">
                  {course.syllabusHighlights.map((syl, idx) => (
                    <div key={idx} className="syllabus-card">
                      <h4 className="syllabus-subject-header">
                        <span>📖</span> {syl.subject}
                      </h4>
                      <ul className="syllabus-topics-list">
                        {syl.topics.map((t, tidx) => (
                          <li key={tidx}>
                            <span className="topic-bullet">›</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* 05. VishwaVed Coaching Edge */}
              <section className="course-detail-section" id="vishwved-edge">
                <div className="course-section-header">
                  <span className="course-section-number">05</span>
                  <div>
                    <span className="course-section-tag">Why VishwaVed</span>
                    <h2 className="course-section-title">The VishwaVed Preparation Advantage</h2>
                  </div>
                </div>

                <div className="vishwved-features-grid">
                  {course.vishwvedFeatures.map((feat, idx) => (
                    <div key={idx} className="vishwved-feat-box">
                      <div className="vishwved-feat-icon">{feat.icon}</div>
                      <h4>{feat.title}</h4>
                      <p>{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 06. Batches & Programs */}
              <section className="course-detail-section" id="batches">
                <div className="course-section-header">
                  <span className="course-section-number">06</span>
                  <div>
                    <span className="course-section-tag">Programs</span>
                    <h2 className="course-section-title">Available Batches &amp; Offerings</h2>
                  </div>
                </div>

                <div className="batches-cards-grid">
                  {course.batches.map((b, idx) => (
                    <div key={idx} className="batch-card">
                      <div className="batch-badge">Enrolling Now</div>
                      <h4 className="batch-name">{b.name}</h4>
                      <div className="batch-meta">
                        <div className="batch-meta-item">
                          <strong>Target:</strong> {b.target}
                        </div>
                        <div className="batch-meta-item">
                          <strong>Duration:</strong> {b.duration}
                        </div>
                        <div className="batch-meta-item">
                          <strong>Schedule:</strong> {b.schedule}
                        </div>
                      </div>
                      <div className="batch-features-list">
                        {b.features.map((f, fidx) => (
                          <div key={fidx} className="batch-feat-item">
                            <span className="check-icon">✓</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <a href="#inquiry-section" className="btn btn-primary batch-enroll-btn">
                        Inquire for this Batch →
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* 07. FAQs */}
              {course.faqs && course.faqs.length > 0 && (
                <section className="course-detail-section" id="faqs">
                  <div className="course-section-header">
                    <span className="course-section-number">07</span>
                    <div>
                      <span className="course-section-tag">Got Questions?</span>
                      <h2 className="course-section-title">Frequently Asked Questions</h2>
                    </div>
                  </div>

                  <div className="course-faqs-grid">
                    {course.faqs.map((faq, idx) => (
                      <div key={idx} className="course-faq-item">
                        <h4 className="faq-q">
                          <span className="faq-q-icon">Q.</span> {faq.q}
                        </h4>
                        <p className="faq-a">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="course-sidebar">
              <div className="course-sidebar-sticky">
                {/* Quick Navigation Card */}
                <div className="sidebar-widget">
                  <h4 className="sidebar-title">Quick Navigation</h4>
                  <ul className="sidebar-nav-links">
                    <li><a href="#overview">› Exam Overview</a></li>
                    <li><a href="#eligibility">› Eligibility Criteria</a></li>
                    <li><a href="#exam-pattern">› Pattern &amp; Marks</a></li>
                    <li><a href="#syllabus">› Syllabus Topics</a></li>
                    <li><a href="#vishwved-edge">› VishwaVed Advantage</a></li>
                    <li><a href="#batches">› Available Batches</a></li>
                    {course.faqs && <li><a href="#faqs">› FAQs</a></li>}
                    <li><a href="#inquiry-section">› Submit Inquiry</a></li>
                  </ul>
                </div>

                {/* Admission Helpline Widget */}
                <div className="sidebar-widget helpline-widget">
                  <div className="helpline-icon">📞</div>
                  <h4 className="helpline-title">Need Admission Guidance?</h4>
                  <p className="helpline-desc">Talk to our senior academic counselor for batch timings, fees, and test series details.</p>
                  <div className="helpline-buttons">
                    <a href="tel:+919309362791" className="btn btn-primary btn-sm btn-full">
                      Call 9309362791
                    </a>
                    <a href="tel:+918668655731" className="btn btn-secondary btn-sm btn-full">
                      Call 8668655731
                    </a>
                  </div>
                </div>

                {/* Other Courses Widget */}
                <div className="sidebar-widget">
                  <h4 className="sidebar-title">Explore Other Courses</h4>
                  <div className="other-courses-list">
                    {otherCourses.map((oc) => (
                      <Link key={oc.slug} href={`/courses/${oc.slug}`} className="other-course-link">
                        <span className="other-course-icon">{oc.icon}</span>
                        <div>
                          <div className="other-course-name">{oc.shortTitle}</div>
                          <div className="other-course-tag">{oc.tag}</div>
                        </div>
                        <span className="other-course-arrow">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ─── INQUIRY SECTION (Preselected Course) ─── */}
      <div id="inquiry-section" className="inquiry-footer-unified-wrap">
        <div className="inquiry-footer-unified-overlay" />
        <div className="inquiry-footer-unified-content">
          <InquirySection initialCourse={course.inquiryCourseName} />

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
