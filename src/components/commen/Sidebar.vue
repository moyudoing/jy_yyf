<template>
  <div class="side-nav">
    <ul>
      <li v-for="item in navItems" :key="item.id" class="side-nav-item" :class="{ active: item.isActive }" @click="scrollToSection(item.target)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const sideNav = ref(null);
const navItems = ref([
  // 导航项数据
]);
const sections = ref([]);
const lastScrollY = ref(0);
const isVisible = ref(true);

const scrollToSection = (targetId) => {
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    const offset = 80;
    const targetPosition = targetSection.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

const updateActiveSection = () => {
  const scrollY = window.scrollY;
  sections.value.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navItems.value.forEach(item => {
        item.isActive = false;
        if (item.target === sectionId) {
          item.isActive = true;
        }
      });
    }
  });
};

const toggleSideNav = () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY.value && isVisible.value && currentScrollY > 300) {
    sideNav.value.style.transform = 'translate(100%, -50%)';
    isVisible.value = false;
  } else if ((currentScrollY < lastScrollY.value && !isVisible.value) || currentScrollY < 300) {
    sideNav.value.style.transform = 'translate(0, -50%)';
    isVisible.value = true;
  }
  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  sections.value = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    updateActiveSection();
    toggleSideNav();
  });
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    updateActiveSection();
    toggleSideNav();
  });
});
</script>
