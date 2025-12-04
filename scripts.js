// Basic theme toggle, parallax hero, and scroll reveal animations
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');

  // 1) Initial theme detection: prefer saved -> system -> dark
  const saved = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'light') root.classList.add('light-theme');
  else if (!saved && !prefersDark) root.classList.add('light-theme');

  // 2) Theme toggle
  themeToggle.addEventListener('click', () => {
    const isLight = root.classList.toggle('light-theme');
    localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
  });

  // 3) Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 4) Parallax hero background (subtle)
  const parallaxEl = document.querySelector('[data-parallax]');
  function handleParallax() {
    if (!parallaxEl) return;
    const scrolled = window.scrollY;
    // move background slightly (slower than scroll)
    parallaxEl.style.setProperty('--py', `${scrolled * 0.15}px`);
    // move before pseudo-element using transform on ::before (we set transform via JS)
    const bg = parallaxEl.querySelector('::before');
    // Instead we directly set transform on element's ::before using inline style to the hero element:
    parallaxEl.style.transform = `translateY(${scrolled * -0.02}px)`;
    // NB: main visual effect is driven via CSS filter and hero::before transform in CSS
  }
  window.addEventListener('scroll', handleParallax, { passive: true });

  // 5) Scroll reveal using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal, .reveal-grid > *');
  const obsOpts = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.08 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('reveal-grid')) {
          // reveal children sequentially
          const children = Array.from(entry.target.children);
          children.forEach((ch, i) => setTimeout(() => ch.classList.add('is-visible'), i * 80));
        } else {
          entry.target.classList.add('is-visible');
        }
        // optionally unobserve
        observer.unobserve(entry.target);
      }
    });
  }, obsOpts);

  revealElements.forEach(el => observer.observe(el));

  // 6) Fancy gallery tilt effect on mouse move (for desktop)
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * 6; // rotateX
      const ry = (px - 0.5) * -6; // rotateY
      item.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // Accessibility: allow keyboard reveal on focus
  const focusables = document.querySelectorAll('a, button, input, textarea');
  focusables.forEach(f => {
    f.addEventListener('focus', (e) => {
      if (e.target.classList.contains('is-visible') === false) {
        e.target.classList.add('is-visible');
      }
    });
  });
})();
