// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initMobileMenu();
    initDropdownMenu();
    initCarousels();
    initPropertyFilters();
    initTestimonials();
    initSmoothScrolling();
    initFormHandling();
    initScrollEffects();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavCloseBtn = document.querySelector('.mobile-nav-close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    // Open mobile menu
    if (navToggle && mobileNavOverlay) {
        navToggle.addEventListener('click', function () {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            navToggle.classList.add('active');
        });
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.classList.remove('active');
    }

    if (mobileNavCloseBtn) {
        mobileNavCloseBtn.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function (e) {
            if (e.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Close menu when clicking on a link
    mobileNavLinks.forEach((link) => {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    // Mobile dropdown functionality
    mobileDropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.mobile-dropdown-toggle');

        if (toggle) {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
}

// Dropdown Menu Toggle
function initDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            // Close dropdown when clicking outside
            document.addEventListener('click', function (e) {
                if (!dropdown.contains(e.target)) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }
            });

            // Toggle dropdown on click (for mobile)
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const isOpen = menu.style.opacity === '1';

                if (isOpen) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                } else {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            });
        }
    });
}

// Featured Properties Carousel
function initCarousels() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (carouselTrack && carouselSlides.length > 0) {
        let currentSlide = 0;
        const totalSlides = carouselSlides.length;

        function updateCarousel() {
            const translateX = -currentSlide * 100;
            carouselTrack.style.transform = `translateX(${translateX}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto-play carousel
        setInterval(nextSlide, 5000);
    }
}

// Property Filters
function initPropertyFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach((b) => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            propertyCards.forEach((card) => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });

            // Show notification
            const categoryText =
                category === 'all'
                    ? 'All properties'
                    : category.charAt(0).toUpperCase() + category.slice(1) + ' properties';
            showNotification(`Showing ${categoryText}`, 'info');
        });
    });
}

// Testimonials Carousel
function initTestimonials() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (testimonialSlides.length > 0) {
        let currentTestimonial = 0;
        const totalTestimonials = testimonialSlides.length;

        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

        // Initialize first testimonial
        showTestimonial(0);

        // Auto-play testimonials
        setInterval(nextTestimonial, 6000);
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    // Lead Generation Form
    const leadForm = document.querySelector('.lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formObject = {};

            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Simulate form submission
            showNotification('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                showNotification('뉴스레터 구독이 완료되었습니다!', 'success');
                this.reset();
            }
        });
    }

    // Search Form
    const searchForm = document.querySelector('.search-box');
    if (searchForm) {
        const searchBtn = searchForm.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();

                const location = searchForm.querySelector('input[type="text"]').value;
                const propertyType = searchForm.querySelector('select').value;

                if (location) {
                    showNotification(`${location} 지역의 ${propertyType} 매물을 검색합니다...`, 'info');
                } else {
                    showNotification('검색할 지역을 입력해주세요.', 'warning');
                }
            });
        }
    }
}

// Scroll Effects
function initScrollEffects() {
    // Header background change on scroll
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.property-card, .agent-card, .news-card, .trending-card');
    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach((notification) => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
            type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : type === 'error' ? '#F44336' : '#2196F3'
        };
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.7s ease;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Property Search Enhancement
function enhancePropertySearch() {
    const searchInput = document.querySelector('.search-box input[type="text"]');
    const propertyCards = document.querySelectorAll('.property-card, .property-item');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.toLowerCase();

            propertyCards.forEach((card) => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const location = card.querySelector('.property-location, .location').textContent.toLowerCase();

                if (title.includes(searchTerm) || location.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Initialize enhanced search
document.addEventListener('DOMContentLoaded', enhancePropertySearch);

// Hero Tab Functionality
function initHeroTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            // Remove active class from all tabs
            tabBtns.forEach((tab) => tab.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Get the tab data
            const tabType = this.getAttribute('data-tab');
            console.log('Selected tab:', tabType);

            // Here you can add logic to filter content based on tab
            // For now, we'll just show a notification
            showNotification(`Showing ${tabType} properties`, 'info');
        });
    });
}

// Initialize hero tabs
document.addEventListener('DOMContentLoaded', initHeroTabs);

// Featured Property Dots Navigation
function initFeaturedPropertyDots() {
    const dots = document.querySelectorAll('.property-dots .dot');

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            // Remove active class from all dots
            dots.forEach((d) => d.classList.remove('active'));
            // Add active class to clicked dot
            this.classList.add('active');

            // Here you can add logic to change the property content
            // For now, we'll just show a notification
            showNotification(`Viewing property ${index + 1}`, 'info');
        });
    });
}

// Initialize featured property dots
document.addEventListener('DOMContentLoaded', initFeaturedPropertyDots);

// Agents Carousel
function initAgentsCarousel() {
    const track = document.querySelector('.agents-track');
    const prevBtn = document.querySelector('.agent-prev');
    const nextBtn = document.querySelector('.agent-next');
    const cards = document.querySelectorAll('.agent-card');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cardWidth = 320; // 300px + 20px gap
    const visibleCards = 3;
    const maxIndex = Math.max(0, cards.length - visibleCards);

    function updateCarousel() {
        const translateX = -currentIndex * cardWidth;
        track.style.transform = `translateX(${translateX}px)`;

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Initialize
    updateCarousel();

    // Auto-play carousel
    setInterval(nextSlide, 4000);
}

// Initialize agents carousel
document.addEventListener('DOMContentLoaded', initAgentsCarousel);

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // In a real application, you would replace with actual image URLs
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach((img) => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2c5aa0;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.background = '#1e3f73';
        backToTopBtn.style.transform = 'scale(1.1)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.background = '#2c5aa0';
        backToTopBtn.style.transform = 'scale(1)';
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initBackToTop);
