/* ====== MultiverseCare — Main Application Script ====== */
// Add class immediately (synchronous) so CSS animations can target .js-enabled
document.documentElement.classList.add('js-enabled');

const API_BASE_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize standard UI effects
    initNavbar();
    initSmoothScroll();
    
    // Fetch dynamic content and then initialize animations/carousel
    loadDynamicContent();
});

// ====== GLOBAL UI INITIALIZATION ======

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

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
    highlightNav();
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ====== DYNAMIC CONTENT FETCHING ======

async function loadDynamicContent() {
    try {
        // Parallel fetch for speed
        const [servicesRes, testimonialsRes] = await Promise.all([
            fetch(`${API_BASE_URL}/services`),
            fetch(`${API_BASE_URL}/testimonials`)
        ]);

        const servicesData = await servicesRes.json();
        const testimonialsData = await testimonialsRes.json();

        if (servicesData.success) renderServices(servicesData.data);
        if (testimonialsData.success) renderTestimonials(testimonialsData.data);

        // After content is in DOM, initialize observers and carousel
        initScrollAnimations();
        initStatsCounter();
        initTestimonialCarousel();
        initBookingForm(servicesData.data || []);

    } catch (error) {
        console.error('Error loading dynamic content:', error);
        showToast('Connection to server failed. Using offline mode.', 'error');
        // If API fails, we could potentially load local fallbacks here if desired
    }
}

function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    // Icon mapping based on service title keywords
    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('cardio')) return 'fa-heart-pulse';
        if (t.includes('neuro')) return 'fa-brain';
        if (t.includes('ortho')) return 'fa-bone';
        if (t.includes('pediat')) return 'fa-baby';
        if (t.includes('derm')) return 'fa-hand-dots';
        if (t.includes('onco')) return 'fa-ribbon';
        return 'fa-stethoscope';
    };

    grid.innerHTML = services.map((s, index) => `
        <div class="service-card" data-animate="fade-up" data-delay="${index * 100}">
            <div class="service-icon"><i class="fa-solid ${getIcon(s.title)}"></i></div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <a href="#contact" class="service-link">Learn More <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    `).join('');
}

function renderTestimonials(testimonials) {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;

    track.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="testimonial-stars">
                ${Array(5).fill(0).map((_, i) => `<i class="fa-solid fa-star${i >= (t.rating || 5) ? '-half-stroke' : ''}"></i>`).join('')}
            </div>
            <blockquote>"${t.message}"</blockquote>
            <div class="testimonial-author">
                <div class="author-avatar" style="background: var(--secondary)">
                    ${t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <strong>${t.name}</strong>
                    <span>Patient Story</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ====== BOOKING FORM LOGIC ======

function initBookingForm(services) {
    const form = document.getElementById('bookingForm');
    const serviceSelect = document.getElementById('service');
    
    if (serviceSelect && services.length > 0) {
        serviceSelect.innerHTML = '<option value="" disabled selected>Choose a specialty</option>' + 
            services.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
    }

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBookingBtn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                showToast('Appointment booked successfully!', 'success');
                form.reset();
            } else {
                showToast(result.errors ? result.errors.join(', ') : 'Booking failed', 'error');
            }
        } catch (error) {
            showToast('Unable to reach the server. Please try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// ====== UI COMPONENT LOGIC ======

function initScrollAnimations() {
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
}

function initStatsCounter() {
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
}

function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    let slidesPerView = 3;
    const cards = track.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    if (totalCards === 0) return;

    const updateSlidesPerView = () => {
        if (window.innerWidth <= 768) slidesPerView = 1;
        else if (window.innerWidth <= 1024) slidesPerView = 2;
        else slidesPerView = 3;
    };

    const maxSlide = () => Math.max(0, totalCards - slidesPerView);

    const renderDots = () => {
        if (!dotsContainer) return;
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
        if (cards.length > 0) {
            const cardStyle = window.getComputedStyle(cards[0]);
            const cardWidth = cards[0].offsetWidth + parseFloat(cardStyle.marginLeft || 0) + parseFloat(cardStyle.marginRight || 0);
            track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
            renderDots();
        }
    };

    prevBtn.addEventListener('click', () => goTo(currentSlide - 1));
    nextBtn.addEventListener('click', () => goTo(currentSlide + 1));

    updateSlidesPerView();
    renderDots();
    goTo(0);

    window.addEventListener('resize', () => {
        updateSlidesPerView();
        goTo(Math.min(currentSlide, maxSlide()));
    });
}

// ====== NOTIFICATION UTILITY ======

function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}