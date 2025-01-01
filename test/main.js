import {products} from './data/products.js'
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body><div class="mobile-menu"></div></body></html>');
const document = dom.window.document;

document.addEventListener('scroll', () => {
    // 滚动事件的处理逻辑
});
// 移动端菜单
// const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// 返回顶部按钮
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 滚动动画
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// // 表单提交
// const contactForm = document.getElementById('contact-form');
//
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//
//     // 获取表单数据
//     const formData = new FormData(contactForm);
//     const data = Object.fromEntries(formData);
//
//     // TODO: 发送表单数据到服务器
//     console.log('Form submitted:', data);
//
//     // 清空表单
//     contactForm.reset();
//
//     // 显示成功消息
//     alert('消息已发送，我们会尽快与您联系！');
// });

// 产品数据
// const products = [
//     {
//         id: 1,
//         name: '菊芋营养粉 100g',
//         description: '优质菊芋提取，科技萃取精华',
//         image: './assets/images/products-1.jpg',
//         price: '¥1'
//     },
//     {
//         id: 2,
//         name: '菊芋营养粉 200g',
//         description: '家庭装，更实惠',
//         image: './assets/images/products-2.jpg',
//         price: '¥11'
//     },
//     {
//         id: 3,
//         name: '菊芋营养粉礼盒装',
//         description: '高端礼盒，送礼佳选',
//         image: './assets/images/products-3.jpg',
//         price: '¥21'
//     }
// ];

// 特点数据
const features = [
    {
        icon: '🌿',
        title: '天然提取',
        description: '采用天然菊芋，无添加剂'
    },
    {
        icon: '🔬',
        title: '科技萃取',
        description: '先进工艺，保留营养'
    },
    {
        icon: '💪',
        title: '营养健康',
        description: '富含益生元，调节肠道'
    }
];

// 动态生成产品卡片
function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'products-card';
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                </div>
                <div>
                    <div class="product-price">${product.price}</div>
                    <div class="product-actions">
                        <a href="pages/products/${product.slug}.html" class="btn btn-primary">了解详情</a>
                        <button class="btn btn-outline" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// 动态生成特点卡片
function renderFeatures() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;

    features.forEach(feature => {
        const featureCard = document.createElement('div');
        featureCard.className = 'feature-card';
        featureCard.innerHTML = `
            <div class="feature-icon">${feature.icon}</div>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        `;
        featuresGrid.appendChild(featureCard);
    });
}

// 视频控制
const videoContainer = document.querySelector('.video-container');
const video = document.getElementById('products-video');
const playButton = document.querySelector('.play-button');
const videoPoster = document.querySelector('.video-poster');

if (video && playButton) {
    playButton.addEventListener('click', () => {
        videoContainer.classList.add('playing');
        video.play();
    });

    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            videoContainer.classList.add('playing');
        } else {
            video.pause();
            videoContainer.classList.remove('playing');
        }
    });

    video.addEventListener('ended', () => {
        videoContainer.classList.remove('playing');
    });

    video.addEventListener('pause', () => {
        videoContainer.classList.remove('playing');
    });

    video.addEventListener('play', () => {
        videoContainer.classList.add('playing');
    });
}

// 检测报告数据
const reports = [
    {
        id: 1,
        title: '营养成分检测报告',
        image: './assets/images/report/test (1).png',
        date: '2024-01-10'
    },
    {
        id: 2,
        title: '重金属检测报告',
        image: './assets/images/report/test (2).png',
        date: '2024-01-11'
    },
    {
        id: 3,
        title: '微生物检测报告',
        image: './assets/images/report/test (3).png',
        date: '2024-01-12'
    },
    {
        id: 4,
        title: '农药残留检测报告',
        image: './assets/images/report/test (4).png',
        date: '2024-01-13'
    },
    {
        id: 5,
        title: '产品质量检测报告',
        image: './assets/images/report/test (5).png',
        date: '2024-01-14'
    }
];

