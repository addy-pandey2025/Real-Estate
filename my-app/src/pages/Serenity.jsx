import { Link } from 'react-router-dom'
import SerenityDetails from '../components/SerenityDetails'

function Serenity() {
  return (
    <>
      <section
        className="palmcity-hero serenity-hero"
        style={{ backgroundImage: "url('/assets/serenity/hero.jpg')" }}
      >
        <div className="palmcity-hero-overlay" />
        <div className="palmcity-hero-content">
          <div className="container">
            <div className="palmcity-hero-breadcrumb">
              <Link to="/">Home</Link>
              <span className="sn-hero-sep">/</span>
              <Link to="/projects">Projects</Link>
              <span className="sn-hero-sep">/</span>
              Serenity
            </div>
            <div className="palmcity-hero-text">
              <span className="palmcity-hero-badge">Premium Residences</span>
              <h1 className="palmcity-hero-title">Serenity</h1>
              <p className="palmcity-hero-subtitle">Luxury 4 BHK + Servant + Store in Sushant Golf City, Lucknow</p>
              <p className="palmcity-hero-location">
                <i className="fa-solid fa-location-dot"></i>
                Sushant Golf City, Lucknow
              </p>
              <p className="palmcity-hero-desc">
                A premium residential address designed around comfort, natural light, greenery and an
                elevated lifestyle. Expansive residences with panoramic golf-course views, balcony
                decks on every bedroom and a thoughtfully landscaped Central Green — crafted for
                families who desire space, privacy and a truly elevated lifestyle.
              </p>
              <div className="palmcity-hero-info">
                <div className="palmcity-hero-info-item">
                  <span className="palmcity-hero-info-icon"><i className="fa-solid fa-bed"></i></span>
                  <span className="palmcity-hero-info-text">
                    <span className="palmcity-hero-info-value">4 BHK + Servant</span>
                    <span className="palmcity-hero-info-label">Luxury Residences</span>
                  </span>
                </div>
                <div className="palmcity-hero-info-divider" />
                <div className="palmcity-hero-info-item">
                  <span className="palmcity-hero-info-icon"><i className="fa-solid fa-location-dot"></i></span>
                  <span className="palmcity-hero-info-text">
                    <span className="palmcity-hero-info-value">Sushant Golf</span>
                    <span className="palmcity-hero-info-label">City, Lucknow</span>
                  </span>
                </div>
                <div className="palmcity-hero-info-divider" />
                <div className="palmcity-hero-info-item">
                  <span className="palmcity-hero-info-icon"><i className="fa-solid fa-ruler-combined"></i></span>
                  <span className="palmcity-hero-info-text">
                    <span className="palmcity-hero-info-value">1991 – 2284</span>
                    <span className="palmcity-hero-info-label">Carpet Sq.ft</span>
                  </span>
                </div>
              </div>
              <div className="palmcity-hero-cta">
                <a href="#sidebarForm" className="palmcity-hero-btn palmcity-hero-btn-primary">
                  <i className="fa-solid fa-calendar-check"></i>
                  Book a Site Visit
                </a>
                <a href="#floor-plans" className="palmcity-hero-btn palmcity-hero-btn-secondary">
                  View Floor Plans
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
              <p className="palmcity-hero-trust">
                RERA Registered &middot; IGBC Green Homes Gold Precertification
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail palmcity-detail serenity-detail">
        <SerenityDetails />
      </section>
    </>
  )
}

export default Serenity