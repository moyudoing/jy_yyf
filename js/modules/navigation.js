export function initNavigation() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');

    // 移动端菜单
    mobileMenu?.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks?.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // 下拉菜单
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');

        if (window.innerWidth <= 768) {
            link?.addEventListener('click', (e) => {
                e.preventDefault();
                content.style.display =
                    content.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // 点击外部关闭
    document.addEventListener('click', (e) => {
        if (!navLinks?.contains(e.target) && !mobileMenu?.contains(e.target)) {
            navLinks?.classList.remove('active');
            mobileMenu?.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}
