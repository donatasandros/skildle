import { env } from "@/data/env/server";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  strict: true,
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    ssl: false,
  },
});
