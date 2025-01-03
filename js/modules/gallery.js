export class Gallery {
    constructor(container, options = {}) {
        this.container = container;
        this.items = container.querySelectorAll('.gallery-item');
        this.options = {
            autoplay: true,
            interval: 5000,
            ...options
        };

        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoplayInterval = null;

        this.init();
    }

    init() {
        // 创建导航点
        this.createDots();

        // 触摸事件
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoplay();
        });

        this.container.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
            const diff = touchStartX - touchEndX;
            const percentage = (diff / this.container.offsetWidth) * 100;

            if (Math.abs(percentage) <= 100) {
                this.container.style.transform = `translateX(${-this.currentIndex * 100 - percentage}%)`;
            }
        });

        this.container.addEventListener('touchend', () => {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            } else {
                this.goToSlide(this.currentIndex);
            }
            this.startAutoplay();
        });

        // 鼠标事件
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());

        // 开始自动播放
        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'gallery-nav';

        this.items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `gallery-dot${index === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        this.container.parentNode.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.gallery-dot');
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.dots[this.currentIndex].classList.remove('active');
        this.dots[index].classList.add('active');

        this.container.style.transform = `translateX(-${index * 100}%)`;
        this.currentIndex = index;

        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goToSlide(prevIndex);
    }

    startAutoplay() {
        if (this.options.autoplay && !this.autoplayInterval) {
            this.autoplayInterval = setInterval(() => this.next(), this.options.interval);
        }
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    destroy() {
        this.stopAutoplay();
        // 清理事件监听器
    }
}
