<template>
  <div>
    <div class="content-header">
      <h2 class="section-title">团队成员</h2>
      <p class="section-subtitle">权威机构认证，品质有保障</p>
    </div>
    <div class="team-grid">
      <div v-for="(member, index) in team" :key="index" class="team-card" @click="showMemberDetails(index)">
        <div class="team-card-image">
          <img :src="member.avatar || './assets/images/placeholder.jpg'" :alt="member.name">
        </div>
        <div class="team-card-content">
          <h3 class="team-card-name">{{ member.name }}</h3>
          <p class="team-card-title">{{ member.title }}</p>
        </div>
      </div>
    </div>
    <div class="member-modal" :class="{ active: isModalActive }" @click.self="hideMemberDetails">
      <div v-html="modalContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTeamStore } from '@/stores/modules/teamData.ts';
import "@/styles/layout/section.css"

const teamStore = useTeamStore();
const team = teamStore.getAllTeamMembers;
const isModalActive = ref(false);
const modalContent = ref('');

const showMemberDetails = (memberId: number) => {
  const member = team[memberId];
  if (member) {
    // 直接将生成的 HTML 内容赋值给 modalContent.value
    modalContent.value = `
      <div class="member-modal-content">
        <div class="member-modal-image">
          <img src="${member.avatar || './assets/images/placeholder.jpg'}" alt="${member.name}" @error="handleImageError($event)">
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
    isModalActive.value = true;
  }
};

const hideMemberDetails = () => {
  isModalActive.value = false;
};

</script>

<style>
/* 团队展示区域 */
.team-section {
  padding: var(--spacing-3xl) 0;
  background: var(--background-alt);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-2xl);
}

/* 团队成员卡片 */
.team-card {
  background: var(--background-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  cursor: pointer;
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.member-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-card:hover .member-image {
  transform: scale(1.05);
}

.member-info {
  padding: var(--spacing-lg);
  text-align: center;
}

.member-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.member-title {
  color: var(--dark-primary-color);
  font-size: 0.875rem;
  margin-bottom: var(--spacing-md);
}

.member-achievements {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.achievement-item {
  font-size: 0.875rem;
  color: var(--text-color-light);
  margin-bottom: var(--spacing-xs);
}

/* 团队成员模态框 */
.member-modal {
  max-width: 800px;
  width: 90%;
  background: var(--background-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.member-modal-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-xl);
}

.member-modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-modal-info {
  padding: var(--spacing-xl);
}

.member-modal-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
}

.member-achievements-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
}

.achievement-card {
  background: var(--background-alt);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: transform 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-5px);
}

.member-publications {
  margin-top: var(--spacing-xl);
}

.publication-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.publication-item:last-child {
  border-bottom: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .team-card {
    max-width: 400px;
    margin: 0 auto;
  }

  .member-modal-content {
    grid-template-columns: 1fr;
  }

  .member-modal-image {
    aspect-ratio: 16/9;
  }

  .member-achievements-list {
    grid-template-columns: 1fr;
  }
}
</style>
