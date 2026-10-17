import { useEffect, useRef, useState } from 'react'
import EnquirySidebar from './EnquirySidebar'

const A = (file) => `/assets/palm-city/${file}`

const PDF_BROCHURE = '/assets/Palm%20city%20images/Palm%20City%20Brochure%20-%20Compressed.pdf'
const PDF_PRICELIST = '/assets/Palm%20city%20images/Independent%20Floor%20PL%20%26%20PP.pdf'

const FLOORS = [
  {
    type: '3 BHK',
    name: 'Aurelia',
    area: 1475,
    plot: '10M × 20M',
    img: A('floor-plan-1475.jpg'),
  },
  {
    type: '3 BHK',
    name: 'Aurelia',
    area: 1650,
    plot: '10M × 22M',
    img: A('floor-plan-1650.jpg'),
  },
  {
    type: '4 BHK + Servant',
    name: 'Grandeur',
    area: 2150,
    plot: '12.5M × 24M',
    img: A('floor-plan-2150.jpg'),
  },
]

const GLANCE = [
  { icon: 'fa-solid fa-building', value: '3 & 4 BHK', label: 'Luxury Floor Residences' },
  { icon: 'fa-solid fa-layer-group', value: 'S+4', label: 'Stilt Structure' },
  { icon: 'fa-solid fa-ruler-combined', value: '1475–2150', label: 'Sq.ft Saleable Area' },
  { icon: 'fa-solid fa-indian-rupee-sign', value: '₹1.11 Cr*', label: 'Starting Price' },
  { icon: 'fa-solid fa-location-dot', value: 'Sector 79', label: 'Lucknow' },
  { icon: 'fa-solid fa-plane-up', value: '30 Mins', label: 'To Lucknow Airport' },
]

const CONNECTIVITY = [
  { icon: 'fa-solid fa-road', place: 'Kisan Path (Outer Ring Road)', time: '5 Mins' },
  { icon: 'fa-solid fa-route', place: 'Shaheed Path', time: '10 Mins' },
  { icon: 'fa-solid fa-plane-up', place: 'Lucknow International Airport', time: '30 Mins' },
  { icon: 'fa-solid fa-train-subway', place: 'Lucknow – Agra Expressway', time: '30 Mins' },
  { icon: 'fa-solid fa-bag-shopping', place: 'Lulu Mall', time: '30 Mins' },
]

const FEATURES = [
  { icon: 'fa-solid fa-elevator', title: 'Private Lift Access', desc: 'A private lift for every residence, adding ease and exclusivity to daily living.' },
  { icon: 'fa-solid fa-square-parking', title: 'Dedicated Parking', desc: 'Exclusive parking thoughtfully planned for each independent floor.' },
  { icon: 'fa-solid fa-sun', title: 'Abundant Natural Light', desc: 'Open, well-planned layouts filled with natural light through the day.' },
  { icon: 'fa-solid fa-wind', title: 'Seamless Cross-Ventilation', desc: 'Refined design that keeps every home fresh and constantly ventilated.' },
  { icon: 'fa-solid fa-leaf', title: 'Serene Living Environment', desc: 'A calm, private haven crafted for space, comfort and peace of mind.' },
  { icon: 'fa-solid fa-route', title: 'Excellent Connectivity', desc: 'Links to key city corridors and the expressway keep you moving freely.' },
]

const GALLERY = [
  { src: A('gallery-01.jpg'), caption: 'Palm City Residences' },
  { src: A('gallery-02.jpg'), caption: 'Elevated Living' },
  { src: A('gallery-03.jpg'), caption: 'Architecture & Spaces' },
  { src: A('gallery-04.jpg'), caption: 'Crafted Lifestyle' },
]

const PRICES = [
  { conf: '3 BHK', type: 'Aurelia', area: '1475 sq.ft', price: '₹1.11 Cr' },
  { conf: '3 BHK', type: 'Aurelia', area: '1650 sq.ft', price: '₹1.24 Cr' },
  { conf: '4 BHK + Servant', type: 'Grandeur', area: '2150 sq.ft', price: '₹1.61 Cr' },
]

