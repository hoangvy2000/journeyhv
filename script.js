// DOM Elements
const book = document.getElementById('book');
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const heartsBackground = document.getElementById('heartsBackground');

// State variables
let currentPageIndex = 0;
let isMusicPlaying = false;
let heartInterval;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupPages();
    updateNavigation();
    initializeHearts();
    initializeMusic();
    initializePageEvents();
    
    // Set total pages
    totalPagesSpan.textContent = pages.length;
});

// Setup initial page positions
function setupPages() {
    pages.forEach((page, index) => {
        if (index > 0) {
            page.classList.add('flipped');
        }
    });
    
    // Show first page (cover)
    if (pages[0]) {
        pages[0].classList.remove('flipped');
    }
}

// Initialize floating hearts
function initializeHearts() {
    heartInterval = setInterval(createHeart, 3000);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💖';
    
    // Random position
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
    
    heartsBackground.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 15000);
}

// Initialize music functionality
function initializeMusic() {
    musicToggle.addEventListener('click', toggleMusic);
    
    // Set volume
    backgroundMusic.volume = 0.3;
}

function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.innerHTML = '<i class="fas fa-music"></i><span>Nhạc nền</span>';
        isMusicPlaying = false;
    } else {
        backgroundMusic.play().catch(e => {
            console.log('Không thể phát nhạc:', e);
        });
        musicToggle.classList.add('playing');
        musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>Tạm dừng</span>';
        isMusicPlaying = true;
    }
}

// Initialize page click events
function initializePageEvents() {
    pages.forEach((page, index) => {
        page.addEventListener('click', () => {
            if (index === currentPageIndex && currentPageIndex < pages.length - 1) {
                nextPage();
            }
        });
    });
    
    // Navigation button events
    nextBtn.addEventListener('click', nextPage);
    prevBtn.addEventListener('click', prevPage);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    switch(e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            nextPage();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            prevPage();
            break;
        case 'Home':
            e.preventDefault();
            goToPage(0);
            break;
        case 'End':
            e.preventDefault();
            goToPage(pages.length - 1);
            break;
    }
}

// Navigation functions
function nextPage() {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        flipToPage(currentPageIndex);
        updateNavigation();
        playRealisticFlipSound();
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        flipToPage(currentPageIndex);
        updateNavigation();
        playRealisticFlipSound();
    }
}

function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < pages.length && pageIndex !== currentPageIndex) {
        currentPageIndex = pageIndex;
        flipToPage(currentPageIndex);
        updateNavigation();
        playRealisticFlipSound();
    }
}

// Flip animation
function flipToPage(targetIndex) {
    pages.forEach((page, index) => {
        page.classList.remove('flipping');
        
        if (index <= targetIndex) {
            // Show current and previous pages
            setTimeout(() => {
                page.classList.remove('flipped');
            }, index === targetIndex ? 100 : 0);
        } else {
            // Hide future pages
            page.classList.add('flipping');
            setTimeout(() => {
                page.classList.add('flipped');
                page.classList.remove('flipping');
            }, 100);
        }
    });
    
    // Add flip animation to current page
    if (pages[targetIndex]) {
        pages[targetIndex].classList.add('flipping');
        setTimeout(() => {
            pages[targetIndex].classList.remove('flipping');
        }, 600);
    }
}

// Update navigation state
function updateNavigation() {
    currentPageSpan.textContent = currentPageIndex + 1;
    
    // Update button states
    prevBtn.disabled = currentPageIndex === 0;
    nextBtn.disabled = currentPageIndex === pages.length - 1;
    
    // Update button text for last page
    if (currentPageIndex === pages.length - 1) {
        nextBtn.innerHTML = '<i class="fas fa-heart"></i> Kết thúc';
    } else {
        nextBtn.innerHTML = 'Tiếp <i class="fas fa-chevron-right"></i>';
    }
}

