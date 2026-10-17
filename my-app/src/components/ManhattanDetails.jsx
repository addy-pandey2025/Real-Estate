import { useEffect, useRef, useState } from 'react'
import EnquirySidebar from './EnquirySidebar'

const A = (file) => `/assets/Manhattan images/${file}`

const IMG = {
  intro: A('Screenshot 2026-09-04 213053_hero.png'),
  masterPlan: A('Master-Plan.jpg'),
  planView: A('Screenshot 2026-09-04 213007.png'),
}

const PLAN_ITEMS = [
  { src: A('Master-Plan.jpg'), label: 'Master Plan' },
  { src: A('Cluster-Plan-1.jpg'), label: 'Cluster Plan 1' },
  { src: A('Cluster-Plan-2.jpg'), label: 'Cluster Plan 2' },
  { src: A('Cluster-Tower-C1-C2-A.jpg'), label: 'Tower C1 & C2 — A' },
  { src: A('Cluster-Tower-C1-C2-B.jpg'), label: 'Tower C1 & C2 — B' },
]

const AMENITIES = [
  { title: 'Reception / Waiting', icon: 'fa-solid fa-bell-concierge', img: A('Amenity-Reception-Waiting.png'), desc: 'A comfortable and stylish space for guests awaiting events and gatherings.' },
  { title: 'Restaurant', icon: 'fa-solid fa-utensils', img: A('Amenity-Restaurant.png'), desc: 'Delicious dining and socializing on the ground floor of Club Rishita.' },
  { title: 'Indoor Theatre', icon: 'fa-solid fa-film', img: A('Amenity-Indoor-Theatre.png'), desc: 'Club Rishita Auditorium for movie screenings and entertainment events.' },
  { title: 'Banquet', icon: 'fa-solid fa-champagne-glasses', img: A('Amenity-Banquet.png'), desc: 'A spacious venue for weddings, corporate events and celebrations.' },
  { title: 'Gym', icon: 'fa-solid fa-dumbbell', img: A('Amenity-Gym.png'), desc: 'A state-of-the-art gym to stay active and energized every day.' },
  { title: 'Restaurant with Open Sitting', icon: 'fa-solid fa-umbrella-beach', img: A('Amenity-Open-Sitting.png'), desc: 'A refined dining experience with open seating and a lively ambience.' },
]

const AMENITY_CHIPS = [
  { label: 'Café', icon: 'fa-solid fa-mug-hot' },
  { label: 'TV Lounge', icon: 'fa-solid fa-tv' },
  { label: 'Lobby', icon: 'fa-solid fa-door-open' },
  { label: 'Kitchen', icon: 'fa-solid fa-kitchen-set' },
]

const FLOORS = [
  {
    key: 'basement',
    label: 'Basement',
    title: 'Indoor Theatre',
    desc: 'Club Rishita Auditorium is an ideal venue for movie screenings and entertainment events, offering a great atmosphere with top-notch audiovisual facilities.',
    items: ['Indoor Theatre'],
    img: A('Floor-Basement-Indoor-Theatre.png'),
    crop: false,
  },
  {
    key: 'ground',
    label: 'Ground Floor',
    title: 'Pool · Kids Pool · Restaurant',
    desc: 'Enjoy a variety of amenities on the Ground Floor featuring a refreshing Pool, a dedicated Kids Pool and a welcoming Reception/Waiting area. Indulge at the Restaurant, unwind at the Café or socialize in the Lobby.',
    items: ['Swimming Pool', 'Kids Pool', 'Reception / Waiting', 'Restaurant', 'Café / TV Lounge / Lobby'],
    img: A('Floor-Ground-Floor.png'),
    crop: false,
  },
  {
    key: 'first',
    label: 'First Floor',
    title: 'Banquet · Kitchen · Lobby',
    desc: 'Club Rishita Banquet offers a spacious venue for weddings, corporate events, birthdays and special occasions, with ample space and a versatile environment.',
    items: ['Banquet', 'Kitchen', 'Lobby'],
    img: A('Floor-First-Floor-Banquet.png'),
    crop: false,
  },
  {
    key: 'second',
    label: 'Second Floor',
    title: 'Gym · Yoga · Open Lobby',
    desc: 'A state-of-the-art Gym, a peaceful Yoga space and an open Lobby — ideal for staying active, unwinding and socializing.',
    items: ['Gym', 'Yoga', 'Open Lobby'],
    img: A('Floor-Second-Floor-Gym.png'),
    crop: false,
  },
  {
    key: 'third',
    label: 'Third Floor',
    title: 'Restaurant with Open Sitting',
    desc: 'A dynamic restaurant blending delicious dining and lively ambiance, with a diverse menu, drinks selection and open sitting.',
    items: ['Restaurant with Open Sitting'],
    img: A('Floor-Third-Floor-Restaurant.png'),
    crop: false,
  },
]

