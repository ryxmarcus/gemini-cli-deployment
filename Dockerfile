FROM node:20-slim
WORKDIR /app
RUN npm install -g @google/gemini-cli
# Set dummy key for build or use build-args
ENV GEMINI_API_KEY=""
ENTRYPOINT ["gemini"]
