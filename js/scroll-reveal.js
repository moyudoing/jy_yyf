// 滚动显示动画
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');

    const reveal = () => {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    };

    // 初始检查
    reveal();

    // 滚动时检查
    window.addEventListener('scroll', reveal);
    window.addEventListener('resize', reveal);
};

// 平滑滚动
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();
    smoothScroll();
});
