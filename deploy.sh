#!/bin/bash
set -e

echo "Starting Gemini CLI deployment..."

# Check dependencies
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js version $(node -v) found."
fi

# Install Gemini CLI
echo "Installing @google/gemini-cli globally..."
sudo npm install -g @google/gemini-cli

echo "Gemini CLI installed successfully."
echo "Please set your API key using: export GEMINI_API_KEY='<your-key>'"
