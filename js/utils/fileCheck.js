import fs from 'fs';
import path from 'path';

const requiredFiles = [
    // CSS文件
    'css/base/variables.css',
    'css/style.css',
    'css/product.css',

    // JavaScript模块
    'js/main.js',
    'js/data/product.js',
    'js/modules/navigation.js',
    'js/modules/gallery.js',
    'js/modules/reports.js',
    'js/modules/video.js',
    'js/modules/timeline.js',
    'js/modules/team.js',
    'js/modules/modal.js',
    'js/modules/scroll.js',
    'js/modules/animation.js',
    'js/modules/pageTransition.js',
    'js/modules/features.js',

    // 页面文件
    'pages/products/powder.html',
    'pages/products/high-entropy.html',
    'pages/products/high-calcium.html',
    'pages/manufacturing.html',
    'pages/origin.html',
    'pages/team.html',
    'pages/contact.html',

    // 资源文件
    'assets/icons/favicon.ico',
    'assets/images/logo.png',
    'assets/videos/product.mp4'
];

function checkFiles() {
    const missingFiles = [];

    requiredFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            missingFiles.push(file);
        }
    });

    if (missingFiles.length > 0) {
        console.error('Missing files:');
        missingFiles.forEach(file => console.error(`- ${file}`));
        return false;
    }

    return true;
}

export {checkFiles};
