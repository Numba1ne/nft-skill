FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
# Default command runs the monitor; override to run other CLI commands
CMD ["npx","ts-node","src/cli.ts","monitor"]
