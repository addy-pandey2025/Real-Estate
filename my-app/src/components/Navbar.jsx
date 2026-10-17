import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link'

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="logo">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src="/assets/Devannsha logo/logo.png" alt="Devannsha Infraventures" />
        </Link>
      </div>

      <nav className={menuOpen ? 'nav-menu open' : 'nav-menu'}>
        <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>
          HOME<span className="nav-line"></span>
        </NavLink>
        <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          ABOUT US<span className="nav-line"></span>
        </NavLink>
        <NavLink to="/projects" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          PROJECTS<span className="nav-line"></span>
        </NavLink>
        <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          CONTACT US<span className="nav-line"></span>
        </NavLink>
      </nav>

      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <i className={menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
      </button>

      <a href="tel:9990347333" className="call-button">
        <i className="fa-solid fa-phone"></i>
        <span>9990347333</span>
      </a>
    </header>
  )
}

export default Navbar