const HIGHLIGHTS = [
  { icon: 'fa-solid fa-file-signature', value: 1000, suffix: '+', label: 'Registries Done', sub: 'Across delivered & ongoing phases' },
  { icon: 'fa-solid fa-building', text: '3 & 4 BHK', label: 'Premium Residences' },
  { icon: 'fa-solid fa-key', text: 'Selected Towers', label: 'Possession Started' },
  { icon: 'fa-solid fa-location-dot', text: 'Sector 131', label: 'Lucknow' },
  { icon: 'fa-solid fa-shield-halved', text: 'RERA', label: 'Registered Project' },
  { icon: 'fa-solid fa-award', text: 'Premium', label: 'Luxury Lifestyle' },
]

const CONFIGS = [
  { name: '3 BHK + Servant + Store', type: 'Type A', carpet: 1220, balcony: 178, builtup: 1534 },
  { name: '3 BHK + Servant', type: 'Type B', carpet: 1161, balcony: 178, builtup: 1446 },
  { name: '4 BHK + Servant', type: 'Type A', carpet: 1557, balcony: 334, builtup: 2048 },
  { name: '4 BHK + Servant', type: 'Type B', carpet: 1626, balcony: 469, builtup: 2243 },
]

const PLANS = [
  { type: '3 BHK', name: '3 BHK + Servant + Store', kind: 'Type A', carpet: 1220, balcony: 178, builtup: 1534, img: A('Screenshot 2026-09-04 213113.png') },
  { type: '3 BHK', name: '3 BHK + Servant', kind: 'Type B', carpet: 1161, balcony: 178, builtup: 1446, img: A('Screenshot 2026-09-04 213159.png') },
  { type: '4 BHK', name: '4 BHK + Servant', kind: 'Type A', carpet: 1557, balcony: 334, builtup: 2048, img: A('Screenshot 2026-09-04 213318.png') },
  { type: '4 BHK', name: '4 BHK + Servant', kind: 'Type B', carpet: 1626, balcony: 469, builtup: 2243, img: A('Screenshot 2026-09-04 213131.png') },
]

const SPECS = [
  { icon: 'fa-solid fa-layer-group', title: 'Flooring', items: ['Vitrified Tiles in living & bedrooms', 'Anti-Skid Ceramic Tiles in toilets & kitchen', 'Granite / Marble Stone / Vitrified Tiles in common areas', 'Marble Steps / Kota Stone in staircases'] },
  { icon: 'fa-solid fa-brush', title: 'Wall Finishes', items: ['Plastic Emulsion Paint on internal walls', '2 ft ceramic dado above counter in kitchen', 'Ceramic tiles up to door height in toilets', 'Exterior grade paint on external walls', 'Granite wall cladding in lobby'] },
  { icon: 'fa-solid fa-kitchen-set', title: 'Kitchen', items: ['Polished granite counter top', '2 ft ceramic dado above counter', 'S.S. sink with hot & cold water point and sink mixer'] },
  { icon: 'fa-solid fa-toilet', title: 'Toilets', items: ['Anti-Skid Ceramic Tiles', 'False ceiling with high quality fibre cement board', 'Italian marble counter in master toilet', 'Polished granite counter top in other toilets', 'Single lever CP fittings for hot & cold water', 'Exhaust fan point, towel rail, toilet paper holder, coat hook & soap dish', 'Wash basin, EWC, health faucet of premium brand, geyser & looking mirror'] },
  { icon: 'fa-solid fa-door-open', title: 'Doors', items: ['Teak wood finish modular door with seasonal hard wood frame', 'Modular doors with seasonal hard wood frames'] },
  { icon: 'fa-solid fa-window-maximize', title: 'Windows', items: ['UPVC with clear glass'] },
  { icon: 'fa-solid fa-building', title: 'Lifts', items: ['High speed elevator of premium brand'] },
  { icon: 'fa-solid fa-people-roof', title: 'Common Areas', items: ['Granite / marble stone / vitrified tiles flooring', 'Plastic emulsion paint / granite wall cladding', 'Marble steps / kota stone', 'MS railing with synthetic enamel paint', '1200mm high MS railing with synthetic emulsion paint on balconies'] },
  { icon: 'fa-solid fa-bolt', title: 'Electrical', items: ['Modular switches of premium brand'] },
  { icon: 'fa-solid fa-faucet-drip', title: 'Plumbing', items: ['CPVC & PVC fittings for water points (hot & cold)'] },
  { icon: 'fa-solid fa-fire-extinguisher', title: 'Fire Safety', items: ['Fire sprinklers & smoke detectors as per NBC'] },
  { icon: 'fa-solid fa-gem', title: 'Other Features', items: ['RERA registered project', 'Refined design across private and shared spaces'] },
]

