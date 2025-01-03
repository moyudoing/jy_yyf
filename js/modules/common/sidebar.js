export function initSidebar() {
    const sideNav = document.querySelector('.side-nav');
    if (!sideNav) return;

    const navItems = sideNav.querySelectorAll('.side-nav-item');
    const sections = document.querySelectorAll('section[id]');

    // 滚动到指定部分
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offset = 80; // 导航栏高度
                const targetPosition = targetSection.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 更新活动状态
    function updateActiveSection() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.dataset.target === sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // 显示/隐藏侧边导航
    let lastScrollY = window.scrollY;
    let isVisible = true;

    function toggleSideNav() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && isVisible && currentScrollY > 300) {
            sideNav.style.transform = 'translate(100%, -50%)';
            isVisible = false;
        } else if ((currentScrollY < lastScrollY && !isVisible) || currentScrollY < 300) {
            sideNav.style.transform = 'translate(0, -50%)';
            isVisible = true;
        }

        lastScrollY = currentScrollY;
    }

    // 事件监听
    window.addEventListener('scroll', () => {
        updateActiveSection();
        toggleSideNav();
    });

    // 初始化
    updateActiveSection();
}
