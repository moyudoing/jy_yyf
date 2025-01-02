export class ScrollObserver {
    constructor(options = {}) {
        this.options = {
            threshold: 0.1,
            rootMargin: '0px',
            ...options
        };

        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.elements = new Map();
    }

    observe(element, callback) {
        if (!element) return;

        this.elements.set(element, callback);
        this.observer.observe(element);
    }

    unobserve(element) {
        if (!element) return;

        this.elements.delete(element);
        this.observer.unobserve(element);
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            const callback = this.elements.get(entry.target);
            if (callback) {
                callback(entry);
            }
        });
    }

    disconnect() {
        this.observer.disconnect();
        this.elements.clear();
    }
}

// 使用示例:
/*
const scrollObserver = new ScrollObserver();

// 观察元素
document.querySelectorAll('.scroll-reveal').forEach(element => {
    scrollObserver.observe(element, (entry) => {
        if (entry.isIntersecting) {
            element.classList.add('active');
            scrollObserver.unobserve(element);
        }
    });
});
*/
