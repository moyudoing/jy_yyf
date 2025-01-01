#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 设置生产环境
export NODE_ENV=production

# 清理构建目录
npm run clean

# 安装依赖
npm install

# 检查构建环境
echo "Building for production..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# 生成静态文件
npm run build

# 检查构建结果
if [ ! -d "dist" ]; then
  echo "Build failed: dist directory not found"
  exit 1
fi

# 进入生成的文件夹
cd dist

# 创建 .nojekyll 文件
touch .nojekyll

# 创建 CNAME 文件（如果需要自定义域名）
# echo "your-domain.com" > CNAME

# 初始化 Git 仓库
git init
git add -A

# 设置提交信息
DEPLOY_TIME=$(date '+%Y-%m-%d %H:%M:%S')
git commit -m "Deploy: ${DEPLOY_TIME}"

# 推送到 GitHub Pages
git push -f git@github.com:${GITHUB_USERNAME:-<USERNAME>}/${GITHUB_REPO:-jy_yyf}.git master:gh-pages

# 检查部署结果
if [ $? -eq 0 ]; then
  echo "Successfully deployed to GitHub Pages"
else
  echo "Deployment failed"
  exit 1
fi

cd -