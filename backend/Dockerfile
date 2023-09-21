# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose a port (e.g., 3000) that the Express app will listen on
EXPOSE 8080

# Start the Express backend using ts-node
CMD ["npx", "ts-node", "src/server.ts"]
