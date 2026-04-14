# Project Knowledge Base: Gemini CLI Deployment

This repository contains the configuration and scripts required to deploy the Gemini CLI in a Kubernetes-ready Linux environment.

## 🏗️ Architecture & Infrastructure
- **Runtime**: Node.js v20+
- **Web Server**: Express.js wrapper listening on port `8080`
  - Endpoints: `POST /prompt`, `GET /health`, `GET /`
- **Verified Stack**: 
  - Node.js: `v20.20.2`
  - npm: `10.8.2`
  - Gemini CLI: `0.37.2`
- **Containerization**: Docker (see `Dockerfile`)
- **Orchestration**: Kubernetes (see `deployment.yaml`, `service.yaml`)
- **OS Target**: Linux (Ubuntu/Debian)

## 🛠️ Key Deployment Commands

### Local/VM Installation
Run the deployment script to install Node.js and Gemini CLI:
```bash
./deploy.sh
```

### Kubernetes Automated Deployment (Recommended)
Use the automated script to apply the deployment, service, and restart the rollout:
```bash
./k8s-deploy.sh
```

### Verification
To verify the local installation and build:
1. **Check CLI**: `gemini --version`
2. **Build Test**: `docker build -t gemini-cli:latest .`
3. **Local Server Test**: `docker run -p 8080:8080 gemini-cli:latest` and visit `http://localhost:8080`

### REST API Examples (Codespaces)
When running in GitHub Codespaces, you can interact with the server using the forwarded port:
```bash
# Example POST request to /prompt
curl -X POST https://silver-invention-xjrwrr4694jh9g67-8080.app.github.dev/prompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Tell me a joke about AI."}'
```

### Manual Kubernetes Deployment
1. **Build Image**: `docker build -t gemini-cli:latest .`
2. **Secrets**: Create a secret for the API key:
   ```bash
   kubectl create secret generic gemini-secrets --from-literal=api-key=YOUR_API_KEY
   ```
3. **Deploy**: `kubectl apply -f deployment.yaml`

## 🔑 Environment Variables & Secrets
- `GEMINI_API_KEY`: Required for Gemini CLI to function. Managed via Kubernetes secrets in production.
- `GITHUB_TOKEN` (or `PAT`): Used for authenticated Git operations. Saved in Repository Secrets for automation.

## 📚 Expanding Knowledge
To add more context to this knowledge base without modifying this file, you can:
1. Create new Markdown files in the repository (e.g., `docs/architecture.md`).
2. Import them here using the `@path/to/file.md` syntax.
3. Use the `/memory add <fact>` command to save persistent global preferences.

---
*This file was automatically initialized to provide persistent context for Gemini CLI sessions.*
