#!/bin/bash
set -e

echo "🚀 Starting Kubernetes Deployment for Gemini CLI..."

# Apply configurations
echo "Applying Deployment and Service..."
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Restart the rollout to force pull 'latest' image
echo "Restarting deployment to pull latest image..."
kubectl rollout restart deployment gemini-cli

# Wait for completion
echo "Waiting for rollout to finish..."
kubectl rollout status deployment gemini-cli

echo "✅ Deployment updated successfully!"
echo "Check pods status:"
kubectl get pods
echo "Check service endpoints:"
kubectl get endpoints gemini-cli-svc
