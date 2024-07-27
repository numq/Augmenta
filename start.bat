@echo off
setlocal

set NODE_ENV=production
set PUBLIC_URL=/build
if "%AUGMENTATION_SERVICE_PORT%"=="" (
    set REACT_APP_AUGMENTATION_SERVICE_PORT=5000
) else (
    set REACT_APP_AUGMENTATION_SERVICE_PORT=%AUGMENTATION_SERVICE_PORT%
)

cd client
if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo npm install failed
        pause
        exit /b 1
    )
)

call npm run build
if errorlevel 1 (
    echo npm build failed
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
    echo pip install failed
    pause
    exit /b 1
)

start http://127.0.0.1:%REACT_APP_AUGMENTATION_SERVICE_PORT%

python main.py

pause
endlocal