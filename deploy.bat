@echo off
echo ==========================================
echo   Golden Call Platform - Deployment Tool
echo ==========================================
echo.
echo This script will initialize Git and push your new platform to GitHub.
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not reachable. 
    echo Please make sure you installed Git and RESTARTED VS Code.
    pause
    exit /b
)

echo [1/5] Initializing Repository...
git init
git branch -M main

echo [2/5] Adding Files...
git add .

echo [3/5] Committing Changes...
git commit -m "feat: golden call platform upgrade (Auth, Dashboard, AI)"

echo [4/5] Connecting to GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Abdilouai/goldencall-website.git

echo [5/5] Pushing to GitHub...
echo.
echo NOTE: A popup may appear asking you to sign in to GitHub. Please sign in!
echo.
git push -u origin main

echo.
echo ==========================================
echo   Deployment Command Finished!
echo   Check Vercel for your live site.
echo ==========================================
pause
