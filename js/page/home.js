// 导入所需模块
import {initNavigation} from '../animation/navigation.js';
import {initProducts} from '../modules/home/products.js';
import {initReports} from '../modules/home/reports.js';
import {initTimeline} from '../modules/home/timeline.js';
import {initVideo} from '../modules/home/video.js';
import {initScrollEffects} from '../animation/scroll.js';

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 初始化各个模块
        initNavigation();
        initProducts();
        initReports();
        initTimeline();
        initVideo();
        initScrollEffects();
    } catch (error) {
        console.error('初始化错误:', error);
    }
});
