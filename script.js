// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar(); // Initial check

// ========== Mobile Menu ==========
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== Scroll Reveal Animations ==========
const revealElements = document.querySelectorAll(
    '.offering-card, .testimonial-card, .gallery-item, .story-content, .story-images, .contact-info, .contact-images, .section-header'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    }
);

revealElements.forEach(el => observer.observe(el));

// ========== Parallax Effect on Promise Section ==========
const promiseSection = document.querySelector('.promise');
const promiseBg = document.querySelector('.promise-background img');

if (promiseSection && promiseBg) {
    window.addEventListener('scroll', () => {
        const rect = promiseSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
            const yOffset = scrollPercent * 80 - 20;
            promiseBg.style.transform = `translateY(${yOffset}px) scale(1.05)`;
        }
    }, { passive: true });
}

// ========== Gallery Image Hover ==========
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const img = item.querySelector('img');
        if (img) {
            img.style.transform = `scale(1.06) translate(${x * 8}px, ${y * 8}px)`;
        }
    });

    item.addEventListener('mouseleave', (e) => {
        const img = e.currentTarget.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});
