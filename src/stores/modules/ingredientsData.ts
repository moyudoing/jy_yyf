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
        title: '维D稳钙护血管',
        description: '维护动脉健康：具有强效抗炎和抗氧化作用，能增加一氧化氮，让动脉保持舒张和放松状态，降低血压，保护动脉内皮层，预防动脉发炎、斑块形成和硬化，减少与动脉相关疾病风险。\n' +
            '促进钙吸收与调节：帮助肠道吸收钙，使其吸收量增加 20 倍，支持骨骼健康；参与细胞信号传导，协助身体控制钙水平；与维生素 K2、镁协作，调节钙的分布，避免钙在软组织异常沉积，预防心血管问题 。\n' +
            '稳定内分泌系统：充足的维生素 D 可避免甲状旁腺因钙含量异常而过度分泌甲状旁腺激素，防止甲状旁腺功能失调，降低由此引发的骨质疏松、动脉钙化等病症风险。',
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
