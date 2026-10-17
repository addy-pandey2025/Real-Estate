import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteSpiral from './InfiniteSpiral'

const images = [
  { src: '/assets/Manhattan images/Screenshot 2026-09-04 213007.png', alt: 'Real estate project' },
  { src: '/assets/Manhattan images/Screenshot 2026-09-04 213131.png', alt: 'Real estate project' },
  { src: '/assets/Manhattan images/Screenshot 2026-09-04 213300.png', alt: 'Real estate project' },
  { src: '/assets/Nest images/Screenshot 2026-09-04 211939.png', alt: 'Real estate project' },
  { src: '/assets/Nest images/Screenshot 2026-09-04 212046.png', alt: 'Real estate project' },
  { src: '/assets/Palm city images/Screenshot 2026-09-04 212300.png', alt: 'Real estate project' },
  { src: '/assets/Palm city images/Screenshot 2026-09-04 212358.png', alt: 'Real estate project' },
  { src: '/assets/Palm city images/Screenshot 2026-09-04 212413.png', alt: 'Real estate project' },
  { src: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.53.04 AM.jpeg', alt: 'Real estate project' },
  { src: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.54.04 AM.jpeg', alt: 'Real estate project' },
  { src: '/assets/Serenity images/Screenshot 2026-09-04 214207.png', alt: 'Real estate project' },
  { src: '/assets/Serenity images/Screenshot 2026-09-04 214535.png', alt: 'Real estate project' },
]

function useInView(ref) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return inView
}

function useCountUp(end, active, duration = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(eased * end))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, end, duration])

  return value
}

function StatItem({ end, suffix, label, active }) {
  const value = useCountUp(end, active)
  return (
    <div className="stat-box">
      <h3>
        {value}
        {suffix}
      </h3>
      <p>{label}</p>
    </div>
  )
}

function OurNumbers() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef)

  return (
    <section className="about-section stats-section" ref={sectionRef}>
      <div className="container">
        <div className="section-title">
          <h2>Our Numbers</h2>
          <p>Years of expertise in the real estate market.</p>
        </div>
        <div className="stats-row">
          <StatItem end={1000} suffix="+" label="Happy Clients" active={inView} />
          <StatItem end={50} suffix="+" label="Projects Sold" active={inView} />
          <StatItem end={13} suffix="+" label="Years of Industry Experience" active={inView} />
          <StatItem end={5} suffix="" label="Luxury Projects" active={inView} />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <>
      <section className="page-hero about-hero">
      </section>

      <section className="about-section about-content-top">
        <div className="container">
          <div className="about-grid">
            <div className="about-spiral-wrap">
              <InfiniteSpiral
                items={images}
                animationMode="auto"
                speed={0.3}
                radius={200}
                cardWidth={140}
                cardHeight={140}
                verticalSpacing={75}
                perspective={1000}
                cardRadius={12}
                centerScale={1.15}
                edgeBlur={4}
                cardsPerTurn={6}
                pauseOnHover
                direction="up"
                rotation={0}
                cardTilt={0}
                edgeFade={0.15}
                imageFit="cover"
                grayscale={0}
              />
            </div>
            <div className="about-text">
              <h2>Trusted Real Estate Advisory in Lucknow</h2>
              <p>Devannsha Infraventures Private Limited is a Lucknow-based real estate advisory and property solutions company, incorporated on <strong>09 February 2022</strong>. Built on the foundation of trust, transparency and professional expertise, we assist investors, homebuyers and end-users in making informed real estate decisions.</p>
              <p>Our leadership brings more than a decade of industry experience, with the directors, <strong>Mr. Shiv Nath Pathak</strong> and <strong>Mr. Devendra Pathak</strong>, having been associated with the real estate industry since <strong>2013</strong>. Their professional journey includes experience with established organizations such as Vardhman Developers, Net Ambit Homewise, Omaxe Limited and Big Bucks India Pvt. Ltd.</p>
              <p>With strong market understanding and a client-first approach, Devannsha Infraventures focuses on identifying the right opportunities across residential and commercial real estate. From understanding a client&apos;s requirements and shortlisting suitable properties to evaluating projects, negotiating value and supporting the transaction process, our objective is to make every property decision transparent, informed and hassle-free.</p>
              <p>Our vision is to build long-term relationships by combining market knowledge, honest guidance and personalized service. We believe that every property decision is more than a transaction &mdash; it is an important investment in the future.</p>
            </div>
          </div>
          <div className="company-highlights">
            <div className="highlight-item">
              <span className="highlight-label">Incorporated</span>
              <span className="highlight-value">09 February 2022</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Directors</span>
              <span className="highlight-value">Mr. Shiv Nath Pathak &amp; Mr. Devendra Pathak</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Real Estate Experience</span>
              <span className="highlight-value">Since 2013</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">Location</span>
              <span className="highlight-value">Lucknow</span>
            </div>
          </div>
        </div>
      </section>

      <OurNumbers />

      <section className="why-us">
        <div className="section-title">
          <h2>Why Work With Us</h2>
          <p>Trusted guidance. Transparent decisions. Better property outcomes.</p>
        </div>
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5.5c0 4.2-2.9 7.2-7 8.5-4.1-1.3-7-4.3-7-8.5V6l7-3z" /><path d="M9 11.8l2.1 2.1L15 9.8" /></svg>
              </div>
              <h4>Transparency</h4>
              <p>Honest advice and complete clarity on every deal.</p>
            </div>
            <div className="feature">
              <div className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V11" /><path d="M9.5 20V5" /><path d="M15 20v-7" /><path d="M20 20V8.5" /><path d="M3 20h18" /></svg>
              </div>
              <h4>Market Expertise</h4>
              <p>In-depth knowledge of prices, trends and locations.</p>
            </div>
            <div className="feature">
              <div className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7.2L12 3l7 4.2V21" /><path d="M12 3v3" /><path d="M8.5 11h3" /><path d="M8.5 15h3" /><path d="M15 12.5l.8.8 1.7-1.8" /></svg>
              </div>
              <h4>Verified Projects</h4>
              <p>Only RERA-approved and trusted developments.</p>
            </div>
            <div className="feature">
              <div className="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a8 8 0 0 1 16 0" /><rect x="2.5" y="13" width="4" height="6" rx="1.5" /><rect x="17.5" y="13" width="4" height="6" rx="1.5" /><path d="M20 19v.5a2 2 0 0 1-2 2h-3.5" /></svg>
              </div>
              <h4>End-to-End Support</h4>
              <p>From site visits to registration, we handle it all.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner cta-about">
        <h2>Let&apos;s Work Together</h2>
        <p>Partner with us to find your ideal investment or dream home.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-light">Get in Touch</Link>
          <a href="tel:9990347333" className="btn btn-outline-light call-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.2 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" /></svg>
            Call 9990347333
          </a>
        </div>
      </section>
    </>
  )
}

export default About