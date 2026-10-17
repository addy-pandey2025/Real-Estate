/* ============ URL-AWARE ACTIVE NAV ============ */
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.nav-menu .nav-link');
  if (!links.length) return;

  const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function setActive(href) {
    links.forEach(function (link) {
      if (link.getAttribute('href').toLowerCase() === href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActive(page);
});

/* ============ MOBILE MENU TOGGLE ============ */
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }
});

/* ============ HERO SEARCH FILTER ============ */
function handleSearch() {
  const loc = document.getElementById('location').value;
  const text = (document.getElementById('searchText').value || '').toLowerCase();
  const url = 'projects.html?loc=' + encodeURIComponent(loc) + '&q=' + encodeURIComponent(text);
  window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
  const searchInput = document.getElementById('searchText');
  if (searchInput) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleSearch();
    });
  }
});

/* ============ POPULAR LOCALITIES BAR ============ */
document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.getElementById('localitiesScroll');
  if (!wrapper) return;

  const leftArrow = wrapper.parentElement.querySelector('.pl-arrow-left');
  const rightArrow = wrapper.parentElement.querySelector('.pl-arrow-right');

  function updateArrows() {
    if (leftArrow) {
      leftArrow.style.display = wrapper.scrollLeft > 2 ? '' : 'none';
    }
    if (rightArrow) {
      const canScroll = wrapper.scrollWidth > wrapper.clientWidth + 2;
      rightArrow.style.display = canScroll ? '' : 'none';
    }
  }

  function onLeftClick() {
    wrapper.scrollBy({ left: -280, behavior: 'smooth' });
  }

  function onRightClick() {
    wrapper.scrollBy({ left: 280, behavior: 'smooth' });
  }

  if (leftArrow) leftArrow.addEventListener('click', onLeftClick);
  if (rightArrow) rightArrow.addEventListener('click', onRightClick);

  wrapper.addEventListener('scroll', updateArrows);

  const chips = wrapper.querySelectorAll('.locality-chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      const loc = chip.getAttribute('data-location');
      const searchInput = document.getElementById('searchText');
      const locationSelect = document.getElementById('location');
      if (locationSelect) {
        locationSelect.value = 'Lucknow';
      }
      if (searchInput) {
        searchInput.value = loc;
      }
      handleSearch();
    });
  });

  updateArrows();
  window.addEventListener('resize', updateArrows);
});

/* ============ PROJECTS FILTER (read URL params) ============ */
document.addEventListener('DOMContentLoaded', function () {
  const filterSelect = document.getElementById('filterLocation');
  const searchBox = document.getElementById('filterSearch');
  const cards = document.querySelectorAll('.property-card');
  if (!cards.length) return;

  const params = new URLSearchParams(window.location.search);
  const urlLoc = params.get('loc');
  const urlQ = (params.get('q') || '').toLowerCase();

  if (filterSelect && urlLoc) filterSelect.value = urlLoc;
  if (searchBox && urlQ) searchBox.value = urlQ;

  function applyFilter() {
    const loc = filterSelect ? filterSelect.value.toLowerCase() : '';
    const q = searchBox ? searchBox.value.toLowerCase() : '';
    cards.forEach(function (card) {
      const cardLoc = (card.getAttribute('data-location') || '').toLowerCase();
      const cardText = (card.getAttribute('data-text') || '').toLowerCase();
      const matchLoc = !loc || cardLoc.includes(loc);
      const matchText = !q || cardText.includes(q);
      card.style.display = matchLoc && matchText ? '' : 'none';
    });
  }

  if (filterSelect) filterSelect.addEventListener('change', applyFilter);
  if (searchBox) searchBox.addEventListener('input', applyFilter);
  applyFilter();
});

/* ============ LIGHTBOX GALLERY ============ */
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox .close-btn');
  const prevBtn = document.querySelector('.lightbox .prev-btn');
  const nextBtn = document.querySelector('.lightbox .next-btn');

  const images = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  let current = 0;

  function show(i) {
    current = (i + images.length) % images.length;
    lightImg.src = images[current].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  images.forEach(function (img, index) {
    img.addEventListener('click', function () {
      show(index);
    });
  });

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') { current = (current - 1 + images.length) % images.length; lightImg.src = images[current].src; }
    if (e.key === 'ArrowRight') { current = (current + 1) % images.length; lightImg.src = images[current].src; }
  });
});

