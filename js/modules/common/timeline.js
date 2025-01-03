import {timeline} from '../../data/timeline.js';

export function initTimeline() {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryNav = document.querySelector('.gallery-nav');

    if (!galleryContainer || !galleryNav) return;

    // 渲染时间线项目
    galleryContainer.innerHTML = timeline.map((item, index) => `
        <div class="gallery-item ${index === 0 ? 'active' : ''}">
            <img class="gallery-image" src="${item.image}" alt="${item.title}">
            <div class="gallery-caption">   
                <h3>${item.year}年 - ${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');

    // 渲染导航点
    galleryNav.innerHTML = timeline.map((_, index) => `
        <div class="gallery-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    // 添加点击事件
    galleryNav.addEventListener('click', (e) => {
        const dot = e.target.closest('.gallery-dot');
        if (!dot) return;

        const index = parseInt(dot.dataset.index);
        showSlide(index);
    });

    // 自动播放
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % timeline.length;
        showSlide(currentIndex);
    }, 5000);

    function showSlide(index) {
        galleryContainer.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        document.querySelectorAll('.gallery-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
}
