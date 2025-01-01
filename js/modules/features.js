import {products} from '../data/product.js';

export function renderFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;

    // 使用第一个产品的特点
    const mainProduct = products[0];

    featuresGrid.innerHTML = mainProduct.features.map(feature => `
        <div class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');
}
