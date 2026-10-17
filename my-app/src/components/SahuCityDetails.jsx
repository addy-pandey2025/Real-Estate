import { useEffect, useRef, useState } from 'react'
import EnquirySidebar from './EnquirySidebar'

const A = (file) => `/assets/Sahu city images/${file}`

const HERO_IMG = A('WhatsApp Image 2026-09-02 at 4.52.49 AM.jpeg')
const VIDEO_SRC = A('sahucity.mp4')
const CLUSTER_IMG = A('SahuCity-FloorPlans-Page1.png')
const LAYOUT_IMG = A('SahuCity-FloorPlans-Page2.png')
const PDF_PLANS = A('Sahu City - Floor Plans.pdf')

const HIGHLIGHTS = [
  {
    icon: 'fa-solid fa-layer-group',
    title: '1 & 2 BHK Residences',
    desc: 'Thoughtfully planned 1 BHK and 2 BHK homes designed for comfortable everyday living.',
  },
  {
    icon: 'fa-solid fa-vector-square',
    title: 'Type I · II · III Layouts',
    desc: 'Multiple layout types, each planned to suit the way modern families live.',
  },
  {
    icon: 'fa-solid fa-building',
    title: 'Crown Block & Tower Clusters',
    desc: 'Cluster planning across the Crown Block and multiple towers within the development.',
  },
  {
    icon: 'fa-solid fa-ruler-combined',
    title: 'Efficiently Planned Homes',
    desc: 'Smart, efficient planning that makes the most of every square foot of living space.',
  },
  {
    icon: 'fa-solid fa-city',
    title: 'Lucknow Address',
    desc: 'A well-connected residential address within the city of Lucknow.',
  },
  {
    icon: 'fa-solid fa-forward',
    title: 'Phase 2 of Sahucity',
    desc: 'The evolving next phase of the Sahucity development, built on a premium residential vision.',
  },
]

const AMENITIES = [
  { icon: 'fa-solid fa-dumbbell', label: 'Open Gym' },
  { icon: 'fa-solid fa-child-reaching', label: 'Kids Play' },
  { icon: 'fa-solid fa-masks-theater', label: 'Amphitheatre' },
  { icon: 'fa-solid fa-water', label: 'Waterbody' },
]

const CLUSTERS = [
  { name: 'Crown Block', note: 'Signature cluster planning of the development' },
  { name: 'Tower 1 & 3', note: 'Cluster plan for Tower 1 & Tower 3' },
  { name: 'Tower 2', note: 'Cluster plan for Tower 2' },
  { name: 'Tower 4', note: 'Cluster plan for Tower 4' },
  { name: 'Tower 5', note: 'Cluster plan for Tower 5' },
]

const LAYOUTS = [
  { type: '1 BHK', variant: 'Type I' },
  { type: '2 BHK', variant: 'Type I' },
  { type: '1 BHK', variant: 'Type II' },
  { type: '2 BHK', variant: 'Type II' },
  { type: '1 BHK', variant: 'Type III' },
  { type: '2 BHK', variant: 'Type III' },
]

const GALLERY = [
  { src: A('WhatsApp Image 2026-09-02 at 4.52.49 AM.jpeg'), alt: 'Sahu City Phase 2 — project visual' },
  { src: A('WhatsApp Image 2026-09-02 at 4.53.04 AM.jpeg'), alt: 'Sahu City Phase 2 — project visual' },
  { src: A('WhatsApp Image 2026-09-02 at 4.55.05 AM.jpeg'), alt: 'Sahu City Phase 2 — project visual' },
  { src: A('WhatsApp Image 2026-09-02 at 4.53.06 AM.jpeg'), alt: 'Sahu City Phase 2 — project visual' },
]

const OVERVIEW_ITEMS = [
  { label: 'Location', value: 'Lucknow' },
  { label: 'Project Type', value: 'Premium Residential' },
  { label: 'Configuration', value: '1 & 2 BHK · Type I · II · III' },
  { label: 'Status', value: 'Phase 2 · Available*' },
]

