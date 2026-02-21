# Use Node.js 20 alpine as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for optimal caching
COPY package*.json ./

# Install dependencies deterministically
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
