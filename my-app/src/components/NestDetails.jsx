import { useEffect, useRef, useState } from 'react'
import EnquirySidebar from './EnquirySidebar'

const E = (s) => s.replace(/ /g, '%20').replace(/&/g, '%26')
const A = (file) => `/assets/Nest%20images/${E(file)}`

const PDF_BROCHURE = A('Nest - Brochure.pdf')
const PDF_PRICELIST = A('Nest-PP & PL.pdf')

const PLAN_ITEMS = [
  { src: A('Site-Layout.png'), label: 'Site Layout' },
  { src: A('Site-Plan.png'), label: 'Official Site Plan' },
]

const OVERVIEW = [
  { icon: 'fa-solid fa-file-signature', label: 'Project Name', value: 'The Nest' },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Sector 12, Lucknow' },
  { icon: 'fa-solid fa-border-all', label: 'Project Type', value: 'Plotted Development' },
  { icon: 'fa-solid fa-indian-rupee-sign', label: 'Official Rate', value: '₹60,000 / Sq. Yd*' },
  { icon: 'fa-solid fa-shield-halved', label: 'RERA / Project ID', value: 'UPRERAPRJ845286/10/2025' },
  { icon: 'fa-solid fa-helmet-safety', label: 'Status', value: 'Under Construction' },
]

const AREA_SPLIT = [
  { label: 'Plotted Area', pct: '50.03%', area: '20,008.01 sq.m' },
  { label: 'Roads & Walkways', pct: '29.80%', area: '11,917.95 sq.m' },
  { label: 'Green & Open Space', pct: '15.51%', area: '6,203.00 sq.m' },
  { label: 'Convenience Shops', pct: '1.46%', area: '582.35 sq.m' },
  { label: 'Sector Shopping', pct: '0.93%', area: '373.12 sq.m' },
  { label: 'Kiosks / Booths', pct: '0.48%', area: '193.51 sq.m' },
]

const AMENITIES = [
  { title: 'Waterbody', icon: 'fa-solid fa-water', desc: 'A landscaped waterbody planned at the heart of the community layout.' },
  { title: 'Amphitheatre', icon: 'fa-solid fa-masks-theater', desc: 'An open-air amphitheatre for events, screenings and community gatherings.' },
  { title: 'Kids Play Area', icon: 'fa-solid fa-children', desc: 'A dedicated kids play zone set within green surroundings.' },
  { title: 'Open Gym', icon: 'fa-solid fa-dumbbell', desc: 'Outdoor fitness equipment among shaded, landscaped greens.' },
  { title: 'Landscaped Gardens', icon: 'fa-solid fa-seedling', desc: 'Green areas and 3m wide paved walkways woven through the layout.' },
  { title: 'Gated Entry', icon: 'fa-solid fa-location-arrow', desc: 'Planned entry gates within a township linked by a proposed ring road.' },
]

const FEATURES = [
  { icon: 'fa-solid fa-map-location-dot', title: 'Officially Approved Layout', desc: 'Proposed layout of Omaxe The Nest at Khasra No. 2525(P), 2524(P) & 529(P), Village Kalli Pashchim, Raebareli Road, Lucknow — File No. LDA/LD/25-26/0804.' },
  { icon: 'fa-solid fa-vector-square', title: 'Dedicated Plot Layouts', desc: 'Clearly numbered residential plots across a plotted area of 50.03% with wide internal roads.' },
  { icon: 'fa-solid fa-road-bridge', title: 'Internal Roads & Ring Road', desc: 'A 29.80% road network including a 150m wide proposed ring road and paved walkways around the layout.' },
  { icon: 'fa-solid fa-leaf', title: 'Green & Open Spaces', desc: '15.51% of the net layout is reserved for greens and open space, supporting a net housing density of 750/hectare.' },
  { icon: 'fa-solid fa-store', title: 'Community Convenience', desc: 'Convenience shops, sector shopping, kiosks/booths and garbage collection centres planned within the layout.' },
  { icon: 'fa-solid fa-shield-halved', title: 'RERA Registered', desc: 'The Nest — Project ID UPRERAPRJ845286/10/2025 by Omaxe Garv Buildtech Private Limited.' },
]

