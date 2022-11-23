# Storefront Backend Project

**_Table of Contents_**

- [Storefront Backend Project](#storefront-backend-project)
  - [Getting Started](#getting-started)
    - [Setup environment](#setup-environment)
  - [Running the application](#running-the-application)
  - [Running the unit tests](#running-the-unit-tests)
  - [Built With](#built-with)
  - [Endpoints](#endpoints)
  - [Database Schema](#database-schema)

A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Setup environment

First, create a `.env` file with all the required environment variables:

# .env

NODE_ENV=development
PORT=3000

# Set your database connection information here

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=storefront_dev
DB_DATABASE_TEST=storefront_test
DB_USER=AhmedAlaa
DB_PASS=ahmed

# user

PEPPER='this is my secret pepper'
SALT_ROUNDS=10
TOKEN_SECRET=your-'this is my secret token'

````

Next, start the Postgres server :

Now, check if Postgres has the database `storefront_dev`, if not create it:



Next, you need to run the database migrations:

```bash
migrations up
```

## Running the application


Use the following command to run the application in using node:

```bash
npm run dev
```

The application will run on <http://localhost:3000/>.

## Running the unit tests

Use the following command to run the unit tests:

```bash
npm run test
```

## Built With

- [NodeJS](https://nodejs.org/) - The JavaScript runtime
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
- [Express](https://expressjs.com) - The web framework
- [TypeScript](https://www.typescriptlang.org/) - Types JS extension
- [Jasmine](https://jasmine.github.io/) - The unit testing framework


## Endpoints

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file

## Database Schema

- See [REQUIREMENTS.md](./REQUIREMENTS.md) file
````
