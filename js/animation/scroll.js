export function initScrollEffects() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const backToTop = document.getElementById('back-to-top');
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    // 更新滚动进度条
    function updateProgress() {
        if (!progressBar) return;

        const winScroll = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    }

    // 处理导航栏
    function handleNavbar() {
        if (!navbar) return;

        const scrollTop = window.pageYOffset;

        // 添加/移除滚动样式
        navbar.classList.toggle('scrolled', scrollTop > 50);

        // 向下滚动时隐藏导航栏
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    }

    // 显示/隐藏返回顶部按钮
    function toggleBackToTop() {
        if (!backToTop) return;

        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // 平滑滚动到顶部
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 绑定事件
    window.addEventListener('scroll', () => {
        updateProgress();
        handleNavbar();
        toggleBackToTop();
    });

    backToTop?.addEventListener('click', scrollToTop);
}
