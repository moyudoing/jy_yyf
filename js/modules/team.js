export function renderTeam(team) {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    teamGrid.innerHTML = team.map(member => `
        <div class="team-card">
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-title">${member.title}</p>
                <p class="member-description">${member.description}</p>
                <div class="member-achievements">
                    ${member.achievements.map(achievement =>
        `<span class="achievement">${achievement}</span>`
    ).join('')}
                </div>
            </div>
        </div>
    `).join('');
}
