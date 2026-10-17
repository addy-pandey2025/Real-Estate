const WHATSAPP_URL =
  'https://wa.me/919990347333?text=Hi%2C%20I%20am%20interested%20in%20your%20real%20estate%20projects.'

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
      <span className="wa-label">Chat with us</span>
    </a>
  )
}

export default FloatingWhatsApp