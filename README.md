This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Run the project
- docker compose up -d

## To Run from docker container ecommerce-nextjs
docker exec -it ecommerce-nextjs sh (or type: npm run gnd -> shortcut script in package.json)
- npx prisma studio

after a schema update:
- npx prisma generate
- npx prisma db push

## Commands
- Reset db: npx prisma migrate reset
- Generate prisma client (after schema update): npx prisma generate
- Push everything again (after a reset or schema update): npx prisma db push
- Apply migrations: npx prisma migrate dev --name init
- Monitor db data: npx prisma studio
- Lancer stripe webhook pour tester: stripe listen --forward-to localhost:3001/api/webhook
- Stripe tester payment success: stripe trigger payment_intent.succeeded

- docker compose down --volumes
- docker compose build

## Memo setting up project
- Create next app
- install shadcn-ui (framework for tailwind): careful, each component (for instead Form needs to be installed from a command, see shadcn doc)
- use clerk for managing authentification: npm install @clerk/nextjs
- install prisma and prisma client for db
- run a mysql db and the nextjs app from docker compose
- create cloudinary account + install next cloudinary package: for uploading images (account used is my default github)
configure cloudinary website: settings -> upload -> add upload preset -> make sure signin mode is UNSIGEND
- stripe + stripe CLI: payment + webhooks
Forms: using react hook form, zod for type validation
Icons: lucide-react

## Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
