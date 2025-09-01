// DOM Elements
const musicToggle = document.getElementById('musicToggle');
const particlesToggle = document.getElementById('particlesToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const particlesContainer = document.getElementById('particles');
const memoryCards = document.querySelectorAll('.memory-card');
const modal = document.getElementById('memoryModal');
const closeModal = document.querySelector('.close');
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

// State variables
let isParticlesActive = true;
let isMusicPlaying = false;
let particleInterval;

// Memory data cho modal
const memoryData = {
    memory1: {
        icon: 'fas fa-heart',
        title: 'Gặp nhau lần đầu',
        date: 'Tháng 5, 2023',
        description: 'Như một câu chuyện cổ tích bắt đầu, hai trái tim tìm thấy nhau trong một ngày xuân thật đẹp...',
        details: 'Đó là một ngày đặc biệt, khi định mệnh sắp đặt để chúng ta gặp nhau. Từ ánh mắt đầu tiên, đã có điều gì đó kỳ diệu xảy ra - như thể cả thế giới xung quanh đều im lặng để chứng kiến khoảnh khắc này.',
        image: 'https://images.unsplash.com/photo-1518621012118-1d014ca9071d?w=500&h=400&fit=crop'
    },
    memory2: {
        icon: 'fas fa-coffee',
        title: 'Lời tỏ tình',
        date: '01/09/2023',
        description: 'Tại quán cafe Xưa 1985 (20 Bác Ái), những lời yêu thương đầu tiên được thì thầm...',
        details: 'Tại quán cafe ấm cúng trên đường Bác Ái, với tách cà phê thơm ngào ngạt và ánh sáng dịu nhẹ, những lời yêu đầu tiên được thì thầm. Đó là khoảnh khắc mà tất cả sự e dè và lo lắng tan biến, chỉ còn lại tình yêu thuần khiết.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=400&fit=crop'
    },
    memory3: {
        icon: 'fas fa-ship',
        title: 'Đảo Bình Hưng',
        date: '15/09/2023',
        description: 'Chuyến du lịch đầu tiên cùng công ty, nhưng trái tim chỉ nhìn thấy nhau...',
        details: 'Dù là chuyến đi cùng đồng nghiệp, nhưng với chúng ta đó như một chuyến trăng mật nhỏ. Biển xanh, cát trắng và nắng vàng - tất cả đều trở nên đẹp hơn khi có nhau bên cạnh.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop'
    },
    memory4: {
        icon: 'fas fa-umbrella-beach',
        title: 'Vũng Tàu đón năm mới',
        date: '31/12/2023',
        description: 'Chỉ có hai đứa mình, bãi biển và những ước nguyện cho năm mới...',
        details: 'Đêm giao thừa đặc biệt nhất - chỉ có chúng ta và biển cả bao la. Những ước nguyện được thầm thì bên sóng vỗ, hứa hẹn một năm mới tràn đầy hạnh phúc và yêu thương.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=400&fit=crop'
    },
    memory5: {
        icon: 'fas fa-water',
        title: 'Hồ Trị An',
        date: '17/02/2024',
        description: 'Cùng hội bạn thân khám phá vẻ đẹp thanh bình của hồ nước...',
        details: 'Cùng những người bạn thân yêu khám phá vẻ đẹp hoang sơ của Hồ Trị An. Nước xanh trong vắt phản chiếu bầu trời và những cây cầu tre xinh xắn - khoảnh khắc bình yên và hạnh phúc.',
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&h=400&fit=crop'
    },
    memory6: {
        icon: 'fas fa-tree',
        title: 'Nam Cát Tiên chill',
        date: '11/05/2024',
        description: 'Giữa rừng xanh mướt, tìm thấy sự yên bình trong vòng tay nhau...',
        details: 'Vườn quốc gia Nam Cát Tiên với khung cảnh rừng già hùng vĩ. Chúng ta lạc vào thiên nhiên hoang dã, tìm thấy sự bình yên trong vòng tay nhau giữa tiếng chim hót và lá cây xào xạc.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop'
    },
    memory7: {
        icon: 'fas fa-rings-wedding',
        title: 'Phụ rể và phù dâu',
        date: '22/06/2024',
        description: 'Lần đầu làm phụ rể và được bé bồ làm phù dâu - như thử nghiệm cho tương lai...',
        details: 'Lần đầu tiên cùng nhau tham gia đám cưới với vai trò phụ rể và phù dâu. Khoác lên người bộ áo dài truyền thống, chúng ta như được thử nghiệm cho một tương lai đẹp đang chờ đợi.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=400&fit=crop'
    },
    memory8: {
        icon: 'fas fa-birthday-cake',
        title: '1 năm yêu nhau',
        date: '01/09/2024',
        description: 'Kỷ niệm 1 năm tại biển Hoài Nhơn và tuần khám phá Bình Định đầy ý nghĩa...',
        details: 'Cột mốc 1 năm yêu nhau được kỷ niệm tại bãi biển Hoài Nhơn thơ mộng. Cả tuần khám phá Bình Định với những món ăn ngon, cảnh đẹp và quan trọng nhất - tình yêu ngày càng sâu sắc.',
        image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=500&h=400&fit=crop'
    },
    memory9: {
        icon: 'fas fa-hands-helping',
        title: 'Thiện nguyện Trà Vinh',
        date: '17/09/2024',
        description: 'Lần đầu cùng nhau làm thiện nguyện, chia sẻ yêu thương với cộng đồng...',
        details: 'Chuyến thiện nguyện đầu tiên cùng nhau tại Trà Vinh. Những khoảnh khắc ý nghĩa khi cùng chia sẻ yêu thương với cộng đồng, làm cho tình yêu của chúng ta thêm cao đẹp và ý nghĩa.',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=400&fit=crop'
    },
    memory10: {
        icon: 'fas fa-cat',
        title: 'Nhặt được bé Cá',
        date: '25/10/2024',
        description: 'Thành viên mới của gia đình nhỏ - chú mèo Cá đáng yêu...',
        details: 'Ngày đặc biệt khi gia đình nhỏ có thêm thành viên mới - chú mèo Cá đáng yêu. Từ lúc nhặt được bé đến khi chăm sóc, nuôi nấng, chúng ta như đã thực tập làm cha mẹ.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&h=400&fit=crop'
    },
    memory11: {
        icon: 'fas fa-building',
        title: 'Khám phá rooftop',
        date: '05/01/2025',
        description: 'Tìm được quán rooftop yêu thích, ngắm thành phố từ trên cao...',
        details: 'Khám phá được góc rooftop tuyệt đẹp với view nhìn toàn cảnh thành phố. Ngắm hoàng hôn từ trên cao, cùng nhau mơ ước về những chuyến phiêu lưu tiếp theo trong tương lai.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop'
    }
};

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollAnimations();
    initializeModalEvents();
    initializeControlButtons();
    initializeStatsCounter();
    
    // Lazy loading cho hình ảnh
    initializeLazyLoading();
});

