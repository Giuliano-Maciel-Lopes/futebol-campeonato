import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  JWT_SECRET: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  URL_FRONT: z.string(),
});
export const env = envSchema.parse(process.env);
