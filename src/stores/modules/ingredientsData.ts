import { defineStore } from 'pinia';

// 定义 Ingredient 接口
export interface Ingredient {
    name: string;
    value: number;
    dvp: number; // 每日摄入量占比
    color: string;
    icon: string;
    benefits: string[];
    description: string;
}

// 定义 Benefit 接口
export interface Benefit {
    title: string;
    descriptions: string[];
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
        benefits: ['促进钙磷吸收与骨骼健康', '增强免疫力', '维持肌肉功能', '支持神经与情绪健康', '潜在代谢与心血管保护作用'],
        description: "维生素D是人体必需的脂溶性维生素，核心作用包括促进钙磷吸收、维持骨骼健康、调节免疫系统、支持肌肉功能及稳定情绪。它通过阳光照射合成，也能从食物或补充剂获取，对儿童发育和成人健康至关重要。",
    },
    {
        name: '钙',
        value: 42,
        dvp: 100,
        color: '#32CD32',
        icon: 'magnesium',
        benefits: ['促进发育', '维持神经功能', '维持皮肤与黏膜健康', '调节味觉与嗅觉', '抗氧化与抗炎'],
        description: "强健骨骼与牙齿：约99%的钙储存在骨骼和牙齿中，像“钢筋”一样支撑身体结构，预防骨质疏松和骨折。儿童、孕妇和老人需尤其重视钙摄入。1.\n" +
            "保障肌肉与神经功能：钙离子是肌肉收缩和神经信号传递的“开关”，缺钙可能导致抽筋、手脚麻木或心跳异常。2.\n" +
            "调节心血管与凝血：钙参与心脏规律跳动，并帮助血液凝固，避免出血不止。",
    },
    {
        name: '镁',
        value: 22,
        dvp: 100,
        color: '#5c131a',
        icon: 'magnesium',
        benefits: ['能量代谢', '神经肌肉功能', '骨骼健康'],
        description: "1.\n" +
            "镁是ATP（三磷酸腺苷）的辅酶成分，直接参与糖、脂肪、蛋白质转化为能量的过程。缺乏时易引发疲劳、代谢效率下降。\n" +
            "\n" +
            "神经与肌肉协调2.\n" +
            "镁通过调节钙离子通道，控制神经信号传递和肌肉收缩，预防抽筋、痉挛，并缓解焦虑或失眠。\n" +
            "\n" +
            "骨骼健康3.\n" +
            "镁促进钙吸收与骨化，与维生素D协同增强骨密度，降低骨质疏松风险。约60%的镁储存于骨骼中。",
    },
    {
        name: '锌',
        value: 10,
        dvp: 100,
        color: '#2868af',
        icon: 'magnesium',
        benefits: ['调节血压', '维持神经功能'],
        description: "22222",
    },
];

// 定义初始的 healthBenefits 数据
const initialHealthBenefits: Benefit[] = [
    {
        title: '维D稳钙护血管',
        descriptions: ['维护动脉健康：具有强效抗炎和抗氧化作用，能增加一氧化氮，' +
            '让动脉保持舒张和放松状态，降低血压，保护动脉内皮层，预防动脉发炎、斑块形成和硬化，减少与动脉相关疾病风险。',
            '促进钙吸收与调节：帮助肠道吸收钙，使其吸收量增加 20 倍，支持骨骼健康；参与细胞信号传导，协助身体控制钙' +
            '水平；与维生素 K2、镁协作，调节钙的分布，避免钙在软组织异常沉积，预防心血管问题 。',
            '稳定内分泌系统：充足的维生素 D 可避免甲状旁腺因钙含量异常而过度分泌甲状旁腺激素，防止甲状旁腺功能失调，' +
        '降低由此引发的骨质疏松、动脉钙化等病症风险。'],
        relatedTo: ['维生素D', '镁', '钙']
    },
    {
        title: '三重补钙机制',
        descriptions: [
            '维生素D3促进钙吸收，镁元素辅助钙转运，形成完整补钙闭环',
            '维生素D3促进钙吸收，镁元素辅助钙转运，形成完整补钙闭环',
            '维生素D3促进钙吸收，镁元素辅助钙转运，形成完整补钙闭环',
        ],
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
