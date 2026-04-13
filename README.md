# Gemini CLI Deployment

This repository provides steps and scripts to deploy Gemini CLI from scratch in a Kubernetes-ready Linux environment.

## Prerequisites
- Node.js v20+
- npm v10+
- Google Gemini API Key

## Deployment Steps

### 1. Install Node.js & npm (if not present)
```bash
# On Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Gemini CLI
```bash
npm install -g @google/gemini-cli
```

### 3. Configure API Key
```bash
export GEMINI_API_KEY="your-api-key-here"
```

### 4. Verify Installation
```bash
gemini --help
```

## Running as a Kubernetes Pod
To run Gemini CLI as a persistent service/agent in your cluster:

1. Build the Docker image:
   `docker build -t gemini-cli:latest .`
2. Create a Kubernetes secret for your API key:
   `kubectl create secret generic gemini-secrets --from-literal=api-key=YOUR_API_KEY`
3. Deploy to Kubernetes:
   `kubectl apply -f deployment.yaml`
