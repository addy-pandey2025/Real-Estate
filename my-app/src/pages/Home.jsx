import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLightPillar from '../hooks/useLightPillar'
import useProximityText from '../hooks/useProximityText'

const CAROUSEL_DATA = [
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213007.png', loc: 'Lucknow', name: 'MANHATTAN', config: '3 & 4 BHK', price: '1.31 Cr - 2.21 Cr', link: '/manhattan' },
  { img: '/assets/Nest images/Screenshot 2026-09-04 211939.png', loc: 'Lucknow', name: 'THE NEST', config: 'Plotted Development', price: '60,000 / Sq. Yd', link: '/nest' },
  { img: '/assets/Palm city images/Screenshot 2026-09-04 212319.png', loc: 'Lucknow', name: 'PALM CITY', config: 'RERA Approved Plots', price: 'Premium Plots', link: '/palm-city' },
  { img: '/assets/Serenity images/Screenshot 2026-09-04 214535.png', loc: 'Lucknow', name: 'SERENITY', config: '200 - 400 Sq. Yd', price: '2.10 Cr - 4.25 Cr', link: '/serenity' },
  { img: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.54.04 AM.jpeg', loc: 'Lucknow', name: 'SAHUCITY PHASE 2', config: 'Premium Residential', price: 'Available', link: '/sahucity' },
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213033.png', loc: 'Lucknow', name: 'MANHATTAN', config: '3 & 4 BHK', price: '1.31 Cr - 2.21 Cr', link: '/manhattan' },
]

const MEDIA_SLIDES = [
  { img: '/assets/Serenity images/Screenshot 2026-09-04 214518.png', alt: 'Serenity Project', anim: 'kb1' },
  { img: '/assets/Serenity images/Screenshot 2026-09-04 214648.png', alt: 'Serenity Project', anim: 'kb2' },
  { img: '/assets/Serenity images/Screenshot 2026-09-04 214535.png', alt: 'Serenity Project', anim: 'kb3' },
  { img: '/assets/Serenity images/Screenshot 2026-09-04 214909.png', alt: 'Serenity Project', anim: 'kb4' },
  { img: '/assets/Palm city images/Screenshot 2026-09-04 212434.png', alt: 'Palm City Project', anim: 'kb5' },
  { img: '/assets/Palm city images/Screenshot 2026-09-04 212425.png', alt: 'Palm City Project', anim: 'kb1' },
  { img: '/assets/Palm city images/Screenshot 2026-09-04 212443.png', alt: 'Palm City Project', anim: 'kb2' },
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213053.png', alt: 'Manhattan Project', anim: 'kb3' },
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213318.png', alt: 'Manhattan Project', anim: 'kb4' },
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213033.png', alt: 'Manhattan Project', anim: 'kb5' },
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213113.png', alt: 'Manhattan Project', anim: 'kb1' },
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213225.png', alt: 'Manhattan Project', anim: 'kb2' },
  { img: '/assets/Manhattan images/Screenshot 2026-09-04 213241.png', alt: 'Manhattan Project', anim: 'kb3' },
  { img: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.53.06 AM.jpeg', alt: 'Sahu City Project', anim: 'kb4' },
  { img: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.50.35 AM.jpeg', alt: 'Sahu City Project', anim: 'kb5' },
  { img: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.50.39 AM.jpeg', alt: 'Sahu City Project', anim: 'kb1' },
  { img: '/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.50.52 AM.jpeg', alt: 'Sahu City Project', anim: 'kb2' },
  { img: '/assets/Serenity images/Screenshot 2026-09-04 215209.png', alt: 'Serenity Project', anim: 'kb3' },
  { img: '/assets/Serenity images/Screenshot 2026-09-04 215110.png', alt: 'Serenity Project', anim: 'kb4' },
  { img: '/assets/Serenity images/Screenshot 2026-09-04 215340.png', alt: 'Serenity Project', anim: 'kb5' },
]

const LOCALITIES = [
  'Gomti Nagar',
  'Vrindavan Yojana',
  'Sushant Golf City',
  'Mohanlalganj',
  'Hazratganj',
  'Shaheed Path',
  'Faizabad Road',
  'Sultanpur Road',
  'Amar Shaheed Path',
]

function getPerView() {
  if (window.innerWidth <= 600) return 1
  if (window.innerWidth <= 900) return 2
  return 3
}

function Home() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const latestSectionRef = useRef(null)
  const localitiesRef = useRef(null)
  const mediaGalleryRef = useRef(null)
  const whyUsRef = useRef(null)

  const [location, setLocation] = useState('')
  const [searchText, setSearchText] = useState('')
  const [leftShow, setLeftShow] = useState(false)
  const [rightShow, setRightShow] = useState(true)

  const [activeTab, setActiveTab] = useState('deals')

  const [perView, setPerView] = useState(getPerView)
  const [current, setCurrent] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)

  const [mediaCurrent, setMediaCurrent] = useState(0)
  const [mediaPaused, setMediaPaused] = useState(false)
  const touchX = useRef(0)

  const slides = Math.max(1, Math.ceil(CAROUSEL_DATA.length / perView))

  useLightPillar(canvasRef, {
    topColor: '#f5a35c',
    bottomColor: '#cd7a63',
    intensity: 0.2,
    rotationSpeed: 0.3,
    glowAmount: 0.001,
    pillarWidth: 2.5,
    pillarHeight: 0.35,
    noiseIntensity: 0.14,
    pillarRotation: 25,
    quality: 'high',
  })
  useProximityText(latestSectionRef)

  function handleSearch() {
    const url = '/projects?loc=' + encodeURIComponent(location) + '&q=' + encodeURIComponent(searchText)
    navigate(url)
  }

  function onChipClick(locality) {
    const url = '/projects?loc=' + encodeURIComponent('Lucknow') + '&q=' + encodeURIComponent(locality)
    navigate(url)
  }

  function scrollLocalities(dir) {
    if (localitiesRef.current) {
      localitiesRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const wrapper = localitiesRef.current
    if (!wrapper) return undefined

    function updateArrows() {
      setLeftShow(wrapper.scrollLeft > 2)
      setRightShow(wrapper.scrollWidth > wrapper.clientWidth + 2)
    }

    updateArrows()
    wrapper.addEventListener('scroll', updateArrows)
    window.addEventListener('resize', updateArrows)
    return () => {
      wrapper.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      const pv = getPerView()
      setPerView(function (prev) {
        if (pv !== prev) {
          setCurrent(0)
          return pv
        }
        return prev
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (carouselPaused) return undefined
    const timer = setInterval(function () {
      setCurrent(function (c) {
        return (c + 1) % slides
      })
    }, 4000)
    return () => clearInterval(timer)
  }, [carouselPaused, slides, current])

  useEffect(() => {
    if (mediaPaused) return undefined
    const timer = setInterval(function () {
      setMediaCurrent(function (c) {
        return (c + 1) % MEDIA_SLIDES.length
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [mediaPaused, mediaCurrent])

  useEffect(() => {
    function onKey(e) {
      const container = mediaGalleryRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const visible = rect.top < window.innerHeight && rect.bottom > 0
      if (!visible) return
      if (e.key === 'ArrowLeft') {
        setMediaCurrent(function (c) {
          return (c - 1 + MEDIA_SLIDES.length) % MEDIA_SLIDES.length
        })
      }
      if (e.key === 'ArrowRight') {
        setMediaCurrent(function (c) {
          return (c + 1) % MEDIA_SLIDES.length
        })
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const cards = whyUsRef.current ? [...whyUsRef.current.querySelectorAll('.feature')] : []
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
      { threshold: 0.15 }
    )
    cards.forEach(function (card) {
      observer.observe(card)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="hero">
        <video className="hero-video" src="/assets/Manhattan images/manhattan.mp4" autoPlay muted loop playsInline></video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Luxury Residential &amp; Commercial Properties</h1>
          <p>Get Trusted Real Estate Advisory Services for Investors and End-Users.</p>

          <div className="search-box">
            <select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All Locations</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Sector 131">Lucknow - Sector 131</option>
              <option value="Sector 12">Lucknow - Sector 12</option>
              <option value="Sector 79">Lucknow - Sector 79</option>
              <option value="Sector 150">Lucknow - Sector 150</option>
            </select>
            <input
              type="text"
              id="searchText"
              placeholder="Search property or builders..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch()
              }}
            />
            <button type="button" id="searchBtn" onClick={handleSearch}>Search</button>
          </div>

          <div className="popular-localities">
            <div className="popular-localities-label">
              <i className="fa-solid fa-location-dot"></i>
              <span>Popular Localities</span>
            </div>
            <button
              className="popular-localities-arrow pl-arrow-left"
              aria-label="Scroll left"
              style={{ display: leftShow ? '' : 'none' }}
              onClick={() => scrollLocalities(-1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="popular-localities-scroll-wrapper" id="localitiesScroll" ref={localitiesRef}>
              <div className="popular-localities-track">
                {LOCALITIES.map(function (locality) {
                  return (
                    <button
                      type="button"
                      key={locality}
                      className="locality-chip"
                      data-location={locality}
                      onClick={() => onChipClick(locality)}
                    >
                      {locality} <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  )
                })}
              </div>
            </div>
            <button
              className="popular-localities-arrow pl-arrow-right"
              aria-label="Scroll right"
              style={{ display: rightShow ? '' : 'none' }}
              onClick={() => scrollLocalities(1)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      <div className="geo-bg-wrap">
        <canvas id="lightPillarCanvas" ref={canvasRef}></canvas>

        <section className="latest-section" ref={latestSectionRef}>
          <div className="light-pillar-overlay"></div>
          <div className="section-title">
            <h2>Latest in <span className="accent">Real Estate</span></h2>
            <p>Explore our newest residential and commercial developments across Lucknow.</p>
          </div>

          <div className="latest-tabs">
            <button className={activeTab === 'deals' ? 'latest-tab active' : 'latest-tab'} data-tab="deals" onClick={() => setActiveTab('deals')}>HOT DEALS</button>
            <button className={activeTab === 'blogs' ? 'latest-tab active' : 'latest-tab'} data-tab="blogs" onClick={() => setActiveTab('blogs')}>BLOGS</button>
            <button className={activeTab === 'media' ? 'latest-tab active' : 'latest-tab'} data-tab="media" onClick={() => setActiveTab('media')}>MEDIA</button>
          </div>

          <div className={activeTab === 'deals' ? 'latest-panel deals active' : 'latest-panel deals'}>
            <div className="carousel-wrap">
              <button
                type="button"
                className="carousel-arrow carousel-arrow-prev"
                id="carouselPrev"
                aria-label="Previous projects"
                onClick={() => {
                  setCurrent(function (c) {
                    return c > 0 ? c - 1 : slides - 1
                  })
                }}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div
                className="carousel"
                id="latestCarousel"
                onMouseEnter={() => setCarouselPaused(true)}
                onMouseLeave={() => setCarouselPaused(false)}
              >
                <div
                  className="carousel-track"
                  id="carouselTrack"
                  style={{ transform: 'translateX(-' + current * 100 + '%)' }}
                >
                  {CAROUSEL_DATA.map(function (item, index) {
                    return (
                      <div className="re-card" key={index}>
                        <div className="re-card-inner">
                          <div className="re-card-media">
                            <img src={item.img} alt={item.name} loading="lazy" />
                          </div>
                          <div className="re-card-body">
                            <span className="re-card-loc">{item.loc}</span>
                            <h3 className="re-card-name">{item.name}</h3>
                            <p className="re-card-config">
                              <i className="fa-solid fa-bed"></i>
                              {item.config}
                            </p>
                            <p className="re-card-price"><span className="rs">&#8377;</span> {item.price}</p>
                            <Link className="re-card-btn" to={item.link}>View Details</Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <button
                type="button"
                className="carousel-arrow carousel-arrow-next"
                id="carouselNext"
                aria-label="Next projects"
                onClick={() => {
                  setCurrent(function (c) {
                    return (c + 1) % slides
                  })
                }}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div className="carousel-dots" id="carouselDots">
              {Array.from({ length: slides }).map(function (_, i) {
                return (
                  <button
                    key={i}
                    className={i === current % slides ? 'active' : ''}
                    aria-label={'Go to slide ' + (i + 1)}
                    onClick={() => setCurrent(i)}
                  ></button>
                )
              })}
            </div>
          </div>

          <div className={activeTab === 'blogs' ? 'latest-panel blogs active' : 'latest-panel blogs'}>
            <p className="latest-empty">Blog posts coming soon.</p>
          </div>

          <div className={activeTab === 'media' ? 'latest-panel media active' : 'latest-panel media'}>
            <p className="latest-empty">Media and project walkthroughs coming soon.</p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <Link to="/projects" className="btn btn-dark">View All Projects</Link>
          </div>
        </section>

        <section className="media-gallery-section">
          <div className="section-title">
            <h2>Media Gallery</h2>
            <p>View our product portfolio through images.</p>
          </div>
          <div
            className="media-gallery-container"
            id="mediaGallery"
            ref={mediaGalleryRef}
            onMouseEnter={() => setMediaPaused(true)}
            onMouseLeave={() => setMediaPaused(false)}
          >
            <button
              className="mg-arrow mg-prev"
              aria-label="Previous image"
              onClick={() => {
                setMediaCurrent(function (c) {
                  return (c - 1 + MEDIA_SLIDES.length) % MEDIA_SLIDES.length
                })
              }}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div
              className="mg-viewport"
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX
                setMediaPaused(true)
              }}
              onTouchEnd={(e) => {
                const diff = touchX.current - e.changedTouches[0].clientX
                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    setMediaCurrent(function (c) {
                      return (c + 1) % MEDIA_SLIDES.length
                    })
                  } else {
                    setMediaCurrent(function (c) {
                      return (c - 1 + MEDIA_SLIDES.length) % MEDIA_SLIDES.length
                    })
                  }
                }
                setMediaPaused(false)
              }}
            >
              {MEDIA_SLIDES.map(function (slide, index) {
                return (
                  <div className={index === mediaCurrent ? 'mg-slide active' : 'mg-slide'} data-anim={slide.anim} key={index}>
                    <img src={slide.img} alt={slide.alt} />
                  </div>
                )
              })}
            </div>
            <button
              className="mg-arrow mg-next"
              aria-label="Next image"
              onClick={() => {
                setMediaCurrent(function (c) {
                  return (c + 1) % MEDIA_SLIDES.length
                })
              }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <div className="mg-dots" id="mgDots">
              {MEDIA_SLIDES.map(function (_, index) {
                return (
                  <button
                    key={index}
                    className={index === mediaCurrent ? 'mg-dot active' : 'mg-dot'}
                    aria-label={'Go to slide ' + (index + 1)}
                    onClick={() => setMediaCurrent(index)}
                  ></button>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      <section className="why-us why-us-home" ref={whyUsRef}>
        <div className="section-title">
          <h2>Why Choose Us</h2>
          <p>We are committed to providing transparent, reliable and result-driven real estate solutions.</p>
        </div>
        <div className="container">
          <div className="features-grid">
            <div className="feature" style={{ '--reveal-delay': '0ms' }}>
              <div className="icon">&#9873;</div>
              <h4>Trusted Advisory</h4>
              <p>Expert guidance for both investors and end-users with complete transparency.</p>
            </div>
            <div className="feature" style={{ '--reveal-delay': '100ms' }}>
              <div className="icon">&#127963;</div>
              <h4>Premium Properties</h4>
              <p>Handpicked luxury residential and commercial projects across Lucknow.</p>
            </div>
            <div className="feature" style={{ '--reveal-delay': '200ms' }}>
              <div className="icon">&#9889;</div>
              <h4>Quick Support</h4>
              <p>Fast response and dedicated support at every step of your journey.</p>
            </div>
            <div className="feature" style={{ '--reveal-delay': '300ms' }}>
              <div className="icon">&#128179;</div>
              <h4>Best Pricing</h4>
              <p>Access to exclusive deals and the best market rates for our clients.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Ready to Find Your Dream Property?</h2>
        <p>Talk to our experts today and get the best deals on premium projects across Lucknow.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-light">Book a Site Visit</Link>
          <a href="tel:9990347333" className="btn btn-outline-light call-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.2 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" /></svg>
            Call 9990347333
          </a>
        </div>
      </section>
    </>
  )
}

export default Home