import fs from 'fs';

// 创建一个简单的视频文件
function createDummyVideo() {
    const videoPath = 'assets/videos/product.mp4';

    // 确保目录存在
    if (!fs.existsSync('assets/videos')) {
        fs.mkdirSync('assets/videos', {recursive: true});
    }

    // 如果视频不存在，创建一个空视频文件
    if (!fs.existsSync(videoPath)) {
        // 复制一个示例视频文件或创建一个空的MP4文件
        const emptyMP4 = Buffer.from([
            0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70,
            0x69, 0x73, 0x6F, 0x6D, 0x00, 0x00, 0x02, 0x00
        ]);
        fs.writeFileSync(videoPath, emptyMP4);
        console.log('Created dummy video file');
    }
}

createDummyVideo();
