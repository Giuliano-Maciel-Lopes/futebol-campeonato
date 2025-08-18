import { z } from "zod";


export const uuidSchema = z.uuid("ID inválido");

export type UuidInput = z.infer<typeof uuidSchema>; 
