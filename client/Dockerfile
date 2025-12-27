# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- Stage 2: Serve ----------
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA routing support (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 inside container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
