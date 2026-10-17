import { useEffect } from 'react'

function lerp(a, b, t) {
  return a + (b - a) * t
}

export default function useProximityText(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return undefined

    let mouseX = -9999
    let mouseY = -9999
    let animating = false
    let raf = null
    const states = []

    function initProximityText(el, opts) {
      const text = el.textContent
      const cs = window.getComputedStyle(el)
      const baseWeight = parseFloat(cs.fontWeight) || 400
      const baseSpacing = parseFloat(cs.letterSpacing) || 0

      el.setAttribute('aria-label', text)

      const frag = document.createDocumentFragment()
      const chars = []

      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === ' ') {
          frag.appendChild(document.createTextNode(' '))
        } else {
          const span = document.createElement('span')
          span.textContent = ch
          span.style.display = 'inline-block'
          span.style.willChange = 'transform'
          frag.appendChild(span)
          chars.push({ el: span, weight: baseWeight, scale: 1, spacing: baseSpacing })
        }
      }

      el.textContent = ''
      el.appendChild(frag)

      states.push({
        chars,
        reset: function () {
          el.textContent = text
        },
        baseWeight: baseWeight,
        baseSpacing: baseSpacing,
        maxRadius: opts.maxRadius || 220,
        weightDelta: opts.weightDelta || 300,
        scaleMax: opts.scaleMax || 1.12,
        spacingMax: opts.spacingMax || 3,
        lerpSpeed: opts.lerpSpeed || 0.08,
      })
    }

    function animate() {
      let anyMoving = false

      for (let s = 0; s < states.length; s++) {
        const state = states[s]
        for (let i = 0; i < state.chars.length; i++) {
          const c = state.chars[i]
          const rect = c.el.getBoundingClientRect()
          const dx = mouseX - (rect.left + rect.width / 2)
          const dy = mouseY - (rect.top + rect.height / 2)
          const dist = Math.sqrt(dx * dx + dy * dy)
          const influence = Math.max(0, 1 - dist / state.maxRadius)
          const inf2 = influence * influence

          const targetWeight = state.baseWeight + state.weightDelta * inf2
          const targetScale = 1 + (state.scaleMax - 1) * inf2
          const targetSpacing = state.baseSpacing + state.spacingMax * inf2

          if (Math.abs(c.weight - targetWeight) > 0.5) anyMoving = true

          c.weight = lerp(c.weight, targetWeight, state.lerpSpeed)
          c.scale = lerp(c.scale, targetScale, state.lerpSpeed)
          c.spacing = lerp(c.spacing, targetSpacing, state.lerpSpeed)

          c.el.style.fontWeight = Math.round(c.weight)
          c.el.style.transform = 'scale(' + c.scale.toFixed(4) + ')'
          c.el.style.letterSpacing = c.spacing.toFixed(2) + 'px'
        }
      }

      if (anyMoving) {
        raf = requestAnimationFrame(animate)
      } else {
        animating = false
      }
    }

    function startAnimation() {
      if (!animating) {
        animating = true
        raf = requestAnimationFrame(animate)
      }
    }

    function onMouseMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      startAnimation()
    }

    function onMouseLeave() {
      mouseX = -9999
      mouseY = -9999
      startAnimation()
    }

    const heading = section.querySelector('.section-title h2')
    const subtitle = section.querySelector('.section-title p')
    const tabs = section.querySelectorAll('.latest-tab')

    if (heading) {
      initProximityText(heading, { maxRadius: 250, weightDelta: 280, scaleMax: 1.14, spacingMax: 4, lerpSpeed: 0.08 })
    }
    if (subtitle) {
      initProximityText(subtitle, { maxRadius: 180, weightDelta: 150, scaleMax: 1.06, spacingMax: 2, lerpSpeed: 0.08 })
    }
    for (let i = 0; i < tabs.length; i++) {
      initProximityText(tabs[i], { maxRadius: 140, weightDelta: 200, scaleMax: 1.1, spacingMax: 2.5, lerpSpeed: 0.08 })
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)

    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      if (raf) cancelAnimationFrame(raf)
      states.forEach(function (state) {
        state.reset()
      })
      animating = false
    }
  }, [sectionRef])
}