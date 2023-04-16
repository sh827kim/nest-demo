
## Description

This is a simple application that uses NestJS and TypeORM to create a REST API for a simple board app.

This projec uses PostgreSQL as the database.

## Installation

```bash
$ pnpm install
```

## Running the app

Before running the app, you need to create a `.env` file in the root directory of the project.

.env file should contain the following variables:
```dotenv
DATABASE_HOST=your-database-host
DATABASE_PORT=your-database-port
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-database-username
DATABASE_PASSWORD=your-database-password
JWT_SECRET=your-jwt-secret
```

Then, you can run the app with the following commands:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
