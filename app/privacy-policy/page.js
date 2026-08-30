import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — VishwaVed Science Academy',
  description: 'Read the privacy policy of VishwaVed Science Academy. Learn how we collect, use, and protect your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ─── HEADER ─── */}
      <header className="pp-header">
        <div className="container">
          <Link href="/" className="pp-back-link">
            <span className="pp-back-arrow">←</span> Back to Home
          </Link>
          <div className="pp-header-content">
            <div className="pp-badge">📄 Legal</div>
            <h1 className="pp-title">Privacy Policy</h1>
            <p className="pp-subtitle">
              Your privacy matters to us. This policy outlines how VishwaVed Science Academy collects, uses, and safeguards your information.
            </p>
            <div className="pp-effective">
              <span className="pp-effective-icon">🕐</span>
              Effective Date: 1st January 2025
            </div>
          </div>
        </div>
      </header>

      {/* ─── CONTENT ─── */}
      <main className="pp-main">
        <div className="container">
          <div className="pp-layout">
            {/* Table of Contents */}
            <aside className="pp-toc">
              <div className="pp-toc-title">Contents</div>
              <nav>
                <ul className="pp-toc-list">
                  <li><a href="#information-we-collect">Information We Collect</a></li>
                  <li><a href="#how-we-use">How We Use Your Information</a></li>
                  <li><a href="#data-sharing">Data Sharing &amp; Disclosure</a></li>
                  <li><a href="#data-security">Data Security</a></li>
                  <li><a href="#student-data">Student Data Protection</a></li>
                  <li><a href="#cookies">Cookies &amp; Tracking</a></li>
                  <li><a href="#your-rights">Your Rights</a></li>
                  <li><a href="#third-party">Third-Party Services</a></li>
                  <li><a href="#changes">Policy Changes</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="pp-content">
              <section className="pp-section" id="information-we-collect">
                <div className="pp-section-number">01</div>
                <h2>Information We Collect</h2>
                <p>We collect information to provide better services to our students and their families. The types of information we collect include:</p>

                <div className="pp-card">
                  <h3>📋 Personal Information</h3>
                  <ul>
                    <li>Full name and date of birth</li>
                    <li>Email address and phone number</li>
                    <li>Parent/guardian contact details</li>
                    <li>Academic records and class/grade information</li>
                    <li>Residential address</li>
                  </ul>
                </div>

                <div className="pp-card">
                  <h3>💻 Technical Information</h3>
                  <ul>
                    <li>Device information and browser type</li>
                    <li>IP address and approximate location</li>
                    <li>Login timestamps and session duration</li>
                    <li>Pages visited on our platform</li>
                  </ul>
                </div>

                <div className="pp-card">
                  <h3>📝 Assessment Data</h3>
                  <ul>
                    <li>Test responses and scores</li>
                    <li>Performance analytics and progress reports</li>
                    <li>Time spent on each question/section</li>
                    <li>Practice test history</li>
                  </ul>
                </div>
              </section>

              <section className="pp-section" id="how-we-use">
                <div className="pp-section-number">02</div>
                <h2>How We Use Your Information</h2>
                <p>Your information is used solely for educational purposes and to improve our services:</p>
                <ul>
                  <li><strong>Account Management:</strong> Creating and maintaining student and faculty accounts on our portal.</li>
                  <li><strong>Academic Services:</strong> Administering online tests, generating performance reports, and tracking progress.</li>
                  <li><strong>Communication:</strong> Sending test schedules, results, announcements, and important updates via email or SMS.</li>
                  <li><strong>Improvement:</strong> Analyzing usage patterns to enhance our platform, courses, and teaching methods.</li>
                  <li><strong>Support:</strong> Responding to inquiries and providing technical assistance.</li>
                  <li><strong>Compliance:</strong> Meeting legal requirements and regulatory obligations.</li>
                </ul>
              </section>

              <section className="pp-section" id="data-sharing">
                <div className="pp-section-number">03</div>
                <h2>Data Sharing &amp; Disclosure</h2>
                <p>We value your trust and are committed to protecting your data. We do <strong>not</strong> sell, rent, or trade your personal information. Data may be shared only in the following circumstances:</p>
                <ul>
                  <li><strong>With Parents/Guardians:</strong> Performance reports and academic progress of minor students are shared with their registered parents or guardians.</li>
                  <li><strong>With Faculty:</strong> Relevant academic data is accessible to authorized teachers for instructional purposes.</li>
                  <li><strong>Service Providers:</strong> Trusted third-party services (e.g., hosting, email delivery) that assist in operating our platform, bound by strict confidentiality agreements.</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental regulation.</li>
                </ul>
              </section>

              <section className="pp-section" id="data-security">
                <div className="pp-section-number">04</div>
                <h2>Data Security</h2>
                <p>We implement robust security measures to protect your data:</p>
                <div className="pp-security-grid">
                  <div className="pp-security-item">
                    <span className="pp-security-icon">🔒</span>
                    <div>
                      <strong>Encryption</strong>
                      <p>All data in transit is encrypted using SSL/TLS protocols.</p>
                    </div>
                  </div>
                  <div className="pp-security-item">
                    <span className="pp-security-icon">🛡️</span>
                    <div>
                      <strong>Access Controls</strong>
                      <p>Role-based access ensures only authorized personnel can view sensitive data.</p>
                    </div>
                  </div>
                  <div className="pp-security-item">
                    <span className="pp-security-icon">💾</span>
                    <div>
                      <strong>Regular Backups</strong>
                      <p>Data is regularly backed up to prevent loss from technical failures.</p>
                    </div>
                  </div>
                  <div className="pp-security-item">
                    <span className="pp-security-icon">🔍</span>
                    <div>
                      <strong>Monitoring</strong>
                      <p>Our systems are monitored for unauthorized access and suspicious activity.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="pp-section" id="student-data">
                <div className="pp-section-number">05</div>
                <h2>Student Data Protection</h2>
                <p>We take extra care with student data, especially for minors:</p>
                <ul>
                  <li>Student accounts for minors are created only with parental/guardian consent.</li>
                  <li>Student data is used exclusively for educational and assessment purposes.</li>
                  <li>We do not display student information publicly without explicit consent.</li>
                  <li>Parents/guardians may request access to, correction of, or deletion of their child&apos;s data at any time.</li>
                  <li>Student data is retained only as long as necessary for academic purposes and is securely deleted upon request or account closure.</li>
                </ul>
              </section>

              <section className="pp-section" id="cookies">
                <div className="pp-section-number">06</div>
                <h2>Cookies &amp; Tracking</h2>
                <p>Our platform uses cookies and similar technologies to:</p>
                <ul>
                  <li><strong>Essential Cookies:</strong> Maintain your login session and ensure platform functionality.</li>
                  <li><strong>Analytics Cookies:</strong> Understand how users interact with our platform to improve the experience.</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences for future visits.</li>
                </ul>
                <p>You can manage cookie preferences through your browser settings. Disabling essential cookies may affect platform functionality.</p>
              </section>

              <section className="pp-section" id="your-rights">
                <div className="pp-section-number">07</div>
                <h2>Your Rights</h2>
                <p>You have the following rights regarding your personal data:</p>
                <div className="pp-rights-grid">
                  <div className="pp-right-item">
                    <span className="pp-right-icon">👁️</span>
                    <strong>Access</strong>
                    <p>Request a copy of your personal data held by us.</p>
                  </div>
                  <div className="pp-right-item">
                    <span className="pp-right-icon">✏️</span>
                    <strong>Correction</strong>
                    <p>Request correction of inaccurate or incomplete data.</p>
                  </div>
                  <div className="pp-right-item">
                    <span className="pp-right-icon">🗑️</span>
                    <strong>Deletion</strong>
                    <p>Request deletion of your data, subject to legal obligations.</p>
                  </div>
                  <div className="pp-right-item">
                    <span className="pp-right-icon">📤</span>
                    <strong>Portability</strong>
                    <p>Receive your data in a portable, machine-readable format.</p>
                  </div>
                </div>
                <p style={{ marginTop: '1rem' }}>To exercise any of these rights, please contact us using the details provided below.</p>
              </section>

              <section className="pp-section" id="third-party">
                <div className="pp-section-number">08</div>
                <h2>Third-Party Services</h2>
                <p>Our platform may contain links to third-party websites or integrate with external services. We are not responsible for the privacy practices of these external sites. We recommend reviewing their privacy policies independently.</p>
                <p>Third-party services we may use include:</p>
                <ul>
                  <li>Cloud hosting and database services</li>
                  <li>Email and SMS communication providers</li>
                  <li>Analytics and performance monitoring tools</li>
                </ul>
              </section>

              <section className="pp-section" id="changes">
                <div className="pp-section-number">09</div>
                <h2>Policy Changes</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes:</p>
                <ul>
                  <li>We will update the &quot;Effective Date&quot; at the top of this page.</li>
                  <li>We will notify registered users via email or platform announcement.</li>
                  <li>Continued use of our services after changes constitutes acceptance of the updated policy.</li>
                </ul>
              </section>

              <section className="pp-section" id="contact">
                <div className="pp-section-number">10</div>
                <h2>Contact Us</h2>
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
                <div className="pp-contact-card">
                  <div className="pp-contact-item">
                    <span>🏫</span>
                    <div>
                      <strong>VishwaVed Science Academy</strong>
                      <p>P-97, near Bank of Maharashtra, MIDC, Baramati</p>
                    </div>
                  </div>
                  <div className="pp-contact-item">
                    <span>📞</span>
                    <div>
                      <strong>Phone</strong>
                      <p><a href="tel:+919309362791">9309362791</a> / <a href="tel:+918668655731">8668655731</a></p>
                    </div>
                  </div>
                  <div className="pp-contact-item">
                    <span>✉️</span>
                    <div>
                      <strong>Email</strong>
                      <p><a href="mailto:vishw.vedacademy@gmail.com">vishw.vedacademy@gmail.com</a></p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="pp-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} VishwaVed Science Academy. All rights reserved.</p>
          <Link href="/">← Return to Homepage</Link>
        </div>
      </footer>
    </>
  )
}
