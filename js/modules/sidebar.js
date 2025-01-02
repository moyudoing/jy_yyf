export function initSidebar() {
    const sideNav = document.querySelector('.side-nav');
    if (!sideNav) return;

    // 滚动监听
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.side-nav-item');

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

    // 平滑滚动
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.dataset.target;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 显示/隐藏侧边导航
    let lastScrollY = window.scrollY;
    let isVisible = true;

    function toggleSideNav() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && isVisible) {
            sideNav.style.transform = 'translate(100%, -50%)';
            isVisible = false;
        } else if (currentScrollY < lastScrollY && !isVisible) {
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
