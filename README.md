# global-history-lens（本地运行）

## 方式一：开发模式（推荐）

PowerShell：

```powershell
cd d:\code\jianliprd\global-history-lens
$env:COREPACK_HOME = Join-Path (Get-Location) ".corepack"
corepack pnpm install
corepack pnpm dev
```

打开：`http://localhost:3000/`

如果脚本被执行策略拦截：

```powershell
powershell -ExecutionPolicy Bypass -File .\run-dev.ps1
```

## 方式二：生产模式（本地预览打包产物）

```powershell
cd d:\code\jianliprd\global-history-lens
$env:COREPACK_HOME = Join-Path (Get-Location) ".corepack"
corepack pnpm install
corepack pnpm build
corepack pnpm start
```

打开：`http://localhost:3000/`

## 环境变量（可选）

- 复制 `.env.example` 为 `.env.local` 后填写需要的 `VITE_` 变量。
