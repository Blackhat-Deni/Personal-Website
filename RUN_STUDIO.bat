@echo off
echo ========================================================
echo   Starting Your Website Local Server
echo ========================================================
echo.

:: Try to open the browser first
echo [1/2] Opening your browser...
start http://localhost:8000

:: Try to start the server
echo [2/2] Starting server on http://localhost:8000...
echo.
echo ----------------------------------------------------
echo   KEEP THIS WINDOW OPEN while you browse the site.
echo   If the site doesn't load, try refreshing.
echo ----------------------------------------------------
echo.

:: We try the most common commands one by one
python -m http.server 8000
if %ERRORLEVEL% neq 0 (
    py -m http.server 8000
)
if %ERRORLEVEL% neq 0 (
    python3 -m http.server 8000
)

if %ERRORLEVEL% neq 0 (
    echo [ERROR] Could not start the server. 
    echo Please make sure Python is installed.
    pause
)
