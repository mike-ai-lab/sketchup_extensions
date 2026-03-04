@echo off
echo Killing any existing servers...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak > nul
echo Starting servers...
start "Backend Server" cmd /c "pnpm dev:server"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /c "pnpm dev"
