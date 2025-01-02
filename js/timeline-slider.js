class TimelineSlider {
    constructor() {
        this.slider = document.querySelector('.timeline-slider');
        this.items = document.querySelectorAll('.timeline-item');
        this.dots = document.querySelectorAll('.timeline-dot');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    init() {
        this.createDots();
        this.addEventListeners();
        this.startAutoPlay();
        this.updateSlider();
    }

    addEventListeners() {
        // 触摸事件
        this.slider.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        });

        this.slider.addEventListener('touchmove', (e) => {
            if (this.isAnimating) return;
            const currentX = e.touches[0].clientX;
            const diff = this.touchStartX - currentX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
                this.touchStartX = currentX;
            }
        });

        this.slider.addEventListener('touchend', () => {
            this.startAutoPlay();
        });

        // 鼠标事件
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());

        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'timeline-navigation';

        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'timeline-dot';
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dotsContainer.appendChild(dot);
        });

        this.slider.parentNode.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.timeline-dot');
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateSlider();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateSlider();
    }

    updateSlider() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const offset = -this.currentIndex * 100;
        this.slider.style.transform = `translateX(${offset}%)`;

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // 添加过渡结束监听
        const handleTransitionEnd = () => {
            this.isAnimating = false;
            this.slider.removeEventListener('transitionend', handleTransitionEnd);
        };
        this.slider.addEventListener('transitionend', handleTransitionEnd);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new TimelineSlider();
});
