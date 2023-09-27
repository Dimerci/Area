
FROM reactnativecommunity/react-native-android:latest

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

CMD echo "Building Android APK..." && echo "DONE!"