const ADDONS = [
  'PLC: ₹225/- sq.ft (18m road) · ₹150/- sq.ft (park facing) · ₹200/- sq.ft (UGF) · ₹250/- sq.ft (top floor with terrace)',
  'External Development Charges (EDC): ₹50/- sq.ft',
  'External Electrification Charges (EEC): ₹25/- sq.ft',
  'Fire Fighting Charges (FFC): ₹25/- sq.ft',
  'Power Back-up: ₹30,000/- per KVA (4 KVA – 3 BHK / 5 KVA – 4 BHK + Servant)',
  'Club Membership: ₹1,50,000/- per unit',
  'Covered Car Parking: ₹1,50,000/- (one car parking allowed)',
]

const PAY_PLANS = [
  {
    key: 'A',
    label: 'Plan A',
    tag: 'Discount of ₹200/- per sq.ft',
    stages: [
      ['At The Time of Booking', '₹11,000/-'],
      ['Within 45 days from the booking', '30% MSP incl. GST (less booking amount)'],
      ['On Allotment or 6 months, whichever is later', '5% MSP + GST'],
      ['On Start of Construction', '10% MSP + GST'],
      ['On UGF Slab Casting', '10% MSP + GST'],
      ['On 3rd Roof Floor Slab Casting', '10% MSP + GST'],
      ['On Internal Plaster of allotted units', '10% MSP + GST'],
      ['On Flooring of allotted units', '10% MSP + GST'],
      ['On Apply of CC', '10% MSP + GST'],
      ['On Offer of Possession', '5% MSP + 100% charges*'],
    ],
  },
  {
    key: 'B',
    label: 'Plan B',
    tag: 'Discount of ₹200/- per sq.ft',
    stages: [
      ['At The Time of Booking', '₹11,000/-'],
      ['Within 45 days from the booking', '50% MSP incl. GST (less booking amount)'],
      ['On Allotment or 6 months, whichever is later', '5% MSP + GST'],
      ['On Apply of CC', '25% MSP + GST'],
      ['On Offer of Possession', '20% MSP + 100% charges*'],
    ],
  },
  {
    key: 'C',
    label: 'Plan C',
    tag: 'Booking ₹8.0 Lacs (3 BHK) / ₹10.0 Lacs (4 BHK + Servant), incl. GST',
    stages: [
      ['At The Time of Booking', '₹8.0 Lacs (3 BHK) / ₹10.0 Lacs (4 BHK + Servant), incl. GST'],
      ['Within 90 days from the booking', '20% MSP incl. GST (less booking amount)'],
      ['On Allotment or 6 months, whichever is later', '20% MSP + GST'],
      ['On UGF Slab Casting', '10% MSP + GST'],
      ['On 3rd Roof Floor Slab Casting', '10% MSP + GST'],
      ['On Internal Plaster of allotted units', '10% MSP + GST'],
      ['On Flooring of allotted units', '10% MSP + GST'],
      ['On Apply of CC', '10% MSP + GST'],
      ['On Offer of Possession', '10% MSP + 100% charges*'],
    ],
  },
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
      <img src={current.src} alt={current.caption || current.title || 'Palm City'} />
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
        <span>{current.caption || current.title || 'Palm City'}</span>
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
            <span className="pc-eyebrow">The Palm City Experience</span>
            <h2 className="pc-title">
              Elevated Living,
              <br />
              Redefined Every Day
            </h2>
            <p className="pc-lead">
              Experience a new standard of elevated living with our spacious 3 &amp; 4 BHK + Servant
              Luxury Floor Residences in Lucknow. Thoughtfully designed with private lift access,
              dedicated parking, abundant natural light, and seamless cross-ventilation, every
              residence blends comfort, elegance, and functionality.
            </p>
            <p className="pc-about-sub">
              Set in a fast-developing neighbourhood, these refined homes offer a serene living
              environment with excellent connectivity — crafted for families who desire space,
              privacy, and a truly elevated lifestyle.
            </p>
            <ul className="pc-about-list">
              <li><i className="fa-solid fa-elevator"></i><span>Private Lift Access</span></li>
              <li><i className="fa-solid fa-square-parking"></i><span>Dedicated Parking</span></li>
              <li><i className="fa-solid fa-sun"></i><span>Abundant Natural Light</span></li>
              <li><i className="fa-solid fa-wind"></i><span>Seamless Cross-Ventilation</span></li>
            </ul>
            <div className="pc-about-ss">
              <span className="pc-about-ss-icon"><i className="fa-solid fa-layer-group"></i></span>
              <div className="pc-about-ss-body">
                <strong>S+4 Structure</strong>
                <span>Spacious Luxury Floors</span>
              </div>
            </div>
            <div className="pc-about-chips">
              <span className="pc-chip pc-chip-dark">S+4 Independent Floors</span>
              <span className="pc-chip pc-chip-ivory">1475 – 2150 sq.ft Saleable</span>
              <span className="pc-chip pc-chip-gold">Starting ₹1.11 Cr*</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={130} className="pc-about-col-media">
          <div className="pc-about-media">
            <div className="pc-about-frame">
              <img src={A('gallery-03.jpg')} alt="Palm City architecture" loading="lazy" />
              <span className="pc-about-vignette" aria-hidden="true"></span>
              <div className="pc-about-float">
                <span className="pc-about-float-icon"><i className="fa-solid fa-location-dot"></i></span>
                <div>
                  <strong>Sector 79, Lucknow</strong>
                  <span>Premium Independent Floors</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Glance() {
  return (
    <section className="pc-section pc-ivory pc-glance" id="overview">
      <Reveal>
        <SectionHead
          eyebrow="Palm City at a Glance"
          title="Everything You Need, in One Address"
          lead="A quick look at what makes Palm City a compelling choice in Sector 79, Lucknow."
        />
      </Reveal>
      <div className="pc-glance-grid">
        {GLANCE.map(function (item, i) {
          return (
            <Reveal key={item.label} delay={i * 70}>
              <div className="pc-glance-card">
                <span className="pc-glance-icon"><i className={item.icon}></i></span>
                <strong className="pc-glance-value">{item.value}</strong>
                <span className="pc-glance-label">{item.label}</span>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Location() {
  return (
    <section className="pc-section pc-location" id="location">
      <Reveal>
        <SectionHead
          eyebrow="Location & Connectivity"
          title="Ideally Placed for City & Beyond"
          lead="Approximate travel times from Palm City, Sector 79, Lucknow."
        />
      </Reveal>
      <div className="pc-location-grid">
        {CONNECTIVITY.map(function (c, i) {
          return (
            <Reveal key={c.place} delay={i * 70}>
              <div className="pc-location-card">
                <span className="pc-location-icon"><i className={c.icon}></i></span>
                <div className="pc-location-body">
                  <span className="pc-location-time">{c.time}</span>
                  <strong className="pc-location-place">{c.place}</strong>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Reveal>
        <p className="pc-location-note">
          <i className="fa-solid fa-circle-info"></i>
          Travel times are approximate and may vary with traffic conditions.
        </p>
      </Reveal>
    </section>
  )
}

function FloorPlans() {
  const [index, setIndex] = useState(null)
  const items = FLOORS.map(function (f) {
    return { src: f.img, title: `${f.area} sq.ft · ${f.type}`, caption: `${f.name} — ${f.type} · Plot ${f.plot} · S+4` }
  })

  return (
    <section className="pc-section pc-plans" id="floor-plans">
      <Reveal>
        <SectionHead
          eyebrow="Floor Plans"
          title="Choose the Space You Love"
          lead="Three thoughtfully planned independent floor layouts, each with its own private lift."
        />
      </Reveal>
      <div className="pc-plans-grid">
        {FLOORS.map(function (f, i) {
          return (
            <Reveal key={`${f.name}-${f.area}`} delay={i * 80}>
              <div className="pc-plan-card">
                <div className="pc-plan-media">
                  <img src={f.img} alt={`Palm City ${f.area} sq.ft ${f.type} floor plan`} loading="lazy" />
                  <div className="pc-plan-shade" aria-hidden="true"></div>
                  <span className="pc-plan-badge">{f.type}</span>
                </div>
                <div className="pc-plan-body">
                  <span className="pc-plan-name">{f.name}</span>
                  <h4>{f.area} sq.ft &middot; {f.type}</h4>
                  <p>Plot {f.plot} &middot; S+4 &middot; Saleable {f.area} sq.ft</p>
                  <button type="button" className="pc-plan-btn" onClick={() => setIndex(i)}>
                    <i className="fa-solid fa-expand"></i> View Floor Plan
                  </button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Lightbox items={items} index={index} setIndex={setIndex} />
    </section>
  )
}

function Features() {
  return (
    <section className="pc-section pc-band pc-features" id="features">
      <Reveal>
        <SectionHead
          light
          eyebrow="Features"
          title="Crafted for Space, Privacy & Comfort"
          lead="Every residence is planned around the way modern families actually live."
        />
      </Reveal>
      <div className="pc-features-grid">
        {FEATURES.map(function (f, i) {
          return (
            <Reveal key={f.title} delay={(i % 3) * 80}>
              <div className="pc-feature-card">
                <span className="pc-feature-icon"><i className={f.icon}></i></span>
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

function Gallery() {
  const [index, setIndex] = useState(null)

  return (
    <section className="pc-section pc-ivory pc-gallery" id="gallery">
      <Reveal>
        <SectionHead
          eyebrow="Gallery"
          title="A Glimpse of the Lifestyle"
          lead="A look at the architecture and ambiance of Palm City."
        />
      </Reveal>
      <div className="pc-gallery-grid">
        {GALLERY.map(function (g, i) {
          return (
            <Reveal key={g.src} delay={(i % 2) * 80}>
              <button type="button" className="pc-gallery-item" onClick={() => setIndex(i)} aria-label={`Open ${g.caption} in full view`}>
                <img src={g.src} alt={g.caption} loading="lazy" />
                <span className="pc-gallery-zoom"><i className="fa-solid fa-expand"></i></span>
                <span className="pc-gallery-caption">{g.caption}</span>
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
    <section className="pc-section pc-pricing" id="pricing">
      <Reveal>
        <SectionHead
          eyebrow="Price List"
          title="Transparent Pricing, Premium Living"
          lead="Official price list effective 1st September 2026 to 30th September 2026."
        />
      </Reveal>

      <Reveal>
        <div className="pc-price-table-wrap">
          <table className="pc-price-table">
            <thead>
              <tr>
                <th>Configuration</th>
                <th>Unit Type</th>
                <th>Saleable Area</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {PRICES.map(function (p) {
                return (
                  <tr key={`${p.type}-${p.area}`}>
                    <td><strong>{p.conf}</strong></td>
                    <td>{p.type}</td>
                    <td>{p.area}</td>
                    <td className="pc-price-val">{p.price}*</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="pc-price-note">
            *GST and applicable charges extra. Price of a unit is prevailing on the date of booking and may be revised by the Company from time to time.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="pc-addons">
          <div className="pc-addons-head">
            <span className="pc-addons-icon"><i className="fa-solid fa-plus"></i></span>
            <h4>Additional Charges (as per the official price list)</h4>
          </div>
          <ul className="pc-addons-list">
            {ADDONS.map(function (a) {
              return <li key={a}><i className="fa-solid fa-check"></i><span>{a}</span></li>
            })}
          </ul>
        </div>
      </Reveal>

      <Reveal>
        <div className="pc-price-actions">
          <a className="pc-btn pc-btn-primary" href={PDF_PRICELIST} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-file-arrow-down"></i> Download the Price List
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function Payment() {
  const [active, setActive] = useState(PAY_PLANS[0].key)
  const plan = PAY_PLANS.find(function (p) { return p.key === active })

  return (
    <section className="pc-section pc-band pc-payment" id="payment">
      <Reveal>
        <SectionHead
          light
          eyebrow="Payment Plans"
          title="Flexible Payment Milestones"
          lead="Choose the plan that suits your cash flow. All plans are offered by the developer from the official price list."
        />
      </Reveal>

      <Reveal>
        <div className="pc-pay-tabs" role="tablist">
          {PAY_PLANS.map(function (p) {
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={p.key === active}
                className={p.key === active ? 'active' : ''}
                onClick={() => setActive(p.key)}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </Reveal>

      <Reveal>
        <div className="pc-pay-panel" key={plan.key}>
          <div className="pc-pay-tag">
            <i className="fa-solid fa-tags"></i> {plan.tag}
          </div>
          <ol className="pc-pay-stages">
            {plan.stages.map(function (stage, i) {
              return (
                <li key={i}>
                  <span className="pc-pay-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="pc-pay-stage">
                    <strong>{stage[1]}</strong>
                    <span>{stage[0]}</span>
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="pc-pay-foot">
            *On Offer of Possession: 100% Additional Charges + 100% PLC (if any) + 100% AMC + 100% IFMS
            + Stamp Duty, Registration &amp; Other Charges (if any) + GST, payable along with the last installment.
          </p>
          <p className="pc-pay-foot">
            For Construction / Development Linked Plans, the demand may not necessarily follow the above
            sequence and will be raised as per work done in the individual unit. All government charges,
            taxes (including GST, IDC &amp; other cesses) and levies are payable additionally. Payments are
            to be made through Cheque / DD payable at Lucknow, unless online payment is otherwise permitted.
          </p>
        </div>
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
            <h3 className="pc-title">Palm City, in full detail</h3>
            <p>Download the official brochure and price list to explore layouts, plans, pricing and payment options at your own pace.</p>
          </div>
          <div className="pc-download-actions">
            <a className="pc-dl-btn pc-dl-light" href={PDF_BROCHURE} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-file-pdf"></i> Download Brochure
            </a>
            <a className="pc-dl-btn pc-dl-dark" href={PDF_PRICELIST} target="_blank" rel="noreferrer">
              <i className="fa-solid fa-file-arrow-down"></i> Download Price List
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Final() {
  return (
    <section className="pc-section pc-final" id="contact">
      <div className="pc-final-grid">
        <Reveal>
          <div className="pc-final-text">
            <span className="pc-eyebrow">Begin your journey</span>
            <h2 className="pc-title">Make Palm City Your New Address</h2>
            <p>
              Book a private site visit or send an enquiry — our team will guide you through
              residences, pricing and payment options.
            </p>
            <ul className="pc-final-points">
              <li><i className="fa-solid fa-check"></i> Luxury 3 &amp; 4 BHK + Servant Independent Floors</li>
              <li><i className="fa-solid fa-check"></i> Sector 79, Lucknow</li>
              <li><i className="fa-solid fa-check"></i> Starting from ₹1.11 Cr*</li>
              <li><i className="fa-solid fa-check"></i> Personalised Site Visit</li>
            </ul>
            <div className="pc-final-buttons">
              <a className="pc-btn pc-btn-primary" href="#sidebarForm">
                <i className="fa-solid fa-calendar-check"></i> Book a Site Visit
              </a>
              <a className="pc-btn pc-btn-outline" href="#sidebarForm">
                <i className="fa-solid fa-paper-plane"></i> Enquire Now
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div className="pc-final-form">
            <EnquirySidebar
              overview={[
                { label: 'Location', value: 'Sector 79, Lucknow' },
                { label: 'Type', value: '3 & 4 BHK + Servant Independent Floors' },
                { label: 'Price', value: '₹1.11 Cr – ₹1.61 Cr*' },
                { label: 'Area', value: '1475 – 2150 sq.ft' },
              ]}
              dataProject="PALM CITY, Sector 79 Lucknow"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PalmCityDetails() {
  return (
    <div className="container pc-details">
      <About />
      <Glance />
      <Location />
      <FloorPlans />
      <Features />
      <Gallery />
      <Pricing />
      <Payment />
      <Downloads />
      <Final />
    </div>
  )
}

export default PalmCityDetails