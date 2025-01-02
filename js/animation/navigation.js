export function initNavigation() {
    // 获取导航相关元素
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // 移动端菜单切换
    mobileMenu?.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks?.classList.toggle('active');
    });

    // 滚动时导航栏效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;

        // 添加/移除滚动样式
        navbar?.classList.toggle('scrolled', scrollTop > 50);

        // 向下滚动时隐藏导航栏
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar?.classList.add('hidden');
        } else {
            navbar?.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });
}
