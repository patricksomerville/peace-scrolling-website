// Enhanced JavaScript for responsive behavior and scroll effects
// Incorporates Edward Gorey-inspired animation subtleties

document.addEventListener('DOMContentLoaded', function() {
    // Load Google Fonts for Gorey-inspired typography
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Caveat:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Add stylesheet link
    const styleLink = document.createElement('link');
    styleLink.href = 'styles.css';
    styleLink.rel = 'stylesheet';
    document.head.appendChild(styleLink);
    
    // Initialize scroll-triggered elements
    const scrollElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    const frameContainers = document.querySelectorAll('.frame-container');
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Calculate opacity based on scroll position
    function calculateOpacity(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // When element first enters viewport from bottom
        if (rect.top >= windowHeight * 0.8) {
            return 0;
        }
        
        // When element is centered in viewport
        if (rect.top <= windowHeight * 0.4 && rect.bottom >= windowHeight * 0.6) {
            return 1;
        }
        
        // When element is leaving viewport from top
        if (rect.bottom <= windowHeight * 0.2) {
            return 0;
        }
        
        // Calculate opacity based on position
        if (rect.top > windowHeight * 0.4) {
            return 1 - ((rect.top - windowHeight * 0.4) / (windowHeight * 0.4));
        }
        
        if (rect.bottom < windowHeight * 0.6) {
            return rect.bottom / (windowHeight * 0.6);
        }
        
        return 1;
    }
    
    // Add subtle animation to Gorey-inspired elements
    function addSubtleAnimations() {
        const goreyElements = document.querySelectorAll('.gorey-character, .title, .subtitle, .dialogue-bubble');
        
        goreyElements.forEach(element => {
            // Add subtle random rotation
            const randomRotation = (Math.random() * 2 - 1) * 0.5; // Between -0.5 and 0.5 degrees
            element.style.transform = `rotate(${randomRotation}deg)`;
            
            // Add subtle hover effect
            element.addEventListener('mouseover', function() {
                this.style.transform = `rotate(${randomRotation * 1.5}deg) scale(1.02)`;
                this.style.transition = 'transform 0.5s ease-in-out';
            });
            
            element.addEventListener('mouseout', function() {
                this.style.transform = `rotate(${randomRotation}deg) scale(1)`;
            });
        });
    }
    
    // Handle scroll events
    function handleScroll() {
        // Update frame container opacities
        frameContainers.forEach(container => {
            if (isElementInViewport(container)) {
                const opacity = calculateOpacity(container);
                const overlay = container.querySelector('.overlay-layer');
                if (overlay) {
                    overlay.style.opacity = opacity;
                }
            }
        });
        
        // Handle scroll-triggered animations
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            } else {
                // Optional: remove the class when out of viewport for repeat animations
                // element.classList.remove('visible');
            }
        });
    }
    
    // Add parallax effect to backgrounds
    function setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.2;
                const yPos = -(window.pageYOffset * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Handle responsive behavior
    function setupResponsiveBehavior() {
        const isMobile = window.innerWidth < 768;
        
        // Adjust aspect ratios for mobile
        if (isMobile) {
            document.querySelectorAll('.cinematic-ratio').forEach(element => {
                element.classList.remove('cinematic-ratio');
                element.classList.add('standard-ratio');
            });
        }
        
        // Adjust caption positions for mobile
        document.querySelectorAll('.caption').forEach(caption => {
            if (isMobile) {
                caption.style.maxWidth = '100%';
            }
        });
    }
    
    // Detect reduced motion preference
    function setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Disable animations for users who prefer reduced motion
            document.body.classList.add('reduced-motion');
            
            // Remove parallax effects
            document.querySelectorAll('[data-parallax]').forEach(element => {
                element.removeAttribute('data-parallax');
            });
            
            // Simplify transitions
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(element => {
                element.style.transition = 'opacity 0.3s ease-out';
                element.classList.remove('fade-in', 'slide-in-left', 'slide-in-right');
                element.classList.add('simple-fade');
            });
        }
    }
    
    // Initialize video-ready frames
    class VideoReadyFrameManager {
        constructor() {
            this.frames = document.querySelectorAll('[data-video-ready="true"]');
            this.setupFrames();
            this.bindEvents();
        }
        
        setupFrames() {
            this.frames.forEach(frame => {
                // Store video-related metadata for future use
                frame.setAttribute('data-video-enabled', 'false');
                
                // Add visual indicator for video-ready frames (only in development)
                if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
                    const indicator = document.createElement('div');
                    indicator.className = 'video-ready-indicator';
                    indicator.innerHTML = '📹';
                    indicator.title = 'Video-ready frame';
                    indicator.style.position = 'absolute';
                    indicator.style.top = '10px';
                    indicator.style.right = '10px';
                    indicator.style.fontSize = '20px';
                    indicator.style.opacity = '0.5';
                    indicator.style.zIndex = '100';
                    frame.appendChild(indicator);
                }
            });
        }
        
        bindEvents() {
            // Listen for future video mode toggle
            document.addEventListener('keydown', (e) => {
                // Alt+V could toggle video mode in the future
                if (e.altKey && e.key === 'v') {
                    this.toggleVideoMode();
                }
            });
        }
        
        // Future method for video integration
        toggleVideoMode() {
            console.log('Video mode would be toggled here in the future');
            // Implementation would replace static content with video elements
        }
    }
    
    // Initialize
    handleScroll();
    setupParallax();
    setupResponsiveBehavior();
    setupReducedMotion();
    addSubtleAnimations();
    
    // Bind scroll event with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        setupResponsiveBehavior();
    });
    
    // Initialize the frame manager
    const frameManager = new VideoReadyFrameManager();
    
    // Add loading indicator
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-content"><div class="loader-spinner"></div><div class="loader-text">Loading PEACE...</div></div>';
    document.body.appendChild(loader);
    
    // Remove loader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    });
});
