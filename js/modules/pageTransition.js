export const pageTransition = {
    init() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        document.body.appendChild(this.overlay);
    },

    start() {
        this.overlay.classList.add('active');
        return new Promise(resolve => {
            setTimeout(resolve, 300);
        });
    },

    finish() {
        this.overlay.classList.remove('active');
    }
};

export function initPageTransition() {
    pageTransition.init();

    // 链接跳转动画
    document.querySelectorAll('a[href^="./"], a[href^="../"]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const target = e.currentTarget.href;
            await pageTransition.start();
            window.location.href = target;
        });
    });
} 