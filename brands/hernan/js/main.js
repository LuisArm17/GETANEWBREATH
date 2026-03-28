/* ===== MAIN.JS — HERNÁN MASAJISTA FUNCIONAL ===== */

document.addEventListener('DOMContentLoaded', async () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ── Load data ──────────────────────────────
  let data;
  try {
    const res = await fetch('/data/hernan.json');
    data = await res.json();
  } catch(e) {
    console.warn('Using inline data fallback');
    data = window.HERNAN_DATA || {};
  }

  // ── Core init (counters, progress bar, videos) ──
  coreInit();

  // ── Hero entrance animation ──────────────────
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .from('.hero__eyebrow', { opacity: 0, x: -30, duration: 0.8, ease: 'power3.out' })
    .from('.hero__title', { opacity: 0, y: 60, duration: 1.2, ease: 'power3.out' }, '-=0.4')
    .from('.hero__subtitle', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' }, '-=0.7')
    .from('.hero__cta', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .from('.hero__scroll-hint', { opacity: 0, duration: 0.8 }, '-=0.2');

  // ── About section pin + parallax ─────────────
  const aboutSection = document.querySelector('.about-section');
  if (aboutSection) {
    gsap.from('.about-grid', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 70%',
        once: true
      }
    });
  }

  // ── Science stats stagger ────────────────────
  gsap.from('.science-stat', {
    opacity: 0,
    y: 40,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.science-stats-grid',
      start: 'top 80%',
      once: true
    }
  });

  gsap.from('.science-effects-list li', {
    opacity: 0,
    x: -30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.science-effects-list',
      start: 'top 80%',
      once: true
    }
  });

  gsap.from('.science-quote-box', {
    opacity: 0,
    x: 30,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.science-quote-box',
      start: 'top 80%',
      once: true
    }
  });

  // ── Benefits stagger ─────────────────────────
  gsap.from('.benefit-item', {
    opacity: 0,
    y: 30,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.benefits-grid',
      start: 'top 80%',
      once: true
    }
  });

  // ── Video cards stagger ──────────────────────
  gsap.from('.video-card', {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.videos-grid',
      start: 'top 80%',
      once: true
    }
  });

  // ── Reviews stagger ──────────────────────────
  gsap.from('.review-item', {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.reviews-grid',
      start: 'top 80%',
      once: true
    }
  });

  // ── Services stagger ─────────────────────────
  gsap.from('.service-card', {
    opacity: 0,
    x: -30,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
      once: true
    }
  });

  // ── Chart init with Chart.js ─────────────────
  const chartCanvas = document.getElementById('growthChart');
  if (chartCanvas && data.growth_chart) {
    let chartInited = false;
    ScrollTrigger.create({
      trigger: chartCanvas,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (chartInited) return;
        chartInited = true;

        const ctx = chartCanvas.getContext('2d');

        // Animated data fill
        const animatedClients = new Array(data.growth_chart.clients.length).fill(0);
        const animatedReviews = new Array(data.growth_chart.reviews.length).fill(0);

        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.growth_chart.labels,
            datasets: [
              {
                label: 'Clientes atendidos',
                data: animatedClients,
                borderColor: '#c8a96e',
                backgroundColor: 'rgba(200,169,110,0.08)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#c8a96e',
                pointRadius: 5,
                pointHoverRadius: 8,
                borderWidth: 2
              },
              {
                label: 'Reseñas Google',
                data: animatedReviews,
                borderColor: '#8aab96',
                backgroundColor: 'rgba(138,171,150,0.05)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8aab96',
                pointRadius: 5,
                pointHoverRadius: 8,
                borderWidth: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 },
            plugins: {
              legend: {
                labels: {
                  color: 'rgba(244,240,232,0.6)',
                  font: { family: "'DM Sans', sans-serif", size: 12 },
                  padding: 20
                }
              },
              tooltip: {
                backgroundColor: '#0e0e0e',
                borderColor: 'rgba(200,169,110,0.3)',
                borderWidth: 1,
                titleColor: '#c8a96e',
                bodyColor: 'rgba(244,240,232,0.8)',
                padding: 12
              }
            },
            scales: {
              x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: 'rgba(244,240,232,0.4)', font: { family: "'DM Sans', sans-serif" } }
              },
              y: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: 'rgba(244,240,232,0.4)', font: { family: "'DM Sans', sans-serif" } },
                beginAtZero: true
              }
            }
          }
        });

        // Animate the line drawing
        const targetClients = data.growth_chart.clients;
        const targetReviews = data.growth_chart.reviews;
        let progress = 0;
        const steps = 60;

        const animChart = () => {
          progress++;
          const t = progress / steps;
          const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

          chart.data.datasets[0].data = targetClients.map(v => Math.round(v * ease));
          chart.data.datasets[1].data = targetReviews.map(v => Math.round(v * ease));
          chart.update('none');

          if (progress < steps) requestAnimationFrame(animChart);
        };
        requestAnimationFrame(animChart);
      }
    });
  }

  // ── KPI pinned section ───────────────────────
  const kpiSection = document.querySelector('.kpi-section');
  if (kpiSection) {
    ScrollTrigger.create({
      trigger: kpiSection,
      start: 'top top',
      end: '+=300',
      pin: true,
      scrub: 1,
      pinSpacing: true
    });
  }

  // ── Closing section animation ─────────────────
  const closingSection = document.querySelector('.closing-section');
  if (closingSection) {
    const closingTl = gsap.timeline({
      scrollTrigger: {
        trigger: closingSection,
        start: 'top 70%',
        once: true
      }
    });

    closingTl
      .to('.closing-logo', { opacity: 1, duration: 0.8, ease: 'power2.out' })
      .from('.closing-title', { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' }, '-=0.3')
      .from('.closing-subtitle', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .from('.closing-cta', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }

  // ── Nav active link on scroll ─────────────────
  const sections = document.querySelectorAll('[data-nav]');
  const navLinks = document.querySelectorAll('.nav__links a');

  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => updateNavLink(section.dataset.nav),
      onEnterBack: () => updateNavLink(section.dataset.nav)
    });
  });

  function updateNavLink(id) {
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + id
        ? 'var(--c-accent)'
        : 'var(--c-text-muted)';
    });
  }

  // ── Instagram link handler ────────────────────
  document.querySelectorAll('[data-ig-link]').forEach(el => {
    el.addEventListener('click', () => {
      window.open('https://www.instagram.com/hernan.masajistafuncional/', '_blank');
    });
  });

  // ── Parallax on hero image ────────────────────
  const heroBgImg = document.querySelector('.hero__bg-img');
  if (heroBgImg) {
    gsap.to(heroBgImg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

});