// REALISTIC PAGE FLIP SOUND EFFECT
function playRealisticFlipSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create complex sound for realistic page flip
        const duration = 0.3;
        const currentTime = audioContext.currentTime;
        
        // Sound 1: Initial paper rustle (high frequency)
        const osc1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        
        osc1.connect(gain1);
        gain1.connect(audioContext.destination);
        
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(2500, currentTime);
        osc1.frequency.exponentialRampToValueAtTime(1200, currentTime + 0.05);
        osc1.frequency.exponentialRampToValueAtTime(800, currentTime + 0.15);
        
        gain1.gain.setValueAtTime(0.02, currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.04, currentTime + 0.02);
        gain1.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.15);
        
        // Sound 2: Page movement (mid frequency)
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(400, currentTime);
        osc2.frequency.exponentialRampToValueAtTime(300, currentTime + 0.1);
        osc2.frequency.exponentialRampToValueAtTime(180, currentTime + 0.25);
        
        gain2.gain.setValueAtTime(0.03, currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.05, currentTime + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.25);
        
        // Sound 3: Paper settling (low frequency)
        const osc3 = audioContext.createOscillator();
        const gain3 = audioContext.createGain();
        
        osc3.connect(gain3);
        gain3.connect(audioContext.destination);
        
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(120, currentTime + 0.15);
        osc3.frequency.exponentialRampToValueAtTime(80, currentTime + 0.3);
        
        gain3.gain.setValueAtTime(0, currentTime);
        gain3.gain.linearRampToValueAtTime(0.025, currentTime + 0.15);
        gain3.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.3);
        
        // Add white noise for texture
        const bufferSize = audioContext.sampleRate * 0.2;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const noiseOutput = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            noiseOutput[i] = (Math.random() * 2 - 1) * 0.015;
        }
        
        const noiseSource = audioContext.createBufferSource();
        const noiseGain = audioContext.createGain();
        const noiseFilter = audioContext.createBiquadFilter();
        
        noiseSource.buffer = noiseBuffer;
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioContext.destination);
        
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.setValueAtTime(1500, currentTime);
        noiseFilter.frequency.exponentialRampToValueAtTime(800, currentTime + 0.2);
        
        noiseGain.gain.setValueAtTime(0.8, currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.2);
        
        // Play all sounds
        osc1.start(currentTime);
        osc1.stop(currentTime + 0.15);
        
        osc2.start(currentTime);
        osc2.stop(currentTime + 0.25);
        
        osc3.start(currentTime + 0.15);
        osc3.stop(currentTime + 0.3);
        
        noiseSource.start(currentTime);
        noiseSource.stop(currentTime + 0.2);
        
    } catch (e) {
        console.log('Cannot play sound:', e);
        // Fallback: simple click sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.frequency.value = 800;
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            osc.start();
            osc.stop(audioContext.currentTime + 0.1);
        } catch (fallbackError) {
            console.log('Fallback sound also failed:', fallbackError);
        }
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', handleTouchStart, { passive: true });
document.addEventListener('touchmove', handleTouchMove, { passive: true });
document.addEventListener('touchend', handleTouchEnd, { passive: true });

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Check if it's a horizontal swipe (not vertical scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            // Swipe right - previous page
            prevPage();
        } else {
            // Swipe left - next page  
            nextPage();
        }
    }
}

// Auto-advance functionality (optional)
let autoAdvanceTimer;
let autoAdvanceEnabled = false;

function enableAutoAdvance(intervalMs = 10000) {
    autoAdvanceEnabled = true;
    autoAdvanceTimer = setInterval(() => {
        if (currentPageIndex < pages.length - 1) {
            nextPage();
        } else {
            disableAutoAdvance();
        }
    }, intervalMs);
}

function disableAutoAdvance() {
    autoAdvanceEnabled = false;
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
}

// Page visibility handling
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause music when tab is hidden
        if (isMusicPlaying) {
            backgroundMusic.pause();
        }
        disableAutoAdvance();
    } else {
        // Resume music when tab is visible
        if (isMusicPlaying) {
            backgroundMusic.play().catch(e => console.log('Cannot resume music:', e));
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (heartInterval) {
        clearInterval(heartInterval);
    }
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
    }
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
});

// Resize handling
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateNavigation();
    }, 250);
});

// Preload images for smoother experience
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1518621012118-1d014ca9071d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize image preloading
preloadImages();

// Export functions for external use (optional)
window.LoveStoryBook = {
    nextPage,
    prevPage,
    goToPage,
    toggleMusic,
    enableAutoAdvance,
    disableAutoAdvance,
    getCurrentPage: () => currentPageIndex,
    getTotalPages: () => pages.length
};
