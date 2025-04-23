import { defineStore } from 'pinia';

import('@/assets/images/guozhuang/达成种植协议.jpg')
import('@/assets/images/guozhuang/菊芋种植.jpg')
import('@/assets/images/guozhuang/AIGC.png')
import('@/assets/images/agreement/青岛虹竹.png')
import('@/assets/images/experiment/河南工业大学实验.jpg')
import ('@/assets/videos/2023郭庄村调研.mp4')
import('@/assets/images/products/display/产品展示1.jpg')

// 定义故事章节的接口
interface Story {
    year: number;
    title: string;
    content: string;
    media: string;
    quote: string;
}

// 定义章节数据常量
const CHAPTERS_DATA: Story[] = [
    {
        year: 2022,
        title: '发现郭庄',
        content: '',
        media: "src/assets/videos/2023郭庄村调研.mp4",
        quote: '郭庄位于河南省登封市嵩山山麓，风景优美；但缺乏产业支撑的问题限制着郭庄村的发展',
    },
    {
        year: 2023,
        title: '种植协议',
        content: '',
        media: 'src/assets/images/guozhuang/达成种植协议.jpg',
        quote: '我们与郭庄村村委员会达成种植协议，划定10亩的土地作为我们的试验田'
    },
    {
        year: 2023,
        title: '试点种植菊芋',
        content: '',
        media: 'src/assets/images/guozhuang/菊芋种植.jpg',
        quote: '菊芋抗旱耐寒，易于田间管理，适合郭庄村发展需要，我们使用菊芋种植作为郭庄村打破发展桎梏的钥匙'
    },
    {
        year: 2023,
        title: '研发菊芋营养粉',
        content: '',
        media: 'src/assets/images/experiment/河南工业大学实验.jpg',
        quote: '我们与郭庄村村委员会达成种植协议，划定10亩的土地作为我们的试验田'
    },
    {
        year: 2024,
        title: '宣传郭庄',
        content: '',
        media: 'src/assets/videos/introduce.mp4',
        quote: '郭庄村事迹被河南日报、大象新闻等多家媒体报道'
    },
    {
        year: 2024,
        title: '菊芋营养粉',
        content: '',
        media: 'src/assets/images/products/display/产品展示1.jpg',
        quote: '菊芋营养粉研发完成'
    },
    {
        year: 2025,
        title: '生产协议',
        content: '',
        media: 'src/assets/images/agreement/青岛虹竹.png',
        quote: '我们与青岛虹竹生物有限公司达成生产协议，使产业链条完成'
    },
    {
        year: 2025,
        title: 'AIGC助力',
        content: '',
        media: 'src/assets/images/guozhuang/AIGC.png',
        quote: '我们使用AIGC工具设计郭庄村，设计文旅产业规划'
    },

];

// 定义章节数据的 Pinia store
export const useChaptersData = defineStore('chaptersData', {
    // 定义 store 的状态
    state: () => ({
        story: CHAPTERS_DATA
    }),
    // 定义 getters
    getters: {
        // 获取所有章节的标题
        allChapterTitles: (state) => state.story.map(chapter => chapter.title),
        // 根据年份筛选章节
        chaptersByYear: (state) => {
            return (year: number) => state.story.filter(chapter => chapter.year === year);
        }
    }
});
