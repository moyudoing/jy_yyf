// src/stores/timelineStore.ts
import { defineStore } from 'pinia';

// 定义时间线项目的类型
interface TimelineItem {
    year: number;
    title: string;
    description: string;
    image: string;
}

// 可以将时间线数据提取到单独的文件中，这里为了方便演示直接写在代码里
const timelineData: TimelineItem[] = [
    {
        year: 2021,
        title: "研发启动",
        description: "开始菊芋营养粉的研发工作，组建研发团队",
        image: "src/assets/images/development/2021.jpg"
    },
    {
        year: 2022,
        title: "技术突破",
        description: "完成关键技术攻关，获得多项专利",
        image: "src/assets/images/development/2022.jpg"
    },
    {
        year: 2023,
        title: "产品优化",
        description: "完成产品配方优化，通过多项安全认证",
        image: "src/assets/images/development/2023.jpg"
    },
    {
        year: 2024,
        title: "正式投产",
        description: "建立标准化生产线，实现规模化生产",
        image: "src/assets/images/development/2024.jpg"
    }
];

export const useTimelineStore = defineStore('timelineStore', {
    // 状态定义
    state: () => ({
        timeline: timelineData
    }),
    // 获取器定义
    getters: {
        /**
         * 获取整个时间线数据
         * @returns 时间线项目数组
         */
        getAllTimeline: (state): TimelineItem[] => state.timeline,
        /**
         * 根据年份获取对应的时间线项目
         * @param year 要查找的年份
         * @returns 匹配的时间线项目，如果未找到则返回 undefined
         */
        getTimelineByYear: (state) => (year: number): TimelineItem | undefined => {
            const item = state.timeline.find(item => item.year === year);
            if (!item) {
                console.warn(`未找到年份为 ${year} 的时间线项目`);
            }
            return item;
        }
    },
    // 动作定义
    actions: {
        /**
         * 添加新的时间线项目
         * @param item 要添加的时间线项目
         */
        addTimelineItem(item: TimelineItem) {
            this.timeline.push(item);
        }
    }
});
