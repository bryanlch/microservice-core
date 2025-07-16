FROM node:lts AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:lts AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./
RUN npm install --only=production --legacy-peer-deps
RUN npm install pm2 -g
CMD ["pm2-runtime", "dist/main.js"]
