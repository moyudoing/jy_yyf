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