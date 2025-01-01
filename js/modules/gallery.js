export class Gallery {
    constructor(element) {
        if (!element) return;

        this.container = element.querySelector('.gallery-container');
        this.items = element.querySelectorAll('.gallery-item');
        this.nav = element.querySelector('.gallery-nav');
        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.createNavigation();
        this.setupAutoplay();
        this.setupTouchEvents();
    }

    createNavigation() {
        this.items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `gallery-dot${index === 0 ? ' active' : ''}`;
            const img = new Image();
            img.src = this.items[index].querySelector('img').src;
            dot.addEventListener('click', () => this.goTo(index));
            this.nav?.appendChild(dot);
        });
    }

    setupAutoplay() {
        setInterval(() => {
            this.next();
        }, 5000);
    }

    setupTouchEvents() {
        let startX = 0;
        let isDragging = false;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) this.next();
                else this.prev();
                isDragging = false;
            }
        });

        this.container.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    goTo(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.container.style.transform = `translateX(-${index * 100}%)`;
        this.updateNavigation(index);
        this.currentIndex = index;

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

    updateNavigation(index) {
        const dots = this.nav.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}
