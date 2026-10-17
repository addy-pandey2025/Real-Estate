import { useEffect, useRef, useState } from 'react'
import EnquirySidebar from './EnquirySidebar'

const A = (file) => `/assets/serenity/${file}`

const PDF_BROCHURE = '/assets/Serenity%20images/Serenity%20Brochure_4APRIL_res.pdf'

const HIGHLIGHTS = [
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Luxury 4 BHK + Servant + Store',
    desc: 'Truly expansive residences crafted for space, comfort and an elevated everyday lifestyle.',
  },
  {
    icon: 'fa-solid fa-mountain',
    title: 'Panoramic Golf Course Views',
    desc: 'Stunning views towards the beautiful golf course from residences across the towers.',
  },
  {
    icon: 'fa-solid fa-sun',
    title: 'Natural Light & Ventilation',
    desc: 'Open, well-planned layouts filled with abundant natural light and fresh, clean air.',
  },
  {
    icon: 'fa-solid fa-door-open',
    title: 'Balcony Decks on Every Bedroom',
    desc: 'Balcony decks attached to every bedroom keep you connected to the open skies and greenery.',
  },
  {
    icon: 'fa-solid fa-leaf',
    title: 'Landscaped Central Greens',
    desc: 'Expansive landscaped Central Greens preserve a serene, evergreen environment within the gates.',
  },
  {
    icon: 'fa-solid fa-champagne-glasses',
    title: 'Club Rishita Lifestyle',
    desc: 'A premium pedestal of convenience, affluence and everyday indulgence for the entire family.',
  },
]

const LIFESTYLE = [
  { src: A('lifestyle-living.jpg'), caption: 'The Living Area' },
  { src: A('lifestyle-bedroom.jpg'), caption: 'Modern Bedrooms' },
  { src: A('lifestyle-kitchen.jpg'), caption: 'Designated Kitchen' },
  { src: A('lifestyle-pool.jpg'), caption: 'Swimming Pool & Wellness' },
  { src: A('lifestyle-balcony.jpg'), caption: 'Panoramic Balcony' },
  { src: A('lifestyle-lobby.jpg'), caption: 'Grand Entrance Lobby' },
]

const CLUB = [
  { icon: 'fa-solid fa-shop', label: 'Convenience Shopping' },
  { icon: 'fa-solid fa-champagne-glasses', label: 'Banquet Hall' },
  { icon: 'fa-solid fa-music', label: 'Party Hall' },
  { icon: 'fa-solid fa-utensils', label: 'Restaurant with Well-Equipped Kitchen' },
  { icon: 'fa-solid fa-water', label: 'Floating Restaurant' },
  { icon: 'fa-solid fa-chair', label: 'Outdoor Seating Area' },
  { icon: 'fa-solid fa-people-group', label: 'Conference Hall' },
  { icon: 'fa-solid fa-book-open', label: 'Library' },
  { icon: 'fa-solid fa-baby', label: 'Creche' },
  { icon: 'fa-solid fa-child', label: 'Indoor Kids Play Zone' },
  { icon: 'fa-solid fa-tree', label: 'Landscape Terrace with Sitout' },
  { icon: 'fa-solid fa-bed', label: 'Serviced Guest Rooms / Suites' },
  { icon: 'fa-solid fa-video', label: 'Mini Theatre' },
  { icon: 'fa-solid fa-gamepad', label: 'Golf & Cricket Simulator' },
  { icon: 'fa-solid fa-spa', label: 'Salon & Spa' },
  { icon: 'fa-solid fa-person-swimming', label: 'Indoor All-Weather Swimming Pool' },
  { icon: 'fa-solid fa-table-tennis-paddle-ball', label: 'Indoor Badminton Court' },
  { icon: 'fa-solid fa-hand-fist', label: 'Squash Court' },
  { icon: 'fa-solid fa-circle-dot', label: 'Billiards Room' },
  { icon: 'fa-solid fa-dumbbell', label: 'Hi-Tech Gymnasium' },
  { icon: 'fa-solid fa-child-reaching', label: 'Kids Play Area' },
]

