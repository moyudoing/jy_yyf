// 移动端菜单
export function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// 移动端滑动跳转
export function initMobileSwipe() {
    const mobileProductNav = document.querySelector('.mobile-products-nav');
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 100;
        if (touchEndX < touchStartX - swipeThreshold) {
            // 左滑
            window.location.href = 'pages/products/high-entropy.html';
        }
    }
}
