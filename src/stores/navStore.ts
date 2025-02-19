import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';

export const useNavStore = defineStore('nav', () => {
    const isMobile = ref(false);
    const isMobileMenuOpen = ref(false);
    const activeRoute = ref('');
    const routes = router.getRoutes().filter(route => route.meta && route.meta.title);

    const checkScreenSize = () => {
        isMobile.value = window.innerWidth < 768;
        if (!isMobile.value) {
            isMobileMenuOpen.value = false;
        }
    };

    const navigateTo = (path: string) => {
        router.push(path);
        if (isMobile.value) {
            toggleMobileMenu();
        }
    };

    const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    return {
        isMobile,
        isMobileMenuOpen,
        activeRoute,
        routes,
        checkScreenSize,
        navigateTo,
        toggleMobileMenu
    };
});