/* ============ CONTACT FORM (open WhatsApp) ============ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const project = document.getElementById('projectInterest').value;
    const message = document.getElementById('message').value.trim();

    const errors = [];
    if (!name) errors.push('Please enter your name.');
    if (!phone || phone.length < 10) errors.push('Please enter a valid phone number.');

    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    const text = 'New Enquiry:%0A' +
      'Name: ' + encodeURIComponent(name) + '%0A' +
      'Phone: ' + encodeURIComponent(phone) + '%0A' +
      (email ? 'Email: ' + encodeURIComponent(email) + '%0A' : '') +
      (project ? 'Interested in: ' + encodeURIComponent(project) + '%0A' : '') +
      (message ? 'Message: ' + encodeURIComponent(message) : '');

    window.open('https://wa.me/919990347333?text=' + text, '_blank');
  });
}

/* ============ SIDEBAR QUICK ENQUIRY ============ */
function initSidebarForm() {
  const form = document.getElementById('sidebarForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('sbName').value.trim();
    const phone = document.getElementById('sbPhone').value.trim();
    const project = form.getAttribute('data-project') || '';
    if (!name || phone.length < 10) {
      alert('Please fill in your name and a valid phone number.');
      return;
    }
    const text = 'Quick Enquiry%0AName: ' + encodeURIComponent(name) + '%0APhone: ' + encodeURIComponent(phone) +
      (project ? '%0AProject: ' + encodeURIComponent(project) : '');
    window.open('https://wa.me/919990347333?text=' + text, '_blank');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initContactForm();
  initSidebarForm();
});

/* ============ LATEST IN REAL ESTATE - TABS ============ */
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.latest-tab');
  if (!tabs.length) return;
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const target = tab.getAttribute('data-tab');
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelectorAll('.latest-panel').forEach(function (p) {
        p.classList.toggle('active', p.classList.contains(target));
      });
    });
  });
});

/* ============ LATEST IN REAL ESTATE - CAROUSEL ============ */
document.addEventListener('DOMContentLoaded', function () {
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  if (!track) return;

  const data = [
    { img: 'assets/Manhattan images/Screenshot 2026-09-04 213007.png', loc: 'Lucknow', name: 'MANHATTAN', config: '3 & 4 BHK', price: '1.31 Cr - 2.21 Cr', link: 'manhattan.html' },
    { img: 'assets/Nest images/Screenshot 2026-09-04 211939.png', loc: 'Lucknow', name: 'THE NEST', config: '2 & 3 BHK', price: '42.99 L - 58.49 L', link: 'nest.html' },
    { img: 'assets/Palm city images/Screenshot 2026-09-04 212319.png', loc: 'Lucknow', name: 'PALM CITY', config: 'RERA Approved Plots', price: 'Premium Plots', link: 'palm-city.html' },
    { img: 'assets/Serenity images/Screenshot 2026-09-04 214535.png', loc: 'Lucknow', name: 'SERENITY', config: '200 - 400 Sq. Yd', price: '2.10 Cr - 4.25 Cr', link: 'serenity.html' },
    { img: 'assets/Sahu city images/WhatsApp Image 2026-09-02 at 4.54.04 AM.jpeg', loc: 'Lucknow', name: 'SAHUCITY PHASE 2', config: 'Premium Residential', price: 'Available', link: 'sahucity.html' },
    { img: 'assets/Manhattan images/Screenshot 2026-09-04 213033.png', loc: 'Lucknow', name: 'MANHATTAN', config: '3 & 4 BHK', price: '1.31 Cr - 2.21 Cr', link: 'manhattan.html' }
  ];

  const MAX_VISIBLE = 3;
  const AUTOPLAY_MS = 4000;
  let perView = getPerView();
  let slides = calcSlides(data.length, perView);
  let current = 0;
  let timer = null;
  let trackStart = false;

  function getPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function calcSlides(total, per) {
    return Math.max(1, Math.ceil(total / per));
  }

  function render() {
    track.innerHTML = '';
    data.forEach(function (item) {
      const card = document.createElement('div');
      card.className = 're-card';
      card.innerHTML =
        '<div class="re-card-inner">' +
          '<div class="re-card-media"><img src="' + item.img + '" alt="' + item.name + '" loading="lazy"></div>' +
          '<div class="re-card-body">' +
            '<span class="re-card-loc">' + item.loc + '</span>' +
            '<h3 class="re-card-name">' + item.name + '</h3>' +
            '<p class="re-card-config"><i class="fa-solid fa-bed"></i>' + item.config + '</p>' +
            '<p class="re-card-price"><span class="rs">&#8377;</span> ' + item.price + '</p>' +
            '<a class="re-card-btn" href="' + item.link + '">View Details</a>' +
          '</div>' +
        '</div>';
      track.appendChild(card);
    });
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < slides; i++) {
      const d = document.createElement('button');
      d.className = i === 0 ? 'active' : '';
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', function () {
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(d);
    }
  }

  function update() {
    const cardWidth = (100 / perView);
    track.style.transform = 'translateX(-' + (current * cardWidth * perView) + '%)';
    const dots = dotsWrap.querySelectorAll('button');
    const activeSlide = current % slides;
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === activeSlide);
    });
  }

  function goTo(i) {
    current = i;
    update();
  }

  function next() {
    if (current < slides - 1) {
      current++;
    } else {
      current = 0;
    }
    update();
  }

  function prev() {
    if (current > 0) {
      current--;
    } else {
      current = slides - 1;
    }
    update();
  }

  function start() {
    stop();
    timer = setInterval(next, AUTOPLAY_MS);
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function restart() {
    start();
  }

  const carousel = document.getElementById('latestCarousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
  }

  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });

  function onResize() {
    const pv = getPerView();
    if (pv !== perView) {
      perView = pv;
      slides = calcSlides(data.length, perView);
      current = 0;
      renderDots();
    }
    update();
  }

  window.addEventListener('resize', onResize);

  render();
  renderDots();
  update();
  start();
});

/* ============ VARIABLE PROXIMITY TEXT ============ */
(function () {
  'use strict';

  if (window.matchMedia('(pointer: coarse)').matches) return;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  var proximityStates = [];
  var mouseX = -9999;
  var mouseY = -9999;
  var animating = false;

  function initProximityText(el, opts) {
    var text = el.textContent;
    var cs = getComputedStyle(el);
    var baseWeight = parseFloat(cs.fontWeight) || 400;
    var baseSpacing = parseFloat(cs.letterSpacing) || 0;

    el.setAttribute('aria-label', text);

    var frag = document.createDocumentFragment();
    var chars = [];

    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === ' ') {
        frag.appendChild(document.createTextNode(' '));
      } else {
        var span = document.createElement('span');
        span.textContent = ch;
        span.style.display = 'inline-block';
        span.style.willChange = 'transform';
        frag.appendChild(span);
        chars.push({ el: span, weight: baseWeight, scale: 1, spacing: baseSpacing });
      }
    }

    el.textContent = '';
    el.appendChild(frag);

    proximityStates.push({
      chars: chars,
      baseWeight: baseWeight,
      baseSpacing: baseSpacing,
      maxRadius: opts.maxRadius || 220,
      weightDelta: opts.weightDelta || 300,
      scaleMax: opts.scaleMax || 1.12,
      spacingMax: opts.spacingMax || 3,
      lerpSpeed: opts.lerpSpeed || 0.08
    });
  }

  function animate() {
    var anyMoving = false;

    for (var s = 0; s < proximityStates.length; s++) {
      var state = proximityStates[s];
      for (var i = 0; i < state.chars.length; i++) {
        var c = state.chars[i];
        var rect = c.el.getBoundingClientRect();
        var dx = mouseX - (rect.left + rect.width / 2);
        var dy = mouseY - (rect.top + rect.height / 2);
        var dist = Math.sqrt(dx * dx + dy * dy);
        var influence = Math.max(0, 1 - dist / state.maxRadius);
        influence *= influence;

        var targetWeight = state.baseWeight + state.weightDelta * influence;
        var targetScale = 1 + (state.scaleMax - 1) * influence;
        var targetSpacing = state.baseSpacing + state.spacingMax * influence;

        if (Math.abs(c.weight - targetWeight) > 0.5) anyMoving = true;

        c.weight = lerp(c.weight, targetWeight, state.lerpSpeed);
        c.scale = lerp(c.scale, targetScale, state.lerpSpeed);
        c.spacing = lerp(c.spacing, targetSpacing, state.lerpSpeed);

        c.el.style.fontWeight = Math.round(c.weight);
        c.el.style.transform = 'scale(' + c.scale.toFixed(4) + ')';
        c.el.style.letterSpacing = c.spacing.toFixed(2) + 'px';
      }
    }

    if (anyMoving) {
      requestAnimationFrame(animate);
    } else {
      animating = false;
    }
  }

  function startAnimation() {
    if (!animating) {
      animating = true;
      requestAnimationFrame(animate);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var heading = document.querySelector('.latest-section .section-title h2');
    if (heading) {
      initProximityText(heading, {
        maxRadius: 250,
        weightDelta: 280,
        scaleMax: 1.14,
        spacingMax: 4,
        lerpSpeed: 0.08
      });
    }

    var subtitle = document.querySelector('.latest-section .section-title p');
    if (subtitle) {
      initProximityText(subtitle, {
        maxRadius: 180,
        weightDelta: 150,
        scaleMax: 1.06,
        spacingMax: 2,
        lerpSpeed: 0.08
      });
    }

    var tabs = document.querySelectorAll('.latest-tab');
    for (var i = 0; i < tabs.length; i++) {
      initProximityText(tabs[i], {
        maxRadius: 140,
        weightDelta: 200,
        scaleMax: 1.1,
        spacingMax: 2.5,
        lerpSpeed: 0.08
      });
    }

    var section = document.querySelector('.latest-section');
    if (section) {
      section.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        startAnimation();
      });

      section.addEventListener('mouseleave', function () {
        mouseX = -9999;
        mouseY = -9999;
        startAnimation();
      });
    }
  });
})();

/* ============ LIGHT PILLAR ============ */
(function () {
  'use strict';

  function LightPillar(canvasEl, opts) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.parent = canvasEl.parentElement;
    this.time = 0;
    this.raf = null;
    this.noiseTexture = null;
    this.w = 0;
    this.h = 0;

    this.opts = {
      topColor: (opts && opts.topColor) || '#5227FF',
      bottomColor: (opts && opts.bottomColor) || '#FF9FFC',
      intensity: (opts && opts.intensity) || 1,
      rotationSpeed: (opts && opts.rotationSpeed) || 0.3,
      glowAmount: (opts && opts.glowAmount) || 0.002,
      pillarWidth: (opts && opts.pillarWidth) || 3,
      pillarHeight: (opts && opts.pillarHeight) || 0.4,
      noiseIntensity: (opts && opts.noiseIntensity) || 0.5,
      pillarRotation: (opts && opts.pillarRotation) || 25,
      quality: (opts && opts.quality) || 'high'
    };

    this.topRGB = this.hexToRGB(this.opts.topColor);
    this.bottomRGB = this.hexToRGB(this.opts.bottomColor);

    this._resize = this.resize.bind(this);
    this._loop = this.loop.bind(this);

    this.init();
  }

  LightPillar.prototype = {
    init: function () {
      this.resize();
      window.addEventListener('resize', this._resize);
      this.loop();
    },

    resize: function () {
      var dpr = this.opts.quality === 'high' ? (window.devicePixelRatio || 1) : 1;
      this.w = this.parent.offsetWidth;
      this.h = this.parent.offsetHeight;
      this.canvas.width = this.w * dpr;
      this.canvas.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.noiseTexture = null;
    },

    loop: function () {
      this.time += 0.016;
      this.render();
      this.raf = requestAnimationFrame(this._loop);
    },

    render: function () {
      var ctx = this.ctx;
      var w = this.w;
      var h = this.h;
      var opts = this.opts;
      var top = this.topRGB;
      var bot = this.bottomRGB;

      ctx.clearRect(0, 0, w, h);

      var positions = [
        { x: w * -0.05, h: 1.3, w: 0.12 },
        { x: w * 0.12, h: 1.1, w: 0.09 },
        { x: w * 0.28, h: 1.25, w: 0.11 },
        { x: w * 0.45, h: 1.3, w: 0.10 },
        { x: w * 0.60, h: 1.15, w: 0.12 },
        { x: w * 0.75, h: 1.25, w: 0.09 },
        { x: w * 0.90, h: 1.3, w: 0.11 },
        { x: w * 1.05, h: 1.2, w: 0.10 }
      ];

      var baseAngle = opts.pillarRotation * Math.PI / 180;

      for (var i = 0; i < positions.length; i++) {
        var p = positions[i];
        var x = p.x;
        var pillarH = h * p.h;
        var pillarW = w * p.w;
        var angle = baseAngle * Math.sin(this.time * opts.rotationSpeed + i * 0.7);

        ctx.save();
        ctx.translate(x, h / 2);
        ctx.rotate(angle);

        ctx.shadowBlur = pillarW * 0.8 + 40;
        ctx.shadowColor = 'rgba(' + top.r + ',' + top.g + ',' + top.b + ',' + (opts.intensity * 0.4) + ')';

        var grad = ctx.createLinearGradient(0, -pillarH / 2, 0, pillarH / 2);
        grad.addColorStop(0, 'rgba(' + top.r + ',' + top.g + ',' + top.b + ',' + (opts.intensity * 0.5) + ')');
        grad.addColorStop(0.35, 'rgba(' +
          Math.round((top.r + bot.r) / 2) + ',' +
          Math.round((top.g + bot.g) / 2) + ',' +
          Math.round((top.b + bot.b) / 2) + ',' +
          (opts.intensity * 0.3) + ')');
        grad.addColorStop(0.65, 'rgba(' +
          Math.round((top.r + bot.r) / 2) + ',' +
          Math.round((top.g + bot.g) / 2) + ',' +
          Math.round((top.b + bot.b) / 2) + ',' +
          (opts.intensity * 0.3) + ')');
        grad.addColorStop(1, 'rgba(' + bot.r + ',' + bot.g + ',' + bot.b + ',' + (opts.intensity * 0.5) + ')');

        ctx.fillStyle = grad;
        ctx.fillRect(-pillarW / 2, -pillarH / 2, pillarW, pillarH);

        ctx.restore();
      }

      if (opts.noiseIntensity > 0) {
        this.drawNoise(ctx, w, h);
      }
    },

    drawNoise: function (ctx, w, h) {
      if (!this.noiseTexture) {
        var size = 128;
        var c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        var nctx = c.getContext('2d');
        var imgData = nctx.createImageData(size, size);
        var d = imgData.data;
        for (var i = 0; i < d.length; i += 4) {
          var v = Math.random() * 255;
          d[i] = v;
          d[i + 1] = v;
          d[i + 2] = v;
          d[i + 3] = 25;
        }
        nctx.putImageData(imgData, 0, 0);
        this.noiseTexture = c;
      }

      var pattern = ctx.createPattern(this.noiseTexture, 'repeat');
      ctx.globalAlpha = this.opts.noiseIntensity * 0.4;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
    },

    hexToRGB: function (hex) {
      return {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
      };
    },

    destroy: function () {
      cancelAnimationFrame(this.raf);
      window.removeEventListener('resize', this._resize);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('lightPillarCanvas');
    if (canvas) {
      new LightPillar(canvas, {
        topColor: '#5227FF',
        bottomColor: '#FF9FFC',
        intensity: 1,
        rotationSpeed: 0.3,
        glowAmount: 0.002,
        pillarWidth: 3,
        pillarHeight: 0.4,
        noiseIntensity: 0.5,
        pillarRotation: 25,
        quality: 'high'
      });
    }
  });
})();

