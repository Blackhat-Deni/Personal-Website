@echo off
echo [DEBUG] Checking for Python...
python --version
if %ERRORLEVEL% equ 0 (
    echo [OK] Python found. Starting server on http://localhost:8000
    echo.
    echo 1. Keep this window OPEN.
    echo 2. Go to this link in your browser: http://localhost:8000
    echo.
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo [FAIL] Python not found.
    pause
)
