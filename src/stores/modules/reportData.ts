// @/stores/modules/reportData.ts
import { defineStore } from 'pinia';

// 定义报告类型
interface Report {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
    thumbnail: string;
}

// 定义报告数据
export const initReports: Report[] = [
    {
        id: 1,
        title: '营养成分检测报告',
        description: '国家认证检测机构出具的营养成分分析报告',
        date: '2024-01-15',
        image: 'src/assets/images/reports/test (1).png',
        thumbnail: 'src/assets/images/reports/test (1).png',
    },
    {
        id: 2,
        title: '营养成分检测报告',
        description: '国家认证检测机构出具的营养成分分析报告',
        date: '2024-01-15',
        image: 'src/assets/images/reports/test (2).png',
        thumbnail: 'src/assets/images/reports/test (2).png',
    },
    {
        id: 3,
        title: '营养成分检测报告',
        description: '国家认证检测机构出具的营养成分分析报告',
        date: '2024-01-15',
        image: 'src/assets/images/reports/test (3).png',
        thumbnail: 'src/assets/images/reports/test (3).png',
    },
    {
        id: 4,
        title: '营养成分检测报告',
        description: '国家认证检测机构出具的营养成分分析报告',
        date: '2024-01-15',
        image: 'src/assets/images/reports/test (4).png',
        thumbnail: 'src/assets/images/reports/test (4).png',
    },
    {
        id: 5,
        title: '营养成分检测报告',
        description: '国家认证检测机构出具的营养成分分析报告',
        date: '2024-01-15',
        image: 'src/assets/images/reports/test (5).png',
        thumbnail: 'src/assets/images/reports/test (5).png',
    },
    // 可按需添加更多报告
];

export const useReportsStore = defineStore('reports', {
    state: () => ({
        // 直接使用 initReports 数组初始化 reports
        reports: initReports,
        isModalActive: false,
        currentReportIndex: -1
    }),
    getters: {
        // 获取所有报告
        getAllReports: (state) => state.reports,
    },
    actions: {
        // 初始化报告数据
        initReports(reportsData: Report[]) {
            this.reports = reportsData;
        },
        // 显示报告模态框
        showReport(index: number) {
            this.currentReportIndex = index;
            this.isModalActive = true;
            document.body.style.overflow = 'hidden';
        },
        // 隐藏报告模态框
        hideReport() {
            this.isModalActive = false;
            document.body.style.overflow = '';
        }
    }
});
