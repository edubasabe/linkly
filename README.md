# Fullstack Assessment

## Project Overview

This is a fullstack application built with TypeScript, using a monorepo structure with separate frontend and backend applications.

## Requirements

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  - Make sure Docker Desktop is running before starting the project
- [Git](https://git-scm.com/)
- PostgreSQL client (optional, for direct database access)

## Project Structure

```
.
├── apps
│   ├── frontend    # React TypeScript application
│   └── backend     # Node.js TypeScript API
└── package.json    # Root package.json for workspace management
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/edubasabe/linkly/tree/main
cd linkly
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the database:

```bash
pnpm docker:up
```

4. Set up the environment variables:

   - Navigate to `apps/backend`
   - Copy `.env.example` to `.env`
   - The default configuration should work with the Docker setup

5. Run database migrations:

```bash
pnpm prisma:migrate
```

## Run the app locally

1. Build the app:

```bash
pnpm run build
```

2. Run the app:

```bash
pnpm run start
```

## Contact

David Basabe - [@edubasabe](https://github.com/edubasabe)

Project Link: [https://github.com/edubasabe/linkly](https://github.com/edubasabe/linkly)
