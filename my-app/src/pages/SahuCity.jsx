import { Link } from 'react-router-dom'
import SahuCityDetails from '../components/SahuCityDetails'

const HERO_IMG = "/assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.52.49 AM.jpeg"

function SahuCity() {
  return (
    <>
      <section
        className="palmcity-hero sahucity-hero"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
      >
        <div className="palmcity-hero-overlay" />
        <div className="palmcity-hero-content">
          <div className="container">
            <div className="palmcity-hero-breadcrumb">
              <Link to="/">Home</Link>
              <span className="sn-hero-sep">/</span>
              <Link to="/projects">Projects</Link>
              <span className="sn-hero-sep">/</span>
              Sahu City Phase 2
            </div>
            <div className="palmcity-hero-text">
              <span className="palmcity-hero-badge">Premium Residential Project</span>
              <h1 className="palmcity-hero-title">Sahu City Phase 2</h1>
              <p className="palmcity-hero-location">
                <i className="fa-solid fa-location-dot"></i>
                Lucknow
              </p>
              <p className="palmcity-hero-desc">
                A premium residential address in Lucknow offering thoughtfully planned 1 BHK and 2 BHK
                residences in Type I, Type II and Type III layouts — planned across the Crown Block and
                tower clusters for comfortable and efficient living.
              </p>
              <div className="palmcity-hero-cta">
                <a href="#sidebarForm" className="palmcity-hero-btn palmcity-hero-btn-primary">
                  <i className="fa-solid fa-calendar-check"></i>
                  Book a Site Visit
                </a>
                <a href="#sidebarForm" className="palmcity-hero-btn palmcity-hero-btn-secondary">
                  Enquire Now
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail palmcity-detail sahucity-detail">
        <SahuCityDetails />
      </section>
    </>
  )
}

export default SahuCity