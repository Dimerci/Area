# Start from the react-native Android base image
FROM reactnativecommunity/react-native-android AS builder

# Set up environment variables
ENV ANDROID_HOME /opt/android-sdk-linux
ENV PATH $PATH:$ANDROID_HOME/emulator
ENV PATH $PATH:$ANDROID_HOME/tools
ENV PATH $PATH:$ANDROID_HOME/tools/bin
ENV PATH $PATH:$ANDROID_HOME/platform-tools

# Accept Android SDK licenses
RUN yes | sdkmanager --licenses

# Install Node.js
RUN apt-get update && apt-get install -y nodejs npm && apt-get clean

# Set the working directory inside the container
WORKDIR /app

# Copy your app's source code into the container
COPY . .

# Install global and local dependencies
RUN npm install -g react-native-cli
RUN npm install

# Ensure the directory for the bundle output exists
RUN mkdir -p android/app/src/main/assets/

# Bundle the React Native app
RUN react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# Clean and build the APK
RUN ./android/gradlew -p ./android/ clean
RUN rm -rf ./android/app/src/main/res/drawable-*
RUN rm -rf ./android/app/src/main/res/raw
RUN ./android/gradlew -p ./android/ assembleRelease --continue

# The output APK will be in android/app/build/outputs/apk/debug/app-debug.apk
