import { z } from "zod";
import uploadConfig from "../../config/upload";

export const CategoryEnum = z.enum(["PLAYERS", "TEAM",]);

export const SchemafileSchema = z
  .object({
    filename: z.string().min(1, "Nome do arquivo é obrigatório"),
    mimetype: z
      .string()
      .refine(
        (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
        "Formato de arquivo inválido. Apenas JPEG e PNG são permitidos."
      ),
    size: z
      .number()
      .positive()
      .refine(
        (size) => size <= uploadConfig.MAX_FILE_SIZE,
        "Arquivo excede o tamanho máximo permitido"
      ),
  })
  .passthrough();


export const SchemaUploadCategory = z
  .object({
    file: SchemafileSchema.optional(),
    category: CategoryEnum.optional(),
  })
  .refine(
    (data) => {
      // Se tiver file, category tem que existir
      if (data.file && !data.category) return false;
      return true;
    },
    {
      message: "Categoria é obrigatória se houver arquivo",
      path: ["category"],
    }
  );
