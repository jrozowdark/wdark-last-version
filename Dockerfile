# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (npm rebuild is called in the build script)
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install serve for production
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port 3002
EXPOSE 3002

# Start the serve server on all interfaces
CMD ["serve", "-s", "dist", "-l", "3002", "-L"]
