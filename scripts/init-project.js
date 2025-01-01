import fs from 'fs';
import path from 'path';

// 创建基本的CSS文件
const cssFiles = {
    'css/base/variables.css': '/* CSS变量定义 */',
    'css/style.css': '/* 主样式文件 */',
    'css/product.css': '/* 产品页样式 */'
};

// 创建基本的JavaScript模块文件
const jsModules = [
    'navigation.js',
    'gallery.js',
    'reports.js',
    'video.js',
    'timeline.js',
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
