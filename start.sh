#!/bin/bash

set -e

export NODE_ENV=production
export PUBLIC_URL=/build

: "${AUGMENTATION_SERVICE_URL_SCHEME:=http}"
: "${AUGMENTATION_SERVICE_HOST:=127.0.0.1}"
: "${AUGMENTATION_SERVICE_PORT:=5000}"
: "${DISABLE_AUTO_OPEN:=0}"
: "${API_ONLY:=0}"

if [ ! -d "venv" ]; then
    python3 -m venv venv
else
    echo "Virtual environment already created. Skipping creation."
fi

source venv/bin/activate

if [ "$API_ONLY" -eq 0 ]; then
    python setup_client.py "client/build/index.html"

    cd client

    if [ ! -d "node_modules" ]; then
        npm install
        if [ $? -ne 0 ]; then
            echo "npm install failed"
            exit 1
        fi
    else
        echo "Node modules already installed. Skipping installation."
    fi

    if [ ! -d "build" ]; then
        npm run build
        if [ $? -ne 0 ]; then
            echo "npm build failed"
            exit 1
        fi
    else
        echo "Build directory already exists. Skipping build."
    fi

    cd ..
fi

cd server

pip install --upgrade -r requirements.txt
if [ $? -ne 0 ]; then
    echo "pip install failed"
    exit 1
fi

if [ "$DISABLE_AUTO_OPEN" -eq 0 ] && [ "$API_ONLY" -eq 0 ]; then
    if [ "$(uname)" = "Darwin" ]; then
        open "$AUGMENTATION_SERVICE_URL_SCHEME://$AUGMENTATION_SERVICE_HOST:$AUGMENTATION_SERVICE_PORT/"
    elif [ "$(uname)" = "Linux" ]; then
        xdg-open "$AUGMENTATION_SERVICE_URL_SCHEME://$AUGMENTATION_SERVICE_HOST:$AUGMENTATION_SERVICE_PORT/"
    else
        echo "Unsupported OS: $(uname). Cannot open URL."
    fi
fi

python main.py
