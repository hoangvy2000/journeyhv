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
        playFlipSound();
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        flipToPage(currentPageIndex);
        updateNavigation();
        playFlipSound();
    }
}

function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < pages.length && pageIndex !== currentPageIndex) {
        currentPageIndex = pageIndex;
        flipToPage(currentPageIndex);
        updateNavigation();
        playFlipSound();
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

// Sound effects (optional)
function playFlipSound() {
    // Tạo âm thanh lật trang đơn giản
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Không thể tạo âm thanh, bỏ qua
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
        // Có thể thêm logic resize nếu cần
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
