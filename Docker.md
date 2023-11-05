# Docker Compose Documentation

## Overview

This document outlines the configuration details for the Docker Compose setup of the Area project.

## Prerequisites

Make sure you have Docker and Docker Compose installed on your system. If not, follow the installation instructions provided at [Docker's official website](https://www.docker.com/get-started).

## Usage

To deploy the services defined in this Docker Compose configuration, follow these steps:

1. Clone the repository:

    ```
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```
    cd <project_directory>
    ```

3. Run the following command to start the services:

    ```
    docker-compose up
    ```

4. To stop the services, use:

    ```
    docker-compose down
    ```

## Configuration

The Docker Compose configuration file is structured as follows:

```yaml
version: '3'
services:
  web:
    build:
      context: ./web
    ports:
      - "8081:8081" 

  express-backend:
    build:
      context: ./backend
    ports:
      - "8080:8080" 

  mobile:
    build:
      context: ./mobile
    image: mobile
    ports:
      - "8082:8082"

  apksaver:
    image: mobile
    volumes:
      - ./apk-output:/apk-output
    command: /bin/sh -c "cp /app/app-release.apk /apk-output/"

```