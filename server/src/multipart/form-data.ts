import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../assets/avatars"));
  },

  filename: (_req, file, cb) => {
    // Generate a unique file name
    // Example: avatar-16777654321-123456789.png
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() + 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage });
