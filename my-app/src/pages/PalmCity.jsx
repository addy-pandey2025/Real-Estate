import { Link } from 'react-router-dom'
import PalmCityDetails from '../components/PalmCityDetails'

function PalmCity() {
  return (
    <>
      <section className="palmcity-hero">
        <div className="palmcity-hero-overlay" />
        <div className="palmcity-hero-content">
          <div className="container">
            <div className="palmcity-hero-breadcrumb">
              <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> / Palm City
            </div>
            <div className="palmcity-hero-text">
              <span className="palmcity-hero-badge">Premium Independent Floors</span>
              <h1 className="palmcity-hero-title">Palm City</h1>
              <p className="palmcity-hero-subtitle">3 &amp; 4 BHK + Servant Luxury Floor Residences in Lucknow</p>
              <p className="palmcity-hero-location">
                <i className="fa-solid fa-location-dot"></i>
                Sector 79, Lucknow
              </p>
              <p className="palmcity-hero-desc">
                A new standard of elevated living in Sector 79, Lucknow. Thoughtfully designed
                3 &amp; 4 BHK + Servant independent floors with private lift access, dedicated
                parking, abundant natural light and seamless cross-ventilation — crafted for
                families who desire space, privacy and a truly elevated lifestyle.
              </p>
              <div className="palmcity-hero-info">
                <div className="palmcity-hero-info-item">
                  <span className="palmcity-hero-info-icon"><i className="fa-solid fa-bed"></i></span>
                  <span className="palmcity-hero-info-text">
                    <span className="palmcity-hero-info-value">3 &amp; 4 BHK</span>
                    <span className="palmcity-hero-info-label">Premium Residences</span>
                  </span>
                </div>
                <div className="palmcity-hero-info-divider" />
                <div className="palmcity-hero-info-item">
                  <span className="palmcity-hero-info-icon"><i className="fa-solid fa-location-dot"></i></span>
                  <span className="palmcity-hero-info-text">
                    <span className="palmcity-hero-info-value">Sector 79</span>
                    <span className="palmcity-hero-info-label">Lucknow</span>
                  </span>
                </div>
                <div className="palmcity-hero-info-divider" />
                <div className="palmcity-hero-info-item">
                  <span className="palmcity-hero-info-icon"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                  <span className="palmcity-hero-info-text">
                    <span className="palmcity-hero-info-value">₹1.11 Cr*</span>
                    <span className="palmcity-hero-info-label">Starting Price</span>
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
                Official pricing available &middot; GST &amp; applicable charges extra
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail palmcity-detail">
        <PalmCityDetails />
      </section>
    </>
  )
}

export default PalmCity