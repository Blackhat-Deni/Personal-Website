@echo off
echo ========================================================
echo   Starting THE STUDIO — Local Admin & Web Server
echo ========================================================
echo.

:: 1. Start the Website Server (Python) in a new window
echo [1/3] Starting Website Server on http://localhost:8000...
start "Website Server" cmd /c "python server.py"

:: 2. Start the CMS Proxy Server (Decap) in a new window
:: This allows the CMS to read/write to your local files
echo [2/3] Starting CMS Proxy on http://localhost:8081...
start "CMS Proxy" cmd /c "npx decap-server"

:: 3. Open the Browser
echo [3/3] Opening Admin Dashboard...
timeout /t 3 /nobreak > nul
start http://localhost:8000/admin/

echo.
echo ----------------------------------------------------
echo   SUCCESS: Local environment is running!
echo.
echo   - Website & Admin: http://localhost:8000/admin/
echo   - Local Proxy:     http://localhost:8081
echo.
echo   KEEP THE TWO NEW WINDOWS OPEN while working.
echo   Changes to the CMS UI will show up instantly.
echo ----------------------------------------------------
echo.
pause
