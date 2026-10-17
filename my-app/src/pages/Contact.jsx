import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SuccessNotification from '../components/SuccessNotification'

function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -40px 0px',
      },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin])

  return { ref, inView }
}

function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  const { ref, inView } = useInView()
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const style = reduced ? undefined : { transitionDelay: `${delay}ms` }
  return (
    <Tag
      ref={ref}
      className={`ctx-reveal ${inView ? 'ctx-in' : ''} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [project, setProject] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    const errors = []
    if (!name.trim()) errors.push('Please enter your name.')
    if (!phone.trim() || phone.trim().length < 10) errors.push('Please enter a valid phone number.')

    if (errors.length) {
      alert(errors.join('\n'))
      return
    }

    setSubmitting(true)

    fetch('http://localhost:5000/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        project: project,
        page: 'Contact Us',
      }),
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        if (data.success) {
          setSuccess(data.message || 'Enquiry submitted successfully! We will contact you soon.')
          setName('')
          setPhone('')
          setEmail('')
          setProject('')
          setMessage('')
        } else {
          alert(data.message || 'Something went wrong. Please try again.')
        }
      })
      .catch(function () {
        alert('Failed to submit enquiry. Please try again.')
      })
      .finally(function () {
        setSubmitting(false)
      })
  }

  return (
    <>
      {success && <SuccessNotification message={success} onClose={() => setSuccess('')} />}

      <section className="ctx-hero">
        <div className="ctx-hero-glow"></div>
        <div className="ctx-hero-ring ctx-hero-ring-one"></div>
        <div className="ctx-hero-ring ctx-hero-ring-two"></div>
        <div className="ctx-hero-content">
          <div className="ctx-hero-eyebrow">GET IN TOUCH</div>
          <h1>Let&apos;s Start a Conversation</h1>
          <p>Whether you&apos;re looking for your dream home, a premium investment or expert property guidance, our team is here to help.</p>
          <div className="ctx-hero-actions">
            <a href="tel:9990347333" className="ctx-hero-call">
              <i className="fa-solid fa-phone"></i>
              <span>Call <strong>9990347333</strong></span>
            </a>
          </div>
          <div className="ctx-hero-breadcrumb"><Link to="/">Home</Link> / Contact Us</div>
        </div>
      </section>

      <section className="ctx-contact">
        <div className="container">
          <div className="ctx-contact-grid">

            <Reveal className="ctx-info-panel">
              <div className="ctx-info-heading">
                <span className="ctx-eyebrow">CONTACT DETAILS</span>
                <h2>Connect With Our Team</h2>
                <p>Our team is here to help you explore properties, understand your options and take the next step with confidence.</p>
              </div>

              <div className="ctx-info-list">
                <Reveal delay={80} className="ctx-info-row">
                  <div className="ctx-info-icon"><i className="fa-solid fa-phone"></i></div>
                  <div className="ctx-info-text">
                    <h4>CALL</h4>
                    <a href="tel:9990347333">9990347333</a>
                    <span>Mon &ndash; Sun, 10 AM &ndash; 8 PM</span>
                  </div>
                </Reveal>

                <Reveal delay={160} className="ctx-info-row">
                  <div className="ctx-info-icon"><i className="fa-solid fa-envelope"></i></div>
                  <div className="ctx-info-text">
                    <h4>EMAIL</h4>
                    <p>For general enquiries, call or WhatsApp us for instant support.</p>
                  </div>
                </Reveal>

                <Reveal delay={240} className="ctx-info-row">
                  <div className="ctx-info-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div className="ctx-info-text">
                    <h4>LOCATION</h4>
                    <p className="ctx-info-strong">Lucknow, India</p>
                    <span>Serving clients across Lucknow.</span>
                  </div>
                </Reveal>

                <Reveal delay={320} className="ctx-info-row">
                  <div className="ctx-info-icon ctx-info-icon-wa"><i className="fa-brands fa-whatsapp"></i></div>
                  <div className="ctx-info-text">
                    <h4>WHATSAPP</h4>
                    <p>Chat with our property advisors.</p>
                    <a
                      href="https://wa.me/919990347333?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20real%20estate%20projects."
                      target="_blank"
                      rel="noreferrer"
                      className="ctx-wa-btn"
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                      Chat on WhatsApp
                    </a>
                  </div>
                </Reveal>
              </div>
            </Reveal>

            <Reveal delay={120} className="ctx-form-card">
              <h2>Tell Us What You&apos;re Looking For</h2>
              <p className="ctx-form-sub">Share your requirements and our team will get back to you shortly.</p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="ctx-field">
                  <label htmlFor="ctxName">Full Name <span>*</span></label>
                  <input type="text" id="ctxName" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="ctx-field">
                  <label htmlFor="ctxPhone">Phone Number <span>*</span></label>
                  <input type="tel" id="ctxPhone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="ctx-field">
                  <label htmlFor="ctxEmail">Email Address <span className="ctx-opt">(optional)</span></label>
                  <input type="email" id="ctxEmail" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="ctx-field">
                  <label htmlFor="ctxProject">Interested Project</label>
                  <select id="ctxProject" value={project} onChange={(e) => setProject(e.target.value)}>
                    <option value="">Select a project</option>
                    <option value="MANHATTAN - Sector 131, Lucknow">MANHATTAN</option>
                    <option value="THE NEST - Sector 12, Lucknow">THE NEST</option>
                    <option value="PALM CITY - Sector 79, Lucknow">PALM CITY</option>
                    <option value="SERENITY - Sector 150, Lucknow">SERENITY</option>
                    <option value="SAHUCITY PHASE 2">SAHUCITY PHASE 2</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="ctx-field">
                  <label htmlFor="ctxMessage">Message</label>
                  <textarea id="ctxMessage" placeholder="Tell us about your requirements&hellip;" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <button type="submit" className="ctx-submit-btn" disabled={submitting}>
                  {submitting ? 'Sending&hellip;' : 'Send Enquiry'}
                  {!submitting && <i className="fa-solid fa-arrow-right"></i>}
                </button>
              </form>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="ctx-trust">
        <div className="container ctx-trust-grid">
          <Reveal className="ctx-trust-item" delay={0}>
            <i className="fa-solid fa-user-check"></i>
            <span>Expert Property Guidance</span>
          </Reveal>
          <Reveal className="ctx-trust-item" delay={80}>
            <i className="fa-solid fa-handshake"></i>
            <span>Transparent Assistance</span>
          </Reveal>
          <Reveal className="ctx-trust-item" delay={160}>
            <i className="fa-solid fa-building-shield"></i>
            <span>Carefully Selected Projects</span>
          </Reveal>
          <Reveal className="ctx-trust-item" delay={240}>
            <i className="fa-solid fa-route"></i>
            <span>Site Visit Support</span>
          </Reveal>
        </div>
      </section>

      <section className="ctx-location">
        <div className="container">
          <Reveal className="ctx-location-head">
            <span className="ctx-eyebrow">WHERE TO FIND US</span>
            <h2>Visit Our Office</h2>
            <p>Meet our team and discuss your property requirements in person.</p>
          </Reveal>
          <Reveal delay={120} className="ctx-location-panel">
            <div className="ctx-location-icon"><i className="fa-solid fa-location-dot"></i></div>
            <h3>Lucknow, India</h3>
            <p>Serving clients across Lucknow.</p>
          </Reveal>
        </div>
      </section>

      <section className="ctx-cta">
        <div className="ctx-cta-glow"></div>
        <Reveal className="container ctx-cta-inner">
          <span className="ctx-eyebrow ctx-eyebrow-light">YOUR NEXT MOVE STARTS HERE</span>
          <h2>Find the Right Property With Confidence</h2>
          <p>Speak with our team and let us help you find a property that fits your requirements.</p>
          <div className="ctx-cta-buttons">
            <a href="tel:9990347333" className="ctx-btn ctx-btn-gold">
              <i className="fa-solid fa-phone"></i>
              Call 9990347333
            </a>
            <Link to="/projects" className="ctx-btn ctx-btn-outline">
              Browse Projects
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

export default Contact