// Particles system - nhẹ nhàng
function initializeParticles() {
    if (!isParticlesActive) return;
    
    particleInterval = setInterval(() => {
        createParticle();
    }, 800); // Tạo particle ít hơn
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size nhỏ hơn
    const size = Math.random() * 3 + 1; // 1-4px
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.opacity = Math.random() * 0.6 + 0.2; // 0.2-0.8
    
    // Random animation duration
    const duration = Math.random() * 4 + 6; // 6-10s
    particle.style.animationDuration = duration + 's';
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Scroll animations - mượt mà hơn
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    memoryCards.forEach(card => {
        observer.observe(card);
    });
}

// Modal events
function initializeModalEvents() {
    // Click vào memory card để mở modal
    memoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const memoryId = card.getAttribute('data-memory');
            openModal(memoryId);
        });
    });
    
    // Đóng modal
    closeModal.addEventListener('click', closeModalHandler);
    
    // Click outside modal để đóng
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    // ESC key để đóng modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalHandler();
        }
    });
}

function openModal(memoryId) {
    const data = memoryData[memoryId];
    if (!data) return;
    
    // Cập nhật nội dung modal
    const modalImage = document.getElementById('modalImage');
    const modalIcon = document.querySelector('.modal-icon');
    const modalTitle = document.querySelector('.modal-title');
    const modalDate = document.querySelector('.modal-date');
    const modalDescription = document.querySelector('.modal-description');
    const modalDetails = document.querySelector('.modal-details');
    
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalIcon.innerHTML = `<i class="${data.icon}"></i>`;
    modalTitle.textContent = data.title;
    modalDate.textContent = data.date;
    modalDescription.textContent = data.description;
    modalDetails.textContent = data.details;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Control buttons
function initializeControlButtons() {
    // Music toggle
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            isMusicPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Could not play audio:', e);
            });
            musicToggle.classList.add('playing');
            isMusicPlaying = true;
        }
    });
    
    // Particles toggle
    particlesToggle.addEventListener('click', () => {
        if (isParticlesActive) {
            clearInterval(particleInterval);
            particlesContainer.innerHTML = '';
            particlesToggle.classList.remove('active');
            isParticlesActive = false;
        } else {
            initializeParticles();
            particlesToggle.classList.add('active');
            isParticlesActive = true;
        }
    });
}

// Stats counter animation
function initializeStatsCounter() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                statsObserver.unobserve(counter); // Run only once
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // 50 steps
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current);
        element.classList.add('counting');
        
        setTimeout(() => {
            element.classList.remove('counting');
        }, 100);
    }, 40); // 40ms interval
}

// Lazy loading cho hình ảnh
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.setAttribute('data-loading', 'true');
                    
                    img.onload = () => {
                        img.removeAttribute('data-loading');
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Smooth scroll cho các anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Có thể thêm logic resize nếu cần
    }, 250);
});

// Performance optimization
window.addEventListener('beforeunload', () => {
    if (particleInterval) {
        clearInterval(particleInterval);
    }
    if (backgroundMusic) {
        backgroundMusic.pause();
    }
});

// Touch gestures cho mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Swipe to close modal
    if (modal.style.display === 'block' && Math.abs(deltaY) > 50) {
        if (deltaY > 0) { // Swipe down
            closeModalHandler();
        }
    }
});
