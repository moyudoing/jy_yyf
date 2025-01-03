import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 详细的 MIME 类型映射
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// 静态文件中间件配置
app.use(express.static(path.join(__dirname), {
    setHeaders: (res, filePath) => {
        // 设置正确的 MIME 类型
        const ext = path.extname(filePath).toLowerCase();
        if (mimeTypes[ext]) {
            res.setHeader('Content-Type', mimeTypes[ext]);
        }

        // 设置缓存控制
        if (ext === '.html') {
            // HTML 文件不缓存
            res.setHeader('Cache-Control', 'no-cache');
        } else {
            // 其他静态资源缓存 1 小时
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }

        // 允许跨域
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));

// 创建必要的目录结构
const directories = [
    'assets/images/products/high-entropy',
    'assets/images/products/high-calcium',
    'assets/images/products/powder',
    'assets/images/process',
    'assets/images/reports',
    'assets/images/team',
    'assets/images/development'
];

directories.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    try {
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, {recursive: true});
            console.log(`Created directory: ${dir}`);
        }
    } catch (err) {
        console.error(`Error creating directory ${dir}:`, err);
    }
});

// 所有路由都返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
