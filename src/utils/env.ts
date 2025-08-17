import dotenv from "dotenv"; 
import z from "zod";

dotenv.config(); 

const envSchema = z.object({
    JWT_SECRET: z.string()
})
export const env = envSchema.parse(process.env)