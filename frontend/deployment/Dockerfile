# Stage 1: Build stage
FROM node:20-alpine AS build

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json для кешування залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm ci

# Копіюємо весь код проекту
COPY . .

# Збираємо проект для продакшну
RUN npm run build

# Stage 2: Production stage з nginx
FROM nginx:1.22.1

# Копіюємо зібрані файли з build stage в nginx директорію
COPY --from=build /app/build /usr/share/nginx/html

# Копіюємо кастомну конфігурацію nginx (опціонально)
# COPY nginx.conf /etc/nginx/nginx.conf

# Відкриваємо порт 80
EXPOSE 80

# Nginx запускається автоматично з дефолтними параметрами
CMD ["nginx", "-g", "daemon off;"]