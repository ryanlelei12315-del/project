/* ====== MultiverseCare — Main Application Script ====== */
document.addEventListener('DOMContentLoaded', () => {

  // ====== NAVBAR SCROLL EFFECT ======
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ====== MOBILE NAV TOGGLE ======
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ====== ACTIVE NAV LINK HIGHLIGHT ======
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinkEls.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ====== SCROLL ANIMATIONS ======
  const animateEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  animateEls.forEach(el => observer.observe(el));

  // ====== COUNTER ANIMATION ======
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current.toLocaleString();
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target.toLocaleString();
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => counterObserver.observe(el));

  // ====== TESTIMONIALS CAROUSEL ======
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    let slidesPerView = 3;
    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    const updateSlidesPerView = () => {
      if (window.innerWidth <= 768) slidesPerView = 1;
      else if (window.innerWidth <= 1024) slidesPerView = 2;
      else slidesPerView = 3;
    };

    const maxSlide = () => Math.max(0, totalCards - slidesPerView);

    const renderDots = () => {
      dotsContainer.innerHTML = '';
      const count = maxSlide() + 1;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === currentSlide ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    };

    const goTo = (index) => {
      currentSlide = Math.max(0, Math.min(index, maxSlide()));
      const cardWidth = cards[0].offsetWidth + 28; // card width + gap
      track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
      renderDots();
    };

    prevBtn.addEventListener('click', () => goTo(currentSlide - 1));
    nextBtn.addEventListener('click', () => goTo(currentSlide + 1));

    updateSlidesPerView();
    renderDots();

    window.addEventListener('resize', () => {
      updateSlidesPerView();
      goTo(Math.min(currentSlide, maxSlide()));
    });

    // Auto-play
    let autoplay = setInterval(() => {
      goTo(currentSlide >= maxSlide() ? 0 : currentSlide + 1);
    }, 5000);

    track.closest('.testimonials-carousel').addEventListener('mouseenter', () => clearInterval(autoplay));
    track.closest('.testimonials-carousel').addEventListener('mouseleave', () => {
      autoplay = setInterval(() => {
        goTo(currentSlide >= maxSlide() ? 0 : currentSlide + 1);
      }, 5000);
    });
  }

  // ====== SMOOTH SCROLL FOR ALL ANCHOR LINKS ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});