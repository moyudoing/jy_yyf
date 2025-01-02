import {timeline} from '../../data/timeline.js';

export function initTimeline() {
    const container = document.querySelector('.timeline-gallery');
    if (!container) return;

    let currentIndex = 0;

    // 检查数据
    if (!Array.isArray(timeline)) {
        console.error('时间线数据格式错误');
        return;
    }

    const items = timeline.map((item, index) => `
        <div class="timeline-item ${index === 0 ? 'active' : ''}" data-aos="fade-up">
            <div class="timeline-content">
                <h3>${item.year}</h3>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
            <div class="timeline-image">
                <img src="${item.image}" alt="${item.title}" 
                     onerror="this.src='/assets/images/placeholder.jpg'">
            </div>
        </div>
    `).join('');

    const dots = timeline.map((_, index) => `
        <button class="nav-dot ${index === 0 ? 'active' : ''}" 
                data-index="${index}"></button>
    `).join('');

    // 渲染时间线
    container.innerHTML = `
        <div class="timeline-items">${items}</div>
        <div class="timeline-nav">${dots}</div>
    `;

    // 切换显示
    function showSlide(index) {
        const items = container.querySelectorAll('.timeline-item');
        const dots = container.querySelectorAll('.nav-dot');

        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    // 绑定事件
    container.querySelector('.timeline-nav')?.addEventListener('click', (e) => {
        const dot = e.target.closest('.nav-dot');
        if (!dot) return;

        const index = parseInt(dot.dataset.index);
        showSlide(index);
    });

    // 自动播放
    let autoplayInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % timeline.length;
        showSlide(nextIndex);
    }, 5000);

    // 鼠标悬停时暂停自动播放
    container.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    container.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % timeline.length;
            showSlide(nextIndex);
        }, 5000);
    });
}
