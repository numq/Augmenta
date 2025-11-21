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

    echo Installing npm dependencies...
    call npm install
    if errorlevel 1 (
        echo npm install failed
        pause
        exit /b 1
    )

    echo Updating browserslist...
    call npx update-browserslist-db@latest

    if exist build rmdir /s /q build
    echo Building client...
    call npm run build
    if errorlevel 1 (
        echo npm build failed
        pause
        exit /b 1
    )

    cd ..

    if exist "client\build\index.html" (
        echo Configuring client...
        call python setup_client.py "client/build/index.html"
    ) else (
        echo ERROR: client/build/index.html not found after build!
        pause
        exit /b 1
    )
)

cd server

echo Installing Python dependencies...
call pip install --upgrade pip
call pip install --upgrade -r requirements.txt --prefer-binary
if errorlevel 1 (
    echo pip install failed
    pause
    exit /b 1
)

if "%DISABLE_AUTO_OPEN%"=="0" (
    if "%API_ONLY%"=="0" (
        echo Opening browser...
        timeout /t 2 /nobreak > nul
        start %AUGMENTATION_SERVICE_URL_SCHEME%://%AUGMENTATION_SERVICE_HOST%:%AUGMENTATION_SERVICE_PORT%/
    )
)

echo Starting server...
call python main.py

pause
endlocal