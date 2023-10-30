#!/bin/bash

# Define paths
SRC_PATH="/app/android/app/build/outputs/apk/release/app-release.apk"
DEST_PATH="/apk-output/app-release.apk"

# Ensure the destination directory exists
mkdir -p $(dirname "$DEST_PATH")

# Copy the APK
cp "$SRC_PATH" "$DEST_PATH"
