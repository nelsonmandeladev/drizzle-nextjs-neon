# Drizzle Next.js Neon

A modern full-stack web application boilerplate built with [Next.js](https://nextjs.org/), [Drizzle ORM](https://orm.drizzle.team/), and [Neon](https://neon.tech/) (serverless Postgres).  
This project provides a robust starting point for building scalable, type-safe, and cloud-ready apps with an integrated database and ORM.

## Features

- **Next.js** — Powerful React framework for SSR, SSG, and API routes.
- **Drizzle ORM** — Type-safe database migrations and queries for Postgres.
- **Neon** — Serverless Postgres with branching, perfect for modern cloud deployments.
- **TypeScript** — End-to-end type safety.
- **Easy Deployment** — Ready to deploy to Vercel or any Node.js environment.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nelsonmandeladev/drizzle-nextjs-neon.git
cd drizzle-nextjs-neon
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and set your Neon Postgres connection string:

```
DATABASE_URL=postgres://<username>:<password>@<host>/<database>
```

If you want to use Unsplash images in seeding, add:

```
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Adjust any other environment variables as needed.

### 4. Run Database Migrations

```bash
npm run db:generate
```
```bash
npm run db:migrate
```
```bash
npm run db:push
```

*(Assuming you have a migration script set up for Drizzle ORM)*

### 5. Seeding the Database

#### Seed Initial Data

To populate your database with sample users and posts:

```bash
npm run db:seed
```

#### (Optional) Update Seeded Data

To enhance seeded data with avatar images and Unsplash post images:

```bash
npm run db:update-seed
```

*Note:* For Unsplash integration, ensure you have set `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` in your `.env.local`.

### 6. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository** and create your branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. **Make your changes** with clear commit messages.
3. **Test** your feature or fix.
4. **Push to your fork** and submit a pull request with a clear description of your changes.
5. The maintainers will review your PR. Please respond to feedback and update as needed.

### Guidelines

- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- Ensure your code passes linting and all tests.
- If adding a new feature, consider adding or updating documentation.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- [Neon Docs](https://neon.tech/docs)
- [Deploy on Vercel](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app)

---

## License

This project is licensed under the MIT License.