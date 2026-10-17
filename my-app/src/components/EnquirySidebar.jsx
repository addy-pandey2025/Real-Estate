import { useState } from 'react'
import SuccessNotification from './SuccessNotification'

function EnquirySidebar({ overview, dataProject }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim() || phone.trim().length < 10) {
      alert('Please enter your name and a valid phone number.')
      return
    }

    fetch('http://localhost:5000/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        email: '',
        message: '',
        project: dataProject,
        page: dataProject,
      }),
    })
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        if (data.success) {
          setSuccess(data.message || 'Enquiry submitted successfully! We will contact you soon.')
          setName('')
          setPhone('')
        } else {
          alert(data.message || 'Something went wrong. Please try again.')
        }
      })
      .catch(function () {
        alert('Failed to submit enquiry. Please try again.')
      })
  }

  return (
    <>
      {success && <SuccessNotification message={success} onClose={() => setSuccess('')} />}

      <aside className="sidebar">
        <h4>Quick Overview</h4>
        <ul className="sidebar-specs">
          {overview.map(function (row, i) {
            return (
              <li key={i}>
                <strong>{row.label}</strong>
                <span className="sb-value">{row.value}</span>
              </li>
            )
          })}
        </ul>

        <div className="contact-box">
          <h4>Book a Site Visit</h4>
          <form id="sidebarForm" data-project={dataProject} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sbName">Your Name</label>
              <input type="text" id="sbName" placeholder="Enter your full name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="sbPhone">Phone Number</label>
              <input type="tel" id="sbPhone" placeholder="Enter your mobile number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button type="submit" className="submit-btn">Enquire Now</button>
          </form>
          <a href="tel:9990347333" className="call-btn" style={{ marginTop: '12px' }}>
            <i className="fa-solid fa-phone"></i> 9990347333
          </a>
        </div>
      </aside>
    </>
  )
}

export default EnquirySidebar