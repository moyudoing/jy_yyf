import {BaseModule} from '../core/BaseModule.js';
import {team} from '../../data/team.js';

export class TeamSection extends BaseModule {
    init() {
        this.container = document.querySelector('.team-grid');
        this.modal = document.querySelector('#member-modal');
        if (!this.container) return;

        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = team.map(member => `
            <div class="team-card" data-member-id="${member.id}">
                <div class="member-image">
                    <img 
                        src="${member.image}" 
                        alt="${member.name}"
                        loading="lazy"
                    >
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-title">${member.title}</p>
                    <div class="member-achievements">
                        ${member.achievements.map(achievement =>
            `<span class="achievement">${achievement}</span>`
        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    bindEvents() {
        // 点击查看详情
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.team-card');
            if (!card) return;

            const memberId = parseInt(card.dataset.memberId);
            this.showMemberDetails(memberId);
        });

        // 关闭模态框
        this.modal?.querySelector('.modal-close')?.addEventListener('click', () => {
            this.hideModal();
        });
    }

    showMemberDetails(memberId) {
        if (!this.modal) return;

        const member = team.find(m => m.id === memberId);
        if (!member) return;

        const details = this.modal.querySelector('#member-details');
        details.innerHTML = `
            <div class="member-details">
                <div class="member-header">
                    <img src="${member.image}" alt="${member.name}">
                    <div class="member-title-info">
                        <h2>${member.name}</h2>
                        <p>${member.title}</p>
                    </div>
                </div>
                <div class="member-content">
                    <div class="achievements">
                        <h3>主要成就</h3>
                        <ul>
                            ${member.achievements.map(achievement =>
            `<li>${achievement}</li>`
        ).join('')}
                        </ul>
                    </div>
                    ${member.publications ? `
                        <div class="publications">
                            <h3>发表论文</h3>
                            <ul>
                                ${member.publications.map(pub =>
            `<li>${pub}</li>`
        ).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        if (!this.modal) return;

        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}
