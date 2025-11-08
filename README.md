![my-flomo-web](https://socialify.git.ci/jerryshell/my-flomo-web/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pattern=Brick%20Wall&pulls=1&stargazers=1&theme=Dark)

## 功能清单

- Flomo 数据导入
- Flomo API 兼容
- 邮件每日回顾
- 注销账号，永久抹除数据
- CSV 数据导入导出

## 如何运行

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/jerryshell/my-flomo-web.git
cd my-flomo-web

# 2. 安装依赖
npm install

# 3. 修改环境变量
# 将 .env 文件中的 VITE_API_BASE_URL 修改为你的 API 地址
vim .env

# 4. 启动开发服务器
npm run dev
```

### 构建生产版本

```bash
# 1. 构建项目
npm run build

# 2. 预览构建结果
npm run preview
```

## 相关项目

- [Web 端](https://github.com/jerryshell/my-flomo-web)
- [服务端](https://github.com/jerryshell/my-flomo-server)

## 开源协议

[GNU Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0)
