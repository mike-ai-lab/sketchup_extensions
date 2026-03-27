@echo off
echo Killing all Node processes...
taskkill /F /IM node.exe /T 2>nul
timeout /t 2 /nobreak >nul

echo Starting fresh dev server...
cd /d "%~dp0"
pnpm dev
