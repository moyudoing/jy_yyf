import {features} from '../../data/features.js';

export function initFeature() {

    const container = document.querySelector('.features-grid');
    if (!container) return;

    // 渲染产品列表
    function renderProducts() {
        container.innerHTML = features.map(feature => `
        <div class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');
        // container.innerHTML = features.map(feature => `
        //     <div class="features-grid" data-aos="fade-up">
        //         <div class="feature-item">
        //             <img src="${feature.images.main}" alt="${feature.name}">
        //         </div>
        //         <div class="product-info">
        //             <h3>${feature.name}</h3>
        //             <p>${feature.description}</p>
        //             <div class="product-price">
        //                 <span class="current">${feature.price}</span>
        //                 ${feature.originalPrice ?
        //     `<span class="original">${feature.originalPrice}</span>` :
        //     ''}
        //             </div>
        //             <a href="pages/products/${feature.slug}.html"
        //                class="btn btn-primary">了解详情</a>
        //         </div>
        //     </div>
        // `).join('');
    }

    // 初始渲染
    renderProducts();
}
