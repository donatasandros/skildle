import { env } from "@/data/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle({
  schema,
  connection: {
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
  },
});
