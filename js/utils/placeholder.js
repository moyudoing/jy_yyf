// 创建占位图片的函数
function createPlaceholder(text, width = 800, height = 600) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 背景色
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    // 文字样式
    ctx.fillStyle = '#666666';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 绘制文字
    ctx.fillText(text, width / 2, height / 2);

    return canvas.toDataURL('image/png');
}
