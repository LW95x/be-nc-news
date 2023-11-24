# Northcoders News API

## Hosted version

https://be-nc-news-sfsv.onrender.com/api 

## Description

- An API that has been designed to mimic the building of a real world backend service (such as Reddit), to provide information to front end architecture.

## Cloning, Dependencies, Seeding, and Testing Instructions

- Cloning Instructions: ```git clone https://github.com/LW95x/be-nc-news.git```

- Installing dependencies: You will need to run ```npm install```

- Seeding Instructions: You will need to do ```npm run seed```

- Testing Instructions: You will need to do ```npm run test-integration```

## Environment Setup Instructions

- You will need to create two .env files: ```.env.test``` and ```.env.development```

- Into each, add ```PGDATABASE=```, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

## Minimum versions

- Node - v20.7.0
- psql - v14.9
