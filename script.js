// Ghibli Style Love Timeline JavaScript
class GhibliTimeline {
    constructor() {
        this.isRaining = false;
        this.rainInterval = null;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.musicContext = null;
        this.backgroundMusic = null;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupScrollAnimations();
        this.setupModalHandlers();
        this.setupMusicControls();
        this.createFloatingParticles();
        this.updateStats();
        this.addInteractiveEffects();
        this.createNatureAmbience();
    }

    // Thiết lập canvas cho hiệu ứng hạt
    setupCanvas() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animateParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Tạo hạt bay lơ lửng (lá, hoa anh đào)
    createFloatingParticles() {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 0.3 + 0.1,
                size: Math.random() * 8 + 3,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2,
                type: Math.random() > 0.5 ? '🌸' : '🍃',
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    // Animate các hạt
    animateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Cập nhật vị trí
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            // Reset vị trí khi ra khỏi màn hình
            if (particle.x < -50) particle.x = this.canvas.width + 50;
            if (particle.x > this.canvas.width + 50) particle.x = -50;
            if (particle.y > this.canvas.height + 50) {
                particle.y = -50;
                particle.x = Math.random() * this.canvas.width;
            }
            
            // Vẽ hạt
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation * Math.PI / 180);
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.font = `${particle.size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(particle.type, 0, 0);
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    // Scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Hiệu ứng xuất hiện với delay ngẫu nhiên
                    if (entry.target.classList.contains('memory-card')) {
                        const delay = Math.random() * 500;
                        setTimeout(() => {
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, delay);
                    }
                }
            });
        }, observerOptions);

        // Observe memory cards
        document.querySelectorAll('.memory-card').forEach(card => {
            observer.observe(card);
        });

        // Observe stats
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // Modal handlers
    setupModalHandlers() {
        const modal = document.getElementById('memoryModal');
        const closeBtn = document.querySelector('.close');
        
        // Data chi tiết cho từng kỷ niệm
        this.memoryDetails = {
            memory1: {
                icon: '💕',
                title: 'Gặp nhau lần đầu',
                date: 'Tháng 5, 2023',
                description: 'Như một câu chuyện cổ tích bắt đầu, hai trái tim tìm thấy nhau trong một ngày xuân thật đẹp. Có thể đó là định mệnh, có thể là may mắn, nhưng chắc chắn đó là khởi đầu của một chuyện tình đẹp.',
                details: 'Đôi khi những cuộc gặp gỡ đẹp nhất lại diễn ra một cách bất ngờ nhất. Như thể vũ trụ đã sắp xếp mọi thứ để hai người chúng mình tìm thấy nhau vào đúng thời điểm thích hợp.'
            },
            memory2: {
                icon: '☕',
                title: 'Lời tỏ tình',
                date: '01/09/2023',
                description: 'Tại quán cafe Xưa 1985 (20 Bác Ái), những lời yêu thương đầu tiên được thì thầm. Một không gian ấm cúng, thời gian như ngừng lại để lắng nghe tiếng tim đập.',
                details: 'Quán cafe nhỏ ấy giờ đã trở thành quán Atom, nhưng kỷ niệm về lời tỏ tình đầu tiên sẽ mãi mãi được lưu giữ trong trái tim chúng mình.'
            },
            memory3: {
                icon: '🏝️',
                title: 'Đảo Bình Hưng',
                date: '15/09/2023',
                description: 'Chuyến du lịch đầu tiên cùng công ty, nhưng trái tim chỉ nhìn thấy nhau. Biển xanh, cát trắng và tình yêu mới chớm nở.',
                details: 'Dù đi cùng đoàn công ty đông đúc, nhưng hai chúng mình vẫn tìm được những khoảnh khắc riêng tư bên nhau, ngắm hoàng hôn và tận hưởng những giây phút ngọt ngào đầu tiên.'
            },
            memory4: {
                icon: '🌊',
                title: 'Vũng Tàu đón năm mới',
                date: '31/12/2023',
                description: 'Chỉ có hai đứa mình, bãi biển và những ước nguyện cho năm mới. Tiếng sóng vỗ như những lời chúc phước cho tình yêu chúng mình.',
                details: 'Đêm giao thừa bên biển Vũng Tàu, chúng mình cùng nhau đếm ngược và chào đón năm 2024 với biết bao hy vọng và ước mơ đẹp.'
            },
            memory5: {
                icon: '🏞️',
                title: 'Hồ Trị An',
                date: '17/02/2024',
                description: 'Cùng hội bạn thân khám phá vẻ đẹp thanh bình của hồ nước. Thiên nhiên hùng vĩ chứng kiến tình yêu chúng mình ngày càng bền chặt.',
                details: 'Hồ Trị An với khung cảnh thơ mộng đã tạo nên nhiều kỷ niệm đẹp. Cùng bạn bè mà vẫn có những khoảnh khắc ngọt ngào chỉ dành riêng cho nhau.'
            },
            memory6: {
                icon: '🌲',
                title: 'Nam Cát Tiên chill',
                date: '11/05/2024',
                description: 'Giữa rừng xanh mướt, tìm thấy sự yên bình trong vòng tay nhau. Không khí trong lành và tiếng chim hót tạo nên bản nhạc tình yêu tuyệt vời.',
                details: 'Nam Cát Tiên mang đến cho chúng mình những giây phút thật chill và thư thái. Đi dạo trong rừng, nghe tiếng chim hót và cảm nhận thiên nhiên hùng vĩ.'
            },
            memory7: {
                icon: '💒',
                title: 'Phụ rể và phù dâu',
                date: '22/06/2024',
                description: 'Lần đầu làm phụ rể và được bé bồ làm phù dâu - như thử nghiệm cho tương lai. Cùng nhau góp phần tạo nên hạnh phúc cho người khác.',
                details: 'Được đứng cạnh nhau trong một đám cưới, như một lời hứa thầm lặng về tương lai. Những khoảnh khắc ấy khiến chúng mình nghĩ nhiều về ngày mai.'
            },
            memory8: {
                icon: '🎂',
                title: '1 năm yêu nhau',
                date: '01/09/2024',
                description: 'Kỷ niệm 1 năm tại biển Hoài Nhơn và tuần khám phá Bình Định đầy ý nghĩa. 365 ngày yêu thương được tổng kết bằng một chuyến đi đặc biệt.',
                details: 'Một năm yêu nhau đã trôi qua thật nhanh. Bình Định với biển Quy Nhơn, Nhơn Lý và các di tích tháp Chăm đã chứng kiến tình yêu chúng mình trưởng thành.'
            },
            memory9: {
                icon: '🤝',
                title: 'Thiện nguyện Trà Vinh',
                date: '17/09/2024',
                description: 'Lần đầu cùng nhau làm thiện nguyện, chia sẻ yêu thương với cộng đồng. Tình yêu không chỉ dành cho nhau mà còn lan tỏa đến mọi người.',
                details: 'Hoạt động thiện nguyện ở Trà Vinh đã mang đến cho chúng mình cảm giác ý nghĩa và hạnh phúc khi được giúp đỡ những người cần hỗ trợ.'
            },
            memory10: {
                icon: '🐱',
                title: 'Nhặt được bé Cá',
                date: '25/10/2024',
                description: 'Thành viên mới của gia đình nhỏ - chú mèo Cá đáng yêu. Từ một cặp đôi, chúng mình trở thành một gia đình nhỏ với thêm một "con" cưng.',
                details: 'Bé Cá xuất hiện trong cuộc đời chúng mình như một món quà bất ngờ. Từ đó, nhà mình thêm tiếng kêu meo meo dễ thương và những khoảnh khắc hạnh phúc mới.'
            },
            memory11: {
                icon: '🏙️',
                title: 'Khám phá rooftop',
                date: '05/01/2025',
                description: 'Tìm được quán rooftop yêu thích, ngắm thành phố từ trên cao. Những buổi tối lãng mạn với view đẹp và không gian riêng tư.',
                details: 'Quán rooftop đã trở thành địa điểm hẹn hò yêu thích của chúng mình. Ngắm thành phố về đêm, thưởng thức đồ uống và tận hưởng những phút giây yên bình bên nhau.'
            }
        };
        
        // Thêm click handlers cho memory cards
        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const memoryId = card.getAttribute('data-memory');
                this.openModal(memoryId);
            });
        });

        // Close modal handlers
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(memoryId) {
        const modal = document.getElementById('memoryModal');
        const data = this.memoryDetails[memoryId];
        
        if (data) {
            document.querySelector('.modal-icon').textContent = data.icon;
            document.querySelector('.modal-title').textContent = data.title;
            document.querySelector('.modal-date').textContent = data.date;
            document.querySelector('.modal-description').textContent = data.description;
            document.querySelector('.modal-details').textContent = data.details;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Typewriter effect
            this.typewriterEffect(document.querySelector('.modal-description'));
        }
    }

    closeModal() {
        const modal = document.getElementById('memoryModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    typewriterEffect(element) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        };
        
        setTimeout(type, 500);
    }

    // Điều khiển âm nhạc
    setupMusicControls() {
        const musicBtn = document.getElementById('musicToggle');
        const rainBtn = document.getElementById('rainToggle');
        
        musicBtn.addEventListener('click', () => {
            this.toggleMusic();
        });
        
        rainBtn.addEventListener('click', () => {
            this.toggleRain();
        });
    }

    // Tạo âm thanh tự nhiên
    createNatureAmbience() {
        try {
            this.musicContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    // Bật/tắt nhạc nền
    toggleMusic() {
        const musicBtn = document.getElementById('musicToggle');
        
        if (!this.musicContext) {
            return;
        }
        
        if (musicBtn.classList.contains('playing')) {
            this.stopMusic();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Nhạc nền</span>';
        } else {
            this.playMusic();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i><span>Đang phát</span>';
        }
    }

    playMusic() {
        if (!this.musicContext) return;
        
        // Tạo âm thanh tự nhiên đơn giản
        this.backgroundMusic = this.createNatureSound();
    }

    stopMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
            this.backgroundMusic = null;
        }
    }

    createNatureSound() {
        if (!this.musicContext) return null;
        
        const oscillator = this.musicContext.createOscillator();
        const gainNode = this.musicContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.musicContext.destination);
        
        // Tạo âm thanh giống như gió thổi
        oscillator.frequency.setValueAtTime(100, this.musicContext.currentTime);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.05, this.musicContext.currentTime);
        
        oscillator.start();
        
        return oscillator;
    }

    // Bật/tắt hiệu ứng mưa
    toggleRain() {
        const rainBtn = document.getElementById('rainToggle');
        
        if (this.isRaining) {
            this.stopRain();
            rainBtn.classList.remove('active');
            rainBtn.innerHTML = '<i class="fas fa-cloud-rain"></i><span>Mưa rơi</span>';
        } else {
            this.startRain();
            rainBtn.classList.add('active');
            rainBtn.innerHTML = '<i class="fas fa-cloud-sun-rain"></i><span>Đang mưa</span>';
        }
        
        this.isRaining = !this.isRaining;
    }

    startRain() {
        this.rainInterval = setInterval(() => {
            this.createRainDrop();
        }, 100);
    }

    stopRain() {
        if (this.rainInterval) {
            clearInterval(this.rainInterval);
            this.rainInterval = null;
        }
        
        // Xóa các giọt mưa hiện tại
        document.querySelectorAll('.rain-drop').forEach(drop => {
            drop.remove();
        });
    }

    createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.height = Math.random() * 50 + 20 + 'px';
        drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        document.body.appendChild(drop);
        
        // Xóa giọt mưa sau khi animation kết thúc
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, 3000);
    }

    // Cập nhật thống kê
    updateStats() {
        // Tính số ngày từ ngày bắt đầu (01/09/2023)
        const startDate = new Date('2023-09-01');
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Animate số liệu
        this.animateCounters(daysDiff);
    }

    animateCounters(actualDays) {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach((counter, index) => {
            const finalValue = counter.getAttribute('data-count');
            if (finalValue && finalValue !== '∞') {
                let currentValue = 0;
                const increment = parseInt(finalValue) / 100;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= parseInt(finalValue)) {
                        currentValue = parseInt(finalValue);
                        clearInterval(timer);
                    }
                    
                    if (index === 0) {
                        // Số ngày thực tế
                        counter.textContent = Math.floor(Math.min(currentValue, actualDays));
                    } else {
                        counter.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
                    }
                }, 50);
            }
        });
    }

    // Hiệu ứng tương tác
    addInteractiveEffects() {
        // Parallax cho các phần tử nổi
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.cloud, .leaf, .petal');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Hiệu ứng cho background hills
            const hills = document.querySelectorAll('.hill');
            hills.forEach((hill, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = scrolled * speed;
                hill.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Hover effects cho memory cards
        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });
        });

        // Click hiệu ứng
        document.addEventListener('click', (e) => {
            this.createClickRipple(e.clientX, e.clientY);
        });
    }

    addCardHoverEffect(card) {
        const icon = card.querySelector('.icon-circle');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
            icon.style.transition = 'all 0.4s ease';
        }
        
        // Thêm hiệu ứng sáng
        card.style.filter = 'brightness(1.05) saturate(1.1)';
    }

    removeCardHoverEffect(card) {
        const icon = card.querySelector('.icon-circle');
        if (icon) {
            icon.style.transform = 'scale(1) rotateY(0deg)';
        }
        
        card.style.filter = 'none';
    }

    // Tạo hiệu ứng ripple khi click
    createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = x - 25 + 'px';
        ripple.style.top = y - 25 + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(143, 188, 143, 0.6) 0%, transparent 70%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        ripple.style.animation = 'rippleEffect 0.6s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Tạo hiệu ứng hạt đặc biệt
    createSpecialParticle(type) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-50px';
        particle.style.fontSize = '1.5rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        particle.textContent = type;
        particle.style.animation = 'fallAndFade 4s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }

    // Easter egg: Konami code
    setupKonamiCode() {
        let sequence = [];
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        document.addEventListener('keydown', (e) => {
            sequence.push(e.code);
            sequence = sequence.slice(-konamiCode.length);
            
            if (sequence.join('') === konamiCode.join('')) {
                this.activateEasterEgg();
            }
        });
    }

    activateEasterEgg() {
        // Tạo pháo hoa hạt
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createSpecialParticle(['💖', '🌸', '✨', '🎉'][Math.floor(Math.random() * 4)]);
            }, i * 100);
        }
        
        // Thông báo đặc biệt
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(255, 255, 255, 0.95)';
        message.style.padding = '2rem';
        message.style.borderRadius = '20px';
        message.style.textAlign = 'center';
        message.style.zIndex = '10000';
        message.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        message.innerHTML = `
            <h3 style="color: #2F4F2F; margin-bottom: 1rem; font-family: 'Dancing Script', cursive; font-size: 2rem;">
                Chúc mừng! 🎉
            </h3>
            <p style="color: #556B2F; font-size: 1.1rem;">
                Bạn đã tìm ra easter egg! <br>
                Tình yêu như pháo hoa - rực rỡ và đầy màu sắc! 💕
            </p>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 1000);
        }, 3000);
    }

    // Khởi tạo khi trang load xong
    startTimeline() {
        // Fade in effect cho toàn bộ trang
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1.5s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Khởi động Konami code
        this.setupKonamiCode();
        
        // Tạo thêm hạt đặc biệt định kỳ
        setInterval(() => {
            if (Math.random() > 0.8) {
                this.createSpecialParticle(['🌸', '🍃', '✨'][Math.floor(Math.random() * 3)]);
            }
        }, 5000);
    }
}

// CSS animations được thêm động
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fallAndFade {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .memory-card {
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .memory-card:hover {
        transform: translateY(-15px) scale(1.02);
    }
    
    .stats-section.visible .stat-item {
        animation: slideInUp 0.8s ease forwards;
    }
    
    .stats-section.visible .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .stats-section.visible .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .stats-section.visible .stat-item:nth-child(3) { animation-delay: 0.3s; }
    .stats-section.visible .stat-item:nth-child(4) { animation-delay: 0.4s; }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    /* Hiệu ứng loading đặc biệt */
    .loading-heart {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        animation: heartbeat 1s infinite ease-in-out;
        z-index: 10000;
    }
    
    @keyframes heartbeat {
        0%, 50%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        25%, 75% {
            transform: translate(-50%, -50%) scale(1.1);
        }
    }
`;

document.head.appendChild(additionalStyles);

// Khởi tạo timeline khi DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    const timeline = new GhibliTimeline();
    timeline.startTimeline();
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Service worker để cache tài nguyên
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export class để có thể sử dụng ở nơi khác
window.GhibliTimeline = GhibliTimeline;
