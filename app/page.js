import Link from 'next/link'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'VishwaVed Academy — Excellence in Education & Online Testing',
  description: 'Premier educational academy empowering students with expert faculty, modern courses, and smart online assessments.',
}

export default function LandingPage() {
  return (
    <>
      {/* ─── NAVIGATION (with 3-lines menu on top corner) ─── */}
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="academy-hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="hero-content">
          <div className="hero-pill">
            <span>✨</span>
            <span>Empowering Minds · Shaping Futures</span>
          </div>

          <h1 className="hero-title">
            Where <span className="gradient-text">Knowledge</span> Meets <span className="gradient-text-warm">Excellence</span>
          </h1>

          <p className="hero-desc">
            VishwaVed Academy provides world-class education through expert faculty, comprehensive courses, and smart online assessment — empowering every student to achieve their full potential.
          </p>

          <div className="hero-cta-row">
            <a href="#courses" className="btn btn-primary btn-lg">Explore Courses ↓</a>
          </div>
        </div>
      </section>

      {/* ─── STATS RIBBON ─── */}
      <section className="stats-ribbon">
        <div className="container">
          <div className="stats-ribbon-grid">
            <div>
              <div className="ribbon-stat-num">500+</div>
              <div className="ribbon-stat-label">Students Enrolled</div>
            </div>
            <div>
              <div className="ribbon-stat-num">50+</div>
              <div className="ribbon-stat-label">Courses Offered</div>
            </div>
            <div>
              <div className="ribbon-stat-num">30+</div>
              <div className="ribbon-stat-label">Expert Faculty</div>
            </div>
            <div>
              <div className="ribbon-stat-num">15+</div>
              <div className="ribbon-stat-label">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-emoji">🏫</div>
              <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: 'var(--accent-3)', fontWeight: 600, position: 'relative', zIndex: 1 }}>
                Building Tomorrow&apos;s Leaders, Today
              </p>
            </div>
            <div className="about-text">
              <div className="section-tag">About Us</div>
              <h2 className="section-heading">Nurturing Potential, Inspiring Growth</h2>
              <p>
                VishwaVed Academy stands as a beacon of educational excellence, committed to fostering holistic development in every student. With a blend of traditional wisdom and modern pedagogy, we create an environment where curiosity thrives.
              </p>
              <p>
                Our state-of-the-art online testing platform allows seamless assessments, real-time results, and data-driven insights — ensuring every learner stays on the path to success.
              </p>
              <div className="about-badges">
                <div className="about-badge">
                  <span className="about-badge-icon">🎯</span>
                  <span>Result-Oriented Approach</span>
                </div>
                <div className="about-badge">
                  <span className="about-badge-icon">💡</span>
                  <span>Innovation-Driven Teaching</span>
                </div>
                <div className="about-badge">
                  <span className="about-badge-icon">🌐</span>
                  <span>Smart Online Assessments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COURSES ─── */}
      <section className="section" id="courses">
        <div className="container">
          <div className="section-tag">Our Courses</div>
          <h2 className="section-heading">Comprehensive Curriculum for Every Aspiration</h2>
          <p className="section-sub">From foundational sciences to competitive exam prep, our courses are designed to build mastery and confidence.</p>

          <div className="courses-grid">
            {[
              { icon: '🔬', title: 'Science', desc: 'Physics, Chemistry & Biology with hands-on practicals and conceptual clarity for board and competitive exams.', tag: 'Class 8–12' },
              { icon: '📐', title: 'Mathematics', desc: 'Algebra, Calculus, Geometry and problem-solving — building strong logical foundations.', tag: 'Class 8–12' },
              { icon: '⚙️', title: 'Engineering Prep', desc: 'JEE Main & Advanced preparation with expert coaching, mock tests, and personalized guidance.', tag: 'JEE / CET' },
              { icon: '📊', title: 'Commerce', desc: 'Accounts, Economics, Business Studies — preparing future chartered accountants and entrepreneurs.', tag: 'Class 11–12' },
              { icon: '🏆', title: 'Competitive Exams', desc: 'NEET, JEE, CET, Olympiad preparation with curated test series and performance analytics.', tag: 'All Levels' },
              { icon: '💻', title: 'Computer Science', desc: 'Programming, Data Structures, and Digital Literacy — building the tech leaders of tomorrow.', tag: 'Class 8–12' },
            ].map((c) => (
              <div key={c.title} className="course-card">
                <div>
                  <div className="course-icon">{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
                <div className="course-tag">{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section" id="features">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">Why VishwaVed?</div>
            <h2 className="section-heading">What Sets Us Apart</h2>
            <p className="section-sub" style={{ margin: '0 auto 3rem' }}>We combine experienced teaching with cutting-edge technology to deliver exceptional learning outcomes.</p>
          </div>

          <div className="features-grid">
            {[
              { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Highly qualified teachers with years of experience in board and competitive exam coaching.' },
              { icon: '🧪', title: 'Modern Labs', desc: 'Well-equipped science and computer labs for practical, hands-on learning experiences.' },
              { icon: '📱', title: 'Online Testing', desc: 'Seamless MCQ and numerical tests with instant grading, analytics, and performance tracking.' },
              { icon: '📈', title: 'Proven Results', desc: 'Consistent track record of top ranks in board exams, JEE, NEET, and other competitive exams.' },
            ].map((f) => (
              <div key={f.title} className="feature-box">
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FACULTY ─── */}
      <section className="section" id="faculty">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">Our Faculty</div>
            <h2 className="section-heading">Learn from the Best Minds</h2>
            <p className="section-sub" style={{ margin: '0 auto 3rem' }}>Our passionate educators bring decades of combined experience across diverse disciplines.</p>
          </div>

          <div className="faculty-grid">
            {[
              { emoji: '👨‍🔬', name: 'Dr. Rajesh Patil', role: 'Physics & JEE Coach', desc: 'Ph.D. in Physics. 18+ years coaching JEE aspirants with a 95% success rate.' },
              { emoji: '👩‍🏫', name: 'Prof. Anjali Deshmukh', role: 'Mathematics', desc: 'M.Sc. Mathematics. Known for making complex concepts crystal clear.' },
              { emoji: '👨‍💻', name: 'Mr. Suresh Kulkarni', role: 'Computer Science', desc: 'B.Tech IIT. Full-stack developer turned passionate CS educator.' },
              { emoji: '👩‍🔬', name: 'Dr. Priya Sharma', role: 'Chemistry & NEET', desc: 'Ph.D. Chemistry. Specializes in organic chemistry for competitive exams.' },
            ].map((f) => (
              <div key={f.name} className="faculty-card">
                <div className="faculty-avatar">{f.emoji}</div>
                <h4>{f.name}</h4>
                <div className="role">{f.role}</div>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">Student Stories</div>
            <h2 className="section-heading">What Our Students Say</h2>
            <p className="section-sub" style={{ margin: '0 auto 3rem' }}>Real stories from students who achieved their goals with VishwaVed Academy.</p>
          </div>

          <div className="testimonials-grid">
            {[
              { quote: 'VishwaVed Academy transformed my JEE preparation. The faculty is incredible and the online tests helped me track my progress perfectly!', name: 'Aditya Joshi', detail: 'JEE Advanced — AIR 342', avatar: '🧑' },
              { quote: 'The personalized attention and regular assessments made all the difference. I scored 98% in my board exams thanks to VishwaVed!', name: 'Sneha Pawar', detail: 'HSC Topper — 98.4%', avatar: '👩' },
              { quote: 'The online test platform is brilliant. I could practice anywhere, anytime, and the instant results helped me improve my weak areas quickly.', name: 'Rahul Bhosale', detail: 'NEET — 680/720', avatar: '👦' },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-detail">{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT / CTA ─── */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-card">
            <h2 style={{ marginBottom: '1.75rem' }}>Contact <span className="gradient-text">Us</span></h2>

            <div className="contact-info-grid">
              <div className="contact-info-item">
                <span className="contact-info-icon">📍</span>
                <span>P-97, near Bank of Maharastra , MIDC , Baramati.</span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">📞</span>
                <span>
                  <a href="tel:+919309362791">9309362791</a>, <a href="tel:+918668655731">8668655731</a><br />
                  <a href="tel:+918766579632">8766579632</a>, <a href="tel:+919096346262">9096346262</a>
                </span>
              </div>
              <div className="contact-info-item">
                <span className="contact-info-icon">✉️</span>
                <span><a href="mailto:vishw.vedacademy@gmail.com">vishw.vedacademy@gmail.com</a></span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/student" className="btn btn-primary btn-lg">Student Portal</Link>
              <Link href="/teacher/login" className="btn btn-accent btn-lg">Faculty Login</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="academy-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <Link href="/" className="brand-logo" style={{ marginBottom: '0.75rem' }}>
                <div className="brand-icon">🎓</div>
                <div>
                  <div className="brand-name">VishwaVed</div>
                  <div className="brand-sub">Academy</div>
                </div>
              </Link>
              <p className="footer-desc">
                Empowering students with knowledge, skills, and confidence to excel in academics and beyond.
              </p>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#faculty">Faculty</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Portals</h4>
              <ul className="footer-links">
                <li><Link href="/student">Student Portal</Link></li>
                <li><Link href="/teacher/login">Faculty Login</Link></li>

              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="footer-links">
                <li>📍 P-97, near Bank of Maharastra , MIDC , Baramati.</li>
                <li>📞 <a href="tel:+919309362791">9309362791</a> / <a href="tel:+918668655731">8668655731</a></li>
                <li>📞 <a href="tel:+918766579632">8766579632</a> / <a href="tel:+919096346262">9096346262</a></li>
                <li>✉️ <a href="mailto:vishw.vedacademy@gmail.com">vishw.vedacademy@gmail.com</a></li>
                <li>🕐 Mon–Sat: 8 AM – 8 PM</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} VishwaVed Academy. All rights reserved.</span>
            <span>Built with ❤️ for education</span>
          </div>
        </div>
      </footer>
    </>
  )
}
