# 1. Base Image: Use the official Node.js image.
FROM node:20-alpine

# 2. Set Working Directory
WORKDIR /app/backend

# 3. Copy package.json and package-lock.json
COPY package*.json ./

# 4. Install Dependencies
RUN npm install

# 5. Copy Application Code
COPY . .

# 6. Expose Port
EXPOSE 5000

# 7. Start Command for Development
# Uses nodemon to automatically restart the server on file changes.
CMD [ "npm", "run", "dev" ] 