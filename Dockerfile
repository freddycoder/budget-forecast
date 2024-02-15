FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM nginx:1.25.4-alpine
COPY --from=builder /app/dist /etc/nginx/html/budget-forecast
COPY nginx/.default.conf /etc/nginx/conf.d/default.conf