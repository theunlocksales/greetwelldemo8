/* =====================================================
   GREETWELL - PREMIUM JAVASCRIPT
   Award-Winning Interactions & Animations
   ===================================================== */

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.elegant-preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 2500);
});

// ===== NAVIGATION =====
const nav = document.querySelector('.premium-nav');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-navigation');
const navItems = document.querySelectorAll('.nav-item');

// Sticky Navigation
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');

        // Animate hamburger
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu on link click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== HERO SLIDER WITH AUTO-ZOOM =====
const heroSlides = document.querySelectorAll('.hero-slide');
const heroControls = document.querySelector('.hero-controls');
const prevBtn = heroControls.querySelector('.prev');
const nextBtn = heroControls.querySelector('.next');
const indicatorsContainer = heroControls.querySelector('.slide-indicators');

let currentSlideIndex = 0;
let heroInterval;
const slideDuration = 10000; // 10 seconds per slide

// Create indicators
heroSlides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: rgba(201, 169, 97, 0.3);
        border: 2px solid var(--gold-primary);
        cursor: pointer;
        transition: all 0.4s ease;
    `;

    if (index === 0) {
        indicator.style.background = 'var(--gold-primary)';
        indicator.style.transform = 'scale(1.3)';
    }

    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

const indicators = indicatorsContainer.querySelectorAll('div');

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.style.background = 'var(--gold-primary)';
            indicator.style.transform = 'scale(1.3)';
        } else {
            indicator.style.background = 'rgba(201, 169, 97, 0.3)';
            indicator.style.transform = 'scale(1)';
        }
    });
}

function showSlide(index) {
    // Remove active class from all slides
    heroSlides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Update current index
    currentSlideIndex = (index + heroSlides.length) % heroSlides.length;

    // Add active class to current slide
    heroSlides[currentSlideIndex].classList.add('active');

    // Reset and restart zoom animation
    const slideBg = heroSlides[currentSlideIndex].querySelector('.slide-bg');
    slideBg.style.animation = 'none';
    setTimeout(() => {
        slideBg.style.animation = 'heroZoom 10s ease-out forwards';
    }, 10);

    // Animate content
    const contentBox = heroSlides[currentSlideIndex].querySelector('.hero-content-box');
    const elements = contentBox.querySelectorAll('.hero-label, .hero-headline, .hero-subline, .hero-cta');
    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        setTimeout(() => {
            el.style.transition = 'all 1s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 * (i + 1));
    });

    updateIndicators();
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function goToSlide(index) {
    showSlide(index);
    resetHeroInterval();
}

function resetHeroInterval() {
    clearInterval(heroInterval);
    heroInterval = setInterval(nextSlide, slideDuration);
}

// Button controls
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetHeroInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetHeroInterval();
});

// Auto-advance slides
heroInterval = setInterval(nextSlide, slideDuration);

// Pause on hover
const heroMaster = document.querySelector('.hero-master');
heroMaster.addEventListener('mouseenter', () => clearInterval(heroInterval));
heroMaster.addEventListener('mouseleave', () => {
    heroInterval = setInterval(nextSlide, slideDuration);
});

// ===== SCROLL ANIMATIONS (AOS) =====
class ScrollAnimations {
    constructor() {
        this.items = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.items.forEach(item => {
            this.observer.observe(item);
        });
    }
}

// Initialize scroll animations
new ScrollAnimations();

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== PARALLAX EFFECTS =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for fixed backgrounds
    const parallaxBgs = document.querySelectorAll('.reach-bg');
    parallaxBgs.forEach(bg => {
        if (bg) {
            const rect = bg.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    });
});

// ===== LUXURY CARD HOVER EFFECTS =====
const luxuryCards = document.querySelectorAll('.luxury-card, .advantage-card');

luxuryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== COUNTER ANIMATIONS =====
const counterElements = document.querySelectorAll('.stat-value, .badge-number');

function animateCounter(element) {
    const target = element.textContent;
    const hasPlus = target.includes('+');
    const hasPercent = target.includes('%');
    const hasK = target.includes('K');

    let numericValue = parseInt(target.replace(/[^0-9]/g, ''));

    if (hasK) {
        numericValue = numericValue * 1000;
    }

    let current = 0;
    const increment = numericValue / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const counter = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(counter);
        }

        let displayValue = Math.floor(current);
        if (hasK) {
            displayValue = (displayValue / 1000) + 'K';
        }
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';

        element.textContent = displayValue;
    }, stepTime);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterElements.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== VIDEO PLAY BUTTON =====
const videoPlayBtn = document.querySelector('.video-play-btn');
if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', () => {
        alert('Video functionality can be integrated here!\nConnect with your video URL or embed code.');
    });
}

// ===== QUOTE BUTTON =====
const quoteBtn = document.querySelector('.quote-btn');
if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
}

// ===== SPLIT SECTION IMAGE ANIMATIONS =====
const splitImages = document.querySelectorAll('.split-image img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, { threshold: 0.2 });

splitImages.forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    imageObserver.observe(img);
});

// ===== STAGGER ANIMATIONS =====
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Apply stagger animations
staggerAnimation('.highlight-item', 150);
staggerAnimation('.continent-item', 200);

// ===== CURSOR TRAIL EFFECT =====
const cursorTrail = [];
const trailLength = 8;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===== PAGE TRANSITION =====
const pageLinks = document.querySelectorAll('a[href$=".html"]');

pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && !this.target) {
            e.preventDefault();
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});

// Fade in on page load
document.body.style.opacity = '0';
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-dependent code here
}, 100));

// ===== LAZY LOADING IMAGES =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageLoadObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageLoadObserver.observe(img));

// ===== ACCESSIBILITY =====
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }
});

// Focus management
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('.modal');

if (modal) {
    const firstFocusable = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusable = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== CONSOLE BRANDING =====
console.log('%c🌾 GREETWELL', 'color: #C9A961; font-size: 32px; font-weight: bold; font-family: Cinzel, serif;');
console.log('%cPremium Vegetables & Turmeric Export', 'color: #2C2C2E; font-size: 16px; font-family: Raleway, sans-serif;');
console.log('%c✨ Excellence in Every Harvest', 'color: #A68948; font-size: 14px; font-style: italic;');
console.log('%cWebsite crafted for export excellence', 'color: #666; font-size: 12px;');

// ===== INITIALIZE =====
console.log('✓ Premium website initialized');
console.log('✓ All animations loaded');
console.log('✓ Interactive features ready');
console.log('✓ Mobile responsive enabled');

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollAnimations,
        debounce,
        throttle
    };
}