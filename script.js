// Enhanced Love Timeline với Attack on Titan Effects
class EnhancedLoveTimeline {
    constructor() {
        this.titanEffectActive = false;
        this.musicPlaying = false;
        this.canvas = null;
        this.ctx = null;
        this.audioContext = null;
        this.lightningInterval = null;
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupScrollAnimations();
        this.setupModalHandlers();
        this.setupControlHandlers();
        this.setupBackgroundImages();
        this.updateStats();
        this.addInteractiveEffects();
        this.startTimeline();
    }

    // Thiết lập canvas cho hiệu ứng Attack on Titan
    setupCanvas() {
        this.canvas = document.getElementById('titanCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animateCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Animation loop chính cho canvas
    animateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.titanEffectActive) {
            this.drawTitanEffects();
        }
        
        this.animationId = requestAnimationFrame(() => this.animateCanvas());
    }

    // Vẽ hiệu ứng Attack on Titan
    drawTitanEffects() {
        const time = Date.now() * 0.001;
        
        // Vẽ các tia sét nhỏ
        for (let i = 0; i < 3; i++) {
            const x = Math.sin(time + i * 2) * 200 + this.canvas.width / 2;
            const y = Math.cos(time + i * 1.5) * 150 + this.canvas.height / 2;
            
            this.drawLightning(x, y, 50 + Math.sin(time + i) * 20);
        }
        
        // Hiệu ứng gió
        this.drawWindEffects(time);
        
        // Particles bay lơ lửng
        this.drawFloatingParticles(time);
    }

    // Vẽ tia sét
    drawLightning(centerX, centerY, intensity) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.3 + Math.random() * 0.4;
        
