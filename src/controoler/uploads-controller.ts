import { Request, Response } from "express";
import { SchemaUploadCategory } from "@/schemazod/uploads/uploads";
import { DiskStorageFile } from "@/providers/disktorage";

class UploadsController {
  async create(req: Request, res: Response) {
    const DisktorageFile = new DiskStorageFile();
    const dataUpload = SchemaUploadCategory.parse({
      file: req.file,
      category: req.body.category,
    });
    let uploadpath;
    if (dataUpload.category && dataUpload.file) {
      uploadpath = await DisktorageFile.SaveFileTOCategory(
        dataUpload.file?.filename,
        dataUpload.category
      );
    }

    res.json(uploadpath);
  }
}

export { UploadsController };
