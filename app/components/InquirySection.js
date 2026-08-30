'use client'
import { useState, useEffect, useRef } from 'react'

const COURSES = [
  'JEE (Mains)',
  'JEE (Advance)',
  'NEET (Medical)',
  'MHT-CET (Engineering / Pharmacy)',
  'FOUNDATION (Class 8th – 10th)',
  '11th & 12th Science (Board + Competitive)',
]

export default function InquirySection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    message: '',
    captchaInput: '',
  })

  const [captchaCode, setCaptchaCode] = useState('')
  const [status, setStatus] = useState({ type: '', msg: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const canvasRef = useRef(null)

  // Generate 4-character alphanumeric captcha
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
    let code = ''
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(code)
    drawCaptcha(code)
  }

  // Draw captcha on canvas with distortion lines, background noise & color variations
  const drawCaptcha = (code) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height)
    bgGrad.addColorStop(0, '#fef3c7')
    bgGrad.addColorStop(0.5, '#fde68a')
    bgGrad.addColorStop(1, '#fef08a')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, width, height)

    // Random noise dots
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 150}, ${Math.random() * 100}, ${Math.random() * 80}, 0.25)`
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 1, 0, Math.PI * 2)
      ctx.fill()
    }

    // Random strike lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(136, 19, 55, ${0.35 + Math.random() * 0.3})`
      ctx.lineWidth = 1.5 + Math.random() * 1.5
      ctx.beginPath()
      ctx.moveTo(Math.random() * 15, Math.random() * height)
      ctx.bezierCurveTo(
        width * 0.3, Math.random() * height,
        width * 0.7, Math.random() * height,
        width - Math.random() * 10, Math.random() * height
      )
      ctx.stroke()
    }

    // Draw characters with distinct rotations & fonts
    const charList = code.split('')
    const startX = 14
    const charSpacing = (width - 28) / charList.length

    charList.forEach((char, index) => {
      ctx.save()
      const x = startX + index * charSpacing + Math.random() * 4
      const y = height / 2 + (Math.random() * 8 - 4) + 6
      const angle = (Math.random() - 0.5) * 0.35

      ctx.translate(x, y)
      ctx.rotate(angle)

      const colors = ['#7c2d12', '#831843', '#1e3a8a', '#14532d', '#701a75']
      ctx.fillStyle = colors[index % colors.length]
      ctx.font = 'bold 22px "Outfit", "Courier New", monospace'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)'
      ctx.shadowOffsetX = 1
      ctx.shadowOffsetY = 1
      ctx.shadowBlur = 2

      ctx.fillText(char, 0, 0)
      ctx.restore()
    })
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (status.msg) setStatus({ type: '', msg: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setStatus({ type: 'error', msg: 'Please enter your full name.' })
      return
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setStatus({ type: 'error', msg: 'Please enter a valid 10-digit phone number.' })
      return
    }
    if (!formData.course) {
      setStatus({ type: 'error', msg: 'Please select a course.' })
      return
    }
    if (formData.captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setStatus({ type: 'error', msg: 'Invalid captcha code. Please try again.' })
      generateCaptcha()
      setFormData((prev) => ({ ...prev, captchaInput: '' }))
      return
    }

    setIsSubmitting(true)

    // Simulate submission / store
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmittedData({ ...formData })
      setStatus({
        type: 'success',
        msg: 'Thank you! Your inquiry has been submitted successfully. Our admission team will contact you shortly.',
      })
      setFormData({
        name: '',
        phone: '',
        course: '',
        message: '',
        captchaInput: '',
      })
      generateCaptcha()
    }, 600)
  }

  const handleWhatsAppRedirect = (dataToUse) => {
    const inquiry = dataToUse || formData
    const message = `Hello VishwaVed Academy, I would like to inquire about admissions.\n\n*Name:* ${inquiry.name || 'Student'}\n*Phone:* ${inquiry.phone || 'N/A'}\n*Course:* ${inquiry.course || 'Not Selected'}\n*Message:* ${inquiry.message || 'Please provide details regarding admissions.'}`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/919309362791?text=${encoded}`, '_blank')
  }

  return (
    <section className="inquiry-banner-section" id="inquiry">
      <div className="inquiry-banner-overlay" />
      
      <div className="container inquiry-banner-container">
        <div className="inquiry-grid">
          
          {/* Left Column: Academy Information & Key Stats */}
          <div className="inquiry-info-col">
            <span className="inquiry-badge-sub">Get a Free online Registration</span>
            
            <h2 className="inquiry-main-heading">
              Inquiry <span className="inquiry-heading-accent">Now!</span>
            </h2>

            <p className="inquiry-paragraph">
              &ldquo;<strong>VISHWAVED SCIENCE ACADEMY</strong>&rdquo; was started with a goal to help students who aspire to take admission for Engineering in IIT/NIT/IIIT/VIT and admission for Medical in AIIMS/Government medical colleges &amp; many others. We focus on providing teaching of the highest standards to the students to empower them to qualify IIT-JEE/NEET/MH-CET/CUET and various other competitive examinations with flying colours.
            </p>

            {/* Metric Highlights */}
            <div className="inquiry-stats-row">
              {/* Happy Students */}
              <div className="inquiry-stat-item">
                <div className="inquiry-stat-icon-wrap">
                  <svg className="inquiry-stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
                  </svg>
                </div>
                <div className="inquiry-stat-number">754+</div>
                <div className="inquiry-stat-label">HAPPY STUDENTS</div>
              </div>

              {/* Approved Courses */}
              <div className="inquiry-stat-item">
                <div className="inquiry-stat-icon-wrap">
                  <svg className="inquiry-stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    <line x1="8" y1="7" x2="16" y2="7" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <div className="inquiry-stat-number">5+</div>
                <div className="inquiry-stat-label">APPROVED COURSES</div>
              </div>

              {/* Certified Teachers */}
              <div className="inquiry-stat-item">
                <div className="inquiry-stat-icon-wrap">
                  <svg className="inquiry-stat-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="inquiry-stat-number">12+</div>
                <div className="inquiry-stat-label">CERTIFIED TEACHERS</div>
              </div>
            </div>
          </div>

          {/* Right Column: Request Information Card */}
          <div className="inquiry-form-col">
            <div className="inquiry-glass-card">
              <div className="inquiry-card-header">
                <h3 className="inquiry-form-title">
                  Request <span className="inquiry-form-title-accent">Information</span>
                </h3>
              </div>

              {status.msg && (
                <div className={`inquiry-alert-box inquiry-alert-${status.type}`}>
                  <span>{status.type === 'success' ? '✓' : '⚠️'}</span>
                  <span>{status.msg}</span>
                </div>
              )}

              {submittedData && status.type === 'success' ? (
                <div className="inquiry-success-container">
                  <div className="inquiry-success-badge">🎉 Inquiry Received!</div>
                  <p className="inquiry-success-text">
                    We have received details for <strong>{submittedData.name}</strong> ({submittedData.course}).
                  </p>
                  
                  <div className="inquiry-success-actions">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppRedirect(submittedData)}
                      className="inquiry-btn-whatsapp"
                    >
                      <span>💬</span> Connect on WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedData(null)
                        setStatus({ type: '', msg: '' })
                      }}
                      className="inquiry-btn-reset"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form-body" noValidate>
                  {/* Name */}
                  <div className="inquiry-input-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      className="inquiry-input"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="inquiry-input-group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      maxLength={15}
                      className="inquiry-input"
                      required
                    />
                  </div>

                  {/* Course Dropdown */}
                  <div className="inquiry-input-group">
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="inquiry-input inquiry-select"
                      required
                    >
                      <option value="" disabled>Choose Course</option>
                      {COURSES.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="inquiry-input-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter Message"
                      rows={3}
                      className="inquiry-input inquiry-textarea"
                    />
                  </div>

                  {/* Captcha Block */}
                  <div className="inquiry-captcha-section">
                    <div className="inquiry-captcha-label-row">
                      <span className="inquiry-captcha-label">
                        Captcha <span className="inquiry-required-star">*</span>
                      </span>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="inquiry-captcha-refresh-hint"
                        title="Click to generate a new captcha"
                      >
                        (Click On Image To Regenerate New Captcha)
                      </button>
                    </div>

                    <div className="inquiry-captcha-inputs-row">
                      <input
                        type="text"
                        name="captchaInput"
                        value={formData.captchaInput}
                        onChange={handleChange}
                        placeholder="Enter Captcha"
                        className="inquiry-input inquiry-captcha-input"
                        maxLength={6}
                        autoComplete="off"
                        required
                      />

                      <div
                        className="inquiry-captcha-canvas-box"
                        onClick={generateCaptcha}
                        role="button"
                        tabIndex={0}
                        title="Click to refresh captcha"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') generateCaptcha()
                        }}
                      >
                        <canvas
                          ref={canvasRef}
                          width={110}
                          height={38}
                          className="inquiry-captcha-canvas"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inquiry-submit-btn"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
