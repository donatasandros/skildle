import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_USER: z.string().min(1),
    DB_PASS: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_HOST: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
