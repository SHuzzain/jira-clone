FROM oven/bun:alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.local .env.production
RUN bun run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Create the nextjs user and group
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Ensure the nextjs user owns the necessary directories
RUN mkdir .next
RUN chown -R nextjs:nodejs /app

# Copy the necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port
EXPOSE 3000

# Set application runtime environment
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["bun", "run", "server.js"]
