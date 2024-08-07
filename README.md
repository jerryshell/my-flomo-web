![my-flomo-web](https://socialify.git.ci/jerryshell/my-flomo-web/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pattern=Brick%20Wall&pulls=1&stargazers=1&theme=Dark)

## 功能清单

- Flomo 数据导入
- Flomo API 兼容
- 邮件每日回顾
- 注销账号，永久抹除数据
- CSV 数据导入导出
- Docker 镜像支持 ARMv7（树莓派）

## 体验 Demo

~~[https://my-flomo.d8s.fun](https://my-flomo.d8s.fun)~~

**服务器到期，体验 Demo 的后端已经关闭**

## 如何运行

### Docker

```bash
# 1. git clone
git clone https://github.com/jerryshell/my-flomo-web.git

# 2. 修改 Dockerfile
# 将 VITE_API_BASE_URL 修改为你的 API 地址，如：https://flomo-api.jerryshell.eu.org
vim Dockerfile

# 3. 构建
docker build -t my-flomo-web . --no-cache

# 4. 启动
docker run --rm -p 9090:80 my-flomo-web
```

### K8s

请参考 [k8s/\*.yaml](k8s)

要注意修改：

- `deployment.yaml` 的 `image`
- `ingress/ingress.yaml` 的 `host`
- `ingress/tls-ingress.yaml` 的 `host`
  - 这里的 TLS 需要前置条件，具体请看：[K8s Traefik cert-manager DNS01 TLS](https://github.com/jerryshell/k8s-traefik-cert-manager-dns01-tls)

## 相关项目

- [Web 端](https://github.com/jerryshell/my-flomo-web)
- [服务端](https://github.com/jerryshell/my-flomo-server)

## 开源协议

[GNU Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0)
