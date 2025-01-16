<p align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<p align="center">
  <strong>Example API</strong> with <strong>JWT Authentication</strong> and <strong>Custom Authorization</strong> in NestJS
</p>

## Description

This project is an example API developed using the [NestJS](https://nestjs.com/) framework. It implements **JSON Web Token (JWT)** authentication and a **custom authorization** system.

The project structure is organized into modules, following a clean and scalable architecture:

- **`src/common`**: Contains shared components such as filters, interceptors, database configuration, and global constants.
- **`src/resources`**: Groups the core application resources:
  - `tasks`: Task management.
  - `users`: User management.
  - `auth`: Authentication handling.
  - `permission`: Permission control.
  - `logs`: Event logging.

## Key Features

- **NestJS**: A progressive framework for building efficient and scalable server-side applications.
- **JWT Authentication**: Secure session management using JSON Web Tokens.
- **Custom Authorization**: Based on resource-specific permissions.
- **Prisma ORM**: Data management using a relational model.
- **Dockerized Database**: A `docker-compose.yml` file for generating the database image.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ingluispalacio/Api_with_NEST.git
   cd Api_with_NEST
2. Install dependencies
   ```bash
    npm install
3. Set up environment variables: Create a .env file in the root of the project with the following variables:
    DATABASE_URL=postgresql://user:password@localhost:5432/database
    PORT=3000
    SECRET_KEY=your_jwt_secret_key
    EXPIRES_IN=20m
4. Generate the database using Docker:Run the docker-compose.yml file to start your database container:
    ```bash
    docker-compose up -d
5. Run Prisma Migrations:Sync the database schema with Prisma:
   npx prisma migrate dev
6. Run the Seed Script:To populate your database with initial data, execute the seed script:
   npm run prisma:seed

## Usage

1. Running the Project: Development mode
    npm run start:dev

2. Testing the API: Once the server is running, you can test the API at:
    http://localhost:YOURPORT/swagger
  



