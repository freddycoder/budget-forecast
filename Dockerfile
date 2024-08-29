FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine3.20-slim
COPY --from=builder /app/dist /etc/nginx/html/budget-forecast
COPY nginx/.default.conf /etc/nginx/conf.d/default.conf