import {reports} from '../../data/report.js';

export function initReports() {

    console.log('debug');

    // 获取相关元素
    const container = document.querySelector('.reports-grid');
    const modal = document.getElementById('report-modal');
    const modalImage = document.getElementById('report-image');
    const modalClose = modal?.querySelector('.modal-close');

    if (!container || !modal || !modalImage) return;

    // 渲染报告列表
    function renderReports() {
        // if (!Array.isArray(reports)) {
        //     console.error('报告数据格式错误');
        //     return;
        // }

        container.innerHTML = reports.map((report, index) => `
            <div class="report-card" data-index="${index}">
                <img
                src="${report.image}"
                alt="${report.title}"
                onclick="document.getElementById('report-image').src='${report.image}';
                        document.getElementById('report-modal').classList.add('active')"
                >
                <div class="report-info">
                    <h3>${report.title}</h3>
                    <p>${report.image}</p>
                    <span class="report-date">${report.date}</span>
                </div>
            </div>
        `).join('');
    }

    // 显示报告大图
    function showReport(index) {
        const report = reports[index];
        if (!report) return;

        modalImage.src = report.image;
        modalImage.onerror = () => {
            modalImage.src = 'assets/images/placeholder.jpg';
        };
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 隐藏报告大图
    function hideReport() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 绑定事件
    container.addEventListener('click', (e) => {
        const card = e.target.closest('.report-card');
        if (!card) return;

        const index = parseInt(card.dataset.index);
        showReport(index);
    });

    modalClose?.addEventListener('click', hideReport);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideReport();
    });

    // 初始渲染
    renderReports();
}
