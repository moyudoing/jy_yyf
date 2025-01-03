import {team} from '../../data/team.js';

export function initTeam() {
    const teamGrid = document.querySelector('.team-grid');
    const modal = document.querySelector('.member-modal');
    if (!teamGrid) return;

    // 渲染团队成员
    teamGrid.innerHTML = team.map((member, index) => `
        <div class="team-card" data-member-id="${index}">
            <div class="team-card-image">
                <img src="${member.avatar || './assets/images/placeholder.jpg'}" 
                     alt="${member.name}"
                     onerror="this.src='./assets/images/placeholder.jpg'">
            </div>
            <div class="team-card-content">
                <h3 class="team-card-name">${member.name}</h3>
                <p class="team-card-title">${member.title}</p>
            </div>
        </div>
    `).join('');

    // 显示成员详情
    function showMemberDetails(memberId) {
        if (!modal) return;

        const member = team[memberId];
        if (!member) return;

        const modalContent = `
            <div class="member-modal-content">
                <div class="member-modal-image">
                    <img src="${member.avatar || './assets/images/placeholder.jpg'}" 
                         alt="${member.name}"
                         onerror="this.src='./assets/images/placeholder.jpg'">
                </div>
                <div class="member-modal-info">
                    <h2 class="member-modal-title">${member.name}</h2>
                    <p class="member-modal-position">${member.title}</p>
                    <div class="member-modal-description">
                        ${member.description || ''}
                    </div>
                    ${member.achievements ? `
                        <div class="member-achievements">
                            <h3>主要成就</h3>
                            <div class="member-achievements-list">
                                ${member.achievements.map(achievement => `
                                    <div class="achievement-card">
                                        <h4>${achievement.title}</h4>
                                        <p>${achievement.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${member.publications ? `
                        <div class="member-publications">
                            <h3>研究成果</h3>
                            <div class="publication-list">
                                ${member.publications.map(pub => `
                                    <div class="publication-item">
                                        <i class="fas fa-file-alt"></i>
                                        <span>${pub}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        modal.innerHTML = modalContent;
        modal.classList.add('active');
    }

    // 添加点击事件
    teamGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.team-card');
        if (card) {
            const memberId = card.dataset.memberId;
            showMemberDetails(memberId);
        }
    });

    // 关闭模态框
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
}
