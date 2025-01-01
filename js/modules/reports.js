export function renderReports(reports) {
    const reportsGrid = document.querySelector('.reports-grid');
    if (!reportsGrid) return;

    reportsGrid.innerHTML = reports.map(report => `
        <div class="report-item">
            <img
                src="${report.image}"
                alt="${report.title}"
                onclick="document.getElementById('report-image').src='${report.image}';
                        document.getElementById('report-modal').classList.add('active')"
            >
            <div class="report-info">
                <h3>${report.title}</h3>
                <p>检测日期：${report.date}</p>
                <p>检测机构：${report.institution}</p>
                <p>${report.description}</p>
            </div>
        </div>
    `).join('');
}

function showReportModal(imageSrc) {
    const modal = document.getElementById('report-modal');
    const modalImage = document.getElementById('report-image');
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.classList.add('active');
    }
}
