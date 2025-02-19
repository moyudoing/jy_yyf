import { defineStore } from 'pinia';

// 定义 Ingredient 接口
interface Ingredient {
    name: string;
    value: number;
    dvp: number; // 每日摄入量占比
    color: string;
    icon: string;
    benefits: string[];
}

// 定义 Benefit 接口
interface Benefit {
    title: string;
    description: string;
    relatedTo: string[];
}

// 定义初始的 ingredients 数据
const initialIngredients: Ingredient[] = [
    {
        name: '维生素D',
        value: 15,
        dvp: 200,
        color: '#FFD700',
        icon: 'vitamin-d',
        benefits: ['促进钙吸收', '增强免疫力']
    },
    {
        name: '镁',
        value: 42,
        dvp: 100,
        color: '#32CD32',
        icon: 'magnesium',
        benefits: ['调节血压', '维持神经功能']
    },
    {
        name: '镁',
        value: 42,
        dvp: 100,
        color: '#5c131a',
        icon: 'magnesium',
        benefits: ['调节血压', '维持神经功能']
    },
    {
        name: '镁',
        value: 42,
        dvp: 100,
        color: '#020b15',
        icon: 'magnesium',
        benefits: ['调节血压', '维持神经功能']
    },
];

// 定义初始的 healthBenefits 数据
const initialHealthBenefits: Benefit[] = [
    {
        title: '三重补钙机制',
        description: '维生素D3促进钙吸收，镁元素辅助钙转运，形成完整补钙闭环',
        relatedTo: ['维生素D', '镁', '钙']
    },
    {
        title: '三重补钙机制',
        description: '维生素D3促进钙吸收，镁元素辅助钙转运，形成完整补钙闭环',
        relatedTo: ['维生素D', '镁', '钙']
    },
];

// 定义 Pinia store
export const useIngredientsData = defineStore('ingredientsData', {
    // 定义 state
    state: () => ({
        ingredients: initialIngredients,
        healthBenefits: initialHealthBenefits
    }),
    // 定义 getters
    getters: {
        // 获取所有 ingredients
        getAllIngredients: (state) => state.ingredients,
        // 获取所有 healthBenefits
        getAllBenefits: (state) => state.healthBenefits
    }
});
