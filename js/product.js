// 产品图片切换
function changeImage(src) {
    document.getElementById('main-products-image').src = src;
}

// 数量选择器
function updateQuantity(change) {
    const input = document.getElementById('quantity');
    const currentValue = parseInt(input.value);
    const newValue = currentValue + change;

    if (newValue >= 1) {
        input.value = newValue;
    }
}

// 选项卡切换
function switchTab(tabId) {
    // 移除所有选项卡的active类
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    // 添加active类到选中的选项卡
    document.querySelector(`button[onclick="switchTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// 用户评价数据
const reviews = [
    {
        id: 1,
        user: '张先生',
        rating: 5,
        date: '2024-01-15',
        content: '产品效果很好，每天坚持服用，感觉肠道健康有明显改善。'
    },
    {
        id: 2,
        user: '李女士',
        rating: 4,
        date: '2024-01-12',
        content: '包装很精美，口感也不错，就是价格稍微有点贵。'
    },
    {
        id: 3,
        user: '王先生',
        rating: 5,
        date: '2024-01-10',
        content: '服用一个月了，血糖确实有所改善，很满意。'
    }
];

// 渲染用户评价
function renderReviews() {
    const reviewsList = document.querySelector('.reviews-list');
    if (!reviewsList) return;

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="review-user">${review.user}</div>
                <div class="review-meta">
                    <div class="review-rating">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                    <div class="review-date">${review.date}</div>
                </div>
            </div>
            <div class="review-content">${review.content}</div>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

// 相关产品数据
const relatedProducts = [
    {
        id: 1,
        name: '菊芋营养粉礼盒装',
        price: '¥288',
        image: '../assets/images/products-3.jpg'
    },
    {
        id: 2,
        name: '菊芋营养粉家庭装',
        price: '¥188',
        image: '../assets/images/products-2.jpg'
    }
];

// 渲染相关产品
function renderRelatedProducts() {
    const productsGrid = document.querySelector('.related-products .products-grid');
    if (!productsGrid) return;

    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'products-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <span class="price">${product.price}</span>
            <a href="./powder.html" class="btn btn-primary">查看详情</a>
        `;
        productsGrid.appendChild(productCard);
    });
}

// 购物车功能
document.querySelector('.add-to-cart').addEventListener('click', () => {
    const quantity = document.getElementById('quantity').value;
    // TODO: 实现购物车功能
    alert(`已添加${quantity}件商品到购物车`);
});

document.querySelector('.buy-now').addEventListener('click', () => {
    const quantity = document.getElementById('quantity').value;
    // TODO: 实现立即购买功能
    alert(`正在跳转到结算页面，购买数量：${quantity}`);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
    renderRelatedProducts();
});
