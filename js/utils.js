/**
 * PharmaCare Global - Analytics & Utilities
 * Version: 2.0.0
 */

// ==================== Analytics Module ====================
const Analytics = {
    events: [],
    
    init: function() {
        console.log('Analytics module initialized');
        this.trackPageView();
        this.setupEventListeners();
    },
    
    trackPageView: function() {
        const pageData = {
            type: 'pageview',
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            userAgent: navigator.userAgent
        };
        this.events.push(pageData);
        console.log('Page view tracked:', pageData.page);
    },
    
    trackEvent: function(category, action, label) {
        const eventData = {
            type: 'event',
            category: category,
            action: action,
            label: label,
            timestamp: new Date().toISOString()
        };
        this.events.push(eventData);
        console.log('Event tracked:', category, action, label);
    },
    
    setupEventListeners: function() {
        // Track link clicks
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('Link', 'Click', link.href);
            });
        });
        
        // Track button clicks
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('Button', 'Click', button.textContent);
            });
        });
    },
    
    getEvents: function() {
        return this.events;
    }
};

// ==================== Cookie Consent ====================
const CookieConsent = {
    cookieName: 'pharmacare_consent',
    
    init: function() {
        if (!this.hasConsent()) {
            this.showBanner();
        }
    },
    
    hasConsent: function() {
        return document.cookie.includes(this.cookieName + '=true');
    },
    
    setConsent: function() {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        document.cookie = `${this.cookieName}=true; expires=${expires.toUTCString()}; path=/`;
        this.hideBanner();
    },
    
    showBanner: function() {
        // Cookie consent banner would be shown here
        console.log('Cookie consent: Banner would be displayed');
    },
    
    hideBanner: function() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
};

// ==================== Language Support ====================
const i18n = {
    currentLang: 'en',
    
    translations: {
        en: {
            welcome: 'Welcome to PharmaCare Global',
            readMore: 'Read More',
            contactUs: 'Contact Us',
            learnMore: 'Learn More'
        },
        zh: {
            welcome: '欢迎来到 PharmaCare Global',
            readMore: '阅读更多',
            contactUs: '联系我们',
            learnMore: '了解更多'
        },
        ja: {
            welcome: 'PharmaCare Global へようこそ',
            readMore: '続きを読む',
            contactUs: 'お問い合わせ',
            learnMore: '詳細'
        }
    },
    
    setLanguage: function(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            console.log('Language set to:', lang);
        }
    },
    
    t: function(key) {
        return this.translations[this.currentLang][key] || key;
    }
};

// ==================== Local Storage Helper ====================
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage error:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }
};

// ==================== Initialize Modules ====================
document.addEventListener('DOMContentLoaded', function() {
    Analytics.init();
    CookieConsent.init();
    
    // Detect user language
    const userLang = navigator.language.split('-')[0];
    if (i18n.translations[userLang]) {
        i18n.setLanguage(userLang);
    }
    
    console.log('Utility modules loaded successfully');
});
