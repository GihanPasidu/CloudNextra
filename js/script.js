// script.js for CloudNextra Solutions website with Professional Animations

// Form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and effects
    initAnimations();
    initScrollAnimations();
    init3DScrollAnimations();
    initMagneticButtons();
    initTiltEffects();
    initTypingEffect();
    
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Add loading state to button
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.classList.add('btn-loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('btn-loading');
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    // Mobile menu improvements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
                navbarCollapse.classList.remove('show');
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }

    // Touch device optimizations
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');

        // Add active state for touch devices
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('active');
            });

            button.addEventListener('touchend', function() {
                this.classList.remove('active');
            });
        });
    }

    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                this.setAttribute('inputmode', 'text');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced card hover effects with touch support
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Add reveal animation
        card.classList.add('reveal');
        
        if ('ontouchstart' in window) {
            // Touch device interactions
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        } else {
            // Desktop hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });

    // Navbar scroll effect with performance optimization
    let ticking = false;
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Viewport height fix for mobile browsers
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Initialize entrance animations
function initAnimations() {
    const elements = document.querySelectorAll('.card, .text-center h2, .text-center .lead, .btn-lg');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        element.style.transitionDelay = `${index * 0.1}s`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// 3D Scroll-triggered animations
function init3DScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add 3D reveal classes to elements
    document.querySelectorAll('.card').forEach((card, index) => {
        const revealTypes = ['reveal-3d', 'reveal-3d-left', 'reveal-3d-right', 'reveal-3d-flip', 'reveal-3d-cube'];
        const randomType = revealTypes[index % revealTypes.length];
        card.classList.add(randomType);
        observer.observe(card);
    });

    // Add 3D parallax effects to sections
    document.querySelectorAll('section').forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('parallax-3d');
        }
    });

    // Add depth layers to various elements
    document.querySelectorAll('h1, h2, h3').forEach((heading, index) => {
        heading.classList.add(`depth-layer-${Math.min(index % 5 + 1, 5)}`);
    });
}

// Optimized Magnetic button effect with performance improvements
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-outline-primary, .magnetic-btn');
    
    buttons.forEach(button => {
        button.classList.add('magnetic-btn');
        let animationId = null;
        let isHovering = false;
        
        // Throttled mouse move handler for better performance
        const throttledMouseMove = throttle((e) => {
            if (!isHovering) return;
            
            // Cancel previous animation frame
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            animationId = requestAnimationFrame(() => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Use CSS custom properties for better performance
                button.style.setProperty('--mouse-x', `${x * 0.08}px`); // Reduced intensity
                button.style.setProperty('--mouse-y', `${y * 0.08}px`); // Reduced intensity
                button.style.transform = `translate(var(--mouse-x, 0), var(--mouse-y, 0)) scale(1.03)`; // Reduced scale
            });
        }, 16); // ~60 FPS
        
        button.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        button.addEventListener('mousemove', throttledMouseMove);
        
        button.addEventListener('mouseleave', () => {
            isHovering = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            button.style.setProperty('--mouse-x', '0');
            button.style.setProperty('--mouse-y', '0');
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Optimized Tilt effect for cards with performance improvements
function initTiltEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.classList.add('tilt-effect');
        let animationId = null;
        let isHovering = false;
        
        // Throttled mouse move handler for better performance
        const throttledMouseMove = throttle((e) => {
            if (!isHovering) return;
            
            // Throttle using requestAnimationFrame
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            animationId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Reduce calculation complexity and intensity
                const rotateX = (y - centerY) / 20; // Enhanced 3D effect
                const rotateY = (centerX - x) / 20; // Enhanced 3D effect
                const translateZ = Math.abs(rotateX) + Math.abs(rotateY); // Add depth based on rotation
                
                // Use CSS custom properties with enhanced 3D
                card.style.setProperty('--tilt-x', `${rotateX}deg`);
                card.style.setProperty('--tilt-y', `${rotateY}deg`);
                card.style.setProperty('--tilt-z', `${translateZ * 2}px`);
                card.style.transform = `perspective(1000px) rotateX(var(--tilt-x, 0)) rotateY(var(--tilt-y, 0)) translateZ(var(--tilt-z, 0))`;
            });
        }, 16); // ~60 FPS
        
        card.addEventListener('mouseenter', () => {
            isHovering = true;
        });
        
        card.addEventListener('mousemove', throttledMouseMove);
        
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
            card.style.setProperty('--tilt-z', '0px');
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Typing effect for headers
function initTypingEffect() {
    const headers = document.querySelectorAll('.display-4');
    
    headers.forEach(header => {
        const text = header.textContent;
        header.textContent = '';
        header.classList.add('typewriter');
        
        let i = 0;
        const typeInterval = setInterval(() => {
            header.textContent = text.slice(0, i);
            i++;
            
            if (i > text.length) {
                clearInterval(typeInterval);
                header.classList.remove('typewriter');
            }
        }, 100);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        e.target.classList.add('ripple');
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Performance optimization: Throttle function for better mouse performance
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Performance optimization: Debounce function for resize events
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

// Apply debounce to window resize events
window.addEventListener('resize', debounce(function() {
    // Handle resize events here if needed
    console.log('Window resized');
}, 250));

// Add loading animation to page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
