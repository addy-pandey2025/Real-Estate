import { useEffect } from 'react'

function hexToRGB(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

const POSITIONS = [
  { x: -0.05, h: 1.3, w: 0.12 },
  { x: 0.12, h: 1.1, w: 0.09 },
  { x: 0.28, h: 1.25, w: 0.11 },
  { x: 0.45, h: 1.3, w: 0.1 },
  { x: 0.6, h: 1.15, w: 0.12 },
  { x: 0.75, h: 1.25, w: 0.09 },
  { x: 0.9, h: 1.3, w: 0.11 },
  { x: 1.05, h: 1.2, w: 0.1 },
]

export default function useLightPillar(canvasRef, opts = {}) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof canvas.getContext !== 'function') return undefined

    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement

    const settings = {
      topColor: '#5227FF',
      bottomColor: '#FF9FFC',
      intensity: 1,
      rotationSpeed: 0.3,
      glowAmount: 0.002,
      pillarWidth: 3,
      pillarHeight: 0.4,
      noiseIntensity: 0.5,
      pillarRotation: 25,
      quality: 'high',
      ...opts,
    }

    const topRGB = hexToRGB(settings.topColor)
    const botRGB = hexToRGB(settings.bottomColor)

    let time = 0
    let raf = null
    let noiseTexture = null
    let w = 0
    let h = 0

    function resize() {
      const dpr = settings.quality === 'high' ? window.devicePixelRatio || 1 : 1
      w = parent.offsetWidth
      h = parent.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      noiseTexture = null
    }

    function drawNoise() {
      if (!noiseTexture) {
        const size = 128
        const c = document.createElement('canvas')
        c.width = size
        c.height = size
        const nctx = c.getContext('2d')
        const imgData = nctx.createImageData(size, size)
        const d = imgData.data
        for (let i = 0; i < d.length; i += 4) {
          const v = Math.random() * 255
          d[i] = v
          d[i + 1] = v
          d[i + 2] = v
          d[i + 3] = 25
        }
        nctx.putImageData(imgData, 0, 0)
        noiseTexture = c
      }

      const pattern = ctx.createPattern(noiseTexture, 'repeat')
      ctx.globalAlpha = settings.noiseIntensity * 0.4
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = 1
    }

    function render() {
      ctx.clearRect(0, 0, w, h)

      const baseAngle = (settings.pillarRotation * Math.PI) / 180

      for (let i = 0; i < POSITIONS.length; i++) {
        const p = POSITIONS[i]
        const xPos = w * p.x
        const pillarH = h * p.h
        const pillarW = w * p.w
        const angle = baseAngle * Math.sin(time * settings.rotationSpeed + i * 0.7)

        ctx.save()
        ctx.translate(xPos, h / 2)
        ctx.rotate(angle)

        ctx.shadowBlur = pillarW * 0.8 + 40
        ctx.shadowColor = 'rgba(' + topRGB.r + ',' + topRGB.g + ',' + topRGB.b + ',' + (settings.intensity * 0.4) + ')'

        const grad = ctx.createLinearGradient(0, -pillarH / 2, 0, pillarH / 2)
        grad.addColorStop(0, 'rgba(' + topRGB.r + ',' + topRGB.g + ',' + topRGB.b + ',' + (settings.intensity * 0.5) + ')')
        grad.addColorStop(0.35, 'rgba(' +
          Math.round((topRGB.r + botRGB.r) / 2) + ',' +
          Math.round((topRGB.g + botRGB.g) / 2) + ',' +
          Math.round((topRGB.b + botRGB.b) / 2) + ',' +
          (settings.intensity * 0.3) + ')')
        grad.addColorStop(0.65, 'rgba(' +
          Math.round((topRGB.r + botRGB.r) / 2) + ',' +
          Math.round((topRGB.g + botRGB.g) / 2) + ',' +
          Math.round((topRGB.b + botRGB.b) / 2) + ',' +
          (settings.intensity * 0.3) + ')')
        grad.addColorStop(1, 'rgba(' + botRGB.r + ',' + botRGB.g + ',' + botRGB.b + ',' + (settings.intensity * 0.5) + ')')

        ctx.fillStyle = grad
        ctx.fillRect(-pillarW / 2, -pillarH / 2, pillarW, pillarH)

        ctx.restore()
      }

      if (settings.noiseIntensity > 0) drawNoise()
    }

    function loop() {
      time += 0.016
      render()
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.width = 0
      canvas.height = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef])
}