const PRICE_CARDS = [
  { icon: 'fa-solid fa-bed', title: '1 BHK Residences', types: 'Type I · Type II · Type III' },
  { icon: 'fa-solid fa-bed', title: '2 BHK Residences', types: 'Type I · Type II · Type III' },
]

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSeen(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, seen])

  return [ref, seen]
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, seen] = useInView()
  return (
    <div
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`pc-reveal ${seen ? 'in-view' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

function SectionHead({ eyebrow, title, lead, light = false }) {
  return (
    <div className="pc-head">
      {eyebrow && <span className="pc-eyebrow">{eyebrow}</span>}
      <h3 className={light ? 'pc-title pc-title-light' : 'pc-title'}>{title}</h3>
      {lead && <p className={light ? 'pc-lead pc-lead-light' : 'pc-lead'}>{lead}</p>}
    </div>
  )
}

function Lightbox({ items, index, setIndex }) {
  const open = index !== null && items[index]

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % items.length)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, items.length, setIndex])

  if (!open) return null

  const current = items[index]

  return (
    <div
      className="pc-lightbox lightbox active"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIndex(null)
      }}
    >
      <span className="close-btn" onClick={() => setIndex(null)}>&times;</span>
      <span
        className="prev-btn"
        onClick={(e) => {
          e.stopPropagation()
          setIndex((i) => (i - 1 + items.length) % items.length)
        }}
      >
        &#10094;
      </span>
      <img src={current.src} alt={current.caption || 'Sahu City Phase 2'} />
      <span
        className="next-btn"
        onClick={(e) => {
          e.stopPropagation()
          setIndex((i) => (i + 1) % items.length)
        }}
      >
        &#10095;
      </span>
      <div className="pc-lightbox-meta">
        <span>{current.caption || 'Sahu City Phase 2'}</span>
        {items.length > 1 && <span className="pc-lightbox-count">{index + 1} / {items.length}</span>}
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="pc-section pc-about" id="about">
      <div className="pc-about-grid">
        <Reveal className="pc-about-col-text">
          <div className="pc-about-text">
            <span className="pc-eyebrow">About Sahu City Phase 2</span>
            <h2 className="pc-title">
              Sahu City Phase 2,
              <br />
              Built Around You
            </h2>
            <p className="pc-lead">
              Sahu City Phase 2 is a premium residential project in Lucknow offering thoughtfully planned
              1 BHK and 2 BHK residences in Type I, Type II and Type III layouts.
            </p>
            <p className="pc-about-sub">
              The development is planned across the Crown Block and a cluster of towers, each residence
              conceived around comfortable and efficient living. With flexible layout types, generous
              open planning and a well-connected city address, Phase 2 carries forward the evolving
              vision of Sahucity for modern families.
            </p>
            <ul className="pc-about-list">
              <li><i className="fa-solid fa-layer-group"></i><span>1 &amp; 2 BHK Configurations</span></li>
              <li><i className="fa-solid fa-vector-square"></i><span>Type I · II · III Layouts</span></li>
              <li><i className="fa-solid fa-building"></i><span>Crown Block &amp; Tower Clusters</span></li>
              <li><i className="fa-solid fa-city"></i><span>Lucknow Location</span></li>
            </ul>
            <div className="pc-about-chips">
              <span className="pc-chip pc-chip-dark">1 &amp; 2 BHK</span>
              <span className="pc-chip pc-chip-ivory">Lucknow</span>
              <span className="pc-chip pc-chip-gold">Premium Residential</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={130} className="pc-about-col-media">
          <div className="pc-about-media">
            <div className="pc-about-frame">
              <img src={A('WhatsApp Image 2026-09-02 at 4.53.04 AM.jpeg')} alt="Sahu City Phase 2 — premium residential project in Lucknow" loading="lazy" />
              <span className="pc-about-vignette" aria-hidden="true"></span>
              <div className="pc-about-float">
                <span className="pc-about-float-icon"><i className="fa-solid fa-location-dot"></i></span>
                <div>
                  <strong>Lucknow</strong>
                  <span>1 &amp; 2 BHK · Type I · II · III</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Overview() {
  return (
    <section className="pc-section pc-ivory sc-overview" id="overview">
      <div className="sc-overview-grid">
        <Reveal className="sc-overview-text">
          <div className="pc-about-text">
            <span className="pc-eyebrow">Quick Overview</span>
            <h2 className="pc-title">Sahu City Phase 2 at a Glance</h2>
            <p className="pc-lead">
              A premium residential address in Lucknow — planned across the Crown Block and tower
              clusters with flexible 1 and 2 BHK layouts for comfortable, efficient living.
            </p>
            <ul className="pc-final-points">
              <li><i className="fa-solid fa-check"></i> 1 &amp; 2 BHK Residences</li>
              <li><i className="fa-solid fa-check"></i> Type I · II · III Layouts</li>
              <li><i className="fa-solid fa-check"></i> Crown Block &amp; Tower Clusters</li>
              <li><i className="fa-solid fa-check"></i> Premium Residential · Lucknow</li>
            </ul>
            <div className="sc-overview-cta">
              <a className="pc-btn pc-btn-primary" href="#sidebarForm">
                <i className="fa-solid fa-calendar-check"></i> Book a Site Visit
              </a>
              <a className="pc-btn pc-btn-outline" href={PDF_PLANS} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-file-arrow-down"></i> Download Floor Plans
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={140} className="sc-overview-form">
          <div className="pc-final-form">
            <EnquirySidebar overview={OVERVIEW_ITEMS} dataProject="SAHU CITY PHASE 2, Lucknow" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="pc-section pc-band pc-features" id="highlights">
      <Reveal>
        <SectionHead
          light
          eyebrow="Project Highlights"
          title="Planned for Every Family"
          lead="From flexible configurations to cluster planning and a prime city address — designed around real, everyday living."
        />
      </Reveal>
      <div className="pc-features-grid">
        {HIGHLIGHTS.map(function (h, i) {
          return (
            <Reveal key={h.title} delay={(i % 3) * 80}>
              <div className="pc-feature-card">
                <span className="pc-feature-icon"><i className={h.icon}></i></span>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="pc-section sc-video" id="experience">
      <Reveal>
        <SectionHead
          eyebrow="Project Experience"
          title="Experience Sahu City"
          lead="Take a closer look at the lifestyle, spaces and vision behind Sahu City Phase 2."
        />
      </Reveal>
      <Reveal delay={80}>
        <div className="sc-video-frame">
          <video
            src={VIDEO_SRC}
            controls
            preload="metadata"
            poster={HERO_IMG}
            aria-label="Sahu City Phase 2 project film"
          ></video>
        </div>
      </Reveal>
    </section>
  )
}

function Amenities() {
  return (
    <section className="pc-section pc-ivory sc-amen" id="amenities">
      <Reveal>
        <SectionHead
          eyebrow="Amenities"
          title="Designed for Everyday Living"
          lead="Community spaces planned to complement the rhythm of modern family life."
        />
      </Reveal>
      <div className="sc-amen-grid">
        {AMENITIES.map(function (item, i) {
          return (
            <Reveal key={item.label} delay={(i % 4) * 60}>
              <div className="sc-amen-item">
                <span className="sc-amen-icon"><i className={item.icon}></i></span>
                <span className="sc-amen-label">{item.label}</span>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Reveal>
        <p className="pc-location-note">
          <i className="fa-solid fa-circle-info"></i>
          Amenities are indicative and subject to the official Sahu City Phase 2 project documentation.
        </p>
      </Reveal>
    </section>
  )
}

function FloorPlans() {
  const [tab, setTab] = useState('clusters')
  const [index, setIndex] = useState(null)

  const clusterItems = [{ src: CLUSTER_IMG, caption: 'Cluster Plans — Crown Block & Towers' }]
  const layoutItems = [{ src: LAYOUT_IMG, caption: 'Flat Layouts — Type I · II · III' }]
  const items = tab === 'clusters' ? clusterItems : layoutItems

  return (
    <section className="pc-section pc-plans sc-plans" id="floor-plans">
      <Reveal>
        <SectionHead
          eyebrow="Floor Plans"
          title="Floor Plans"
          lead="Explore thoughtfully planned residences designed for comfortable and efficient living."
        />
      </Reveal>
      <Reveal>
        <div className="sc-tabs" role="tablist" aria-label="Floor plan categories">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'clusters'}
            className={tab === 'clusters' ? 'sc-tab is-active' : 'sc-tab'}
            onClick={function () { setTab('clusters') }}
          >
            Cluster Plans
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'layouts'}
            className={tab === 'layouts' ? 'sc-tab is-active' : 'sc-tab'}
            onClick={function () { setTab('layouts') }}
          >
            Flat Layouts
          </button>
        </div>
      </Reveal>

      {tab === 'clusters' ? (
        <div className="pc-plans-grid sc-plans-grid" role="tabpanel">
          {CLUSTERS.map(function (c, i) {
            return (
              <Reveal key={c.name} delay={(i % 3) * 80}>
                <div className="pc-plan-card">
                  <div className="pc-plan-media">
                    <img src={CLUSTER_IMG} alt={`${c.name} cluster plan`} loading="lazy" />
                    <div className="pc-plan-shade" aria-hidden="true"></div>
                    <span className="pc-plan-badge">Cluster Plan</span>
                  </div>
                  <div className="pc-plan-body">
                    <span className="pc-plan-name">Tower Cluster</span>
                    <h4>{c.name}</h4>
                    <p>{c.note}</p>
                    <button type="button" className="pc-plan-btn" onClick={() => setIndex(0)}>
                      <i className="fa-solid fa-expand"></i> View Plan
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      ) : (
        <div className="pc-plans-grid sc-plans-grid" role="tabpanel">
          {LAYOUTS.map(function (l, i) {
            return (
              <Reveal key={`${l.type}-${l.variant}`} delay={(i % 3) * 80}>
                <div className="pc-plan-card">
                  <div className="pc-plan-media">
                    <img src={LAYOUT_IMG} alt={`${l.type} ${l.variant} flat layout`} loading="lazy" />
                    <div className="pc-plan-shade" aria-hidden="true"></div>
                    <span className="pc-plan-badge">{l.type}</span>
                  </div>
                  <div className="pc-plan-body">
                    <span className="pc-plan-name">Flat Layout</span>
                    <h4>{l.type} · {l.variant}</h4>
                    <p>Thoughtfully planned layout designed for comfortable and efficient living.</p>
                    <button type="button" className="pc-plan-btn" onClick={() => setIndex(0)}>
                      <i className="fa-solid fa-expand"></i> View Plan
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      )}

      <Reveal>
        <p className="pc-location-note">
          <i className="fa-solid fa-circle-info"></i>
          Floor plans are as per the official Sahu City Phase 2 document — open the plan in full view for details, or
          <a className="sc-plans-link" href={PDF_PLANS} target="_blank" rel="noreferrer"> download the floor plans PDF</a>.
        </p>
      </Reveal>
      <Lightbox items={items} index={index} setIndex={setIndex} />
    </section>
  )
}

function Gallery() {
  const [index, setIndex] = useState(null)

  return (
    <section className="pc-section pc-ivory sc-gallery" id="gallery">
      <Reveal>
        <SectionHead
          eyebrow="Project Visuals"
          title="A Glimpse of Sahu City Phase 2"
          lead="A selection of project visuals capturing the design, planning and vision behind the development."
        />
      </Reveal>
      <div className="pc-gallery-grid sc-gallery-grid">
        {GALLERY.map(function (g, i) {
          return (
            <Reveal key={g.src} delay={(i % 4) * 70}>
              <button type="button" className="pc-gallery-item" onClick={() => setIndex(i)} aria-label={`Open ${g.alt} in full view`}>
                <img src={g.src} alt={g.alt} loading="lazy" />
                <span className="pc-gallery-zoom"><i className="fa-solid fa-expand"></i></span>
                <span className="pc-gallery-caption">{g.alt}</span>
              </button>
            </Reveal>
          )
        })}
      </div>
      <Lightbox items={GALLERY} index={index} setIndex={setIndex} />
    </section>
  )
}

function Pricing() {
  return (
    <section className="pc-section sc-price" id="pricing">
      <Reveal>
        <SectionHead
          eyebrow="Pricing"
          title="Configurations & Pricing"
          lead="Explore the available configurations. Exact prices, offers and payment plans are available on request from our team."
        />
      </Reveal>
      <div className="sc-price-grid">
        {PRICE_CARDS.map(function (card, i) {
          return (
            <Reveal key={card.title} delay={i * 100}>
              <div className="sc-price-card">
                <span className="sc-price-icon"><i className={card.icon}></i></span>
                <h4>{card.title}</h4>
                <p className="sc-price-types">{card.types}</p>
                <span className="sc-price-val">On Request</span>
                <div className="sc-price-actions">
                  <a className="pc-btn pc-btn-primary" href="#sidebarForm">Enquire Now</a>
                  <a className="pc-plan-btn" href="tel:9990347333">Call 9990347333</a>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Reveal>
        <p className="pc-location-note">
          <i className="fa-solid fa-circle-info"></i>
          Prices, configurations and offers are available on request and are subject to the official Sahu City Phase 2
          documentation. This page does not publish any unverified pricing.
        </p>
      </Reveal>
    </section>
  )
}

function Downloads() {
  return (
    <section className="pc-section pc-downloads">
      <Reveal>
        <div className="pc-download-band">
          <div className="pc-download-accent" aria-hidden="true"></div>
          <div className="pc-download-text">
            <span className="pc-eyebrow">Get the complete details</span>
            <h3 className="pc-title">Explore Sahu City Phase 2 in Detail</h3>
            <p>
              Explore the layouts, residences and project details through the official project material.
            </p>
          </div>
          <div className="pc-download-actions">
            <a className="pc-dl-btn pc-dl-light" href={PDF_PLANS} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-file-pdf"></i> Download Brochure
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Final() {
  return (
    <section className="pc-section pc-band sc-final" id="get-in-touch">
      <Reveal>
        <SectionHead
          light
          eyebrow="Begin Your Journey"
          title="Make Sahu City Phase 2 Your New Address"
          lead="Book a private site visit or send an enquiry — our team will guide you through residences, floor plans and the Sahu City Phase 2 experience."
        />
      </Reveal>
      <Reveal>
        <div className="sc-final-cta">
          <a className="pc-btn pc-btn-primary" href="#sidebarForm">
            <i className="fa-solid fa-calendar-check"></i> Book a Site Visit
          </a>
          <a className="pc-btn pc-btn-outline" href="#sidebarForm">
            <i className="fa-solid fa-paper-plane"></i> Enquire Now
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function SahuCityDetails() {
  return (
    <div className="container pc-details">
      <About />
      <Overview />
      <Highlights />
      <Experience />
      <Amenities />
      <FloorPlans />
      <Gallery />
      <Pricing />
      <Downloads />
      <Final />
    </div>
  )
}

export default SahuCityDetails