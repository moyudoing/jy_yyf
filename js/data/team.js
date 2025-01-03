import {PATHS} from "../config.js";

export const team = [
    {
        name: "张教授",
        title: "首席科学家",
        avatar: `${PATHS.images.team}/member/zxs.jpg`,
        description: "在食品科学领域拥有20年研究经验，主持多项国家级研究项目。",
        achievements: [
            {
                title: "国家科技进步奖",
                description: "因在食品加工技术领域的突出贡献获得表彰"
            },
            {
                title: "发明专利",
                description: "拥有15项发明专利"
            }
        ],
        publications: [
            "《功能性食品开发与应用》",
            "《现代食品加工工艺》"
        ]
    },
    {
        name: "李博士",
        title: "技术总监",
        avatar: "./assets/images/team/tech-director.jpg",
        description: "专注于食品工程和营养学研究，负责产品配方开发。",
        achievements: [
            {
                title: "技术创新奖",
                description: "开发新型食品加工工艺"
            }
        ]
    },
    {
        name: "王工程师",
        title: "生产主管",
        avatar: "./assets/images/team/production-manager.jpg",
        description: "拥有10年食品生产管理经验，确保产品质量稳定。"
    }
];
