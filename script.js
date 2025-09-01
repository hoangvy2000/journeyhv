// Vintage Love Timeline JavaScript
class VintageTimeline {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupModalHandlers();
        this.createFloatingElements();
        this.updateDateCounters();
        this.addInteractiveEffects();
    }

    // Scroll-based animations for memory cards
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Add a slight delay for a more organic feel
                    const delay = Math.random() * 300;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all memory cards
        const memoryCards = document.querySelectorAll('.memory-card');
        memoryCards.forEach(card => {
            observer.observe(card);
        });

        // Observe stats section
        const statsSection = document.querySelector('.vintage-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // Modal functionality
    setupModalHandlers() {
        // Open modals when clicking memory cards
        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const memoryId = card.getAttribute('data-memory');
                this.openModal(memoryId);
            });
        });

        // Close modal handlers
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeAllModals();
            });
        });

        // Close modal when clicking outside
        document.querySelectorAll('.memory-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });

        // Close modal with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    openModal(memoryId) {
        const modal = document.getElementById(memoryId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add a gentle fade-in effect
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);

            // Add typewriter effect to modal text
            this.addTypewriterEffect(modal);
        }
    }

    closeAllModals() {
        document.querySelectorAll('.memory-modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    // Typewriter effect for modal text
    addTypewriterEffect(modal) {
        const textElements = modal.querySelectorAll('.modal-text p:not(.signature)');
        
        textElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            let charIndex = 0;
            const typeWriter = () => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 20 + Math.random() * 30); // Variable speed for organic feel
                }
            };
            
            // Start typing with a delay based on paragraph index
            setTimeout(typeWriter, index * 800);
        });
    }

    // Create additional floating elements
    createFloatingElements() {
        const body = document.body;
        
        // Create floating petals periodically
        setInterval(() => {
            this.createFloatingPetal();
        }, 8000 + Math.random() * 4000);

        // Create gentle sparkles
        setInterval(() => {
            this.createSparkle();
        }, 3000 + Math.random() * 2000);
    }

    createFloatingPetal() {
        const petal = document.createElement('div');
        const petals = ['🌸', '🌺', '🌻', '🌼', '🍃'];
        
        petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
        petal.style.position = 'fixed';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-50px';
        petal.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        petal.style.opacity = '0.6';
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '2';
        petal.style.animation = `fallPetal ${8 + Math.random() * 4}s linear forwards`;
        
        document.body.appendChild(petal);
        
        // Remove after animation
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 12000);
    }

    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = '0.8rem';
        sparkle.style.opacity = '0';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '2';
        sparkle.style.animation = 'sparkle 2s ease-in-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }

    // Update date counters with real calculations
    updateDateCounters() {
        // Update this date to your actual relationship start date
        const startDate = new Date('2022-09-15');
        const today = new Date();
        
        const timeDiff = today.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Update the days counter in stats
        const daysElement = document.querySelector('.stat-number');
        if (daysElement && daysElement.textContent === '730') {
            this.animateNumber(daysElement, daysDiff);
        }
        
        // Update other stats with animated counting
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((element, index) => {
            if (element.textContent !== '∞') {
                const finalValue = element.textContent.replace('+', '');
                if (!isNaN(finalValue)) {
                    this.animateNumber(element, parseInt(finalValue), index * 200);
                }
            }
        });
    }

    animateNumber(element, finalValue, delay = 0) {
        setTimeout(() => {
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                
                if (finalValue >= 100) {
                    element.textContent = Math.floor(currentValue) + '+';
                } else {
                    element.textContent = Math.floor(currentValue);
                }
            }, 40);
        }, delay);
    }

    // Add interactive effects
    addInteractiveEffects() {
        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.leaf, .dandelion');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Add hover effects to memory cards
        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });
        });

        // Add gentle breathing animation to the timeline vine
        this.addBreathingEffect();
    }

    addCardHoverEffect(card) {
        const illustration = card.querySelector('.illustration-frame');
        if (illustration) {
            illustration.style.transform = 'scale(1.1) rotate(5deg)';
            illustration.style.transition = 'all 0.3s ease';
        }
        
        // Add subtle glow effect
        card.style.filter = 'drop-shadow(0 0 20px rgba(139, 126, 102, 0.3))';
    }

    removeCardHoverEffect(card) {
        const illustration = card.querySelector('.illustration-frame');
        if (illustration) {
            illustration.style.transform = 'scale(1) rotate(0deg)';
        }
        
        card.style.filter = 'none';
    }

    addBreathingEffect() {
        const vine = document.querySelector('.timeline-vine');
        if (vine) {
            vine.style.animation = 'breathe 4s ease-in-out infinite';
        }
    }
}

// CSS animations added dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fallPetal {
        to {
            transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    @keyframes breathe {
        0%, 100% {
            transform: translateX(-50%) scaleY(1);
        }
        50% {
            transform: translateX(-50%) scaleY(1.02);
        }
    }
    
    .memory-card {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .memory-card:hover {
        transform: translateY(-8px);
    }
    
    .vintage-stats.animate .stat-item {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    .vintage-stats.animate .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .vintage-stats.animate .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .vintage-stats.animate .stat-item:nth-child(3) { animation-delay: 0.3s; }
    .vintage-stats.animate .stat-item:nth-child(4) { animation-delay: 0.4s; }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for better user experience
document.documentElement.style.scrollBehavior = 'smooth';

// Initialize the timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VintageTimeline();
    
    // Add a gentle fade-in effect to the whole page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some Easter eggs for fun
let konami = [];
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konami.push(e.code);
    konami = konami.slice(-konamiCode.length);
    
    if (konami.join('') === konamiCode.join('')) {
        // Easter egg: make it rain hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createSpecialHeart();
            }, i * 100);
        }
    }
});

function createSpecialHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'fallPetal 3s linear forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Export for potential use in other scripts
window.VintageTimeline = VintageTimeline;
