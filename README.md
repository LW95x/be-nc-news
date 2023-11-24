# Northcoders News API

Hosted version: https://be-nc-news-sfsv.onrender.com 

Description

- An API that has been designed to mimic the building of a real world backend service (such as Reddit), to provide information to front end architecture.

Cloning/dependencies/seeding/testing

To clone - 'git clone https://github.com/LW95x/be-nc-news.git'

Installing dependencies - see 'package.json' for list of dev dependencies not included with cloning. You will also need to run 'npm install'.

Seeding - Not sure what to put here?

To run tests - 'npm run test-integration'


Instructions to run

- You will need to create two .env files: .env.test and .env.development. 

- Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

Minimum versions

- Node - v20.7.0
- psql - v14.9
