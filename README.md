# Prisma Postgres Example: Queries, Connection Pooling & Caching

This project contains basic API for RATSBAND.COM. and utilizes Prisma [Prisma Postgres](https://prisma.io/data-platform/postgres):

- Schema migrations and queries (via [Prisma ORM](https://www.prisma.io/orm))
- Connection pooling and caching (via [Prisma Accelerate](https://prisma.io/data-platform/accelerate))

## Getting started

### 1. Set up a Prisma Postgres database in Prisma Data Platform

Follow these steps to create your Prisma Postgres database:

1. Log in to [Prisma Data Platform](https://console.prisma.io/).
1. In a [workspace](https://www.prisma.io/docs/platform/about#workspace) of your choice, click the **New project** button.
1. Type a name for your project in the **Name** field, e.g. **hello-ppg**.
1. In the **Prisma Postgres** section, click the **Get started** button.
1. In the **Region** dropdown, select the region that's closest to your current location, e.g. **US East (N. Virginia)**.
1. Click the **Create project** button.

At this point, you'll be redirected to the **Database** page where you will need to wait a few seconds while the status of your database changes from **`PROVISIONING`**, to **`ACTIVATING`** to **`CONNECTED`**.

Once the green **`CONNECTED`** label appears, your database is ready to use!

Then, find your database credentials in the **Set up database access** section, copy the `DATABASE_URL` environment variable and store it securely.

```bash no-copy
DATABASE_URL=<your-database-url>
```

> These `DATABASE_URL` environment variable will be required in the next steps.

Once that setup process has finished, move to the next step.

### 2. Download example and install dependencies

Copy the `try-prisma` command that', paste it into your terminal, and execute it:

```terminal
npx try-prisma@latest \
  --template databases/prisma-postgres \
  --name hello-prisma \
  --install npm
```

<!-- For reference, this is what the command looks like (note that the `__YOUR_DATABASE_CONNECTION_STRING__` placeholder must be replaced with _your_ actual database connection string):

```
npx try-prisma@latest
  --template databases/prisma-postgres
  --connection-string __YOUR_DATABASE_CONNECTION_STRING__
  --name hello-prisma
  --install npm
```

Your connection string that should replace the `__YOUR_DATABASE_CONNECTION_STRING__` placeholder looks similar to this: `prisma+postgres://accelerate.prisma-data.net/?api_key=ey...`
-->

Navigate into the project directory and (if you haven't done so via the CLI wizard) install dependencies:

```terminal
cd hello-prisma
npm install
```

### 3. Set database connection

The connection to your database is configured via environment variables in a `.env` file.

First, rename the existing `.env.example` file to just `.env`:

```terminal
mv .env.example .env
```

Then, find your database credentials in the **Set up database access** section, copy the `DATABASE_URL` environment variable and paste them into the `.env` file.

For reference, the file should now look similar to this:

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=ey...."
```

### 4. Create database tables (with a schema migration)

Next, you need to create the tables in your database. You can do this by creating and executing a schema migration with the following command of the Prisma CLI:

```terminal
npx prisma migrate dev --name init
```

This will map the `User` and `Post` models that are defined in your [Prisma schema](./prisma/schema.prisma) to your database. You can also review the SQL migration that was executed and created the tables in the newly created `prisma/migrations` directory.

### 5. Execute queries with Prisma ORM

The [`src/queries.ts`](./src/queries.ts) script contains a number of CRUD queries that will write and read data in your database. You can execute it by running the following command in your terminal:

```terminal
npm run queries
```

Once the script has completed, you can inspect the logs in your terminal or use Prisma Studio to explore what records have been created in the database:

```terminal
npx prisma studio
```

### 6. Explore caching with Prisma Accelerate

The [`src/caching.ts`](./src/caching.ts) script contains a sample query that uses [Stale-While-Revalidate](https://www.prisma.io/docs/accelerate/caching#stale-while-revalidate-swr) (SWR) and [Time-To-Live](https://www.prisma.io/docs/accelerate/caching#time-to-live-ttl) (TTL) to cache a database query using Prisma Accelerate. You can execute it as follows:

```terminal
npm run caching
```

Take note of the time that it took to execute the query, e.g.:

```terminal
The query took 2009.2467149999998ms.
```

Now, run the script again:

```terminal
npm run caching
```

You'll notice that the time the query took will be a lot shorter this time, e.g.:

```terminal
The query took 300.5655280000001ms.
```

### Seeding the Songs table

To populate the `Songs` table with the sample data from `src/songs.json`, run the included seed script. Prisma 6 recommends Node >= 18; the seed script polyfills `fetch` when running on older Node versions but using Node 18+ is preferred.

Quick steps:

1. Install deps and generate the Prisma client (if you haven't already):

```bash
npm install
npx prisma generate
```

2. Ensure your `DATABASE_URL` is set in `.env`.

3. Run the seed script:

```bash
npm run seed
```

The script will log how many songs were inserted. If you see engine/Node warnings, switch to Node 18+ for best compatibility.

Note about Node version and running the server

This project and Prisma 6+ expect Node >= 18. The repository includes a small preflight check that will prevent the `start` script from running on older Node versions.

- To start the server normally (Node >= 18):

```bash
npm run start
```

- To bypass the Node check for local development on older Node versions (not recommended for production):

```bash
SKIP_NODE_CHECK=1 npm run start
```

Prefer upgrading to Node 18+ to avoid runtime warnings and to match Prisma's supported environment.

Example API usage

Add songs via curl (POST an array of songs):

```bash
curl -X POST http://localhost:4000/songs \
  -H "Content-Type: application/json" \
  -d '[{"title":"New Song","artist":"Some Artist"}]'
```

Seed the songs via the API (idempotent):

```bash
curl -X POST http://localhost:4000/songs/seed
```


## Next steps

Running locally (dev)

If you want a one-shot dev workflow that starts the server and then runs the simple API test once the server is up, use:

```bash
npm run dev
```

This uses `concurrently` and `wait-on` to start the server (no preflight) and then run `npm run api-test` after the HTTP endpoint is ready.


- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).

CI/CD: Automatic Netlify deploy from GitHub

This repo includes a GitHub Actions workflow that will build and deploy the site to Netlify whenever you push to `main`.

Required GitHub repository secrets (set these in the repository Settings -> Secrets):

- `NETLIFY_AUTH_TOKEN` — a Netlify personal access token (create one at https://app.netlify.com/user/applications#personal-access-tokens)
- `NETLIFY_SITE_ID` — the Netlify site id for your target site (available on your site settings > Site information)
- `DATABASE_URL` — the database connection string for Prisma (Postgres). This will be set on the Netlify site by the workflow.

How it works:

1. Push to `main`.
2. GitHub Actions installs deps and runs `npm run build` (compiles TypeScript to `dist/`).
3. The workflow sets `DATABASE_URL` on the Netlify site using `netlify env:set`.
4. The workflow runs `npx netlify deploy --prod` and publishes `public/` and functions in `dist/netlify/functions`.

Make sure the `DATABASE_URL` you provide is accessible from Netlify (e.g., a managed Postgres instance or a Prisma Data Platform connection string).

Manual migration workflow

If you prefer to run migrations manually (with explicit approval), there's a dedicated GitHub Actions workflow: **Run Prisma Migrations (manual)**.

How to trigger it:

- From the GitHub UI: Go to the repository → Actions → "Run Prisma Migrations (manual)" → Run workflow. Optionally set the `ref` input (branch or tag).

- From the command line (using the GitHub CLI):

```bash
gh workflow run run-migrations.yml --repo OWNER/REPO --ref main
```

The workflow requires the `DATABASE_URL` secret to be set in the repository. This workflow performs `npx prisma migrate deploy` against the database you configured in `DATABASE_URL`.
