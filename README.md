<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

```API that allows users to create, read, update, and delete (CRUD) posts. Each post will have a title, content, author, and timestamp. You will also need to write unit and e2e tests for the API using Jest and Testcontainers. You will also need to use Docker and Docker Compose to containerize the application and the database.
```

## Installation

```bash
$ npm install
```

## Building the app

```bash
docker compose build
```

## Running the app

```bash
docker compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## enviroment variables

```bash
DB_TYPE=postgres
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB=postgres
PG_PORT=5432
PG_HOST=db

JWT_SECRET=thisisasecret
JWT_EXPIRES=3600m


DB_ENTITIES=src/*/entities/*.entity.ts
DB_SYNCRONIZE=true
DB_LOGGING=true
DB_MIGRATIONS_RUN=true
DB_MIGRATIONS_DIR=migrations

SALT_ROUNDS=10
```

## how to scale

```bash
To scale a Nest.js application, especially a user service, to handle a large number of users (10,000 to 1 million), we need to consider various aspects of the application's architecture, infrastructure, and performance. Below are some general strategies that can help in scaling a basic Nest.js app serving a user service:

1. Database Optimization:
Choose an appropriate database and optimize queries for performance.
Implement indexing on frequently queried fields.
Consider sharding or partitioning the database to distribute data across multiple servers.
2. Caching:
Implement caching mechanisms to reduce the load on the database.
Use caching for frequently accessed data or read-heavy operations.
3. Load Balancing:
Deploy multiple instances of the application behind a load balancer to distribute incoming requests.
Use tools like Nginx or HAProxy for load balancing.
4. Horizontal Scaling:
Deploy the application across multiple servers or containers.
Use container orchestration tools like Docker Swarm or Kubernetes for easy scaling.
5. Microservices Architecture:
Consider breaking down the application into microservices.
6. Optimized API Responses:
Implement pagination for API responses to avoid sending large datasets.
Use caching for API responses if applicable.
7. Connection Pooling:
Optimize database connection management using connection pooling.
Adjust the pool size based on the expected number of concurrent connections.
8. Use CDN for Static Assets:
Utilize Content Delivery Networks (CDNs) for serving static assets (images, CSS, JavaScript) to reduce server load.
9. Monitoring and Logging:
Implement monitoring tools to track application performance.
Use logging to identify and troubleshoot issues.
10. Optimize Nest.js Configuration:
Fine-tune Nest.js configuration settings for production, such as increasing the number of workers, optimizing middleware, etc.
11. Security Best Practices:
Implement security best practices to protect against common vulnerabilities.
Regularly update dependencies and libraries.
12. Auto-scaling (Cloud Providers):
If hosting on cloud platforms like AWS, Google Cloud, or Azure, leverage auto-scaling features based on metrics like CPU usage.
13. Database Replication and Sharding:
Implement database replication for read-heavy operations.
Explore sharding strategies for distributing data across multiple database servers.
14. Regular Performance Testing:
Regularly conduct performance testing to identify bottlenecks and optimize the application accordingly.
```



