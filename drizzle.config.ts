import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/app/lib/db/schema.ts',
    out: './src/app/lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
   url: process.env.DB_URL as string
  },
  verbose:true,
  strict:true,
});