const CLUB_FEATURED_LABELS = [
  'Indoor All-Weather Swimming Pool',
  'Banquet Hall',
  'Restaurant with Well-Equipped Kitchen',
  'Hi-Tech Gymnasium',
  'Indoor Kids Play Zone',
  'Salon & Spa',
  'Golf & Cricket Simulator',
  'Mini Theatre',
]

const CLUB_MAIN = CLUB_FEATURED_LABELS.map(function (label) {
  return CLUB.find(function (item) {
    return item.label === label
  })
}).filter(Boolean)

const CLUB_MORE = CLUB.filter(function (item) {
  return !CLUB_FEATURED_LABELS.includes(item.label)
})

const AMENITIES = [
  { icon: 'fa-solid fa-tree-city', label: 'Landscaped Entrances' },
  { icon: 'fa-solid fa-palette', label: 'High-End Finishes for Exterior' },
  { icon: 'fa-solid fa-window-maximize', label: 'Huge Balconies with Glass Railing' },
  { icon: 'fa-solid fa-seedling', label: 'Large Landscaped Areas' },
  { icon: 'fa-solid fa-person-biking', label: 'Peripheral Cycling Track' },
  { icon: 'fa-solid fa-mountain-sun', label: 'Aesthetically Designed Lush Central Green Area' },
  { icon: 'fa-solid fa-person-swimming', label: 'Swimming Pool' },
  { icon: 'fa-solid fa-water', label: 'Water Body with Bubblers' },
  { icon: 'fa-solid fa-champagne-glasses', label: 'Party Lawn' },
  { icon: 'fa-solid fa-chair', label: 'Plaza with Seating' },
  { icon: 'fa-solid fa-mug-hot', label: 'Food Kiosk' },
  { icon: 'fa-solid fa-futbol', label: 'M.U.G.A. Play Court' },
  { icon: 'fa-solid fa-leaf', label: 'Central Lawn Area' },
  { icon: 'fa-solid fa-tree', label: 'Courtyards with Seating' },
  { icon: 'fa-solid fa-building', label: 'Air Conditioned Double Height Entrance Lobbies' },
  { icon: 'fa-solid fa-gamepad', label: 'Indoor Games Area' },
  { icon: 'fa-solid fa-stethoscope', label: "Doctor's Clinic" },
  { icon: 'fa-solid fa-shield-halved', label: 'CCTV Surveillance' },
  { icon: 'fa-solid fa-elevator', label: 'Branded High-Speed Lifts' },
  { icon: 'fa-solid fa-bolt', label: 'Power Back-up' },
  { icon: 'fa-solid fa-camera', label: 'Video Door Phone' },
  { icon: 'fa-solid fa-charging-station', label: 'EV Charging Points' },
]

const AMEN_FEATURED_LABELS = [
  'Landscaped Entrances',
  'Huge Balconies with Glass Railing',
  'Large Landscaped Areas',
  'Peripheral Cycling Track',
  'Swimming Pool',
  'Central Lawn Area',
  'Indoor Games Area',
  'EV Charging Points',
]

const AMEN_MAIN = AMEN_FEATURED_LABELS.map(function (label) {
  return AMENITIES.find(function (item) {
    return item.label === label
  })
}).filter(Boolean)

const AMEN_MORE = AMENITIES.filter(function (item) {
  return !AMEN_FEATURED_LABELS.includes(item.label)
})

