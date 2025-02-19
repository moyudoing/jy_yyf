// src/stores/teamStore.ts
import { defineStore } from 'pinia';
import { PATHS } from '../config.ts';

// 定义团队成员的类型
interface TeamMember {
    name: string;
    title: string;
    avatar: string;
    description: string;
    achievements?: {
        title: string;
        description: string;
    }[];
    publications?: string[];
}

// 定义团队数据的类型
interface TeamState {
    team: TeamMember[];
}

// 团队成员的初始数据
const initialTeamMembers: TeamMember[] = [
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
        avatar: `${PATHS.images.team}/member/zxs.jpg`,
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
        avatar: `${PATHS.images.team}/member/zxs.jpg`,
        description: "拥有10年食品生产管理经验，确保产品质量稳定。"
    }
];

// 使用 defineStore 定义团队数据的 Pinia 仓库
export const useTeamStore = defineStore('teamStore', {
    state: (): TeamState => ({
        team: initialTeamMembers
    }),
    getters: {
        // 获取整个团队数据
        getAllTeamMembers: (state) => state.team,
        // 根据成员姓名获取单个成员信息
        getTeamMemberByName: (state) => (name: string) => {
            return state.team.find(member => member.name === name);
        },
        // 根据成员职位获取团队成员列表
        getTeamMembersByTitle: (state) => (title: string) => {
            return state.team.filter(member => member.title === title);
        }
    },
    actions: {
        // 添加新的团队成员
        addTeamMember(member: TeamMember) {
            if (!member.name ||!member.title ||!member.avatar ||!member.description) {
                console.error('添加团队成员时，姓名、职位、头像和描述为必填项。');
                return;
            }
            this.team.push(member);
        },
        // 根据姓名删除团队成员
        removeTeamMember(name: string) {
            const index = this.team.findIndex(member => member.name === name);
            if (index === -1) {
                console.error(`未找到姓名为 ${name} 的团队成员，无法删除。`);
                return;
            }
            this.team.splice(index, 1);
        },
        // 更新团队成员信息
        updateTeamMember(updatedMember: TeamMember) {
            const index = this.team.findIndex(member => member.name === updatedMember.name);
            if (index === -1) {
                console.error(`未找到姓名为 ${updatedMember.name} 的团队成员，无法更新。`);
                return;
            }
            this.team[index] = { ...this.team[index], ...updatedMember };
        }
    }
});
