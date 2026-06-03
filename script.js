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

// Create mobile backdrop
const mobileBackdrop = document.createElement('div');
mobileBackdrop.className = 'mobile-backdrop';
document.body.appendChild(mobileBackdrop);

function openMobileMenu() {
    mobileToggle.classList.add('active');
    navLinks.classList.add('active');
    mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
    mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileBackdrop.addEventListener('click', closeMobileMenu);

// Close menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ========== Scroll Reveal Animations ==========
const revealElements = document.querySelectorAll(
    '.menu-item, .testimonial-card, .gallery-item, .story-content, .story-images, .contact-info, .contact-images, .section-header'
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

// ========== Menu Tab Switching ==========
const menuTabs = document.querySelectorAll('.menu-tab');
const menuContents = document.querySelectorAll('.menu-tab-content');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        menuContents.forEach(c => c.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

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
