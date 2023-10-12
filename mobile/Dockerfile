# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Copy the metro.config.js to the container
COPY metro.config.js .

# Clean the npm cache
RUN npm cache clean --force

# Install project dependencies
RUN npm install

# Install adb
RUN apt-get update && apt-get install -y android-tools-adb

# Copy the keypress script to the container
COPY send_key.sh .

# Make the script executable
RUN chmod +x send_key.sh

# Expose the Metro port
EXPOSE 8081

# Start Metro in watch mode and send 'a' keypress after a delay
CMD ["sh", "-c", "npx react-native start & sleep 10 && ./send_key.sh"]
