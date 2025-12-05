/**
 * PharmaCare Global - Main JavaScript
 * Version: 2.0.0
 */

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('PharmaCare Global website loaded');
    console.log('Build version: 2.0.0');
    console.log('Deployed via Cloudflare Pages');
    
    initializeApp();
});

function initializeApp() {
    updateDateTime();
    initNavigation();
    initScrollEffects();
    initCounters();
    displayPerformanceMetrics();
}

// ==================== Date/Time Display ====================
function updateDateTime() {
    const dateElement = document.getElementById('update-date');
    const buildIdElement = document.getElementById('build-id');
    
    if (dateElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    if (buildIdElement) {
        buildIdElement.textContent = `v2.0.0-${Date.now().toString(36)}`;
    }
}

// ==================== Navigation ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ==================== Scroll Effects ====================
function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 10) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.info-card, .clinical-trial').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// ==================== Animated Counters ====================
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ==================== Performance Metrics ====================
function displayPerformanceMetrics() {
    // Wait for page to fully load
    window.addEventListener('load', function() {
        setTimeout(() => {
            const performance = window.performance;
            if (performance) {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
                
                console.log('=== Performance Metrics ===');
                console.log(`Page Load Time: ${loadTime}ms`);
                console.log(`DOM Ready: ${domReady}ms`);
                
                // Log resource timing
                const resources = performance.getEntriesByType('resource');
                console.log(`Total Resources: ${resources.length}`);
                
                resources.forEach(resource => {
                    if (resource.initiatorType === 'css' || resource.initiatorType === 'script') {
                        console.log(`${resource.initiatorType.toUpperCase()}: ${resource.name.split('/').pop()} - ${Math.round(resource.duration)}ms`);
                    }
                });
            }
        }, 100);
    });
}

// ==================== Utility Functions ====================
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

// ==================== Clinical Trial Enrollment ====================
function showTrialInfo(trialId) {
    console.log(`Showing info for trial: ${trialId}`);
    alert(`For more information about ${trialId}, please contact our clinical trials team at trials@pharmacareglobal-demo.com`);
}

// ==================== Form Validation (for contact page) ====================
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Please enter a valid email address');
    }
    
    return errors;
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNumber,
        debounce,
        validateForm
    };
}
