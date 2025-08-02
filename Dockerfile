# Use Node.js base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Install globally to expose the CLI
RUN npm install -g .

# Default command: show help if no args
ENTRYPOINT ["task-cli"]
CMD ["help"]
