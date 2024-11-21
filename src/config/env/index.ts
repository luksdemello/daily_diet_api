import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string().default("docker"),
  DB_NAME: z.string().default("daily_diet"),
  DB_PASSWORD: z.string().default("docker"),
  PORT: z.coerce.number().default(8080),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
