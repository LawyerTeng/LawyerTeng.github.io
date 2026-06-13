document.addEventListener('DOMContentLoaded', () => {
  // ====== Scroll: Nav shadow & active link ======
  const nav = document.querySelector('.nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  // ====== Smooth scroll for nav links ======
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu
        document.querySelector('.nav-links').classList.remove('open');
      }
    });
  });

  // CTA button scroll
  const ctaBtn = document.querySelector('.hero-cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ====== Mobile menu ======
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const navMenu = document.querySelector('.nav-links');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // ====== Scroll-triggered fade-in ======
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});
