import {products} from '../../data/product.js';

export function initProducts() {
    const container = document.querySelector('.products-grid');
    if (!container) return;

    // 渲染产品列表
    function renderProducts() {
        container.innerHTML = products.map(product => `
            <div class="product-card" data-aos="fade-up">
                <div class="product-image">
                    <img src="${product.images.main}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="current">${product.price}</span>
                        ${product.originalPrice ?
            `<span class="original">${product.originalPrice}</span>` :
            ''}
                    </div>
                    <a href="pages/products/${product.slug}.html" 
                       class="btn btn-primary">了解详情</a>
                </div>
            </div>
        `).join('');
    }

    // 初始渲染
    renderProducts();
}
