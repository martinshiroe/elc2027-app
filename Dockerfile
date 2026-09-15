FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY server.js githubStore.js supabaseStore.js ./
COPY public ./public

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "server.js"]
