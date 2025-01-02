import fs from 'fs';
import path from 'path';

function concatenateCSS(files, outputFile) {
    const cssContent = files.map(file => {
        if (fs.existsSync(file)) {
            return fs.readFileSync(file, 'utf8');
        }
        console.warn(`Warning: ${file} not found`);
        return '';
    }).join('\n\n');

    fs.writeFileSync(outputFile, cssContent);
    console.log(`Generated: ${outputFile}`);
}

// CSS文件列表
const cssFiles = [
    // Base
    'css/base/reset.css',
    'css/base/variables.css',
    'css/base/typography.css',

    // Layout
    'css/layout/grid.css',
    'css/layout/container.css',
    'css/layout/section.css',

    // Components
    'css/components/navbar.css',
    'css/components/buttons.css',
    'css/components/cards.css',
    'css/components/gallery.css',
    'css/components/modal.css',
    'css/components/forms.css',

    // Pages
    'css/pages/home.css',
    'css/pages/product.css',
    'css/pages/about.css',

    // Utils
    'css/utils/animations.css',
    'css/utils/helpers.css',
    'css/utils/responsive.css'
];

// 开发环境使用style.css（包含@import语句）
const devStyleContent = cssFiles
    .map(file => `@import '${file.replace('css/', '')}';`)
    .join('\n');

fs.writeFileSync('css/home.css', devStyleContent);
console.log('Generated: css/home.css');

// 构建生产环境CSS
concatenateCSS(cssFiles, 'css/style.min.css');
