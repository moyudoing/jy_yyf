// 导入所需模块
import {initNavigation} from '../animation/navigation.js';
import {initProducts} from '../modules/common/products.js';
import {initReports} from '../modules/common/reports.js';
import {initTimeline} from '../modules/common/timeline.js';
import {initVideo} from '../modules/common/video.js';
import {initScrollEffects} from '../animation/scroll.js';
import {initTeam} from '../modules/common/team.js';
import {initFeature} from '../modules/common/features.js';

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
        initTeam();
        initFeature();
        initReports();
    } catch (error) {
        console.error('初始化错误:', error);
    }
});
