import { useEffect, useRef, useState } from 'react'

export default function InfiniteSpiral({
  items = [],
  animationMode = 'auto',
  speed = 0.55,
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardRadius = 10,
  centerScale = 1.2,
  edgeBlur = 6,
  cardsPerTurn = 7,
  pauseOnHover = false,
  direction = 'up',
  rotation = 0,
  cardTilt = 0,
  edgeFade = 0.3,
  imageFit = 'cover',
  grayscale = 1,
}) {
  const wrapRef = useRef(null)
  const [phase, setPhase] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (animationMode !== 'auto') return
    let raf = 0
    let last = performance.now()
    const dir = direction === 'down' ? 1 : -1
    const tick = now => {
      const dt = Math.min((now - last) / 16.667, 4)
      last = now
      if (!hovered) setPhase(p => p + speed * dt * dir)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animationMode, speed, direction, hovered])

  const count = items.length
  if (count === 0) return <div ref={wrapRef} className="infinite-spiral"></div>

  const dirScale = direction === 'down' ? 1 : -1
  const loopH = cardsPerTurn * verticalSpacing
  const step = loopH / count
  const w = size.w || 600
  const h = size.h || 380
  const maxRadius = Math.max(40, w / 2 / centerScale - cardWidth / 2)
  const effRadius = Math.min(radius, maxRadius)

  return (
    <div
      ref={wrapRef}
      className="infinite-spiral"
      onMouseEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setHovered(false) : undefined}
    >
      {items.map((item, i) => {
        let t = i * step + dirScale * phase
        t = ((t % loopH) + loopH) % loopH
        const elev = t / loopH
        const deg = elev * 360 + rotation
        const rad = (deg * Math.PI) / 180
        const xW = Math.sin(rad) * effRadius
        const z = Math.cos(rad) * effRadius
        const scale = (centerScale * (perspective - radius)) / (perspective - z)
        const depth = (z + radius) / (2 * radius)
        const yN = (1 - elev) * 2 - 1
        const left = w / 2 + xW * scale
        const top = h / 2 + yN * h * 0.32 * scale
        const cardW = cardWidth * scale
        const cardH = cardHeight * scale
        const opacity = Math.min(1, elev / edgeFade, (1 - elev) / edgeFade)
        const blur = (1 - depth) * edgeBlur
        const gray = grayscale * Math.max(0, 1 - depth)
        return (
          <img
            key={i}
            src={item.src}
            alt={item.alt || 'Real estate project'}
            draggable={false}
            style={{
              position: 'absolute',
              left: left - cardW / 2,
              top: top - cardH / 2,
              width: cardW,
              height: cardH,
              borderRadius: cardRadius,
              objectFit: imageFit,
              opacity,
              filter: `blur(${blur}px) grayscale(${gray})`,
              transform: cardTilt ? `rotateX(${cardTilt}deg)` : undefined,
              zIndex: Math.round(depth * 1000),
              userSelect: 'none',
            }}
          />
        )
      })}
    </div>
  )
}