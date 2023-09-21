# Action REAction Web Client

The Action REAction Web Client serves as the user interface for the Action REAction software suite.
This platform is designed for creating custom automations, similar to IFTTT and Zapier, allowing users to render interfaces and facilitate interactions through a REST API. The web client communicates effectively with the application server, enhancing user experience by making operations seamless and intuitive.

## 🚀 Quick Start

### Prerequisites
Ensure you have the following software installed on your laptop before proceeding:
- [Node.js & npm](https://nodejs.org/en/download/)
- [Docker & Docker Compose](https://www.docker.com/get-started)

### Installation & Setup
1. **Clone the Repository**
   git clone git@github.com:EpitechPromo2026/B-DEV-500-BER-5-1-area-maxime.lambert.git

### Navigate to the Project Directory
    cd web

### Install Dependencies
    npm install

### Run with npm
    npm start

    Now, navigate to http://localhost:8081_ in your web browser to access the web client

### Run with Docker
    docker-compose up && docker-compose build

    Access the web client by navigating to http://localhost:8081 in your web browser.

## 🎨 Features
    User Authentication: Securely register and authenticate users.
    Service Subscription: Subscribe to and manage various services.
    Action & REAction Composition: Create and manage custom automations.
    Trigger Activation: Monitor and activate triggers for actions and reactions.

## 📦 Docker Deployment
    Build and Run the Docker Container

    docker-compose up --build -d client_web

### Stop and Remove the Container
    docker-compose down

## 📘 API Documentation
    For detailed information on available endpoints, request/response formats, and usage examples, please refer to the included API documentation.

## 📬 Contact
    Should you have any inquiries, issues, or suggestions for enhancements, feel free to open an issue in the project repository or contact the development team directly.

## 📚 Additional Information
    For a more comprehensive understanding of the Action REAction software suite and its components, refer to the main documentation and README files located in the respective directories of the project repository.