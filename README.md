# Action REAction: Automation Platform of Digital Life
    B-DEV-500: B5 - Application Development

## Overview

    Action REAction is a comprehensive automation platform focusing on providing a seamless interface for the integration of various digital services similar to IFTTT and/or Zapier. It consists of an application server, a web client, and a mobile client to offer various functionalities and services to users.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [API Documentation](#api-documentation)
5. [Architecture](#architecture)
6. [Project Construction](#project-construction)
7. [Timeline](#timeline)
8. [Contributing](#contributing)
9. [License](#license)

## Technology Stack

### Front-end
- **Technology**: React
- **Scope**: Provides the user interface for web clients

### Mobile
- **Technology**: React native
- **Scope**: Provides the user interface for mobile clients

### Back-end
- **Technology**: Express
- **Scope**: Handles business logic and serves web & mobile clients

### Database
- **Technology**: MongoDB
- **Scope**: Stores user data and application state

### User Management
- **Technology**: auth0
- **Scope**: Handles user registration, authentication, and management

## Getting Started

    To compile the project, use:

    shell
   docker-compose up

    For detailed instructions regarding the project setup and the API, refer to the API Documentation section.

 ## Features
    User Registration and Authentication
    Action & REAction Components
    Trigger Mechanism
    AREA Creation
    More features...
 ## API Documentation
    Detailed API documentation is provided in API_DOCS.md, outlining the available endpoints, request/response formats, and example usages.

 ## Architecture
### Mobile Client
    Platform Compatibility: Android or Windows Mobile
    Responsibility: Displaying screens and forwarding requests to the application server
 ### Web Client
    Responsibility: Displaying screens and forwarding requests to the application server
 ## Application Server
    Responsibility: Embedding the business logic of the project and offering services through a REST API
 ## Project Construction
### Docker-Compose
    Refer to the docker-compose.yml file at the root of the project for service descriptions and dependencies. Validate image integrity using:
    docker-compose up
    Ensure that the client_web and client_mobile services share a common volume and adhere to the specified port exposures and request handling.

 ## About.json
    The application server should answer the call to http://localhost:8080/about.json with specific properties, as outlined in the example provided.

 ## Timeline
    This project is divided into 3 milestones, focusing on planning, implementation, and refinement. Detailed timelines and expectations are provided for each phase.

 ## Contributing
    Verschhh, Dimerci, Luciole24, Orlo, and teaching staff