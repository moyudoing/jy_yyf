// src/config.ts
const PATHS = {
    images: {
        // 产品图片路径
        products: 'src/assets/images/products',
        // 团队成员图片路径
        team: 'src/assets/images/team',
        // 时间线图片路径
        timeline: 'src/assets/images/development',
        // 检测报告路径
        report: 'src/assets/images/reports',
    },
    api: {
        // 示例 API 路径，可根据实际情况修改
        products: 'src/api/products',
        team: 'src/api/team'
    },
    pages: {
        // 首页路径
        home: '/',
        // 产品列表页路径
        productList: '/products',
        // 产品详情页路径
        productDetail: '/products/:id',
        // 团队介绍页路径
        team: '/team'
    }
};

export { PATHS };
