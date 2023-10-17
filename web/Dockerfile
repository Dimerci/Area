# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose a port (e.g., 3000) that the Express app will listen on
EXPOSE 8081

# Define the command to start the React app
CMD ["npm", "start"]