#!/bin/bash

# Create backend/.env if it doesn't exist
if [ ! -f backend/.env ]; then
  echo "Creating backend/.env from template..."
  cp backend/.env.example backend/.env

  # Generate a random JWT secret
  JWT_SECRET=$(openssl rand -base64 32)
  
  # Update JWT secret in .env
  sed -i '' "s/your_jwt_secret_key/$JWT_SECRET/" backend/.env
  
  echo "Generated new JWT secret in backend/.env"
fi

# Build and start containers
echo "Starting Docker containers..."
docker-compose up --build

# Note: After the containers are up, you can access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5001
# - Database: localhost:5432 