# PowerShell script to analyze bundle sizes
# Run after build

$distPath = ".\dist\ui-lib-custom"

Write-Host "Bundle Size Analysis" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan

if (-not (Test-Path $distPath)) {
  Write-Host "dist path not found: $distPath" -ForegroundColor Yellow
  exit 1
}

# Analyze main bundle
Get-ChildItem -Path $distPath -Filter "*.mjs" -Recurse |
  ForEach-Object {
    $size = [math]::Round($_.Length / 1KB, 2)
    Write-Host "$($_.Name): $size KB"
  }

