# Use the androidsdk/android-30 base image
FROM androidsdk/android-30

# Set environment variables
ENV ADB_IP=host.docker.internal

# Set the working directory in the container
WORKDIR /app

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your project files to the container
COPY . .

# Build the Android APK
RUN cd android && ./gradlew assembleRelease

# Expose the port for debugging (if needed)
EXPOSE 8081

# Launch the APK (This part is experimental and may not work in all environments)
CMD ["npx", "react-native", "run-android"]
