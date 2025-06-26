# --- 1. Build Stage ---
# This stage installs dependencies and builds the Next.js application.
FROM node:20-alpine AS builder

WORKDIR /app/frontend

# Copy package files and install all dependencies (including devDependencies for build)
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# --- 2. Production Stage ---
# This stage creates the final, lean image for production.
FROM node:20-alpine

WORKDIR /app/frontend

# Set the environment to production
ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0

# Copy only the necessary files from the builder stage
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# The command to run the application
CMD ["npm", "start"] 