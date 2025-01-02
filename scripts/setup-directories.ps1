# 创建主要目录结构
$directories = @(
    "assets/icons",
    "assets/images/banner",
    "assets/images/products/jy",
    "assets/images/products/jy-gs",
    "assets/images/products/jy-gga",
    "assets/images/reports/full",
    "assets/images/reports/thumbnails",
    "assets/images/team",
    "assets/images/timeline",
    "assets/images/process",
    "assets/images/video",
    "assets/videos",
    "css/base",
    "js/data",
    "js/modules",
    "js/utils",
    "pages/products",
    "scripts"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path $dir
    Write-Host "Created directory: $dir"
}

# 添加CSS目录结构
$cssDirectories = @(
    "css/base",      # 基础样式
    "css/layout",    # 布局样式
    "css/components",# 组件样式
    "css/pages",     # 页面特定样式
    "css/themes",    # 主题样式
    "css/utils"      # 工具类
)

foreach ($dir in $cssDirectories) {
    New-Item -ItemType Directory -Force -Path $dir
    Write-Host "Created CSS directory: $dir"
} 