const CLUB_TAGS = [
  { label: 'Swimming Pool', icon: 'fa-solid fa-water-ladder', spot: 'pool' },
  { label: 'Banquet', icon: 'fa-solid fa-champagne-glasses', spot: 'banquet' },
  { label: 'Indoor Theatre', icon: 'fa-solid fa-film', spot: 'theatre' },
  { label: 'Gym & Yoga', icon: 'fa-solid fa-dumbbell', spot: 'gym' },
  { label: 'Fine Dining', icon: 'fa-solid fa-utensils', spot: 'dining' },
]

const CLUB_SPOT = {
  theatre: { title: 'Indoor Theatre', src: A('Amenity-Indoor-Theatre.png') },
  pool: { title: 'Swimming Pool', src: A('Amenity-Swimming-Pool.png') },
  banquet: { title: 'Banquet Hall', src: A('Amenity-Banquet.png') },
  gym: { title: 'Gym & Yoga', src: A('Amenity-Gym.png') },
  dining: { title: 'Restaurant with Open Sitting', src: A('Amenity-Open-Sitting.png') },
}

const CLUB_SPOT_KEYS = ['theatre', 'pool', 'banquet', 'gym', 'dining']

const CLUB_HIGHLIGHTS = ['Multi-Level Lifestyle', 'Indoor Theatre', 'Fitness & Wellness', 'Dining & Celebrations']

const CLUB_FACILITY_TARGETS = {
  'Café': 'Café & TV Lounge',
  'TV Lounge': 'Café & TV Lounge',
  'Lobby': 'Reception / Waiting',
  'Kitchen': 'Banquet',
}

const CLUB_LIGHTBOX = [
  { title: 'Indoor Theatre', src: A('Amenity-Indoor-Theatre.png') },
  { title: 'Banquet Hall', src: A('Amenity-Banquet.png') },
  { title: 'Swimming Pool', src: A('Amenity-Swimming-Pool.png') },
  { title: 'Gym', src: A('Amenity-Gym.png') },
  { title: 'Restaurant with Open Sitting', src: A('Amenity-Open-Sitting.png') },
  { title: 'Yoga Space', src: A('Amenity-Yoga.png') },
  { title: 'Outdoor Gym', src: A('Amenity-Outdoor-Gym.png') },
]

const PRICES = [
  { conf: '3 BHK Luxury', range: '₹1.31 Cr – ₹1.70 Cr*', icon: 'fa-solid fa-bed' },
  { conf: '4 BHK Luxury', range: '₹1.85 Cr – ₹2.21 Cr*', icon: 'fa-solid fa-couch' },
]

const PDF_BROCHURE = '/assets/Manhattan%20images/Manhattan%20Brochure_26FEB.pdf'
const PDF_PRICELIST = '/assets/Manhattan%20images/MANHATTAN%20PRICELIST.pdf'

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

