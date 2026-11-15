# ---- builder ----
# Compile the Create React App bundle. Nothing from this stage ships except
# /app/build — node, node_modules, and the source stay behind.
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY public ./public
COPY src ./src
RUN npm run build

# ---- runner ----
# Unprivileged nginx: runs as UID 101 and listens on 8080 (not 80), so the
# container never needs root. Public traffic arrives through the Cloudflare
# Tunnel (see docker-compose.yml), which reaches this as http://web:8080.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
