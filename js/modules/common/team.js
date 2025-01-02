import {team} from '../../data/team.js';

export function initTeam() {
    const container = document.querySelector('.team-grid');
    const modal = document.getElementById('member-modal');
    if (!container || !modal) return;

    // 渲染团队成员
    function renderTeam() {
        container.innerHTML = team.map(member => `
            <div class="team-card scroll-reveal" data-member-id="${member.id}">
                <img 
                    src="${member.image}" 
                    alt="${member.name}"
                    class="member-image"
                    loading="lazy"
                    onerror="this.src='/assets/images/placeholder.jpg'"
                >
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <div class="member-title">${member.title}</div>
                    <div class="member-achievements">
                        ${member.achievements.map(achievement =>
            `<div class="achievement-item">${achievement}</div>`
        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // 初始化滚动显示动画
        initScrollReveal();
    }

    // 显示成员详情
    function showMemberDetails(id) {
        const member = team.find(m => m.id === parseInt(id));
        if (!member) return;

        const modalContent = modal.querySelector('.member-modal-content');
        modalContent.innerHTML = `
            <img 
                src="${member.image}" 
                alt="${member.name}" 
                class="member-modal-image"
                onerror="this.src='/assets/images/placeholder.jpg'"
            >
            <div class="member-modal-info">
                <h2 class="member-modal-title">${member.name}</h2>
                <div class="member-title">${member.title}</div>
                <div class="member-achievements">
                    <h3>主要成就</h3>
                    ${member.achievements.map(achievement =>
            `<div class="achievement-item">${achievement}</div>`
        ).join('')}
                </div>
                ${member.publications ? `
                    <div class="member-publications">
                        <h3>研究成果</h3>
                        ${member.publications.map(publication =>
            `<div class="publication-item">${publication}</div>`
        ).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 初始化滚动显示动画
    function initScrollReveal() {
        const cards = document.querySelectorAll('.scroll-reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach(card => observer.observe(card));
    }

    // 绑定事件
    container.addEventListener('click', (e) => {
        const card = e.target.closest('.team-card');
        if (!card) return;

        showMemberDetails(card.dataset.memberId);
    });

    // 关闭模态框
    modal.querySelector('.modal-close')?.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ESC 键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 点击模态框背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 初始渲染
    renderTeam();
}