// 研发历程数据
const timeline = [
    {
        year: '2020',
        title: '项目启动',
        content: '开始菊芋营养粉研发项目，组建研发团队'
    },
    {
        year: '2021',
        title: '技术突破',
        content: '完成菊芋提取工艺开发，获得发明专利'
    },
    {
        year: '2022',
        title: '产品定型',
        content: '完成产品配方优化，通过质量检测'
    },
    {
        year: '2023',
        title: '量产准备',
        content: '建设GMP生产线，完成试生产'
    },
    {
        year: '2024',
        title: '正式投产',
        content: '产品正式投产并上市销售'
    }
];

// 团队成员数据
const teamMembers = [
    {
        id: 1,
        name: '张教授',
        title: '首席科学家',
        image: './assets/images/team/member/zxs.jpg',
        description: '国家特聘专家，30年食品研发经验',
        details: {
            education: '食品工程博士',
            experience: ['国家重点实验室主任', '国家科技进步奖获得者'],
            publications: ['发表SCI论文50余篇', '获得发明专利20项'],
            research: '专注于天然食品功能因子提取与应用研究'
        }
    },
    {
        id: 2,
        name: '李博士',
        title: '技术总监',
        image: './assets/images/team/member/zhm.jpg',
        description: '工艺开发专家，负责产品研发',
        details: {
            education: '生物工程博士',
            experience: ['新产品开发经理', '工艺优化专家'],
            publications: ['发表核心期刊论文20篇', '获得发明专利8项'],
            research: '专注于生物活性物质提取工艺研究'
        }
    },
    {
        id: 3,
        name: '王工程师',
        title: '质量总监',
        image: './assets/images/team/member/cjs.jpg',
        description: '质量控制专家，把控产品品质',
        details: {
            education: '食品质量与安全硕士',
            experience: ['质量体系审核员', 'HACCP体系专家'],
            publications: ['参与制定行业标准3项', '获得实用新型专利5项'],
            research: '专注于食品安全控制与质量管理'
        }
    }
];

// 渲染检测报告
function renderReports() {
    const reportsGrid = document.querySelector('.reports-grid');
    if (!reportsGrid) return;

    reports.forEach(report => {
        const reportItem = document.createElement('div');
        reportItem.className = 'report-item';
        reportItem.innerHTML = `
            <img src="${report.image}" alt="${report.title}">
            <div class="report-info">
                <h3>${report.title}</h3>
                <p>${report.date}</p>
            </div>
        `;
        reportItem.addEventListener('click', () => showReportModal(report));
        reportsGrid.appendChild(reportItem);
    });
}

// 渲染研发历程
function renderTimeline() {
    const timelineContainer = document.querySelector('.timeline');
    if (!timelineContainer) return;

    timeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <span class="year">${item.year}</span>
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
    });
}

