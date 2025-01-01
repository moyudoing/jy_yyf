// 滚动动画
export function initSectionAnimation() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// 链接动画效果
export function initLinkAnimation() {
    const sectionLinks = document.querySelectorAll('.section-link');
    sectionLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.querySelector('i')?.style.setProperty('transform', 'translateX(5px)');
        });

        link.addEventListener('mouseleave', () => {
            link.querySelector('i')?.style.setProperty('transform', 'translateX(0)');
        });
    });
} 