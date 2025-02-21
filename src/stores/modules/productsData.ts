import { defineStore } from 'pinia';
// 手动导入图片
import highEntropyImg from '@/assets/images/products/jy-gga/gg.jpg';
import highEntropyGallery1 from '@/assets/images/products/jy-gga/gg.jpg';
import highEntropyGallery2 from '@/assets/images/products/jy-gga/gg.jpg';
import highEntropyGallery3 from '@/assets/images/products/jy-gga/gg.jpg';
import highCalciumGallery1 from '@/assets/images/products/jy-gga/gg.jpg';
import highCalciumGallery2 from '@/assets/images/products/jy-gga/gg.jpg';
import highCalciumGallery3 from '@/assets/images/products/jy-gga/gg.jpg';
import powderGallery1 from '@/assets/images/products/jy-gga/gg.jpg';
import powderGallery2 from '@/assets/images/products/jy-gga/gg.jpg';
import powderGallery3 from '@/assets/images/products/jy-gga/gg.jpg';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [
            {
                id: 1,
                name: '菊芋高熵营养粉',
                slug: 'high-entropy',
                description: '采用高熵技术萃取，保留更多营养成分',
                price: '198元/盒',
                specifications: '一盒20gX10袋',
                images: highEntropyImg,
                gallery: [
                    highEntropyGallery1,
                    highEntropyGallery2,
                    highEntropyGallery3
                ],
                features: [
                    '高熵萃取工艺',
                    '营养成分保留率高',
                    '易于吸收'
                ],
                originalPrice: '1111',
            },
            {
                id: 2,
                name: '菊芋高钙营养粉',
                slug: 'high-calcium',
                description: '添加天然钙源，补钙更健康',
                price: '198元/盒',
                specifications: '一盒20gX10袋',
                images: highEntropyImg, // 假设和高熵营养粉的主图一样
                gallery: [
                    highCalciumGallery1,
                    highCalciumGallery2,
                    highCalciumGallery3
                ],
                features: [
                    '天然钙源添加',
                    '易于吸收',
                    '适合全家服用'
                ],
                originalPrice: '1111',
            },
            {
                id: 3,
                name: '菊芋营养粉',
                slug: 'powder',
                description: '传统工艺制作，营养健康',
                price: '198元/盒',
                specifications: '一盒20gX10袋',
                images: highEntropyImg, // 假设和高熵营养粉的主图一样
                gallery: [
                    powderGallery1,
                    powderGallery2,
                    powderGallery3
                ],
                features: [
                    '传统工艺',
                    '无添加',
                    '营养健康'
                ],
                originalPrice: '1111',
            }
        ]
    }),
    getters: {
        // 根据产品 ID 获取单个产品
        getProductById: (state) => (id: number) => {
            return state.products.find(product => product.id === id);
        },
        // 获取所有产品
        getAllProducts: (state) => state.products
    },
    actions: {
        // 可以添加修改产品数据的方法，例如更新产品信息
        updateProduct(product: { id: number; [key: string]: any }) {
            const index = this.products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...product };
            }
        }
    }
});