// 渲染团队成员
function renderTeamMembers() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    teamMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="member-image">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="title">${member.title}</p>
                <p>${member.description}</p>
            </div>
        `;
        memberCard.addEventListener('click', () => showMemberModal(member));
        teamGrid.appendChild(memberCard);
    });
}

// 显示检测报告模态框
function showReportModal(report) {
    const modal = document.getElementById('report-modal');
    const image = document.getElementById('report-image');
    image.src = report.image;
    modal.classList.add('active');
}

// 显示团队成员模态框
function showMemberModal(member) {
    const modal = document.getElementById('member-modal');
    const details = document.getElementById('member-details');
    details.innerHTML = `
        <div class="member-header">
            <img src="${member.image}" alt="${member.name}" class="member-detail-image">
            <div class="member-basic-info">
                <h2>${member.name}</h2>
                <p class="title">${member.title}</p>
            </div>
        </div>
        <div class="member-detail-content">
            <h3>教育背景</h3>
            <p>${member.details.education}</p>
            
            <h3>工作经验</h3>
            <ul>
                ${member.details.experience.map(exp => `<li>${exp}</li>`).join('')}
            </ul>
            
            <h3>研究成果</h3>
            <ul>
                ${member.details.publications.map(pub => `<li>${pub}</li>`).join('')}
            </ul>
            
            <h3>研究方向</h3>
            <p>${member.details.research}</p>
        </div>
    `;
    modal.classList.add('active');
}

// 关闭模态框
document.querySelectorAll('.modal-close').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    });
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderFeatures();
    renderReports();
    renderTimeline();
    renderTeamMembers();
});

// 页面过渡效果
document.addEventListener('DOMContentLoaded', () => {
    // 延迟加载图片
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // 视频容器加载优化
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const video = videoContainer.querySelector('video');
        video.addEventListener('loadeddata', () => {
            videoContainer.classList.add('loaded');
        });
    }

    // 页面跳转过渡
    document.querySelectorAll('a[href^="./"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.href;
            document.body.classList.add('page-transitioning');
            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });
});

// 优化滚动性能
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // 执行滚动相关操作
            updateScrollProgress();
        }, 16);
    }
});

// 更新滚动进度
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    }
}

// 移动端下拉菜单
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = navDropdown.querySelector('a');

if (window.innerWidth <= 768) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navDropdown.classList.toggle('active');
    });
}

// 动画效果优化
const sectionLinks = document.querySelectorAll('.section-link');
sectionLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.querySelector('i').style.transform = 'translateX(5px)';
    });

    link.addEventListener('mouseleave', () => {
        link.querySelector('i').style.transform = 'translateX(0)';
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 页面切换动画
const pageTransition = {
    init() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        document.body.appendChild(this.overlay);
    },

    start() {
        this.overlay.classList.add('active');
        return new Promise(resolve => {
            setTimeout(resolve, 300); // 减少过渡时间以提升体验
        });
    },

    finish() {
        this.overlay.classList.remove('active');
    }
};

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    pageTransition.init();

    // 链接跳转动画
    document.querySelectorAll('a[href^="./"], a[href^="../"]').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const target = e.currentTarget.href;
            await pageTransition.start();
            window.location.href = target;
        });
    });
});

// GitHub Pages 路径处理
function getBasePath() {
    const path = window.location.pathname;
    const basePathMatch = path.match(/^\/[^/]+/);
    return basePathMatch ? basePathMatch[0] : '';
}

function fixGitHubPagesPath(path) {
    const basePath = getBasePath();
    return basePath + path;
}

// 侧边导航跳转
const sideNavItems = document.querySelectorAll('.side-nav-item');
sideNavItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.dataset.target;
        window.location.href = `pages/products/${target}.html`;
    });
});

// 移动端滑动跳转
const mobileProductNav = document.querySelector('.mobile-products-nav');
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 100;
    if (touchEndX < touchStartX - swipeThreshold) {
        // 左滑
        window.location.href = 'pages/products/high-entropy.html';
    }
}

// 照片滚动画廊
class Gallery {
    constructor(element) {
        this.container = element.querySelector('.gallery-container');
        this.items = element.querySelectorAll('.gallery-item');
        this.nav = element.querySelector('.gallery-nav');
        this.currentIndex = 0;
        this.isAnimating = false;

        this.init();
    }

    init() {
        // 创建导航点
        this.items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `gallery-dot${index === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => this.goTo(index));
            this.nav.appendChild(dot);
        });

        // 自动播放
        setInterval(() => this.next(), 5000);

        // 触摸事件
        let startX = 0;
        this.container.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) this.prev();
                else this.next();
            }
        });
    }

    goTo(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.container.style.transform = `translateX(-${index * 100}%)`;
        this.nav.querySelectorAll('.gallery-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentIndex = index;
        setTimeout(() => this.isAnimating = false, 500);
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goTo(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goTo(prevIndex);
    }
}

// 初始化画廊
document.addEventListener('DOMContentLoaded', () => {
    const galleryElement = document.querySelector('.timeline-gallery');
    if (galleryElement) {
        new Gallery(galleryElement);
    }
});

// 滚动进度条
const scrollProgress = document.querySelector('.scroll-progress-bar');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});
