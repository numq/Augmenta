@echo off
setlocal

set NODE_ENV=production
set PUBLIC_URL=/build

if "%AUGMENTATION_SERVICE_URL_SCHEME%"=="" (
    set AUGMENTATION_SERVICE_URL_SCHEME=http
)

if "%AUGMENTATION_SERVICE_HOST%"=="" (
    set AUGMENTATION_SERVICE_HOST=127.0.0.1
)

if "%AUGMENTATION_SERVICE_PORT%"=="" (
    set AUGMENTATION_SERVICE_PORT=5000
)

if "%DISABLE_AUTO_OPEN%"=="" (
    set DISABLE_AUTO_OPEN=0
)

if "%API_ONLY%"=="" (
    set API_ONLY=0
)

if "%THREAD_COUNT%"=="" (
    set THREAD_COUNT=6
)

if not exist venv (
    call python -m venv venv
) else (
    echo Virtual environment already created. Skipping creation.
)

call venv\Scripts\activate

if "%API_ONLY%"=="0" (
    cd client

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

    if not exist build (
        call npm run build
        if errorlevel 1 (
            echo npm build failed
            pause
            exit /b 1
        )
    ) else (
        echo Build directory already exists. Skipping build.
    )

    cd ..

    call python setup_client.py "client/build/index.html"
)

cd server

call pip install --upgrade -r requirements.txt
if errorlevel 1 (
    echo pip install failed
    pause
    exit /b 1
)

if "%DISABLE_AUTO_OPEN%"=="0" (
    if "%API_ONLY%"=="0" (
        start %AUGMENTATION_SERVICE_URL_SCHEME%://%AUGMENTATION_SERVICE_HOST%:%AUGMENTATION_SERVICE_PORT%/
    )
)

call python main.py

pause
endlocal
