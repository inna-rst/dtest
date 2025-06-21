# Stage 1: Build stage
FROM node:18-alpine AS builder

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо всі залежності (включно з dev для збірки)
RUN npm ci

# Копіюємо весь код проекту
COPY . .

# Збираємо проект
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json для production залежностей
COPY package*.json ./

# Встановлюємо тільки production залежності
RUN npm ci --only=production && npm cache clean --force

# Копіюємо зібраний код з build stage
COPY --from=builder /app/dist ./dist

# Відкриваємо порт
EXPOSE 4001

# Запускаємо зібраний код напряму (без ts-node-dev)
CMD ["node", "dist/index.js"]