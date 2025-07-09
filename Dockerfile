# Dockerfile para NestJS + RabbitMQ + TypeORM usando npm y Node LTS
FROM node:lts AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# --- Producción ---
FROM node:lts AS production
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

RUN npm install --only=production --legacy-peer-deps

EXPOSE 3033

CMD ["node", "dist/main.js"]
