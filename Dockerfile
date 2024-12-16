# Build stage
FROM node:20-alpine3.17 AS builder
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy source code and necessary directories
COPY . .
COPY .env .

# Build the application for Vue.js + Vite
RUN npm run build

# Production stage
FROM node:20-alpine3.17 AS production
RUN apk add --no-cache dumb-init
WORKDIR /app

# Create non-root user
RUN addgroup -S nodejs && adduser -S vueuser -G nodejs

# Copy only necessary files from builder
# For Vite + Vue.js, the build output is in 'dist' directory
COPY --from=builder --chown=vueuser:nodejs /app/dist ./dist
COPY --from=builder --chown=vueuser:nodejs /app/node_modules ./node_modules
COPY --chown=vueuser:nodejs package.json .
COPY --chown=vueuser:nodejs vite.config.js .
COPY --chown=vueuser:nodejs .env .

# Set environment variables
ENV NODE_ENV=production \
    VITE_PORT=8080 \
    HOST=0.0.0.0
    # Add any Vue+Vite specific environment variables here
    # VITE_API_URL=http://localhost:8000

# Switch to non-root user
USER vueuser

# Use dumb-init as PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# For Vite, use preview command to serve production build
CMD ["npm", "run", "preview", "--", "--host", "--port", "8080"]