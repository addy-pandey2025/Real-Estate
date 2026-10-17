import { useEffect } from 'react'

function SuccessNotification({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [message, onClose])

  return (
    <div className="success-notification" role="status">
      <i className="fa-solid fa-circle-check"></i>
      <span>{message}</span>
      <button type="button" className="success-close" onClick={onClose} aria-label="Close">&times;</button>
    </div>
  )
}

export default SuccessNotification