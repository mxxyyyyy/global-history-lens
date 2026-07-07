# 腾讯云部署指南

适用方案：腾讯云轻量应用服务器或 CVM，使用 Node.js + PM2 + Nginx 部署。

## 1. 推荐服务器

- 地域：香港、新加坡，面向国内访问会比 Render 更友好；如果必须用中国大陆地域，需要先完成备案。
- 系统：Ubuntu 22.04 LTS
- 配置：2 核 2GB 起步；如果后续访问量增加，再升级。
- 防火墙：放行 22、80、443。

## 2. 服务器初始化

```bash
sudo apt update
sudo apt install -y git curl nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
sudo npm install -g pm2
```

## 3. 拉取项目

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone https://github.com/mxxyyyyy/global-history-lens.git
cd global-history-lens
```

如果服务器已经拉过项目，之后更新用：

```bash
cd /var/www/global-history-lens
git pull origin main
```

## 4. 配置环境变量

创建生产环境变量文件：

```bash
nano .env.production
```

填入：

```bash
AUTH_SECRET=换成一段至少32位的随机字符串
PUBLIC_APP_URL=https://你的域名
GITHUB_CLIENT_ID=你的 GitHub OAuth Client ID
GITHUB_CLIENT_SECRET=你的 GitHub OAuth Client Secret
AUTH_DATA_FILE=/var/www/global-history-lens/data/auth-users.json
```

如果暂时不用 GitHub 登录，可以先不填 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`。

## 5. 安装、构建、启动

```bash
cd /var/www/global-history-lens
set -a
source .env.production
set +a
corepack pnpm install --frozen-lockfile
corepack pnpm build
mkdir -p /var/www/global-history-lens/data
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

如果之后更新代码：

```bash
cd /var/www/global-history-lens
git pull origin main
set -a
source .env.production
set +a
corepack pnpm install --frozen-lockfile
corepack pnpm build
pm2 restart global-history-lens --update-env
```

## 6. 配置 Nginx

创建站点配置：

```bash
sudo nano /etc/nginx/sites-available/global-history-lens
```

写入：

```nginx
server {
    listen 80;
    server_name 你的域名;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/global-history-lens /etc/nginx/sites-enabled/global-history-lens
sudo nginx -t
sudo systemctl reload nginx
```

## 7. 配置 HTTPS

域名 DNS 解析到服务器公网 IP 后，安装证书：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名
```

证书完成后，把 `.env.production` 里的 `PUBLIC_APP_URL` 改成 `https://你的域名`，再重启：

```bash
set -a
source .env.production
set +a
pm2 restart global-history-lens --update-env
```

## 8. GitHub 登录回调地址

在 GitHub OAuth App 里把 Authorization callback URL 改为：

```text
https://你的域名/api/auth/github/callback
```

如果仍然使用腾讯云临时公网 IP 测试，GitHub 登录可能因为没有 HTTPS 而不稳定，建议绑定域名和 HTTPS 后再启用。

