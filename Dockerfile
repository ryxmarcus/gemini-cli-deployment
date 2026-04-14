FROM node:20-slim
WORKDIR /app
RUN npm install -g @google/gemini-cli
# Set dummy key for build or use build-args
ENV GEMINI_API_KEY=""

# Install wrapper dependencies
COPY package.json .
RUN npm install

# Copy wrapper source
COPY server.js .

EXPOSE 8080

CMD ["node", "server.js"]
