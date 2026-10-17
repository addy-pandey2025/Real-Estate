import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>Devannsha Infraventures</h4>
            <p>Your trusted partner for residential and commercial real estate in Lucknow. We help investors and end-users make informed property decisions with transparency, expertise and personalized guidance.</p>
            <p className="footer-legal">Devannsha Infraventures Private Limited</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div>
            <h4>Our Projects</h4>
            <Link to="/manhattan">Manhattan</Link>
            <Link to="/nest">The Nest</Link>
            <Link to="/palm-city">Palm City</Link>
            <Link to="/serenity">Serenity</Link>
            <Link to="/sahucity">Sahucity Phase 2</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="tel:9990347333"><i className="fa-solid fa-phone"></i> 9990347333</a>
            <p>Lucknow, Uttar Pradesh, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Devannsha Infraventures. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer