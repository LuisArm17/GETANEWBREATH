/* ===== CORE.JS — SHARED JAVASCRIPT ===== */

/**
 * Animated counter using GSAP
 * @param {Element} el - element with data-count attribute
 * @param {string} suffix - optional suffix like '%', 'k', '+'
 */
function animateCounter(el, duration = 2) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;

  gsap.fromTo(
    { val: 0 },
    { val: target, duration, ease: 'power2.out',
      onUpdate: function () {
        el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix;
      }
    }
  );
}

/**
 * Init all counters when they enter viewport
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => animateCounter(el)
    });
  });
}

/**
 * Progress bar update
 */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  gsap.to(bar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
}

/**
 * Video autoplay on viewport enter, pause on exit
 */
function initVideoAutoplay() {
  const videos = document.querySelectorAll('.phone__screen video, .autoplay-video');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.3 });

  videos.forEach(v => {
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    observer.observe(v);
  });
}

/**
 * Card hover videos
 */
function initCardHoverVideos() {
  document.querySelectorAll('.card').forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  });
}

/**
 * Standard section fade-up animations
 */
function initSectionAnimations() {
  gsap.utils.toArray('.gsap-fade-up').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  gsap.utils.toArray('.gsap-fade-in').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  gsap.utils.toArray('.gsap-scale-in').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });
}

/**
 * Stagger children animations
 */
function initStagger(selector, childSelector, staggerTime = 0.12) {
  gsap.utils.toArray(selector).forEach(container => {
    const children = container.querySelectorAll(childSelector);
    gsap.from(children, {
      opacity: 0,
      y: 30,
      stagger: staggerTime,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true
      }
    });
  });
}

/**
 * Tabs component
 */
function initTabs(containerSelector) {
  document.querySelectorAll(containerSelector).forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels  = container.querySelectorAll('.tab-panel');

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        panels[i].classList.add('active');
      });
    });

    // Activate first
    if (buttons[0]) { buttons[0].classList.add('active'); panels[0].classList.add('active'); }
  });
}

/**
 * Core init — call from each presentation's main.js
 */
function coreInit() {
  gsap.registerPlugin(ScrollTrigger);
  initProgressBar();
  initCounters();
  initVideoAutoplay();
  initCardHoverVideos();
  initSectionAnimations();
}
