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

## 🔐 Secret Rotation

To maintain security, rotate your credentials periodically. **Never commit raw tokens or API keys to the repository.**

### Rotating Gemini API Key
1. Generate a new key in the Google AI Studio.
2. Update the Kubernetes secret:
   ```bash
   kubectl create secret generic gemini-secrets --from-literal=api-key=NEW_API_KEY --dry-run=client -o yaml | kubectl apply -f -
   ```
3. Restart the deployment to pick up the new secret:
   ```bash
   kubectl rollout restart deployment gemini-cli
   ```

### Rotating GitHub Personal Access Token (PAT)
1. Revoke the old token in your GitHub Settings.
2. Generate a new PAT with the required scopes.
3. Use the new token for Git operations via environment variables:
   ```bash
   export GITHUB_TOKEN="your-new-token"
   git push https://x-access-token:${GITHUB_TOKEN}@github.com/ryxmarcus/gemini-cli-deployment.git master
   ```

