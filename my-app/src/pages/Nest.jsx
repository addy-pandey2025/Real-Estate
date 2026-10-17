import { Link } from 'react-router-dom'
import NestDetails from '../components/NestDetails'

function Nest() {
  return (
    <>
      <section className="nest-hero">
        <div className="nest-hero-overlay" />
        <div className="nest-hero-content">
          <div className="nest-hero-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> / <span className="nest-hero-breadcrumb-current">The Nest</span>
          </div>
          <div className="nest-hero-text">
            <span className="nest-hero-badge">Plotted Development</span>
            <h1 className="nest-hero-title">THE NEST</h1>
            <p className="nest-hero-subtitle">A Planned Residential Community in Lucknow</p>
            <p className="nest-hero-location">
              <i className="fa-solid fa-location-dot"></i>
              Sector 12, Lucknow
            </p>
            <p className="nest-hero-desc">
              Clearly numbered plots, landscaped greens and community amenities — a serene,
              well-connected plotted development on Raebareli Road.
            </p>
            <div className="nest-hero-info">
              <div className="nest-hero-info-item">
                <span className="nest-hero-info-icon"><i className="fa-solid fa-border-all"></i></span>
                <span className="nest-hero-info-text">
                  <span className="nest-hero-info-value">Plots</span>
                  <span className="nest-hero-info-label">Residential Plotted Development</span>
                </span>
              </div>
              <div className="nest-hero-info-divider" />
              <div className="nest-hero-info-item">
                <span className="nest-hero-info-icon"><i className="fa-solid fa-location-dot"></i></span>
                <span className="nest-hero-info-text">
                  <span className="nest-hero-info-value">Sector 12</span>
                  <span className="nest-hero-info-label">Lucknow</span>
                </span>
              </div>
              <div className="nest-hero-info-divider" />
              <div className="nest-hero-info-item">
                <span className="nest-hero-info-icon"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                <span className="nest-hero-info-text">
                  <span className="nest-hero-info-value">₹60,000 / Sq. Yd*</span>
                  <span className="nest-hero-info-label">Official Rate</span>
                </span>
              </div>
            </div>
            <div className="nest-hero-cta">
              <a href="#sidebarForm" className="nest-hero-btn nest-hero-btn-primary">
                <i className="fa-solid fa-calendar-check"></i>
                Schedule a Site Visit
              </a>
              <a href="#site-plan" className="nest-hero-btn nest-hero-btn-secondary">
                View Site Plan
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail nest-detail">
        <NestDetails />
      </section>
    </>
  )
}

export default Nest