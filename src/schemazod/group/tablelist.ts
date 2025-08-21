import z from "zod";

export const querySchemaList = z.object({
    name: z.string().optional().transform((val)=> val?.toUpperCase())
})