FROM node:lts AS builder

# 服务端 API 地址
ENV VITE_API_BASE_URL="https://flomo-api.jerryshell.eu.org"

ENV GIT_BASE_URL="https://github.com"

WORKDIR /my-flomo-web
COPY . .
RUN npm install \
    && npm run build

# ---

FROM nginx:stable-alpine

COPY --from=builder /my-flomo-web/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /my-flomo-web/dist /usr/share/nginx/html