const SPECS = [
  { title: 'Structure', items: ['Earthquake resistant monolithic RCC framed structure'] },
  { title: 'Master Bedrooms', items: ['Vitrified tile flooring', 'Plastic emulsion wall & ceiling finish'] },
  { title: 'Living / Dining / Foyer', items: ['Vitrified tile flooring', 'Plastic emulsion wall & ceiling finish'] },
  {
    title: 'Kitchen',
    items: [
      'Anti-skid tile flooring',
      'Plastic emulsion walls (2 ft high dado) & ceiling',
      'Polished granite counter top',
    ],
  },
  { title: 'Other Bedrooms', items: ['Vitrified tile flooring', 'Plastic emulsion wall & ceiling finish'] },
  {
    title: 'Toilets',
    items: [
      'Anti-skid tile flooring',
      'Vitrified tile walls',
      'Premium single-lever CP fittings, wash basin, wall-hung WC & health faucet',
    ],
  },
  {
    title: 'Balconies / Utility',
    items: ['Anti-skid tile flooring', 'Weather-proof paint', 'Glass railing with stainless steel fittings'],
  },
  {
    title: 'Doors',
    items: [
      'Teak wood finish modular main door with magic eye & premium hardware',
      'Laminated flush internal doors',
    ],
  },
  { title: 'Windows', items: ['UPVC / aluminium windows'] },
  { title: 'Staircase', items: ['Granite / kota stone / tile flooring'] },
  {
    title: 'Lift Lobby',
    items: ['High-speed premium elevators', 'Granite stone / tile flooring with granite lift wall cladding'],
  },
  { title: 'Electrical', items: ['Modular switches', 'FR wires'] },
  { title: 'Plumbing & Sanitary', items: ['CPVC & UPVC fittings (hot & cold)'] },
  { title: 'Fire Fighting', items: ['Equipment as per NBC (National Building Code)'] },
  {
    title: 'Special Features',
    items: [
      'High-end clubhouse & lifestyle amenities',
      'Gated community with access control',
      'CCTV surveillance & power back-up in common areas',
      'Basement / open car parking',
      'Landscaped parks, jogging tracks & water bodies',
      'Wi-Fi enabled campus & video door phone',
      'IGBC Green Homes Gold precertification',
    ],
  },
]

const PLANS = [
  {
    type: '3 BHK',
    label: '3 BHK · GF & 1st Floor',
    img: A('plan-3bhk.jpg'),
    lines: [
      'Unit 1 · Carpet 1991 sq.ft · Balcony 463 · Built-up 2586 sq.ft',
      'Unit 4 · Carpet 2012 sq.ft · Balcony 463 · Built-up 2608 sq.ft',
    ],
  },
  {
    type: '3 BHK + SQ',
    label: '3 BHK + SQ · Typical Towers',
    img: A('plan-3bhk-sq.jpg'),
    lines: [
      'Unit 2 · Carpet 2254 sq.ft · Balcony 493 · Built-up 2901 sq.ft',
      'Unit 3 · Carpet 2284 sq.ft · Balcony 493 · Built-up 2922 sq.ft',
    ],
  },
  {
    type: '4 BHK',
    label: '4 BHK · 12th Floor',
    img: A('plan-12th.jpg'),
    lines: [
      'Units 1 & 2 · Carpet 2254 sq.ft · Balcony 572 · Built-up 2978 sq.ft',
      'Units 3 & 4 · Carpet 2284 sq.ft · Balcony 572 · Built-up 3000 sq.ft',
    ],
  },
  {
    type: '4 BHK',
    label: '4 BHK · 13th Floor',
    img: A('plan-13th.jpg'),
    lines: [
      'Units 1 & 2 · Carpet 2254 sq.ft · Balcony 510 · Built-up 2915 sq.ft',
      'Units 3 & 4 · Carpet 2284 sq.ft · Balcony 510 · Built-up 2938 sq.ft',
    ],
  },
  {
    type: '4 BHK',
    label: '4 BHK · 14th Floor',
    img: A('plan-14th.jpg'),
    lines: [
      'Units 1 & 2 · Carpet 2254 sq.ft · Balcony 462 · Built-up 2868 sq.ft',
      'Units 3 & 4 · Carpet 2284 sq.ft · Balcony 462 · Built-up 2890 sq.ft',
    ],
  },
]

const CLUSTER = {
  type: 'Tower Cluster',
  label: 'Tower A1 & A2 · Typical Cluster',
  img: A('cluster-plan.jpg'),
  caption: 'Tower A1 & A2 — Typical Cluster',
}

