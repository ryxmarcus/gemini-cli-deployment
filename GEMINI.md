# Project Knowledge Base: Gemini CLI Deployment

This repository contains the configuration and scripts required to deploy the Gemini CLI in a Kubernetes-ready Linux environment.

## 🏗️ Architecture & Infrastructure
- **Runtime**: Node.js v20+
- **Verified Stack**: 
  - Node.js: `v20.20.2`
  - npm: `10.8.2`
  - Gemini CLI: `0.37.2`
- **Containerization**: Docker (see `Dockerfile`)
- **Orchestration**: Kubernetes (see `deployment.yaml`)
- **OS Target**: Linux (Ubuntu/Debian)

## 🛠️ Key Deployment Commands

### Local/VM Installation
Run the deployment script to install Node.js and Gemini CLI:
```bash
./deploy.sh
```

### Verification
To verify the local installation and build:
1. **Check CLI**: `gemini --version`
2. **Build Test**: `docker build -t gemini-cli:local .`
3. **K8s Dry Run**: `kubectl apply -f deployment.yaml --dry-run=client` (Requires kubectl)

### Kubernetes Deployment
1. **Build Image**: `docker build -t gemini-cli:latest .`
2. **Secrets**: Create a secret for the API key:
   ```bash
   kubectl create secret generic gemini-secrets --from-literal=api-key=YOUR_API_KEY
   ```
3. **Deploy**: `kubectl apply -f deployment.yaml`

## 🔑 Environment Variables
- `GEMINI_API_KEY`: Required for Gemini CLI to function. Managed via Kubernetes secrets in production.

## 📚 Expanding Knowledge
To add more context to this knowledge base without modifying this file, you can:
1. Create new Markdown files in the repository (e.g., `docs/architecture.md`).
2. Import them here using the `@path/to/file.md` syntax.
3. Use the `/memory add <fact>` command to save persistent global preferences.

---
*This file was automatically initialized to provide persistent context for Gemini CLI sessions.*
