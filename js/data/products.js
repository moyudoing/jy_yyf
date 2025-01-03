import {PATHS} from '../config.js';

export const products = [
    {
        id: 1,
        name: '菊芋高熵营养粉',
        slug: 'high-entropy',
        description: '采用高熵技术萃取，保留更多营养成分',
        price: '??¥',
        // originalPrice: '¥198',
        images: `${PATHS.images.products}/jy-sd/sd.jpg`,
        gallery: [
                'assets/images/products/high-entropy/1.jpg',
                'assets/images/products/high-entropy/2.jpg',
                'assets/images/products/high-entropy/3.jpg'
        ],
        features: [
            '高熵萃取工艺',
            '营养成分保留率高',
            '易于吸收'
        ]
    },
    {
        id: 2,
        name: '菊芋高钙营养粉',
        slug: 'high-calcium',
        description: '添加天然钙源，补钙更健康',
        price: '??¥',
        // originalPrice: '¥188',
        images: `${PATHS.images.products}/jy-gga/gg.jpg`,
        gallery: [
            '../../assets/images/products/high-calcium/1.jpg',
            '../../assets/images/products/high-calcium/2.jpg',
            '../../assets/images/products/high-calcium/3.jpg'
        ],
        features: [
            '天然钙源添加',
            '易于吸收',
            '适合全家服用'
        ]
    },
    {
        id: 3,
        name: '菊芋营养粉',
        slug: 'powder',
        description: '传统工艺制作，营养健康',
        price: '??¥',
        images: `${PATHS.images.products}/jy-gs/gs.jpg`,
        gallery: [
            '../../assets/images/products/powder/1.jpg',
            '../../assets/images/products/powder/2.jpg',
            '../../assets/images/products/powder/3.jpg'
        ],
        features: [
            '传统工艺',
            '无添加',
            '营养健康'
        ]
    }
];