const LOCATIONS = [
  { icon: 'fa-solid fa-flag', place: 'Golf Course', time: '02 Mins' },
  { icon: 'fa-solid fa-place-of-worship', place: 'ISKCON Temple', time: '02 Mins' },
  { icon: 'fa-solid fa-bag-shopping', place: 'Lulu Mall', time: '05 Mins' },
  { icon: 'fa-solid fa-store', place: 'Phoenix Palassio', time: '05 Mins' },
  { icon: 'fa-solid fa-graduation-cap', place: 'CMS School & LPS', time: '05 Mins' },
  { icon: 'fa-solid fa-school', place: 'GD Goenka & Kunskapsskolan', time: '05 Mins' },
  { icon: 'fa-solid fa-hospital', place: 'Medanta Hospital', time: '05 Mins' },
  { icon: 'fa-solid fa-basket-shopping', place: 'Market', time: '05 Mins' },
  { icon: 'fa-solid fa-city', place: 'Gomti Nagar Extension', time: '05 Mins' },
  { icon: 'fa-solid fa-trophy', place: 'Cricket Stadium', time: '10 Mins' },
  { icon: 'fa-solid fa-heart-pulse', place: 'Mother & Child Care', time: '10 Mins' },
  { icon: 'fa-solid fa-hospital', place: 'RML Hospital', time: '10 Mins' },
  { icon: 'fa-solid fa-microchip', place: 'IT City', time: '10 Mins' },
  { icon: 'fa-solid fa-plane-up', place: 'Airport', time: '15 Mins' },
  { icon: 'fa-solid fa-landmark', place: 'Hazratganj', time: '15 Mins' },
  { icon: 'fa-solid fa-train-subway', place: 'Railway Station', time: '25 Mins' },
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
      <img src={current.src} alt={current.caption || current.title || 'Serenity'} />
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
        <span>{current.caption || current.title || 'Serenity'}</span>
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
            <span className="pc-eyebrow">The Rishita Serenity Experience</span>
            <h2 className="pc-title">
              Live the Serenity,
              <br />
              In the Heart of the City
            </h2>
            <p className="pc-lead">
              Rishita Serenity presents luxury 4 BHK + Servant + Store residences in Sushant Golf City,
              Lucknow — an oasis of calm designed around comfort, natural light, greenery and an elevated
              lifestyle.
            </p>
            <p className="pc-about-sub">
              Backed by the Rishita Group&rsquo;s legacy since 2008, the project pairs expansive,
              thoughtfully planned residences with abundant natural light, seamless cross-ventilation and
              sweeping views of the golf course — crafted for families who desire space, privacy and calm.
            </p>
            <ul className="pc-about-list">
              <li><i className="fa-solid fa-sun"></i><span>Natural Light &amp; Ventilation</span></li>
              <li><i className="fa-solid fa-door-open"></i><span>Balcony Decks on Every Bedroom</span></li>
              <li><i className="fa-solid fa-mountain"></i><span>Panoramic Golf Course Views</span></li>
              <li><i className="fa-solid fa-leaf"></i><span>Landscaped Central Greens</span></li>
            </ul>
            <div className="pc-about-ss">
              <span className="pc-about-ss-icon"><i className="fa-solid fa-building"></i></span>
              <div className="pc-about-ss-body">
                <strong>Since 2008</strong>
                <span>Rishita Group Legacy</span>
              </div>
            </div>
            <div className="pc-about-chips">
              <span className="pc-chip pc-chip-dark">4 BHK + Servant + Store</span>
              <span className="pc-chip pc-chip-ivory">Sushant Golf City, Lucknow</span>
              <span className="pc-chip pc-chip-gold">IGBC Green Homes Gold</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={130} className="pc-about-col-media">
          <div className="pc-about-media">
            <div className="pc-about-frame">
              <img src={A('about.jpg')} alt="Rishita Serenity residences with landscaped Central Greens" loading="lazy" />
              <span className="pc-about-vignette" aria-hidden="true"></span>
              <div className="pc-about-float">
                <span className="pc-about-float-icon"><i className="fa-solid fa-location-dot"></i></span>
                <div>
                  <strong>Sushant Golf City, Lucknow</strong>
                  <span>Premium 4 BHK + Servant + Store</span>
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
    <section className="pc-section pc-ivory sn-overview" id="overview">
      <div className="sn-overview-grid">
        <Reveal className="sn-overview-body">
          <div className="pc-about-text sn-overview-text">
            <span className="pc-eyebrow">Quick Overview</span>
            <h2 className="pc-title">Rishita Serenity at a Glance</h2>
            <p className="pc-lead">
              An oasis in the city plan of Sushant Golf City — thoughtfully designed residences with
              expansive balconies, landscaped Central Greens and a premium lifestyle within the gates.
            </p>
            <ul className="pc-final-points">
              <li><i className="fa-solid fa-check"></i> Luxury 4 BHK + Servant + Store</li>
              <li><i className="fa-solid fa-check"></i> Sushant Golf City, Lucknow</li>
              <li><i className="fa-solid fa-check"></i> Carpet 1991 – 2284 sq.ft</li>
              <li><i className="fa-solid fa-check"></i> Advance Stage Construction</li>
            </ul>
            <div className="sn-overview-cta">
              <a className="pc-btn pc-btn-primary" href={PDF_BROCHURE} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-file-arrow-down"></i> Download Brochure
              </a>
              <a className="pc-btn pc-btn-outline" href="#floor-plans">
                Explore Floor Plans
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={140} className="sn-overview-form">
          <div className="pc-final-form">
            <EnquirySidebar
              overview={[
                { label: 'Location', value: 'Sushant Golf City, Lucknow' },
                { label: 'Type', value: '4 BHK + Servant + Store' },
                { label: 'Status', value: 'Advance Stage Construction' },
                { label: 'Area', value: '1991 – 2284 sq.ft Carpet' },
              ]}
              dataProject="SERENITY, Sushant Golf City, Lucknow"
            />
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
          title="Designed Around Your Life"
          lead="Every residence at Rishita Serenity is planned around the way modern families actually live."
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

function Lifestyle() {
  const [index, setIndex] = useState(null)

  return (
    <section className="pc-section pc-ivory pc-gallery sn-lifestyle" id="lifestyle">
      <Reveal>
        <SectionHead
          eyebrow="Lifestyle & Architecture"
          title="The Architecture of Calm"
          lead="Interiors and open spaces crafted for contemporary luxury living."
        />
      </Reveal>
      <div className="pc-gallery-grid">
        {LIFESTYLE.map(function (g, i) {
          return (
            <Reveal key={g.src} delay={(i % 3) * 80}>
              <button type="button" className="pc-gallery-item" onClick={() => setIndex(i)} aria-label={`Open ${g.caption} in full view`}>
                <img src={g.src} alt={g.caption} loading="lazy" />
                <span className="pc-gallery-zoom"><i className="fa-solid fa-expand"></i></span>
                <span className="pc-gallery-caption">{g.caption}</span>
              </button>
            </Reveal>
          )
        })}
      </div>
      <Lightbox items={LIFESTYLE} index={index} setIndex={setIndex} />
    </section>
  )
}

function ClubRishita() {
  const [showAll, setShowAll] = useState(false)
  return (
    <section className="pc-section pc-band sn-club" id="club">
      <Reveal>
        <SectionHead
          light
          eyebrow="Club Rishita"
          title="Club Rishita"
          lead="A premium pedestal of convenience, affluence and everyday indulgence — recreation, wellness and entertainment for the entire family."
        />
      </Reveal>
      <Reveal>
        <div className="sn-club-split">
          <div className="sn-club-media">
            <img src={A('club.jpg')} alt="Club Rishita — clubhouse experience" loading="lazy" />
            <span className="sn-club-media-tag"><i className="fa-solid fa-champagne-glasses"></i> The Heart of the Community</span>
          </div>
          <div className="sn-club-detail">
            <span className="pc-eyebrow">Inside the gates</span>
            <h3 className="pc-title pc-title-light">Everything Under One Clubhouse</h3>
            <p className="pc-lead pc-lead-light">
              From fine dining and banquets to wellness, fitness and recreation, Club Rishita brings an
              elevated lifestyle moments from your doorstep — designed for residents of all ages.
            </p>
          </div>
        </div>
      </Reveal>
      <div className="sn-club-grid">
        {CLUB_MAIN.map(function (item, i) {
          return (
            <Reveal key={item.label} delay={(i % 4) * 60}>
              <div className="sn-club-item">
                <span className="sn-club-icon"><i className={item.icon}></i></span>
                <span className="sn-club-label">{item.label}</span>
              </div>
            </Reveal>
          )
        })}
      </div>
      <div className={'sn-club-more' + (showAll ? ' is-open' : '')} aria-hidden={!showAll}>
        <div className="sn-club-more-inner">
          <div className="sn-club-grid">
            {CLUB_MORE.map(function (item, i) {
              return (
                <Reveal key={item.label} delay={(i % 4) * 60}>
                  <div className="sn-club-item">
                    <span className="sn-club-icon"><i className={item.icon}></i></span>
                    <span className="sn-club-label">{item.label}</span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="sn-club-toggle"
        onClick={function () {
          setShowAll(!showAll)
        }}
        aria-expanded={showAll}
      >
        <span>{showAll ? 'Show Less' : 'View All Amenities'}</span>
        <i className={'fa-solid ' + (showAll ? 'fa-chevron-up' : 'fa-chevron-down')}></i>
      </button>
    </section>
  )
}

function Amenities() {
  const [showAll, setShowAll] = useState(false)
  return (
    <section className="pc-section sn-amen" id="amenities">
      <Reveal>
        <SectionHead
          eyebrow="Project Amenities"
          title="Amenities That Enrich Everyday Life"
          lead="Gated premium living in Sushant Golf City with thoughtfully planned comforts and conveniences."
        />
      </Reveal>
      <Reveal>
        <div className="sn-amen-banner">
          <img src={A('amenities.jpg')} alt="A world of amenities at Rishita Serenity" loading="lazy" />
          <div className="sn-amen-banner-overlay"></div>
          <span className="sn-amen-banner-tag">A World of Amenities</span>
        </div>
      </Reveal>
      <div className="sn-amen-grid">
        {AMEN_MAIN.map(function (item, i) {
          return (
            <Reveal key={item.label} delay={(i % 4) * 60}>
              <div className="sn-amen-item">
                <span className="sn-amen-icon"><i className={item.icon}></i></span>
                <span className="sn-amen-label">{item.label}</span>
              </div>
            </Reveal>
          )
        })}
      </div>
      <div className={'sn-amen-more' + (showAll ? ' is-open' : '')} aria-hidden={!showAll}>
        <div className="sn-amen-more-inner">
          <div className="sn-amen-grid">
            {AMEN_MORE.map(function (item, i) {
              return (
                <Reveal key={item.label} delay={(i % 4) * 60}>
                  <div className="sn-amen-item">
                    <span className="sn-amen-icon"><i className={item.icon}></i></span>
                    <span className="sn-amen-label">{item.label}</span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="sn-amen-toggle"
        onClick={function () {
          setShowAll(!showAll)
        }}
        aria-expanded={showAll}
      >
        <span>{showAll ? 'Show Less' : 'View All Amenities'}</span>
        <i className={'fa-solid ' + (showAll ? 'fa-chevron-up' : 'fa-chevron-down')}></i>
      </button>
    </section>
  )
}

function Specifications() {
  return (
    <section className="pc-section pc-ivory sn-specs" id="specifications">
      <Reveal>
        <SectionHead
          eyebrow="Specifications"
          title="Meticulous Craftsmanship, Premium Finishes"
          lead="Thoughtfully specified to deliver quality, durability and a refined finish across every residence."
        />
      </Reveal>
      <div className="sn-spec-grid">
        {SPECS.map(function (spec, i) {
          return (
            <Reveal key={spec.title} delay={(i % 2) * 70}>
              <div className={'sn-spec-card' + (spec.title === 'Special Features' ? ' sn-spec-card--wide' : '')}>
                <span className="sn-spec-num">{String(i + 1).padStart(2, '0')}</span>
                <h4>{spec.title}</h4>
                <ul>
                  {spec.items.map(function (item) {
                    return (
                      <li key={item}>
                        <i className="fa-solid fa-check"></i>
                        <span>{item}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function FloorPlans() {
  const [index, setIndex] = useState(null)
  const items = [CLUSTER].concat(
    PLANS.map(function (f) {
      return { src: f.img, caption: `${f.label} — Tower A1 & A2` }
    })
  )

  return (
    <section className="pc-section pc-plans" id="floor-plans">
      <Reveal>
        <SectionHead
          eyebrow="Floor Plans"
          title="Choose the Space You Love"
          lead="Select residences across Tower A1 & A2 — each with premium finishes and expansive, well-planned layouts."
        />
      </Reveal>
      <div className="pc-plans-grid sn-plans-grid">
        <Reveal className="sn-cluster-cell">
          <div className="pc-plan-card sn-cluster-card">
            <div className="pc-plan-media">
              <img src={CLUSTER.img} alt={CLUSTER.caption} loading="lazy" />
              <div className="pc-plan-shade" aria-hidden="true"></div>
              <span className="pc-plan-badge">{CLUSTER.type}</span>
            </div>
            <div className="pc-plan-body">
              <span className="pc-plan-name">Tower A1 &amp; A2</span>
              <h4>{CLUSTER.label}</h4>
              <p>Typical cluster of the residences — view in full detail on click.</p>
              <button type="button" className="pc-plan-btn" onClick={() => setIndex(0)}>
                <i className="fa-solid fa-expand"></i> View Cluster Plan
              </button>
            </div>
          </div>
        </Reveal>
        {PLANS.map(function (f, i) {
          return (
            <Reveal key={`${f.type}-${f.label}`} delay={(i % 2) * 80}>
              <div className="pc-plan-card">
                <div className="pc-plan-media">
                  <img src={f.img} alt={`${f.label} floor plan — Tower A1 & A2`} loading="lazy" />
                  <div className="pc-plan-shade" aria-hidden="true"></div>
                  <span className="pc-plan-badge">{f.type}</span>
                </div>
                <div className="pc-plan-body">
                  <span className="pc-plan-name">Tower A1 &amp; A2</span>
                  <h4>{f.label}</h4>
                  <p>
                    {f.lines[0]}
                    <br />
                    {f.lines[1]}
                  </p>
                  <button type="button" className="pc-plan-btn" onClick={() => setIndex(i + 1)}>
                    <i className="fa-solid fa-expand"></i> View Floor Plan
                  </button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Reveal>
        <p className="pc-location-note">
          <i className="fa-solid fa-circle-info"></i>
          Carpet, balcony and built-up areas as per the official brochure. Floor plan images are indicative for reference.
        </p>
      </Reveal>
      <Lightbox items={items} index={index} setIndex={setIndex} />
    </section>
  )
}

function Location() {
  return (
    <section className="pc-section pc-location sn-location" id="location">
      <Reveal>
        <SectionHead
          eyebrow="Location Advantages"
          title="Everything Within Reach"
          lead="From Rishita Serenity, Sushant Golf City, Lucknow — everything you need is just minutes away."
        />
      </Reveal>
      <div className="pc-location-grid">
        {LOCATIONS.map(function (l, i) {
          return (
            <Reveal key={l.place} delay={i * 60}>
              <div className="pc-location-card">
                <span className="pc-location-icon"><i className={l.icon}></i></span>
                <div className="pc-location-body">
                  <span className="pc-location-time">{l.time}</span>
                  <strong className="pc-location-place">{l.place}</strong>
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

function Downloads() {
  return (
    <section className="pc-section pc-downloads">
      <Reveal>
        <div className="pc-download-band">
          <div className="pc-download-accent" aria-hidden="true"></div>
          <div className="pc-download-text">
            <span className="pc-eyebrow">Get the complete details</span>
            <h3 className="pc-title">Serenity, in full detail</h3>
            <p>Download the official brochure to explore layouts, floor plans, specifications, amenities and more at your own pace.</p>
          </div>
          <div className="pc-download-actions">
            <a className="pc-dl-btn pc-dl-light" href={PDF_BROCHURE} target="_blank" rel="noreferrer">
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
    <section className="pc-section pc-band sn-final" id="get-in-touch">
      <Reveal>
        <SectionHead
          light
          eyebrow="Begin Your Journey"
          title="Make Serenity Your New Address"
          lead="Book a private site visit or send an enquiry — our team will guide you through residences, floor plans and the Serenity lifestyle."
        />
      </Reveal>
      <Reveal>
        <div className="sn-final-cta">
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

function SerenityDetails() {
  return (
    <div className="container pc-details">
      <About />
      <Overview />
      <Highlights />
      <Lifestyle />
      <ClubRishita />
      <Amenities />
      <Specifications />
      <FloorPlans />
      <Location />
      <Downloads />
      <Final />
    </div>
  )
}

export default SerenityDetails