import { useEffect, useState } from 'react'

function ProjectGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const lightboxOpen = lightboxIndex !== null

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : ''

    function onKey(e) {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(function (i) {
          return (i - 1 + images.length) % images.length
        })
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex(function (i) {
          return (i + 1) % images.length
        })
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, images.length])

  return (
    <>
      <div className="project-gallery-grid">
        {images.map(function (img, i) {
          return (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              className="gallery-item"
              onClick={() => setLightboxIndex(i)}
            />
          )
        })}
      </div>

      <div
        className={lightboxOpen ? 'lightbox active' : 'lightbox'}
        id="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) setLightboxIndex(null)
        }}
      >
        <span className="close-btn" onClick={() => setLightboxIndex(null)}>&times;</span>
        <span
          className="prev-btn"
          onClick={(e) => {
            e.stopPropagation()
            setLightboxIndex(function (i) {
              return (i - 1 + images.length) % images.length
            })
          }}
        >
          &#10094;
        </span>
        <img id="lightboxImg" src={lightboxOpen ? images[lightboxIndex].src : ''} alt="Gallery Image" />
        <span
          className="next-btn"
          onClick={(e) => {
            e.stopPropagation()
            setLightboxIndex(function (i) {
              return (i + 1) % images.length
            })
          }}
        >
          &#10095;
        </span>
      </div>
    </>
  )
}

export default ProjectGallery