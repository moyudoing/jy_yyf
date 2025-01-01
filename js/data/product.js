export const products = [
    {
        id: 1,
        name: '菊芋营养粉',
        slug: 'powder',
        description: '经典配方，调节肠道健康',
        isNew: true,
        fullDescription: `
            <p>采用优质菊芋原料，科技萃取工艺</p>
            <ul>
                <li>富含益生元</li>
                <li>调节肠道健康</li>
                <li>提升免疫力</li>
            </ul>
        `,
        features: [
            {
                icon: '🌿',
                title: '无添加剂',
                description: '纯天然提取，无任何添加'
            },
            {
                icon: '🔬',
                title: '科技萃取',
                description: '专利技术，保留活性'
            },
            {
                icon: '💪',
                title: '营养健康',
                description: '富含益生元，调节肠道'
            }
        ],
        specifications: {
            weight: '100g',
            shelf_life: '24个月',
            storage: '密封、阴凉干燥处保存'
        },
        images: {
            main: './assets/images/products/jy/main.png',
            gallery: [
                './assets/images/products/jy/gallery-1.jpg',
                './assets/images/products/jy/gallery-2.jpg',
                './assets/images/products/jy/gallery-3.jpg'
            ]
        },
        price: '¥99',
        originalPrice: '¥129'
    },
    {
        id: 2,
        name: '菊芋高熵营养粉',
        slug: 'high-entropy',
        description: '高熵配方，提升免疫力',
        images: {
            main: './assets/images/products/jy-gs/main.png',
            gallery: [
                './assets/images/products/jy-gs/gallery-1.jpg',
                './assets/images/products/jy-gs/gallery-2.jpg'
            ]
        },
        price: '¥129',
        originalPrice: '¥159'
    },
    {
        id: 3,
        name: '菊芋高钙营养粉',
        slug: 'high-calcium',
        description: '补钙配方，强健骨骼',
        images: {
            main: './assets/images/products/jy-gga/main.png',
            gallery: [
                './assets/images/products/jy-gga/gallery-1.jpg',
                './assets/images/products/jy-gga/gallery-2.jpg'
            ]
        },
        price: '¥119',
        originalPrice: '¥149'
    }
];

export const reports = [
    {
        id: 1,
        title: '营养成分检测报告',
        date: '2024-01-15',
        institution: '国家食品检测中心',
        image: './assets/images/reports/test (1).png',
        thumbnail: './assets/images/reports/test (1).png',
        description: '营养成分含量符合国家标准'
    },
    {
        id: 2,
        title: '安全性检测报告',
        date: '2024-01-20',
        institution: '国家食品安全检测中心',
        image: './assets/images/reports/safety.jpg',
        thumbnail: './assets/images/reports/safety.jpg',
        description: '各项安全指标符合国家标准'
    }
];

export const team = [
    {
        id: 1,
        name: '张教授',
        title: '首席科学家',
        image: './assets/images/team/zhang-professor.jpg',
        description: '从事菊芋研究20余年',
        achievements: [
            '国家科技进步奖获得者',
            '发表论文30余篇',
            '授权专利15项'
        ]
    },
    {
        id: 2,
        name: '李博士',
        title: '研发主管',
        image: './assets/images/team/li-doctor.jpg',
        description: '专注功能性食品研发',
        achievements: [
            '食品工程博士',
            '主持研发项目10项',
            '获得发明专利8项'
        ]
    }
];

export const timeline = [
    {
        year: 2020,
        title: '研发启动',
        description: '开始菊芋提取工艺研究',
        image: './assets/images/timeline/2020.jpg'
    },
    {
        year: 2021,
        title: '工艺突破',
        description: '成功开发专利提取工艺',
        image: './assets/images/timeline/2021.jpg'
    },
    {
        year: 2022,
        title: '产品上市',
        description: '首款产品成功推向市场',
        image: './assets/images/timeline/2022.jpg'
    },
    {
        year: 2023,
        title: '品类扩展',
        description: '推出高熵系列新产品',
        image: './assets/images/timeline/2023.jpg'
    }
];
