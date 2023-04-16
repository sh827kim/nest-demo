
## Description

This is a simple application that uses NestJS and TypeORM to create a REST API for a simple board app.

This projec uses PostgreSQL as the database.

## Installation

```bash
$ pnpm install
```

## Running the app

Before running the app, you need to create a `.env` file in the root directory of the project.

.yaml file should contain the following variables:
(You can use the default.yaml file in config folder as a reference)
```dotenv
server:
  port: 3000
db:
  type: 'your-db-type'
  host: 'your-host'
  port: your-port
  username: 'your-username'
  password: 'your-password'
  database: 'your-database'
  synchronize: your-synchronize (true or false)
jwt:
  expiresIn: your-expired-time
  secret: 'your-secret'
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
