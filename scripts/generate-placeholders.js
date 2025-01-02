import fs from 'fs';
import path from 'path';
import {createCanvas} from 'canvas';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 生成占位图片
function generatePlaceholder(width, height, text) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 背景
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);

    // 文字
    ctx.fillStyle = '#9e9e9e';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    return canvas.toBuffer();
}

// 需要生成占位图的目录和文件
const placeholders = [
    {
        path: 'assets/images/placeholder.jpg',
        width: 400,
        height: 300,
        text: '图片加载失败'
    },
    {
        path: 'assets/images/process/tech-route.png',
        width: 800,
        height: 400,
        text: '工艺流程图'
    }
];

// 生成占位图片
placeholders.forEach(({path: imgPath, width, height, text}) => {
    const fullPath = path.join(__dirname, '..', imgPath);
    const dir = path.dirname(fullPath);

    // 确保目录存在
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    // 生成并保存图片
    const buffer = generatePlaceholder(width, height, text);
    fs.writeFileSync(fullPath, buffer);
    console.log(`Generated: ${imgPath}`);
});
