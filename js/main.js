import {products, reports, team} from './data/product.js';
import {initNavigation} from './modules/navigation.js';
import {Gallery} from './modules/gallery.js';
import {renderReports} from './modules/reports.js';
import {initVideoPlayer} from './modules/video.js';
import {initTimeline} from './modules/timeline.js';
import {renderTeam} from './modules/team.js';
import {initModals} from './modules/modal.js';
import {initScrollProgress, initBackToTop, initNavbarScroll} from './modules/scroll.js';
import {initSectionAnimation, initLinkAnimation} from './modules/animation.js';
import {initPageTransition} from './modules/pageTransition.js';
import {renderFeatures} from './modules/features.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        // 基础功能初始化
        initNavigation();

        // 渲染产品特点
        renderFeatures();

        // 渲染检测报告
        renderReports(reports);

        // 初始化视频播放器
        initVideoPlayer();

        // 初始化研发历程
        initTimeline();

        // 渲染团队信息
        renderTeam(team);

        // 初始化模态框
        initModals();

        // 初始化滚动相关功能
        initScrollProgress();
        initBackToTop();
        initNavbarScroll();

        // 初始化动画
        initSectionAnimation();
        initLinkAnimation();

        // 初始化页面过渡
        initPageTransition();

        // 初始化图片画廊
        new Gallery(document.querySelector('.timeline-gallery'));
    } catch (error) {
        console.error('初始化错误:', error);
    }
});

// 产品渲染函数
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img 
                    src="${product.images.main}" 
                    alt="${product.name}" 
                    class="product-image"
                    loading="lazy"
                >
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `
                        <div class="feature-item">
                            <span class="feature-icon">${feature.icon}</span>
                            <span class="feature-text">${feature.title}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="product-footer">
                <div class="product-price">
                    <span class="current-price">${product.price}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">${product.originalPrice}</span>
                    ` : ''}
                </div>
                <div class="product-actions">
                    <a href="pages/products/${product.slug}.html" class="btn btn-primary">
                        了解详情 <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}
