@echo off
setlocal

cd client
if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo npm install failed.
        pause
        exit /b 1
    )
)

set PUBLIC_URL=/build
call npm run build
if errorlevel 1 (
    echo npm build failed.
    pause
    exit /b 1
)

cd ../server
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate

pip install -r requirements.txt
if errorlevel 1 (
    echo pip install failed.
    pause
    exit /b 1
)

python main.py

pause
endlocal