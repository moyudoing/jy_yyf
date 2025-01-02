import {products} from './data/products.js';

// 测试产品数据
function testProducts() {
    console.log('Testing products data...');

    // 检查产品数组
    if (!Array.isArray(products)) {
        throw new Error('products should be an array');
    }

    // 检查每个产品的必要字段
    products.forEach((product, index) => {
        const requiredFields = ['id', 'name', 'slug', 'description', 'price', 'images'];
        requiredFields.forEach(field => {
            if (!(field in product)) {
                throw new Error(`Product at index ${index} is missing required field: ${field}`);
            }
        });

        // 检查图片路径
        if (!product.images.main || typeof product.images.main !== 'string') {
            throw new Error(`Product ${product.name} has invalid main image path`);
        }

        if (!Array.isArray(product.images.gallery)) {
            throw new Error(`Product ${product.name} gallery should be an array`);
        }
    });

    console.log('Products data test passed!');
}

// 运行测试
try {
    testProducts();
} catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
}
