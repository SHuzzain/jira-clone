import { ZodError, z } from "zod";

const EnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().default("http://localhost:3000"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),

  NODE_ENV: z.enum(["test", "production", "development"]),

  PORT: z.string().default("3000"),
});

let env: z.infer<typeof EnvSchema>;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error("❌ invalid env:");
  console.error(error.flatten());
  throw new Error("Invalid environment configuration");
}

export default env;
