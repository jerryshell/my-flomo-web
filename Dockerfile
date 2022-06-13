FROM node:lts as builder

ENV VITE_API_BASE_URL="https://my-flomo-api.d8s.fun"

# 中国大陆的 GitHub 镜像
ENV GIT_BASE_URL="https://hub.fastgit.xyz"
# 如果你的国际网络没问题，就用下面这个
#ENV GIT_BASE_URL="https://github.com"

WORKDIR /

RUN git clone ${GIT_BASE_URL}/jerryshell/my-flomo-web.git \
    && cd my-flomo-web \
    && yarn install \
    && yarn build

# --

FROM nginx:stable-alpine

COPY --from=builder /my-flomo-web/dist /usr/share/nginx/html
