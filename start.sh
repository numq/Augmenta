#!/bin/bash

set -e

export NODE_ENV=production
export PUBLIC_URL=/build

: "${AUGMENTATION_SERVICE_URL_SCHEME:=http}"
: "${AUGMENTATION_SERVICE_HOST:=127.0.0.1}"
: "${AUGMENTATION_SERVICE_PORT:=5000}"
: "${DISABLE_AUTO_OPEN:=0}"
: "${API_ONLY:=0}"
: "${THREAD_COUNT:=6}"

if [ ! -d "venv" ]; then
    python3 -m venv venv
else
    echo "Virtual environment already created. Skipping creation."
fi

source venv/bin/activate

if [ "$API_ONLY" -eq 0 ]; then
    cd client

    echo "Installing npm dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "npm install failed"
        exit 1
    fi

    echo "Updating browserslist..."
    npx update-browserslist-db@latest

    if [ -d "build" ]; then
        rm -rf build
    fi
    echo "Building client..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "npm build failed"
        exit 1
    fi

    cd ..

    if [ -f "client/build/index.html" ]; then
        echo "Configuring client..."
        python setup_client.py "client/build/index.html"
    else
        echo "ERROR: client/build/index.html not found after build!"
        exit 1
    fi
fi

cd server

echo "Installing Python dependencies..."
pip install --upgrade pip
pip install --upgrade -r requirements.txt --prefer-binary
if [ $? -ne 0 ]; then
    echo "pip install failed"
    exit 1
fi

if [ "$DISABLE_AUTO_OPEN" -eq 0 ] && [ "$API_ONLY" -eq 0 ]; then
    echo "Opening browser..."
    sleep 2
    if [ "$(uname)" = "Darwin" ]; then
        open "$AUGMENTATION_SERVICE_URL_SCHEME://$AUGMENTATION_SERVICE_HOST:$AUGMENTATION_SERVICE_PORT/"
    elif [ "$(uname)" = "Linux" ]; then
        xdg-open "$AUGMENTATION_SERVICE_URL_SCHEME://$AUGMENTATION_SERVICE_HOST:$AUGMENTATION_SERVICE_PORT/"
    else
        echo "Unsupported OS: $(uname). Cannot open URL automatically."
    fi
fi

echo "Starting server..."
python main.py