/* ============ MEDIA GALLERY SLIDESHOW ============ */
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('mediaGallery');
  if (!container) return;

  var slides = container.querySelectorAll('.mg-slide');
  var dotsWrap = document.getElementById('mgDots');
  var prevBtn = container.querySelector('.mg-prev');
  var nextBtn = container.querySelector('.mg-next');
  var counterEl = document.getElementById('mgCurrent');
  var progressBar = document.getElementById('mgProgressBar');
  var current = 0;
  var timer = null;
  var progressTimer = null;
  var INTERVAL = 4500;

  function renderDots() {
    dotsWrap.innerHTML = '';
    for (var i = 0; i < slides.length; i++) {
      var d = document.createElement('button');
      d.className = 'mg-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', (function (idx) {
        return function () { goTo(idx); restart(); };
      })(i));
      dotsWrap.appendChild(d);
    }
  }

  function updateCounter() {
    if (counterEl) counterEl.textContent = current + 1;
  }

  function startProgress() {
    stopProgress();
    var w = 0;
    var step = 100 / (INTERVAL / 16);
    progressTimer = setInterval(function () {
      w += step;
      if (progressBar) progressBar.style.width = Math.min(w, 100) + '%';
    }, 16);
  }

  function stopProgress() {
    if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
    if (progressBar) progressBar.style.width = '0%';
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    var dots = dotsWrap.querySelectorAll('.mg-dot');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    updateCounter();
  }

  function nextSlide() { goTo(current + 1); }
  function prevSlide() { goTo(current - 1); }

  function start() { stop(); timer = setInterval(nextSlide, INTERVAL); startProgress(); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } stopProgress(); }
  function restart() { start(); }

  if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); restart(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); restart(); });

  container.addEventListener('mouseenter', stop);
  container.addEventListener('mouseleave', start);

  var touchStartX = 0;
  var viewport = container.querySelector('.mg-viewport');
  if (viewport) {
    viewport.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      stop();
    }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide(); else prevSlide();
      }
      start();
    }, { passive: true });
  }

  document.addEventListener('keydown', function (e) {
    if (!container.getBoundingClientRect) return;
    var rect = container.getBoundingClientRect();
    var visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;
    if (e.key === 'ArrowLeft') { prevSlide(); restart(); }
    if (e.key === 'ArrowRight') { nextSlide(); restart(); }
  });

  renderDots();
  updateCounter();
  start();
});
