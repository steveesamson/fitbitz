# fitbitz

A simple app showcasing Apollo graphQL Server and Client, Express and Knex with PostgreSQL.

## Important

There is a **`.env`** file in the root of application.
Should you decide to change the configuration in the file make sure you update the **`scripts\db.sql`** script otherwise, the application would not be able to connect to your database.

## Runing the unit tests

```cli

    yarn test

    or

    npm run test
```

## Create Database objects

- Change in the scripts directory
- Using **`psql`**, and still in the scripts directory,`connet` to a `postgres` instance. Once connected to you `database`, create database objects from the db.sql in the folder like the following:

- **`\i db.sql`**

## Build Application

From the application root folder, run

```cli
    yarn build

    or

    npm run build
```

The above will generate a **`dist`** folder. Inside the folder is a production ready app including the frontend and the backend.

## Running the build application

Change into the generated **`dist`** folder and type the following:

```cli

    node app.server.js

```

Alternatively, you could use:

```cli
    yarn start

    or

    npm start
```

The above would build and run the application.

Thank you.
