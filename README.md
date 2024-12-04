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