        // Gradient cho tia sét
        const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, intensity);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.3, '#87ceeb');
        gradient.addColorStop(0.6, '#ffd700');
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, intensity, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Vẽ tia sáng
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
            const length = intensity * (0.5 + Math.random() * 0.5);
            
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 1 + Math.random() * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length
            );
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }

    // Vẽ hiệu ứng gió
    drawWindEffects(time) {
        for (let i = 0; i < 5; i++) {
            const y = (i * this.canvas.height / 5) + Math.sin(time + i) * 50;
            const x = (time * 100 + i * 200) % (this.canvas.width + 200) - 200;
            const width = 100 + Math.sin(time + i) * 50;
            
            this.ctx.save();
            this.ctx.globalAlpha = 0.1 + Math.sin(time + i) * 0.1;
            
            const gradient = this.ctx.createLinearGradient(x, y, x + width, y);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, width, 3);
            
            this.ctx.restore();
        }
    }

    // Vẽ particles bay lơ lửng
    drawFloatingParticles(time) {
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(time * 0.5 + i) * this.canvas.width * 0.3) + this.canvas.width / 2;
            const y = (Math.cos(time * 0.3 + i) * this.canvas.height * 0.2) + this.canvas.height / 2;
            const size = 2 + Math.sin(time + i) * 1;
            
            this.ctx.save();
            this.ctx.globalAlpha = 0.2 + Math.sin(time + i) * 0.3;
            this.ctx.fillStyle = '#87ceeb';
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    // Thiết lập hình nền cho memory cards
    setupBackgroundImages() {
        document.querySelectorAll('.memory-card').forEach(card => {
            const bgElement = card.querySelector('.memory-background');
            const bgImage = card.getAttribute('data-bg');
            
            if (bgImage && bgElement) {
                bgElement.style.backgroundImage = `url('images/${bgImage}')`;
                
                // Tạo fallback gradient nếu không có hình
                bgElement.style.backgroundImage += `, linear-gradient(135deg, 
                    rgba(255, 107, 107, 0.3),
                    rgba(66, 165, 245, 0.3)
                )`;
            }
        });
    }

    // Scroll animations với Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Staggered animation
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.opacity = '1';
                        
                        // Trigger titan flash khi card xuất hiện
                        if (this.titanEffectActive && entry.target.classList.contains('memory-card')) {
                            this.triggerTitanFlash();
                        }
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe tất cả memory cards
        document.querySelectorAll('.memory-card').forEach(card => {
            observer.observe(card);
        });

        // Observe stats section
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // Modal handlers với data chi tiết
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
                details: 'Quán cafe nhỏ ấy giờ đã trở thành quán Atom, nhưng kỷ niệm về lời tỏ tình đầu tiên sẽ mãi mãi được lưu giữ trong trái tim chúng mình. Những ly cà phê đắng nhưng ngọt ngào trong tâm hồn.'
            },
            memory3: {
                icon: '🏝️',
                title: 'Đảo Bình Hưng',
                date: '15/09/2023',
                description: 'Chuyến du lịch đầu tiên cùng công ty, nhưng trái tim chỉ nhìn thấy nhau. Biển xanh, cát trắng và tình yêu mới chớm nở.',
                details: 'Dù đi cùng đoàn công ty đông đúc, nhưng hai chúng mình vẫn tìm được những khoảnh khắc riêng tư bên nhau, ngắm hoàng hôn và tận hưởng những giây phút ngọt ngào đầu tiên trên đảo xinh.'
            },
            memory4: {
                icon: '🌊',
                title: 'Vũng Tàu đón năm mới',
                date: '31/12/2023',
                description: 'Chỉ có hai đứa mình, bãi biển và những ước nguyện cho năm mới. Tiếng sóng vỗ như những lời chúc phước cho tình yêu chúng mình.',
                details: 'Đêm giao thừa bên biển Vũng Tàu, chúng mình cùng nhau đếm ngược và chào đón năm 2024 với biết bao hy vọng và ước mơ đẹp. Pháo hoa trên bầu trời như chứng nhân cho tình yêu.'
            },
            memory5: {
                icon: '🏞️',
                title: 'Hồ Trị An',
                date: '17/02/2024',
                description: 'Cùng hội bạn thân khám phá vẻ đẹp thanh bình của hồ nước. Thiên nhiên hùng vĩ chứng kiến tình yêu chúng mình ngày càng bền chặt.',
                details: 'Hồ Trị An với khung cảnh thơ mộng đã tạo nên nhiều kỷ niệm đẹp. Cùng bạn bè mà vẫn có những khoảnh khắc ngọt ngào chỉ dành riêng cho nhau, ngắm mặt nước trong veo phản chiếu bầu trời.'
            },
            memory6: {
                icon: '🌲',
                title: 'Nam Cát Tiên chill',
                date: '11/05/2024',
                description: 'Giữa rừng xanh mướt, tìm thấy sự yên bình trong vòng tay nhau. Không khí trong lành và tiếng chim hót tạo nên bản nhạc tình yêu tuyệt vời.',
                details: 'Nam Cát Tiên mang đến cho chúng mình những giây phút thật chill và thư thái. Đi dạo trong rừng, nghe tiếng chim hót và cảm nhận thiên nhiên hùng vĩ, tìm thấy sự bình yên trong tâm hồn.'
            },
            memory7: {
                icon: '💒',
                title: 'Phụ rể và phù dâu',
                date: '22/06/2024',
                description: 'Lần đầu làm phụ rể và được bé bồ làm phù dâu - như thử nghiệm cho tương lai. Cùng nhau góp phần tạo nên hạnh phúc cho người khác.',
                details: 'Được đứng cạnh nhau trong một đám cưới, như một lời hứa thầm lặng về tương lai. Những khoảnh khắc ấy khiến chúng mình nghĩ nhiều về ngày mai và ước mơ về một đám cưới của riêng mình.'
            },
            memory8: {
                icon: '🎂',
                title: '1 năm yêu nhau',
                date: '01/09/2024',
                description: 'Kỷ niệm 1 năm tại biển Hoài Nhơn và tuần khám phá Bình Định đầy ý nghĩa. 365 ngày yêu thương được tổng kết bằng một chuyến đi đặc biệt.',
                details: 'Một năm yêu nhau đã trôi qua thật nhanh. Bình Định với biển Quy Nhơn, Nhơn Lý và các di tích tháp Chăm đã chứng kiến tình yêu chúng mình trưởng thành và bền chặt hơn.'
            },
            memory9: {
                icon: '🤝',
                title: 'Thiện nguyện Trà Vinh',
                date: '17/09/2024',
                description: 'Lần đầu cùng nhau làm thiện nguyện, chia sẻ yêu thương với cộng đồng. Tình yêu không chỉ dành cho nhau mà còn lan tỏa đến mọi người.',
                details: 'Hoạt động thiện nguyện ở Trà Vinh đã mang đến cho chúng mình cảm giác ý nghĩa và hạnh phúc khi được giúp đỡ những người cần hỗ trợ. Tình yêu được nhân lên khi chia sẻ.'
            },
            memory10: {
                icon: '🐱',
                title: 'Nhặt được bé Cá',
                date: '25/10/2024',
                description: 'Thành viên mới của gia đình nhỏ - chú mèo Cá đáng yêu. Từ một cặp đôi, chúng mình trở thành một gia đình nhỏ với thêm một "con" cưng.',
                details: 'Bé Cá xuất hiện trong cuộc đời chúng mình như một món quà bất ngờ. Từ đó, nhà mình thêm tiếng kêu meo meo dễ thương và những khoảnh khắc hạnh phúc mới mỗi ngày.'
            },
            memory11: {
                icon: '🏙️',
                title: 'Khám phá rooftop',
                date: '05/01/2025',
                description: 'Tìm được quán rooftop yêu thích, ngắm thành phố từ trên cao. Những buổi tối lãng mạn với view đẹp và không gian riêng tư.',
                details: 'Quán rooftop đã trở thành địa điểm hẹn hò yêu thích của chúng mình. Ngắm thành phố về đêm, thưởng thức đồ uống và tận hưởng những phút giây yên bình bên nhau.'
            }
        };
        
        // Event listeners cho memory cards
        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const memoryId = card.getAttribute('data-memory');
                this.openModal(memoryId);
                
                if (this.titanEffectActive) {
                    this.triggerTitanFlash();
                }
            });
        });

        // Close modal handlers
        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
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
            setTimeout(() => {
                this.typewriterEffect(document.querySelector('.modal-description'));
            }, 300);
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
        
        setTimeout(type, 200);
    }

    // Thiết lập điều khiển
    setupControlHandlers() {
        const musicBtn = document.getElementById('musicToggle');
        const titanBtn = document.getElementById('titanToggle');
        
        musicBtn.addEventListener('click', () => this.toggleMusic());
        titanBtn.addEventListener('click', () => this.toggleTitanEffect());
    }

    // Bật/tắt nhạc nền
    toggleMusic() {
        const musicBtn = document.getElementById('musicToggle');
        
        if (this.musicPlaying) {
            this.stopMusic();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-music"></i><span>Nhạc nền</span>';
        } else {
            this.playMusic();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i><span>Đang phát</span>';
        }
        
        this.musicPlaying = !this.musicPlaying;
    }

    playMusic() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createAmbientSound();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    stopMusic() {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }

    createAmbientSound() {
        if (!this.audioContext) return;
        
        // Tạo âm thanh ambient đơn giản
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
        
        oscillator.start();
        
        // Tạo thêm layer harmonics
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode2 = this.audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(this.audioContext.destination);
        
        oscillator2.frequency.setValueAtTime(120, this.audioContext.currentTime);
        oscillator2.type = 'triangle';
        gainNode2.gain.setValueAtTime(0.01, this.audioContext.currentTime);
        
        oscillator2.start();
    }

    // Bật/tắt hiệu ứng Attack on Titan
    toggleTitanEffect() {
        const titanBtn = document.getElementById('titanToggle');
        
        if (this.titanEffectActive) {
            this.stopTitanEffect();
            titanBtn.classList.remove('active');
            titanBtn.innerHTML = '<i class="fas fa-bolt"></i><span>Titan Effect</span>';
        } else {
            this.startTitanEffect();
            titanBtn.classList.add('active');
            titanBtn.innerHTML = '<i class="fas fa-thunder"></i><span>Đang kích hoạt</span>';
        }
        
        this.titanEffectActive = !this.titanEffectActive;
    }

    startTitanEffect() {
        // Bắt đầu hiệu ứng sét đánh định kỳ
        this.lightningInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                this.triggerTitanFlash();
            }
        }, 3000 + Math.random() * 5000);
        
        // Trigger ngay lập tức
        this.triggerTitanFlash();
    }

    stopTitanEffect() {
        if (this.lightningInterval) {
            clearInterval(this.lightningInterval);
            this.lightningInterval = null;
        }
    }

    // Kích hoạt hiệu ứng flash và sét
    triggerTitanFlash() {
        // Tạo flash toàn màn hình
        const flash = document.createElement('div');
        flash.className = 'titan-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 300);
        
        // Tạo lightning bolts
        this.createLightningBolts();
        
        // Tạo wind effects
        this.createWindEffects();
    }

    createLightningBolts() {
        const numBolts = 2 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < numBolts; i++) {
            setTimeout(() => {
                const bolt = document.createElement('div');
                bolt.className = 'lightning-bolt';
                
                const x = Math.random() * window.innerWidth;
                const height = 100 + Math.random() * 200;
                
                bolt.style.left = x + 'px';
                bolt.style.top = '0px';
                bolt.style.height = height + 'px';
                
                document.body.appendChild(bolt);
                
                setTimeout(() => {
                    bolt.remove();
                }, 500);
            }, i * 100);
        }
    }

    createWindEffects() {
        const numWinds = 3 + Math.floor(Math.random() * 2);
        
        for (let i = 0; i < numWinds; i++) {
            setTimeout(() => {
                const wind = document.createElement('div');
                wind.className = 'wind-effect';
                
                const y = Math.random() * window.innerHeight;
                wind.style.top = y + 'px';
                wind.style.left = '-100px';
                
                document.body.appendChild(wind);
                
                setTimeout(() => {
                    wind.remove();
                }, 2000);
            }, i * 200);
        }
    }

    // Cập nhật thống kê
    updateStats() {
        const startDate = new Date('2023-09-01');
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        this.animateCounters(daysDiff);
    }

    animateCounters(actualDays) {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach((counter, index) => {
            const finalValue = counter.getAttribute('data-count');
            if (finalValue && finalValue !== '∞') {
                let currentValue = 0;
                const increment = parseInt(finalValue) / 60;
                const duration = 2000; // 2 seconds
                const stepTime = duration / 60;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= parseInt(finalValue)) {
                        currentValue = parseInt(finalValue);
                        clearInterval(timer);
                    }
                    
                    if (index === 0) {
                        counter.textContent = Math.floor(Math.min(currentValue, actualDays));
                    } else {
                        counter.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
                    }
                }, stepTime);
            }
        });
    }

    // Hiệu ứng tương tác nâng cao
    addInteractiveEffects() {
        // Parallax scrolling
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax cho header background
            const header = document.querySelector('.header');
            if (header) {
                header.style.transform = `translateY(${rate * 0.3}px)`;
            }
        }, 10));

        // Enhanced hover effects
        document.querySelectorAll('.memory-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });
        });

        // Click ripple effect
        document.addEventListener('click', (e) => {
            this.createRippleEffect(e.clientX, e.clientY);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'm':
                    case 'M':
                        e.preventDefault();
                        this.toggleMusic();
                        break;
                    case 't':
                    case 'T':
                        e.preventDefault();
                        this.toggleTitanEffect();
                        break;
                }
            }
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    addCardHoverEffect(card) {
        const icon = card.querySelector('.icon-circle');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotateY(360deg)';
        }
        
        card.style.filter = 'brightness(1.1) saturate(1.2)';
        
        if (this.titanEffectActive && Math.random() > 0.8) {
            this.createSparkEffect(card);
        }
    }

    removeCardHoverEffect(card) {
        const icon = card.querySelector('.icon-circle');
        if (icon) {
            icon.style.transform = 'scale(1) rotateY(0deg)';
        }
        
        card.style.filter = 'none';
    }

    createSparkEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 5; i++) {
            const spark = document.createElement('div');
            spark.style.position = 'fixed';
            spark.style.left = centerX + 'px';
            spark.style.top = centerY + 'px';
            spark.style.width = '4px';
            spark.style.height = '4px';
            spark.style.background = '#fff';
            spark.style.borderRadius = '50%';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '9999';
            
            const angle = (i / 5) * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            spark.style.animation = `sparkFly 0.6s ease-out forwards`;
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                spark.remove();
            }, 600);
        }
    }

    createRippleEffect(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = (x - 25) + 'px';
        ripple.style.top = (y - 25) + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        ripple.style.animation = 'ripple 0.6s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Khởi tạo timeline
    startTimeline() {
        // Fade in effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 2s ease-in-out';
        
        // Show loading effect
        const loadingHeart = document.createElement('div');
        loadingHeart.className = 'loading-titan';
        loadingHeart.textContent = '⚡';
        document.body.appendChild(loadingHeart);
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            loadingHeart.remove();
        }, 1000);
        
        // Welcome message
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 2000);
    }

    showWelcomeMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 2000;
            animation: slideDown 0.5s ease-out;
            text-align: center;
            font-size: 0.9rem;
        `;
        
        message.innerHTML = `
            <div>✨ Chào mừng đến với timeline tình yêu của chúng mình ✨</div>
            <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 0.5rem;">
                Nhấn Ctrl+M để bật nhạc • Ctrl+T để kích hoạt hiệu ứng Titan
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideUp 0.5s ease-out forwards';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 4000);
    }
}

// CSS animations được thêm động
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes slideDown {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px);
        }
        100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-50px);
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes sparkFly {
        0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(var(--dx, 0), var(--dy, 0));
            opacity: 0;
        }
    }
`;

document.head.appendChild(enhancedStyles);

// Khởi tạo khi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    const timeline = new EnhancedLoveTimeline();
});

// Service Worker để cache
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .catch(err => console.log('SW registration failed'));
    });
}
