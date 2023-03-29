# S-Communications coding challenge

## Description

Typescript monorepo coding task for Senior Fullstack position at S-Communications. The project consist on a loan calculator platform.

### Structure

The project consist on the following packages:

- [`client/web-app`](./clients/web-app/): NextJS client application. Form that takes user input to calculate a loan plan
- [`services/core`](./services/core/): NestJS server with business logic to calculate loan plan
- [`packages/data-schemas`](./packages/data-schemas): Data validation schemas for both client and server
- [`package/types`](./packages/types/): Project wide types

# Development

Install dependencies with

```
yarn install
```

Rename `.env.dev` to `.env` at `/clients/web-app` and `/services/core`

run `yarn dev` in order to start all packages on dev-mode.

# Docker setup

The project has also been dockerized to ensure proper execution on different systems. Run `docker compose up` to build the images and create the proper containers. The will be available at `http://localhost:8000`
