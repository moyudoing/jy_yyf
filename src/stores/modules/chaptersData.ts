import { defineStore } from 'pinia';

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
        year: 2012,
        title: '发现之旅',
        content: '',
        media: '/videos/discovery.mp4',
        quote: '大自然往往把最珍贵的馈赠，藏在最不起眼的角落'
    },
    {
        year: 2015,
        title: '科研突破',
        content: '',
        media: '/images/lab-research.jpg',
        quote: ''
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
