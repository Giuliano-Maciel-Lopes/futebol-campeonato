import multer, { diskStorage } from "multer";
import path from "node:path";
import crypto from "node:crypto";

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const TPM_FOLDER = path.resolve( __dirname , "..", "..", "public", "TPM");

const MULTER = {
  storage: multer.diskStorage({
    destination: TPM_FOLDER,
    filename(req, file, callback) {
      const FileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${FileHash}-${file.originalname}`;
      return callback(null, filename);
    },
  }),
};

export default {
    MULTER,
    ACCEPTED_IMAGE_TYPES,
    MAX_FILE_SIZE,
    TPM_FOLDER
}
