# Use an official Ubuntu 20.04 image as the base image
FROM ubuntu:20.04

# Set the working directory in the container
WORKDIR /app

# Install necessary dependencies without interactive prompts
RUN apt-get update && apt-get install -y \
    sudo \
    git \
    unzip \
    xz-utils \
    lib32stdc++6 \
    libglu1-mesa \
    curl \
    openjdk-11-jdk && \
    rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Create a non-root user with a home directory
RUN useradd -m -d /home/flutteruser -s /bin/bash flutteruser && usermod -aG sudo flutteruser

# Switch to the flutteruser
USER flutteruser
WORKDIR /home/flutteruser

# Install Flutter
RUN git clone https://github.com/flutter/flutter.git /home/flutteruser/flutter
ENV PATH="$PATH:/home/flutteruser/flutter/bin"

# Set Flutter home directory to avoid permission issues
ENV FLUTTER_HOME=/home/flutteruser/flutter
ENV PUB_CACHE=/home/flutteruser/.pub-cache

# Copy the Flutter app code into the container
COPY --chown=flutteruser . /app

# Change the work directory to the app
WORKDIR /app

# Accept Flutter licenses automatically
RUN yes | flutter doctor --android-licenses
RUN flutter doctor

# Expose a port (e.g., 3000)
EXPOSE 3000

# Build the Android APK
RUN flutter build apk --release

# Start the Flutter app (replace with your actual entry point)
CMD ["flutter", "run", "--release"]