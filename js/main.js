// Main Application Module
class WebsiteApp {
    constructor() {
        this.config = null;
        this.publicationsManager = null;
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.initializeModules();
            this.setupEventListeners();
            this.renderContent();
        } catch (error) {
            console.error('Error initializing website:', error);
            // Use fallback config if loading fails
            this.config = this.getDefaultConfig();
            this.initializeModules();
            this.setupEventListeners();
            this.renderContent();
        }
    }

    async loadConfig() {
        try {
            // Try different paths for the config file
            const paths = [
                './config/site-config.json',
                '/config/site-config.json',
                '../config/site-config.json'
            ];
            
            let response = null;
            for (const path of paths) {
                try {
                    response = await fetch(path);
                    if (response.ok) break;
                } catch (e) {
                    continue;
                }
            }
            
            if (response && response.ok) {
                this.config = await response.json();
            } else {
                throw new Error('Could not load site-config.json');
            }
        } catch (error) {
            console.error('Error loading site configuration:', error);
            throw error; // Re-throw to trigger fallback
        }
    }

    getDefaultConfig() {
        return {
            site: {
                title: "Di Zhu - GIScience | GeoAI | Spatial Thinker",
                description: "Assistant Professor of Geographic Information Science at the University of Minnesota, Twin Cities",
                email: "dizhu@umn.edu"
            },
            social: {
                google_scholar: "https://scholar.google.com/citations?user=example",
                linkedin: "https://linkedin.com/in/dizhu",
                github: "https://github.com/dizhu"
            }
        };
    }

    initializeModules() {
        // Initialize publications manager
        this.publicationsManager = new PublicationsManager();
        
        // Initialize other modules here as needed
        this.initializeNavigation();
        this.initializeAnimations();
    }

    initializeNavigation() {
        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeAnimations() {
        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            }
        });

        // Intersection Observer for animations
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

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.research-card, .publication-item, .focus-area');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupEventListeners() {
        // Typing effect for hero section
        this.initializeTypingEffect();
        
        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }

    initializeTypingEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            this.typeWriter(heroTitle, originalText, 150);
        }
    }

    typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    renderContent() {
        // Update page title
        if (this.config.site.title) {
            document.title = this.config.site.title;
        }

        // Update meta description
        if (this.config.site.description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', this.config.site.description);
            }
        }

        // Update social links in footer
        this.updateSocialLinks();
    }

    updateSocialLinks() {
        if (this.config.social) {
            const socialLinks = document.querySelectorAll('.social-links a');
            socialLinks.forEach(link => {
                const icon = link.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    if (iconClass.includes('google') && this.config.social.google_scholar) {
                        link.href = this.config.social.google_scholar;
                    } else if (iconClass.includes('linkedin') && this.config.social.linkedin) {
                        link.href = this.config.social.linkedin;
                    } else if (iconClass.includes('github') && this.config.social.github) {
                        link.href = this.config.social.github;
                    } else if (iconClass.includes('twitter') && this.config.social.twitter) {
                        link.href = this.config.social.twitter;
                    }
                }
            });
        }
    }

    // Utility methods
    static getConfig() {
        return window.websiteApp?.config || null;
    }

    static getPublicationsManager() {
        return window.websiteApp?.publicationsManager || null;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for smooth loading
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Initialize the app
    window.websiteApp = new WebsiteApp();
    
    // Add some delay for smooth loading
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteApp;
} else {
    window.WebsiteApp = WebsiteApp;
} 