
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD ["node", "-e", "require('http').get('http://127.0.0.1:3000/health', (res) => { res.resume(); process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1))"]

CMD ["node", "server.js"]