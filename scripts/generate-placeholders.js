import fs from 'fs';
import {createCanvas} from 'canvas';
import path from 'path';

const placeholders = [
    {path: 'logo.png', width: 200, height: 60, text: 'Logo'},
    {path: 'banner/team.jpg', width: 800, height: 400, text: '团队背景图'},
    {path: 'products/jy/main.png', width: 600, height: 600, text: '菊芋营养粉'},
    {path: 'products/jy/gallery-1.jpg', width: 800, height: 600, text: '产品展示图1'},
    {path: 'products/jy/gallery-2.jpg', width: 800, height: 600, text: '产品展示图2'},
    {path: 'products/jy/gallery-3.jpg', width: 800, height: 600, text: '产品展示图3'},
    {path: 'products/jy-gs/main.png', width: 600, height: 600, text: '菊芋高熵营养粉'},
    {path: 'products/jy-gs/gallery-1.jpg', width: 800, height: 600, text: '高熵产品展示图1'},
    {path: 'products/jy-gs/gallery-2.jpg', width: 800, height: 600, text: '高熵产品展示图2'},
    {path: 'products/jy-gga/main.png', width: 600, height: 600, text: '菊芋高钙营养粉'},
    {path: 'products/jy-gga/gallery-1.jpg', width: 800, height: 600, text: '高钙产品展示图1'},
    {path: 'products/jy-gga/gallery-2.jpg', width: 800, height: 600, text: '高钙产品展示图2'},
    {path: 'reports/test (1).png', width: 595, height: 842, text: '营养成分检测报告'},
    {path: 'reports/safety.jpg', width: 595, height: 842, text: '安全性检测报告'},
    {path: 'team/zhang-professor.jpg', width: 400, height: 400, text: '张教授照片'},
    {path: 'team/li-doctor.jpg', width: 400, height: 400, text: '李博士照片'},
    {path: 'timeline/2020.jpg', width: 800, height: 600, text: '研发启动'},
    {path: 'timeline/2021.jpg', width: 800, height: 600, text: '工艺突破'},
    {path: 'timeline/2022.jpg', width: 800, height: 600, text: '产品上市'},
    {path: 'timeline/2023.jpg', width: 800, height: 600, text: '品类扩展'},
    {path: 'process/flow.png', width: 1200, height: 800, text: '研发流程图'},
    {path: 'process/tech-route.png', width: 1200, height: 800, text: '技术路线图'},
    {path: 'video/poster.jpg', width: 1280, height: 720, text: '视频封面'}
];

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

function generatePlaceholder(config) {
    const canvas = createCanvas(config.width, config.height);
    const ctx = canvas.getContext('2d');

    // 确定文件扩展名
    const ext = path.extname(config.path).toLowerCase();
    const isJPG = ext === '.jpg' || ext === '.jpeg';
    const isPNG = ext === '.png';

    // 背景
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, config.width, config.height);

    // 边框
    ctx.strokeStyle = '#dddddd';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, config.width - 4, config.height - 4);

    // 文字
    ctx.fillStyle = '#666666';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 添加尺寸信息
    const sizeText = `${config.width}x${config.height}`;
    ctx.fillText(config.text, config.width / 2, config.height / 2 - 20);
    ctx.fillText(sizeText, config.width / 2, config.height / 2 + 20);

    // 确保目录存在
    const filePath = `assets/images/${config.path}`;
    ensureDirectoryExistence(filePath);

    // 保存文件
    const buffer = canvas.toBuffer(isPNG ? 'image/png' : 'image/jpeg');
    fs.writeFileSync(filePath, buffer);
    console.log(`Generated: ${filePath}`);
}

// 生成所有占位图片
placeholders.forEach(generatePlaceholder);
