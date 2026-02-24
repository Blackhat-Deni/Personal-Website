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
python server.py
if %ERRORLEVEL% equ 0 goto SUCCESS

py server.py
if %ERRORLEVEL% equ 0 goto SUCCESS

python3 server.py
if %ERRORLEVEL% equ 0 goto SUCCESS

:ERROR
echo [ERROR] Could not start the server. 
echo Please make sure Python is installed.
pause
goto END

:SUCCESS
:: Server ran and was closed by the user

:END
