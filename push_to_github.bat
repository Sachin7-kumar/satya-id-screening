@echo off
set "PATH=D:\react\MinGit\cmd;D:\react\bin;%PATH%"
echo ===================================================
echo   SATYA-ID: Push Repository to GitHub
echo ===================================================
echo.
echo Step 1: Checking GitHub authentication...
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] You are not logged in to GitHub.
    echo Launching GitHub CLI authentication in your browser...
    echo Please follow the prompts to complete login.
    echo.
    gh auth login --web -h github.com
)

echo.
echo Step 2: Creating GitHub repository and pushing main branch...
gh repo create satya-id-screening --public --source=. --remote=origin --push
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo [SUCCESS] Your GitHub repository is live!
    echo ===================================================
) else (
    echo.
    echo If repository already exists, pushing changes to origin main...
    git push -u origin main
)
pause
