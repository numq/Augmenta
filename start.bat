@echo off
setlocal

set NODE_ENV=production
set PUBLIC_URL=/build

if "%AUGMENTATION_SERVICE_PORT%"=="" (
    set AUGMENTATION_SERVICE_PORT=5000
)

set REACT_APP_AUGMENTATION_SERVICE_PORT=%AUGMENTATION_SERVICE_PORT%

cd server

if not exist venv (
    call python -m venv venv
) else (
    echo Virtual environment already created. Skipping creation.
)

call venv\Scripts\activate

call pip install --upgrade -r requirements.txt
if errorlevel 1 (
    echo pip install failed
    pause
    exit /b 1
)

cd ../client

if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo npm install failed
        pause
        exit /b 1
    )
) else (
    echo Node modules already installed. Skipping installation.
)

call npm run build
if errorlevel 1 (
    echo npm build failed
    pause
    exit /b 1
)

cd ../server

start http://127.0.0.1:%REACT_APP_AUGMENTATION_SERVICE_PORT%/

call python main.py

pause
endlocal