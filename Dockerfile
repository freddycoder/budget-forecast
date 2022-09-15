FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1-alpine
COPY --from=builder /app/build /etc/nginx/html/budget-forecast
COPY nginx/.default.conf /etc/nginx/conf.d/default.conf