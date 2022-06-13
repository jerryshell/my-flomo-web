![my-flomo-web](https://socialify.git.ci/jerryshell/my-flomo-web/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pattern=Brick%20Wall&pulls=1&stargazers=1&theme=Dark)

## 功能清单

* Flomo 数据导入
* Flomo API 兼容
* 邮件每日回顾
* 注销账号，永久抹除数据
* CSV 数据导入导出
* 服务端支持 ARMv7 部署

## 体验 Demo

**⚠️ 注意：推荐每个用户单独搭建自己的服务，体验 Demo 不保证数据安全性，所以请勿在体验 Demo 中使用真实用户名密码注册！请勿在体验 Demo 中录入敏感数据！**

[https://my-flomo.pages.dev](https://my-flomo.pages.dev)

## 如何运行

### 1. 下载 Dockerfile

```shell
wget https://raw.githubusercontent.com/jerryshell/my-flomo-web/master/Dockerfile
```

### 2. 修改 Dockerfile

将 `VITE_API_BASE_URL` 修改为你的 API 地址，如：`https://my-flomo-api.d8s.fun`

### 3. 打包

```shell
docker build -t my-flomo-web . --no-cache
```

### 4. 启动

```shell
docker run --rm -p 9090:80 my-flomo-web
```

# 相关项目

* [Web 端](https://github.com/jerryshell/my-flomo-web)
* [服务端](https://github.com/jerryshell/my-flomo-server)

# 感谢

* [Flomo](https://flomoapp.com) （灵感来源）
* [Water.css](https://watercss.kognise.dev) （让后端工程师脱离 CSS 苦海）

## 开源许可证

[GNU Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0)
