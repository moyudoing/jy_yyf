export class Gallery {
    constructor(element) {
        if (!element) return;

        this.container = element.querySelector('.gallery-container');
        this.items = element.querySelectorAll('.gallery-item');
        this.nav = element.querySelector('.gallery-nav');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.autoplayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        this.createNavigation();
        this.setupTouchEvents();
        this.setupMouseEvents();
        this.startAutoplay();
    }

    createNavigation() {
        if (!this.nav || !this.items.length) return;

        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `nav-dot${index === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Slide ${index + 1}`);
            dot.addEventListener('click', () => this.goTo(index));
            this.nav.appendChild(dot);
        });

        this.dots = this.nav.querySelectorAll('.nav-dot');
    }

    setupTouchEvents() {
        if (!this.container) return;

        this.container.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.stopAutoplay();
        }, {passive: true});

        this.container.addEventListener('touchmove', (e) => {
            this.touchEndX = e.touches[0].clientX;
            const diff = this.touchStartX - this.touchEndX;
            const threshold = this.container.offsetWidth * 0.2;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) this.next();
                else this.prev();
                this.touchStartX = this.touchEndX;
            }
        }, {passive: true});

        this.container.addEventListener('touchend', () => {
            this.startAutoplay();
        });
    }

    setupMouseEvents() {
        if (!this.container) return;

        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goTo(index, animate = true) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = true;

        // 更新导航点
        if (this.dots) {
            this.dots[this.currentIndex].classList.remove('active');
            this.dots[index].classList.add('active');
        }

        // 移除当前项的活动状态
        this.items[this.currentIndex].classList.remove('active');

        // 设置过渡动画
        if (animate) {
            this.container.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            this.container.style.transition = 'none';
        }

        // 滑动到新项
        this.container.style.transform = `translateX(-${index * 100}%)`;

        // 添加新项的活动状态
        setTimeout(() => {
            this.items[index].classList.add('active');
        }, 50);

        this.currentIndex = index;

        // 重置动画状态
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goTo(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goTo(prevIndex);
    }

    startAutoplay(interval = 5000) {
        if (this.autoplayInterval) return;
        this.autoplayInterval = setInterval(() => this.next(), interval);
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
        if (this.container) {
            this.container.removeEventListener('mouseenter', this.stopAutoplay);
            this.container.removeEventListener('mouseleave', this.startAutoplay);
        }
    }
}
