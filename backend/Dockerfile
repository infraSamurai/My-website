# --- 1. Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app/backend

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# --- 2. Production Stage ---
FROM node:20-alpine

WORKDIR /app/backend

# Install production-only dependencies and copy from builder
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend .

# Install LibreOffice for file conversion
RUN apk add --no-cache libreoffice

# Expose the application port
EXPOSE 5000

# The command to run the application in production
CMD [ "npm", "start" ] 