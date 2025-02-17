/* eslint-disable n/no-process-env */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["test", "production", "development"]),
    PORT: z.string(),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
    NEXT_APPWRITE_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    NEXT_PUBLIC_APPWRITE_PROJECT: z.string(),
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  },
  emptyStringAsUndefined: true,

  runtimeEnv: {
    ...process.env,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  } as never,

  onValidationError: (error) => {
    console.error("❌ Invalid environment variables:", error);
    throw new Error("Invalid environment configuration");
  },
});

console.log({ env });