const M = (s) => <span className="nd-payplan-high">{s}</span>

const PAYMENT_STEPS = [
  { title: 'At the time of E.O.I', detail: <>For plots MSP {M('₹1 Cr or above')}, {M('₹10 Lakhs')}</> },
  { title: 'On or before 30th day from booking', detail: <>{M('10% of MSP')} (less booking amount)</> },
  { title: 'On or before 90th day from last instalment', detail: <>{M('40% of MSP')}</> },
  { title: 'On offer of possession', detail: <>{M('50% of MSP')} + {M('100% additional charges')} + {M('100% other charges')} + stamp duty + registration &amp; other charges</> },
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
      className={`nd-reveal ${seen ? 'in-view' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="nd-head">
      {eyebrow && <span className="nd-eyebrow">{eyebrow}</span>}
      <h3 className="nd-title">{title}</h3>
      {lead && <p className="nd-lead">{lead}</p>}
    </div>
  )
}

function About() {
  const [planOpen, setPlanOpen] = useState(false)
  return (
    <section id="about" className="nd-section nd-about">
      <Reveal>
        <div className="nd-about-grid">
          <div className="nd-about-media">
            <img src={PLAN_ITEMS[0].src} alt="The Nest — Official Site & Layout Plan" />
          </div>
          <div className="nd-about-text">
            <span className="nd-eyebrow">About the Project</span>
            <h3 className="nd-title">The Nest — A Planned Community</h3>
            <div className="nd-about-location">
              <i className="fa-solid fa-location-dot"></i> Sector 12, Lucknow
            </div>
            <p className="nd-lead">
              The Nest is a thoughtfully planned plotted residential community in Sector 12, Lucknow,
              designed around clearly defined plots, internal roads, landscaped greens and
              community-focused spaces.
            </p>
            <p className="nd-about-sub">
              With a well-planned layout and convenient connectivity, The Nest is positioned for
              comfortable living and long-term value.
            </p>
            <div className="nd-about-specs">
              <div className="nd-spec-row">
                <span className="nd-spec-icon"><i className="fa-solid fa-file-signature"></i></span>
                <span className="nd-spec-text">
                  <span className="nd-spec-label">Official Layout</span>
                  <span className="nd-spec-value">File No. LDA/LD/25-26/0804</span>
                </span>
              </div>
              <div className="nd-spec-row">
                <span className="nd-spec-icon"><i className="fa-solid fa-vector-square"></i></span>
                <span className="nd-spec-text">
                  <span className="nd-spec-label">Net Plot Area</span>
                  <span className="nd-spec-value">39,990.59 sq.m</span>
                </span>
              </div>
              <div className="nd-spec-row">
                <span className="nd-spec-icon"><i className="fa-solid fa-shield-halved"></i></span>
                <span className="nd-spec-text">
                  <span className="nd-spec-label">RERA Project ID</span>
                  <span className="nd-spec-value">UPRERAPRJ845286/10/2025</span>
                </span>
              </div>
              <div className="nd-spec-row">
                <span className="nd-spec-icon"><i className="fa-solid fa-building-shield"></i></span>
                <span className="nd-spec-text">
                  <span className="nd-spec-label">Promoter</span>
                  <span className="nd-spec-value">Omaxe Garv Buildtech Private Limited</span>
                </span>
              </div>
            </div>
            <div className="nd-about-cta">
              <a className="nd-btn nd-btn-primary" href="#sidebarForm">
                <i className="fa-solid fa-calendar-check"></i> Book a Site Visit
              </a>
              <button
                type="button"
                className="nd-btn nd-btn-outline"
                onClick={() => setPlanOpen(true)}
                aria-label="Open the official site plan"
              >
                <i className="fa-solid fa-map"></i> View Site Plan
              </button>
            </div>
          </div>
        </div>
      </Reveal>
      <SiteViewer open={planOpen} onClose={() => setPlanOpen(false)} />
    </section>
  )
}

function Overview() {
  return (
    <section className="nd-section nd-overview">
      <Reveal>
        <SectionHead
          eyebrow="Quick Overview"
          title="The Nest at a Glance"
          lead="Verified project details from the official The Nest layout and price list documents."
        />
      </Reveal>
      <div className="nd-overview-grid">
        {OVERVIEW.map(function (o, i) {
          return (
            <Reveal key={o.label} delay={i * 80}>
              <div className="nd-ov-card">
                <span className="nd-ov-icon"><i className={o.icon}></i></span>
                <div className="nd-ov-text">
                  <span className="nd-ov-label">{o.label}</span>
                  <span className="nd-ov-value">{o.value}</span>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function SiteViewer({ open, onClose, items = PLAN_ITEMS, title = 'Site / Master Plan' }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(100)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef({ sx: 0, sy: 0, px: 0, py: 0 })

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
      if (items.length > 1) {
        if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + items.length) % items.length)
        if (e.key === 'ArrowRight') setActive((i) => (i + 1) % items.length)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, items.length])

  function clampZoom(z) {
    return Math.min(300, Math.max(100, z))
  }

  function handleWheel(e) {
    e.preventDefault()
    setZoom((z) => clampZoom(z + (e.deltaY > 0 ? -15 : 15)))
  }

  function handlePointerDown(e) {
    if (zoom <= 100) return
    e.preventDefault()
    setDragging(true)
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y }
  }

  function handlePointerMove(e) {
    if (!dragging) return
    const d = dragRef.current
    setPan({ x: d.px + (e.clientX - d.sx), y: d.py + (e.clientY - d.sy) })
  }

  function handlePointerUp() {
    setDragging(false)
  }

  function resetView() {
    setZoom(100)
    setPan({ x: 0, y: 0 })
  }

  function changeZoom(delta) {
    setZoom((z) => clampZoom(z + delta))
  }

  function switchImage(idx) {
    setActive(idx)
    resetView()
  }

  if (!open) return null

  const item = items[active]
  const scale = zoom / 100

  return (
    <div className="nd-pv" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="nd-pv-header">
        <div className="nd-pv-header-line" aria-hidden="true"></div>
        <h3 className="nd-pv-title">{title}</h3>
        <div className="nd-pv-header-line" aria-hidden="true"></div>
      </div>

      <button type="button" className="nd-pv-close" onClick={onClose} aria-label="Close plan viewer">
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="nd-pv-tools">
        <button type="button" className="nd-pv-tool" onClick={() => changeZoom(-15)} aria-label="Zoom out">
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className="nd-pv-zoom">{zoom}%</span>
        <button type="button" className="nd-pv-tool" onClick={() => changeZoom(15)} aria-label="Zoom in">
          <i className="fa-solid fa-plus"></i>
        </button>
        <button type="button" className="nd-pv-tool" onClick={resetView} aria-label="Reset zoom">
          <i className="fa-solid fa-rotate-left"></i>
        </button>
      </div>

      <div className="nd-pv-thumbs">
        {items.length > 1 && items.map(function (p, i) {
          return (
            <button
              key={i}
              type="button"
              className={'nd-pv-thumb' + (i === active ? ' active' : '')}
              onClick={() => switchImage(i)}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      <div
        className="nd-pv-stage"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: zoom > 100 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          src={item.src}
          alt={item.label}
          style={{
            transform: 'scale(' + scale + ') translate(' + (pan.x / scale) + 'px, ' + (pan.y / scale) + 'px)',
            transition: dragging ? 'none' : 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>

      <span className="nd-pv-hint">
        <i className="fa-solid fa-magnifying-glass-plus"></i> Scroll to zoom &middot; drag to pan
      </span>
    </div>
  )
}

function SitePlan() {
  const [open, setOpen] = useState(false)
  return (
    <section id="site-plan" className="nd-section nd-siteplan">
      <Reveal>
        <SectionHead
          eyebrow="Site Layout"
          title="Site / Master Plan"
          lead="The official layout of The Nest — residential plots, internal roads, green areas, entry gates and overall site planning."
        />
      </Reveal>
      <Reveal>
        <div className="nd-plan-wrap">
          <div className="nd-plan-card">
            <img src={PLAN_ITEMS[0].src} alt="The Nest — Official Site Layout" />
            <div className="nd-plan-meta">
              <span className="nd-plan-caption">Official Site Layout — The Nest, Sector 12, Lucknow</span>
              <button type="button" className="nd-plan-btn" onClick={() => setOpen(true)}>
                <i className="fa-solid fa-expand"></i> View Full Plan
              </button>
            </div>
          </div>
          <div className="nd-plan-chips">
            {AREA_SPLIT.map(function (s) {
              return (
                <div className="nd-plan-chip" key={s.label}>
                  <span className="nd-plan-chip-label">{s.label}</span>
                  <span className="nd-plan-chip-pct">{s.pct}</span>
                  <span className="nd-plan-chip-area">{s.area}</span>
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>
      {open && <SiteViewer open onClose={() => setOpen(false)} />}
    </section>
  )
}

function Amenities() {
  const [amenityOpen, setAmenityOpen] = useState(false)
  const amenityItems = [{ src: A('Amenities-Layout.jpg'), label: 'Official Amenities Layout' }]
  return (
    <section className="nd-section nd-amenities">
      <Reveal>
        <SectionHead
          eyebrow="Amenities"
          title="A Community Planned Around Green Living"
          lead="From a landscaped waterbody and open-air amphitheatre to kids play areas and open gyms — amenities are woven into the layout."
        />
      </Reveal>
      <Reveal>
        <div className="nd-amenity-media">
          <img src={A('Amenities-Layout.jpg')} alt="The Nest — Official Amenities Layout" />
          <span className="nd-amenity-tag"><i className="fa-solid fa-map"></i> Official Amenities Layout</span>
          <div className="nd-amenity-actions">
            <button type="button" className="nd-amenity-btn" onClick={() => setAmenityOpen(true)}>
              <i className="fa-solid fa-expand"></i> View Full Amenities Plan
            </button>
          </div>
        </div>
      </Reveal>
      <div className="nd-amenity-grid">
        {AMENITIES.map(function (a, i) {
          return (
            <Reveal key={a.title} delay={i * 70}>
              <div className="nd-amenity-card">
                <span className="nd-amenity-icon"><i className={a.icon}></i></span>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
      {amenityOpen && <SiteViewer open onClose={() => setAmenityOpen(false)} items={amenityItems} title="Amenities Layout" />}
    </section>
  )
}

function Infra() {
  return (
    <section className="nd-section nd-infra">
      <Reveal>
        <SectionHead
          eyebrow="Infrastructure & Features"
          title="Planned to Township Standards"
          lead="Official layout highlights from The Nest site plan — infrastructure, roads and community facilities."
        />
      </Reveal>
      <div className="nd-infra-grid">
        {FEATURES.map(function (f, i) {
          return (
            <Reveal key={f.title} delay={i * 70}>
              <div className="nd-infra-card">
                <span className="nd-infra-icon"><i className={f.icon}></i></span>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="nd-section nd-pricing">
      <Reveal>
        <SectionHead
          eyebrow="Price & Payment Plan"
          title="Transparent Pricing & Payment Schedule"
          lead="Official rates and payment terms as per the The Nest price list."
        />
      </Reveal>
      <div className="nd-pricing-wrap">
        <Reveal>
          <div className="nd-rate-card">
            <div className="nd-rate-sweep" aria-hidden="true"></div>
            <span className="nd-rate-icon"><i className="fa-solid fa-indian-rupee-sign"></i></span>
            <div className="nd-rate-label">Official Launch Rate</div>
            <div className="nd-rate-value">₹60,000<span className="nd-rate-unit">/- per Square Yard*</span></div>
            <a className="nd-price-dl" href={PDF_PRICELIST} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-file-arrow-down"></i> Download Price List
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="nd-payplan">
            <h4 className="nd-payplan-title"><i className="fa-solid fa-money-check-dollar"></i> Payment Schedule</h4>
            <ol className="nd-payplan-list">
              {PAYMENT_STEPS.map(function (s, i) {
                return (
                  <li key={i}>
                    <span className="nd-payplan-step">{String(i + 1).padStart(2, '0')}</span>
                    <div className="nd-payplan-body">
                      <strong>{s.title}</strong>
                      <p>{s.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
            <div className="nd-payplan-note" role="note">
              <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
              <p>Note: The construction linked stages can be called for payments in any sequence, depending
                on the sequence undertaken by the developer, irrespective of the sequence mentioned above.</p>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <p className="nd-price-note">
          *Prices/rates are subject to the terms mentioned in the official price list. Please contact us
          for the latest pricing and availability.
        </p>
      </Reveal>
    </section>
  )
}

function Downloads() {
  return (
    <section className="nd-section nd-downloads">
      <Reveal>
        <div className="nd-download-band">
          <div className="nd-download-glow" aria-hidden="true"></div>
          <div className="nd-download-accent" aria-hidden="true"></div>
          <div className="nd-download-text">
            <span className="nd-eyebrow">Official Documents</span>
            <h3 className="nd-title">The Nest, in full detail</h3>
            <p>
              Download the official site / layout plan and the price &amp; payment list to review the
              plotted layout, area statements and payment terms at your own pace.
            </p>
          </div>
          <div className="nd-download-actions">
            <a className="nd-dl-btn nd-dl-light" href={PDF_BROCHURE} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-file-image"></i> Download Site / Layout PDF
            </a>
            <a className="nd-dl-btn nd-dl-dark" href={PDF_PRICELIST} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-file-invoice-dollar"></i> Download Price List PDF
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Final() {
  return (
    <section className="nd-section nd-final">
      <Reveal>
        <div className="nd-final-grid">
          <div className="nd-final-text">
            <span className="nd-eyebrow">Begin your journey</span>
            <h2 className="nd-title">Make The Nest Your Next Address</h2>
            <p>
              Book a site visit or send an enquiry — our team will guide you through plotted units,
              pricing and possession timelines.
            </p>
            <ul className="nd-final-points">
              <li><i className="fa-solid fa-check"></i> Plotted Development</li>
              <li><i className="fa-solid fa-check"></i> Sector 12, Lucknow</li>
              <li><i className="fa-solid fa-check"></i> Personalised Site Visit</li>
            </ul>
            <div className="nd-final-buttons">
              <a className="nd-btn nd-btn-primary" href="#sidebarForm">
                <i className="fa-solid fa-calendar-check"></i> Book a Site Visit
              </a>
              <a className="nd-btn nd-btn-outline" href="#sidebarForm">
                <i className="fa-solid fa-paper-plane"></i> Enquire Now
              </a>
            </div>
          </div>
          <div className="nd-final-form">
            <EnquirySidebar
              overview={[
                { label: 'Location', value: 'Sector 12, Lucknow' },
                { label: 'Type', value: 'Plotted Development' },
                { label: 'Rate', value: '₹60,000 / Sq. Yd*' },
                { label: 'Status', value: 'Under Construction' },
              ]}
              dataProject="THE NEST, Sector 12 Lucknow"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function NestDetails() {
  return (
    <div className="container nd-details">
      <About />
      <Overview />
      <SitePlan />
      <Amenities />
      <Infra />
      <Pricing />
      <Downloads />
      <Final />
    </div>
  )
}

export default NestDetails