# 1. Base Image: Use the official Node.js image.
# Using a specific version is good practice for reproducibility.
FROM node:20-alpine

# 2. Set Working Directory: Define the working directory inside the container.
WORKDIR /app/frontend

# 3. Copy package.json and package-lock.json first.
# This leverages Docker's layer caching. These files don't change often,
# so this layer won't be rebuilt unless dependencies change.
COPY package*.json ./

# 4. Install Dependencies: Install all npm dependencies.
# Use --ci for production builds to ensure a clean, consistent install from package-lock.json.
RUN npm ci

# 5. Copy Application Code: Copy the rest of your Next.js application code.
COPY . .

# 6. Build the Application: Build the Next.js app for production.
RUN npm run build

# 7. Expose Port: Expose the port the Next.js app runs on.
EXPOSE 3000

# 8. Set Environment Variable for Hostname
# This is important for Next.js in a Docker container to be accessible from outside.
ENV HOSTNAME 0.0.0.0

# 9. Start Command: The command to run the application.
# This uses the 'start' script from your package.json.
CMD [ "npm", "start" ] 