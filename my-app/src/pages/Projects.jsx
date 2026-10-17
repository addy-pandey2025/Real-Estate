import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const PROJECTS = [
  {
    location: 'Lucknow Sector 131',
    text: 'manhattan sector 131 Lucknow apartment 3 bhk 4 bhk luxury',
    img: '/assets/Manhattan images/manhattan-card.jpg',
    alt: 'Manhattan Project',
    badge: 'Featured',
    play: true,
    name: 'MANHATTAN',
    configA: 'Sector 131, Lucknow',
    configB: '3 & 4 BHK Apartments',
    price: '\u20B9 1.31 Cr - 2.21 Cr*',
    link: '/manhattan',
  },
  {
    location: 'Lucknow Sector 12',
    text: 'the nest Lucknow sector 12 plotted development plots residential',
    img: '/assets/Nest images/Screenshot 2026-09-04 212046.png',
    alt: 'The Nest Project',
    badge: 'New Launch',
    play: false,
    name: 'THE NEST',
    configA: 'Sector 12, Lucknow',
    configB: 'Plotted Development',
    price: '\u20B9 60,000 / Sq. Yd*',
    link: '/nest',
  },
  {
    location: 'Lucknow Sector 79',
    text: 'palm city sector 79 Lucknow plot plotted development',
    img: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.50.40 AM.jpeg',
    alt: 'Palm City Project',
    badge: 'Plots',
    play: false,
    name: 'PALM CITY',
    configA: 'Sector 79, Lucknow',
    configB: 'Plotted Development',
    price: 'Premium Plots*',
    link: '/palm-city',
  },
  {
    location: 'Lucknow Sector 150',
    text: 'serenity sector 150 Lucknow plot 200 300 400 sq yd luxury',
    img: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.50.52 AM.jpeg',
    alt: 'Serenity Project',
    badge: 'Luxury',
    play: true,
    name: 'SERENITY',
    configA: 'Sector 150, Lucknow',
    configB: 'Plots 200 - 400 Sq. Yd',
    price: '\u20B9 2.10 Cr - 4.25 Cr*',
    link: '/serenity',
  },
  {
    location: 'Lucknow',
    text: 'sahucity phase 2 residential apartment premium',
    video: '/assets/Sahu city images/sahucity.mp4',
    badge: 'Phase 2',
    play: true,
    name: 'SAHUCITY PHASE 2',
    configA: 'Premium Residential Project',
    configB: 'Phase 2',
    price: 'Available*',
    link: '/sahucity',
  },
]

function StatItem({ value, suffix, label, active }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(reduce ? value : 0)
  const raf = useRef(null)

  useEffect(() => {
    if (!active || reduce) return
    const start = performance.now()
    const duration = 2000
    function frame(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(value * eased))
      if (t < 1) raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
    return function () {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [active, value, reduce])

  return (
    <div className="stat">
      <strong className="stat-value">{count}{suffix}</strong>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function StatsRow() {
  const [active, setActive] = useState(false)
  const startedRef = useRef(false)

  return (
    <div
      className="portfolio-stats reveal-item"
      style={{ '--reveal-delay': '300ms' }}
      ref={function (el) {
        if (!el || startedRef.current) return undefined
        const observer = new IntersectionObserver(
          function (entries) {
            if (entries.some(function (entry) { return entry.isIntersecting })) {
              observer.disconnect()
              startedRef.current = true
              setActive(true)
            }
          },
          { threshold: 0.4 }
        )
        observer.observe(el)
        return undefined
      }}
    >
      <StatItem value={25} suffix="+" label="Premium Projects" active={active} />
      <span className="stat-sep" aria-hidden="true"></span>
      <StatItem value={10} suffix="+" label="Prime Locations" active={active} />
      <span className="stat-sep" aria-hidden="true"></span>
      <StatItem value={500} suffix="+" label="Happy Clients" active={active} />
    </div>
  )
}

function ProjectCard({ item, filterLoc, filterQ, revealDelay }) {
  function matches() {
    const loc = (filterLoc || '').toLowerCase()
    const q = (filterQ || '').toLowerCase()
    const cardLoc = (item.location || '').toLowerCase()
    const cardText = (item.text || '').toLowerCase()
    const matchLoc = !loc || cardLoc.includes(loc)
    const matchText = !q || cardText.includes(q)
    return matchLoc && matchText
  }

  function handlePointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      className="property-card"
      data-location={item.location}
      data-text={item.text}
      style={{ display: matches() ? '' : 'none', '--reveal-delay': `${revealDelay}ms` }}
      onMouseMove={handlePointerMove}
    >
      <div className="card property-card-inner">
        <div className="card-media">
          {item.video ? (
            <video src={item.video} muted preload="metadata"></video>
          ) : (
            <img src={item.img} alt={item.alt} />
          )}
          <span className="badge">{item.badge}</span>
          {item.play ? (
            <span className="play-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          ) : null}
        </div>
        <div className="card-info">
          <span className="location">{item.location}</span>
          <h3>{item.name}</h3>
          <p className="config">{item.configA}<br />{item.configB}</p>
          <p className="price">{item.price}</p>
          <Link to={item.link} className="view-btn">View Project</Link>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [searchParams] = useSearchParams()
  const [filterLoc, setFilterLoc] = useState(searchParams.get('loc') || '')
  const [filterQ, setFilterQ] = useState((searchParams.get('q') || '').toLowerCase())
  const gridRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current ? [...gridRef.current.querySelectorAll('.property-card')] : []
    if (!cards.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [filterLoc, filterQ])

  useEffect(() => {
    const items = introRef.current ? [...introRef.current.querySelectorAll('.reveal-item')] : []
    if (!items.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="page-hero projects-hero"></section>

      <div className="filter-bar">
        <select id="filterLocation" value={filterLoc} onChange={(e) => setFilterLoc(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Lucknow">Lucknow</option>
          <option value="Sector 131">Sector 131</option>
          <option value="Sector 12">Sector 12</option>
          <option value="Sector 79">Sector 79</option>
          <option value="Sector 150">Sector 150</option>
        </select>
        <div className="search-field">
          <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
          <input
            type="text"
            id="filterSearch"
            placeholder="Search project, builder or type..."
            value={filterQ}
            onChange={(e) => setFilterQ(e.target.value)}
          />
        </div>
      </div>

      <section className="portfolio-intro" ref={introRef}>
        <div className="portfolio-intro-inner">
          <span className="portfolio-eyebrow reveal-item" style={{ '--reveal-delay': '0ms' }}>Our Portfolio</span>
          <h2 className="portfolio-title reveal-item" style={{ '--reveal-delay': '100ms' }}>
            Discover Exceptional <span>Properties</span>
          </h2>
          <p className="portfolio-desc reveal-item" style={{ '--reveal-delay': '200ms' }}>
            Explore our carefully curated collection of residential and commercial properties in prime locations.
          </p>
          <StatsRow />
        </div>
      </section>

      <section className="properties">
        <div className="property-grid" ref={gridRef}>
          {PROJECTS.map(function (item, i) {
            return <ProjectCard item={item} key={item.name} filterLoc={filterLoc} filterQ={filterQ} revealDelay={i * 80} />
          })}
        </div>
      </section>

      <section className="cta-banner projects-cta">
        <h2>Not Sure Which Project Fits You?</h2>
        <p>Let our experts guide you to the perfect property based on your needs and budget.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-light">Get a Free Consultation</Link>
          <a href="tel:9990347333" className="btn btn-outline-light call-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.2 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" /></svg>
            Call 9990347333
          </a>
        </div>
      </section>
    </>
  )
}

export default Projects