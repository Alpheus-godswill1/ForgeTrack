FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm install -g .
# Default command: show help if no args
ENTRYPOINT ["task-cli"]
CMD ["help"]
