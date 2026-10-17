import { Link } from 'react-router-dom'
import ManhattanDetails from '../components/ManhattanDetails'

function Manhattan() {
  return (
    <>
      <section className="manhattan-hero">
        <div className="manhattan-hero-overlay" />
        <div className="manhattan-hero-content">
          <div className="manhattan-hero-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/projects">Projects</Link> / Manhattan
          </div>
          <div className="manhattan-hero-text">
            <span className="manhattan-hero-badge">Featured Project</span>
            <h1 className="manhattan-hero-title">MANHATTAN</h1>
            <p className="manhattan-hero-subtitle">Premium 3 &amp; 4 BHK Residences in Lucknow</p>
            <p className="manhattan-hero-location">
              <i className="fa-solid fa-location-dot"></i>
              Sector 131, Lucknow
            </p>
            <p className="manhattan-hero-desc">
              Thoughtfully designed residences offering comfort, elegance and a refined
              lifestyle in one of Lucknow&rsquo;s promising locations.
            </p>
            <div className="manhattan-hero-info">
              <div className="manhattan-hero-info-item">
                <span className="manhattan-hero-info-icon"><i className="fa-solid fa-bed"></i></span>
                <span className="manhattan-hero-info-text">
                  <span className="manhattan-hero-info-value">3 &amp; 4 BHK</span>
                  <span className="manhattan-hero-info-label">Premium Residences</span>
                </span>
              </div>
              <div className="manhattan-hero-info-divider" />
              <div className="manhattan-hero-info-item">
                <span className="manhattan-hero-info-icon"><i className="fa-solid fa-location-dot"></i></span>
                <span className="manhattan-hero-info-text">
                  <span className="manhattan-hero-info-value">Sector 131</span>
                  <span className="manhattan-hero-info-label">Lucknow</span>
                </span>
              </div>
              <div className="manhattan-hero-info-divider" />
              <div className="manhattan-hero-info-item">
                <span className="manhattan-hero-info-icon"><i className="fa-solid fa-indian-rupee-sign"></i></span>
                <span className="manhattan-hero-info-text">
                  <span className="manhattan-hero-info-value">₹1.31 Cr – ₹2.21 Cr*</span>
                  <span className="manhattan-hero-info-label">Starting Price</span>
                </span>
              </div>
            </div>
            <div className="manhattan-hero-cta">
              <a href="#sidebarForm" className="manhattan-hero-btn manhattan-hero-btn-primary">
                <i className="fa-solid fa-calendar-check"></i>
                Schedule a Site Visit
              </a>
              <a href="#about" className="manhattan-hero-btn manhattan-hero-btn-secondary">
                View Project Details
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail manhattan-detail">
        <div className="detail-hero-media">
          <h2 className="video-section-heading">Experience Manhattan</h2>
          <p className="video-section-subtitle">Take a closer look at the residences, lifestyle and vision behind Manhattan.</p>
          <div className="video-card">
            <video src="/assets/Manhattan images/manhattan.mp4" controls poster="/assets/Manhattan images/Screenshot 2026-09-04 213033.png"></video>
          </div>
        </div>

        <ManhattanDetails />
      </section>
    </>
  )
}

export default Manhattan