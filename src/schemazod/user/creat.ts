import { z } from "zod"; // usa z ao invés de z.default

export const UsercreateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "necessário no mínimo 3 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "email inválido" })
    .transform(val => val.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(6, { message: "é necessário no mínimo 6 caracteres" }),
});


export type CreateUserInput = z.infer<typeof  UsercreateUserSchema>;