function useCountUp(target, run) {
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [value, setValue] = useState(() => (reduceMotion ? target : 0))

  useEffect(() => {
    if (!run || reduceMotion) return
    let raf
    const start = performance.now()
    const duration = 1600
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, reduceMotion])

  return value
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, seen] = useInView()
  return (
    <div
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`md-reveal ${seen ? 'in-view' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="md-head">
      {eyebrow && <span className="md-eyebrow">{eyebrow}</span>}
      <h3 className="md-title">{title}</h3>
      {lead && <p className="md-lead">{lead}</p>}
    </div>
  )
}

function Lightbox({ items, index, setIndex, className = '' }) {
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
      className={`md-lightbox lightbox active ${className}`.trim()}
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
      <img src={current.src} alt={current.caption || current.title || 'Manhattan'} />
      <span
        className="next-btn"
        onClick={(e) => {
          e.stopPropagation()
          setIndex((i) => (i + 1) % items.length)
        }}
      >
        &#10095;
      </span>
      <div className="md-lightbox-meta">
        <span>{current.caption || current.title || ''}</span>
        {items.length > 1 && (
          <span className="md-lightbox-count">
            {index + 1} / {items.length}
          </span>
        )}
      </div>
    </div>
  )
}

function PlanViewer({ open, onClose }) {
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
      if (e.key === 'ArrowLeft') setActive(function (i) { return (i - 1 + PLAN_ITEMS.length) % PLAN_ITEMS.length })
      if (e.key === 'ArrowRight') setActive(function (i) { return (i + 1) % PLAN_ITEMS.length })
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function clampZoom(z) {
    return Math.min(300, Math.max(100, z))
  }

  function handleWheel(e) {
    e.preventDefault()
    setZoom(function (z) { return clampZoom(z + (e.deltaY > 0 ? -15 : 15)) })
  }

  function handlePointerDown(e) {
    if (zoom <= 100) return
    e.preventDefault()
    setDragging(true)
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y }
  }

  function handlePointerMove(e) {
    if (!dragging) return
    var d = dragRef.current
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
    setZoom(function (z) { return clampZoom(z + delta) })
  }

  function switchImage(newIdx) {
    setActive(newIdx)
    resetView()
  }

  if (!open) return null

  var item = PLAN_ITEMS[active]
  var scale = zoom / 100

  return (
    <div className="md-pv" onClick={function (e) { if (e.target === e.currentTarget) onClose() }}>
      <div className="md-pv-header">
        <div className="md-pv-header-line" aria-hidden="true"></div>
        <h3 className="md-pv-title">Master &amp; Cluster Plan</h3>
        <div className="md-pv-header-line" aria-hidden="true"></div>
      </div>

      <button type="button" className="md-pv-close" onClick={onClose} aria-label="Close plan viewer">
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="md-pv-thumbs">
        {PLAN_ITEMS.map(function (p, i) {
          return (
            <button
              key={i}
              type="button"
              className={'md-pv-thumb' + (i === active ? ' active' : '')}
              onClick={function () { switchImage(i) }}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      <div
        className="md-pv-stage"
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
          draggable={false}
        />
      </div>

      <div className="md-pv-controls">
        <button type="button" onClick={function () { changeZoom(-25) }} disabled={zoom <= 100} aria-label="Zoom out">
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className="md-pv-zoom-val">{zoom}%</span>
        <button type="button" onClick={function () { changeZoom(25) }} disabled={zoom >= 300} aria-label="Zoom in">
          <i className="fa-solid fa-plus"></i>
        </button>
        <button type="button" className="md-pv-reset" onClick={resetView}>Reset</button>
      </div>

      <button type="button" className="md-pv-arrow md-pv-prev" onClick={function () { switchImage((active - 1 + PLAN_ITEMS.length) % PLAN_ITEMS.length) }} aria-label="Previous plan">
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button type="button" className="md-pv-arrow md-pv-next" onClick={function () { switchImage((active + 1) % PLAN_ITEMS.length) }} aria-label="Next plan">
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  )
}

function ProjectIntro() {
  const [ref, seen] = useInView(0.18)

  return (
    <section ref={ref} className={`md-section md-intro ${seen ? 'in-view' : ''}`} id="about">
      <div className="md-intro-grid">
        <div className="md-intro-text">
          <span className="md-eyebrow md-s1">The Manhattan Experience</span>
          <h2 className="md-title md-s2">Designed for a Life Above Ordinary</h2>
          <p className="md-lead md-s3">
            MANHATTAN is a premium residential complex by Rishita Developers, located in Sector 131,
            Lucknow. Offering spacious 3 &amp; 4 BHK residences with modern amenities, it is designed for
            those seeking a sophisticated urban lifestyle — set close to the city&rsquo;s most promising
            growth corridors.
          </p>
          <ul className="md-intro-list">
            <li className="md-s4"><i className="fa-solid fa-bed"></i><span>Spacious 3 &amp; 4 BHK residences</span></li>
            <li className="md-s5"><i className="fa-solid fa-building-shield"></i><span>Club Rishita &middot; multi-level lifestyle amenities</span></li>
            <li className="md-s6"><i className="fa-solid fa-file-signature"></i><span>1000+ registries already completed</span></li>
            <li className="md-s7"><i className="fa-solid fa-key"></i><span>Possession started for selected towers</span></li>
          </ul>
        </div>
        <div className="md-intro-media md-s8">
          <div className="md-intro-frame">
            <img src={IMG.intro} alt="Manhattan residences" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section className="md-section md-highlights">
      <Reveal>
        <SectionHead eyebrow="Key Highlights" title="A Development Built on Trust" lead="Every detail of Manhattan is backed by a track record that speaks for itself." />
      </Reveal>
      <div className="md-highlights-grid">
        {HIGHLIGHTS.map(function (item, i) {
          return (
            <Reveal key={i} delay={i * 80}>
              <StatCard item={item} />
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function StatCard({ item }) {
  const [ref, seen] = useInView(0.3)
  const count = useCountUp(item.value || 0, seen && Boolean(item.value))

  return (
    <div ref={ref} className={`md-stat ${seen ? 'in-view' : ''}`}>
      <div className="md-stat-icon"><i className={item.icon}></i></div>
      {item.value ? (
        <div className="md-stat-value">{count.toLocaleString('en-IN')}{item.suffix}</div>
      ) : (
        <div className="md-stat-value">{item.text}</div>
      )}
      <div className="md-stat-label">{item.label}</div>
      {item.sub && <div className="md-stat-sub">{item.sub}</div>}
    </div>
  )
}

function Amenities() {
  const [ref, seen] = useInView(0.1)
  const [lightbox, setLightbox] = useState(null)

  return (
    <section ref={ref} className={`md-section md-band md-amenities ${seen ? 'in-view' : ''}`}>
      <div className="md-head">
        <span className={`md-eyebrow md-s1 ${seen ? 'in-view' : ''}`}>Project Amenities</span>
        <h3 className={`md-title md-s2 ${seen ? 'in-view' : ''}`}>A Lifestyle Curated Around You</h3>
        <p className={`md-lead md-s3 ${seen ? 'in-view' : ''}`}>
          From leisure and wellness to dining and celebrations, Club Rishita brings luxury amenities to every floor of daily life.
        </p>
      </div>
      <div className="md-amenities-grid">
        {AMENITIES.map(function (a, i) {
          return (
            <Reveal key={a.title} delay={i * 80}>
              <div className="md-amenity-card" onClick={() => setLightbox(i)}>
                <div className="md-amenity-media">
                  <img src={a.img} alt={a.title} loading="lazy" />
                  <span className="md-amenity-icon"><i className={a.icon}></i></span>
                  <span className="md-amenity-zoom"><i className="fa-solid fa-expand"></i></span>
                </div>
                <div className="md-amenity-body">
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Lightbox items={AMENITIES.map((a) => ({ title: a.title, src: a.img }))} index={lightbox} setIndex={setLightbox} />
    </section>
  )
}

function ClubRishita() {
  const [ref, seen] = useInView(0.12)
  const [spot, setSpot] = useState('theatre')
  const [facility, setFacility] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  function scrollToCard(label) {
    const title = CLUB_FACILITY_TARGETS[label]
    const cards = Array.from(document.querySelectorAll('.md-amenity-card'))
    const card = cards.find(function (c) {
      const h = c.querySelector('h4')
      return h && h.textContent === title
    })
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', block: 'center' })
    card.classList.remove('md-spot-pulse')
    void card.offsetWidth
    card.classList.add('md-spot-pulse')
    setTimeout(function () { card.classList.remove('md-spot-pulse') }, 1600)
  }

  function spotlightIndex() {
    return CLUB_LIGHTBOX.findIndex(function (l) {
      return l.title === CLUB_SPOT[spot].title
    })
  }

  return (
    <section ref={ref} className={`md-section md-club ${seen ? 'in-view' : ''}`}>
      <div className={`md-club-facilities md-s1 ${seen ? 'in-view' : ''}`}>
        <span className="md-club-fac-label">Club Facilities</span>
        <div className="md-club-fac-list">
          {AMENITY_CHIPS.map(function (c) {
            return (
              <button
                key={c.label}
                type="button"
                aria-pressed={c.label === facility}
                className={c.label === facility ? 'active' : ''}
                onClick={function () { setFacility(c.label); scrollToCard(c.label) }}
              >
                <i className={c.icon}></i>{c.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="md-club-grid">
        <div className={`md-club-media ${seen ? 'in-view' : ''}`}>
          <button
            type="button"
            className="md-club-main"
            aria-label={`Open ${CLUB_SPOT[spot].title} in full view`}
            onClick={function () { setLightbox(spotlightIndex()) }}
          >
            {CLUB_SPOT_KEYS.map(function (k) {
              return (
                <img
                  key={k}
                  className={k === spot ? 'active' : ''}
                  src={CLUB_SPOT[k].src}
                  alt={k === spot ? `${CLUB_SPOT[k].title} — Club Rishita` : ''}
                  aria-hidden={k !== spot}
                  loading="lazy"
                />
              )
            })}
            <span className="md-club-zoom"><i className="fa-solid fa-expand"></i></span>
          </button>
        </div>

        <div className="md-club-text">
          <span className={`md-eyebrow md-s2 ${seen ? 'in-view' : ''}`}>Club Rishita</span>
          <h2 className={`md-title md-s3 ${seen ? 'in-view' : ''}`}>Experience the Rhythm of Rishita!</h2>
          <p className={`md-lead md-s4 ${seen ? 'in-view' : ''}`}>
            Club Rishita is the social heart of Manhattan — a private lifestyle destination spread across
            multiple floors, with a grand lobby, banquet venues, an indoor auditorium, a premium gym,
            yoga spaces and restaurants that keep the day moving from sunrise to celebration.
          </p>
          <div className="md-club-tags">
            {CLUB_TAGS.map(function (t, i) {
              return (
                <button
                  key={t.label}
                  type="button"
                  aria-pressed={spot === t.spot}
                  className={spot === t.spot ? 'active' : ''}
                  style={{ animationDelay: (170 + i * 90) + 'ms' }}
                  onClick={function () { setSpot(t.spot) }}
                >
                  <i className={t.icon}></i>{t.label}
                </button>
              )
            })}
          </div>
          <div className="md-club-highlights">
            <span className="md-club-hl-label">Club Highlights</span>
            <ul>
              {CLUB_HIGHLIGHTS.map(function (h, i) {
                return <li key={h}><span className="md-club-hl-num">0{i + 1}</span>{h}</li>
              })}
            </ul>
          </div>
        </div>
      </div>

      <Lightbox items={CLUB_LIGHTBOX} index={lightbox} setIndex={setLightbox} />
    </section>
  )
}

function FloorAmenities() {
  const [active, setActive] = useState(FLOORS[0].key)
  const floor = FLOORS.find(function (f) { return f.key === active })

  return (
    <section className="md-section md-floors">
      <Reveal>
        <SectionHead
          eyebrow="Amenities by Floor"
          title="Club Rishita, Level by Level"
          lead="Explore how the club is arranged — each floor dedicated to a distinct part of the lifestyle experience."
        />
      </Reveal>
      <Reveal>
        <div className="md-floor-tabs" role="tablist">
          {FLOORS.map(function (f) {
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={f.key === active}
                className={f.key === active ? 'active' : ''}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </Reveal>
      <Reveal>
        <div className="md-floor-panel" key={floor.key}>
          <div className="md-floor-media">
            <img src={floor.img} alt={floor.title} loading="lazy" className={floor.crop ? 'md-crop fixed' : ''} />
          </div>
          <div className="md-floor-info">
            <h4>{floor.title}</h4>
            <p>{floor.desc}</p>
            <div className="md-floor-chips">
              {floor.items.map(function (item) {
                return <span key={item} className="md-chip"><i className="fa-solid fa-circle-check"></i>{item}</span>
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function MasterPlan() {
  const [viewerOpen, setViewerOpen] = useState(false)

  return (
    <section className="md-section md-master">
      <Reveal>
        <SectionHead
          eyebrow="Planning"
          title="Master & Cluster Plan"
          lead="Thoughtfully planned phases and tower clusters set within a network of 24m wide roads with dedicated entry and exit points."
        />
      </Reveal>
      <Reveal>
        <div className="md-master-card">
          <div className="md-master-card-glow" aria-hidden="true"></div>
          <div className="md-master-grid">
            <div className="md-master-left" onClick={() => setViewerOpen(true)}>
              <img src={IMG.masterPlan} alt="Manhattan master and cluster plan" loading="lazy" />
              <div className="md-master-overlay" aria-hidden="true"></div>
              <button type="button" className="md-master-btn" tabIndex="-1" aria-hidden="true">
                <i className="fa-solid fa-magnifying-glass-plus"></i>
                <span>Click to view full plan</span>
              </button>
            </div>
            <div className="md-master-right">
              <div className="md-master-visual">
                <img src={IMG.planView} alt="Manhattan architectural layout" loading="lazy" />
              </div>
              <div className="md-master-info">
                <h4 className="md-master-info-title">Thoughtful Urban Planning</h4>
                <p className="md-master-info-text">
                  Every tower cluster is positioned to maximise natural light, ventilation and privacy. Wide internal roads, landscaped corridors and dedicated entry-exit points create an organised, low-density living environment.
                </p>
                <div className="md-master-specs">
                  <div className="md-master-spec">
                    <span className="md-master-spec-value">24m</span>
                    <span className="md-master-spec-label">Wide Internal Roads</span>
                  </div>
                  <div className="md-master-spec">
                    <span className="md-master-spec-value">Dedicated</span>
                    <span className="md-master-spec-label">Entry &amp; Exit Points</span>
                  </div>
                  <div className="md-master-spec">
                    <span className="md-master-spec-value">Cluster</span>
                    <span className="md-master-spec-label">Based Tower Layout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <PlanViewer open={viewerOpen} onClose={() => setViewerOpen(false)} />
    </section>
  )
}

function Configurations() {
  return (
    <section className="md-section md-configs">
      <Reveal>
        <SectionHead
          eyebrow="Apartment Configurations"
          title="Residences Designed Around You"
          lead="Generous room sizes and private balconies, planned for how you actually live."
        />
      </Reveal>
      <div className="md-configs-grid">
        {CONFIGS.map(function (c, i) {
          return (
            <Reveal key={`${c.name}-${c.type}`} delay={i * 70}>
              <div className="md-config-card" tabIndex="0">
                <div className="md-config-card-inner">
                  <div className="md-config-head">
                    <div>
                      <span className="md-config-type">{c.type}</span>
                      <h4 className="md-config-name">{c.name}</h4>
                    </div>
                    <span className="md-config-badge">{c.carpet} sq.ft.</span>
                  </div>
                  <div className="md-config-rows">
                    <div className="md-config-row"><span>Carpet Area</span><strong>{c.carpet} sq.ft.</strong></div>
                    <div className="md-config-row"><span>Balcony</span><strong>{c.balcony} sq.ft.</strong></div>
                    <div className="md-config-row"><span>Built-Up Area</span><strong>{c.builtup} sq.ft.</strong></div>
                  </div>
                  <a className="md-config-link" href="#floorplans">
                    View Floor Plan <i className="fa-solid fa-arrow-down"></i>
                  </a>
                </div>
                <div className="md-config-sweep" aria-hidden="true"></div>
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
  const items = PLANS.map(function (p) {
    return { src: p.img, title: `${p.type} ${p.name} · ${p.kind}`, areas: `${p.carpet} sq.ft. carpet · ${p.builtup} sq.ft. built-up` }
  })

  return (
    <section className="md-section md-band md-plans" id="floorplans">
      <Reveal>
        <SectionHead
          eyebrow="Floor Plans"
          title="Choose the Layout You Love"
          lead="Open the plan for a full-screen look at each configuration."
        />
      </Reveal>
      <div className="md-plans-grid">
        {PLANS.map(function (p, i) {
          return (
            <Reveal key={`${p.name}-${p.kind}`} delay={i * 70}>
              <div className="md-plan-card">
                <div className="md-plan-sweep" aria-hidden="true"></div>
                <div className="md-plan-media">
                  <img src={p.img} alt={`${p.name} ${p.kind} floor plan`} loading="lazy" className="md-crop" />
                  <div className="md-plan-media-shade" aria-hidden="true"></div>
                  <span className="md-plan-badge">{p.type}</span>
                </div>
                <div className="md-plan-body">
                  <span className="md-plan-kind">{p.kind}</span>
                  <h4>{p.name}</h4>
                  <p>{p.carpet} sq.ft. carpet &middot; {p.builtup} sq.ft. built-up</p>
                  <button type="button" className="md-plan-btn" onClick={() => setIndex(i)}>
                    <i className="fa-solid fa-expand"></i> View Plan
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

function Specifications() {
  return (
    <section className="md-section md-specs">
      <Reveal>
        <SectionHead
          eyebrow="Specifications & Features"
          title="Finishings You Can Feel"
          lead="Premium materials and thoughtful detailing across every residence and shared space."
        />
      </Reveal>
      <div className="md-specs-grid">
        {SPECS.map(function (s, i) {
          return (
            <Reveal key={s.title} delay={(i % 2) * 60}>
              <div className="md-spec-card">
                <div className="md-spec-sweep" aria-hidden="true"></div>
                <div className="md-spec-accent" aria-hidden="true"></div>
                <div className="md-spec-head">
                  <span className="md-spec-icon"><i className={s.icon}></i></span>
                  <h4>{s.title}</h4>
                </div>
                <div className="md-spec-divider" aria-hidden="true"></div>
                <ul>
                  {s.items.map(function (item) {
                    return <li key={item}><i className="fa-solid fa-check"></i><span>{item}</span></li>
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

function Prices() {
  return (
    <section className="md-section md-price">
      <Reveal>
        <SectionHead
          eyebrow="Price List"
          title="Invest in the Address"
          lead="Premium residences crafted for value, with transparent pricing."
        />
      </Reveal>
      <div className="md-price-glow" aria-hidden="true"></div>
      <div className="md-price-grid">
        {PRICES.map(function (p, i) {
          return (
            <Reveal key={p.conf} delay={i * 90}>
              <div className="md-price-card">
                <div className="md-price-sweep" aria-hidden="true"></div>
                <span className="md-price-icon"><i className={p.icon}></i></span>
                <h4>{p.conf}</h4>
                <div className="md-price-range">{p.range}</div>
              </div>
            </Reveal>
          )
        })}
      </div>
      <Reveal>
        <p className="md-price-note">
          *Prices are indicative and subject to change. Please contact us for the latest price list and offers.
        </p>
        <div className="md-price-note-actions">
          <a className="md-price-dl" href={PDF_PRICELIST} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-file-arrow-down"></i> Download the Price List
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function ProjectCta() {
  return (
    <>
      <section className="md-section md-downloads">
        <Reveal>
          <div className="md-download-band">
            <div className="md-download-glow" aria-hidden="true"></div>
            <div className="md-download-accent" aria-hidden="true"></div>
            <div className="md-download-text">
              <span className="md-eyebrow">Get the complete details</span>
              <h3 className="md-title">Manhattan, in full detail</h3>
              <p>Download the official brochure and price list to explore configurations, plans and specifications at your own pace.</p>
            </div>
            <div className="md-download-actions">
              <a className="md-dl-btn md-dl-light" href={PDF_BROCHURE} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-file-pdf"></i> Download Brochure
              </a>
              <a className="md-dl-btn md-dl-dark" href={PDF_PRICELIST} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-file-arrow-down"></i> Download Price List
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="md-section md-final">
        <Reveal>
          <div className="md-final-grid">
            <div className="md-final-text">
              <span className="md-eyebrow">Begin your journey</span>
              <h2 className="md-title">Make Manhattan Your Next Address</h2>
              <p>
                Book a private site visit or send an enquiry — our team will guide you through
                residences, pricing and possession timelines.
              </p>
              <ul className="md-final-points">
                <li><i className="fa-solid fa-check"></i> Premium 3 & 4 BHK Residences</li>
                <li><i className="fa-solid fa-check"></i> Sector 131, Lucknow</li>
                <li><i className="fa-solid fa-check"></i> Personalised Site Visit</li>
              </ul>
              <div className="md-final-buttons">
                <a className="md-btn md-btn-primary" href="#sidebarForm">
                  <i className="fa-solid fa-calendar-check"></i> Book a Site Visit
                </a>
                <a className="md-btn md-btn-outline" href="#sidebarForm">
                  <i className="fa-solid fa-paper-plane"></i> Enquire Now
                </a>
              </div>
            </div>
            <div className="md-final-form">
              <EnquirySidebar
                overview={[
                  { label: 'Location', value: 'Sector 131, Lucknow' },
                  { label: 'Type', value: '3 & 4 BHK Apartments' },
                  { label: 'Price', value: '₹1.31 Cr – ₹2.21 Cr*' },
                  { label: 'Status', value: 'Under Construction' },
                ]}
                dataProject="MANHATTAN, Sector 131 Lucknow"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}

function ManhattanDetails() {
  return (
    <div className="container md-details">
      <ProjectIntro />
      <Highlights />
      <Amenities />
      <ClubRishita />
      <FloorAmenities />
      <MasterPlan />
      <Configurations />
      <FloorPlans />
      <Specifications />
      <Prices />
      <ProjectCta />
    </div>
  )
}

export default ManhattanDetails