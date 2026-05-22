@echo off
REM ============================================================
REM  Fluxel Studio - local launcher
REM  Double-click this file to run the app at http://localhost:3000
REM ============================================================

setlocal
REM Always run from the folder this script lives in.
cd /d "%~dp0"

REM --- Check Node.js is available ---
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo [ERROR] Node.js was not found on your PATH.
  echo Please install Node.js 18.18+ from https://nodejs.org/ and try again.
  echo.
  pause
  exit /b 1
)

for /f "delims=" %%v in ('node --version') do echo Using Node %%v

REM --- Install dependencies on first run ---
if not exist "node_modules" (
  echo.
  echo Installing dependencies ^(first run only^)...
  call npm install
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install failed. See the output above.
    pause
    exit /b 1
  )
)

REM --- Open the browser shortly after the server boots ---
echo.
echo Starting dev server at http://localhost:3000
echo Press Ctrl+C in this window to stop.
echo.
start "" cmd /c "timeout /t 5 >nul & start http://localhost:3000"

REM --- Run the Next.js dev server (foreground) ---
call npm run dev

endlocal
