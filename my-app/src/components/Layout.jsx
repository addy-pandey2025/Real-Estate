import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'

function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        <div className="ticker-item">BOOK NOW</div>
        <div className="ticker-item"><i className="fa-solid fa-phone"></i>9990347333 CALL NOW</div>
        <div className="ticker-item">LUCKNOW | TRUSTED REAL ESTATE ADVISORY</div>
        <div className="ticker-item">YOUR TRUST IS OUR FOUNDATION</div>
        <div className="ticker-item">BOOK NOW</div>
        <div className="ticker-item"><i className="fa-solid fa-phone"></i>9990347333 CALL NOW</div>
        <div className="ticker-item">BOOK NOW</div>
        <div className="ticker-item"><i className="fa-solid fa-phone"></i>9990347333 CALL NOW</div>
        <div className="ticker-item">LUCKNOW | TRUSTED REAL ESTATE ADVISORY</div>
        <div className="ticker-item">YOUR TRUST IS OUR FOUNDATION</div>
        <div className="ticker-item">BOOK NOW</div>
        <div className="ticker-item"><i className="fa-solid fa-phone"></i>9990347333 CALL NOW</div>
      </div>
    </div>
  )
}

function Layout() {
  return (
    <>
      <Navbar />
      <Ticker />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export default Layout