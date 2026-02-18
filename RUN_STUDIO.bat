@echo off
echo Starting The Studio (Decap CMS)...

:: Check for node/npx
where npx >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js/npx not found. Please install Node.js to use the Studio.
    pause
    exit /b
)

:: Start Proxy Server in background (needed to save files locally)
echo [1/3] Starting Local Backend Proxy...
start /b npx decap-cms-proxy-server

:: Start a local web server (needed because CMS doesn't like file://)
echo [2/3] Starting Web Server on http://localhost:8080...
echo [3/3] Opening Dashboard...
start http://localhost:8080/admin/index.html

:: Use npx serve to host the folder
npx serve -l 8080 .
