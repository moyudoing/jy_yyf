export class TimelineSlider {
    constructor() {
        this.container = document.querySelector('.development-gallery');
        this.items = document.querySelectorAll('.development-item');
        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        if (!this.container || this.items.length === 0) return;

        // 创建导航点
        this.createNavDots();

        // 初始化第一个项目
        this.items[0].classList.add('active');

        // 添加触摸事件
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', () => {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });

        // 添加键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });

        // 添加滚动监听
        this.observeItems();
    }

    createNavDots() {
        const nav = document.createElement('div');
        nav.className = 'development-nav';

        this.items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `nav-dot${index === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            nav.appendChild(dot);
        });

        this.container.appendChild(nav);
        this.dots = nav.querySelectorAll('.nav-dot');
    }

    observeItems() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(this.items).indexOf(entry.target);
                    this.updateActiveDot(index);
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, options);

        this.items.forEach(item => observer.observe(item));
    }

    updateActiveDot(index) {
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.isAnimating = true;

        // 移除当前活动状态
        this.items[this.currentIndex].classList.remove('active');

        // 设置新的活动状态
        this.currentIndex = index;
        this.items[this.currentIndex].classList.add('active');
        this.updateActiveDot(index);

        // 滚动到视图
        this.items[this.currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });

        // 动画锁定
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
}
