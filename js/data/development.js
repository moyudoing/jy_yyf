import {PATHS} from '../config.js';

export const development = {
    techRoute: {
        image: PATHS.images.process('tech-route.png'),
        title: '技术路线图',
        description: '菊芋营养粉生产工艺技术路线'
    },
    flowChart: {
        image: PATHS.images.process('flow.png'),
        title: '生产流程图',
        description: '标准化生产流程'
    }
};

export const timeline = [
    {
        year: 2020,
        title: '项目启动',
        description: '开始菊芋营养粉研发项目',
        image: PATHS.images.timeline('event-1.jpg')
    },
    {
        year: 2021,
        title: '工艺突破',
        description: '完成关键工艺技术研发',
        image: PATHS.images.timeline('event-2.jpg')
    },
    {
        year: 2022,
        title: '产品定型',
        description: '完成产品配方优化',
        image: PATHS.images.timeline('event-3.jpg')
    },
    {
        year: 2023,
        title: '投产运营',
        description: '建成标准化生产线',
        image: PATHS.images.timeline('event-4.jpg')
    }
];
