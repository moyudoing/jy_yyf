import fs from 'fs';
import path from 'path';

// CSS文件结构
const cssFiles = {
    // 基础样式
    'css/base/reset.css': '/* 重置样式 */',
    'css/base/variables.css': '/* 变量定义 */',
    'css/base/typography.css': '/* 排版样式 */',

    // 布局样式
    'css/layout/grid.css': '/* 网格系统 */',
    'css/layout/container.css': '/* 容器样式 */',
    'css/layout/section.css': '/* 区块样式 */',

    // 组件样式
    'css/components/navbar.css': '/* 导航栏 */',
    'css/components/buttons.css': '/* 按钮 */',
    'css/components/cards.css': '/* 卡片 */',
    'css/components/gallery.css': '/* 图片画廊 */',
    'css/components/modal.css': '/* 模态框 */',
    'css/components/forms.css': '/* 表单 */',

    // 页面特定样式
    'css/pages/home.css': '/* 首页样式 */',
    'css/pages/product.css': '/* 产品页样式 */',
    'css/pages/about.css': '/* 关于页样式 */',

    // 工具类
    'css/utils/animations.css': '/* 动画 */',
    'css/utils/helpers.css': '/* 辅助类 */',
    'css/utils/responsive.css': '/* 响应式 */'
};

// 创建基本的JavaScript模块文件
const jsModules = [
    'navigation.js',
    'gallery.js',
    'reports.js',
    'video.js',
    'development.js',
    'team.js',
    'modal.js',
    'scroll.js',
    'animation.js',
    'pageTransition.js',
    'features.js'
];

// 创建基本的页面文件
const pages = [
    'products/powder.html',
    'products/high-entropy.html',
    'products/high-calcium.html',
    'manufacturing.html',
    'origin.html',
    'team.html',
    'contact.html'
];

// 创建文件函数
function createFile(filePath, content = '') {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`Created: ${filePath}`);
    }
}

// 创建CSS文件
Object.entries(cssFiles).forEach(([file, content]) => {
    createFile(file, content);
});

// 创建JavaScript模块
jsModules.forEach(module => {
    createFile(`js/modules/${module}`, '// Module code here');
});

// 创建页面文件
pages.forEach(page => {
    createFile(`pages/${page}`, '<!-- Page content here -->');
});

console.log('Project initialization completed!');
