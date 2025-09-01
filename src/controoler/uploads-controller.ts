import { SchemafileSchema } from "@/schemazod/uploads/uploads";
import { Request, Response } from "express";


class UploadsController {
  async create(req: Request, res: Response) {
  const file = SchemafileSchema.parse(req.file)

         res.json({
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      });
  }
}

export { UploadsController };
