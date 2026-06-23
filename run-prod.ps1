$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot
$env:COREPACK_HOME = Join-Path $PSScriptRoot ".corepack"

if (-not (Test-Path (Join-Path $PSScriptRoot "node_modules"))) {
  corepack pnpm install
}

corepack pnpm build
corepack pnpm start

