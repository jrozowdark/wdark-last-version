# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies with npm install to regenerate native bindings for Linux
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install serve globally for production
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3002

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3002

# Start the serve server
CMD ["serve", "-s", "dist", "-l", "3002"]
