import {BaseModule} from '../core/BaseModule.js';
import {PRODUCT_FEATURES} from '../../data/product.js';

export class FeaturesManager extends BaseModule {
    init() {
        this.container = document.querySelector('.features-grid');
        if (!this.container) return;

        this.render();
        this.bindEvents();
    }

    render() {
        const features = Object.values(PRODUCT_FEATURES);

        this.container.innerHTML = features.map(feature => `
            <div class="feature-card" data-aos="fade-up">
                <div class="feature-icon">${feature.icon}</div>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `).join('');
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.feature-card');
            if (!card) return;

            // 添加点击动画效果
            card.classList.add('feature-card-clicked');
            setTimeout(() => {
                card.classList.remove('feature-card-clicked');
            }, 300);
        });
    }
}
